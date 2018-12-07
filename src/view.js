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
  keyword = null;
  selectedSource = null;

  render();
  featureTimer = setInterval(function() {
    featuredArticleIndex < headlines.length - 1
      ? featuredArticleIndex++
      : (featuredArticleIndex = 0);
    render();
  }, 5000);
};

const backToResults = function() {
  if (keyword) {
    currentView = "keyword search";
  } else {
    currentView = "source search";
  }
  currentStory = null;
  render();
};

const renderFeature = function() {
  const featuredArticle = headlines[featuredArticleIndex];
  const featureDiv = primaryPage.appendChild(document.createElement("div"));
  featureDiv.innerHTML = `
    <img class="feature-img" src="${
      featuredArticle.urlToImage
    }" alt="generic-pic" width="832px">
    <h1 class="headline">${featuredArticle.title}</h1>
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
  backButton.innerText = "Back";
  backButton.className = "btn btn-dark";

  if (keyword || selectedSource) {
    backButton.addEventListener("click", backToResults);
  } else {
    backButton.addEventListener("click", backToHome);
  }
};

const renderBookmarkButton = function(domElement) {
  const bookmarkButton = domElement.appendChild(
    document.createElement("button")
  );
  bookmarkButton.className = "btn btn-dark";
  if (currentStory.id) {
    bookmarkButton.innerHTML = "Unbookmark Article";
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
    <button class="btn btn-dark" type="submit">Add Comment</button>
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
  const storyTitle = list.appendChild(document.createElement("button"));
  storyTitle.className = "list-group-item";
  storyTitle.dataset.toggle = "list";
  storyTitle.innerHTML = story.title;
  storyTitle.addEventListener("click", function() {
    currentView = "article";
    currentStory = story;
    render();
  });
};

const renderPublication = function(source) {
  const publication = publicationsBar.appendChild(
    document.createElement("button")
  );
  publication.className = "list-group-item";
  publication.dataset.toggle = "list";
  publication.innerText = `${source.name}`;
  publication.addEventListener("click", function() {
    currentView = "source search";
    selectedSource = source.name;
    keyword = null;
    sourceFetch(selectedSource);
  });
};

const renderSearchBar = function() {
  searchBar.innerHTML = "";
  const searchForm = searchBar.appendChild(document.createElement("form"));
  const searchInput = searchForm.appendChild(document.createElement("input"));
  searchInput.placeholder = "Enter Keyword";
  renderSearchButton(searchInput, searchForm);
};

const renderSearchButton = function(searchInput, searchForm) {
  const searchButton = searchForm.appendChild(document.createElement("button"));
  searchButton.innerText = "Search";
  searchButton.className = "btn btn-dark";
  searchButton.addEventListener("click", function(e) {
    e.preventDefault();
    source = null;
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
