import { v4 as uuidv4 } from "uuid";

async function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("NotepadApp", 1);

    request.onupgradeneeded = function (event) {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("notepads")) {
        const notepadOS = db.createObjectStore("notepads", { keyPath: "id" });
        notepadOS.createIndex("name", "name", { unique: true });
      }

      if (!db.objectStoreNames.contains("notes")) {
        const noteOS = db.createObjectStore("notes", { keyPath: "id" });
        noteOS.createIndex("notepadId", "notepadId", { unique: false });
        noteOS.createIndex("checked", "checked", { unique: false });
      }
    };

    request.onsuccess = function (event) {
      const db = event.target.result;
      resolve(db);
    };

    request.onerror = function (event) {
      reject(event.target.errorCode);
    };
  });
}


async function checkExistNotepad(db, name){
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["notepads"], "readonly");
    const store = transaction.objectStore("notepads");
    const index = store.index("name");
    const request = index.get(name);
    request.onsuccess = function(event){
      resolve(event.target.result);
    }
    request.onerror = function(event){
      reject(event.target.error);
    }
  });
}

async function createNotepad(db, name) {
  // check if the notepad name already exists
  const existNotepad = await checkExistNotepad(db, name);
  if(existNotepad){
    return existNotepad.id;
  }

  const transaction = db.transaction(["notepads"], "readwrite");
  const store = transaction.objectStore("notepads");
  const uuid = uuidv4();
  const notepad = { id: uuid, name: name };
  store.add(notepad);
  return uuid;
}

function createNote(db, notepadId, content) {
  const transaction = db.transaction(["notes"], "readwrite");
  const store = transaction.objectStore("notes");
  const uuid = uuidv4();
  const createdAt = new Date().toISOString();
  const note = {
    id: uuid,
    notepadId: notepadId,
    content: content,
    checked: false,
    createdAt: createdAt,
  };
  store.add(note);
  return uuid;
}
async function getNotepad(db, id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(["notepads", "notes"], "readonly");
    const notepadStore = transaction.objectStore("notepads");
    const noteStore = transaction.objectStore("notes");

    const notepadRequest = notepadStore.get(id);

    notepadRequest.onsuccess = function (event) {
      const notepad = event.target.result;

      if (notepad) {
        const notesRequest = noteStore.index("notepadId").getAll(id);

        notesRequest.onsuccess = function (event) {
          notepad.notes = event.target.result;
          resolve(notepad);
        };

        notesRequest.onerror = function (event) {
          reject(event.target.error);
        };
      } else {
        resolve(null);
      }
    };

    notepadRequest.onerror = function (event) {
      reject(event.target.error);
    };
  });
}

async function updateNote(db, note) {
  const transaction = db.transaction(["notes"], "readwrite");
  const store = transaction.objectStore("notes");
  store.put(note);
}

export { openDB, createNotepad, createNote, getNotepad, updateNote };
