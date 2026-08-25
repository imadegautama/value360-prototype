import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import { DATA, STATUS_LABELS, money, number } from "./data";
import "./styles.css";

const Icons = {
  grid: (
    <>
      <rect x="3" y="3" width="7" height="7" rx="1" />
      <rect x="14" y="3" width="7" height="7" rx="1" />
      <rect x="3" y="14" width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
    </>
  ),
  bolt: (
    <>
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </>
  ),
  people: (
    <>
      <circle cx="9" cy="8" r="3" />
      <circle cx="17" cy="9" r="2.5" />
      <path d="M3.5 20c.6-3.2 2.4-5 5.5-5s4.9 1.8 5.5 5M14 15.5c2.9-.8 5.7.5 6.5 3.8" />
    </>
  ),
  shield: (
    <>
      <path d="m12 3 7 3v5c0 4.6-2.8 8.3-7 10-4.2-1.7-7-5.4-7-10V6l7-3Z" />
      <path d="m8.7 12 2.2 2.2 4.6-4.8" />
    </>
  ),
  chevron: <path d="m9 6 6 6-6 6" />,
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
  {
    id: "dashboard",
    label: "Dashboard",
    note: "Ringkasan nilai",
    icon: "grid",
    key: "1",
  },
  {
    id: "carbon",
    label: "Carbon Intelligence",
    note: "Hotspot & portfolio",
    icon: "bolt",
    key: "2",
  },
  {
    id: "shared",
    label: "Shared Value Engine",
    note: "Outcome & SROI",
    icon: "people",
    key: "3",
  },
  {
    id: "governance",
    label: "Governance",
    note: "Gate & scorecard",
    icon: "shield",
    key: "4",
  },
];

function StatusBadge({ status = "SIMULASI" }) {
  return (
    <span className={`status status-${status.toLowerCase()}`}>
      {STATUS_LABELS[status] || status}
    </span>
  );
}

function ModeToggle({ live, onToggle }) {
  return (
    <button
      className={`mode-toggle ${live ? "is-live" : ""}`}
      onClick={onToggle}
      aria-pressed={live}
      aria-label="Ganti mode Hari Ini atau Dengan VALUE360"
    >
      <span className="toggle-dot" />
      <span className="toggle-copy">
        <strong>{live ? "DENGAN VALUE360" : "HARI INI"}</strong>
        <small>{live ? "Simulasi keadaan Q3 2027" : "Kondisi saat ini"}</small>
      </span>
      <span className="toggle-switch">
        <span />
      </span>
    </button>
  );
}

function Header({ live, onToggle, active }) {
  const current = nav.find((item) => item.id === active);
  return (
    <header className="topbar">
      <div className="brand-lockup">
        <div className="brand-mark">
          V<span></span>
        </div>
        <div>
          <div className="brand-name">VALUE360</div>
          <div className="brand-sub">ISTW · BALIPRIME</div>
        </div>
      </div>
      <div className="top-context">
        <span className="eyebrow">
          INTELLIGENCE CONSOLE / {current.label.toUpperCase()}
        </span>
        <h1>{current.label}</h1>
      </div>
      <div className="top-actions">
        <span className="prototype-badge">
          <i /> PROTOTIPE — DATA SIMULASI
        </span>
        <ModeToggle live={live} onToggle={onToggle} />
      </div>
    </header>
  );
}

function Sidebar({ active, onChange }) {
  return (
    <aside className="sidebar">
      <div className="sidebar-head">
        <span className="sidebar-kicker">NAVIGASI</span>
        <span className="online-dot" title="Offline ready" />
      </div>
      <nav aria-label="Navigasi utama">
        {nav.map((item) => (
          <button
            key={item.id}
            className={`nav-item ${active === item.id ? "active" : ""}`}
            onClick={() => onChange(item.id)}
            aria-current={active === item.id ? "page" : undefined}
          >
            <span className="nav-icon">
              <Icon name={item.icon} size={19} />
            </span>
            <span className="nav-label">
              <strong>{item.label}</strong>
              <small>{item.note}</small>
            </span>
            <kbd>{item.key}</kbd>
          </button>
        ))}
      </nav>
      <div className="sidebar-bottom">
        <div className="system-chip">
          <span className="pulse" />
          <div>
            <strong>MODE OFFLINE</strong>
            <small>0 koneksi eksternal</small>
          </div>
        </div>
        <div className="keyboard-hint">
          <span>SPACE</span> toggle mode
        </div>
      </div>
    </aside>
  );
}

