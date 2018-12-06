//will turn these into one function later

const root = "https://newsapi.org/v2/";
const headlines_path = "top-headlines?language=en&";
const sources_path = "sources?country=us&language=en&";
// const everything_path = `everything?q=${keyword}&`;

let headlines;
let sources;
let keyword_articles;

const fetch_headlines = function() {
  return fetch(`${root}${headlines_path}${API_KEY}`, {
    headers: {
      authorization: `Bearer ${API_KEY}`
    }
  }).then(function(response) {
    return response.json();
  });
};

const fetch_sources = function() {
  return fetch(`${root}${sources_path}${API_KEY}`, {
    headers: {
      authorization: `Bearer ${API_KEY}`
    }
  }).then(function(response) {
    return response.json();
  });
};

const fetch_keyword_articles = function(word = "xyz") {
  return fetch(`${root}everything?q=${word}&${API_KEY}`, {
    headers: {
      authorization: `Bearer ${API_KEY}`
    }
  }).then(function(response) {
    return response.json();
  });
};

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
