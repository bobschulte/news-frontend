const railsServer = railsAjax("http://localhost:3000/api/v1")

// STORIES DATA
let stories // we will set this in server.get (for index action)
let currentStory = {} // we will set this in server.post (for create action)
let currentStoryId // we will use this as input in server.get (for show action)
let storyToShow = {} // we will set this in server.get (for show action)

// COMMENTS DATA
let comments // we will set this in server.get (for index action)
let currentComment = {} // we will set this in server.post (for create action)
let currentCommentId // we will use this as input in server.get (for show action)
let commentToShow = {} // we will set this in server.get (for show action)

// STORIES API REQUESTS
railsServer.get('/stories')
    .then(function(result) {
        update(function() {
            stories = result
        })
    })

railsServer.get(`/stories/${currentStoryId}`)
    .then(function(result) {
        update(function() {
            storyToShow = result
        })
    })

railsServer.post('/stories', currentStory)
    .then(function (result) {
        update(function () {
            currentStory.id = result.id;
        })
    })


// COMMENTS API REQUESTS
railsServer.get('/comments')
    .then(function (result) {
        update(function () {
            comments = result
        })
    })

railsServer.get(`/comments/${currentCommentId}`)
    .then(function (result) {
        update(function () {
            commentToShow = result
        })
    })

railsServer.post('/comments', currentComment)
    .then(function(result) {
        update(function() {
            currentComment.id = result.id;
        })
    })


