import express from "express";
import fetch from "node-fetch";

const app = express();
const PORT = process.env.PORT || 8080;

const KALSHI_API = "https://api.kalshi.com/trade-api/v2";

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  if (req.method === "OPTIONS") return res.sendStatus(204);
  next();
});

app.get("/*", async (req, res) => {
  const path = req.originalUrl;
  const url = KALSHI_API + path;
  try {
    const r = await fetch(url, { headers: { Accept: "application/json" } });
    const body = await r.text();
    res.status(r.status).set("Content-Type", "application/json").send(body);
  } catch (e) {
    res.status(502).json({ error: String(e) });
  }
});

app.listen(PORT, "0.0.0.0", () =>
  console.log(`Proxy running on ${PORT}`)
);



Commit changes
