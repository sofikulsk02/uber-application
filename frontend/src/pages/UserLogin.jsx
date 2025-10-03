import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserDataContext } from "../context/UserContext";
import axios from "axios";

const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    const loginData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/users/login`,
        loginData
      );

      if (response.status === 200) {
        const data = response.data;
        setUser(data.user);
        localStorage.setItem("token", data.token);
        navigate("/home");
      }
    } catch (error) {
      console.error("Login error:", error.response?.data);
      if (error.response?.data?.errors) {
        // Handle validation errors
        error.response.data.errors.forEach((err) => {
          alert(`${err.path}: ${err.msg}`);
        });
      } else if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Login failed. Please check your credentials.");
      }
      return; // Don't clear form on error
    }

    setEmail("");
    setPassword("");
  };
  return (
    <div className="p-7 h-screen flex flex-col justify-between">
      <div>
        <img
          src="/8aa4d1f60de468d00fdce0b58108857c.png"
          className="w-16 object-contain mb-10"
          alt="Uber Logo"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div className="w-16 h-10 bg-black text-white text-xs font-bold items-center justify-center mb-10 hidden">
          uber
        </div>
        <form
          action=""
          onSubmit={(e) => {
            submitHandler(e);
          }}
        >
          <h3 className="text-lg font-medium mb-2">What's your email</h3>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            placeholder="email@example.com"
            className="rounded px-4 py-2 border w-full text-lg placeholder:text-base bg-[#eeeeee] mb-7"
          />
          <h3 className="text-lg font-medium mb-2">Enter password</h3>
          <input
            type="password"
            required
            placeholder="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            className="rounded px-4 py-2 border w-full text-lg placeholder:text-base bg-[#eeeeee] mb-7"
          />
          <button className="rounded px-4 py-2 font-semibold w-full text-lg text-[#fff]  bg-[#111] mb-3">
            Login
          </button>
        </form>
        <p className="text-center">
          new here?
          <Link to="/signup" className="text-blue-600">
            Create new Account
          </Link>
        </p>
      </div>
      <div>
        <Link
          to="/captain-login"
          className="rounded px-4 py-2 font-semibold w-full text-lg text-[#fff]  bg-[#10b461] mb-5 flex items-center justify-center"
        >
          Sign in as Captain
        </Link>
      </div>
    </div>
  );
};

export default UserLogin;
