const view = function () {
    return {
        renderHomeView(articles) {
            renderFeature()
            renderArticleList(articles)
        },
        renderArticleView(article) {
            renderArticle(article)
        },
        renderSearchResultsView(articles) {
            renderArticleList(articles)
        }
    }
}

const backToHome = function () {
    currentView = 'home'
    currentStory = null;
    render();
};

const renderFeature = function () {
    const featuredArticle = headlines[featuredArticleIndex];
    const featureDiv = primaryPage.appendChild(document.createElement("div"));
    featureDiv.innerHTML = `
    <img class="feature-img" src="${
            featuredArticle.urlToImage
            }" alt="generic-pic" width="832px">
    <h1>${configureTitle.call(featuredArticle)}</h1>
        `;
    featureDiv.addEventListener("click", function () {
        currentView = 'article'
        currentStory = featuredArticle;
        render();
    });
};

const renderArticleList = function (articles) {
    const articleList = primaryPage
        .appendChild(document.createElement("div"))
        .appendChild(document.createElement("ul"));
    articleList.setAttribute("class", "list-unstyled");
    articles.forEach(function (article) {
        renderArticleListItem(article, articleList);
    });
};

const renderArticleListItem = function (article, articleList) {
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
    articleListItem.addEventListener("click", function () {
        currentView = 'article'
        currentStory = article;
        render();
    });
};

const renderArticle = function (article) {
    keyword = null;
    primaryPage.innerHTML = `
    <h1>${configureTitle.call(article)}</h1>
    <img class="feature-img" src="${
        article.urlToImage
        }" alt="generic-pic" width="832px">
  <div>${article.content.slice(0, 260)}</div>
  <p>To read full article, click
  <a href=${article.url} target="_blank">this link</a>.</p>
  `;
    renderBookmarkButton(primaryPage);
    renderBackButton(primaryPage);
};

const renderBackButton = function (domElement) {
    const backButton = domElement.appendChild(document.createElement("button"));
    backButton.innerText = "Back to Home Page";
    backButton.addEventListener("click", backToHome);
};

const renderBookmarkButton = function (domElement) {
    const bookmarkButton = domElement.appendChild(
        document.createElement("button")
    );
    bookmarkButton.innerText = "Bookmark Article";
    bookmarkButton.addEventListener("click", function (e) {
        bookmark(currentStory).then(function () {
            alert("Story bookmarked!");
            getCurrentStory(currentStory.id);
            render();
        });
    });
};

const renderPublication = function (source) {
    const publication = publicationsBar.appendChild(document.createElement("p"));
    publication.innerText = `${source.name}`;
    publication.addEventListener("click", function () {
        alert(`${source.name} was clicked!`);
    });
};

const renderSearchBar = function () {
    searchBar.innerHTML = "";
    const searchForm = searchBar.appendChild(document.createElement("form"));
    const searchInput = searchForm.appendChild(document.createElement("input"));
    searchInput.placeholder = "enter keyword";
    renderSearchButton(searchInput, searchForm)
}

const renderSearchButton = function (searchInput, searchForm) {
    const searchButton = searchForm.appendChild(document.createElement("button"));
    searchButton.innerText = "Search";
    searchButton.addEventListener("click", function (e) {
        e.preventDefault();
        if (searchInput.value) {
            keyword = searchInput.value;
            searchInput.value = "";
            if (keyword === "alan") {
                alert("READ THE ERROR.");
            }
            currentView = 'search'
            currentStory = null;
            newsApiFetch(keyword);
        }
    })
}