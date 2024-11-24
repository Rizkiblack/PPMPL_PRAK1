import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Counter from './counter';
import Display from './display';

describe('Counter Component', () => {
  test('renders the initial count value as 0', () => {
    render(<Counter />);
    const countValue = screen.getByTestId('count-value');
    expect(countValue).toHaveTextContent('0');
  });

  test('increments count when increment button is clicked', () => {
    render(<Counter />);
    const countValue = screen.getByTestId('count-value');
    const incrementButton = screen.getByText('Increment');
    fireEvent.click(incrementButton);
    expect(countValue).toHaveTextContent('1');
  });

  test('decrements count when decrement button is clicked', () => {
    render(<Counter />);
    const countValue = screen.getByTestId('count-value');
    const decrementButton = screen.getByText('Decrement');
    fireEvent.click(decrementButton);
    expect(countValue).toHaveTextContent('-1');

  });
  test('Display has correct value', () => {
    const { rerender } = render(<Display value={0} />); // Render pertama dengan nilai 0
    const displayValue = screen.getByTestId('display-value');
    expect(displayValue).toBeInTheDocument(); // Pastikan elemen ada
    expect(displayValue).toHaveTextContent('Value: 0'); // Mengharapkan nilai Display adalah 0
  
    rerender(<Display value={5} />); // Render ulang dengan nilai 5
    expect(displayValue).toHaveTextContent('Value: 5'); // Mengharapkan nilai Display menjadi 5
  });
});
  