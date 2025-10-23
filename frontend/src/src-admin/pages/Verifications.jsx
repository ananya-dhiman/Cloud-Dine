import React from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const allVerifications = [
  { id: 1, kitchenName: "Spice Garden", owner: "Hukum Chand", status: "pending", date: "7/5/2025" },
  { id: 2, kitchenName: "Kitchen Name", owner: "Rupa Kumar", status: "verified", date: "4/5/2025" },
  { id: 3, kitchenName: "Orient Heights", owner: "Shri Ram", status: "pending", date: "8/5/2025" },
  { id: 4, kitchenName: "Food Kitchen", owner: "Hukum Chand", status: "verified", date: "5/5/2025" },
  { id: 5, kitchenName: "The Great Leaf", owner: "Sandeep Das", status: "verified", date: "5/5/2025" },
];

const Verifications = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <header className="border-b bg-card">
          <div className="flex h-16 items-center justify-between px-8">
            <h2 className="text-2xl font-bold">Verifications</h2>
          </div>
        </header>

        <main className="p-8">
          <Card>
            <CardHeader>
              <CardTitle>All Verifications</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Kitchen Name</TableHead>
                    <TableHead>Owner</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {allVerifications.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">{item.kitchenName}</TableCell>
                      <TableCell className="text-muted-foreground">{item.owner}</TableCell>
                      <TableCell className="text-muted-foreground">{item.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={item.status === "verified" ? "secondary" : "outline"}
                          className={item.status === "verified" ? "bg-success/10 text-success hover:bg-success/20" : ""}
                        >
                          {item.status === "verified" ? "Verified" : "Pending"}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-primary hover:text-primary"
                          onClick={() => navigate(`/kitchen/${item.id}`)}
                        >
                          View
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

export default Verifications;
