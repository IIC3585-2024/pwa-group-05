import { openDB, createNotepad, createNote } from "./dbManager.js";
import { navigate } from "./router.js";

document.addEventListener("DOMContentLoaded", async () => {
  document.addEventListener("click", async function (event) {
    const db = await openDB();
    if (event.target.matches("#create-notepad")) {
      const notepadInput = document.getElementById("notepad");
      const notepadName = notepadInput.value.trim();
      if (notepadName) {
        const notepadId = await createNotepad(db, notepadName);
        navigate(`/notepads/${notepadId}`);
      } else {
        alert("Please enter a notepad name.");
      }
    }
  });
});
