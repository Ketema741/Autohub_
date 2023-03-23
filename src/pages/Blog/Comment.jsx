import React, { useState } from "react";
import md5 from "crypto-js/md5";

const CommentSection = () => {
  const [comments, setComments] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");

  const handleSubmit = (e, parentCommentId) => {
    e.preventDefault();
    const newComment = { name, email, comment, parentCommentId };
    setComments([...comments, newComment]);
    setName("");
    setEmail("");
    setComment("");
  };

  const renderComment = (comment) => {
    const childComments = comments.filter(
      (c) => c.parentCommentId === comment.id
    );

    return (
      <div key={comment.id} className="mb-4">
        <div className="flex items-center mb-2">
          <div className="flex-shrink-0">
            <img
              src={`https://www.gravatar.com/avatar/${md5(
                comment.email.trim().toLowerCase()
              )}?s=60&d=mp`}
              alt="Gravatar"
              className="rounded-full w-10 h-10"
            />
          </div>
          <div className="ml-3">
            <div className="font-medium">{comment.name}</div>
            <div className="text-gray-600 text-sm">{comment.date}</div>
          </div>
        </div>
        <div className="text-gray-800">{comment.comment}</div>
        <button
          className="text-indigo-500 font-medium mt-2"
          onClick={() => setShowReplyForm(comment.id)}
        >
          Reply
        </button>
        {showReplyForm === comment.id && (
          <form className="mt-4" onSubmit={(e) => handleSubmit(e, comment.id)}>
            <div className="flex flex-wrap mb-4">
              <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
                <input
                  type="text"
                  placeholder="Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <input
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>
            <textarea
              placeholder="Leave a reply..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500"
              required
            ></textarea>
            <button
              type="submit"
              className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg mt-4"
            >
              Submit
            </button>
          </form>
        )}
        {childComments.length > 0 && (
          <div className="ml-8">
            {childComments.map((c) => renderComment(c))}
          </div>
        )}
      </div>
    );
  };

  const [showReplyForm, setShowReplyForm] = useState('');

  return (
    <div className="my-4">
      <h3 className="text-lg font-medium mb-2">Comments:</h3>
      {comments.length > 0 ? (
        comments.filter((c) => !c.parentCommentId).map((c) => renderComment(c))
      ) : (
        <p>No comments yet. Be the first to leave a comment!</p>
      )}
      <h3 className="text-lg font-medium mt-4 mb-2">Leave a comment:</h3>
      <form onSubmit={(e) => handleSubmit(e, null)}>
        <div className="flex flex-wrap mb-4">
          <div className="w-full md:w-1/2 px-3 mb-2 md:mb-0">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
          <div className="w-full md:w-1/2 px-3">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500"
              required
            />
          </div>
        </div>
        <textarea
          placeholder="Leave a comment..."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="w-full px-4 py-2 rounded-lg border border-gray-400 focus:outline-none focus:border-indigo-500"
          required
        ></textarea>
        <button
          type="submit"
          className="bg-indigo-500 hover:bg-indigo-600 text-white font-medium py-2 px-4 rounded-lg mt-4"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
