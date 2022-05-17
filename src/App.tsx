import React from "react";
import { RouteHandler } from "./route/RouteHandler";

export default function App() {
  return (
    <div className="App h-full">
      {/* <div className="p-6 items-center justify-center">
        <h1 className="text-blue-400 font-extrabold">Hello World!</h1>
        <p className="tracking-widest">This is my first React App.</p>
      </div> */}
      <RouteHandler />
    </div>
  );
}
