import pool from "../../database/connection";

async function postUrlEdit(req, res) {
  try {
    const urlId = req.params.urlId;
    const authData = req.user;
    const reqBody = req.body;

    //check if url id is inserted
    if (!urlId) {
      return res(401).json({ message: "Please insert URL id" });
    }

    // check if URL Exist
    const queryCheckUrl = `
        SELECT * FROM "Urls" WHERE id =  $1
    `;
    const checkUrl = await pool.query(queryCheckUrl, [urlId]);
    if (checkUrl.rowCount === 0) {
      return res(404).json({ message: `Url id = ${urlId} not found` });
    }

    const url = checkUrl.rows[0];

    // Check if the user is the owner or an admin
    if (authData.id !== url.user_id && authData.role !== "admin") {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this URL" });
    }

    // Edit URL
    const values = [reqBody.newUrl, urlId];
    const queryDeleteUrl = `
        UPDATE "Urls" SET url_long = $1 WHERE id = $2
    `;
    await pool.query(queryDeleteUrl, values);
    return res.status(200).json({
      message: `URL with id ${urlId} has been edited to ${reqBody.newUrl}`,
    });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in editUrl:", error);
  }
}

export default postUrlEdit;
