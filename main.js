let titles= document.getElementById("title");
let authors=document.getElementById("author");
let pages=document.getElementById("pages");
let reads=document.getElementById("read");
let unreads=document.getElementById("unread");
const btn=document.querySelector(".card");
const form=document.getElementById("addBookForm");
const close=document.querySelector(".btn-cancel");
const backdrop = document.getElementById('backdrop');
const bookForm = document.querySelector('form');
const content = document.querySelector(".content");

const myLibrary = [];

function Book(tit,auth,pag,stat) 
{
    this.title=tit;
    this.author=auth;
    this.pages=pag;
    this.status=stat;
}

btn.addEventListener("click",()=>{
    form.style.display='block';
    backdrop.style.display='block';
})
close.addEventListener("click",()=>{
    form.style.display='none';
    backdrop.style.display='none';
})
bookForm.addEventListener('submit', (event) => {
    
    event.preventDefault(); 
    const readStatus = document.querySelector('input[name="reading"]:checked').value;
    const book1= new Book(titles.value,authors.value,pages.value,readStatus);
    myLibrary.push(book1);
    const newCard = createBookCard(book1);
    content.appendChild(newCard);
    bookForm.reset(); 
    form.style.display = 'none';
    backdrop.style.display = 'none';

})
function createBookCard(book) {
  const card = document.createElement("div");
  card.classList.add("card", "book-card");
  card.dataset.id = book.id;

  const t = document.createElement("p");
  t.className = "book-title";
  t.textContent = book.title;

  const a = document.createElement("p");
  a.className = "book-author";
  a.textContent = `by ${book.author}`;

  const p = document.createElement("p");
  p.className = "book-pages";
  p.textContent = `${book.pages} pages`;

  const s = document.createElement("p");
  s.className = "book-status";
  s.textContent = `Status: ${book.status === "read" ? "Read" : "Unread"}`;

  const toggleBtn = document.createElement("button");
  toggleBtn.className = "btn toggle-btn";
  toggleBtn.textContent = "Toggle Status";
  toggleBtn.addEventListener("click", () => {
    book.toggleStatus();                  
    s.textContent = `Status: ${book.status === "read" ? "Read" : "Unread"}`;
  });

  const delBtn = document.createElement("button");
  delBtn.className = "btn delete-btn";
  delBtn.textContent = "Delete";
  delBtn.addEventListener("click", () => {
    card.remove();
    const index = myLibrary.findIndex(b => b.id === book.id);
    if (index > -1) myLibrary.splice(index, 1);
  });

  const btnContainer = document.createElement("div");
  btnContainer.classList.add("btn-container");
  btnContainer.append(toggleBtn, delBtn);

  card.append(t, a, p, s, btnContainer);

  return card;
}

Book.prototype.toggleStatus = function () {
  this.status = this.status === "read" ? "unread" : "read";
}

