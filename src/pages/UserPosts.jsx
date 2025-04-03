import { Navigate, useParams } from "react-router-dom";
import UserService from "../services/userservice";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

export const Posts = () => {
    let { id } = useParams();
    const { user } = useSelector((state) => state.users);
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchUserPosts();
    }, []);

    const fetchUserPosts = async () => {
        try {
            const response = await UserService.getUserPosts(id);
            console.log(response.data.posts)
            setPosts(response.data.posts);
        } catch (err) {
            console.error("Error fetching posts:", err);
        }
    };

    if (!user) {
        return <Navigate to="/users" />
    }

    return (
        <div className="max-w-[100%] mx-auto mt-10  flex flex-col lg:flex-row gap-6 p-4 sm:p-6">
            <div className="lg:w-[30%] ">
                <UserProfile user={user} />
            </div>

            <div className="lg:w-2/3 bg-white shadow-lg rounded-xl p-4 sm:p-6 max-h-[500px] overflow-y-auto">
    <h3 className="text-2xl font-semibold text-gray-800 mb-4">Posts</h3>
    {posts.length > 0 ? (
        <div className="space-y-4">
            {posts.map((post) => (
                <div key={post.id} className="bg-gray-50 p-4 rounded-lg shadow-sm border hover:shadow-md transition-all duration-200">
                    <h4 className="text-xl my-2 font-semibold text-gray-700">{post.title}</h4>
                    <p className="text-gray-600 mt-1">{post.body}</p>
                    <div className="mt-3 text-sm text-gray-500 flex flex-wrap justify-between items-center">
                        <span className="flex items-center">👀 {post.views} views</span>
                        <span className="flex items-center space-x-2">
                            👍 {post.reactions.likes} | 👎 {post.reactions.dislikes}
                        </span>
                    </div>
                    {post.tags.length > 0 && (
                        <div className="mt-2 flex flex-wrap gap-2">
                            {post.tags.map((tag, index) => (
                                <span key={index} className="bg-blue-100 text-blue-600 text-xs font-semibold px-3 py-1 rounded-full">
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
    ) : (
        <p className="text-gray-500">No posts available.</p>
    )}
</div>

        </div>
    );
};

const UserProfile = ({ user }) => {
    return (
        <div className="bg-white shadow-lg rounded-xl  py-14 sm:p-6">
            <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-6 text-white text-center rounded-t-xl">
                <img
                    src={user.image}
                    alt={user.firstName}
                    className="w-24 h-24 mx-auto rounded-full border-4 border-white shadow-md"
                />
                <h2 className="text-2xl font-bold mt-2">{user.firstName} {user.lastName}</h2>
                <p className="text-gray-200">@{user.username} - {user.role}</p>
            </div>

            <div className="p-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
                        <p className="text-gray-600">Email</p>
                        <p className="font-medium break-words">{user.email}</p>
                    </div>
                    <div className="bg-gray-100 p-3 rounded-lg shadow-sm">
                        <p className="text-gray-600">Phone</p>
                        <p className="font-medium">{user.phone}</p>
                    </div>
                </div>

                <div className="p-3 rounded-lg bg-gray-50 shadow-sm">
                    <h3 className="text-lg font-semibold text-gray-700 mb-1">Address</h3>
                    <p>{user.address.address}, {user.address.city}, {user.address.state} ({user.address.stateCode}), {user.address.country} - {user.address.postalCode}</p>
                </div>
            </div>
        </div>
    );
};

export default UserProfile;
