import { useState, useCallback, createContext, useContext } from 'react'

export interface ToastItem {
  id: string
  message: string
  type: 'success' | 'info' | 'warning'
}

interface ToastContextValue {
  toasts: ToastItem[]
  showToast: (message: string, type: ToastItem['type']) => void
  dismissToast: (id: string) => void
}

export const ToastContext = createContext<ToastContextValue | undefined>(undefined)

/**
 * useToastState — creates the toast state to be provided via ToastContext.Provider.
 * Call this once at the provider level (in ReportGeneration).
 */
export function useToastState(): ToastContextValue {
  const [toasts, setToasts] = useState<ToastItem[]>([])

  const dismissToast = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const showToast = useCallback((message: string, type: ToastItem['type']) => {
    const id = Math.random().toString(36).slice(2)
    setToasts(prev => {
      const next = [...prev, { id, message, type }]
      return next.length > 3 ? next.slice(next.length - 3) : next
    })
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, 3000)
  }, [])

  return { toasts, showToast, dismissToast }
}

/**
 * useToast — consume toast context. Must be used inside a ToastContext.Provider.
 */
export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within a ToastContext.Provider')
  return ctx
}
