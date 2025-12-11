import React, { useState } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { useLanguage } from '@/contexts/LanguageContext';
import { LanguageSwitcher } from '@/components/LanguageSwitcher';
import { Button } from '@/components/ui/button';
import { Calendar, MapPin, Music, Users, Instagram, Facebook, Youtube, Ticket, Plus, Minus } from 'lucide-react';
import { motion } from 'framer-motion';
import { Label, TextInput } from 'flowbite-react';

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

const FAQComponent: React.FC = () => {
  const [openItem, setOpenItem] = useState<number | null>(2);

  const faqData: FAQItem[] = [
    { id: 1, question: 'Chamber reached do he nothing be?', answer: 'Our asked six point her she seems. New plenty she horses parish design you.' },
    { id: 2, question: 'Stuff sight equal of my woody?', answer: 'Our asked six point her she seems. New plenty she horses parish design you.' },
    { id: 3, question: 'At by pleasure of children be?', answer: 'Our asked six point her she seems. New plenty she horses parish design you.' },
    { id: 4, question: 'Amounted repeated as believed in confined?', answer: 'Our asked six point her she seems. New plenty she horses parish design you.' },
    { id: 5, question: 'In am do giving to afford parish settle easily garret?', answer: 'Our asked six point her she seems. New plenty she horses parish design you.' },
  ];

  const toggleItem = (id: number) => setOpenItem((prev) => (prev === id ? null : id));

  return (
    <section id="faq" className="py-16 bg-transparent">
      <div className="container">
        <div className="bg-white rounded-lg shadow-sm p-6">

          <div className="space-y-4">
            {faqData.map((item: FAQItem) => (
              <div key={item.id} className="border-b border-gray-200 last:border-b-0">
                <button
                  type="button"
                  onClick={() => toggleItem(item.id)}
                  className="w-full flex items-start justify-between py-4 text-left hover:bg-gray-50 transition-colors"
                >
                  <span className="text-gray-700 font-medium pr-4">{item.question}</span>
                  <span className="flex-shrink-0 text-gray-400">
                    {openItem === item.id ? <Minus className="w-5 h-5 text-orange-400" /> : <Plus className="w-5 h-5" />}
                  </span>
                </button>

                {openItem === item.id && (
                  <div className="pb-4 pr-8">
                    <p className="text-gray-600 text-sm leading-relaxed">{item.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default function Home() {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-4">
          <a href="/" className="flex items-center">
            <img src="/logo.png" alt="Canjala" className="h-12 w-auto" />
          </a>

          <div className="hidden md:flex items-center gap-8">
            <a href="#sobre" className="text-sm font-semibold hover:text-primary transition-colors">{t('Sobre', 'About')}</a>
            <a href="#experiencia" className="text-sm font-semibold hover:text-primary transition-colors">{t('Experiência', 'Experience')}</a>
            <a href="#historia" className="text-sm font-semibold hover:text-primary transition-colors">{t('História', 'History')}</a>
            <a href="https://loja.canjala.com" className="text-sm font-semibold hover:text-primary transition-colors">{t('Loja', 'Store')}</a>
            <a href="#contacto" className="text-sm font-semibold hover:text-primary transition-colors">{t('Contacto', 'Contact')}</a>
            <LanguageSwitcher />
            {user?.role === 'admin' && (
              <Button size="sm" variant="outline" onClick={() => (window.location.href = '/admin')}>Admin</Button>
            )}
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Ticket className="mr-2 h-4 w-4" />
              {t('Convocatórias', 'Tickets 2025')}
            </Button>
          </div>
        </div>
      </nav>

      {/* Main */}
      <main className="pt-24">
        <div className="container">
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl mx-auto text-center py-20">
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Garanta a sua <span className="text-primary">convocatória</span>
            </h2>
            <p className="text-xl text-muted-foreground mb-8">label</p>
            <div className="prose prose-lg max-w-none mx-auto">
              <p className="text-lg">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sunt, dolor! Esse aperiam, veniam eum iusto voluptates placeat pariatur blanditiis iure dolorum praesentium qui provident sit sapiente aliquam numquam reprehenderit quod.
              </p>
            </div>
            <FAQComponent />
          </motion.div>
        </div>

        

        {/* CTA Section */}
        <section id="contacto" className="py-20 bg-gradient-to-br from-primary via-secondary to-accent text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: "url('/hero-canjala.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
          </div>
          <div className="container relative">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center py-12">
              <h2 className="text-2xl md:text-4xl font-black mb-6">Faça Parte da Lista de Convocatórias 2026</h2>

              <form className="flex max-w-md flex-col gap-4 mx-auto">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="nome" className="text-left text-white">Nome</Label>
                  <TextInput id="nome" type="text" sizing="sm" />
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="email" className="text-left text-white">Email</Label>
                  <TextInput id="email" type="email" sizing="sm" />
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="phone" className="text-left text-white">Número de telemóvel usado no Uzeka</Label>
                  <TextInput id="phone" type="text" sizing="sm" />
                </div>

                <Button type="submit">Registrar</Button>
              </form>
            </motion.div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="container">
          <div className="grid md:grid-cols-4 gap-12 mb-12">
            <div>
              <img src="/logo.png" alt="Canjala" className="h-16 w-auto mb-4" />
              <p className="opacity-80">A Kitota virou Festival</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Links Rápidos</h4>
              <ul className="space-y-2 opacity-80">
                <li><a href="#sobre" className="hover:opacity-100 transition-opacity">Sobre</a></li>
                <li><a href="#experiencia" className="hover:opacity-100 transition-opacity">Experiência</a></li>
                <li><a href="#historia" className="hover:opacity-100 transition-opacity">História</a></li>
                <li><a href="#contacto" className="hover:opacity-100 transition-opacity">Contacto</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Festivais</h4>
              <ul className="space-y-2 opacity-80">
                <li>Canjala Festival</li>
                <li>Acordos de Bicesse</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Redes Sociais</h4>
              <div className="flex gap-4">
                <a href="https://www.instagram.com/teamarrogancia/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  <Instagram className="h-6 w-6" />
                </a>
                <a href="https://www.facebook.com/AcordosDeBicesse/" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  <Facebook className="h-6 w-6" />
                </a>
                <a href="https://www.tiktok.com/@teamarrogancia" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                  </svg>
                </a>
                <a href="https://www.youtube.com/@teamarrogancia" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-opacity">
                  <Youtube className="h-6 w-6" />
                </a>
              </div>
            </div>
          </div>

          <div className="border-t border-background/20 pt-8 text-center opacity-60">
            <p>&copy; 2025 Team Arrogância. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}