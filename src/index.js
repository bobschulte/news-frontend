const navBar = document.querySelector('#navbar')
const publicationsBar = document.querySelector('#bar-publications')
const trendingBar = document.querySelector('#bar-trending')
const featureDiv = document.querySelector('#feature')
const articleListDiv = document.querySelector('#article-list')
const endPoint = 'http://localhost:3000/articles'

let articles
let featuredArticle

fetch(endPoint)
  .then(function(resp) {
    return resp.json()
  })
  .then(function(result) {
    articles = result
    featuredArticle = articles[1]
    render()
  })

const render = function() {
  // renderNavBar()
  // renderPublicationsBar()
  // renderTrendingBar()
  renderFeature(featuredArticle)
  renderArticleList()
}

// const renderNavBar() {
//
// }

// const renderPublicationsBar() {
//
// }

// const renderTrendingBar() {
//
// }

const renderFeature = function(article) {
  featureDiv.innerHTML = `
    <img class="feature-img" src="${article.urlToImage}" alt="generic-pic">
    <h1>${configureTitle.call(article)}</h1>
  `
}

const renderArticleList = function() {
  articleListDiv.innerHTML = ''
  const articleList = articleListDiv.appendChild(document.createElement('ul'))
  articleList.setAttribute("id", 'article-list')
  articleList.setAttribute("class", 'list-unstyled')
  articles.forEach(function(article) {
    renderArticle(article, articleList)
  })
}

const renderArticle = function(article, articleList) {
  const articleListItem = articleList.appendChild(document.createElement('li'))
  articleListItem.setAttribute("class", "media")
  articleListItem.innerHTML = `
    <img class="mr-1" src="${article.urlToImage}" alt="generic-pic">
    <div class="media-body">
      <h5 class="mt-0 mb-1">${configureTitle.call(article)}</h5>
    </div>
   `
}
