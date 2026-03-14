import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';
import { User, Mail, Calendar, Shield } from 'lucide-react';

const ClientProfile = () => {
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');

  const handlePasswordChange = () => {
    if (!currentPass || !newPass || !confirmPass) {
      toast.error('Please fill all password fields');
      return;
    }
    if (newPass !== confirmPass) {
      toast.error('New passwords do not match');
      return;
    }
    if (newPass.length < 8) {
      toast.error('Password must be at least 8 characters');
      return;
    }
    toast.success('Password changed successfully!');
    setCurrentPass('');
    setNewPass('');
    setConfirmPass('');
  };

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-2xl font-bold text-foreground">My Profile</h1>
        <p className="text-sm text-muted-foreground">View your account details and manage your password.</p>
      </div>

      <div className="rounded-lg border border-border bg-card p-6 shadow-card space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <User className="h-4 w-4" /> Account Details
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-md bg-secondary/50 p-4">
            <div className="flex items-center gap-2 mb-1">
              <User className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Full Name</p>
            </div>
            <p className="text-sm font-medium text-foreground">John D.</p>
          </div>
          <div className="rounded-md bg-secondary/50 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Mail className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Email</p>
            </div>
            <p className="text-sm font-medium text-foreground">john@example.com</p>
          </div>
          <div className="rounded-md bg-secondary/50 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Calendar className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Member Since</p>
            </div>
            <p className="text-sm font-medium text-foreground">December 1, 2025</p>
          </div>
          <div className="rounded-md bg-secondary/50 p-4">
            <div className="flex items-center gap-2 mb-1">
              <Shield className="h-3.5 w-3.5 text-muted-foreground" />
              <p className="text-xs text-muted-foreground">Account Status</p>
            </div>
            <p className="text-sm font-medium text-success">Active</p>
          </div>
        </div>

        <Separator className="bg-border" />

        <div>
          <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
            <Shield className="h-4 w-4" /> Change Password
          </h2>
        </div>

        <div className="space-y-4">
          <div>
            <Label className="text-foreground">Current Password</Label>
            <Input type="password" value={currentPass} onChange={e => setCurrentPass(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label className="text-foreground">New Password</Label>
            <Input type="password" value={newPass} onChange={e => setNewPass(e.target.value)} className="mt-1" />
          </div>
          <div>
            <Label className="text-foreground">Confirm New Password</Label>
            <Input type="password" value={confirmPass} onChange={e => setConfirmPass(e.target.value)} className="mt-1" />
          </div>
          <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90" onClick={handlePasswordChange}>
            Update Password
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ClientProfile;
