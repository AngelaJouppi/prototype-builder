export type RequirementGroup = 'required' | 'optional';

export function RequirementBadge({ group }: { group: RequirementGroup }) {
  return <span>{group}</span>;
}
