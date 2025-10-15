import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import Dashboard from './Dashboard';

// Mocking react-router-dom's Link component as it's not relevant for this test
vi.mock('react-router-dom', () => ({
  Link: ({ children }: { children: React.ReactNode }) => <a>{children}</a>,
}));

describe('Dashboard page', () => {
  it('renders all KPI cards correctly', () => {
    render(<Dashboard showSnackbar={() => {}} />);
    
    expect(screen.getByText('Receita Projetada (30d)')).toBeInTheDocument();
    expect(screen.getByText('Conversão Pipeline')).toBeInTheDocument();
    expect(screen.getByText('Inadimplência')).toBeInTheDocument();
    expect(screen.getByText('Pendências KYC')).toBeInTheDocument();
  });

  it('renders the advisor ranking card', () => {
    render(<Dashboard showSnackbar={() => {}} />);
    
    expect(screen.getByText('Ranking de Assessores (Atividades)')).toBeInTheDocument();
    // Check if the top ranked advisor is displayed (based on mock data)
    expect(screen.getByText('Ana Beatriz')).toBeInTheDocument();
  });

  it('renders the main chart', () => {
    render(<Dashboard showSnackbar={() => {}} />);
    
    expect(screen.getByText('Aplicações vs. Resgates (Mensal)')).toBeInTheDocument();
  });
});
