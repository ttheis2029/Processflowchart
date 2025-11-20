import React from "react";
import { motion } from "motion/react";
import { BookstoreFlowchart } from "../BookstoreFlowchart";
import { Badge } from "../ui/badge";
import { ArrowRight, Download } from "lucide-react";

export function ProcessFlowPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <section className="bg-gradient-to-br from-[#BA0C2F] to-[#8A0A23] text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-4xl mx-auto text-center"
          >
            <Badge className="mb-4 bg-white/20 text-white border-white/30">
              Interactive Visualization
            </Badge>
            <h1 className="text-white mb-6">Bookstore Transaction Process</h1>
            <p className="text-xl text-white/90 mb-6">
              Explore our streamlined "to be" process for customer transactions. This interactive flowchart shows how we handle orders from browsing to delivery, both in-store and online.
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <div className="flex items-center gap-2 text-white/90">
                <ArrowRight className="w-4 h-4" />
                <span className="text-sm">Click nodes to explore</span>
              </div>
              <div className="flex items-center gap-2 text-white/90">
                <Download className="w-4 h-4" />
                <span className="text-sm">Downloadable formats</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-center mb-6">How It Works</h2>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-[#BA0C2F] text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  1
                </div>
                <h5 className="mb-2">Browse</h5>
                <p className="text-sm text-muted-foreground">
                  Search our catalog online or in-store
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-[#BA0C2F] text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  2
                </div>
                <h5 className="mb-2">Select</h5>
                <p className="text-sm text-muted-foreground">
                  Add items to your cart
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-[#BA0C2F] text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  3
                </div>
                <h5 className="mb-2">Payment</h5>
                <p className="text-sm text-muted-foreground">
                  Choose cash or digital payment
                </p>
              </div>
              <div>
                <div className="w-12 h-12 bg-[#BA0C2F] text-white rounded-full flex items-center justify-center mx-auto mb-3">
                  4
                </div>
                <h5 className="mb-2">Receive</h5>
                <p className="text-sm text-muted-foreground">
                  Get your books and receipt
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Flowchart Component */}
      <section className="py-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <BookstoreFlowchart />
        </motion.div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 bg-white border-t">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="mb-6">Why Our Process Works</h2>
            <div className="grid md:grid-cols-3 gap-6 text-left">
              <div className="p-6 bg-red-50 rounded-lg border border-red-100">
                <h4 className="mb-2 text-[#BA0C2F]">Automated Systems</h4>
                <p className="text-sm text-muted-foreground">
                  Our POS system automatically calculates totals and updates inventory in real-time, ensuring accuracy and availability.
                </p>
              </div>
              <div className="p-6 bg-gray-50 rounded-lg border border-gray-200">
                <h4 className="mb-2">Flexible Options</h4>
                <p className="text-sm text-muted-foreground">
                  Shop online or in-store, pay with cash or digital methods, and choose pickup or delivery based on your needs.
                </p>
              </div>
              <div className="p-6 bg-red-50 rounded-lg border border-red-100">
                <h4 className="mb-2 text-[#BA0C2F]">Customer Support</h4>
                <p className="text-sm text-muted-foreground">
                  Can't find what you need? Our restock request system ensures you can order any book, even if it's not currently in stock.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}