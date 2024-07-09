'use client'
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import Link from "next/link";
import React from "react";
export function GetStartedButton({ router }: { router: AppRouterInstance }) {
  return (
    <div
      className="spacer bg-dark_gray flex justify-center items-center flex-col"
      data-aos="fade-up"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-pink-400 rounded-xl blur-md opacity-50"></div>
        <div className="relative bg-dark_gray rounded-3xl p-8 flex flex-col items-center">
          <h1 className="text-xl lg:text-4xl font-bold text-white">
            Ready to experience the future of file storage?
          </h1>
          <button
            className="bg-pink-400 mt-16 text-3xl text-dark_gray hover:text-white p-4 px-16 rounded-lg transition-all duration-200"
            onClick={() => router.push("/register")}
          >
            Get Started
          </button>
          <Link href={"https://discord.gg/HNF7G2VnxR"} className="mt-8">
            Meet us at discord
          </Link>
        </div>
      </div>
    </div>
  );
}
