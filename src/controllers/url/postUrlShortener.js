import pool from "../../database/connection";
import shortId from "shortid";

async function postUrlShortener(req, res) {
  try {
    const reqBody = req.body;
    const authData = req.user;
    const urlLong = reqBody.url;

    // genarating short code for short url
    shortId.characters(
      "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@"
    );
    const shortCode = shortId.generate();

    const values = [urlLong, shortCode, authData.id];
    const query = `
        INSERT INTO "Urls" (url_long, url_short, user_id) VALUES ($1, $2, $3)
    `;

    // Insert the URL into the database
    await pool.query(query, values);
    res.json({
      longUrl: urlLong,
      shortUrl: `http://localhost:3000/${shortCode}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in postUrlShortener:", error);
  }
}

export default postUrlShortener;
