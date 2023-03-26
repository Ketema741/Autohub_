import React, { useEffect, useState } from "react";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar, ThemeSettings } from "../../components";
import DetailCard from "./DetailCard";
import CommentSection from './Comment'
import { useStateContext } from "../../context/ContextProvider";

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
            <div className="px-2 max-w-lg mx-auto my-8">
              <CommentSection />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};
export default BlogDetail;
