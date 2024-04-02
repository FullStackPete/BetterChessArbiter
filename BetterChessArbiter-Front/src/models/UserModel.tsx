export type UserModel = {
  id: string;
  name: string;
  surname: string;
  email: string;
  password: string;
  salt: string;
  sex: string;
  emailConfirmed: boolean;
  role: "Admin" | "Organizer" | "User" | "Moderator";
};
