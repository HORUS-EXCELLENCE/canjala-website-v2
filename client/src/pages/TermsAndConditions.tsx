import React from 'react';
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Ticket, Instagram, Facebook, Youtube, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/_core/hooks/useAuth";

export default function TermsAndConditions() {
    const { t } = useLanguage();
    const { user } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
                <div className="container mx-auto flex items-center justify-between py-4">
                    <a href="/" className="flex items-center">
                        <img src="/logo.png" alt="Canjala" className="h-12 w-auto" />
                    </a>

                    <div className="hidden md:flex items-center gap-8">
                        <a href="/#sobre" className="text-sm font-semibold hover:text-primary transition-colors">{t("Sobre", "About")}</a>
                        <a href="/#experiencia" className="text-sm font-semibold hover:text-primary transition-colors">{t("Experiência", "Experience")}</a>
                        <a href="/#historia" className="text-sm font-semibold hover:text-primary transition-colors">{t("História", "History")}</a>
                        <a href="/#merch" className="text-sm font-semibold hover:text-primary transition-colors">{t("Loja", "Store")}</a>
                        <a href="/#imprensa" className="text-sm font-semibold hover:text-primary transition-colors">{t("Imprensa", "Press")}</a>
                        <a href="/#contacto" className="text-sm font-semibold hover:text-primary transition-colors">{t("Contacto", "Contact")}</a>
                        <LanguageSwitcher />
                        {user?.role === "admin" && (
                            <Button size="sm" variant="outline" onClick={() => window.location.href = "/admin"}>
                                Admin
                            </Button>
                        )}
                        <a href="/convocatoria">
                            <Button size="lg" className="bg-primary hover:bg-primary/90">
                                <Ticket className="mr-2 h-4 w-4" />
                                {t("Convocatórias", "Tickets 2025")}
                            </Button>
                        </a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden p-2"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle menu"
                    >
                        {mobileMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>
                </div>

                {/* Mobile Menu Dropdown */}
                {mobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="md:hidden bg-background border-t border-border"
                    >
                        <div className="container mx-auto flex flex-col gap-4 py-4">
                            <a href="/#sobre" className="text-sm font-semibold hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>{t("Sobre", "About")}</a>
                            <a href="/#experiencia" className="text-sm font-semibold hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>{t("Experiência", "Experience")}</a>
                            <a href="/#historia" className="text-sm font-semibold hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>{t("História", "History")}</a>
                            <a href="/#merch" className="text-sm font-semibold hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>{t("Loja", "Store")}</a>
                            <a href="/#imprensa" className="text-sm font-semibold hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>{t("Imprensa", "Press")}</a>
                            <a href="/#contacto" className="text-sm font-semibold hover:text-primary transition-colors py-2" onClick={() => setMobileMenuOpen(false)}>{t("Contacto", "Contact")}</a>
                        </div>
                    </motion.div>
                )}
            </nav>

            {/* Main Content */}
            <main className="pt-32 pb-20">
                <div className="container max-w-4xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-5xl font-black mb-12 text-center text-primary">
                            {t("Termos e Condições", "Terms and Conditions")}
                        </h1>

                        <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-foreground prose-p:text-muted-foreground prose-li:text-muted-foreground">
                            {/* Placeholder Content - User to replace */}
                            <div className="space-y-8 text-left">
                                <section>
                                    <h2 className="text-2xl font-bold mb-4">1. Identificação do Evento</h2>
                                    <p>
                                        O Festival Canjala é um evento cultural e de entretenimento de natureza privada, organizado pelos seus promotores legais, doravante designados por Organização.
                                    </p>
                                    <p>
                                        O acesso, permanência e participação no evento encontram-se sujeitos aos presentes Termos e Condições, bem como às regras internas definidas pela Organização.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold mb-4">2. Âmbito de Aplicação</h2>
                                    <p className="mb-2">Os presentes Termos e Condições aplicam-se a:</p>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>Todos os utilizadores do site Canjala.com;</li>
                                        <li>Todos os compradores de bilhetes (convocatórias);</li>
                                        <li>Todos os participantes, espectadores, convidados, artistas, fornecedores, parceiros e staff;</li>
                                        <li>Qualquer pessoa que aceda, circule ou permaneça no recinto do evento.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold mb-4">3. Aceitação dos Termos e Condições</h2>
                                    <p className="mb-4">
                                        Ao aceder ao site Canjala.com, adquirir um bilhete, aceitar uma convocatória ou participar no Festival Canjala, o utilizador declara que:
                                    </p>
                                    <div className="bg-primary/5 border-l-4 border-primary p-4 my-4 font-semibold italic">
                                        "A aquisição de bilhete para o evento implica a aceitação plena, irrevogável e sem reservas dos presentes Termos e Condições, os quais se consideram conhecidos, aceites e juridicamente vinculativos para todos os participantes."
                                    </div>
                                    <p>
                                        A aceitação é automática e imediata, não sendo necessária assinatura física ou digital adicional.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold mb-4">4. Natureza Privada do Evento e Direito de Admissão</h2>
                                    <p>O Festival Canjala é um evento privado.</p>
                                    <p className="mt-2 text-muted-foreground font-semibold">
                                        A Organização reserva-se o direito exclusivo de admitir, recusar ou retirar qualquer participante, antes ou durante o evento, sempre que:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-1 mt-2">
                                        <li>Se verifique incumprimento dos presentes Termos e Condições;</li>
                                        <li>Exista comportamento considerado inadequado, ofensivo, perigoso ou ilegal;</li>
                                        <li>Seja colocada em risco a segurança, a ordem pública, a integridade física de terceiros ou o bom nome do evento;</li>
                                        <li>Haja suspeita fundamentada de violação das regras do evento.</li>
                                    </ul>
                                    <p className="mt-2">
                                        Nestes casos, não haverá lugar a qualquer reembolso, salvo decisão expressa da Organização.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold mb-4">5. Bilhetes (Convocatórias)</h2>

                                    <h3 className="text-xl font-bold mb-2">5.1. Natureza, Titularidade e Aquisição</h3>
                                    <p className="mb-2">
                                        O bilhete (convocatória) é pessoal e intransmissível, salvo indicação expressa em contrário por parte da Organização.
                                    </p>
                                    <p className="mb-2">
                                        A aquisição de convocatórias através de terceiros, plataformas não autorizadas ou fora dos canais oficiais não vincula, em nenhuma circunstância, a Organização.
                                    </p>
                                    <p className="mb-4">
                                        Qualquer convocatória adquirida fora dos canais oficiais poderá ser imediatamente anulada, sem direito a reembolso, logo que tal situação seja detectada, independentemente do momento da detecção.
                                    </p>

                                    <h3 className="text-xl font-bold mb-2">5.2. Condição de Acesso</h3>
                                    <p className="mb-2">
                                        A posse da convocatória não garante, por si só, o acesso ao evento, estando sempre condicionada:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-1 mb-4">
                                        <li>Ao cumprimento integral dos presentes Termos e Condições;</li>
                                        <li>À observância das regras internas do evento;</li>
                                        <li>À validação de segurança e controlo de acessos.</li>
                                    </ul>

                                    <h3 className="text-xl font-bold mb-2">5.3. Bilhetes Irregulares</h3>
                                    <p>
                                        Convocatórias perdidas, danificadas, adulteradas, duplicadas ou utilizadas de forma indevida poderão ser consideradas inválidas e recusadas.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold mb-4">6. Regras de Conduta do Evento</h2>
                                    <p>
                                        O Festival Canjala rege-se por regras próprias que disciplinam toda a actividade do evento. Essas regras:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-1 mt-2 mb-4">
                                        <li>Estão publicamente disponíveis no site Canjala.com;</li>
                                        <li>Serão igualmente comunicadas através dos canais oficiais do evento antes e durante a realização do mesmo.</li>
                                    </ul>
                                    <p className="mb-4">
                                        As regras do evento são obrigatórias e vinculativas para todas as pessoas que adquiriram convocatórias e produzem efeitos imediatamente após a compra do bilhete, implicando a aceitação automática das mesmas por todos os detentores de convocatórias.
                                    </p>
                                    <p className="font-semibold mb-2">Todos os participantes comprometem-se ainda a:</p>
                                    <ul className="list-disc pl-6 space-y-1 mb-4">
                                        <li>Respeitar a legislação da República de Angola;</li>
                                        <li>Cumprir todas as instruções da Organização, equipa de segurança e staff;</li>
                                        <li>Manter comportamento adequado, respeitoso e não violento;</li>
                                        <li>Não portar objectos proibidos, substâncias ilícitas ou materiais perigosos;</li>
                                        <li>Não praticar actos que comprometam a segurança, a moral pública ou a imagem do evento.</li>
                                    </ul>
                                    <p>
                                        O incumprimento das regras poderá resultar em expulsão imediata do recinto, sem direito a reembolso.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold mb-4">7. Segurança e Fiscalização</h2>
                                    <p className="mb-2">
                                        A Organização reserva-se o direito de implementar medidas de segurança adequadas, incluindo:
                                    </p>
                                    <ul className="list-disc pl-6 space-y-1 mb-2">
                                        <li>Controlo de acessos;</li>
                                        <li>Revistas pessoais e de bens, nos termos da lei;</li>
                                        <li>Monitorização do recinto.</li>
                                    </ul>
                                    <p>
                                        O acesso ao evento implica o consentimento do participante para tais procedimentos.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold mb-4">8. Captação de Imagem, Som e Direitos de Imagem</h2>
                                    <p className="mb-4">
                                        Ao participar no Festival Canjala, o participante autoriza, de forma gratuita, irrevogável e sem limitação temporal ou territorial, a captação e utilização da sua imagem, voz e nome para fins promocionais, institucionais, comerciais e de comunicação do evento, em qualquer suporte ou meio.
                                    </p>
                                    <p className="mb-4">
                                        Adicionalmente, para efeitos de segurança, controlo de acessos, prevenção de incidentes e protecção de pessoas e bens, a Organização poderá proceder à captação de imagens individuais dos participantes, incluindo através de sistemas de videovigilância.
                                    </p>
                                    <p>
                                        Todos os detentores de convocatórias aceitam expressamente que a sua imagem possa ser capturada individualmente sempre que necessário para fins de segurança durante o evento.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold mb-4">9. Alterações ao Evento</h2>
                                    <p>
                                        A Organização reserva-se o direito de alterar programação, horários, artistas, local ou datas por motivos de força maior, segurança, ordens administrativas ou razões operacionais, sem que tal confira automaticamente direito a reembolso.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold mb-4">10. Responsabilidade</h2>
                                    <p>
                                        A Organização não se responsabiliza por perdas, furtos ou danos de bens pessoais, nem por actos praticados por terceiros ou pelos próprios participantes, sendo cada participante responsável pelos seus actos e consequências.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold mb-4">11. Denúncias, Reclamações e Autoridades</h2>
                                    <ul className="list-disc pl-6 space-y-1">
                                        <li>Reclamações deverão ser efectuadas exclusivamente pelos canais oficiais do evento.</li>
                                        <li>A Organização cooperará com as autoridades competentes sempre que legalmente solicitado.</li>
                                        <li>Reclamações infundadas, abusivas ou de má-fé poderão ser rejeitadas.</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold mb-4">12. Protecção Jurídica do Evento</h2>
                                    <p>
                                        Os presentes Termos e Condições visam proteger juridicamente o Festival Canjala, o site Canjala.com, os seus organizadores, parceiros e patrocinadores contra ataques externos, denúncias infundadas, tentativas de instrumentalização legal ou mediática e responsabilizações indevidas.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold mb-4">13. Lei Aplicável e Foro</h2>
                                    <p>
                                        Os presentes Termos e Condições regem-se pela lei da República de Angola, sendo competente o foro da comarca de Luanda, com expressa renúncia a qualquer outro.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold mb-4">14. Disposições Finais</h2>
                                    <p className="mb-2">
                                        A eventual nulidade de alguma cláusula não afecta a validade das restantes.
                                    </p>
                                    <p>
                                        A Organização reserva-se o direito de actualizar estes Termos e Condições a qualquer momento, sendo a versão publicada no site considerada a vigente.
                                    </p>
                                </section>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Footer */}
            <footer className="bg-foreground text-background py-16">
                <div className="container">
                    <div className="grid md:grid-cols-5 gap-12 mb-12">
                        <div className="md:col-span-1">
                            <img src="/logo.png" alt="Canjala" className="h-16 w-auto mb-4" />
                            <p className="opacity-80">{t("A Kitota virou Festival", "The Kitota became Festival")}</p>
                        </div>
                        <div>
                            <h4 className="font-bold mb-4">{t("Links Rápidos", "Quick Links")}</h4>
                            <ul className="space-y-2 opacity-80">
                                <li><a href="/#sobre" className="hover:opacity-100 transition-opacity">{t("Sobre", "About")}</a></li>
                                <li><a href="/#experiencia" className="hover:opacity-100 transition-opacity">{t("Experiência", "Experience")}</a></li>
                                <li><a href="/#historia" className="hover:opacity-100 transition-opacity">{t("História", "History")}</a></li>
                                <li><a href="/#imprensa" className="hover:opacity-100 transition-opacity">{t("Imprensa", "Press")}</a></li>
                                <li><a href="/termos-e-condicoes" className="hover:opacity-100 transition-opacity font-semibold">{t("Termos e Condições", "Terms and Conditions")}</a></li>

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
                            <h4 className="font-bold mb-4">{t("Contactos", "Contact")}</h4>
                            <ul className="space-y-2 opacity-80">
                                <li><a href="mailto:info@mysteriumgroup.com" className="hover:opacity-100 transition-opacity">info@mysteriumgroup.com</a></li>
                                <li><a href="tel:+244957107642" className="hover:opacity-100 transition-opacity">+244 957 107 642</a></li>
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

                    <div className="border-t border-background/20 pt-8 text-center text-sm opacity-60">
                        <p className="mb-2">
                            {t("Ao navegar neste site ou adquirir uma convocatória, o utilizador aceita os ", "By navigating this site or purchasing a ticket, the user accepts the ")}
                            <a href="/termos-e-condicoes" className="underline hover:text-primary">{t("Termos e Condições", "Terms and Conditions")}</a>
                            {t(" e as Regras do Festival Canjala. Evento privado. Direito de admissão reservado.", " and the Rules of the Canjala Festival. Private event. Right of admission reserved.")}
                        </p>
                        <p>&copy; 2025 {t("Team Arrogância. Todos os direitos reservados.", "Team Arrogância. All rights reserved.")}</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
