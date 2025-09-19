import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle, 
  Clock, 
  Cpu,
  Database,
  BarChart3,
  FileText,
  Dna,
  Loader2
} from "lucide-react";
import { useNavigate } from "react-router-dom"; // Already imported
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface ProcessStep {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'processing' | 'completed';
  icon: React.ElementType;
}

const Processing = () => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0); 
  const [logs, setLogs] = useState<string[]>([
    "Starting eDNA analysis pipeline...",
    "Validating uploaded files...",
    "Files validated successfully ✓"
  ]);
  const navigate = useNavigate(); // Already defined

  const processSteps: ProcessStep[] = [
    {
      id: 'upload',
      title: 'Upload Complete',
      description: 'Files received and validated',
      status: 'completed',
      icon: CheckCircle
    },
    {
      id: 'blast',
      title: 'BLAST Search',
      description: 'Running sequence alignment against databases',
      status: 'processing',
      icon: Database
    },
    {
      id: 'taxonomy',
      title: 'Taxonomic Classification',
      description: 'Identifying species from sequence matches',
      status: 'pending',
      icon: Cpu
    },
    {
      id: 'analysis',
      title: 'Biodiversity Analysis',
      description: 'Computing diversity metrics and statistics',
      status: 'pending',
      icon: BarChart3
    },
    {
      id: 'report',
      title: 'Report Generation',
      description: 'Creating visualization and export files',
      status: 'pending',
      icon: FileText
    }
  ];

  const [steps, setSteps] = useState(processSteps);

  useEffect(() => {
    // 1.5 minute (90 second) duration
    const TOTAL_DURATION_MS = 1.5 * 60 * 1000; 
    const INTERVAL_MS = 1000; 
    const TOTAL_STEPS = TOTAL_DURATION_MS / INTERVAL_MS; 
    const PROGRESS_PER_STEP = 100 / TOTAL_STEPS; 

    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          clearInterval(interval);
          return 100;
        }
        
        const newProgress = Math.min(prevProgress + PROGRESS_PER_STEP, 100);
        
        // ... (all the log and step updates remain the same)
        if (prevProgress < 20 && newProgress >= 20) {
          setLogs(prev => [...prev, "BLAST search initiated against NCBI database..."]);
        } else if (prevProgress < 40 && newProgress >= 40) {
          setLogs(prev => [...prev, "Found 1,247 sequence matches", "Processing taxonomic assignments..."]);
          setSteps(prev => prev.map((step, index) => 
            index === 1 ? { ...step, status: 'completed' } : 
            index === 2 ? { ...step, status: 'processing' } : step
          ));
        } else if (prevProgress < 60 && newProgress >= 60) {
          setLogs(prev => [...prev, "Identified 34 unique species", "Computing biodiversity metrics..."]);
          setSteps(prev => prev.map((step, index) => 
            index === 2 ? { ...step, status: 'completed' } : 
            index === 3 ? { ...step, status: 'processing' } : step
          ));
        } else if (prevProgress < 80 && newProgress >= 80) {
          setLogs(prev => [...prev, "Shannon diversity index: 2.41", "Generating visualizations..."]);
          setSteps(prev => prev.map((step, index) => 
            index === 3 ? { ...step, status: 'completed' } : 
            index === 4 ? { ...step, status: 'processing' } : step
          ));
        } else if (prevProgress < 95 && newProgress >= 95) {
          setLogs(prev => [...prev, "Analysis complete ✓", "Report ready for download"]);
          setSteps(prev => prev.map(step => ({ ...step, status: 'completed' })));
        }

        // --- MODIFIED SECTION ---
        if (newProgress >= 100) {
          setSteps(prev => prev.map(step => ({ ...step, status: 'completed' })));
          clearInterval(interval); 
          navigate("/report"); // <-- 1. ADD THIS LINE
        }
        // --- END MODIFIED SECTION ---
        
        return newProgress;
      });
    }, INTERVAL_MS); 

    return () => clearInterval(interval);
  }, [navigate]); // <-- Add navigate to dependency array

  const getStepIcon = (step: ProcessStep) => {
    if (step.status === 'completed') {
      return <CheckCircle className="h-6 w-6 text-primary" />;
    } else if (step.status === 'processing') {
      return <Loader2 className="h-6 w-6 text-primary animate-spin" />;
    } else {
      return <Clock className="h-6 w-6 text-muted-foreground" />;
    }
  };

  const isComplete = progress >= 100;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-gradient-yellow animate-glow-pulse">
              <Dna className="h-8 w-8 text-black animate-dna" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Processing Your <span className="text-gradient-yellow">Dataset</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Running advanced eDNA analysis pipeline to identify species and compute biodiversity metrics
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Progress Section */}
          <div className="lg:col-span-2 space-y-6">
            {/* Progress Bar */}
            <Card className="glass-card p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">Analysis Progress</h3>
                <span className="text-sm text-muted-foreground">{Math.round(progress)}%</span>
              </div>
              <Progress value={progress} className="h-3 mb-4" />
              <p className="text-sm text-muted-foreground">
                {isComplete ? "Analysis complete! Redirecting to report..." : "Analyzing your eDNA sequences..."}
              </p>
            </Card>

            {/* Process Steps */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-6">Processing Steps</h3>
              <div className="space-y-4">
                {steps.map((step, index) => (
                  <div
                    key={step.id}
                    className={`flex items-center space-x-4 p-4 rounded-lg transition-colors ${
                      step.status === 'processing' ? 'bg-primary/10 border border-primary/20' : 
                      step.status === 'completed' ? 'bg-primary/5' : 'bg-muted/20'
                    }`}
                  >
                    <div className="flex-shrink-0">
                      {getStepIcon(step)}
                    </div>
                    <div className="flex-grow">
                      <h4 className="font-medium text-sm">{step.title}</h4>
                      <p className="text-xs text-muted-foreground">{step.description}</p>
                    </div>
                    {step.status === 'processing' && (
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-primary rounded-full animate-ping" />
                        <span className="text-xs text-primary">Processing...</span>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </Card>

            {/* --- 2. DELETED THIS SECTION --- */}
            {/* Action Button Card Removed */}
            
          </div>

          {/* Logs Section */}
          <div className="space-y-6">
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Processing Logs</h3>
              <div className="bg-black/50 rounded-lg p-4 max-h-96 overflow-y-auto">
                <div className="space-y-2 font-mono text-xs">
                  {logs.map((log, index) => (
                    <div key={index} className="text-green-400">
                      <span className="text-muted-foreground mr-2">
                        {new Date().toLocaleTimeString()}
                      </span>
                      {log}
                    </div>
                  ))}
                  {!isComplete && (
                    <div className="flex items-center space-x-2 text-primary">
                      <Loader2 className="h-3 w-3 animate-spin" />
                      <span>Processing...</span>
                    </div>
                  )}
                </div>
              </div>
            </Card>

            {/* Stats Preview */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Quick Stats</h3>
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Samples Processed</span>
                  <span className="font-medium">127</span>
                </div>
                <div className="flex justify-between text-sm">
      
                  <span className="text-muted-foreground">Sequences Analyzed</span>
                  <span className="font-medium">1,247</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Species Found</span>
                  <span className="font-medium text-primary">34</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shannon Index</span>
                  <span className="font-medium text-primary">2.41</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Processing;