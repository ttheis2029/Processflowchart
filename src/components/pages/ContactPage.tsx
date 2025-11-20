import React, { useState } from "react";
import { motion } from "motion/react";
import { MapPin, Phone, Mail, Clock, Send } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: ""
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    // Here you would typically send the form data to a backend
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["2000 W University Ave", "Muncie, IN 47306", "Student Center, First Floor"]
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["Main: (765) 285-8000", "Textbook Orders: (765) 285-8001", "Apparel: (765) 285-8002"]
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["info@cardinalbooks.com", "textbooks@cardinalbooks.com", "support@cardinalbooks.com"]
    },
    {
      icon: Clock,
      title: "Store Hours",
      details: ["Mon-Fri: 8:00 AM - 6:00 PM", "Saturday: 10:00 AM - 4:00 PM", "Sunday: 12:00 PM - 4:00 PM"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#BA0C2F] to-[#8A0A23] text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-3xl"
          >
            <h1 className="text-white mb-6">Get in Touch</h1>
            <p className="text-xl text-white/90">
              Have questions? We're here to help! Reach out to our team and we'll get back to you as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="h-full">
                    <CardContent className="p-6">
                      <div className="w-12 h-12 bg-[#BA0C2F] rounded-full flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                      <h4 className="mb-3">{info.title}</h4>
                      <div className="space-y-1">
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-sm text-muted-foreground">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form & Map */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Contact Form */}
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        placeholder="John Doe"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        placeholder="john.doe@bsu.edu"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        placeholder="How can we help?"
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about your inquiry..."
                        rows={6}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        required
                      />
                    </div>

                    <Button 
                      type="submit" 
                      className="w-full bg-[#BA0C2F] hover:bg-[#9A0A25] gap-2"
                    >
                      <Send className="w-4 h-4" />
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Map & Additional Info */}
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              {/* Map Placeholder */}
              <Card>
                <CardContent className="p-0">
                  <div className="w-full h-64 bg-gradient-to-br from-gray-100 to-gray-200 rounded-t-lg flex items-center justify-center">
                    <div className="text-center">
                      <MapPin className="w-12 h-12 text-[#BA0C2F] mx-auto mb-2" />
                      <p className="text-sm text-muted-foreground">Map of Campus Location</p>
                    </div>
                  </div>
                  <div className="p-6">
                    <h4 className="mb-2">Find Us on Campus</h4>
                    <p className="text-sm text-muted-foreground mb-4">
                      We're conveniently located in the Student Center on the first floor, right in the heart of campus.
                    </p>
                    <Button variant="outline" className="w-full">
                      Get Directions
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* FAQ Quick Links */}
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="pb-3 border-b">
                    <h5 className="mb-1">Textbook Returns</h5>
                    <p className="text-sm text-muted-foreground">
                      Returns accepted within 14 days with receipt
                    </p>
                  </div>
                  <div className="pb-3 border-b">
                    <h5 className="mb-1">Online Orders</h5>
                    <p className="text-sm text-muted-foreground">
                      Free shipping on orders over $50
                    </p>
                  </div>
                  <div>
                    <h5 className="mb-1">Price Matching</h5>
                    <p className="text-sm text-muted-foreground">
                      We match competitor prices on textbooks
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="py-12 bg-black text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
          >
            <h3 className="text-white mb-4">Need Immediate Assistance?</h3>
            <p className="text-white/80 mb-6">
              For urgent textbook or order issues during the first week of classes, call our dedicated support line.
            </p>
            <Button 
              size="lg" 
              className="bg-[#BA0C2F] hover:bg-[#9A0A25]"
            >
              Call Support: (765) 285-HELP
            </Button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}