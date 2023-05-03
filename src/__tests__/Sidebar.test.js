import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Sidebar from '../Sidebar';

describe('Sidebar', () => {
    const mockSelectedFireData = {
      attributes: {
        IncidentName: 'Test Fire',
        InitialLatitude: 42.3601,
        InitialLongitude: -71.0589,
        IncidentSize: 100,
        IncidentTypeCategory: 'WF',
        FireCause: 'Test Cause',
        DispatchCenterID: 'Test Dispatch Center ID',
        POODispatchCenterID: 'Test POO Dispatch Center ID',
        POOCounty: 'Test County',
      },
    };

    // Test to see if sidebar renders
    it('Sidebar component renders', () => {
      render(
        <Sidebar
          darkMode={false}
          setDarkMode={() => {}}
          selectedFireData={mockSelectedFireData}
          selectedWeatherData={{}}
          open={true}
          setOpen={() => {}}
        />
      );
    });
    
    // Test to see if data is being displayed
    it('Displays selected fire data', () => {
      render(
        <Sidebar
          darkMode={false}
          setDarkMode={() => {}}
          selectedFireData={mockSelectedFireData}
          selectedWeatherData={{}}
          open={true}
          setOpen={() => {}}
        />
      );
      expect(screen.getByText('Test Fire')).toBeInTheDocument();
      expect(screen.getByText('Latitude: 42.3601')).toBeInTheDocument();
      expect(screen.getByText('Longitude: -71.0589')).toBeInTheDocument();
      expect(screen.getByText('Incident Size: 100 Acres')).toBeInTheDocument();
      expect(screen.getByText('Incident Type: Wildfire')).toBeInTheDocument();
      expect(screen.getByText('Fire Cause: Test Cause')).toBeInTheDocument();
      expect(screen.getByText('Dispatch Center ID: Test Dispatch Center ID')).toBeInTheDocument();
      expect(screen.getByText('POO Dispatch Center ID: Test POO Dispatch Center ID')).toBeInTheDocument();
      expect(screen.getByText('POO County: Test County')).toBeInTheDocument();
    });

    // Test to see if sidebar closes
    it('Closes sidebar', () => {
      const mockSetOpen = jest.fn();
      render(
        <Sidebar
          darkMode={false}
          setDarkMode={() => {}}
          selectedFireData={mockSelectedFireData}
          selectedWeatherData={{}}
          open={true}
          setOpen={mockSetOpen}
        />
      );
      const closeButton = screen.getByTestId('close-button');
      closeButton.click();
      expect(mockSetOpen).toHaveBeenCalled();
    });

    // Test to see if sidebar opens
    it('Opens sidebar', () => {
      const mockSetOpen = jest.fn();
      render(
        <Sidebar
          darkMode={false}
          setDarkMode={() => {}}
          selectedFireData={mockSelectedFireData}
          selectedWeatherData={{}}
          open={false}
          setOpen={mockSetOpen}
        />
      );
      const openButton = screen.getByTestId('open-button');
      openButton.click();
      expect(mockSetOpen).toHaveBeenCalled();
    });
  });