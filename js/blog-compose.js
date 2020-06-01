"use strict"

const titleElement = document.querySelector("#article-title")
const bodyElement = document.querySelector("#article-body")
const removeElement = document.querySelector("#remove-article")
const dateElement = document.querySelector("#last-edited")
const articleElement = document.querySelector("#article")

const articleId = location.hash.substring(1)
let articles = getSavedArticles()
let article = articles.find((article) => article.id === articleId)

// if (!article) {
//     location.assign("../index.html")
// }

titleElement.value = article.title
bodyElement.value = article.body
dateElement.textContent = generateLastEdited(article.updatedAt)

document.querySelector("#submit-article").addEventListener("click", (e) => {
    const id = uuidv4()
    const timestamp = moment().valueOf()
    
    articles.push({
        id: id,
        title: "",
        body: "",
        createdAt: timestamp,
        updatedAt: timestamp
    })
    
    
    saveArticles(articles)
    location.assign("index.html")
})

titleElement.addEventListener("input", (e) => {
    article.title = e.target.value
    article.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(article.updatedAt)
    saveArticles(articles)

})

bodyElement.addEventListener("input", (e) => {
    article.body = e.target.value
    article.updatedAt = moment().valueOf()
    dateElement.textContent = generateLastEdited(article.updatedAt)
    saveArticles(articles)
})

removeElement.addEventListener("click", (e) => {
    removeArticle(article.id)
    saveArticles(articles)
    location.assign("index.html")
})

window.addEventListener("storage", (e) => {
    if(e.key === "articles"){
        JSON.parse(e.newValue)
        article = articles.find((article) => article.id === articleId)
        if (!article) {
            location.assign("index.html")
        }
        titleElement.value = article.title
        bodyElement.value = article.body
        dateElement.textContent = generateLastEdited(article.updatedAt)
    }
})