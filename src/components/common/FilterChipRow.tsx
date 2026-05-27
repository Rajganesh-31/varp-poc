import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export interface FilterChipOption<T extends string> {
  value: T;
  label: string;
}

interface FilterChipRowProps<T extends string> {
  options: FilterChipOption<T>[];
  value: T;
  onChange: (value: T) => void;
  ariaLabel?: string;
}

/**
 * FilterChipRow — toggleable filter chips for list/table filtering.
 */
function FilterChipRow<T extends string>({
  options,
  value,
  onChange,
  ariaLabel = 'Filter options',
}: FilterChipRowProps<T>) {
  return (
    <Stack
      direction="row"
      className="flex flex-wrap gap-2"
      role="group"
      aria-label={ariaLabel}
    >
      {options.map((option) => {
        const isActive = value === option.value;

        return (
          <Chip
            key={option.value}
            label={option.label}
            onClick={() => onChange(option.value)}
            aria-pressed={isActive}
            sx={{
              height: 28,
              fontSize: '12px',
              fontWeight: 500,
              textTransform: 'capitalize',
              cursor: 'pointer',
              transition: 'background-color 100ms ease, border-color 100ms ease, color 100ms ease',
              bgcolor: isActive ? 'brand.subtle' : 'surface.raised',
              color: isActive ? 'brand.primary' : 'textHierarchy.tertiary',
              border: 1,
              borderColor: isActive ? 'brand.muted' : 'border.default',
              '&:hover': {
                bgcolor: isActive ? 'brand.subtle' : 'surface.raised',
                borderColor: isActive ? 'brand.muted' : 'border.strong',
                color: isActive ? 'brand.primary' : 'textHierarchy.secondary',
              },
            }}
          />
        );
      })}
    </Stack>
  );
}

export default FilterChipRow;
