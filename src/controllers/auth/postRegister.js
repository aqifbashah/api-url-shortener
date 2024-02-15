import pool from "../../database/connection";
import bcrypt from "bcrypt";
import validator from "email-validator";

async function postRegister(req, res) {
  try {
    const reqBody = req.body;

    // check if username, email and password are provided
    if (!reqBody.email || !reqBody.username || !reqBody.password) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // validating email address
    const validatedEmail = validator.validate(reqBody.email);
    console.log(validatedEmail);

    // if email address not validated, will return 400
    if (!validatedEmail) {
      return res
        .status(400)
        .json({ message: "Please enter correct email address" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(reqBody.password, salt);

    const query = `
        INSERT INTO "Users" (username, email, "password", role)
        VALUES($1, $2, $3, $4);
    `;

    const values = [
      reqBody.username,
      reqBody.email,
      hashedPassword,
      reqBody.role,
    ];
    await pool.query(query, values);
    const apiResponse = {
      message: "User created successfully",
    };
    res.status(200).json(apiResponse);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in postRegister:", error);
  }
}

export default postRegister;
