import React from "react";
import { motion } from "motion/react";
import { Award, Users, Target, Heart, BookOpen, TrendingUp } from "lucide-react";
import { Card, CardContent } from "../ui/card";

export function AboutPage() {
  const values = [
    {
      icon: Award,
      title: "Excellence",
      description: "Committed to providing the highest quality products and service to our Cardinal community."
    },
    {
      icon: Users,
      title: "Community",
      description: "Building lasting relationships with students, faculty, and alumni throughout their Ball State journey."
    },
    {
      icon: Target,
      title: "Innovation",
      description: "Continuously improving our processes to enhance your shopping experience both online and in-store."
    },
    {
      icon: Heart,
      title: "Cardinal Pride",
      description: "Proudly supporting Ball State University and celebrating our Cardinal spirit every day."
    }
  ];

  const stats = [
    { number: "50+", label: "Years Serving BSU" },
    { number: "10,000+", label: "Products Available" },
    { number: "20,000+", label: "Students Served Annually" },
    { number: "100%", label: "Cardinal Dedication" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[#BA0C2F] to-[#8A0A23] text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="max-w-3xl"
          >
            <h1 className="text-white mb-6">About Cardinal Books</h1>
            <p className="text-xl text-white/90">
              For over 50 years, Cardinal Books has been the trusted source for Ball State University students, faculty, and alumni. We're more than just a bookstore – we're part of the Cardinal family.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ y: 20, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="text-4xl text-[#BA0C2F] mb-2">{stat.number}</div>
                <div className="text-sm text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ x: -20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
            >
              <h2 className="mb-6">Our Mission</h2>
              <p className="text-muted-foreground mb-4">
                At Cardinal Books, our mission is simple: to support the academic success and school spirit of every member of the Ball State community. We strive to provide the resources, materials, and merchandise that help Cardinals excel in the classroom and show their pride.
              </p>
              <p className="text-muted-foreground mb-4">
                Whether you're shopping for required textbooks, optional course materials, Ball State apparel, or gifts for fellow Cardinals, we're here to help you find exactly what you need.
              </p>
              <p className="text-muted-foreground">
                Our dedicated team works year-round to ensure our inventory is stocked with the latest editions, trending merchandise, and essential supplies – all at competitive prices with options to fit every budget.
              </p>
            </motion.div>

            <motion.div
              initial={{ x: 20, opacity: 0 }}
              whileInView={{ x: 0, opacity: 1 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-red-50 to-gray-50 rounded-2xl p-8 border border-red-100"
            >
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#BA0C2F] rounded-full flex items-center justify-center flex-shrink-0">
                    <BookOpen className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="mb-2">Academic Excellence</h4>
                    <p className="text-sm text-muted-foreground">
                      Providing the resources students need to succeed academically.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-black rounded-full flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="mb-2">Continuous Improvement</h4>
                    <p className="text-sm text-muted-foreground">
                      Always enhancing our services to better serve you.
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="mb-4">Our Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do at Cardinal Books.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
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
                      <div className="w-16 h-16 bg-[#BA0C2F] rounded-full flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <h4 className="mb-3">{value.title}</h4>
                      <p className="text-sm text-muted-foreground">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* History Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded in the early 1970s, Cardinal Books has grown alongside Ball State University, evolving from a small campus bookstore to a comprehensive retail operation serving the entire Cardinal community.
            </p>
            <p className="text-muted-foreground mb-4">
              Over the decades, we've witnessed countless students walk through our doors – from nervous freshmen buying their first textbooks to graduating seniors picking up their commemorative apparel. We've celebrated championships, supported new programs, and adapted to changing technologies while maintaining our commitment to personal service.
            </p>
            <p className="text-muted-foreground">
              Today, Cardinal Books combines the convenience of modern e-commerce with the warmth of a traditional campus bookstore, ensuring every Cardinal can access what they need, how they need it.
            </p>
          </motion.div>
        </div>
      </section>
    </div>
  );
}