import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MainLayout } from './components/layout/MainLayout';
import { Dashboard } from './components/Dashboard';
import { HeroList } from './components/HeroList';
import { HeroDetail } from './components/HeroDetail';

export default function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/heroes" element={<HeroList />} />
          <Route path="/detail/:id" element={<HeroDetail />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}