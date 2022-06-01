import { useState } from 'react';
import Filter from './Filter';
import Results from './Results';

function FilterMode({ books, onShelfChange }) {
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

export default FilterMode;
