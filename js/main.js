import {lit} from "./lit";

let fileArray = []; // Array to store file details

lit.connect()

const initApp = () => {
    const droparea = document.querySelector('.droparea');

    const active = () => droparea.classList.add("green-border");
    const inactive = () => droparea.classList.remove("green-border");
    const prevents = (e) => e.preventDefault();

    ['dragenter', 'dragover', 'dragleave', 'drop'].forEach(evtName => {
        droparea.addEventListener(evtName, prevents);
    });

    ['dragenter', 'dragover'].forEach(evtName => {
        droparea.addEventListener(evtName, active);
    });

    ['dragleave', 'drop'].forEach(evtName => {
        droparea.addEventListener(evtName, inactive);
    });

    droparea.addEventListener("drop", (e) => {
        handleDrop(e)
        if (lit.encryptFile(e)) {
            console.log("Encryption done");
        } else {
            console.log("Encryption failed");
        }
    });
}

document.addEventListener("DOMContentLoaded", initApp);

const handleDrop = (e) => {
    const dt = e.dataTransfer;
    const files = dt.files;
    const newFiles = [...files];

    // Add new files to the existing fileArray
    fileArray.push(...newFiles);

    // Get the file list container
    const fileListContainer = document.getElementById('file-list-container');

    // Create a new div for each file
    newFiles.forEach((file, index) => {
        const fileDiv = document.createElement('div');
        fileDiv.textContent = file.name;
        fileDiv.addEventListener('click', () => {
            // Open the file when the div is clicked
            window.open(URL.createObjectURL(file));
        });

        // Append the div to the file list container
        fileListContainer.appendChild(fileDiv);
    });

    console.log("Hello")
}