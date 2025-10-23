// src/pages/KitchenVerification.jsx
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CheckCircle2, Upload } from "lucide-react";
import { toast } from "sonner";

const kitchenData = {
  name: "Spice Garden Kitchen",
  submittedInfo: {
    ownerName: "John Doe",
    address: "123 Main Street, Mumbai",
    contactNumber: "+91 98765 43210",
    email: "john@spicegarden.com"
  },
  photos: [
    "https://images.unsplash.com/photo-1556911220-bff31c812dba?w=400",
    "https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=400",
    "https://images.unsplash.com/photo-1565538810643-b5bdb714032a?w=400"
  ],
  checklist: [
    "Original documents are clean",
    "Food safety certificate is valid",
    "Kitchen has proper ventilation system",
    "Utensils and kitchen have proper sanitation"
  ]
};

const KitchenVerification = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleApprove = () => {
    toast.success("Kitchen verified successfully!");
    setTimeout(() => navigate("/admin/dashboard"), 1500); // updated to admin route
  };

  const handleReject = () => {
    toast.error("Kitchen verification rejected");
    setTimeout(() => navigate("/admin/dashboard"), 1500); // updated to admin route
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <header className="border-b bg-card">
          <div className="flex h-16 items-center justify-between px-8">
            <h2 className="text-2xl font-bold">Kitchen Verification</h2>
          </div>
        </header>

        <main className="p-8 space-y-6">
          {/* Submitted Info */}
          <Card>
            <CardHeader>
              <CardTitle>Submitted Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Owner Name</p>
                  <p className="text-base mt-1">{kitchenData.submittedInfo.ownerName}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Contact Number</p>
                  <p className="text-base mt-1">{kitchenData.submittedInfo.contactNumber}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Address</p>
                  <p className="text-base mt-1">{kitchenData.submittedInfo.address}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p className="text-base mt-1">{kitchenData.submittedInfo.email}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Kitchen Photos */}
          <Card>
            <CardHeader>
              <CardTitle>Kitchen Photos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-3 gap-4">
                {kitchenData.photos.map((photo, index) => (
                  <div key={index} className="aspect-video overflow-hidden rounded-lg border">
                    <img src={photo} alt={`Kitchen ${index + 1}`} className="h-full w-full object-cover" />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Verification Checklist */}
          <Card>
            <CardHeader>
              <CardTitle>Verification Checklist</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {kitchenData.checklist.map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <CheckCircle2 className="h-5 w-5 text-success" />
                    <span className="text-sm">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Verification Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Verification Notes</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea placeholder="Add any notes about this verification..." className="min-h-[100px]" />
            </CardContent>
          </Card>

          {/* Documents */}
          <div className="grid grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Additional Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">No additional documents</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upload Documents</CardTitle>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  <Upload className="mr-2 h-4 w-4" />
                  Browse Files
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-4 pt-4">
            <Button variant="outline" onClick={handleReject}>Reject</Button>
            <Button onClick={handleApprove}>Approve</Button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default KitchenVerification;
