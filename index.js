"use strict";
const express = require("express");
const uuid = require("uuid");
const moment = require("moment");
const navbar = require("./scripts/navbar");
const articles = require("./routes/api/articles");

const app = express();

app.get("/", (req, res) => {
  res.send("Home Page");
});

app.get("/users", (req, res) => {
  res.send("Users Page");
});

const port = 3000;

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
});

document.addEventListener("DOMContentLoaded", function () {
  const yearSpan = document.querySelector(".copyright-year");
  const currentYear = new Date().getFullYear();
  yearSpan.textContent = currentYear;
});
