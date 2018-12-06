// SET UP A RAILS API SERVER OBJECT
const railsApiServer = ajax("http://localhost:3000/api/v1")

// STORIES DATA
let currentStoryId = 23 // we will use this as input in server.get (for show action)
let storyToShow = {} // we will set this in server.get (for show action)
let storyToCreate = {} // we will set this in server.post (for create action)
let editedStory = {} // we will use this as input in server.patch (for update action)
let storyToDeleteId // we will use this as input in server.delete (for destroy action)

// COMMENTS DATA
let currentStoryCommentId = 5 // we will use this as input in server.get (for show action)
let storyCommentToShow = {} // we will set this in server.get (for show action)
let storyCommentToCreate = {} // we will set this in server.post (for create action)
let editedStoryComment = {} // we will use this as input in server.patch (for update action)


// STORIES API REQUESTS
railsApiServer.get('/stories')
    .then(function(result) {
        update(function() {
            result.forEach(function(story) {
                const newStory = new Story(story)
            })
        })
    })

railsApiServer.get(`/stories/${currentStoryId}`)
    .then(function(result) {
        update(function() {
            storyToShow = new Story(result)
        })
    })

railsApiServer.post('/stories', storyToCreate)
    .then(function (result) {
        update(function () {
            storyToCreate.id = result.id;
        })
    })

// railsApiServer.patch(`/stories/${editedStory.id}`, editedStory)

// railsApiServer.delete(`/stories/${storyToDeleteId}`);

// // COMMENTS API REQUESTS
railsApiServer.get('/comments')
    .then(function (result) {
        update(function () {
            result.forEach(function (storyComment) {
                const newStoryComment = new StoryComment(storyComment)
            })
        })
    })

railsApiServer.get(`/comments/${currentStoryCommentId}`)
    .then(function (result) {
        update(function () {
            storyCommentToShow = new StoryComment(result);
        })
    })

railsApiServer.post('/comments', storyCommentToCreate)
    .then(function(result) {
        update(function() {
            storyCommentToCreate.id = result.id;
        })
    })

// railsApiServer.patch(`/comments/${editedStoryComment.id}`, editedStoryComment);
