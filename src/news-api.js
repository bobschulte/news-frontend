//will turn these into one function later

const root = "https://newsapi.org/v2/";
const headlines_path = "top-headlines?language=en&";
const sources_path = "sources?&";
const everything_path = "everything?";

let headlines
let sources
let keyword_articles
let keyword = "cat";

const fetch_headlines = function() {
  return fetch(`https://newsapi.org/v2/top-headlines?language=en&${API_KEY}`, {
    headers: {
      authorization: `Bearer ${API_KEY}`
    }
  })
    .then(function(response) {
      return response.json();
    })
};

const fetch_sources = function() {
  return fetch(`https://newsapi.org/v2/sources?country=us&language=en&${API_KEY}`, {
    headers: {
      authorization: `Bearer ${API_KEY}`
    }
  })
    .then(function(response) {
      return response.json();
    })
};

const fetch_keyword_articles = function(keyword) {
  return fetch(`https://newsapi.org/v2/everything?q=${keyword}&${API_KEY}`, {
    headers: {
      authorization: `Bearer ${API_KEY}`
    }
  })
    .then(function(response) {
      return response.json();
    })
};

const newsApiFetch = function() {
  fetch_headlines()
    .then(function(response) {
      headlines = response.articles;
      fetch_sources()
        .then(function(response) {
          sources = response.sources;
          fetch_keyword_articles()
            .then(function(response) {
              keyword_articles = response.articles;
              render()
            })
        })
    })
}
