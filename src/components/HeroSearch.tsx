import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Input } from './ui/Input';
import { Hero } from '../types/hero';
import { heroService } from '../services/heroService';
import { useDebounce } from '../hooks/useDebounce';

export function HeroSearch() {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState<Hero[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const navigate = useNavigate();
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  useEffect(() => {
    if (debouncedSearchTerm) {
      setIsSearching(true);
      heroService.searchHeroes(debouncedSearchTerm)
        .then(heroes => {
          setResults(heroes);
          setIsSearching(false);
        });
    } else {
      setResults([]);
    }
  }, [debouncedSearchTerm]);

  return (
    <div className="relative">
      <div className="relative">
        <Input
          icon={Search}
          type="text"
          placeholder="Search heroes..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      
      {(results.length > 0 || isSearching) && (
        <div className="absolute z-10 w-full mt-1 bg-white rounded-lg shadow-lg">
          {isSearching ? (
            <div className="p-4 text-center text-gray-500">Searching...</div>
          ) : (
            <ul className="py-2">
              {results.map(hero => (
                <li
                  key={hero.id}
                  onClick={() => {
                    navigate(`/detail/${hero.id}`);
                    setSearchTerm('');
                    setResults([]);
                  }}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                >
                  {hero.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}