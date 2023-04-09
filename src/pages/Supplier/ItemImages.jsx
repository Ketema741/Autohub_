import { useState } from 'react';
import { BiHeart, BiComment, BiShareAlt, BiDotsHorizontal } from 'react-icons/bi';
import { AiOutlinePlus } from 'react-icons/ai';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';


const ItemImages = ({ currentColor }) => {
    const [posts, setPosts] = useState([
        {
            id: 1,
            imageSrc: 'https://i.imgur.com/5yeBVeM.jpeg',
            likes: 1,
            comments: 24,
            shares: 3,
        },
        {
            id: 2,
            imageSrc: 'https://i.imgur.com/fjXFX93.jpeg',
            likes: 1,
            comments: 13,
            shares: 2,
        },
        {
            id: 3,
            imageSrc: 'https://i.imgur.com/fjXFX93.jpeg',
            likes: 1,
            comments: 13,
            shares: 2,
        },
        {
            id: 4,
            imageSrc: 'https://i.imgur.com/fjXFX93.jpeg',
            likes: 1,
            comments: 13,
            shares: 2,
        },
        {
            id: 5,
            imageSrc: 'https://i.imgur.com/fjXFX93.jpeg',
            likes: 1,
            comments: 13,
            shares: 2,
        },
    ]);

    const handleLikeClick = (postId) => {
        setPosts((prevState) =>
            prevState.map((post) =>
                post.id === postId ? { ...post, likes: post.likes + 1 } : post
            )
        );
    };

    const handleCommentClick = (postId) => {
        // handle comment click
    };

    const handleShareClick = (postId) => {
        // handle share click
    };

    return (
        <div className="flex min-h-screen w-full flex-wrap  p-5 bg-gray-200">
            <div className="grid grid-cols-2 gap-3">
                {posts.map((post) => (
                    <div key={post.id} className="w-35 bg-white p-3">
                        <img className="h-40 w-full object-cover" src={post.imageSrc} alt="post" />
                        <ul className="mt-3 flex flex-wrap">
                            <li className="mr-auto">
                                <button
                                    className="flex text-gray-400 hover:text-gray-600"
                                    onClick={() => handleLikeClick(post.id)}
                                >
                                    <BiHeart className="mr-0.5" />
                                    {post.likes}
                                </button>
                            </li>
                            <li className="mr-2">
                                <button
                                    className="flex text-gray-400 hover:text-gray-600"
                                    onClick={() => handleCommentClick(post.id)}
                                >
                                    <BiComment className="mr-0.5" />
                                    {post.comments}
                                </button>
                            </li>
                            <li className="mr-2">
                                <button
                                    className="flex text-gray-400 hover:text-gray-600"
                                    onClick={() => handleShareClick(post.id)}
                                >
                                    <BiShareAlt className="mr-0.5" />
                                    {post.shares}
                                </button>
                            </li>
                            <li>
                                <button className="flex text-gray-400 hover:text-gray-600">
                                    <BiDotsHorizontal className="mr-0.5" />
                                </button>
                            </li>
                        </ul>
                    </div>
                ))}
            </div>
            
        </div>
    );
}

export default ItemImages;