function StatusLegend() {
  return (
    <div className="status-legend">
      <span>STATUS ANGKA</span>
      <StatusBadge status="DATA_KASUS" />
      <StatusBadge status="TURUNAN" />
      <StatusBadge status="SIMULASI" />
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

function KpiCard({ label, value, sub, tone = "green", status, icon }) {
  return (
    <article className={`kpi-card tone-${tone}`}>
      <div className="kpi-head">
        <span>{label}</span>
        <span className="kpi-icon">
          <Icon name={icon || "arrow"} size={16} />
        </span>
      </div>
      <div className="kpi-value">{value}</div>
      <div className="kpi-sub">{sub}</div>
      {status && <StatusBadge status={status} />}
    </article>
  );
}

function SectionTitle({ kicker, title, aside }) {
  return (
    <div className="section-title">
      <div>
        <span className="eyebrow">{kicker}</span>
        <h2>{title}</h2>
      </div>
      {aside}
    </div>
  );
}

function Sparkline() {
  return (
    <div className="sparkline-wrap">
      <div className="sparkline-label">
        <span>Emisi Scope 1 + 2</span>
        <strong>
          −38,4% <small>vs baseline</small>
        </strong>
      </div>
      <svg
        className="sparkline"
        viewBox="0 0 640 150"
        preserveAspectRatio="none"
        role="img"
        aria-label="Tren emisi turun dari 2024 sampai 2030"
      >
        <defs>
          <linearGradient id="area" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0" stopColor="#36a67b" stopOpacity=".28" />
            <stop offset="1" stopColor="#36a67b" stopOpacity="0" />
          </linearGradient>
        </defs>
        <path
          d="M0 28 L106 38 L213 54 L320 72 L426 91 L533 110 L640 132 L640 150 L0 150Z"
          fill="url(#area)"
        />
        <polyline
          points="0,28 106,38 213,54 320,72 426,91 533,110 640,132"
          fill="none"
          stroke="#36a67b"
          strokeWidth="3"
        />
        <circle cx="0" cy="28" r="5" fill="#0f2a44" />
        <circle cx="640" cy="132" r="5" fill="#f0b429" />
      </svg>
      <div className="axis-labels">
        <span>2024 · {number(DATA.emisi.total.nilai, 0)} tCO₂e</span>
        <span>2030 · target −38,4%</span>
      </div>
    </div>
  );
}

function GateFunnel() {
  const gates = [
    ["G0", "Problem fit", 100],
    ["G1", "Data fit", 72],
    ["G2", "Technical fit", 46],
    ["G3", "Value fit", 25],
    ["G4", "Scale fit", 10],
  ];
  return (
    <div className="funnel">
      {gates.map(([gate, label, width], i) => (
        <div className="funnel-row" key={gate}>
          <span className={`gate-id ${i === 3 ? "current" : ""}`}>{gate}</span>
          <div className="funnel-track">
            <div
              style={{ width: `${width}%` }}
              className={i === 3 ? "current" : ""}
            >
              <b>{label}</b>
            </div>
          </div>
          <strong>{[12, 8, 4, 3, 1][i]}</strong>
        </div>
      ))}
    </div>
  );
}

function Dashboard({ live, onSelect }) {
  return (
    <div className="page page-dashboard">
      <div className="page-intro">
        <div>
          <span className="eyebrow">Q3 2027 · {DATA.meta.plant}</span>
          <p>
            {live
              ? "VALUE360 mengubah data operasional menjadi keputusan yang bisa dipertanggungjawabkan."
              : "Register ada. Meteran per titik belum ada. Inilah kondisi ISTW hari ini."}
          </p>
        </div>
        <StatusLegend />
      </div>
      <div className="kpi-grid">
        <KpiCard
          label="Social Value"
          value={live ? "1,68" : "—"}
          sub={live ? "SROI Akademi · 84 peserta" : "Belum terukur"}
          tone="amber"
          status={live ? "SIMULASI" : undefined}
          icon="people"
        />
        <KpiCard
          label="Carbon & Energy"
          value={live ? "87,8%" : "—"}
          sub={live ? "Scope 2 · prioritas utama" : "Baseline belum terurai"}
          tone="red"
          status={live ? "DATA_KASUS" : undefined}
          icon="bolt"
        />
        <KpiCard
          label="Data Quality"
          value={live ? "87 / 100" : "—"}
          sub={live ? "5 dimensi · investment ready" : "Tidak ada skor"}
          tone="blue"
          status={live ? "SIMULASI" : undefined}
          icon="shield"
        />
        <KpiCard
          label="Financial Value"
          value={live ? "2,8 thn" : "—"}
          sub={live ? "Payback proyek teratas" : "Portfolio kosong"}
          tone="green"
          status={live ? "ILUSTRATIF" : undefined}
          icon="arrow"
        />
        <KpiCard
          label="Risk control"
          value={live ? "G3" : "—"}
          sub={live ? "Gate sebelum CAPEX" : "Belum ada gate"}
          tone="navy"
          status={live ? "ASUMSI" : undefined}
          icon="shield"
        />
      </div>
      <div className="dashboard-grid">
        <section className="surface chart-surface">
          <SectionTitle
            kicker="CARBON TRAJECTORY"
            title="Emisi turun karena keputusan lebih tajam"
            aside={
              <span className="micro-note">BASELINE 2024 · TARGET 2030</span>
            }
          />
          {live ? (
            <Sparkline />
          ) : (
            <div className="chart-locked">
              <span className="lock-ring">?</span>
              <strong>Grafik akan terbuka setelah data tersedia</strong>
              <small>
                Toggle ke Dengan VALUE360 untuk melihat simulasi trajektori.
              </small>
            </div>
          )}
        </section>
        <section className="surface funnel-surface">
          <SectionTitle
            kicker="DECISION PIPELINE"
            title="Stage-gate portfolio"
            aside={<span className="micro-note">12 PROYEK AKTIF</span>}
          />
          {live ? (
            <GateFunnel />
          ) : (
            <div className="funnel-locked">
              <span>G0</span>
              <p>
                Gate belum dapat berjalan
                <br />
                <b>tanpa data terukur.</b>
              </p>
            </div>
          )}
          <div className="surface-foot">
            CAPEX baru keluar setelah <b>G3 · Value fit</b>
          </div>
        </section>
      </div>
      <div className="signal-strip">
        <span className="signal-mark">01</span>
        <div>
          <b>THE VALUE360 SIGNAL</b>
          <p>
            {live
              ? "Dari 28 titik kosong menjadi prioritas yang bisa dihitung, diuji, dan diputuskan."
              : "Satu sumber kebenaran untuk membuat konsumsi per titik terlihat."}
          </p>
        </div>
        <button onClick={() => onSelect("carbon")}>
          Buka Carbon Intelligence <Icon name="arrow" size={16} />
        </button>
      </div>
    </div>
  );
}

function ScopeCards({ live }) {
  return (
    <div className="scope-grid">
      <div className="scope-card scope-one">
        <div className="scope-head">
          <span>SCOPE 1</span>
          <StatusBadge status="DATA_KASUS" />
        </div>
        <strong>
          1.643,27 <small>tCO₂e</small>
        </strong>
        <div className="scope-foot">
          <span>12,2% dari baseline</span>
          <i style={{ width: "12.2%" }} />
        </div>
      </div>
      <div className="scope-card scope-two priority">
        <div className="scope-head">
          <span>SCOPE 2</span>
          <span className="priority-label">● PRIORITAS</span>
        </div>
        <strong>
          11.789,53 <small>tCO₂e</small>
        </strong>
        <div className="scope-foot">
          <span>87,8% dari baseline</span>
          <i style={{ width: "87.8%" }} />
        </div>
      </div>
      <div className="scope-card scope-three">
        <div className="scope-head">
          <span>SCOPE 3</span>
          <StatusBadge status="ASUMSI" />
        </div>
        <strong>
          4 <small>/ 15 kategori</small>
        </strong>
        <p>Dilaporkan sejak 2025 · tonase belum diungkap</p>
      </div>
    </div>
  );
}

function HotspotChart({ live, onSelect }) {
  const max = DATA.hotspot[0].kwh;
  return (
    <section className="surface hotspot-surface">
      <SectionTitle
        kicker="ELECTRICITY HOTSPOT MAP"
        title="Hotspot konsumsi listrik per area"
        aside={<span className="micro-note">28 TITIK TERDAFTAR</span>}
      />
      {live ? (
        <div className="hotspot-list" role="list">
          {DATA.hotspot.slice(0, 8).map((point, i) => (
            <button
              className={`hotspot-row ${i === 0 ? "top" : ""}`}
              key={point.nama}
              onClick={() =>
                onSelect(
                  DATA.portofolio[Math.min(i, DATA.portofolio.length - 1)],
                  point,
                )
              }
            >
              <span className="rank">{String(i + 1).padStart(2, "0")}</span>
              <span className="hotspot-name">{point.nama}</span>
              <span className="bar-track">
                <span
                  className={`bar-fill ${i < 2 ? "priority" : ""}`}
                  style={{ width: `${(point.kwh / max) * 100}%` }}
                />
              </span>
              <span className="hotspot-value">
                {number(point.kwh)} <small>kWh</small>
              </span>
              <Icon name="chevron" size={15} />
            </button>
          ))}
        </div>
      ) : (
        <div className="hotspot-empty">
          <div className="empty-map">
            {Array.from({ length: 28 }).map((_, i) => (
              <span key={i}>?</span>
            ))}
          </div>
          <EmptyState />
        </div>
      )}
      <div className="surface-foot hotspot-foot">
        <span>
          <i className="legend-dot priority" /> Prioritas · Scope 2
        </span>
        <span>
          <i className="legend-dot" /> Simulasi per titik
        </span>
        <StatusBadge status="SIMULASI" />
      </div>
    </section>
  );
}

function DqsCard({ live, onSelect }) {
  return (
    <section
      className="surface dqs-surface"
      onClick={live ? onSelect : undefined}
      role={live ? "button" : undefined}
      tabIndex={live ? 0 : undefined}
      onKeyDown={(e) => live && e.key === "Enter" && onSelect()}
    >
      <SectionTitle
        kicker="TRUST LAYER"
        title="Data Quality Score"
        aside={
          live ? (
            <span className="open-detail">
              Lihat dimensi <Icon name="arrow" size={14} />
            </span>
          ) : null
        }
      />
      <div className="dqs-main">
        <div className="dqs-ring" style={{ "--score": live ? 87 : 0 }}>
          <div>
            <strong>{live ? "87" : "—"}</strong>
            <small>/100</small>
          </div>
        </div>
        <div>
          <p className="dqs-verdict">
            {live ? "Investment ready" : "Belum terukur"}
          </p>
          <p className="dqs-copy">
            {live
              ? "Data cukup kuat untuk memulai prioritisasi, dengan traceability sebagai area penguatan."
              : "Tanpa data per titik, tidak ada skor kepercayaan yang dapat dipertanggungjawabkan."}
          </p>
        </div>
      </div>
      <div className="dqs-dims">
        {DATA.dqs.dimensi.map(([label, value]) => (
          <div className="dqs-dim" key={label}>
            <span>{label}</span>
            <b>{live ? value : "—"}</b>
            <i>
              <em style={{ width: live ? `${value}%` : "0%" }} />
            </i>
          </div>
        ))}
      </div>
    </section>
  );
}

function Portfolio({ live, onSelect }) {
  return (
    <section className="surface portfolio-surface">
      <SectionTitle
        kicker="DECISION QUEUE"
        title="Ranked Decarbonization Portfolio"
        aside={<span className="micro-note">SORTED BY VALUE</span>}
      />
      {live ? (
        <div className="portfolio-table-wrap">
          <table>
            <thead>
              <tr>
                <th>Nama proyek</th>
                <th>tCO₂e avoided</th>
                <th>Payback</th>
                <th>Gate</th>
                <th>Status</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {DATA.portofolio.map((project, i) => (
                <tr
                  key={project.nama}
                  onClick={() => onSelect(project)}
                  tabIndex="0"
                  onKeyDown={(e) => e.key === "Enter" && onSelect(project)}
                >
                  <td>
                    <span className="table-rank">0{i + 1}</span>
                    <b>{project.nama}</b>
                  </td>
                  <td>
                    <strong>{number(project.avoided, 0)}</strong>{" "}
                    <small>tCO₂e/thn</small>
                  </td>
                  <td>
                    <strong>{number(project.payback, 1)}</strong>{" "}
                    <small>tahun</small>
                  </td>
                  <td>
                    <span
                      className={`gate-pill ${project.gate === "G3" ? "active" : ""}`}
                    >
                      {project.gate}
                    </span>
                  </td>
                  <td>
                    <span className="table-status">{project.status}</span>
                  </td>
                  <td>
                    <Icon name="chevron" size={15} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <EmptyState />
      )}
      <div className="surface-foot">
        <span>
          Angka portfolio bersifat ilustratif untuk memperagakan cara kerja
          formula.
        </span>
        <StatusBadge status="ILUSTRATIF" />
      </div>
    </section>
  );
}

function Carbon({ live, onSelect }) {
  return (
    <div className="page page-carbon">
      <div className="page-intro carbon-intro">
        <div>
          <span className="eyebrow">SCREEN 02 / MOST IMPORTANT</span>
          <p>
            {live
              ? "Scope 2 adalah medan prioritas. VALUE360 mengubah 87,8% yang “tidak bisa ditembak” menjadi daftar lokasi dan proyek."
              : "Ini kondisi ISTW hari ini. Register ada, meteran per titik tidak ada."}
          </p>
        </div>
        <div className="demo-callout">
          <span>DEMO FLOW</span>
          <b>toggle → hotspot → DQS</b>
        </div>
      </div>
      <ScopeCards live={live} />
      <div className="carbon-grid">
        <HotspotChart live={live} onSelect={onSelect} />
        <DqsCard
          live={live}
          onSelect={() => onSelect(DATA.portofolio[0], DATA.hotspot[0])}
        />
      </div>
      <Portfolio
        live={live}
        onSelect={(project) =>
          onSelect(
            project,
            DATA.hotspot.find((point) => project.nama.startsWith(point.nama)),
          )
        }
      />
    </div>
  );
}

function OutcomeLadder({ live }) {
  const steps = [
    ["01", "Input", "Mitra, modul, instruktur"],
    ["02", "Output", "Kelas & sertifikasi"],
    ["03", "Outcome", "Penempatan 6–12 bln"],
    ["04", "Impact", "SROI terukur"],
  ];
  return (
    <div className="outcome-ladder">
      {steps.map(([num, label, text], i) => (
        <div
          key={label}
          className={`outcome-step ${i > 1 ? "future" : ""} ${i === 3 && live ? "highlight" : ""}`}
        >
          <span>{num}</span>
          <strong>{label}</strong>
          <small>{live || i < 2 ? text : "Belum terukur"}</small>
          <i>{i < 2 || live ? "✓" : "—"}</i>
        </div>
      ))}
    </div>
  );
}

function Shared({ live }) {
  return (
    <div className="page page-shared">
      <div className="page-intro">
        <div>
          <span className="eyebrow">SCREEN 03 / SOCIAL VALUE</span>
          <p>
            {live
              ? "Aktivitas tidak berhenti pada jumlah peserta. Tangga outcome memastikan manfaat dapat dibuktikan sampai impact."
              : "ISTW hari ini berhenti pada aktivitas dan output. Outcome belum dilacak."}
          </p>
        </div>
        <span className="pill-label">MESIN 01 · PEOPLE</span>
      </div>
      <div className="shared-hero surface">
        <div className="shared-hero-copy">
          <span className="eyebrow">OUTCOME LADDER</span>
          <h2>Aktivitas → bukti → nilai bersama</h2>
          <p>
            Empat anak tangga yang membuat program sosial terbaca sebagai
            keputusan bisnis, tanpa menghapus charity esensial.
          </p>
          <StatusBadge status={live ? "SIMULASI" : "ASUMSI"} />
        </div>
        <OutcomeLadder live={live} />
      </div>
      <div className="shared-grid">
        <section className="surface sroi-card">
          <SectionTitle
            kicker="RETURN ON SOCIAL INVESTMENT"
            title="SROI Akademi"
          />
          <div className="sroi-value">
            {live ? "1,68" : "—"}
            <small>nilai sosial / Rp1 investasi</small>
          </div>
          <div className="sroi-bar">
            <span style={{ width: live ? "68%" : "0%" }} />
          </div>
          <p>
            {live
              ? "Setiap Rp1 investasi ilustratif mengembalikan Rp1,68 nilai sosial terukur."
              : "Belum dapat diukur sebelum outcome peserta dilacak."}
          </p>
          <StatusBadge status="ILUSTRATIF" />
        </section>
        <section className="surface participant-card">
          <SectionTitle
            kicker="COHORT DISTRIBUTION"
            title="Jalur peserta"
            aside={
              <span className="micro-note">
                {live ? "84 PESERTA" : "— PESERTA"}
              </span>
            }
          />
          {DATA.sosial.jalur.map(([label, value], i) => (
            <div className="participant-row" key={label}>
              <span>{label}</span>
              <div>
                <i style={{ width: live ? `${(value / 84) * 100}%` : 0 }} />
              </div>
              <b>{live ? value : "—"}</b>
            </div>
          ))}
          <div className="cohort-footer">
            <span className="cohort-avatar">K01</span>
            <span>
              <b>{DATA.sosial.kohort}</b>
              <small>
                Status:{" "}
                {live ? "berjalan · checkpoint 90 hari" : "belum dibuka"}
              </small>
            </span>
          </div>
        </section>
      </div>
      <div className="principle-strip">
        <span>PRINSIP</span>
        <b>Outcome tercatat, bukan sekadar kegiatan.</b>
        <span className="strip-arrow">
          <Icon name="arrow" size={16} />
        </span>
      </div>
    </div>
  );
}

function Governance({ live }) {
  return (
    <div className="page page-governance">
      <div className="page-intro">
        <div>
          <span className="eyebrow">SCREEN 04 / DECISION CONTROL</span>
          <p>
            {live
              ? "Governance menjaga agar proyek yang menjanjikan tidak melompati data fit dan value fit."
              : "Tanpa angka yang dapat dilacak, keputusan CAPEX belum punya gerbang yang kuat."}
          </p>
        </div>
        <span className="pill-label">MESIN 03 · CONTROL</span>
      </div>
      <section className="surface gate-pipeline">
        <SectionTitle
          kicker="STAGE-GATE PIPELINE"
          title="Portfolio per gerbang"
          aside={<span className="micro-note">G0 → G4 · CAPEX AFTER G3</span>}
        />
        <div className="pipeline-grid">
          {DATA.governance.gates.map(([gate, label, count], i) => (
            <div
              className={`pipeline-col ${gate === "G3" ? "active" : ""}`}
              key={gate}
            >
              <div className="pipeline-label">
                <span>{gate}</span>
                <b>{live ? count : "—"}</b>
              </div>
              <div className="pipeline-bar">
                <i
                  style={{
                    height: live ? `${Math.max(count * 8, 12)}%` : "0%",
                  }}
                />
              </div>
              <strong>{label}</strong>
              <small>
                {gate === "G3"
                  ? "CAPEX gate"
                  : gate === "G4"
                    ? "Scale"
                    : "Review"}
              </small>
            </div>
          ))}
        </div>
        <div className="gate-note">
          <span>G3</span>
          <p>
            Value fit menjadi titik disiplin:{" "}
            <b>reduksi besar + payback lambat</b> tidak otomatis ditolak;
            trade-off wajib tertulis.
          </p>
        </div>
      </section>
      <div className="governance-grid">
        <section className="surface scorecard">
          <SectionTitle
            kicker="QUARTERLY SCORECARD"
            title="Lima dimensi keputusan"
          />
          {DATA.governance.scorecard.map(([label, value]) => (
            <div className="score-row" key={label}>
              <span>{label}</span>
              <div>
                <i style={{ width: live ? `${value}%` : "0%" }} />
              </div>
              <b>{live ? value : "—"}</b>
            </div>
          ))}
        </section>
        <section className="surface raci-card">
          <SectionTitle kicker="OPERATING MODEL" title="RACI ringkas" />
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
          <div className="raci-lines">
            <div>
              <span>Data owner</span>
              <b>R · A</b>
            </div>
            <div>
              <span>Value committee</span>
              <b>A · C</b>
            </div>
            <div>
              <span>Finance + HSE</span>
              <b>C · I</b>
            </div>
          </div>
          <StatusBadge status="ASUMSI" />
        </section>
      </div>
      <div className="principle-strip">
        <span>GUARDRAIL</span>
        <b>Data owner + audit trail di setiap gerbang.</b>
        <span className="strip-arrow">
          <Icon name="arrow" size={16} />
        </span>
      </div>
    </div>
  );
}

function DetailDrawer({ selection, onClose }) {
  useEffect(() => {
    if (!selection) return undefined;
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selection, onClose]);
  if (!selection) return null;
  const { project, point } = selection;
  const annual = project.benefit.reduce((a, b) => a + b, 0);
  return (
    <div
      className="drawer-backdrop"
      onMouseDown={(e) => e.target === e.currentTarget && onClose()}
    >
      <aside
        className="detail-drawer"
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
      >
        <div className="drawer-top">
          <div>
            <span className="eyebrow">PROJECT DETAIL · {project.gate}</span>
            <h2 id="drawer-title">{project.nama}</h2>
          </div>
          <button
            className="icon-button"
            onClick={onClose}
            aria-label="Tutup panel detail"
          >
            <Icon name="close" size={20} />
          </button>
        </div>
        <div className="drawer-context">
          <span>{point?.nama || "Portfolio project"}</span>
          <StatusBadge status="SIMULASI" />
        </div>
        <div className="drawer-kpis">
          <div>
            <span>PAYBACK</span>
            <b>
              {number(project.payback, 1)} <small>tahun</small>
            </b>
          </div>
          <div>
            <span>AVOIDED</span>
            <b>
              {number(project.avoided)} <small>tCO₂e/thn</small>
            </b>
          </div>
          <div>
            <span>GATE</span>
            <b>{project.gate}</b>
          </div>
        </div>
        <section className="drawer-section">
          <SectionTitle
            kicker="ECONOMIC BRIDGE"
            title="Annual net benefit"
            aside={<span className="micro-note">ILUSTRATIF</span>}
          />
          <div className="benefit-list">
            {[
              "Energy saving",
              "Maintenance saving",
              "Productivity value",
              "Social value",
              "Risk avoided",
            ].map((label, i) => (
              <div key={label}>
                <span>{label}</span>
                <b>{money(project.benefit[i])}</b>
              </div>
            ))}
            <div className="benefit-total">
              <span>Total annual benefit</span>
              <b>{money(annual)}</b>
            </div>
          </div>
        </section>
        <section className="drawer-section detail-metrics">
          <div>
            <span>CAPEX</span>
            <b>{money(project.capex)}</b>
            <StatusBadge status="ASUMSI" />
          </div>
          <div>
            <span>CARBON EFFICIENCY</span>
            <b>−Rp {number(Math.abs(project.efficiency))}/tCO₂e</b>
            <StatusBadge status="ILUSTRATIF" />
          </div>
        </section>
        <div className="drawer-note">
          <span>i</span>
          <p>
            Angka simulasi untuk memperagakan formula. Angka aktual dikunci
            setelah sub-metering 90 hari pertama.
          </p>
        </div>
        <button className="drawer-close" onClick={onClose}>
          Kembali ke portfolio <Icon name="arrow" size={16} />
        </button>
      </aside>
    </div>
  );
}

function App() {
  const [active, setActive] = useState("carbon");
  const [live, setLive] = useState(false);
  const [selection, setSelection] = useState(null);
  const currentIndex = useMemo(
    () => nav.findIndex((item) => item.id === active),
    [active],
  );
  useEffect(() => {
    const onKey = (e) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;
      if (e.key === " ") {
        e.preventDefault();
        setLive((value) => !value);
      }
      const item = nav.find((entry) => entry.key === e.key);
      if (item) {
        setActive(item.id);
        setSelection(null);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);
  const selectProject = (project, point) => setSelection({ project, point });
  return (
    <div className="app-shell">
      <Sidebar
        active={active}
        onChange={(id) => {
          setActive(id);
          setSelection(null);
        }}
      />
      <main className="main-shell">
        <Header
          active={active}
          live={live}
          onToggle={() => setLive((value) => !value)}
        />
        <div className="main-scroll">
          <div className="screen-container">
            {active === "dashboard" && (
              <Dashboard live={live} onSelect={setActive} />
            )}
            {active === "carbon" && (
              <Carbon live={live} onSelect={selectProject} />
            )}
            {active === "shared" && <Shared live={live} />}
            {active === "governance" && <Governance live={live} />}
          </div>
          <footer className="global-footer">
            <span>
              Angka konsumsi per titik bersifat simulasi. Angka aktual dikunci
              setelah sub-metering 90 hari pertama.
            </span>
            <span>© 2027 ISTW VALUE360 · {currentIndex + 1}/4</span>
          </footer>
        </div>
      </main>
      <DetailDrawer selection={selection} onClose={() => setSelection(null)} />
    </div>
  );
}

createRoot(document.getElementById("root")).render(<App />);
