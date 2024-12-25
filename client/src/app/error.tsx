"use client";

import Container from "@/components/container/Container";
import Link from "next/link";

interface ErrorBoundaryProps {
  error: Error;
  reset: () => void;
}

const ErrorBoundary = ({ error, reset }: ErrorBoundaryProps) => {
  return (
    <main className="w-full bg-gray-900">
      <Container>
        <div
          className="w-full h-screen flex flex-col justify-center items-center 
          gap-5 text-center"
        >
          <p className="font-bold text-emerald-700">There was a problem</p>
          <h1 className="text-xl md:text-5xl font-bold text-white">
            {` OOP's!`} Something went wrong
          </h1>
          <p className="text-gray-400">
            Please try again or contact support if the problem persist.
          </p>
          <div className="flex justify-center items-center flex-wrap gap-5">
            <button
              className="px-5 py-2 rounded-md border-[1px] border-solid text-emerald-500
           border-emerald-600 bg-gray-800 cursor-pointer transition-all duration-300
            hover:bg-gray-900"
              onClick={reset}
            >
              Try again
            </button>
            <Link href="/dashboard">
              <button
                className="px-5 py-2 rounded-md border-[1px] border-solid text-emerald-500
            border-emerald-600 cursor-pointer transition-all duration-300
            hover:bg-gray-800"
              >
                Go home
              </button>
            </Link>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default ErrorBoundary;
