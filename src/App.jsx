import './App.css';
import data from './mock_data';
import { camelToRegularCase, camelToKebabCase } from './utils/strings';

function BookCard({ book }) {
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
    </div>
  );
}

function Shelf({ shelf, children }) {
  const shelfHeading = camelToRegularCase(shelf);
  const shelfCssId = camelToKebabCase(shelf);

  return (
    <section id={shelfCssId} className="shelf-section">
      <h2>{shelfHeading}</h2>
      {children.map(child => (
        <BookCard key={child.id} book={child} />
      ))}
    </section>
  );
}

function App() {
  const [book1, book2, bk3, bk4, bk5, bk6] = data;

  return (
    <div className="App">
      <Shelf shelf="currentlyReading" children={[book1, book2]} />
      <Shelf shelf="wantToRead" children={[bk3, bk4]} />
      <Shelf shelf="read" children={[bk5, bk6]} />
    </div>
  );
}

export default App;
