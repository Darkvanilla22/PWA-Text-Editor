import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('PUT to the database');

  // Open the database
  const db = await openDB('jate', 1);

  // Create a transaction and access the object store
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  // Add the content to the object store
  const request = store.put({ content });

  // Get confirmation of the request
  const result = await request;
  console.log('Data saved to the database', result);
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () => {
  console.log('GET all from the database');

  // Open the database
  const db = await openDB('jate', 1);

  // Create a transaction and access the object store
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  // Get all data from the object store
  const request = store.getAll();

  // Get confirmation of the request
  const result = await request;
  console.log('Data retrieved from the database', result);
  return result;
};

initdb();
