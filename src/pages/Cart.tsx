import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import { useCart } from '@/hooks/useCart';

const Cart: React.FC = () => {
  const { items, subtotal, totalItems, removeItem, updateQuantity, clear } = useCart();

  return (
    <div className="min-h-screen bg-background">
      <Seo title="Cart | Graphphile" description="Review your selected items." />
      <Navbar />
      <main className="pt-24 pb-16 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">Your Cart</h1>

          {items.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-muted-foreground mb-4">Your cart is empty.</p>
              <a href="/products" className="px-4 py-2 bg-primary text-white rounded-md text-sm font-medium">Continue shopping</a>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-8">
              <div className="md:col-span-2 space-y-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4 p-4 border rounded-lg">
                    <div className="w-24 h-24 rounded-md overflow-hidden bg-muted/30">
                      <img src={item.image} alt={`${item.name} in cart`} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-muted-foreground mt-1">{item.color ? `Color: ${item.color}` : ''} {item.size ? `• Size: ${item.size}` : ''}</p>
                        </div>
                        <button onClick={() => removeItem(item.id)} className="text-sm text-primary hover:text-primary/80">Remove</button>
                      </div>
                      <div className="mt-3 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="px-2 py-1 border rounded">-</button>
                          <span className="min-w-6 text-center">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="px-2 py-1 border rounded">+</button>
                        </div>
                        <p className="font-semibold">₹{item.price * item.quantity}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <aside className="p-6 border rounded-lg h-fit sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                <div className="flex items-center justify-between text-sm mb-2">
                  <span>Items</span>
                  <span>{totalItems}</span>
                </div>
                <div className="flex items-center justify-between text-base font-medium">
                  <span>Subtotal</span>
                  <span>₹{subtotal}</span>
                </div>
                <button className="mt-6 w-full px-4 py-3 bg-primary text-white rounded-md font-medium disabled:opacity-60" disabled>
                  Checkout (disabled in showcase)
                </button>
                <button onClick={clear} className="mt-3 w-full px-4 py-2 bg-secondary rounded-md text-sm">Clear cart</button>
              </aside>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Cart;
