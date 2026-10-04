import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  DATA, SUBMETER, STATUS, PHASES, PROJECTS, GATES, projectEconomics, cohortLadder,
  number, money, compactRp,
} from "./data";
import * as SIM from "./sim";
import "./styles.css";

const Icons = {
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1.5" />
      <rect x="14" y="3" width="7" height="7" rx="1.5" />
      <rect x="3" y="14" width="7" height="7" rx="1.5" />
      <rect x="14" y="14" width="7" height="7" rx="1.5" />
    </>
  ),
  gear: (
    <>
      <circle cx="12" cy="12" r="3.2" />
      <path d="M12 3.5v2.4M12 18.1v2.4M20.5 12h-2.4M5.9 12H3.5M17.7 6.3l-1.7 1.7M8 16l-1.7 1.7M17.7 17.7 16 16M8 8 6.3 6.3" />
    </>
  ),
  cloud: (
    <>
      <path d="M7.5 18h10a4 4 0 0 0 .7-7.94 5.5 5.5 0 0 0-10.6-1.9A4.5 4.5 0 0 0 7.5 18Z" />
    </>
  ),
  bank: (
    <>
      <path d="M4 10h16M5 10v8M9.5 10v8M14.5 10v8M19 10v8M3 20h18M12 3l9 5H3l9-5Z" />
    </>
  ),
  leaf: (
    <>
      <path d="M6 20c8 0 12-6 12-15C9 5 5 10 5 15c0 2 .4 3.6 1 5Z" />
      <path d="M6 20c1.5-4.5 4.5-8 11-11.5" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3.5 20c.6-3.2 2.4-5 5.5-5s4.9 1.8 5.5 5M14 15.5c2.9-.8 5.7.5 6.5 3.8" />
    </>
  ),
  database: (
    <>
      <ellipse cx="12" cy="5.5" rx="7.5" ry="2.8" />
      <path d="M4.5 5.5V12c0 1.5 3.4 2.8 7.5 2.8S19.5 13.5 19.5 12V5.5" />
      <path d="M4.5 12v6.5c0 1.5 3.4 2.8 7.5 2.8s7.5-1.3 7.5-2.8V12" />
    </>
  ),
  dollar: (
    <>
      <path d="M12 3v18" />
      <path d="M16.5 7.2c0-1.8-2-2.7-4.5-2.7s-4.5 1-4.5 2.9c0 3.8 9 1.8 9 5.6 0 2-2.2 2.9-4.5 2.9s-4.7-.9-4.7-2.8" />
    </>
  ),
  warning: (
    <>
      <path d="m12 3 9 16H3l9-16Z" />
      <path d="M12 10v4" />
      <circle cx="12" cy="17" r=".6" fill="currentColor" stroke="none" />
    </>
  ),
  shield: (
    <>
      <path d="m12 3 7 3v5c0 4.6-2.8 8.3-7 10-4.2-1.7-7-5.4-7-10V6l7-3Z" />
      <path d="m8.7 12 2.2 2.2 4.6-4.8" />
    </>
  ),
  chevron: <path d="m9 6 6 6-6 6" />,
  chevronDown: <path d="m6 9 6 6 6-6" />,
  close: (
    <>
      <path d="m6 6 12 12M18 6 6 18" />
    </>
  ),
  arrow: (
    <>
      <path d="M5 12h13M13 6l6 6-6 6" />
    </>
  ),
  arrowUp: <path d="M12 19V5M6 11l6-6 6 6" />,
  arrowDown: <path d="M12 5v14M6 13l6 6 6-6" />,
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5M12 8v.01" />
    </>
  ),
  kebab: (
    <>
      <circle cx="12" cy="5" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="12" r="1.1" fill="currentColor" stroke="none" />
      <circle cx="12" cy="19" r="1.1" fill="currentColor" stroke="none" />
    </>
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20c1-4 3.8-6 7.5-6s6.5 2 7.5 6" />
    </>
  ),
  factory: (
    <>
      <path d="M4 21V10l5 3V10l5 3V10l5 3v8H4Z" />
      <path d="M8 21v-4M13 21v-4M18 21v-4" />
    </>
  ),
  bolt: <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />,
  share: (
    <>
      <circle cx="6" cy="12" r="2.3" />
      <circle cx="18" cy="6" r="2.3" />
      <circle cx="18" cy="18" r="2.3" />
      <path d="M8.1 10.8 15.9 7.2M8.1 13.2l7.8 3.6" />
    </>
  ),
  certificate: (
    <>
      <circle cx="12" cy="8" r="5" />
      <path d="m9 12.5-1.5 7L12 17l4.5 2.5-1.5-7" />
      <path d="m9.3 8 1.8 1.8L14.7 6" />
    </>
  ),
  briefcase: (
    <>
      <rect x="3.5" y="8" width="17" height="11" rx="2" />
      <path d="M8.5 8V6a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v2" />
      <path d="M3.5 13h17" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="8" />
      <circle cx="12" cy="12" r="4.2" />
      <circle cx="12" cy="12" r=".6" fill="currentColor" stroke="none" />
    </>
  ),
  coins: (
    <>
      <ellipse cx="12" cy="6" rx="7" ry="2.6" />
      <path d="M5 6v5c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6V6" />
      <path d="M5 11v5c0 1.4 3.1 2.6 7 2.6s7-1.2 7-2.6v-5" />
    </>
  ),
  trend: (
    <>
      <path d="M4 17 10 11l4 4 6-7" />
      <path d="M17 8h3v3" />
    </>
  ),
  checkCircle: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m8 12.5 2.5 2.5L16 9.5" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  link: (
    <>
      <path d="M9 15 15 9" />
      <path d="M10.5 7.5 12 6a3.5 3.5 0 0 1 5 5l-1.5 1.5" />
      <path d="M13.5 16.5 12 18a3.5 3.5 0 0 1-5-5l1.5-1.5" />
    </>
  ),
  star: <path d="m12 3 2.6 5.6 6.2.6-4.6 4.2 1.3 6.1L12 16.8 6.5 19.5l1.3-6.1L3.2 9.2l6.2-.6Z" fill="currentColor" stroke="none" />,
};

function Icon({ name, size = 18 }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {Icons[name]}
    </svg>
  );
}

const nav = [
  { id: "dashboard", label: "Dashboard", icon: "grid", key: "1" },
  { id: "shared", label: "Shared Value Engine", icon: "gear", key: "2" },
  { id: "carbon", label: "Carbon Intelligence", icon: "cloud", key: "3" },
  { id: "governance", label: "Governance", icon: "bank", key: "4" },
];

function LiveToggle({ live, onToggle }) {
  return (
    <button
      className={`live-toggle ${live ? "is-live" : ""}`}
      onClick={onToggle}
      aria-pressed={live}
      aria-label="Ganti mode Hari Ini atau Dengan VALUE360"
      title="Tekan Space untuk beralih mode"
    >
      <span className="live-toggle-track">
        <span className="live-toggle-thumb" />
      </span>
      {live ? "DENGAN VALUE360" : "HARI INI"}
    </button>
  );
}

