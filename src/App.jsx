import { useState } from 'react';
import './App.css';
import booksData from './mock_data';
import { camelToRegularCase, camelToKebabCase } from './utils/strings';

export const SHELVES = ['currentlyReading', 'wantToRead', 'read'];

function BookCard({ book, onShelfChange }) {
  const { thumbnail, title, authors, pageCount, shelf } = book;

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
      <div>{camelToRegularCase(shelf)}</div>

      <label htmlFor="shelf-select">
        Move shelf
        <select
          name="shelves"
          id="shelf-select"
          onChange={e => {
            onShelfChange(book, e.target.value);
          }}
        >
          <option value={camelToKebabCase(shelf)}>
            {camelToRegularCase(shelf)}
          </option>
          {SHELVES.map(shelf => {
            return (
              <option key={shelf} value={shelf}>
                {camelToRegularCase(shelf)}
              </option>
            );
          })}
        </select>
      </label>
    </div>
  );
}

function Shelf({ shelf, books, onShelfChange }) {
  const shelfHeading = camelToRegularCase(shelf);

  return (
    <section className="shelf-section">
      <h2>{shelfHeading}</h2>
      {books.map(book => {
        return (
          <BookCard key={book.id} book={book} onShelfChange={onShelfChange} />
        );
      })}
    </section>
  );
}

function App() {
  const [books, setBooks] = useState([...booksData]);

  function handleShelfChange(book, newShelf) {
    const otherBooks = books.filter(b => b.id !== book.id);
    const updatedBook = { ...book, shelf: newShelf };

    setBooks([...otherBooks, updatedBook]);
  }

  return (
    <div className="App">
      {SHELVES.map(shelf => {
        return (
          <Shelf
            key={shelf}
            shelf={shelf}
            books={books.filter(b => b.shelf === shelf)}
            onShelfChange={handleShelfChange}
          ></Shelf>
        );
      })}
    </div>
  );
}

export default App;
