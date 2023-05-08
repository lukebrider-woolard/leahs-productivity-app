import Dashboard from './Dashboard';
import * as dataUtils from '../../utils/localDataUtils';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';

afterEach(() => {
  jest.clearAllMocks();
  localStorage.clear();
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
  test('initialise app data button calls expected function', () => {
    render(<Dashboard />);

    jest
      .spyOn(dataUtils, 'initialiseLocalData')
      .mockImplementation()
      .mockName('initialiseLocalData');

    const initButton = screen.getByRole('button', {
      name: /initialise app data/i,
    });

    userEvent.click(initButton);

    expect(dataUtils.initialiseLocalData).toHaveBeenCalledTimes(1);
  });

  test('reset local storage button calls expected function', () => {
    localStorage.setItem('init', 'true');
    render(<Dashboard />);

    jest
      .spyOn(dataUtils, 'resetLocalData')
      .mockImplementation()
      .mockName('resetLocalData');

    const resetButton = screen.getByRole('button', {
      name: /reset local storage/i,
    });

    userEvent.click(resetButton);

    expect(dataUtils.resetLocalData).toHaveBeenCalledTimes(1);
  });

  test('write stored data to console button calls expected function', () => {
    localStorage.setItem('init', 'true');
    render(<Dashboard />);

    jest
      .spyOn(dataUtils, 'printLocalData')
      .mockImplementation()
      .mockName('printLocalData');

    const printButton = screen.getByRole('button', {
      name: /write stored data to console/i,
    });

    userEvent.click(printButton);

    expect(dataUtils.printLocalData).toHaveBeenCalledTimes(1);
  });
});
