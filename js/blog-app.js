"use strict"

let articles = getSavedArticles()

const filters = {
    searchText: "",
    sortBy: "byEdited, byCreated"
}

renderArticles(articles, filters)

document.querySelector("#create-article").addEventListener("click", (e) => {
    location.assign("compose.html")
})


document.querySelector("#search-text").addEventListener("input", (e) => {
    filters.searchText = e.target.value
    renderArticles(articles, filters)
})

document.querySelector("#filter-by").addEventListener("change", (e) => {
    filters.sortBy = e.target.value
    renderArticles(articles, filters)
})

window.addEventListener("storage", (e) => {
    if (e.key === "articles") {
        articles = JSON.parse(e.newValue)
        renderArticles(articles, filters)
        }
    })

document.getElementById("article").innerHTML = articles.map(article =>
    `<article>
    <div>
        <h2>${article.title}</h2>
        <p>${article.body}</p>
    </div>
    </article>`
    ).join("")

const navSlide = () => {
    const burger = document.querySelector(".burger");
    const nav = document.querySelector(".nav-links");
    const navLinks = document.querySelectorAll(".nav-links li");

    burger.addEventListener("click", () => {
        //Toggle Nav
        nav.classList.toggle("nav-active");

        // Animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation) {
                link.style.animation = "";
            } else {
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7}s`;
            }
        });
        //Burger Animation
        burger.classList.toggle("toggle");
    });

}

navSlide();

let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resize-animation-stopper");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resize-animation-stopper");
  }, 400);
});

document.addEventListener("DOMContentLoaded", function() {
    const yearSpan = document.querySelector(".copyright-year");
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;
});