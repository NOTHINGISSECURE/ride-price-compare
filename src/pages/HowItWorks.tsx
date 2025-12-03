import { Link } from "react-router-dom";
import { ArrowLeft, MapPin, Search, DollarSign, Car, ArrowRight, CheckCircle, Clock, Shield, Smartphone } from "lucide-react";
import Header from "@/components/Header";

const HowItWorks = () => {
  const steps = [
    {
      number: "01",
      title: "Enter Your Locations",
      description: "Start by entering your pickup location and destination. Our smart input helps you quickly find addresses.",
      icon: <MapPin className="w-8 h-8" />,
      details: [
        "Type your pickup address or use GPS",
        "Enter your destination",
        "Select your preferred ride type (Bike, Auto, Mini, Sedan, SUV)",
      ],
    },
    {
      number: "02",
      title: "Compare Prices Instantly",
      description: "We fetch real-time prices from Ola, Uber, and Rapido simultaneously and display them side by side.",
      icon: <Search className="w-8 h-8" />,
      details: [
        "See prices from all 3 platforms at once",
        "View estimated arrival times",
        "Check for surge pricing alerts",
        "Identify the cheapest option with our 'Best Price' badge",
      ],
    },
    {
      number: "03",
      title: "Choose Your Best Deal",
      description: "Review the options and pick the one that fits your budget and preferences. We highlight the cheapest option for you.",
      icon: <DollarSign className="w-8 h-8" />,
      details: [
        "Compare total fare estimates",
        "Check driver ETA for each platform",
        "View ride category details",
        "Make an informed decision",
      ],
    },
    {
      number: "04",
      title: "Book Your Ride",
      description: "Click 'Book Now' and we'll redirect you to the selected app with your ride details pre-filled.",
      icon: <Car className="w-8 h-8" />,
      details: [
        "One-click booking redirect",
        "Connect your accounts for faster booking",
        "Track your ride in the native app",
        "Enjoy your savings!",
      ],
    },
  ];

  const faqs = [
    {
      question: "Is RideCompare free to use?",
      answer: "Yes! RideCompare is completely free. We help you find the best prices without any additional charges.",
    },
    {
      question: "How accurate are the prices shown?",
      answer: "We fetch real-time data from each platform, so prices are highly accurate. However, final prices may vary slightly based on actual route and traffic conditions.",
    },
    {
      question: "Do I need to create an account?",
      answer: "No account is required to compare prices. However, creating an account lets you save your connected ride apps and preferences.",
    },
    {
      question: "Which cities do you support?",
      answer: "RideCompare works in all cities where Ola, Uber, and Rapido operate across India.",
    },
    {
      question: "How do I connect my ride apps?",
      answer: "Click on the Profile button in the top-right corner and toggle the connection for each app you want to link.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Background glow effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rapido/5 rounded-full blur-3xl" />
      </div>

      <Header />

      <main className="relative pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Back Link */}
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8 opacity-0 animate-fade-in"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>

          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 opacity-0 animate-fade-in">
              How It <span className="text-gradient">Works</span>
            </h1>
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in"
              style={{ animationDelay: "100ms" }}
            >
              Finding the cheapest ride is easier than ever. Follow these simple steps
              to start saving money on every trip.
            </p>
          </div>

          {/* Steps */}
          <section className="mb-20">
            <div className="space-y-8">
              {steps.map((step, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-8 opacity-0 animate-fade-in relative overflow-hidden"
                  style={{ animationDelay: `${200 + index * 150}ms` }}
                >
                  {/* Step number background */}
                  <div className="absolute -right-4 -top-4 text-[120px] font-bold text-primary/5 select-none">
                    {step.number}
                  </div>
                  
                  <div className="relative z-10">
                    <div className="flex items-start gap-6">
                      <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center flex-shrink-0 text-primary">
                        {step.icon}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-sm font-bold text-primary">STEP {step.number}</span>
                        </div>
                        <h3 className="text-2xl font-bold mb-3 text-foreground">{step.title}</h3>
                        <p className="text-muted-foreground mb-4">{step.description}</p>
                        
                        <ul className="space-y-2">
                          {step.details.map((detail, detailIndex) => (
                            <li key={detailIndex} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                              {detail}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Arrow to next step */}
                  {index < steps.length - 1 && (
                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-secondary flex items-center justify-center z-20">
                      <ArrowRight className="w-4 h-4 text-muted-foreground rotate-90" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Benefits */}
          <section className="mb-20">
            <h2 className="text-2xl font-bold text-center mb-8 text-foreground opacity-0 animate-fade-in" style={{ animationDelay: "800ms" }}>
              Why Users Love Us
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              {[
                { icon: <Clock className="w-6 h-6" />, title: "Save Time", desc: "Compare in 2 seconds instead of switching apps" },
                { icon: <DollarSign className="w-6 h-6" />, title: "Save Money", desc: "Average savings of ₹50 per ride" },
                { icon: <Smartphone className="w-6 h-6" />, title: "Easy to Use", desc: "Simple, clean interface anyone can use" },
              ].map((benefit, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-6 text-center opacity-0 animate-fade-in"
                  style={{ animationDelay: `${900 + index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4 text-primary">
                    {benefit.icon}
                  </div>
                  <h3 className="font-semibold mb-2 text-foreground">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* FAQs */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8 text-foreground opacity-0 animate-fade-in" style={{ animationDelay: "1200ms" }}>
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className="glass-card rounded-xl p-6 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${1300 + index * 100}ms` }}
                >
                  <h3 className="font-semibold mb-2 text-foreground">{faq.question}</h3>
                  <p className="text-sm text-muted-foreground">{faq.answer}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="text-center opacity-0 animate-fade-in" style={{ animationDelay: "1800ms" }}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              Start Comparing Now
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/30 py-8 px-4">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="text-sm text-muted-foreground">
            © 2024 RideCompare. All rights reserved. Made with ❤️ in India.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default HowItWorks;
