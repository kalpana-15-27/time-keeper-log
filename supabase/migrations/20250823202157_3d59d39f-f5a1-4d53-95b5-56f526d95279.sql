-- Create stopwatch sessions table
CREATE TABLE public.stopwatch_sessions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  elapsed_time INTEGER NOT NULL, -- elapsed time in milliseconds
  start_time TIMESTAMP WITH TIME ZONE NOT NULL,
  end_time TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.stopwatch_sessions ENABLE ROW LEVEL SECURITY;

-- Create policy to allow anyone to view all sessions (public stopwatch)
CREATE POLICY "Anyone can view stopwatch sessions" 
ON public.stopwatch_sessions 
FOR SELECT 
USING (true);

-- Create policy to allow anyone to create sessions
CREATE POLICY "Anyone can create stopwatch sessions" 
ON public.stopwatch_sessions 
FOR INSERT 
WITH CHECK (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_stopwatch_sessions_updated_at
  BEFORE UPDATE ON public.stopwatch_sessions
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();