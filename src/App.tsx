
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Account from "./pages/Account";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Admin from "./pages/Admin";
import Products from "./pages/Products";
import ProductDetail from "./pages/ProductDetail";

// Admin Panel Pages
import AdminProducts from "./pages/admin/Products";
import AdminAddEditProduct from "./pages/admin/AddEditProduct";
import AdminCollections from "./pages/admin/Collections";
import AdminCategories from "./pages/admin/Categories";
import AdminImportExport from "./pages/admin/ImportExport";
import AdminReviews from "./pages/admin/Reviews";
import AdminOrders from "./pages/admin/Orders";
import AdminOrderDetail from "./pages/admin/OrderDetail";
import AdminReturns from "./pages/admin/Returns";
import AdminShipments from "./pages/admin/Shipments";
import AdminCustomers from "./pages/admin/Customers";
import AdminCustomerDetail from "./pages/admin/CustomerDetail";
import AdminSegments from "./pages/admin/Segments";
import AdminCommunication from "./pages/admin/Communication";
import AdminHomepageBuilder from "./pages/admin/HomepageBuilder";
import AdminBanners from "./pages/admin/Banners";
import AdminContentBlocks from "./pages/admin/ContentBlocks";
import AdminBlog from "./pages/admin/Blog";
import AdminMedia from "./pages/admin/Media";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/account" element={<Account />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product/:id" element={<ProductDetail />} />
          
          {/* Admin Routes */}
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/products" element={<AdminProducts />} />
          <Route path="/admin/products/add" element={<AdminAddEditProduct />} />
          <Route path="/admin/products/edit/:id" element={<AdminAddEditProduct />} />
          <Route path="/admin/collections" element={<AdminCollections />} />
          <Route path="/admin/categories" element={<AdminCategories />} />
          <Route path="/admin/import-export" element={<AdminImportExport />} />
          <Route path="/admin/reviews" element={<AdminReviews />} />
          <Route path="/admin/orders" element={<AdminOrders />} />
          <Route path="/admin/orders/:id" element={<AdminOrderDetail />} />
          <Route path="/admin/returns" element={<AdminReturns />} />
          <Route path="/admin/shipments" element={<AdminShipments />} />
          <Route path="/admin/customers" element={<AdminCustomers />} />
          <Route path="/admin/customers/:id" element={<AdminCustomerDetail />} />
          <Route path="/admin/segments" element={<AdminSegments />} />
          <Route path="/admin/communication" element={<AdminCommunication />} />
          <Route path="/admin/homepage-builder" element={<AdminHomepageBuilder />} />
          <Route path="/admin/banners" element={<AdminBanners />} />
          <Route path="/admin/content-blocks" element={<AdminContentBlocks />} />
          <Route path="/admin/blog" element={<AdminBlog />} />
          <Route path="/admin/media" element={<AdminMedia />} />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
