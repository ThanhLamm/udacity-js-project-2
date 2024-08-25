require("dotenv").config();
const express = require("express");
const fetch = require("node-fetch");
const path = require("path");

const app = express();
const port = 3000;

const { API_DOMAIN, API_KEY } = process.env;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/", express.static(path.join(__dirname, "../public")));

app.get("/rovers", async (req, res) => {
  try {
    const response = await fetch(`${API_DOMAIN}/rovers?api_key=${API_KEY}`);
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error("An error occurred while retrieving rover data:", error);
    res.status(500).send("Internal server error!!!");
  }
});

app.get("/rovers/:name", async (req, res) => {
  try {
    const { name } = req.params;
    const { max_date: earthDate } = req.query; // Destructuring query parameters
    const response = await fetch(
      `${API_DOMAIN}/rovers/${name}/photos?earth_date=${earthDate}&api_key=${API_KEY}`
    );
    const data = await response.json();
    res.send(data);
  } catch (error) {
    console.error("An error occurred while retrieving images from the rover:", error);
    res.status(500).send("Internal server error!!!");
  }
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
