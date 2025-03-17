import { useEffect, useState } from "react";

interface AvatarSelectorProps {
    selectedAvatar: string;
    setSelectedAvatar: (avatar: string) => void;
}

export default function AvatarSelector({ selectedAvatar, setSelectedAvatar }: AvatarSelectorProps) {
    const [avatarList, setAvatarList] = useState<string[]>([]);
    const [isModalOpen, setIsModalOpen] = useState(false);

    useEffect(() => {
        const fetchAvatars = () => {
            const baseURL = "https://api.dicebear.com/7.x/identicon/svg?seed=";
            const newAvatars = Array.from({ length: 20 }, () => `${baseURL}${Math.random().toString(36).substring(7)}`);
            setAvatarList(newAvatars);
        };
        fetchAvatars();
    }, []);

    const handleAvatarSelect = (avatar: string) => {
        setSelectedAvatar(avatar);
        setIsModalOpen(false);
    };

    return (
        <>
            <div className="text-center mb-6">
                <label className="block text-gray-700 font-medium mb-2">Profile Picture</label>
                <div className="relative inline-block">
                    <img  src={selectedAvatar}  className="w-24 h-24 object-cover rounded-full shadow-md border border-gray-300 mx-auto" />
                    <button
                        type="button"
                        onClick={() => setIsModalOpen(true)}
                        className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full shadow-md"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                            ></path>
                        </svg>
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center">
                    <div className="relative bg-white p-6 rounded-lg shadow-lg">
                        <h3 className="text-lg font-bold mb-4">Select an Avatar</h3>
                        <div className="grid grid-cols-4 gap-3">
                            {avatarList.map((avatar, index) => (
                                <img
                                    key={index}
                                    src={avatar}
                                    className="w-16 h-16 object-cover rounded-full border cursor-pointer hover:scale-110 transition"
                                    onClick={() => handleAvatarSelect(avatar)}
                                />
                            ))}
                        </div>
                        <button
                            type="button"
                            onClick={() => setIsModalOpen(false)}
                            className="mt-4 px-4 py-2 rounded cursor-pointer absolute top-0 right-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" fill="none" viewBox="0 0 24 24" id="cross">
                                <path fill="url(#paint0_linear_1850_3450)" fillRule="evenodd" d="M6.29289 6.29289C6.68342 5.90237 7.31658 5.90237 7.70711 6.29289L17.7071 16.2929C18.0976 16.6834 18.0976 17.3166 17.7071 17.7071C17.3166 18.0976 16.6834 18.0976 16.2929 17.7071L6.29289 7.70711C5.90237 7.31658 5.90237 6.68342 6.29289 6.29289Z" clipRule="evenodd"></path>
                                <path fill="#850026" fillRule="evenodd" d="M6.29289 17.7071C5.90237 17.3166 5.90237 16.6834 6.29289 16.2929L16.2929 6.29289C16.6834 5.90237 17.3166 5.90237 17.7071 6.29289C18.0976 6.68342 18.0976 7.31658 17.7071 7.70711L7.70711 17.7071C7.31658 18.0976 6.68342 18.0976 6.29289 17.7071Z" clipRule="evenodd"></path>
                                <defs>
                                    <linearGradient id="paint0_linear_1850_3450" x1="5.455" x2="18.546" y1="5.455" y2="18.546" gradientUnits="userSpaceOnUse">
                                        <stop offset=".083" stopColor="#FF6A6A"></stop>
                                        <stop offset="1" stopColor="#F72257"></stop>
                                    </linearGradient>
                                </defs>
                            </svg>
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
