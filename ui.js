import { openDB, createNotepad, createNote } from './dbManager.js';
import { navigateTo } from './router.js';

document.addEventListener('DOMContentLoaded', (event) => {
  openDB();
  
  document.addEventListener('click', async function(event) {
    if (event.target.matches('#create-notepad')) {
      const notepadInput = document.getElementById('notepad');
      const notepadName = notepadInput.value.trim();
      if (notepadName) {
        const notepadId = await createNotepad(notepadName);
        navigateTo(`/notepads/${notepadId}`);
      } else {
        alert('Please enter a notepad name.');
      }
    }

    if (event.target.matches('#create-note')) {
      const notepadId = window.location.pathname.split('/').pop();
      const noteContent = document.getElementById('note-content').value.trim();
      if (noteContent) {
        await createNote(notepadId, noteContent);
        navigateTo(`/notepads/${notepadId}`);
      }
    }
  });
});
