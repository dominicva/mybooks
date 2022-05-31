import { useState, useEffect } from 'react';
import Shelf from './Shelf';
import Nav from './Nav';
import { getAll } from './booksAPI';
import normalize from './utils/normalize';
import './App.css';

export const SHELVES = ['currentlyReading', 'wantToRead', 'read'];

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const allBooks = await getAll();
      const normalized = normalize(allBooks);

      setBooks(normalized);
    };

    fetchBooks();
  }, []);

  function handleShelfChange(book, newShelf) {
    const otherBooks = books.filter(b => b.id !== book.id);
    const updatedBook = { ...book, shelf: newShelf };

    setBooks([...otherBooks, updatedBook]);
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
              onShelfChange={handleShelfChange}
            ></Shelf>
          );
        })}
      </main>
    </div>
  );
}

export default App;
