export interface NavItem {
  id: string;
  label: string;
  href: string;
}

export interface PhaseDate {
  phase: string;
  type: 'ONLINE' | 'OFFLINE';
  dates: string;
  isoStart: string;
  isoEnd: string;
}

export interface EventIdentity {
  name: string;
  institution: string;
  location: string;
  hostBadge: string;
  milestoneTheme: string;
  milestoneDetail: string;
  phases: PhaseDate[];
  primaryCTA: {
    label: string;
    action: string;
  };
  secondaryCTA: {
    label: string;
    action: string;
  };
}
