// DOM ELEMENTS
const navBar = document.querySelector("#navbar");
const searchBar = document.querySelector("#search");
const publicationsBar = document.querySelector("#bar-publications");
const trendingBar = document.querySelector("#bar-trending");
const primaryPage = document.querySelector("#primary-page");

const viewChanger = view();

// DATA
let featuredArticleIndex = 0;
let currentPublication;
let keyword;
let selectedSourcesource;
let currentView = "home";
let currentStory;
let featureTimer;

featureTimer = setInterval(function() {
  featuredArticleIndex < headlines.length - 1
    ? featuredArticleIndex++
    : (featuredArticleIndex = 0);
  render();
}, 5000);

// FETCH FROM SERVER
newsApiFetch();

// RENDER FUNCTIONS
const renderNavBar = function() {
  navBar.innerHTML = "";
  const icon = navBar.appendChild(document.createElement("div"));
  icon.id = "navbar-icon";
  icon.className = "navbar-brand";
  icon.innerText = "INDB";
  icon.addEventListener("click", backToHome);
  renderSearchBar();
};

//only want these rendered once
renderNavBar();

const render = function() {
  getStories().then(function() {
    renderTrendingBar();
    renderPublicationsBar();
    renderPrimaryPage();
  });
};

const renderTrendingBar = function() {
  trendingBar.innerHTML = "My Articles: ";
  const trendingList = trendingBar.appendChild(document.createElement("div"));
  trendingList.className = "list-group list-group-flush"
  Story.all.forEach(function(story) {
    renderTrendingStory(story, trendingList);
  });
};

const renderPublicationsBar = function() {
  publicationsBar.innerHTML = "Sources: ";
  sources.forEach(function(source) {
    renderPublication(source);
  });
};

const renderPrimaryPage = function() {
  primaryPage.innerHTML = "";
  switch (currentView) {
    case "home":
      viewChanger.renderHomeView(headlines);
      break;
    case "article":
      viewChanger.renderArticleView(currentStory);
      clearInterval(featureTimer);
      break;
    case "keyword search":
      viewChanger.renderSearchResultsView(keyword_articles);
      clearInterval(featureTimer);
      break;
    case "source search":
      viewChanger.renderSearchResultsView(sources_articles);
      clearInterval(featureTimer);
      break;
  }
};
