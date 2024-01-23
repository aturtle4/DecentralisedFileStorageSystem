let fileArray = []; // Array to store file details

const initApp = () => {
    const droparea = document.getElementById('droparea');
    const uploadButton = document.getElementById('uploadButton');

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
        handleDrop(e);
        if (lit.encryptFile(e)) {
            console.log("Encryption done");
        } else {
            console.log("Encryption failed");
        }
    });

    uploadButton.addEventListener("click", () => {
        // Trigger file upload logic or any other actions
        console.log("Upload button clicked");
    });
    const fileInput = document.createElement('input');
    fileInput.setAttribute('type', 'file');
    fileInput.setAttribute('id', 'file-input');
    fileInput.setAttribute('multiple', 'multiple');
    fileInput.style.display = 'none';
    fileInput.addEventListener('change', (event) => {
        const files = event.target.files;
        if (files.length > 0) {
            fileArray.push(...files);
            displayFiles();
        }
    });
    document.body.appendChild(fileInput);
    togglePopupMenu();
    browseFiles();
    
}

document.addEventListener("DOMContentLoaded", initApp);
function togglePopupMenu() {
    const popupMenu = document.getElementById('popup-menu');
    popupMenu.style.display = popupMenu.style.display === 'none' ? 'block' : 'none';
}

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
}

function browseFiles() {
    console.log("file");
    const fileInput = document.getElementById('file-input');
    fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    if (files.length > 0) {
        fileArray.push(...files);
        displayFiles();
    }
});
fileInput.click();

}
function displayFiles() {
const fileListContainer = document.getElementById('file-list-container');
fileListContainer.innerHTML = ''; 

fileArray.forEach((file, index) => {
    const fileDiv = document.createElement('div');
    fileDiv.textContent = file.name;
    fileDiv.addEventListener('click', () => {
        window.open(URL.createObjectURL(file));
    });

    fileListContainer.appendChild(fileDiv);
});
}

