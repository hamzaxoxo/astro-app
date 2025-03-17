import { useEffect, useState } from "react";
type User = {
  fullName: string;
  username: string;
  email: string;
  phone: string;
  bio?: string;
  dob: string;
  gender: string;
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

const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = async () => {
    try {
      const response = await fetch("https://express-boiler-plate.vercel.app/api/users", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error("An error occurred, please try again later!");
      }

      const data = await response.json();
      setUsers(data);
    } catch (error: any) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container mx-auto p-5">
      <h1 className="text-3xl font-bold mb-4">Users</h1>
      <div className="mb-4 flex md:flex-row flex-col justify-between items-center">
        <div>
          <input
            type="text"
            placeholder="Search users"
            className="border rounded-md !p-4 !w-[30rem] !text-lg"
          />
        </div>
        <div className="flex flex-wrap md:justify-between justify-center md:mt-0 mt-6 mb-4 gap-4 items-center font-medium">
          <div className="text-lg">Reputation</div>
          <div className="flex gap-3 items-center">
            <button className="bg-[#849FFF] text-white rounded px-4 py-1">New users</button>
            <span>Voters</span>
            <span>Editors</span>
            <span>Moderators</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {users.map((user, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-md">
            <img
              src={user.avatar}
              alt={user.fullName}
              className="w-16 h-16 rounded-full mb-2"
            />
            <h2 className="font-semibold">{user.fullName}</h2>
            <p className="text-gray-500">{user.country}</p>
            <p className="text-sm text-gray-600">{user.bio}</p>
            <div className="flex flex-wrap mt-2">
              {user.skills.map((skill, idx) => (
                <span key={idx} className="bg-gray-200 text-gray-700 rounded-full px-2 py-1 mr-2 mb-2 text-sm">
                  {skill}
                </span>
              ))}
            </div>
            {user.socialLinks?.linkedin && (
              <a
                href={`https://${user.socialLinks.linkedin}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline mt-2 block"
              >
                LinkedIn Profile
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default UsersList;
