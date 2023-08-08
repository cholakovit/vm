// Styled Elements
import {
  MaterialUISwitch,
  VmFormControlLabel,
  VmAppBar,
  HeaderContainer
} from './Header.styles';

// Hooks
import React, { useContext } from 'react';

// Context for the Theme
import { ColorModeContext } from '../../helper/Context';

// Types
import type { colorModeProps } from '../../types';

const Header = () => {
  const colorMode: colorModeProps = useContext(ColorModeContext) || {};

  return (
    <VmAppBar>
      <HeaderContainer>
        <VmFormControlLabel
          label=""
          onClick={colorMode.toggleColorMode}
          control={<MaterialUISwitch defaultChecked />}
          data-testid="button"
        />
      </HeaderContainer>
    </VmAppBar>
  );
};

export default Header;
