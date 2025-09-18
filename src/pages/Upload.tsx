import { useState, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { 
  Upload as UploadIcon, 
  FileText, 
  X, 
  CheckCircle,
  FileSpreadsheet,
  Database,
  Shield
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

interface UploadedFile {
  name: string;
  size: number;
  type: string;
}

const Upload = () => {
  const [dragActive, setDragActive] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  const supportedFormats = [
    { icon: Database, format: "FASTA", description: "Sequence data files (.fasta, .fa)" },
    { icon: FileSpreadsheet, format: "CSV", description: "Comma-separated values (.csv)" },
    { icon: FileText, format: "Excel", description: "Excel spreadsheets (.xlsx, .xls)" }
  ];

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (files: FileList) => {
    const newFiles = Array.from(files).map(file => ({
      name: file.name,
      size: file.size,
      type: file.type
    }));
    
    setUploadedFiles(prevFiles => [...prevFiles, ...newFiles]);
    
    toast({
      title: "Files uploaded successfully",
      description: `${newFiles.length} file(s) added to processing queue`,
    });
  };

  const removeFile = (index: number) => {
    setUploadedFiles(files => files.filter((_, i) => i !== index));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const handleStartProcessing = () => {
    if (uploadedFiles.length === 0) {
      toast({
        title: "No files selected",
        description: "Please upload at least one file to continue",
        variant: "destructive"
      });
      return;
    }
    
    navigate("/processing");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Upload Your <span className="text-gradient-yellow">eDNA Dataset</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Upload your environmental DNA datasets for automated analysis and biodiversity mapping
          </p>
        </div>

        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Upload Section */}
          <div className="lg:col-span-2">
            <Card className="glass-card p-8">
              {/* Upload Zone */}
              <div
                className={`relative border-2 border-dashed rounded-lg p-12 text-center transition-all duration-300 ${
                  dragActive
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <input
                  type="file"
                  id="file-upload"
                  multiple
                  accept=".fasta,.fa,.csv,.xlsx,.xls"
                  onChange={handleChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                
                <div className="space-y-4">
                  <div className="p-4 rounded-full bg-gradient-yellow w-fit mx-auto">
                    <UploadIcon className="h-8 w-8 text-black" />
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">
                      Drop files here or click to browse
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      Maximum file size: 100MB per file
                    </p>
                  </div>
                  
                  <Button variant="transparent">
                    Browse Files
                  </Button>
                </div>
              </div>

              {/* Uploaded Files */}
              {uploadedFiles.length > 0 && (
                <div className="mt-8">
                  <h3 className="text-lg font-semibold mb-4">Uploaded Files</h3>
                  <div className="space-y-3">
                    {uploadedFiles.map((file, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between p-3 glass-card rounded-lg"
                      >
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="h-5 w-5 text-primary" />
                          <div>
                            <p className="font-medium text-sm">{file.name}</p>
                            <p className="text-xs text-muted-foreground">
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeFile(index)}
                          className="text-destructive hover:text-destructive"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Start Processing Button */}
              <div className="mt-8 pt-6 border-t border-border">
                <Button
                  onClick={handleStartProcessing}
                  size="lg"
                  variant="transparent"
                  className="w-full hover-glow"
                  disabled={uploadedFiles.length === 0}
                >
                  Start Processing
                </Button>
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Supported Formats */}
            <Card className="glass-card p-6">
              <h3 className="text-lg font-semibold mb-4">Supported Formats</h3>
              <div className="space-y-4">
                {supportedFormats.map((format, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="p-2 rounded-lg bg-gradient-yellow">
                      <format.icon className="h-4 w-4 text-black" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm">{format.format}</h4>
                      <p className="text-xs text-muted-foreground">{format.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Privacy Notice */}
            <Card className="glass-card p-6">
              <div className="flex items-start space-x-3">
                <Shield className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h3 className="font-semibold text-sm mb-2">Privacy & Security</h3>
                  <p className="text-xs text-muted-foreground">
                    Your uploaded data is processed securely and automatically deleted 
                    after analysis completion. We do not store your research data permanently.
                  </p>
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

export default Upload;