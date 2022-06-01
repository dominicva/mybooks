import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import Shelf from './Shelf';
import { getAll } from './booksAPI';
import normalize from './utils/normalize';
import './App.css';
import BookCard from './BookCard';
import { camelToKebabCase, camelToRegularCase } from './utils/strings';

export const SHELVES = ['currentlyReading', 'wantToRead', 'read'];

function FilterableBookList({ books }) {
  const [filterText, setFilterText] = useState('');

  return (
    <div>
      <SearchBar filterText={filterText} onFilterTextChange={setFilterText} />
      <Results books={books} filterText={filterText} />
    </div>
  );
}

function BookPreview({ book, onShelfChange }) {
  const { title, authors, pageCount, shelf, thumbnail } = book;
  return (
    <div className="book-container">
      <div
        className="thumbnail"
        style={{ backgroundImage: `url(${thumbnail})` }}
      ></div>
      <div className="metadata">
        <h3>{title}</h3>
        <h4>{authors.join(' & ')}</h4>
        <p>{pageCount} pages</p>
      </div>
      <label htmlFor="shelf-select">Move shelf</label>
      <select
        id="shelf-select"
        onChange={e => {
          onShelfChange(book, e.target.value);
        }}
      >
        <option defaultValue={camelToKebabCase(shelf)}>
          {camelToRegularCase(shelf)}
        </option>
        {SHELVES.filter(s => s !== shelf).map(shelf => {
          return (
            <option key={shelf} value={shelf}>
              {camelToRegularCase(shelf)}
            </option>
          );
        })}
      </select>
    </div>
  );
}

function Results({ books, filterText }) {
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

    booksToRender.push(<BookPreview book={book} key={book.id} />);
  });

  return <section id="results">{booksToRender}</section>;
}

function SearchBar({ filterText, onFilterTextChange }) {
  return (
    <>
      <label htmlFor="filter-input">Filter books</label>
      <input
        id="filer-input"
        type="text"
        value={filterText}
        onChange={e => onFilterTextChange(e.target.value)}
      />
    </>
  );
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
        <FilterableBookList books={books} />
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
