// SET UP A RAILS API SERVER OBJECT
const railsApiServer = ajax("http://localhost:3000/api/v1");

// RAILS API PATHS
const storiesPath = "/stories";
const storyCommentsPath = "/comments";

// STORIES API REQUESTS
const getStories = function() {
  return railsApiServer.get(`${storiesPath}`).then(function(result) {
    update(function() {
      result.forEach(function(story) {
        const newStory = new Story(story);
      });
    });
    //renderStories() ???
    //renderArticleList(stories) ???
  });
};

const getCurrentStory = function(id) {
  return railsApiServer.get(`${storiesPath}/${id}`).then(function(result) {
    update(function() {
      currentStory = new Story(result);
    });
  });
};

const bookmark = function(story) {
  return railsApiServer.post(`${storiesPath}`, story).then(function(result) {
    update(function() {
      // story.id = result.id;
      currentStory = result;
    });
  });
};

const editStory = function(editedStory) {
  return railsApiServer.patch(`${storiesPath}/${editedStory.id}`, editedStory);
};

const unbookmark = function(story) {
  return railsApiServer.delete(`${storiesPath}/${story.id}`);
};

// STORYCOMMENTS API REQUESTS
const getStoryComments = function() {
  return railsApiServer.get(`${storyCommentsPath}`).then(function(result) {
    update(function() {
      result.forEach(function(storyComment) {
        const newStoryComment = new StoryComment(storyComment);
      });
    });
  });
};

const getCurrentStoryComment = function(id) {
  return railsApiServer
    .get(`${storyCommentsPath}/${id}`)
    .then(function(result) {
      update(function() {
        currentStoryComment = new StoryComment(result);
      });
    });
};

const addStoryComment = function(newStoryComment) {
  return railsApiServer
    .post(`${storyCommentsPath}`, newStoryComment)
    .then(function(result) {
      update(function() {
        storyComment.id = result.id;
      });
    });
};

const editStoryComment = function(editedStoryComment) {
  return railsApiServer.patch(
    `${storyCommentsPath}/${editedStoryComment.id}`,
    editedStoryComment
  );
};
