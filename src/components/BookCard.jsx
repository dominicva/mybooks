import { useRef } from 'react';
import { camelToKebabCase, camelToRegularCase } from '../utils/strings';
import { SHELVES } from '../App';

function BookCard({ book, isSearchResult = false, onShelfChange = () => {} }) {
  const selectRef = useRef();
  const { title, authors, pageCount, shelf, thumbnail } = book;

  // conditional elements start
  const addButton = isSearchResult ? (
    <button
      onClick={e => {
        selectRef.current.disabled = false;
      }}
    >
      Add to library
    </button>
  ) : null;

  const defaultOption = isSearchResult ? (
    <option defaultValue="select-shelf">Pick a shelf</option>
  ) : (
    <option defaultValue={camelToKebabCase(shelf)}>
      {camelToRegularCase(shelf)}
    </option>
  );
  // conditional elements end

  return (
    <div className="book-container">
      <div
        className="thumbnail"
        style={{ backgroundImage: `url(${thumbnail})` }}
      ></div>
      <div className="metadata">
        <h3>{title}</h3>
        {/* optional chaining was essential to avoid errors */}
        <h4>{authors?.join(' & ')}</h4>
        <p>{pageCount} pages</p>
      </div>
      <div id="add-book-container">
        <label>
          {addButton}
          <select
            id="shelf-select"
            ref={selectRef}
            disabled={isSearchResult}
            onChange={e => {
              onShelfChange(book, e.target.value);
            }}
          >
            {defaultOption}
            {SHELVES.filter(s => s !== shelf).map(shelf => {
              return (
                <option key={shelf} value={shelf}>
                  {camelToRegularCase(shelf)}
                </option>
              );
            })}
          </select>
        </label>
      </div>
    </div>
  );
}

export default BookCard;
