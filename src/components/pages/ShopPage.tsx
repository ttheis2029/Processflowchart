import React, { useState } from "react";
import { motion } from "motion/react";
import { Search, Filter, ShoppingCart, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Badge } from "../ui/badge";
import { Input } from "../ui/input";

export function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const products = [
    {
      id: 1,
      title: "Introduction to Psychology",
      author: "James W. Kalat",
      price: 129.99,
      originalPrice: 159.99,
      category: "Textbook",
      rating: 4.5,
      stock: "In Stock"
    },
    {
      id: 2,
      title: "Cardinal Hoodie",
      author: "Ball State Apparel",
      price: 49.99,
      category: "Apparel",
      rating: 5,
      stock: "In Stock"
    },
    {
      id: 3,
      title: "Calculus: Early Transcendentals",
      author: "James Stewart",
      price: 199.99,
      originalPrice: 249.99,
      category: "Textbook",
      rating: 4.3,
      stock: "Low Stock"
    },
    {
      id: 4,
      title: "Ball State T-Shirt",
      author: "Ball State Apparel",
      price: 24.99,
      category: "Apparel",
      rating: 4.8,
      stock: "In Stock"
    },
    {
      id: 5,
      title: "Business Communication Today",
      author: "Courtland L. Bovée",
      price: 89.99,
      originalPrice: 119.99,
      category: "Textbook",
      rating: 4.2,
      stock: "In Stock"
    },
    {
      id: 6,
      title: "Cardinal Notebook Set",
      author: "Office Supplies",
      price: 15.99,
      category: "Supplies",
      rating: 4.6,
      stock: "In Stock"
    },
    {
      id: 7,
      title: "Chemistry: The Central Science",
      author: "Theodore E. Brown",
      price: 179.99,
      originalPrice: 219.99,
      category: "Textbook",
      rating: 4.7,
      stock: "In Stock"
    },
    {
      id: 8,
      title: "Ball State Backpack",
      author: "Ball State Gear",
      price: 59.99,
      category: "Accessories",
      rating: 4.9,
      stock: "In Stock"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-white border-b py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
          >
            <h1 className="mb-4">Shop Cardinal Books</h1>
            <p className="text-muted-foreground mb-6">
              Browse our extensive collection of textbooks, apparel, and supplies.
            </p>

            {/* Search and Filter */}
            <div className="flex gap-4 max-w-2xl">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search for books, apparel, supplies..."
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="outline" className="gap-2">
                <Filter className="w-4 h-4" />
                Filters
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-6 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-2 overflow-x-auto pb-2">
            {["All Items", "Textbooks", "Apparel", "Supplies", "Accessories", "Sale"].map((category) => (
              <Badge 
                key={category}
                variant={category === "All Items" ? "default" : "outline"}
                className={`cursor-pointer whitespace-nowrap ${
                  category === "All Items" 
                    ? "bg-[#BA0C2F] hover:bg-[#9A0A25]" 
                    : "hover:bg-gray-100"
                }`}
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <motion.div
                key={product.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className="h-full hover:shadow-lg transition-all group">
                  <CardContent className="p-4">
                    {/* Product Image Placeholder */}
                    <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg mb-4 flex items-center justify-center group-hover:from-red-50 group-hover:to-red-100 transition-colors">
                      <div className="text-6xl text-gray-400 group-hover:text-[#BA0C2F] transition-colors">
                        📚
                      </div>
                    </div>

                    {/* Category Badge */}
                    <Badge variant="outline" className="mb-2 text-xs">
                      {product.category}
                    </Badge>

                    {/* Product Info */}
                    <h4 className="mb-1 line-clamp-2">{product.title}</h4>
                    <p className="text-sm text-muted-foreground mb-3">{product.author}</p>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-3">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3 h-3 ${
                            i < Math.floor(product.rating)
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                      <span className="text-xs text-muted-foreground ml-1">
                        ({product.rating})
                      </span>
                    </div>

                    {/* Price */}
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-[#BA0C2F]">${product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-muted-foreground line-through">
                          ${product.originalPrice}
                        </span>
                      )}
                    </div>

                    {/* Stock Status */}
                    <Badge 
                      variant={product.stock === "In Stock" ? "default" : "secondary"}
                      className={product.stock === "In Stock" ? "bg-green-500" : ""}
                    >
                      {product.stock}
                    </Badge>
                  </CardContent>

                  <CardFooter className="p-4 pt-0">
                    <Button 
                      className="w-full bg-[#BA0C2F] hover:bg-[#9A0A25] gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Load More Products
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}