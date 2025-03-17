
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import AdminLayout from '@/components/admin/AdminLayout';
import { ArrowLeft, Save, Trash, Upload, X, Plus } from 'lucide-react';
import { products, collections } from '@/lib/products';

const AddEditProduct = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  const isEditMode = !!id;
  
  // Product state
  const [product, setProduct] = useState({
    id: '',
    name: '',
    description: '',
    price: 0,
    images: [''],
    category: '',
    collection: '',
    sizes: [] as string[],
    colors: [] as { name: string; hex: string }[],
    featured: false
  });
  
  // Load product data if in edit mode
  useEffect(() => {
    if (isEditMode) {
      const existingProduct = products.find(p => p.id === id);
      if (existingProduct) {
        setProduct({
          ...existingProduct,
          price: existingProduct.price / 83 // Convert back for easier editing
        });
      }
    }
  }, [id, isEditMode]);
  
  // Available sizes and colors for selection
  const availableSizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
  const availableColors = [
    { name: 'White', hex: '#FFFFFF' },
    { name: 'Black', hex: '#000000' },
    { name: 'Gray', hex: '#808080' },
    { name: 'Blue', hex: '#1E3A8A' },
    { name: 'Red', hex: '#B91C1C' },
    { name: 'Green', hex: '#047857' },
    { name: 'Yellow', hex: '#F59E0B' },
    { name: 'Purple', hex: '#7E22CE' },
    { name: 'Pink', hex: '#DB2777' },
    { name: 'Cream', hex: '#F5F5DC' },
    { name: 'Navy', hex: '#000080' },
  ];
  
  // Available categories
  const categories = [...new Set(products.map(p => p.category))];
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProduct(prev => ({
      ...prev,
      [name]: name === 'price' ? parseFloat(value) || 0 : value,
    }));
  };
  
  const handleSelectChange = (name: string, value: string) => {
    setProduct(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  
  const toggleSize = (size: string) => {
    setProduct(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size],
    }));
  };
  
  const toggleColor = (color: { name: string; hex: string }) => {
    setProduct(prev => {
      const exists = prev.colors.some(c => c.name === color.name);
      return {
        ...prev,
        colors: exists
          ? prev.colors.filter(c => c.name !== color.name)
          : [...prev.colors, color],
      };
    });
  };
  
  const removeImage = (index: number) => {
    setProduct(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };
  
  const addImageField = () => {
    setProduct(prev => ({
      ...prev,
      images: [...prev.images, ''],
    }));
  };
  
  const updateImageUrl = (index: number, url: string) => {
    setProduct(prev => {
      const updatedImages = [...prev.images];
      updatedImages[index] = url;
      return {
        ...prev,
        images: updatedImages,
      };
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate
    if (!product.name || !product.description || product.price <= 0) {
      toast({
        title: "Validation Error",
        description: "Please fill out all required fields",
        variant: "destructive",
      });
      return;
    }
    
    if (product.images.some(img => !img)) {
      toast({
        title: "Image URLs Required",
        description: "Please provide URLs for all images or remove empty fields",
        variant: "destructive",
      });
      return;
    }
    
    if (product.sizes.length === 0) {
      toast({
        title: "Sizes Required",
        description: "Please select at least one size",
        variant: "destructive",
      });
      return;
    }
    
    if (product.colors.length === 0) {
      toast({
        title: "Colors Required",
        description: "Please select at least one color",
        variant: "destructive",
      });
      return;
    }
    
    // Convert price to INR for storage
    const finalProduct = {
      ...product,
      price: Math.round(product.price * 83), // Convert to INR
      id: isEditMode ? id! : String(products.length + 1),
    };
    
    // In a real app, this would save to a database
    toast({
      title: isEditMode ? "Product Updated" : "Product Created",
      description: `${finalProduct.name} has been ${isEditMode ? 'updated' : 'created'} successfully.`,
    });
    
    navigate('/admin/products');
  };
  
  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate('/admin/products')}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <h1 className="text-3xl font-bold">
              {isEditMode ? 'Edit Product' : 'Add New Product'}
            </h1>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" onClick={() => navigate('/admin/products')}>
              Cancel
            </Button>
            <Button onClick={handleSubmit}>
              <Save className="h-4 w-4 mr-2" />
              Save Product
            </Button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <Tabs defaultValue="basic">
            <TabsList className="mb-6">
              <TabsTrigger value="basic">Basic Information</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="variants">Variants</TabsTrigger>
              <TabsTrigger value="seo">SEO & Settings</TabsTrigger>
            </TabsList>
            
            <TabsContent value="basic">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-6">
                  <Card>
                    <CardContent className="pt-6 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="name">Product Name</Label>
                        <Input
                          id="name"
                          name="name"
                          value={product.name}
                          onChange={handleInputChange}
                          placeholder="Enter product name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="description">Description</Label>
                        <Textarea
                          id="description"
                          name="description"
                          value={product.description}
                          onChange={handleInputChange}
                          placeholder="Describe your product"
                          rows={5}
                          required
                        />
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardContent className="pt-6 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="price">Price (₹)</Label>
                        <Input
                          id="price"
                          name="price"
                          type="number"
                          value={product.price}
                          onChange={handleInputChange}
                          placeholder="0.00"
                          min="0"
                          step="0.01"
                          required
                        />
                        <p className="text-sm text-muted-foreground">
                          Enter price in Indian Rupees (₹)
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                
                <div className="space-y-6">
                  <Card>
                    <CardContent className="pt-6 space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="category">Category</Label>
                        <Select
                          value={product.category}
                          onValueChange={(value) => handleSelectChange('category', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select category" />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                            <SelectItem value="new">+ Add New Category</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="collection">Collection</Label>
                        <Select
                          value={product.collection}
                          onValueChange={(value) => handleSelectChange('collection', value)}
                        >
                          <SelectTrigger>
                            <SelectValue placeholder="Select collection" />
                          </SelectTrigger>
                          <SelectContent>
                            {collections.map((collection) => (
                              <SelectItem key={collection.id} value={collection.name}>
                                {collection.name}
                              </SelectItem>
                            ))}
                            <SelectItem value="new">+ Add New Collection</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="flex items-center space-x-2 pt-2">
                        <Checkbox
                          id="featured"
                          checked={product.featured}
                          onCheckedChange={(checked) => 
                            setProduct(prev => ({ ...prev, featured: !!checked }))
                          }
                        />
                        <Label htmlFor="featured">Featured Product</Label>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="images">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-4">
                    <Label>Product Images</Label>
                    <p className="text-sm text-muted-foreground mb-4">
                      Add images for your product. First image will be used as the thumbnail.
                    </p>
                    
                    <div className="grid grid-cols-1 gap-4">
                      {product.images.map((image, index) => (
                        <div 
                          key={index} 
                          className="flex items-center gap-4 border rounded-md p-4"
                        >
                          {image ? (
                            <div className="h-16 w-16 rounded bg-muted overflow-hidden">
                              <img 
                                src={image} 
                                alt={`Product ${index + 1}`}
                                className="h-full w-full object-cover"
                              />
                            </div>
                          ) : (
                            <div className="h-16 w-16 rounded bg-muted flex items-center justify-center">
                              <Upload className="h-6 w-6 text-muted-foreground" />
                            </div>
                          )}
                          
                          <div className="flex-1">
                            <Input
                              value={image}
                              onChange={(e) => updateImageUrl(index, e.target.value)}
                              placeholder="Enter image URL"
                            />
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            type="button"
                            onClick={() => removeImage(index)}
                          >
                            <X className="h-5 w-5" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addImageField}
                      className="mt-2"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Add Image
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="variants">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                      <Label>Available Sizes</Label>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {availableSizes.map((size) => (
                          <button
                            key={size}
                            type="button"
                            onClick={() => toggleSize(size)}
                            className={`h-10 min-w-10 px-3 rounded-md border ${
                              product.sizes.includes(size)
                                ? 'bg-primary text-primary-foreground border-primary'
                                : 'border-input bg-background hover:bg-muted'
                            }`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardContent className="pt-6 space-y-4">
                    <div className="space-y-2">
                      <Label>Available Colors</Label>
                      <div className="flex flex-wrap gap-3 mt-3">
                        {availableColors.map((color) => (
                          <button
                            key={color.name}
                            type="button"
                            onClick={() => toggleColor(color)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center ${
                              product.colors.some(c => c.name === color.name)
                                ? 'ring-2 ring-primary ring-offset-2'
                                : ''
                            }`}
                            style={{ backgroundColor: color.hex }}
                            title={color.name}
                          >
                            {product.colors.some(c => c.name === color.name) && (
                              <span className={`text-${
                                ['White', 'Cream', 'Off White'].includes(color.name)
                                  ? 'black'
                                  : 'white'
                              }`}>
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="none"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  className="w-5 h-5"
                                >
                                  <path d="M20 6 9 17l-5-5" />
                                </svg>
                              </span>
                            )}
                          </button>
                        ))}
                      </div>
                      
                      {product.colors.length > 0 && (
                        <div className="mt-4">
                          <p className="text-sm font-medium mb-2">Selected Colors:</p>
                          <div className="flex flex-wrap gap-2">
                            {product.colors.map((color) => (
                              <span
                                key={color.name}
                                className="px-2 py-1 bg-muted rounded-md text-xs"
                              >
                                {color.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="seo">
              <Card>
                <CardContent className="pt-6 space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="metaTitle">Meta Title</Label>
                    <Input
                      id="metaTitle"
                      placeholder="Meta title for SEO"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="metaDescription">Meta Description</Label>
                    <Textarea
                      id="metaDescription"
                      placeholder="Meta description for SEO"
                      rows={3}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="slug">URL Slug</Label>
                    <Input
                      id="slug"
                      placeholder="product-url-slug"
                    />
                    <p className="text-sm text-muted-foreground">
                      This will be used in the product URL: /product/<span className="font-mono">product-url-slug</span>
                    </p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddEditProduct;
