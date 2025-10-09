import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom"; // Use this if using React Router

export default function RoleCard({ title,imageQuery, description, loginHref, signupHref }) {
  return (
    <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
      <Card className="overflow-hidden bg-card text-card-foreground">
        <CardHeader className="space-y-1">
          <CardTitle className="text-balance text-2xl">{title}</CardTitle>
          <p className="text-sm text-muted-foreground">{description}</p>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="rounded-md overflow-hidden m-auto">
            <img
              src={imageQuery}
              alt={`${title} illustration for CloudDine`}
              className=" h-[300px] object-cover"
            />
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between gap-3">
          <Button asChild className="bg-primary text-primary-foreground hover:opacity-90">
            <Link to={loginHref}>Login</Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="border-primary text-primary hover:bg-accent hover:text-accent-foreground bg-transparent"
          >
            <Link to={signupHref}>Sign Up</Link>
          </Button>
        </CardFooter>
      </Card>
    </motion.div>
  );
}
