'use client'

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { FaSearch } from "react-icons/fa";

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SuggestionResType[]>([]);
  const [loading, setLoading] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const debounce = (fn: Function, delay: number) => {
    let timeout: NodeJS.Timeout;
    return (...args: any) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  };

  const fetchAutocompleteResults = async (query: string) => {
    try {
      setLoading(true);
      const response = await axios.get(`/api/autocomplete?q=${encodeURIComponent(query)}`);
      setSuggestions(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching autocomplete results:', error);
      setLoading(false);
    }
  };

  const debouncedFetchAutocomplete = useCallback(
    debounce(fetchAutocompleteResults, 300),
    []
  );

  useEffect(() => {
    if (query.length >= 3) {
      debouncedFetchAutocomplete(query);
    } else {
      setSuggestions([]);
    }
  }, [query, debouncedFetchAutocomplete]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/posts?search=${encodeURIComponent(query)}`);
    }
  };

  const handleClickOutside = (event: MouseEvent) => { 
    if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) { 
      setSuggestions([]); 
    } 
  };

  useEffect(() => { 
    document.addEventListener('mousedown', handleClickOutside); 
    return () => { 
      document.removeEventListener('mousedown', handleClickOutside); 
    }; 
  }, []);

  return (
    <div className="search-bar relative" ref={searchBarRef}>
      <form onSubmit={handleSearchSubmit}>
        <div className="flex items-center border rounded-lg p-2 bg-white shadow-sm">
          <input
            className="flex-grow text-lg focus:outline-none focus:ring-2 focus:ring-white"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search blog posts..."
          />
          {
            loading ? (<div className="flex justify-center items-center ">
              <div className='w-4 h-4 border-2 border-dashed rounded-full animate-spin border-purple-600'></div>
            </div>): (<button type="submit">
              <FaSearch className="text-purple-600" size={24} />
            </button>)
          }
          
        </div>
      </form>

      {query.length >= 3 && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-white border border-gray-100 w-full mt-2 rounded-lg shadow-lg">
          {suggestions.map((suggestion) => (
            <li onClick={() => router.push(`/posts/${suggestion.id}`)} key={suggestion.id} className="px-4 py-2 cursor-pointer hover:bg-gray-100" dangerouslySetInnerHTML={{ __html: suggestion.text }} ></li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