function Dropdown({ value, options, onChange, className = "select-pill" }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!open) return undefined;
    const onDoc = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("mousedown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);
  const current = options.find((o) => o.id === value) || options[0];
  return (
    <div className="dropdown" ref={ref} data-open={open}>
      <button
        type="button"
        className={className}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="listbox"
        aria-expanded={open}
      >
        {current.label}
        <Icon name="chevronDown" size={13} />
      </button>
      {open && (
        <div className="dropdown-menu" role="listbox">
          {options.map((o) => (
            <button
              key={o.id}
              type="button"
              className={`dropdown-item ${o.id === value ? "active" : ""}`}
              role="option"
              aria-selected={o.id === value}
              onClick={() => {
                onChange(o.id);
                setOpen(false);
              }}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function Sidebar({ active, onChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <span className="logo-mark">
          <Icon name="leaf" size={19} />
        </span>
        <div className="logo-text">
          <strong>ISTW</strong>
          <span>VALUE360</span>
        </div>
      </div>
      <nav aria-label="Navigasi utama">
        {nav.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${active === item.id ? "active" : ""}`}
            onClick={() => onChange(item.id)}
            aria-current={active === item.id ? "page" : undefined}
          >
            <Icon name={item.icon} size={19} />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <button className="user-chip">
          <span className="user-avatar">
            <Icon name="user" size={17} />
          </span>
          <span className="user-text">
            <strong>Super Admin</strong>
            <small>Admin ISTW</small>
          </span>
          <Icon name="chevronDown" size={15} />
        </button>
      </div>
    </aside>
  );
}

function Header({ active, period, onPeriodChange, live, onLiveToggle }) {
  const current = nav.find((item) => item.id === active);
  return (
    <header className="topbar">
      <div className="topbar-left">
        <span className="topbar-brand">
          <Icon name="leaf" size={16} />
        </span>
        <h1>{current.label}</h1>
      </div>
      <div className="top-actions">
        <LiveToggle live={live} onToggle={onLiveToggle} />
        <Dropdown
          className="quarter-pill"
          value={period}
          options={DATA.dashboard.periods}
          onChange={onPeriodChange}
        />
      </div>
    </header>
  );
}

// Label asal-usul angka. Inilah yang membuat tingkat kepercayaan terlihat,
// bukan hanya nilainya.
function StatusBadge({ status }) {
  const s = STATUS[status];
  if (!s) return null;
  return (
    <span className={`status-badge tone-${s.tone}`} title={s.hint}>
      {s.label}
    </span>
  );
}

function KpiCard({ icon, label, value, unit, sub, status, empty, children }) {
  return (
    <article className="kpi-card">
      <span className="kpi-icon">
        <Icon name={icon} size={19} />
      </span>
      <div className="kpi-label">
        {label}
        <StatusBadge status={status} />
      </div>
      <div className={`kpi-value ${empty ? "is-empty" : ""}`}>
        <span>{value}</span>
        {unit && <small>{unit}</small>}
      </div>
      {sub && <div className="kpi-sub">{sub}</div>}
      <div className="kpi-footer">{children}</div>
    </article>
  );
}

function TrendRow({ dir, trend, note }) {
  return (
    <div className="kpi-trend">
      <Icon name={dir === "up" ? "arrowUp" : "arrowDown"} size={12} />
      {trend}
      <span>{note}</span>
    </div>
  );
}

function DashboardKpis({ kpi }) {
  const { social, carbon, dataQuality, financial, risk } = kpi;
  const riskTone = risk.barPercent >= 90 ? "" : risk.barPercent >= 65 ? "tone-amber" : "tone-red";
  return (
    <div className="kpi-grid">
      <KpiCard icon={social.icon} label={social.label} value={social.value} sub={social.sub} status={social.status} empty={social.empty}>
        {social.trend ? (
          <TrendRow dir={social.trendDir} trend={social.trend} note={social.trendNote} />
        ) : (
          <div className="kpi-note">{social.note}</div>
        )}
      </KpiCard>
      <KpiCard icon={carbon.icon} label={carbon.label} value={carbon.value} unit={carbon.unit} status={carbon.status} empty={carbon.empty}>
        {carbon.trend ? (
          <TrendRow dir={carbon.trendDir} trend={carbon.trend} note={carbon.trendNote} />
        ) : (
          <div className="kpi-note">{carbon.note}</div>
        )}
      </KpiCard>
      <KpiCard icon={dataQuality.icon} label={dataQuality.label} value={dataQuality.value} unit={dataQuality.unit} status={dataQuality.status}>
        <div className="kpi-progress">
          <span className="bar">
            <i style={{ width: `${dataQuality.percent}%` }} />
          </span>
          <b>{dataQuality.percent}%</b>
        </div>
        <div className="kpi-note">{dataQuality.note}</div>
      </KpiCard>
      <KpiCard icon={financial.icon} label={financial.label} value={financial.value} unit={financial.unit} sub={financial.sub} status={financial.status} empty={financial.empty}>
        {financial.trend ? (
          <TrendRow dir={financial.trendDir} trend={financial.trend} note={financial.trendNote} />
        ) : (
          <div className="kpi-note">{financial.note}</div>
        )}
      </KpiCard>
      <KpiCard icon={risk.icon} label={risk.label} value={risk.value} sub={risk.sub}>
        <div className="kpi-risk-bar">
          <i className={riskTone} style={{ width: `${risk.barPercent}%` }} />
        </div>
        <div className="kpi-note">{risk.note}</div>
      </KpiCard>
    </div>
  );
}

function EmissionChart({ points, unit }) {
  const isPct = unit === "pct";
  const baseline = points[0].value;
  const displayValue = (v) => (isPct ? (v / baseline) * 100 : v);
  const values = points.map((p) => displayValue(p.value));
  // Skala diturunkan dari data, bukan konstanta — supaya tetap benar kalau
  // baseline atau lintasannya berubah.
  const rawStep = isPct ? 10 : 500;
  const maxVal = isPct ? 100 : Math.ceil(Math.max(...values) / rawStep) * rawStep + rawStep;
  const minVal = isPct
    ? Math.floor(Math.min(...values) / 10) * 10 - 10
    : Math.floor(Math.min(...values) / rawStep) * rawStep - rawStep;
  const step = isPct ? 10 : Math.max(rawStep, Math.round((maxVal - minVal) / 6 / rawStep) * rawStep);
  const ticks = [];
  for (let t = maxVal; t >= minVal; t -= step) ticks.push(Math.round(t));
  const left = 66;
  const right = 690;
  const top = 26;
  const bottom = 222;
  const yFor = (v) => bottom - ((v - minVal) / (maxVal - minVal)) * (bottom - top);
  const xFor = (i) => left + (i * (right - left)) / (points.length - 1);
  const fmt = (v) => (isPct ? `${number(v, 1)}%` : number(v, 0));
  const linePath = points.map((p, i) => `${i === 0 ? "M" : "L"}${xFor(i)},${yFor(displayValue(p.value))}`).join(" ");
  const areaPath = `${linePath} L${xFor(points.length - 1)},${bottom} L${xFor(0)},${bottom} Z`;
  return (
    <>
      <svg className="emission-svg" viewBox="0 0 700 250" preserveAspectRatio="none" role="img" aria-label="Tren emisi Scope 1+2 2024-2027">
        <defs>
          <linearGradient id="emissionArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#2f8f5c" stopOpacity=".16" />
            <stop offset="1" stopColor="#2f8f5c" stopOpacity="0" />
          </linearGradient>
        </defs>
        {ticks.map((t) => (
          <g key={t}>
            <line className="grid-line" x1={left} x2={right} y1={yFor(t)} y2={yFor(t)} />
            <text className="axis-text" x={0} y={yFor(t) + 3}>
              {isPct ? `${t}%` : number(t, 0)}
            </text>
          </g>
        ))}
        <text className="axis-text" x={0} y={12}>{isPct ? "%" : "tCO2e"}</text>
        <path d={areaPath} fill="url(#emissionArea)" />
        <path className="trend-line" d={linePath} />
        {points.map((p, i) => (
          <g key={p.year}>
            <text className="value-label" x={xFor(i)} y={yFor(displayValue(p.value)) - 14}>
              {fmt(displayValue(p.value))}
            </text>
            <circle className="trend-point" cx={xFor(i)} cy={yFor(displayValue(p.value))} r="5" />
          </g>
        ))}
      </svg>
      <div className="x-axis-labels">
        {points.map((p, i) => (
          <div
            className="x-axis-label"
            key={p.year}
            style={{ left: `${(xFor(i) / 700) * 100}%` }}
          >
            <strong>{p.year}</strong>
            <small>{p.label}</small>
          </div>
        ))}
      </div>
    </>
  );
}

const EMISSION_UNIT_OPTIONS = [
  { id: "abs", label: "tCO2e" },
  { id: "pct", label: "% vs Baseline" },
];

function EmissionCard({ period }) {
  const trend = DATA.dashboard.emissionTrend;
  const cur = DATA.dashboard.byPeriod[period];
  const [unit, setUnit] = useState("abs");
  const points = trend.byPhase[period];
  const deltaPct = ((trend.baseline - cur.emission.value) / trend.baseline) * 100;
  return (
    <section className="surface chart-card">
      <div className="card-head">
        <div className="card-title">
          {trend.title}
          <Icon name="info" size={14} />
        </div>
        <div className="card-actions">
          <Dropdown value={unit} options={EMISSION_UNIT_OPTIONS} onChange={setUnit} />
          <button className="kebab-btn" aria-label="Opsi lainnya">
            <Icon name="kebab" size={16} />
          </button>
        </div>
      </div>
      <EmissionChart points={points} unit={unit} />
      <div className="chart-legend">
        <span className="legend-swatch">
          <i /> {trend.legend}
        </span>
        {deltaPct >= 0.05 ? (
          <span className="delta-pill">
            <Icon name="arrowDown" size={12} /> {number(deltaPct, 1)}% vs Baseline 2024
          </span>
        ) : (
          <span className="delta-pill is-flat">Baseline belum bergerak</span>
        )}
      </div>
    </section>
  );
}

const FUNNEL_COLORS = ["#123a26", "#1c6c46", "#2f8f5c", "#63b686", "#a3d7bd"];
const FUNNEL_INSETS = [0, 3, 7, 13, 20, 28];
const FUNNEL_MODE_OPTIONS = [
  { id: "count", label: "Jumlah Proyek" },
  { id: "money", label: "Nilai Investasi" },
];

// Daftar proyek yang sedang berada di satu gerbang.
function GateProjects({ phase, gate, onPick, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  if (!gate) return null;
  const stage = DATA.dashboard.byPeriod[phase].funnel.stages.find((x) => x.gate === gate.id);
  const named = PROJECTS[phase].filter((pr) => pr.gate === gate.id);
  const sisa = (stage ? stage.value : 0) - named.length;
  return (
    <div className="drawer-backdrop" onMouseDown={onClose}>
      <aside className="drawer" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-label={`Proyek di ${gate.id}`}>
        <div className="drawer-head">
          <div>
            <span className="eyebrow">Gerbang {gate.id}</span>
            <h2>{gate.nama}</h2>
          </div>
          <button className="kebab-btn" onClick={onClose} aria-label="Tutup">
            <Icon name="close" size={17} />
          </button>
        </div>
        <div className="drawer-section">
          <p className="drawer-note" style={{ marginTop: 0 }}>
            <b>{gate.tanya}</b>
            <br />
            Bukti yang dituntut: {gate.bukti}.
          </p>
        </div>
        <div className="drawer-section">
          <div className="card-title">{stage ? stage.value : 0} proyek di gerbang ini</div>
          {named.length === 0 ? (
            <div className="pending-block">
              <strong>Belum ada proyek yang sampai di sini</strong>
              <p>Pada fase ini, belum ada kandidat yang memenuhi bukti untuk {gate.id}.</p>
            </div>
          ) : (
            <ul className="gate-proj-list">
              {named.map((pr) => {
                const e = projectEconomics(pr);
                return (
                  <li key={pr.id}>
                    <button onClick={() => onPick(pr)}>
                      <div>
                        <strong>{pr.nama}</strong>
                        <small>{pr.id} · {pr.titik}</small>
                      </div>
                      <span className="gate-proj-num">
                        {pr.diagnostic ? "diagnostik" : `${number(e.payback, 1)} th payback`}
                      </span>
                      <Icon name="chevron" size={15} />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
          {sisa > 0 && <p className="drawer-note">dan {sisa} kandidat lain yang belum diberi nama.</p>}
        </div>
      </aside>
    </div>
  );
}

function StageFunnelCard({ period }) {
  const funnel = DATA.dashboard.byPeriod[period].funnel;
  const [mode, setMode] = useState("count");
  const [openGate, setOpenGate] = useState(null);
  const [openProject, setOpenProject] = useState(null);
  const isMoney = mode === "money";
  const totalInvestasi = funnel.stages.reduce((a, s) => a + s.investasi, 0);
  return (
    <section className="surface funnel-card">
      <div className="card-head">
        <div className="card-title">
          {DATA.dashboard.funnelTitle}
          <Icon name="info" size={14} />
        </div>
        <Dropdown value={mode} options={FUNNEL_MODE_OPTIONS} onChange={setMode} />
      </div>
      <div className="funnel">
        {funnel.stages.map((stage, i) => {
          const top = FUNNEL_INSETS[i];
          const bottomInset = FUNNEL_INSETS[i + 1];
          const display = isMoney ? `Rp ${number(stage.investasi, 1)} M` : stage.value;
          // Porsi terhadap total, bukan jumlah mentahnya — 24 dari 65 proyek
          // adalah 37%, bukan 24%.
          const percent = isMoney
            ? Math.round((stage.investasi / totalInvestasi) * 100)
            : Math.round((stage.value / funnel.total) * 100);
          return (
            <div
              className="funnel-row is-clickable"
              key={stage.gate}
              role="button"
              tabIndex={0}
              onClick={() => setOpenGate(GATES.find((g) => g.id === stage.gate))}
              onKeyDown={(ev) => ev.key === "Enter" && setOpenGate(GATES.find((g) => g.id === stage.gate))}
            >
              <div className="funnel-label">
                <i style={{ background: FUNNEL_COLORS[i] }} />
                <div>
                  <strong>{stage.gate}</strong>
                  <small>{stage.label}</small>
                </div>
              </div>
              <div
                className="funnel-shape"
                style={{
                  background: FUNNEL_COLORS[i],
                  clipPath: `polygon(${top}% 0, ${100 - top}% 0, ${100 - bottomInset}% 100%, ${bottomInset}% 100%)`,
                }}
              >
                {display}
              </div>
              <div className="funnel-percent">{percent}%</div>
            </div>
          );
        })}
      </div>
      <div className="funnel-total">
        <span>{isMoney ? "Total Investasi" : "Total Proyek"}</span>
        <b>{isMoney ? `Rp ${number(totalInvestasi, 1)} M` : `${funnel.total} Proyek`}</b>
      </div>
      <p className="hbar-foot">Klik salah satu gerbang untuk melihat proyek yang ada di dalamnya.</p>
      <GateProjects
        phase={period}
        gate={openGate}
        onPick={(pr) => {
          setOpenGate(null);
          setOpenProject(pr);
        }}
        onClose={() => setOpenGate(null)}
      />
      <ProjectDrawer project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}

function Dashboard({ live, period, onSelect }) {
  const phaseInfo = PHASES.find((f) => f.id === period) || PHASES[0];
  if (!live) {
    return (
      <div className="page page-dashboard">
        <div className="page-intro">
          <div>
            <span className="eyebrow">{phaseInfo.long} · {DATA.meta.plant}</span>
            <p>Register ada. Meteran per titik belum ada. Inilah kondisi ISTW hari ini.</p>
          </div>
        </div>
        <div className="surface" style={{ padding: 40 }}>
          <EmptyState />
        </div>
        <div className="signal-strip">
          <span className="signal-mark">01</span>
          <div>
            <b>THE VALUE360 SIGNAL</b>
            <p>Satu sumber kebenaran untuk membuat konsumsi per titik terlihat.</p>
          </div>
          <button onClick={() => onSelect("carbon")}>
            Buka Carbon Intelligence <Icon name="arrow" size={16} />
          </button>
        </div>
      </div>
    );
  }
  const kpi = DATA.dashboard.byPeriod[period].kpi;
  return (
    <div className="page page-dashboard">
      <DashboardKpis kpi={kpi} />
      <div className="dashboard-grid">
        <EmissionCard period={period} />
        <StageFunnelCard period={period} />
      </div>
    </div>
  );
}

function EmptyState() {
  return (
    <div className="empty-state">
      <span className="empty-icon">?</span>
      <strong>Data konsumsi belum tersedia</strong>
      <p>Belum dapat diperingkat — data konsumsi per titik belum tersedia.</p>
      <small>Sub-metering 90 hari pertama menjadi gerbang pembuktian.</small>
    </div>
  );
}

function ScopeGrid({ phase }) {
  const { scopes } = DATA.carbonIntelligence.byPhase[phase];
  return (
    <div className="ci-scope-grid">
      {scopes.map((s) => (
        <article className="surface ci-scope-card" key={s.label}>
          {s.priority && (
            <span className="priority-pill">
              <Icon name="star" size={11} /> PRIORITAS
            </span>
          )}
          <div className="ci-scope-head">
            <span className="kpi-icon">
              <Icon name={s.icon} size={19} />
            </span>
            <span>{s.label}</span>
          </div>
          <div className="ci-scope-value">
            <span>{s.value}</span>
            {s.unit && <small>{s.unit}</small>}
          </div>
          {s.sub && <div className="ci-scope-sub">{s.sub}</div>}
          <StatusBadge status={s.status} />
          <div className="ci-scope-divider">
            <span className={`ci-scope-percent ${s.percent === "-" || s.percent === "—" ? "muted" : ""}`}>{s.percent}</span>
            <span className="ci-scope-note">{s.note}</span>
          </div>
        </article>
      ))}
    </div>
  );
}

const HOTSPOT_UNIT_OPTIONS = [
  { id: "kwh", label: "kWh" },
  { id: "tco2e", label: "tCO2e" },
];

function HotspotBarChart({ phase }) {
  const ci = DATA.carbonIntelligence;
  const { areas, areasNote } = ci.byPhase[phase];
  const [unitId, setUnitId] = useState("kwh");
  const unit = ci.hotspotUnits[unitId];
  const valueFor = (kwh) => (unitId === "tco2e" ? (kwh * ci.co2Factor) / 1000 : kwh);
  // Skala diturunkan dari data, bukan dikunci, supaya tetap benar saat fase berganti.
  const peak = Math.max(...areas.map((a) => valueFor(a.kwh)));
  const step = Math.pow(10, Math.floor(Math.log10(peak))) / 2;
  const axisMax = Math.ceil(peak / step) * step;
  const ticks = [];
  for (let i = 0; i <= 5; i += 1) ticks.push((axisMax / 5) * i);
  const fmt = (v) => (unitId === "tco2e" ? number(v, 1) : number(v, 0));
  return (
    <section className="surface hbar-card">
      <div className="card-head">
        <div className="card-title">
          Electricity Hotspot per Area Produksi
          <Icon name="info" size={14} />
        </div>
        <div className="card-actions">
          <Dropdown value={unitId} options={HOTSPOT_UNIT_OPTIONS} onChange={setUnitId} />
          <button className="kebab-btn" aria-label="Opsi lainnya">
            <Icon name="kebab" size={16} />
          </button>
        </div>
      </div>
      <div className="hbar-list">
        {areas.map((a) => (
          <div className={`hbar-row ${a.estimated ? "is-estimated" : ""}`} key={a.area}>
            <span className="hbar-label">{a.area}</span>
            <div className="hbar-track">
              <i style={{ width: `${(valueFor(a.kwh) / axisMax) * 100}%` }}>
                <b>
                  {fmt(valueFor(a.kwh))} {unit.label}
                </b>
              </i>
            </div>
          </div>
        ))}
      </div>
      <div className="hbar-axis">
        {ticks.map((t) => (
          <span key={t}>{t >= 1e6 ? `${number(t / 1e6, 1)} jt` : number(t)}</span>
        ))}
      </div>
      <div className="hbar-axis-title">
        {unitId === "tco2e" ? "Emisi dari Konsumsi Listrik (tCO2e)" : "Konsumsi Listrik (kWh)"}
      </div>
      <p className="hbar-foot">{areasNote}</p>
    </section>
  );
}

function PortfolioTableCI({ phase }) {
  const { portfolioNote } = DATA.carbonIntelligence.byPhase[phase];
  const [openProject, setOpenProject] = useState(null);
  // Diurutkan dari biaya abatement termurah. Inilah kurva MACC-nya.
  const rows = PROJECTS[phase]
    .filter((pr) => !pr.diagnostic)
    .map((pr) => ({ ...pr, e: projectEconomics(pr) }))
    .sort((a, b) => a.e.abatement - b.e.abatement);
  return (
    <section className="surface ci-table-card">
      <div className="card-head">
        <div className="card-title">
          Ranked Decarbonization Portfolio
          <Icon name="info" size={14} />
        </div>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Nama Proyek</th>
              <th>tCO2e Avoided</th>
              <th>Payback</th>
              <th>Rp / tCO2e</th>
              <th>Gerbang</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="is-clickable" onClick={() => setOpenProject(r)}>
                <td>
                  <b>{r.nama}</b>
                  <small className="pill-note">{r.titik}</small>
                </td>
                <td>{number(r.e.tco2e, 1)}</td>
                <td>{number(r.e.payback, 1)} th</td>
                <td className="neg">{number(Math.round(r.e.abatement / 1000))} rb</td>
                <td>
                  <span className={`status-pill ${r.gate === "G4" ? "approved" : r.gate === "G3" ? "approved" : "review"}`}>
                    {r.gate}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="hbar-foot">{portfolioNote} Klik satu baris untuk melihat mesin hitungnya.</p>
      <ProjectDrawer project={openProject} onClose={() => setOpenProject(null)} />
    </section>
  );
}

function DqsBar({ phase }) {
  const { dqs } = DATA.carbonIntelligence.byPhase[phase];
  return (
    <section className="surface dqs-v2-card">
      <div className="card-title">
        Data Quality Score (DQS)
        <Icon name="info" size={14} />
      </div>
      <div className="dqs-v2-body">
        <div className="dqs-v2-score">
          <div className="num">
            <strong>{dqs.score}</strong>
            <small>/100</small>
          </div>
          <div className="dqs-v2-bar">
            <span className="bar">
              <i style={{ width: `${dqs.score}%` }} />
            </span>
            <b>{dqs.score}%</b>
          </div>
        </div>
        <div className="dqs-v2-dims">
          {dqs.dims.map((d) => (
            <div className="dqs-v2-dim" key={d.label}>
              <span className="kpi-icon">
                <Icon name={d.icon} size={18} />
              </span>
              <div>
                <strong>{d.value}%</strong>
                <small>{d.label}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
      <p className="hbar-foot">{dqs.note}</p>
    </section>
  );
}

/* ===================================================================
   LAPIS 1 & 2 — Source & Ingestion + Data Control
   Aliran data sub-meter. Semua angka deterministik terhadap timestamp,
   jadi demo yang sama selalu menghasilkan angka yang sama.
   =================================================================== */

const SPEEDS = [
  { id: "0.5", label: "0,5x" },
  { id: "1", label: "1x" },
  { id: "4", label: "4x" },
];

function useSimClock(enabled) {
  const [now, setNow] = useState(() => new Date(SIM.ANCHOR.getTime()));
  const [playing, setPlaying] = useState(true);
  const [speed, setSpeed] = useState("1");
  useEffect(() => {
    if (!enabled || !playing) return undefined;
    const ms = 800 / Number(speed);
    const id = setInterval(() => {
      setNow((d) => new Date(d.getTime() + SIM.INTERVAL_MIN * 60000));
    }, ms);
    return () => clearInterval(id);
  }, [enabled, playing, speed]);
  return {
    now,
    playing,
    speed,
    setSpeed,
    toggle: () => setPlaying((v) => !v),
    jumpTo: (d) => setNow(new Date(d.getTime())),
  };
}

function SimClockBar({ clock }) {
  const { now } = clock;
  const prod = SIM.prodFactor(now, SUBMETER.shift);
  return (
    <div className="sim-bar">
      <div className="sim-clock">
        <span className="sim-dot" data-prod={prod > 0 ? "on" : "off"} />
        <div>
          <strong>
            {SIM.fmtDay(now)} {SIM.fmtClock(now)}
          </strong>
          <small>{prod > 0 ? "Jam produksi" : "Di luar jam produksi"}</small>
        </div>
      </div>
      <div className="sim-controls">
        <button className="sim-btn" onClick={clock.toggle} aria-pressed={clock.playing}>
          <Icon name={clock.playing ? "clock" : "arrow"} size={14} />
          {clock.playing ? "Jeda" : "Jalan"}
        </button>
        <Dropdown value={clock.speed} options={SPEEDS} onChange={clock.setSpeed} />
        <span className="sim-sep" />
        {SIM.JUMPS.map((j) => (
          <button key={j.id} className="sim-jump" onClick={() => clock.jumpTo(j.date)}>
            <strong>{j.label}</strong>
            <small>{j.note}</small>
          </button>
        ))}
      </div>
    </div>
  );
}

function MeterTile({ point, reading, issues, onOpen }) {
  const warn = issues.length > 0;
  const avgKw = point.kwhYear / 8760;
  return (
    <button
      className={`meter-tile ${warn ? "is-warn" : ""}`}
      onClick={() => onOpen(point)}
      aria-label={`Buka detail ${point.nama}`}
    >
      <div className="meter-tile-head">
        <span className="meter-id">{point.id}</span>
        <span className={`meter-status ${warn ? "warn" : "ok"}`}>
          {warn ? issues[0].short : "Normal"}
        </span>
      </div>
      <strong className="meter-name">{point.nama}</strong>
      <div className="meter-kw">
        <span>{number(reading.kw, 1)}</span>
        <small>kW</small>
      </div>
      <div className="meter-bar">
        <i style={{ width: `${Math.min(100, (reading.kw / point.peakKw) * 100)}%` }} />
        <u style={{ left: `${(point.baseKw / point.peakKw) * 100}%` }} title="Beban dasar" />
      </div>
      <dl className="meter-meta">
        <div>
          <dt>Interval</dt>
          <dd>{number(reading.kwh, 1)} kWh</dd>
        </div>
        <div>
          <dt>Faktor daya</dt>
          <dd>{number(reading.pf, 2)}</dd>
        </div>
        <div>
          <dt>Rata-rata</dt>
          <dd>{number(avgKw, 0)} kW</dd>
        </div>
      </dl>
    </button>
  );
}

function MeterTileGrid({ clock, onOpen }) {
  const { now } = clock;
  const rows = useMemo(
    () =>
      SUBMETER.points.map((p) => ({ point: p, ...SIM.sampleAt(p, now, SUBMETER.shift) })),
    [now],
  );
  return (
    <div className="meter-grid">
      {rows.map((r) => (
        <MeterTile key={r.point.id} {...r} onOpen={onOpen} />
      ))}
    </div>
  );
}

function ReconcilePanel() {
  const rec = useMemo(() => SIM.reconcile(SUBMETER), []);
  const idle = useMemo(() => SIM.idleProfile(SUBMETER), []);
  return (
    <section className="surface recon-card">
      <div className="card-title">
        Rekonsiliasi terhadap tagihan PLN
        <Icon name="info" size={14} />
      </div>
      <div className="recon-rows">
        <div className="recon-row">
          <span>5 titik ber-sub-meter</span>
          <b>{number(rec.metered)} kWh</b>
          <small>{number(rec.coveragePct, 1)}% dari total</small>
        </div>
        <div className="recon-row muted">
          <span>{SUBMETER.unmeteredCount} titik belum terukur</span>
          <b>{number(rec.unmetered)} kWh</b>
          <small>estimasi selisih</small>
        </div>
        <div className="recon-row total">
          <span>Total vs tagihan PLN</span>
          <b>{number(rec.total)} kWh</b>
          <small>selisih {number(Math.abs(rec.selisihPct), 2)}%</small>
        </div>
      </div>
      <div className="recon-finding">
        <Icon name="warning" size={15} />
        <div>
          <strong>
            {number(idle.totalKwh)} kWh berjalan di luar jam produksi
          </strong>
          <p>
            Setara {compactRp(idle.totalRupiah)} dan {number(idle.totalTco2e, 0)} tCO2e per
            tahun — {number(idle.sharePct, 1)}% dari konsumsi lima titik. Ditandai sebagai kandidat,
            belum boleh diklaim sebagai penghematan.
          </p>
        </div>
      </div>
    </section>
  );
}

function LiveTicker({ clock }) {
  const { now } = clock;
  const rows = useMemo(() => {
    const out = [];
    for (let i = 0; i < 3; i += 1) {
      const t = new Date(now.getTime() - i * SIM.INTERVAL_MIN * 60000);
      SUBMETER.points.forEach((p) => {
        const s = SIM.sampleAt(p, t, SUBMETER.shift);
        // Baris ticker hanya melaporkan status pembacaan itu sendiri.
        const hard = s.issues.filter((i) => !i.aggregate);
        out.push({ key: `${p.id}-${t.getTime()}`, t, point: p, ...s, issues: hard });
      });
    }
    return out;
  }, [now]);
  return (
    <section className="surface ticker-card">
      <div className="card-head">
        <div className="card-title">
          Data masuk &amp; validasi
          <Icon name="info" size={14} />
        </div>
        <span className="ticker-live">
          <i /> polling tiap {SIM.INTERVAL_MIN} menit
        </span>
      </div>
      <ul className="ticker-list">
        {rows.map((r) => (
          <li key={r.key} className={r.issues.length ? "warn" : ""}>
            <span className="t">{SIM.fmtClock(r.t)}</span>
            <span className="id">{r.point.id}</span>
            <span className="val">
              {r.reading.missing ? "—" : `${number(r.reading.kwh, 1)} kWh`}
            </span>
            <span className="st">
              {r.issues.length ? (
                <>
                  <Icon name="warning" size={12} /> {r.ev ? r.ev.msg : r.issues[0].label}
                </>
              ) : (
                <>
                  <Icon name="checkCircle" size={12} /> lolos validasi
                </>
              )}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function ExceptionList({ clock }) {
  const { now } = clock;
  const tickets = useMemo(() => {
    const map = new Map();
    for (let i = 0; i < 48; i += 1) {
      const t = new Date(now.getTime() - i * SIM.INTERVAL_MIN * 60000);
      SUBMETER.points.forEach((p) => {
        SIM.sampleAt(p, t, SUBMETER.shift).issues.forEach((rule) => {
          const key = `${p.id}:${rule.id}`;
          const prev = map.get(key);
          if (prev) prev.count += 1;
          else map.set(key, { key, point: p, rule, count: 1, first: t });
        });
      });
    }
    return [...map.values()].sort((a, b) => b.count - a.count).slice(0, 5);
  }, [now]);
  return (
    <section className="surface exc-card">
      <div className="card-head">
        <div className="card-title">
          Exception log
          <Icon name="info" size={14} />
        </div>
        <span className="exc-count">{tickets.length} tiket terbuka</span>
      </div>
      {tickets.length === 0 ? (
        <p className="exc-empty">Tidak ada pelanggaran aturan dalam 12 jam terakhir.</p>
      ) : (
        <ul className="exc-list">
          {tickets.map((t) => (
            <li key={t.key}>
              <span className="exc-rule">{t.rule.label}</span>
              <div className="exc-meta">
                <b>{t.point.nama}</b>
                <span>{t.count}x dalam 12 jam</span>
              </div>
              <div className="exc-owner">
                <Icon name="user" size={12} /> {t.point.owner}
              </div>
            </li>
          ))}
        </ul>
      )}
      <p className="exc-note">
        Tidak ada data yang dihapus diam-diam. Setiap pelanggaran aturan menghasilkan tiket dengan
        nilai mentah, tindakan steward, dan persetujuan pemilik data.
      </p>
    </section>
  );
}

function LoadProfileChart({ point, day }) {
  const series = useMemo(() => SIM.windowProfile(point, day, SUBMETER.shift), [point, day]);
  const W = 700;
  const H = 220;
  const left = 46;
  const right = 688;
  const top = 16;
  const bottom = 182;
  const maxKw = point.peakKw * 1.12;
  const yFor = (kw) => bottom - (kw / maxKw) * (bottom - top);
  const xFor = (i) => left + (i * (right - left)) / (series.length - 1);
  const line = series.map((p, i) => `${i === 0 ? "M" : "L"}${xFor(i)},${yFor(p.kw)}`).join(" ");
  const area = `${line} L${right},${bottom} L${left},${bottom} Z`;
  const baseY = yFor(point.baseKw);
  const tickIdx = [0, 24, 48, 72, 95]; // tiap 6 jam pada jendela 96 interval
  return (
    <div className="lp-wrap">
      <svg className="lp-svg" viewBox={`0 0 ${W} ${H}`} role="img" aria-label={`Profil beban ${point.nama}`}>
        <defs>
          <linearGradient id="lpArea" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#2f8f5c" stopOpacity=".22" />
            <stop offset="1" stopColor="#2f8f5c" stopOpacity="0" />
          </linearGradient>
          <pattern id="lpHatch" width="6" height="6" patternTransform="rotate(45)" patternUnits="userSpaceOnUse">
            <rect width="6" height="6" fill="#f4b740" fillOpacity=".10" />
            <line x1="0" y1="0" x2="0" y2="6" stroke="#d49a1f" strokeWidth="1.6" strokeOpacity=".30" />
          </pattern>
        </defs>
        {[0, 0.25, 0.5, 0.75, 1].map((f) => (
          <line key={f} className="grid-line" x1={left} x2={right} y1={top + f * (bottom - top)} y2={top + f * (bottom - top)} />
        ))}
        {/* area beban dasar — listrik yang berjalan tanpa menghasilkan produk */}
        <rect x={left} y={baseY} width={right - left} height={bottom - baseY} fill="url(#lpHatch)" />
        <path d={area} fill="url(#lpArea)" />
        <path d={line} className="trend-line" />
        <line x1={left} x2={right} y1={baseY} y2={baseY} className="lp-base-line" />
        <text x={right} y={baseY - 8} className="lp-base-label" textAnchor="end">
          beban dasar {point.baseKw} kW — berjalan tanpa menghasilkan produk
        </text>
        {[0, 0.5, 1].map((f) => (
          <text key={f} x={left - 10} y={bottom - f * (bottom - top) + 4} className="axis-text" textAnchor="end">
            {Math.round(maxKw * f)}
          </text>
        ))}
        {tickIdx.map((i) => (
          <text
            key={i}
            x={xFor(i)}
            y={bottom + 20}
            className="axis-text"
            textAnchor={i === 0 ? "start" : i >= 95 ? "end" : "middle"}
          >
            {SIM.fmtDay(series[i].at).slice(0, 3)} {SIM.fmtClock(series[i].at)}
          </text>
        ))}
      </svg>
    </div>
  );
}

function MeterDrawer({ point, day, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  if (!point) return null;
  const avgKw = point.kwhYear / 8760;
  const ratio = (point.baseKw / avgKw) * 100;
  const idleHours = 8760 * (1 - ((SUBMETER.shift.prodEnd - SUBMETER.shift.prodStart) * SUBMETER.shift.prodDays.length) / 168);
  const idleKwh = point.baseKw * idleHours;
  return (
    <div className="drawer-backdrop" onMouseDown={onClose}>
      <aside className="drawer" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-label={`Detail ${point.nama}`}>
        <div className="drawer-head">
          <div>
            <span className="eyebrow">{point.id} · {point.zona}</span>
            <h2>{point.nama}</h2>
          </div>
          <button className="kebab-btn" onClick={onClose} aria-label="Tutup">
            <Icon name="close" size={17} />
          </button>
        </div>

        <div className="drawer-stats">
          <div>
            <small>Beban dasar</small>
            <strong>{point.baseKw} kW</strong>
          </div>
          <div>
            <small>Rata-rata</small>
            <strong>{number(avgKw, 0)} kW</strong>
          </div>
          <div className={ratio > 50 ? "flag" : ""}>
            <small>Rasio beban dasar</small>
            <strong>{number(ratio, 0)}%</strong>
          </div>
          <div>
            <small>Di luar jam produksi</small>
            <strong>{number(idleKwh)} kWh/th</strong>
          </div>
        </div>

        <div className="drawer-section">
          <div className="card-title">Profil beban 24 jam terakhir · sampai {SIM.fmtDay(day)} {SIM.fmtClock(day)}</div>
          <LoadProfileChart point={point} day={day} />
          <p className="drawer-note">{point.catatan}</p>
        </div>

        <div className="drawer-section">
          <div className="card-title">Bukti sumber</div>
          <dl className="evidence">
            <div><dt>Nomor seri meter</dt><dd>{point.meter.serial}</dd></div>
            <div><dt>Rasio CT</dt><dd>{point.meter.ct} A</dd></div>
            <div><dt>Plafon fisik interval</dt><dd>{number(SIM.maxIntervalKwh(point), 1)} kWh</dd></div>
            <div><dt>Tanggal commissioning</dt><dd>{point.meter.commissioned}</dd></div>
            <div><dt>Data owner</dt><dd>{point.owner}</dd></div>
            <div><dt>Data steward</dt><dd>{point.steward}</dd></div>
          </dl>
        </div>
      </aside>
    </div>
  );
}

function SourceLayers({ clock, onOpen }) {
  return (
    <>
      <div className="layer-head">
        <span className="layer-tag">Lapis 1</span>
        <strong>Source &amp; Ingestion</strong>
        <small>Sub-meter mengirim pembacaan tiap {SIM.INTERVAL_MIN} menit — source evidence wajib</small>
      </div>
      <SimClockBar clock={clock} />
      <MeterTileGrid clock={clock} onOpen={onOpen} />
      <ReconcilePanel />

      <div className="layer-head">
        <span className="layer-tag">Lapis 2</span>
        <strong>Data Control</strong>
        <small>Aturan validasi, exception log, dan pemilik data per sumber</small>
      </div>
      <div className="ci-grid">
        <LiveTicker clock={clock} />
        <ExceptionList clock={clock} />
      </div>
    </>
  );
}

function SourceLayersOff() {
  return (
    <>
      <div className="layer-head">
        <span className="layer-tag">Lapis 1</span>
        <strong>Source &amp; Ingestion</strong>
        <small>Belum ada sub-meter terpasang</small>
      </div>
      <div className="meter-grid">
        {SUBMETER.points.map((p) => (
          <div className="meter-tile is-off" key={p.id}>
            <div className="meter-tile-head">
              <span className="meter-id">{p.id}</span>
              <span className="meter-status off">Tidak ada meter</span>
            </div>
            <strong className="meter-name">{p.nama}</strong>
            <div className="meter-kw muted">
              <span>—</span>
              <small>kW</small>
            </div>
            <p className="meter-off-note">Terdaftar di register, tidak ada angka kWh.</p>
          </div>
        ))}
      </div>
      <section className="surface ticker-card">
        <div className="card-title">Data masuk &amp; validasi</div>
        <div className="ticker-dead">
          <Icon name="close" size={16} />
          Tidak ada data masuk. {SUBMETER.totalPoints} titik terdaftar, nol angka kWh.
        </div>
      </section>
    </>
  );
}

// Spanduk fase: menegaskan apa yang sudah sah dan apa yang belum pada fase ini.
// Tangga gerbang untuk satu proyek: mana yang sudah lolos, mana yang sedang
// dikerjakan, dan bukti apa yang dituntut di tiap gerbang.
function GateLadder({ gate }) {
  const idx = GATES.findIndex((g) => g.id === gate);
  return (
    <ol className="gate-ladder">
      {GATES.map((g, i) => {
        const state = i < idx ? "lolos" : i === idx ? "kini" : "belum";
        return (
          <li key={g.id} className={state}>
            <span className="gl-mark">{state === "lolos" ? <Icon name="checkCircle" size={13} /> : g.id}</span>
            <div>
              <strong>
                {g.id} {g.nama}
                <em>{state === "lolos" ? "lolos" : state === "kini" ? "posisi saat ini" : "belum"}</em>
              </strong>
              <small>{g.bukti}</small>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function ProjectDrawer({ project, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  if (!project) return null;
  const e = projectEconomics(project);
  const diag = project.diagnostic;
  return (
    <div className="drawer-backdrop" onMouseDown={onClose}>
      <aside className="drawer" onMouseDown={(ev) => ev.stopPropagation()} role="dialog" aria-label={project.nama}>
        <div className="drawer-head">
          <div>
            <span className="eyebrow">{project.id} · {project.titik}</span>
            <h2>{project.nama}</h2>
          </div>
          <button className="kebab-btn" onClick={onClose} aria-label="Tutup">
            <Icon name="close" size={17} />
          </button>
        </div>

        <div className="drawer-section">
          <div className="card-title">Posisi gerbang</div>
          <GateLadder gate={project.gate} />
        </div>

        {diag ? (
          <div className="drawer-section">
            <div className="card-title">Proyek diagnostik</div>
            <p className="drawer-note">
              Keluarannya data, bukan penghematan. Karena itu tidak dihitung dengan tiga formula dan
              boleh berjalan lewat fast-track dengan plafon anggaran {compactRp(project.capex)}.
            </p>
          </div>
        ) : (
          <div className="drawer-section">
            <div className="card-title">
              Mesin hitung
              <StatusBadge status={project.estimasi ? "ASUMSI" : "TURUNAN"} />
            </div>
            <table className="calc-table">
              <tbody>
                <tr><td>Penghematan listrik</td><td className="n">{number(project.kwhSaved)} kWh</td><td className="n">{compactRp(e.listrik)}</td></tr>
                {project.hematProses ? <tr><td>Hemat proses &amp; pelaporan</td><td /><td className="n">{compactRp(project.hematProses)}</td></tr> : null}
                {project.nilaiHr ? <tr><td>Nilai SDM (reduksi rework)</td><td /><td className="n">{compactRp(project.nilaiHr)}</td></tr> : null}
                <tr><td>Recurring OPEX proyek</td><td /><td className="n neg">({compactRp(project.opexTahunan)})</td></tr>
                <tr className="sum"><td><b>Annual Net Benefit</b></td><td /><td className="n"><b>{compactRp(e.anb)}</b></td></tr>
              </tbody>
            </table>
            <div className="calc-chips">
              <span>{compactRp(project.capex)} &divide; {compactRp(e.anb)} = <b>{number(e.payback, 1)} tahun</b> payback</span>
              <span><b>{number(e.tco2e, 1)} tCO2e</b> dihindari per tahun</span>
              <span className="neg"><b>{money(Math.round(e.abatement))}</b> per tCO2e, cost negative</span>
            </div>
            <p className="drawer-note">
              Ketiga angka ini dihitung dari kWh yang dihemat, memakai tarif {money(SUBMETER.tariff)} per kWh
              dan faktor emisi {number(SUBMETER.emissionFactor, 2)} kgCO2e per kWh. Ubah salah satu input,
              ketiganya ikut berubah.
            </p>
          </div>
        )}

        <div className="drawer-section">
          <div className="card-title">Penanggung jawab</div>
          <dl className="evidence">
            <div><dt>Pemilik proyek</dt><dd>{project.owner}</dd></div>
            <div><dt>Titik terkait</dt><dd>{project.titik}</dd></div>
          </dl>
        </div>
      </aside>
    </div>
  );
}

function PhaseBanner({ phase }) {
  const f = PHASES.find((x) => x.id === phase) || PHASES[0];
  return (
    <div className="phase-banner">
      <div>
        <span className="eyebrow">Fase</span>
        <strong>{f.long}</strong>
      </div>
      <div className="phase-facts">
        <span>
          <small>Titik terukur</small>
          <b>{f.metered} dari {f.totalPoints}</b>
        </span>
        <span>
          <small>Baseline</small>
          <b>{f.baseline}</b>
        </span>
      </div>
    </div>
  );
}

function Carbon({ live, period }) {
  const phaseInfo = PHASES.find((f) => f.id === period) || PHASES[0];
  const clock = useSimClock(live);
  const [openPoint, setOpenPoint] = useState(null);
  if (!live) {
    return (
      <div className="page page-carbon">
        <div className="page-intro">
          <div>
            <span className="eyebrow">{phaseInfo.long} · {DATA.meta.plant}</span>
            <p>Ini kondisi ISTW hari ini. Register ada, meteran per titik tidak ada.</p>
          </div>
        </div>
        <SourceLayersOff />
        <div className="surface" style={{ padding: 40 }}>
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="page page-carbon">
      <PhaseBanner phase={period} />
      <SourceLayers clock={clock} onOpen={setOpenPoint} />

      <div className="layer-head">
        <span className="layer-tag">Lapis 3</span>
        <strong>Carbon Engine</strong>
        <small>Faktor emisi berversi · kWh menjadi tCO2e yang bisa ditelusuri</small>
      </div>
      <ScopeGrid phase={period} />

      <div className="layer-head">
        <span className="layer-tag">Lapis 4</span>
        <strong>Intelligence</strong>
        <small>Hotspot, kelayakan, dan portofolio terurut</small>
      </div>
      <HotspotBarChart phase={period} />
      <PortfolioTableCI phase={period} />

      <div className="layer-head">
        <span className="layer-tag">Lapis 5</span>
        <strong>Reporting</strong>
        <small>Skor kualitas data dan jejak audit</small>
      </div>
      <DqsBar phase={period} />

      <MeterDrawer point={openPoint} day={clock.now} onClose={() => setOpenPoint(null)} />
    </div>
  );
}

function Sparkline({ data }) {
  if (!data || data.length < 2) return null;
  const w = 100;
  const h = 34;
  const pts = data.map((v, i) => [(i / (data.length - 1)) * w, h - v * h * 0.85 - 2]);
  const line = pts.map(([x, y], i) => `${i === 0 ? "M" : "L"}${x},${y}`).join(" ");
  const area = `${line} L${w},${h} L0,${h} Z`;
  const [lastX, lastY] = pts[pts.length - 1];
  return (
    <svg className="sve-spark" viewBox={`0 0 ${w} ${h}`} preserveAspectRatio="none" aria-hidden="true">
      <path d={area} style={{ fill: "var(--green-pale)" }} />
      <path d={line} style={{ fill: "none", stroke: "var(--green-mid)", strokeWidth: 1.8 }} />
      <circle cx={lastX} cy={lastY} r="2.6" style={{ fill: "var(--green-dark)" }} />
    </svg>
  );
}

function SveKpiGrid({ phase }) {
  const { kpis, note, gates } = DATA.sharedValueEngine.byPhase[phase];
  return (
    <>
      <div className="sve-kpi-grid">
        {kpis.map((k) => (
          <article className={`surface sve-kpi-card ${k.empty ? "is-empty" : ""}`} key={k.title}>
            <div className="sve-kpi-head">
              <span className="kpi-icon">
                <Icon name={k.icon} size={19} />
              </span>
              <span>{k.title}</span>
            </div>
            <div className="sve-kpi-value">
              {k.value}
              <StatusBadge status={k.status} />
            </div>
            <div className="sve-kpi-sub">{k.sub}</div>
            {!k.empty && (
              <div className="sve-kpi-foot">
                {k.trend ? (
                  <span className="sve-kpi-trend">
                    vs periode lalu
                    <b>
                      <Icon name="arrowUp" size={11} /> {k.trend}%
                    </b>
                  </span>
                ) : (
                  <span />
                )}
                <Sparkline data={k.spark} />
              </div>
            )}
          </article>
        ))}
      </div>
      {gates && (
        <section className="surface" style={{ padding: 20 }}>
          <div className="card-title">Empat gerbang aktivasi akademi</div>
          <ol className="gate-ladder">
            {gates.map((g) => (
              <li key={g.label} className={g.done ? "lolos" : "belum"}>
                <span className="gl-mark">
                  {g.done ? <Icon name="checkCircle" size={13} /> : "-"}
                </span>
                <div>
                  <strong>
                    {g.label}
                    <em>{g.done ? "terpenuhi" : "belum"}</em>
                  </strong>
                  <small>{g.note}</small>
                </div>
              </li>
            ))}
          </ol>
          <p className="hbar-foot">Kelas tidak dibuka bila salah satu gagal.</p>
        </section>
      )}
      {note && (
        <div className="info-banner">
          <Icon name="leaf" size={16} /> {note}
        </div>
      )}
    </>
  );
}

function SroiSummaryCard({ phase }) {
  const sroi = DATA.sharedValueEngine.byPhase[phase].sroi;
  if (!sroi) {
    return (
      <section className="surface sroi-summary-card">
        <div className="card-title">
          Ringkasan Nilai Sosial (SROI)
          <Icon name="info" size={14} />
        </div>
        <div className="pending-block">
          <strong>Belum bisa dihitung</strong>
          <p>
            SROI baru sah setelah angkatan pertama dilacak enam sampai dua belas bulan. Kolom ini
            sengaja kami biarkan kosong, bukan diisi perkiraan.
          </p>
        </div>
      </section>
    );
  }
  return (
    <section className="surface sroi-summary-card">
      <div className="card-title">
        Ringkasan Nilai Sosial (SROI)
        <Icon name="info" size={14} />
      </div>
      <div className="sroi-summary-top">
        <span className="sroi-ring-icon">
          <Icon name="people" size={26} />
        </span>
        <div className="sroi-summary-main">
          <span className="label">SROI</span>
          <div className="value">{sroi.ratio}</div>
          <p className="note">{sroi.note}</p>
        </div>
      </div>
      <div className="sroi-stat-grid">
        {sroi.stats.map((s) => (
          <div className="sroi-stat" key={s.label}>
            <div className="sroi-stat-head">
              <Icon name={s.icon} size={14} /> {s.label}
            </div>
            <strong>{s.value}</strong>
            <div className="trend">
              <Icon name="arrowUp" size={10} /> {s.trend}%{" "}
              <span style={{ color: "var(--muted)", fontWeight: 600 }}>vs periode lalu</span>
            </div>
          </div>
        ))}
      </div>
      <div className="info-banner">
        <Icon name="trend" size={16} /> {sroi.banner}
      </div>
    </section>
  );
}

const TRACK_BASIS_OPTIONS = [
  { id: "peserta", label: "Berdasarkan Peserta" },
  { id: "completion", label: "Berdasarkan Completion Rate" },
];

function TrackDistributionCard({ phase }) {
  const track = DATA.sharedValueEngine.byPhase[phase].trackDistribution;
  const cohorts = DATA.sharedValueEngine.byPhase[phase].cohorts;
  const [basis, setBasis] = useState("peserta");
  const isCompletion = basis === "completion";
  const stats = useMemo(
    () =>
      (track?.segments || []).map((s) => {
        const rows = cohorts.filter((c) => c.track === s.label);
        const avgCompletion = rows.length ? Math.round(rows.reduce((a, c) => a + c.completion, 0) / rows.length) : 0;
        return { ...s, avgCompletion };
      }),
    [track, cohorts],
  );
  if (!track) {
    return (
      <section className="surface track-card">
        <div className="card-title">
          Distribusi Peserta per Track
          <Icon name="info" size={14} />
        </div>
        <div className="pending-block">
          <strong>Kelas belum dibuka</strong>
          <p>
            Empat gerbang aktivasi sudah terpenuhi, tetapi angkatan pertama baru dibuka setelah
            keputusan steering committee di minggu kedua belas.
          </p>
        </div>
      </section>
    );
  }
  const totalCompletion = stats.reduce((a, s) => a + s.avgCompletion, 0);
  const segA = isCompletion && totalCompletion
    ? Math.round((stats[0].avgCompletion / totalCompletion) * 100)
    : stats[0].percent;
  const gradient = `conic-gradient(var(--green-dark) 0% ${segA}%, var(--green-soft) ${segA}% 100%)`;
  const centerValue = isCompletion
    ? `${Math.round(totalCompletion / stats.length)}%`
    : track.total;
  const centerLabel = isCompletion ? "Avg Completion" : "Total Peserta";
  return (
    <section className="surface track-card">
      <div className="card-head">
        <div className="card-title">
          Distribusi Peserta per Track
          <Icon name="info" size={14} />
        </div>
        <Dropdown value={basis} options={TRACK_BASIS_OPTIONS} onChange={setBasis} />
      </div>
      <div className="track-body">
        <div className="donut-wrap" style={{ background: gradient }}>
          <div className="donut-hole">
            <strong>{centerValue}</strong>
            <small>{centerLabel}</small>
          </div>
        </div>
        <div className="track-legend">
          {stats.map((s) => (
            <div className="track-legend-item" key={s.label}>
              <i style={{ background: s.tone === "dark" ? "var(--green-dark)" : "var(--green-soft)" }} />
              <div>
                <strong>{s.label}</strong>
                <small>{isCompletion ? `Completion rate ${s.avgCompletion}%` : `${s.percent}% (${s.count} peserta)`}</small>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="track-stats">
        <span className="track-stats-title">Performa Completion Rate per Track</span>
        {stats.map((s) => (
          <div className="track-stat-row" key={s.label}>
            <i style={{ background: s.tone === "dark" ? "var(--green-dark)" : "var(--green-soft)" }} />
            <span className="track-stat-label">{s.label}</span>
            <div className="mini-bar-cell">
              <span className="bar">
                <i style={{ width: `${s.avgCompletion}%` }} />
              </span>
              <b>{s.avgCompletion}%</b>
            </div>
          </div>
        ))}
      </div>
      <div className="info-banner">
        <Icon name="leaf" size={16} /> {track.banner}
      </div>
    </section>
  );
}

function CohortDrawer({ cohort, onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);
  if (!cohort) return null;
  const ladder = cohortLadder(cohort);
  const terisi = ladder.filter((r) => r.status === "terisi").length;
  return (
    <div className="drawer-backdrop" onMouseDown={onClose}>
      <aside className="drawer" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-label={cohort.name}>
        <div className="drawer-head">
          <div>
            <span className="eyebrow">{cohort.track}</span>
            <h2>{cohort.name}</h2>
          </div>
          <button className="kebab-btn" onClick={onClose} aria-label="Tutup">
            <Icon name="close" size={17} />
          </button>
        </div>

        <div className="drawer-stats">
          <div>
            <small>Periode kelas</small>
            <strong style={{ fontSize: 13 }}>{cohort.period}</strong>
          </div>
          <div>
            <small>Tangga terisi</small>
            <strong>{terisi} dari 4</strong>
          </div>
          <div className={cohort.terlacak == null ? "" : cohort.terlacak < cohort.participants ? "flag" : ""}>
            <small>Alumni terlacak</small>
            <strong>{cohort.terlacak == null ? "-" : `${cohort.terlacak}/${cohort.participants}`}</strong>
          </div>
          <div>
            <small>Jatuh tempo outcome</small>
            <strong style={{ fontSize: 13 }}>{cohort.horizonOutcome}</strong>
          </div>
        </div>

        <div className="drawer-section">
          <div className="card-title">Tangga outcome dan cara datanya masuk</div>
          <ol className="gate-ladder rungs">
            {ladder.map((r) => (
              <li key={r.rung} className={r.status === "terisi" ? "lolos" : "belum"}>
                <span className="gl-mark">{r.status === "terisi" ? <Icon name="checkCircle" size={13} /> : r.rung}</span>
                <div>
                  <strong>
                    {r.label}
                    <em>{r.status === "terisi" ? "terisi" : "menunggu"}</em>
                  </strong>
                  <b className="rung-val">{r.nilai}</b>
                  <small>{r.detail}</small>
                  <dl className="rung-meta">
                    <div><dt>Sumber</dt><dd>{r.sumber}</dd></div>
                    <div><dt>Pemilik data</dt><dd>{r.owner}</dd></div>
                    <div><dt>Kapan diinput</dt><dd>{r.kapan}</dd></div>
                  </dl>
                  <p className="rung-note">{r.catatan}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <div className="drawer-section">
          <div className="card-title">Kenapa ini bagian tersulit</div>
          <p className="drawer-note" style={{ marginTop: 0 }}>
            Data sub-meter datang sendiri tiap lima belas menit. Data kohort harus dikejar, dan
            jatuh temponya enam sampai dua belas bulan setelah perhatian program biasanya sudah
            pindah. Karena itu tanggung jawabnya dilekatkan pada HR yang permanen, bukan pada
            panitia program yang bubar setelah kelas selesai.
          </p>
        </div>
      </aside>
    </div>
  );
}

function CohortTable({ phase }) {
  const cohorts = DATA.sharedValueEngine.byPhase[phase].cohorts;
  const [open, setOpen] = useState(null);
  if (!cohorts.length) {
    return (
      <section className="surface cohort-card">
        <div className="card-title" style={{ marginBottom: 16 }}>
          Status Kohort Berjalan
          <Icon name="info" size={14} />
        </div>
        <div className="pending-block">
          <strong>Belum ada kohort berjalan</strong>
          <p>
            Yang sudah selesai di fase ini adalah needs assessment dan empat gerbang aktivasi.
            Kami lebih memilih tidak membuka kelas daripada membuka kelas yang lulusannya tidak ke
            mana-mana.
          </p>
        </div>
      </section>
    );
  }
  return (
    <section className="surface cohort-card">
      <div className="card-title" style={{ marginBottom: 16 }}>
        Status Kohort Berjalan
        <Icon name="info" size={14} />
      </div>
      <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Nama Kohort</th>
            <th>Periode</th>
            <th>Jumlah Peserta</th>
            <th>Completion Rate</th>
            <th>Placement Rate</th>
            <th>Status</th>
            <th>Aksi</th>
          </tr>
        </thead>
        <tbody>
          {cohorts.map((c, i) => (
            <tr key={`${c.name}-${i}`} className="is-clickable" onClick={() => setOpen(c)}>
              <td>
                <b>{c.name}</b>
                <span className="row-sub">{c.track}</span>
              </td>
              <td>{c.period}</td>
              <td>{c.participants}</td>
              <td>
                <div className="mini-bar-cell">
                  <span className="bar">
                    <i style={{ width: `${c.completion}%` }} />
                  </span>
                  <b>{c.completion}%</b>
                </div>
              </td>
              <td>
                <div className="mini-bar-cell">
                  <span className="bar">
                    <i style={{ width: `${c.placement}%` }} />
                  </span>
                  <b>{c.placement}%</b>
                </div>
              </td>
              <td>
                <span className="status-pill berjalan">{c.status}</span>
              </td>
              <td>
                <button className="table-kebab" aria-label="Aksi lainnya">
                  <Icon name="kebab" size={16} />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      <p className="hbar-foot">
        Klik satu kohort untuk melihat empat tangga outcome-nya dan dari mana tiap angka masuk.
      </p>
      <CohortDrawer cohort={open} onClose={() => setOpen(null)} />
    </section>
  );
}

function Shared({ live, period }) {
  const phaseInfo = PHASES.find((f) => f.id === period) || PHASES[0];
  if (!live) {
    return (
      <div className="page page-shared">
        <div className="page-intro">
          <div>
            <span className="eyebrow">{phaseInfo.long} · {DATA.meta.plant}</span>
            <p>ISTW hari ini berhenti pada aktivitas dan output. Outcome belum dilacak.</p>
          </div>
        </div>
        <div className="surface" style={{ padding: 40 }}>
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="page page-shared">
      <PhaseBanner phase={period} />
      <SveKpiGrid phase={period} />
      <div className="sve-row2">
        <SroiSummaryCard phase={period} />
        <TrackDistributionCard phase={period} />
      </div>
      <CohortTable phase={period} />
    </div>
  );
}

function GovernanceKpis({ period }) {
  const periods = DATA.dashboard.periods;
  const idx = periods.findIndex((p) => p.id === period);
  const prevPeriod = idx > 0 ? periods[idx - 1] : null;
  const cur = DATA.dashboard.byPeriod[period].funnel;
  const prev = prevPeriod ? DATA.dashboard.byPeriod[prevPeriod.id].funnel : null;
  const capexOf = (f) => f.stages.reduce((a, s) => (s.gate === "G3" || s.gate === "G4" ? a + s.value : a), 0);
  const capexNow = capexOf(cur);
  const pctChange = (now, before) => Math.round(((now - before) / before) * 100);
  const totalTrend = prev ? pctChange(cur.total, prev.total) : null;
  const capexTrend = prev ? pctChange(capexNow, capexOf(prev)) : null;
  const scorecard = DATA.governance.byPhase[period].scorecard;
  const avgScore = Math.round(scorecard.reduce((a, [, v]) => a + v, 0) / scorecard.length);
  const audit = DATA.governance.byPhase[period].auditCompliance;
  return (
    <div className="kpi-grid governance-kpi-grid">
      <KpiCard icon="briefcase" label="Total Proyek" value={cur.total} sub="dalam pipeline G0-G4">
        {totalTrend !== null ? (
          <TrendRow dir={totalTrend >= 0 ? "up" : "down"} trend={`${Math.abs(totalTrend)}%`} note={`vs ${prevPeriod.label}`} />
        ) : (
          <div className="kpi-note">Awal periode pelacakan</div>
        )}
      </KpiCard>
      <KpiCard icon="shield" label="Lolos CAPEX Gate" value={capexNow} sub="proyek di G3-G4 (≥ CAPEX gate)">
        {capexTrend !== null ? (
          <TrendRow dir={capexTrend >= 0 ? "up" : "down"} trend={`${Math.abs(capexTrend)}%`} note={`vs ${prevPeriod.label}`} />
        ) : (
          <div className="kpi-note">Awal periode pelacakan</div>
        )}
      </KpiCard>
      <KpiCard icon="target" label="Skor Scorecard" value={avgScore} unit="/ 100" sub="Kombinasi 5 dimensi keputusan">
        <div className="kpi-progress">
          <span className="bar">
            <i style={{ width: `${avgScore}%` }} />
          </span>
          <b>{avgScore}%</b>
        </div>
      </KpiCard>
      <KpiCard icon="checkCircle" label="Audit Trail Compliance" value={audit.value} unit="%">
        <TrendRow dir="up" trend={audit.trend} note={audit.trendNote} />
      </KpiCard>
    </div>
  );
}

const PIPELINE_MODE_OPTIONS = [
  { id: "count", label: "Jumlah Proyek" },
  { id: "money", label: "Nilai Investasi" },
];

function PipelineChartCard({ period }) {
  const funnel = DATA.dashboard.byPeriod[period].funnel;
  const [mode, setMode] = useState("count");
  const isMoney = mode === "money";
  const maxValue = Math.max(...funnel.stages.map((s) => (isMoney ? s.investasi : s.value)));
  return (
    <section className="surface gate-pipeline">
      <div className="card-head">
        <div className="card-title">
          Stage-Gate Pipeline
          <Icon name="info" size={14} />
        </div>
        <Dropdown value={mode} options={PIPELINE_MODE_OPTIONS} onChange={setMode} />
      </div>
      <div className="pipeline-grid">
        {funnel.stages.map((stage) => {
          const raw = isMoney ? stage.investasi : stage.value;
          const display = isMoney ? `Rp${number(raw, 1)}M` : raw;
          return (
            <div className={`pipeline-col ${stage.gate === "G3" ? "active" : ""}`} key={stage.gate}>
              <div className="pipeline-label">
                <span>{stage.gate}</span>
                <b>{display}</b>
              </div>
              <div className="pipeline-bar">
                <i style={{ height: `${Math.max((raw / maxValue) * 100, 8)}%` }} />
              </div>
              <strong>{stage.label}</strong>
              <small>{stage.gate === "G3" ? "CAPEX gate" : stage.gate === "G4" ? "Scale" : "Review"}</small>
            </div>
          );
        })}
      </div>
      <div className="gate-note">
        <span>G3</span>
        <p>
          Value fit menjadi titik disiplin: <b>reduksi besar + payback lambat</b> tidak otomatis
          ditolak; trade-off wajib tertulis.
        </p>
      </div>
    </section>
  );
}

function ScorecardCard({ phase }) {
  const scorecard = DATA.governance.byPhase[phase].scorecard;
  const avg = Math.round(scorecard.reduce((a, [, v]) => a + v, 0) / scorecard.length);
  const best = scorecard.reduce((a, b) => (b[1] > a[1] ? b : a));
  const worst = scorecard.reduce((a, b) => (b[1] < a[1] ? b : a));
  return (
    <section className="surface scorecard">
      <div className="card-head">
        <div className="card-title">
          Quarterly Scorecard
          <Icon name="info" size={14} />
        </div>
        <span className="pill-label">RATA-RATA {avg}</span>
      </div>
      {scorecard.map(([label, value]) => (
        <div className="score-row" key={label}>
          <span>{label}</span>
          <div>
            <i style={{ width: `${value}%` }} />
          </div>
          <b>{value}</b>
        </div>
      ))}
      <div className="info-banner">
        <Icon name="target" size={16} />
        <span>
          Terkuat di <b>{best[0]}</b> ({best[1]}), perlu perhatian di <b>{worst[0]}</b> ({worst[1]}).
        </span>
      </div>
    </section>
  );
}

function OperatingModelTable({ phase }) {
  const rows = DATA.governance.byPhase[phase].operatingModel;
  return (
    <section className="surface raci-card">
      <div className="card-head">
        <div className="card-title">
          Operating Model & Accountability
          <Icon name="info" size={14} />
        </div>
      </div>
      <div className="raci-grid">
        <div className="raci-key">
          <b>R</b>
          <span>Responsible</span>
        </div>
        <div className="raci-key">
          <b>A</b>
          <span>Accountable</span>
        </div>
        <div className="raci-key">
          <b>C</b>
          <span>Consulted</span>
        </div>
        <div className="raci-key">
          <b>I</b>
          <span>Informed</span>
        </div>
      </div>
      <div className="table-scroll">
      <table>
        <thead>
          <tr>
            <th>Pihak</th>
            <th>Peran (RACI)</th>
            <th>Cakupan tanggung jawab</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.pihak}>
              <td>
                <b>{r.pihak}</b>
              </td>
              <td>
                <span className="role-badge">{r.peran}</span>
              </td>
              <td>{r.cakupan}</td>
              <td>
                <span className={`status-pill ${r.status === "Aktif" ? "approved" : "review"}`}>{r.status}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </section>
  );
}

function RiskRegister({ phase }) {
  const tone = { Termitigasi: "approved", Dipantau: "review", Terbuka: "open" };
  return (
    <section className="surface ci-table-card">
      <div className="card-head">
        <div className="card-title">
          Risk Register
          <Icon name="info" size={14} />
        </div>
      </div>
      <div className="table-scroll">
        <table>
          <thead>
            <tr>
              <th>Risiko</th>
              <th>Mitigasi</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {DATA.governance.risks.map((r) => {
              const st = r.byPhase[phase];
              return (
                <tr key={r.nama}>
                  <td>
                    <b>{r.nama}</b>
                  </td>
                  <td>{r.mitigasi}</td>
                  <td>
                    <span className={`status-pill ${tone[st] || "review"}`}>{st}</span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <p className="hbar-foot">
        Lima risiko, bukan tiga. Dua yang selama ini hanya disebut ada di lampiran kini punya
        status dan mitigasinya sendiri.
      </p>
    </section>
  );
}

function Governance({ live, period }) {
  const phaseInfo = PHASES.find((f) => f.id === period) || PHASES[0];
  if (!live) {
    return (
      <div className="page page-governance">
        <div className="page-intro">
          <div>
            <span className="eyebrow">{phaseInfo.long} · {DATA.meta.plant}</span>
            <p>Tanpa angka yang dapat dilacak, keputusan CAPEX belum punya gerbang yang kuat.</p>
          </div>
        </div>
        <div className="surface" style={{ padding: 40 }}>
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="page page-governance">
      <PhaseBanner phase={period} />
      <GovernanceKpis period={period} />
      <div className="dashboard-grid">
        <PipelineChartCard period={period} />
        <ScorecardCard phase={period} />
      </div>
      <RiskRegister phase={period} />
      <OperatingModelTable phase={period} />
    </div>
  );
}

function App() {
  const [active, setActive] = useState("dashboard");
  const [live, setLive] = useState(true);
  const [period, setPeriod] = useState(DATA.dashboard.defaultPeriod);
  const currentIndex = useMemo(() => nav.findIndex((item) => item.id === active), [active]);
  useEffect(() => {
    const onKey = (e) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement) return;
      if (e.key === " ") {
        e.preventDefault();
        setLive((value) => !value);
      }
      if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
        e.preventDefault();
        setPeriod((cur) => {
          const i = PHASES.findIndex((f) => f.id === cur);
          const next = e.key === "ArrowRight" ? i + 1 : i - 1;
          return PHASES[Math.min(PHASES.length - 1, Math.max(0, next))].id;
        });
      }
      const item = nav.find((entry) => entry.key === e.key);
      if (item) setActive(item.id);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  return (
    <div className="app-root">
      <div className="top-strip" />
      <div className="app-shell">
        <Sidebar active={active} onChange={setActive} />
        <main className="main-shell">
          <Header
            active={active}
            period={period}
            onPeriodChange={setPeriod}
            live={live}
            onLiveToggle={() => setLive((value) => !value)}
          />
          <div className="main-scroll">
            <div className="screen-container">
              {active === "dashboard" && (
                <Dashboard live={live} period={period} onSelect={setActive} />
              )}
              {active === "carbon" && <Carbon live={live} period={period} />}
              {active === "shared" && <Shared live={live} period={period} />}
              {active === "governance" && <Governance live={live} period={period} />}
            </div>
            <footer className="global-footer">
              <span>
                Angka konsumsi per titik bersifat simulasi. Angka aktual dikunci setelah sub-metering
                90 hari pertama.
              </span>
              <span className="footer-keys">
                <kbd>1</kbd>–<kbd>4</kbd> layar · <kbd>←</kbd><kbd>→</kbd> fase ·{" "}
                <kbd>Space</kbd> mode · <kbd>Esc</kbd> tutup
              </span>
              <span>© 2027 ISTW VALUE360 · {currentIndex + 1}/4</span>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
