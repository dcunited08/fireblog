import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, child } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyARhzuJmtg7Vw4MVEv8fDc7jEknVYq21Ik",
  authDomain: "jdanielcook.firebaseapp.com",
  databaseURL: "https://jdanielcook.firebaseio.com",
  projectId: "jdanielcook",
  storageBucket: "firebase-jdanielcook.appspot.com",
  messagingSenderId: "",
  appId: ""
};

const firebaseApp = initializeApp(firebaseConfig);
const firebaseDb = getDatabase(firebaseApp);

async function test() {
  try {
    const dbRef = ref(firebaseDb);
    const snapshot = await get(child(dbRef, `blogposts`));
    if (snapshot.exists()) {
      const data = snapshot.val();
      console.log('Fetched data:', Object.keys(data).length, 'items');
      console.log(Object.values(data));
    } else {
      console.log('No data found');
    }
  } catch (err) {
    console.error('Error fetching:', err);
  }
  process.exit(0);
}

test();
