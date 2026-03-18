import { useReducedMotion } from "@/hooks/useReducedMotion";

export default function CrtOverlay() {
  const reducedMotion = useReducedMotion();

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9000]"
      aria-hidden="true"
    >
      {/* CRT texture overlay */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: "url('/assets/generated/crt-overlay.dim_2048x2048.png')",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          opacity: 0.04,
          mixBlendMode: "overlay",
        }}
      />

      {/* Scanlines */}
      <div
        className="absolute inset-0 crt-scanlines"
        style={{ opacity: 0.06 }}
      />

      {/* Vignette */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(0,0,0,0.55) 100%)",
        }}
      />

      {/* Flicker animation */}
      {!reducedMotion && (
        <div
          className="absolute inset-0 crt-flicker"
          style={{ opacity: 0.015 }}
        />
      )}
    </div>
  );
}
