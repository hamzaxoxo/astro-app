import { useEffect, useState } from "react";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import UserModal from "./UserModal";
import type { User } from "../Types/types";
import toast, { Toaster } from "react-hot-toast";
import { IoSearch } from "react-icons/io5";
const UsersList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [selectedSkill, setSelectedSkill] = useState<string>("");

  useEffect(() => {
    fetch("/api/users")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data);
        setFilteredUsers(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const openModal = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const deleteUser = (id: string) => {
    fetch(`/api/users/${id}`, { method: "DELETE" })
      .then((res) => res.json())
      .then((data) => {
        if (data.message) {
          setUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
          setFilteredUsers((prevUsers) => prevUsers.filter((user) => user._id !== id));
          toast.success(data.message);
        }
      })
      .catch(() => console.log("Failed to delete user"));
  };

  useEffect(() => {
    let filtered = users;

    if (searchQuery.trim()) {
      filtered = filtered.filter(
        (user) =>
          user.fullName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
          user.country.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedSkill) {
      filtered = filtered.filter((user) => user.skills.includes(selectedSkill));
    }

    setFilteredUsers(filtered);
  }, [searchQuery, selectedSkill, users]);

  const allSkills = Array.from(new Set(users.flatMap((user) => user.skills)));

  return (
    <>
      <div className="max-w-7xl mx-auto p-5">
        <h1 className="text-3xl font-bold mb-4">Users</h1>

        <div className="mb-4 flex flex-wrap justify-between items-center gap-4">
          <div className="relative flex w-full items-center gap-4">
            <input
              type="text"
              placeholder="Search by name, username, city, country..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border border-gray-300 !p-4 !pl-20 rounded-md w-full md:w-1/2"
            />
            <IoSearch size={40} className="absolute left-6"/>
          </div>

          <div className="flex flex-wrap gap-3">
            <button
              onClick={() => setSelectedSkill("")}
              className={`px-4 py-2 rounded-lg ${selectedSkill === "" ? "bg-[#849FFF] text-white" : "bg-gray-200"}`}>
              All Skills
            </button>
            {allSkills.map((skill, index) => (
              <button
                key={index}
                onClick={() => setSelectedSkill(skill)}
                className={`cursor-pointer px-4 py-2 rounded-lg ${selectedSkill === skill ? "bg-[#849FFF] text-white" : "bg-gray-200"}`}>
                {skill}
              </button>
            ))}
          </div>

        </div>

        <div>
          {loading ? (
            <div className="flex justify-center items-center h-[70vh]">
              <div className="loader"></div>
            </div>
          ) : filteredUsers.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredUsers.map((user, index) => (
                <div key={index} className="relative border custom-shadow hover:border hover:border-[#849FFF] rounded-lg p-4">
                  <button onClick={() => deleteUser(user._id)} className="absolute -top-4 -right-4 bg-rose-400 text-gray-100 rounded-full p-2 cursor-pointer">
                    <RxCross2 size={20} />
                  </button>
                  <div className="flex items-start gap-4" onClick={() => openModal(user)}>
                    <img src={user.avatar} alt={user.fullName} className="w-26 h-26 rounded-full mb-2" />
                    <div className="flex flex-col gap-2">
                      <h2 className="font-semibold font-serif text-2xl">{user.fullName}</h2>
                      <p className="text-gray-500">{user.city}, {user.country}</p>
                      <div className="flex flex-wrap mt-2">
                        {user.skills.map((skill, idx) => (
                          <span key={idx} className="text-[#849FFF] font-medium border border-[#849FFF] rounded-full px-2 py-1 mr-2 mb-2 text-sm">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                    {user.socialLinks && (
                      <div className="flex flex-col gap-4 mt-auto">
                        {Object.entries(user.socialLinks).map(([platform, link]) =>
                          link ? (
                            <a key={`${user._id}-${platform}`} href={`https://${link}`} target="_blank" rel="noopener noreferrer" className="text-[#849FFF] hover:underline">
                              {platform === "linkedin" ? <FaLinkedinIn size={22} /> : platform === "twitter" ? <BsTwitterX size={22} /> : platform === "facebook" ? <FaFacebook size={22} /> : null}
                            </a>
                          ) : null
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex justify-center items-center h-[70vh]">
              <p className="text-xl">No users found</p>
            </div>
          )}
        </div>
      </div>

      {modalOpen && selectedUser && <UserModal user={selectedUser} closeModal={closeModal} />}
      <Toaster />
    </>
  );
};

export default UsersList;
