import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type MouseEvent } from "react";
import { ArrowDown, ArrowLeft, ArrowRight, Bolt, ChevronRight, Gauge, Menu, Snowflake, Sparkles, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import lineupAsset from "@/assets/rf-bull-lineup.jpg.asset.json";
import nightlifeAsset from "@/assets/rf-bull-nightlife.jpg.asset.json";
import flavorsAsset from "@/assets/rf-bull-flavors.jpg.asset.json";
import racingAsset from "@/assets/rf-bull-racing.jpg.asset.json";
import classicoAsset from "@/assets/rf-bull-classico.jpg.asset.json";
import guaranaAsset from "@/assets/rf-bull-guarana.jpg.asset.json";
import limaoAsset from "@/assets/rf-bull-limao.jpg.asset.json";
import morangoAsset from "@/assets/rf-bull-morango.jpg.asset.json";
import mirtiloAsset from "@/assets/rf-bull-mirtilo.jpg.asset.json";

const flavors = [
  { name: "Clássico", note: "O sabor que começou tudo. Intenso, gelado e inconfundível.", color: "blue", image: classicoAsset.url },
  { name: "Guaraná", note: "A força brasileira em uma combinação vibrante e tropical.", color: "pink", image: guaranaAsset.url },
  { name: "Limão Exótico", note: "Cítrico afiado, refrescância máxima e final surpreendente.", color: "lime", image: limaoAsset.url },
  { name: "Morango Intenso", note: "Frutado, marcante e feito para acelerar seus sentidos.", color: "red", image: morangoAsset.url },
  { name: "Mirtilo Silvestre", note: "Notas profundas de frutas azuis com energia sofisticada.", color: "violet", image: mirtiloAsset.url },
] as const;

const gallery = [
  { src: nightlifeAsset.url, label: "Noite & rolê", eyebrow: "01 / NIGHT MODE" },
  { src: flavorsAsset.url, label: "Sabor explosivo", eyebrow: "02 / FRESH MODE" },
  { src: racingAsset.url, label: "RF-Bull Racing", eyebrow: "03 / RACE MODE" },
];

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "RF-Bull | Energia que Move" },
      { name: "description", content: "Conheça RF-Bull, o energético brasileiro de sabores intensos para quem desafia os próprios limites." },
      { property: "og:title", content: "RF-Bull | Energia que Move" },
      { property: "og:description", content: "Energia intensa, sabores explosivos e atitude para ir além." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function TiltCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const move = (event: MouseEvent<HTMLDivElement>) => {
    if (!ref.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const box = ref.current.getBoundingClientRect();
    const rx = ((event.clientY - box.top) / box.height - 0.5) * -7;
    const ry = ((event.clientX - box.left) / box.width - 0.5) * 7;
    ref.current.style.transform = `perspective(1000px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-4px)`;
  };
  const reset = () => { if (ref.current) ref.current.style.transform = "perspective(1000px) rotateX(0) rotateY(0)"; };
  return <div ref={ref} onMouseMove={move} onMouseLeave={reset} className={`tilt-card ${className}`}>{children}</div>;
}

function Index() {
  const [activeFlavor, setActiveFlavor] = useState(0);
  const [slide, setSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const timer = window.setInterval(() => setSlide((value) => (value + 1) % gallery.length), 6000);
    return () => window.clearInterval(timer);
  }, []);

  const flavor = flavors[activeFlavor];
  const moveSlide = (direction: number) => setSlide((slide + direction + gallery.length) % gallery.length);

  return (
    <main className="min-h-screen overflow-hidden bg-background text-foreground">
      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/75 backdrop-blur-xl">
        <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#inicio" className="brand-mark" aria-label="RF-Bull início"><span>RF</span><i>—</i>BULL</a>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Navegação principal">
            <a href="#sabores">Sabores</a><a href="#experiencias">Experiências</a><a href="#racing">Racing</a>
          </nav>
          <Button asChild className="hidden md:inline-flex"><a href="#sabores">Escolha sua energia <ChevronRight size={17} /></a></Button>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X /> : <Menu />}</Button>
        </div>
        {menuOpen && <nav className="flex flex-col border-t border-border bg-background p-5 md:hidden"><a href="#sabores" onClick={() => setMenuOpen(false)}>Sabores</a><a href="#experiencias" onClick={() => setMenuOpen(false)}>Experiências</a><a href="#racing" onClick={() => setMenuOpen(false)}>Racing</a></nav>}
      </header>

      <section id="inicio" className="hero relative flex min-h-[92vh] items-end pt-20">
        <img src={lineupAsset.url} alt="Cinco latas geladas RF-Bull em diferentes sabores" className="absolute inset-0 size-full object-cover object-center" />
        <div className="hero-scrim absolute inset-0" />
        <div className="relative z-10 mx-auto grid w-full max-w-7xl gap-10 px-5 pb-16 pt-28 lg:grid-cols-[1fr_0.55fr] lg:px-8 lg:pb-24">
          <div className="max-w-3xl animate-fade-in">
            <span className="eyebrow"><Bolt size={14} fill="currentColor" /> Nova geração de energia</span>
            <h1>Energia que<br /><strong>move você.</strong></h1>
            <p>RF-Bull combina potência, sabor e atitude em cada gole. Cinco sabores. Uma missão: levar você além.</p>
            <div className="mt-8 flex flex-wrap gap-3"><Button asChild><a href="#sabores">Descubra seu sabor <ArrowDown size={17} /></a></Button><Button asChild variant="outline"><a href="#racing">Sinta a velocidade</a></Button></div>
          </div>
          <div className="hidden self-end justify-self-end lg:block"><div className="metal-stat"><span>05</span><p>sabores<br />intensos</p></div></div>
        </div>
        <div className="ticker"><div>RF-BULL <span>◆</span> ENERGIA MÁXIMA <span>◆</span> SABOR EXPLOSIVO <span>◆</span> RF-BULL <span>◆</span> ENERGIA MÁXIMA <span>◆</span> SABOR EXPLOSIVO</div></div>
      </section>

      <section id="sabores" className={`flavor-section flavor-${flavor.color}`}>
        <div className="mx-auto max-w-7xl px-5 py-24 lg:px-8 lg:py-32">
          <div className="section-head"><div><span className="kicker">ESCOLHA SUA VIBE</span><h2>Cinco sabores.<br /><em>Infinitas possibilidades.</em></h2></div><p>Clique em um sabor e encontre a lata que acompanha o seu ritmo.</p></div>
          <div className="mt-14 grid gap-8 lg:grid-cols-[0.78fr_1.22fr]">
            <div className="flavor-controls" role="tablist" aria-label="Sabores RF-Bull">
              {flavors.map((item, index) => <button key={item.name} type="button" role="tab" aria-selected={activeFlavor === index} aria-controls="flavor-panel" onClick={() => setActiveFlavor(index)}><span>0{index + 1}</span>{item.name}<ChevronRight size={18} /></button>)}
            </div>
            <TiltCard className="flavor-visual">
              <div id="flavor-panel" role="tabpanel" className="flavor-can-stage">
                <img key={flavor.name} src={flavor.image} alt={`Lata RF-Bull sabor ${flavor.name}`} className="flavor-can-enter" />
              </div>
              <div className="flavor-copy"><span>SABOR 0{activeFlavor + 1}</span><h3>{flavor.name}</h3><p>{flavor.note}</p></div>
              <div className="cold-badge"><Snowflake size={20} /><span>SIRVA<br />GELADO</span></div>
            </TiltCard>
          </div>
        </div>
      </section>

      <section id="experiencias" className="bg-foreground py-24 text-background lg:py-32">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="section-head inverse"><div><span className="kicker">VIVA EM ALTA VOLTAGEM</span><h2>Um sabor para<br /><em>cada momento.</em></h2></div><div className="flex gap-2"><Button variant="outline" size="icon" onClick={() => moveSlide(-1)} aria-label="Imagem anterior"><ArrowLeft /></Button><Button variant="outline" size="icon" onClick={() => moveSlide(1)} aria-label="Próxima imagem"><ArrowRight /></Button></div></div>
          <div className="gallery-stage mt-12">
            {gallery.map((item, index) => <figure key={item.label} className={index === slide ? "active" : ""} aria-hidden={index !== slide}><img src={item.src} alt={item.label} /><figcaption><span>{item.eyebrow}</span><strong>{item.label}</strong></figcaption></figure>)}
            <div className="gallery-dots">{gallery.map((item, index) => <button key={item.label} onClick={() => setSlide(index)} aria-label={`Ver ${item.label}`} className={index === slide ? "active" : ""} />)}</div>
          </div>
        </div>
      </section>

      <section className="fresh-grid">
        <div className="fresh-image"><img src={flavorsAsset.url} alt="RF-Bull Limão e Morango com frutas frescas e gelo" /></div>
        <div className="fresh-copy"><span className="kicker">REFRESCÂNCIA REAL</span><h2>Sabor explosivo.<br /><em>Gelado de verdade.</em></h2><p>Combinações frutadas, aroma marcante e uma explosão refrescante a cada gole.</p><div className="feature-list"><div><Snowflake /><span><b>Máxima refrescância</b>Experiência intensa quando gelado</span></div><div><Sparkles /><span><b>Sabores selecionados</b>Perfis frutados e vibrantes</span></div><div><Bolt /><span><b>Energia para o ritmo</b>Do primeiro ao último compromisso</span></div></div></div>
      </section>

      <section id="racing" className="racing relative">
        <img src={racingAsset.url} alt="Latas RF-Bull em um autódromo durante uma corrida" className="absolute inset-0 size-full object-cover" />
        <div className="racing-scrim absolute inset-0" />
        <div className="relative z-10 mx-auto flex min-h-[760px] max-w-7xl items-end px-5 py-24 lg:px-8">
          <div className="max-w-3xl"><span className="eyebrow"><Gauge size={16} /> RF-BULL RACING</span><h2>Desafie<br /><em>seus limites.</em></h2><p>A velocidade não espera. Encontre seu foco, domine a pista e siga sempre em frente.</p><Button asChild className="mt-8"><a href="#inicio">Acelere com RF-Bull <ChevronRight size={18} /></a></Button></div>
        </div>
      </section>

      <footer><div className="mx-auto flex max-w-7xl flex-col justify-between gap-8 px-5 py-12 md:flex-row md:items-end lg:px-8"><div><div className="brand-mark"><span>RF</span><i>—</i>BULL</div><p>ENERGIA QUE MOVE.</p></div><p>© 2026 RF-Bull. Curta com responsabilidade.</p></div></footer>
    </main>
  );
}