"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const port = 3000;

app.listen(port, () =>
  console.log(`Example app listening at http://localhost:${port}`)
);

let articles = getSavedArticles();

const filters = {
  searchText: "",
  sortBy: "byEdited, byCreated",
};

renderArticles(articles, filters);

document.querySelector("#create-article").addEventListener("click", (e) => {
  location.assign("compose.html");
});

document.querySelector("#search-text").addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderArticles(articles, filters);
});

document.querySelector("#filter-by").addEventListener("change", (e) => {
  filters.sortBy = e.target.value;
  renderArticles(articles, filters);
});

window.addEventListener("storage", (e) => {
  if (e.key === "articles") {
    articles = JSON.parse(e.newValue);
    renderArticles(articles, filters);
  }
});

document.getElementById("article").innerHTML = articles
  .map(
    (article) =>
      `<article>
    <div>
        <h2>${article.title}</h2>
        <p>${article.body}</p>
    </div>
    </article>`
  )
  .join("");

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
