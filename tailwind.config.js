/**
 * tailwind.config.js — Vegas Audit Platform Design System
 *
 * This configuration extends Tailwind with the exact design tokens
 * from the unified specification. All color, font-size, spacing,
 * border-radius, and font-family values mirror tokens.css exactly.
 *
 * NEVER add raw hex values to components — use these Tailwind tokens
 * or the corresponding CSS variables from tokens.css.
 */

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Surface stack — dark-first depth hierarchy
        surface: {
          base:     '#0A0A0B',   // deepest background — app shell
          elevated: '#111113',   // primary panels, sidebars
          overlay:  '#18181B',   // cards, content containers
          raised:   '#1E1E23',   // interactive elements, hover states
          float:    '#26262D',   // dropdowns, tooltips, modals
        },

        // Border system
        border: {
          subtle:  '#1F1F24',   // structural dividers
          default: '#2A2A32',   // component borders
          strong:  '#363640',   // active / focus borders
          focus:   '#4F6EF7',   // keyboard focus ring
        },

        // Primary brand
        brand: {
          DEFAULT: '#4F6EF7',   // primary actions, active nav
          hover:   '#6B86F8',   // hover state of primary
          muted:   '#1E2952',   // backgrounds behind primary elements
          subtle:  '#151D3D',   // very subtle brand tint
        },

        // Semantic severity colors
        severity: {
          critical: {
            fg:     '#F87171',
            bg:     '#2D1515',
            border: '#7F1D1D',
            badge:  '#EF4444',
          },
          high: {
            fg:     '#FB923C',
            bg:     '#2D1A0E',
            border: '#7C2D12',
            badge:  '#F97316',
          },
          medium: {
            fg:     '#FCD34D',
            bg:     '#2D2008',
            border: '#713F12',
            badge:  '#F59E0B',
          },
          low: {
            fg:     '#4ADE80',
            bg:     '#0D2D1A',
            border: '#14532D',
            badge:  '#22C55E',
          },
        },

        // Text hierarchy — use content-* classes in components
        content: {
          primary:   '#FAFAFA',
          secondary: '#A1A1AA',
          tertiary:  '#71717A',
          disabled:  '#3F3F46',
        },

        // Status colors
        status: {
          success: '#22C55E',
          warning: '#F59E0B',
          error:   '#EF4444',
          info:    '#4F6EF7',
        },
      },

      // Typography scale — only these sizes are permitted
      fontSize: {
        '2xs': ['10px', { lineHeight: '14px' }],   // timestamps, badges
        'xs':  ['11px', { lineHeight: '16px' }],   // metadata, table headers
        'sm':  ['12px', { lineHeight: '18px' }],   // body text, secondary labels
        'base':['13px', { lineHeight: '20px' }],   // primary body, nav items
        'md':  ['14px', { lineHeight: '22px' }],   // card titles, form labels
        'lg':  ['16px', { lineHeight: '24px' }],   // section headings
        'xl':  ['20px', { lineHeight: '28px' }],   // page headings
        '2xl': ['24px', { lineHeight: '32px' }],   // dashboard titles
        '3xl': ['32px', { lineHeight: '40px' }],   // score display
        '4xl': ['48px', { lineHeight: '56px' }],   // hero scores
      },

      // Spacing system — base unit: 4px, multiples only
      spacing: {
        '1':  '4px',
        '2':  '8px',
        '3':  '12px',
        '4':  '16px',
        '5':  '20px',
        '6':  '24px',
        '8':  '32px',
        '10': '40px',
        '12': '48px',
        '16': '64px',
      },

      // Border radius system
      borderRadius: {
        'sm':   '4px',     // badges, chips
        'md':   '6px',     // buttons, inputs
        'lg':   '8px',     // cards
        'xl':   '12px',    // panels, modals
        'full': '9999px',  // pills
      },

      // Font families
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },

      // Shadow / elevation system
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.4)',
        'md': '0 4px 8px rgba(0, 0, 0, 0.5)',
        'lg': '0 8px 24px rgba(0, 0, 0, 0.6)',
        'xl': '0 16px 48px rgba(0, 0, 0, 0.7)',
      },

      // Z-index strategy
      zIndex: {
        'base':    '0',
        'raised':  '10',
        'overlay': '100',
        'modal':   '200',
        'toast':   '300',
        'tooltip': '400',
      },
    },
  },
  plugins: [],
};
