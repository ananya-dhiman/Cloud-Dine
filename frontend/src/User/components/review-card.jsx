import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

export default function ReviewCard({ name, date, content, avatar, stars = 5, className }) {
  return (
    <Card className={cn("border-muted", className)}>
      <CardContent className="space-y-3 p-4">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src={avatar || "/placeholder.svg"} alt={`${name} avatar`} />
            <AvatarFallback>{name.slice(0, 1)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium">{name}</p>
            <p className="text-xs text-muted-foreground">{date}</p>
          </div>
        </div>
        <div className="flex items-center gap-1" aria-label={`${stars} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <span
              key={i}
              className={cn("inline-block h-3 w-3 rounded-sm", i < stars ? "bg-primary" : "bg-secondary")}
            />
          ))}
        </div>
        <p className="text-sm leading-relaxed text-pretty">{content}</p>
      </CardContent>
    </Card>
  )
}
