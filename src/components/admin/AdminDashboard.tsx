import React, { useState, useEffect } from "react";
import {
  Users,
  ShoppingBag,
  MessageCircle,
  DollarSign,
  TrendingUp,
  RefreshCw,
  LogOut,
  Search,
  Filter,
  CheckCircle2,
  Clock,
  Truck,
  Package,
  AlertCircle,
  Plus,
  Trash2,
  Download,
  Eye,
  ShieldCheck,
  ExternalLink,
  ChevronRight,
  Smartphone,
  Laptop,
  Tablet,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Key,
  Flame,
  Check,
} from "lucide-react";
import {
  getAnalyticsSummary,
  updateOrderStatus,
  deleteOrder,
  recordOrder,
  recordWhatsAppClick,
  recordPageView,
  resetAnalyticsData,
  clearAllAnalyticsData,
  setStoredAdminCredentials,
  logoutAdmin,
  AnalyticsSummary,
  AdminOrder,
  OrderStatus,
  DEFAULT_ADMIN_USERNAME,
  DEFAULT_ADMIN_PASSWORD,
} from "@/lib/analytics";
import { PARLOUR_INFO } from "@/data/scoopData";

interface AdminDashboardProps {
  onLogout: () => void;
}

type AdminTab = "overview" | "orders" | "whatsapp" | "visitors" | "flavours" | "settings";

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<AdminTab>("overview");
  const [data, setData] = useState<AnalyticsSummary>(() => getAnalyticsSummary());
  const [orderFilter, setOrderFilter] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<AdminOrder | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [notificationMsg, setNotificationMsg] = useState<string | null>(null);

  // Settings State
  const [newUsername, setNewUsername] = useState(DEFAULT_ADMIN_USERNAME);
  const [newPassword, setNewPassword] = useState("");
  const [settingsSuccess, setSettingsSuccess] = useState(false);

  const refreshData = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setData(getAnalyticsSummary());
      setIsRefreshing(false);
    }, 300);
  };

  useEffect(() => {
    setData(getAnalyticsSummary());
    const interval = setInterval(() => {
      setData(getAnalyticsSummary());
    }, 8000);
    return () => clearInterval(interval);
  }, []);

  const showNotification = (msg: string) => {
    setNotificationMsg(msg);
    setTimeout(() => setNotificationMsg(null), 3500);
  };

  const handleStatusChange = (orderId: string, status: OrderStatus) => {
    updateOrderStatus(orderId, status);
    setData(getAnalyticsSummary());
    showNotification(`Order #${orderId} status changed to ${status}`);
    if (selectedOrder && selectedOrder.id === orderId) {
      setSelectedOrder((prev) => (prev ? { ...prev, status } : null));
    }
  };

  const handleDeleteOrder = (orderId: string) => {
    if (confirm("Are you sure you want to delete this order record?")) {
      deleteOrder(orderId);
      setData(getAnalyticsSummary());
      if (selectedOrder?.id === orderId) setSelectedOrder(null);
      showNotification("Order deleted successfully.");
    }
  };

  const handleClearAllData = () => {
    if (confirm("Are you sure you want to completely clear ALL data (orders, viewers, WhatsApp clicks) from the admin panel? All counters will reset to 0.")) {
      clearAllAnalyticsData();
      setData(getAnalyticsSummary());
      showNotification("🧹 All data cleared successfully! Counters reset to 0.");
    }
  };

  // Simulate Quick Test Actions
  const handleSimulateOrder = () => {
    const sampleFlavours = [
      { flavourId: "belgian-chocolate", name: "Belgian Chocolate", price: 120, quantity: 2, servingType: "Waffle Bowl", toppings: ["Hot Fudge Drizzle"] },
      { flavourId: "strawberry-bliss", name: "Strawberry Bliss", price: 110, quantity: 1, servingType: "Cone", toppings: ["Rainbow Sprinkles"] },
      { flavourId: "royal-waffle-sundae", name: "Royal Waffle Sundae", price: 180, quantity: 1, servingType: "Waffle Bowl", toppings: ["Roasted Almond Flakes"] },
    ];
    const item = sampleFlavours[Math.floor(Math.random() * sampleFlavours.length)]!;
    const names = ["Mehakpreet Singh", "Priya Patel", "Jasleen Kaur", "Kabir Ahuja"];
    const chosenName = names[Math.floor(Math.random() * names.length)] || "Store Guest";
    const newOrd = recordOrder(
      [item],
      item.price * item.quantity,
      0,
      undefined,
      {
        name: chosenName,
        phone: "+91 98140 " + Math.floor(10000 + Math.random() * 90000),
        address: "248 Central Ave Area, Sector " + Math.floor(1 + Math.random() * 12),
        orderType: Math.random() > 0.5 ? "Delivery" : "Pickup",
      }
    );
    setData(getAnalyticsSummary());
    showNotification(`🎉 Simulated New Order (${newOrd.orderNumber}) for $${newOrd.total}!`);
  };

  const handleSimulateWhatsApp = () => {
    const sources = ["Footer Contact Bar", "Find Us Modal", "Navbar Mobile Drawer", "Policy Modal Support"];
    const src = sources[Math.floor(Math.random() * sources.length)]!;
    recordWhatsAppClick(src);
    setData(getAnalyticsSummary());
    showNotification(`📱 Simulated WhatsApp click from "${src}"!`);
  };

  const handleSimulateView = () => {
    recordPageView("/");
    setData(getAnalyticsSummary());
    showNotification("👁️ Recorded +1 live visitor page view!");
  };

  const handleSaveCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 8) {
      alert("Password must be at least 8 characters long and contain letters, numbers, and symbols.");
      return;
    }
    const ok = setStoredAdminCredentials(newUsername, newPassword);
    if (ok) {
      setSettingsSuccess(true);
      showNotification("Admin credentials updated successfully!");
      setTimeout(() => setSettingsSuccess(false), 3000);
    }
  };

  const handleExportCsv = () => {
    const headers = "Order Number,Timestamp,Customer,Phone,Address,Type,Items,Subtotal,Discount,Total,Status\n";
    const rows = data.orders.map((o) => {
      const itemsStr = o.items.map((i) => `${i.quantity}x ${i.name} (${i.servingType || "Standard"})`).join("; ");
      return `"${o.orderNumber}","${o.timestamp}","${o.customerName}","${o.customerPhone}","${o.customerAddress}","${o.orderType}","${itemsStr}",${o.subtotal},${o.discount},${o.total},"${o.status}"`;
    }).join("\n");

    const blob = new Blob([headers + rows], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `delicious_scoops_orders_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    showNotification("Exported orders as CSV file.");
  };

  // Filtered Orders
  const filteredOrders = data.orders.filter((ord) => {
    const matchesFilter = orderFilter === "All" || ord.status === orderFilter;
    const q = searchQuery.trim().toLowerCase();
    const matchesSearch =
      !q ||
      ord.orderNumber.toLowerCase().includes(q) ||
      ord.customerName.toLowerCase().includes(q) ||
      ord.customerPhone.toLowerCase().includes(q) ||
      ord.items.some((i) => i.name.toLowerCase().includes(q));
    return matchesFilter && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#140E0C] text-[#E8DDD5] flex flex-col font-sans selection:bg-[#FCE7EC] selection:text-[#D8436B]">
      
      {/* Top Navigation Bar */}
      <header className="sticky top-0 z-30 bg-[#1C1311] border-b border-white/10 px-4 sm:px-8 py-3.5 flex flex-wrap items-center justify-between gap-4 shadow-xl">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#2A1D1A] text-[#FCE7EC] border border-white/10">
            <ShieldCheck className="h-5 w-5 text-[#F48FB1]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-display text-base sm:text-lg font-bold text-white">
                {PARLOUR_INFO.name}
              </span>
              <span className="flex items-center gap-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 px-2 py-0.5 text-[10px] font-bold text-emerald-400">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                LIVE
              </span>
            </div>
            <p className="text-[11px] text-[#A6928B] hidden sm:block">
              Executive Management & Real-Time Tracking
            </p>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            onClick={refreshData}
            title="Refresh analytics data"
            className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-medium text-[#C8B8B2] hover:bg-white/10 hover:text-white transition-colors"
          >
            <RefreshCw className={`h-3.5 w-3.5 ${isRefreshing ? "animate-spin text-[#F48FB1]" : ""}`} />
            <span className="hidden sm:inline">Refresh</span>
          </button>

          <button
            onClick={handleClearAllData}
            title="Clear all orders, views, and WhatsApp clicks"
            className="flex items-center gap-1.5 rounded-full bg-red-500/10 border border-red-500/25 px-3 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
          >
            <Trash2 className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Clear Data</span>
          </button>

          <a
            href="/"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-full bg-white/5 border border-white/10 px-3 py-1.5 text-xs font-medium text-[#C8B8B2] hover:bg-white/10 hover:text-white transition-colors"
          >
            <ExternalLink className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">View Site</span>
          </a>

          <button
            onClick={() => {
              logoutAdmin();
              onLogout();
            }}
            className="flex items-center gap-1.5 rounded-full bg-red-500/15 border border-red-500/30 px-3.5 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500 hover:text-white transition-all cursor-pointer"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </header>

      {/* Floating Notification Toast */}
      {notificationMsg && (
        <div className="fixed bottom-6 right-6 z-50 rounded-2xl bg-[#221815] border border-[#F48FB1]/40 px-4 py-3 text-xs font-semibold text-white shadow-2xl animate-in slide-in-from-bottom flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-[#F48FB1]" />
          <span>{notificationMsg}</span>
        </div>
      )}

      {/* Main Layout */}
      <div className="flex-1 flex flex-col md:flex-row">
        
        {/* Sidebar Nav */}
        <aside className="w-full md:w-64 bg-[#18110F] border-b md:border-b-0 md:border-r border-white/10 p-3 sm:p-4 shrink-0">
          <div className="flex md:flex-col gap-1 overflow-x-auto no-scrollbar">
            
            <button
              onClick={() => setActiveTab("overview")}
              className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap text-left ${
                activeTab === "overview"
                  ? "bg-[#D8436B] text-white shadow-md font-bold"
                  : "text-[#A6928B] hover:bg-white/5 hover:text-white"
              }`}
            >
              <TrendingUp className="h-4 w-4 shrink-0" />
              <span>Dashboard Overview</span>
            </button>

            <button
              onClick={() => setActiveTab("orders")}
              className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap text-left ${
                activeTab === "orders"
                  ? "bg-[#D8436B] text-white shadow-md font-bold"
                  : "text-[#A6928B] hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-4 w-4 shrink-0" />
                <span>Orders Received</span>
              </div>
              <span className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full ${activeTab === "orders" ? "bg-white text-[#D8436B]" : "bg-white/10 text-white"}`}>
                {data.orders.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("whatsapp")}
              className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap text-left ${
                activeTab === "whatsapp"
                  ? "bg-[#D8436B] text-white shadow-md font-bold"
                  : "text-[#A6928B] hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <MessageCircle className="h-4 w-4 shrink-0 text-emerald-400" />
                <span>WhatsApp Clicks</span>
              </div>
              <span className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full ${activeTab === "whatsapp" ? "bg-white text-[#D8436B]" : "bg-emerald-500/20 text-emerald-400"}`}>
                {data.totalWhatsAppClicks}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("visitors")}
              className={`flex items-center justify-between rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap text-left ${
                activeTab === "visitors"
                  ? "bg-[#D8436B] text-white shadow-md font-bold"
                  : "text-[#A6928B] hover:bg-white/5 hover:text-white"
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Users className="h-4 w-4 shrink-0" />
                <span>Website Viewers</span>
              </div>
              <span className={`text-[11px] font-bold px-1.5 py-0.2 rounded-full ${activeTab === "visitors" ? "bg-white text-[#D8436B]" : "bg-white/10 text-white"}`}>
                {data.totalViews}
              </span>
            </button>

            <button
              onClick={() => setActiveTab("flavours")}
              className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap text-left ${
                activeTab === "flavours"
                  ? "bg-[#D8436B] text-white shadow-md font-bold"
                  : "text-[#A6928B] hover:bg-white/5 hover:text-white"
              }`}
            >
              <Flame className="h-4 w-4 shrink-0 text-amber-400" />
              <span>Flavours Leaderboard</span>
            </button>

            <button
              onClick={() => setActiveTab("settings")}
              className={`flex items-center gap-2.5 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold transition-all whitespace-nowrap text-left ${
                activeTab === "settings"
                  ? "bg-[#D8436B] text-white shadow-md font-bold"
                  : "text-[#A6928B] hover:bg-white/5 hover:text-white"
              }`}
            >
              <ShieldCheck className="h-4 w-4 shrink-0" />
              <span>Security & Settings</span>
            </button>

          </div>

          {/* Quick Simulation Box (for Testing) */}
          <div className="hidden md:block mt-8 rounded-2xl bg-[#1C1311] p-3.5 border border-white/10">
            <span className="text-[10px] font-bold uppercase tracking-wider text-[#A6928B] block mb-2">
              Live Test Triggers
            </span>
            <div className="space-y-1.5">
              <button
                onClick={handleSimulateOrder}
                className="w-full text-left flex items-center justify-between rounded-lg bg-white/5 hover:bg-[#D8436B] px-2.5 py-1.5 text-xs font-semibold text-white transition-colors"
              >
                <span>+ Simulate Order</span>
                <ShoppingBag className="h-3 w-3" />
              </button>
              <button
                onClick={handleSimulateWhatsApp}
                className="w-full text-left flex items-center justify-between rounded-lg bg-white/5 hover:bg-emerald-600 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors"
              >
                <span>+ WhatsApp Click</span>
                <MessageCircle className="h-3 w-3" />
              </button>
              <button
                onClick={handleSimulateView}
                className="w-full text-left flex items-center justify-between rounded-lg bg-white/5 hover:bg-blue-600 px-2.5 py-1.5 text-xs font-semibold text-white transition-colors"
              >
                <span>+ Page Viewer</span>
                <Eye className="h-3 w-3" />
              </button>
            </div>
          </div>
        </aside>

        {/* Content Body */}
        <main className="flex-1 p-4 sm:p-8 max-w-7xl overflow-y-auto">
          
          {/* ===================== TAB 1: OVERVIEW ===================== */}
          {activeTab === "overview" && (
            <div className="space-y-8 animate-in fade-in duration-200">
              
              {/* Top Banner */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-6">
                <div>
                  <h2 className="font-display text-2xl sm:text-3xl font-bold text-white">
                    Analytics Overview
                  </h2>
                  <p className="text-xs sm:text-sm text-[#A6928B] mt-1">
                    Live telemetry for website visitors, parlour orders, and WhatsApp conversions.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleExportCsv}
                    className="flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 px-3.5 py-2 text-xs font-semibold text-white transition-colors"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Download Report</span>
                  </button>
                </div>
              </div>

              {/* 4 Key Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
                
                {/* 1. Website Viewers */}
                <div className="rounded-3xl bg-[#1C1311] p-5 sm:p-6 border border-white/10 shadow-lg relative overflow-hidden group hover:border-[#D8436B]/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#A6928B]">
                      Total Viewers
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-500/15 text-blue-400">
                      <Users className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-white">
                      {data.totalViews}
                    </span>
                    <span className="text-xs font-semibold text-emerald-400">
                      +{data.uniqueVisitors} unique
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-[#8D7B75] border-t border-white/5 pt-2.5">
                    <span>Mobile: {data.deviceBreakdown.mobile}</span>
                    <span>Desktop: {data.deviceBreakdown.desktop}</span>
                  </div>
                </div>

                {/* 2. Orders Received */}
                <div className="rounded-3xl bg-[#1C1311] p-5 sm:p-6 border border-white/10 shadow-lg relative overflow-hidden group hover:border-[#D8436B]/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#A6928B]">
                      Orders Placed
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#D8436B]/15 text-[#F48FB1]">
                      <ShoppingBag className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-white">
                      {data.totalOrders}
                    </span>
                    <span className="text-xs font-semibold text-[#F48FB1]">
                      ${data.totalRevenue} Gross
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-[#8D7B75] border-t border-white/5 pt-2.5">
                    <span>Active: {data.orders.filter((o) => o.status !== "Delivered" && o.status !== "Cancelled").length}</span>
                    <span>Avg: ${(data.totalRevenue / Math.max(1, data.totalOrders)).toFixed(0)}</span>
                  </div>
                </div>

                {/* 3. WhatsApp Clicks */}
                <div className="rounded-3xl bg-[#1C1311] p-5 sm:p-6 border border-white/10 shadow-lg relative overflow-hidden group hover:border-emerald-500/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#A6928B]">
                      WhatsApp Clicks
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 text-emerald-400">
                      <MessageCircle className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-white">
                      {data.totalWhatsAppClicks}
                    </span>
                    <span className="text-xs font-semibold text-emerald-400">
                      Auto-Typed Hello
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-[#8D7B75] border-t border-white/5 pt-2.5">
                    <span>Target: {PARLOUR_INFO.phone}</span>
                  </div>
                </div>

                {/* 4. Conversion Rate */}
                <div className="rounded-3xl bg-[#1C1311] p-5 sm:p-6 border border-white/10 shadow-lg relative overflow-hidden group hover:border-amber-500/50 transition-colors">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#A6928B]">
                      Conversion Rate
                    </span>
                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/15 text-amber-400">
                      <TrendingUp className="h-4 w-4" />
                    </div>
                  </div>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-display text-3xl font-bold text-white">
                      {data.conversionRate}%
                    </span>
                    <span className="text-xs font-semibold text-amber-300">
                      Visits → Orders
                    </span>
                  </div>
                  <div className="mt-3 flex items-center justify-between text-[11px] text-[#8D7B75] border-t border-white/5 pt-2.5">
                    <span>WhatsApp Inquiry Rate: {((data.totalWhatsAppClicks / Math.max(1, data.totalViews)) * 100).toFixed(1)}%</span>
                  </div>
                </div>

              </div>

              {/* Middle Section: Recent Incoming Orders + WhatsApp Trigger Breakdown */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                
                {/* Recent Orders Stream (2 cols) */}
                <div className="lg:col-span-2 rounded-3xl bg-[#1C1311] p-5 sm:p-6 border border-white/10 shadow-lg">
                  <div className="flex items-center justify-between mb-5">
                    <div>
                      <h3 className="font-display text-lg font-bold text-white">
                        Recent Incoming Orders
                      </h3>
                      <p className="text-xs text-[#8D7B75]">Real-time parlour scoops queue</p>
                    </div>
                    <button
                      onClick={() => setActiveTab("orders")}
                      className="text-xs font-semibold text-[#F48FB1] hover:underline"
                    >
                      View All ({data.orders.length}) →
                    </button>
                  </div>

                  <div className="space-y-3">
                    {data.orders.slice(0, 4).map((ord) => (
                      <div
                        key={ord.id}
                        className="rounded-2xl bg-[#140E0C] p-4 border border-white/5 hover:border-white/15 transition-all flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
                      >
                        <div className="flex items-start gap-3">
                          <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#D8436B]/15 text-[#F48FB1] font-bold text-xs">
                            🍦
                          </div>
                          <div>
                            <div className="flex items-center gap-2">
                              <span className="font-bold text-white text-sm">
                                {ord.orderNumber}
                              </span>
                              <span
                                className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${
                                  ord.status === "New"
                                    ? "bg-blue-500/20 text-blue-300 border border-blue-500/30"
                                    : ord.status === "Preparing"
                                    ? "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                                    : ord.status === "Delivered"
                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                    : "bg-white/10 text-white/70"
                                }`}
                              >
                                {ord.status}
                              </span>
                            </div>
                            <p className="text-xs text-[#C8B8B2] mt-0.5">
                              {ord.customerName} • {ord.items.map((i) => `${i.quantity}x ${i.name}`).join(", ")}
                            </p>
                          </div>
                        </div>

                        <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                          <span className="font-display text-sm font-bold text-white">
                            ${ord.total}
                          </span>
                          <button
                            onClick={() => setSelectedOrder(ord)}
                            className="rounded-lg bg-white/5 hover:bg-white/10 px-2.5 py-1 text-xs font-medium text-white transition-colors"
                          >
                            Details
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp Click Locations Breakdown (1 col) */}
                <div className="rounded-3xl bg-[#1C1311] p-5 sm:p-6 border border-white/10 shadow-lg flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <MessageCircle className="h-5 w-5 text-[#25D366]" />
                      <h3 className="font-display text-lg font-bold text-white">
                        WhatsApp Sources
                      </h3>
                    </div>
                    <p className="text-xs text-[#8D7B75] mb-5">
                      Where users are clicking to chat
                    </p>

                    <div className="space-y-3.5">
                      {Object.entries(data.sourceBreakdown).map(([source, count]) => {
                        const pct = Math.round((count / Math.max(1, data.totalWhatsAppClicks)) * 100);
                        return (
                          <div key={source} className="space-y-1">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-[#C8B8B2] font-medium">{source}</span>
                              <span className="text-white font-bold">{count} ({pct}%)</span>
                            </div>
                            <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                              <div
                                className="h-full bg-gradient-to-r from-[#25D366] to-[#128C7E] rounded-full"
                                style={{ width: `${pct}%` }}
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="mt-6 rounded-2xl bg-[#140E0C] p-3 border border-white/5 text-[11px] text-[#A6928B]">
                    Target Number: <span className="text-white font-semibold">{PARLOUR_INFO.phone}</span>
                    <br />
                    Auto Message: <span className="text-emerald-400 italic font-mono">"Hello Delicious Scoops!"</span>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ===================== TAB 2: ORDERS MANAGEMENT ===================== */}
          {activeTab === "orders" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Orders Header */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-white/10 pb-5">
                <div>
                  <h2 className="font-display text-2xl font-bold text-white">
                    Order Management ({data.orders.length})
                  </h2>
                  <p className="text-xs text-[#A6928B] mt-0.5">
                    Track live parlour queues, update preparation status, and fulfill deliveries.
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <button
                    onClick={handleSimulateOrder}
                    className="flex items-center gap-1.5 rounded-full bg-[#D8436B] hover:bg-[#C2335B] px-3.5 py-2 text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    <Plus className="h-3.5 w-3.5" />
                    <span>+ New Test Order</span>
                  </button>
                  <button
                    onClick={handleExportCsv}
                    className="flex items-center gap-1.5 rounded-full bg-white/10 hover:bg-white/20 px-3.5 py-2 text-xs font-semibold text-white transition-colors cursor-pointer"
                  >
                    <Download className="h-3.5 w-3.5" />
                    <span>Export CSV</span>
                  </button>
                </div>
              </div>

              {/* Filter & Search Bar */}
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 bg-[#1C1311] p-3 rounded-2xl border border-white/10">
                <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
                  {["All", "New", "Preparing", "Out for Delivery", "Delivered", "Cancelled"].map((status) => (
                    <button
                      key={status}
                      onClick={() => setOrderFilter(status)}
                      className={`rounded-full px-3 py-1 text-xs font-semibold transition-all whitespace-nowrap ${
                        orderFilter === status
                          ? "bg-white text-[#18110F] shadow-xs"
                          : "text-[#A6928B] hover:text-white"
                      }`}
                    >
                      {status}
                    </button>
                  ))}
                </div>

                <div className="relative min-w-[200px]">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-[#8D7B75]" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by customer, order #..."
                    className="w-full rounded-xl bg-[#140E0C] pl-8 pr-3 py-1.5 text-xs text-white placeholder-[#5C4A44] border border-white/10 focus:border-[#D8436B] focus:outline-none"
                  />
                </div>
              </div>

              {/* Orders Table */}
              <div className="rounded-3xl bg-[#1C1311] border border-white/10 overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#140E0C] text-[#8D7B75] uppercase tracking-wider font-semibold border-b border-white/10">
                      <tr>
                        <th className="px-4 py-3.5">Order ID</th>
                        <th className="px-4 py-3.5">Customer</th>
                        <th className="px-4 py-3.5">Items & Scoops</th>
                        <th className="px-4 py-3.5">Total ($)</th>
                        <th className="px-4 py-3.5">Status</th>
                        <th className="px-4 py-3.5 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredOrders.length === 0 ? (
                        <tr>
                          <td colSpan={6} className="text-center py-12 text-[#8D7B75]">
                            No orders found matching this filter.
                          </td>
                        </tr>
                      ) : (
                        filteredOrders.map((ord) => (
                          <tr key={ord.id} className="hover:bg-white/5 transition-colors">
                            <td className="px-4 py-3.5 font-mono font-bold text-white">
                              {ord.orderNumber}
                              <div className="text-[10px] font-normal text-[#8D7B75]">
                                {new Date(ord.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                              </div>
                            </td>
                            <td className="px-4 py-3.5">
                              <div className="font-semibold text-white">{ord.customerName}</div>
                              <div className="text-[11px] text-[#A6928B]">{ord.customerPhone}</div>
                            </td>
                            <td className="px-4 py-3.5 max-w-xs">
                              {ord.items.map((i, idx) => (
                                <div key={idx} className="text-[#C8B8B2] truncate">
                                  {i.quantity}x {i.name} <span className="text-[#8D7B75]">({i.servingType || "Cone"})</span>
                                </div>
                              ))}
                            </td>
                            <td className="px-4 py-3.5 font-display font-bold text-white">
                              ${ord.total}
                              {ord.discount > 0 && (
                                <span className="text-[10px] text-emerald-400 block">
                                  -${ord.discount} off
                                </span>
                              )}
                            </td>
                            <td className="px-4 py-3.5">
                              <select
                                value={ord.status}
                                onChange={(e) => handleStatusChange(ord.id, e.target.value as OrderStatus)}
                                className={`rounded-full px-2.5 py-1 text-[11px] font-bold border cursor-pointer focus:outline-none ${
                                  ord.status === "New"
                                    ? "bg-blue-500/15 border-blue-500/40 text-blue-300"
                                    : ord.status === "Preparing"
                                    ? "bg-amber-500/15 border-amber-500/40 text-amber-300"
                                    : ord.status === "Out for Delivery"
                                    ? "bg-purple-500/15 border-purple-500/40 text-purple-300"
                                    : ord.status === "Delivered"
                                    ? "bg-emerald-500/15 border-emerald-500/40 text-emerald-300"
                                    : "bg-red-500/15 border-red-500/40 text-red-300"
                                }`}
                              >
                                <option value="New" className="bg-[#18110F] text-white">New</option>
                                <option value="Preparing" className="bg-[#18110F] text-white">Preparing</option>
                                <option value="Out for Delivery" className="bg-[#18110F] text-white">Out for Delivery</option>
                                <option value="Delivered" className="bg-[#18110F] text-white">Delivered</option>
                                <option value="Cancelled" className="bg-[#18110F] text-white">Cancelled</option>
                              </select>
                            </td>
                            <td className="px-4 py-3.5 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setSelectedOrder(ord)}
                                  className="rounded-lg bg-white/5 hover:bg-white/10 px-2.5 py-1 text-[11px] font-medium text-white transition-colors"
                                >
                                  Details
                                </button>
                                <button
                                  onClick={() => handleDeleteOrder(ord.id)}
                                  title="Delete order"
                                  className="rounded-lg p-1 text-[#8D7B75] hover:bg-red-500/20 hover:text-red-300 transition-colors"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ===================== TAB 3: WHATSAPP CLICKS ===================== */}
          {activeTab === "whatsapp" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="border-b border-white/10 pb-5">
                <div className="flex items-center gap-2">
                  <MessageCircle className="h-6 w-6 text-[#25D366]" />
                  <h2 className="font-display text-2xl font-bold text-white">
                    WhatsApp Inquiry Telemetry
                  </h2>
                </div>
                <p className="text-xs text-[#A6928B] mt-0.5">
                  Detailed analytics of customer clicks directed to WhatsApp ({PARLOUR_INFO.phone}).
                </p>
              </div>

              {/* Metrics Summary */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-[#1C1311] p-5 border border-white/10">
                  <span className="text-xs font-bold text-[#A6928B] uppercase">Total Inquiries Initiated</span>
                  <div className="font-display text-3xl font-bold text-white mt-2">
                    {data.totalWhatsAppClicks}
                  </div>
                </div>

                <div className="rounded-2xl bg-[#1C1311] p-5 border border-white/10">
                  <span className="text-xs font-bold text-[#A6928B] uppercase">Destination Number</span>
                  <div className="font-mono text-xl font-bold text-emerald-400 mt-2">
                    {PARLOUR_INFO.phone}
                  </div>
                </div>

                <div className="rounded-2xl bg-[#1C1311] p-5 border border-white/10">
                  <span className="text-xs font-bold text-[#A6928B] uppercase">Default Message</span>
                  <div className="text-xs font-mono text-white/90 italic mt-2 bg-[#140E0C] p-2 rounded-lg border border-white/5">
                    "Hello Delicious Scoops!"
                  </div>
                </div>
              </div>

              {/* WhatsApp Log Table */}
              <div className="rounded-3xl bg-[#1C1311] border border-white/10 overflow-hidden shadow-xl">
                <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">Chronological Click Log</h3>
                  <button
                    onClick={handleSimulateWhatsApp}
                    className="text-xs font-semibold text-emerald-400 hover:underline"
                  >
                    + Test Click Event
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#140E0C] text-[#8D7B75] uppercase tracking-wider font-semibold border-b border-white/10">
                      <tr>
                        <th className="px-4 py-3">Timestamp</th>
                        <th className="px-4 py-3">Source Location</th>
                        <th className="px-4 py-3">Device</th>
                        <th className="px-4 py-3">Target Phone</th>
                        <th className="px-4 py-3 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {data.recentWhatsAppClicks.map((click) => (
                        <tr key={click.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-4 py-3 font-mono text-[#C8B8B2]">
                            {new Date(click.timestamp).toLocaleString()}
                          </td>
                          <td className="px-4 py-3 font-semibold text-white flex items-center gap-1.5">
                            <span className="h-2 w-2 rounded-full bg-emerald-400" />
                            {click.source}
                          </td>
                          <td className="px-4 py-3 text-[#A6928B]">
                            {click.device}
                          </td>
                          <td className="px-4 py-3 font-mono text-emerald-400">
                            {click.targetNumber}
                          </td>
                          <td className="px-4 py-3 text-right">
                            <a
                              href={PARLOUR_INFO.whatsappUrl}
                              target="_blank"
                              rel="noreferrer"
                              className="rounded-lg bg-emerald-500/15 hover:bg-emerald-500/30 text-emerald-300 px-2.5 py-1 font-semibold text-[11px] inline-flex items-center gap-1"
                            >
                              <span>Open Chat</span>
                              <ExternalLink className="h-3 w-3" />
                            </a>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ===================== TAB 4: VISITORS & TRAFFIC ===================== */}
          {activeTab === "visitors" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="border-b border-white/10 pb-5">
                <h2 className="font-display text-2xl font-bold text-white">
                  Visitor Telemetry & Page Views
                </h2>
                <p className="text-xs text-[#A6928B] mt-0.5">
                  Live traffic tracking, device splits, and referral channels.
                </p>
              </div>

              {/* Devices Card */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-2xl bg-[#1C1311] p-5 border border-white/10 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/15 text-blue-400">
                    <Smartphone className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#A6928B]">Mobile Viewers</span>
                    <div className="font-display text-2xl font-bold text-white">
                      {data.deviceBreakdown.mobile} ({Math.round((data.deviceBreakdown.mobile / Math.max(1, data.totalViews)) * 100)}%)
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#1C1311] p-5 border border-white/10 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-400">
                    <Laptop className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#A6928B]">Desktop Viewers</span>
                    <div className="font-display text-2xl font-bold text-white">
                      {data.deviceBreakdown.desktop} ({Math.round((data.deviceBreakdown.desktop / Math.max(1, data.totalViews)) * 100)}%)
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl bg-[#1C1311] p-5 border border-white/10 flex items-center gap-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-500/15 text-amber-400">
                    <Tablet className="h-6 w-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[#A6928B]">Tablet Viewers</span>
                    <div className="font-display text-2xl font-bold text-white">
                      {data.deviceBreakdown.tablet} ({Math.round((data.deviceBreakdown.tablet / Math.max(1, data.totalViews)) * 100)}%)
                    </div>
                  </div>
                </div>
              </div>

              {/* Viewers Log */}
              <div className="rounded-3xl bg-[#1C1311] border border-white/10 overflow-hidden shadow-xl">
                <div className="px-5 py-4 border-b border-white/10 flex items-center justify-between">
                  <h3 className="font-bold text-white text-sm">Recent Page Visit Logs</h3>
                  <button
                    onClick={handleSimulateView}
                    className="text-xs font-semibold text-blue-400 hover:underline"
                  >
                    + Record Live View
                  </button>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-[#140E0C] text-[#8D7B75] uppercase tracking-wider font-semibold border-b border-white/10">
                      <tr>
                        <th className="px-4 py-3">Timestamp</th>
                        <th className="px-4 py-3">Route Path</th>
                        <th className="px-4 py-3">Referrer Source</th>
                        <th className="px-4 py-3">Device</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {data.recentViews.slice(0, 25).map((view) => (
                        <tr key={view.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-4 py-3 font-mono text-[#C8B8B2]">
                            {new Date(view.timestamp).toLocaleString()}
                          </td>
                          <td className="px-4 py-3 font-mono text-white">
                            {view.path}
                          </td>
                          <td className="px-4 py-3 text-white font-medium">
                            {view.referrer}
                          </td>
                          <td className="px-4 py-3 text-[#A6928B]">
                            {view.device}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* ===================== TAB 5: FLAVOURS LEADERBOARD ===================== */}
          {activeTab === "flavours" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              <div className="border-b border-white/10 pb-5">
                <h2 className="font-display text-2xl font-bold text-white">
                  Flavours & Product Performance
                </h2>
                <p className="text-xs text-[#A6928B] mt-0.5">
                  Top-selling artisan scoops ranked by customer orders and revenue.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="rounded-3xl bg-[#1C1311] p-6 border border-white/10 shadow-xl">
                  <h3 className="font-display text-lg font-bold text-white mb-4">
                    Top Ordered Flavours
                  </h3>
                  <div className="space-y-4">
                    {data.popularFlavours.map((f, idx) => (
                      <div key={f.name} className="flex items-center justify-between p-3 rounded-2xl bg-[#140E0C] border border-white/5">
                        <div className="flex items-center gap-3">
                          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-[#D8436B]/20 text-[#F48FB1] font-bold text-xs">
                            #{idx + 1}
                          </span>
                          <div>
                            <span className="font-bold text-white text-sm block">{f.name}</span>
                            <span className="text-[11px] text-[#8D7B75]">{f.count} scoops served</span>
                          </div>
                        </div>
                        <span className="font-display font-bold text-emerald-400 text-sm">
                          ${f.revenue}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="rounded-3xl bg-[#1C1311] p-6 border border-white/10 shadow-xl flex flex-col justify-between">
                  <div>
                    <h3 className="font-display text-lg font-bold text-white mb-4">
                      Menu Recommendations
                    </h3>
                    <p className="text-xs text-[#C8B8B2] leading-relaxed mb-4">
                      Belgian Chocolate and Royal Waffle Sundaes continue to drive the highest gross margin per order. Consider highlighting them in seasonal campaigns!
                    </p>
                  </div>

                  <div className="rounded-2xl bg-[#140E0C] p-4 border border-white/5">
                    <span className="text-xs font-bold text-[#F48FB1] block mb-1">Promo Code Activity:</span>
                    <p className="text-xs text-[#C8B8B2]">
                      Code <span className="font-mono text-white font-bold">BUY2GET1</span> has been applied across several recent checkouts.
                    </p>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* ===================== TAB 6: SECURITY & SETTINGS ===================== */}
          {activeTab === "settings" && (
            <div className="space-y-6 max-w-2xl animate-in fade-in duration-200">
              
              <div className="border-b border-white/10 pb-5">
                <h2 className="font-display text-2xl font-bold text-white">
                  Security & Admin Credentials
                </h2>
                <p className="text-xs text-[#A6928B] mt-0.5">
                  Update administrative login credentials and manage telemetry database.
                </p>
              </div>

              {/* Password update form */}
              <div className="rounded-3xl bg-[#1C1311] p-6 sm:p-8 border border-white/10 shadow-xl">
                <h3 className="font-bold text-white text-base mb-1 flex items-center gap-2">
                  <Key className="h-4 w-4 text-[#F48FB1]" />
                  <span>Update Admin Login Password</span>
                </h3>
                <p className="text-xs text-[#8D7B75] mb-6">
                  Ensure password contains letters, numbers, and special characters.
                </p>

                {settingsSuccess && (
                  <div className="mb-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 p-3 text-xs text-emerald-300 flex items-center gap-2">
                    <Check className="h-4 w-4 text-emerald-400" />
                    <span>Credentials updated successfully!</span>
                  </div>
                )}

                <form onSubmit={handleSaveCredentials} className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-[#C8B8B2] mb-1.5 uppercase">
                      Admin Username
                    </label>
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      required
                      className="w-full rounded-xl bg-[#140E0C] border border-white/10 px-4 py-2.5 text-xs sm:text-sm text-white focus:border-[#D8436B] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#C8B8B2] mb-1.5 uppercase">
                      New Strong Password
                    </label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new strong password"
                      required
                      className="w-full rounded-xl bg-[#140E0C] border border-white/10 px-4 py-2.5 text-xs sm:text-sm text-white focus:border-[#D8436B] focus:outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 rounded-xl bg-[#D8436B] hover:bg-[#C2335B] px-6 py-2.5 text-xs sm:text-sm font-bold text-white transition-colors cursor-pointer"
                  >
                    Save New Credentials
                  </button>
                </form>
              </div>

              {/* Clear All Data Box */}
              <div className="rounded-3xl bg-[#1C1311] p-6 border border-red-500/20 shadow-xl">
                <h3 className="font-bold text-red-400 text-sm mb-1 flex items-center gap-2">
                  <Trash2 className="h-4 w-4" />
                  <span>Clear All Admin & Telemetry Data (Wipe to 0)</span>
                </h3>
                <p className="text-xs text-[#8D7B75] mb-4">
                  Permanently clear all recorded orders, website viewer telemetry, and WhatsApp click records. All counters will reset to zero.
                </p>
                <button
                  onClick={handleClearAllData}
                  className="rounded-xl bg-red-500/20 hover:bg-red-500 text-red-300 hover:text-white border border-red-500/40 px-4 py-2 text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Clear All Data Now</span>
                </button>
              </div>

            </div>
          )}

        </main>
      </div>

      {/* ===================== ORDER DETAIL MODAL ===================== */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <div
            onClick={() => setSelectedOrder(null)}
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
          />

          <div className="relative w-full max-w-lg rounded-3xl bg-[#1C1311] p-6 sm:p-8 border border-white/15 shadow-2xl z-10 animate-in zoom-in-95">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-4">
              <div>
                <span className="text-[10px] font-bold text-[#F48FB1] uppercase tracking-wider">
                  Order Details
                </span>
                <h3 className="font-display text-xl font-bold text-white">
                  {selectedOrder.orderNumber}
                </h3>
              </div>
              <button
                onClick={() => setSelectedOrder(null)}
                className="rounded-full p-2 text-[#8D7B75] hover:bg-white/10 hover:text-white"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              
              {/* Customer Info */}
              <div className="rounded-2xl bg-[#140E0C] p-4 border border-white/5 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-[#8D7B75]">Customer:</span>
                  <span className="font-semibold text-white">{selectedOrder.customerName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8D7B75]">Phone:</span>
                  <a href={`tel:${selectedOrder.customerPhone}`} className="font-semibold text-emerald-400 hover:underline">
                    {selectedOrder.customerPhone}
                  </a>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8D7B75]">Fulfillment:</span>
                  <span className="font-semibold text-white">{selectedOrder.orderType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#8D7B75]">Address:</span>
                  <span className="font-semibold text-white text-right max-w-[200px] truncate">
                    {selectedOrder.customerAddress}
                  </span>
                </div>
              </div>

              {/* Items List */}
              <div className="rounded-2xl bg-[#140E0C] p-4 border border-white/5 space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A6928B] block mb-1">
                  Ordered Scoops & Mix-ins:
                </span>
                {selectedOrder.items.map((it, idx) => (
                  <div key={idx} className="flex justify-between py-1 border-b border-white/5 last:border-0">
                    <div>
                      <div className="font-semibold text-white">
                        {it.quantity}x {it.name}
                      </div>
                      <div className="text-[10px] text-[#8D7B75]">
                        Style: {it.servingType || "Cone"} {it.toppings?.length ? `• Toppings: ${it.toppings.join(", ")}` : ""}
                      </div>
                    </div>
                    <span className="font-display font-bold text-white">
                      ${it.price * it.quantity}
                    </span>
                  </div>
                ))}
              </div>

              {/* Financial Tally */}
              <div className="rounded-2xl bg-[#140E0C] p-4 border border-white/5 space-y-1.5">
                <div className="flex justify-between text-[#8D7B75]">
                  <span>Subtotal:</span>
                  <span>${selectedOrder.subtotal}</span>
                </div>
                {selectedOrder.discount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Discount ({selectedOrder.promoCode}):</span>
                    <span>-${selectedOrder.discount}</span>
                  </div>
                )}
                <div className="flex justify-between text-base font-display font-bold text-white border-t border-white/10 pt-2 mt-2">
                  <span>Grand Total:</span>
                  <span>${selectedOrder.total}</span>
                </div>
              </div>

              {/* Status Action Buttons */}
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A6928B] block mb-2">
                  Update Order Pipeline Status:
                </span>
                <div className="flex flex-wrap gap-2">
                  {(["New", "Preparing", "Out for Delivery", "Delivered", "Cancelled"] as OrderStatus[]).map((st) => (
                    <button
                      key={st}
                      onClick={() => handleStatusChange(selectedOrder.id, st)}
                      className={`rounded-full px-3 py-1.5 text-xs font-bold transition-all cursor-pointer ${
                        selectedOrder.status === st
                          ? "bg-[#D8436B] text-white shadow-md"
                          : "bg-white/10 text-[#C8B8B2] hover:bg-white/20 hover:text-white"
                      }`}
                    >
                      {st}
                    </button>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

    </div>
  );
}
