// Get DOM elements
let addtxt = document.getElementById("addtxt");
let noteTitle = document.getElementById("noteTitle");
let addbtn = document.getElementById("addbtn");
let search = document.getElementById("searchTxt");

// Event listener for adding a note
addbtn.addEventListener("click", function (e) {
    // Get stored notes and titles from local storage
    let notes = localStorage.getItem("notes");
    let titles = localStorage.getItem("titles");

    // Initialize arrays if local storage is empty
    if (notes == null || titles == null) {
        noteobj = [];
        titleobj = [];
    } else {
        noteobj = JSON.parse(notes);
        titleobj = JSON.parse(titles);
    }

    // Get values from input fields
    addtxt_value = addtxt.value;
    noteTitle_value = noteTitle.value;

    // Check if input fields are empty
    if (addtxt_value.length == 0 || noteTitle_value.length == 0) {
        alert("Note Title or Note txt is empty!");
    } else {
        // Add note and title to arrays
        noteobj.push(addtxt.value);
        titleobj.push(noteTitle.value);

        // Update local storage
        localStorage.setItem("notes", JSON.stringify(noteobj));
        localStorage.setItem("titles", JSON.stringify(titleobj));

        // Clear input fields
        noteTitle.value = "";
        addtxt.value = "";

        // Display updated notes
        showNotes();
    }
});

// Function to display notes
function showNotes() {
    let notes = localStorage.getItem("notes");
    let titles = localStorage.getItem("titles");

    // Initialize arrays if local storage is empty
    if (notes == null || titles == null) {
        noteobj = [];
        titleobj = [];
    } else {
        noteobj = JSON.parse(notes);
        titleobj = JSON.parse(titles);
    }

    let html = "";

    // Generate HTML for each note
    noteobj.forEach(function (element, index) {
        html += `<div class="notecard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">${index + 1 + ". " + titleobj[index]}</h5>
                <p class="card-text">${element}</p>
                <button id="${index}" onclick="deleteNote(${index})" class="btn btn-primary">Delete Note</button>
                <button id="${index}" onclick="editNote(${index})" class="btn btn-primary">Edit Note</button>
            </div>
        </div>`;
    });

    // Display notes in the "notes" element
    let n = document.getElementById("notes");
    if (noteobj.length != 0) {
        n.innerHTML = html;
    } else {
        n.innerHTML = `Nothing to show!  Use "Add a Note" section to add notes.`;
    }
}

// Function to delete a note
function deleteNote(index) {
    noteobj = JSON.parse(localStorage.getItem("notes"));
    titleobj = JSON.parse(localStorage.getItem("titles"));
    noteobj.splice(index, 1);
    titleobj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(noteobj));
    localStorage.setItem("titles", JSON.stringify(titleobj));
    showNotes();
}

// Event listener for search input
search.addEventListener("input", function () {
    let notecard = document.getElementsByClassName("notecard");

    // Loop through notes and filter based on search input
    Array.from(notecard).forEach(function (element) {
        let search_t = search.value.toLowerCase();
        let current_text = element.getElementsByTagName("p")[0].innerText.toLowerCase();
        let current_title = element.getElementsByTagName("h5")[0].innerText.toLowerCase();
        if (current_text.includes(search_t) || current_title.includes(search_t)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    });
});

// Function to edit a note
function editNote(index) {
    let addtxt = document.getElementById("addtxt");
    let noteTitle = document.getElementById("noteTitle");

    let notes = localStorage.getItem("notes");
    let titles = localStorage.getItem("titles");

    // Initialize arrays if local storage is empty
    if (notes == null || titles == null) {
        noteobj = [];
        titleobj = [];
    } else {
        noteobj = JSON.parse(notes);
        titleobj = JSON.parse(titles);
    }

    // Set input values for editing
    addtxt.value = noteobj[index];
    noteTitle.value = titleobj[index];

    // Delete the note being edited
    deleteNote(index);
}
