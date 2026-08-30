/**
 * Hyper-Local Community Outbreak Alert Map
 * Stores anonymous disease reports and provides heatmap data.
 */

const outbreakReports = [];

// Seed data for demo
const SEED_REPORTS = [
  { id: 's1', crop: 'Rice', disease: 'Rice Blast', lat: 20.5937, lng: 78.9629, severity: 'High', district: 'Nagpur', state: 'Maharashtra', reports: 45, date: '2026-08-25' },
  { id: 's2', crop: 'Rice', disease: 'Brown Spot', lat: 19.0760, lng: 72.8777, severity: 'Moderate', district: 'Mumbai', state: 'Maharashtra', reports: 22, date: '2026-08-26' },
  { id: 's3', crop: 'Wheat', disease: 'Yellow Rust', lat: 30.7333, lng: 76.7794, severity: 'High', district: 'Chandigarh', state: 'Punjab', reports: 67, date: '2026-08-24' },
  { id: 's4', crop: 'Rice', disease: 'Tungro', lat: 25.6093, lng: 85.1376, severity: 'Severe', district: 'Patna', state: 'Bihar', reports: 89, date: '2026-08-23' },
  { id: 's5', crop: 'Tomato', disease: 'Late Blight', lat: 12.9716, lng: 77.5946, severity: 'High', district: 'Bangalore', state: 'Karnataka', reports: 34, date: '2026-08-27' },
  { id: 's6', crop: 'Maize', disease: 'Leaf Blight', lat: 26.8467, lng: 80.9462, severity: 'Moderate', district: 'Lucknow', state: 'Uttar Pradesh', reports: 18, date: '2026-08-27' },
  { id: 's7', crop: 'Cotton', disease: 'Bacterial Blight', lat: 23.0225, lng: 72.5714, severity: 'Low', district: 'Ahmedabad', state: 'Gujarat', reports: 12, date: '2026-08-26' },
  { id: 's8', crop: 'Rice', disease: 'Sheath Blight', lat: 16.5062, lng: 80.6480, severity: 'Moderate', district: 'Vijayawada', state: 'Andhra Pradesh', reports: 31, date: '2026-08-25' },
  { id: 's9', crop: 'Potato', disease: 'Late Blight', lat: 22.5726, lng: 88.3639, severity: 'High', district: 'Kolkata', state: 'West Bengal', reports: 56, date: '2026-08-24' },
  { id: 's10', crop: 'Banana', disease: 'Panama Disease', lat: 10.8505, lng: 76.2711, severity: 'Severe', district: 'Kochi', state: 'Kerala', reports: 73, date: '2026-08-23' },
  { id: 's11', crop: 'Rice', disease: 'Bacterial Leaf Blight', lat: 28.6139, lng: 77.2090, severity: 'Moderate', district: 'New Delhi', state: 'Delhi', reports: 28, date: '2026-08-27' },
  { id: 's12', crop: 'Sugarcane', disease: 'Red Rot', lat: 26.8467, lng: 80.9462, severity: 'High', district: 'Kanpur', state: 'Uttar Pradesh', reports: 41, date: '2026-08-26' },
  { id: 's13', crop: 'Soybean', disease: 'Rust', lat: 23.2599, lng: 77.4126, severity: 'Moderate', district: 'Bhopal', state: 'Madhya Pradesh', reports: 25, date: '2026-08-25' },
  { id: 's14', crop: 'Groundnut', disease: 'Leaf Spot', lat: 21.1702, lng: 72.8311, severity: 'Low', district: 'Surat', state: 'Gujarat', reports: 9, date: '2026-08-27' },
  { id: 's15', crop: 'Rice', disease: 'Rice Blast', lat: 15.3173, lng: 75.7139, severity: 'High', district: 'Hubli', state: 'Karnataka', reports: 52, date: '2026-08-24' },
];

outbreakReports.push(...SEED_REPORTS);

function getSeverityWeight(sev) {
  switch (sev) {
    case 'Severe': return 4;
    case 'High': return 3;
    case 'Moderate': return 2;
    case 'Low': return 1;
    default: return 1;
  }
}

export function generateOutbreakMapData(filters = {}) {
  let reports = [...outbreakReports];

  if (filters.crop) reports = reports.filter(r => r.crop.toLowerCase() === filters.crop.toLowerCase());
  if (filters.state) reports = reports.filter(r => r.state.toLowerCase() === filters.state.toLowerCase());
  if (filters.disease) reports = reports.filter(r => r.disease.toLowerCase().includes(filters.disease.toLowerCase()));

  const totalReports = reports.reduce((s, r) => s + r.reports, 0);
  const totalLocations = reports.length;
  const severeCount = reports.filter(r => r.severity === 'Severe').length;
  const highCount = reports.filter(r => r.severity === 'High').length;

  const stateSummary = {};
  reports.forEach(r => {
    if (!stateSummary[r.state]) stateSummary[r.state] = { reports: 0, locations: 0, diseases: new Set() };
    stateSummary[r.state].reports += r.reports;
    stateSummary[r.state].locations += 1;
    stateSummary[r.state].diseases.add(r.disease);
  });

  const hotspots = Object.entries(stateSummary).map(([state, data]) => ({
    state,
    totalReports: data.reports,
    locations: data.locations,
    diseases: [...data.diseases],
    riskLevel: data.reports > 100 ? 'Critical' : data.reports > 50 ? 'High' : data.reports > 20 ? 'Moderate' : 'Low'
  })).sort((a, b) => b.totalReports - a.totalReports);

  const diseaseTrends = {};
  reports.forEach(r => {
    if (!diseaseTrends[r.disease]) diseaseTrends[r.disease] = { count: 0, totalReports: 0, states: new Set() };
    diseaseTrends[r.disease].count += 1;
    diseaseTrends[r.disease].totalReports += r.reports;
    diseaseTrends[r.disease].states.add(r.state);
  });

  const topDiseases = Object.entries(diseaseTrends)
    .map(([name, d]) => ({ name, occurrences: d.count, totalReports: d.totalReports, states: [...d.states] }))
    .sort((a, b) => b.totalReports - a.totalReports)
    .slice(0, 5);

  return {
    summary: {
      totalReports,
      totalLocations,
      severeOutbreaks: severeCount,
      highAlerts: highCount,
      overallThreatLevel: severeCount > 3 ? 'Critical' : severeCount > 1 ? 'High' : highCount > 3 ? 'Moderate' : 'Low'
    },
    markers: reports.map(r => ({
      ...r,
      weight: getSeverityWeight(r.severity),
      pulse: r.severity === 'Severe'
    })),
    hotspots,
    topDiseases,
    recentAlerts: reports.filter(r => {
      const d = new Date(r.date);
      const now = new Date();
      return (now - d) < 5 * 24 * 60 * 60 * 1000;
    }).sort((a, b) => new Date(b.date) - new Date(a.date))
  };
}

export function addOutbreakReport(report) {
  const newReport = {
    id: `r-${Date.now()}`,
    crop: report.crop || 'Unknown',
    disease: report.disease || 'Unknown',
    lat: report.lat || 20.5937,
    lng: report.lng || 78.9629,
    severity: report.severity || 'Moderate',
    district: report.district || 'Unknown',
    state: report.state || 'Unknown',
    reports: report.reports || 1,
    date: new Date().toISOString().split('T')[0]
  };
  outbreakReports.push(newReport);
  return newReport;
}
