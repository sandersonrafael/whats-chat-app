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
    await db.collection('users').doc(u.id).set(
      { name: u.name, avatar: u.avatar },
      { merge: true },
    );
  },
  getContactList: async (userId) => {
    const results = await db.collection('users').get();
    
    const list = [];
    results.forEach((result) => {
      const data = result.data();

      if (result.id !== userId) list.push({
        id: result.id,
        name: data.name,
        avatar: data.avatar,
      });
    });

    return list;
  },
  addNewChat: async (user, user2) => {
    const newChat = await db.collection('chats').add({
      messages: [],
      users: [user.id, user2.id],
    });

    await db.collection('users').doc(user.id).update({
      chats: firebase.firestore.FieldValue.arrayUnion({
        chatId: newChat.id,
        title: user2.name,
        image: user2.avatar,
        with: user2.id,
      }),
    });

    await db.collection('users').doc(user2.id).update({
      chats: firebase.firestore.FieldValue.arrayUnion({
        chatId: newChat.id,
        title: user.name,
        image: user.avatar,
        with: user.id,
      }),
    });
  },
  onChatList: (userId, setChatList) => {
    return db.collection('users').doc(userId).onSnapshot((doc) => {
      if (doc.exists) {
        const data = doc.data();

        if (data.chats) {
          const chats = [...data.chats];
          chats.sort((a, b) => {
            if (!a.lastMessageDate) return -1;
            if (!b.lastMessageDate) return 1;

            return b.lastMessageDate.seconds - a.lastMessageDate.seconds;
          });

          setChatList(chats);
        }
      }
    });
  },
  onChatContent: (chatId, setMsgList, setUsers) => {
    return db.collection('chats').doc(chatId).onSnapshot((doc) => {
      if (doc.exists) {
        const data = doc.data();
        setMsgList(data.messages);
        setUsers(data.users);
      }
    });
  },
  sendMessage: async (chatData, userId, type, body, users) => {
    const now = new Date();
    db.collection('chats').doc(chatData.chatId).update({
      messages: firebase.firestore.FieldValue.arrayUnion({
        type,
        author: userId,
        body,
        date: now,
      }),
    });

    for (let i in users) {
      const user = await db.collection('users').doc(users[i]).get();
      const uData = user.data();
      if (uData.chats) {
        const chats = [...uData.chats];

        for (let index in chats) {
          if (chats[index].chatId == chatData.chatId) {
            chats[index].lastMessage = body;
            chats[index].lastMessageDate = now;
          }
        }

        await db.collection('users').doc(users[i]).update({ chats });
      }
    }
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
