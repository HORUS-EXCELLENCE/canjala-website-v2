import React, { useState, useEffect } from 'react';
import { useAuth } from "@/_core/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Music, Users, Instagram, Facebook, Youtube, Ticket, Menu, X } from "lucide-react";
import { motion } from "framer-motion";
import { HistorySection } from "@/components/HistorySection";
import { BicesseSection } from "@/components/BicesseSection";
import { PressSection } from "@/components/PressSection";

interface Product {
  id: number;
  name: string;
  full_cover: string;
  price: string;
  qty_in_stock: number;
  type: string;
}

export default function Home() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    fetch('https://backend.canjala.com/api/loja/products')
      .then(res => res.json())
      .then((data: Product[]) => setProducts(data.filter(product => product.type !== 'download')))
      .catch(err => console.error('Error fetching products:', err));
  }, []);

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto flex items-center justify-between py-4">
          <motion.a
            href="/"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center"
          >
            <img src="/logo.png" alt="Canjala" className="h-12 w-auto" />
          </motion.a>
          <div className="hidden md:flex items-center gap-8">
            <a href="#sobre" className="text-sm font-semibold hover:text-primary transition-colors">{t("Sobre", "About")}</a>
            <a href="#experiencia" className="text-sm font-semibold hover:text-primary transition-colors">{t("Experiência", "Experience")}</a>
            <a href="#historia" className="text-sm font-semibold hover:text-primary transition-colors">{t("História", "History")}</a>
            <a href="#merch" className="text-sm font-semibold hover:text-primary transition-colors">{t("Loja", "Store")}</a>
            <a href="#imprensa" className="text-sm font-semibold hover:text-primary transition-colors">{t("Imprensa", "Press")}</a>
            <a href="#contacto" className="text-sm font-semibold hover:text-primary transition-colors">{t("Contacto", "Contact")}</a>
            <LanguageSwitcher />
            {user?.role === "admin" && (
              <Button size="sm" variant="outline" onClick={() => window.location.href = "/admin"}>
                Admin
              </Button>
            )}
            <a href="/convocatoria"><Button size="lg" className="bg-primary hover:bg-primary/90">
              <Ticket className="mr-2 h-4 w-4" />
              {t("Convocatórias", "Tickets 2025")}
            </Button></a>
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
              <a
                href="#sobre"
                className="text-sm font-semibold hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("Sobre", "About")}
              </a>
              <a
                href="#experiencia"
                className="text-sm font-semibold hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("Experiência", "Experience")}
              </a>
              <a
                href="#historia"
                className="text-sm font-semibold hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("História", "History")}
              </a>
              <a
                href="#merch"
                className="text-sm font-semibold hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("Loja", "Store")}
              </a>
              <a
                href="#imprensa"
                className="text-sm font-semibold hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("Imprensa", "Press")}
              </a>
              <a
                href="#contacto"
                className="text-sm font-semibold hover:text-primary transition-colors py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("Contacto", "Contact")}
              </a>
              <div className="border-t border-border pt-4 mt-4">
                <div className="flex items-center gap-4 mb-4">
                  <LanguageSwitcher />
                </div>
                {user?.role === "admin" && (
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => {
                      window.location.href = "/admin";
                      setMobileMenuOpen(false);
                    }}
                    className="w-full mb-2"
                  >
                    Admin
                  </Button>
                )}
                <a href="/convocatoria"><Button
                  size="lg"
                  className="bg-primary hover:bg-primary/90 w-full"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Ticket className="mr-2 h-4 w-4" />
                  {t("Convocatórias", "Tickets 2025")}
                </Button></a>
              </div>
            </div>
          </motion.div>
        )}
      </nav>

      {/* Hero Section - Full Screen with Parallax Effect */}
      <section className="relative h-screen overflow-hidden">
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5 }}
          className="absolute inset-0"
        >
          <img
            src="/hero-canjala.jpg"
            alt="Canjala Festival"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-background" />
        </motion.div>

        <div className="relative h-full container flex flex-col items-center justify-center text-center text-white">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
          >
            <div className="mb-0 pb-0">
              <h1 className="text-5xl md:text-8xl font-black mb-20 mt-30">CANJALA</h1>
            </div>

            <p className="text-xl md:text-3xl font-bold text-accent mt-[-35px]">
              {t("A Kitota Virou Festival", "The Kitota Became Festival")}
            </p>

            <p className="text-lg md:text-xl mb-7 max-w-2xl mx-auto opacity-90">
              {t("Canjala não é só um lugar, Canjala é a essência de Angola, é a raiz, é o encontro daqueles que celebram juntos as suas vitórias", "Canjala is not just a place, Canjala is the essence of Angola, it is the root, it is the meeting of those who celebrate their victories together")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="/convocatoria"><Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                <Ticket className="mr-2 h-5 w-5" />
                {t("Obter Convocatória", "Get Tickets")}
              </Button></a>
              <a href="https://youtu.be/Yk38mn3g8Iw"><Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6">
                <Music className="mr-2 h-5 w-5" />
                {t("Ver Aftermovie", "Watch Aftermovie")}
              </Button></a>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm font-semibold">{t("Descobre mais", "Discover more")}</p>
              <div className="w-6 h-10 border-2 border-white rounded-full flex items-start justify-center p-2">
                <motion.div
                  animate={{ y: [0, 12, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="w-1.5 h-1.5 bg-white rounded-full"
                />
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { number: "4.360+", label: t("Participantes 2024", "2024 Participants"), icon: Users },
              { number: "11", label: t("Edições Realizadas", "Editions Held"), icon: Calendar },
              { number: "100%", label: t("Convocações Esgotadas", "Tickets Sold Out"), icon: Ticket },
              { number: "2018", label: t("Ano de Fundação", "Year Founded"), icon: Music }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <stat.icon className="h-8 w-8 mx-auto mb-4 text-primary" />
                <div className="text-4xl md:text-5xl font-black text-primary mb-2">{stat.number}</div>
                <div className="text-sm md:text-base font-semibold text-muted-foreground">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Diagonal Cut */}
      <section id="sobre" className="relative py-32 bg-primary text-primary-foreground overflow-hidden -mt-16 pt-32" style={{ clipPath: "polygon(0 8%, 100% 0, 100% 100%, 0 100%)", marginTop: "-5rem", paddingTop: "8rem" }}>
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                {t("A Essência de Angola", "The Essence of Angola")}
              </h2>
              <p className="text-lg md:text-xl mb-6 opacity-90">
                {t("A Canjala é mais do que um festival de música, é o que em Kimbundu chamamos de Kitota. É uma celebração da cultura angolana, um espaço onde a música, a arte e a comunidade se encontram. A prova de que podemos começar num quintal e expandir pro país inteiro.", "Canjala is more than a music festival, it's what we call Kitota in Kimbundu. It's a celebration of Angolan culture, a space where music, art and community meet. Proof that we can start in a backyard and expand to the whole country.")}
              </p>
              <p className="text-lg md:text-xl mb-6 opacity-90">
                {t("Desde 2018, temos reunido milhares de pessoas em torno da nossa paixão partilhada pela música, pela cultura e pela vida. A Canjala é o carro chefe de um sonho que começou com 50 pessoas dentro de um quintal pequeno e hoje invade a mente de todos que escutam o som zumbido do mosquito.", "Since 2018, we have gathered thousands of people around our shared passion for music, culture and life. Canjala is the flagship of a dream that started with 50 people in a small backyard and today invades the minds of all who hear the buzzing sound of the mosquito.")}
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img
                src="/crowd.jpg"
                alt="Celebração Canjala"
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experiencia" className="py-32 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              {t("Uma Experiência", "An Experience")} <span className="text-primary">{t("Imersiva", "Immersive")}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("Produção de classe mundial, tecnologia de ponta e uma atmosfera que só Angola pode criar", "World-class production, cutting-edge technology and an atmosphere that only Angola can create")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="relative h-96 rounded-lg overflow-hidden group"
            >
              <img
                src="/palco.jpg"
                alt="Produção de Palco"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-3xl font-black text-white mb-2">{t("Palco Espectacular", "Spectacular Stage")}</h3>
                <p className="text-white/90">{t("Design geométrico complexo com ecrãs LED de alta resolução e iluminação profissional", "Complex geometric design with high-resolution LED screens and professional lighting")}</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="relative h-96 rounded-lg overflow-hidden group"
            >
              <img
                src="/festival-atmosphere.jpg"
                alt="Atmosfera do Festival"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-3xl font-black text-white mb-2">{t("Experiência Completa", "Complete Experience")}</h3>
                <p className="text-white/90">{t("Gastronomia, arte interactiva e instalações que criam momentos inesquecíveis", "Gastronomy, interactive art and installations that create unforgettable moments")}</p>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Music,
                title: t("Música que Move", "Music that Moves"),
                description: t("Dos melhores DJs nacionais aos artistas internacionais...", "From the best national DJs to international artists...")
              },
              {
                icon: Users,
                title: t("Cultura Viva", "Living Culture"),
                description: t("Arte urbana, performances ao vivo, danças inovadoras...", "Urban art, live performances, innovative dances...")
              },
              {
                icon: MapPin,
                title: t("Comunidade Unida", "United Community"),
                description: t("Os batalhões são mais do que espectadores, são uma grande família...", "The battalions are more than spectators, they are a big family...")
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 h-full hover:shadow-lg transition-shadow">
                  <feature.icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Cultural Heritage Section */}
      <section className="relative py-32 bg-secondary text-secondary-foreground overflow-hidden">
        <div className="container">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 md:order-1 rounded-lg overflow-hidden shadow-2xl w-full max-w-lg mx-auto md:max-w-none h-[500px] md:h-[800px]"
            >
              <video
                autoPlay
                muted
                loop
                className="w-full h-full object-cover"
              >
                <source src="/video.mp4" type="video/mp4" />
                <img
                  src="/cultural.png"
                  alt="Celebração Cultural"
                  className="w-full h-full object-cover"
                />
              </video>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                {t("Tradição e Inovação", "Tradition and Innovation")}
              </h2>
              <p className="text-lg md:text-xl mb-6 opacity-90">
                {t("A Canjala celebra o casamento perfeito entre a tradição angolana e a inovação contemporânea. Aqui, os tambores ancestrais encontram os beats electrónicos, e as gerações dançam juntas ao ritmo da nossa cultura.", "Canjala celebrates the perfect marriage between Angolan tradition and contemporary innovation. Here, ancestral drums meet electronic beats, and generations dance together to the rhythm of our culture.")}
              </p>
              <p className="text-lg md:text-xl opacity-90">
                {t("Como diz a música \"Reunir\" de Teta Lando, que resume a essência dos nossos eventos: celebramos as conquistas de todos, acreditamos que é possível fazer em Angola, e continuamos a crescer juntos.", "As the song \"Reunir\" by Teta Lando says, which summarizes the essence of our events: we celebrate everyone's achievements, we believe it is possible to do in Angola, and we continue to grow together.")}
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Growth Timeline */}
      <HistorySection />

      {/* Products Section */}
      <section className="py-10 bg-background" id='merch'>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              {t("Kitota", "Kitota")} <span className="text-primary">{t("Merch", "Merch")}</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("Confira nossa loja oficial com produtos exclusivos e merchandising", "Check out our official store with exclusive products and merchandise")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.slice(0, 4).map((product: Product) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
              >
                <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 group">
                  <div className="relative overflow-hidden">
                    <img
                      src={product.full_cover}
                      alt={product.name}
                      className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-lg mb-2 line-clamp-2">{product.name}</h3>
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-black text-primary">{product.price} Kz</span>
                      {product.qty_in_stock > 0 && (
                        <span className="text-sm text-green-600 font-semibold">{t("Em stock", "In stock")}</span>
                      )}
                    </div>
                    <Button
                      className="w-full bg-primary hover:bg-primary/90"
                      onClick={() => window.open('https://loja.canjala.com', '_blank')}
                    >
                      {t("Ver na Loja", "View in Store")}
                    </Button>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button
              size="lg"
              variant="outline"
              className="px-8 py-4 text-lg font-semibold border-primary text-primary hover:bg-primary hover:text-white"
              onClick={() => window.open('https://loja.canjala.com', '_blank')}
            >
              {t("Ver Mais Produtos", "See More Products")}
            </Button>
          </div>
        </div>
      </section>

      {/* Acordos de Bicesse Mention */}
      <BicesseSection />

      {/* Press Section */}
      <PressSection />

      {/* Team Arrogância Section */}
      <section className="py-32 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6 text-center">
              {t("Team", "Team")} <span className="text-primary">{t("Arrogância", "Arrogância")}</span>
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-12">
              {t("Nós inventamos a próxima cena", "We invent the next scene")}
            </p>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg mb-6">
                {t("O Team Arrogância é um colectivo criativo angolano que nasceu da necessidade de produzir experiências culturais com identidade, propósito e profundidade narrativa angolana. O grupo reúne profissionais de diversos campos – música, produção, design, cinema, estratégia, engenharia, finanças, marketing e storytelling – que partilham a mesma visão: Elevar o entretenimento nacional a um patamar conceptual, artístico e tecnicamente irrepreensível. Cada projecto carrega uma assinatura própria, marcada pela ousadia, simbologia e capacidade de transformar ideias abstractas em espectáculos sensoriais.", "Team Arrogância is an Angolan creative collective born from the need to produce cultural experiences with Angolan identity, purpose and narrative depth. The group brings together professionals from various fields – music, production, design, cinema, strategy, engineering, finance, marketing and storytelling – who share the same vision: Elevate national entertainment to a conceptually, artistically and technically impeccable level. Each project carries its own signature, marked by boldness, symbolism and the ability to transform abstract ideas into sensory spectacles.")}
              </p>
              <p className="text-lg mb-6">
                {t("O colectivo tem como objectivo principal criar projectos, narrativas e universos que desafiam a forma tradicional de fazer negócios em Angola. O Team Arrogância trabalha com pilares sólidos: Excelência criativa, respeito pela identidade angolana, inovação constante e a procura por novas maneiras de conectar o público às histórias que contam. Os seus festivais e produções não são apenas actos de entretenimento, mas experiências que incorporam reflexão, memória, espiritualidade, estética e emoção.", "The collective's main objective is to create projects, narratives and universes that challenge the traditional way of doing business in Angola. Team Arrogância works with solid pillars: Creative excellence, respect for Angolan identity, constant innovation and the search for new ways to connect the public to the stories they tell. Their festivals and productions are not just acts of entertainment, but experiences that incorporate reflection, memory, spirituality, aesthetics and emotion.")}
              </p>
              <p className="text-lg">
                {t("Além da criação de espectáculos, o Team Arrogância pretende contribuir para a profissionalização do sector artístico e cultural, abrindo espaço para novos talentos, estimulando colaborações e promovendo um ecossistema criativo sustentável. O colectivo busca consolidar-se como uma força motriz da cultura contemporânea angolana, capaz de influenciar gerações, fortalecer a produção nacional e exportar conceitos que representem, com dignidade e ambição, o potencial artístico de Angola.", "In addition to creating spectacles, Team Arrogância aims to contribute to the professionalization of the artistic and cultural sector, opening space for new talents, encouraging collaborations and promoting a sustainable creative ecosystem. The collective seeks to establish itself as a driving force in contemporary Angolan culture, capable of influencing generations, strengthening national production and exporting concepts that represent, with dignity and ambition, Angola's artistic potential.")}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contacto" className="py-32 bg-gradient-to-br from-primary via-secondary to-accent text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0" style={{ backgroundImage: "url('/hero-canjala.jpg')", backgroundSize: "cover", backgroundPosition: "center" }} />
        </div>
        <div className="container relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl md:text-7xl font-black mb-6">
              {t("Canjala 2025", "Canjala 2025")}
            </h2>
            <p className="text-2xl md:text-3xl mb-8 font-bold">
              {t("A Kitota Espera Por Ti", "The Kitota Awaits You")}
            </p>
            <p className="text-xl mb-12 opacity-90">
              {t("As convocações esgotam em dias. Não percas a oportunidade de fazer parte da maior celebração cultural de Angola.", "Tickets sell out in days. Don't miss the opportunity to be part of Angola's biggest cultural celebration.")}
            </p>
            <a href="/convocatoria"><Button size="lg" className="bg-white text-primary hover:bg-white/90 text-xl px-12 py-8 font-bold">
              <Ticket className="mr-3 h-6 w-6" />
              {t("Garantir Minha Convocatória", "Secure My Ticket")}
            </Button></a>
          </motion.div>
        </div>
      </section>

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
                <li><a href="#imprensa" className="hover:opacity-100 transition-opacity">{t("Imprensa", "Press")}</a></li>
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
