import { useState, useEffect } from 'react';
import './App.css';
import Shelf from './Shelf';
import { getAll } from './booksAPI';
import normalize from './utils/normalize';

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
    </div>
  );
}

export default App;
