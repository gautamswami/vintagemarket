export default function Grain() {
  return (
    <svg className="grain" aria-hidden="true">
      <filter id="yard-grain">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.85"
          numOctaves="2"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#yard-grain)" />
    </svg>
  );
}
