import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Zap, Mail, Lock, User, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { setRole } = useAuth();
  const navigate = useNavigate();

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !password) {
      toast.error("Please fill in all fields");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    
    // Mock register delay
    setTimeout(() => {
      setIsLoading(false);
      setRole("client"); // Default new users to client
      toast.success("Account created successfully!");
      navigate("/");
    }, 1500);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Decorative Left Panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-tr from-primary/10 via-primary/5 to-background z-0" />
        <div className="absolute -bottom-[20%] -right-[10%] w-[80%] h-[80%] rounded-full bg-primary/10 blur-[120px]" />
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-glow">
            <Zap className="h-7 w-7 text-white fill-current" />
          </div>
          <span className="text-2xl font-black tracking-tight">RedditBoost</span>
        </div>

        <div className="relative z-10 max-w-lg mb-20">
          <div className="flex flex-col gap-6">
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-background/50 border border-border/50 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary font-bold">1</div>
              <div>
                <h3 className="font-bold text-foreground">Sign Up Free</h3>
                <p className="text-sm text-muted-foreground mt-1">Create your account in seconds with zero commitment.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-background/50 border border-border/50 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary font-bold">2</div>
              <div>
                <h3 className="font-bold text-foreground">Fund Your Wallet</h3>
                <p className="text-sm text-muted-foreground mt-1">Add funds using Crypto or traditional payment methods.</p>
              </div>
            </div>
            <div className="flex items-start gap-4 p-6 rounded-2xl bg-background/50 border border-border/50 backdrop-blur-sm">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/20 text-primary font-bold">3</div>
              <div>
                <h3 className="font-bold text-foreground">Dominate Reddit</h3>
                <p className="text-sm text-muted-foreground mt-1">Place orders and watch your Reddit presence grow.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 text-sm font-medium text-muted-foreground">
          © {new Date().getFullYear()} RedditBoost. All rights reserved.
        </div>
      </div>

      {/* Register Form Panel */}
      <div className="flex items-center justify-center p-8 lg:p-12 relative overflow-hidden">
        {/* Mobile Logo */}
        <div className="absolute top-8 left-8 flex items-center gap-3 lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-glow">
            <Zap className="h-6 w-6 text-white fill-current" />
          </div>
          <span className="text-xl font-black tracking-tight">RedditBoost</span>
        </div>

        <div className="w-full max-w-[400px] space-y-8 relative z-10">
          <div className="space-y-2 text-center lg:text-left mt-10 lg:mt-0">
            <h2 className="text-3xl font-black tracking-tight">Create an account</h2>
            <p className="text-muted-foreground">Get started with RedditBoost today</p>
          </div>

          <form onSubmit={handleRegister} className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <User className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input 
                    id="name" 
                    type="text" 
                    placeholder="John Doe" 
                    className="pl-10 h-12 rounded-xl bg-secondary/50 border-border/50 focus:bg-background"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
              </div>

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
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input 
                    id="password" 
                    type="password" 
                    placeholder="Create a strong password" 
                    className="pl-10 h-12 rounded-xl bg-secondary/50 border-border/50 focus:bg-background"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <p className="text-xs text-muted-foreground mt-2">Must be at least 8 characters long</p>
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full h-12 rounded-xl text-md font-bold shadow-[0_0_20px_hsl(var(--primary)/0.3)] transition-shadow hover:shadow-[0_0_30px_hsl(var(--primary)/0.5)]" 
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </Button>
          </form>

          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="font-bold text-primary hover:text-primary/80 transition-colors">
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
