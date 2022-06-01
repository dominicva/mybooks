import { Link } from 'react-router-dom';

const Search = () => {
  return (
    <>
      <div className="search-bar-container">
        <input className="search-bar" type="text" placeholder="Search" />
      </div>
      <div>
        <Link to="/">Back to home</Link>
      </div>
    </>
  );
};

export default Search;
