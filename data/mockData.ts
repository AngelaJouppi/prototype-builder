export interface Design {
  designId: string;
  thumbnail: string;
  status: 'Ready to Order' | 'Needs Attention' | 'Incomplete';
  size: string;
  serviceType: string;
  productType: string;
  source: string;
  dateSubmitted: string;
  isTeamBuilder: boolean;
  jobName?: string;
  tbParentId?: string;
  rosterId?: string;
  rosterName?: string;
  playerName?: string;
  playerNumber?: string;
  isArchived: boolean;
  price?: string;
}

export interface Job {
  jobName: string;
  tbParentId: string;
  jobStatus: string;
  designCount: number;
  dateGroupUpdated: string;
  primaryRosterId?: string;
  primaryRosterName?: string;
  thumbnails: string[];
}

export interface Roster {
  rosterId: string;
  rosterName: string;
  playerCount: number;
  linkedJobCount: number;
  thumbnails: string[];
  tbParentId: string;
}

export interface Player {
  playerName: string;
  playerNumber: string;
  designId: string;
  thumbnail: string;
  status: string;
  quantity: number;
  unitOfMeasure: string;
  itemPrice: number;
  extendedPrice: number;
  lastOrderedDate?: string;
  lastUpdatedDate: string;
}

// Mock designs data
export const mockDesigns: Design[] = [
  {
    designId: 'D001',
    thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    status: 'Ready to Order',
    size: '11" x 11"',
    serviceType: 'UltraColor® MAX DTF Transfers',
    productType: 'Custom Transfer',
    source: 'Easy View LTE Team Builder',
    dateSubmitted: '2025-11-28',
    isTeamBuilder: true,
    jobName: 'Eagles - 2026',
    tbParentId: 'TB001',
    rosterId: 'R001',
    rosterName: 'Varsity Home 2026',
    playerName: 'John Smith',
    playerNumber: '12',
    isArchived: false,
    price: '$45.99'
  },
  {
    designId: 'D002',
    thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    status: 'Ready to Order',
    size: '11" x 11"',
    serviceType: 'UltraColor® MAX DTF Transfers',
    productType: 'Custom Transfer',
    source: 'Easy View LTE Team Builder',
    dateSubmitted: '2025-11-28',
    isTeamBuilder: true,
    jobName: 'Eagles - 2026',
    tbParentId: 'TB001',
    rosterId: 'R001',
    rosterName: 'Varsity Home 2026',
    playerName: 'Sarah Johnson',
    playerNumber: '8',
    isArchived: false,
    price: '$45.99'
  },
  {
    designId: 'D003',
    thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    status: 'Ready to Order',
    size: '11" x 11"',
    serviceType: 'UltraColor® MAX DTF Transfers',
    productType: 'Custom Transfer',
    source: 'Easy View LTE Team Builder',
    dateSubmitted: '2025-11-27',
    isTeamBuilder: true,
    jobName: 'Eagles - 2026',
    tbParentId: 'TB001',
    rosterId: 'R001',
    rosterName: 'Varsity Home 2026',
    playerName: 'Mike Davis',
    playerNumber: '22',
    isArchived: false,
    price: '$45.99'
  },
  {
    designId: 'D004',
    thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    status: 'Needs Attention',
    size: '10" x 10"',
    serviceType: 'UltraColor® MAX DTF Transfers',
    productType: 'Custom Transfer',
    source: 'Easy View LTE Team Builder',
    dateSubmitted: '2025-11-25',
    isTeamBuilder: true,
    jobName: 'Warriors - 2026',
    tbParentId: 'TB002',
    rosterId: 'R002',
    rosterName: 'JV Away 2026',
    playerName: 'Tom Wilson',
    playerNumber: '5',
    isArchived: false,
    price: '$42.99'
  },
  {
    designId: 'D005',
    thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    status: 'Ready to Order',
    size: '10" x 10"',
    serviceType: 'UltraColor® MAX DTF Transfers',
    productType: 'Custom Transfer',
    source: 'Easy View LTE Team Builder',
    dateSubmitted: '2025-11-25',
    isTeamBuilder: true,
    jobName: 'Warriors - 2026',
    tbParentId: 'TB002',
    rosterId: 'R002',
    rosterName: 'JV Away 2026',
    playerName: 'Lisa Anderson',
    playerNumber: '14',
    isArchived: false,
    price: '$42.99'
  },
  {
    designId: 'D006',
    thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    status: 'Ready to Order',
    size: '12" x 12"',
    serviceType: 'UltraColor® MAX DTF Transfers',
    productType: 'Custom Transfer',
    source: 'Easy View LTE Team Builder',
    dateSubmitted: '2025-11-20',
    isTeamBuilder: true,
    jobName: 'Hawks - 2025',
    tbParentId: 'TB003',
    rosterId: 'R003',
    rosterName: 'Varsity 2025',
    playerName: 'Alex Martinez',
    playerNumber: '7',
    isArchived: false,
    price: '$48.99'
  },
  {
    designId: 'D007',
    thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    status: 'Ready to Order',
    size: '12" x 12"',
    serviceType: 'UltraColor® MAX DTF Transfers',
    productType: 'Custom Transfer',
    source: 'Easy View LTE Team Builder',
    dateSubmitted: '2025-11-20',
    isTeamBuilder: true,
    jobName: 'Hawks - 2025',
    tbParentId: 'TB003',
    rosterId: 'R003',
    rosterName: 'Varsity 2025',
    playerName: 'Jessica Lee',
    playerNumber: '11',
    isArchived: false,
    price: '$48.99'
  },
  {
    designId: 'D008',
    thumbnail: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    status: 'Ready to Order',
    size: '11" x 11"',
    serviceType: 'UltraColor® MAX DTF Transfers',
    productType: 'Custom Transfer',
    source: 'Easy View LTE Team Builder',
    dateSubmitted: '2025-11-27',
    isTeamBuilder: true,
    jobName: 'Eagles - 2026',
    tbParentId: 'TB001',
    rosterId: 'R001',
    rosterName: 'Varsity Home 2026',
    playerName: 'Chris Brown',
    playerNumber: '3',
    isArchived: false,
    price: '$45.99'
  }
];

