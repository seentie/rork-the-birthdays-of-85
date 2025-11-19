export interface Theme {
  id: string;
  name: string;
  primary: string;
  secondary: string;
  accent: string;
  background: string;
  backgroundGradient: readonly [string, string, ...string[]];
  cardBackground: string;
  text: string;
  textSecondary: string;
  neonGlow: string;
  headerGradient: readonly [string, string, ...string[]];
}

export const themes: Record<string, Theme> = {
  miami: {
    id: 'miami',
    name: 'Miami Vice',
    primary: '#FF6B9D',
    secondary: '#4ECDC4',
    accent: '#FFE66D',
    background: '#1A1A2E',
    backgroundGradient: ['#1A1A2E', '#16213E'],
    cardBackground: 'rgba(255, 107, 157, 0.1)',
    text: '#FFFFFF',
    textSecondary: '#B8B8D1',
    neonGlow: '#FF6B9D',
    headerGradient: ['#FF6B9D', '#4ECDC4'],
  },
  synthwave: {
    id: 'synthwave',
    name: 'Synthwave',
    primary: '#BD00FF',
    secondary: '#FF006E',
    accent: '#00D9FF',
    background: '#0F0E1B',
    backgroundGradient: ['#0F0E1B', '#1B1A2E'],
    cardBackground: 'rgba(189, 0, 255, 0.1)',
    text: '#FFFFFF',
    textSecondary: '#A8A8B8',
    neonGlow: '#BD00FF',
    headerGradient: ['#BD00FF', '#FF006E'],
  },
  arcade: {
    id: 'arcade',
    name: 'Arcade',
    primary: '#00FF41',
    secondary: '#FF0080',
    accent: '#00D900',
    background: '#0A0A0A',
    backgroundGradient: ['#0A0A0A', '#1A1A1A'],
    cardBackground: 'rgba(0, 255, 65, 0.1)',
    text: '#FFFFFF',
    textSecondary: '#B0B0B0',
    neonGlow: '#00FF41',
    headerGradient: ['#00FF41', '#FF0080'],
  },
  memphis: {
    id: 'memphis',
    name: 'Memphis',
    primary: '#FF3366',
    secondary: '#33CCFF',
    accent: '#CC8800',
    background: '#F5F5F5',
    backgroundGradient: ['#F5F5F5', '#E8E8E8'],
    cardBackground: 'rgba(255, 51, 102, 0.05)',
    text: '#1A1A1A',
    textSecondary: '#666666',
    neonGlow: '#FF3366',
    headerGradient: ['#FF3366', '#33CCFF'],
  },
  monochrome: {
    id: 'monochrome',
    name: 'Monochrome',
    primary: '#000000',
    secondary: '#666666',
    accent: '#000000',
    background: '#E8E8E8',
    backgroundGradient: ['#E8E8E8', '#D0D0D0'],
    cardBackground: 'rgba(0, 0, 0, 0.05)',
    text: '#000000',
    textSecondary: '#4A4A4A',
    neonGlow: '#000000',
    headerGradient: ['#000000', '#666666'],
  },
};