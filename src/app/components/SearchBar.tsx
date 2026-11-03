'use client';

import { useEffect, useId, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { HiOutlineSearch } from 'react-icons/hi';

interface Suggestion {
  id: string;
  text: string[];
}

const MIN_QUERY_LENGTH = 3;
const DEBOUNCE_MS = 300;

const SearchBar = ({ onNavigate }: { onNavigate?: () => void }) => {
  const [query, setQuery] = useState('');
  // Results are stored with the query they answer, so stale ones are ignored.
  const [results, setResults] = useState({
    query: '',
    suggestions: [] as Suggestion[],
  });
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const listId = useId();

  const trimmed = query.trim();
  const isSearchable = trimmed.length >= MIN_QUERY_LENGTH;
  const suggestions =
    isOpen && isSearchable && results.query === trimmed
      ? results.suggestions
      : [];

  // Debounced autocomplete; aborts the in-flight request when the query
  // changes.
  useEffect(() => {
    if (!isSearchable) return;

    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `/api/autocomplete?q=${encodeURIComponent(trimmed)}`,
          { signal: controller.signal },
        );
        if (!res.ok) throw new Error(`Autocomplete failed (${res.status})`);
        setResults({ query: trimmed, suggestions: await res.json() });
        setActiveIndex(-1);
      } catch (error) {
        if (!controller.signal.aborted) {
          console.error('Error fetching autocomplete results:', error);
        }
      } finally {
        setLoading(false);
      }
    }, DEBOUNCE_MS);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [trimmed, isSearchable]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!searchBarRef.current?.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navigate = (href: string) => {
    setIsOpen(false);
    onNavigate?.();
    router.push(href);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (activeIndex >= 0 && suggestions[activeIndex]) {
      navigate(`/posts/${suggestions[activeIndex].id}`);
    } else if (trimmed) {
      navigate(`/posts?search=${encodeURIComponent(trimmed)}`);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (suggestions.length > 0 && e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % suggestions.length);
    } else if (suggestions.length > 0 && e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((i) => (i <= 0 ? suggestions.length - 1 : i - 1));
    }
  };

  return (
    <div className="relative" ref={searchBarRef}>
      <form role="search" onSubmit={handleSubmit}>
        <label className="relative block">
          <span className="sr-only">Search blog posts</span>
          <HiOutlineSearch
            className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-zinc-400"
            size={16}
            aria-hidden="true"
          />
          <input
            className="w-full rounded-lg border border-transparent bg-zinc-100 py-2 pr-8 pl-9 text-sm text-zinc-900 transition placeholder:text-zinc-500 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100 focus:outline-hidden [&::-webkit-search-cancel-button]:hidden"
            type="search"
            role="combobox"
            aria-expanded={suggestions.length > 0}
            aria-controls={listId}
            aria-autocomplete="list"
            aria-activedescendant={
              activeIndex >= 0 ? `${listId}-${activeIndex}` : undefined
            }
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            onKeyDown={handleKeyDown}
            placeholder="Search posts..."
          />
          {loading && (
            <span
              className="absolute top-1/2 right-3 h-3.5 w-3.5 -translate-y-1/2 animate-spin rounded-full border-2 border-zinc-300 border-t-violet-600"
              aria-hidden="true"
            />
          )}
        </label>
      </form>

      {suggestions.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-50 mt-2 w-full min-w-64 overflow-hidden rounded-xl border border-zinc-200 bg-white p-1 shadow-xl shadow-zinc-900/5"
        >
          {suggestions.map((suggestion, index) => (
            <li
              key={suggestion.id}
              id={`${listId}-${index}`}
              role="option"
              aria-selected={index === activeIndex}
            >
              <Link
                href={`/posts/${suggestion.id}`}
                onClick={() => {
                  setIsOpen(false);
                  onNavigate?.();
                }}
                className={`search-highlight block rounded-lg px-3 py-2 text-sm text-zinc-700 ${
                  index === activeIndex ? 'bg-zinc-100' : 'hover:bg-zinc-50'
                }`}
              >
                {/* Highlight fragments come from Elasticsearch with <em> tags. */}
                <span
                  dangerouslySetInnerHTML={{
                    __html: suggestion.text.join(' '),
                  }}
                />
              </Link>
            </li>
          ))}
          <li>
            <button
              type="button"
              onClick={() =>
                navigate(`/posts?search=${encodeURIComponent(trimmed)}`)
              }
              className="block w-full rounded-lg px-3 py-2 text-left text-xs font-medium text-zinc-500 hover:bg-zinc-50"
            >
              See all results for &ldquo;{trimmed}&rdquo;
            </button>
          </li>
        </ul>
      )}
    </div>
  );
};

export default SearchBar;
