let fileArray = []; 

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

    droparea.addEventListener("drop", (e) => handleDrop(e));

    uploadButton.addEventListener("click", () => {
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
            displayFilesInFrame();
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
    const files = e.dataTransfer.files;
    const newFiles = [...files];
    fileArray.push(...newFiles);
    displayFilesInFrame();
}

function browseFiles() {
    console.log("file");
    const fileInput = document.getElementById('file-input');
    fileInput.addEventListener('change', (event) => {
    const files = event.target.files;
    if (files.length > 0) {
        fileArray.push(...files);
        displayFilesInFrame();
    }
});
fileInput.click();

}
function displayFilesInFrame() {
    let htmlContent = '<ul>'; 
    fileArray.forEach((file, index) => {
        const fileLink = URL.createObjectURL(file);
        htmlContent += `<li><a href="${fileLink}" target="_blank">${file.name}</a></li>`;
    });

    htmlContent += '</ul>'; 
    const blob = new Blob([htmlContent], { type: 'text/html' });

    const url = URL.createObjectURL(blob);
    const frameBox = document.getElementById('frame-box');
    frameBox.src = url;
    frameBox.style.display = 'block';
}



