import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/LegalPage";
import { siteConfig } from "@/config/site";
import { whatsappUrl } from "@/lib/links";

export const metadata: Metadata = {
  title: "Política de privacidade",
  description: `Como o site da ${siteConfig.fullName} trata dados pessoais, em conformidade com a LGPD.`,
  alternates: { canonical: "/privacidade" },
};

export default function PrivacyPage() {
  return (
    <LegalPage title="Política de privacidade" updated="novembro de 2026">
      <p>
        Esta política explica como o site da {siteConfig.fullName} trata informações pessoais, de acordo com a Lei
        Geral de Proteção de Dados (Lei nº 13.709/2018).
      </p>

      <h2>O que coletamos</h2>
      <p>
        Este site não exige cadastro e não possui sistema de login. O formulário &ldquo;Prefere que a gente te
        chame?&rdquo; apenas monta uma mensagem com o nome e o interesse informados e abre o WhatsApp no seu
        dispositivo. Essas informações <strong>não são enviadas nem armazenadas nos servidores do site</strong>.
      </p>

      <h2>Preferências de acessibilidade</h2>
      <p>
        As escolhas feitas no painel de acessibilidade (tamanho da fonte, contraste, animações etc.) ficam salvas
        apenas no armazenamento local do seu navegador, para serem lembradas nas próximas visitas. Você pode
        apagá-las a qualquer momento restaurando o padrão no painel ou limpando os dados do site no navegador.
      </p>

      <h2>Serviços de terceiros</h2>
      <ul>
        <li>
          <strong>Google Maps:</strong> o mapa da seção de contato é carregado de servidores do Google, que podem
          coletar dados técnicos conforme a política de privacidade deles.
        </li>
        <li>
          <strong>WhatsApp e Instagram:</strong> ao clicar nesses links, você passa a ser regido pelos termos e
          políticas de cada plataforma.
        </li>
      </ul>

      <h2>Cookies e métricas</h2>
      <p>No momento, este site não utiliza cookies de publicidade nem ferramentas de análise de audiência.</p>

      <h2>Seus direitos</h2>
      <p>
        Você pode solicitar informações sobre o tratamento de seus dados, correção ou exclusão, nos termos da LGPD.
        Para isso, fale com a academia pelo{" "}
        <a href={whatsappUrl("Olá! Gostaria de falar sobre meus dados pessoais (LGPD).")} target="_blank" rel="noopener noreferrer">
          WhatsApp {siteConfig.whatsapp.display}
        </a>
        .
      </p>
    </LegalPage>
  );
}
