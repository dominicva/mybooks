import BookCard from './BookCard';
import { camelToRegularCase } from './utils/strings';

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

export default Shelf;
