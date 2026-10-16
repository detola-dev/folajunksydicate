import { toast } from "sonner";
import { Check } from "lucide-react";

export function showAddedToast(opts: { name: string; image?: string; onView: () => void }) {
  toast.custom(
    (id) => (
      <div className="flex w-[min(92vw,360px)] items-center gap-3 rounded-3xl border border-border/60 bg-card/70 p-2.5 pr-3 shadow-soft backdrop-blur-xl">
        {opts.image ? (
          <img src={opts.image} alt="" className="h-11 w-11 shrink-0 rounded-2xl object-cover" />
        ) : (
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-2xl bg-blush" />
        )}
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1.5 text-xs font-semibold text-primary">
            <span className="grid h-4 w-4 place-items-center rounded-full bg-primary text-primary-foreground"><Check className="h-2.5 w-2.5" /></span>
            Added to cart
          </p>
          <p className="truncate text-sm font-semibold">{opts.name}</p>
        </div>
        <button
          type="button"
          onClick={() => { toast.dismiss(id); opts.onView(); }}
          className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold text-rose hover:bg-secondary"
        >
          View Cart
        </button>
      </div>
    ),
    { duration: 3000, unstyled: true },
  );
}
