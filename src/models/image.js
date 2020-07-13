class Image {
  constructor(id, imageUri, text, translatedText, favorite, language) {
    this.id = id;
    this.imageUri = imageUri;
    this.text = text;
    this.translatedText = translatedText;
    this.favorite = favorite;
    this.language = language;
  }
}

export default Image;