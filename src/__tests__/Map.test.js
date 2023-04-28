import { render } from '@testing-library/react';
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
  it('renders without crashing', () => {
    render(<Map />);
  });

  // Test that the map container renders
  it('renders map-container', () => {
    const { getByTestId } = render(<Map />);
    expect(getByTestId('map-container')).toBeInTheDocument();
  });

  // Test that the map has at least one FireMarker
  it('displays at least one FireMarker', () => {
    const { container } = render(<Map data={mockFireData} />);
    const fireMarkers = container.querySelectorAll('.fire-marker');
    expect(fireMarkers.length).toBeGreaterThanOrEqual(1);
  });

})