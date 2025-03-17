
import React from 'react';
import AdminLayout from '@/components/admin/AdminLayout';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Star, ThumbsDown, ThumbsUp } from 'lucide-react';

const Reviews = () => {
  // Mocked reviews data
  const reviews = [
    {
      id: '1',
      productName: 'Classic White Sneakers',
      customerName: 'Raj Sharma',
      rating: 5,
      comment: 'Great quality and exactly as described. Very comfortable!',
      date: '2023-08-15',
      status: 'approved',
    },
    {
      id: '2',
      productName: 'Denim Jacket',
      customerName: 'Priya Patel',
      rating: 4,
      comment: 'Love the jacket! The material is good but runs slightly small.',
      date: '2023-08-14',
      status: 'approved',
    },
    {
      id: '3',
      productName: 'Cotton T-Shirt',
      customerName: 'Vikram Singh',
      rating: 2,
      comment: 'The color faded after just one wash. Not happy with the quality.',
      date: '2023-08-13',
      status: 'pending',
    },
  ];

  return (
    <AdminLayout>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">Product Reviews</h1>
        
        <div className="mb-6 flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex flex-col md:flex-row gap-4">
            <Input className="max-w-xs" placeholder="Search reviews..." />
            <Select defaultValue="all">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Reviews</SelectItem>
                <SelectItem value="approved">Approved</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline">Export Reviews</Button>
          </div>
        </div>
        
        <div className="space-y-4">
          {reviews.map((review) => (
            <Card key={review.id} className="overflow-hidden">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row justify-between gap-4">
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="flex">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-muted-foreground"}`} 
                          />
                        ))}
                      </div>
                      <span className="text-sm font-medium">
                        for {review.productName}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        {review.date}
                      </span>
                    </div>
                    <p className="font-medium">{review.customerName}</p>
                    <p className="text-muted-foreground">{review.comment}</p>
                  </div>
                  
                  <div className="flex flex-row md:flex-col items-center md:items-end gap-2 md:min-w-32">
                    <div className="flex items-center gap-1">
                      <span className="text-xs font-medium px-2 py-1 rounded-full bg-muted">
                        {review.status}
                      </span>
                    </div>
                    
                    <div className="flex gap-2">
                      {review.status === 'pending' && (
                        <>
                          <Button size="sm" variant="outline" className="h-8">
                            <ThumbsDown className="h-4 w-4 mr-1" />
                            Reject
                          </Button>
                          <Button size="sm" className="h-8">
                            <ThumbsUp className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                        </>
                      )}
                      {review.status !== 'pending' && (
                        <Button size="sm" variant="outline" className="h-8">
                          Edit
                        </Button>
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

export default Reviews;
