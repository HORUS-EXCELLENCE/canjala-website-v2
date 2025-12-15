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
  const { t } = useLanguage();
  const [openItem, setOpenItem] = useState<number | null>(1);

  const faqData: FAQItem[] = [
    { id: 1, question: t('O que é a convocatória?', 'What is the convocation?'), answer: t('Para o mundo, a convocatória é o convite, ingresso ou ticket para aceder a um evento. Mas para nós, a convocatória é o chamado, mensagem ou o grito para quem realmente merece fazer parte. Quando o Marechal ou um dos generais manda aquela mensagem, então, tu estás convocado ou chamado a fazer parte.', 'For the world, the convocation is the invitation, ticket or ticket to access an event. But for us, the convocation is the call, message or shout for those who really deserve to be part. When the Marechal or one of the generals sends that message, then you are summoned or called to be part.') },
    { id: 2, question: t('Onde eu devo comprar a minha convocatória?', 'Where should I buy my convocation?'), answer: t('As convocatórias são vendidas exclusivamente no aplicativo Uzeka.', 'Convocations are sold exclusively in the Uzeka app.') },
    { id: 3, question: t('Qualquer indivíduo pode comprar a sua convocatória?', 'Can anyone buy their convocation?'), answer: t('O público geral não pode simplesmente comprar a convocatória. As chamadas convocatórias são adquiridas apenas por quem já participou de edições anteriores do evento e estes podem recrutar novos participantes, criando assim a sensação de pertença, de exclusividade e acima de tudo garantir uma segurança maior do evento.', 'The general public cannot simply buy the convocation. The convocation calls are acquired only by those who have participated in previous editions of the event and they can recruit new participants, thus creating a sense of belonging, exclusivity and above all ensuring greater event security.') },
    { id: 4, question: t('Os Batalhões podem convocar?', 'Can the Battalions summon?'), answer: t('Quando estás dentro de um Batalhão, serás convocado directamente por um dos generais do Batalhão; mas também é possível seres convocado directamente pelo Marechal.', 'When you are inside a Battalion, you will be summoned directly by one of the Battalion generals; but it is also possible to be summoned directly by the Marechal.') },
    { id: 5, question: t('Posso me registar para receber uma convocatória?', 'Can I register to receive a convocation?'), answer: t('Sim… O nome deste registo é alistamento.', 'Yes... The name of this registration is enlistment.') },
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
              {t("Garanta a sua", "Secure your")} <span className="text-primary">{t("convocatória", "convocation")}</span>
            </h2>
            <div className="prose prose-lg max-w-none mx-auto">
              <p className="text-lg">
                {t("Para o mundo, a convocatória é o convite, ingresso ou ticket para aceder a um evento. Mas para nós, a convocatória é o chamado, mensagem ou o grito para quem realmente merece fazer parte.", "For the world, the convocation is the invitation, ticket or ticket to access an event. But for us, the convocation is the call, message or shout for those who really deserve to be part.")}
              </p>
            </div>
            <FAQComponent />
          </motion.div>
        </div>

        

        {/* CTA Section */}
        <section id="contacto" className="py-0 bg-gradient-to-br from-primary via-secondary to-accent text-white relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0" style={{ backgroundImage: "url('/hero-canjala.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }} />
          </div>
          <div className="container relative">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="max-w-4xl mx-auto text-center py-12">
              <h2 className="text-2xl md:text-4xl font-black mb-6">{t("Faça Parte da Lista de Convocatórias 2026", "Join the 2026 Convocations List")}</h2>

              <form className="flex max-w-md flex-col gap-4 mx-auto">
                <div className="flex flex-col gap-1">
                  <Label htmlFor="nome" className="text-left text-white">{t("Nome", "Name")}</Label>
                  <TextInput id="nome" type="text" sizing="sm" />
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="email" className="text-left text-white">{t("Email", "Email")}</Label>
                  <TextInput id="email" type="email" sizing="sm" />
                </div>

                <div className="flex flex-col gap-1">
                  <Label htmlFor="phone" className="text-left text-white">{t("Número de telemóvel usado no Uzeka", "Mobile number used in Uzeka")}</Label>
                  <TextInput id="phone" type="text" sizing="sm" />
                </div>

                <Button type="submit">{t("Registrar", "Register")}</Button>
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
              <p className="opacity-80">{t("A Kitota virou Festival", "The Kitota became Festival")}</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t("Links Rápidos", "Quick Links")}</h4>
              <ul className="space-y-2 opacity-80">
                <li><a href="#sobre" className="hover:opacity-100 transition-opacity">{t("Sobre", "About")}</a></li>
                <li><a href="#experiencia" className="hover:opacity-100 transition-opacity">{t("Experiência", "Experience")}</a></li>
                <li><a href="#historia" className="hover:opacity-100 transition-opacity">{t("História", "History")}</a></li>
                <li><a href="#contacto" className="hover:opacity-100 transition-opacity">{t("Contacto", "Contact")}</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t("Festivais", "Festivals")}</h4>
              <ul className="space-y-2 opacity-80">
                <li>{t("Canjala Festival", "Canjala Festival")}</li>
                <li>{t("Acordos de Bicesse", "Acordos de Bicesse")}</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">{t("Redes Sociais", "Social Media")}</h4>
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
            <p>&copy; 2025 {t("Team Arrogância. Todos os direitos reservados.", "Team Arrogância. All rights reserved.")}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}