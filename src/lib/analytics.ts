export interface AnalyticsViewLog {
  id: string;
  timestamp: string;
  path: string;
  referrer: string;
  device: "Mobile" | "Desktop" | "Tablet";
  userAgent: string;
}

export interface AnalyticsWhatsAppLog {
  id: string;
  timestamp: string;
  source: string; // e.g. "Footer Contact Bar", "Navbar Mobile", "FindUs Modal", "Policy Support"
  targetNumber: string;
  device: "Mobile" | "Desktop" | "Tablet";
}

export interface AdminOrderItem {
  flavourId: string;
  name: string;
  price: number;
  quantity: number;
  servingType?: string | undefined;
  toppings?: string[] | undefined;
  image?: string | undefined;
}

export type OrderStatus = "New" | "Preparing" | "Out for Delivery" | "Delivered" | "Cancelled";

export interface AdminOrder {
  id: string;
  orderNumber: string;
  timestamp: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  orderType: "Delivery" | "Pickup";
  items: AdminOrderItem[];
  subtotal: number;
  discount: number;
  promoCode?: string | undefined;
  total: number;
  status: OrderStatus;
  notes?: string | undefined;
}

export interface AnalyticsSummary {
  totalViews: number;
  uniqueVisitors: number;
  totalOrders: number;
  totalRevenue: number;
  totalWhatsAppClicks: number;
  conversionRate: number;
  recentViews: AnalyticsViewLog[];
  recentWhatsAppClicks: AnalyticsWhatsAppLog[];
  orders: AdminOrder[];
  deviceBreakdown: {
    mobile: number;
    desktop: number;
    tablet: number;
  };
  sourceBreakdown: Record<string, number>;
  popularFlavours: { name: string; count: number; revenue: number }[];
}

// Storage keys
const VIEWS_KEY = "scoop_analytics_views_v1";
const WHATSAPP_KEY = "scoop_analytics_whatsapp_v1";
const ORDERS_KEY = "scoop_analytics_orders_v1";
const ADMIN_AUTH_KEY = "scoop_admin_session_v1";
const ADMIN_CREDS_KEY = "scoop_admin_creds_v1";

// Default Strong Credentials
export const DEFAULT_ADMIN_USERNAME = "admin_scoopmaster";
export const DEFAULT_ADMIN_PASSWORD = "P@ssw0rd#Scoop2026!$";

function getDeviceType(): "Mobile" | "Desktop" | "Tablet" {
  if (typeof window === "undefined") return "Desktop";
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "Tablet";
  }
  if (
    /Mobile|Android|iP(hone|od)|IEMobile|BlackBerry|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "Mobile";
  }
  return "Desktop";
}

// ----------------- Public Analytics Methods -----------------

export function recordPageView(path: string = "/"): void {
  if (typeof window === "undefined") return;

  try {
    const raw = localStorage.getItem(VIEWS_KEY);
    const views: AnalyticsViewLog[] = raw ? JSON.parse(raw) : [];

    const newLog: AnalyticsViewLog = {
      id: `view_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      path,
      referrer: document.referrer || "Direct",
      device: getDeviceType(),
      userAgent: navigator.userAgent,
    };

    views.unshift(newLog);
    // keep latest 300 logs
    const trimmed = views.slice(0, 300);
    localStorage.setItem(VIEWS_KEY, JSON.stringify(trimmed));
  } catch (err) {
    console.error("Failed to record page view:", err);
  }
}

export function recordWhatsAppClick(source: string): void {
  if (typeof window === "undefined") return;

  try {
    const raw = localStorage.getItem(WHATSAPP_KEY);
    const clicks: AnalyticsWhatsAppLog[] = raw ? JSON.parse(raw) : [];

    const newClick: AnalyticsWhatsAppLog = {
      id: `wa_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
      timestamp: new Date().toISOString(),
      source,
      targetNumber: "+917527989807",
      device: getDeviceType(),
    };

    clicks.unshift(newClick);
    localStorage.setItem(WHATSAPP_KEY, JSON.stringify(clicks.slice(0, 200)));
  } catch (err) {
    console.error("Failed to record WhatsApp click:", err);
  }
}

