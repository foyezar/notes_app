'use strict'

const title = document.querySelector('#note-title');
const body = document.querySelector('#note-body');
const lastEdited = document.querySelector('#last-edited');
const noteId = location.hash.substring(1);
let notes = getSavedNotes();
let note = notes.find(note => note.id === noteId);

if(!note) {
  location.assign('index.html');
}

title.value = note.title;
body.value = note.body;
lastEdited.textContent = generateLastEdited(note.updatedAt);

title.addEventListener('input', (e) => {
  note.title = e.target.value;
  note.updatedAt = moment().valueOf();
  lastEdited.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

body.addEventListener('input', (e) => {
  note.body = e.target.value;
  note.updatedAt = moment().valueOf();
  lastEdited.textContent = generateLastEdited(note.updatedAt);
  saveNotes(notes);
});

document.querySelector('#remove-note').addEventListener('click', () => {
  removeNote(note.id);
  saveNotes(notes);
  location.assign('index.html');
})

window.addEventListener('storage', e => {
  if(e.key === 'notes') {
    notes = JSON.parse(e.newValue);
    note = notes.find(note => note.id === noteId);

    if(!note) {
      location.assign('index.html');
    }

    title.value = note.title;
    body.value = note.body;
    lastEdited.textContent = generateLastEdited(note.updatedAt);
  }
})