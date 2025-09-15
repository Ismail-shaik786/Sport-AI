import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Trophy, Target, Users, Zap, Brain, Shield, Activity, CheckCircle, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2 text-muted-foreground hover:text-white">
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Home</span>
          </Link>
          
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              SportAI
            </span>
          </div>
        </div>
      </nav>

      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-20 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-hero opacity-10 animate-gradient-shift bg-300%"></div>
          
          <div className="container mx-auto px-4 text-center relative">
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30">
              SIH 2025 Problem Statement Solution
            </Badge>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Revolutionizing Sports
              </span>
              <br />
              <span className="text-white">Talent Discovery</span>
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              A comprehensive AI-powered platform that eliminates barriers and creates a direct, 
              transparent pathway between athletes and the Sports Authority of India.
            </p>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-16 h-16 bg-gradient-primary rounded-full opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-secondary rounded-full opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
        </section>

        {/* Problem Statement */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">
                <span className="bg-gradient-hero bg-clip-text text-transparent">
                  The Challenge We Solve
                </span>
              </h2>

              <Card className="glass border-white/10 p-8 mb-12">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">Current System Limitations</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Traditional sports talent identification relies on scouts, coaches, and regional networks, 
                        creating barriers for athletes in remote areas. The process is often subjective, 
                        time-consuming, and lacks transparency.
                      </p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-6 mt-8">
                    {[
                      "Geographic Barriers",
                      "Subjective Assessment",
                      "Limited Accessibility",
                      "Slow Processing",
                      "Lack of Transparency", 
                      "Multiple Intermediaries"
                    ].map((challenge, index) => (
                      <div key={index} className="p-4 bg-muted/10 rounded-lg text-center">
                        <p className="text-white font-medium">{challenge}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* Our Solution */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-16 text-center">
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                Our AI-Powered Solution
              </span>
            </h2>

            <div className="max-w-6xl mx-auto">
              {/* Workflow Diagram */}
              <div className="mb-16">
                <h3 className="text-2xl font-bold text-white mb-8 text-center">
                  Streamlined Talent Assessment Workflow
                </h3>
                
                <div className="grid md:grid-cols-4 gap-6">
                  {[
                    {
                      step: "1",
                      title: "Athlete Registration",
                      description: "Athletes register directly on the platform from anywhere in India",
                      icon: Users,
                      color: "bg-gradient-primary"
                    },
                    {
                      step: "2", 
                      title: "AI Assessment",
                      description: "Comprehensive fitness testing with real-time AI analysis and scoring",
                      icon: Brain,
                      color: "bg-gradient-secondary"
                    },
                    {
                      step: "3",
                      title: "Cheat Detection",
                      description: "Advanced computer vision ensures fair and authentic assessments",
                      icon: Shield,
                      color: "bg-gradient-accent"
                    },
                    {
                      step: "4",
                      title: "SAI Review",
                      description: "Sports Authority of India directly accesses verified talent data",
                      icon: CheckCircle,
                      color: "bg-gradient-primary"
                    }
                  ].map((step, index) => (
                    <div key={index} className="relative">
                      <Card className="glass border-white/10 p-6 text-center hover-lift h-full">
                        <div className={`w-16 h-16 ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 glow-primary`}>
                          <step.icon className="w-8 h-8 text-white" />
                        </div>
                        
                        <Badge className="mb-3 bg-primary/20 text-primary border-primary/30">
                          Step {step.step}
                        </Badge>
                        
                        <h4 className="font-bold text-white mb-2">{step.title}</h4>
                        <p className="text-sm text-muted-foreground leading-relaxed">{step.description}</p>
                      </Card>
                      
                      {index < 3 && (
                        <div className="hidden md:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                          <ArrowRight className="w-6 h-6 text-primary" />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features */}
              <div className="grid md:grid-cols-2 gap-8 mb-16">
                <Card className="glass border-white/10 p-8">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <Activity className="w-6 h-6" />
                      <span>AI-Powered Assessment</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span>TensorFlow.js models for real-time fitness scoring</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span>Computer vision for pose estimation and movement analysis</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span>Predictive analytics for talent identification</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span>Explainable AI providing detailed feedback</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>

                <Card className="glass border-white/10 p-8">
                  <CardHeader className="pb-4">
                    <CardTitle className="flex items-center space-x-2 text-white">
                      <Shield className="w-6 h-6" />
                      <span>Fair Play Technology</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <ul className="space-y-3 text-muted-foreground">
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span>Advanced cheat detection using video analysis</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span>Movement authenticity verification</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span>Environmental tampering detection</span>
                      </li>
                      <li className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-secondary mt-0.5 flex-shrink-0" />
                        <span>Confidence scoring for all assessments</span>
                      </li>
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* Impact & Benefits */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold mb-16 text-center">
              <span className="bg-gradient-accent bg-clip-text text-transparent">
                Expected Impact
              </span>
            </h2>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
              {[
                {
                  title: "Democratized Access",
                  description: "Athletes from remote areas can showcase talent without geographic barriers",
                  icon: Users,
                  stats: "10x more reach"
                },
                {
                  title: "Objective Assessment", 
                  description: "AI eliminates human bias and provides consistent, fair evaluation",
                  icon: Target,
                  stats: "98.5% accuracy"
                },
                {
                  title: "Faster Processing",
                  description: "Instant AI analysis reduces assessment time from weeks to minutes",
                  icon: Zap,
                  stats: "<2s processing"
                }
              ].map((benefit, index) => (
                <Card key={index} className="glass border-white/10 p-8 text-center hover-lift">
                  <div className="w-16 h-16 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-6 glow-primary">
                    <benefit.icon className="w-8 h-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold text-white mb-4">{benefit.title}</h3>
                  <p className="text-muted-foreground mb-4 leading-relaxed">{benefit.description}</p>
                  
                  <Badge className="bg-secondary/20 text-secondary border-secondary/30">
                    {benefit.stats}
                  </Badge>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Technical Feasibility */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl font-bold mb-12 text-center">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Technical Feasibility
                </span>
              </h2>

              <div className="space-y-8">
                <Card className="glass border-white/10 p-8">
                  <h3 className="text-xl font-bold text-white mb-4">Technology Stack & Implementation</h3>
                  
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-secondary mb-3">Frontend & AI</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• React 18 + TypeScript for robust UI</li>
                        <li>• TensorFlow.js for browser-based AI models</li>
                        <li>• PWA support for offline functionality</li>
                        <li>• WebRTC for real-time video processing</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-secondary mb-3">Backend & Infrastructure</h4>
                      <ul className="space-y-2 text-muted-foreground">
                        <li>• Supabase for scalable database & auth</li>
                        <li>• PostgreSQL for structured data storage</li>
                        <li>• Cloud storage for video assessments</li>
                        <li>• Real-time sync for offline capability</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                <div className="grid md:grid-cols-2 gap-8">
                  <Card className="glass border-white/10 p-6">
                    <h4 className="font-semibold text-white mb-4 flex items-center">
                      <Brain className="w-5 h-5 mr-2" />
                      AI Model Training
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Models trained on diverse datasets of athletic performance metrics, 
                      ensuring accurate scoring across different sports and demographics.
                    </p>
                  </Card>

                  <Card className="glass border-white/10 p-6">
                    <h4 className="font-semibold text-white mb-4 flex items-center">
                      <Activity className="w-5 h-5 mr-2" />
                      Scalability Design
                    </h4>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Cloud-native architecture supports concurrent assessments of 
                      thousands of athletes with auto-scaling capabilities.
                    </p>
                  </Card>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4 text-center">
            <Card className="glass border-white/10 p-12 max-w-4xl mx-auto hover-lift">
              <h2 className="text-4xl font-bold mb-6">
                Ready to transform
                <span className="bg-gradient-hero bg-clip-text text-transparent"> sports in India?</span>
              </h2>
              <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                Experience the future of sports talent assessment with our AI-powered platform
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/auth">
                  <Button size="lg" className="bg-gradient-primary hover:glow-primary text-white px-12 py-6 text-lg">
                    Try Demo Platform
                    <Zap className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/">
                  <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-12 py-6 text-lg">
                    Back to Home
                  </Button>
                </Link>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;