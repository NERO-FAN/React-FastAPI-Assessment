
export interface UserCreate {
  firstName: string;
  lastName: string;
  dob: string;
};

export interface User extends UserCreate {
  id: number;
};