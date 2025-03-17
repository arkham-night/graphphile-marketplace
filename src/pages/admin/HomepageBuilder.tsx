
import React, { useState } from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { ArrowDown, ArrowUp, Edit, Eye, Grid, Image, Layers, LayoutGrid, Plus, Trash2 } from 'lucide-react';

const HomepageBuilder = () => {
  const [activeTab, setActiveTab] = useState('layout');
  
  // Mock sections data
  const sections = [
    {
      id: '1',
      name: 'Hero Banner',
      type: 'banner',
      active: true,
      preview: '/placeholder.svg',
    },
    {
      id: '2',
      name: 'Featured Products',
      type: 'product-grid',
      active: true,
      preview: '/placeholder.svg',
    },
    {
      id: '3',
      name: 'New Collection Promo',
      type: 'full-width-banner',
      active: true,
      preview: '/placeholder.svg',
    },
    {
      id: '4',
      name: 'Categories Grid',
      type: 'category-grid',
      active: true,
      preview: '/placeholder.svg',
    },
    {
      id: '5',
      name: 'Testimonials',
      type: 'testimonials',
      active: false,
      preview: '/placeholder.svg',
    },
  ];
  
  // Mock templates data
  const templates = [
    {
      id: '1',
      name: 'Standard Homepage',
      description: 'Classic layout with hero banner and product grids',
      preview: '/placeholder.svg',
    },
    {
      id: '2',
      name: 'Minimal Showcase',
      description: 'Clean design focusing on product images',
      preview: '/placeholder.svg',
    },
    {
      id: '3',
      name: 'Full Collections',
      description: 'Highlight multiple collections in full-width sections',
      preview: '/placeholder.svg',
    },
  ];
  
  // Mock section components data
  const components = [
    {
      id: '1',
      name: 'Hero Banner',
      type: 'banner',
      description: 'Large hero image with text overlay',
      preview: '/placeholder.svg',
    },
    {
      id: '2',
      name: 'Product Grid',
      type: 'product-grid',
      description: 'Display products in a grid layout',
      preview: '/placeholder.svg',
    },
    {
      id: '3',
      name: 'Featured Collection',
      type: 'collection',
      description: 'Showcase a specific collection',
      preview: '/placeholder.svg',
    },
    {
      id: '4',
      name: 'Full Width Promo',
      type: 'promo',
      description: 'Full-width promotional banner',
      preview: '/placeholder.svg',
    },
    {
      id: '5',
      name: 'Category Navigation',
      type: 'categories',
      description: 'Grid or carousel of product categories',
      preview: '/placeholder.svg',
    },
    {
      id: '6',
      name: 'Testimonials',
      type: 'testimonials',
      description: 'Customer reviews and testimonials',
      preview: '/placeholder.svg',
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Homepage Builder</h1>
          <div className="flex gap-2">
            <Button variant="outline">
              <Eye className="h-4 w-4 mr-2" />
              Preview
            </Button>
            <Button>Save Changes</Button>
          </div>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full md:w-auto grid-cols-3 md:inline-flex">
            <TabsTrigger value="layout">Layout</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
            <TabsTrigger value="components">Components</TabsTrigger>
          </TabsList>
          
          <TabsContent value="layout" className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-xl font-semibold">Homepage Layout</h2>
                <p className="text-muted-foreground">Arrange and organize homepage sections</p>
              </div>
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Add Section
              </Button>
            </div>
            
            <div className="mt-6 space-y-4">
              {sections.map((section, index) => (
                <Card 
                  key={section.id} 
                  className={`border ${!section.active ? 'border-dashed opacity-70' : ''}`}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex items-center justify-center bg-muted rounded-md h-12 w-12 flex-shrink-0">
                        <Layers className="h-6 w-6 text-muted-foreground" />
                      </div>
                      
                      <div className="flex-grow">
                        <h3 className="font-medium">{section.name}</h3>
                        <p className="text-sm text-muted-foreground capitalize">{section.type.replace('-', ' ')}</p>
                      </div>
                      
                      <div className="flex gap-1">
                        {index > 0 && (
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ArrowUp className="h-4 w-4" />
                            <span className="sr-only">Move up</span>
                          </Button>
                        )}
                        
                        {index < sections.length - 1 && (
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <ArrowDown className="h-4 w-4" />
                            <span className="sr-only">Move down</span>
                          </Button>
                        )}
                        
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Preview</span>
                        </Button>
                        
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive hover:text-destructive">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="templates" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Homepage Templates</h2>
              <p className="text-muted-foreground">Pre-designed homepage layouts</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {templates.map((template) => (
                <Card key={template.id}>
                  <CardHeader className="pb-3">
                    <CardTitle>{template.name}</CardTitle>
                    <CardDescription>{template.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className="aspect-video bg-muted rounded-md overflow-hidden mb-4">
                      <img 
                        src={template.preview} 
                        alt={template.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <Button className="w-full">Use This Template</Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
          
          <TabsContent value="components" className="space-y-6">
            <div>
              <h2 className="text-xl font-semibold">Section Components</h2>
              <p className="text-muted-foreground">Available components to add to your homepage</p>
            </div>
            
            <div className="flex mb-4">
              <Input className="max-w-xs" placeholder="Search components..." />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {components.map((component) => (
                <Card key={component.id}>
                  <CardContent className="p-4">
                    <div className="aspect-video bg-muted rounded-md overflow-hidden mb-4">
                      <img 
                        src={component.preview} 
                        alt={component.name} 
                        className="w-full h-full object-cover" 
                      />
                    </div>
                    <h3 className="font-medium">{component.name}</h3>
                    <p className="text-sm text-muted-foreground mb-4">{component.description}</p>
                    <Button size="sm" className="w-full">
                      <Plus className="h-4 w-4 mr-2" />
                      Add to Layout
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default HomepageBuilder;
