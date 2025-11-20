import React from "react";
import { motion } from "motion/react";
import { Book, ShoppingBag, Package, Mail } from "lucide-react";
import { Button } from "./ui/button";

interface HeaderProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export function Header({ currentPage, onNavigate }: HeaderProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Book },
    // { id: "shop", label: "Shop", icon: ShoppingBag }, // Hidden but kept for future use
    { id: "order-status", label: "Order Status", icon: Package },
    { id: "contact", label: "Contact Us", icon: Mail }
  ];

  return (
    <motion.header 
      className="sticky top-0 z-50 w-full bg-gradient-to-b from-[#BA0C2F] to-[#9A0A25] shadow-lg border-b-2 border-gray-800"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        boxShadow: "0 3px 6px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)"
      }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => onNavigate("home")}
            whileHover={{ scale: 1.03 }}
          >
            <div 
              className="w-12 h-12 bg-gradient-to-br from-gray-100 via-white to-gray-200 rounded-lg flex items-center justify-center border border-gray-300 shadow-md"
              style={{
                boxShadow: "0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.8)"
              }}
            >
              <Book className="w-7 h-7 text-[#BA0C2F]" />
            </div>
            <div>
              <h3 className="text-white mb-0 drop-shadow-md">Cardinal Books</h3>
              <p className="text-xs text-gray-200 -mt-1">Ball State University</p>
            </div>
          </motion.div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <motion.div key={item.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    variant={isActive ? "default" : "ghost"}
                    onClick={() => onNavigate(item.id)}
                    className={`flex items-center gap-2 border transition-all ${
                      isActive 
                        ? "bg-gradient-to-b from-gray-100 via-white to-gray-200 text-[#BA0C2F] border-gray-300 shadow-md font-semibold" 
                        : "bg-gradient-to-b from-white/90 to-white/70 text-gray-700 border-gray-200/50 hover:from-white hover:to-gray-100 shadow-sm"
                    }`}
                    style={{
                      boxShadow: isActive 
                        ? "0 2px 4px rgba(0,0,0,0.2), inset 0 1px 0 rgba(255,255,255,0.9)" 
                        : "0 1px 3px rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.7)"
                    }}
                  >
                    <Icon className="w-4 h-4" />
                    {item.label}
                  </Button>
                </motion.div>
              );
            })}
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm"
              className="bg-gradient-to-b from-white to-gray-100 border border-gray-300 shadow-md"
            >
              <ShoppingBag className="w-5 h-5 text-[#BA0C2F]" />
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="md:hidden pb-3">
          <nav className="flex flex-wrap gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant={isActive ? "default" : "ghost"}
                  size="sm"
                  onClick={() => onNavigate(item.id)}
                  className={`flex items-center gap-1 border ${
                    isActive 
                      ? "bg-gradient-to-b from-white to-gray-100 text-[#BA0C2F] border-gray-300 font-semibold" 
                      : "bg-white/80 text-gray-700 border-gray-200"
                  }`}
                >
                  <Icon className="w-3 h-3" />
                  <span className="text-xs">{item.label}</span>
                </Button>
              );
            })}
          </nav>
        </div>
      </div>
    </motion.header>
  );
}