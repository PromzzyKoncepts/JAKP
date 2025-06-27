"use client";
import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";
import VideoPlayer from "@/components/VideoPlayer";
import LiveChat from "@/components/LiveChat";
import UserForm from "@/components/UserForm";
import { LANGUAGES } from "@/lib/constants";
import LanguageSelector from "@/components/LanguageSelector";
import {
  WhatsappShareButton,
  WhatsappIcon,
  TelegramShareButton,
  TelegramIcon,
  TwitterShareButton,
  TwitterIcon,
  EmailIcon,
  EmailShareButton,
} from "react-share";
import Image from "next/image";
import ImageCarousel from "@/components/Tab";

const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

export default function LiveStreamPage() {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const [user, setUser] = useState(null);
  const [streamData, setStreamData] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [socket, setSocket] = useState(null);
  const [viewersCount, setViewersCount] = useState(0);
  const [comments, setComments] = useState([]);
  const videoRef = useRef(null);

  useEffect(() => {
    // Check localStorage for user data
    const savedUser = localStorage.getItem("liveStreamUser");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }

    // Fetch streaming data
    const fetchStreamData = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/stream/streaming-data`);
        const data = await response.json();
        setStreamData(data.data);
      } catch (error) {
        console.error("Error fetching stream data:", error);
      }
    };

    // Fetch initial comments
    const fetchComments = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/comments`);
        const data = await response.json();
        if (data.success) {
          setComments(data.data);
        }
      } catch (error) {
        console.error("Error fetching comments:", error);
      }
    };

    fetchStreamData();
    fetchComments();

    // Initialize socket connection
    const socketInstance = io(baseUrl, {
      transports: ["websocket"],
      reconnection: true,
      reconnectionAttempts: 5,
      reconnectionDelay: 1000,
    });
    setSocket(socketInstance);

    socketInstance.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    socketInstance.on("viewersUpdate", (count) => {
      setViewersCount(count);
    });

    socketInstance.on("newComment", (comment) => {
      setComments((prev) => [...prev, comment]);
    });

    socketInstance.on("connect_error", (err) => {
      console.error("Socket connection error:", err);
    });

    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
    // if (videoRef.current) {
    //   videoRef.current.src = streamData.streamingLinks[language];
    // }
  };

  const handleUserSubmit = (userData) => {
    setUser(userData);
    localStorage.setItem("liveStreamUser", JSON.stringify(userData));
    fetch(`${baseUrl}/api/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName: userData.fullName,
        email: userData.email,
        participantsCount: userData.participantsCount,
      }),
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url(/bg.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
      className="min-h-screen bg-gray-100"
    >
      {!user && <UserForm onSubmit={handleUserSubmit} />}

      <ImageCarousel />
      <div className="container mx-auto px-5 md:px-16 py-6  md:pb-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-2/3">
            {streamData?.streamingLinks && (
              <VideoPlayer
                ref={videoRef}
                src={streamData?.streamingLinks[selectedLanguage]}
              />
            )}

            <div className="mt-4 bg-amber-200 p-4 rounded-lg shadow flex flex-col md:flex-row justify-between items-center gap-2 md:items-start">
              <div>
                <small className="font-snig text-sm text-cyan-700">
                  {streamData?.intro[selectedLanguage]}
                </small>
                <h1 className="md:text-3xl text-amber-700 text-2xl font-bold font-luckiest">
                  {streamData?.descriptions[selectedLanguage]}
                </h1>

                <div className="mt-4 flex flex-col font-snig gap-   items-start">
                  Streaming in:
                  <LanguageSelector
                    languages={LANGUAGES}
                    selectedLanguage={selectedLanguage}
                    onChange={handleLanguageChange}
                  />
                </div>
              </div>
              <div className="flex flex-col items-center">
                <p className="text-sm text-gray-600">Share live streaming</p>
                <div>
                  <div className="flex items-center py-2 gap-3">
                    {/* WhatsApp Share */}
                    <WhatsappShareButton
                      url={shareUrl}
                      title="WhatsApp"
                      className=""
                    >
                      <WhatsappIcon size={40} round={true} />
                    </WhatsappShareButton>

                    <TelegramShareButton url={shareUrl}>
                      <TelegramIcon size={40} round={true} />
                    </TelegramShareButton>

                    <a target="_blank" href={"https://kingschat.online"}>
                      <Image
                        src="/kingschat.webp"
                        alt="Share"
                        width={500}
                        className="w-15"
                        height={500}
                      />
                    </a>
                    <TwitterShareButton url={shareUrl}>
                      <TwitterIcon size={40} round={true} />
                    </TwitterShareButton>

                    <EmailShareButton
                      subject="Invitation to Join Bible Reading Fiesta!"
                      body="Dearly Esteemed, you have been challenged to participate in Bible Reading FIesta today, Click on the link to join now!"
                      separator=" "
                      url={shareUrl}
                    >
                      <EmailIcon size={40} round={true} />
                    </EmailShareButton>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:w-1/3">
            <LiveChat
              socket={socket}
              user={user}
              viewersCount={viewersCount}
              comments={comments}
              setComments={setComments}
            />

            <div className="mt-2 font-snig text-lg flex flex-col bg-white p-4 rounded-lg shadow-md">
              <button className="hover:translate-y-[-5px] ease-in-out duration-300 cursor-pointer bg-gradient-to-t from-lime-600 to-lime-400 text-white p-3 rounded-lg hover:animate-pulse">Upload Participation picture</button>
              <button className="mt-2 hover:translate-y-[-5px] ease-in-out duration-300 cursor-pointer bg-gradient-to-t from-purple-600 to-purple-400 text-white p-3 rounded-lg hover:animate-pulse">Click to say a prayer of Salvation</button>
              <button className="mt-2 hover:translate-y-[-5px] ease-in-out duration-300 cursor-pointer bg-gradient-to-t from-cyan-600 to-cyan-400 text-white p-3 rounded-lg hover:animate-pulse">Sponsor Lovetoons TV</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
