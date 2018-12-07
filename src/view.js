const view = function() {
  return {
    renderHomeView(articles) {
      renderFeature();
      renderArticleList(articles);
    },
    renderArticleView(article) {
      renderArticle(article);
    },
    renderSearchResultsView(articles) {
      renderArticleList(articles);
    }
  };
};

const backToHome = function() {
  currentView = "home";
  currentStory = null;
  render();
  featureTimer = setInterval(function() {
    featuredArticleIndex < headlines.length - 1
      ? featuredArticleIndex++
      : (featuredArticleIndex = 0);
    render();
  }, 5000);
};

const renderFeature = function() {
  const featuredArticle = headlines[featuredArticleIndex];
  const featureDiv = primaryPage.appendChild(document.createElement("div"));
  featureDiv.innerHTML = `
    <img class="feature-img" src="${
      featuredArticle.urlToImage
    }" alt="generic-pic" width="832px">
    <h1>${featuredArticle.title}</h1>
        `;
  featureDiv.addEventListener("click", function() {
    currentView = "article";
    currentStory = featuredArticle;
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
    <h5 class="mt-0 mb-1">${article.title}</h5>
    </div>
    `;
  articleListItem.addEventListener("click", function() {
    currentView = "article";
    currentStory = article;
    render();
  });
};

const renderArticle = function(article) {
  Story.all.find(function(storyObject) {
    if (storyObject.url === article.url) {
      currentStory = storyObject;
      article = storyObject;
    }
  });
  keyword = null;
  primaryPage.innerHTML = `
    <h1>${article.title}</h1>
    <img class="feature-img" src="${
      article.urlToImage
    }" alt="generic-pic" width="832px">
    <div>${article.content.slice(0, 260)}</div>
    <p>To read full article, click
    <a href=${article.url} target="_blank">this link</a>.</p>
    `;
  renderBookmarkButton(primaryPage);
  renderBackButton(primaryPage);
  if (article.id) {
    renderCommentSection(article);
  }
};

const renderBackButton = function(domElement) {
  const backButton = domElement.appendChild(document.createElement("button"));
  backButton.innerText = "Back to Home Page";
  backButton.addEventListener("click", backToHome);
};

const renderBookmarkButton = function(domElement) {
  const bookmarkButton = domElement.appendChild(
    document.createElement("button")
  );
  if (currentStory.id) {
    bookmarkButton.innerText = "Unbookmark Article";
    bookmarkButton.addEventListener("click", function(e) {
      unbookmark(currentStory).then(function() {
        backToHome();
        render();
      });
    });
  } else {
    bookmarkButton.innerText = "Bookmark Article";
    bookmarkButton.addEventListener("click", function(e) {
      bookmark(currentStory).then(function() {
        getCurrentStory(currentStory.id);
        render();
      });
    });
  }
};

const renderCommentSection = function(story) {
  renderCommentForm(story);
  renderComments(story);
};

const renderCommentForm = function(story) {
  const form = primaryPage.appendChild(document.createElement("form"));
  form.innerHTML = `
    <br/>
    <input id="comment-input" placeholder="Enter Comment Here" type="text">
    <button type="submit">Add Comment</button>
  `;
  form.addEventListener("submit", function(e) {
    e.preventDefault();
    const commentInput = document.querySelector("#comment-input");
    const commentText = commentInput.value;
    story.comments.push({ description: commentText });
    commentInput.value = "";
    editStory(story.id, {
      title: story.title,
      content: story.content,
      url: story.url,
      urlToImage: story.urlToImage,
      comments_attributes: [{ description: commentText }]
    }).then(render);
  });
};

const renderComments = function(story) {
  const commentList = primaryPage.appendChild(document.createElement("ul"));
  story.comments.forEach(function(comment) {
    const commentItem = commentList.appendChild(document.createElement("li"));
    commentItem.innerText = `${comment.description}`;
  });
};

const renderTrendingStory = function(story, list) {
  const storyTitle = list.appendChild(document.createElement("li"));
  storyTitle.innerHTML = story.title;
  storyTitle.addEventListener("click", function() {
    currentView = "article";
    currentStory = story;
    render();
  });
};

const renderPublication = function(source) {
  const publication = publicationsBar.appendChild(document.createElement("p"));
  publication.innerText = `${source.name}`;
  publication.addEventListener("click", function() {
    currentView = "source search";
    sourceFetch(source.name);
  });
};

const renderSearchBar = function() {
  searchBar.innerHTML = "";
  const searchForm = searchBar.appendChild(document.createElement("form"));
  const searchInput = searchForm.appendChild(document.createElement("input"));
  searchInput.placeholder = "enter keyword";
  renderSearchButton(searchInput, searchForm);
};

const renderSearchButton = function(searchInput, searchForm) {
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
      currentView = "keyword search";
      currentStory = null;
      searchFetch(keyword);
    }
  });
};
