import { ADD_IMAGE, SET_IMAGES } from './images-actions';
import Image from '../models/image';

const initialState = {
  images: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_IMAGES:
      return {
        images: action.images.map(
          img => new Image(
            img.id.toString(), 
            img.imageUri, 
            img.text, 
            img.trasnlatedText,
            img.favorite,
            img.language
          )
        )
      };
    case ADD_IMAGE:
      const newImage = new Image(
        action.imageData.id.toString(),
        action.imageData.image,
        action.imageData.text,
        action.imageData.translatedText,
        action.imageData.favorite,
        action.imageData.language
      );
      return {
        images: state.images.concat(newImage)
      };
    default:
      return state;
  }
};
