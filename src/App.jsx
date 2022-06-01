import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Nav from './Nav';
import Shelf from './Shelf';
import { getAll } from './booksAPI';
import normalize from './utils/normalize';
import './App.css';
import BookCard from './BookCard';

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

function BookPreview({ book }) {
  const { title, authors, subtitle } = book;
  return (
    <tr>
      <td>
        {title} {subtitle ? `– ${subtitle}` : ''}
      </td>
      <td>{authors.join(' & ')}</td>
    </tr>
  );
}

function Results({ books, filterText }) {
  const filterTxt = filterText.toLowerCase();

  const rows = [];

  books.forEach(book => {
    if (
      book.title.toLowerCase().indexOf(filterTxt) === -1 &&
      book.authors
        .join(' ')
        .replaceAll(/[^a-zA-Z]/g, '')
        .toLowerCase()
        .indexOf(filterTxt) === -1
    ) {
      return;
    }

    rows.push(<BookPreview book={book} key={book.id} />);
  });

  return (
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Authors</th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function SearchBar({ filterText, onFilterTextChange }) {
  return (
    <form>
      <input
        type="text"
        value={filterText}
        placeholder="Search..."
        onChange={e => onFilterTextChange(e.target.value)}
      />
    </form>
  );
}

function App() {
  // const [filterText, setFilterText] = useState('');

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

  // function handleShelfChange(book, newShelf) {
  //   const otherBooks = books.filter(b => b.id !== book.id);
  //   const updatedBook = { ...book, shelf: newShelf };
  //   const newState = [...otherBooks, updatedBook];

  //   window.localStorage.setItem('books', JSON.stringify(newState));
  //   setBooks(newState);
  // }

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
