import { ArrowLeft } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { getDesignById, getPlayersForJob } from '../data/mockData';
import type { Page } from '../App';

interface DesignDetailsProps {
  designId: string;
  onNavigate: (page: Page, designId?: string, jobId?: string) => void;
  onAddToCart: (item: any) => void;
}

export function DesignDetails({ designId, onNavigate, onAddToCart }: DesignDetailsProps) {
  const design = getDesignById(designId);

  if (!design) {
    return (
      <div className="max-w-[1400px] mx-auto px-6 py-12 text-center">
        <p>Design not found</p>
        <button
          onClick={() => onNavigate('dashboard')}
          className="mt-4 text-primary hover:underline"
        >
          Back to Dashboard
        </button>
      </div>
    );
  }

  const handleOrderNow = () => {
    // For Team Builder designs, add all players for the job to cart
    if (design.tbParentId) {
      const players = getPlayersForJob(design.tbParentId);
      onAddToCart({
        type: 'team-builder',
        jobName: design.jobName,
        tbParentId: design.tbParentId,
        rosterName: design.rosterName,
        serviceType: design.serviceType,
        players: players
      });
    }
  };

  const handleArchive = () => {
    if (confirm('Are you sure you want to archive this design?')) {
      alert('Design archived. (Would navigate back to Dashboard)');
      onNavigate('dashboard');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Ready to Order':
        return 'text-chart-3';
      case 'Needs Attention':
        return 'text-destructive';
      case 'Incomplete':
        return 'text-muted-foreground';
      default:
        return 'text-foreground';
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
          <h1>Design Details</h1>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-[1400px] mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left - Image */}
          <div>
            <div className="aspect-square bg-muted rounded-[--radius] overflow-hidden">
              <ImageWithFallback
                src={design.thumbnail}
                alt={design.jobName || design.designId}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right - Details */}
          <div className="space-y-6">
            {/* Art / Product Details */}
            <div className="space-y-4">
              <h2>Art / Product Details</h2>
              
              {design.jobName && (
                <div>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>Job name</p>
                  <p>{design.jobName}</p>
                </div>
              )}

              {design.rosterName && (
                <div>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>Roster</p>
                  <p>{design.rosterName}</p>
                </div>
              )}

              {design.playerName && (
                <div>
                  <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>Player</p>
                  <p>#{design.playerNumber} {design.playerName}</p>
                </div>
              )}

              <div>
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>Source</p>
                <p>{design.source}</p>
              </div>

              <div>
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>Design ID</p>
                <p>{design.designId}</p>
              </div>

              <div>
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>Size</p>
                <p>{design.size}</p>
              </div>

              <div>
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>Service Type</p>
                <p>{design.serviceType}</p>
              </div>

              <div>
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>Product Type</p>
                <p>{design.productType}</p>
              </div>

              <div>
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>Date Submitted</p>
                <p>{new Date(design.dateSubmitted).toLocaleDateString()}</p>
              </div>
            </div>

            {/* Status */}
            <div className="border-t border-border pt-4">
              <div>
                <p className="text-muted-foreground" style={{ fontSize: 'var(--text-sm)' }}>Status</p>
                <p className={getStatusColor(design.status)}>{design.status}</p>
              </div>
            </div>

            {/* Team Builder Info */}
            {design.isTeamBuilder && (
              <div className="bg-muted p-4 rounded-[--radius]">
                <p style={{ fontSize: 'var(--text-sm)' }}>
                  This artwork was created with Easy View LTE Team Builder. Job and roster details are managed in Easy View.
                </p>
              </div>
            )}

            {/* Actions */}
            <div className="space-y-3 pt-4">
              <button
                onClick={handleOrderNow}
                className="w-full px-6 py-3 bg-primary text-primary-foreground rounded-[--radius-button] hover:opacity-90 transition-opacity"
              >
                Order Now
              </button>

              <button
                onClick={() => onNavigate('easyview-designer')}
                className="w-full px-6 py-3 bg-secondary text-secondary-foreground rounded-[--radius-button] hover:opacity-90 transition-opacity"
              >
                Open in Easy View LTE
              </button>

              <button
                onClick={handleArchive}
                className="w-full px-6 py-3 bg-destructive text-destructive-foreground rounded-[--radius-button] hover:opacity-90 transition-opacity"
              >
                Archive Design
              </button>
            </div>

            {/* Reorder Note */}
            <div className="text-muted-foreground pt-2" style={{ fontSize: 'var(--text-sm)' }}>
              <p>
                Use "Order Now" to place a new order or reorder this job.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
