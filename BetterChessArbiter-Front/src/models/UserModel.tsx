export type UserModel = {
  id: string;
  Name: string;
  Surname: string;
  Email: string;
  Password: string;
  Salt: string;
  Sex: string;
  EmailConfirmed: boolean;
  Role: "Admin" | "Organizer" | "User" | "Moderator";
};
