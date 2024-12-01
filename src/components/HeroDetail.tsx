import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Save } from 'lucide-react';
import { Button } from './ui/Button';
import { Input } from './ui/Input';
import { Hero } from '../types/hero';
import { heroService } from '../services/heroService';

export function HeroDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [hero, setHero] = useState<Hero | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    loadHero();
  }, [id]);

  const loadHero = async () => {
    if (id) {
      setIsLoading(true);
      try {
        const data = await heroService.getHero(parseInt(id));
        setHero(data || null);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (hero) {
      setIsSaving(true);
      try {
        await heroService.updateHero(hero);
        navigate('/heroes');
      } finally {
        setIsSaving(false);
      }
    }
  };

  if (isLoading) {
    return <div className="text-center">Loading...</div>;
  }

  if (!hero) {
    return <div className="text-center">Hero not found</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button
          variant="danger"
          icon={ArrowLeft}
          onClick={() => navigate(-1)}
          aria-label="Go back"
        />
        <h2 className="text-2xl font-bold">{hero.name} Details</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          label="ID"
          type="text"
          value={hero.id}
          disabled
          className="bg-gray-100"
        />

        <Input
          label="Name"
          type="text"
          value={hero.name}
          onChange={(e) => setHero({ ...hero, name: e.target.value })}
        />

        <Input
          label="Alter Ego"
          type="text"
          value={hero.alterEgo || ''}
          onChange={(e) => setHero({ ...hero, alterEgo: e.target.value })}
        />

        <Button
          type="submit"
          icon={Save}
          disabled={isSaving}
          className="w-full justify-center"
        >
          {isSaving ? 'Saving...' : 'Save'}
        </Button>
      </form>
    </div>
  );
}