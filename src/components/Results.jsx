import BookCard from './BookCard';

function Results({ books, filterText, onShelfChange }) {
  const normalizedFilterText = filterText.toLowerCase();

  const booksToRender = [];

  books.forEach(book => {
    if (
      book.title.toLowerCase().indexOf(normalizedFilterText) === -1 &&
      book.authors
        .join(' ')
        .replaceAll(/[^a-zA-Z|]/g, '')
        .toLowerCase()
        .indexOf(normalizedFilterText) === -1
    ) {
      return;
    }

    booksToRender.push(
      <BookCard key={book.id} book={book} onShelfChange={onShelfChange} />
    );
  });

  return <section id="results">{booksToRender}</section>;
}

export default Results;
