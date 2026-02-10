export interface MockDesign {
  designId: string;
  tbParentId: string;
  jobName: string;
  rosterName?: string;
  playerName?: string;
  playerNumber?: string;
  thumbnail: string;
  lastUpdatedDate: string;
  lastOrderedDate?: string;
  isTeamBuilder: boolean;
  isArchived: boolean;
}

export const mockDesigns: MockDesign[] = [
  {
    designId: 'DES-1001',
    tbParentId: 'JOB-100',
    jobName: 'Eagles 2024 Uniforms',
    rosterName: 'Varsity Squad',
    playerName: 'Alex Carter',
    playerNumber: '12',
    thumbnail: 'https://via.placeholder.com/160x160?text=DES-1001',
    lastUpdatedDate: '2024-11-15T00:00:00.000Z',
    lastOrderedDate: '2024-11-18',
    isTeamBuilder: true,
    isArchived: false,
  },
];

export function getDesignById(designId: string) {
  return mockDesigns.find((design) => design.designId === designId) ?? null;
}

export function getJobByParentId(jobId: string) {
  const items = mockDesigns.filter((design) => design.tbParentId === jobId);
  if (!items.length) return null;
  return {
    tbParentId: jobId,
    jobName: items[0].jobName,
    primaryRosterName: items[0].rosterName,
    designCount: items.length,
  };
}

export function getPlayersForJob(jobId: string) {
  return mockDesigns.filter((design) => design.tbParentId === jobId);
}

export function getGroupedJobs() {
  const counts = new Map<string, { tbParentId: string; jobName: string; count: number }>();
  mockDesigns.forEach((design) => {
    const current = counts.get(design.tbParentId) ?? { tbParentId: design.tbParentId, jobName: design.jobName, count: 0 };
    current.count += 1;
    counts.set(design.tbParentId, current);
  });
  return Array.from(counts.values());
}

export function getGroupedRosters() {
  const counts = new Map<string, { rosterName: string; count: number }>();
  mockDesigns.forEach((design) => {
    const key = design.rosterName || 'Unassigned Roster';
    const current = counts.get(key) ?? { rosterName: key, count: 0 };
    current.count += 1;
    counts.set(key, current);
  });
  return Array.from(counts.values());
}
