// view_items.js
import { db, collection, getDocs, query, where } from './firebase.js';

const itemsGrid = document.getElementById('itemsGrid');

async function loadFound() {
  const col = collection(db, "items");
  const q = query(col, where("type", "==", "found"));
  const snapshot = await getDocs(q);
  snapshot.forEach(doc => {
    const d = doc.data();
    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
      <img src="${d.imageURL || 'https://via.placeholder.com/220x140'}" />
      <h3>${d.item_name}</h3>
      <p>${d.description || ''}</p>
      <p><b>Location:</b> ${d.location || ''}</p>
    `;
    itemsGrid.appendChild(card);
  });
}

loadFound();
