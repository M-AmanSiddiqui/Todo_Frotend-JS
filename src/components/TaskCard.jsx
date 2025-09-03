import React, { useState } from "react";
import { Pencil, Trash2 } from "lucide-react";

export default function TaskCard({ task, editTask, deleteTask }) {
  const [isExpanded, setIsExpanded] = useState(false); // har card ka apna expand state
  const charLimit = 120;
  const isLongText = task.body.length > charLimit;
  const bodyText = isExpanded ? task.body : task.body.slice(0, charLimit);

  return (
    <div className="relative group bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 border border-indigo-100 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 ease-in-out overflow-hidden flex flex-col">
      
      {/* Glow Border */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 opacity-0 group-hover:opacity-100 blur-md transition duration-500 -z-10"></div>

      {/* Title */}
      <h3 className="text-xl font-bold text-gray-800 group-hover:text-indigo-600 transition">
        {task.title}
      </h3>

      {/* Body */}
      <p className="text-gray-600 mt-3 leading-relaxed whitespace-pre-line break-words">
        {bodyText}
        {isLongText && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="ml-2 text-indigo-600 font-semibold hover:underline hover:text-purple-600 transition"
          >
            {isExpanded ? "Read Less" : "Read More"}
          </button>
        )}
      </p>

      {/* Buttons */}
      <div className="flex justify-end gap-3 mt-6 mt-auto">
        <button
          onClick={() => editTask(task)}
          className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-yellow-400 to-yellow-500 text-white font-medium shadow-md hover:from-yellow-500 hover:to-yellow-600 hover:shadow-lg transition"
        >
          <Pencil className="w-4 h-4" /> Edit
        </button>
       <button
  onClick={() => deleteTask(task._id)} // <- change here
  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-medium shadow-md hover:from-red-600 hover:to-red-700 hover:shadow-lg transition"
>
  <Trash2 className="w-4 h-4" /> Delete
</button>

      </div>
    </div>
  );
}
