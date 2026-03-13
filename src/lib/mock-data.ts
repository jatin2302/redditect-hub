export type UserRole = 'admin' | 'client';

export interface Service {
  id: string;
  name: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  minOrder: number;
  maxOrder: number;
  estimatedTime: string;
  popular?: boolean;
}

export interface Order {
  id: string;
  clientId: string;
  clientName: string;
  serviceId: string;
  serviceName: string;
  quantity: number;
  totalPrice: number;
  status: 'pending' | 'in_progress' | 'completed' | 'cancelled' | 'refunded';
  targetUrl: string;
  createdAt: string;
  updatedAt: string;
  progress: number;
}

export interface Ticket {
  id: string;
  clientId: string;
  clientName: string;
  subject: string;
  message: string;
  status: 'open' | 'replied' | 'closed';
  priority: 'low' | 'medium' | 'high';
  createdAt: string;
  replies: { sender: string; message: string; date: string }[];
}

export interface Transaction {
  id: string;
  clientId: string;
  type: 'deposit' | 'order' | 'refund';
  amount: number;
  description: string;
  date: string;
}

export const services: Service[] = [
  { id: 's1', name: 'Subreddit Members', description: 'Grow your subreddit with real, active members who engage with your content.', category: 'Growth', price: 5.00, unit: 'per 100', minOrder: 100, maxOrder: 50000, estimatedTime: '1-3 days', popular: true },
  { id: 's2', name: 'Post Upvotes', description: 'Boost your Reddit posts with high-quality upvotes for maximum visibility.', category: 'Engagement', price: 3.50, unit: 'per 100', minOrder: 50, maxOrder: 10000, estimatedTime: '1-6 hours', popular: true },
  { id: 's3', name: 'Comment Upvotes', description: 'Push your comments to the top of discussions with authentic upvotes.', category: 'Engagement', price: 4.00, unit: 'per 100', minOrder: 50, maxOrder: 5000, estimatedTime: '1-6 hours' },
  { id: 's4', name: 'Custom Post Creation', description: 'Professional Reddit posts crafted for your target subreddits.', category: 'Content', price: 15.00, unit: 'per post', minOrder: 1, maxOrder: 100, estimatedTime: '24-48 hours' },
  { id: 's5', name: 'Subreddit Moderation', description: 'Professional moderation team for your subreddit community.', category: 'Management', price: 200.00, unit: 'per month', minOrder: 1, maxOrder: 12, estimatedTime: 'Ongoing' },
  { id: 's6', name: 'Karma Boost Package', description: 'Build Reddit account credibility with organic karma growth.', category: 'Growth', price: 25.00, unit: 'per 1000 karma', minOrder: 1, maxOrder: 100, estimatedTime: '3-7 days' },
  { id: 's7', name: 'AMA Setup & Promotion', description: 'Full AMA event setup with pre-promotion and audience building.', category: 'Events', price: 150.00, unit: 'per event', minOrder: 1, maxOrder: 10, estimatedTime: '5-7 days' },
  { id: 's8', name: 'Cross-posting Campaign', description: 'Strategic cross-posting across multiple relevant subreddits.', category: 'Content', price: 8.00, unit: 'per post', minOrder: 5, maxOrder: 200, estimatedTime: '24-48 hours' },
];

