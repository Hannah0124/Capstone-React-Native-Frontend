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
          img => new Image(img.id.toString(), img.title, img.imageUri)
        )
      };
    case ADD_IMAGE:
      const newImage = new Image(
        action.imageData.id.toString(),
        action.imageData.title,
        action.imageData.image
      );
      return {
        images: state.images.concat(newImage)
      };
    default:
      return state;
  }
};
