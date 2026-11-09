import type {
  Differential,
  GalleryImage,
  Modality,
  NavItem,
  OpeningHours,
} from "@/types/site";

/**
 * Fonte única de dados da academia.
 * Tudo que foi confirmado no Instagram oficial (@redepurplefit.bombeiro) está aqui.
 * Para atualizar telefone, horários ou textos, edite apenas este arquivo.
 */
export const siteConfig = {
  name: "Rede Purple Fit",
  unit: "Bombeiro",
  fullName: "Rede Purple Fit Bombeiro",
  city: "Jaú",
  region: "SP",
  /** Defina NEXT_PUBLIC_SITE_URL em produção (ver .env.example). */
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
  description:
    "Academia completa em Jaú/SP com aulas inclusas e professores sempre presentes. Musculação, Ritmosfera, Pilates e Ballet. Aceitamos Wellhub (Gympass) e TotalPass.",
  tagline: "Academia completa com aulas inclusas e professores sempre presentes.",
  address: {
    street: "Av. Décio Pacheco de Almeida Prado, 285",
    neighborhood: "Bombeiro",
    city: "Jaú",
    region: "SP",
    country: "BR",
  },
  /** Número no formato internacional, sem símbolos. */
  whatsapp: {
    number: "5514991566068",
    display: "(14) 99156-6068",
    message: "Olá! Vim pelo site da Purple Fit Bombeiro e quero me matricular.",
  },
  instagram: {
    handle: "@redepurplefit.bombeiro",
    url: "https://www.instagram.com/redepurplefit.bombeiro/",
  },
  agreements: ["Wellhub (Gympass)", "TotalPass"],
  /**
   * Imagens geradas com IA (Higgsfield) enquanto não há fotos reais da unidade.
   * Troque os arquivos em /public/images e ajuste para `false` para remover o aviso.
   */
  imagesAreIllustrative: true,
  /** Caminho de um vídeo de fundo do hero (ex.: "/videos/hero.mp4"). null = apenas poster. */
  heroVideo: null as string | null,
  heroPoster: "/images/hero.webp",
} as const;

export const hours: OpeningHours[] = [
  {
    label: "Segunda a sexta",
    display: "05h às 23h",
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    opens: "05:00",
    closes: "23:00",
  },
  {
    label: "Sábado e feriado",
    display: "09h às 14h",
    days: ["Saturday"],
    opens: "09:00",
    closes: "14:00",
  },
  {
    label: "Domingo",
    display: "10h às 12h",
    days: ["Sunday"],
    opens: "10:00",
    closes: "12:00",
  },
];

export const navItems: NavItem[] = [
  { label: "Início", href: "/#inicio", id: "inicio" },
  { label: "A academia", href: "/#academia", id: "academia" },
  { label: "Estrutura", href: "/#estrutura", id: "estrutura" },
  { label: "Modalidades", href: "/#modalidades", id: "modalidades" },
  { label: "Diferenciais", href: "/#diferenciais", id: "diferenciais" },
  { label: "Contato", href: "/#contato", id: "contato" },
];

export const gallery: GalleryImage[] = [
  {
    src: "/images/estrutura-musculacao.webp",
    alt: "Salão de musculação com aparelhos alinhados e iluminação em tons de roxo",
    caption: "Salão de musculação",
    width: 1024,
    height: 688,
  },
  {
    src: "/images/halteres.webp",
    alt: "Rack de halteres cromados refletindo luz roxa",
    caption: "Área de pesos livres",
    width: 896,
    height: 1120,
  },
  {
    src: "/images/aula-coletiva.webp",
    alt: "Turma animada fazendo aula coletiva em estúdio com luzes rosa e roxa",
    caption: "Estúdio de aulas coletivas",
    width: 1024,
    height: 688,
  },
  {
    src: "/images/treinador.webp",
    alt: "Professora orientando uma aluna sorridente em um aparelho de musculação",
    caption: "Professores ao seu lado",
    width: 1024,
    height: 688,
  },
  {
    src: "/images/pilates.webp",
    alt: "Aluna praticando pilates em estúdio claro com tons lilás",
    caption: "Espaço de pilates",
    width: 896,
    height: 1120,
  },
];

export const modalities: Modality[] = [
  {
    slug: "musculacao",
    name: "Musculação",
    description:
      "Salão equipado e professores sempre presentes para orientar o seu treino, de segunda a domingo.",
    image: "/images/halteres.webp",
    alt: "Halteres cromados em um rack de academia",
    icon: "barbell",
  },
  {
    slug: "ritmosfera",
    name: "Ritmosfera",
    description:
      "Aula coletiva para treinar em grupo, no ritmo da turma e com a energia de quem está do seu lado.",
    image: "/images/aula-coletiva.webp",
    alt: "Alunos em aula coletiva animada",
    icon: "flame",
  },
  {
    slug: "pilates",
    name: "Pilates",
    description:
      "Aulas para trabalhar força, postura e consciência corporal, com acompanhamento de professores.",
    image: "/images/pilates.webp",
    alt: "Aluna praticando pilates sobre um colchonete",
    icon: "heart",
  },
  {
    slug: "ballet",
    name: "Ballet",
    description:
      "Aulas de ballet para quem quer ganhar postura, flexibilidade e coordenação com leveza.",
    image: "/images/ballet.webp",
    alt: "Aluna alongando na barra de ballet diante do espelho",
    icon: "users-group",
  },
];

export const differentials: Differential[] = [
  {
    title: "Academia completa",
    description: "Estrutura pensada para você treinar sem precisar de outro lugar.",
    icon: "building",
  },
  {
    title: "Aulas inclusas",
    description: "Aulas coletivas fazem parte da experiência na Purple Fit.",
    icon: "calendar-check",
  },
  {
    title: "Professores sempre presentes",
    description: "Orientação por perto para você treinar com segurança e confiança.",
    icon: "user-check",
  },
  {
    title: "Wellhub e TotalPass",
    description: "Seu benefício corporativo é bem-vindo na nossa recepção.",
    icon: "discount-check",
  },
  {
    title: "Horários amplos",
    description: "De segunda a sexta, abrimos às 05h e só fechamos às 23h.",
    icon: "clock",
  },
  {
    title: "Aulas para todos os gostos",
    description: "Ritmosfera, pilates e ballet além da musculação.",
    icon: "users-group",
  },
];
