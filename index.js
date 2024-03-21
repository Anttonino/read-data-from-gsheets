const express = require("express");
const { google } = require("googleapis");

const app = express();

async function authorize() {
  const auth = new google.auth.GoogleAuth({
    keyFile: "",
    scopes: "https://www.googleapis.com/auth/spreadsheets",
  });
  const client = await auth.getClient();
  const googleSheets = google.sheets({ version: "v4", auth: client });

  const spreadsheetId = "";

  return {
    auth,
    client,
    googleSheets,
    spreadsheetId,
  };
}

app.get("/metadata", async (req, res) => {
  const { auth, client, googleSheets, spreadsheetId } = await authorize();
  const metadata = await googleSheets.spreadsheets.get({
    auth,
    spreadsheetId,
  });
  res.send(metadata.data);
});

app.get("/getRows", async (req, res) => {
  const { auth, client, googleSheets, spreadsheetId } = await authorize();
  const getRows = await googleSheets.spreadsheets.values.get({
    auth,
    spreadsheetId,
    range: "Sheet1!A1:B1",
  });
  res.send(getRows.data);
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
