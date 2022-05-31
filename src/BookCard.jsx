import { camelToKebabCase, camelToRegularCase } from './utils/strings';
import { SHELVES } from './App';

function BookCard({ book, onShelfChange }) {
  const { thumbnail, title, authors, pageCount, shelf } = book;

  // shelf is the default for this card
  const otherOptions = SHELVES.filter(s => s !== shelf);

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
          <option defaultValue={camelToKebabCase(shelf)}>
            {camelToRegularCase(shelf)}
          </option>
          {otherOptions.map(shelf => {
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

export default BookCard;
