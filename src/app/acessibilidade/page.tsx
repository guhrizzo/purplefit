import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: "Acessibilidade",
  description: `Recursos e compromisso de acessibilidade do site da ${siteConfig.fullName}.`,
  alternates: { canonical: "/acessibilidade" },
};

export default function AccessibilityPage() {
  return (
    <LegalPage title="Acessibilidade" updated="novembro de 2026">
      <p>
        A {siteConfig.fullName} quer que todas as pessoas consigam conhecer a academia e entrar em contato. Este site
        foi construído com semântica HTML, navegação por teclado, foco visível, textos alternativos e contraste
        pensados a partir da WCAG 2.2 (nível AA), da ABNT NBR 17225:2025 e da Lei Brasileira de Inclusão (Lei nº
        13.146/2015).
      </p>

      <h2>Recursos do site</h2>
      <ul>
        <li>Link &ldquo;Pular para o conteúdo&rdquo; no início da página.</li>
        <li>Navegação completa por teclado, com indicador de foco sempre visível.</li>
        <li>Estrutura de títulos, regiões e rótulos compatível com leitores de tela.</li>
        <li>Imagens com texto alternativo e ícones decorativos ocultos para tecnologias assistivas.</li>
        <li>Botões e links com áreas de toque amplas.</li>
      </ul>

      <h2>Painel de acessibilidade</h2>
      <p>O botão fixo na lateral esquerda abre um painel que permite:</p>
      <ul>
        <li>Aumentar e diminuir o tamanho da fonte.</li>
        <li>Ativar alto contraste, contraste negativo ou escala de cinza.</li>
        <li>Destacar links, usar fonte de leitura mais acessível e ampliar o espaçamento do texto.</li>
        <li>Ativar ou desativar as animações do site.</li>
        <li>Restaurar todas as configurações ao padrão.</li>
      </ul>
      <p>
        As animações vêm ativadas por padrão e podem ser desativadas a qualquer momento no painel. As preferências
        ficam salvas neste navegador.
      </p>

      <h2>Limitações conhecidas</h2>
      <p>
        O painel é um complemento e não substitui a acessibilidade da estrutura do site. O mapa incorporado do Google
        Maps e os links para WhatsApp e Instagram pertencem a terceiros e podem ter limitações próprias. As imagens
        atuais são ilustrativas e serão substituídas por fotos reais da unidade.
      </p>

      <h2>Encontrou uma barreira?</h2>
      <p>
        Conte para a gente pelo{" "}
        <a href={whatsappUrl("Olá! Encontrei uma dificuldade de acessibilidade no site.")} target="_blank" rel="noopener noreferrer">
          WhatsApp {siteConfig.whatsapp.display}
        </a>{" "}
        e vamos corrigir.
      </p>
    </LegalPage>
  );
}
