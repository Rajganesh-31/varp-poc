import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

interface AppDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg';
}

/**
 * AppDialog — shared modal shell with MUI focus trap and Escape handling.
 */
const AppDialog: React.FC<AppDialogProps> = ({
  open,
  onClose,
  title,
  children,
  maxWidth = 'sm',
}) => {
  const titleId = React.useId();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={maxWidth}
      fullWidth
      aria-labelledby={titleId}
    >
      <DialogTitle
        id={titleId}
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          pr: 1,
        }}
      >
        <Typography component="span" variant="h6" sx={{ fontSize: '16px', fontWeight: 600 }}>
          {title}
        </Typography>
        <IconButton
          onClick={onClose}
          aria-label="Close dialog"
          size="small"
          sx={{ color: 'textHierarchy.tertiary', fontSize: '20px', lineHeight: 1 }}
        >
          ×
        </IconButton>
      </DialogTitle>
      <DialogContent dividers sx={{ borderColor: 'border.subtle' }}>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default AppDialog;
