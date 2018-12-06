class Story {
  constructor(data) {
    this.id = data.id;
    this.title = data.title;
    this.urlToImage = data.urlToImage;
    this.content = data.content;
    this.url = data.url;
    this.comments = data.comments
    Story.all.push(this);
  }
}

Story.all = [];
