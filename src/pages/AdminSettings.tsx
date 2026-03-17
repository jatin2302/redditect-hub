import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { CreditCard, Bitcoin, Globe, Settings2 } from 'lucide-react';

const paymentMethods = [
  { id: 'stripe', name: 'Stripe (Credit/Debit Cards)', icon: '💳', category: 'traditional' },
  { id: 'paypal', name: 'PayPal', icon: '🅿️', category: 'traditional' },
  { id: 'wise', name: 'Wise (TransferWise)', icon: '🌐', category: 'traditional' },
  { id: 'skrill', name: 'Skrill', icon: '💰', category: 'traditional' },
  { id: 'perfectmoney', name: 'Perfect Money', icon: '💵', category: 'traditional' },
];

const cryptoMethods = [
  { id: 'btc', name: 'Bitcoin (BTC)', icon: '₿', symbol: 'BTC' },
  { id: 'eth', name: 'Ethereum (ETH)', icon: 'Ξ', symbol: 'ETH' },
  { id: 'usdt', name: 'Tether (USDT)', icon: '₮', symbol: 'USDT' },
  { id: 'ltc', name: 'Litecoin (LTC)', icon: 'Ł', symbol: 'LTC' },
  { id: 'sol', name: 'Solana (SOL)', icon: '◎', symbol: 'SOL' },
];

