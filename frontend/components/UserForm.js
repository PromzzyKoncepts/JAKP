// app/live/components/UserForm.jsx
"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function UserForm({ onSubmit }) {
  const [scale, setScale] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    participantsCount: 1,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "participantsCount" ? parseInt(value) || 1 : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  useEffect(() => {
    if (scale) {
      const timer = setTimeout(() => {
        setScale(false);
      }, 500); // Match this with your animation duration

      return () => clearTimeout(timer);
    }

  }, [scale]);

  return (
    <div
      onClick={() => setScale(!scale)}
      className="fixed inset-0 bg-[#864f145c] backdrop-blur flex items-center justify-center z-50 font-snig"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className={`bg-white ${
          scale && "animate-shake animate-once animate-ease-in-out "
        }  rounded-lg max-w-3xl border-2 border-yellow-500 shadow-lg w-[85%] flex  items-stretch`}
      >
        <Image
          src="/gafl.jpg"
          alt="intro"
          width={300}
          height={300}
          className="w-full object-cover hidden md:block rounded-l-lg"
        />
        <div className="px-10 py-5 w-full">
          <div className="mb-5">
            <h2 className="text-2xl md:text-3xl font-luckiest text-cyan-700 whitespace-nowrap font-bold  text-center">
              Participant Form
            </h2>
            <small className="flex justify-center">
              Kindly fill the form below accurately!{" "}
            </small>
          </div>
          <form onSubmit={handleSubmit} className="space-y-4 ">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                autoFocus
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring focus:ring-cyan-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                How many people are watching with you?
              </label>
              <input
                type="number"
                name="participantsCount"
                min="1"
                value={formData.participantsCount}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Join Stream
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
