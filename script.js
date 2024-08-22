document.getElementById("saveNote").addEventListener("click", async () => {
    const content = document.getElementById("noteContent").value;
    const name = document.getElementById("noteName").value;
    if (content && name) {
        try {
            await axios.post("https://clustered-one.vercel.app/api/notes", { content, name });
            document.getElementById("noteContent").value = "";
            document.getElementById("noteName").value = "";
            loadNotes();
        } catch (err) {
            console.log(err);
        }
    } else {
        alert("Please enter both note and your name");
    }
});

async function loadNotes() {
    const notesList = document.getElementById("notesList");
    const loadingMessage = document.getElementById("loadingMessage");


    loadingMessage.style.display = "block";
    notesList.style.display = "none";

    try {
        const response = await axios.get("https://clustered-one.vercel.app/api/notes");

        notesList.innerHTML = "";  
        response.data.forEach(note => {
            const li = document.createElement("li");
            li.className = "list-group-item mt-3";
            li.innerHTML = `<p>${note.content}</p>
                            <small>By ${note.name} at ${new Date(note.createdAt).toLocaleString()}</small>`;
            notesList.appendChild(li);
        });


        loadingMessage.style.display = "none";
        notesList.style.display = "block";
    } catch (err) {
        console.log("Error loading notes:", err);
        loadingMessage.innerHTML = "<p class='text-danger'>Error loading notes. Please try again later.</p>";
    }
}

document.addEventListener("DOMContentLoaded", loadNotes);
