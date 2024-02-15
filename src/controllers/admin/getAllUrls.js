import pool from "../../database/connection";

async function getAllUrls(req, res) {
  try {
    const authData = req.user;

    // return if user is not admin
    if (authData.role !== "admin") {
      return res.status(403).json({ message: "Not Authorised. Not an admin" });
    }

    const query = `
        SELECT u.url_long, u.url_short, u.clicks, u.status, us.username 
        FROM "Urls" u
        JOIN "Users" us ON u.user_id = us.id
    `;
    const response = await pool.query(query);
    return res.status(200).json(response.rows);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in getAllUsers:", error);
  }
}

export default getAllUrls;
