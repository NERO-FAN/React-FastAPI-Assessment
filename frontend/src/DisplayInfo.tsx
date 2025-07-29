import { useMutationState } from "@tanstack/react-query";
import { useGetUsers } from "./hooks/reactQuery";
import type { UserCreate } from "./types";
import { useEffect } from "react";

function DisplayInfo() {

    const { isPending, isError, data: users, error } = useGetUsers();

    // access variables somewhere else
    const variables = useMutationState<UserCreate>({
        filters: { mutationKey: ['createUser'], status: 'pending' },
        select: (mutation) => mutation.state.variables as UserCreate,
    })

    if (isPending) {
        return <span>Loading...</span>
    }

    if (isError) {
        return <span>Error: {error.message}</span>
    }

    return (
        <div className="w-1/2 bg-gray-100 rounded-lg p-6 border border-gray-300">
            {
                users.map((user, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                        <div className="flex flex-col bg-gray-200 rounded-md p-3 mb-2">
                            <div>
                                <span className="text-sm font-medium text-gray-700">Name:</span>
                                <span className="ml-2 text-gray-900">{user.firstName} {user.lastName}</span>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-700">Date of Birth:</span>
                                <span className="ml-2 text-gray-900">{user.dob}</span>
                            </div>
                        </div>
                    </div>
                ))
            }
            {
                isPending &&
                variables.map((optimisticUser, index) => (
                    <div key={index} className="mb-4 last:mb-0">
                        <div className="flex flex-col bg-gray-200 rounded-md p-3 mb-2">
                            <div>
                                <span className="text-sm font-medium text-gray-700">Name:</span>
                                <span className="ml-2 text-gray-900">{optimisticUser.firstName} {optimisticUser.lastName}</span>
                            </div>
                            <div>
                                <span className="text-sm font-medium text-gray-700">Date of Birth:</span>
                                {/* <span className="ml-2 text-gray-900">{user.dob}</span> */}
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default DisplayInfo;
