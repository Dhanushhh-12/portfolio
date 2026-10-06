import { GridPulse } from "@/components/ui/grid-pulse";

export function GridPulseDemo() {
  return (
    <section className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-background">
      <GridPulse className="[mask-image:none]" />
    </section>
  );
}

export default GridPulseDemo;
