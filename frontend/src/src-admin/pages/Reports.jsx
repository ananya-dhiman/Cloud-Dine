import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { StatCard } from "@/components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle, Clock, TrendingUp, UtensilsCrossed, Users, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from "recharts";

// Mock data for 12 months
const fullMonthlyData = [
  { month: "Jan", verifications: 45, approved: 38, rejected: 7 },
  { month: "Feb", verifications: 52, approved: 44, rejected: 8 },
  { month: "Mar", verifications: 48, approved: 40, rejected: 8 },
  { month: "Apr", verifications: 61, approved: 53, rejected: 8 },
  { month: "May", verifications: 55, approved: 47, rejected: 8 },
  { month: "Jun", verifications: 50, approved: 42, rejected: 8 },
  { month: "Jul", verifications: 60, approved: 51, rejected: 9 },
  { month: "Aug", verifications: 58, approved: 49, rejected: 9 },
  { month: "Sep", verifications: 62, approved: 53, rejected: 9 },
  { month: "Oct", verifications: 65, approved: 56, rejected: 9 },
  { month: "Nov", verifications: 70, approved: 60, rejected: 10 },
  { month: "Dec", verifications: 68, approved: 59, rejected: 9 },
];

const statusData = [
  { name: "Verified", value: 208, color: "#22c55e" },
  { name: "Pending", value: 42, color: "#f59e0b" },
  { name: "Rejected", value: 15, color: "#ef4444" },
];

const topKitchens = [
  { name: "Spice Garden", verifications: 8, rating: 4.8 },
  { name: "Food Kitchen", verifications: 6, rating: 4.7 },
  { name: "The Great Leaf", verifications: 5, rating: 4.9 },
  { name: "Orient Heights", verifications: 4, rating: 4.6 },
  { name: "Trishna Nights", verifications: 4, rating: 4.5 },
];

const Reports = () => {
  const [dateRange, setDateRange] = useState("30days");

  // Filter monthly data according to selected date range
  const filteredData = (() => {
    switch (dateRange) {
      case "7days":
        return fullMonthlyData.slice(-1); // latest month
      case "30days":
        return fullMonthlyData.slice(-1); // latest month
      case "90days":
        return fullMonthlyData.slice(-3); // last 3 months
      case "year":
        return fullMonthlyData;
      default:
        return fullMonthlyData;
    }
  })();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <header className="border-b bg-card">
          <div className="flex h-16 items-center justify-between px-8">
            <h2 className="text-2xl font-bold">Reports & Analytics</h2>
            <div className="flex gap-3">
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7days">Last 7 days</SelectItem>
                  <SelectItem value="30days">Last 30 days</SelectItem>
                  <SelectItem value="90days">Last 90 days</SelectItem>
                  <SelectItem value="year">This year</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline">
                <Calendar className="mr-2 h-4 w-4" />
                Export Report
              </Button>
            </div>
          </div>
        </header>

        <main className="p-8 space-y-6">
          {/* Stat Cards */}
          <div className="grid gap-6 md:grid-cols-4">
            <StatCard label="Total Verifications" value="265" icon={CheckCircle} />
            <StatCard label="Pending Reviews" value="42" icon={Clock} />
            <StatCard label="Total Kitchens" value="250" icon={UtensilsCrossed} />
            <StatCard label="Active Users" value="187" icon={Users} />
          </div>

          {/* Charts */}
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Verification Trends</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={filteredData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                    <YAxis stroke="hsl(var(--muted-foreground))" />
                    <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                    <Line type="monotone" dataKey="verifications" stroke="hsl(var(--primary))" strokeWidth={2} dot={{ fill: "hsl(var(--primary))", r: 4 }} />
                    <Line type="monotone" dataKey="approved" stroke="#22c55e" strokeWidth={2} dot={{ fill: "#22c55e", r: 4 }} />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Verification Status Distribution</CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-center">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={100}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Monthly Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Performance</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={filteredData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                  <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
                  <YAxis stroke="hsl(var(--muted-foreground))" />
                  <Tooltip contentStyle={{ backgroundColor: "hsl(var(--card))", border: "1px solid hsl(var(--border))", borderRadius: "8px" }} />
                  <Bar dataKey="approved" fill="#22c55e" radius={[8, 8, 0, 0]} />
                  <Bar dataKey="rejected" fill="#ef4444" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Top Kitchens */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Kitchens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topKitchens.map((kitchen, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary font-bold">
                        #{index + 1}
                      </div>
                      <div>
                        <p className="font-medium">{kitchen.name}</p>
                        <p className="text-sm text-muted-foreground">{kitchen.verifications} verifications completed</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-4 w-4 text-success" />
                      <span className="font-medium">{kitchen.rating}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Reports;
