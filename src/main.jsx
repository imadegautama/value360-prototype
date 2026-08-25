import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { DATA, number } from "./data";
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
      <h1>{current.label}</h1>
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

function KpiCard({ icon, label, value, unit, sub, children }) {
  return (
    <article className="kpi-card">
      <span className="kpi-icon">
        <Icon name={icon} size={19} />
      </span>
      <div className="kpi-label">{label}</div>
      <div className="kpi-value">
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
      <KpiCard icon={social.icon} label={social.label} value={social.value} sub={social.sub}>
        <TrendRow dir={social.trendDir} trend={social.trend} note={social.trendNote} />
      </KpiCard>
      <KpiCard icon={carbon.icon} label={carbon.label} value={carbon.value} unit={carbon.unit}>
        <TrendRow dir={carbon.trendDir} trend={carbon.trend} note={carbon.trendNote} />
      </KpiCard>
      <KpiCard icon={dataQuality.icon} label={dataQuality.label} value={dataQuality.value} unit={dataQuality.unit}>
        <div className="kpi-progress">
          <span className="bar">
            <i style={{ width: `${dataQuality.percent}%` }} />
          </span>
          <b>{dataQuality.percent}%</b>
        </div>
        <div className="kpi-note">{dataQuality.note}</div>
      </KpiCard>
      <KpiCard icon={financial.icon} label={financial.label} value={financial.value} unit={financial.unit} sub={financial.sub}>
        <TrendRow dir={financial.trendDir} trend={financial.trend} note={financial.trendNote} />
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
  const maxVal = isPct ? 100 : 20000;
  const minVal = isPct ? Math.floor(Math.min(...values) / 10) * 10 - 10 : 8000;
  const step = isPct ? 10 : 2000;
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
  const points = [...trend.basePoints, { year: "2027", label: cur.emission.label, value: cur.emission.value }];
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
        <span className="delta-pill">
          <Icon name="arrowDown" size={12} /> {number(deltaPct, 1)}% vs Baseline 2024
        </span>
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

function StageFunnelCard({ period }) {
  const funnel = DATA.dashboard.byPeriod[period].funnel;
  const [mode, setMode] = useState("count");
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
          const percent = isMoney ? Math.round((stage.investasi / totalInvestasi) * 100) : stage.value;
          return (
            <div className="funnel-row" key={stage.gate}>
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
    </section>
  );
}

function Dashboard({ live, period, onSelect }) {
  if (!live) {
    return (
      <div className="page page-dashboard">
        <div className="page-intro">
          <div>
            <span className="eyebrow">Q3 2027 · {DATA.meta.plant}</span>
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

function ScopeGrid() {
  const { scopes } = DATA.carbonIntelligence;
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
          <div className="ci-scope-divider">
            <span className={`ci-scope-percent ${s.percent === "—" ? "muted" : ""}`}>{s.percent}</span>
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

function HotspotBarChart() {
  const { hotspot } = DATA.carbonIntelligence;
  const [unitId, setUnitId] = useState("kwh");
  const unit = hotspot.units[unitId];
  const ticks = [];
  for (let v = 0; v <= unit.axisMax; v += unit.axisStep) ticks.push(v);
  const valueFor = (kwh) => (unitId === "tco2e" ? (kwh * hotspot.co2Factor) / 1000 : kwh);
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
        {hotspot.areas.map((a) => (
          <div className="hbar-row" key={a.area}>
            <span className="hbar-label">{a.area}</span>
            <div className="hbar-track">
              <i style={{ width: `${(valueFor(a.kwh) / unit.axisMax) * 100}%` }}>
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
          <span key={t}>{number(t)}</span>
        ))}
      </div>
      <div className="hbar-axis-title">
        {unitId === "tco2e" ? "Emisi dari Konsumsi Listrik (tCO2e)" : "Konsumsi Listrik (kWh)"}
      </div>
    </section>
  );
}

function PortfolioTableCI() {
  const rows = DATA.carbonIntelligence.portfolio;
  return (
    <section className="surface ci-table-card">
      <div className="card-head">
        <div className="card-title">
          Ranked Decarbonization Portfolio
          <Icon name="info" size={14} />
        </div>
      </div>
      <table>
        <thead>
          <tr>
            <th>Nama Proyek</th>
            <th>tCO2e Avoided</th>
            <th>Payback (tahun)</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.name}>
              <td>
                <b>{r.name}</b>
              </td>
              <td>{r.avoided}</td>
              <td>{r.payback}</td>
              <td>
                <span className={`status-pill ${r.status === "Approved" ? "approved" : "review"}`}>
                  {r.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="table-more-link">
        <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Icon name="leaf" size={14} /> Lihat semua proyek dekarbonisasi
        </span>
        <Icon name="chevron" size={15} />
      </button>
    </section>
  );
}

function DqsBar() {
  const dqs = DATA.carbonIntelligence.dqs;
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
    </section>
  );
}

function Carbon({ live }) {
  if (!live) {
    return (
      <div className="page page-carbon">
        <div className="page-intro">
          <div>
            <span className="eyebrow">Q3 2027 · {DATA.meta.plant}</span>
            <p>Ini kondisi ISTW hari ini. Register ada, meteran per titik tidak ada.</p>
          </div>
        </div>
        <div className="surface" style={{ padding: 40 }}>
          <EmptyState />
        </div>
      </div>
    );
  }
  return (
    <div className="page page-carbon">
      <ScopeGrid />
      <div className="ci-grid">
        <HotspotBarChart />
        <PortfolioTableCI />
      </div>
      <DqsBar />
    </div>
  );
}

function Sparkline({ data }) {
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

function SveKpiGrid() {
  const { kpis } = DATA.sharedValueEngine;
  return (
    <div className="sve-kpi-grid">
      {kpis.map((k) => (
        <article className="surface sve-kpi-card" key={k.title}>
          <div className="sve-kpi-head">
            <span className="kpi-icon">
              <Icon name={k.icon} size={19} />
            </span>
            <span>{k.title}</span>
          </div>
          <div className="sve-kpi-value">{k.value}</div>
          <div className="sve-kpi-sub">{k.sub}</div>
          <div className="sve-kpi-foot">
            <span className="sve-kpi-trend">
              vs periode lalu
              <b>
                <Icon name="arrowUp" size={11} /> {k.trend}%
              </b>
            </span>
            <Sparkline data={k.spark} />
          </div>
        </article>
      ))}
    </div>
  );
}

function SroiSummaryCard() {
  const sroi = DATA.sharedValueEngine.sroi;
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

function TrackDistributionCard() {
  const track = DATA.sharedValueEngine.trackDistribution;
  const cohorts = DATA.sharedValueEngine.cohorts;
  const [basis, setBasis] = useState("peserta");
  const isCompletion = basis === "completion";
  const stats = useMemo(
    () =>
      track.segments.map((s) => {
        const rows = cohorts.filter((c) => c.track === s.label);
        const avgCompletion = rows.length ? Math.round(rows.reduce((a, c) => a + c.completion, 0) / rows.length) : 0;
        return { ...s, avgCompletion };
      }),
    [track.segments, cohorts],
  );
  const totalCompletion = stats.reduce((a, s) => a + s.avgCompletion, 0);
  const segA = isCompletion ? Math.round((stats[0].avgCompletion / totalCompletion) * 100) : stats[0].percent;
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

function CohortTable() {
  const cohorts = DATA.sharedValueEngine.cohorts;
  return (
    <section className="surface cohort-card">
      <div className="card-title" style={{ marginBottom: 16 }}>
        Status Kohort Berjalan
        <Icon name="info" size={14} />
      </div>
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
            <tr key={`${c.name}-${i}`}>
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
    </section>
  );
}

function Shared({ live }) {
  if (!live) {
    return (
      <div className="page page-shared">
        <div className="page-intro">
          <div>
            <span className="eyebrow">Q3 2027 · {DATA.meta.plant}</span>
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
      <SveKpiGrid />
      <div className="sve-row2">
        <SroiSummaryCard />
        <TrackDistributionCard />
      </div>
      <CohortTable />
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
  const scorecard = DATA.governance.scorecard;
  const avgScore = Math.round(scorecard.reduce((a, [, v]) => a + v, 0) / scorecard.length);
  const audit = DATA.governance.auditCompliance;
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

function ScorecardCard() {
  const scorecard = DATA.governance.scorecard;
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

function OperatingModelTable() {
  const rows = DATA.governance.operatingModel;
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
    </section>
  );
}

function Governance({ live, period }) {
  if (!live) {
    return (
      <div className="page page-governance">
        <div className="page-intro">
          <div>
            <span className="eyebrow">Q3 2027 · {DATA.meta.plant}</span>
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
      <GovernanceKpis period={period} />
      <div className="dashboard-grid">
        <PipelineChartCard period={period} />
        <ScorecardCard />
      </div>
      <OperatingModelTable />
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
              {active === "carbon" && <Carbon live={live} />}
              {active === "shared" && <Shared live={live} />}
              {active === "governance" && <Governance live={live} period={period} />}
            </div>
            <footer className="global-footer">
              <span>
                Angka konsumsi per titik bersifat simulasi. Angka aktual dikunci setelah sub-metering
                90 hari pertama.
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
