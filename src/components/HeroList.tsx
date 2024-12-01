import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Hero } from '../types/hero';
import { heroService } from '../services/heroService';

export function HeroList() {
  const [heroes, setHeroes] = useState<Hero[]>([]);
  const [newHeroName, setNewHeroName] = useState('');

  useEffect(() => {
    loadHeroes();
  }, []);

  const loadHeroes = async () => {
    const data = await heroService.getHeroes();
    setHeroes(data);
  };

  const handleAddHero = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newHeroName.trim()) {
      await heroService.addHero(newHeroName.trim());
      setNewHeroName('');
      loadHeroes();
    }
  };

  const handleDeleteHero = async (id: number) => {
    await heroService.deleteHero(id);
    setHeroes(heroes.filter(hero => hero.id !== id));
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleAddHero} className="flex gap-2">
        <Input
          type="text"
          value={newHeroName}
          onChange={(e) => setNewHeroName(e.target.value)}
          placeholder="Hero name"
        />
        <Button
          type="submit"
          icon={Plus}
        >
          Add Hero
        </Button>
      </form>

      <ul className="space-y-2">
        {heroes.map(hero => (
          <li
            key={hero.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow hover:shadow-md transition-shadow"
          >
            <Link
              to={`/detail/${hero.id}`}
              className="flex-1 hover:text-blue-500"
            >
              <span className="font-medium">{hero.name}</span>
            </Link>
            <Button
              variant="danger"
              icon={Trash2}
              onClick={() => handleDeleteHero(hero.id)}
              aria-label="Delete hero"
            />
          </li>
        ))}
      </ul>
    </div>
  );
}