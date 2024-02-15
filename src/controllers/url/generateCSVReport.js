import pool from "../../database/connection";
import fs from "fs";

async function generateCSVReport(req, res) {
  try {
    const authData = req.user;
    const query = `
        SELECT id, url_long, url_short, clicks, status FROM "Urls"
        WHERE user_id = $1
    `;
    const userData = await pool.query(query, [authData.id]);

    // Format the result as CSV
    let csvHeader = "id,url_long,url_short,clicks,status\n"; // Header row
    userData.rows.forEach((row) => {
      csvHeader += `${row.id},${row.url_long},${row.url_short},${row.clicks},${row.status}\n`;
    });

    // Write the CSV data to a file
    fs.writeFileSync(`${authData.username}_report.csv`, csvHeader);
    console.log("CSV report generated successfully");
    return res
      .status(200)
      .json({ message: "CSV report generated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.error("Error in generateCSVReport:", error);
  }
}

export default generateCSVReport;
