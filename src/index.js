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

// FETCH FROM SERVER
newsApiFetch();

// RENDER FUNCTIONS

// setInterval(function() {
//   featuredArticleIndex < 19
//     ? featuredArticleIndex++
//     : (featuredArticleIndex = 0);
//   render();
// }, 10000);

const render = function() {
  renderNavBar();
  renderPublicationsBar();
  // renderTrendingBar()
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
    keyword = searchInput.value;
    if (keyword === "alan") {
      alert("READ THE ERROR.");
    }
    newsApiFetch(keyword);
    console.log(keyword_articles);
    // renderKeyList()
    searchInput.innerText = "";
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
  } else {
    renderFeature();
    renderArticleList();
  }
};

const renderArticle = function(article) {
  primaryPage.innerHTML = `
  <h1>${configureTitle.call(article)}</h1>
  <img class="feature-img" src="${
    article.urlToImage
  }" alt="generic-pic" width="832px">
  <div>${article.content}</div>
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

const renderArticleList = function() {
  const articleList = primaryPage
    .appendChild(document.createElement("div"))
    .appendChild(document.createElement("ul"));
  articleList.setAttribute("class", "list-unstyled");
  headlines.forEach(function(article) {
    renderArticleListItem(article, articleList);
  });
};
//key list stuff begin
const renderKeyList = function() {
  primaryPage.innerHTML = "";
  const keyList = primaryPage
    .appendChild(document.createElement("div"))
    .appendChild(document.createElement("ul"));
  keyList.setAttribute("class", "list-unstyled");
  keyword_articles.forEach(function(article) {
    renderKeyListItem(article, keyList);
  });
};

const renderKeyListItem = function(article, keyList) {
  const keyListItem = keyList.appendChild(document.createElement("li"));
  keyListItem.setAttribute("class", "media");
  keyListItem.innerHTML = `
    <img class="mr-1" src="${
      article.urlToImage
    }" alt="generic-pic" width="96px">
    <div class="media-body">
      <h5 class="mt-0 mb-1">${configureTitle.call(article)}</h5>
    </div>
   `;
  keyListItem.addEventListener("click", function() {
    renderArticle(article);
  });
};
//key list stuff end
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
const resetCurrentArticle = function() {
  currentArticle = null;
};

const backToHome = function() {
  resetCurrentArticle();
  render();
};
