"use client";

import React from "react";
import Image from "next/image";

export default function Partners() {
  const partners = [
    { url: "benz.png", name: "Mercedes-Benz" },
    { url: "jordan.png", name: "Binatone" },
    { url: "delta-plus.png", name: "Delta Plus" },
    { url: "google.png", name: "Google" },
    { url: "hp.png", name: "HP" },
    { url: "nvidea.png", name: "NVIDIA" },
    { url: "samsung.png", name: "Samsung" },
    { url: "shell.png", name: "Shell" },
  ];

  return (
    <div className="w-full bg-gradient-to-r from-neutral-100 to-neutral-200 dark:from-neutral-900 dark:to-neutral-800 py-4">
      <div className="container m-auto">
        <div className="flex justify-between items-center gap-8">
          {partners.map((item, index) => (
            <div
              key={index}
              className="flex items-center justify-center w-16 h-16 "
            >
              <Image
                src={`/partners/${item.url}`}
                alt={`Logo of ${item.name}`}
                width={80}
                height={80}
                className="object-contain filter hover:cursor-pointer grayscale hover:grayscale-0 opacity-90 hover:opacity-100 transition-all duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
