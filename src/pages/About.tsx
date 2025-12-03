import { Link } from "react-router-dom";
import { ArrowLeft, Target, Users, Zap, Shield, Heart, MapPin } from "lucide-react";
import Header from "@/components/Header";

const About = () => {
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
            <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center mx-auto mb-6 opacity-0 animate-fade-in">
              <MapPin className="w-10 h-10 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 opacity-0 animate-fade-in" style={{ animationDelay: "100ms" }}>
              About <span className="text-gradient">RideCompare</span>
            </h1>
            <p
              className="text-lg text-muted-foreground max-w-2xl mx-auto opacity-0 animate-fade-in"
              style={{ animationDelay: "200ms" }}
            >
              Your one-stop solution for comparing ride prices across Ola, Uber & Rapido.
              We help you save money on every ride.
            </p>
          </div>

          {/* Mission Section */}
          <section className="glass-card rounded-2xl p-8 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "300ms" }}>
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                <Target className="w-6 h-6 text-primary" />
              </div>
              <div>
                <h2 className="text-2xl font-bold mb-3 text-foreground">Our Mission</h2>
                <p className="text-muted-foreground leading-relaxed">
                  We believe everyone deserves the best price for their rides. RideCompare was built to solve a simple 
                  problem: switching between multiple apps to find the cheapest fare is time-consuming and frustrating. 
                  Our platform brings all major ride-hailing services together in one place, giving you instant access 
                  to real-time pricing so you can make informed decisions in seconds.
                </p>
              </div>
            </div>
          </section>

          {/* Features Grid */}
          <section className="mb-16">
            <h2 className="text-2xl font-bold text-center mb-8 text-foreground opacity-0 animate-fade-in" style={{ animationDelay: "400ms" }}>
              Why Choose RideCompare?
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  icon: <Zap className="w-6 h-6 text-primary" />,
                  title: "Lightning Fast",
                  description: "Get instant price comparisons across all platforms in under 2 seconds. No more switching between apps.",
                },
                {
                  icon: <Shield className="w-6 h-6 text-primary" />,
                  title: "Trusted Partners",
                  description: "We only compare prices from verified, licensed ride-hailing services - Ola, Uber, and Rapido.",
                },
                {
                  icon: <Users className="w-6 h-6 text-primary" />,
                  title: "User Focused",
                  description: "Our clean, intuitive interface is designed for everyone. Compare prices with just a few taps.",
                },
                {
                  icon: <Heart className="w-6 h-6 text-primary" />,
                  title: "Save Money",
                  description: "Users save an average of ₹50 per ride by choosing the most affordable option every time.",
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="glass-card rounded-2xl p-6 opacity-0 animate-fade-in"
                  style={{ animationDelay: `${500 + index * 100}ms` }}
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-foreground">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Supported Services */}
          <section className="glass-card rounded-2xl p-8 mb-8 opacity-0 animate-fade-in" style={{ animationDelay: "900ms" }}>
            <h2 className="text-2xl font-bold mb-6 text-center text-foreground">Supported Platforms</h2>
            <div className="flex justify-center gap-8 flex-wrap">
              {[
                { name: "Ola", logo: "🟡", description: "India's leading mobility platform" },
                { name: "Uber", logo: "⬛", description: "Global ride-sharing giant" },
                { name: "Rapido", logo: "🟢", description: "Fastest bike taxi service" },
              ].map((platform, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-2xl bg-secondary/50 flex items-center justify-center text-3xl mx-auto mb-2">
                    {platform.logo}
                  </div>
                  <p className="font-semibold text-foreground">{platform.name}</p>
                  <p className="text-xs text-muted-foreground">{platform.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA */}
          <div className="text-center opacity-0 animate-fade-in" style={{ animationDelay: "1000ms" }}>
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground rounded-xl font-semibold hover:bg-primary/90 transition-colors"
            >
              Start Comparing Prices
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

export default About;
