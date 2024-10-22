"use client";

import React from "react";
import Image from "next/image";

const Partners = () => {
  const partners = [
    {url:"github.png"},
    {url:"police-hospital.png"},
    {url:"zapier.png"},
    {url:"paystack.png"},
    {url:"lapaz-hospital.png"},
  ];

  return (
    <div className="max-w-full px-[1%] mx-auto  py-2">
      <div className="grid grid-cols-4 lg:grid-cols-8 gap-8">
        {partners.map((item, index) => (
          <div
            key={index}
            className={`flex items-center justify-center rounded-lg ${
              item.bg ? "bg-opacity-40 " + item.bg : ""
            }`}
          >
            <img
              src={`/partners/${item.url}`}
              alt={`Logo of ${item.url}`}
              className="h-20 w-20 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Partners;
