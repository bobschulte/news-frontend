// DOM ELEMENTS
const navBar = document.querySelector("#navbar");
const publicationsBar = document.querySelector("#bar-publications");
const trendingBar = document.querySelector("#bar-trending");
const primaryPage = document.querySelector("#primary-page");
const searchBar = document.querySelector("#search");

// DATA
let featuredArticleIndex = 0;
let currentArticle;
let currentPublication;
let keyword;

// NOTES
let currentStory;
// getStories() is now available here
// getCurrentStory(id) is now available here
// bookmark(story) is available
// editStory(story) is available
// unbookmark(story) is available

let currentStoryComment;
// getStoryComments() is now available here
// getCurrentStoryComment(id) is now available here
// addStoryComment(storyComment) is now available
// editStoryComment(storyComment) is now available

// FETCH FROM SERVER
newsApiFetch();

// RENDER FUNCTIONS

setInterval(function() {
  featuredArticleIndex < 19
    ? featuredArticleIndex++
    : (featuredArticleIndex = 0);
  render();
}, 5000);

const render = function() {
  // renderTrendingBar()
  renderPublicationsBar();
  renderPrimaryPage();
};

const renderNavBar = function() {
  navBar.innerHTML = "";
  const icon = navBar.appendChild(document.createElement("div"));
  icon.id = "navbar-icon";
  icon.className = "navbar-brand";
  icon.innerText = "NAVBAR ICON HERE";
  icon.addEventListener("click", backToHome);

  //search section of navBar
  searchBar.innerHTML = "";
  const searchForm = searchBar.appendChild(document.createElement("form"));
  const searchInput = searchForm.appendChild(document.createElement("input"));
  searchInput.placeholder = "enter keyword";
  const searchButton = searchForm.appendChild(document.createElement("button"));
  searchButton.innerText = "Search";
  searchButton.addEventListener("click", function(e) {
    e.preventDefault();
    if (searchInput.value) {
      keyword = searchInput.value;
      searchInput.value = "";
      if (keyword === "alan") {
        alert("READ THE ERROR.");
      }
      newsApiFetch(keyword);
      primaryPage.innerHTML = "";
    }
  });
};

const renderPublicationsBar = function() {
  publicationsBar.innerHTML = "";
  sources.forEach(function(source) {
    renderPublication(source);
  });
};

const renderPublication = function(source) {
  const publication = publicationsBar.appendChild(document.createElement("p"));
  publication.innerText = `${source.name}`;
  publication.addEventListener("click", function() {
    alert(`${source.name} was clicked!`);
  });
};

// const renderTrendingBar = function() {
//
// }

const renderPrimaryPage = function() {
  primaryPage.innerHTML = "";
  if (currentArticle) {
    renderArticle(currentArticle);
  } else if (keyword) {
    //to take care of keyword situation
    renderArticleList(keyword_articles);
  } else {
    renderFeature();
    renderArticleList(headlines);
  }
};

const renderArticle = function(article) {
  keyword = null;
  primaryPage.innerHTML = `
  <h1>${configureTitle.call(article)}</h1>
  <img class="feature-img" src="${
    article.urlToImage
  }" alt="generic-pic" width="832px">
  <div>${article.content.slice(0, 260)}</div>
  <p>To read full article, click
  <a href=${article.url} target="_blank">this link</a>.</p>
  `;
  renderBackButton(primaryPage);
};

const renderFeature = function() {
  const featuredArticle = headlines[featuredArticleIndex];
  const featureDiv = primaryPage.appendChild(document.createElement("div"));
  featureDiv.innerHTML = `
    <img class="feature-img" src="${
      featuredArticle.urlToImage
    }" alt="generic-pic" width="832px">
    <h1>${configureTitle.call(featuredArticle)}</h1>
  `;
  featureDiv.addEventListener("click", function() {
    currentArticle = featuredArticle;
    render();
  });
};

const renderArticleList = function(articles) {
  const articleList = primaryPage
    .appendChild(document.createElement("div"))
    .appendChild(document.createElement("ul"));
  articleList.setAttribute("class", "list-unstyled");
  articles.forEach(function(article) {
    renderArticleListItem(article, articleList);
  });
};

const renderArticleListItem = function(article, articleList) {
  const articleListItem = articleList.appendChild(document.createElement("li"));
  articleListItem.setAttribute("class", "media");
  articleListItem.innerHTML = `
      <img class="mr-1" src="${
        article.urlToImage
      } " alt="generic-pic" width="96px">
    <div class="media-body">
      <h5 class="mt-0 mb-1">${configureTitle.call(article)}</h5>
    </div>
   `;
  articleListItem.addEventListener("click", function() {
    currentArticle = article;
    render();
  });
};

const renderBackButton = function(domElement) {
  const backButton = domElement.appendChild(document.createElement("button"));
  backButton.innerText = "Back to Home Page";
  backButton.addEventListener("click", backToHome);
};

// HELPER FUNCTIONS
const backToHome = function() {
  currentArticle = null;
  render();
};

//only want these rendered once
renderNavBar();
