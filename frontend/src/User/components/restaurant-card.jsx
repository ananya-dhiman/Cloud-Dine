import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function RestaurantCard({ href, title, subtitle, imgSrc, imgAlt }) {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="p-0">
        <img
          src={imgSrc || "/placeholder.svg"}
          alt={imgAlt}
          className="h-44 w-full object-cover"
        />
      </CardHeader>

      <CardContent className="p-4">
        <CardTitle className="text-base">{title}</CardTitle>
        <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button asChild variant="secondary" className="w-full">
          <Link to={href}>View Menu</Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
