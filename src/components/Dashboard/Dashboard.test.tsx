import Dashboard from './Dashboard';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

// Mock localDataUtils functions as localStorage mock doesn't work well.

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Dashboard UI Tests', () => {
  test('dashboard page renders default view when data not initialised', () => {
    const dashboardInitTree = renderer.create(<Dashboard />).toJSON();

    expect(dashboardInitTree).toMatchSnapshot();
  });

  test('dashboard page renders new buttons after data initialised', async () => {
    render(<Dashboard />);
    const initButton = screen.getByRole('button', {
      name: /initialise app data/i,
    });

    userEvent.click(initButton);

    await waitFor(() => {
      expect(screen.getByText(/reset local storage/i)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(
        screen.getByText(/write stored data to console/i)
      ).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.queryByText(/initialise app data/i)).toBeNull();
    });
  });

  // test init button calls right function with expected

  // test write data button calls right function with expected

  // test clear data button calls right function with expected
});
