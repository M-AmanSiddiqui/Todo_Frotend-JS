import React, { useState, useEffect } from "react";
import { Plus } from "lucide-react";
import TaskCard from "./TaskCard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // ✅ Required CSS

export default function Todo() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState(null);
  const [userId, setUserId] = useState(sessionStorage.getItem("id"));

  // Check if user is logged in
  useEffect(() => {
    const id = sessionStorage.getItem("id");
    setUserId(id);
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    if (!userId) {
      toast.error("❌ Please login first to view your tasks!");
      return;
    }
    try {
      const base = import.meta.env.VITE_API_BASE || "";
      const response = await axios.get(`${base}/api/v2/getTasks/${userId}`);
      if (response.data.list) {
        setTasks(response.data.list);
      } else {
        setTasks([]);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
      toast.error("❌ Failed to fetch tasks!");
    }
  };

  useEffect(() => {
    if (userId) fetchTasks();
  }, [userId]);

  // Add / Update Task
  const addTask = async () => {
    if (!userId) {
      toast.error("❌ Please login first to add tasks!");
      return;
    }
    if (!title.trim() || !body.trim()) return;
    if (title.length > 20) {
      toast.error("❌ Title must be 20 characters or less!");
      return;
    }

    try {
      if (editId) {
        // Update
        const base = import.meta.env.VITE_API_BASE || "";
        await axios.put(`${base}/api/v2/updateTask/${editId}`, { title, body });

        setTasks((prev) =>
          prev.map((task) =>
            task._id === editId ? { ...task, title, body } : task
          )
        );

        toast.success("✅ Task updated successfully!");
        setEditId(null);
      } else {
        // Add
        const base = import.meta.env.VITE_API_BASE || "";
        const response = await axios.post(`${base}/api/v2/addTask`, {
          title,
          body,
          id: userId,
        });

        if (response.data.list) {
          setTasks((prev) => [...prev, response.data.list]);
        }

        toast.success("✅ Task added successfully!");
      }

      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Error adding/updating task:", error);
      toast.error("❌ Something went wrong!");
    }
  };

  // Edit Task
  const editTask = (task) => {
    setTitle(task.title);
    setBody(task.body);
    setEditId(task._id);
  };

  // Delete Task
  const deleteTask = async (taskId) => {
    if (!userId) {
      toast.error("❌ Please login first to delete tasks!");
      return;
    }
    try {
      const base = import.meta.env.VITE_API_BASE || "";
      await axios.delete(
        `${base}/api/v2/deleteTask/${taskId}/${userId}`
      );

      setTasks((prev) => prev.filter((task) => task._id !== taskId));

      toast.info("🗑️ Task deleted successfully!");
    } catch (error) {
      console.error("Error deleting task:", error);
      toast.error("❌ Error deleting task!");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-indigo-600 to-purple-600 flex flex-col items-center px-4 py-10">
      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} theme="colored" />

      {/* Input Section */}
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl p-8 mb-10">
        {!userId ? (
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-600 mb-4">Please Login First</h2>
            <p className="text-gray-500 mb-6">You need to be logged in to add and manage your tasks.</p>
            <a 
              href="/signin" 
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-xl font-semibold hover:bg-indigo-700 transition"
            >
              Go to Login
            </a>
          </div>
        ) : (
        <>
        <h1 className="text-3xl font-extrabold text-center text-indigo-600 mb-6">
          Todo App
        </h1>

        {/* Inputs */}
        <div className="grid grid-cols-1 gap-4 mb-6">
          <input
            type="text"
            maxLength="20"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter Title..."
            className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
          />
          <textarea
            rows="4"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Enter Body..."
            className="px-4 py-3 rounded-xl border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:outline-none resize-none"
          />
        </div>
        <button
          onClick={addTask}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition"
        >
          <Plus /> {editId ? "Update Task" : "Add Task"}
        </button>
        </>
        )}
      </div>

      {/* Task List */}
      {userId && (
        <div className="w-full max-w-5xl rounded-2xl shadow-2xl p-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-start">
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                editTask={editTask}
                deleteTask={() => deleteTask(task._id)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}