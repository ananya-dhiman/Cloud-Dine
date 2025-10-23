// src/pages/Kitchens.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search, Plus, MapPin, Phone, Mail } from "lucide-react";

const kitchensData = [
  { id: 1, name: "Spice Garden", owner: "Hukum Chand", location: "Mumbai, Maharashtra", phone: "+91 98765 43210", email: "hukum@spicegarden.com", status: "verified", verifiedDate: "7/5/2025" },
  { id: 2, name: "Kitchen Name", owner: "Rupa Kumar", location: "Delhi, Delhi", phone: "+91 98765 43211", email: "rupa@kitchen.com", status: "verified", verifiedDate: "4/5/2025" },
  { id: 3, name: "Orient Heights", owner: "Shri Ram", location: "Bangalore, Karnataka", phone: "+91 98765 43212", email: "ram@orientheights.com", status: "pending", verifiedDate: "-" },
  { id: 4, name: "Food Kitchen", owner: "Hukum Chand", location: "Pune, Maharashtra", phone: "+91 98765 43213", email: "info@foodkitchen.com", status: "verified", verifiedDate: "5/5/2025" },
  { id: 5, name: "The Great Leaf", owner: "Sandeep Das", location: "Hyderabad, Telangana", phone: "+91 98765 43214", email: "sandeep@greatleaf.com", status: "verified", verifiedDate: "5/5/2025" },
  { id: 6, name: "Trishna Nights", owner: "Krishna", location: "Chennai, Tamil Nadu", phone: "+91 98765 43215", email: "krishna@trishna.com", status: "pending", verifiedDate: "-" },
  { id: 7, name: "Orient Red Orange", owner: "Kumar Sarangi", location: "Kolkata, West Bengal", phone: "+91 98765 43216", email: "kumar@orientred.com", status: "pending", verifiedDate: "-" },
  { id: 8, name: "Food For Health", owner: "Bineet Pradhan", location: "Ahmedabad, Gujarat", phone: "+91 98765 43217", email: "bineet@foodhealth.com", status: "verified", verifiedDate: "6/5/2025" },
];

const Kitchens = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all"); // removed TypeScript type
  const navigate = useNavigate();

  const filteredKitchens = kitchensData.filter((kitchen) => {
    const matchesSearch =
      kitchen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kitchen.owner.toLowerCase().includes(searchTerm.toLowerCase()) ||
      kitchen.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || kitchen.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <header className="border-b bg-card">
          <div className="flex h-16 items-center justify-between px-8">
            <h2 className="text-2xl font-bold">Kitchens</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Kitchen
            </Button>
          </div>
        </header>

        <main className="p-8 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>All Kitchens ({filteredKitchens.length})</CardTitle>
                <div className="flex gap-4">
                  <div className="flex gap-2">
                    <Button variant={filterStatus === "all" ? "default" : "outline"} size="sm" onClick={() => setFilterStatus("all")}>All</Button>
                    <Button variant={filterStatus === "verified" ? "default" : "outline"} size="sm" onClick={() => setFilterStatus("verified")}>Verified</Button>
                    <Button variant={filterStatus === "pending" ? "default" : "outline"} size="sm" onClick={() => setFilterStatus("pending")}>Pending</Button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input placeholder="Search kitchens..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10 w-64" />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kitchen Name</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredKitchens.map((kitchen) => (
                    <TableRow key={kitchen.id}>
                      <TableCell className="font-medium">{kitchen.name}</TableCell>
                      <TableCell className="text-muted-foreground">{kitchen.owner}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-muted-foreground">
                          <MapPin className="h-4 w-4" />
                          <span className="text-sm">{kitchen.location}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Phone className="h-3 w-3" />
                            <span>{kitchen.phone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <Mail className="h-3 w-3" />
                            <span>{kitchen.email}</span>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant={kitchen.status === "verified" ? "secondary" : "outline"} className={kitchen.status === "verified" ? "bg-success/10 text-success hover:bg-success/20" : ""}>
                          {kitchen.status === "verified" ? "Verified" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="text-primary hover:text-primary" onClick={() => navigate(`/admin/kitchen/${kitchen.id}`)}>
                          View Details
                        </Button>
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

export default Kitchens;
