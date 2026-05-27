import React from 'react';
import Box from '@mui/material/Box';

interface AppShellProps {
  header: React.ReactNode;
  children: React.ReactNode;
}

/**
 * AppShell — full-viewport column layout with fixed header and scrollable content.
 * Tailwind is used only for flex sizing; surfaces come from the MUI theme.
 */
const AppShell: React.FC<AppShellProps> = ({ header, children }) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        bgcolor: 'background.default',
      }}
    >
      {header}
      <Box sx={{ flex: 1, minHeight: 0, overflow: 'hidden' }}>{children}</Box>
    </Box>
  );
};

export default AppShell;
