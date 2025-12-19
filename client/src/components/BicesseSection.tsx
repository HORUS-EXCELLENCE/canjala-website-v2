import React from 'react';
import { motion } from "framer-motion";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";

export function BicesseSection() {
    const { t } = useLanguage();

    return (
        <section className="py-24 md:py-32 bg-[#1B1F3B] relative overflow-hidden text-white" id="acordos">
            {/* Background Elements - Matching the logo's vibe */}
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-[#FFD700]/10 via-transparent to-transparent pointer-events-none" />
            <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-[#FFD700]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="container relative z-10">
                <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

                    {/* Text Content */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="order-2 lg:order-1"
                    >
                        <h2 className="text-4xl md:text-6xl font-black mb-8 leading-tight">
                            {t("O Segundo Maior Festival de Angola", "The Second Largest Festival in Angola")}
                        </h2>

                        <div className="w-20 h-2 bg-[#FFD700] mb-8 rounded-full" />

                        <div className="space-y-6 text-lg md:text-xl text-white/90 mb-10 font-light leading-relaxed">
                            <p>
                                {t(
                                    "Um festival temático, com narrativa e storytelling forte, conceito visual e mensagem própria, que reinterpretam o espírito dos Acordos de Bicesse de 1991.",
                                    "A thematic festival, with strong narrative and storytelling, visual concept and own message, that reinterpret the spirit of the Acordos de Bicesse of 1991."
                                )}
                            </p>
                            <p>
                                {t(
                                    "Hoje, transformamos a memória histórica em símbolo de unidade, esperança e cultura para as novas gerações.",
                                    "Today, we transform historical memory into a symbol of unity, hope and culture for new generations."
                                )}
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Button
                                size="lg"
                                className="bg-[#FFD700] text-[#1B1F3B] hover:bg-[#FFD700]/90 text-lg px-8 h-14 rounded-full font-bold shadow-lg shadow-yellow-900/20"
                                onClick={() => window.open('https://youtu.be/JOVC58cpXwA?si=93tFeQMP8YYrvK4n', '_blank')}
                            >
                                {t("Ver After Movie", "Watch Aftermovie")}
                                <Play className="ml-2 w-5 h-5 fill-[#1B1F3B]" />
                            </Button>
                        </div>
                    </motion.div>

                    {/* Visual Composition */}
                    <div className="relative order-1 lg:order-2">
                        {/* Modern Abstract Grid of Images */}
                        <div className="grid grid-cols-2 gap-4">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.2 }}
                                className="space-y-4 pt-12"
                            >
                                <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-[#FFD700]/20 aspect-[3/4]">
                                    <img
                                        src="/DSC_0737.jpg"
                                        alt="Bicesse Moment 1"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-[#1B1F3B]/20" />
                                </div>
                                <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-[#FFD700]/20 aspect-square">
                                    <img
                                        src="/DSC_1155.jpg"
                                        alt="Bicesse Moment 2"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-[#1B1F3B]/20" />
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.4 }}
                                className="space-y-4"
                            >
                                <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-[#FFD700]/20 aspect-square">
                                    <img
                                        src="/DSC_0834.jpg"
                                        alt="Bicesse Moment 3"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-[#1B1F3B]/20" />
                                </div>
                                <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-[#FFD700]/20 aspect-[3/4]">
                                    <img
                                        src="/DSC_1162_1.jpg"
                                        alt="Bicesse Moment 4"
                                        className="w-full h-full object-cover hover:scale-105 transition-transform duration-700"
                                    />
                                    <div className="absolute inset-0 bg-[#1B1F3B]/20" />
                                </div>
                            </motion.div>
                        </div>

                        {/* Floating Logo Overlay */}
                        <motion.div
                            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 md:w-64 z-20"
                            initial={{ scale: 0, rotate: -10 }}
                            whileInView={{ scale: 1, rotate: 0 }}
                            viewport={{ once: true }}
                            transition={{
                                type: "spring",
                                stiffness: 260,
                                damping: 20,
                                delay: 0.6
                            }}
                        >
                            <div className="relative">
                                {/* Glow behind logo */}
                                <div className="absolute inset-0 bg-[#1B1F3B] blur-2xl rounded-full opacity-90 scale-110" />
                                <img
                                    src="/acordos-logo.png"
                                    alt="Acordos de Bicesse Logo"
                                    className="relative w-full drop-shadow-2xl rounded-3xl"
                                />
                            </div>
                        </motion.div>

                        {/* Decorative elements */}
                        <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] border border-[#FFD700]/10 rounded-full animate-spin-slow" style={{ animationDuration: '30s' }} />
                    </div>
                </div>
            </div>
        </section>
    );
}
