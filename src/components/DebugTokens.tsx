/**
 * DebugTokens.tsx — Phase 1 Visual Verification Page
 *
 * Renders every design token as a visual swatch or sample.
 * This component is TEMPORARY and must be removed before Phase 2 review.
 *
 * Purpose: Confirm every token from tokens.css matches the specification
 * exactly. Each group corresponds to a section in tokens.css.
 */

import React from 'react';

interface SwatchProps {
  label: string;
  colorClass: string;
  hex: string;
  textClass?: string;
}

const Swatch: React.FC<SwatchProps> = ({ label, colorClass, hex, textClass = 'text-content-primary' }) => (
  <div className="flex items-center gap-3 py-1">
    <div className={`w-8 h-8 rounded-md border border-border-default ${colorClass}`} />
    <div>
      <div className={`text-sm font-mono ${textClass}`}>{label}</div>
      <div className="text-2xs text-content-tertiary font-mono">{hex}</div>
    </div>
  </div>
);

interface SpacingRowProps {
  token: string;
  value: string;
}

const SpacingRow: React.FC<SpacingRowProps> = ({ token, value }) => (
  <div className="flex items-center gap-4 py-1">
    <div className="w-24 text-2xs text-content-tertiary font-mono">{token}</div>
    <div className="bg-brand h-2 rounded-sm" style={{ width: value }} />
    <div className="text-2xs text-content-secondary font-mono">{value}</div>
  </div>
);

interface RadiusRowProps {
  token: string;
  value: string;
  twClass: string;
}

const RadiusRow: React.FC<RadiusRowProps> = ({ token, value, twClass }) => (
  <div className="flex items-center gap-4 py-1">
    <div className="w-24 text-2xs text-content-tertiary font-mono">{token}</div>
    <div className={`w-10 h-10 bg-surface-raised border border-border-default ${twClass}`} />
    <div className="text-2xs text-content-secondary font-mono">{value}</div>
  </div>
);

interface ShadowRowProps {
  token: string;
  twClass: string;
}

const ShadowRow: React.FC<ShadowRowProps> = ({ token, twClass }) => (
  <div className="flex items-center gap-4 py-2">
    <div className="w-24 text-2xs text-content-tertiary font-mono">{token}</div>
    <div className={`w-16 h-10 bg-surface-overlay border border-border-default rounded-lg ${twClass}`} />
  </div>
);

const Section: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div className="mb-8">
    <h2 className="text-2xs font-semibold text-content-tertiary uppercase tracking-wider mb-4 pb-2 border-b border-border-subtle">
      {title}
    </h2>
    {children}
  </div>
);

/**
 * DebugTokens — Phase 1 token visual verification page.
 * Remove this component after Phase 1 sign-off.
 */
