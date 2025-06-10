"use client";
import AnimatedSection from '@/components/ui/AnimatedSection';
import ServiceCard from '@/components/ui/ServiceCard';
import { services } from '@/lib/data';

export default function ServicesPage() {
  return (
    <main className="min-h-screen pt-20">
      <AnimatedSection className="section">
        <div className="container">
          <h1 className="heading">Nos Services</h1>
          <p className="subheading">
            Découvrez notre gamme complète de services professionnels
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service) => (
              <ServiceCard key={service.id} {...service} />
            ))}
          </div>
        </div>
      </AnimatedSection>
    </main>
  )
}