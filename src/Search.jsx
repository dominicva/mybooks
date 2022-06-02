import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { search } from './utils/booksAPI';
import BookCard from './components/BookCard';
import './Search.css';

const normalizeApiResponse = ({
  id,
  title = 'no title provided',
  subtitle = '',
  authors,
  description,
  pageCount,
  publishedDate,
  imageLinks,
  previewLink,
}) => ({
  id,
  title,
  subtitle,
  authors,
  description,
  pageCount,
  thumbnail: imageLinks?.thumbnail,
  publishedDate,
  previewLink,
  shelf: '',
});

const Search = () => {
  const [query, setQuery] = useState('future');
  // we won't fetch on deletes
  const [doFetch, setDoFetch] = useState(true);

  const [books, setBooks] = useState([]);

  useEffect(() => {
    const searchAndNormalize = async () => {
      const response = await search(query);
      if (response?.error || !response) return;

      const normalized = response.map(normalizeApiResponse);

      setBooks(normalized);
    };
    doFetch && searchAndNormalize();
  }, [query, doFetch]);

  return (
    <>
      <div>
        <Link to="/">Back to home</Link>
      </div>
      <div className="search-bar-container">
        <label htmlFor="search-input"></label>
        <input
          id="search-input"
          type="text"
          value={query}
          onChange={e => {
            // at least no fetch on delete
            setDoFetch(e.nativeEvent.inputType === 'insertText');
            setQuery(e.target.value);
          }}
        />
      </div>
      {books.map(book => {
        return book ? (
          <BookCard key={book.id} book={book} isSearchResult={true} />
        ) : null;
      })}
    </>
  );
};

export default Search;
