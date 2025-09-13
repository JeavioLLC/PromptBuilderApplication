export interface NavItem {
  path: string
  label: string
  icon: React.ComponentType<{ size?: number; className?: string }>
}

export interface UserProfile {
  name: string
  role: string
  avatar?: string
  isOnline?: boolean
}

export interface SidebarProps {
  currentPath: string
  userProfile: UserProfile
}
