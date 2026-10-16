import { cn } from "@/lib/utils";

export function Monogram({ className }: { className?: string }) {
  return (
    <img src="/media/fjs-logo.png" alt="" aria-hidden="true" className={cn("h-10 w-auto object-contain", className)} />
  );
}

// The exact brand logo image (includes the FJS mark, brand name and tagline).
export function Logo({ withTagline = false, className }: { withTagline?: boolean; className?: string }) {
  return (
    <img
      src="/media/fjs-logo.png"
      alt="Fola Junk Syndicate — Made with love, charms and resin magic!"
      width={1536}
      height={1024}
      className={cn("w-auto object-contain animate-logo-reveal", withTagline ? "h-24" : "h-14", className)}
    />
  );
}
