
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  Package, 
  Users, 
  FileText, 
  Settings, 
  LogOut,
  ChevronDown,
  Home,
  Menu,
  X
} from 'lucide-react';

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  
  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };
  
  const sidebarItems = [
    {
      title: 'Dashboard',
      icon: LayoutDashboard,
      href: '/admin',
      active: isActive('/admin') && !location.pathname.includes('/admin/'),
    },
    {
      title: 'Products',
      icon: Package,
      href: '/admin/products',
      active: isActive('/admin/products'),
      subItems: [
        { title: 'All Products', href: '/admin/products' },
        { title: 'Add Product', href: '/admin/products/add' },
        { title: 'Collections', href: '/admin/collections' },
        { title: 'Categories', href: '/admin/categories' },
        { title: 'Import/Export', href: '/admin/import-export' },
        { title: 'Reviews', href: '/admin/reviews' },
      ],
    },
    {
      title: 'Orders',
      icon: ShoppingBag,
      href: '/admin/orders',
      active: isActive('/admin/orders') || isActive('/admin/returns') || isActive('/admin/shipments'),
      subItems: [
        { title: 'All Orders', href: '/admin/orders' },
        { title: 'Returns & Refunds', href: '/admin/returns' },
        { title: 'Shipments', href: '/admin/shipments' },
      ],
    },
    {
      title: 'Customers',
      icon: Users,
      href: '/admin/customers',
      active: isActive('/admin/customers') || isActive('/admin/segments') || isActive('/admin/communication'),
      subItems: [
        { title: 'All Customers', href: '/admin/customers' },
        { title: 'Segments', href: '/admin/segments' },
        { title: 'Communications', href: '/admin/communication' },
      ],
    },
    {
      title: 'Content',
      icon: FileText,
      href: '/admin/homepage-builder',
      active: isActive('/admin/homepage-builder') || isActive('/admin/banners') || 
              isActive('/admin/content-blocks') || isActive('/admin/blog') || 
              isActive('/admin/media'),
      subItems: [
        { title: 'Homepage Builder', href: '/admin/homepage-builder' },
        { title: 'Banners', href: '/admin/banners' },
        { title: 'Content Blocks', href: '/admin/content-blocks' },
        { title: 'Blog', href: '/admin/blog' },
        { title: 'Media Library', href: '/admin/media' },
      ],
    },
    {
      title: 'Settings',
      icon: Settings,
      href: '/admin/settings',
      active: isActive('/admin/settings'),
    },
  ];
  
  return (
    <div className="min-h-screen bg-muted/30 flex">
      {/* Sidebar for desktop */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-20 flex h-full w-64 flex-col border-r bg-background transition-transform duration-300 ease-in-out lg:static lg:translate-x-0",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full",
          !mobileMenuOpen && "hidden md:flex"
        )}
      >
        <div className="flex h-14 items-center border-b px-4">
          <Link to="/" className="flex items-center gap-2 font-semibold">
            <div className="h-6 w-6 rounded-full bg-primary"></div>
            <span>Graphphile Admin</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="ml-auto md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        <div className="flex-1 overflow-auto py-4">
          <nav className="grid gap-1 px-2">
            {sidebarItems.map((item, index) => (
              <div key={index}>
                <Link to={item.href}>
                  <Button
                    variant={item.active ? "secondary" : "ghost"}
                    className={cn(
                      "w-full justify-start gap-2 mb-1",
                      item.active && "font-medium"
                    )}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.title}
                    {item.subItems && (
                      <ChevronDown className="ml-auto h-4 w-4" />
                    )}
                  </Button>
                </Link>
                
                {item.subItems && item.active && (
                  <div className="ml-6 mb-2 grid gap-1">
                    {item.subItems.map((subItem, subIndex) => (
                      <Link key={subIndex} to={subItem.href}>
                        <Button
                          variant="ghost"
                          size="sm"
                          className={cn(
                            "w-full justify-start font-normal",
                            isActive(subItem.href) && "bg-muted font-medium"
                          )}
                        >
                          {subItem.title}
                        </Button>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
        </div>
        
        <div className="border-t p-4">
          <div className="flex items-center gap-2 mb-4">
            <div className="h-8 w-8 rounded-full bg-muted">
              <img
                src="https://github.com/shadcn.png"
                alt="Admin"
                className="h-full w-full rounded-full object-cover"
              />
            </div>
            <div>
              <p className="text-sm font-medium">Admin User</p>
              <p className="text-xs text-muted-foreground">admin@graphphile.in</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-2">
            <Link to="/">
              <Button variant="outline" size="sm" className="w-full justify-start gap-1">
                <Home className="h-4 w-4" />
                Store
              </Button>
            </Link>
            <Button variant="outline" size="sm" className="w-full justify-start gap-1">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>
      
      {/* Main content */}
      <div className="flex-1 flex flex-col">
        {/* Top navbar */}
        <header className="sticky top-0 z-10 flex h-14 items-center gap-4 border-b bg-background px-4 sm:px-6">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(true)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle menu</span>
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            title={isSidebarOpen ? "Collapse sidebar" : "Expand sidebar"}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle sidebar</span>
          </Button>
          
          <div className="ml-auto flex items-center gap-2">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
              View Store
            </Link>
          </div>
        </header>
        
        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div
            className="fixed inset-0 z-10 bg-background/80 backdrop-blur-sm md:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
        
        {/* Page content */}
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
