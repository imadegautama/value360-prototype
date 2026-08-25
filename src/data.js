export const DATA = {
  meta: {
    periode: 'Simulasi Q3 2027',
    baselineTahun: 2024,
    plant: 'PT Indonesia Steel Tube Works',
  },
  emisi: {
    scope1: { nilai: 1643.27, porsi: 12.2, status: 'DATA_KASUS' },
    scope2: { nilai: 11789.53, porsi: 87.8, status: 'DATA_KASUS' },
    total: { nilai: 13432.8, status: 'TURUNAN' },
    scope3: {
      status: 'PARSIAL',
      catatan: '4 dari 15 kategori dilaporkan sejak 2025 · tonase belum diungkap',
    },
  },
  hotspot: [
    ['Mill 1', 248400, 'prioritas'], ['Mill 2', 209800, 'prioritas'],
    ['Welding 1', 158600, 'discovery'], ['Cooling Tower', 136900, 'discovery'],
    ['Compressor', 121400, 'discovery'], ['Cutting Mill', 104700, 'discovery'],
    ['Facing 1', 86400, 'monitor'], ['Roll Shop', 79200, 'monitor'],
    ['Galva 1', 73100, 'monitor'], ['Line Crane PS', 55800, 'monitor'],
    ['Welding 2', 52400, 'monitor'], ['Facing 2', 48100, 'monitor'],
    ['Slitter', 43200, 'monitor'], ['Line Crane GS', 39400, 'monitor'],
    ['Factory Light', 29400, 'monitor'], ['Lampu Line Recutting', 26400, 'monitor'],
    ['Lampu Luar Recutting', 22300, 'monitor'], ['Hydro Statis', 19800, 'monitor'],
    ['Printing Lightning', 18600, 'monitor'], ['Mesin Printing', 17200, 'monitor'],
    ['Galva 2', 16900, 'monitor'], ['IPAL', 15200, 'monitor'],
    ['Water Supply', 12800, 'monitor'], ['QA', 9400, 'monitor'],
    ['Handrail', 8300, 'monitor'], ['Recutting', 7700, 'monitor'],
    ['Office', 6300, 'monitor'], ['Mess', 5100, 'monitor'],
  ].map(([nama, kwh, prioritas]) => ({ nama, kwh, prioritas, status: 'SIMULASI' })),
  portofolio: [
    {
      nama: 'Mill 1 · Variable Speed Drive', avoided: 800, payback: 2.8,
      gate: 'G3', status: 'Value fit', capex: 1204000000,
      benefit: [430000000, 126000000, 98000000, 72000000, 134000000],
      efficiency: -537500,
    },
    {
      nama: 'Mill 2 · Motor Efficiency Retrofit', avoided: 594, payback: 3.4,
      gate: 'G2', status: 'Technical fit', capex: 964000000,
      benefit: [284000000, 92000000, 61000000, 52000000, 84000000],
      efficiency: -477000,
    },
    {
      nama: 'Compressed Air Leak Program', avoided: 328, payback: 1.9,
      gate: 'G1', status: 'Data fit', capex: 286000000,
      benefit: [150000000, 44000000, 26000000, 18000000, 43000000],
      efficiency: -454000,
    },
    {
      nama: 'Cooling Tower Optimization', avoided: 241, payback: 4.1,
      gate: 'G1', status: 'Data fit', capex: 791000000,
      benefit: [193000000, 52000000, 41000000, 28000000, 54000000],
      efficiency: -327000,
    },
  ],
  dqs: {
    total: 87,
    dimensi: [
      ['Completeness', 92], ['Timeliness', 85], ['Traceability', 84],
      ['Measurement method', 88], ['Approval', 86],
    ],
  },
  sosial: {
    sroi: 1.68,
    peserta: 84,
    jalur: [['Green Maintenance', 38], ['SteelSkill', 27], ['Supervisor track', 19]],
    kohort: 'Kohort 01 · 2027',
  },
  governance: {
    gates: [
      ['G0', 'Problem fit', 5], ['G1', 'Data fit', 8], ['G2', 'Technical fit', 4],
      ['G3', 'Value fit', 3], ['G4', 'Scale fit', 1],
    ],
    scorecard: [['Strategic fit', 88], ['Carbon impact', 84], ['Social value', 79], ['Financial case', 82], ['Readiness', 76]],
  },
}

export const STATUS_LABELS = {
  DATA_KASUS: 'DATA KASUS', TURUNAN: 'TURUNAN', ASUMSI: 'ASUMSI',
  ILUSTRATIF: 'ILUSTRATIF', SIMULASI: 'SIMULASI',
}

export const money = (value) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', maximumFractionDigits: 0 }).format(value)
export const number = (value, digits = 0) => new Intl.NumberFormat('id-ID', { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(value)
