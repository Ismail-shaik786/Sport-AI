import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Zap, Shield, Activity, Brain, Target, Users, Trophy, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 glass border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              SportAI
            </span>
          </div>
          
          <div className="flex items-center space-x-4">
            <Link to="/auth">
              <Button variant="ghost" className="text-white hover:bg-white/10">
                Login
              </Button>
            </Link>
            <Link to="/auth">
              <Button className="bg-gradient-primary hover:glow-primary text-white">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-20 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10 animate-gradient-shift bg-300%"></div>
        
        <div className="container mx-auto px-4 py-20 relative">
          <div className="text-center max-w-4xl mx-auto animate-slide-up">
            <Badge className="mb-6 bg-primary/20 text-primary border-primary/30 hover:bg-primary/30">
              <Sparkles className="w-4 h-4 mr-2" />
              SIH 2025 Innovation
            </Badge>
            
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Democratizing Sports
              </span>
              <br />
              <span className="text-white">
                Talent Assessment
              </span>
              <br />
              <span className="bg-gradient-secondary bg-clip-text text-transparent">
                with AI
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
              Direct bridge between athletes and Sports Authority of India. 
              No scouts, no coaches, no barriers - just pure AI-powered talent recognition.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link to="/auth">
                <Button size="lg" className="bg-gradient-primary hover:glow-primary text-white px-8 py-6 text-lg">
                  Start Assessment
                  <Zap className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/about">
                <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 px-8 py-6 text-lg">
                  Learn More
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>

          {/* Floating Elements */}
          <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-primary rounded-full opacity-20 animate-float"></div>
          <div className="absolute top-40 right-20 w-12 h-12 bg-gradient-secondary rounded-full opacity-30 animate-float" style={{animationDelay: '2s'}}></div>
          <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-accent rounded-full opacity-25 animate-float" style={{animationDelay: '4s'}}></div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              <span className="bg-gradient-hero bg-clip-text text-transparent">
                Revolutionary Features
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Cutting-edge AI technology meets sports excellence
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {[
              {
                icon: Brain,
                title: "AI Fitness Scoring",
                description: "Advanced ML algorithms analyze your performance metrics and provide instant talent scores",
                gradient: "bg-gradient-primary"
              },
              {
                icon: Shield,
                title: "Cheat Detection",
                description: "Computer vision detects manipulation and ensures fair assessment for all athletes",
                gradient: "bg-gradient-secondary"
              },
              {
                icon: Activity,
                title: "Real-time Analysis",
                description: "Live pose estimation and movement tracking with instant feedback and recommendations",
                gradient: "bg-gradient-accent"
              }
            ].map((feature, index) => (
              <Card key={index} className="glass p-8 hover-lift group cursor-pointer">
                <div className={`w-16 h-16 ${feature.gradient} rounded-xl flex items-center justify-center mb-6 group-hover:animate-pulse-glow`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold mb-4 text-white">{feature.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
              </Card>
            ))}
          </div>

          {/* Stats Section */}
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { label: "Athletes Assessed", value: "10,000+", icon: Users },
              { label: "Sports Covered", value: "25+", icon: Trophy },
              { label: "AI Accuracy", value: "98.5%", icon: Target },
              { label: "Processing Speed", value: "<2s", icon: Zap }
            ].map((stat, index) => (
              <div key={index} className="text-center glass p-6 rounded-xl hover-lift">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-3xl font-bold mb-2 bg-gradient-hero bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <div className="text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 relative">
        <div className="container mx-auto px-4 text-center">
          <div className="glass p-12 rounded-2xl max-w-4xl mx-auto hover-lift">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to showcase your
              <span className="bg-gradient-hero bg-clip-text text-transparent"> talent?</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of athletes who've already discovered their potential through our AI-powered platform
            </p>
            <Link to="/auth">
              <Button size="lg" className="bg-gradient-primary hover:glow-primary text-white px-12 py-6 text-lg">
                Begin Your Journey
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 py-12">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold bg-gradient-hero bg-clip-text text-transparent">
              SportAI
            </span>
          </div>
          <p className="text-muted-foreground">
            © 2025 SportAI Platform. Empowering athletes through AI innovation.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;