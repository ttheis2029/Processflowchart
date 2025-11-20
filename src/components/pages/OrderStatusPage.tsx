import React, { useState } from "react";
import { motion } from "motion/react";
import { Package, Search, CheckCircle, Truck, Clock, XCircle } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";

export function OrderStatusPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [searchResults, setSearchResults] = useState<any>(null);

  // Mock order data
  const mockOrders: { [key: string]: any } = {
    "ORD-2025-001": {
      orderNumber: "ORD-2025-001",
      status: "delivered",
      date: "January 15, 2025",
      total: 234.97,
      items: [
        { name: "Introduction to Psychology", quantity: 1, price: 129.99 },
        { name: "Cardinal Hoodie", quantity: 1, price: 49.99 },
        { name: "Notebook Set", quantity: 3, price: 15.99 }
      ],
      tracking: "1Z999AA10123456784",
      estimatedDelivery: "January 20, 2025"
    },
    "ORD-2025-002": {
      orderNumber: "ORD-2025-002",
      status: "shipped",
      date: "January 18, 2025",
      total: 179.99,
      items: [
        { name: "Calculus: Early Transcendentals", quantity: 1, price: 179.99 }
      ],
      tracking: "1Z999AA10123456785",
      estimatedDelivery: "January 22, 2025"
    },
    "ORD-2025-003": {
      orderNumber: "ORD-2025-003",
      status: "processing",
      date: "January 20, 2025",
      total: 89.99,
      items: [
        { name: "Ball State T-Shirt", quantity: 2, price: 24.99 },
        { name: "Ball State Cap", quantity: 1, price: 39.99 }
      ],
      tracking: null,
      estimatedDelivery: "January 25, 2025"
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Simple mock search - in real app would query backend
    const order = mockOrders[orderNumber.toUpperCase()];
    
    if (order && email.toLowerCase().includes("@")) {
      setSearchResults(order);
    } else {
      setSearchResults({ error: true });
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "delivered":
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case "shipped":
        return <Truck className="w-6 h-6 text-blue-600" />;
      case "processing":
        return <Clock className="w-6 h-6 text-yellow-600" />;
      default:
        return <Package className="w-6 h-6 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: { [key: string]: string } = {
      delivered: "bg-gradient-to-b from-green-500 to-green-600 text-white border-2 border-green-700",
      shipped: "bg-gradient-to-b from-blue-500 to-blue-600 text-white border-2 border-blue-700",
      processing: "bg-gradient-to-b from-yellow-500 to-yellow-600 text-white border-2 border-yellow-700",
      cancelled: "bg-gradient-to-b from-red-500 to-red-600 text-white border-2 border-red-700"
    };

    return (
      <Badge className={styles[status] || "bg-gray-500"} style={{
        boxShadow: "0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.3)"
      }}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-200 to-gray-300">
      {/* Header Section */}
      <section className="bg-gradient-to-b from-[#BA0C2F] to-[#9A0A25] text-white py-16 border-b-2 border-gray-800" style={{
        boxShadow: "inset 0 -4px 8px rgba(0,0,0,0.2)"
      }}>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-center"
          >
            <div className="flex justify-center mb-6">
              <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex items-center justify-center border-2 border-gray-300 shadow-lg" style={{
                boxShadow: "0 4px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.8)"
              }}>
                <Package className="w-12 h-12 text-[#BA0C2F]" />
              </div>
            </div>
            <h1 className="text-white mb-4" style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.4)" }}>
              Track Your Order
            </h1>
            <p className="text-xl text-white/95 max-w-2xl mx-auto">
              Enter your order number and email to check the status of your purchase
            </p>
          </motion.div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="max-w-2xl mx-auto border-2 border-gray-400 shadow-lg" style={{
              boxShadow: "0 4px 8px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.5)"
            }}>
              <CardHeader className="bg-gradient-to-b from-gray-100 to-white border-b-2 border-gray-300">
                <CardTitle className="flex items-center gap-2">
                  <Search className="w-5 h-5 text-[#BA0C2F]" />
                  Order Lookup
                </CardTitle>
              </CardHeader>
              <CardContent className="p-6">
                <form onSubmit={handleSearch} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Order Number
                    </label>
                    <Input
                      type="text"
                      placeholder="e.g., ORD-2025-001"
                      value={orderNumber}
                      onChange={(e) => setOrderNumber(e.target.value)}
                      required
                      className="border-2 border-gray-300 shadow-inner"
                      style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)" }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Email Address
                    </label>
                    <Input
                      type="email"
                      placeholder="your.email@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="border-2 border-gray-300 shadow-inner"
                      style={{ boxShadow: "inset 0 2px 4px rgba(0,0,0,0.1)" }}
                    />
                  </div>
                  <Button 
                    type="submit" 
                    className="w-full bg-gradient-to-b from-[#BA0C2F] to-[#9A0A25] hover:from-[#D01030] hover:to-[#8A0A23] border-2 border-red-900 shadow-lg text-white font-semibold"
                    style={{
                      boxShadow: "0 3px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)"
                    }}
                  >
                    <Search className="w-4 h-4 mr-2" />
                    Track Order
                  </Button>
                </form>

                {/* Demo hint */}
                <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-200 rounded-lg">
                  <p className="text-sm text-blue-800">
                    <strong>Demo:</strong> Try order numbers: ORD-2025-001, ORD-2025-002, or ORD-2025-003 with any valid email
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Section */}
          {searchResults && (
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              className="mt-8 max-w-4xl mx-auto"
            >
              {searchResults.error ? (
                <Card className="border-2 border-red-300 bg-red-50">
                  <CardContent className="p-6 text-center">
                    <XCircle className="w-12 h-12 text-red-600 mx-auto mb-4" />
                    <h3 className="mb-2 text-red-900">Order Not Found</h3>
                    <p className="text-red-700">
                      We couldn't find an order with that number and email combination. Please check your information and try again.
                    </p>
                  </CardContent>
                </Card>
              ) : (
                <div className="space-y-6">
                  {/* Order Status Card */}
                  <Card className="border-2 border-gray-400 shadow-lg" style={{
                    boxShadow: "0 4px 8px rgba(0,0,0,0.2)"
                  }}>
                    <CardHeader className="bg-gradient-to-b from-gray-100 to-white border-b-2 border-gray-300">
                      <div className="flex items-center justify-between">
                        <CardTitle>Order {searchResults.orderNumber}</CardTitle>
                        {getStatusBadge(searchResults.status)}
                      </div>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                        <div>
                          <p className="text-sm text-gray-600 mb-1 font-semibold">Order Date</p>
                          <p className="font-semibold">{searchResults.date}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1 font-semibold">Total Amount</p>
                          <p className="font-semibold text-[#BA0C2F]">${searchResults.total.toFixed(2)}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600 mb-1 font-semibold">Estimated Delivery</p>
                          <p className="font-semibold">{searchResults.estimatedDelivery}</p>
                        </div>
                      </div>

                      {/* Status Timeline */}
                      <div className="mb-6 p-4 bg-gradient-to-b from-gray-50 to-gray-100 rounded-lg border-2 border-gray-300">
                        <h4 className="mb-4 flex items-center gap-2">
                          {getStatusIcon(searchResults.status)}
                          Order Status
                        </h4>
                        <div className="space-y-3">
                          <div className={`flex items-center gap-3 ${searchResults.status === 'processing' || searchResults.status === 'shipped' || searchResults.status === 'delivered' ? 'text-green-700' : 'text-gray-400'}`}>
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-semibold">Order Placed</span>
                          </div>
                          <div className={`flex items-center gap-3 ${searchResults.status === 'shipped' || searchResults.status === 'delivered' ? 'text-green-700' : 'text-gray-400'}`}>
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-semibold">Order Shipped</span>
                          </div>
                          <div className={`flex items-center gap-3 ${searchResults.status === 'delivered' ? 'text-green-700' : 'text-gray-400'}`}>
                            <CheckCircle className="w-5 h-5" />
                            <span className="font-semibold">Delivered</span>
                          </div>
                        </div>
                      </div>

                      {/* Tracking Info */}
                      {searchResults.tracking && (
                        <div className="p-4 bg-blue-50 border-2 border-blue-200 rounded-lg mb-6">
                          <p className="text-sm font-semibold text-blue-900 mb-1">Tracking Number</p>
                          <p className="font-mono text-blue-700">{searchResults.tracking}</p>
                        </div>
                      )}

                      {/* Order Items */}
                      <div>
                        <h4 className="mb-3">Order Items</h4>
                        <div className="space-y-3">
                          {searchResults.items.map((item: any, index: number) => (
                            <div key={index} className="flex justify-between items-center p-3 bg-white border border-gray-300 rounded-lg shadow-sm">
                              <div>
                                <p className="font-semibold">{item.name}</p>
                                <p className="text-sm text-gray-600">Quantity: {item.quantity}</p>
                              </div>
                              <p className="font-semibold text-[#BA0C2F]">${(item.price * item.quantity).toFixed(2)}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  {/* Help Card */}
                  <Card className="border-2 border-gray-300 bg-gradient-to-b from-gray-50 to-white">
                    <CardContent className="p-6">
                      <h4 className="mb-3">Need Help?</h4>
                      <p className="text-gray-700 mb-4">
                        If you have questions about your order, please contact our customer service team.
                      </p>
                      <div className="flex gap-3">
                        <Button variant="outline" className="border-2 border-gray-300">
                          Call Us: (765) 285-8000
                        </Button>
                        <Button variant="outline" className="border-2 border-gray-300">
                          Email Support
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}