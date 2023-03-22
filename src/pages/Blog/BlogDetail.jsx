import React, { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar, ThemeSettings } from "../../components";
import DetailCard from "./DetailCard";
import "../../App.css";
import { useStateContext } from "../../contexts/ContextProvider";

const BlogDetail = () => {
  const [comments, setComments] = useState([]);

  const handleSubmit = (event) => {
    event.preventDefault();
    const newComment = {
      id: comments.length + 1,
      text: event.target.comment.value,
      replies: [],
    };
    setComments([...comments, newComment]);
    event.target.comment.value = "";
  };

  const handleReplySubmit = (event, commentId) => {
    event.preventDefault();
    const newReply = {
      id: comments[commentId - 1].replies.length + 1,
      text: event.target.reply.value,
    };
    const updatedComments = [...comments];
    updatedComments[commentId - 1].replies.push(newReply);
    setComments(updatedComments);
    event.target.reply.value = "";
  };

  const {
    setCurrentColor,
    setCurrentMode,
    currentMode,
    activeMenu,
    currentColor,
    themeSettings,
    setThemeSettings,
  } = useStateContext();

  useEffect(() => {
    const currentThemeColor = localStorage.getItem("colorMode");
    const currentThemeMode = localStorage.getItem("themeMode");
    if (currentThemeColor && currentThemeMode) {
      setCurrentColor(currentThemeColor);
      setCurrentMode(currentThemeMode);
    }
  }, []);

  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className={currentMode === "Dark" ? "dark" : ""}>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
          <TooltipComponent content="Settings" position="Top">
            <button
              type="button"
              onClick={() => setThemeSettings(true)}
              style={{ background: currentColor, borderRadius: "50%" }}
              className="text-3xl text-white p-3 hover:drop-shadow-xl hover:bg-light-gray"
            >
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white ">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
        )}
        <div
          className={
            activeMenu
              ? "dark:bg-main-dark-bg  bg-main-bg min-h-screen md:ml-72 w-full  "
              : "bg-main-bg dark:bg-main-dark-bg  w-full min-h-screen flex-2 "
          }
        >
          <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full ">
            <Navbar />
          </div>
          {themeSettings && <ThemeSettings />}
          <div className="mt-24 container mx-auto">
            <div className="overflow-x-auto sm:mx-0.5 lg:mx-0.5">
              <DetailCard />
            </div>
            <div className="max-w-lg mx-auto my-8">
              <h2 className="text-xl font-bold mb-4">Comments</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="comment" className="block font-medium mb-2">
                    Add a comment:
                  </label>
                  <textarea
                    id="comment"
                    name="comment"
                    rows="3"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  ></textarea>
                </div>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              </form>
              <ul className="mt-6 space-y-6">
                {comments.map((comment) => (
                  <li key={comment.id}>
                    <div className="bg-white rounded-lg shadow-md p-4">
                      <p className="text-gray-800">{comment.text}</p>
                      {comment.replies.length > 0 && (
                        <ul className="mt-4 space-y-2">
                          {comment.replies.map((reply) => (
                            <li key={reply.id}>
                              <div className="bg-gray-100 rounded-lg shadow-md p-3">
                                <p className="text-gray-800">{reply.text}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                      <form
                        onSubmit={(event) =>
                          handleReplySubmit(event, comment.id)
                        }
                      >
                        <div className="mt-4">
                          <label
                            htmlFor={`reply-${comment.id}`}
                            className="block font-medium mb-2"
                          >
                            Reply:
                          </label>
                          <textarea
                            id={`reply-${comment.id}`}
                            name="reply"
                            rows="2"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                          ></textarea>
                        </div>
                        <button
                          type="submit"
                          className="bg-gray-200 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                        >
                          Reply
                        </button>
                      </form>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default BlogDetail;
