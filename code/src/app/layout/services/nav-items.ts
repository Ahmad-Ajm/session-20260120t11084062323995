export interface NavItem {
  labelKey: string;
  path: string;
  icon?: string;
}

export const NAV_ITEMS: NavItem[] = [
  { labelKey: 'Nav.Home', path: '/' },
  { labelKey: 'Nav.Dashboard', path: '/app/dashboard' },
];
