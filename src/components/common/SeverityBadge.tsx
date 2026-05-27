import React from 'react';
import Chip from '@mui/material/Chip';
import { useTheme } from '@mui/material/styles';
import { Severity } from '../../types';
import { formatSeverity } from '../../utils/formatters';

interface Props {
  severity: Severity;
  size?: 'sm' | 'md';
}

/**
 * SeverityBadge — severity label using theme palette tokens via MUI Chip.
 */
const SeverityBadge: React.FC<Props> = ({ severity, size = 'md' }) => {
  const theme = useTheme();
  const colors = theme.palette.severity[severity];

  return (
    <Chip
      label={formatSeverity(severity)}
      size="small"
      sx={{
        height: size === 'sm' ? 18 : 22,
        fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace',
        fontSize: size === 'sm' ? '10px' : '11px',
        fontWeight: 600,
        letterSpacing: '0.02em',
        textTransform: 'none',
        bgcolor: colors.bg,
        color: colors.fg,
        border: `1px solid ${colors.border}`,
        '& .MuiChip-label': {
          px: size === 'sm' ? 0.75 : 1,
        },
      }}
    />
  );
};

export default SeverityBadge;
