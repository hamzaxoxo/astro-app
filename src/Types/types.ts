export type User = {
  _id: string;
  fullName: string;
  username: string;
  email: string;
  phone: string;
  bio?: string;
  dob: string;
  gender: string;
  city: string;
  country: string;
  website?: string;
  skills: string[];
  avatar: string;
  socialLinks?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
  };
  accountType: string;
};