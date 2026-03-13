"use client";

import { GlassCard } from "@/components/common/GlassCard";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from "recharts";
import { Activity, DollarSign, Download, BookOpen } from "lucide-react";

const revenueData = [
  { name: "Mon", revenue: 400 },
  { name: "Tue", revenue: 300 },
  { name: "Wed", revenue: 550 },
  { name: "Thu", revenue: 200 },
  { name: "Fri", revenue: 700 },
  { name: "Sat", revenue: 900 },
  { name: "Sun", revenue: 1100 },
];

const salesData = [
  { name: "Neuromancer", sales: 240 },
  { name: "Digital Fort", sales: 139 },
  { name: "Zero-G", sales: 380 },
  { name: "Syntax", sales: 190 },
];

export function SellerStats() {
  return (
    <div className="space-y-8">
      {/* 4-grid stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <GlassCard className="p-6 border-none bg-background/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
           <div className="flex justify-between items-start">
             <div>
                <p className="text-xs text-muted-foreground font-heading tracking-widest uppercase mb-1">Total Revenue</p>
                <h4 className="text-3xl font-sans font-bold text-primary drop-shadow-sm">$4,150.00</h4>
             </div>
             <div className="p-2 bg-primary/10 rounded-lg shadow-inner"><DollarSign className="w-5 h-5 text-primary" /></div>
           </div>
        </GlassCard>
        
        <GlassCard className="p-6 border-none bg-background/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
           <div className="flex justify-between items-start">
             <div>
                <p className="text-xs text-muted-foreground font-heading tracking-widest uppercase mb-1">Downloads</p>
                <h4 className="text-3xl font-sans font-bold text-primary drop-shadow-sm">949</h4>
             </div>
             <div className="p-2 bg-primary/10 rounded-lg shadow-inner"><Download className="w-5 h-5 text-primary" /></div>
           </div>
        </GlassCard>

        <GlassCard className="p-6 border-none bg-background/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
           <div className="flex justify-between items-start">
             <div>
                <p className="text-xs text-muted-foreground font-heading tracking-widest uppercase mb-1">Active Protocols</p>
                <h4 className="text-3xl font-sans font-bold text-primary drop-shadow-sm">14</h4>
             </div>
             <div className="p-2 bg-primary/10 rounded-lg shadow-inner"><BookOpen className="w-5 h-5 text-primary" /></div>
           </div>
        </GlassCard>

        <GlassCard className="p-6 border-none bg-background/40 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(0,0,0,0.05)]">
           <div className="flex justify-between items-start">
             <div>
                <p className="text-xs text-muted-foreground font-heading tracking-widest uppercase mb-1">Avg Trajectory</p>
                <h4 className="text-3xl font-sans font-bold text-foreground drop-shadow-sm">+24%</h4>
             </div>
             <div className="p-2 bg-primary/10 rounded-lg shadow-inner"><Activity className="w-5 h-5 text-primary" /></div>
           </div>
        </GlassCard>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Revenue Chart */}
        <GlassCard className="p-6 lg:col-span-2">
           <h3 className="text-xl font-heading font-bold text-text-primary mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-neon-gold shadow-[0_0_10px_rgba(255,215,0,0.8)]"></span>
              7-Day Revenue Telemetry
           </h3>
           <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <AreaChart data={revenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                 <defs>
                   <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                     <stop offset="5%" stopColor="#ffd700" stopOpacity={0.3}/>
                     <stop offset="95%" stopColor="#ffd700" stopOpacity={0}/>
                   </linearGradient>
                 </defs>
                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                 <XAxis dataKey="name" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} tickLine={false} axisLine={false} />
                 <YAxis stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 12}} tickLine={false} axisLine={false} />
                 <Tooltip contentStyle={{ backgroundColor: '#0d0d2b', borderColor: 'rgba(255,215,0,0.3)', borderRadius: '8px', color: '#fff' }} />
                 <Area type="monotone" dataKey="revenue" stroke="#ffd700" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
               </AreaChart>
             </ResponsiveContainer>
           </div>
        </GlassCard>

        {/* Top Books Chart */}
        <GlassCard className="p-6">
           <h3 className="text-xl font-heading font-bold text-text-primary mb-6 flex items-center gap-2">
              <span className="w-1.5 h-6 bg-neon-cyan shadow-[0_0_10px_rgba(0,245,255,0.8)]"></span>
              Top Downloads
           </h3>
           <div className="h-[300px] w-full">
             <ResponsiveContainer width="100%" height="100%">
               <BarChart data={salesData} layout="vertical" margin={{ top: 0, right: 0, left: 10, bottom: 0 }}>
                 <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" horizontal={false} />
                 <XAxis type="number" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.5)', fontSize: 10}} tickLine={false} axisLine={false} />
                 <YAxis dataKey="name" type="category" stroke="rgba(255,255,255,0.3)" tick={{fill: 'rgba(255,255,255,0.8)', fontSize: 11}} tickLine={false} axisLine={false} width={80} />
                 <Tooltip contentStyle={{ backgroundColor: '#0d0d2b', borderColor: 'rgba(0,245,255,0.3)', borderRadius: '8px', color: '#fff' }} cursor={{fill: 'rgba(255,255,255,0.05)'}} />
                 <Bar dataKey="sales" fill="#00f5ff" radius={[0, 4, 4, 0]} maxBarSize={30} />
               </BarChart>
             </ResponsiveContainer>
           </div>
        </GlassCard>
      </div>
    </div>
  );
}
