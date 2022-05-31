import './App.css';
import books from './mock_data';
import { camelToRegularCase, camelToKebabCase } from './utils/strings';

function BookCard({ book }) {
  const { thumbnail, title, authors, pageCount, shelf } = book;
  const shelfHeading = camelToRegularCase(shelf);
  const shelfValue = camelToKebabCase(shelf);

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
        <select name="shelves" id="shelf-select">
          <option value={shelfValue}>{shelfHeading}</option>
          <option value="want-to-read">Want To Read</option>
          <option value="read">Read</option>
        </select>
      </label>
    </div>
  );
}

function Shelf({ shelf, books }) {
  const shelfHeading = camelToRegularCase(shelf);
  const shelfCssId = camelToKebabCase(shelf);

  return (
    <section id={shelfCssId} className="shelf-section">
      <h2>{shelfHeading}</h2>
      {books.map(book => {
        return <BookCard key={book.id} book={book} />;
      })}
    </section>
  );
}

function App() {
  const SHELVES = ['currentlyReading', 'wantToRead', 'read'];

  return (
    <div className="App">
      {SHELVES.map(shelf => {
        return (
          <Shelf
            key={shelf}
            shelf={shelf}
            books={books.filter(b => b.shelf === shelf)}
          ></Shelf>
        );
      })}
    </div>
  );
}

export default App;
