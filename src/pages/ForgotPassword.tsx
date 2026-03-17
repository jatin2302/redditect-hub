import { useState } from "react";
import { Link } from "react-router-dom";
import { Zap, Mail, ArrowLeft, Loader2, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleReset = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    setIsLoading(true);
    
    // Mock reset delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
      toast.success("Password reset instructions sent!");
    }, 1500);
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2 bg-background">
      {/* Decorative Left Panel */}
      <div className="hidden lg:flex flex-col justify-between p-12 bg-muted relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-primary/5 to-background z-0" />
        <div className="absolute top-[20%] right-[10%] w-[60%] h-[60%] rounded-full bg-primary/10 blur-[100px]" />
        
        <div className="relative z-10 flex items-center gap-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary shadow-glow">
            <Zap className="h-7 w-7 text-white fill-current" />
          </div>
          <span className="text-2xl font-black tracking-tight">RedditBoost</span>
        </div>

        <div className="relative z-10 max-w-lg mb-20">
          <div className="p-8 rounded-3xl bg-background/50 border border-border/50 backdrop-blur-sm relative">
            <div className="absolute -top-6 -left-6 text-primary opacity-20">
              <Lock size={80} strokeWidth={1} />
            </div>
            <h3 className="text-2xl font-bold mb-4">Secure your account</h3>
            <p className="text-muted-foreground leading-relaxed">
              We take security seriously. If you've lost access to your account, we'll help you get back in safely and quickly so you can continue growing your Reddit presence without interruption.
            </p>
          </div>
        </div>

        <div className="relative z-10 text-sm font-medium text-muted-foreground">
          © {new Date().getFullYear()} RedditBoost. All rights reserved.
        </div>
      </div>

      {/* Reset Form Panel */}
      <div className="flex items-center justify-center p-8 lg:p-12 relative overflow-hidden">
        {/* Mobile Logo */}
        <div className="absolute top-8 left-8 flex items-center gap-3 lg:hidden">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary shadow-glow">
            <Zap className="h-6 w-6 text-white fill-current" />
          </div>
          <span className="text-xl font-black tracking-tight">RedditBoost</span>
        </div>

        <div className="w-full max-w-[400px] space-y-8 relative z-10">
          <Button variant="ghost" className="mb-8 w-fit -ml-4 px-4 text-muted-foreground hover:text-foreground" asChild>
            <Link to="/login">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to login
            </Link>
          </Button>

          {isSent ? (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-primary mb-6 ring-8 ring-primary/5 mx-auto">
                <Mail className="h-10 w-10" />
              </div>
              <div className="text-center space-y-2">
                <h2 className="text-3xl font-black tracking-tight">Check your email</h2>
                <p className="text-muted-foreground">
                  We've sent password reset instructions to <span className="font-bold text-foreground">{email}</span>
                </p>
              </div>
              <Button 
                className="w-full h-12 rounded-xl text-md font-bold mt-8" 
                variant="outline"
                onClick={() => setIsSent(false)}
              >
                Try a different email
              </Button>
            </div>
          ) : (
            <>
              <div className="space-y-2 text-center lg:text-left">
                <h2 className="text-3xl font-black tracking-tight">Forgot password?</h2>
                <p className="text-muted-foreground">No worries, we'll send you reset instructions.</p>
              </div>

              <form onSubmit={handleReset} className="space-y-6">
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
                </div>

                <Button 
                  type="submit" 
                  className="w-full h-12 rounded-xl text-md font-bold shadow-glow" 
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending instructions...
                    </>
                  ) : (
                    "Reset Password"
                  )}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
// Using lucide-react Lock in the left panel which wasn't imported initially, let's make sure to add it.