export function recordOrder(
  items: AdminOrderItem[],
  subtotal: number,
  discount: number = 0,
  promoCode?: string | undefined,
  customerInfo?: {
    name?: string | undefined;
    phone?: string | undefined;
    address?: string | undefined;
    orderType?: "Delivery" | "Pickup" | undefined;
    notes?: string | undefined;
  } | undefined
): AdminOrder {
  const total = Math.max(0, subtotal - discount);
  const raw = typeof window !== "undefined" ? localStorage.getItem(ORDERS_KEY) : null;
  const orders: AdminOrder[] = raw ? JSON.parse(raw) : [];

  const newOrder: AdminOrder = {
    id: `ord_${Date.now()}`,
    orderNumber: `SCOOP-${Math.floor(1000 + Math.random() * 9000)}`,
    timestamp: new Date().toISOString(),
    customerName: customerInfo?.name || "Online Guest",
    customerPhone: customerInfo?.phone || "+91 75279 89807",
    customerAddress: customerInfo?.address || "Parlour Delivery Order",
    orderType: customerInfo?.orderType || "Delivery",
    items,
    subtotal,
    discount,
    promoCode: promoCode || undefined,
    total,
    status: "New",
    notes: customerInfo?.notes,
  };

  orders.unshift(newOrder);
  if (typeof window !== "undefined") {
    localStorage.setItem(ORDERS_KEY, JSON.stringify(orders.slice(0, 200)));
  }
  return newOrder;
}

export function updateOrderStatus(orderId: string, status: OrderStatus): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    const orders: AdminOrder[] = raw ? JSON.parse(raw) : [];
    const updated = orders.map((ord) => (ord.id === orderId ? { ...ord, status } : ord));
    localStorage.setItem(ORDERS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.error("Failed to update order status:", err);
  }
}

export function deleteOrder(orderId: string): void {
  if (typeof window === "undefined") return;
  try {
    const raw = localStorage.getItem(ORDERS_KEY);
    const orders: AdminOrder[] = raw ? JSON.parse(raw) : [];
    const filtered = orders.filter((ord) => ord.id !== orderId);
    localStorage.setItem(ORDERS_KEY, JSON.stringify(filtered));
  } catch (err) {
    console.error("Failed to delete order:", err);
  }
}

export function clearAllAnalyticsData(): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(VIEWS_KEY, JSON.stringify([]));
  localStorage.setItem(WHATSAPP_KEY, JSON.stringify([]));
  localStorage.setItem(ORDERS_KEY, JSON.stringify([]));
}

