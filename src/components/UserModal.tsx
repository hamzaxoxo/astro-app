import React, { useState } from "react";
import type { User } from "../Types/types";
import { RxCross2 } from "react-icons/rx";
import { RiLinksFill } from "react-icons/ri";
import toast from "react-hot-toast";

interface UserModalProps {
    user: User;
    closeModal: () => void;
}

export default function UserModal({ user, closeModal }: UserModalProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [editableUser, setEditableUser] = useState<User>({ ...user });
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        setEditableUser({ ...editableUser, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch(`/api/users/${editableUser._id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(editableUser),
            });
            const data = await response.json();
            if (!response.ok) {
                throw new Error(data.message);
            }
            console.log(data.message)
            toast.success(data.message);
            setIsEditing(false);
            close();
        } catch (error: any) {
            toast.error(error.message || "Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center p-4">
            <div className="relative bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-2 right-2 cursor-pointer text-red-500"
                >
                    <RxCross2 size={24} />
                </button>

                <h3 className="text-xl font-bold mb-4 text-center">User Profile</h3>

                <div className="flex flex-col items-center">
                    <img
                        src={editableUser.avatar}
                        alt={editableUser.fullName}
                        className="w-24 h-24 rounded-full mb-4"
                    />
                </div>

                <div className="grid grid-cols-2 gap-3">
                    <label className="font-semibold">Full Name:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="fullName"
                            value={editableUser.fullName}
                            onChange={handleChange}
                            className="border px-2 py-1 rounded"
                        />
                    ) : (
                        <p>{editableUser.fullName || "-"}</p>
                    )}

                    <label className="font-semibold">Username:</label>
                    <p>@{editableUser.username || "-"}</p>

                    <label className="font-semibold">Email:</label>
                    <p>{editableUser.email || "-"}</p>

                    <label className="font-semibold">Phone:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="phone"
                            value={editableUser.phone}
                            onChange={handleChange}
                            className="border px-2 py-1 rounded"
                        />
                    ) : (
                        <p>{editableUser.phone || "-"}</p>
                    )}

                    <label className="font-semibold">Bio:</label>
                    {isEditing ? (
                        <textarea
                            name="bio"
                            value={editableUser.bio}
                            onChange={handleChange}
                            className="border px-2 py-1 rounded h-16"
                        />
                    ) : (
                        <p>{editableUser.bio || "No bio available"}</p>
                    )}

                    <label className="font-semibold">Date of Birth:</label>
                    {isEditing ? (
                        <input
                            type="date"
                            name="dob"
                            value={editableUser.dob ? editableUser.dob.split("T")[0] : ""}
                            onChange={handleChange}
                            className="border px-2 py-1 rounded"
                        />
                    ) : (
                        <p>{editableUser.dob ? new Date(editableUser.dob).toLocaleDateString() : "-"}</p>
                    )}


                    <label className="font-semibold">Gender:</label>
                    {isEditing ? (
                        <select
                            name="gender"
                            value={editableUser.gender}
                            onChange={handleChange}
                            className="border px-2 py-1 rounded"
                        >
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                        </select>
                    ) : (
                        <p>{editableUser.gender || "-"}</p>
                    )}


                    <label className="font-semibold">City:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="city"
                            value={editableUser.city}
                            onChange={handleChange}
                            className="border px-2 py-1 rounded"
                        />
                    ) : (
                        <p>{editableUser.city || "-"}</p>
                    )}

                    <label className="font-semibold">Country:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="country"
                            value={editableUser.country}
                            onChange={handleChange}
                            className="border px-2 py-1 rounded"
                        />
                    ) : (
                        <p>{editableUser.country || "-"}</p>
                    )}

                    <label className="font-semibold">Website:</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="website"
                            value={editableUser.website || "-"}
                            onChange={handleChange}
                            className="border px-2 py-1 rounded"
                        />
                    ) : (
                        <a href={editableUser.website} className="underline text-[#849FFF] flex gap-2 items-center">{editableUser.website || "N/A"}<RiLinksFill /></a>
                    )}

                    <label className="font-semibold">Skills:</label>
                    {isEditing ? (
                        <div className="border px-2 py-1 rounded flex flex-wrap gap-2">
                            {editableUser.skills.map((skill, index) => (
                                <span key={index} className="flex items-center bg-[#849FFF] text-white font-medium rounded-full px-3 py-1 text-sm">
                                    {skill}
                                    <button
                                        onClick={() => {
                                            const newSkills = editableUser.skills.filter((_, i) => i !== index);
                                            setEditableUser({ ...editableUser, skills: newSkills });
                                        }}
                                        className="ml-2 text-rose-700 hover:text-rose-400 cursor-pointer"
                                    >
                                        <RxCross2 />
                                    </button>
                                </span>
                            ))}

                            <input
                                type="text"
                                placeholder="Add a skill..."
                                className="border-none outline-none px-2 py-1 text-sm"
                                onKeyDown={(e: any) => {
                                    if (e.key === "Enter" && e.target.value.trim() !== "") {
                                        setEditableUser({
                                            ...editableUser,
                                            skills: [...editableUser.skills, e.target.value.trim()],
                                        });
                                        e.target.value = "";
                                    }
                                }}
                            />
                        </div>
                    ) : (
                        <div className="flex flex-wrap gap-2">
                            {editableUser.skills.map((skill, index) => (
                                <span key={index} className="bg-[#849FFF] text-white font-medium rounded-full px-3 py-1 text-sm">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    )}

                </div>

                <div className="mt-4 flex justify-end gap-3">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSubmit}
                                className="bg-[#849FFF] text-white px-4 py-2 rounded hover:bg-[#798ed8]"
                            >
                                {loading ? "Saving..." : "Save"}
                            </button>
                            <button
                                onClick={() => setIsEditing(false)}
                                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={() => setIsEditing(true)}
                            className="bg-[#849FFF] text-white px-4 py-2 rounded hover:bg-[#849FFF]"
                        >
                            Edit
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
