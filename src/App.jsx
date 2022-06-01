import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import Shelf from './Shelf';
import Filter from './Filter';
import BookCard from './BookCard';
import { camelToKebabCase, camelToRegularCase } from './utils/strings';
import { getAll } from './booksAPI';
import normalize from './utils/normalize';
import './App.css';

export const SHELVES = ['currentlyReading', 'wantToRead', 'read'];

function FilterableBookList({ books, onShelfChange }) {
  const [filterText, setFilterText] = useState('');

  return (
    <div>
      <Filter filterText={filterText} onFilterTextChange={setFilterText} />
      <Results
        books={books}
        filterText={filterText}
        onShelfChange={onShelfChange}
      />
    </div>
  );
}

function Results({ books, filterText, onShelfChange }) {
  const normalizedFilterText = filterText.toLowerCase();

  const booksToRender = [];

  books.forEach(book => {
    if (
      book.title.toLowerCase().indexOf(normalizedFilterText) === -1 &&
      book.authors
        .join(' ')
        .replaceAll(/[^a-zA-Z]/g, '')
        .toLowerCase()
        .indexOf(normalizedFilterText) === -1
    ) {
      return;
    }

    booksToRender.push(
      <BookCard key={book.id} book={book} onShelfChange={onShelfChange} />
    );
  });

  return <section id="results">{booksToRender}</section>;
}

function App() {
  const [books, setBooks] = useState(
    () => JSON.parse(window.localStorage.getItem('books')) ?? []
  );

  useEffect(() => {
    const fetchBooks = async () => {
      const allBooks = await getAll();
      const normalized = normalize(allBooks);

      window.localStorage.setItem('books', JSON.stringify(normalized));
      setBooks(normalized);
    };

    const storedLocally = window.localStorage.getItem('books');
    !storedLocally && fetchBooks();
  }, []);

  function handleShelfChange(book, newShelf) {
    const otherBooks = books.filter(b => b.id !== book.id);
    const updatedBook = { ...book, shelf: newShelf };
    const newState = [...otherBooks, updatedBook];

    window.localStorage.setItem('books', JSON.stringify(newState));
    setBooks(newState);
  }

  // function handleFilter(e) {
  //   const query = e.target.value;
  //   setFilterText(query);
  // }

  return (
    <div className="App">
      <main>
        <Nav />
        <header>
          <div>
            <h1>My Reads</h1>
            <hr />
          </div>
          <Link to="/search">Add book</Link>
        </header>
        {/* <section className="filter">
          <label htmlFor="filter-books">Filter</label>
          <br />
          <input
            id="filter-books"
            type="text"
            value={filterText}
            onChange={handleFilter}
          />
        </section> */}
        <FilterableBookList books={books} onShelfChange={handleShelfChange} />
        {/* {SHELVES.map(shelf => {
          return (
            <Shelf
              key={shelf}
              shelf={shelf}
              books={books.filter(b => b.shelf === shelf)}
              totalBooks={totalBooks}
              onShelfChange={handleShelfChange}
            ></Shelf>
          );
        })} */}
      </main>
    </div>
  );
}

export default App;

/*
  const books = [
    {
      authors: ["William E. Shotts, Jr."],
      id: "nggnmAEACAAJ",
      pageCount: 480,
      shelf: "currentlyReading",
      subtitle: "A Complete Introduction",
      thumbnail:
        "http://books.google.com/books/content?id=nggnmAEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api",
      title: "The Linux Command Line"
    },
    {
      authors: ["Robert Galbraith", "David Sinclair"],
      id: "evuwdDLfAyYC",
      pageCount: 464,
      shelf: "wantToRead",
      subtitle: "Another one flew",
      thumbnail:
        "http://books.google.com/books/content?id=evuwdDLfAyYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api",
      title: "The Cuckoo's Calling"
    }
  ]; */
