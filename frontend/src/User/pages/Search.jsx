// import SearchResultItem from "../components/search-result-item"
// import {
//   Pagination,
//   PaginationContent,
//   PaginationItem,
//   PaginationLink,
//   PaginationNext,
//   PaginationPrevious,
//   PaginationEllipsis,
// } from "@/components/ui/pagination"
// import SiteHeader from "../components/site-header"
// export default function SearchPage() {
//   const results = [
//     {
//       href: "/kitchen/spice-merchant",
//       title: "The Spice Merchant",
//       description: "Authentic Indian cuisine with a focus on hygiene. Rated 4.5 stars.",
//       image: "/images/chicken-biryani-bowl.jpg",
//     },
//     {
//       href: "/kitchen/pasta-paradise",
//       title: "Pasta Paradise",
//       description: "Italian dishes made with fresh ingredients. Verified kitchen. Rated 4.2 stars.",
//       image: "/images/pasta.png",
//     },
//     {
//       href: "/kitchen/sushi-central",
//       title: "Sushi Central",
//       description: "Fresh sushi and Japanese cuisine. High hygiene standards. Rated 4.8 stars.",
//       image: "/images/sushi-assortment.png",
//     },
//     {
//       href: "/kitchen/burger-barn",
//       title: "Burger Barn",
//       description: "Gourmet burgers and sides. Verified for cleanliness. Rated 4.0 stars.",
//       image: "/images/burger1.png",
//     },
//   ]

//   const filters = ["Cuisine", "Location", "Price", "Rating", "Dietary"]

//   return (
//     <>
//        <SiteHeader/>
//     <main className="container mx-auto max-w-5xl px-4 py-10 md:py-12">
   
//       <header className="mb-6 md:mb-8">
//         <div className="relative">
//           <input
//             type="search"
//             placeholder="Search for kitchens or dishes"
//             aria-label="Search for kitchens or dishes"
//             className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm md:text-base outline-none ring-2 ring-transparent focus:ring-primary"
//           />
//           <span className="sr-only">Search</span>
//         </div>
//         <div className="mt-4 flex flex-wrap gap-2">
//           {filters.map((f) => (
//             <button
//               key={f}
//               type="button"
//               className="rounded-full border border-border bg-background px-3 py-1.5 text-xs md:text-sm text-foreground/80 hover:bg-muted"
//               aria-pressed="false"
//             >
//               {f}
//             </button>
//           ))}
//         </div>
//       </header>

//       <section aria-labelledby="results-heading" className="space-y-4 md:space-y-5">
//         <h2 id="results-heading" className="text-xl font-semibold text-foreground">
//           Search Results
//         </h2>
//         <div className="space-y-4 md:space-y-5">
//           {results.map((r) => (
//             <SearchResultItem key={r.title} {...r} />
//           ))}
//         </div>
//       </section>

//       <nav aria-label="Pagination" className="mt-8 flex justify-center">
//         <Pagination>
//           <PaginationContent>
//             <PaginationItem>
//               <PaginationPrevious href="#" />
//             </PaginationItem>
//             <PaginationItem>
//               <PaginationLink href="#" isActive>
//                 1
//               </PaginationLink>
//             </PaginationItem>
//             <PaginationItem>
//               <PaginationLink href="#">2</PaginationLink>
//             </PaginationItem>
//             <PaginationItem>
//               <PaginationLink href="#">3</PaginationLink>
//             </PaginationItem>
//             <PaginationItem>
//               <PaginationEllipsis />
//             </PaginationItem>
//             <PaginationItem>
//               <PaginationLink href="#">10</PaginationLink>
//             </PaginationItem>
//             <PaginationItem>
//               <PaginationNext href="#" />
//             </PaginationItem>
//           </PaginationContent>
//         </Pagination>
//       </nav>
//     </main>
//     </>
//   )
// }
import { useEffect, useState } from "react"
import SearchResultItem from "../components/search-result-item"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination"
import SiteHeader from "../components/site-header"

export default function SearchPage() {
  const [kitchens, setKitchens] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const idToken = localStorage.getItem("idToken")
        const res = await fetch(`${import.meta.env.VITE_API}/kitchens`, {
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        })
        const data = await res.json()
        console.log("Fetched kitchens:", data )
        setKitchens(data|| [])
      } catch (err) {
        console.log("Error fetching kitchens", err)
      }
      setLoading(false)
    }

    fetchKitchens()
  }, [])

  const filters = ["Cuisine", "Location", "Price", "Rating", "Dietary"]

  return (
    <>
      <SiteHeader />
      <main className="container mx-auto max-w-5xl px-4 py-10 md:py-12">

        <header className="mb-6 md:mb-8">
          <input
            type="search"
            placeholder="Search for kitchens or dishes"
            className="w-full rounded-xl border border-border bg-muted/30 px-4 py-3 text-sm md:text-base outline-none ring-2 ring-transparent focus:ring-primary"
          />

          <div className="mt-4 flex flex-wrap gap-2">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                className="rounded-full border border-border bg-background px-3 py-1.5 text-xs md:text-sm text-foreground/80 hover:bg-muted"
              >
                {f}
              </button>
            ))}
          </div>
        </header>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold text-foreground">Search Results</h2>

          {loading ? (
            <p className="text-muted-foreground">Loading kitchens...</p>
          ) : kitchens.length === 0 ? (
            <p className="text-muted-foreground">No kitchens found.</p>
          ) : (
            <div className="space-y-4">
              {kitchens.map((kitchen) => (
                <SearchResultItem
                  key={kitchen._id}
                  href={`/kitchen/${kitchen._id}`}
                  title={kitchen.name}
                  description={kitchen.notes || "No description available"}
                  image={
                          kitchen.photos?.adminVerified?.[0]?.url ||
                          kitchen.photos?.ownerSubmitted?.[0]?.url ||
                          "/images/default-restaurant.jpg"
                        }

                />
              ))}
            </div>
          )}
        </section>

        <nav aria-label="Pagination" className="mt-8 flex justify-center">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">10</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </nav>

      </main>
    </>
  )
}