const AdminSettings = () => {
  const [enabledPayments, setEnabledPayments] = useState<Record<string, boolean>>({
    stripe: true, paypal: true, wise: false, skrill: false, perfectmoney: false,
    btc: true, eth: true, usdt: true, ltc: false, sol: false,
  });

  const [settings, setSettings] = useState({
    panelName: 'RedditBoost',
    supportEmail: 'support@redditboost.com',
    currency: 'USD',
    minDeposit: '10',
    maxDeposit: '5000',
    siteTitle: 'RedditBoost — #1 Reddit Marketing Services',
    metaDesc: 'Grow your Reddit presence with premium marketing services.',
    metaKeywords: 'reddit marketing, subreddit growth, reddit upvotes',
    canonicalUrl: 'https://redditboost.com',
    ogImage: 'https://redditboost.com/og-image.png',
    gaId: '',
    gsc: ''
  });

  const togglePayment = (id: string) => {
    setEnabledPayments(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const handleSettingChange = (key: keyof typeof settings, value: string) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <h1 className="text-2xl font-bold text-foreground">Settings</h1>

      <Tabs defaultValue="general" className="space-y-6">
        <TabsList className="bg-secondary">
          <TabsTrigger value="general" className="gap-2"><Settings2 className="h-3.5 w-3.5" /> General</TabsTrigger>
          <TabsTrigger value="payments" className="gap-2"><CreditCard className="h-3.5 w-3.5" /> Payments</TabsTrigger>
          <TabsTrigger value="seo" className="gap-2"><Globe className="h-3.5 w-3.5" /> SEO</TabsTrigger>
        </TabsList>

        {/* General Tab */}
        <TabsContent value="general">
          <div className="rounded-lg border border-border bg-card p-6 shadow-card space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground">General</h2>
              <p className="text-sm text-muted-foreground">Configure your panel settings.</p>
            </div>
            <div className="space-y-4">
              <div><Label className="text-foreground">Panel Name</Label><Input value={settings.panelName} onChange={(e) => handleSettingChange('panelName', e.target.value)} className="mt-1" /></div>
              <div><Label className="text-foreground">Support Email</Label><Input value={settings.supportEmail} onChange={(e) => handleSettingChange('supportEmail', e.target.value)} className="mt-1" /></div>
              <div><Label className="text-foreground">Currency</Label><Input value={settings.currency} onChange={(e) => handleSettingChange('currency', e.target.value)} className="mt-1" /></div>
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
              <h2 className="text-lg font-semibold text-foreground">Deposit Limits</h2>
            </div>
            <div className="space-y-4">
              <div><Label className="text-foreground">Minimum Deposit</Label><Input value={settings.minDeposit} onChange={(e) => handleSettingChange('minDeposit', e.target.value)} type="number" className="mt-1" /></div>
              <div><Label className="text-foreground">Maximum Deposit</Label><Input value={settings.maxDeposit} onChange={(e) => handleSettingChange('maxDeposit', e.target.value)} type="number" className="mt-1" /></div>
            </div>

            <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90" onClick={() => toast.success('Settings saved!')}>
              Save Changes
            </Button>
          </div>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments">
          <div className="rounded-lg border border-border bg-card p-6 shadow-card space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <CreditCard className="h-5 w-5" /> Payment Methods
              </h2>
              <p className="text-sm text-muted-foreground">Enable or disable payment methods for your clients.</p>
            </div>

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3">Traditional Methods</h3>
              <div className="space-y-3">
                {paymentMethods.map(m => (
                  <div key={m.id} className="flex items-center justify-between rounded-md bg-secondary/50 p-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xl">{m.icon}</span>
                      <span className="text-sm font-medium text-foreground">{m.name}</span>
                    </div>
                    <Switch checked={enabledPayments[m.id]} onCheckedChange={() => togglePayment(m.id)} />
                  </div>
                ))}
              </div>
            </div>

            <Separator className="bg-border" />

            <div>
              <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-3 flex items-center gap-2">
                <Bitcoin className="h-4 w-4" /> Cryptocurrency
              </h3>
              <div className="space-y-3">
                {cryptoMethods.map(m => (
                  <div key={m.id} className="flex items-center justify-between rounded-md bg-secondary/50 p-3">
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-primary">{m.icon}</span>
                      <div>
                        <span className="text-sm font-medium text-foreground">{m.name}</span>
                      </div>
                    </div>
                    <Switch checked={enabledPayments[m.id]} onCheckedChange={() => togglePayment(m.id)} />
                  </div>
                ))}
              </div>
            </div>

            <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90" onClick={() => toast.success('Payment settings saved!')}>
              Save Payment Settings
            </Button>
          </div>
        </TabsContent>

        {/* SEO Tab */}
        <TabsContent value="seo">
          <div className="rounded-lg border border-border bg-card p-6 shadow-card space-y-6">
            <div>
              <h2 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <Globe className="h-5 w-5" /> SEO Settings
              </h2>
              <p className="text-sm text-muted-foreground">Optimize your panel for search engines.</p>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="text-foreground">Site Title</Label>
                <Input value={settings.siteTitle} onChange={(e) => handleSettingChange('siteTitle', e.target.value)} className="mt-1" />
                <p className="text-xs text-muted-foreground mt-1">Recommended: under 60 characters</p>
              </div>
              <div>
                <Label className="text-foreground">Meta Description</Label>
                <Input value={settings.metaDesc} onChange={(e) => handleSettingChange('metaDesc', e.target.value)} className="mt-1" />
                <p className="text-xs text-muted-foreground mt-1">Recommended: under 160 characters</p>
              </div>
              <div>
                <Label className="text-foreground">Meta Keywords</Label>
                <Input value={settings.metaKeywords} onChange={(e) => handleSettingChange('metaKeywords', e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label className="text-foreground">Canonical URL</Label>
                <Input value={settings.canonicalUrl} onChange={(e) => handleSettingChange('canonicalUrl', e.target.value)} className="mt-1" />
              </div>
              <div>
                <Label className="text-foreground">OG Image URL</Label>
                <Input value={settings.ogImage} onChange={(e) => handleSettingChange('ogImage', e.target.value)} className="mt-1" />
              </div>

              <Separator className="bg-border" />

              <div>
                <h3 className="text-sm font-semibold text-foreground mb-3">Robots & Indexing</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Label className="text-foreground">Allow search engine indexing</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-foreground">Generate sitemap.xml</Label>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <Label className="text-foreground">Enable Open Graph tags</Label>
                    <Switch defaultChecked />
                  </div>
                </div>
              </div>

              <Separator className="bg-border" />

              <div>
                <Label className="text-foreground">Google Analytics Tracking ID</Label>
                <Input value={settings.gaId} onChange={(e) => handleSettingChange('gaId', e.target.value)} placeholder="G-XXXXXXXXXX" className="mt-1" />
              </div>
              <div>
                <Label className="text-foreground">Google Search Console Verification</Label>
                <Input value={settings.gsc} onChange={(e) => handleSettingChange('gsc', e.target.value)} placeholder="Verification meta tag content" className="mt-1" />
              </div>
            </div>

            <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90" onClick={() => toast.success('SEO settings saved!')}>
              Save SEO Settings
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
