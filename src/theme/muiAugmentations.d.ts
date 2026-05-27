import '@mui/material/styles'

declare module '@mui/material/styles' {
  interface Palette {
    surface: {
      base: string
      elevated: string
      overlay: string
      raised: string
      float: string
    }
    border: {
      subtle: string
      default: string
      strong: string
      focus: string
    }
    severity: {
      critical: { fg: string; bg: string; border: string; badge: string }
      high: { fg: string; bg: string; border: string; badge: string }
      medium: { fg: string; bg: string; border: string; badge: string }
      low: { fg: string; bg: string; border: string; badge: string }
    }
    brand: {
      primary: string
      hover: string
      muted: string
      subtle: string
    }
    textHierarchy: {
      primary: string
      secondary: string
      tertiary: string
      disabled: string
    }
  }

  interface PaletteOptions {
    surface?: Palette['surface']
    border?: Palette['border']
    severity?: Palette['severity']
    brand?: Palette['brand']
    textHierarchy?: Palette['textHierarchy']
  }
}
