import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { 
  Upload, 
  Cpu, 
  BarChart3, 
  FileText, 
  Shield, 
  Zap, 
  Target, 
  Database,
  ArrowRight,
  Microscope,
  FlaskConical,
  TreePine
} from "lucide-react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import heroImage from "@/assets/hero-bg.jpg";

const Index = () => {
  const features = [
    {
      icon: Upload,
      title: "Upload Datasets",
      description: "Support for FASTA, CSV, and Excel formats with secure processing"
    },
    {
      icon: Cpu,
      title: "Automated DNA Analysis",
      description: "Advanced BLAST search and taxonomic classification algorithms"
    },
    {
      icon: BarChart3,
      title: "Visualize Taxonomy",
      description: "Interactive charts and species distribution mapping"
    },
    {
      icon: FileText,
      title: "Export Reports",
      description: "Generate comprehensive PDF and CSV reports for research"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Non-invasive",
      description: "Analyze species without direct sampling"
    },
    {
      icon: Target,
      title: "Accurate",
      description: "High-confidence taxonomic identification"
    },
    {
      icon: Database,
      title: "Research-ready",
      description: "Scientific-grade data and reports"
    },
    {
      icon: Zap,
      title: "Scalable",
      description: "Process large datasets efficiently"
    }
  ];

  const processSteps = [
    { icon: Upload, title: "Upload", description: "eDNA Dataset" },
    { icon: Cpu, title: "Processing", description: "BLAST Analysis" },
    { icon: BarChart3, title: "Visualization", description: "Taxonomy Charts" },
    { icon: Microscope, title: "Insights", description: "Biodiversity Metrics" },
    { icon: FileText, title: "Export", description: "Research Reports" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 to-background" />
        
        <div className="relative container mx-auto px-4 text-center">
          <div className="fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Mapping{" "}
              <span className="text-gradient-yellow handwritten-underline">
                Biodiversity
              </span>{" "}
              from{" "}
              <span className="text-gradient-yellow handwritten-underline">
                eDNA
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto fade-in-delay">
              Advanced non-invasive DNA analysis for species identification and biodiversity research
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center fade-in-delay">
              <Link to="/upload">
                <Button size="lg" variant="transparent" className="hover-glow group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Button variant="ghost" size="lg" className="text-muted-foreground">
                View Demo
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Research-Grade eDNA Analysis
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Powerful tools for environmental DNA processing and biodiversity assessment
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index}
                className="glass-card p-6 hover-glow transition-all duration-300 hover:scale-105"
              >
                <div className="p-3 rounded-full bg-gradient-yellow w-fit mb-4">
                  <feature.icon className="h-6 w-6 text-black" />
                </div>
                <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 bg-background-secondary/50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Why Choose BioDNA?
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="p-4 rounded-full bg-gradient-yellow w-fit mx-auto mb-4">
                  <benefit.icon className="h-8 w-8 text-black" />
                </div>
                <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
                <p className="text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Flow Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Simple Research Workflow
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              From raw eDNA data to actionable biodiversity insights in minutes
            </p>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8">
            {processSteps.map((step, index) => (
              <div key={index} className="flex flex-col lg:flex-row items-center">
                <div className="glass-card p-6 rounded-full mb-4 lg:mb-0">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <div className="text-center lg:text-left lg:ml-4 mb-8 lg:mb-0">
                  <h3 className="font-semibold text-sm text-primary">{step.title}</h3>
                  <p className="text-xs text-muted-foreground">{step.description}</p>
                </div>
                {index < processSteps.length - 1 && (
                  <ArrowRight className="h-6 w-6 text-muted-foreground mx-8 hidden lg:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy Section */}
      <section className="py-16 px-4 bg-gradient-glass">
        <div className="container mx-auto text-center">
          <div className="glass-card p-8 max-w-2xl mx-auto">
            <Shield className="h-12 w-12 text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold mb-4">Secure & Private</h3>
            <p className="text-muted-foreground">
              Your data is processed securely and not stored permanently. All analysis 
              follows research data protection standards with full encryption.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;