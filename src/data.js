export const DATA = {
  meta: {
    periode: 'Simulasi Q3 2027',
    baselineTahun: 2024,
    plant: 'PT Indonesia Steel Tube Works',
  },
  dashboard: {
    periods: [
      { id: 'q1', label: 'Q1 2027' },
      { id: 'q2', label: 'Q2 2027' },
      { id: 'q3', label: 'Q3 2027' },
    ],
    defaultPeriod: 'q3',
    funnelTitle: 'Stage-Gate Pipeline',
    emissionTrend: {
      title: 'Tren Emisi Scope 1+2 2024-2027',
      unit: 'tCO2e',
      baseline: 18800,
      basePoints: [
        { year: '2024', label: 'Baseline', value: 18800 },
        { year: '2025', label: 'Actual', value: 16950 },
        { year: '2026', label: 'Actual', value: 15260 },
      ],
      legend: 'Emisi Scope 1+2 (tCO2e)',
    },
    byPeriod: {
      q1: {
        kpi: {
          social: { icon: 'people', label: 'Social Value', value: 'SROI 1:1.6', sub: '24 peserta tersertifikasi', trendDir: 'up', trend: '5%', trendNote: 'vs Q4 2026' },
          carbon: { icon: 'leaf', label: 'Carbon & Energy', value: '17.200,00', unit: 'tCO2e', trendDir: 'down', trend: '3%', trendNote: 'dari baseline 2024' },
          dataQuality: { icon: 'database', label: 'Data Quality', value: '74', unit: 'DQS Score', percent: 74, note: 'Data Quality Score' },
          financial: { icon: 'dollar', label: 'Financial Value', value: 'Rp 0,4 M', unit: 'Net Benefit', sub: 'Payback 3.6 tahun', trendDir: 'up', trend: '6%', trendNote: 'vs Q4 2026' },
          risk: { icon: 'warning', label: 'Risk', value: 'Medium Risk', sub: 'Perlu perhatian', note: '2 gate tertunda', barPercent: 58 },
        },
        emission: { value: 17200, label: 'YTD (Q1)' },
        funnel: {
          total: 33,
          stages: [
            { gate: 'G0', label: 'Ideation', value: 16, investasi: 1.8 },
            { gate: 'G1', label: 'Screening', value: 9, investasi: 3.1 },
            { gate: 'G2', label: 'Feasibility', value: 5, investasi: 4.7 },
            { gate: 'G3', label: 'Implementation', value: 2, investasi: 7.4 },
            { gate: 'G4', label: 'Impact & Scale', value: 1, investasi: 4.4 },
          ],
        },
      },
      q2: {
        kpi: {
          social: { icon: 'people', label: 'Social Value', value: 'SROI 1:2.0', sub: '33 peserta tersertifikasi', trendDir: 'up', trend: '9%', trendNote: 'vs Q1 2027' },
          carbon: { icon: 'leaf', label: 'Carbon & Energy', value: '15.700,00', unit: 'tCO2e', trendDir: 'down', trend: '6%', trendNote: 'dari baseline 2024' },
          dataQuality: { icon: 'database', label: 'Data Quality', value: '81', unit: 'DQS Score', percent: 81, note: 'Data Quality Score' },
          financial: { icon: 'dollar', label: 'Financial Value', value: 'Rp 0,8 M', unit: 'Net Benefit', sub: 'Payback 2.9 tahun', trendDir: 'up', trend: '13%', trendNote: 'vs Q1 2027' },
          risk: { icon: 'warning', label: 'Risk', value: 'Low-Medium Risk', sub: 'Terkendali', note: '1 gate tertunda', barPercent: 78 },
        },
        emission: { value: 15700, label: 'YTD (Q2)' },
        funnel: {
          total: 50,
          stages: [
            { gate: 'G0', label: 'Ideation', value: 20, investasi: 2.7 },
            { gate: 'G1', label: 'Screening', value: 14, investasi: 4.7 },
            { gate: 'G2', label: 'Feasibility', value: 9, investasi: 7.0 },
            { gate: 'G3', label: 'Implementation', value: 5, investasi: 11.1 },
            { gate: 'G4', label: 'Impact & Scale', value: 2, investasi: 6.6 },
          ],
        },
      },
      q3: {
        kpi: {
          social: { icon: 'people', label: 'Social Value', value: 'SROI 1:2.4', sub: '42 peserta tersertifikasi', trendDir: 'up', trend: '12%', trendNote: 'vs Q2 2027' },
          carbon: { icon: 'leaf', label: 'Carbon & Energy', value: '13.432,80', unit: 'tCO2e', trendDir: 'down', trend: '8%', trendNote: 'dari baseline 2024' },
          dataQuality: { icon: 'database', label: 'Data Quality', value: '87', unit: 'DQS Score', percent: 87, note: 'Data Quality Score' },
          financial: { icon: 'dollar', label: 'Financial Value', value: 'Rp 1,2 M', unit: 'Net Benefit', sub: 'Payback 2.3 tahun', trendDir: 'up', trend: '18%', trendNote: 'vs Q2 2027' },
          risk: { icon: 'warning', label: 'Risk', value: 'Low Risk', sub: 'Under Control', note: 'All Pass Score', barPercent: 100 },
        },
        emission: { value: 13433, label: 'YTD (Q3)' },
        funnel: {
          total: 65,
          stages: [
            { gate: 'G0', label: 'Ideation', value: 24, investasi: 3.6 },
            { gate: 'G1', label: 'Screening', value: 18, investasi: 6.2 },
            { gate: 'G2', label: 'Feasibility', value: 12, investasi: 9.4 },
            { gate: 'G3', label: 'Implementation', value: 7, investasi: 14.8 },
            { gate: 'G4', label: 'Impact & Scale', value: 4, investasi: 8.8 },
          ],
        },
      },
    },
  },
  sharedValueEngine: {
    quarter: 'Q3 2027',
    kpis: [
      {
        icon: 'people', title: '1. Input / Activity', value: 60,
        sub: 'peserta terdaftar', trend: 8,
        spark: [0.3, 0.5, 0.35, 0.6, 0.5, 0.7, 0.55, 0.85],
      },
      {
        icon: 'certificate', title: '2. Output', value: 52,
        sub: 'lulus sertifikasi', trend: 12,
        spark: [0.4, 0.3, 0.55, 0.4, 0.65, 0.5, 0.75, 0.9],
      },
      {
        icon: 'briefcase', title: '3. Outcome (6–12 bulan)', value: 38,
        sub: 'ditempatkan kerja', trend: 15,
        spark: [0.25, 0.45, 0.3, 0.55, 0.4, 0.6, 0.5, 0.8],
      },
      {
        icon: 'target', title: '4. Impact (SROI)', value: '1:2.4',
        sub: 'SROI terverifikasi', trend: 10,
        spark: [0.35, 0.5, 0.4, 0.65, 0.55, 0.75, 0.6, 0.9],
      },
    ],
    sroi: {
      ratio: '1:2.4',
      note: 'Setiap Rp1 investasi menghasilkan Rp2,4 nilai sosial',
      stats: [
        { icon: 'coins', label: 'Total Investasi', value: 'Rp 1,85 M', trend: 9 },
        { icon: 'people', label: 'Total Nilai Sosial', value: 'Rp 4,44 M', trend: 11 },
        { icon: 'trend', label: 'Net Social Value', value: 'Rp 2,59 M', trend: 13 },
      ],
      banner: 'Peningkatan nilai sosial periode ini sebesar 13% dibandingkan periode sebelumnya.',
    },
    trackDistribution: {
      total: 60,
      segments: [
        { label: 'Las & Fabrikasi Baja', percent: 62, count: 37, tone: 'dark' },
        { label: 'Green Maintenance & Energy Efficiency', percent: 38, count: 23, tone: 'light' },
      ],
      banner: 'Mayoritas peserta memilih track Las & Fabrikasi Baja.',
    },
    cohorts: [
      { name: 'SteelSkill Cohort 2027-1', track: 'Las & Fabrikasi Baja', period: '1 Jul – 30 Sep 2027', participants: 30, completion: 83, placement: 70, status: 'Berjalan' },
      { name: 'SteelSkill Cohort 2027-2', track: 'Green Maintenance & Energy Efficiency', period: '1 Jul – 30 Sep 2027', participants: 30, completion: 67, placement: 55, status: 'Berjalan' },
      { name: 'SteelSkill Cohort 2027-1', track: 'Las & Fabrikasi Baja', period: '1 Jul – 30 Sep 2027', participants: 30, completion: 83, placement: 70, status: 'Berjalan' },
      { name: 'SteelSkill Cohort 2027-2', track: 'Green Maintenance & Energy Efficiency', period: '1 Jul – 30 Sep 2027', participants: 30, completion: 67, placement: 55, status: 'Berjalan' },
    ],
  },
  carbonIntelligence: {
    quarter: 'Q3 2027',
    scopes: [
      { icon: 'factory', label: 'Scope 1', value: '1.643,27', unit: 'tCO2e', percent: '12,2%', note: 'dari total emisi' },
      { icon: 'bolt', label: 'Scope 2', value: '11.789,53', unit: 'tCO2e', percent: '87,8%', note: 'dari total emisi', priority: true },
      { icon: 'share', label: 'Scope 3', value: 'Belum terkuantifikasi', sub: '(screening berjalan)', percent: '—', note: 'Data akan diperbarui setelah screening selesai' },
    ],
    hotspot: {
      co2Factor: 0.85,
      units: {
        kwh: { id: 'kwh', label: 'kWh', axisMax: 2500000, axisStep: 500000 },
        tco2e: { id: 'tco2e', label: 'tCO2e', axisMax: 2000, axisStep: 400 },
      },
      areas: [
        { area: 'Mill 1', kwh: 2346189 },
        { area: 'Welding', kwh: 1876522 },
        { area: 'Cutting', kwh: 1302771 },
        { area: 'Compressor', kwh: 1025340 },
        { area: 'Cooling Tower', kwh: 748612 },
        { area: 'Others', kwh: 512830 },
      ],
    },
    portfolio: [
      { name: 'Kompresor VSD', avoided: '1.256,40', payback: '1,8', status: 'Approved' },
      { name: 'Panel Surya Perluasan', avoided: '2.843,75', payback: '3,6', status: 'Under Review' },
      { name: 'LED Retrofit', avoided: '486,21', payback: '1,2', status: 'Approved' },
    ],
    dqs: {
      score: 87,
      dims: [
        { icon: 'checkCircle', label: 'Completeness', value: 92 },
        { icon: 'clock', label: 'Timeliness', value: 85 },
        { icon: 'link', label: 'Traceability', value: 84 },
      ],
    },
  },
  governance: {
    scorecard: [['Strategic fit', 88], ['Carbon impact', 84], ['Social value', 79], ['Financial case', 82], ['Readiness', 76]],
    auditCompliance: { value: 96, trend: '3%', trendNote: 'vs Q2 2027' },
    operatingModel: [
      { pihak: 'Data Owner', peran: 'R · A', cakupan: 'Kualitas data, traceability, dan sumber pengukuran', status: 'Aktif' },
      { pihak: 'Value Committee', peran: 'A · C', cakupan: 'Keputusan gate G2-G4 dan trade-off nilai', status: 'Aktif' },
      { pihak: 'Finance + HSE', peran: 'C · I', cakupan: 'Validasi CAPEX dan risiko keselamatan', status: 'Aktif' },
      { pihak: 'Internal Audit', peran: 'I', cakupan: 'Audit trail dan kepatuhan tiap kuartal', status: 'Terjadwal' },
    ],
  },
}

export const money = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)
export const number = (value, digits = 0) => new Intl.NumberFormat('id-ID', { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(value)
