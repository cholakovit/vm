// Header.test.tsx
import React from 'react';
import renderer from 'react-test-renderer';
import Header from './Header';

jest.mock('../../helper/Context', () => ({
  ColorModeContext: {
    Consumer: ({ children }: any) => children({}),
  },
}));

describe('Header component', () => {
  it('renders without crashing', () => {
    const component = renderer.create(<Header />);
    const tree = component.toJSON();
    expect(tree).toMatchSnapshot();
  });
});
