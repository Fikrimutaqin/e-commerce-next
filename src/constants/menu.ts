export interface MenuItem {
  title: string;
  href: string;
  children?: MenuItem[];
  icon?: string;
}

export const HEADER_MENU: MenuItem[] = [
  { title: 'Home', href: '/' },
  { title: 'Inventory', href: '/inventory' },
  { title: 'Services', href: '/services' },
  { title: 'Promotions', href: '/promotions' },
  { title: 'Contact', href: '/contact' },
];

export const TOP_BAR_MESSAGE = {
  title: 'Premium Selection',
  subtitle: 'Certified Pre-Owned Vehicles',
  linkText: 'Browse Inventory',
  linkHref: '/inventory',
};

export const FOOTER_MENU_SOSMED: MenuItem[] = [
  { icon: "/images/icons/ic-fb.svg", title: 'Facebook', href: 'https://www.instagram.com/' },
  { icon: "/images/icons/ic-twitter.svg", title: 'Twitter', href: 'https://www.facebook.com/' },
  { icon: "/images/icons/ic-yt.svg", title: 'Instagram', href: 'https://www.linkedin.com/' },
]
