import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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
  Shield,
  Map,
  Activity
} from "lucide-react";
import { PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Report = () => {
  const overviewStats = [
    { label: "Total Sequences", value: "5000", icon: Database },
    { label: "Filtered Sequences", value: "4903", icon: Microscope },
    { label: "Taxonomic Clusters", value: "60", icon: TreePine },
    { label: "Novel Taxa", value: "20", icon: FlaskConical }
  ];

  // Top 15 clusters by abundance from the report
  const speciesData = [
    { name: "Cluster 59", confidence: null, abundance: 2592, rank: "Dominant Generalist" },
    { name: "Cluster 14", confidence: null, abundance: 200, rank: "Uncommon" },
    { name: "Cluster 1", confidence: null, abundance: 169, rank: "Uncommon" },
    { name: "Cluster 6", confidence: null, abundance: 149, rank: "Uncommon" },
    { name: "Cluster 4", confidence: null, abundance: 132, rank: "Uncommon" },
    { name: "Cluster 38", confidence: null, abundance: 86, rank: "Uncommon" },
    { name: "Cluster 16", confidence: null, abundance: 78, rank: "Uncommon" },
    { name: "Cluster 5", confidence: null, abundance: 61, rank: "Uncommon" },
    { name: "Cluster 44", confidence: null, abundance: 56, rank: "Uncommon" },
    { name: "Cluster 40", confidence: null, abundance: 50, rank: "Uncommon" },
    { name: "Cluster 49", confidence: null, abundance: 50, rank: "Uncommon" },
    { name: "Cluster 54", confidence: null, abundance: 44, rank: "Rare Specialist" },
    { name: "Cluster 11", confidence: null, abundance: 43, rank: "Rare Specialist" },
    { name: "Cluster 25", confidence: null, abundance: 40, rank: "Rare Specialist" },
    { name: "Cluster 7", confidence: null, abundance: 38, rank: "Rare Specialist" }
  ];

  const taxonomyGroups = [
    { group: "Predicted_Protist_Group_A", species: 25, percentage: 41.67, color: "bg-yellow-500" },
    { group: "Novel_Deep_Sea_Taxon", species: 20, percentage: 33.33, color: "bg-blue-500" },
    { group: "Unclassified_Eukaryote", species: 8, percentage: 13.33, color: "bg-green-500" },
    { group: "Predicted_Eukaryote", species: 7, percentage: 11.67, color: "bg-purple-500" }
  ];

  // Pie chart data for taxonomic groups
  const pieChartData = taxonomyGroups.map((group, index) => ({
    name: group.group.replace(/_/g, ' '),
    value: group.species,
    percentage: group.percentage,
    fill: ['#eab308', '#3b82f6', '#22c55e', '#a855f7'][index]
  }));

  // Data for Diversity Indices Bar Chart from actual report
  const diversityIndicesChartData = [
    { name: "Shannon Diversity", value: 2.927, description: "Moderate diversity" },
    { name: "Simpson Diversity", value: 0.836, description: "High diversity" },
    { name: "Species Richness", value: 60, description: "60 clusters" },
    { name: "Pielou's Evenness", value: 0.715, description: "Even distribution" }
  ];

  // Top 10 clusters for abundance chart
  const abundanceChartData = speciesData.slice(0, 10).map(cluster => ({
    name: cluster.name,
    abundance: cluster.abundance
  }));

  // Ecological indicators data from report
  const ecologicalIndicators = [
    { type: "Rare Specialist", count: 39, color: "#ef4444" },
    { type: "Uncommon", count: 20, color: "#f97316" },
    { type: "Dominant Generalist", count: 1, color: "#22c55e" }
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium">{`${label}`}</p>
          <p className="text-sm text-primary">
            {`Value: ${payload[0].value}`}
          </p>
          {payload[0].payload.description && (
            <p className="text-xs text-muted-foreground">
              {payload[0].payload.description}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  const PieTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border border-border rounded-lg p-3 shadow-lg">
          <p className="text-sm font-medium">{payload[0].name}</p>
          <p className="text-sm text-primary">{`Clusters: ${payload[0].value}`}</p>
          <p className="text-xs text-muted-foreground">{`${payload[0].payload.percentage}%`}</p>
        </div>
      );
    }
    return null;
  };

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
              Deep-sea eDNA analysis results - Generated on 2025-09-19 16:47:59
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

        {/* Interactive Graphs Section */}
        <Card className="glass-card p-6 mb-8">
          <Tabs defaultValue="composition" className="w-full">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold">Analysis Dashboard</h3>
              <TabsList className="glass-card">
                <TabsTrigger value="composition" className="flex items-center gap-2">
                  <PieChart className="h-4 w-4" />
                  Composition
                </TabsTrigger>
                <TabsTrigger value="diversity" className="flex items-center gap-2">
                  <BarChart3 className="h-4 w-4" />
                  Diversity
                </TabsTrigger>
                <TabsTrigger value="abundance" className="flex items-center gap-2">
                  <Activity className="h-4 w-4" />
                  Abundance
                </TabsTrigger>
                <TabsTrigger value="indicators" className="flex items-center gap-2">
                  <Map className="h-4 w-4" />
                  Indicators
                </TabsTrigger>
              </TabsList>
            </div>

            {/* Composition Tab */}
            <TabsContent value="composition" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2">
                  <h4 className="text-md font-medium mb-4">Taxonomic Group Distribution</h4>
                  <div className="h-80 mb-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={pieChartData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percentage }) => `${name}: ${percentage}%`}
                          outerRadius={100}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {pieChartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Pie>
                        <Tooltip content={<PieTooltip />} />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    {taxonomyGroups.map((group, index) => (
                      <div key={index} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="font-medium">{group.group.replace(/_/g, ' ')}</span>
                          <span className="text-muted-foreground">
                            {group.species} clusters ({group.percentage}%)
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
                </div>
                <div className="space-y-4">
                  <h4 className="text-md font-medium">Key Metrics</h4>
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Total Taxonomic Clusters</p>
                    <p className="text-xl font-bold">60</p>
                  </div>
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Dominant Group</p>
                    <p className="text-xl font-bold">Predicted Protist Group A</p>
                  </div>
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Clustering Rate</p>
                    <p className="text-xl font-bold">96.19%</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Diversity Tab */}
            <TabsContent value="diversity" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-md font-medium mb-4">Diversity Indices</h4>
                  <div className="h-80 mb-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={diversityIndicesChartData}>
                        <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                        <XAxis 
                          dataKey="name" 
                          fontSize={12}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis fontSize={12} />
                        <Tooltip content={<CustomTooltip />} />
                        <Bar dataKey="value" fill="#eab308" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="space-y-4">
                    <div className="p-4 bg-gradient-yellow-subtle rounded-lg">
                      <p className="text-sm text-muted-foreground">Shannon Diversity</p>
                      <p className="text-xl font-bold text-primary">2.927</p>
                      <p className="text-xs text-muted-foreground">Moderate diversity</p>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Simpson Diversity</p>
                      <p className="text-xl font-bold">0.836</p>
                      <p className="text-xs text-muted-foreground">High diversity</p>
                    </div>
                    <div className="p-4 bg-muted/20 rounded-lg">
                      <p className="text-sm text-muted-foreground">Pielou's Evenness</p>
                      <p className="text-xl font-bold">0.715</p>
                      <p className="text-xs text-muted-foreground">Even distribution</p>
                    </div>
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-medium mb-4">Literature Comparison</h4>
                  <div className="space-y-3">
                    <div className="p-3 bg-muted/10 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm">Shannon Diversity</span>
                        <Badge variant="secondary">Within Range</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <p>Observed: 2.927 | Literature: 2.5 | Z-score: 0.53</p>
                        <p className="mt-1">Reference: Pawlowski et al. 2011</p>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/10 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm">Species Richness</span>
                        <Badge variant="secondary">Higher</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <p>Observed: 60 | Literature: 45 | Z-score: 1.00</p>
                        <p className="mt-1">Reference: Stoeck et al. 2010</p>
                      </div>
                    </div>
                    <div className="p-3 bg-muted/10 rounded-lg">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-sm">Novel Taxa Fraction</span>
                        <Badge variant="secondary">Within Range</Badge>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        <p>Observed: 0.333 | Literature: 0.3 | Z-score: 0.28</p>
                        <p className="mt-1">Reference: Zuendorf et al. 2006</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Abundance Tab */}
            <TabsContent value="abundance" className="space-y-4">
              <div>
                <h4 className="text-md font-medium mb-4">Top 10 Clusters by Abundance</h4>
                <div className="h-80 mb-8">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={abundanceChartData} layout="horizontal">
                      <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                      <XAxis type="number" fontSize={12} />
                      <YAxis 
                        type="category" 
                        dataKey="name" 
                        fontSize={12}
                        width={80}
                      />
                      <Tooltip content={<CustomTooltip />} />
                      <Bar dataKey="abundance" fill="#3b82f6" radius={[0, 4, 4, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 bg-gradient-yellow-subtle rounded-lg">
                    <p className="text-sm text-muted-foreground">Most Abundant</p>
                    <p className="text-lg font-bold text-primary">Cluster 59</p>
                    <p className="text-xs text-muted-foreground">2,592 sequences (52.9%)</p>
                  </div>
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Second Most</p>
                    <p className="text-lg font-bold">Cluster 14</p>
                    <p className="text-xs text-muted-foreground">200 sequences (4.1%)</p>
                  </div>
                  <div className="p-4 bg-muted/20 rounded-lg">
                    <p className="text-sm text-muted-foreground">Third Most</p>
                    <p className="text-lg font-bold">Cluster 1</p>
                    <p className="text-xs text-muted-foreground">169 sequences (3.4%)</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Ecological Indicators Tab */}
            <TabsContent value="indicators" className="space-y-4">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-md font-medium mb-4">Ecological Indicator Distribution</h4>
                  <div className="h-64 mb-8">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={ecologicalIndicators}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ type, count }) => `${type}: ${count}`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="count"
                        >
                          {ecologicalIndicators.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
                <div>
                  <h4 className="text-md font-medium mb-4">Conservation Priorities</h4>
                  <div className="space-y-4">
                    <div className="p-4 bg-red-500/10 rounded-lg border border-red-500/20">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">High Priority</span>
                        <Badge variant="destructive">39 taxa</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Rare specialists requiring immediate conservation attention
                      </p>
                    </div>
                    <div className="p-4 bg-orange-500/10 rounded-lg border border-orange-500/20">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">Medium Priority</span>
                        <Badge variant="secondary">20 taxa</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Uncommon species with moderate conservation needs
                      </p>
                    </div>
                    <div className="p-4 bg-green-500/10 rounded-lg border border-green-500/20">
                      <div className="flex justify-between items-center">
                        <span className="font-medium text-sm">Standard Priority</span>
                        <Badge variant="secondary">1 taxon</Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">
                        Dominant generalist with stable populations
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </Card>

        {/* Detailed Species Table */}
        <Card className="glass-card p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
            <h3 className="text-lg font-semibold mb-4 md:mb-0">Detailed Cluster Analysis</h3>
            <div className="flex space-x-3 w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search clusters..."
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
                    Cluster ID
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                    Database Match
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                    Abundance
                  </th>
                  <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                    Ecological Indicator
                  </th>
                </tr>
              </thead>
              <tbody>
                {speciesData.map((species, index) => (
                  <tr key={index} className="border-b border-border/50 hover:bg-muted/10">
                    <td className="py-3 px-2">
                      <div className="font-medium text-sm">{species.name}</div>
                    </td>
                    <td className="py-3 px-2">
                      <Badge 
                        variant="destructive"
                        className="text-xs"
                      >
                        &lt; 90% Similarity (Novel)
                      </Badge>
                    </td>
                    <td className="py-3 px-2 text-sm">{species.abundance.toLocaleString()}</td>
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

        {/* Key Findings and Recommendations */}
        <Card className="glass-card p-6 mt-8">
          <h3 className="text-lg font-semibold mb-4">Key Findings & Recommendations</h3>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h4 className="text-md font-medium mb-3">Key Findings</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Moderate microbial eukaryotic diversity detected (Shannon: 2.927)</li>
                <li>• High proportion of potentially novel taxa (33.3%)</li>
                <li>• One dominant cluster (Cluster 59) represents 52.9% of sequences</li>
                <li>• Even species distribution with high evenness (0.715)</li>
                <li>• 96.19% clustering rate with 187 noise points</li>
              </ul>
            </div>
            <div>
              <h4 className="text-md font-medium mb-3">Recommendations</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Further taxonomic verification of novel sequences recommended</li>
                <li>• Consider targeted cultivation attempts for abundant novel taxa</li>
                <li>• Extend sampling to capture seasonal/temporal variation</li>
                <li>• Validate findings with independent molecular techniques</li>
                <li>• Investigate functional roles of dominant taxa</li>
                <li>• Analyze co-occurrence patterns for ecological insights</li>
              </ul>
            </div>
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