import HeadingBar from './HeadingBar';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderer from 'react-test-renderer';
import { BrowserRouter } from 'react-router-dom';

describe('Heading Bar UI Tests', () => {
  test('heading bar renders as expected', () => {
    const HeadingBarTree = renderer
      .create(
        <BrowserRouter>
          <HeadingBar />
        </BrowserRouter>
      )
      .toJSON();

    expect(HeadingBarTree).toMatchSnapshot();
  });

  test('menu button opens drawer menu when clicked', async () => {
    render(
      <BrowserRouter>
        <HeadingBar />
      </BrowserRouter>
    );

    const menuButton = screen.getByRole('button', {
      name: /menu/i,
    });

    userEvent.click(menuButton);

    await waitFor(() => {
      expect(screen.getByRole('list')).toBeInTheDocument();
    });
  });
});
