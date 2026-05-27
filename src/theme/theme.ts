import { createTheme } from '@mui/material/styles'
import { tokens } from './tokenMap'

const { surface, border, brand, severity, text, status, typography, radius, shadow, zIndex } =
  tokens

const theme = createTheme({
  palette: {
    mode: 'light',

    background: {
      default: surface.base,
      paper: surface.overlay,
    },
    primary: {
      main: brand.primary,
      light: brand.hover,
      dark: brand.muted,
      contrastText: text.primary,
    },
    text: {
      primary: text.primary,
      secondary: text.secondary,
      disabled: text.disabled,
    },
    error: { main: status.error },
    warning: { main: status.warning },
    success: { main: status.success },
    info: { main: status.info },

    surface: { ...surface },
    border: { ...border },
    severity: { ...severity },
    brand: { ...brand },
    textHierarchy: {
      primary: text.primary,
      secondary: text.secondary,
      tertiary: text.tertiary,
      disabled: text.disabled,
    },
  },

  typography: {
    fontFamily:
      '"Inter", system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
    h1: {
      fontSize: typography.size['4xl'],
      lineHeight: typography.lineHeight['4xl'],
      fontWeight: typography.weight.bold,
    },
    h2: {
      fontSize: typography.size['3xl'],
      lineHeight: typography.lineHeight['3xl'],
      fontWeight: typography.weight.bold,
    },
    h3: {
      fontSize: typography.size['2xl'],
      lineHeight: typography.lineHeight['2xl'],
      fontWeight: typography.weight.semibold,
    },
    h4: {
      fontSize: typography.size.xl,
      lineHeight: typography.lineHeight.xl,
      fontWeight: typography.weight.semibold,
    },
    h5: {
      fontSize: typography.size.lg,
      lineHeight: typography.lineHeight.lg,
      fontWeight: typography.weight.semibold,
    },
    h6: {
      fontSize: typography.size.md,
      lineHeight: typography.lineHeight.md,
      fontWeight: typography.weight.semibold,
    },
    body1: {
      fontSize: typography.size.base,
      lineHeight: typography.lineHeight.base,
      fontWeight: typography.weight.regular,
    },
    body2: {
      fontSize: typography.size.sm,
      lineHeight: typography.lineHeight.sm,
      fontWeight: typography.weight.regular,
    },
    caption: {
      fontSize: typography.size.xs,
      lineHeight: typography.lineHeight.xs,
      fontWeight: typography.weight.regular,
    },
    overline: {
      fontSize: typography.size['2xs'],
      lineHeight: typography.lineHeight['2xs'],
      fontWeight: typography.weight.semibold,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
    },
  },

  spacing: tokens.spacing[1],

  shape: {
    borderRadius: radius.sm,
  },

  zIndex: {
    modal: zIndex.modal,
    snackbar: zIndex.toast,
    tooltip: zIndex.tooltip,
  },

  components: {
    MuiCssBaseline: {
      styleOverrides: {
        '*::-webkit-scrollbar': { width: '6px', height: '6px' },
        '*::-webkit-scrollbar-track': { background: 'transparent' },
        '*::-webkit-scrollbar-thumb': {
          background: border.default,
          borderRadius: '3px',
        },
        '*::-webkit-scrollbar-thumb:hover': { background: border.strong },
        '::selection': { background: brand.muted, color: text.primary },
        body: { backgroundColor: surface.base, color: text.primary },
      },
    },

    MuiPaper: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          backgroundColor: surface.overlay,
          border: `1px solid ${border.default}`,
        },
      },
    },

    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: `${radius.sm}px`,
          height: '22px',
          fontSize: typography.size.xs,
          fontWeight: typography.weight.semibold,
          letterSpacing: '0.02em',
        },
        label: {
          paddingLeft: `${tokens.spacing[2]}px`,
          paddingRight: `${tokens.spacing[2]}px`,
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
      styleOverrides: {
        root: {
          borderRadius: `${radius.md}px`,
          textTransform: 'none',
          fontSize: typography.size.base,
          fontWeight: typography.weight.medium,
          minHeight: '34px',
          transition:
            'background-color 150ms ease, color 150ms ease, border-color 150ms ease',
        },
      },
    },

    MuiButtonBase: {
      styleOverrides: {
        root: {
          transition: 'background-color 150ms ease',
        },
      },
    },

    MuiDialog: {
      styleOverrides: {
        paper: {
          backgroundColor: surface.raised,
          border: `1px solid ${border.default}`,
          borderRadius: `${radius.xl}px`,
          backgroundImage: 'none',
        },
        backdrop: {
          backdropFilter: 'blur(4px)',
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: `${radius.full}px`,
          height: '6px',
          backgroundColor: surface.raised,
        },
        bar: {
          borderRadius: `${radius.full}px`,
        },
      },
    },

    MuiSkeleton: {
      defaultProps: { animation: 'pulse' },
      styleOverrides: {
        root: {
          backgroundColor: surface.raised,
          borderRadius: `${radius.sm}px`,
          '&::after': {
            background:
              'linear-gradient(90deg, transparent, rgba(0,0,0,0.06), transparent)',
          },
        },
      },
    },

    MuiTableCell: {
      styleOverrides: {
        head: {
          backgroundColor: surface.raised,
          color: text.tertiary,
          fontSize: typography.size['2xs'],
          fontWeight: typography.weight.semibold,
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          borderBottom: `1px solid ${border.default}`,
          padding: '10px 16px',
        },
        body: {
          color: text.secondary,
          fontSize: typography.size.base,
          borderBottom: `1px solid ${border.subtle}`,
          padding: '12px 16px',
        },
      },
    },

    MuiTableRow: {
      styleOverrides: {
        root: {
          transition: 'background-color 100ms ease',
          '&:hover': {
            backgroundColor: surface.raised,
          },
        },
      },
    },

    MuiTextField: {
      defaultProps: { variant: 'outlined', size: 'small' },
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            backgroundColor: surface.raised,
            fontSize: typography.size.base,
            '& fieldset': { borderColor: border.default },
            '&:hover fieldset': { borderColor: border.strong },
            '&.Mui-focused fieldset': {
              borderColor: border.focus,
              borderWidth: '1px',
            },
          },
          '& input::placeholder': { color: text.disabled, opacity: 1 },
          '& .MuiInputBase-input': { color: text.primary },
        },
      },
    },

    MuiSnackbar: {
      defaultProps: {
        anchorOrigin: { vertical: 'bottom', horizontal: 'right' },
      },
    },

    MuiAlert: {
      styleOverrides: {
        root: {
          backgroundColor: surface.float,
          border: `1px solid ${border.default}`,
          color: text.primary,
          fontSize: typography.size.base,
          boxShadow: shadow.lg,
        },
      },
    },

    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: border.subtle,
        },
      },
    },

    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: surface.float,
          border: `1px solid ${border.default}`,
          color: text.secondary,
          fontSize: typography.size.sm,
          borderRadius: `${radius.md}px`,
        },
        arrow: {
          color: surface.float,
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        root: {
          minHeight: 0,
        },
        indicator: {
          backgroundColor: brand.primary,
          height: '2px',
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontSize: typography.size.base,
          fontWeight: typography.weight.regular,
          minHeight: 0,
          color: text.tertiary,
          transition: 'color 150ms ease',
          '&.Mui-selected': {
            color: text.primary,
            fontWeight: typography.weight.medium,
          },
          '&:hover': {
            color: text.secondary,
          },
        },
      },
    },

    MuiAppBar: {
      defaultProps: { elevation: 0 },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },

    MuiListItemButton: {
      styleOverrides: {
        root: {
          transition: 'background-color 150ms ease',
          '&:hover': {
            backgroundColor: surface.raised,
          },
          '&.Mui-selected': {
            backgroundColor: surface.raised,
            '&:hover': {
              backgroundColor: surface.float,
            },
          },
        },
      },
    },
  },
})

export default theme
