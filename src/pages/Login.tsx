import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, Mail, Lock, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setRole } = useAuth();
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("Please enter email and password");
      return;
    }

    setIsLoading(true);
    
    // Mock login delay
    setTimeout(() => {
      setIsLoading(false);
      
      // Basic mock routing for demo purposes based on email
      if (email.includes("admin")) {
        setRole("admin");
        navigate("/admin/dashboard");
      } else {
        setRole("client");
        navigate("/");
      }
      
      toast.success("Welcome back to RedditBoost!");
    }, 1000);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Decorative Left Panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background z-0" />
        <div className="absolute -top-[20%] -left-[10%] w-[70%] h-[70%] rounded-full bg-primary/10 blur-[100px]" />
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-glow">
            <Zap className="h-7 w-7 text-white fill-current" />
          </div>
          <span className="text-2xl font-black tracking-tight">RedditBoost</span>
        </div>

        <div className="relative z-10 max-w-lg mb-20">
          <h1 className="text-4xl font-black mb-6 leading-tight">
            Supercharge your Reddit presence <span className="text-primary">intelligently.</span>
          </h1>
          <p className="text-muted-foreground text-lg">
            Login to access your dashboard, track campaigns, and manage your marketing operations inside the #1 Reddit growth platform.
          </p>
        </div>

        <div className="relative z-10 text-sm font-medium text-muted-foreground">
          © {new Date().getFullYear()} RedditBoost. All rights reserved.
        </div>
      </div>

      {/* Login Form Panel */}
      <div className="flex items-center justify-center p-8 lg:p-12 relative overflow-hidden">
        {/* Mobile Logo */}
        <div className="absolute top-8 left-8 flex items-center gap-3 lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-glow">
            <Zap className="h-6 w-6 text-white fill-current" />
          </div>
          <span className="text-xl font-black tracking-tight">RedditBoost</span>
        </div>

        <div className="w-full max-w-[400px] space-y-8 relative z-10">
          <div className="space-y-2 text-center lg:text-left">
            <h2 className="text-3xl font-black tracking-tight">Welcome back</h2>
            <p className="text-muted-foreground">Enter your credentials to access your account</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email address</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="name@company.com" 
                    className="pl-10 h-12 rounded-xl bg-secondary/50 border-border/50 focus:bg-background"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password">Password</Label>
                  <Link to="/forgot-password" className="text-sm font-semibold text-primary hover:text-primary/80 transition-colors">
                    Forgot password?
                  </Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="••••••••" 
                    className="pl-10 h-12 rounded-xl bg-secondary/50 border-border/50 focus:bg-background"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl text-md font-bold shadow-glow" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in to Dashboard"
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link to="/register" className="font-bold text-primary hover:text-primary/80 transition-colors">
                Create one now
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
