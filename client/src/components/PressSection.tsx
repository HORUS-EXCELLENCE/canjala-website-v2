import React from 'react';
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";

interface PressArticle {
    id: number;
    title: string;
    titleEn: string;
    outlet: string;
    date: string;
    thumbnail: string;
    url: string;
    excerpt: string;
    excerptEn: string;
}

export function PressSection() {
    const { t } = useLanguage();

    const pressArticles: PressArticle[] = [
        {
            id: 6,
            title: "CCB acolhe 7.ª edição da festa da 'Canjala'",
            titleEn: "CCB hosts 7th edition of 'Canjala' festival",
            outlet: "Jornal de Angola",
            date: "27 Dez 2025",
            thumbnail: "/image copy.png",
            url: "https://www.jornaldeangola.ao/noticias/5/cultura/655106/ccb-acolhe-7%C2%AA-edi%C3%A7%C3%A3o-da-festa-da-%E2%80%9Ccanjala%E2%80%9D",
            excerpt: "Centro de Convenções de Benguela recebe a maior celebração de música e cultura urbana de Angola",
            excerptEn: "Benguela Convention Center receives the largest celebration of music and urban culture in Angola"
        },
        {
            id: 3,
            title: "Festival Canjala alia música, cidadania e experiência imersiva em Angola",
            titleEn: "Festival Canjala combines music, citizenship and immersive experience in Angola",
            outlet: "Público",
            date: "22 Dez 2025",
            thumbnail: "/crowd.jpg",
            url: "https://www.publico.pt/2025/12/22/publico-brasil/noticia/festival-canjala-alia-musica-cidadania-experiencia-imersiva-angola-2158980",
            excerpt: "Lançado em 2017 num quintal em Luanda, evento hoje atrai mais de cinco mil pessoas em programação com 12 horas seguidas de música",
            excerptEn: "Launched in 2017 in a backyard in Luanda, the event now attracts more than five thousand people with 12 hours of continuous music"
        },
        {
            id: 5,
            title: "El festival secreto de Luanda reinventa la música electrónica",
            titleEn: "The secret festival of Luanda reinvents electronic music",
            outlet: "DJM Magazine",
            date: "19 Dez 2025",
            thumbnail: "/crowd.jpg",
            url: "https://djmmagazine.tv/el-festival-secreto-de-luanda-reinventa-la-musica-electronica/",
            excerpt: "Sin cartel anunciado y con acceso exclusivo mediante invitación, Canjala demuestra que el futuro de la innovación cultural es africano",
            excerptEn: "Without announced lineup and with exclusive invitation-only access, Canjala demonstrates that the future of cultural innovation is African"
        },
        {
            id: 1,
            title: "Sem cartaz e sem bilhetes à venda, o Festival Canjala tornou-se numa referência em Angola",
            titleEn: "Without lineup or tickets for sale, Festival Canjala has become a reference in Angola",
            outlet: "BANTUMEN",
            date: "18 Dez 2025",
            thumbnail: "/image.png",
            url: "https://www.bantumen.com/artigo/festival-canjala-angola/",
            excerpt: "Sem cartaz anunciado e com acesso exclusivo por convite, o evento consolidou-se como o maior festival de Angola num caso singular de inovação cultural",
            excerptEn: "Without announced lineup and with exclusive invitation-only access, the event has become the largest festival in Angola in a unique case of cultural innovation"
        },
        {
            id: 2,
            title: "O fenómeno 'secreto' de Luanda que está a redefinir os festivais de música globais",
            titleEn: "The 'secret' phenomenon from Luanda redefining global music festivals",
            outlet: "ineews",
            date: "18 Dez 2025",
            thumbnail: "/crowd.jpg",
            url: "https://ineews.eu/o-fenomeno-secreto-de-luanda-que-esta-a-redefinir-os-festivais-de-musica-globais/?lang=pt-pt",
            excerpt: "O festival comprova que o futuro da inovação cultural também é africano, com 80% da bilheteria esgotada em 8 dias sem cartaz anunciado",
            excerptEn: "The festival proves that the future of cultural innovation is also African, with 80% of tickets sold out in 8 days without an announced lineup"
        },
        {
            id: 4,
            title: "Festival Canjala regressa a Luanda a 27 de dezembro sem cartaz e enche à base da confiança",
            titleEn: "Festival Canjala returns to Luanda on December 27 without lineup and fills up based on trust",
            outlet: "Okusaka",
            date: "17 Dez 2025",
            thumbnail: "/palco.jpg",
            url: "https://www.okusaka.com/2025/12/festival-canjala-regressa-luanda-27-de.html",
            excerpt: "80% da lotação foi preenchida nos primeiros 8 dias, consolidando-se como um dos maiores festivais de Angola e caso singular de inovação cultural",
            excerptEn: "80% of capacity was filled in the first 8 days, consolidating itself as one of the largest festivals in Angola and a unique case of cultural innovation"
        }
    ];

    return (
        <section className="py-24 md:py-32 bg-gradient-to-b from-background via-muted to-background relative overflow-hidden" id="imprensa">
            {/* Background decoration */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container relative z-10">
                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <div className="mb-6">
                        <h2 className="text-4xl md:text-6xl font-black">
                            {t("Na", "In the")} <span className="text-primary">{t("Imprensa", "Press")}</span>
                        </h2>
                    </div>
                    <div className="w-20 h-2 bg-primary mb-8 rounded-full mx-auto" />
                    <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                        {t(
                            "Veja o que os principais meios de comunicação dizem sobre a Canjala.",
                            "See what major media outlets say about Canjala and our impact on Angolan culture"
                        )}
                    </p>
                </motion.div>

                {/* Press Articles Grid */}
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
                    {pressArticles.map((article, index) => (
                        <motion.div
                            key={article.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                        >
                            <a
                                href={article.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block group h-full"
                            >
                                <Card className="overflow-hidden hover:shadow-2xl transition-all duration-500 h-full flex flex-col border-2 border-transparent hover:border-primary/20">
                                    {/* Thumbnail */}
                                    <div className="relative h-48 overflow-hidden bg-muted">
                                        <img
                                            src={article.thumbnail}
                                            alt={article.title}
                                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                            crossOrigin="anonymous"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                                        {/* External link icon overlay */}
                                        <div className="absolute top-3 right-3 bg-primary text-primary-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                                            <ExternalLink className="h-4 w-4" />
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        {/* Outlet and Date */}
                                        <div className="flex items-center justify-between mb-3">
                                            <span className="text-sm font-bold text-primary uppercase tracking-wide">
                                                {article.outlet}
                                            </span>
                                            <span className="text-xs text-muted-foreground">
                                                {article.date}
                                            </span>
                                        </div>

                                        {/* Title */}
                                        <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                                            {t(article.title, article.titleEn)}
                                        </h3>

                                        {/* Excerpt */}
                                        <p className="text-sm text-muted-foreground line-clamp-3 flex-1">
                                            {t(article.excerpt, article.excerptEn)}
                                        </p>

                                        {/* Read More Link */}
                                        <div className="mt-4 flex items-center gap-2 text-primary font-semibold text-sm group-hover:gap-3 transition-all">
                                            <span>{t("Ler artigo", "Read article")}</span>
                                            <ExternalLink className="h-4 w-4" />
                                        </div>
                                    </div>
                                </Card>
                            </a>
                        </motion.div>
                    ))}
                </div>

                {/* CTA at the bottom */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 }}
                    className="text-center mt-16"
                >
                </motion.div>
            </div>
        </section>
    );
}
