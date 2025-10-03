import React from "react";
import uberLogo from "../../public/8aa4d1f60de468d00fdce0b58108857c.png";
import { Link } from "react-router-dom";
const Start = () => {
  return (
    <div>
      <div className="bg-cover bg-center bg-[url(https://images.unsplash.com/photo-1641101528546-3e8e47c0cc5f?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)] h-screen pt-8  w-full flex justify-between flex-col bg-red-400">
        <img
          src={uberLogo}
          className="w-16 ml-8 object-contain"
          alt="Uber Logo"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "block";
          }}
        />
        <h1 className="text-white text-4xl font-bold hidden">uber</h1>

        <div className="bg-white py-4 px-4 pb-6">
          <h2 className="font-bold text-3xl">Get Started with uber</h2>
          <Link
            to="/login"
            className="w-full flex items-center justify-center bg-black text-white py-3 rounded mt-5"
          >
            Continue
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Start;
