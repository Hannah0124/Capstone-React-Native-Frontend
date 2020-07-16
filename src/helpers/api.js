import axios from 'axios';
import URLS from '../constants/Urls';

export const getImages = () => {
  axios.get(URLS.BASE_URL + '/images')
    .then(response => {

      const apiData = response.data.images;

      return apiData.filter(image => {
        return image.user_id === id
      })
      
    })
    .catch(err => {
      console.log('internal API - error: ', err)
      setErrorMessage(err.message);
    })
};