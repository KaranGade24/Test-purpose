var result1;
const api = "https://test-purpose-yesu.onrender.com";
const uploadBtn = document.getElementById("btn");

async function toGetBooksForDisplaying() {
  try {
    const response = await fetch(api + "/bookss", { method: "GET" });

    if (response.ok) {
      result1 = await response.json();
      // Parse the JSON response
      console.log(result1);
      displayBooks(result1); // Function to display books on the frontend
    } else {
      console.error("Failed to fetch books. Status:", response.status);
    }
  } catch (error) {
    console.error("Error fetching books:", error);
  }
}

toGetBooksForDisplaying();

// Function to display the books
function displayBooks(books) {
  const bookList = document.getElementById("bookList");
  const bookUpdateDelete = document.getElementById("book-update-delete");
  bookList.innerHTML = ""; // Clear any existing books
  books.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");
    bookItem.innerHTML = `
     <p><strong>Book Cover:</strong></br></br><img src="${api}/uploads${
      book.files[0].filePath.split("/uploads")[1]
    }" alt="Book Cover" /></p>
      <p><strong>Name:</strong> ${book.name}</p>
      <p><strong>ISBN:</strong> ${book.isbn}</p>
      <p><strong>Genre:</strong> ${book.genre}</p>
      <p><strong>Year:</strong> ${book.year}</p>
      <p><strong>Print Price:</strong> ${book.printPrice}</p>
      <p><strong>eBook Price:</strong> ${book.ebookPrice}</p>
      <p><strong>Description:</strong> ${book.description}</p>
      <p><strong>Abstraction:</strong> ${book.Abstraction}</p>
      <p><strong>eBook:</strong> <a href="${api}/uploads${
      book.files[0].filePath.split("/uploads")[1]
    }" target="_blank" class="file-link">Download eBook</a></p>

`;
    //creating update button to update perticular book

    // const updateBookBtn = document.createElement("button");
    // updateBookBtn.className = "update-btn"; //add classes to btn for style
    // updateBookBtn.innerText = "Update"; //set btn inner text

    //creating delete button to delete perticular book

    const deleteBtn = document.createElement("button"); //create delete button
    deleteBtn.className = "update-btn"; //add classes to btn for style
    deleteBtn.innerText = "Delete"; //set btn inner text
    deleteBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      deleteBtn.disabled = true; //prevent btn action to stop repeted clicks
      // console.log(book._id);
      // console.log(api);
      try {
        const deletedBookResponse = await fetch(api + "/" + book._id, {
          method: "delete",
        }); //api call for deleting book data that select to delete
        if (deletedBookResponse.status === 200) {
          alert("book deleted successfully");
          location.reload();
        }
      } catch (error) {
        console.log(error);
      }
    });

    //append all books item,update and delete btn
    // bookItem.appendChild(updateBookBtn);
    bookItem.appendChild(deleteBtn);
    bookList.appendChild(bookItem);
  });
}

//from uploading section

document.getElementById("uploadForm").onsubmit = async function (event) {
  event.preventDefault(); // Prevent form from being submitted traditionally
  const formData = new FormData(this); // Get form data
  uploadBtn.disabled = true;
  uploadBtn.innerText = "uploading...";

  try {
    const response = await fetch(api + "/add", {
      method: "POST",
      body: formData,


      
    });

    const result = await response.json(); // Parse response as JSON

    if (result.message) {
      alert(result.message); // Show success message
      location.reload(); // use to reload window when data is added
    }
  } catch (error) {
    console.error("Error uploading files:", error);
    alert("Failed to upload files. Please try again.");
    location.reload(); // use to reload window when data is added
  }
};
