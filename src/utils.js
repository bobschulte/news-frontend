function configureTitle() {
  return this.title
    .split(" - ")
    .reverse()
    .join(" - ");
}
