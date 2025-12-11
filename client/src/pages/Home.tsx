import { useAuth } from "@/_core/hooks/useAuth";
import { useLanguage } from "@/contexts/LanguageContext";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Music, Users, Instagram, Facebook, Youtube, Ticket } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  const { user } = useAuth();
  const { t } = useLanguage();

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
            <a href="https://loja.canjala.com" className="text-sm font-semibold hover:text-primary transition-colors">{t("Loja", "Store")}</a>
            <a href="#contacto" className="text-sm font-semibold hover:text-primary transition-colors">{t("Contacto", "Contact")}</a>
            <LanguageSwitcher />
            {user?.role === "admin" && (
              <Button size="sm" variant="outline" onClick={() => window.location.href = "/admin"}>
                Admin
              </Button>
            )}
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              <Ticket className="mr-2 h-4 w-4" />
              {t("Convocatórias", "Tickets 2025")}
            </Button>
          </div>
        </div>
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
  <img 
    src="/logo_canjala.png"
    className="mx-auto mb-0 pb-0"
    style={{ height: "450px" }}
    alt="Logo"
  />
</div>

<p className="text-xl md:text-3xl font-bold text-accent mt-[-35px]">
  A Kitota Virou Festival
</p>

            <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto opacity-90">
              Canjala não é só um lugar, Canjala é a essência de Angola, é a raiz, é o encontro daqueles que celebram juntos as suas vitórias
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-6">
                <Ticket className="mr-2 h-5 w-5" />
                Obter Convocatória
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 text-lg px-8 py-6">
                <Music className="mr-2 h-5 w-5" />
                Ver Aftermovie
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 1 }}
            className="absolute bottom-5 left-1/2 transform -translate-x-1/2"
          >
            <div className="flex flex-col items-center gap-2">
              <p className="text-sm font-semibold">Descobre mais</p>
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
              { number: "4.360+", label: "Participantes 2024", icon: Users },
              { number: "11", label: "Edições Realizadas", icon: Calendar },
              { number: "100%", label: "Convocações Esgotadas", icon: Ticket },
              { number: "2017", label: "Ano de Fundação", icon: Music }
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
                A Essência de Angola
              </h2>
              <p className="text-lg md:text-xl mb-6 opacity-90">
                A Canjala é mais do que um festival de música, é o que em Kimbundu chamamos de Kitota. É uma celebração da cultura angolana, um espaço onde a música, a arte e a comunidade se encontram. A prova de que podemos começar num quintal e expandir pro país inteiro.
              </p>
              <p className="text-lg md:text-xl mb-6 opacity-90">
                Desde 2017, temos reunido milhares de pessoas em torno da nossa paixão partilhada pela música, pela cultura e pela vida. A Canjala é o carro chefe de um sonho que começou com 50 pessoas dentro de um quintal pequeno e hoje invade a mente de todos que escutam o som zumbido do mosquito.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <img 
                src="/crowd-celebration.jpg" 
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
              Uma Experiência <span className="text-primary">Imersiva</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Produção de classe mundial, tecnologia de ponta e uma atmosfera que só Angola pode criar
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
                src="/stage-production.jpg" 
                alt="Produção de Palco" 
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-8">
                <h3 className="text-3xl font-black text-white mb-2">Palco Espectacular</h3>
                <p className="text-white/90">Design geométrico complexo com ecrãs LED de alta resolução e iluminação profissional</p>
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
                <h3 className="text-3xl font-black text-white mb-2">Experiência Completa</h3>
                <p className="text-white/90">Gastronomia, arte interactiva e instalações que criam momentos inesquecíveis</p>
              </div>
            </motion.div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Music,
                title: "Música que Move",
                description: "Dos melhores DJs nacionais aos artistas internacionais..."
              },
              {
                icon: Users,
                title: "Cultura Viva",
                description: "Arte urbana, performances ao vivo, danças inovadoras..."
              },
              {
                icon: MapPin,
                title: "Comunidade Unida",
                description: "Os batalhões são mais do que espectadores, são uma grande família..."
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
              className="order-2 md:order-1"
            >
              <img 
                src="/cultural-celebration.jpg" 
                alt="Celebração Cultural" 
                className="rounded-lg shadow-2xl"
              />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 md:order-2"
            >
              <h2 className="text-5xl md:text-6xl font-black mb-6">
                Tradição e Inovação
              </h2>
              <p className="text-lg md:text-xl mb-6 opacity-90">
                O Canjala celebra o casamento perfeito entre a tradição angolana e a inovação contemporânea. Aqui, os tambores ancestrais encontram os beats electrónicos, e as gerações dançam juntas ao ritmo da nossa cultura.
              </p>
              <p className="text-lg md:text-xl opacity-90">
                Como diz a música "Reunir" de Teta Lando, que resume a essência dos nossos eventos: celebramos as conquistas de todos, acreditamos que é possível fazer em Angola, e continuamos a crescer juntos.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Growth Timeline */}
      <section id="historia" className="py-32 bg-background">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              O Nosso <span className="text-primary">Crescimento</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Desde 2017, o Canjala tem crescido exponencialmente, consolidando-se como o maior festival de Angola
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            {[
              { year: "2017", title: "O Início", participants: "287", description: "Zenza do Itombe como teste de conceito. 50 pessoas num quintal, 287 compareceram" },
              { year: "2018-2019", title: "Crescimento", description: "Da Canjala 2018 ao Kuito Kuanavale 2018, de 400 a 1600 pessoas. Expansão durante tempos desafiantes" },
              { year: "2022-2023", title: "Consolidação", description: "Acordos de Bicesse. Milhares de pessoas reunidas" },
              { year: "2024", title: "Recorde", participants: "4.360+", description: "Recorde de participantes e produção de classe mundial" },
              { year: "2025", title: "O Futuro", description: "Expectativa de crescimento contínuo e novas surpresas" }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative pl-8 pb-12 border-l-4 border-primary last:border-l-0 last:pb-0"
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
                      <span className="text-2xl font-bold text-accent">{item.participants} pessoas</span>
                    )}
                  <p className="text-muted-foreground">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Acordos de Bicesse Mention */}
      <section className="py-32 bg-accent text-accent-foreground">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <h2 className="text-5xl md:text-6xl font-black mb-6">
              Acordos de Bicesse
            </h2>
            <p className="text-xl md:text-2xl mb-8">
              O Segundo Maior Festival
            </p>
            <p className="text-lg mb-8 opacity-90">
              Um festival temático, com narrativa e storytelling forte, conceito visual e mensagem própria, que reinterpretam o espírito dos Acordos de Bicesse de 1991, mas agora como símbolo de unidade, esperança e cultura.
            </p>
            <Button size="lg" variant="outline" className="bg-white/10 backdrop-blur-sm border-white/30 hover:bg-white/20">
              Saber Mais sobre Acordos de Bicesse
            </Button>
          </motion.div>
        </div>
      </section>

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
              Team <span className="text-primary">Arrogância</span>
            </h2>
            <p className="text-xl text-center text-muted-foreground mb-12">
              Nós inventamos a próxima cena
            </p>
            <div className="prose prose-lg max-w-none">
              <p className="text-lg mb-6">
                O Team Arrogância é um colectivo criativo angolano que nasceu da necessidade de produzir experiências culturais com identidade, propósito e profundidade narrativa angolana. O grupo reúne profissionais de diversos campos – música, produção, design, cinema, estratégia, engenharia, finanças, marketing e storytelling – que partilham a mesma visão: Elevar o entretenimento nacional a um patamar conceptual, artístico e tecnicamente irrepreensível. Cada projecto carrega uma assinatura própria, marcada pela ousadia, simbologia e capacidade de transformar ideias abstractas em espectáculos sensoriais.
              </p>
              <p className="text-lg mb-6">
                O colectivo tem como objectivo principal criar projectos, narrativas e universos que desafiam a forma tradicional de fazer negócios em Angola. O Team Arrogância trabalha com pilares sólidos: Excelência criativa, respeito pela identidade angolana, inovação constante e a procura por novas maneiras de conectar o público às histórias que contam. Os seus festivais e produções não são apenas actos de entretenimento, mas experiências que incorporam reflexão, memória, espiritualidade, estética e emoção.
              </p>
              <p className="text-lg">
                Além da criação de espectáculos, o Team Arrogância pretende contribuir para a profissionalização do sector artístico e cultural, abrindo espaço para novos talentos, estimulando colaborações e promovendo um ecossistema criativo sustentável. O colectivo busca consolidar-se como uma força motriz da cultura contemporânea angolana, capaz de influenciar gerações, fortalecer a produção nacional e exportar conceitos que representem, com dignidade e ambição, o potencial artístico de Angola.
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
              Canjala 2025
            </h2>
            <p className="text-2xl md:text-3xl mb-8 font-bold">
              A Kitota Espera Por Ti
            </p>
            <p className="text-xl mb-12 opacity-90">
              As convocações esgotam em dias. Não percas a oportunidade de fazer parte da maior celebração cultural de Angola.
            </p>
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-xl px-12 py-8 font-bold">
              <Ticket className="mr-3 h-6 w-6" />
              Garantir Minha Convocatória
            </Button>
          </motion.div>
        </div>
      </section>

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
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
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
