import React, { useMemo, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Seo from '@/components/Seo';
import { products, type Product } from '@/lib/products';
import { useCart } from '@/hooks/useCart';
import { toast } from '@/hooks/use-toast';

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const product: Product | undefined = useMemo(() => products.find(p => p.id === id), [id]);
  const { addItem } = useCart();
  const [size, setSize] = useState<string | undefined>(product?.sizes?.[0]);
  const [color, setColor] = useState<string | undefined>(product?.colors?.[0]?.name);

  if (!product) {
    return (
      <div className="min-h-screen bg-background">
        <Seo title="Product Not Found | Graphphile" description="The requested product could not be found." />
        <Navbar />
        <main className="pt-24 pb-16 px-4 md:px-6 lg:px-8">
          <div className="container mx-auto text-center max-w-xl">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Product not found</h1>
            <p className="text-muted-foreground mb-6">The product you are looking for does not exist or has been moved.</p>
            <Link to="/products" className="px-4 py-2 bg-primary text-white rounded-md">Back to products</Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  const handleAdd = () => {
    addItem(product, { size, color, quantity: 1 });
    toast({ title: 'Added to cart', description: `${product.name} added to your cart.` });
  };

  return (
    <div className="min-h-screen bg-background">
      <Seo title={`${product.name} | Graphphile`} description={product.description} image={product.images?.[0]} />
      <Navbar />
      <main className="pt-24 pb-20 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto grid gap-10 md:grid-cols-2">
          <div>
            <div className="aspect-[3/4] overflow-hidden rounded-xl bg-muted/30">
              <img src={product.images[0]} alt={`${product.name} main image`} className="w-full h-full object-cover" />
            </div>
            {product.images[1] && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                {product.images.slice(1).map((img, i) => (
                  <div key={i} className="aspect-[4/3] overflow-hidden rounded-lg bg-muted/30">
                    <img src={img} alt={`${product.name} alt image ${i+1}`} className="w-full h-full object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>
          <div>
            <h1 className="text-3xl md:text-4xl font-bold tracking-tight">{product.name}</h1>
            <p className="text-muted-foreground mt-3">{product.description}</p>
            <p className="text-2xl font-semibold mt-6">₹{product.price}</p>

            {product.colors?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Color</h3>
                <div className="flex gap-2">
                  {product.colors.map((c) => (
                    <button
                      key={c.name}
                      onClick={() => setColor(c.name)}
                      className={`w-9 h-9 rounded-full border-2 ${color === c.name ? 'border-primary' : 'border-transparent'} `}
                      style={{ backgroundColor: c.hex }}
                      title={c.name}
                      aria-label={c.name}
                    />
                  ))}
                </div>
              </div>
            )}

            {product.sizes?.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium mb-2">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map((s) => (
                    <button
                      key={s}
                      onClick={() => setSize(s)}
                      className={`min-w-10 h-10 px-3 rounded-md text-sm font-medium ${size === s ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 flex gap-3">
              <button onClick={handleAdd} className="px-5 py-3 bg-primary text-white rounded-md font-medium hover:bg-primary/90">Add to Cart</button>
              <Link to="/cart" className="px-5 py-3 bg-secondary rounded-md font-medium hover:bg-secondary/80">Go to Cart</Link>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductDetail;
