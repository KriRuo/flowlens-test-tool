import { Card } from '@/components/ui/card';
import { LoadingSpinner } from '@/components/LoadingSpinner';
import { cn } from '@/lib/utils';

interface LoadingCardProps {
  message?: string;
  className?: string;
}

export const LoadingCard = ({ 
  message = "Loading...", 
  className 
}: LoadingCardProps) => {
  return (
    <Card className={cn("p-6 border border-border bg-card", className)}>
      <div className="flex items-center justify-center gap-3">
        <LoadingSpinner size="md" />
        <span className="text-sm text-muted-foreground">{message}</span>
      </div>
    </Card>
  );
};

export default LoadingCard;
