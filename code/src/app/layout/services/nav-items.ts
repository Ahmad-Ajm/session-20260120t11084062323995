export interface NavItem {
  labelKey: string;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { labelKey: 'Nav.Landing', path: '/' },
  { labelKey: 'Nav.Login', path: '/login' },
  { labelKey: 'Nav.Register', path: '/register' },
  { labelKey: 'Nav.Dashboard', path: '/app/dashboard' },
];
