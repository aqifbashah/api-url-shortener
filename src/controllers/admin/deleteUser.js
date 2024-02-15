import pool from "../../database/connection";

async function deleteUser(req, res) {
  try {
    const authData = req.user;
    const userId = req.params.id;

    // return if user is not admin
    if (authData.role !== "admin") {
      return res.status(403).json({ message: "Not Authorised. Not an admin" });
    }

    const value = [userId];
    const query = `
        DELETE FROM "Users" WHERE id = $1
    `;
    await pool.query(query, value);
    return res.status(200).json({
      message: `User with id = ${userId} has been deleted successfully`,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in deleteUser:", error);
  }
}

export default deleteUser;
