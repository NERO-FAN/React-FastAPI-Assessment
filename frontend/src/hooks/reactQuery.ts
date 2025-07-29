import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, fetchUsers } from "../api/users";
import type { User, UserCreate } from "../types";

/* React Query Hooks */

let globalId = -1;

export const useGetUsers = () => {
    return useQuery({ queryKey: ['users'], queryFn: fetchUsers, staleTime: Infinity });
};

export const addUserMutation = () => {

    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async (userInfo: UserCreate) => await createUser(userInfo),
        mutationKey: ['createUser'],
        onMutate: async (newUser: UserCreate) => {
            await queryClient.cancelQueries({ queryKey: ['users'] });
            const previousUsers = queryClient.getQueryData<User[]>(['users']);

            const optimisticId = globalId;
            globalId--;

            const optimisticUser: User = {
                ...newUser,
                id: optimisticId,
            };

            queryClient.setQueryData<User[]>(['users'], (oldUsers) => {
                return oldUsers ? [...oldUsers, optimisticUser] : [optimisticUser];
            });

            // return the context so that we can access these below
            return { previousUsers, optimisticId };
        },

        onSuccess: (data, _, context) => {
            if (context.optimisticId) {
                queryClient.setQueryData<User[]>(['users'], (oldUsers) => {
                    return oldUsers ? oldUsers.map(user =>
                        // replace the optimistic user with the real data from the response
                        user.id === context.optimisticId ? data : user
                    ) : [data];
                });
            }
        },

        onError: (err, _, context) => {
            console.error("Error adding user:", err.message);
            // rollback the optimistic update if there was an error
            if (context?.previousUsers) {
                queryClient.setQueryData<User[]>(['users'], context.previousUsers);
            }
        },
    });
};