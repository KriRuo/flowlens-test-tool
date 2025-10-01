import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface AsyncOperationState {
  isLoading: boolean;
  error: string | null;
}

interface UseAsyncOperationOptions {
  onSuccess?: (data?: any) => void;
  onError?: (error: Error) => void;
  successMessage?: string;
  errorMessage?: string;
}

export const useAsyncOperation = (options: UseAsyncOperationOptions = {}) => {
  const [state, setState] = useState<AsyncOperationState>({
    isLoading: false,
    error: null,
  });
  
  const { toast } = useToast();

  const execute = useCallback(async <T>(
    operation: () => Promise<T>,
    customOptions?: Partial<UseAsyncOperationOptions>
  ): Promise<T | null> => {
    const finalOptions = { ...options, ...customOptions };
    
    setState({ isLoading: true, error: null });
    
    try {
      const result = await operation();
      
      setState({ isLoading: false, error: null });
      
      if (finalOptions.successMessage) {
        toast({
          title: "Success",
          description: finalOptions.successMessage,
        });
      }
      
      if (finalOptions.onSuccess) {
        finalOptions.onSuccess(result);
      }
      
      return result;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';
      
      setState({ isLoading: false, error: errorMessage });
      
      const displayMessage = finalOptions.errorMessage || errorMessage;
      
      toast({
        title: "Error",
        description: displayMessage,
        variant: "destructive",
      });
      
      if (finalOptions.onError) {
        finalOptions.onError(error instanceof Error ? error : new Error(errorMessage));
      }
      
      return null;
    }
  }, [options, toast]);

  const reset = useCallback(() => {
    setState({ isLoading: false, error: null });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
};
