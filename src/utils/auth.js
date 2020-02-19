import { useState, useEffect } from 'react';
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

firebase.initializeApp(firebaseConfig);

var db = firebase.firestore();
var provider = new firebase.auth.GoogleAuthProvider();

const loginWithPopup = () =>
  firebase
    .auth()
    .signInWithPopup(provider)
    .then(res => {
      const user = res.user;
      return db
        .collection('users')
        .doc(user.uid)
        .get()
        .then(doc => {
          if (doc.exists) {
            return true;
          } else {
            createPendingUser(user);
            throw Error('Access request submitted.');
          }
        });
    });

const loginWithUid = uid =>
  db
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
        throw new Error('User needs approval');
      }
    });

export const useAuth = () => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(firebase.auth().currentUser);

  useEffect(() => {
    const listener = firebase.auth().onAuthStateChanged(user => {
      if (user) {
        loginWithUid(user.uid).catch(setError);
        setUser(user);
      } else {
        setUser(null);
        loginWithPopup().catch(setError);
      }
    });

    return () => listener();
  }, []);

  const handleSignOut = () => {
    firebase.auth().signOut();
    setUser(null);
    setError(null);
  };

  return { user, authError: error, signOut: handleSignOut };
};

export const approvePendingUserId = uid => {
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

export const createPendingUser = user => {
  const uid = user.uid;
  db.collection('pendingUsers')
    .doc(uid)
    .set({ displayName: user.displayName, email: user.email });
};

export const getPendingUsers = () => {
  return db
    .collection('pendingUsers')
    .get()
    .then(querySnapshot =>
      querySnapshot.docs.map(x => {
        return { ...x.data(), uid: x.id };
      })
    );
};

export const rejectPendingUserId = uid => {
  db.collection('pendingUsers')
    .doc(uid)
    .delete()
    .catch(err => console.error);
};

export const usePendingUsers = () => {
  const [pendingUsers, setPendingUsers] = useState([]);

  useEffect(() => {
    getPendingUsers().then(setPendingUsers);
  }, []);

  return pendingUsers;
};
