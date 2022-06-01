function Filter({ filterText, onFilterTextChange }) {
  return (
    <>
      <label htmlFor="filter-input">Filter books</label>
      <input
        id="filer-input"
        type="text"
        value={filterText}
        onChange={e => onFilterTextChange(e.target.value)}
      />
    </>
  );
}

export default Filter;
