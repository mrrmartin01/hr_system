"use client";
import { SigninForm } from "@/components/forms/auth";
import React from "react";

const Signin = () => {
  return (
    <div className="flex items-center justify-center min-h-[100vh] dark:bg-black bg-white font-mono relative overflow-hidden">
      {/* Subtle futuristic background gradient */}
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-slate-200 via-white to-gray-300 dark:from-gray-900 dark:via-black dark:to-gray-800 opacity-90"></div>

      {/* Main login form container with minimalistic design */}
      <div className="relative z-10 max-w-md w-full mx-auto md:rounded-xl p-8 bg-gradient-to-br from-slate-300 to-gray-400 dark:from-gray-900 dark:to-black  border border-slate-400 dark:border-gray-700 backdrop-blur-lg">
        <h2 className="bg-clip-text text-transparent drop-shadow-2xl bg-gradient-to-b from-black/80 to-black/10 dark:from-white/80 dark:to-white/10 font-sans text-3xl tracking-wide leading-tight">
          Welcome Back
        </h2>
        <p className="font-sans text-slate-600 dark:text-slate-400 text-base mt-2 mb-6">
          Sign in to continue to your account.
        </p>
        <SigninForm />
      </div>

      {/* Subtle futuristic glows */}
      <div className="absolute top-0 left-0 w-72 h-72 dark:bg-white bg-slate-700 rounded-full opacity-20 dark:opacity-5 blur-2xl [animation-duration:3s] animate-bounce"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 dark:bg-white bg-gray-500 rounded-full opacity-20 dark:opacity-5 blur-2xl [animation-duration:3s] animate-bounce"></div>
    </div>
  );
};

export default Signin;
