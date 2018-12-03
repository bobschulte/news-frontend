const notesList = document.querySelector('#notes-list')
const update = document.querySelector('#update')
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
  renderNotesList()
  renderUpdate()
}

const renderNotesList = function() {
  notesList.innerHTML = ''
  articles.forEach(function(article) {
    renderListItem(article)
  })
}

const renderListItem = function(article) {
  const listItem = notesList.appendChild(document.createElement('li'))
  listItem.innerText = `${article.title}`
}

const renderUpdate = function() {
  update.innerHTML = `<h1>THIS STILL WORKS</h1>`
}
