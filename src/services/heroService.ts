import { Hero } from '../types/hero';

// Mock initial data
const HEROES: Hero[] = [
  { id: 1, name: 'Spider-Man', alterEgo: 'Peter Parker' },
  { id: 2, name: 'Iron Man', alterEgo: 'Tony Stark' },
  { id: 3, name: 'Black Widow', alterEgo: 'Natasha Romanoff' },
  { id: 4, name: 'Thor', alterEgo: 'Thor Odinson' },
  { id: 5, name: 'Captain America', alterEgo: 'Steve Rogers' },
  { id: 6, name: 'Hulk', alterEgo: 'Bruce Banner' },
  { id: 7, name: 'Black Panther', alterEgo: 'T\'Challa' },
  { id: 8, name: 'Doctor Strange', alterEgo: 'Stephen Strange' },
];

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const heroService = {
  getHeroes: async (): Promise<Hero[]> => {
    await delay(500);
    return [...HEROES];
  },

  getHero: async (id: number): Promise<Hero | undefined> => {
    await delay(300);
    return HEROES.find(hero => hero.id === id);
  },

  searchHeroes: async (term: string): Promise<Hero[]> => {
    await delay(300);
    return HEROES.filter(hero => 
      hero.name.toLowerCase().includes(term.toLowerCase())
    );
  },

  addHero: async (name: string): Promise<Hero> => {
    await delay(300);
    const newHero: Hero = {
      id: Math.max(...HEROES.map(h => h.id)) + 1,
      name
    };
    HEROES.push(newHero);
    return newHero;
  },

  updateHero: async (updatedHero: Hero): Promise<Hero> => {
    await delay(300);
    const index = HEROES.findIndex(h => h.id === updatedHero.id);
    if (index === -1) throw new Error('Hero not found');
    HEROES[index] = updatedHero;
    return updatedHero;
  },

  deleteHero: async (id: number): Promise<void> => {
    await delay(300);
    const index = HEROES.findIndex(h => h.id === id);
    if (index !== -1) {
      HEROES.splice(index, 1);
    }
  }
};