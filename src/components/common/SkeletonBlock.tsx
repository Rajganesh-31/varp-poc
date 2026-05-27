import React from 'react';
import Skeleton, { type SkeletonProps } from '@mui/material/Skeleton';

interface Props {
  width?: number | string;
  height?: number | string;
  variant?: SkeletonProps['variant'];
  className?: string;
}

/**
 * SkeletonBlock — animated loading placeholder matching content shape.
 * Layout sizing may use Tailwind className; visual styling comes from MUI theme.
 */
const SkeletonBlock: React.FC<Props> = ({
  width,
  height,
  variant = 'rectangular',
  className,
}) => {
  return (
    <Skeleton
      variant={variant}
      animation="pulse"
      className={className}
      sx={{
        width: width ?? '100%',
        height: height ?? (className ? undefined : 16),
        flexShrink: 0,
      }}
    />
  );
};

export default SkeletonBlock;
