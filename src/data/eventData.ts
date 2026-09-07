import { EventIdentity, NavItem } from '../types';

export const NAV_ITEMS: NavItem[] = [
  { id: 'milestone', label: 'Milestone', href: '#milestone' },
  { id: 'program', label: 'Program', href: '#program' },
  { id: 'highlights', label: 'Highlights', href: '#highlights' },
  { id: 'ecosystem', label: 'Ecosystem', href: '#ecosystem' },
];

export const EVENT_IDENTITY: EventIdentity = {
  name: 'Qiskit Fall Fest 2026',
  institution: 'SRM University-AP',
  location: 'Amaravati',
  hostBadge: 'PARTNER PLUS HOST',
  milestoneTheme: 'A Decade of Quantum on Cloud',
  milestoneDetail: 'Celebrating 10 years of cloud quantum computing (2016–2026)',
  phases: [
    {
      phase: 'Phase I',
      type: 'ONLINE',
      dates: '05—09 OCT 2026',
      isoStart: '2026-10-05',
      isoEnd: '2026-10-09',
    },
    {
      phase: 'Phase II',
      type: 'OFFLINE',
      dates: '26—30 OCT 2026',
      isoStart: '2026-10-26',
      isoEnd: '2026-10-30',
    },
  ],
  primaryCTA: {
    label: 'REGISTER',
    action: '#register',
  },
  secondaryCTA: {
    label: 'EXPLORE PROGRAM',
    action: '#program',
  },
};
