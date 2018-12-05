// SET UP A RAILS API SERVER OBJECT
const railsApiServer = ajax("http://localhost:3000/api/v1")

// STORIES DATA
let stories // we will set this in server.get (for index action)
let currentStoryId = 1 // we will use this as input in server.get (for show action)
let storyToShow = {} // we will set this in server.get (for show action)
let newStory = {} // we will set this in server.post (for create action)
let editedStory = {} // we will use this as input in server.patch (for update action)
let storyToDeleteId // we will use this as input in server.delete (for destroy action)

// COMMENTS DATA
let comments // we will set this in server.get (for index action)
let currentCommentId = 1 // we will use this as input in server.get (for show action)
let commentToShow = {} // we will set this in server.get (for show action)
let newComment = {} // we will set this in server.post (for create action)
let editedComment = {} // we will use this as input in server.patch (for update action)


// // STORIES API REQUESTS
// railsApiServer.get('/stories')
//     .then(function(result) {
//         update(function() {
//             stories = result
//         })
//     })

// railsApiServer.get(`/stories/${currentStoryId}`)
//     .then(function(result) {
//         update(function() {
//             storyToShow = result
//         })
//     })

// railsApiServer.post('/stories', newStory)
//     .then(function (result) {
//         update(function () {
//             newStory.id = result.id;
//         })
//     })

// railsApiServer.patch(`/stories/${editedStory.id}`, editedStory)

// railsApiServer.delete(`/stories/${storyToDeleteId}`);

// // COMMENTS API REQUESTS
// railsApiServer.get('/comments')
//     .then(function (result) {
//         update(function () {
//             comments = result
//         })
//     })

// railsApiServer.get(`/comments/${currentCommentId}`)
//     .then(function (result) {
//         update(function () {
//             commentToShow = result
//         })
//     })

// railsApiServer.post('/comments', newComment)
//     .then(function(result) {
//         update(function() {
//             newComment.id = result.id;
//         })
//     })

// railsApiServer.patch(`/comments/${editedComment.id}`, editedComment);
