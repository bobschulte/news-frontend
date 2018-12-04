const navBar = document.querySelector('#navbar')
const publicationsBar = document.querySelector('#bar-publications')
const trendingBar = document.querySelector('#bar-trending')
const primaryPage = document.querySelector('#primary-page')
const endPoint = 'http://localhost:3000/articles'

let articles
let featuredArticle
let currentArticle

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
  renderNavBar()
  // renderPublicationsBar()
  // renderTrendingBar()
  renderPrimaryPage()
}

const renderNavBar = function() {
  navBar.innerHTML = ''
  const icon = navBar.appendChild(document.createElement('div'))
  icon.setAttribute("id", 'navbar-icon')
  icon.setAttribute("class", 'navbar-brand')
  icon.innerText = 'NAVBAR ICON HERE'
  icon.addEventListener('click', backToHome)
}

// const renderPublicationsBar = function() {
//
// }

// const renderTrendingBar = function() {
//
// }

const renderPrimaryPage = function() {
  primaryPage.innerHTML = ''
  if (currentArticle) {
    renderArticle(currentArticle)
  } else {
    renderFeature(featuredArticle)
    renderArticleList()
  }
}

const renderArticle = function(article) {
  primaryPage.innerHTML = `
  <h1>${configureTitle.call(article)}</h1>
  <img class="feature-img" src="${article.urlToImage}" alt="generic-pic" width="832px">
  <div>${article.content}</div>
  `
  renderBackButton(primaryPage)
}

const renderFeature = function(article) {
  const featureDiv = primaryPage.appendChild(document.createElement('div'))
  featureDiv.innerHTML = `
    <img class="feature-img" src="${article.urlToImage}" alt="generic-pic" width="832px">
    <h1>${configureTitle.call(article)}</h1>
  `
  featureDiv.addEventListener('click', function() {
    currentArticle = article
    render()
  })
}

const renderArticleList = function() {
  const articleList = primaryPage.appendChild(document.createElement('div')).appendChild(document.createElement('ul'))
  articleList.setAttribute("class", 'list-unstyled')
  articles.forEach(function(article) {
    renderArticleListItem(article, articleList)
  })
}

const renderArticleListItem = function(article, articleList) {
  const articleListItem = articleList.appendChild(document.createElement('li'))
  articleListItem.setAttribute("class", "media")
  articleListItem.innerHTML = `
    <img class="mr-1" src="${article.urlToImage}" alt="generic-pic" width="96px">
    <div class="media-body">
      <h5 class="mt-0 mb-1">${configureTitle.call(article)}</h5>
    </div>
   `
   articleListItem.addEventListener('click', function() {
     currentArticle = article
     render()
   })
}

const resetCurrentArticle = function() {
  currentArticle = null
}

const renderBackButton = function(domElement) {
  const backButton = domElement.appendChild(document.createElement('button'))
  backButton.innerText = 'Back to Home Page'
  backButton.addEventListener('click', backToHome)
}

const backToHome = function() {
  resetCurrentArticle()
  render()
}
