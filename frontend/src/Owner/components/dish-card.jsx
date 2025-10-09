// import { Card } from "@/components/ui/card"

// export default function DishCard({ image,title, price, imgAlt }) {
//   return (
//     <Card className="overflow-hidden border border-(--color-border) bg-(--color-card)">
//       <img
//         src={image}
//         alt={imgAlt || title}
//         className="h-48 w-full object-cover"
//       />
//       <div className="space-y-1 p-3">
//         <p className="font-medium leading-tight">{title}</p>
//         <p className="text-sm text-(--color-muted-foreground)">₹ {price}</p>
//       </div>
//     </Card>
//   )
// }
import { Card } from "@/components/ui/card"

export default function DishCard({ image, title, price, imgAlt }) {
  return (
    <Card className="overflow-hidden border border-[var(--color-border)] bg-[var(--color-card)]">
      <img
        src={image}
        alt={imgAlt || title}
        className="h-48 w-full object-cover"
      />
      <div className="space-y-1 p-3">
        <p className="font-medium leading-tight">{title}</p>
        <p className="text-sm text-[var(--color-muted-foreground)]">₹ {price}</p>
      </div>
    </Card>
  )
}
