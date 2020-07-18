import ENV from '../../env'; // npm i expo-env

export default {
  GOOGOLE_VISION_URL: `https://content-vision.googleapis.com/v1/images:annotate?key=${ENV.googleApiKey}`,
  GOOGOLE_TRANSLATION_URL: `https://translation.googleapis.com/language/translate/v2?key=${ENV.googleApiKey}`,
  // BASE_URL: 'http://192.168.0.38:5000',
  // BASE_URL: 'http://192.168.1.4:5000',
  // BASE_URL: 'https://ada-capstone.herokuapp.com',
  BASE_URL: 'https://vizlator.herokuapp.com',
};