import pool from "../../database/connection";

async function getOwnUrls(req, res) {
  try {
    const authData = req.user;
    const value = [authData.id];
    const query = `
        SELECT * FROM "Urls" WHERE user_id=$1
    `;
    const response = await pool.query(query, value);

    if (response.rows.length === 0) {
      return res.status(404).json({ message: "URLs NOT FOUND" });
    }

    // Construct an array to hold the URLs data
    const urls = response.rows.map((row) => ({
      id: row.id,
      long_url: row.url_long,
      short_url: `http://localhost/${row.url_short}`,
      clicks: row.clicks,
      status: row.status,
    }));

    // Send the array of URLs in the response
    return res.status(200).json(urls);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in getOwnUrls:", error);
  }
}

export default getOwnUrls;
