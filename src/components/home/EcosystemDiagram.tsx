/**
 * The DPP ecosystem: six actor groups around one passport.
 * Pure inline SVG; labels passed in so the diagram is localised.
 */
export function EcosystemDiagram({ labels, centre }: { labels: string[]; centre: string }) {
  const W = 760, H = 560, cx = W / 2, cy = H / 2, R = 200;
  const nodes = labels.slice(0, 6).map((label, i) => {
    const a = -Math.PI / 2 + (i * Math.PI) / 3;
    return { label, x: cx + R * Math.cos(a), y: cy + R * Math.sin(a), i };
  });
  const colors = ["#003399", "#1E8A5A", "#003399", "#1E8A5A", "#003399", "#1E8A5A"];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`${centre}: ${labels.join(", ")}`} className="h-auto w-full">
      <defs>
        <marker id="arr" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M0 0L10 5L0 10z" fill="#8d97ab" />
        </marker>
      </defs>
      {/* lifecycle ring */}
      <circle cx={cx} cy={cy} r={R} fill="none" stroke="#d9dce3" strokeWidth="1.5" strokeDasharray="4 6" />
      {/* spokes */}
      {nodes.map((n) => (
        <line key={n.i} x1={cx} y1={cy} x2={n.x} y2={n.y} stroke="#c9cfd9" strokeWidth="1.5" markerEnd="url(#arr)" markerStart="url(#arr)" />
      ))}
      {/* arc arrows between neighbours: circular flow */}
      {nodes.map((n, i) => {
        const m = nodes[(i + 1) % 6];
        const a1 = Math.atan2(n.y - cy, n.x - cx) + 0.18, a2 = Math.atan2(m.y - cy, m.x - cx) - 0.18;
        const r2 = R + 46;
        return <path key={`arc${i}`} d={`M${cx + r2 * Math.cos(a1)} ${cy + r2 * Math.sin(a1)}A${r2} ${r2} 0 0 1 ${cx + r2 * Math.cos(a2)} ${cy + r2 * Math.sin(a2)}`} fill="none" stroke="#1E8A5A" strokeWidth="1.5" markerEnd="url(#arr)" opacity=".7" />;
      })}
      {/* centre passport */}
      <rect x={cx - 54} y={cy - 70} width="108" height="140" rx="12" fill="#003399" />
      {Array.from({ length: 12 }).map((_, k) => {
        const a = (k * Math.PI) / 6, sx = cx + 26 * Math.cos(a), sy = cy - 22 + 26 * Math.sin(a);
        return <circle key={k} cx={sx} cy={sy} r="2.6" fill="#FFCC00" />;
      })}
      <circle cx={cx} cy={cy - 22} r="9" fill="#1E8A5A" />
      <rect x={cx - 26} y={cy + 36} width="52" height="8" rx="4" fill="#1E8A5A" />
      <text x={cx} y={cy + 96} textAnchor="middle" fontSize="13" fontWeight="600" fill="#0B2B3A">{centre}</text>
      {/* actor nodes */}
      {nodes.map((n) => (
        <g key={`n${n.i}`}>
          <rect x={n.x - 78} y={n.y - 22} width="156" height="44" rx="22" fill="#fff" stroke={colors[n.i]} strokeWidth="1.5" />
          <circle cx={n.x - 58} cy={n.y} r="6" fill={colors[n.i]} />
          <text x={n.x + 4} y={n.y + 4.5} textAnchor="middle" fontSize="13" fontWeight="500" fill="#0B2B3A">{n.label}</text>
        </g>
      ))}
    </svg>
  );
}
