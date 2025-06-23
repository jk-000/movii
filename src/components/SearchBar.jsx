import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  return (
    <form
      onSubmit={handleSearch}
      className="flex items-center gap-2 w-full justify-center"
    >
      <input
        type="text"
        placeholder="Search movies..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="border bg-white px-4 py-2.5 rounded md:w-[15vw] w-[50vw] max-w-full"
      />
      <button
        type="submit"
        className="bg-blue-600 text-white p-2.5 rounded hover:bg-blue-700 transition"
      >
        <Search size={20} />
      </button>
    </form>
  );
};

export default SearchBar;
