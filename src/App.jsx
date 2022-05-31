import './App.css';
import data from './mock_data';

function App() {
  const [, book] = data;
  console.log('book:', book);

  return (
    <div className="App">
      <div className="book-container">
        <div
          className="thumbnail"
          style={{ backgroundImage: `url(${book.thumbnail})` }}
        ></div>
        <div className="metadata">
          <h2>{book.title}</h2>
          <h3>{book.authors.join(' & ')}</h3>
          <p>{book.pageCount} pages</p>
        </div>
        <div>{book.shelf}</div>
      </div>
    </div>
  );
}

export default App;
