class Comment {
  constructor(data) {
    this.description = data.description;
    this.story_id = data.story_id;
    Comment.all.push(this);
  }
}

Comment.all = [];
