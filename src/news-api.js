//will turn these into one function later

const root = "https://newsapi.org/v2/";
const headlines_path = "top-headlines?language=en&";
const sources_path = "sources?&";
const everything_path = "everything?";

let headlines;
let sources;
let keyword_articles;
let keyword = "cat"; //get this from event listener in nav bar

const fetch_headlines = function() {
  fetch(`https://newsapi.org/v2/top-headlines?language=en&${API_KEY}`, {
    headers: {
      authorization: `Bearer ${API_KEY}`
    }
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      headlines = response.articles;
      console.log(headlines);
    });
};

const fetch_sources = function() {
  fetch(`https://newsapi.org/v2/sources?country=us&language=en&${API_KEY}`, {
    headers: {
      authorization: `Bearer ${API_KEY}`
    }
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      sources = response.sources;
      console.log(sources);
    });
};

const fetch_keyword_articles = function() {
  fetch(`https://newsapi.org/v2/everything?q=${keyword}&${API_KEY}`, {
    headers: {
      authorization: `Bearer ${API_KEY}`
    }
  })
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      keyword_articles = response.articles;
      console.log(keyword_articles);
    });
};

fetch_headlines();
fetch_sources();
fetch_keyword_articles();
