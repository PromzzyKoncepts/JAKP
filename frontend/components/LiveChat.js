"use client";
import { useState, useEffect, useRef } from "react";
import { getBgColor, getInitials, getRandomColor } from "@/lib/utils";
import { EMOJIS } from "@/lib/constants";
import { FaTelegram } from "react-icons/fa6";
import { usePathname } from "next/navigation";
import toast from "react-hot-toast";
import { PROFANITY_LIST } from "@/lib/data";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

// XSS protection function
const sanitizeInput = (input) => {
  return input
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
};



const containsProfanity = (text) => {
  const lowerText = text.toLowerCase();
  return PROFANITY_LIST.some((word) => lowerText.includes(word.toLowerCase()));
};

export default function LiveChat({
  socket,
  user,
  viewersCount,
  comments,
  setComments,
}) {
  const [newComment, setNewComment] = useState("");
  const [showEmojis, setShowEmojis] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [totalParticipants, setTotalParticipants] = useState(0);
  const commentsEndRef = useRef(null);
  const pathname = usePathname();

  useEffect(() => {
    const fetchTotalParticipants = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/users/total-participants`);
        const data = await response.json();
        console.log(data.data.totalParticipants);
        if (data.success) {
          setTotalParticipants(data.data.totalParticipants);
        }
      } catch (error) {
        console.error("Error fetching total participants:", error);
      }
    };

    fetchTotalParticipants();
  }, [comments]); // Re-fetch when comments change

  useEffect(() => {
    if (!socket) return;

    const handleNewComment = (comment) => {
      setComments((prev) => {
        const exists = prev.some((c) => c._id === comment._id);
        return exists ? prev : [...prev, comment];
      });
    };

    socket.on("newComment", handleNewComment);

    return () => {
      socket.off("newComment", handleNewComment);
    };
  }, [socket, setComments]);

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    // Sanitize input
    const sanitizedComment = sanitizeInput(newComment);

    // Check for profanity
    if (containsProfanity(sanitizedComment)) {
      toast.error("This comment has inappropriate content");
      return;
    }

    // Check for potential XSS attempts
    if (newComment !== sanitizedComment) {
      toast.error("Your comment contains disallowed characters");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${baseUrl}/api/comments`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text: newComment,
          email: user.email,
          fullName: user.fullName,
        }),
      });

      const data = await response.json();

      if (data.success) {
        setNewComment("");
        setShowEmojis(false);

        if (socket) {
          socket.emit("newComment", data.data);
        }
      }
    } catch (error) {
      setIsLoading(false);
      console.error("Error submitting comment:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addEmoji = (emoji) => {
    setNewComment((prev) => prev + emoji);
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const response = await fetch(`${baseUrl}/api/comments/${commentId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Remove the comment from local state
        setComments((prev) =>
          prev.filter((comment) => comment._id !== commentId)
        );
      } else {
        console.error("Failed to delete comment");
      }
    } catch (error) {
      console.error("Error deleting comment:", error);
    }
  };

  const handleBlockUser = async (userId, email) => {
    try {
      const response = await fetch(`${baseUrl}/api/users/${userId}/block`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.ok) {
        // Remove all comments from this user from local state
        setComments((prev) =>
          prev.filter((comment) => comment.user?._id !== userId)
        );

        toast(`User ${email} has been blocked and their comments removed`);
      } else {
        console.error("Failed to block user");
      }
    } catch (error) {
      console.error("Error blocking user:", error);
    }
  };

  return (
    <div className="bg-white rounded-lg font-snig shadow h-[70vh] flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Live Chat</h2>
        {pathname.startsWith("/admin") && (
          <div className="flex items-center gap-5">
            <p className="text-sm text-gray-500">{viewersCount} connected</p>
            <p className="text-sm text-gray-500">
              {totalParticipants} total participants
            </p>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {comments.map((comment) => (
          <div
            key={comment._id}
            className={`flex gap-3 ${
              comment?.color || getBgColor()
            } p-3 rounded-lg hover:translate-y-[-5px] ease-in-out duration-300 hover:shadow-md`}
          >
            <div
              className={`flex-shrink-0 w-8 h-8 rounded-full ${getRandomColor()} border border-slate-200 flex items-center justify-center text-white font-luckiest font-normal`}
            >
              {comment.initials || "US"}
            </div>
            <div className="flex flex-col items-start w-full">
              <div className="flex items-center gap-5 w-full justify-between">
                <p className="font-medium">
                  {comment?.user?.fullName || "Anonymous"}
                </p>
                {pathname.startsWith("/admin") && (
                  <div className="flex gap-5 items-center">
                    <button
                      onClick={() =>
                        handleBlockUser(comment.user?._id, comment.user?.email)
                      }
                      className="text-xs cursor-pointer text-red-500"
                    >
                      block
                    </button>
                    <button
                      onClick={() => handleDeleteComment(comment._id)}
                      className="text-xs cursor-pointer text-amber-500"
                    >
                      delete
                    </button>
                  </div>
                )}
              </div>
              <p className="text-gray-800 text-sm">{comment.text}</p>
            </div>
          </div>
        ))}
        <div ref={commentsEndRef} />
      </div>

      <form onSubmit={handleSubmitComment} className="p-4 border-t relative">
        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => setShowEmojis(!showEmojis)}
            className="text-xl"
          >
            😀
          </button>

          {showEmojis && (
            <div className="absolute bottom-16 left-4 bg-white p-2 rounded-lg shadow-lg grid grid-cols-6 gap-1 z-10">
              {EMOJIS.map((emoji, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => addEmoji(emoji)}
                  disabled={isLoading}
                  className="text-xl hover:bg-gray-100 rounded p-1"
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}

          <input
            autoFocus={true}
            type="text"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add a comment..."
            className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />

          <button
            type="submit"
            className="text-cyan-500 hover:text-cyan-700 disabled:opacity-50"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            ) : (
              <FaTelegram size={30} />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
