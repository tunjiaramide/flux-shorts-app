import { useEffect } from 'react';

export function useFrameworkReady() {
  useEffect(() => {
    // This hook is now a no-op for local development
    // The original implementation was specific to Bolt's environment
  }, []);
}