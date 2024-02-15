import pool from "../../database/connection";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

async function postLogin(req, res) {
  try {
    const reqBody = req.body;

    // check if email exists in database
    const query = `
        SELECT * FROM "Users" WHERE username = $1;
        `;
    const value = [reqBody.username];
    const response = await pool.query(query, value);

    // if username not found, return 404
    if (response.rowCount === 0) {
      return res.status(404).json({ message: "Username not found" });
    }

    // if email found, check if password matches
    // check the match by using bcrypt.compare()
    const isPasswordCorrect = await bcrypt.compare(
      reqBody.password,
      response.rows[0].password
    );
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: "Password incorrect" });
    }

    // if password matches, create a token using jsonwebtoken
    const userData = {
      id: response.rows[0].id,
      username: response.rows[0].username,
      email: response.rows[0].email,
      role: response.rows[0].role,
    };
    const token = jwt.sign(userData, "definitelySecured");

    // if password matches, return user object
    const apiResponse = {
      message: "Login successful",
      user: {
        id: response.rows[0].id,
        username: response.rows[0].username,
        email: response.rows[0].email,
        role: response.rows[0].role,
      },
      token: token,
    };
    res.status(200).json(apiResponse);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in postLogin:", error);
  }
}

export default postLogin;
