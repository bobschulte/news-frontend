class Story {
    constructor(data) {
        this.id = data.id
        this.title = data.title
        this.image = data.image
        this.text = data.text
        Story.all.push(this)
    }
}

Story.all = []