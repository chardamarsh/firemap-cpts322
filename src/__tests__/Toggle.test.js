import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Toggle from '../Toggle';

describe('Toggle', () => {

    // Test to see if toggle renders darkmode
    it('Dark mode toggle renders correctly', () => {
      const { container } = render(<Toggle on={false} toggle={() => {}} />);
      // eslint-disable-next-line testing-library/no-node-access
      expect(container.firstChild).toMatchSnapshot();
    });
});