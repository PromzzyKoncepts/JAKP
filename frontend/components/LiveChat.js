'use client';
import { useState, useEffect, useRef } from 'react';
import { getInitials, getRandomColor } from '@/lib/utils';
import { EMOJIS } from '@/lib/constants';
import { FaTelegram } from "react-icons/fa6";
import { useParams } from 'next/navigation';

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function LiveChat({ socket, user, viewersCount, comments, setComments }) {
  const [newComment, setNewComment] = useState('');
  const [showEmojis, setShowEmojis] = useState(false);
  const commentsEndRef = useRef(null);
  const params = useParams();
  console.log("params", params);

  useEffect(() => {
    if (!socket) return;

    const handleNewComment = (comment) => {
      setComments(prev => {
        // Check if comment already exists to prevent duplicates
        const exists = prev.some(c => c._id === comment._id);
        return exists ? prev : [...prev, comment];
      });
    };

    socket.on('newComment', handleNewComment);

    return () => {
      socket.off('newComment', handleNewComment);
    };
  }, [socket, setComments]);

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSubmitComment = async (e) => {
    e.preventDefault();
    if (!newComment.trim() || !user) return;

    try {
      const response = await fetch(`${baseUrl}/api/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: newComment,
          email: user.email,
          fullName: user.fullName
        }),
      });

      const data = await response.json();
      
      if (data.success) {
        setNewComment('');
        setShowEmojis(false);
        
        // Emit the new comment through socket
        if (socket) {
          socket.emit('newComment', data.data);
        }
      }
    } catch (error) {
      console.error('Error submitting comment:', error);
    }
  };

  const addEmoji = (emoji) => {
    setNewComment(prev => prev + emoji);
  };

  return (
    <div className="bg-white rounded-lg font-snig shadow h-[82vh] flex flex-col">
      <div className="p-4 border-b">
        <h2 className="font-semibold">Live Chat</h2>
        {params === "true" && <p className="text-sm text-gray-500">{viewersCount} viewers</p>}
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {comments.map((comment) => (
          <div key={comment._id} className="flex gap-3"> {/* Use comment._id as key */}
            <div className={`flex-shrink-0 w-8 h-8 rounded-full ${getRandomColor()} border border-slate-200 flex items-center justify-center text-white font-luckiest font-normal`}>
              {comment.initials || 'US'}
            </div>
            <div>
              <p className="font-medium">{comment.user?.fullName || 'Anonymous'}</p>
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
          />
          
          <button 
            type="submit" 
            className="text-cyan-500 hover:text-cyan-700"
          >
           <FaTelegram size={30} />
          </button>
        </div>
      </form>
    </div>
  );
}