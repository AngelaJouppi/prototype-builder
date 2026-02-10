import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getJobByParentId, getPlayersForJob, mockDesigns } from '../data/mockData';
import type { Page } from '../App';

interface JobDetailsProps {
  jobId: string;
  onNavigate: (page: Page, designId?: string, jobId?: string) => void;
  onAddToCart: (item: any) => void;
}

export function JobDetails({ jobId, onNavigate, onAddToCart }: JobDetailsProps) {
  const job = getJobByParentId(jobId);
  const players = getPlayersForJob(jobId);
  const exampleDesign = mockDesigns.find(d => d.tbParentId === jobId);

  if (!job || !exampleDesign) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-12 text-center">
        <p>Job not found</p>
        <button
          onClick={() => onNavigate('dashboard')}
          className="mt-4 text-primary hover:underline"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleOrderAll = () => {
    onAddToCart({
      type: 'team-builder',
      jobName: job.jobName,
      tbParentId: job.tbParentId,
      rosterName: job.primaryRosterName,
      serviceType: exampleDesign.serviceType,
      players: players
    });
  };

  const handleOrderPlayer = (player: any) => {
    onAddToCart({
      type: 'team-builder',
      jobName: job.jobName,
      tbParentId: job.tbParentId,
      rosterName: job.primaryRosterName,
      serviceType: exampleDesign.serviceType,
      players: [player]
    });
  };

  const handleArchiveJob = () => {
    if (confirm(`Archive all ${job.designCount} designs in this job?`)) {
      alert('Job archived. Navigating back to Dashboard.');
      onNavigate('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border">
        <div className="max-w-[1400px] mx-auto px-6 py-6">
          <button
            onClick={() => onNavigate('dashboard')}
            className="flex items-center gap-2 text-accent hover:underline mb-4"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <div className="flex justify-between items-start">
            <div>
              <h1>{job.jobName}</h1>
              <p className="text-muted-foreground mt-1">
                Last updated {new Date(job.dateGroupUpdated).toLocaleDateString()}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => alert('Clone Job feature (creates duplicate with new job name)')}
                className="px-4 py-2 border border-border rounded-[--radius-button] hover:bg-muted transition-colors"
              >
                Clone Job
              </button>
              <button
                onClick={handleArchiveJob}
                className="px-4 py-2 text-destructive hover:underline"
              >
                Archive Job
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-8 space-y-6">
        {/* Job Artwork Summary Card */}
        <div className="bg-card border border-border rounded-[--radius] p-6">
          <div className="grid grid-cols-1 md:grid-cols-[300px_1fr] gap-6">
            {/* Left - Thumbnail */}
            <div className="aspect-square bg-muted rounded-[--radius] overflow-hidden">
              <ImageWithFallback
                src={job.thumbnails[0]}
                alt={job.jobName}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right - Metadata and Actions */}
            <div className="space-y-4">
              <h2>Job Details</h2>
              
              <div className="grid grid-cols-2 gap-4" style={{ fontSize: 'var(--text-sm)' }}>
                <div>
                  <p className="text-muted-foreground">Job name</p>
                  <p>{job.jobName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Design ID (example)</p>
                  <p>{exampleDesign.designId}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Status</p>
                  <p className="text-chart-3">{job.jobStatus}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Size</p>
                  <p>{job.designCount > 1 ? 'Variable' : exampleDesign.size}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Service type</p>
                  <p>{exampleDesign.serviceType}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Product type</p>
                  <p>{exampleDesign.productType}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Source</p>
                  <p>{exampleDesign.source}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date submitted</p>
                  <p>{new Date(exampleDesign.dateSubmitted).toLocaleDateString()}</p>
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  onClick={() => onNavigate('easyview-designer')}
                  className="px-6 py-2 bg-secondary text-secondary-foreground rounded-[--radius-button] hover:opacity-90 transition-opacity"
                >
                  Open in EasyView LTE
                </button>
                <button
                  onClick={() => alert('Preview modal would show all player designs')}
                  className="px-6 py-2 border border-border rounded-[--radius-button] hover:bg-muted transition-colors"
                >
                  Preview All Players
                </button>
                <button
                  onClick={handleOrderAll}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-[--radius-button] hover:opacity-90 transition-opacity"
                >
                  Start Order with All Players
                </button>
                <button
                  onClick={() => onNavigate('easyview-designer')}
                  className="px-6 py-2 border border-border rounded-[--radius-button] hover:bg-muted transition-colors"
                >
                  Start Order with New Player(s)
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Roster Banner */}
        {job.primaryRosterName && (
          <div className="bg-accent/10 border border-accent rounded-[--radius] p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-accent">Roster: {job.primaryRosterName}</h3>
                <p className="text-muted-foreground mt-1" style={{ fontSize: 'var(--text-sm)' }}>
                  Player total: {players.length}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onNavigate('easyview-roster')}
                  className="px-4 py-2 border border-accent text-accent rounded-[--radius-button] hover:bg-accent/10 transition-colors"
                >
                  Add Player
                </button>
                <button
                  onClick={() => onNavigate('easyview-roster')}
                  className="px-4 py-2 border border-accent text-accent rounded-[--radius-button] hover:bg-accent/10 transition-colors"
                >
                  Bulk Add Players
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Player Table */}
        <div className="bg-card border border-border rounded-[--radius] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted">
                <tr>
                  <th className="px-4 py-3 text-left" style={{ fontSize: 'var(--text-sm)' }}>Thumbnail</th>
                  <th className="px-4 py-3 text-left" style={{ fontSize: 'var(--text-sm)' }}>Player Name</th>
                  <th className="px-4 py-3 text-left" style={{ fontSize: 'var(--text-sm)' }}>Player Number</th>
                  <th className="px-4 py-3 text-left" style={{ fontSize: 'var(--text-sm)' }}>Updated</th>
                  <th className="px-4 py-3 text-left" style={{ fontSize: 'var(--text-sm)' }}>Last Ordered</th>
                  <th className="px-4 py-3 text-left" style={{ fontSize: 'var(--text-sm)' }}>Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {players.map((player, idx) => (
                  <tr key={idx} className="hover:bg-muted/50">
                    <td className="px-4 py-3">
                      <div className="w-16 h-16 rounded-[--radius] overflow-hidden bg-muted">
                        <ImageWithFallback
                          src={player.thumbnail}
                          alt={player.playerName}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </td>
                    <td className="px-4 py-3">{player.playerName}</td>
                    <td className="px-4 py-3">#{player.playerNumber}</td>
                    <td className="px-4 py-3 text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                      {new Date(player.lastUpdatedDate).toLocaleDateString()}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>
                      {player.lastOrderedDate || 'Never'}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleOrderPlayer(player)}
                          className="px-3 py-1 bg-primary text-primary-foreground rounded-[--radius-button] hover:opacity-90"
                          style={{ fontSize: 'var(--text-sm)' }}
                        >
                          Start Order
                        </button>
                        <button
                          onClick={() => onNavigate('easyview-designer')}
                          className="px-3 py-1 text-accent hover:underline"
                          style={{ fontSize: 'var(--text-sm)' }}
                        >
                          Open in EasyView
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Archive this player design?')) {
                              alert('Player design archived');
                            }
                          }}
                          className="px-3 py-1 text-destructive hover:underline"
                          style={{ fontSize: 'var(--text-sm)' }}
                        >
                          Archive
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
