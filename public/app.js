// // app.js
// import { auth, provider, signInWithPopup, signOut, onAuthStateChanged, db, collection, getDocs, query, where } from './firebase.js';

// // DOM
// const loginBtn = document.getElementById('loginBtn');
// const logoutBtn = document.getElementById('logoutBtn');
// const userInfo = document.getElementById('userInfo');
// const searchBtn = document.getElementById('searchBtn');
// const searchTxt = document.getElementById('searchTxt');
// const resultsDiv = document.getElementById('results');

// loginBtn.addEventListener('click', async () => {
//   try {
//     await signInWithPopup(auth, provider);
//   } catch (e) {
//     alert("Login error: " + e.message);
//   }
// });
// logoutBtn.addEventListener('click', async () => {
//   await signOut(auth);
// });

// onAuthStateChanged(auth, user => {
//   if (user) {
//     userInfo.textContent = `Signed in: ${user.displayName || user.email}`;
//     loginBtn.style.display = 'none';
//     logoutBtn.style.display = 'inline-block';
//   } else {
//     userInfo.textContent = '';
//     loginBtn.style.display = 'inline-block';
//     logoutBtn.style.display = 'none';
//   }
// });

// // Helper: simple similarity score between two strings 0-100
// function similarityScore(a, b) {
//   if (!a || !b) return 0;
//   a = a.toLowerCase(); b = b.toLowerCase();
//   // token overlap
//   const aTokens = [...new Set(a.split(/\W+/).filter(Boolean))];
//   const bTokens = [...new Set(b.split(/\W+/).filter(Boolean))];
//   let matches = 0;
//   aTokens.forEach(t => { if (bTokens.includes(t)) matches++; });
//   const tokenScore = Math.round((matches / Math.max(aTokens.length,1)) * 60); // up to 60
//   // char-level partial match (jaccard-ish)
//   const common = a.split('').filter(ch => b.includes(ch)).length;
//   const charScore = Math.round((common / Math.max(a.length, b.length)) * 40); // up to 40
//   return tokenScore + charScore;
// }

// async function fetchFoundItems() {
//   const col = collection(db, "items");
//   const q = query(col, where("type", "==", "found"));
//   const snap = await getDocs(q);
//   const items = [];
//   snap.forEach(doc => {
//     items.push({ id: doc.id, ...doc.data() });
//   });
//   return items;
// }

// searchBtn.addEventListener('click', async () => {
//   const q = searchTxt.value.trim();
//   if (!q) return alert("Describe what you lost to search.");
//   resultsDiv.innerHTML = "Searching...";
//   try {
//     const foundItems = await fetchFoundItems();
//     // compute scores
//     const scored = foundItems.map(it => {
//       const text = `${it.item_name || ""} ${it.description || ""} ${it.category || ""} ${it.location || ""}`;
//       const score = similarityScore(q, text);
//       return { ...it, score };
//     }).filter(x => x.score > 15);
//     // sort desc
//     scored.sort((a,b)=>b.score - a.score);
//     renderMatches(scored);
//   } catch (e) {
//     resultsDiv.textContent = "Error: " + e.message;
//   }
// });

// function renderMatches(list) {
//   resultsDiv.innerHTML = "";
//   if (!list.length) {
//     resultsDiv.textContent = "No close matches found.";
//     return;
//   }
//   list.forEach(it => {
//     const div = document.createElement('div');
//     div.className = 'card';
//     div.innerHTML = `
//       <img src="${it.imageURL || 'https://via.placeholder.com/220x140'}" />
//       <h4>${it.item_name} — ${it.score}%</h4>
//       <p>${it.description || ''}</p>
//       <p><b>Location:</b> ${it.location || ''}</p>
//       <p><b>Date:</b> ${it.timestamp?.toDate ? it.timestamp.toDate().toLocaleString() : ''}</p>
//     `;
//     resultsDiv.appendChild(div);
//   });
// }









// Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBhqbwu0BLJBix9SgLFqYSLqFLxs7Uqup8",
//   authDomain: "lost-and-found-17d0e.firebaseapp.com",
//   projectId: "lost-and-found-17d0e",
//   storageBucket: "lost-and-found-17d0e.appspot.com",
//   messagingSenderId: "746918449748",
//   appId: "1:746918449748:web:ac5dcd613e77623d1f13c1"
// };

// // Initialize Firebase
// firebase.initializeApp(firebaseConfig);

// // Auth
// const auth = firebase.auth();
// const provider = new firebase.auth.GoogleAuthProvider();

// // DOM
// const loginBtn = document.getElementById("loginBtn");
// const logoutBtn = document.getElementById("logoutBtn");
// const userInfo = document.getElementById("userInfo");

// loginBtn.addEventListener("click", async () => {
//   try {
//     await auth.signInWithPopup(provider);
//   } catch (e) {
//     alert(e.message);
//   }
// });

// logoutBtn.addEventListener("click", async () => {
//   await auth.signOut();
// });

// auth.onAuthStateChanged(user => {
//   if (user) {
//     userInfo.textContent = `Signed in as ${user.displayName}`;
//     loginBtn.style.display = "none";
//     logoutBtn.style.display = "inline-block";
//   } else {
//     userInfo.textContent = "";
//     loginBtn.style.display = "inline-block";
//     logoutBtn.style.display = "none";
//   }
// });




// const firebaseConfig = {
//   apiKey: "AIzaSyBHqbuwOBlJBix9SgLFqYSLqFlXs7Uqup8",
//   authDomain: "lost-and-found-17d0e.firebaseapp.com",
//   projectId: "lost-and-found-17d0e",
//   storageBucket: "lost-and-found-17d0e.firebasestorage.app",
//   messagingSenderId: "746918449748",
//   appId: "1:746918449748:web:6de9b7b1a1a68ae91f13c1"
// };



alert("app.js loaded");

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHqbuwOBlJBix9SgLFqYSLqFlXs7Uqup8",
  authDomain: "lost-and-found-17d0e.firebaseapp.com",
  projectId: "lost-and-found-17d0e",
  storageBucket: "lost-and-found-17d0e.firebasestorage.app",
  messagingSenderId: "746918449748",
  appId: "1:746918449748:web:6de9b7b1a1a68ae91f13c1"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Auth
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

// DOM
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const userInfo = document.getElementById("userInfo");

loginBtn.addEventListener("click", async () => {
  try {
    await auth.signInWithPopup(provider);
  } catch (e) {
    alert(e.message);
  }
});

logoutBtn.addEventListener("click", async () => {
  await auth.signOut();
});

auth.onAuthStateChanged(user => {
  if (user) {
    userInfo.textContent = `Signed in as ${user.displayName || user.email}`;
    loginBtn.style.display = "none";
    logoutBtn.style.display = "inline-block";
  } else {
    userInfo.textContent = "";
    loginBtn.style.display = "inline-block";
    logoutBtn.style.display = "none";
  }
});
