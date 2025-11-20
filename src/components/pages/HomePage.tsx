import React from "react";
import { motion } from "motion/react";
import { Book, ShoppingBag, Truck, CreditCard, ArrowRight, Package } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { Mail } from "lucide-react";

interface HomePageProps {
  onNavigate: (page: string) => void;
}

export function HomePage({ onNavigate }: HomePageProps) {
  const features = [
    {
      icon: Book,
      title: "Extensive Catalog",
      description: "Browse thousands of textbooks, supplies, and Ball State merchandise"
    },
    {
      icon: ShoppingBag,
      title: "Easy Shopping",
      description: "Shop online or in-store with our convenient ordering system"
    },
    {
      icon: Truck,
      title: "Fast Delivery",
      description: "Get your orders delivered quickly or pick up in-store"
    },
    {
      icon: CreditCard,
      title: "Secure Payments",
      description: "Multiple payment options with secure checkout"
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section 
        className="relative bg-gradient-to-br from-[#BA0C2F] to-[#8A0A23] text-white py-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="mb-4 bg-white/20 text-white border-white/30">
                Official Ball State University Bookstore
              </Badge>
            </motion.div>
            
            <motion.h1 
              className="text-white mb-6"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              Welcome to Cardinal Books
            </motion.h1>
            
            <motion.p 
              className="text-xl text-white/90 mb-8"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              Your one-stop shop for textbooks, course materials, Ball State apparel, and everything you need to succeed as a Cardinal.
            </motion.p>
            
            <motion.div 
              className="flex gap-4 justify-center flex-wrap"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {/* Browse Products button hidden but kept for future use
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-b from-gray-100 via-white to-gray-200 text-[#BA0C2F] hover:from-white hover:to-gray-100 border-2 border-gray-300 shadow-lg px-8 py-6 font-semibold"
                  onClick={() => onNavigate("shop")}
                  style={{
                    boxShadow: "0 3px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.9)"
                  }}
                >
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Browse Products
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
              */}
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-b from-gray-100 via-white to-gray-200 text-[#BA0C2F] hover:from-white hover:to-gray-100 border-2 border-gray-300 shadow-lg px-8 py-6 font-semibold"
                  onClick={() => onNavigate("order-status")}
                  style={{
                    boxShadow: "0 3px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.9)"
                  }}
                >
                  <Package className="w-5 h-5 mr-2" />
                  Track Your Order
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-b from-gray-700 to-gray-800 text-white hover:from-gray-600 hover:to-gray-700 border-2 border-gray-900 shadow-lg px-8 py-6 font-semibold"
                  onClick={() => onNavigate("contact")}
                  style={{
                    boxShadow: "0 3px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)"
                  }}
                >
                  <Mail className="w-5 h-5 mr-2" />
                  Contact Us
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4">Why Choose Cardinal Books?</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              We're dedicated to providing the best shopping experience for Ball State students, faculty, and alumni.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full hover:shadow-lg transition-shadow">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-[#BA0C2F] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="mb-2">{feature.title}</h4>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            className="text-center mb-12"
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="mb-4">Shop by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find exactly what you need from our wide selection of products.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Textbooks", desc: "New, used, and rental options", gradient: "from-slate-700 to-slate-800" },
              { title: "Ball State Gear", desc: "Official apparel and accessories", gradient: "from-gray-800 to-black" },
              { title: "School Supplies", desc: "Complete range of academic supplies", gradient: "from-slate-700 to-slate-800" }
            ].map((category, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.02 }}
              >
                <Card className={`bg-gradient-to-b ${category.gradient} border-2 border-gray-700 shadow-lg text-white`} style={{
                  boxShadow: "0 3px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.1)"
                }}>
                  <CardContent className="p-8 text-center">
                    <h3 className="mb-3 text-white">{category.title}</h3>
                    <p className="text-gray-300 mb-6">{category.desc}</p>
                    {/* Browse button hidden but kept for future use
                    <Button 
                      className="bg-gradient-to-b from-gray-100 to-gray-200 text-[#BA0C2F] hover:from-white hover:to-gray-100 border-2 border-gray-300 font-semibold"
                      onClick={() => onNavigate("shop")}
                      style={{
                        boxShadow: "0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.8)"
                      }}
                    >
                      View Products
                    </Button>
                    */}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-b from-gray-800 to-black text-white border-y-2 border-gray-700">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-white mb-4">Ready to Get Started</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Experience professional service from your trusted campus bookstore
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              {/* Start Shopping button hidden but kept for future use
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-b from-[#BA0C2F] to-[#9A0A25] hover:from-[#D01030] hover:to-[#8A0A23] border-2 border-red-900 shadow-lg px-8 py-6 text-white font-semibold"
                  onClick={() => onNavigate("shop")}
                  style={{
                    boxShadow: "0 3px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.2)"
                  }}
                >
                  Start Shopping
                </Button>
              </motion.div>
              */}
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                <Button 
                  size="lg" 
                  className="bg-gradient-to-b from-gray-100 to-gray-200 text-gray-900 hover:from-white hover:to-gray-100 border-2 border-gray-300 shadow-lg px-8 py-6 font-semibold"
                  onClick={() => onNavigate("contact")}
                  style={{
                    boxShadow: "0 3px 6px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.8)"
                  }}
                >
                  Contact Us
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}