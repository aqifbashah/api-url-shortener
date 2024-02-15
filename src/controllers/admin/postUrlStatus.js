import pool from "../../database/connection";

async function postUrlStatus(req, res) {
  try {
    const authData = req.user;

    // return if user is not admin
    if (authData.role !== "admin") {
      return res.status(403).json({ message: "Not Authorised. Not an admin" });
    }

    const reqBody = req.body;
    const values = [reqBody.id, reqBody.status];
    const query = `
        UPDATE "Urls"
        SET status = $2
        WHERE id = $1
    `;
    await pool.query(query, values);
    return res.status(200).json({
      message: `Status of URL with id = ${reqBody.id} has been update to ${reqBody.status}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in postUrlStatus:", error);
  }
}

export default postUrlStatus;
