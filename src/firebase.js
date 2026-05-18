import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc, setDoc, deleteDoc, collection, getDocs, query, where } from "firebase/firestore";
import { getAuth, signInAnonymously } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCN6EIsTkeUr6oCPWEdniikpPmwel_moto",
  authDomain: "jb-parcel.firebaseapp.com",
  projectId: "jb-parcel",
  storageBucket: "jb-parcel.firebasestorage.app",
  messagingSenderId: "762103232614",
  appId: "1:762103232614:web:dfa44ce32e78fa4c5bd14e",
  measurementId: "G-Q92ZH18RYV"
};

const app  = initializeApp(firebaseConfig);
const db   = getFirestore(app);
const auth = getAuth(app);

// Sign in anonymously so Firestore rules allow access
export async function ensureAuth() {
  if (!auth.currentUser) {
    await signInAnonymously(auth);
  }
}

// ── Storage API matching window.storage interface ──────────────────
// Keys use ":" separator — we convert to Firestore paths
// e.g. "user:6591234567" → collection "user", doc "6591234567"
//      "parcel:6591234567:P123" → collection "parcel", doc "6591234567_P123"
//      "config:pricing" → collection "config", doc "pricing"

function keyToPath(k) {
  const parts = k.split(":");
  if (parts.length === 1) return { col: "misc", id: parts[0] };
  if (parts.length === 2) return { col: parts[0], id: parts[1] };
  // 3+ parts: collection = parts[0], id = rest joined with "_"
  return { col: parts[0], id: parts.slice(1).join("_") };
}

export const S = {
  async get(k) {
    try {
      await ensureAuth();
      const { col, id } = keyToPath(k);
      const snap = await getDoc(doc(db, col, id));
      return snap.exists() ? snap.data().value : null;
    } catch (e) {
      console.error("S.get error", k, e);
      return null;
    }
  },

  async set(k, v) {
    try {
      await ensureAuth();
      const { col, id } = keyToPath(k);
      await setDoc(doc(db, col, id), { value: v, updatedAt: Date.now() });
    } catch (e) {
      console.error("S.set error", k, e);
    }
  },

  async del(k) {
    try {
      await ensureAuth();
      const { col, id } = keyToPath(k);
      await deleteDoc(doc(db, col, id));
    } catch (e) {
      console.error("S.del error", k, e);
    }
  },

  async list(prefix) {
    try {
      await ensureAuth();
      // prefix like "parcel:6591234567:" → col=parcel, filter by id starting with "6591234567_"
      const parts = prefix.replace(/:$/, "").split(":");
      const col   = parts[0];
      const colRef = collection(db, col);
      const snap  = await getDocs(colRef);

      // reconstruct keys
      const keys = [];
      snap.forEach(d => {
        const reconstructed = col + ":" + d.id.replace(/_/g, ":");
        // filter by prefix
        if (prefix.endsWith(":")) {
          // e.g. prefix = "parcel:6591234567:"
          // check if key starts with prefix (after converting _ back)
          const prefixCheck = prefix.slice(0, -1); // remove trailing :
          if (reconstructed.startsWith(prefixCheck)) {
            keys.push(reconstructed);
          }
        } else {
          if (reconstructed.startsWith(prefix)) {
            keys.push(reconstructed);
          }
        }
      });
      return keys;
    } catch (e) {
      console.error("S.list error", prefix, e);
      return [];
    }
  }
};
