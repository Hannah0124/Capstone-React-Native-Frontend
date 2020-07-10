import * as SQLite from 'expo-sqlite';

// Create the database
const db = SQLite.openDatabase('images.db');

export const init = () => {
  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'CREATE TABLE IF NOT EXISTS images (id INTEGER PRIMARY KEY NOT NULL, imageUri TEXT NOT NULL, text TEXT NOT NULL, translatedText TEXT NOT NULL);',
        [],
        () => {
          resolve();
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};


export const insertImage = (imageUri, text, translatedText) => {
  const promise = new Promise((resolve, reject) => {
      db.transaction(tx => {
        tx.executeSql(
          `INSERT INTO images (imageUri, text, translatedText) VALUES (?, ?, ?, ?);`,
          [imageUri, text, translatedText],
          (_, result) => {
            resolve(result);
          },
          (_, err) => {
            reject(err);
          }
        );
      });
    });
    return promise;
};



export const fetchImages = () => {

  const promise = new Promise((resolve, reject) => {
    db.transaction(tx => {
      tx.executeSql(
        'SELECT * FROM images',
        [],
        (_, result) => {
          resolve(result);
        },
        (_, err) => {
          reject(err);
        }
      );
    });
  });
  return promise;
};