import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import AvatarSelector from "./AvatarSelector";

export default function UserForm({ defaultAvatar }: { defaultAvatar: string }) {
    const [selectedAvatar, setSelectedAvatar] = useState(defaultAvatar);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        fullName: "",
        username: "",
        email: "",
        phone: "",
        dob: "",
        gender: "",
        country: "",
        website: "",
        skills: "",
        accountType: "",
        socialLinks: "",
        avatarId: defaultAvatar,
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
            avatarId: selectedAvatar,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (!formData.username || !formData.email) {
            return toast.error("Username and Email are required!");
        }
        try {
            const response = await fetch("/api/users", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            if (!response.ok) {
                throw new Error("An error occurred, please try again later!");
            }
            toast.success("Profile saved successfully! 🎉");
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            toast.error(error?.message);
        }
    };

    return (
        <>
            <AvatarSelector selectedAvatar={selectedAvatar} setSelectedAvatar={setSelectedAvatar} />
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
                <div>
                    <label className="block text-gray-700 font-medium mb-2">Full Name</label>
                    <input type="text" name="fullName" placeholder="Enter full name" value={formData.fullName} onChange={handleChange} />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Username</label>
                    <input type="text" name="username" placeholder="Choose a username" value={formData.username} onChange={handleChange} />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Email</label>
                    <input type="email" name="email" placeholder="your@email.com" value={formData.email} onChange={handleChange} />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Phone</label>
                    <input type="tel" name="phone" placeholder="+123 456 7890" value={formData.phone} onChange={handleChange} />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Date of Birth</label>
                    <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Gender</label>
                    <select name="gender" value={formData.gender} onChange={handleChange}>
                        <option value="">Select Gender</option>
                        <option>Male</option>
                        <option>Female</option>
                        <option>Other</option>
                    </select>
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Country</label>
                    <input type="text" name="country" placeholder="Enter country" value={formData.country} onChange={handleChange} />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Website</label>
                    <input type="url" name="website" placeholder="https://yourportfolio.com" value={formData.website} onChange={handleChange} />
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">Skills</label>
                    <input type="text" name="skills" placeholder="e.g. Web Development, UI/UX, Data Science" value={formData.skills} onChange={handleChange} />
                </div>

                <div>
                    <label className="block text-gray-700 font-medium mb-2">Account Type</label>
                    <select name="accountType" value={formData.accountType} onChange={handleChange}>
                        <option value="">Select Account Type</option>
                        <option>Personal</option>
                        <option>Business</option>
                        <option>Creator</option>
                    </select>
                </div>

                <div className="col-span-2">
                    <label className="block text-gray-700 font-medium mb-2">Social Links</label>
                    <input type="text" name="socialLinks" placeholder="LinkedIn, Twitter, etc." value={formData.socialLinks} onChange={handleChange} />
                </div>

                <div className="col-span-2 text-center">
                    <button
                        type="submit"
                        className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-700 text-white font-medium rounded-lg shadow-md hover:from-blue-600 hover:to-blue-800 transition-transform transform hover:scale-105"
                    >
                        {loading ? "Saving..." : "Save Profile"}
                    </button>
                </div>
            </form>
            <Toaster position="top-right" />
        </>
    );
}

export const getServerSideProps = async () => {
    return {
        props: {
            defaultAvatar: "https://via.placeholder.com/120",
        },
    };
};