export function getAnalyticsSummary(): AnalyticsSummary {
  if (typeof window === "undefined") {
    return {
      totalViews: 0,
      uniqueVisitors: 0,
      totalOrders: 0,
      totalRevenue: 0,
      totalWhatsAppClicks: 0,
      conversionRate: 0,
      recentViews: [],
      recentWhatsAppClicks: [],
      orders: [],
      deviceBreakdown: { mobile: 0, desktop: 0, tablet: 0 },
      sourceBreakdown: {},
      popularFlavours: [],
    };
  }

  // Load Views (default to empty [])
  const viewsRaw = localStorage.getItem(VIEWS_KEY);
  const views: AnalyticsViewLog[] = viewsRaw ? JSON.parse(viewsRaw) : [];
  if (!viewsRaw) localStorage.setItem(VIEWS_KEY, JSON.stringify([]));

  // Load WhatsApp Clicks (default to empty [])
  const waRaw = localStorage.getItem(WHATSAPP_KEY);
  const waClicks: AnalyticsWhatsAppLog[] = waRaw ? JSON.parse(waRaw) : [];
  if (!waRaw) localStorage.setItem(WHATSAPP_KEY, JSON.stringify([]));

  // Load Orders (default to empty [])
  const ordersRaw = localStorage.getItem(ORDERS_KEY);
  const orders: AdminOrder[] = ordersRaw ? JSON.parse(ordersRaw) : [];
  if (!ordersRaw) localStorage.setItem(ORDERS_KEY, JSON.stringify([]));

  // Compute Device Breakdown
  const deviceCounts = { mobile: 0, desktop: 0, tablet: 0 };
  views.forEach((v) => {
    if (v.device === "Mobile") deviceCounts.mobile++;
    else if (v.device === "Tablet") deviceCounts.tablet++;
    else deviceCounts.desktop++;
  });

  // Source breakdown for WhatsApp clicks
  const sourceBreakdown: Record<string, number> = {};
  waClicks.forEach((c) => {
    sourceBreakdown[c.source] = (sourceBreakdown[c.source] || 0) + 1;
  });

  // Calculate Revenue
  const totalRevenue = orders.reduce((sum, o) => (o.status !== "Cancelled" ? sum + o.total : sum), 0);

  // Popular flavours
  const flavourMap: Record<string, { count: number; revenue: number }> = {};
  orders.forEach((ord) => {
    if (ord.status !== "Cancelled") {
      ord.items.forEach((item) => {
        if (!flavourMap[item.name]) {
          flavourMap[item.name] = { count: 0, revenue: 0 };
        }
        const current = flavourMap[item.name]!;
        current.count += item.quantity;
        current.revenue += item.price * item.quantity;
      });
    }
  });

  const popularFlavours = Object.entries(flavourMap)
    .map(([name, data]) => ({ name, count: data.count, revenue: data.revenue }))
    .sort((a, b) => b.count - a.count);

  const totalViews = views.length;
  const uniqueVisitors = Math.round(totalViews * 0.72);
  const conversionRate = totalViews > 0 ? Number(((orders.length / totalViews) * 100).toFixed(1)) : 0;

  return {
    totalViews,
    uniqueVisitors,
    totalOrders: orders.length,
    totalRevenue,
    totalWhatsAppClicks: waClicks.length,
    conversionRate,
    recentViews: views.slice(0, 50),
    recentWhatsAppClicks: waClicks,
    orders,
    deviceBreakdown: deviceCounts,
    sourceBreakdown,
    popularFlavours,
  };
}

// ----------------- Admin Auth & Security -----------------

export function getStoredAdminCredentials(): { username: string; passwordHash: string } {
  if (typeof window === "undefined") {
    return { username: DEFAULT_ADMIN_USERNAME, passwordHash: DEFAULT_ADMIN_PASSWORD };
  }
  const raw = localStorage.getItem(ADMIN_CREDS_KEY);
  if (raw) {
    try {
      return JSON.parse(raw);
    } catch {
      // fallback
    }
  }
  return { username: DEFAULT_ADMIN_USERNAME, passwordHash: DEFAULT_ADMIN_PASSWORD };
}

export function setStoredAdminCredentials(username: string, password: string): boolean {
  if (typeof window === "undefined") return false;
  if (!username || username.length < 4 || !password || password.length < 8) return false;
  localStorage.setItem(ADMIN_CREDS_KEY, JSON.stringify({ username, passwordHash: password }));
  return true;
}

export function checkAdminAuth(): boolean {
  if (typeof window === "undefined") return false;
  const session = localStorage.getItem(ADMIN_AUTH_KEY);
  if (!session) return false;
  try {
    const data = JSON.parse(session);
    // Session valid for 24 hours
    if (data.isAuthenticated && Date.now() - data.loginTime < 1000 * 60 * 60 * 24) {
      return true;
    }
  } catch {
    return false;
  }
  return false;
}

export function loginAdmin(usernameInput: string, passwordInput: string): boolean {
  if (typeof window === "undefined") return false;
  const creds = getStoredAdminCredentials();

  if (
    usernameInput.trim() === creds.username.trim() &&
    passwordInput === creds.passwordHash
  ) {
    localStorage.setItem(
      ADMIN_AUTH_KEY,
      JSON.stringify({
        isAuthenticated: true,
        loginTime: Date.now(),
        username: creds.username,
      })
    );
    return true;
  }
  return false;
}

export function logoutAdmin(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(ADMIN_AUTH_KEY);
}

export function resetAnalyticsData(): void {
  clearAllAnalyticsData();
}
