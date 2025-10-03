import React, { useState } from "react";
import { Link } from "react-router-dom";
import uberLogo from "../../public/8aa4d1f60de468d00fdce0b58108857c.png";
const UserSignup = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [newUser, setNewUser] = useState({});
  const submitHandler = (e) => {
    e.preventDefault();
    setNewUser({
      fullName: { firstName: firstName, lastName: lastName },
      email,
      password,
    });
    console.log(newUser);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          src={uberLogo}
          className="w-16 object-contain mb-10"
          alt="Uber Logo"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "block";
          }}
        />
        <form
          action=""
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your name</h3>
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="First name"
              value={firstName}
              onChange={(e) => {
                setFirstName(e.target.value);
              }}
              className="rounded w-1/2 px-4 py-2 border  text-lg placeholder:text-base bg-[#eeeeee] "
            />
            <input
              type="text"
              placeholder="Last name"
              value={lastName}
              onChange={(e) => {
                setLastName(e.target.value);
              }}
              className="rounded px-4 w-1/2 py-2 border  text-lg placeholder:text-base bg-[#eeeeee]"
            />
          </div>
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            type="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="email@example.com"
            className="rounded px-4 py-2 border w-full text-lg placeholder:text-base bg-[#eeeeee] mb-6"
          />
          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            type="password"
            required
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            placeholder="password"
            className="rounded px-4 py-2 border w-full text-lg placeholder:text-base bg-[#eeeeee] mb-6"
          />
          <button className="rounded px-4 py-2 font-semibold w-full text-lg text-[#fff]  bg-[#111] mb-3">
            Login
          </button>
        </form>
        <p className="text-center">
          Already have an account?
          <Link to="/login" className="text-blue-600">
            Login here
          </Link>
        </p>
      </div>
      <div>
        <p className="text-[10px] leading-tight">
          By proceeding,you conset to get calls ,WhatsApp or SMS messages,
          including by automated means,from Uber and it's affiliates to the
          number provided
        </p>
      </div>
    </div>
  );
};

export default UserSignup;
