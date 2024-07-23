import PropTypes from 'prop-types';
import { forwardRef } from 'react';

import Box from '@mui/material/Box';
import Link from '@mui/material/Link';

import { RouterLink } from 'src/routes/components';

// Assuming the logo is placed in the public/assets folder and accessible via the static path
const logoImagePath = '/assets/logo.svg'; // Update the path if necessary

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {
  const logo = (
    <Box
      ref={ref}
      component="img" // Changed from div to img
      src={logoImagePath} // Set the source to the logo image path
      sx={{
        width: 90,
        height: 40,
        display: 'inline-flex',
        ...sx,
      }}
      {...other}
      alt="Logo"
    />
  );

  if (disabledLink) {
    return logo;
  }

  return (
    <Link component={RouterLink} href="/" sx={{ display: 'contents' }}>
      {logo}
    </Link>
  );
});

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

export default Logo;