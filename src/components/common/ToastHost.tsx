import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';
import type { ToastItem } from '../../hooks/useToast';

interface ToastHostProps {
  toasts: ToastItem[];
  onDismiss: (id: string) => void;
}

const alertSeverity: Record<ToastItem['type'], 'success' | 'info' | 'warning'> = {
  success: 'success',
  info: 'info',
  warning: 'warning',
};

/**
 * ToastHost — stacked toast notifications (max 3) at bottom-right via MUI Snackbar + Alert.
 */
const ToastHost: React.FC<ToastHostProps> = ({ toasts, onDismiss }) => {
  const isOpen = toasts.length > 0;

  return (
    <Snackbar
      open={isOpen}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      sx={{ zIndex: (theme) => theme.zIndex.snackbar }}
    >
      <Box
        role="region"
        aria-label="Notifications"
        aria-live="polite"
        className="flex flex-col gap-2"
      >
        {toasts.map((toast) => (
          <Alert
            key={toast.id}
            severity={alertSeverity[toast.type]}
            onClose={() => onDismiss(toast.id)}
            variant="filled"
            sx={{ width: 288, alignItems: 'center' }}
          >
            {toast.message}
          </Alert>
        ))}
      </Box>
    </Snackbar>
  );
};

export default ToastHost;
