import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Nav from './Nav';
import Shelf from './Shelf';
import Filter from './Filter';
import Results from './Results';
import { getAll } from './utils/booksAPI';
import normalize from './utils/normalize';
import './App.css';

export const SHELVES = ['currentlyReading', 'wantToRead', 'read'];

function FilterableBookList({ books, onShelfChange }) {
  const [filterText, setFilterText] = useState('');

  return (
    <div>
      <Filter filterText={filterText} onFilterTextChange={setFilterText} />
      <Results
        books={books}
        filterText={filterText}
        onShelfChange={onShelfChange}
      />
    </div>
  );
}

function App() {
  const [books, setBooks] = useState(
    () => JSON.parse(window.localStorage.getItem('books')) ?? []
  );

  const [filterResults, setFilterResults] = useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      // normalize flattens and filters down the response
      const allBooks = await getAll().then(normalize);

      window.localStorage.setItem('books', JSON.stringify(allBooks));
      setBooks(allBooks);
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

        <button
          onClick={() => setFilterResults(!filterResults)}
          style={{ display: 'inline-block' }}
        >
          {filterResults ? 'Bookshelf' : 'Filter'} mode
        </button>
        {filterResults ? (
          <FilterableBookList books={books} onShelfChange={handleShelfChange} />
        ) : (
          SHELVES.map(shelf => {
            return (
              <Shelf
                key={shelf}
                shelf={shelf}
                books={books.filter(b => b.shelf === shelf)}
                totalBooks={books.length}
                onShelfChange={handleShelfChange}
              ></Shelf>
            );
          })
        )}
      </main>
    </div>
  );
}

export default App;
