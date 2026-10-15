import { Check } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export function showCartToast(name: string, image: string | undefined, openCart: () => void) {
  toast.custom((id) => (
    <div className="cart-glass-toast flex w-full items-center gap-3 rounded-3xl border p-3" role="status">
      {image && <img src={image} alt="" className="h-12 w-10 shrink-0 rounded-xl object-cover" />}
      <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-success/15 text-success"><Check className="h-3.5 w-3.5" /></span>
      <div className="min-w-0 flex-1">
        <p className="break-words text-sm font-semibold">{name}</p>
        <p className="text-xs text-muted-foreground">Added to cart</p>
      </div>
      <Button variant="ghost" size="sm" className="shrink-0 rounded-full text-xs text-primary" onClick={() => { toast.dismiss(id); openCart(); }}>View Cart</Button>
    </div>
  ), { duration: 4500, position: "bottom-right" });
}