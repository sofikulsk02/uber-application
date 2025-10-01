const userModel = require("../models/user.model");

module.exports.createUser = async ({
  firstname,
  lastname,
  email,
  password,
}) => {
  console.log("Service received:", {
    firstname,
    lastname,
    email,
    password: password ? "***" : undefined,
  });

  if (!firstname || !email || !password) {
    console.log("Validation failed:", {
      firstname: !!firstname,
      lastname: !!lastname,
      email: !!email,
      password: !!password,
    });
    throw new Error("All fields are required");
  }

  const user = await userModel.create({
    fullname: { firstName: firstname, lastName: lastname },
    email,
    password,
  });
  return user;
};
