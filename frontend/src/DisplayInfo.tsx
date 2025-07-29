import { useGetUsers } from "./hooks/reactQuery";

function DisplayInfo() {

    const { isPending, data: users } = useGetUsers();

    if (isPending) {
        return <span>Loading...</span>
    }

    const usersToDisplay = users || [];

    return (
        <div className="w-1/2 bg-gray-100 flex flex-col justify-center items-center rounded-lg p-6 border border-gray-300">
            { usersToDisplay.length === 0  ? (
                <div> No users to display</div>
            ) :
            usersToDisplay.map((user, index) => (
                    <div key={index} className="w-full flex flex-col bg-gray-200 rounded-md p-3 my-2">
                        <div>
                            <span className="text-sm font-medium text-gray-700">Name:</span>
                            <span className="ml-2 text-gray-900">{user.firstName} {user.lastName}</span>
                        </div>
                        <div>
                            <span className="text-sm font-medium text-gray-700">Date of Birth:</span>
                            <span className="ml-2 text-gray-900">{user.dob}</span>
                        </div>
                    </div>
                ))
            }
        </div>
    )
}

export default DisplayInfo;
