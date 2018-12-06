// SET UP A RAILS API SERVER OBJECT
const railsApiServer = ajax("http://localhost:3000/api/v1")

// STORIES DATA
let storyToDeleteId // we will use this as input in server.delete (for destroy action)

// COMMENTS DATA
let editedStoryComment = {} // we will use this as input in server.patch (for update action)


// STORIES API REQUESTS
const getStories = function() {
    return railsApiServer.get('/stories')
        .then(function(result) {
            update(function() {
                result.forEach(function(story) {
                    const newStory = new Story(story)
                })
            })
        })
}

const getCurrentStory = function(id) {
    return railsApiServer.get(`/stories/${id}`)
        .then(function(result) {
            update(function() {
                currentStory = new Story(result)
            })
        })
}

const bookmark = function(story) {
    return railsApiServer.post('/stories', story)
        .then(function (result) {
            update(function () {
                story.id = result.id;
            })
        })
}

const editStory = function(story) {
    railsApiServer.patch(`/stories/${story.id}`, story)
}

const unbookmark = function(story) {
    railsApiServer.delete(`/stories/${story.id}`);
}

// STORYCOMMENTS API REQUESTS
const getStoryComments = function() {
    return railsApiServer.get('/comments')
        .then(function (result) {
            update(function () {
                result.forEach(function (storyComment) {
                    const newStoryComment = new StoryComment(storyComment)
                })
            })
        })
}

const getCurrentStoryComment = function(id) {
    return railsApiServer.get(`/comments/${id}`)
        .then(function (result) {
            update(function () {
                currentStoryComment = new StoryComment(result);
            })
        })
}

const addStoryComment = function(storyComment) {
    return railsApiServer.post('/comments', storyComment)
        .then(function(result) {
            update(function() {
                storyComment.id = result.id;
            })
        })
}

const  editStoryComment = function(editedStoryComment) {
    railsApiServer.patch(`/comments/${editedStoryComment.id}`, editedStoryComment);
}

