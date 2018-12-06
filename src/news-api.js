// SET UP A NEWS API SERVER OBJECT
const newsApiServer = ajax("https://newsapi.org/v2", API_KEY);

const filterFunc = function(articles) {
  return articles.filter(
    article =>
      article.urlToImage && article.title && article.url && article.content
  );
};
// DATA
let headlines;
let sources;
let keyword_articles;

// API FETCHES
const fetch_headlines = function() {
  return newsApiServer.get(`/top-headlines?language=en&${API_KEY}`);
};

const fetch_sources = function() {
  return newsApiServer.get(`/sources?country=us&language=en&${API_KEY}`);
};

const fetch_keyword_articles = function(word = "xyz") {
  return newsApiServer.get(`/everything?q=${word}&${API_KEY}`);
};

const fetch_sources_articles = function(news_source = "xyz") {
  return newsApiServer.get(`/everything?sources=${news_source}&${API_KEY}`);
};

const newsApiFetch = function(word = "xyz", news_source = "xyz") {
  fetch_headlines().then(function(response) {
    headlines = filterFunc(response.articles);
    fetch_sources().then(function(response) {
      sources = response.sources;
      fetch_keyword_articles(word).then(function(response) {
        keyword_articles = filterFunc(response.articles);
        fetch_sources_articles(news_source).then(function(response) {
          sources_articles = filterFunc(response.articles);
          render();
        });
      });
    });
  });
};
