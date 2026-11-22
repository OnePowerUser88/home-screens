import type { DefaultSubject } from './types';

// ---------------------------------------------------------------------------
// Built-in subject catalogue - nb-NO (Norway, grunnskole)
// ---------------------------------------------------------------------------

export const NB_NO_SUBJECTS: DefaultSubject[] = [
  { id: 'no', code: 'No', name: 'Norsk', color: '#f26363', icon: 'book' },
  { id: 'ma', code: 'Ma', name: 'Matematikk', color: '#4f8ef7', icon: 'triangle' },
  { id: 'en', code: 'En', name: 'Engelsk', color: '#f2c94c', icon: 'speech' },
  { id: 'ty', code: 'Ty', name: 'Tysk', color: '#f58b3c', icon: 'speech' },
  { id: 'sp', code: 'Sp', name: 'Spansk', color: '#f58b3c', icon: 'speech' },
  { id: 'fr', code: 'Fr', name: 'Fransk', color: '#f58b3c', icon: 'speech' },
  { id: 'na', code: 'Na', name: 'Naturfag', color: '#43c07e', icon: 'leaf' },
  { id: 'sa', code: 'Sa', name: 'Samfunnsfag', color: '#7c8cf8', icon: 'people' },
  { id: 'krle', code: 'KRLE', name: 'KRLE', color: '#c084fc', icon: 'star' },
  { id: 'kh', code: 'KH', name: 'Kunst og håndverk', color: '#ee6fd8', icon: 'palette', bring: 'Tegnesaker' },
  { id: 'mu', code: 'Mu', name: 'Musikk', color: '#fb6f92', icon: 'music' },
  { id: 'kro', code: 'Kro', name: 'Kroppsøving', color: '#8fdc4e', icon: 'ball', bring: 'Gymtøy' },
  { id: 'mh', code: 'MH', name: 'Mat og helse', color: '#e0a86e', icon: 'heart' },
  { id: 'kt', code: 'Kt', name: 'Klassens time', color: '#cbd5e1', icon: 'chat' },
  { id: 'sto', code: 'Stø', name: 'Støttetimer', color: '#a1a1aa', icon: 'heart' },
  { id: 'mat', code: 'Mat', name: 'Matpause', color: '#a1a1aa', icon: 'people' },
];

// ---------------------------------------------------------------------------
// Where a long name may break across two lines
// ---------------------------------------------------------------------------

/**
 * Each entry is one subject name split into the parts it may break between,
 * so a compound breaks at its seam ("Samfunns-fag") rather than wherever
 * automatic hyphenation happens to fill the line best. The parts are joined
 * back into the name itself, so an entry can never disagree with the subject
 * it belongs to.
 */
export const NB_NO_NAME_SEAMS: string[][] = [
  ['Mate', 'matikk'],
  ['Samfunns', 'fag'],
  ['Natur', 'fag'],
  ['Kropps', 'øving'],
  ['Støtte', 'timer'],
];
