import { useState, useEffect } from 'react';
import Nav from './Nav';
import Shelf from './Shelf';
import { getAll } from './booksAPI';
import normalize from './utils/normalize';
import './App.css';

export const SHELVES = ['currentlyReading', 'wantToRead', 'read'];

function App() {
  const [books, setBooks] = useState(
    () => JSON.parse(window.localStorage.getItem('books')) ?? []
  );
  const totalBooks = books.length;

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
          <h1>My Reads</h1>
          <hr />
        </header>
        {SHELVES.map(shelf => {
          return (
            <Shelf
              key={shelf}
              shelf={shelf}
              books={books.filter(b => b.shelf === shelf)}
              totalBooks={totalBooks}
              onShelfChange={handleShelfChange}
            ></Shelf>
          );
        })}
      </main>
    </div>
  );
}

export default App;
