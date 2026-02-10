export function JobGroupRow({ job, onNavigate }: { job: any; onNavigate: (...args: any[]) => void }) {
  return (
    <button className="w-full text-left border border-border rounded-[--radius] p-3" onClick={() => onNavigate('job-details', undefined, job.tbParentId)}>
      <div>{job.jobName}</div>
      <div className="text-sm text-muted-foreground">{job.count} designs</div>
    </button>
  );
}
