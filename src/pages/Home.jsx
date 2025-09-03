import { CheckCircle, Pencil, Trash2, ListTodo } from "lucide-react";

import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
     

     {/* Hero Section */}
<section className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
  <div className="max-w-7xl mx-auto px-6 text-center">
    <h1 className="text-4xl md:text-6xl font-extrabold">
      Organize Your Life with <span className="text-yellow-300">TodoApp</span> 
    </h1>
    <p className="mt-6 text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
      Manage tasks, set reminders, and track progress all in one beautiful and simple app.
    </p>
    <div className="mt-8 flex justify-center">
      <Link
        to="/todo"
        className="px-6 py-3 rounded-2xl bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
      >
        Get Started
      </Link>
    </div>
  </div>
</section>


      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800">
            What You Can Do with TodoApp
          </h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <CheckCircle className="w-10 h-10 text-green-600 mb-4" />
              <h3 className="text-xl font-semibold">Add Tasks</h3>
              <p className="mt-2 text-gray-600">
                Quickly add tasks with title, description and assign them to
                your account.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <Pencil className="w-10 h-10 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold">Update Tasks</h3>
              <p className="mt-2 text-gray-600">
                Edit tasks anytime to keep your list accurate and updated.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <Trash2 className="w-10 h-10 text-red-600 mb-4" />
              <h3 className="text-xl font-semibold">Delete Tasks</h3>
              <p className="mt-2 text-gray-600">
                Remove completed or unnecessary tasks with a single click.
              </p>
            </div>

            <div className="p-6 bg-white rounded-2xl shadow hover:shadow-lg transition">
              <ListTodo className="w-10 h-10 text-purple-600 mb-4" />
              <h3 className="text-xl font-semibold">View All Tasks</h3>
              <p className="mt-2 text-gray-600">
                Instantly fetch and view your complete task list sorted by
                latest updates.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-indigo-600 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold">
          Ready to stay organized?
        </h2>
        <p className="mt-4 text-lg">
          Sign up now and take full control of your tasks.
        </p>
        <Link
          to="/signup"
          className="mt-6 inline-block px-8 py-3 rounded-2xl bg-yellow-400 text-black font-semibold hover:bg-yellow-500 transition"
        >
          Create Free Account
        </Link>
      </section>

    </div>
  );
}
