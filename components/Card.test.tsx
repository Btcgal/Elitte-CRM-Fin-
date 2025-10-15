import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import Card from './Card';

describe('Card component', () => {
  it('renders children correctly', () => {
    const testMessage = 'Conteúdo do Card';
    render(<Card>{testMessage}</Card>);
    expect(screen.getByText(testMessage)).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const customClass = 'my-custom-class';
    const { container } = render(<Card className={customClass}>Conteúdo</Card>);
    expect(container.firstChild).toHaveClass(customClass);
  });
});
