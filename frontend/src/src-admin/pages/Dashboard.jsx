// src/pages/Dashboard.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { StatCard } from "@/components/StatCard";
import { CheckCircle, Clock, UtensilsCrossed } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const pendingVerifications = [
  { id: 1, kitchenName: "Home", owner: "Sandeep Das", submitted: "6/5/2025", action: "View" },
  { id: 2, kitchenName: "Spice Garden", owner: "Hukum Chand", submitted: "7/5/2025", action: "View" },
  { id: 3, kitchenName: "Trishna Nights", owner: "Krishna", submitted: "7/5/2025", action: "View" },
  { id: 4, kitchenName: "Orient Heights", owner: "Shri Ram", submitted: "8/5/2025", action: "View" },
  { id: 5, kitchenName: "Orient Red Orange", owner: "Kumar Sarangi", submitted: "8/5/2025", action: "View" },
];

const recentlyVerified = [
  { id: 1, name: "Kitchen Name", owner: "Rupa Kumar Naik", verified: "4/5/2025" },
  { id: 2, name: "Kitchen Name", owner: "Sujit Sahoo", verified: "4/5/2025" },
  { id: 3, name: "Food Kitchen", owner: "Hukum Chand", verified: "5/5/2025" },
  { id: 4, name: "The Great Leaf", owner: "Sandeep Das", verified: "5/5/2025" },
  { id: 5, name: "Food For Health", owner: "Bineet Pradhan", verified: "6/5/2025" },
  { id: 6, name: "Trupti Nature Kitchen", owner: "Nilachala Mohanty", verified: "6/5/2025" },
];

const Dashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <header className="border-b bg-card">
          <div className="flex h-16 items-center justify-between px-8">
            <h2 className="text-2xl font-bold">Dashboard</h2>
          </div>
        </header>
        
        <main className="p-8 space-y-8">
          <div className="grid gap-6 md:grid-cols-3">
            <StatCard label="Pending Verifications" value="15" icon={Clock} />
            <StatCard label="Recently Verified" value="8" icon={CheckCircle} />
            <StatCard label="Total Kitchens" value="250" icon={UtensilsCrossed} />
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Pending Verifications</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kitchen Name</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Submitted</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingVerifications.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.kitchenName}</TableCell>
                      <TableCell className="text-muted-foreground">{item.owner}</TableCell>
                      <TableCell className="text-muted-foreground">{item.submitted}</TableCell>
                      <TableCell className="text-right">
                        <Button 
                          variant="ghost" 
                          size="sm"
                          className="text-primary hover:text-primary"
                          onClick={() => navigate(`/admin/kitchen/${item.id}`)}
                        >
                          {item.action}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recently Verified Kitchens</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kitchen Name</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Verified On</TableHead>
                    <TableHead className="text-right">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentlyVerified.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-muted-foreground">{item.owner}</TableCell>
                      <TableCell className="text-muted-foreground">{item.verified}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="secondary" className="bg-success/10 text-success hover:bg-success/20">
                          Verified
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
