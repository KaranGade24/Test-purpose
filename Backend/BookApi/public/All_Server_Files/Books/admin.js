

exports.admin = (req,res)=>{
const api = "https://didactic-couscous-4x9wv746j6j2j4pj-8080.app.github.dev/"

const html = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Upload Form</title>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 20px;
        padding: 20px;
        background-color: #f9f9f9;
      }
      h2 {
        text-align: center;
        color: #333;
      }
      form {
        max-width: 500px;
        margin: 0 auto;
        padding: 20px;
        background-color: #fff;
        border-radius: 8px;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
      }
      label {
        font-weight: bold;
        display: block;
        margin-bottom: 5px;
      }
      input[type="text"],
      input[type="number"],
      input[type="file"],
      textarea {
        width: 100%;
        padding: 8px;
        margin-bottom: 15px;
        border: 1px solid #ccc;
        border-radius: 4px;
        font-size: 14px;
      }
      button {
        display: block;
        width: 100%;
        padding: 10px;
        background-color: #007bff;
        color: #fff;
        border: none;
        border-radius: 4px;
        font-size: 16px;
        cursor: pointer;
      }
      button:hover {
        background-color: #0056b3;
      }
    </style>
  </head>
  <body>
    <h2>Upload Form</h2>
    <form
      id="uploadForm"
      action=${api}add
      method="POST"
      enctype="multipart/form-data"
    >
      <label for="name">Name:</label>
      <input type="text" id="name" name="name" required />

      <label for="isbn">ISBN:</label>
      <input type="text" id="isbn" name="isbn" required />

      <label for="genre">Genre:</label>
      <input type="text" id="genre" name="genre" required />

      <label for="year">Year of Publication:</label>
      <input type="number" id="year" name="year" required />

      <label for="description">Description:</label>
      <textarea
        id="description"
        name="description"
        rows="5"
        placeholder="Enter a brief description of the book..."
        required
      ></textarea>
      <label for="Abstraction">Abstraction:</label>
      <textarea
        id="Abstraction"
        name="Abstraction"
        rows="5"
        placeholder="Enter a brief Abstraction of the book..."
        required
      ></textarea>

      <label for="file1">Choose Book Cover:</label>
      <input type="file" id="file1" name="files" accept="image/*" required />

      <label for="file2">Choose eBook (PDF):</label>
      <input
        type="file"
        id="file2"
        name="files"
        accept="application/pdf"
        required
      />

      <button id="btn" type="submit">Upload</button>
    </form>

    <script>
      document.getElementById("uploadForm").onsubmit = async function (event) {
        event.preventDefault(); // Prevent form from being submitted traditionally

        const formData = new FormData(this); // Get form data

        try {
          const response = await fetch(
            ${api}add, // Adjust to your API URL
            {
              method: "POST",
              body: formData,
            }
          );

          const result = await response.json(); // Parse response as JSON
          alert(result.message);
          console.log("Uploaded files:", result.files);

          // Optionally, reset any specific fields you want here:
          // For example, if you want to reset only specific fields, do it manually.
          // document.getElementById("yourInputId").value = '';
        } catch (error) {
          console.error("Error uploading files:", error);
          alert("Failed to upload files. Please try again.");
        }
      };
      
    </script>
  </body>
</html>`

res.send(html);

}