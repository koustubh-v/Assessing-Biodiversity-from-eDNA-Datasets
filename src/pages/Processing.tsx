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
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

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
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = Math.min(prev + 2, 100);
        
        // Update logs based on progress
        if (newProgress >= 20 && newProgress < 22) {
          setLogs(prev => [...prev, "BLAST search initiated against NCBI database..."]);
        } else if (newProgress >= 40 && newProgress < 42) {
          setLogs(prev => [...prev, "Found 1,247 sequence matches", "Processing taxonomic assignments..."]);
          setSteps(prev => prev.map((step, index) => 
            index === 1 ? { ...step, status: 'completed' } : 
            index === 2 ? { ...step, status: 'processing' } : step
          ));
        } else if (newProgress >= 60 && newProgress < 62) {
          setLogs(prev => [...prev, "Identified 34 unique species", "Computing biodiversity metrics..."]);
          setSteps(prev => prev.map((step, index) => 
            index === 2 ? { ...step, status: 'completed' } : 
            index === 3 ? { ...step, status: 'processing' } : step
          ));
        } else if (newProgress >= 80 && newProgress < 82) {
          setLogs(prev => [...prev, "Shannon diversity index: 2.41", "Generating visualizations..."]);
          setSteps(prev => prev.map((step, index) => 
            index === 3 ? { ...step, status: 'completed' } : 
            index === 4 ? { ...step, status: 'processing' } : step
          ));
        } else if (newProgress >= 95 && newProgress < 97) {
          setLogs(prev => [...prev, "Analysis complete ✓", "Report ready for download"]);
          setSteps(prev => prev.map(step => ({ ...step, status: 'completed' })));
        }
        
        return newProgress;
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

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
                {isComplete ? "Analysis complete! Ready to view results." : "Analyzing your eDNA sequences..."}
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

            {/* Action Button */}
            {isComplete && (
              <Card className="glass-card p-6">
                <div className="text-center">
                  <CheckCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Analysis Complete!</h3>
                  <p className="text-muted-foreground mb-6">
                    Your eDNA dataset has been successfully analyzed. View the complete biodiversity report.
                  </p>
                  <Button
                    onClick={() => navigate("/report")}
                    size="lg"
                    variant="transparent"
                    className="hover-glow"
                  >
                    View Report
                  </Button>
                </div>
              </Card>
            )}
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