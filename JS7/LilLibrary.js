document.addEventListener('DOMContentLoaded', function () {
    // Event listener for "Choose" buttons
    const chooseButtons = document.querySelectorAll('.choose-button');
    chooseButtons.forEach(button => {
        button.addEventListener('click', function () {
            const sectionId = this.dataset.sectionId;
            showSection(sectionId);
        });
    });

    // Event listeners for book operations
    document.getElementById('form-post-book').addEventListener('submit', function (event) {
        event.preventDefault();
        createBook();
    });

    document.getElementById('form-put-book').addEventListener('submit', function (event) {
        event.preventDefault();
        const title = document.getElementById('put-book').value;
        modifyBook(title);
    });

    document.getElementById('btnget-book').addEventListener('click', function () {
        const title = document.getElementById('get-book').value;
        getBook(title);
    });

    // Event listeners for bookshelf operations
    document.getElementById('form-post-bookshelf').addEventListener('submit', function (event) {
        event.preventDefault();
        createBookshelf();
    });

    document.getElementById('form-put-bookshelf').addEventListener('submit', function (event) {
        event.preventDefault();
        const id = document.getElementById('put-bookshelf').value;
        modifyBookshelf(id);
    });

    document.getElementById('btnget-bookshelf').addEventListener('click', function () {
        const id = document.getElementById('get-bookshelf').value;
        getBookshelf(id);
    });

    // Event listeners for genre operations
    document.getElementById('form-post-genre').addEventListener('submit', function (event) {
        event.preventDefault();
        createGenre();
    });

    document.getElementById('form-put-genre').addEventListener('submit', function (event) {
        event.preventDefault();
        const id = document.getElementById('put-genre').value;
        modifyGenre(id);
    });

    document.getElementById('btnget-genre').addEventListener('click', function () {
        const id = document.getElementById('get-genre').value;
        getGenre(id);
    });

    // Event listeners for main navigation buttons
    const mainNavButtons = document.querySelectorAll('.main-nav-button');
    mainNavButtons.forEach(button => {
        button.addEventListener('click', function () {
            const sectionId = this.dataset.sectionId;
            showMainSection(sectionId);
        });
    });

    // Initially show the book section
    showMainSection('section-book');
});

function showSection(sectionId) {
    // Hide all subsections
    const sections = document.querySelectorAll('.section');
    sections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the subsection corresponding to the selected button
    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.style.display = 'block';
    }
}

function showMainSection(sectionId) {
    // Hide all main sections
    const mainSections = document.querySelectorAll('.main-section');
    mainSections.forEach(section => {
        section.style.display = 'none';
    });

    // Show the main section corresponding to the selected button
    const sectionToShow = document.getElementById(sectionId);
    if (sectionToShow) {
        sectionToShow.style.display = 'block';
    }

    // Show the GET subsection by default
    const defaultSubsection = sectionToShow.querySelector('.section-get');
    if (defaultSubsection) {
        showSection(defaultSubsection.id);
    }
}

                // Book functions
function getBook(title) {           // Find a book (GET)
    fetch(`https://librarymanagementpw.azurewebsites.net/api/Book?title=${encodeURIComponent(title)}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        if (data.length > 0) {
            const book = data[0]; // Assume only one book is found
            document.getElementById('output-book1').innerText = `Book found: ${JSON.stringify(book)}`;
        } else {
            document.getElementById('output-book1').innerText = 'Book not found';
        }
    })
    .catch(error => {
        document.getElementById('output-book1').innerText = `Error: ${error.message}`;
    });
}

function createBook() {             // Create a book (POST)
    const id = document.getElementById('post-id-book').value;
    const title = document.getElementById('post-title-book').value;
    const price = document.getElementById('post-price-book').value;
    const genreId = document.getElementById('post-genreid-book').value;
    const shelfId = document.getElementById('post-shelfid-book').value;
    const genre = document.getElementById('post-genre-book').value;

    const bookData = { id, title, price, genreId, shelfId, genre };

    fetch('https://librarymanagementpw.azurewebsites.net/api/Book', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('output-book2').innerText = `Book created: ${JSON.stringify(data)}`;
    })
    .catch(error => {
        document.getElementById('output-book2').innerText = `Error: ${error}`;
    });
}

function modifyBook(title) {        // Modify a book (PUT)
    // Implement the PUT request to modify a book based on the title
}

                // Bookshelf functions
function getBookshelf(id) {         // Find a bookshelf (GET)
    fetch(`https://librarymanagementpw.azurewebsites.net/api/Bookshelf/${id}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('output-bookshelf1').innerText = `Bookshelf found: ${JSON.stringify(data)}`;
    })
    .catch(error => {
        document.getElementById('output-bookshelf1').innerText = `Error: ${error.message}`;
    });
}

function createBookshelf() {        // Create a bookshelf (POST)
    const id = document.getElementById('post-id-bookshelf').value;
    const location = document.getElementById('post-location-bookshelf').value;

    const bookshelfData = { id, location };

    fetch('https://librarymanagementpw.azurewebsites.net/api/Bookshelf', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bookshelfData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('output-bookshelf2').innerText = `Bookshelf created: ${JSON.stringify(data)}`;
    })
    .catch(error => {
        document.getElementById('output-bookshelf2').innerText = `Error: ${error}`;
    });
}

function modifyBookshelf(id) {      // Modify a bookshelf (PUT)
    // Implement the PUT request to modify a bookshelf based on the id
}

                // Genre functions
function getGenre(id) {             // Find a genre (GET)
    fetch(`https://librarymanagementpw.azurewebsites.net/api/Genre/${id}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        document.getElementById('output-genre1').innerText = `Genre found: ${JSON.stringify(data)}`;
    })
    .catch(error => {
        document.getElementById('output-genre1').innerText = `Error: ${error.message}`;
    });
}

function createGenre() {            // Create a genre (POST)
    const id = document.getElementById('post-id-genre').value;
    const name = document.getElementById('post-name-genre').value;

    const genreData = { id, name };

    fetch('https://librarymanagementpw.azurewebsites.net/api/Genre', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(genreData)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('output-genre2').innerText = `Genre created: ${JSON.stringify(data)}`;
    })
    .catch(error => {
        document.getElementById('output-genre2').innerText = `Error: ${error}`;
    });
}

function modifyGenre(id) {          // Modify a genre (PUT)
    // Implement the PUT request to modify a genre based on the id
}