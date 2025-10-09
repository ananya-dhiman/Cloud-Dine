import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";


export default function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 w-full border-b bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
   

    <Link to="/" className="flex items-center gap-2">
      <img 
        src="/images/logo.png"
        alt="CloudKitchen Logo" 
        className="h-6 w-6 object-contain"  // tweak size as needed
      />
      <span className="font-semibold tracking-tight">CloudKitchen</span>
    </Link>


        <nav className="hidden gap-6 text-sm md:flex">
          <Link className="hover:underline" to="/">
            Home
          </Link>
          <Link className="hover:underline" to="/kitchen">
            Kitchens
          </Link>
          <Link className="hover:underline" to="#about">
            About
          </Link>
          <Link className="hover:underline" to="#contact">
            Contact
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <Button asChild size="sm" className="rounded-md">
            <Link to="/cart">Order Now</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
