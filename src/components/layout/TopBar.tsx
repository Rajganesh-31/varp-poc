import React from 'react';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';

export type AppPage = 'analysis' | 'report';

interface TopBarProps {
  activePage: AppPage;
  onPageChange: (page: AppPage) => void;
}

const PAGE_TABS: { value: AppPage; label: string }[] = [
  { value: 'analysis', label: 'Document Analysis' },
  { value: 'report', label: 'Report Generation' },
];

/**
 * TopBar — 48px app header with brand, module tabs, and meta info.
 */
const TopBar: React.FC<TopBarProps> = ({ activePage, onPageChange }) => {
  const tabIndex = activePage === 'analysis' ? 0 : 1;

  const handleTabChange = (_event: React.SyntheticEvent, newIndex: number) => {
    onPageChange(newIndex === 0 ? 'analysis' : 'report');
  };

  return (
    <Box
      component="header"
      sx={{
        display: 'flex',
        flexShrink: 0,
        alignItems: 'center',
        gap: 4,
        px: 2,
        minHeight: 48,
        height: 48,
        bgcolor: 'surface.elevated',
        borderBottom: 1,
        borderColor: 'border.subtle',
      }}
    >
      <Typography
        variant="body2"
        sx={{
          color: 'text.primary',
          fontWeight: 600,
          fontSize: '14px',
          whiteSpace: 'nowrap',
        }}
      >
        Vegas Audit
      </Typography>

      <Divider
        orientation="vertical"
        flexItem
        sx={{ mx: 1, borderColor: 'border.default', alignSelf: 'center', height: 16 }}
      />

      <Tabs
        value={tabIndex}
        onChange={handleTabChange}
        aria-label="Main navigation"
        sx={{
          minHeight: 48,
          height: 48,
          '& .MuiTabs-flexContainer': { height: '100%', alignItems: 'stretch' },
        }}
      >
        {PAGE_TABS.map((tab) => (
          <Tab
            key={tab.value}
            label={tab.label}
            id={`app-tab-${tab.value}`}
            aria-controls={`app-tabpanel-${tab.value}`}
            sx={{ minHeight: 48, px: 1.5, fontSize: '13px' }}
          />
        ))}
      </Tabs>

      <Box sx={{ ml: 'auto', display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography
          variant="caption"
          sx={{ color: 'textHierarchy.tertiary', fontSize: '11px', whiteSpace: 'nowrap' }}
        >
          Vegas Consulting Group
        </Typography>
        <Chip
          label="POC"
          size="small"
          sx={{
            height: 20,
            fontSize: '10px',
            fontWeight: 600,
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            bgcolor: 'surface.raised',
            color: 'textHierarchy.disabled',
            border: 1,
            borderColor: 'border.default',
            '& .MuiChip-label': { px: 0.75 },
          }}
        />
      </Box>
    </Box>
  );
};

export default TopBar;
