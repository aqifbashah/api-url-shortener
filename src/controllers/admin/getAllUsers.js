import pool from "../../database/connection";

async function getAllUsers(req, res) {
  try {
    const authData = req.user;

    // return if user is not admin
    if (authData.role !== "admin") {
      return res.status(403).json({ message: "Not Authorised. Not an admin" });
    }

    const query = `
        SELECT id, username, email, role FROM "Users"
    `;
    const response = await pool.query(query);
    return res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in getAllUsers:", error);
  }
}

export default getAllUsers;
