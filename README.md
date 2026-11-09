# Rede Purple Fit Bombeiro — Site institucional

Site institucional da academia **Purple Fit Jaú – Bombeiro**, feito com Next.js 16 (App Router), React 19, TypeScript, Tailwind CSS 4, Motion e Tabler Icons.

## Rodando

```bash
npm install
npm run dev      # http://localhost:3000
npm run lint
npx tsc --noEmit
npm run build && npm start
```

Copie `.env.example` para `.env.local` e defina `NEXT_PUBLIC_SITE_URL` com o domínio final (usado em sitemap, Open Graph e dados estruturados).

## Onde editar os dados da academia

Tudo fica em [`src/config/site.ts`](src/config/site.ts): endereço, WhatsApp, Instagram, horários, convênios, modalidades, diferenciais e galeria. Os links do WhatsApp e do mapa são derivados daí (`src/lib/links.ts`).

### Dados confirmados no Instagram (@redepurplefit.bombeiro)

| Dado | Valor |
| --- | --- |
| Endereço | Av. Décio Pacheco de Almeida Prado, 285 — Jaú/SP |
| WhatsApp | (14) 99156-6068 |
| Horários | Seg–sex 05h–23h · Sáb e feriado 09h–14h · Dom 10h–12h |
| Convênios | Wellhub (Gympass) e TotalPass |
| Modalidades citadas | Musculação, Ritmosfera, Pilates, Ballet |

### Pendências (não inventadas de propósito)

- **Planos e preços**: não exibidos. Os valores do Instagram são promocionais; confirme com a academia antes de publicar.
- **Grade de aulas coletivas** (dias e horários de Ritmosfera, Pilates e Ballet).
- **CEP, e-mail e CNPJ** (para política de privacidade e dados estruturados).
- **Fotos reais da unidade**: hoje a galeria usa imagens geradas por IA e o site avisa isso. Substitua os arquivos em `public/images/` e defina `imagesAreIllustrative: false` em `site.ts`.
- **Vídeo do hero**: veja abaixo.

## Animações e acessibilidade

- **Animações ligadas por padrão**, inclusive quando o sistema pede `prefers-reduced-motion: reduce`. O Motion roda com `reducedMotion="never"` e o estado vem de um store global (`src/lib/a11y-store.ts`) exposto por contexto (`src/contexts/AccessibilityContext.tsx`).
- Todos os componentes animados (`Reveal`, `TextReveal`, `Parallax`, `Float`, `Button`, header, 404) consultam `useAnimationsEnabled()`. Desligando no painel, movimentos decorativos param e o conteúdo continua visível.
- **Painel de acessibilidade** (botão fixo à esquerda): fonte maior/menor, alto contraste, contraste negativo, escala de cinza, destacar links, fonte de leitura (Atkinson Hyperlegible), espaçamento de texto, ativar/desativar animações e restaurar padrão. Preferências persistem em `localStorage` e são aplicadas antes da primeira pintura (`src/lib/a11y-bootstrap.ts`).
- Base nativa: skip link, landmarks, foco visível, `aria-*`, diálogos com foco preso e Esc, alvos de toque de pelo menos 44px.
- O painel complementa, não substitui, a acessibilidade da estrutura. A página `/acessibilidade` descreve recursos e limitações. Uma auditoria formal (NBR 17225 / WCAG 2.2 AA) com leitor de tela real ainda deve ser feita antes de afirmar conformidade.

## Imagens e vídeo (Higgsfield)

As imagens de `public/images/` foram geradas com o Higgsfield (modelo `gpt_image_2_6`). Prompts em [`docs/higgsfield-prompts.md`](docs/higgsfield-prompts.md).

O vídeo cinematográfico do hero **não foi gerado** (custo acima do saldo disponível). O hero usa o poster `hero.webp` com parallax. Para ativar o vídeo: coloque o arquivo comprimido em `public/videos/hero.mp4` e defina `heroVideo: "/videos/hero.mp4"` em `site.ts`. O componente já cuida de poster, `preload="metadata"`, pausa quando animações estão desligadas e respeita economia de dados.

## Estrutura

```
src/
  app/            layout, page, not-found, privacidade, acessibilidade, sitemap, robots, manifest, ícones, OG
  components/
    accessibility/  painel e providers
    animations/     Reveal, TextReveal, Parallax, Float
    layout/         Header, Footer, LegalPage
    sections/       Hero, About, Structure/Gallery, Modalities, Differentials, EnrollCTA, Contact, 404
    ui/             Button, Logo, AppIcon, SectionHeading
  config/         dados da academia
  contexts/       AccessibilityContext
  hooks/          useFocusTrap, useActiveSection
  lib/            a11y-store, a11y-bootstrap, links, schema
  types/
public/{images,videos,icons,branding}
```
