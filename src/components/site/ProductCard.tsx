import { useState } from "react";
import { Minus, Plus, Sparkles } from "lucide-react";
import { toast } from "sonner";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MediaGallery } from "./MediaGallery";
import { useCart } from "@/lib/cart";
import { STOCK_STATUSES, canOrder, categoryLabel, naira, type Product } from "@/lib/store";
import { cn } from "@/lib/utils";

export function StockBadge({ status }: { status: Product["stock_status"] }) {
  return (
    <span
      className={cn(
        "rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider",
        status === "sold_out" ? "bg-foreground text-background" : status === "in_stock" ? "bg-card text-success" : "bg-card text-primary",
      )}
    >
      {STOCK_STATUSES[status]}
    </span>
  );
}

export function PriceLabel({ p, className }: { p: Product; className?: string }) {
  return (
    <span className={cn("font-semibold text-rose", className)}>
      {p.price_is_starting ? `Starting from ${naira(p.price)}` : naira(p.price)}
    </span>
  );
}

export function ProductCard({ product }: { product: Product }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <article className="group overflow-hidden rounded-2xl border bg-card transition-shadow hover:shadow-soft">
        <div className="relative">
          <MediaGallery media={product.media} alt={product.name} controls />
          <div className="pointer-events-none absolute left-3 top-3">
            <StockBadge status={product.stock_status} />
          </div>
        </div>
        <button type="button" onClick={() => setOpen(true)} className="block w-full p-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{categoryLabel(product.category)}</p>
          <h3 className="mt-1 text-xl font-semibold">{product.name}</h3>
          <div className="mt-2 flex items-center justify-between gap-2">
            <PriceLabel p={product} />
            <span className="text-xs font-semibold text-primary underline-offset-4 group-hover:underline">View details</span>
          </div>
        </button>
      </article>
      <ProductDialog product={product} open={open} onOpenChange={setOpen} />
    </>
  );
}

function ProductDialog({ product, open, onOpenChange }: { product: Product; open: boolean; onOpenChange: (v: boolean) => void }) {
  const cart = useCart();
  const [variant, setVariant] = useState(product.variants[0] ?? "");
  const [device, setDevice] = useState(product.devices[0] ?? "");
  const [qty, setQty] = useState(1);
  const orderable = canOrder(product);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[92vh] max-w-3xl overflow-y-auto p-0 sm:rounded-2xl">
        <div className="grid sm:grid-cols-2">
          <MediaGallery media={product.media} alt={product.name} className="sm:rounded-l-2xl" />
          <div className="flex flex-col gap-4 p-6">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-muted-foreground">{categoryLabel(product.category)}</p>
              <DialogTitle className="mt-1 font-display text-3xl font-semibold">{product.name}</DialogTitle>
              <div className="mt-2 flex items-center gap-2">
                <PriceLabel p={product} className="text-lg" />
                <StockBadge status={product.stock_status} />
              </div>
              {product.price_note && <p className="mt-2 rounded-xl bg-secondary p-3 text-sm text-secondary-foreground">{product.price_note}</p>}
            </div>
            <DialogDescription className="text-sm leading-relaxed text-muted-foreground">{product.description}</DialogDescription>
            {product.notes && <p className="text-sm text-muted-foreground">{product.notes}</p>}

            {product.variants.length > 0 && (
              <OptionGroup label="Colour / design" options={product.variants} value={variant} onChange={setVariant} />
            )}
            {product.devices.length > 0 && <OptionGroup label="Device" options={product.devices} value={device} onChange={setDevice} />}

            <div className="mt-auto flex items-center gap-3">
              <div className="flex items-center rounded-full border">
                <button type="button" aria-label="Decrease quantity" className="grid h-10 w-10 place-items-center" onClick={() => setQty((q) => Math.max(1, q - 1))}>
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-6 text-center font-semibold" aria-live="polite">{qty}</span>
                <button type="button" aria-label="Increase quantity" className="grid h-10 w-10 place-items-center" onClick={() => setQty((q) => Math.min(99, q + 1))}>
                  <Plus className="h-4 w-4" />
                </button>
              </div>
              <Button
                className="h-11 flex-1 rounded-full"
                disabled={!orderable}
                onClick={() => {
                  cart.add({ productId: product.id, name: product.name, price: product.price, image: product.media.find((m) => m.type === "image")?.url ?? product.media[0]?.poster, variant, device }, qty);
                  toast.success(`${product.name} added to your bag`);
                  onOpenChange(false);
                  cart.setOpen(true);
                }}
              >
                <Sparkles className="h-4 w-4" />
                {orderable ? "Add to bag" : "Sold out"}
              </Button>
            </div>
            {product.price_is_starting && orderable && (
              <p className="text-xs text-muted-foreground">Your bag shows the starting price; the final price for your style and device is confirmed on WhatsApp.</p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function OptionGroup({ label, options, value, onChange }: { label: string; options: string[]; value: string; onChange: (v: string) => void }) {
  return (
    <fieldset>
      <legend className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <button key={o} type="button" aria-pressed={value === o} onClick={() => onChange(o)} className={cn("rounded-full border px-3 py-1.5 text-sm transition-colors", value === o ? "border-primary bg-primary text-primary-foreground" : "hover:bg-secondary")}>
            {o}
          </button>
        ))}
      </div>
    </fieldset>
  );
}
