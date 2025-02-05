const API_URL = "http://localhost:4000/books";

// Fungsi untuk mengambil daftar buku dari API
function fetchBooks() {
    fetch(API_URL)
        .then(res => res.json())
        .then(data => {
            const bookList = document.getElementById("bookList");
            if (bookList) {  // Hanya jalankan pada halaman index
                bookList.innerHTML = ""; // Reset daftar buku
                data.forEach(book => {
                    bookList.innerHTML += `
                        <tr>
                            <td>${book.title}</td>
                            <td>${book.author}</td>
                            <td>${book.year}</td>
                            <td>
                                <button class="btn btn-warning btn-sm" onclick="showEditModal(${book.id_book}, '${book.title}', '${book.author}', ${book.year})">
                                    <i class="fas fa-edit"></i>    
                                </button>
                                <button class="btn btn-danger btn-sm" onclick="deleteBook(${book.id_book})">
                                    <i class="fas fa-trash"></i>    
                                </button>
                            </td>
                        </tr>
                    `;
                });
            }
        });
}

// Fungsi untuk menambah buku
document.getElementById("bookForm")?.addEventListener("submit", function(event) {
    event.preventDefault(); // Menghindari refresh
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const year = document.getElementById("year").value;

    fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, year })
    }).then(() => {
        window.location.href = "index.html"; // Arahkan ke halaman index setelah berhasil menambah buku
    });
});

// Fungsi untuk menghapus buku
function deleteBook(id) {
    fetch(`${API_URL}/${id}`, { method: "DELETE" })
        .then(() => fetchBooks()); // Update daftar buku setelah dihapus
}

// Fungsi untuk menampilkan modal edit buku
function showEditModal(id, title, author, year) {
    const editModal = new bootstrap.Modal(document.getElementById("editModal"));
    document.getElementById("editId").value = id;
    document.getElementById("editTitle").value = title;
    document.getElementById("editAuthor").value = author;
    document.getElementById("editYear").value = year;
    editModal.show();
}

// Fungsi untuk menyimpan perubahan edit buku
document.getElementById("editForm")?.addEventListener("submit", function(event) {
    event.preventDefault(); // Menghindari refresh
    const id = document.getElementById("editId").value;
    const title = document.getElementById("editTitle").value;
    const author = document.getElementById("editAuthor").value;
    const year = document.getElementById("editYear").value;

    fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, author, year })
    }).then(() => {
        fetchBooks();  // Update daftar buku setelah edit
        bootstrap.Modal.getInstance(document.getElementById("editModal")).hide();  // Tutup modal
    });
});

// Memanggil fungsi fetchBooks untuk memuat daftar buku pada halaman index
if (document.getElementById("bookList")) {
    fetchBooks();
}
