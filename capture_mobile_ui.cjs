const { chromium, devices } = require('playwright');
const fs = require('fs');
const path = require('path');

const screenshotDir = '/Users/jatinbhutani/.gemini/antigravity/brain/85b6bcbc-6e97-4777-9f3a-1da3922f9200/mobile_screenshots';
if (!fs.existsSync(screenshotDir)) {
  fs.mkdirSync(screenshotDir, { recursive: true });
}

const routes = [
  { name: 'login', path: '/login' },
  { name: 'register', path: '/register' },
  { name: 'dashboard', path: '/' },
  { name: 'services', path: '/services' },
  { name: 'new_order', path: '/new-order' },
  { name: 'orders', path: '/orders' },
  { name: 'wallet', path: '/wallet' },
  { name: 'admin_dashboard', path: '/admin/dashboard' },
  { name: 'admin_orders', path: '/admin/orders' },
  { name: 'admin_clients', path: '/admin/clients' }
];

const mobile = devices['iPhone 12'];

(async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({
    ...mobile,
  });
  const page = await context.newPage();

  for (const route of routes) {
    try {
      console.log(`Navigating to ${route.name}...`);
      await page.goto(`http://localhost:8081${route.path}`, { waitUntil: 'networkidle', timeout: 10000 });
      await page.waitForTimeout(1000); // Wait for animations
      await page.screenshot({ path: path.join(screenshotDir, `${route.name}.png`), fullPage: true });
      console.log(`Saved screenshot for ${route.name}`);
    } catch (e) {
      console.error(`Error capturing ${route.name}:`, e.message);
    }
  }

  await browser.close();
})();
