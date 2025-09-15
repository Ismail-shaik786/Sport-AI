import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { User, Activity, Camera, Shield, History, Zap, Trophy, Target, Brain, CheckCircle, AlertTriangle, BarChart3 } from "lucide-react";

const AthleteDashboard = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    age: "",
    gender: "",
    sport: "",
    state: "",
    contact: ""
  });

  const [fitnessMetrics, setFitnessMetrics] = useState({
    sprintTime: "",
    jumpHeight: "", 
    endurance: "",
    agility: "",
    reflex: ""
  });

  const [selectedExercise, setSelectedExercise] = useState<string>("");
  const [talentScore, setTalentScore] = useState<number | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadedVideo, setUploadedVideo] = useState<string | null>(null);

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }
    fetch("http://localhost:5000/api/athlete/profile", {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => setProfile(data))
    .catch(err => console.error(err));
  }, [token, navigate]);

  const calculateTalentScore = () => {
    setIsProcessing(true);
    setTimeout(() => {
      const score = Math.floor(Math.random() * 30) + 70;
      setTalentScore(score);
      setIsProcessing(false);
    }, 2000);
  };

  const updateProfile = () => {
    fetch("http://localhost:5000/api/athlete/profile", {
      method: "PUT",
      headers: { 
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(profile)
    })
    .then(res => res.json())
    .then(() => alert("Profile updated successfully"))
    .catch(err => console.error(err));
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const mockAssessments = [
    { date: "2025-01-08", sport: "Athletics", score: 87, status: "completed" },
    { date: "2025-01-05", sport: "Athletics", score: 82, status: "completed" },
    { date: "2025-01-02", sport: "Athletics", score: 79, status: "flagged" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="glass border-b border-white/10 sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-primary rounded-lg flex items-center justify-center">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-white">Athlete Dashboard</h1>
              <p className="text-muted-foreground text-sm">Welcome back, {profile.fullName || "Athlete"}</p>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="bg-secondary/20 text-secondary border-secondary/30">
              <CheckCircle className="w-4 h-4 mr-2" />
              Verified Athlete
            </Badge>
            <Button onClick={logout} variant="outline" className="border-white/20 text-white hover:bg-white/10">
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs defaultValue="assessment" className="space-y-8">
          <TabsList className="grid grid-cols-5 w-full bg-muted/20">
            <TabsTrigger value="assessment" className="flex items-center space-x-2"><Activity className="w-4 h-4"/><span>Assessment</span></TabsTrigger>
            <TabsTrigger value="camera" className="flex items-center space-x-2"><Camera className="w-4 h-4"/><span>Camera Test</span></TabsTrigger>
            <TabsTrigger value="cheat" className="flex items-center space-x-2"><Shield className="w-4 h-4"/><span>Cheat Detection</span></TabsTrigger>
            <TabsTrigger value="history" className="flex items-center space-x-2"><History className="w-4 h-4"/><span>History</span></TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2"><User className="w-4 h-4"/><span>Profile</span></TabsTrigger>
          </TabsList>

          <TabsContent value="assessment" className="space-y-8">
            <div className="grid md:grid-cols-2 gap-8">
              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white"><Activity className="w-5 h-5"/><span>Fitness Assessment</span></CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Sprint Time (100m)</Label>
                      <Input placeholder="12.5 seconds" value={fitnessMetrics.sprintTime} onChange={e => setFitnessMetrics({...fitnessMetrics, sprintTime: e.target.value})} className="bg-muted/20 border-white/20 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Jump Height</Label>
                      <Input placeholder="60 cm" value={fitnessMetrics.jumpHeight} onChange={e => setFitnessMetrics({...fitnessMetrics, jumpHeight: e.target.value})} className="bg-muted/20 border-white/20 text-white" />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label className="text-white">Endurance (mins)</Label>
                      <Input placeholder="15 minutes" value={fitnessMetrics.endurance} onChange={e => setFitnessMetrics({...fitnessMetrics, endurance: e.target.value})} className="bg-muted/20 border-white/20 text-white" />
                    </div>
                    <div className="space-y-2">
                      <Label className="text-white">Agility Score</Label>
                      <Input placeholder="8.5/10" value={fitnessMetrics.agility} onChange={e => setFitnessMetrics({...fitnessMetrics, agility: e.target.value})} className="bg-muted/20 border-white/20 text-white" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-white">Reflex Time (ms)</Label>
                    <Input placeholder="250ms" value={fitnessMetrics.reflex} onChange={e => setFitnessMetrics({...fitnessMetrics, reflex: e.target.value})} className="bg-muted/20 border-white/20 text-white" />
                  </div>
                  <Button onClick={calculateTalentScore} disabled={isProcessing} className="w-full bg-gradient-primary hover:glow-primary text-white py-6">
                    {isProcessing ? (
                      <>
                        <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        AI Processing...
                      </>
                    ) : (
                      <>
                        <Brain className="w-4 h-4 mr-2" /> Calculate Talent Score
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>

              <Card className="glass border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-white"><Target className="w-5 h-5"/><span>AI Analysis Results</span></CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {talentScore ? (
                    <div className="text-center">
                      <div className="text-6xl font-bold bg-gradient-hero bg-clip-text text-transparent mb-2">{talentScore}</div>
                      <div className="text-muted-foreground">Talent Score</div>
                      <Progress value={talentScore} className="mt-4 h-3" />
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Brain className="w-16 h-16 text-muted-foreground mx-auto mb-4"/>
                      <p className="text-muted-foreground">Enter your fitness metrics and run AI analysis to get your talent score</p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="camera" className="space-y-8">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white"><Camera className="w-5 h-5"/><span>Video Recording</span></CardTitle>
              </CardHeader>
              <CardContent className="text-center py-12">
                <div className="mb-6">
                  <Label className="text-white mb-2">Choose Exercise</Label>
                 <Select onValueChange={value => setSelectedExercise(value)} value={selectedExercise}>
  <SelectTrigger className="bg-muted/20 border-white/20 text-white">
    <SelectValue placeholder="Select your choice" />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="pushup">Push-up</SelectItem>
<SelectItem value="running">Running</SelectItem>
<SelectItem value="long-jump">Long Jump</SelectItem>
<SelectItem value="situps">Sit-ups</SelectItem>
<SelectItem value="pullups">Pull-ups</SelectItem>

  </SelectContent>
</Select>

                </div>
                <CameraRecorder selectedExercise={selectedExercise} />
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="cheat" className="space-y-8">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white"><Shield className="w-5 h-5"/><span>Cheat Detection System</span></CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center p-8 border-2 border-dashed border-muted/30 rounded-lg">
                  <Shield className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-lg text-white mb-2">Upload Assessment Video</p>
                  <p className="text-muted-foreground mb-6">
                    AI will analyze the video for any manipulation or incorrect movements
                  </p>

                  <input
                    type="file"
                    accept="video/*"
                    id="videoUpload"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setUploadedVideo(url);
                      }
                    }}
                  />
                  <label htmlFor="videoUpload">
                    <Button asChild className="bg-gradient-accent hover:glow-accent text-white cursor-pointer">
                      <span className="flex items-center">
                        <Zap className="w-4 h-4 mr-2" />
                        Upload Video
                      </span>
                    </Button>
                  </label>
                </div>

                {uploadedVideo && (
                  <div className="mt-6 text-center">
                    <h4 className="text-white mb-2">Uploaded Video Preview</h4>
                    <video src={uploadedVideo} controls className="w-96 h-64 rounded-lg border border-white/20 mx-auto" />
                  </div>
                )}

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="p-4 bg-secondary/10 rounded-lg border border-secondary/20">
                    <h4 className="font-semibold text-secondary mb-2 flex items-center">
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Detection Features
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Movement authenticity verification</li>
                      <li>• Speed manipulation detection</li>
                      <li>• Environmental tampering analysis</li>
                      <li>• Real-time confidence scoring</li>
                    </ul>
                  </div>

                  <div className="p-4 bg-accent/10 rounded-lg border border-accent/20">
                    <h4 className="font-semibold text-accent mb-2 flex items-center">
                      <AlertTriangle className="w-4 h-4 mr-2" />
                      Fair Play Guidelines
                    </h4>
                    <ul className="space-y-1 text-sm text-muted-foreground">
                      <li>• Use natural lighting conditions</li>
                      <li>• Ensure clear camera visibility</li>
                      <li>• No video editing or filters</li>
                      <li>• Single continuous recording</li>
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history" className="space-y-8">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white"><History className="w-5 h-5" /><span>Assessment History</span></CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockAssessments.map((assessment, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-muted/10 rounded-lg hover-lift">
                      <div className="flex items-center space-x-4">
                        <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                          <BarChart3 className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-semibold text-white">{assessment.sport} Assessment</p>
                          <p className="text-sm text-muted-foreground">{assessment.date}</p>
                        </div>
                      </div>

                      <div className="flex items-center space-x-4">
                        <div className="text-right">
                          <div className="text-2xl font-bold bg-gradient-hero bg-clip-text text-transparent">{assessment.score}</div>
                          <div className="text-xs text-muted-foreground">Talent Score</div>
                        </div>

                        <Badge className={assessment.status === "completed" ? "bg-secondary/20 text-secondary border-secondary/30" : "bg-destructive/20 text-destructive border-destructive/30"}>
                          {assessment.status === "completed" ? <CheckCircle className="w-3 h-3 mr-1" /> : <AlertTriangle className="w-3 h-3 mr-1" />}
                          {assessment.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-8">
            <Card className="glass border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 text-white"><User className="w-5 h-5"/><span>Athlete Profile</span></CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="space-y-2"><Label className="text-white">Full Name</Label><Input value={profile.fullName} onChange={e => setProfile({...profile, fullName: e.target.value})} className="bg-muted/20 border-white/20 text-white" /></div>
                    <div className="space-y-2"><Label className="text-white">Email</Label><Input value={profile.email} onChange={e => setProfile({...profile, email: e.target.value})} className="bg-muted/20 border-white/20 text-white" /></div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2"><Label className="text-white">Age</Label><Input value={profile.age} onChange={e => setProfile({...profile, age: e.target.value})} className="bg-muted/20 border-white/20 text-white" /></div>
                      <div className="space-y-2"><Label className="text-white">Gender</Label><Input value={profile.gender} onChange={e => setProfile({...profile, gender: e.target.value})} className="bg-muted/20 border-white/20 text-white" /></div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-2"><Label className="text-white">Primary Sport</Label><Input value={profile.sport} onChange={e => setProfile({...profile, sport: e.target.value})} className="bg-muted/20 border-white/20 text-white" /></div>
                    <div className="space-y-2"><Label className="text-white">State/Region</Label><Input value={profile.state} onChange={e => setProfile({...profile, state: e.target.value})} className="bg-muted/20 border-white/20 text-white" /></div>
                    <div className="space-y-2"><Label className="text-white">Contact Number</Label><Input value={profile.contact} onChange={e => setProfile({...profile, contact: e.target.value})} className="bg-muted/20 border-white/20 text-white" /></div>
                  </div>
                </div>
                <Button onClick={updateProfile} className="bg-gradient-primary hover:glow-primary text-white"><CheckCircle className="w-4 h-4 mr-2"/> Update Profile</Button>
              </CardContent>
            </Card>
          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

function CameraRecorder({ selectedExercise }: { selectedExercise: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [mediaRecorder, setMediaRecorder] = useState<MediaRecorder | null>(null);
  const [recordedVideo, setRecordedVideo] = useState<string | null>(null);
  const [processedVideo, setProcessedVideo] = useState<string | null>(null); // ✅ NEW
  const [isRecording, setIsRecording] = useState(false);
  const [cameraOn, setCameraOn] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) videoRef.current.srcObject = stream;
      setCameraOn(true);
    } catch (err) {
      console.error("Camera access denied:", err);
      alert("Unable to access camera. Please check permissions.");
    }
  };

  const startRecording = () => {
    if (!videoRef.current?.srcObject) return;
    const stream = videoRef.current.srcObject as MediaStream;
    const recorder = new MediaRecorder(stream);
    const chunks: BlobPart[] = [];

    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    recorder.onstop = () => {
      const blob = new Blob(chunks, { type: "video/webm" });
      const url = URL.createObjectURL(blob);
      setRecordedVideo(url);
      sendVideoForAnalysis(blob); // send recorded video to backend
    };

    recorder.start();
    setMediaRecorder(recorder);
    setIsRecording(true);
  };

  const stopRecording = () => {
    mediaRecorder?.stop();
    setIsRecording(false);
  };

  const sendVideoForAnalysis = (videoBlob: Blob | File) => {
    if (!selectedExercise) {
      alert("Please select an exercise first!");
      return;
    }

    setIsProcessing(true);
    setAnalysisResult(null);
    setProcessedVideo(null);

    const formData = new FormData();
    formData.append("video", videoBlob);
    formData.append("exercise", selectedExercise);

    fetch("http://localhost:5000/api/detect", {
      method: "POST",
      body: formData,
    })
      .then(async (res) => {
        const data = await res.json();
        if (!res.ok) throw new Error(data.message || "ML processing failed");

        setAnalysisResult(data.message || "Analysis complete");

        // ✅ Use processed video URL from backend
        if (data.videoUrl) {
          setProcessedVideo(data.videoUrl);
        }
      })
      .catch((err) => {
        console.error(err);
        setAnalysisResult(err.message || "Failed to analyze video");
      })
      .finally(() => setIsProcessing(false));
  };

  const handleUploadVideo = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setRecordedVideo(URL.createObjectURL(file));
    sendVideoForAnalysis(file);
  };

  return (
    <div>
      <video
        ref={videoRef}
        autoPlay
        playsInline
        muted
        className="w-[480px] h-[360px] rounded-lg border border-white/20 mx-auto mb-6"
      />

      <div className="flex justify-center space-x-4 mb-6">
        {!cameraOn ? (
          <Button onClick={startCamera} className="bg-gradient-secondary text-white">
            📷 Open Camera
          </Button>
        ) : !isRecording ? (
          <Button onClick={startRecording} disabled={isProcessing} className="bg-gradient-accent text-white">
            🎥 Start Recording
          </Button>
        ) : (
          <Button onClick={stopRecording} className="bg-gradient-destructive text-white">
            ⏹ Stop Recording
          </Button>
        )}
      </div>

      <div className="text-center mb-6">
        <input
          type="file"
          accept="video/*"
          id="uploadVideoInput"
          className="hidden"
          onChange={handleUploadVideo}
        />
        <label htmlFor="uploadVideoInput">
          <Button asChild disabled={isProcessing} className="bg-gradient-primary text-white cursor-pointer">
            <span>⬆️ Upload Video</span>
          </Button>
        </label>
      </div>

      {(processedVideo || recordedVideo) && (
        <div className="text-center mb-4">
          <h3 className="text-white mb-2">Analyzed Video Output</h3>
          <video
            src={processedVideo || recordedVideo} // ✅ show processed first
            controls
            className="w-[480px] h-[360px] rounded-lg border border-white/20 mx-auto"
          />
        </div>
      )}

      {isProcessing && <p className="text-white text-center">Analyzing video...</p>}
      {analysisResult && !isProcessing && (
        <div className="mt-4 text-center text-white">
          <h4>ML Analysis Result</h4>
          <p>{analysisResult}</p>
        </div>
      )}
    </div>
  );
}




export default AthleteDashboard;