// Derive grouped jobs from designs
export const getGroupedJobs = (): Job[] => {
  const jobsMap = new Map<string, Job>();
  
  mockDesigns.filter(d => d.isTeamBuilder && !d.isArchived).forEach(design => {
    const key = `${design.jobName}-${design.tbParentId}`;
    
    if (!jobsMap.has(key)) {
      jobsMap.set(key, {
        jobName: design.jobName!,
        tbParentId: design.tbParentId!,
        jobStatus: 'Ready to Order',
        designCount: 0,
        dateGroupUpdated: design.dateSubmitted,
        primaryRosterId: design.rosterId,
        primaryRosterName: design.rosterName,
        thumbnails: []
      });
    }
    
    const job = jobsMap.get(key)!;
    job.designCount++;
    if (job.thumbnails.length < 4) {
      job.thumbnails.push(design.thumbnail);
    }
    
    // Update to latest date
    if (design.dateSubmitted > job.dateGroupUpdated) {
      job.dateGroupUpdated = design.dateSubmitted;
    }
  });
  
  return Array.from(jobsMap.values()).sort((a, b) => 
    b.dateGroupUpdated.localeCompare(a.dateGroupUpdated)
  );
};

// Derive grouped rosters from designs
export const getGroupedRosters = (): Roster[] => {
  const rostersMap = new Map<string, Roster>();
  
  mockDesigns.filter(d => d.isTeamBuilder && !d.isArchived && d.rosterName).forEach(design => {
    const key = `${design.rosterName}-${design.tbParentId}`;
    
    if (!rostersMap.has(key)) {
      rostersMap.set(key, {
        rosterId: design.rosterId!,
        rosterName: design.rosterName!,
        playerCount: 0,
        linkedJobCount: 1,
        thumbnails: [],
        tbParentId: design.tbParentId!
      });
    }
    
    const roster = rostersMap.get(key)!;
    roster.playerCount++;
    if (roster.thumbnails.length < 4) {
      roster.thumbnails.push(design.thumbnail);
    }
  });
  
  return Array.from(rostersMap.values());
};

// Get players for a job
export const getPlayersForJob = (tbParentId: string): Player[] => {
  return mockDesigns
    .filter(d => d.tbParentId === tbParentId && d.playerName)
    .map(d => ({
      playerName: d.playerName!,
      playerNumber: d.playerNumber!,
      designId: d.designId,
      thumbnail: d.thumbnail,
      status: d.status,
      quantity: 1,
      unitOfMeasure: 'each',
      itemPrice: parseFloat(d.price?.replace('$', '') || '0'),
      extendedPrice: parseFloat(d.price?.replace('$', '') || '0'),
      lastUpdatedDate: d.dateSubmitted,
      lastOrderedDate: undefined
    }));
};

// Get design by ID
export const getDesignById = (designId: string): Design | undefined => {
  return mockDesigns.find(d => d.designId === designId);
};

// Get job by parent ID
export const getJobByParentId = (tbParentId: string): Job | undefined => {
  return getGroupedJobs().find(j => j.tbParentId === tbParentId);
};
