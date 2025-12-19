// // // view_items.js
// // import { db, collection, getDocs, query, where } from './firebase.js';

// // const itemsGrid = document.getElementById('itemsGrid');

// // async function loadFound() {
// //   const col = collection(db, "items");
// //   const q = query(col, where("type", "==", "found"));
// //   const snapshot = await getDocs(q);
// //   snapshot.forEach(doc => {
// //     const d = doc.data();
// //     const card = document.createElement('div');
// //     card.className = 'card';
// //     card.innerHTML = `
// //       <img src="${d.imageURL || 'https://via.placeholder.com/220x140'}" />
// //       <h3>${d.item_name}</h3>
// //       <p>${d.description || ''}</p>
// //       <p><b>Location:</b> ${d.location || ''}</p>
// //     `;
// //     itemsGrid.appendChild(card);
// //   });
// // }

// // loadFound();



// // Code given by Gemini

// // view_items.js
// import { db, collection, getDocs, query, where, auth, onAuthStateChanged } from './firebase.js';

// const itemsGrid = document.getElementById('itemsGrid');

// async function loadFound() {
//   itemsGrid.innerHTML = '<p>Loading items...</p>';
  
//   try {
//     const col = collection(db, "items");
//     // Query for items where type is "found"
//     const q = query(col, where("type", "==", "found"));
    
//     const snapshot = await getDocs(q);
    
//     itemsGrid.innerHTML = ''; // Clear "Loading..." text

//     if (snapshot.empty) {
//       itemsGrid.innerHTML = '<p>No found items reported yet.</p>';
//       return;
//     }

//     snapshot.forEach(doc => {
//       const d = doc.data();
//       const card = document.createElement('div');
//       card.className = 'card';
      
//       // Safety check for missing images or fields
//       const imgUrl = d.imageURL || 'https://via.placeholder.com/220x140?text=No+Image';
      
//       card.innerHTML = `
//         <img src="${imgUrl}" alt="${d.item_name}" onerror="this.src='https://via.placeholder.com/220x140?text=Error'" />
//         <h3>${d.item_name}</h3>
//         <p>${d.description || 'No description provided.'}</p>
//         <p><b>Location:</b> ${d.location || 'Unknown'}</p>
//       `;
//       itemsGrid.appendChild(card);
//     });
//   } catch (error) {
//     console.error("Error loading items:", error);
//     itemsGrid.innerHTML = `<p style="color:red">Error loading items: ${error.message}</p>`;
//   }
// }

// // FIX: Wait for Auth to initialize before loading.
// // This ensures that if your database rules require login, the request won't fail immediately.
// onAuthStateChanged(auth, (user) => {
//   // We load items regardless of user status here, but having this listener 
//   // ensures Firebase is fully connected before we query.
//   loadFound();
// });



















// public/view_items.js (DEBUG VERSION)
import { db, collection, getDocs, query, where, auth, onAuthStateChanged } from './firebase.js';

const itemsGrid = document.getElementById('itemsGrid');

// Helper to print debug messages to the page
function log(msg, color = 'black') {
  console.log(msg);
  const p = document.createElement('p');
  p.style.color = color;
  p.style.fontFamily = 'monospace';
  p.style.padding = '5px';
  p.style.borderBottom = '1px solid #eee';
  p.textContent = `> ${msg}`;
  itemsGrid.appendChild(p);
}

async function loadFound() {
  log("Starting loadFound()...", "blue");

  try {
    if (!db) throw new Error("Database object is missing! Check firebase.js");
    
    const col = collection(db, "items");
    log("Database connection OK. Querying collection 'items'...", "blue");

    // Query for items where type is "found"
    const q = query(col, where("type", "==", "found"));
    
    log("Sending request to Firestore...", "orange");
    const snapshot = await getDocs(q);
    
    log(`Request complete. Found ${snapshot.size} documents.`, "green");

    if (snapshot.empty) {
      log("Result is empty. Did you add an item with type='found'? Items with type='lost' will NOT show here.", "red");
      return;
    }

    // Clear logs to show items (Optional: comment this out to keep seeing logs)
    itemsGrid.innerHTML = ''; 

    snapshot.forEach(doc => {
      const d = doc.data();
      const card = document.createElement('div');
      card.className = 'card';
      // Fallback for missing images
      const imgUrl = d.imageURL || 'https://via.placeholder.com/220x140?text=No+Image';
      
      card.innerHTML = `
        <img src="${imgUrl}" style="width:100%; height:160px; object-fit:cover;" onerror="this.src='https://via.placeholder.com/220x140?text=Error'"/>
        <div style="padding:10px;">
          <h3>${d.item_name}</h3>
          <p>${d.description || 'No description'}</p>
          <p><b>Location:</b> ${d.location || 'Unknown'}</p>
        </div>
      `;
      itemsGrid.appendChild(card);
    });

  } catch (error) {
    log(`CRITICAL ERROR: ${error.message}`, "red");
    log(`Possible fix: Check Firestore Rules in Firebase Console.`, "red");
  }
}

// Check Auth state
log("Waiting for Auth...", "gray");
onAuthStateChanged(auth, (user) => {
  if (user) {
    log(`User logged in: ${user.email}`, "green");
  } else {
    log("User NOT logged in (continuing anyway...)", "orange");
  }
  loadFound();
});
