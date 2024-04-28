import { openDB, getNotepad, updateNote } from "../dbManager.js";

export default async function (params) {
  const notepadId = params[0];
  await openDB();
  let notepad = await getNotepad(notepadId);

  if (notepad) {
    const renderNotes = (notes) => {
      return notes
        .map(
          (note) => `
        <li class="bg-gray-100 p-4 rounded-md flex items-center">
          <input type="checkbox" class="mr-2 note-checkbox" data-note-id="${
            note.id
          }" ${note.checked ? "checked" : ""}>
          <span>${note.content}</span>
          <span class="ml-auto text-sm text-gray-500">${new Date(
            note.createdAt
          ).toLocaleString()}</span>
        </li>
      `
        )
        .join("");
    };

    const handleCreateNote = async () => {
      const noteContent = document.getElementById("note-content").value;
      if (noteContent.trim() !== "") {
        const newNote = {
          id: Date.now().toString(),
          content: noteContent,
          checked: false,
          createdAt: new Date().toISOString(),
        };
        notepad.notes.push(newNote);
        document.getElementById("note-content").value = "";
        applyFiltersAndSorting();
      }
    };

    const applyFiltersAndSorting = () => {
      const sortOrder = document.getElementById("sort-select").value;
      const filterValue = document.getElementById("filter-select").value;

      let filteredNotes;
      if (filterValue === "all") {
        filteredNotes = notepad.notes;
      } else if (filterValue === "checked") {
        filteredNotes = notepad.notes.filter((note) => note.checked);
      } else {
        filteredNotes = notepad.notes.filter((note) => !note.checked);
      }

      if (sortOrder === "asc") {
        filteredNotes.sort((a, b) => a.createdAt.localeCompare(b.createdAt));
      } else {
        filteredNotes.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
      }

      document.getElementById("notes-list").innerHTML =
        renderNotes(filteredNotes);
    };

    const handleSortNotes = () => {
      applyFiltersAndSorting();
    };

    const handleFilterNotes = () => {
      applyFiltersAndSorting();
    };

    const handleNoteCheckboxChange = async (event) => {
      const noteId = event.target.dataset.noteId;
      const note = notepad.notes.find((note) => note.id === noteId);
      note.checked = event.target.checked;
      await updateNote(note);
      applyFiltersAndSorting();
    };

    const attachEventListeners = () => {
      document
        .getElementById("create-note")
        .addEventListener("click", handleCreateNote);
      document
        .getElementById("sort-select")
        .addEventListener("change", handleSortNotes);
      document
        .getElementById("filter-select")
        .addEventListener("change", handleFilterNotes);
      document.getElementById("notes-list").addEventListener("change", (event) => {
        if (event.target.matches(".note-checkbox")) {
          handleNoteCheckboxChange(event);
        }
      });
    };

    const html = `
      <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold mb-4">${notepad.name}</h1>
      <div class="mb-8 flex">
        <input
          type="text"
          id="note-content"
          placeholder="Enter note content"
          class="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
        <button
          id="create-note"
          class="px-4 py-2 bg-blue-500 text-white rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create Note
        </button>
      </div>
      <div class="mb-4 flex items-center">
        <label for="sort-select" class="mr-2">Sort by:</label>
        <select
          id="sort-select"
          class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="asc">Ascending</option>
          <option value="desc">Descending</option>
        </select>
        <label for="filter-select" class="ml-4 mr-2">Filter by:</label>
        <select
          id="filter-select"
          class="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All</option>
          <option value="checked">Checked</option>
          <option value="unchecked">Unchecked</option>
        </select>
      </div>
      <div class="bg-white shadow-md rounded-md p-4">
        <h2 class="text-2xl font-semibold mb-4">Notes:</h2>
        <ul id="notes-list" class="space-y-4">
          ${renderNotes(notepad.notes)}
        </ul>
      </div>
    </div>
  `;

  setTimeout(() => {
    attachEventListeners();
  }, 0);

  return html;
} else {
  return `
    <div class="container mx-auto px-4 py-8">
      <h1 class="text-4xl font-bold mb-4">Notepad not found</h1>
      <p class="text-xl text-gray-600">The requested notepad with ID ${notepadId} does not exist.</p>
    </div>
  `;
}
}
