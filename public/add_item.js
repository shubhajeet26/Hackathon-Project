// add_item.js
import { auth, onAuthStateChanged, db, collection, addDoc, serverTimestamp, sref, uploadBytes, getDownloadURL, storage } from './firebase.js';

const form = document.getElementById('itemForm');
const status = document.getElementById('status');

let currentUser = null;
onAuthStateChanged(auth, user => { currentUser = user; });

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!currentUser) return alert('Please sign in with Google first.');

  const item_name = document.getElementById('item_name').value.trim();
  const description = document.getElementById('description').value.trim();
  const category = document.getElementById('category').value;
  const item_type = document.getElementById('item_type').value;
  const location = document.getElementById('location').value.trim();
  const file = document.getElementById('image').files[0];
  if (!file) return alert('Please choose an image.');

  try {
    status.textContent = "Uploading image...";
    const fileRef = sref(storage, `images/${Date.now()}_${file.name}`);
    await uploadBytes(fileRef, file);
    const imageURL = await getDownloadURL(fileRef);

    status.textContent = "Saving item details...";
    const colRef = collection(db, "items");
    await addDoc(colRef, {
      item_name, description, category,
      type: item_type, location,
      imageURL, owner: currentUser.uid,
      timestamp: serverTimestamp()
    });

    status.textContent = "Submitted successfully!";
    form.reset();
  } catch (e) {
    status.textContent = "Error: " + e.message;
  }
});
