import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Search, Plus, Mail, Phone, MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

const initialUsersData = [
  { id: 1, name: "Hukum Chand", email: "hukum@example.com", phone: "+91 98765 43210", role: "kitchen_owner", status: "active", kitchens: 2, joinedDate: "1/3/2025" },
  { id: 2, name: "Rupa Kumar Naik", email: "rupa@example.com", phone: "+91 98765 43211", role: "kitchen_owner", status: "active", kitchens: 1, joinedDate: "15/2/2025" },
  { id: 3, name: "Sandeep Das", email: "sandeep@example.com", phone: "+91 98765 43212", role: "kitchen_owner", status: "active", kitchens: 1, joinedDate: "10/3/2025" },
  { id: 4, name: "Admin User", email: "admin@cloudflow.com", phone: "+91 98765 43213", role: "admin", status: "active", kitchens: 0, joinedDate: "1/1/2025" },
  { id: 5, name: "Krishna", email: "krishna@example.com", phone: "+91 98765 43214", role: "kitchen_owner", status: "active", kitchens: 1, joinedDate: "20/3/2025" },
  { id: 6, name: "Shri Ram", email: "ram@example.com", phone: "+91 98765 43215", role: "kitchen_owner", status: "inactive", kitchens: 1, joinedDate: "5/3/2025" },
  { id: 7, name: "Kumar Sarangi", email: "kumar@example.com", phone: "+91 98765 43216", role: "kitchen_owner", status: "active", kitchens: 1, joinedDate: "12/3/2025" },
];

const Users = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState("all");
  const [users, setUsers] = useState(initialUsersData);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    return matchesSearch && matchesRole;
  });

  const toggleUserStatus = (userId) => {
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "active" ? "inactive" : "active" }
          : user
      )
    );
    toast.success(`User ${userId} status updated`);
  };

  const deleteUser = (userId) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      setUsers((prev) => prev.filter((user) => user.id !== userId));
      toast.success(`User ${userId} deleted`);
    }
  };

  const getRoleDisplay = (role) => (role === "admin" ? "Admin" : "Kitchen Owner");
  const getInitials = (name) => name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2);

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <header className="border-b bg-card">
          <div className="flex h-16 items-center justify-between px-8">
            <h2 className="text-2xl font-bold">Users</h2>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add User
            </Button>
          </div>
        </header>
        <main className="p-8 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>User Management ({filteredUsers.length})</CardTitle>
                <div className="flex gap-4">
                  <div className="flex gap-2">
                    <Button variant={filterRole === "all" ? "default" : "outline"} size="sm" onClick={() => setFilterRole("all")}>All</Button>
                    <Button variant={filterRole === "admin" ? "default" : "outline"} size="sm" onClick={() => setFilterRole("admin")}>Admins</Button>
                    <Button variant={filterRole === "kitchen_owner" ? "default" : "outline"} size="sm" onClick={() => setFilterRole("kitchen_owner")}>Kitchen Owners</Button>
                  </div>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      placeholder="Search users..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64"
                    />
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>User</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Kitchens</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Joined</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <Avatar>
                            <AvatarFallback className="bg-primary/10 text-primary">{getInitials(user.name)}</AvatarFallback>
                          </Avatar>
                          <div><p className="font-medium">{user.name}</p></div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="space-y-1 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2"><Mail className="h-3 w-3" />{user.email}</div>
                          <div className="flex items-center gap-2"><Phone className="h-3 w-3" />{user.phone}</div>
                        </div>
                      </TableCell>
                      <TableCell><Badge variant="outline">{getRoleDisplay(user.role)}</Badge></TableCell>
                      <TableCell className="text-muted-foreground">{user.kitchens > 0 ? `${user.kitchens} kitchen${user.kitchens>1?'s':''}` : '-'}</TableCell>
                      <TableCell>
                        <Badge variant={user.status==="active"?"secondary":"outline"} className={user.status==="active"?"bg-success/10 text-success hover:bg-success/20":""}>
                          {user.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{user.joinedDate}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm"><MoreVertical className="h-4 w-4" /></Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => toast.info(`Edit user ${user.id}`)}>Edit User</DropdownMenuItem>
                            <DropdownMenuItem onClick={() => toggleUserStatus(user.id)}>
                              {user.status === "active" ? "Deactivate" : "Activate"}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive" onClick={() => deleteUser(user.id)}>Delete User</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
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

export default Users;
