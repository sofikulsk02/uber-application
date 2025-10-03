import React, { useState } from "react";
import { Link } from "react-router-dom";
const CaptainSignup = () => {
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
    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
  };
  return (
    <div className="py-5 px-5 h-screen flex flex-col justify-between">
      <div>
        <img
          src="https://toppng.com/uploads/preview/uber-logo-png-uber-logo-2018-11563110096yltfjpzwbm.png"
          className="w-16 object-contain mb-2"
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
          <h3 className="text-lg w-full font-medium mb-2">
            What's our Captain's name{" "}
          </h3>
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
          <h3 className="text-lg font-medium mb-2">
            What's our Captain's email
          </h3>
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
          <Link to="/captain-login" className="text-blue-600">
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

export default CaptainSignup;
