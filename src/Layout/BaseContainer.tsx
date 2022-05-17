import React from "react";
import { Link } from "react-router-dom";


export default function BaseContainer() {
  return (
    <main className="p-4 flex flex-col items-center justify-center min-h-screen text-left">

      <div className="flex flex-col space-y-2 text-center items-center space-y-4">
        <Link to="/register" className="hover:text-blue-600 text-2xl font-semibold flex flex-row flex-nowrap items-center space-x-2 hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
          </svg>
          <p>
            Register
          </p>
        </Link>

        <p className="normal-case">You have to register first, If you want to get in !</p>
      </div>
    </main>
  )
}