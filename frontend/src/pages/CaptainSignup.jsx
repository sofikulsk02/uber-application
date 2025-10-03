import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CaptainDataContext } from "../context/CaptainConext";
const CaptainSignup = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const { setCaptain } = React.useContext(CaptainDataContext);

  const submitHandler = async (e) => {
    e.preventDefault();
    const captainData = {
      fullname: { firstname: firstName, lastname: lastName },
      email,
      password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: parseInt(vehicleCapacity),
        vehicleType: vehicleType,
      },
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/register`,
        captainData
      );

      if (response.status === 200 || response.status === 201) {
        const data = response.data;
        setCaptain(data.captain);
        localStorage.setItem("token", data.token);
        console.log("Captain registered successfully:", data);
        console.log("Navigating to /captain-home...");
        navigate("/captain-home");
      } else {
        console.log("Unexpected status code:", response.status);
        alert(
          "Registration completed but unexpected response. Please try logging in."
        );
      }
    } catch (error) {
      console.error("Captain registration error:", error.response?.data);
      if (error.response?.data?.errors) {
        // Handle validation errors
        error.response.data.errors.forEach((err) => {
          alert(`${err.path}: ${err.msg}`);
        });
      } else if (error.response?.data?.message) {
        alert(error.response.data.message);
      } else {
        alert("Registration failed. Please try again.");
      }
      return; // Don't clear form on error
    }

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
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
          <h3 className="text-lg font-medium mb-2">Vehicle Information</h3>
          <div className="flex gap-4 mb-6">
            <input
              type="text"
              placeholder="Vehicle Color"
              value={vehicleColor}
              onChange={(e) => setVehicleColor(e.target.value)}
              required
              className="rounded w-1/2 px-4 py-2 border text-lg placeholder:text-base bg-[#eeeeee]"
            />
            <input
              type="text"
              placeholder="Vehicle Plate"
              value={vehiclePlate}
              onChange={(e) => setVehiclePlate(e.target.value)}
              required
              className="rounded px-4 w-1/2 py-2 border text-lg placeholder:text-base bg-[#eeeeee]"
            />
          </div>
          <div className="flex gap-4 mb-6">
            <input
              type="number"
              placeholder="Vehicle Capacity"
              value={vehicleCapacity}
              onChange={(e) => setVehicleCapacity(e.target.value)}
              required
              min="1"
              className="rounded w-1/2 px-4 py-2 border text-lg placeholder:text-base bg-[#eeeeee]"
            />
            <select
              value={vehicleType}
              onChange={(e) => setVehicleType(e.target.value)}
              required
              className="rounded px-4 w-1/2 py-2 border text-lg bg-[#eeeeee]"
            >
              <option value="" disabled>
                Select Vehicle Type
              </option>
              <option value="car">Car</option>
              <option value="auto">Auto</option>
              <option value="motorcycle">Motorcycle</option>
            </select>
          </div>
          <button className="rounded px-4 py-2 font-semibold w-full text-lg text-[#fff]  bg-[#111] mb-3">
            Create Captain Account
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
