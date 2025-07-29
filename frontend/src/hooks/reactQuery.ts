import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createUser, fetchUsers } from "../api/users";
import type { User, UserCreate } from "../types";

/* React Query Hooks */

export const useGetUsers = () => {
    return useQuery({ queryKey: ['users'], queryFn: fetchUsers });
};

export const addUserMutation = () => {

    const queryClient = useQueryClient();

    return useMutation({ 
        mutationFn: (userInfo: UserCreate) => createUser(userInfo),
        // make sure to _return_ the Promise from the query invalidation
        // so that the mutation stays in `pending` state until the refetch is finished
        onSettled: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
        mutationKey: ['createUser'],
     });
};