// SET UP A NEWS API SERVER OBJECT
const newsApiServer = ajax("https://newsapi.org/v2", API_KEY);

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

const newsApiFetch = function(word = "xyz") {
  fetch_headlines().then(function(response) {
    headlines = response.articles.filter(
      article =>
        article.urlToImage && article.title && article.url && article.content
    );
    fetch_sources().then(function(response) {
      sources = response.sources;
      fetch_keyword_articles(word).then(function(response) {
        keyword_articles = response.articles;
        if (word === "xyz") {
          render();
        } else {
          renderArticleList(keyword_articles);
        }
      });
    });
  });
};