const DebugTokens: React.FC = () => {
  return (
    <div
      className="bg-surface-base min-h-screen overflow-y-auto p-8"
      style={{ fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif' }}
    >
      <div className="max-w-5xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-xl font-bold text-content-primary mb-1">
            Phase 1 Token Verification
          </h1>
          <p className="text-sm text-content-secondary">
            Visual verification of all design tokens against the specification.
            Every swatch and sample must match the exact hex value listed.
          </p>
          <div className="mt-3 px-3 py-2 bg-brand-subtle border border-border-default rounded-lg inline-flex items-center gap-2">
            <span className="text-2xs font-semibold text-brand uppercase tracking-wide">TEMPORARY DEBUG PAGE</span>
            <span className="text-2xs text-content-tertiary">— Remove before Phase 2</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-10">

          {/* Left column */}
          <div>

            {/* 1. Surface Stack */}
            <Section title="1. Surface Stack">
              <Swatch label="--surface-base"     colorClass="bg-surface-base"     hex="#0A0A0B" />
              <Swatch label="--surface-elevated"  colorClass="bg-surface-elevated" hex="#111113" />
              <Swatch label="--surface-overlay"   colorClass="bg-surface-overlay"  hex="#18181B" />
              <Swatch label="--surface-raised"    colorClass="bg-surface-raised"   hex="#1E1E23" />
              <Swatch label="--surface-float"     colorClass="bg-surface-float"    hex="#26262D" />
            </Section>

            {/* 2. Border System */}
            <Section title="2. Border System">
              <Swatch label="--border-subtle"   colorClass="bg-border-subtle"   hex="#1F1F24" />
              <Swatch label="--border-default"  colorClass="bg-border-default"  hex="#2A2A32" />
              <Swatch label="--border-strong"   colorClass="bg-border-strong"   hex="#363640" />
              <Swatch label="--border-focus"    colorClass="bg-border-focus"    hex="#4F6EF7" />
            </Section>

            {/* 3. Brand */}
            <Section title="3. Brand Colors">
              <Swatch label="--brand-primary"  colorClass="bg-brand"        hex="#4F6EF7" />
              <Swatch label="--brand-hover"    colorClass="bg-brand-hover"  hex="#6B86F8" />
              <Swatch label="--brand-muted"    colorClass="bg-brand-muted"  hex="#1E2952" />
              <Swatch label="--brand-subtle"   colorClass="bg-brand-subtle" hex="#151D3D" />
            </Section>

            {/* 4. Text Hierarchy */}
            <Section title="5. Text Hierarchy">
              <Swatch label="--text-primary"   colorClass="bg-content-primary"   hex="#FAFAFA" />
              <Swatch label="--text-secondary" colorClass="bg-content-secondary" hex="#A1A1AA" />
              <Swatch label="--text-tertiary"  colorClass="bg-content-tertiary"  hex="#71717A" />
              <Swatch label="--text-disabled"  colorClass="bg-content-disabled"  hex="#3F3F46" />
            </Section>

            {/* 6. Status */}
            <Section title="6. Status Colors">
              <Swatch label="--status-success" colorClass="bg-status-success" hex="#22C55E" />
              <Swatch label="--status-warning" colorClass="bg-status-warning" hex="#F59E0B" />
              <Swatch label="--status-error"   colorClass="bg-status-error"   hex="#EF4444" />
              <Swatch label="--status-info"    colorClass="bg-status-info"    hex="#4F6EF7" />
            </Section>

          </div>

          {/* Right column */}
          <div>

            {/* 4. Severity Colors */}
            <Section title="4. Severity Colors">
              <div className="space-y-4">

                <div>
                  <div className="text-2xs text-content-tertiary font-semibold uppercase tracking-wide mb-1">Critical</div>
                  <div className="bg-severity-critical-bg border border-severity-critical-border rounded-lg p-3 space-y-1">
                    <Swatch label="-fg"     colorClass="bg-severity-critical-fg"     hex="#F87171" textClass="text-content-primary" />
                    <Swatch label="-bg"     colorClass="bg-severity-critical-bg"     hex="#2D1515" textClass="text-content-primary" />
                    <Swatch label="-border" colorClass="bg-severity-critical-border" hex="#7F1D1D" textClass="text-content-primary" />
                    <Swatch label="-badge"  colorClass="bg-severity-critical-badge"  hex="#EF4444" textClass="text-content-primary" />
                  </div>
                </div>

                <div>
                  <div className="text-2xs text-content-tertiary font-semibold uppercase tracking-wide mb-1">High</div>
                  <div className="bg-severity-high-bg border border-severity-high-border rounded-lg p-3 space-y-1">
                    <Swatch label="-fg"     colorClass="bg-severity-high-fg"     hex="#FB923C" textClass="text-content-primary" />
                    <Swatch label="-bg"     colorClass="bg-severity-high-bg"     hex="#2D1A0E" textClass="text-content-primary" />
                    <Swatch label="-border" colorClass="bg-severity-high-border" hex="#7C2D12" textClass="text-content-primary" />
                    <Swatch label="-badge"  colorClass="bg-severity-high-badge"  hex="#F97316" textClass="text-content-primary" />
                  </div>
                </div>

                <div>
                  <div className="text-2xs text-content-tertiary font-semibold uppercase tracking-wide mb-1">Medium</div>
                  <div className="bg-severity-medium-bg border border-severity-medium-border rounded-lg p-3 space-y-1">
                    <Swatch label="-fg"     colorClass="bg-severity-medium-fg"     hex="#FCD34D" textClass="text-content-primary" />
                    <Swatch label="-bg"     colorClass="bg-severity-medium-bg"     hex="#2D2008" textClass="text-content-primary" />
                    <Swatch label="-border" colorClass="bg-severity-medium-border" hex="#713F12" textClass="text-content-primary" />
                    <Swatch label="-badge"  colorClass="bg-severity-medium-badge"  hex="#F59E0B" textClass="text-content-primary" />
                  </div>
                </div>

                <div>
                  <div className="text-2xs text-content-tertiary font-semibold uppercase tracking-wide mb-1">Low</div>
                  <div className="bg-severity-low-bg border border-severity-low-border rounded-lg p-3 space-y-1">
                    <Swatch label="-fg"     colorClass="bg-severity-low-fg"     hex="#4ADE80" textClass="text-content-primary" />
                    <Swatch label="-bg"     colorClass="bg-severity-low-bg"     hex="#0D2D1A" textClass="text-content-primary" />
                    <Swatch label="-border" colorClass="bg-severity-low-border" hex="#14532D" textClass="text-content-primary" />
                    <Swatch label="-badge"  colorClass="bg-severity-low-badge"  hex="#22C55E" textClass="text-content-primary" />
                  </div>
                </div>

              </div>
            </Section>

          </div>
        </div>

        {/* Full-width sections below */}

        {/* 7. Typography Scale */}
        <Section title="7. Typography Scale">
          <div className="bg-surface-overlay border border-border-default rounded-lg p-6 space-y-3">
            {([
              { token: '--text-2xs / --text-lh-2xs', size: '10px', lh: '14px', sample: 'Timestamps, badges — 10px / 14px' },
              { token: '--text-xs  / --text-lh-xs',  size: '11px', lh: '16px', sample: 'Metadata, table headers — 11px / 16px' },
              { token: '--text-sm  / --text-lh-sm',  size: '12px', lh: '18px', sample: 'Body text, secondary labels — 12px / 18px' },
              { token: '--text-base/ --text-lh-base', size: '13px', lh: '20px', sample: 'Primary body, nav items — 13px / 20px' },
              { token: '--text-md  / --text-lh-md',  size: '14px', lh: '22px', sample: 'Card titles, form labels — 14px / 22px' },
              { token: '--text-lg  / --text-lh-lg',  size: '16px', lh: '24px', sample: 'Section headings — 16px / 24px' },
              { token: '--text-xl  / --text-lh-xl',  size: '20px', lh: '28px', sample: 'Page headings — 20px / 28px' },
              { token: '--text-2xl / --text-lh-2xl', size: '24px', lh: '32px', sample: 'Dashboard titles — 24px / 32px' },
              { token: '--text-3xl / --text-lh-3xl', size: '32px', lh: '40px', sample: 'Score — 32px / 40px' },
              { token: '--text-4xl / --text-lh-4xl', size: '48px', lh: '56px', sample: 'Hero — 48px / 56px' },
            ] as { token: string; size: string; lh: string; sample: string }[]).map(({ token, size, lh, sample }) => (
              <div key={token} className="flex items-baseline gap-4 border-b border-border-subtle last:border-0 pb-2">
                <div className="w-56 text-2xs text-content-tertiary font-mono shrink-0">{token}</div>
                <div
                  className="text-content-primary font-sans"
                  style={{ fontSize: size, lineHeight: lh }}
                >
                  {sample}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 8. Font Weights */}
        <Section title="8. Font Weights">
          <div className="bg-surface-overlay border border-border-default rounded-lg p-6 grid grid-cols-4 gap-4">
            {([
              { token: '--weight-regular',  weight: 400, label: 'Regular 400' },
              { token: '--weight-medium',   weight: 500, label: 'Medium 500' },
              { token: '--weight-semibold', weight: 600, label: 'Semibold 600' },
              { token: '--weight-bold',     weight: 700, label: 'Bold 700' },
            ] as { token: string; weight: number; label: string }[]).map(({ token, weight, label }) => (
              <div key={token} className="space-y-1">
                <div className="text-2xs text-content-tertiary font-mono">{token}</div>
                <div className="text-md text-content-primary font-sans" style={{ fontWeight: weight }}>
                  {label}
                </div>
                <div className="text-2xs text-content-tertiary">
                  Sample text at weight {weight}
                </div>
              </div>
            ))}
          </div>
        </Section>

        {/* 9. Spacing System */}
        <Section title="9. Spacing System (4px base unit)">
          <div className="bg-surface-overlay border border-border-default rounded-lg p-6">
            <SpacingRow token="--space-1"   value="4px" />
            <SpacingRow token="--space-2"   value="8px" />
            <SpacingRow token="--space-3"   value="12px" />
            <SpacingRow token="--space-4"   value="16px" />
            <SpacingRow token="--space-5"   value="20px" />
            <SpacingRow token="--space-6"   value="24px" />
            <SpacingRow token="--space-8"   value="32px" />
            <SpacingRow token="--space-10"  value="40px" />
            <SpacingRow token="--space-12"  value="48px" />
            <SpacingRow token="--space-16"  value="64px" />
          </div>
        </Section>

        {/* 10. Border Radius */}
        <Section title="10. Border Radius System">
          <div className="bg-surface-overlay border border-border-default rounded-lg p-6 flex gap-8 items-end">
            <RadiusRow token="--radius-sm"   value="4px"    twClass="rounded-sm" />
            <RadiusRow token="--radius-md"   value="6px"    twClass="rounded-md" />
            <RadiusRow token="--radius-lg"   value="8px"    twClass="rounded-lg" />
            <RadiusRow token="--radius-xl"   value="12px"   twClass="rounded-xl" />
            <RadiusRow token="--radius-full" value="9999px" twClass="rounded-full" />
          </div>
        </Section>

        {/* 11. Shadows */}
        <Section title="11. Shadow / Elevation System">
          <div className="bg-surface-overlay border border-border-default rounded-lg p-6 flex gap-8 items-center">
            <ShadowRow token="--shadow-sm" twClass="shadow-sm" />
            <ShadowRow token="--shadow-md" twClass="shadow-md" />
            <ShadowRow token="--shadow-lg" twClass="shadow-lg" />
            <ShadowRow token="--shadow-xl" twClass="shadow-xl" />
          </div>
        </Section>

        {/* 12. Z-Index */}
        <Section title="12. Z-Index Strategy">
          <div className="bg-surface-overlay border border-border-default rounded-lg p-6">
            {([
              { token: '--z-base',    value: '0',   usage: 'Default document flow' },
              { token: '--z-raised',  value: '10',  usage: 'Elevated panels within layout' },
              { token: '--z-overlay', value: '100', usage: 'Overlays, dropdowns, tooltips' },
              { token: '--z-modal',   value: '200', usage: 'Modal dialogs' },
              { token: '--z-toast',   value: '300', usage: 'Toast notifications' },
              { token: '--z-tooltip', value: '400', usage: 'Inline tooltips (highest)' },
            ] as { token: string; value: string; usage: string }[]).map(({ token, value, usage }) => (
              <div key={token} className="flex items-center gap-4 py-1.5 border-b border-border-subtle last:border-0">
                <div className="w-32 text-2xs text-content-tertiary font-mono">{token}</div>
                <div className="w-12 text-sm text-content-primary font-mono font-semibold">{value}</div>
                <div className="text-sm text-content-secondary">{usage}</div>
              </div>
            ))}
          </div>
        </Section>

        <div className="mt-10 pb-16 text-center">
          <p className="text-sm text-content-tertiary">
            Phase 1 Token Foundation — All 12 token groups rendered above.
          </p>
          <p className="text-2xs text-content-disabled mt-1">
            Cross-reference each swatch/sample with the specification hex values before proceeding to Phase 2.
          </p>
        </div>

      </div>
    </div>
  );
};

export default DebugTokens;
