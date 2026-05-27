export const SEVERITY_LEVELS = {
  low: { label: 'Low', color: '#90EE90', priority: 4 },
  medium: { label: 'Medium', color: '#FFD700', priority: 3 },
  high: { label: 'High', color: '#FF8C00', priority: 2 },
  critical: { label: 'Critical', color: '#FF0000', priority: 1 },
};

export const FINDING_STATUSES = {
  open: 'Open',
  in_progress: 'In Progress',
  resolved: 'Resolved',
};

export const BADGE_VARIANTS = {
  success: 'success',
  warning: 'warning',
  error: 'error',
  info: 'info',
};

export const MODAL_SIZES = {
  small: 'sm',
  medium: 'md',
  large: 'lg',
  xlarge: 'xl',
};

export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_TIMEOUT = 5000;
