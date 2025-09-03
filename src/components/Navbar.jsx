import { useEffect, useState } from "react";
import React from "react";
import { Link } from "react-router-dom"; 
import { LogOut, PlusSquare } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { authActions } from "../store";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();

  const logout = () => {
    sessionStorage.removeItem("id");
    dispatch(authActions.logout());
    toast.success("✅ Logged out successfully!");
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      {/* Toastify container (for notifications) */}
      <ToastContainer position="top-right" autoClose={2000} />

      <header
        className={`sticky top-0 z-50 transition-shadow ${
          scrolled ? "shadow-lg shadow-black/5 dark:shadow-black/30" : ""
        }`}
      >
        <div className="h-[2px] w-full bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400" />

        <nav className="relative mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-3 sm:px-6 lg:px-8 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-zinc-900/40 bg-white/80 dark:bg-zinc-900/60 rounded-b-2xl border-b border-white/60 dark:border-white/10">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-cyan-400 text-white shadow-md shadow-fuchsia-500/30">
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <span className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-white">
              TodoApp
            </span>
          </Link>

          {/* Right side buttons */}
          <div className="flex items-center gap-2">
            <Link
              to="/todo"
              className="hidden sm:inline-flex block text-center rounded-xl bg-yellow-500 px-4 py-2 text-sm font-medium text-white shadow-md shadow-yellow-400/30"
            >
              <PlusSquare size={18} className="inline mr-1" /> Add Todo
            </Link>

            {!isLoggedIn && (
              <>
                <Link
                  to="/signup"
                  className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-green-500/30 hover:brightness-110 active:brightness-95 transition"
                >
                  Signup
                </Link>

                <Link
                  to="/signin"
                  className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-indigo-500/30 hover:brightness-110 active:brightness-95 transition"
                >
                  Login
                </Link>
              </>
            )}

            {isLoggedIn && (
              <button
                onClick={logout}
                className="hidden sm:inline-flex items-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-md shadow-red-500/30 hover:brightness-110 active:brightness-95 transition"
              >
                <LogOut size={18} /> Logout
              </button>
            )}

            {/* Mobile Menu Toggle */}
            <button
              className="grid h-10 w-10 place-items-center rounded-xl border border-zinc-200/70 dark:border-zinc-700/70 bg-white/70 dark:bg-zinc-800/60 md:hidden"
              aria-label="Toggle menu"
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                {open ? (
                  <path d="M18 6L6 18M6 6l12 12" />
                ) : (
                  <>
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </nav>

        {/* Mobile Menu */}
        <div
          className={`md:hidden border-b border-white/60 dark:border-white/10 bg-white/85 dark:bg-zinc-900/70 backdrop-blur transition-[grid-template-rows,opacity] duration-300 ${
            open
              ? "grid grid-rows-[1fr] opacity-100"
              : "grid grid-rows-[0fr] opacity-0"
          }`}
        >
          <div className="overflow-hidden">
            <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
              <div className="flex flex-col gap-2">
                <Link
                  to="/todo"
                  className="block text-center rounded-xl bg-yellow-500 px-4 py-2 text-sm font-medium text-white shadow-md shadow-yellow-400/30"
                >
                  <PlusSquare size={18} className="inline mr-1" /> Add Todo
                </Link>

                {!isLoggedIn && (
                  <>
                    <Link
                      to="/signup"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-green-500/30"
                    >
                      Signup
                    </Link>

                    <Link
                      to="/signin"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-indigo-500/30"
                    >
                      Login
                    </Link>
                  </>
                )}

                {isLoggedIn && (
                  <button
                    onClick={logout}
                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-red-500 px-4 py-2 text-sm font-medium text-white shadow-md shadow-red-500/30"
                  >
                    <LogOut size={18} /> Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
}
