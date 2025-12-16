import React from 'react';
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";

export function HistorySection() {
    const { t } = useLanguage();

    const historyItems = [
        { year: "2018", title: t("O Início", "The Beginning"), participants: "287", description: t("Zenza do Itombe como teste de conceito. 50 pessoas num quintal, 287 compareceram", "Zenza do Itombe as a concept test. 50 people in a backyard, 287 attended") },
        { year: "2018-2019", title: t("Crescimento", "Growth"), description: t("Da Canjala 2018 ao Kuito Kuanavale 2018, de 400 a 1600 pessoas. Expansão durante tempos desafiantes", "From Canjala 2018 to Kuito Kuanavale 2018, from 400 to 1600 people. Expansion during challenging times") },
        { year: "2022-2023", title: t("Consolidação", "Consolidation"), description: t("Acordos de Bicesse. Milhares de pessoas reunidas", "Acordos de Bicesse. Thousands of people gathered") },
        { year: "2024", title: t("Recorde", "Record"), participants: "4.360+", description: t("Recorde de participantes e produção de classe mundial", "Record number of participants and world-class production") },
        { year: "2025", title: t("O Futuro", "The Future"), description: t("Expectativa de crescimento contínuo e novas surpresas", "Expectation of continuous growth and new surprises") }
    ];

    return (
        <section id="historia" className="py-32 bg-background">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-black mb-6">
                        {t("O Nosso", "Our")} <span className="text-primary">{t("Crescimento", "Growth")}</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        {t("Desde 2018, o Canjala tem crescido exponencialmente, consolidando-se como o maior festival de Angola", "Since 2018, Canjala has grown exponentially, establishing itself as Angola's largest festival")}
                    </p>
                </motion.div>

                <div className="max-w-4xl mx-auto">
                    {historyItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="relative pl-8 pb-12 border-l-4 border-primary last:border-l-transparent last:pb-0"
                        >
                            <div className="absolute left-0 top-0 w-8 h-8 -ml-[18px] bg-primary rounded-full border-4 border-background" />
                            <div className="bg-card p-6 rounded-lg shadow-md">
                                <div className="flex items-baseline gap-4 mb-2">
                                    <span className="text-3xl font-black text-primary">{item.year}</span>

                                    {item.title && (
                                        <span className="text-2xl font-bold">{item.title}</span>
                                    )}
                                </div>

                                {item.participants && (
                                    <span className="text-2xl font-bold text-accent">{item.participants} {t("pessoas", "people")}</span>
                                )}
                                <p className="text-muted-foreground">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
