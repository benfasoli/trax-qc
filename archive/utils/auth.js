import Cookies from 'js-cookie';
import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

var firebaseConfig = {
  apiKey: 'AIzaSyAYGnXRb0duQX67dvO3PbiHqIbDENddISk',
  authDomain: 'trax-qc.firebaseapp.com',
  databaseURL: 'https://trax-qc.firebaseio.com',
  projectId: 'trax-qc',
  storageBucket: 'trax-qc.appspot.com',
  messagingSenderId: '845844080247',
  appId: '1:845844080247:web:13881473241bc3d7'
};

firebase.apps.length || firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var provider = new firebase.auth.GoogleAuthProvider();

export const login = () => {
  const uid = Cookies.get('uid');
  return uid ? loginWithUid(uid) : loginWithPopup();
};

const loginWithUid = uid => {
  return db
    .collection('users')
    .doc(uid)
    .get()
    .then(doc => {
      if (doc.exists) {
        return {
          accessToken: doc.accessToken,
          displayName: doc.displayName,
          email: doc.email,
          uid
        };
      } else {
        Cookies.remove('uid');
        location.reload();
      }
    });
};

const loginWithPopup = () => {
  return firebase
    .auth()
    .signInWithPopup(provider)
    .then(res => {
      const uid = res.user.uid;
      const userData = {
        accessToken: res.credential.accessToken,
        displayName: res.user.displayName,
        email: res.user.email
      };
      return db
        .collection('users')
        .doc(uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            Cookies.set('uid', uid, { expires: 7 });
            return { ...userData, uid };
          } else {
            db.collection('pendingUsers')
              .doc(uid)
              .set({ ...userData })
              .catch(err => console.error);
            throw Promise.reject(Error('Access request submitted.'));
          }
        });
    });
};

export const getUsers = (isPending = false) => {
  const collection = isPending ? 'pendingUsers' : 'users';
  return db.collection(collection).get();
};

export const approvePendingUser = uid => {
  const docRef = db.collection('pendingUsers').doc(uid);
  docRef.get().then(doc => {
    if (doc.exists) {
      db.collection('users')
        .doc(uid)
        .set({ ...doc.data() })
        .then(() => {
          docRef.delete().catch(err => console.error);
        });
    }
  });
};

export const rejectPendingUser = uid => {
  db.collection('pendingUsers')
    .doc(uid)
    .delete()
    .catch(err => console.error);
};

export default login;
