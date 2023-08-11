import React from 'react';
import { render } from '@testing-library/react';
import Skeletons from './Skeletons';

describe('Skeletons component', () => {
  it('renders multiple skeletons when flag is 1', () => {
    const { getAllByTestId } = render(<Skeletons flag={1} width={130} height={110} />);
    const skeletons = getAllByTestId('skeletons');
    expect(skeletons).toHaveLength(24);
  });

  it('renders a single skeleton when flag is 2', () => {
    const { getByTestId } = render(<Skeletons flag={2} width={210} height={370} />);
    const skeleton = getByTestId('skeletons');
    expect(skeleton).toBeInTheDocument();
  });
});
