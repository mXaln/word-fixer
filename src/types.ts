export default class Result {
  bookSlug: string;

  name: string;

  strong: string;

  ref: string;

  text: string;

  constructor(
    bookSlug: string,
    name: string,
    strong: string,
    ref: string,
    text: string,
  ) {
    this.bookSlug = bookSlug;
    this.name = name;
    this.strong = strong;
    this.ref = ref;
    this.text = text;
  }
}
