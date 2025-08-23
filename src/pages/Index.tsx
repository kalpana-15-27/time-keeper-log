import { useState } from 'react';
import { Stopwatch } from '@/components/Stopwatch';
import { SessionHistory } from '@/components/SessionHistory';

const Index = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleSessionSaved = () => {
    setRefreshTrigger(prev => prev + 1);
  };

  return (
    <div className="min-h-screen bg-background p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2 text-foreground">Stopwatch App</h1>
          <p className="text-xl text-muted-foreground">
            Track your time with precision and save your sessions
          </p>
        </div>
        
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="flex justify-center">
            <Stopwatch onSessionSaved={handleSessionSaved} />
          </div>
          
          <div>
            <SessionHistory refreshTrigger={refreshTrigger} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
