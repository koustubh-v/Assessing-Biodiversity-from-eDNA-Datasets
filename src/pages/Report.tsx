import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Download, 
  FileText, 
  Database, 
  BarChart3,
  PieChart,
  Search,
  Filter,
  TreePine,
  Microscope,
  FlaskConical,
  Shield
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Report = () => {
  const overviewStats = [
    { label: "Samples Processed", value: "127", icon: Database },
    { label: "Sequences Analyzed", value: "1,247", icon: Microscope },
    { label: "Species Found", value: "34", icon: TreePine },
    { label: "Shannon Index", value: "2.41", icon: BarChart3 }
  ];

  const speciesData = [
    { name: "Salmo trutta", confidence: 98.5, abundance: 234, rank: "Species" },
    { name: "Cottus gobio", confidence: 96.2, abundance: 189, rank: "Species" },
    { name: "Thymallus thymallus", confidence: 94.8, abundance: 156, rank: "Species" },
    { name: "Barbatula barbatula", confidence: 92.3, abundance: 142, rank: "Species" },
    { name: "Phoxinus phoxinus", confidence: 89.7, abundance: 98, rank: "Species" },
    { name: "Leuciscus leuciscus", confidence: 87.4, abundance: 87, rank: "Species" },
  ];

  const taxonomyGroups = [
    { group: "Fish", species: 18, percentage: 52.9, color: "bg-yellow-500" },
    { group: "Invertebrates", species: 12, percentage: 35.3, color: "bg-blue-500" },
    { group: "Amphibians", species: 3, percentage: 8.8, color: "bg-green-500" },
    { group: "Plants", species: 1, percentage: 2.9, color: "bg-purple-500" }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 pt-24 pb-16">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12">
          <div>
            <h1 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="text-gradient-yellow">Biodiversity</span> Analysis Report
            </h1>
            <p className="text-muted-foreground">
              Complete eDNA analysis results for your environmental sample dataset
            </p>
          </div>
          <div className="flex space-x-3 mt-4 md:mt-0">
            <Button variant="transparent" className="hover-glow">
              <Download className="h-4 w-4 mr-2" />
              Export CSV
            </Button>
            <Button variant="transparent" className="hover-glow">
              <FileText className="h-4 w-4 mr-2" />
              Export PDF
            </Button>
          </div>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {overviewStats.map((stat, index) => (
            <Card key={index} className="glass-card p-6 hover-glow">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                  <p className="text-2xl font-bold text-primary">{stat.value}</p>
                </div>
                <div className="p-3 rounded-full bg-gradient-yellow">
                  <stat.icon className="h-6 w-6 text-black" />
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Species Distribution Chart */}
          <Card className="glass-card p-6 lg:col-span-2">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Species Group Distribution</h3>
              <PieChart className="h-5 w-5 text-muted-foreground" />
            </div>
            
            <div className="space-y-4">
              {taxonomyGroups.map((group, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{group.group}</span>
                    <span className="text-muted-foreground">
                      {group.species} species ({group.percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`${group.color} h-2 rounded-full transition-all duration-500`}
                      style={{ width: `${group.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Biodiversity Metrics */}
          <Card className="glass-card p-6">
            <h3 className="text-lg font-semibold mb-6">Diversity Metrics</h3>
            <div className="space-y-4">
              <div className="p-4 bg-gradient-yellow-subtle rounded-lg">
                <p className="text-sm text-muted-foreground">Shannon Diversity</p>
                <p className="text-xl font-bold text-primary">2.41</p>
                <p className="text-xs text-muted-foreground">High diversity</p>
              </div>
              <div className="p-4 bg-muted/20 rounded-lg">
                <p className="text-sm text-muted-foreground">Species Richness</p>
                <p className="text-xl font-bold">34</p>
              </div>
              <div className="p-4 bg-muted/20 rounded-lg">
                <p className="text-sm text-muted-foreground">Evenness Index</p>
                <p className="text-xl font-bold">0.68</p>
              </div>
            </div>
          </Card>
        </div>

        {/* Detailed Species Table */}
        <Card className="glass-card p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h3 className="text-lg font-semibold mb-4 md:mb-0">Detailed Species Analysis</h3>
            <div className="flex space-x-3 w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search species..."
                  className="pl-10 bg-muted/20 border-border"
                />
              </div>
              <Button variant="transparent" size="sm">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                    Species Name
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                    Confidence
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                    Abundance
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                    Taxonomic Rank
                  </th>
                </tr>
              </thead>
              <tbody>
                {speciesData.map((species, index) => (
                  <tr key={index} className="border-b border-border/50 hover:bg-muted/10">
                    <td className="py-3 px-2">
                      <div className="font-medium text-sm italic">{species.name}</div>
                    </td>
                    <td className="py-3 px-2">
                      <Badge 
                        variant={species.confidence > 95 ? "default" : "secondary"}
                        className="text-xs"
                      >
                        {species.confidence}%
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-sm">{species.abundance}</td>
                    <td className="py-3 px-2 text-sm text-muted-foreground">{species.rank}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="mt-6 flex justify-center">
            <Button variant="transparent">
              Load More Results
            </Button>
          </div>
        </Card>

        {/* Privacy Footer */}
        <Card className="glass-card p-6 mt-8">
          <div className="flex items-center space-x-3 text-center justify-center">
            <Shield className="h-5 w-5 text-primary" />
            <p className="text-sm text-muted-foreground">
              Your uploaded data is not stored on our servers. This report was generated 
              from temporary analysis and all source data has been securely deleted.
            </p>
          </div>
        </Card>
      </div>

      <Footer />
    </div>
  );
};

export default Report;