import { Linkedin, Github } from "lucide-react";
import React from "react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Brand / About */}
          <div>
            <h1 className="text-2xl font-bold">TodoApp ✅</h1>
            <p className="mt-3 text-sm text-gray-200">
              Stay organized and productive. Manage your tasks smartly and
              never miss a deadline.
            </p>
          </div>

          {/* Social */}
          <div className="flex flex-col items-start md:items-end">
            <h2 className="text-lg font-semibold">Follow Us</h2>
            <div className="flex space-x-4 mt-3">
              <a href="https://www.linkedin.com/in/aman-siddiqui-dev" className="hover:text-gray-200"><Linkedin /></a>
              <a href="https://github.com/M-AmanSiddiqui" className="hover:text-gray-200"><Github /></a>
            </div>
          </div>
        </div>

        <hr className="my-6 border-gray-400/30" />

        <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-200">
          <p>© {new Date().getFullYear()} TodoApp. All rights reserved.</p>
          <p>
            Built with <span className="text-pink-400">❤</span> by{" "}
            <a
              href="https://github.com/M-AmanSiddiqui"
              className="hover:text-white font-medium"
            >
              Aman Siddiqui
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
