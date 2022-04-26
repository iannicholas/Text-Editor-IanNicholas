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
export const putDb = async (id, value) => {
  console.log('PUT to the db');
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: id, value: value });
  const result = await request;
  console.log('Data saved to the db', result);
};
// TODO: Add logic for a method that gets all the content from the database
export const getDb = async (value) => {
  console.log('GET all from db');
  const input = await openDB('jate', 1);
  const tx = input.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
};

  
initdb();