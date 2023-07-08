import firebase from 'firebase/app';
import 'firebase/firebase-auth';
import 'firebase/firebase-firestore';

import firebaseConfig from './firebaseConfig';

const firebaseApp = firebase.initializeApp(firebaseConfig);
const db = firebaseApp.firestore();

export default {
  googlePopup: async () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    const result = await firebaseApp.auth().signInWithPopup(provider);
    return result;
  },
  addUser: async (u) => {
    await db.collection('users').doc(u.id).set({
      name: u.name,
      avatar: u.avatar,
    }, { merge: true });
  },
};



/* Return example:

{
  "uid": "abc123",
  "displayName": "John Doe",
  "email": "johndoe@example.com",
  "phoneNumber": "+1234567890",
  "photoURL": "https://example.com/profile.jpg"
}
*/
