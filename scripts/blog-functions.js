"use strict";

// Read existing articles from localStorage
const getSavedArticles = () => {
  const articlesJSON = localStorage.getItem("articles");

  try {
    return articlesJSON ? JSON.parse(articlesJSON) : [];
  } catch (e) {
    return [];
  }
};

// Save the articles to localStorage
const saveArticles = (articles) => {
  localStorage.setItem("articles", JSON.stringify(articles));
};

//remove a article from the list
const removeArticle = (id) => {
  const articleIndex = articles.findIndex((article) => article.id === id);

  if (articleIndex > -1) {
    articles.splice(articleIndex, 1);
  }
};

// Generate DOM structure for a article
const generateArticleDOM = (article) => {
  const articleEl = document.createElement("div");
  const textEl = document.createElement("a");
  const button = document.createElement("button");

  // Set up the remove article button
  button.textContent = "x";
  articleEl.appendChild(button);
  button.addEventListener("click", () => {
    removeArticle(article.id);
    saveArticles(articles);
    renderArticles(articles, filters);
  });

  // Setup the article title text
  if (article.title.length > 0) {
    textEl.textContent = article.title;
  } else {
    textEl.textContent = "Unnamed article";
  }
  textEl.setAttribute("href", `/edit.html#${article.id}`);
  articleEl.appendChild(textEl);

  return articleEl;
};

// Sort your articles by one of three ways
const sortArticles = (articles, sortBy) => {
  if (sortBy === "byEdited") {
    return articles.sort(function (a, b) {
      if (a.updatedAt > b.updatedAt) {
        return -1;
      } else if (a.updatedAt < b.updatedAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "byCreated") {
    return articles.sort((a, b) => {
      if (a.createdAt > b.createdAt) {
        return -1;
      } else if (a.createdAt < b.createdAt) {
        return 1;
      } else {
        return 0;
      }
    });
  } else if (sortBy === "alphabetical") {
    return articles.sort((a, b) => {
      if (a.title.toLowerCase() < b.title.toLowerCase()) {
        return -1;
      } else if (a.title.toLowerCase() > b.title.toLowerCase()) {
        return 1;
      } else {
        return 0;
      }
    });
  } else {
    return articles;
  }
};

// Render application articles
const renderArticles = (articles, filters) => {
  articles = sortArticles(articles, filters.sortBy);
  const filteredArticles = articles.filter((article) =>
    article.title.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  document.querySelector("#articles").innerHTML = "";

  filteredArticles.forEach((article) => {
    const articleEl = generateArticleDOM(article);
    document.querySelector("#articles").appendChild(articleEl);
  });
};

// Generate the last edited message
const generateLastEdited = (timestamp) =>
  `Last edited ${moment(timestamp).fromNow()}`;
