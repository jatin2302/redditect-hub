import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { toast } from 'sonner';

const AdminSettings = () => {
  return (
    <div className="space-y-6 max-w-2xl">
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>

      <div className="rounded-lg border border-border bg-card p-6 shadow-card space-y-6">
        <div>
          <h2 className="text-lg font-semibold text-foreground">General</h2>
          <p className="text-sm text-muted-foreground">Configure your panel settings.</p>
        </div>
        <div className="space-y-4">
          <div><Label className="text-foreground">Panel Name</Label><Input defaultValue="RedditBoost" className="mt-1" /></div>
          <div><Label className="text-foreground">Support Email</Label><Input defaultValue="support@redditboost.com" className="mt-1" /></div>
          <div><Label className="text-foreground">Currency</Label><Input defaultValue="USD" className="mt-1" /></div>
        </div>

        <Separator className="bg-border" />

        <div>
          <h2 className="text-lg font-semibold text-foreground">Notifications</h2>
        </div>
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <Label className="text-foreground">Email notifications for new orders</Label>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-foreground">Email notifications for new tickets</Label>
            <Switch defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label className="text-foreground">Auto-assign orders</Label>
            <Switch />
          </div>
        </div>

        <Separator className="bg-border" />

        <div>
          <h2 className="text-lg font-semibold text-foreground">Payment</h2>
        </div>
        <div className="space-y-4">
          <div><Label className="text-foreground">Minimum Deposit</Label><Input defaultValue="10" type="number" className="mt-1" /></div>
          <div><Label className="text-foreground">Maximum Deposit</Label><Input defaultValue="5000" type="number" className="mt-1" /></div>
        </div>

        <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90" onClick={() => toast.success('Settings saved!')}>
          Save Changes
        </Button>
      </div>
    </div>
  );
};

export default AdminSettings;
