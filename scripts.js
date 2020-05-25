const articles = [{
    id : uuidv4(),
    title : "First Article",
    body : "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec porttitor tellus sapien, quis faucibus quam ultrices ut. Nullam vitae justo odio. Sed vitae nibh at arcu imperdiet aliquam. Maecenas vestibulum viverra porttitor. Phasellus tempus pharetra lacinia. Cras sit amet ultricies ante. Pellentesque lobortis ex risus, pretium convallis nibh fringilla malesuada. Aenean id sodales mauris. Ut ullamcorper accumsan dignissim."
} 
]
const article = articles[0]

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

document.getElementById("article").innerHTML = articles.map(article =>
    `<div>
        <h2>${article.title}</h2>
        <p>${article.body}</p>
    </div>`
    ).join("")