export const orders: Order[] = [
  { id: 'ORD-1001', clientId: 'c1', clientName: 'John D.', serviceId: 's1', serviceName: 'Subreddit Members', quantity: 5000, totalPrice: 250.00, status: 'in_progress', targetUrl: 'r/YourSubreddit', createdAt: '2026-03-10T14:30:00Z', updatedAt: '2026-03-11T08:00:00Z', progress: 65 },
  { id: 'ORD-1002', clientId: 'c1', clientName: 'John D.', serviceId: 's2', serviceName: 'Post Upvotes', quantity: 500, totalPrice: 17.50, status: 'completed', targetUrl: 'https://reddit.com/r/tech/post123', createdAt: '2026-03-08T10:00:00Z', updatedAt: '2026-03-08T16:00:00Z', progress: 100 },
  { id: 'ORD-1003', clientId: 'c2', clientName: 'Sarah M.', serviceId: 's4', serviceName: 'Custom Post Creation', quantity: 10, totalPrice: 150.00, status: 'pending', targetUrl: 'r/marketing', createdAt: '2026-03-12T09:00:00Z', updatedAt: '2026-03-12T09:00:00Z', progress: 0 },
  { id: 'ORD-1004', clientId: 'c2', clientName: 'Sarah M.', serviceId: 's7', serviceName: 'AMA Setup & Promotion', quantity: 1, totalPrice: 150.00, status: 'in_progress', targetUrl: 'r/IAmA', createdAt: '2026-03-06T12:00:00Z', updatedAt: '2026-03-11T18:00:00Z', progress: 40 },
  { id: 'ORD-1005', clientId: 'c3', clientName: 'Alex K.', serviceId: 's6', serviceName: 'Karma Boost Package', quantity: 5, totalPrice: 125.00, status: 'completed', targetUrl: 'u/clientaccount', createdAt: '2026-03-01T08:00:00Z', updatedAt: '2026-03-07T20:00:00Z', progress: 100 },
  { id: 'ORD-1006', clientId: 'c1', clientName: 'John D.', serviceId: 's5', serviceName: 'Subreddit Moderation', quantity: 3, totalPrice: 600.00, status: 'in_progress', targetUrl: 'r/YourSubreddit', createdAt: '2026-01-01T00:00:00Z', updatedAt: '2026-03-12T00:00:00Z', progress: 75 },
];

export const tickets: Ticket[] = [
  { id: 'TK-201', clientId: 'c1', clientName: 'John D.', subject: 'Order delivery delay', message: 'My order ORD-1001 seems to be progressing slowly. Can you check?', status: 'replied', priority: 'medium', createdAt: '2026-03-11T10:00:00Z', replies: [{ sender: 'Support', message: 'We are processing your order. The delivery speed was adjusted for safety. ETA: 24 hours.', date: '2026-03-11T12:00:00Z' }] },
  { id: 'TK-202', clientId: 'c2', clientName: 'Sarah M.', subject: 'Refund request', message: 'I would like to cancel and get a refund for order ORD-1003.', status: 'open', priority: 'high', createdAt: '2026-03-12T14:00:00Z', replies: [] },
  { id: 'TK-203', clientId: 'c3', clientName: 'Alex K.', subject: 'Custom package inquiry', message: 'Do you offer custom packages for large-scale campaigns?', status: 'closed', priority: 'low', createdAt: '2026-03-05T09:00:00Z', replies: [{ sender: 'Support', message: 'Yes! Please contact us for enterprise pricing.', date: '2026-03-05T11:00:00Z' }, { sender: 'Alex K.', message: 'Great, I will reach out. Thanks!', date: '2026-03-05T13:00:00Z' }] },
];

export const transactions: Transaction[] = [
  { id: 'tx1', clientId: 'c1', type: 'deposit', amount: 500.00, description: 'Account deposit', date: '2026-03-01T10:00:00Z' },
  { id: 'tx2', clientId: 'c1', type: 'order', amount: -250.00, description: 'Order ORD-1001 - Subreddit Members', date: '2026-03-10T14:30:00Z' },
  { id: 'tx3', clientId: 'c1', type: 'order', amount: -17.50, description: 'Order ORD-1002 - Post Upvotes', date: '2026-03-08T10:00:00Z' },
  { id: 'tx4', clientId: 'c1', type: 'deposit', amount: 1000.00, description: 'Account deposit', date: '2026-03-09T08:00:00Z' },
  { id: 'tx5', clientId: 'c1', type: 'order', amount: -600.00, description: 'Order ORD-1006 - Subreddit Moderation (3 months)', date: '2026-01-01T00:00:00Z' },
  { id: 'tx6', clientId: 'c1', type: 'refund', amount: 50.00, description: 'Partial refund - Order adjustment', date: '2026-02-15T14:00:00Z' },
];

export const adminStats = {
  totalRevenue: 12450.00,
  monthlyRevenue: 3280.00,
  totalOrders: 156,
  activeOrders: 23,
  totalClients: 48,
  newClients: 12,
  openTickets: 5,
};

export const clientStats = {
  balance: 682.50,
  totalSpent: 1317.50,
  activeOrders: 2,
  completedOrders: 1,
};
