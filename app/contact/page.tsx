"use client";

import ContactForm from '@/components/ui/ContactForm';
import Map from '@/components/ui/Map';
import AnimatedSection from '@/components/ui/AnimatedSection';

export default function ContactPage() {
  return (
    <main className="min-h-screen pt-20">
      <AnimatedSection className="section">
        <div className="container">
          <h1 className="heading">Contactez-Nous</h1>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <p className="text-lg text-gray-600 mb-8">
                Nous sommes là pour répondre à vos questions et vous accompagner dans vos projets.
                N'hésitez pas à nous contacter.
              </p>
              <div className="space-y-4">
                <div>
                  <h3 className="font-semibold">Adresse</h3>
                  <p className="text-gray-600">123 Rue Principale, 75000 Paris</p>
                </div>
                <div>
                  <h3 className="font-semibold">Téléphone</h3>
                  <p className="text-gray-600">+33 1 23 45 67 89</p>
                </div>
                <div>
                  <h3 className="font-semibold">Email</h3>
                  <p className="text-gray-600">contact@entreprise.com</p>
                </div>
              </div>
            </div>
            <ContactForm />
          </div>
          <div className="mt-12 h-[400px]">
            <Map />
          </div>
        </div>
      </AnimatedSection>
    </main>
  )
}