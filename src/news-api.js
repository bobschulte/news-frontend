// SET UP A NEWS API SERVER OBJECT
const newsApiServer = ajax("https://newsapi.org/v2", API_KEY);

// NEWS API PATHS
const headlinesPath = "/top-headlines?language=en&";
const sourcesPath = "/sources?country=us&language=en&";
const keywordPath = "/everything?q=";

// DATA
let headlines;
let sources;
let keyword_articles;

// API FETCHES
const fetch_headlines = function() {
  return newsApiServer.get(`${headlinesPath}${API_KEY}`)
}

const fetch_sources = function() {
  return newsApiServer.get(`${sourcesPath}${API_KEY}`)
}

const fetch_keyword_articles = function(word = "xyz") {
  return newsApiServer.get(`${keywordPath}${word}&${API_KEY}`)
}

const newsApiFetch = function(word = "xyz") {
  fetch_headlines().then(function(response) {
    headlines = response.articles.filter(article => article.urlToImage);
    fetch_sources().then(function(response) {
      sources = response.sources;
      fetch_keyword_articles(word).then(function(response) {
        keyword_articles = response.articles;
        if (word === "xyz") {
          render();
        } else {
          renderKeyList();
        }
      });
    });
  });
};
