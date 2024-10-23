import React from "react";
import { Spotlight } from "@/components/ui/spotlight/spotlight";
import Link from "next/link";
import { Button } from "../ui/buttom/button";
import Partners from "./partners/partners";

const Hero = () => {
  return (
    <div className="w-full flex flex-col md:items-center md:pt-[12%] antialiased relative overflow-hidden">
      <Spotlight
        className="-top-40 left-0 md:left-20 md:-top-20"
        fill="var(--spotlight-color)"
      />
      <div className="flex flex-col ju items-center text-center p-4">
        <h1 className="text-4xl md:text-6xl  font-bold text-center bg-clip-text text-transparent bg-gradient-to-tr dark:from-neutral-50 from-neutral-900 to-neutral-400 dark:to-neutral-900 bg-opacity-50">
          Streamline your HR Proceses with
          <br /> Opticare HRMS
        </h1>
        <h2 className="font-sans text-sm  md:text-md md:text-2xl mt-[2%]">
          A comprehensive solution for managing employees, payroll, performance
          and more.
        </h2>
        <p className="text-xs md:text-sm font-sans mb-[3%]">
          HR wasn&apos;t meant to be a pain in the neck, <span className="text-green-400">so why should it be
          now?</span>
        </p>
        <Button variant="outline" className="text-sm md:text-base w-fit m-auto">
          <Link href="/auth/login">Get Started</Link>
        </Button>
      </div>
      <div className="w-full mt-[5%]">
        <Partners />
      </div>
    </div>
  );
};

export default Hero;
