
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Edit, FileText, Image, Plus, Trash2 } from 'lucide-react';

const Blog = () => {
  // Mock blog posts data
  const blogPosts = [
    {
      id: '1',
      title: 'Summer Fashion Trends 2023',
      excerpt: 'Discover the hottest fashion trends for this summer season...',
      image: '/placeholder.svg',
      author: 'Priya Sharma',
      publishDate: '2023-07-15',
      status: 'published',
      category: 'Fashion',
      views: 1245,
    },
    {
      id: '2',
      title: 'How to Style Your New Denim Jacket',
      excerpt: 'Get the most out of your denim jacket with these styling tips...',
      image: '/placeholder.svg',
      author: 'Rahul Desai',
      publishDate: '2023-07-28',
      status: 'published',
      category: 'Styling Tips',
      views: 890,
    },
    {
      id: '3',
      title: 'Sustainable Fashion: The Future of Clothing',
      excerpt: 'Exploring eco-friendly materials and sustainable practices...',
      image: '/placeholder.svg',
      author: 'Vikram Malhotra',
      publishDate: null,
      status: 'draft',
      category: 'Sustainability',
      views: 0,
    },
    {
      id: '4',
      title: 'Monsoon Essentials: What You Need',
      excerpt: 'Stay stylish and dry with these monsoon fashion essentials...',
      image: '/placeholder.svg',
      author: 'Ananya Patel',
      publishDate: '2023-08-05',
      status: 'scheduled',
      category: 'Seasonal',
      views: 0,
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">Blog Management</h1>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Create Post
          </Button>
        </div>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4">
          <Input className="max-w-xs" placeholder="Search blog posts..." />
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
              <SelectItem value="scheduled">Scheduled</SelectItem>
            </SelectContent>
          </Select>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="fashion">Fashion</SelectItem>
              <SelectItem value="styling">Styling Tips</SelectItem>
              <SelectItem value="sustainability">Sustainability</SelectItem>
              <SelectItem value="seasonal">Seasonal</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-4">
          {blogPosts.map((post) => (
            <Card key={post.id}>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  <div className="w-full md:w-48 h-32 bg-muted rounded-md overflow-hidden flex-shrink-0">
                    <img 
                      src={post.image} 
                      alt={post.title} 
                      className="w-full h-full object-cover" 
                    />
                  </div>
                  
                  <div className="flex-grow">
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2">
                      <h3 className="text-lg font-medium">{post.title}</h3>
                      <div className="flex items-center mt-2 md:mt-0 space-x-2">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium 
                          ${post.status === 'published' ? 'bg-green-100 text-green-800' : 
                            post.status === 'draft' ? 'bg-yellow-100 text-yellow-800' : 
                            'bg-blue-100 text-blue-800'}`}>
                          {post.status.charAt(0).toUpperCase() + post.status.slice(1)}
                        </span>
                        
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Edit className="h-4 w-4" />
                          <span className="sr-only">Edit</span>
                        </Button>
                        
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-destructive">
                          <Trash2 className="h-4 w-4" />
                          <span className="sr-only">Delete</span>
                        </Button>
                      </div>
                    </div>
                    
                    <p className="text-muted-foreground mb-4 line-clamp-2">{post.excerpt}</p>
                    
                    <div className="flex flex-wrap gap-x-6 gap-y-2">
                      <div className="flex items-center text-sm">
                        <span className="text-muted-foreground mr-2">Author:</span>
                        <span>{post.author}</span>
                      </div>
                      
                      <div className="flex items-center text-sm">
                        <span className="text-muted-foreground mr-2">Category:</span>
                        <span>{post.category}</span>
                      </div>
                      
                      {post.publishDate && (
                        <div className="flex items-center text-sm">
                          <Calendar className="h-3.5 w-3.5 mr-1 text-muted-foreground" />
                          {post.status === 'scheduled' ? 'Scheduled for: ' : 'Published: '}
                          {post.publishDate}
                        </div>
                      )}
                      
                      {post.views > 0 && (
                        <div className="flex items-center text-sm">
                          <span className="text-muted-foreground mr-2">Views:</span>
                          <span>{post.views.toLocaleString()}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="mt-4 pt-4 border-t flex justify-end gap-2">
                      <Button variant="outline" size="sm">Preview</Button>
                      
                      {post.status === 'draft' && (
                        <Button size="sm">Publish</Button>
                      )}
                      
                      {post.status === 'published' && (
                        <Button variant="outline" size="sm">View on Site</Button>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AdminLayout>
  );
};

export default Blog;
