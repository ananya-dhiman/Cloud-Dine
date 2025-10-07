import { Link } from "react-router-dom";

export default function SearchResultItem({ href, title, description, image }) {
  return (
    <Link
      to={href}
      className="block rounded-xl border border-border bg-card p-4 transition hover:shadow-sm"
      aria-label={`View ${title}`}
    >
      <div className="flex items-center gap-4 md:gap-6">
        <div className="flex-1 space-y-1">
          <h3 className="text-base md:text-lg font-medium text-foreground text-pretty">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground text-pretty">{description}</p>
        </div>
        <div className="shrink-0">
          <img
            src={image || "/placeholder.svg"}
            width={220}
            height={140}
            alt={`${title} preview`}
            className="h-[100px] w-[160px] md:h-[120px] md:w-[220px] rounded-lg object-cover"
          />
        </div>
      </div>
    </Link>
  );
}

