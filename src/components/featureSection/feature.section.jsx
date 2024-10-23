"use client";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import {
  IconBriefcase,
  IconCalendarClock,
  IconFileCheck,
  IconSchool,
} from "@tabler/icons-react";
import { ChartLineIcon, DollarSign, TicketCheck, UserIcon } from "lucide-react";

export function FeaturesSection() {
  const features = [
    {
      title: "Employee Management",
      description:
        "Securely manage employee data and ensure compliance with relevant regulations.",
      icon: <UserIcon />,
    },
    {
      title: "Attendance Tracking",
      description:
        "Efficiently track employee attendance and generate reports.",
      icon: <TicketCheck />,
    },
    {
      title: "Payroll Management",
      description:
        "Automate payroll processing and generate accurate pay stubs.",
      icon: <DollarSign />,
    },
    {
      title: "Performance Tracking",
      description: "Monitor and analyze employee performance metrics.",
      icon: <ChartLineIcon />,
    },
    {
      title: "Leave Management",
      description: "Efficiently manage leave requests and approvals.",
      icon: <IconCalendarClock />,
    },
    {
      title: "Compliance Management",
      description:
        "Ensure compliance with relevant regulations and manage HR documents.",
      icon: <IconFileCheck />,
    },
    {
      title: "Recruitment Management",
      description:
        "Streamline the recruitment process and manage candidate data.",
      icon: <IconBriefcase />,
    },
    {
      title: "Training and Development",
      description: "Manage training programs and track employee progress.",
      icon: <IconSchool />,
    },
  ];
  return (
    <>
    <motion.h2 
     initial={{ opacity: 0, y: -100 }}
     whileInView={{ opacity: 1, y: 0 }}
     transition={{ duration: 0.5 }}
     className="text-4xl font-sans md:text-5xl font-bold text-center">
        Our Features
      </motion.h2>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-[2%] relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
    </>
  );
}

const Feature = ({ title, description, icon, index }) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}
    >
      {index < 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 dark:bg-neutral-700 group-hover/feature:bg-blue-500 transition-all duration-200 origin-center" />
        <span className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100">
          {title}
        </span>
      </div>
      <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10">
        {description}
      </p>
    </div>
  );
};
