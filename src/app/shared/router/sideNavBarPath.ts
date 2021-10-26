export type SideNavBarPathsType = {
  key: string,
  path: string,
  name: string,
  icon: string
}[]

export const sideNavBarPaths: SideNavBarPathsType = [
  { key: 'dashboard', path: '/dashboard', name: 'Dashboard', icon: 'icon-dashboard' },
  { key: 'validator', path: '/validator', name: 'Validator', icon: 'icon-validate' },
];