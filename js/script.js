'use strict';

const noteList = document.querySelector('.note__list');
const createNoteBtn = document.querySelector('.create__note');

function getZero(num) {
    if (num >= 0 && num < 10) {
        return `0${num}`;
    } else {
        return num;
    }
}

//Create Note
function createNote(btn) {
    btn.addEventListener('click', () => {

        const date = new Date();
        const currentDate = () => `${getZero(date.getFullYear())}-${getZero(date.getMonth()+1)}-${getZero(date.getDate())}, ${getZero(date.getHours())}:${getZero(date.getMinutes())}:${getZero(date.getSeconds())}`;

        const listItem = `
            <li class="note__list__elem">
                 <header class="note__list__elem__header">
                     <span class="create__time">Created:${currentDate()}</span>
                    <button delete class="delete__note__item">×</button>
                 </header>
                 <textarea></textarea>
            </li>
        `;

        noteList.insertAdjacentHTML('afterbegin', listItem);

        setTextInTag();
       
        toLocal();
    });
}

createNote(createNoteBtn);

//Delete Note
function deleteNote(parent) {
    parent.addEventListener('click', (e) => {
        const allBtns = document.querySelectorAll('.delete__note__item');

        allBtns.forEach((btn) => {
            if (e.target === btn) {
                btn.parentNode.parentNode.parentNode.removeChild(btn.parentNode.parentNode);
            }
            toLocal();
        });
    });
}

deleteNote(noteList);

function setTextInTag() {
    const textarea = document.querySelectorAll('textarea');
    textarea.forEach(area => {
        area.addEventListener('input', (e) => area.innerText = e.target.value);
        toLocal();
        area.addEventListener('change', () => {
            toLocal();
        });
    });
}

function toLocal() {
    let list = noteList.innerHTML;
    localStorage.setItem('notes', list);
}

if(localStorage.getItem('notes')) {
   noteList.innerHTML = localStorage.getItem('notes');
   setTextInTag();
}



