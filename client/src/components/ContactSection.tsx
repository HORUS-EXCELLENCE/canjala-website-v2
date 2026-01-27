import React from 'react';
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Mail, Phone, MapPin, Instagram, Facebook, Youtube } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export function ContactSection() {
    const { t } = useLanguage();

    const contactInfo = [
        {
            icon: Mail,
            title: t("Email", "Email"),
            value: "info@mysteriumgroup.com",
            link: "mailto:info@mysteriumgroup.com",
            action: t("Enviar email", "Send email")
        },
        {
            icon: Phone,
            title: t("Telefone", "Phone"),
            value: "+244 957 107 642",
            link: "tel:+244957107642",
            action: t("Ligar agora", "Call now")
        }
    ];

    const socialLinks = [
        { icon: Instagram, url: "https://www.instagram.com/teamarrogancia/", label: "Instagram" },
        { icon: Facebook, url: "https://www.facebook.com/AcordosDeBicesse/", label: "Facebook" },
        {
            icon: ({ className }: { className?: string }) => (
                <svg className={className} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z" />
                </svg>
            ),
            url: "https://www.tiktok.com/@teamarrogancia",
            label: "TikTok"
        },
        { icon: Youtube, url: "https://www.youtube.com/@teamarrogancia", label: "YouTube" }
    ];

    return (
        <section id="contacto" className="py-24 bg-background relative overflow-hidden">
            <div className="container relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-black mb-6">
                        {t("Entre em", "Get in")} <span className="text-primary">{t("Contacto", "Touch")}</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t(
                            "Tens alguma dúvida ou proposta? Estamos aqui para ouvir-te.",
                            "Have any questions or proposals? We are here to listen."
                        )}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-16">
                    {contactInfo.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card className="p-8 h-full flex flex-col items-center text-center hover:border-primary/50 transition-colors group">
                                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-primary/20 transition-colors">
                                    <item.icon className="h-8 w-8 text-primary" />
                                </div>
                                <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                                <p className="text-muted-foreground mb-6 font-medium text-lg">{item.value}</p>
                                <Button
                                    variant="outline"
                                    className="mt-auto group-hover:bg-primary group-hover:text-white transition-colors"
                                    onClick={() => window.open(item.link, '_blank')}
                                >
                                    {item.action}
                                </Button>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                    className="text-center"
                >
                    <h3 className="text-2xl font-bold mb-8">{t("Segue-nos nas Redes Sociais", "Follow us on Social Media")}</h3>
                    <div className="flex justify-center gap-6">
                        {socialLinks.map((social, index) => (
                            <a
                                key={index}
                                href={social.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-12 h-12 bg-muted rounded-full flex items-center justify-center hover:bg-primary hover:text-white transition-all transform hover:scale-110"
                                aria-label={social.label}
                            >
                                <social.icon className="h-6 w-6" />
                            </a>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
