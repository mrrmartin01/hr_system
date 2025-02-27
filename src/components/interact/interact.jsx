"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "@/components/ui/button";
const Interact = () => {
  const router = useRouter();
  return (
    <div className="relative flex flex-col md:flex-row items-center justify-between min-h-screen overflow-hidden">
      {/* Beaming lights background */}
      <div className="absolute inset-0 z-0 animate-spin [animation-duration:20s]">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-400 rounded-full filter blur-3xl bg-opacity-20 dark:bg-opacity-10 [animation-duration:5s] animate-pulse"></div>
        <div className="absolute top-3/4 right-1/2 w-64 h-64 bg-yellow-400 rounded-full filter blur-3xl bg-opacity-20 dark:bg-opacity-10 [animation-duration:8s] animate-pulse"></div>
        <div className="absolute top-3/2 right-1/4 w-64 h-64 bg-purple-500 rounded-full filter blur-3xl bg-opacity-20 dark:bg-opacity-10 [animation-duration:11s] animate-pulse"></div>
        <div className="absolute top-1/2 left-1/2 w-80 h-80 bg-emerald-400 rounded-full filter blur-3xl bg-opacity-20 dark:bg-opacity-10 [animation-duration:14s] animate-pulse"></div>
      </div>

      {/* Frosted glass effect */}
      <div className="absolute inset-0 z-10 backdrop-filter dark:backdrop-blur-lg  bg-red-200 backdrop-blur-sm  bg-opacity-10"></div>

      {/* Content */}
      <div className="relative z-20 flex flex-col md:flex-row items-center justify-between w-full h-full p-8 font-mono">
        <div className="w-full md:w-1/2 space-y-8">
          <h1 className="text-5xl md:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-yellow-500">
            Try out the OptiCare Overtime Manager
          </h1>
          <p className="text-xl md:text-xl  leading-snug font-light font-sans">
            Effortlessly track, manage, and optimize overtime hours with our
            advanced tracking system. Boost productivity and ensure fair
            compensation for your and your team.
          </p>
          <p className="text-sm md:text-sm tracking-tight leading-snug font-light font-sans">
            Don&apos;t be left behind like Anita who is raged about not being
            paid fairly for her overtime <span className="text-xl">🌚</span>{" "}
            <br />
            Choose OptiCare and let out Overtime Manager do its magic and ensure your team is paid fairly
            for their overtime.
          </p>
          <Button
            variant="outline"
            onClick={() => router.push("/auth/signin")}
            className="px-8 py-4 bg-transparent border border-cyan-600 rounded-full text-cyan-600 hover:bg-cyan-600 hover:text-white"
          >
            Start Managing Overtime
          </Button>
        </div>
        <div className="w-full md:w-1/2 mt-12 md:mt-0">
          <div className="relative w-full h-[500px]">
            <Image
              src="/dummies/wall.jpg"
              alt="OptiCare Overtime Management Interface"
              layout="fill"
              objectFit="cover"
              className="rounded-3xl shadow-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent rounded-3xl"></div>
            <div className="absolute bottom-8 left-8 right-8 text-center text-white">
              <p className="text-lg font-semibold">
                Anita Vlodink
              </p>
              <p className="text-sm opacity-75">
                Raged • Under-paid • Overworked
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interact;
