class StoryComment {
  constructor(data) {
    this.description = data.description;
    this.story_id = data.story_id;
    StoryComment.all.push(this);
  }
}

StoryComment.all = [];
