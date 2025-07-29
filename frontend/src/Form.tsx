import { useEffect, useState } from "react";
import type { UserCreate } from "./types";
import { addUserMutation } from "./hooks/reactQuery";

interface UserInfoForm {
    firstName: string,
    lastName: string,
    dob: string,
}

function Form() {

    // set's the initial form state
    const [userInfo, setUserInfo] = useState<UserInfoForm>({
        firstName: '',
        lastName: '',
        dob: '',
    });

    const [showSuccess, setShowSuccess] = useState(false);
    const [showError, setShowError] = useState(false);

    const { isSuccess, mutate, isError, error } = addUserMutation();

    const [errors, setErrors] = useState<Partial<UserInfoForm>>({});

    const validate = (): boolean => {
        const newErrors: Partial<UserInfoForm> = {};

        if (!userInfo.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!userInfo.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!userInfo.dob) newErrors.dob = 'Date of birth is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // parses the name of the input element to update the form info with the value
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUserInfo(prev => ({ ...prev, [name]: value }));
    };

    const handleFormSubmission = (e: React.FormEvent) => {
        e.preventDefault();
        clearErrors();
        if (validate()) {
            mutate({ firstName: userInfo.firstName, lastName: userInfo.lastName, dob: userInfo.dob });
            clearState();
        }
    }

    useEffect(() => {
        if (isSuccess) {
            setShowSuccess(true);
            const timer = setTimeout(() => {
                setShowSuccess(false);
            }, 4000);

            return () => clearTimeout(timer);
        }

        if (isError) {
            setShowError(true);
            const timer = setTimeout(() => {
                setShowError(false);
            }, 4000);

            return () => clearTimeout(timer);
        }

    }, [isSuccess, isError]);

    const clearState = () => {

        // reset the form info
        setUserInfo({
            firstName: '',
            lastName: '',
            dob: '',
        })
    }

    const clearErrors = () => {
        setErrors({});
    }

    return (
        <form className="w-1/2 justify-center items-center p-6" onSubmit={handleFormSubmission} onFocus={clearErrors}>
            <div className="flex flex-wrap -mx-3 mb-6">
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                        First Name
                    </label>
                    <input name="firstName" className={`appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${errors.firstName && 'border-red-500'}`} value={userInfo.firstName} onChange={handleChange} id="grid-first-name" type="text" placeholder="First Name" />
                    {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>}
                </div>
                <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-last-name">
                        Last Name
                    </label>
                    <input name="lastName" className={`appearance-none block w-full bg-gray-50 text-gray-700 border border-gray-200 rounded-lg py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 ${errors.lastName && 'border-red-500'}`} value={userInfo.lastName} onChange={handleChange} id="grid-last-name" type="text" placeholder="Last Name" />
                    {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName}</p>}
                </div>
            </div>
            <div className="relative max-w-sm mb-6">
                <input name="dob" id="datepicker-autohide" type="date" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-4 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" value={userInfo.dob} onChange={handleChange} placeholder="Select date" />
                {errors.dob && <p className="text-red-500 text-xs italic">{errors.dob}</p>}
            </div>
            <button type="submit" className="py-2.5 px-5 me-2 mb-2 text-sm font-medium text-gray-900 focus:outline-none bg-gray-50 rounded-md border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Submit</button>

            {showError && isError ? (
                <div className="text-red-500 text-xs italic">
                    An error occurred: {error.message}
                </div>
            ) : null}

            {showSuccess ? <div className="text-green-500 text-xs italic">Sucessfully Submitted!</div> : null}

        </form>
    )
}

export default Form;