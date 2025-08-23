import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useStopwatch } from '@/hooks/useStopwatch';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface StopwatchProps {
  onSessionSaved: () => void;
}

export const Stopwatch = ({ onSessionSaved }: StopwatchProps) => {
  const { time, isRunning, start, stop, reset, formatTime } = useStopwatch();
  const { toast } = useToast();

  const handleStop = async () => {
    const sessionData = stop();
    
    try {
      const { error } = await supabase
        .from('stopwatch_sessions')
        .insert({
          elapsed_time: sessionData.elapsedTime,
          start_time: sessionData.startTime.toISOString(),
          end_time: sessionData.endTime.toISOString()
        });

      if (error) throw error;

      toast({
        title: "Session Saved",
        description: `Stopwatch session of ${formatTime(sessionData.elapsedTime)} saved successfully.`
      });

      onSessionSaved();
    } catch (error) {
      console.error('Error saving session:', error);
      toast({
        title: "Error",
        description: "Failed to save stopwatch session.",
        variant: "destructive"
      });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">Stopwatch</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="text-center">
          <div className="text-6xl font-mono font-bold tracking-wider text-primary">
            {formatTime(time)}
          </div>
        </div>
        
        <div className="flex gap-3 justify-center">
          {!isRunning ? (
            <Button 
              onClick={start} 
              size="lg"
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Start
            </Button>
          ) : (
            <Button 
              onClick={handleStop} 
              size="lg"
              className="bg-red-600 hover:bg-red-700 text-white"
            >
              Stop
            </Button>
          )}
          
          <Button 
            onClick={reset} 
            variant="outline" 
            size="lg"
            disabled={isRunning}
          >
            Reset
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};