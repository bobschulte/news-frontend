const navBar = document.querySelector('#navbar')
const publicationsBar = document.querySelector('#bar-publications')
const trendingBar = document.querySelector('#bar-trending')
const restOfPage = document.querySelector('#dynamic-page')

let articles

fetch('http://localhost:3000/articles')
  .then(function(resp) {
    return resp.json()
  })
  .then(function(result) {
    articles = result
    render()
  })

const render = function() {
  // renderPublicationsBar()
  // renderTrendingBar()
  renderRestOfPage()
}

const renderRestOfPage = function() {
  restOfPage.innerHTML = `<h1>Featured Article: ${articles[0].title}</h1>`
}
