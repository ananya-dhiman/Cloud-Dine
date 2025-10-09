export default function CartItem({ name, quantity, price, image }) {
  return (
    <div className="flex items-center justify-between py-3">
      <div className="flex items-center gap-4">
        <img
          src={image || "/images/burger1.png "}
          alt={`${name} thumbnail`}
          width={56}
          height={56}
          className="h-14 w-14 rounded-md object-cover"
        />
        <div>
          <p className="font-medium text-foreground">{name}</p>
          <p className="text-sm text-primary">Quantity: {quantity}</p>
        </div>
      </div>
      <div className="text-sm md:text-base text-foreground">${price}</div>
    </div>
  )
}
