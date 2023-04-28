import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Map from '../Map';


const mockFireData = [
  {
    "id": "fire-1",
    "geometry": {
      "type": "Point",
      "coordinates": [-122.4, 37.8]
    },
    "properties": {
      "IncidentName": "Potato Gulch RX",
      "IncidentShortDescription": null,
      "IncidentTypeCategory": "RX"
    }
  }
]

describe('Map', () => {
  // Test that the component renders
  it('Map component renders', () => {
    render(<Map />);
  });

  // Test that the map container renders
  it('Map-container renders', () => {
    render(<Map />);
    expect(screen.getByTestId('map-container')).toBeInTheDocument();
  });

  // Test that the map has at least one FireMarker
  it('Map displays at least one FireMarker', () => {
    const { container } = render(<Map data={mockFireData} />);
    // eslint-disable-next-line testing-library/no-container, testing-library/no-node-access
    const fireMarkers = container.querySelectorAll('.fire-marker');
    expect(fireMarkers.length).toBeGreaterThanOrEqual(1);
  });
})




