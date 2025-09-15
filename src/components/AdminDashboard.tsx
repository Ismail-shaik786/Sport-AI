import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Users, 
  BarChart3, 
  FileText, 
  Search,
  Filter,
  Download,
  Eye,
  CheckCircle,
  AlertTriangle,
  Trophy,
  TrendingUp,
  MapPin,
  Star,
  User
} from "lucide-react";

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Mock data
  const mockAthletes = [
    {
      id: 1,
      name: "Alex Johnson",
      sport: "Athletics",
      score: 87,
      region: "Maharashtra",
      status: "verified",
      cheatFlags: 0,
      lastAssessment: "2025-01-08"
    },
    {
      id: 2,
      name: "Priya Sharma",
      sport: "Badminton",
      score: 92,
      region: "Karnataka",
      status: "verified",
      cheatFlags: 0,
      lastAssessment: "2025-01-07"
    },
    {
      id: 3,
      name: "Rohit Kumar",
      sport: "Cricket",
      score: 76,
      region: "Delhi",
      status: "flagged",
      cheatFlags: 2,
      lastAssessment: "2025-01-06"
    },
    {
      id: 4,
      name: "Anisha Patel",
      sport: "Wrestling",
      score: 89,
      region: "Gujarat",
      status: "verified",
      cheatFlags: 0,
      lastAssessment: "2025-01-05"
    }
  ];

  const mockReports = [
    {
      id: 1,
      athlete: "Rohit Kumar",
      type: "Movement Manipulation",
      confidence: 94,
      status: "pending",
      date: "2025-01-06"
    },
    {
      id: 2,
      athlete: "Sarah Wilson",
      type: "Speed Tampering", 
      confidence: 87,
      status: "reviewed",
      date: "2025-01-04"
    }
  ];

  const stats = {
    totalAthletes: 10543,
    newRegistrations: 127,
    pendingReviews: 23,
    talentShortlisted: 89
  };

  const regionStats = [
    { region: "Maharashtra", athletes: 2156, avgScore: 82 },
    { region: "Karnataka", athletes: 1943, avgScore: 79 },
    { region: "Delhi", athletes: 1678, avgScore: 81 },
    { region: "Gujarat", athletes: 1456, avgScore: 84 }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="glass border-b border-white/10 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-secondary rounded-lg flex items-center justify-center">
              <Shield className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">SAI Admin Dashboard</h1>
              <p className="text-muted-foreground text-sm">Sports Authority of India</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <Badge className="bg-secondary/20 text-secondary border-secondary/30">
              <Shield className="w-4 h-4 mr-2" />
              Admin Access
            </Badge>
            <Button className="bg-gradient-accent hover:glow-accent text-white">
              <Download className="w-4 h-4 mr-2" />
              Export Reports
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          {[
            { label: "Total Athletes", value: stats.totalAthletes.toLocaleString(), icon: Users, color: "bg-gradient-primary" },
            { label: "New Registrations", value: stats.newRegistrations, icon: TrendingUp, color: "bg-gradient-secondary" },
            { label: "Pending Reviews", value: stats.pendingReviews, icon: AlertTriangle, color: "bg-gradient-accent" },
            { label: "Talent Shortlisted", value: stats.talentShortlisted, icon: Star, color: "bg-gradient-primary" }
          ].map((stat, index) => (
            <Card key={index} className="glass border-white/10 hover-lift">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-muted-foreground text-sm">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 ${stat.color} rounded-lg flex items-center justify-center`}>
                    <stat.icon className="w-6 h-6 text-white" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <Tabs defaultValue="athletes" className="space-y-8">
          <TabsList className="grid grid-cols-4 w-full bg-muted/20">
            <TabsTrigger value="athletes" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Athletes</span>
            </TabsTrigger>
            <TabsTrigger value="reports" className="flex items-center space-x-2">
              <AlertTriangle className="w-4 h-4" />
              <span>Cheat Reports</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Analytics</span>
            </TabsTrigger>
            <TabsTrigger value="exports" className="flex items-center space-x-2">
              <FileText className="w-4 h-4" />
              <span>Export</span>
            </TabsTrigger>
          </TabsList>

          {/* Athletes Management */}
          <TabsContent value="athletes" className="space-y-6">
            {/* Search and Filter */}
            <Card className="glass border-white/10">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                  <div className="flex items-center space-x-4 flex-1">
                    <div className="relative flex-1 max-w-md">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        placeholder="Search athletes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10 bg-muted/20 border-white/20 text-white"
                      />
                    </div>
                    <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </div>
                  <Button className="bg-gradient-primary hover:glow-primary text-white">
                    <Trophy className="w-4 h-4 mr-2" />
                    Shortlist Talent
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Athletes Table */}
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="text-white">Registered Athletes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAthletes.map((athlete) => (
                    <div key={athlete.id} className="flex items-center justify-between p-4 bg-muted/10 rounded-lg hover-lift">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <User className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-semibold text-white">{athlete.name}</h4>
                          <p className="text-sm text-muted-foreground">{athlete.sport} • {athlete.region}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-6">
                        <div className="text-center">
                          <div className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">
                            {athlete.score}
                          </div>
                          <div className="text-xs text-muted-foreground">Score</div>
                        </div>
                        
                        <Badge 
                          className={
                            athlete.status === "verified" 
                              ? "bg-secondary/20 text-secondary border-secondary/30"
                              : "bg-destructive/20 text-destructive border-destructive/30"
                          }
                        >
                          {athlete.status === "verified" ? (
                            <CheckCircle className="w-3 h-3 mr-1" />
                          ) : (
                            <AlertTriangle className="w-3 h-3 mr-1" />
                          )}
                          {athlete.status}
                        </Badge>
                        
                        <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                          <Eye className="w-4 h-4 mr-2" />
                          View Profile
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Cheat Detection Reports */}
          <TabsContent value="reports" className="space-y-6">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <AlertTriangle className="w-5 h-5" />
                  <span>Cheat Detection Reports</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockReports.map((report) => (
                    <div key={report.id} className="p-4 bg-muted/10 rounded-lg border-l-4 border-destructive">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-semibold text-white">{report.athlete}</h4>
                          <p className="text-sm text-muted-foreground">{report.type}</p>
                          <p className="text-xs text-muted-foreground mt-1">{report.date}</p>
                        </div>
                        
                        <div className="flex items-center space-x-4">
                          <div className="text-center">
                            <div className="text-lg font-bold text-destructive">{report.confidence}%</div>
                            <div className="text-xs text-muted-foreground">Confidence</div>
                          </div>
                          
                          <Badge 
                            className={
                              report.status === "pending"
                                ? "bg-accent/20 text-accent border-accent/30"
                                : "bg-muted/20 text-muted-foreground border-muted/30"
                            }
                          >
                            {report.status}
                          </Badge>
                          
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" className="bg-gradient-secondary hover:glow-secondary text-white">
                              Review
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Dashboard */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Regional Analytics */}
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <MapPin className="w-5 h-5" />
                    <span>Regional Performance</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {regionStats.map((region, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/10 rounded-lg">
                      <div>
                        <h4 className="font-semibold text-white">{region.region}</h4>
                        <p className="text-sm text-muted-foreground">{region.athletes} athletes</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold bg-gradient-hero bg-clip-text text-transparent">
                          {region.avgScore}
                        </div>
                        <div className="text-xs text-muted-foreground">Avg Score</div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Sports Distribution */}
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white">
                    <BarChart3 className="w-5 h-5" />
                    <span>Sports Distribution</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { sport: "Athletics", count: 2847, percentage: 27 },
                    { sport: "Cricket", count: 2134, percentage: 20 },
                    { sport: "Football", count: 1923, percentage: 18 },
                    { sport: "Badminton", count: 1567, percentage: 15 }
                  ].map((sport, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white">{sport.sport}</span>
                        <span className="text-muted-foreground">{sport.count}</span>
                      </div>
                      <div className="w-full bg-muted/20 rounded-full h-2">
                        <div 
                          className="bg-gradient-primary h-2 rounded-full" 
                          style={{ width: `${sport.percentage}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Export Reports */}
          <TabsContent value="exports" className="space-y-6">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white">
                  <FileText className="w-5 h-5" />
                  <span>Export Reports</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: "Athlete Database",
                      description: "Complete list of registered athletes with scores and assessments",
                      formats: ["CSV", "PDF", "Excel"]
                    },
                    {
                      title: "Cheat Detection Reports",
                      description: "All flagged assessments with confidence scores and review status",
                      formats: ["PDF", "CSV"]
                    },
                    {
                      title: "Regional Analytics",
                      description: "Performance statistics by state and region",
                      formats: ["PDF", "Chart"]
                    },
                    {
                      title: "Talent Shortlist",
                      description: "High-performing athletes ready for selection",
                      formats: ["PDF", "Excel"]
                    }
                  ].map((report, index) => (
                    <div key={index} className="p-4 bg-muted/10 rounded-lg space-y-4">
                      <div>
                        <h4 className="font-semibold text-white mb-2">{report.title}</h4>
                        <p className="text-sm text-muted-foreground">{report.description}</p>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex space-x-2">
                          {report.formats.map((format, fIndex) => (
                            <Badge key={fIndex} className="bg-primary/20 text-primary border-primary/30 text-xs">
                              {format}
                            </Badge>
                          ))}
                        </div>
                        <Button size="sm" className="bg-gradient-primary hover:glow-primary text-white">
                          <Download className="w-4 h-4 mr-2" />
                          Export
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminDashboard;