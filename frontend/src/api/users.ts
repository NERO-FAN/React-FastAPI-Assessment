import type { User, UserCreate } from '../types';

const API_BASE_URL = 'http://localhost:8000';

export const fetchUsers = async (): Promise<User[]> => {
    const res = await fetch(`${API_BASE_URL}/users/`)
    if (!res.ok) {
        throw new Error('Network response was not ok');
    }
    const data = await res.json();
    console.log(data);
    return data
};

export const createUser = async (userInfo: UserCreate): Promise<User> => {
    const res = await fetch(`${API_BASE_URL}/users/`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(userInfo)
    });

    if(!res.ok) {
        throw new Error('Could not create user');
    }
    return res.json();
}