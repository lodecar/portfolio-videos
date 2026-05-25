import { useEffect, useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import banderasVideo from "../assets/videos/banderas.mp4";
import bubbleShooterVideo from "../assets/videos/bubbleshooter.mp4";
import carreraCanicasVideo from "../assets/videos/carrera_canicas.mp4";
import ej1P1Video from "../assets/videos/ej1_p1.mp4";
import ej2P2Video from "../assets/videos/ej2_p2.mp4";
import emisoresVideo from "../assets/videos/emisores.mp4";
import fuegoEmisorVideo from "../assets/videos/fuegoEmisor.mp4";
import funcOscilatoriaVideo from "../assets/videos/funcOscilatoria.mp4";
import hairSimulationVideo from "../assets/videos/hairSimulation.mp4";
import montanaRusaVideo from "../assets/videos/montanaRusa.mp4";
import muelleVideo from "../assets/videos/muelle.mp4";
import partiGirandoVideo from "../assets/videos/partiGirando.mp4";
import particulaFlotanteVideo from "../assets/videos/particulaFLotante.mp4";
import telaBolaVideo from "../assets/videos/telabola.mp4";
import tiroParabolicoVideo from "../assets/videos/tiroparabolico.mp4";
import practica3Video1 from "../assets/videos/video1.mp4";
import vientoVideo from "../assets/videos/viento.mp4";
import {
  ArrowLeft,
  ArrowRight,
  Atom,
  Boxes,
  ExternalLink,
  Gauge,
  Play,
  Waves,
} from "lucide-react";

type Page = "inicio" | "videos" | "labs";
type TopicFilter = "tema-1" | "tema-2" | "tema-3";
type LabId = "practica-1" | "practica-2" | "practica-3" | "practica-4";

type ProjectVideo = {
  title: string;
  category: string;
  description: string;
  model: string;
  video: string;
  poster?: string;
  bg: string;
  panel: string;
  accent: string;
  topic: TopicFilter;
  link?: string;
};

type ProjectRole = "center" | "left" | "right" | "back";
type LabDemo = {
  title: string;
  category: string;
  description: string;
  model: string;
  video?: string;
  url?: string;
  accent: string;
};


const TRANSITION = "650ms cubic-bezier(0.4,0,0.2,1)";
const TOPIC_ACCENTS: Record<TopicFilter, { title: string; detail: string; color: string }> = {
  "tema-1": {
    title: "Integradores",
    detail: "Osciladores, muelles, trayectorias y disparos.",
    color: "#7CF7FF",
  },
  "tema-2": {
    title: "Sistemas de partículas",
    detail: "Emisores, atracción, fuego y flotabilidad.",
    color: "#4DFFBE",
  },
  "tema-3": {
    title: "Masa muelle",
    detail: "Telas, banderas, pelo y masa-muelle.",
    color: "#FFE66D",
  },
};
const LAB_ACCENTS: Record<LabId, { color: string; icon: "waves" | "atom" | "boxes" | "gauge" }> = {
  "practica-1": { color: "#7CF7FF", icon: "waves" },
  "practica-2": { color: "#4DFFBE", icon: "atom" },
  "practica-3": { color: "#FFE66D", icon: "boxes" },
  "practica-4": { color: "#F0ABFC", icon: "gauge" },
};

const TOPICS: Array<{ id: TopicFilter; label: string; description: string }> = [
  {
    id: "tema-1",
    label: "Tema 1",
    description: "Fundamentos, primeras prácticas y bases técnicas",
  },
  {
    id: "tema-2",
    label: "Tema 2",
    description: "Movimiento, fuerzas y sistemas de particulas",
  },
  {
    id: "tema-3",
    label: "Tema 3",
    description: "Simulación física, mallas y sistemas masa-muelle",
  },
];

const PROJECTS: ProjectVideo[] = [
  {
    title: "Función oscilatoria",
    category: "Tema 1 · Osciladores y funciones",
    description:
      "Este vídeo representa el movimiento de una partícula sobre una función oscilatoria. La idea principal del tema es que una trayectoria puede describirse como una función dependiente del tiempo, por ejemplo y = sin(x) o y = sin(x) · e^(-kx). La partícula avanza mientras su altura sube y baja siguiendo la onda: la amplitud indica cuánto se separa del eje, la frecuencia indica cuántas oscilaciones aparecen y el posible factor de amortiguación reduce poco a poco el movimiento. Sirve para ver cómo una función matemática se convierte en una trayectoria animada.",
    model: "Función paramétrica y oscilador: y = sin(x), y = sin(x) · e^(-kx), amplitud A, frecuencia f y evolución temporal x = x0 + v · t.",
    video: funcOscilatoriaVideo,
    poster: "/posters/funcOscilatoria.jpg",
    bg: "#123C69",
    panel: "#1B8FB8",
    accent: "#7CF7FF",
    topic: "tema-1",
    link: "#",
  },
  {
    title: "Montaña rusa",
    category: "Tema 1 · Trayectorias",
    description:
      "La montaña rusa trabaja la cinemática: el movimiento se estudia a partir de posición, velocidad y aceleración, sin centrarse todavía en todas las fuerzas internas. La partícula recorre una trayectoria por tramos, y en cada tramo la pendiente modifica su velocidad. Cuando la pendiente baja, el movimiento tiende a acelerarse; cuando sube, pierde velocidad. Conceptualmente se relaciona con x = x0 + v · Δt para velocidad constante y con v = u + a · Δt cuando aparece aceleración. El vídeo muestra cómo el cambio de inclinación afecta al desplazamiento y al ritmo de la partícula.",
    model: "Cinemática por tramos: x' = x + v · Δt, v' = v + a · Δt y variación de velocidad según la pendiente del recorrido.",
    video: montanaRusaVideo,
    poster: "/posters/montanaRusa.jpg",
    bg: "#164E63",
    panel: "#0891B2",
    accent: "#A5F3FC",
    topic: "tema-1",
    link: "#",
  },
  {
    title: "Muelle",
    category: "Tema 1 · Hooke y amortiguación",
    description:
      "Este ejercicio muestra un sistema elástico basado en un muelle. Su funcionamiento se entiende con la Ley de Hooke: F = k · (Lactual - Lreposo), donde k mide la rigidez, Lactual es la longitud del muelle en cada instante y Lreposo es la longitud natural. Si el muelle se estira o comprime, aparece una fuerza de recuperación que intenta devolverlo al equilibrio. Si además hay amortiguación, se añade una resistencia proporcional a la velocidad, reduciendo la oscilación con el tiempo. El vídeo permite ver deformación, recuperación, equilibrio y pérdida progresiva de energía.",
    model: "Muelle elástico: F = -k · x, con x = Lactual - Lreposo; amortiguación proporcional a la velocidad para disipar energía.",
    video: muelleVideo,
    poster: "/posters/muelle.jpg",
    bg: "#3B0764",
    panel: "#9333EA",
    accent: "#F0ABFC",
    topic: "tema-1",
    link: "#",
  },
  {
    title: "Partícula girando",
    category: "Tema 1 · Movimiento circular",
    description:
      "Aquí se representa un movimiento circular uniforme: una partícula gira alrededor de un punto manteniendo un radio r. El tema lo describe con periodo T, frecuencia f = 1 / T y velocidad angular ω = 2πf. A partir de eso, la posición se calcula con x = r · cos(ωt) e y = r · sin(ωt). Aunque la rapidez angular sea constante, la dirección de la velocidad cambia continuamente, por eso la trayectoria es circular. El vídeo muestra cómo la trigonometría transforma un ángulo que crece con el tiempo en coordenadas x, y sobre una órbita.",
    model: "Movimiento circular uniforme: f = 1 / T, ω = 2πf, x = r · cos(ωt), y = r · sin(ωt).",
    video: partiGirandoVideo,
    poster: "/posters/partiGirando.jpg",
    bg: "#14532D",
    panel: "#16A34A",
    accent: "#BBF7D0",
    topic: "tema-1",
    link: "#",
  },
  {
    title: "Bubble Shooter",
    category: "Tema 1 · Vectores y disparo",
    description:
      "Este ejercicio aplica vectores para controlar dirección y velocidad en un disparo. Cada bola tiene una posición y una velocidad representadas como vectores; el módulo |v| indica la rapidez y la dirección marca hacia dónde avanza. El desplazamiento se actualiza con la idea básica p' = p + v · Δt. Si se apunta hacia un objetivo, la dirección puede obtenerse con el vector que va desde el lanzador hasta el punto de mira y normalizarse para conservar solo la dirección. El vídeo muestra cómo las operaciones vectoriales del tema permiten crear un movimiento interactivo y predecible.",
    model: "Movimiento vectorial: dirección = objetivo - origen, normalización d = v / |v| y actualización p' = p + v · Δt.",
    video: bubbleShooterVideo,
    poster: "/posters/bubbleshooter.jpg",
    bg: "#7C2D12",
    panel: "#EA580C",
    accent: "#FED7AA",
    topic: "tema-1",
    link: "#",
  },
  {
    title: "Viento",
    category: "Tema 2 · Atracción entre partículas",
    description:
      "Este vídeo muestra un sistema de partículas que se atraen entre sí mediante una fuerza. Cada partícula tiene posición, velocidad y aceleración, y su movimiento se entiende con la Segunda Ley de Newton: F = m · a. La atracción depende de la dirección que une unas partículas con otras, por lo que cada una recibe una fuerza resultante que modifica su trayectoria. Si la fuerza aumenta al estar cerca o disminuye con la distancia, el sistema forma agrupaciones, órbitas o movimientos colectivos. La práctica sirve para ver cómo una regla sencilla de atracción genera comportamiento emergente en todo el conjunto.",
    model: "Sistema de partículas con atracción: Fresultante = ΣFi, a = F / m, v' = v + a · Δt y p' = p + v' · Δt.",
    video: vientoVideo,
    poster: "/posters/viento.jpg",
    bg: "#063F46",
    panel: "#0E9FAE",
    accent: "#4DFFBE",
    topic: "tema-2",
    link: "#",
  },
  {
    title: "Emisores",
    category: "Tema 2 · Sistemas de partículas",
    description:
      "El emisor genera partículas nuevas a lo largo del tiempo, cada una con un estado propio: posición inicial, velocidad, aceleración, masa y tiempo de vida. El funcionamiento se basa en actualizar el sistema por pasos: primero se crean partículas, después se aplican fuerzas y finalmente se elimina o atenúa lo que ya ha agotado su vida útil. La fórmula básica del movimiento es v' = v + a · Δt y p' = p + v' · Δt. El vídeo enseña cómo muchas partículas simples, al combinarse, producen un comportamiento visual complejo.",
    model: "Emisor de partículas: estado individual (p, v, a, vida), integración v' = v + a · Δt, p' = p + v' · Δt y eliminación por tiempo de vida.",
    video: emisoresVideo,
    poster: "/posters/emisores.jpg",
    bg: "#35125C",
    panel: "#7C3AED",
    accent: "#F0ABFC",
    topic: "tema-2",
    link: "#",
  },
  {
    title: "Fuego con emisor",
    category: "Tema 2 · Partículas y vida útil",
    description:
      "Esta práctica usa un emisor para construir un efecto de fuego. Las partículas nacen cerca de una zona de emisión, ascienden por una fuerza vertical o flotabilidad y van cambiando durante su vida: pueden reducir tamaño, perder opacidad o variar de color para simular calor y disipación. Físicamente se interpreta como un sistema donde cada partícula integra fuerzas sencillas en el tiempo, mientras el conjunto crea la ilusión de llama. La clave está en combinar dirección inicial, aceleración ascendente, turbulencia y desaparición progresiva.",
    model: "Partículas con fuerza ascendente: a = F / m, vida útil decreciente, variación de tamaño/color/opacidad y actualización p' = p + v' · Δt.",
    video: fuegoEmisorVideo,
    poster: "/posters/fuegoEmisor.jpg",
    bg: "#7C2D12",
    panel: "#EA580C",
    accent: "#FED7AA",
    topic: "tema-2",
    link: "#",
  },
  {
    title: "Partícula flotante",
    category: "Tema 2 · Fuerzas equilibradas",
    description:
      "La partícula flotante representa un cuerpo sometido a varias fuerzas que se compensan parcialmente. La gravedad tira hacia abajo, mientras una fuerza ascendente, parecida al empuje o flotabilidad, evita que caiga sin control. Cuando la fuerza resultante no es cero, aparece aceleración; cuando las fuerzas se equilibran, la partícula mantiene un movimiento suave o queda cerca de una posición estable. El vídeo ilustra la relación entre fuerza neta, aceleración y estabilidad, mostrando cómo pequeños cambios producen oscilaciones o deriva.",
    model: "Equilibrio de fuerzas: Fresultante = Fflotación - Fgravedad - Famortiguación; si Fresultante ≠ 0, a = Fresultante / m.",
    video: particulaFlotanteVideo,
    poster: "/posters/particulaFlotante.jpg",
    bg: "#0F3A5F",
    panel: "#2563EB",
    accent: "#BAE6FD",
    topic: "tema-2",
    link: "#",
  },
  {
    title: "Simulación de tela",
    category: "Tema 3 · Malla masa-muelle 2D",
    description:
      "Esta práctica representa una tela como un objeto deformable: una malla 2D formada por partículas con masa conectadas mediante muelles sin masa. Cada muelle intenta recuperar su longitud de reposo siguiendo la Ley de Hooke, F = -k · x, donde x es la extensión respecto a la distancia natural. A esa fuerza interna se le puede añadir amortiguación, F = -c · (vi - vvecino), para reducir vibraciones. La tela cae por gravedad, se deforma al acumular fuerzas en sus vértices y colisiona con la esfera, de modo que la malla se adapta y se desliza alrededor del obstáculo.",
    model: "Malla masa-muelle 2D: Fmuelle = -k · x, x = d - Lreposo, amortiguación Fd = -c · (vi - vvecino), gravedad y colisión con esfera.",
    video: telaBolaVideo,
    poster: "/posters/tela.jpg",
    bg: "#18206F",
    panel: "#2563EB",
    accent: "#93C5FD",
    topic: "tema-3",
    link: "#",
  },
  {
    title: "Banderas físicas",
    category: "Tema 3 · Viento y estructuras de malla",
    description:
      "Las banderas muestran una malla masa-muelle 2D visualizada en 3D. Algunos vértices quedan anclados para simular el mástil, mientras el resto responde a fuerzas internas y externas. En el tema se distinguen muelles structured, que dan estabilidad básica; shear, que transmiten energía en diagonal; y bend, que reducen arrugas excesivas. El viento actúa como una fuerza externa proporcional a la orientación de la superficie, normalmente relacionada con el producto escalar entre el vector viento y la normal de la malla. Así se comparan deformación, ondas y estabilidad según la estructura usada.",
    model: "Banderas masa-muelle: muelles structured, shear y bend; viento proporcional a wind · normal; vértices anclados y suma de fuerzas por partícula.",
    video: banderasVideo,
    poster: "/posters/banderas.jpg",
    bg: "#064E3B",
    panel: "#10B981",
    accent: "#A7F3D0",
    topic: "tema-3",
    link: "#",
  },
  {
    title: "Simulación de pelo",
    category: "Tema 3 · Masa-muelle 1D",
    description:
      "El pelo parte del modelo de cuerda masa-muelle 1D. Cada mechón se entiende como una cadena de partículas conectadas por muelles: las partículas interiores reciben fuerzas de sus vecinas, se integra su aceleración y se actualizan velocidad y posición. La rigidez k controla cuánto se resiste el pelo a estirarse, la masa afecta a la inercia y la amortiguación evita que oscile sin parar. Al tener muchos mechones con longitudes o pequeñas variaciones, el conjunto produce un comportamiento orgánico: caída por gravedad, recuperación elástica e interacción al levantar o estirar el pelo.",
    model: "Cadena masa-muelle 1D: cada segmento aplica F = -k · x y Fd = -c · Δv; integración de aceleración, velocidad y posición en cada partícula.",
    video: hairSimulationVideo,
    poster: "/posters/pelo.jpg",
    bg: "#7C2D12",
    panel: "#F97316",
    accent: "#FFEDD5",
    topic: "tema-3",
    link: "#",
  },
];

const LABS: Array<{
  id: LabId;
  label: string;
  title: string;
  objective: string;
  formulation: string;
  scenario: string;
  demos: LabDemo[];
}> = [
  {
    id: "practica-1",
    label: "Práctica 1",
    title: "Métodos de integración numérica",
    objective:
      "Simular un fenómeno físico simple derivando sus ecuaciones diferenciales y comparar el comportamiento de distintos integradores numéricos: Euler explícito, Euler semi-implícito, Heun, RK2 y RK4.",
    formulation:
      "El escenario principal es un péndulo elástico bidimensional con fuerza elástica, peso y fricción lineal. Se acumulan fuerzas con Ftotal = Fe + Fw + Fd, se obtiene a = Ftotal / m y se integra el estado con métodos numéricos.",
    scenario:
      "Una partícula queda unida a un punto fijo mediante un muelle de longitud de reposo l0. La gravedad estira el sistema, el muelle intenta recuperar el equilibrio y la fricción disipa energía para analizar estabilidad y convergencia.",
    demos: [
      {
        title: "Péndulo elástico 2D",
        category: "P1 · Integradores",
        description:
          "Vídeo de la partícula suspendida de un punto fijo mediante un muelle. Permite observar cómo el sistema oscila, pierde energía por fricción y depende del integrador usado para avanzar el tiempo.",
        model:
          "Fe = -Ke · (L - l0) · dir, Fw = m · g, Fd = -Kd · v, a = Ftotal / m. Integración temporal con Euler explícito, semi-implícito, Heun, RK2 y RK4.",
        video: ej1P1Video,
        accent: "#7CF7FF",
      },
      {
        title: "Tiro parabólico",
        category: "P1 · Ejercicio 2",
        description:
          "Simulación del movimiento de un proyectil lanzado con una velocidad inicial inclinada. El vídeo muestra cómo la componente horizontal avanza de forma uniforme mientras la componente vertical cambia por la aceleración de la gravedad, generando una trayectoria parabólica.",
        model:
          "Movimiento bajo gravedad constante: ax = 0, ay = g, vx(t) = v0x, vy(t) = v0y + g · t, x(t) = x0 + v0x · t, y(t) = y0 + v0y · t + 1/2 · g · t². El estado se actualiza con los integradores numéricos de la práctica.",
        video: tiroParabolicoVideo,
        accent: "#7CF7FF",
      },
    ],
  },
  {
    id: "practica-2",
    label: "Práctica 2",
    title: "Sistemas de partículas",
    objective:
      "Implementar y analizar sistemas con muchas partículas que interactúan entre sí, incluyendo atracción eléctrica, viento, fricción, colisiones y gestión eficiente de vecindarios.",
    formulation:
      "En el problema de partículas cargadas se usa |Fe| = Ka · qi · qj / d, fricción cuadrática y viento dependiente de la velocidad relativa. En el fluido se aplican gravedad, restitución en paredes y muelles asimétricos de colisión entre partículas.",
    scenario:
      "La práctica se divide entre un sistema de partículas cargadas con atracción y viento, y un recipiente donde muchas partículas colisionan para comportarse como un fluido aceitoso usando grid o hash para acelerar la detección de contactos.",
    demos: [
      {
        title: "Partículas cargadas y viento",
        category: "P2 · Problema 1",
        description:
          "Sistema de partículas con masas y cargas aleatorias. Las partículas se atraen entre sí, tienen tiempo de vida y además reciben una fuerza de viento basada en la velocidad relativa.",
        model:
          "|Fe| = Ka · qi · qj / d, Fd cuadrática, Fviento según velocidad relativa, Fresultante = ΣF, a = F / m e integración con Euler semi-implícito.",
        video: vientoVideo,
        accent: "#4DFFBE",
      },
      {
        title: "Fluido con partículas",
        category: "P2 · Problema 2",
        description:
          "Simulación de un conjunto de partículas dentro de un recipiente. Las partículas caen por gravedad, chocan con paredes y entre ellas, y se agrupan espacialmente para mejorar el coste de las colisiones.",
        model:
          "Colisión pared-partícula con coeficiente de restitución Cr; colisión partícula-partícula mediante muelle repulsivo asimétrico activado a distancia dm; gestión de vecinos con grid o hash.",
        video: ej2P2Video,
        accent: "#4DFFBE",
      },
    ],
  },
  {
    id: "practica-3",
    label: "Práctica 3",
    title: "Objetos deformables",
    objective:
      "Preparar la simulación de objetos no rígidos mediante dos enfoques: un modelo dinámico basado en fuerzas elásticas y un modelo cinemático basado en propagación de perturbaciones.",
    formulation:
      "El modelo masa-muelle usa |Fe| = Ke · (l - l0) - Kd · dl/dt. La malla puede combinar conexiones STRUCTURAL, SHEAR y BEND para controlar estabilidad, deformación diagonal y resistencia a arrugas.",
    scenario:
      "El escenario propuesto es una portería formada por mallas rectangulares de nodos unidos por muelles, sobre la que impacta una pelota. Los vídeos muestran el ejercicio 1: deformación dinámica de la red y respuesta elástica de la malla.",
    demos: [
      {
        title: "Red deformable",
        category: "P3 · Ejercicio 1",
        description:
          "Primera demostración del objeto deformable: una malla de nodos conectados por muelles que conserva su forma general pero se deforma cuando recibe fuerzas externas.",
        model:
          "|Fe| = Ke · (l - l0) - Kd · dl/dt. Los nodos acumulan fuerzas de los muelles estructurales, diagonales y de flexión, y después se integra posición y velocidad.",
        video: practica3Video1,
        accent: "#FFE66D",
      },
      {
        title: "Impacto sobre la portería",
        category: "P3 · Ejercicio 1",
        description:
          "Segunda demostración del mismo modelo, centrada en la interacción entre la pelota y la red. La malla absorbe el impacto, oscila y recupera parcialmente su configuración.",
        model:
          "Colisión pelota-malla con respuesta elástica: la deformación depende de Ke, Kd, masa de los nodos, gravedad y velocidad inicial de la pelota.",
        url: "https://www.youtube.com/watch?v=BSllYHXNvrQ",
        accent: "#FFE66D",
      },
      {
        title: "Ondas",
        category: "P3 · Ejercicio 2",
        description:
          "Enlace al ejercicio de ondas, donde el objeto deformable se estudia desde un modelo cinemático: la perturbación se propaga por el medio sin calcular fuerzas elásticas nodo a nodo.",
        model:
          "Modelo de onda: propagación temporal de una perturbación sobre una geometría, controlando amplitud, frecuencia, fase y velocidad de propagación.",
        url: "https://www.youtube.com/watch?v=v9AREArOS90",
        accent: "#FFE66D",
      },
    ],
  },
  {
    id: "practica-4",
    label: "Práctica 4",
    title: "Sólidos rígidos",
    objective:
      "Comprender el uso de motores físicos 2D para construir escenas con cuerpos rígidos sometidos a gravedad, fricción, contactos, torques y restricciones.",
    formulation:
      "La práctica usa Fisica, wrapper de Box2D en Processing. Los cuerpos rígidos tienen masa, volumen, velocidad lineal y angular; pueden recibir fuerzas y torques, y conectarse mediante joints.",
    scenario:
      "Las actividades incluyen apilamiento estable de cuerpos, torres de rectángulos, recorridos con obstáculos y conservación del momento angular en cuerpos unidos por una varilla o joint.",
    demos: [
      {
        title: "Carrera de canicas",
        category: "P4 · Sólidos rígidos",
        description:
          "Escenario de cuerpos rígidos en el que varias canicas descienden por un recorrido con obstáculos. La simulación permite observar cómo la gravedad acelera los cuerpos, cómo las colisiones modifican su trayectoria y cómo el rozamiento y la restitución influyen en la pérdida o conservación de energía.",
        model:
          "Modelo Box2D/Fisica: cuerpos circulares con masa, velocidad lineal y angular, gravedad constante, contactos con normales de colisión, coeficiente de restitución para el rebote y fricción para disipar energía durante el contacto.",
        video: carreraCanicasVideo,
        accent: "#F0ABFC",
      },
    ],
  },
];

export default function PortfolioVideoCarousel() {
  const [page, setPage] = useState<Page>("inicio");

  return (
    <main className="min-h-screen bg-[#0f1115] text-black">
      <MainNavbar page={page} setPage={setPage} />
      <div className="h-[88px]" aria-hidden="true" />

      {page === "inicio" && <InicioPage setPage={setPage} />}
      {page === "videos" && <VideosPage />}
      {page === "labs" && <LabsPage />}
    </main>
  );
}

function MainNavbar({
  page,
  setPage,
}: {
  page: Page;
  setPage: (page: Page) => void;
}) {
  const items: { id: Page; label: string }[] = [
    { id: "inicio", label: "Inicio" },
    { id: "videos", label: "Vídeos" },
    { id: "labs", label: "Labs" },
  ];

  const isDark = page === "inicio" || page === "videos" || page === "labs";

  return (
    <header className="fixed inset-x-0 top-0 z-[120] bg-[#0f1115]/35 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-8">
        <button type="button" onClick={() => setPage("inicio")} className="flex min-w-0 items-center gap-3 text-left">
          <img
            src="/carlos-logo.png"
            alt=""
            className="h-14 w-14 shrink-0 object-contain drop-shadow-[0_12px_28px_rgba(34,211,238,0.28)] sm:h-16 sm:w-16"
          />

          <span className="min-w-0">
            <span
              className={`block truncate text-[15px] font-black uppercase leading-none tracking-[0.16em] drop-shadow-md sm:text-lg ${
                isDark ? "text-white" : "text-black"
              }`}
              style={{ fontFamily: "Anton, sans-serif" }}
            >
              Carlos López
            </span>

            <span
              className={`mt-1 block truncate text-[15px] font-black uppercase leading-none tracking-[0.18em] drop-shadow-md sm:text-lg ${
                isDark ? "text-cyan-100" : "text-black/70"
              }`}
              style={{ fontFamily: "Anton, sans-serif" }}
            >
              Delicado
            </span>
          </span>
        </button>

        <nav
          aria-label="Navegación principal"
          className={`flex shrink-0 rounded-full border p-1 shadow-2xl backdrop-blur-2xl ${
            isDark
              ? "border-cyan-100/25 bg-white/16 shadow-cyan-500/10"
              : "border-black/10 bg-white/75 shadow-black/10"
          }`}
        >
          {items.map((item) => {
            const active = page === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => setPage(item.id)}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-[11px] font-black uppercase tracking-[0.12em] transition sm:px-5 sm:text-xs ${
                  active
                    ? isDark
                      ? "bg-[#FFE66D] text-[#111317]"
                      : "bg-black text-white shadow-lg"
                    : isDark
                      ? "text-white/78 hover:bg-cyan-300/15 hover:text-white"
                      : "text-black/55 hover:bg-black/5 hover:text-black"
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function InicioPage({ setPage }: { setPage: (page: Page) => void }) {
  const featured = PROJECTS.find((project) => project.title === "Banderas físicas") ?? PROJECTS[0];
  const previewProjects = [
    PROJECTS.find((project) => project.title === "Función oscilatoria"),
    PROJECTS.find((project) => project.title === "Viento"),
    PROJECTS.find((project) => project.title === "Simulación de tela"),
  ].filter(Boolean) as ProjectVideo[];

  return (
    <section className="relative min-h-[calc(100vh-73px)] overflow-hidden bg-[#101217] text-white">
      <InicioBackground />

      <div className="relative z-10 mx-auto grid min-h-[calc(100vh-73px)] max-w-7xl items-center gap-10 px-5 py-10 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14 lg:py-12">
        <div className="pt-2">
          <h1
            className="max-w-4xl text-[clamp(3.2rem,13vw,7.3rem)] uppercase leading-[0.86] text-white"
            style={{ fontFamily: "Anton, sans-serif" }}
          >
            PORTFOLIO SIMULACION
          </h1>

          <p className="mt-6 max-w-2xl text-[17px] leading-8 text-white/78">
            Estudiante de Ingeniería Multimedia con interés en simulación física, diseño interactivo y visualización
            creativa. Este portfolio reúne mis vídeos y prácticas de Processing: Tema 1 Integradores, Tema 2 Sistemas
            de partículas y Tema 3 Masa muelle. Cada ficha presenta el escenario, el modelo físico empleado con sus
            fórmulas y un vídeo demostrativo breve, sin incluir código fuente.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <button
              type="button"
              onClick={() => setPage("videos")}
              className="group inline-flex items-center gap-3 rounded-full bg-[#FFE66D] px-7 py-4 text-sm font-black uppercase tracking-[0.12em] text-[#111317] shadow-2xl shadow-yellow-300/25 transition hover:scale-[1.03] hover:bg-[#FFF3A3] focus:outline-none focus:ring-4 focus:ring-yellow-200/35"
            >
              <Play className="h-4 w-4 fill-[#111317]" strokeWidth={2.4} />
              Ver vídeos
              <span className="ml-2 inline-block transition group-hover:translate-x-1">→</span>
            </button>
          </div>

          <div className="mt-9 hidden max-w-3xl gap-3 lg:grid lg:grid-cols-3">
            {TOPICS.map((topic) => (
              <InicioTopicCard
                key={topic.id}
                label={topic.label}
                count={PROJECTS.filter((project) => project.topic === topic.id).length}
                title={TOPIC_ACCENTS[topic.id].title}
                detail={TOPIC_ACCENTS[topic.id].detail}
                color={TOPIC_ACCENTS[topic.id].color}
                onClick={() => setPage("videos")}
              />
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="relative ml-auto overflow-hidden rounded-[28px] border border-white/18 bg-white/10 p-2 shadow-[0_40px_120px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:w-[94%] lg:rotate-[-1deg] lg:rounded-[36px] lg:p-3">
            <video
              src={featured.video}
              poster={featured.poster?.startsWith("/posters/") ? undefined : featured.poster}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              className="aspect-video h-full w-full rounded-[20px] bg-black object-cover lg:rounded-[26px]"
            />

            <div className="pointer-events-none absolute inset-2 rounded-[20px] bg-gradient-to-t from-black/72 via-black/10 to-white/10 lg:inset-3 lg:rounded-[26px]" />

            <div className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4 sm:bottom-7 sm:left-7 sm:right-7">
              <div className="min-w-0">
                <p className="text-xs font-black uppercase tracking-[0.18em] text-white/60">
                  Demo destacada
                </p>

                <p className="mt-1 truncate text-2xl font-black tracking-[-0.03em] text-white sm:text-3xl">
                  {featured.title}
                </p>
              </div>

              <div className="shrink-0 rounded-full bg-white/90 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-[#111317]">
                Tema 3
              </div>
            </div>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:w-[94%] lg:ml-auto">
            {previewProjects.map((project) => (
              <InicioPreviewItem key={project.title} project={project} />
            ))}
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-3 lg:hidden">
          {TOPICS.map((topic) => (
            <InicioTopicCard
              key={topic.id}
              label={topic.label}
              count={PROJECTS.filter((project) => project.topic === topic.id).length}
              title={TOPIC_ACCENTS[topic.id].title}
              detail={TOPIC_ACCENTS[topic.id].detail}
              color={TOPIC_ACCENTS[topic.id].color}
              onClick={() => setPage("videos")}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function InicioBackground() {
  return (
    <>
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#12151d_0%,#17324a_38%,#0f5b55_72%,#171821_100%)]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-35"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.09) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.09) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />

      <div className="pointer-events-none absolute inset-x-0 top-[21%] h-px bg-gradient-to-r from-transparent via-[#7CF7FF]/50 to-transparent" />

      <div
        className="pointer-events-none absolute inset-x-0 top-[7%] flex select-none justify-center overflow-hidden text-white/[0.06]"
        style={{
          fontFamily: "Anton, sans-serif",
          fontSize: "clamp(86px, 18vw, 260px)",
          lineHeight: 1,
          textTransform: "uppercase",
        }}
      >
        SIMULATION
      </div>

      <div className="pointer-events-none absolute left-0 top-0 h-full w-full bg-[linear-gradient(to_bottom,rgba(0,0,0,0.1),transparent_24%,rgba(4,7,29,0.24))]" />
    </>
  );
}

function InicioTopicCard({
  label,
  count,
  title,
  detail,
  color,
  onClick,
}: {
  label: string;
  count: number;
  title: string;
  detail: string;
  color: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="group rounded-[18px] border border-white/18 bg-white/10 p-4 text-left shadow-xl shadow-cyan-950/20 backdrop-blur-md transition hover:-translate-y-1 hover:border-white/34 hover:bg-white/15 focus:outline-none focus:ring-4 focus:ring-white/18"
    >
      <div className="flex items-center justify-between gap-3">
        <span className="text-xs font-black uppercase tracking-[0.16em] text-white/62">{label}</span>
        <span className="text-2xl font-black text-white" style={{ color }}>
          {String(count).padStart(2, "0")}
        </span>
      </div>

      <p className="mt-4 text-sm font-black uppercase leading-5 tracking-[0.08em] text-white">{title}</p>
      <p className="mt-3 text-xs leading-5 text-white/60">{detail}</p>
    </button>
  );
}

function InicioPreviewItem({ project }: { project: ProjectVideo }) {
  const iconClass = "h-4 w-4 shrink-0";
  const Icon = project.topic === "tema-1" ? Waves : project.topic === "tema-2" ? Atom : Boxes;

  return (
    <div className="rounded-[18px] border border-white/14 bg-black/24 p-3 backdrop-blur-md">
      <div className="flex items-center gap-2 text-[11px] font-black uppercase tracking-[0.14em] text-white/58">
        <Icon className={iconClass} style={{ color: TOPIC_ACCENTS[project.topic].color }} strokeWidth={2.3} />
        {TOPIC_ACCENTS[project.topic].title}
      </div>
      <p className="mt-2 truncate text-sm font-black text-white">{project.title}</p>
    </div>
  );
}

function LabsPage() {
  const [selectedLab, setSelectedLab] = useState<LabId>("practica-1");
  const lab = LABS.find((item) => item.id === selectedLab) ?? LABS[0];
  const labProjects = lab.demos;
  const accent = LAB_ACCENTS[selectedLab].color;
  const Icon =
    LAB_ACCENTS[selectedLab].icon === "waves"
      ? Waves
      : LAB_ACCENTS[selectedLab].icon === "atom"
        ? Atom
        : LAB_ACCENTS[selectedLab].icon === "boxes"
          ? Boxes
          : Gauge;

  return (
    <section className="relative min-h-[calc(100vh-73px)] overflow-hidden bg-[#0f1115] text-white">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(135deg,#12151d_0%,#17324a_38%,#0f5b55_72%,#171821_100%)]" />
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
        }}
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-[7%] z-[1] flex select-none justify-center overflow-hidden text-white/[0.06]"
        style={{
          fontFamily: "Anton, sans-serif",
          fontSize: "clamp(86px, 18vw, 260px)",
          lineHeight: 1,
          textTransform: "uppercase",
        }}
      >
        LABS
      </div>
      <div className="pointer-events-none absolute right-[-16vw] top-[12%] h-[48vw] max-h-[620px] min-h-[320px] w-[48vw] min-w-[320px] rounded-full blur-3xl" style={{ backgroundColor: accent, opacity: 0.28 }} />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-14">
        <header className="grid gap-6 lg:grid-cols-[0.86fr_1.14fr] lg:items-end">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-white/50">Entrega de laboratorio</p>
            <h1 className="mt-3 text-[clamp(3.2rem,11vw,7rem)] uppercase leading-[0.88] text-white" style={{ fontFamily: "Anton, sans-serif" }}>
              Labs
            </h1>
          </div>

          
        </header>

        <div className="mt-8 grid gap-6 lg:grid-cols-[300px_1fr]">
          <aside className="grid gap-3 lg:content-start">
            {LABS.map((item) => {
              const active = item.id === selectedLab;

              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSelectedLab(item.id)}
                  className={`rounded-[20px] border p-4 text-left transition ${
                    active
                      ? "border-white/36 bg-white/16 shadow-2xl shadow-black/20"
                      : "border-white/14 bg-white/8 hover:border-white/28 hover:bg-white/12"
                  }`}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-[11px] font-black uppercase tracking-[0.16em] text-white/48">{item.label}</span>
                    <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: LAB_ACCENTS[item.id].color }} />
                  </div>
                  <p className="mt-3 text-lg font-black uppercase text-white">{item.title}</p>
                  <p className="mt-2 text-xs leading-5 text-white/58">{item.objective}</p>
                </button>
              );
            })}
          </aside>

          <article className="rounded-[28px] border border-white/16 bg-white/10 p-4 shadow-2xl shadow-black/20 backdrop-blur-md sm:p-6">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-white/18 bg-black/18 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.14em] text-white/62">
                  <Icon className="h-4 w-4" style={{ color: accent }} strokeWidth={2.3} />
                  {lab.label}
                </div>
                <h2 className="mt-4 text-[clamp(2.2rem,6vw,4.4rem)] uppercase leading-none text-white" style={{ fontFamily: "Anton, sans-serif" }}>
                  {lab.title}
                </h2>
              </div>

              <div className="rounded-[18px] border border-white/16 bg-black/18 px-4 py-3 text-right">
                <p className="text-3xl font-black" style={{ color: accent }}>{String(labProjects.length).padStart(2, "0")}</p>
                <p className="text-[11px] font-black uppercase tracking-[0.14em] text-white/50">vídeos</p>
              </div>
            </div>

            <div className="mt-6 grid gap-4 lg:grid-cols-3">
              <LabTextBlock title="Objetivo" text={lab.objective} />
              <LabTextBlock title="Formulación" text={lab.formulation} />
              <LabTextBlock title="Escenario" text={lab.scenario} />
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {labProjects.length > 0 ? (
                labProjects.map((project) => <LabVideoCard key={project.title} project={project} />)
              ) : (
                <div className="rounded-[22px] border border-dashed border-white/20 bg-black/16 p-6 text-center md:col-span-2">
                  <p className="text-sm font-black uppercase tracking-[0.14em] text-white/48">Vídeos pendientes</p>
                  <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-white/68">
                    Esta práctica queda preparada con su objetivo, formulación y escenario. Los vídeos demostrativos se
                    incorporarán cuando estén disponibles.
                  </p>
                </div>
              )}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function LabTextBlock({ title, text }: { title: string; text: string }) {
  return (
    <section className="rounded-[20px] border border-white/14 bg-black/18 p-4">
      <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/44">{title}</p>
      <p className="mt-3 text-sm leading-6 text-white/72">{text}</p>
    </section>
  );
}

function LabVideoCard({ project }: { project: LabDemo }) {
  return (
    <article className="overflow-hidden rounded-[22px] border border-white/14 bg-black/20">
      {project.video ? (
        <video
          className="aspect-video w-full bg-black object-cover"
          src={project.video}
          controls
          playsInline
          preload="metadata"
        />
      ) : (
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          className="flex aspect-video w-full items-center justify-center bg-black/34 p-6 text-center transition hover:bg-black/48"
        >
          <span>
            <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#FFE66D] text-[#111317]">
              <ExternalLink className="h-5 w-5" strokeWidth={2.4} />
            </span>
            <span className="mt-4 block text-sm font-black uppercase tracking-[0.14em] text-white/72">
              Ver en YouTube
            </span>
          </span>
        </a>
      )}
      <div className="p-4">
        <p className="text-xs font-black uppercase tracking-[0.14em] text-white/42">{project.category}</p>
        <h3 className="mt-2 text-xl font-black text-white">{project.title}</h3>
        <p className="mt-3 text-sm leading-6 text-white/70">{project.model}</p>
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noreferrer"
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/18 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white/76 transition hover:bg-white/16 hover:text-white"
          >
            Abrir enlace
            <ExternalLink className="h-3.5 w-3.5" strokeWidth={2.4} />
          </a>
        )}
      </div>
    </article>
  );
}

function VideosPage() {
  const [selectedTopic, setSelectedTopic] = useState<TopicFilter>("tema-1");
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const videoRefs = useRef<Array<HTMLVideoElement | null>>([]);

  const filteredProjects = useMemo(
    () => PROJECTS.filter((project) => project.topic === selectedTopic),
    [selectedTopic]
  );

  const activeProject = filteredProjects[activeIndex] ?? filteredProjects[0];

  const projectRoles = useMemo(
    () => ({
      center: activeIndex,
      left: (activeIndex + filteredProjects.length - 1) % filteredProjects.length,
      right: (activeIndex + 1) % filteredProjects.length,
      back: (activeIndex + 2) % filteredProjects.length,
    }),
    [activeIndex, filteredProjects.length]
  );

  useEffect(() => {
    const updateMobile = () => setIsMobile(window.innerWidth < 768);

    updateMobile();
    window.addEventListener("resize", updateMobile);
    return () => window.removeEventListener("resize", updateMobile);
  }, []);

  useEffect(() => {
    PROJECTS.forEach((project) => {
      if (!project.poster) return;

      const image = new Image();
      image.src = project.poster;
    });
  }, []);

  useEffect(() => {
    videoRefs.current.forEach((video, index) => {
      if (!video) return;

      video.muted = index !== activeIndex;

      if (index !== activeIndex) {
        video.pause();
        video.currentTime = 0;
      }
    });
  }, [activeIndex, selectedTopic]);

  function changeTopic(topic: TopicFilter) {
    if (topic === selectedTopic) return;

    videoRefs.current.forEach((video) => {
      if (!video) return;

      video.pause();
      video.currentTime = 0;
    });

    setSelectedTopic(topic);
    setActiveIndex(0);
    setIsAnimating(false);
  }

  function getRole(index: number): ProjectRole {
    if (index === projectRoles.center) return "center";
    if (index === projectRoles.left) return "left";
    if (index === projectRoles.right) return "right";
    return "back";
  }

  function navigate(direction: "next" | "prev") {
    if (isAnimating || filteredProjects.length <= 1) return;

    setIsAnimating(true);
    setActiveIndex((previous) =>
      direction === "next"
        ? (previous + 1) % filteredProjects.length
        : (previous + filteredProjects.length - 1) % filteredProjects.length
    );

    window.setTimeout(() => setIsAnimating(false), 650);
  }

  function getVideoCardStyle(index: number): CSSProperties {
    const role = getRole(index);

    const base: CSSProperties = {
      position: "absolute",
      aspectRatio: "16 / 9",
      borderRadius: isMobile ? 18 : 22,
      overflow: "hidden",
      transition: `transform ${TRANSITION}, filter ${TRANSITION}, opacity ${TRANSITION}, left ${TRANSITION}, top ${TRANSITION}, width ${TRANSITION}`,
      willChange: "transform, filter, opacity, left, top, width",
    };

    if (role === "center") {
      return {
        ...base,
        left: "50%",
        top: isMobile ? "8%" : "46%",
        width: isMobile ? "96%" : "62%",
        transform: isMobile ? "translate(-50%, 0) scale(1)" : "translate(-50%, -50%) scale(1)",
        filter: "blur(0px)",
        opacity: 1,
        zIndex: 30,
        boxShadow: "0 32px 80px rgba(0,0,0,0.38)",
      };
    }

    if (role === "left") {
      return {
        ...base,
        left: isMobile ? "15%" : "18%",
        top: isMobile ? "63%" : "51%",
        width: isMobile ? "34%" : "20%",
        transform: "translate(-50%, -50%) scale(0.9)",
        filter: "blur(2px)",
        opacity: 0.58,
        zIndex: 15,
        boxShadow: "0 20px 50px rgba(0,0,0,0.22)",
      };
    }

    if (role === "right") {
      return {
        ...base,
        left: isMobile ? "85%" : "82%",
        top: isMobile ? "63%" : "51%",
        width: isMobile ? "34%" : "20%",
        transform: "translate(-50%, -50%) scale(0.9)",
        filter: "blur(2px)",
        opacity: 0.58,
        zIndex: 15,
        boxShadow: "0 20px 50px rgba(0,0,0,0.22)",
      };
    }

    return {
      ...base,
      left: "50%",
      top: isMobile ? "70%" : "64%",
      width: isMobile ? "29%" : "16%",
      transform: "translate(-50%, -50%) scale(0.76)",
      filter: "blur(5px)",
      opacity: 0.22,
      zIndex: 8,
      boxShadow: "0 18px 45px rgba(0,0,0,0.2)",
    };
  }

  return (
    <section
      className="relative min-h-[calc(100vh-73px)] w-full overflow-hidden text-white"
      style={{
        backgroundColor: activeProject.bg,
        transition: `background-color ${TRANSITION}`,
        fontFamily: "Inter, sans-serif",
      }}
    >
      <BackgroundDecorations activeProject={activeProject} />

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-73px)] max-w-7xl flex-col px-5 pb-10 pt-8 sm:px-8 sm:pt-10 lg:px-14">
        <header className="mb-4 flex justify-center text-center [&>div:first-child]:hidden [&>div:last-child>div:last-child]:hidden [&>h1]:hidden">
          <div className="inline-flex w-fit items-center gap-3 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] text-white/80 backdrop-blur-md">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: activeProject.accent }} />
            Galería de vídeos
          </div>

          <h1
            className="max-w-3xl text-[clamp(3.2rem,11vw,6.8rem)] uppercase leading-[0.92] text-white"
            style={{ fontFamily: "Anton, sans-serif" }}
          >
            Vídeos del portfolio.
          </h1>

          <div className="flex flex-col items-center gap-3">
            <TopicTabs selectedTopic={selectedTopic} onChangeTopic={changeTopic} />

            <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white/75 backdrop-blur-md">
              <span className="h-2 w-2 rounded-full bg-white" />
              {String(activeIndex + 1).padStart(2, "0")} / {String(filteredProjects.length).padStart(2, "0")}
            </div>
          </div>
        </header>

        <section className="relative mx-auto mt-1 h-[350px] w-full max-w-7xl sm:h-[430px] lg:h-[500px]">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[240px] w-[min(560px,90vw)] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-30 blur-3xl"
            style={{ backgroundColor: activeProject.accent }}
          />

          {filteredProjects.map((project, index) => {
            const role = getRole(index);
            const isCenter = role === "center";

            return (
              <article
                key={`${selectedTopic}-${project.title}`}
                style={{
                  ...getVideoCardStyle(index),
                  backgroundColor: project.panel,
                  border: isCenter ? "1px solid rgba(255,255,255,0.42)" : "1px solid rgba(255,255,255,0.14)",
                }}
                aria-hidden={!isCenter}
              >
                <div className="relative h-full w-full bg-black/10 p-1.5 sm:p-2">
                  <video
                    ref={(node) => {
                      videoRefs.current[index] = node;
                    }}
                    className="h-full w-full rounded-[12px] bg-black object-cover sm:rounded-[16px]"
                    src={project.video}
                    poster={project.poster?.startsWith("/posters/") ? undefined : project.poster}
                    controls={isCenter}
                    muted={!isCenter}
                    playsInline
                    preload="auto"
                    tabIndex={isCenter ? 0 : -1}
                  />

                  <div className="pointer-events-none absolute inset-1.5 rounded-[12px] bg-gradient-to-t from-black/42 via-black/0 to-white/8 sm:inset-2 sm:rounded-[16px]" />

                  {isCenter && (
                    <div className="pointer-events-none absolute left-3 right-3 top-3 w-fit max-w-[calc(100%-1.5rem)] rounded-full border border-white/25 bg-black/35 px-3 py-1.5 text-[11px] font-black uppercase tracking-[0.12em] text-white/90 backdrop-blur-md sm:left-4 sm:right-4 sm:top-4 sm:max-w-[calc(100%-2rem)] sm:px-4 sm:py-2 sm:text-xs">
                      {project.category}
                    </div>
                  )}

                  {!isCenter && (
                    <div className="pointer-events-none absolute inset-1.5 flex items-center justify-center rounded-[12px] bg-black/20 sm:inset-2 sm:rounded-[16px]">
                      <Play className="h-7 w-7 fill-white text-white/90 sm:h-9 sm:w-9" />
                    </div>
                  )}
                </div>
              </article>
            );
          })}

          <div className="pointer-events-none absolute inset-x-0 top-[47%] z-50 flex -translate-y-1/2 items-center justify-between px-2 sm:px-8 lg:px-14">
            <CarouselControls
              onPrevious={() => navigate("prev")}
              onNext={() => navigate("next")}
              disabled={filteredProjects.length <= 1}
            />
          </div>
        </section>

        <div className="mx-auto -mt-9 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs font-black uppercase tracking-[0.14em] text-white/75 backdrop-blur-md sm:-mt-10">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: activeProject.accent }} />
          Video {String(activeIndex + 1).padStart(2, "0")} / {String(filteredProjects.length).padStart(2, "0")}
        </div>

        <ProjectInfo project={activeProject} activeIndex={activeIndex} selectedTopic={selectedTopic} />
      </div>
    </section>
  );
}

function ProjectInfo({
  project,
  activeIndex,
  selectedTopic,
}: {
  project: ProjectVideo;
  activeIndex: number;
  selectedTopic: TopicFilter;
}) {
  const currentTopic = TOPICS.find((topic) => topic.id === selectedTopic);

  return (
    <article className="mx-auto mt-2 max-w-4xl text-center">
      <p className="hidden">
        {currentTopic?.label} · Proyecto {String(activeIndex + 1).padStart(2, "0")}
      </p>

      <h2
        className="text-[clamp(2.5rem,8vw,4rem)] uppercase leading-none text-white"
        style={{ fontFamily: "Anton, sans-serif" }}
      >
        {project.title}
      </h2>

      <div className="mx-auto mt-5 max-w-3xl rounded-[18px] border border-white/16 bg-black/18 px-5 py-4 text-left shadow-xl shadow-black/10 backdrop-blur-md">
        <p className="text-[11px] font-black uppercase tracking-[0.16em] text-white/48">Modelo físico</p>
        <p className="mt-2 text-sm leading-6 text-white/82 sm:text-[15px]">{project.model}</p>
      </div>

      <p className="mx-auto mt-4 max-w-4xl text-[15px] leading-7 text-white/76 sm:text-base sm:leading-8">
        {project.description}
      </p>
    </article>
  );
}

function BackgroundDecorations({ activeProject }: { activeProject: ProjectVideo }) {
  return (
    <>
      <div
        className="pointer-events-none absolute inset-0 z-[1]"
        style={{
          background:
            "radial-gradient(circle at 72% 34%, rgba(255,255,255,0.24), transparent 26%), radial-gradient(circle at 18% 78%, rgba(255,230,109,0.2), transparent 32%), radial-gradient(circle at 82% 82%, rgba(34,211,238,0.18), transparent 30%)",
        }}
      />

      <div
        className="pointer-events-none absolute inset-0 z-[2]"
        style={{
          opacity: 0.3,
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' opacity='0.08'/%3E%3C/svg%3E\")",
          backgroundSize: "200px 200px",
          backgroundRepeat: "repeat",
        }}
      />

      <div
        className="pointer-events-none absolute inset-x-0 top-[7%] z-[3] flex select-none justify-center overflow-hidden text-white/[0.06]"
        style={{
          fontFamily: "Anton, sans-serif",
          fontSize: "clamp(86px, 18vw, 260px)",
          lineHeight: 1,
          textTransform: "uppercase",
        }}
      >
        SIMULATION
      </div>

      <div
        className="pointer-events-none absolute right-[-12vw] top-[22%] z-[4] h-[48vw] max-h-[620px] min-h-[320px] w-[48vw] min-w-[320px] rounded-full blur-3xl"
        style={{ backgroundColor: activeProject.accent, opacity: 0.32 }}
      />
    </>
  );
}

function TopicTabs({
  selectedTopic,
  onChangeTopic,
}: {
  selectedTopic: TopicFilter;
  onChangeTopic: (topic: TopicFilter) => void;
}) {
  return (
    <nav className="rounded-full border border-white/25 bg-white/14 p-1 shadow-2xl shadow-black/20 backdrop-blur-md" aria-label="Temas">
      <div className="flex items-center gap-1">
        {TOPICS.map((topic) => {
          const isSelected = selectedTopic === topic.id;

          return (
            <button
              key={topic.id}
              type="button"
              onClick={() => onChangeTopic(topic.id)}
              aria-pressed={isSelected}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-[0.14em] transition sm:px-5 ${
                isSelected ? "bg-[#FFE66D] text-black shadow-lg shadow-yellow-300/20" : "text-white/78 hover:bg-white/14 hover:text-white"
              }`}
              title={topic.description}
            >
              {topic.label}
            </button>
          );
        })}
      </div>
    </nav>
  );
}

function CarouselControls({
  onPrevious,
  onNext,
  disabled,
}: {
  onPrevious: () => void;
  onNext: () => void;
  disabled: boolean;
}) {
  return (
    <div className="flex w-full items-center justify-between">
      <button
        type="button"
        onClick={onPrevious}
        disabled={disabled}
        className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-black/35 text-white shadow-2xl shadow-black/35 backdrop-blur-md transition hover:scale-105 hover:bg-black/55 disabled:cursor-not-allowed disabled:opacity-35 sm:h-16 sm:w-16"
        aria-label="Proyecto anterior"
      >
        <ArrowLeft size={24} strokeWidth={2.25} />
      </button>

      <button
        type="button"
        onClick={onNext}
        disabled={disabled}
        className="pointer-events-auto flex h-12 w-12 items-center justify-center rounded-full border border-white/70 bg-black/35 text-white shadow-2xl shadow-black/35 backdrop-blur-md transition hover:scale-105 hover:bg-black/55 disabled:cursor-not-allowed disabled:opacity-35 sm:h-16 sm:w-16"
        aria-label="Proyecto siguiente"
      >
        <ArrowRight size={24} strokeWidth={2.25} />
      </button>
    </div>
  );
}
