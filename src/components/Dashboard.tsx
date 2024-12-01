import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Trophy } from 'lucide-react';
import { Hero } from '../types/hero';
import { heroService } from '../services/heroService';
import { HeroSearch } from './HeroSearch';

export function Dashboard() {
  const [topHeroes, setTopHeroes] = useState<Hero[]>([]);

  useEffect(() => {
    loadTopHeroes();
  }, []);

  const loadTopHeroes = async () => {
    const heroes = await heroService.getHeroes();
    setTopHeroes(heroes.slice(0, 4));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center gap-2 text-blue-500">
        <Trophy className="h-8 w-8" />
        <h2 className="text-2xl font-bold">Top Heroes</h2>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {topHeroes.map(hero => (
          <Link
            key={hero.id}
            to={`/detail/${hero.id}`}
            className="p-6 bg-blue-500 text-white rounded-lg text-center hover:bg-blue-600 transition-colors"
          >
            <h3 className="font-medium">{hero.name}</h3>
          </Link>
        ))}
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-bold">Hero Search</h2>
        <HeroSearch />
      </div>
    </div>
  );
}