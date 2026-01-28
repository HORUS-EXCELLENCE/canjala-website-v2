import React from 'react';
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card } from "@/components/ui/card";
import { Clock, Users, Shirt, UserPlus, Ban, Star, Heart, Baby, Smartphone, QrCode, Camera } from "lucide-react";

export function RulesSection() {
    const { t } = useLanguage();

    const rules = [
        {
            id: 1,
            icon: Clock,
            title: "Cuidado com o Horário!",
            text: "Os acessos serão encerrados à meia noite. Sendo assim, somente poderá entrar e sair do recinto os combatentes que tenham feito previamente o check-in. Depois dessa hora, mais nenhum registo de entrada será permitido, logo, não poderão entrar novas pessoas, sem o reembolso do valor da convocatória. Por favor, não tenta a tua sorte!"
        },
        {
            id: 2,
            icon: Users,
            title: "Lotação Limitada",
            text: "O boda é pra todos, mas nem todos conseguirão assegurar o seu lugar na frente de combate. Uma vez esgotadas... Fim!"
        },
        {
            id: 3,
            icon: Shirt,
            title: "Indumentária",
            text: "A indumentária é de extrema importância. Podes deixar as tuas roupas e coisas de marca em casa. Esperamos que os Veteranos, façam sentir o seu papel ao repassar as informações mais cruciais."
        },
        {
            id: 4,
            icon: UserPlus,
            title: "Responsabilidade dos Veteranos",
            text: "Os Veteranos devem se lembrar que são responsáveis pelos recrutas que trazem. Eles devem aprender, através dos Veteranos, as regras de todas as kitotas."
        },
        {
            id: 5,
            icon: Ban,
            title: "Revenda Proibida",
            text: "A revenda de convocatórias é expressamente proibida. Caso assim procedas, a tua convocatória será removida e atribuída à pessoa a quem tentaste vender sem devolução monetária."
        },
        {
            id: 6,
            icon: Star,
            title: "Sem VIPs",
            text: "Não tragam os vossos amiguinhos VIP. Ninguém lhes quer aqui... E eles não querem estar aqui!"
        },
        {
            id: 7,
            icon: Heart,
            title: "Comunidade",
            text: "Deixa a Canjala para aqueles que querem fazer parte duma comunidade, do network e ter uma óptima experiência. Não queremos os \"tô no mô canto, tô!\""
        },
        {
            id: 8,
            icon: Baby,
            title: "Restrições de Entrada",
            text: "É expressamente proibida a entrada de mulheres grávidas."
        },
        {
            id: 9,
            icon: Smartphone,
            title: "Hashtag",
            text: "Ao postar, usa sempre a hashtag #Canjala2025 pra sangrá bem!"
        },
        {
            id: 10,
            icon: QrCode,
            title: "App UZEKA",
            text: "Todas as convocatórias devem ser exibidas a partir do Aplicativo UZEKA. Evita partilhar screenshots para não dificultar o scan à entrada."
        },
        {
            id: 11,
            icon: Camera,
            title: "Reentrada e Segurança",
            text: "À saída do recinto, serão retiradas fotografias aos participantes. Caso a pessoa decida voltar a entrar no evento, a reentrada só será permitida mediante apresentação da ficha correspondente, cuja identificação será validada com a fotografia previamente registada."
        }
    ];

    return (
        <section id="regras" className="py-24 bg-muted/50">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-4xl md:text-6xl font-black mb-6 uppercase">
                        {t("Regras", "Rules")} <span className="text-primary">da Kitota</span>
                    </h2>
                    <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                        {t(
                            "Para garantir a melhor experiência para todos, segue as nossas regras sagradas.",
                            "To ensure the best experience for everyone, follow our sacred rules."
                        )}
                    </p>
                </motion.div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                    {rules.map((rule, index) => (
                        <motion.div
                            key={rule.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <Card className="p-6 h-full hover:shadow-lg transition-all hover:border-primary/50 group">
                                <div className="flex items-start gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                                        <rule.icon className="h-5 w-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-sm font-black text-primary/50">#{rule.id}</span>
                                            <h3 className="font-bold text-lg leading-tight">{rule.title}</h3>
                                        </div>
                                        <p className="text-muted-foreground text-sm leading-relaxed">
                                            {rule.text}
                                        </p>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    className="max-w-3xl mx-auto"
                >
                    <Card className="p-6 bg-primary/5 border-primary/20">
                        <div className="flex gap-4">
                            <div className="shrink-0">
                                <Camera className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <h4 className="font-bold mb-2">Nota Importante</h4>
                                <p className="text-sm text-muted-foreground">
                                    Na Canjala temos câmeras de segurança durante todo o evento para fins de asseguramento do evento. Caso não concordes, não compra a convocatória. Caso decidas comprar, temos a equipa disponível para qualquer informação, caso alguma situação anómala aconteça.
                                </p>
                            </div>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </section>
    );
}
