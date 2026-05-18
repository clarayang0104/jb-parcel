import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, deleteDoc, collection, getDocs } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCN6EIsTkeUr6oCPWEdniikpPmweBeqf5E",
  authDomain: "jb-parcel.firebaseapp.com",
  projectId: "jb-parcel",
  storageBucket: "jb-parcel.firebasestorage.app",
  messagingSenderId: "762103232614",
  appId: "1:762103232614:web:dfa44ce32e78fa466e95a7",
  measurementId: "G-Q92ZH18RYV"
};

const app  = initializeApp(firebaseConfig);
export const db   = getFirestore(app);
const auth = getAuth(app);

let authReady = false;
export async function ensureAuth() {
  if (!authReady) {
    await signInAnonymously(auth);
    authReady = true;
  }
}

function keyToFirestore(k) {
  const parts = k.split(":");
  const col = parts[0];
  const docId = parts.slice(1).join("__");
  return { col, docId };
}

function firestoreToKey(col, docId) {
  return col + ":" + docId.replace(/__/g, ":");
}

export const S = {
  async get(k) {
    try {
      await ensureAuth();
      const { col, docId } = keyToFirestore(k);
      const snap = await getDoc(doc(db, col, docId));
      if (!snap.exists()) return null;
      return snap.data().v;
    } catch (e) {
      console.error("S.get error", k, e);
      return null;
    }
  },

  async set(k, v) {
    try {
      await ensureAuth();
      const { col, docId } = keyToFirestore(k);
      await setDoc(doc(db, col, docId), { v, t: Date.now() });
    } catch (e) {
      console.error("S.set error", k, e);
    }
  },

  async del(k) {
    try {
      await ensureAuth();
      const { col, docId } = keyToFirestore(k);
      await deleteDoc(doc(db, col, docId));
    } catch (e) {
      console.error("S.del error", k, e);
    }
  },

  async list(prefix) {
    try {
      await ensureAuth();
      const col = prefix.split(":")[0];
      const snap = await getDocs(collection(db, col));
      const keys = [];
      snap.forEach(d => {
        const key = firestoreToKey(col, d.id);
        if (key.startsWith(prefix)) {
          keys.push(key);
        }
      });
      return keys;
    } catch (e) {
      console.error("S.list error", prefix, e);
      return [];
    }
  }
};
