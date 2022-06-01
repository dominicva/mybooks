import BookCard from './BookCard';
import { camelToRegularCase } from './utils/strings';

function Shelf({ shelf, books, totalBooks, onShelfChange }) {
  const shelfHeading = camelToRegularCase(shelf);
  const shelfLength = books.length;

  return (
    <section className="shelf-section">
      <h2>{shelfHeading}</h2>
      <h3>
        {shelfLength} of {totalBooks} total books
      </h3>
      {books.map(book => {
        return (
          <BookCard key={book.id} book={book} onShelfChange={onShelfChange} />
        );
      })}
    </section>
  );
}

export default Shelf;
