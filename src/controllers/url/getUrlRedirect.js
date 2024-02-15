import pool from "../../database/connection";

async function getUrlRedirect(req, res) {
  try {
    const shortCode = req.params.shortCode;

    const queryCheckStatus = `
        SELECT status FROM "Urls" WHERE url_short = $1
    `;
    const statusCheck = await pool.query(queryCheckStatus, [shortCode]);

    if (statusCheck.rows[0].status !== "active") {
      return res.status(404).json({ message: "URL is not active" });
    }

    const query = `
        UPDATE "Urls"
        SET clicks = clicks + 1
        WHERE url_short = $1
        RETURNING url_long
    `;
    const response = await pool.query(query, [shortCode]);

    // If short code not found, return 404
    if (response.rows.length === 0) {
      return res.status(404).json({ message: "Short URL not found" });
    }

    // Redirect to the original URL
    const originalUrl = response.rows[0].url_long;
    res.redirect(originalUrl);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in getUrlRedirect:", error);
  }
}

export default getUrlRedirect;
