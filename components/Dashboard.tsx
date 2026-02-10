import { useState } from 'react';
import { Search, Info } from 'lucide-react';
import { mockDesigns, getGroupedJobs, getGroupedRosters } from '../data/mockData';
import { DesignTile } from './DesignTile';
import { JobGroupRow } from './JobGroupRow';
import { RosterGroupRow } from './RosterGroupRow';
import { RequirementGroup } from './RequirementBadge';
import type { Page } from '../App';

interface DashboardProps {
  onNavigate: (page: Page, designId?: string, jobId?: string) => void;
  onAddToCart: (item: any) => void;
}

type ViewMode = 'individual' | 'job' | 'roster';

export function Dashboard({ onNavigate, onAddToCart }: DashboardProps) {
  const [currentTab, setCurrentTab] = useState<'custom' | 'teambuilder' | 'archived'>('teambuilder');
  const [viewMode, setViewMode] = useState<ViewMode>('individual');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('date-desc');

  const teamBuilderDesigns = mockDesigns.filter(d => d.isTeamBuilder && !d.isArchived);
  const groupedJobs = getGroupedJobs();
  const groupedRosters = getGroupedRosters();

  // Filter designs based on search
  const filteredDesigns = teamBuilderDesigns.filter(design => {
    if (!searchQuery) return true;
    const query = searchQuery.toLowerCase();
    return (
      design.jobName?.toLowerCase().includes(query) ||
      design.rosterName?.toLowerCase().includes(query) ||
      design.designId.toLowerCase().includes(query) ||
      design.playerNumber?.includes(query) ||
      design.playerName?.toLowerCase().includes(query)
    );
  });

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <button
                  onClick={() => onNavigate('prototype-home')}
                  className="text-accent hover:underline" style={{ fontSize: 'var(--text-sm)' }}
                >
                  ← Back to Prototype Platform
                </button>
              </div>
              <h1 className="mb-2">My Artwork Dashboard</h1>
              <p className="text-muted-foreground">Manage and order your designs</p>
            </div>
            <button
              onClick={() => onNavigate('order-history')}
              className="px-4 py-2 border border-border rounded-[--radius-button] hover:bg-muted transition-colors"
            >
              View Order History
            </button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-card border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6">
          <div className="flex gap-8">
            <button
              onClick={() => setCurrentTab('custom')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                currentTab === 'custom'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Custom Art
            </button>
            <button
              onClick={() => setCurrentTab('teambuilder')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                currentTab === 'teambuilder'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Team Builder Art
            </button>
            <button
              onClick={() => setCurrentTab('archived')}
              className={`py-4 px-2 border-b-2 transition-colors ${
                currentTab === 'archived'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              Archived Art
            </button>
          </div>
        </div>
      </div>

      {/* Team Builder Art Content */}
      {currentTab === 'teambuilder' && (
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          {/* Controls */}
          <div className="mb-6 space-y-4">
            {/* Top row - Sort and Search */}
            <div className="flex gap-4 items-center">
              <div className="w-48">
                <label className="block mb-2">Sort by</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="w-full px-4 py-2 border border-border rounded-[--radius] bg-input-background"
                >
                  <option value="date-desc">Date (Newest)</option>
                  <option value="date-asc">Date (Oldest)</option>
                  <option value="name-asc">Name (A-Z)</option>
                  <option value="name-desc">Name (Z-A)</option>
                </select>
              </div>

              <div className="flex-1">
                <label className="block mb-2">Search</label>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search by job name, roster name, design ID, player number, or player name"
                    className="w-full pl-10 pr-4 py-2 border border-border rounded-[--radius] bg-input-background"
                  />
                </div>
              </div>
            </div>

            {/* View by controls */}
            <div>
              <label className="block mb-2">View by</label>
              <div className="inline-flex rounded-[--radius] border border-border bg-muted p-1">
                <button
                  onClick={() => setViewMode('individual')}
                  className={`px-4 py-2 rounded-[--radius-sm] transition-colors ${
                    viewMode === 'individual'
                      ? 'bg-background shadow-sm'
                      : 'hover:bg-background/50'
                  }`}
                >
                  Individual designs
                </button>
                <button
                  onClick={() => setViewMode('job')}
                  className={`px-4 py-2 rounded-[--radius-sm] transition-colors ${
                    viewMode === 'job'
                      ? 'bg-background shadow-sm'
                      : 'hover:bg-background/50'
                  }`}
                >
                  Job name
                </button>
                <button
                  onClick={() => setViewMode('roster')}
                  className={`px-4 py-2 rounded-[--radius-sm] transition-colors ${
                    viewMode === 'roster'
                      ? 'bg-background shadow-sm'
                      : 'hover:bg-background/50'
                  }`}
                >
                  Roster
                </button>
              </div>
            </div>
          </div>

          {/* Content based on view mode */}
          {viewMode === 'individual' && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDesigns.map((design) => (
                <DesignTile
                  key={design.designId}
                  design={design}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          )}

          {viewMode === 'job' && (
            <div className="space-y-4">
              {groupedJobs.map((job) => (
                <JobGroupRow
                  key={`${job.jobName}-${job.tbParentId}`}
                  job={job}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          )}

          {viewMode === 'roster' && (
            <div className="space-y-4">
              {groupedRosters.map((roster) => (
                <RosterGroupRow
                  key={`${roster.rosterName}-${roster.tbParentId}`}
                  roster={roster}
                  onNavigate={onNavigate}
                />
              ))}
            </div>
          )}

          {filteredDesigns.length === 0 && viewMode === 'individual' && (
            <div className="text-center py-12 text-muted-foreground">
              No designs found matching your search.
            </div>
          )}
        </div>
      )}

      {/* Other tabs placeholder */}
      {currentTab !== 'teambuilder' && (
        <div className="max-w-[1400px] mx-auto px-6 py-12 text-center text-muted-foreground">
          <p>{currentTab === 'custom' ? 'Custom Art' : 'Archived Art'} view coming soon.</p>
          <p className="mt-2">This prototype focuses on the Team Builder Art experience.</p>
        </div>
      )}
    </div>
  );
}
