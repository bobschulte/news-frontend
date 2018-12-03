const notesList = document.querySelector('#notes-list')
const update = document.querySelector('#update')
let articles

fetch('http://localhost:3000/notes')
  .then(function(resp) {resp.json()})
  .then(function(result) {
    articles = result
    render()
  })

const render() {
  renderNotesList()
  renderUpdate()
}

const renderNotesList() {
  notesList.innerHTML = ''
  articles.forEach(function(story) {
    renderListItem(story)
  })
}

const renderListItem(story) {
  const story = notesList.appendChild(document.createElement('li'))
}

const renderUpdate() {

}
