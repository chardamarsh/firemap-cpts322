import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Flame from '../Flame';

describe('Flame', () => {
    
  // Test that the component renders
  it('Flame component renders', () => {
    render(<Flame />);
  });
})