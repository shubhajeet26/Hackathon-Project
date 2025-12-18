// // view_items.js
// import { db, collection, getDocs, query, where } from './firebase.js';

// const itemsGrid = document.getElementById('itemsGrid');

// async function loadFound() {
//   const col = collection(db, "items");
//   const q = query(col, where("type", "==", "found"));
//   const snapshot = await getDocs(q);
//   snapshot.forEach(doc => {
//     const d = doc.data();
//     const card = document.createElement('div');
//     card.className = 'card';
//     card.innerHTML = `
//       <img src="${d.imageURL || 'https://via.placeholder.com/220x140'}" />
//       <h3>${d.item_name}</h3>
//       <p>${d.description || ''}</p>
//       <p><b>Location:</b> ${d.location || ''}</p>
//     `;
//     itemsGrid.appendChild(card);
//   });
// }

// loadFound();



// Code given by Gemini

// view_items.js
import { db, collection, getDocs, query, where, auth, onAuthStateChanged } from './firebase.js';

const itemsGrid = document.getElementById('itemsGrid');

async function loadFound() {
  itemsGrid.innerHTML = '<p>Loading items...</p>';
  
  try {
    const col = collection(db, "items");
    // Query for items where type is "found"
    const q = query(col, where("type", "==", "found"));
    
    const snapshot = await getDocs(q);
    
    itemsGrid.innerHTML = ''; // Clear "Loading..." text

    if (snapshot.empty) {
      itemsGrid.innerHTML = '<p>No found items reported yet.</p>';
      return;
    }

    snapshot.forEach(doc => {
      const d = doc.data();
      const card = document.createElement('div');
      card.className = 'card';
      
      // Safety check for missing images or fields
      const imgUrl = d.imageURL || 'https://via.placeholder.com/220x140?text=No+Image';
      
      card.innerHTML = `
        <img src="${imgUrl}" alt="${d.item_name}" onerror="this.src='https://via.placeholder.com/220x140?text=Error'" />
        <h3>${d.item_name}</h3>
        <p>${d.description || 'No description provided.'}</p>
        <p><b>Location:</b> ${d.location || 'Unknown'}</p>
      `;
      itemsGrid.appendChild(card);
    });
  } catch (error) {
    console.error("Error loading items:", error);
    itemsGrid.innerHTML = `<p style="color:red">Error loading items: ${error.message}</p>`;
  }
}

// FIX: Wait for Auth to initialize before loading.
// This ensures that if your database rules require login, the request won't fail immediately.
onAuthStateChanged(auth, (user) => {
  // We load items regardless of user status here, but having this listener 
  // ensures Firebase is fully connected before we query.
  loadFound();
});


