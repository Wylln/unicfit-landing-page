# Unicfit Academia — Protótipo Comercial

Site demonstrativo responsivo para apresentar a Unicfit Academia, em Macapá, e orientar visitantes até as informações de unidades, planos e contato. O projeto usa HTML, CSS e JavaScript nativos, sem etapa de compilação.

> **Protótipo demonstrativo:** informações comerciais, endereços, horários, avaliações, imagens e conteúdos de exemplo precisam ser homologados pela academia antes de uma publicação oficial.

## Recursos apresentados

- Hero de academia com identidade visual escura, destaques em roxo e azul e chamada para ação.
- Seções de modalidades e estrutura, com imagens locais do projeto.
- Cards de comunidade em estilo Instagram Reels, com links para [@unicfit_mcp](https://www.instagram.com/unicfit_mcp). Os cards são uma composição visual estática; não incorporam publicações ou vídeos ao vivo do Instagram. Números de curtidas e textos exibidos são demonstrativos.
- Apresentação de planos em cards. Nomes, condições e valores não são ofertas confirmadas; os preços aparecem como “Consulte”.
- Cartões de unidades e mini mapa incorporado do Google Maps. O navegador pode solicitar geolocalização para calcular a unidade mais próxima em Macapá, mostrar a distância aproximada e preparar uma rota. A geolocalização depende de autorização e de contexto seguro (HTTPS ou localhost).
- FAQ, menu móvel, navegação por seções e chamadas de contato demonstrativas.

## Executar localmente

1. Baixe ou clone este repositório.
2. Abra a pasta do projeto.
3. Escolha uma opção:

   - Abra `index.html` diretamente no navegador; ou
   - Inicie um servidor simples com `npx serve .` e abra o endereço informado; ou
   - Abra a pasta no VS Code e use a extensão Live Server.

O servidor local é recomendado para módulos JavaScript e para testar a geolocalização. O mapa incorporado e as fontes externas precisam de conexão com a internet. Não há dependências de projeto para instalar ou etapa de build.

## Publicar no GitHub

1. Crie um repositório no GitHub.
2. Envie os arquivos deste projeto para o repositório. Se estiver usando Git local, configure o remoto e envie a branch principal:

   ```bash
   git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
   git push -u origin main
   ```

   Substitua `SEU-USUARIO` e `SEU-REPOSITORIO` pelos valores reais. Caso seu branch ainda tenha outro nome, integre-o ou renomeie-o para `main` antes de seguir.

3. No GitHub, abra **Settings > Pages**.
4. Em **Build and deployment**, selecione **Deploy from a branch**.
5. Escolha a branch **main** e a pasta **/(root)**; clique em **Save**.
6. Aguarde a publicação e acesse o endereço exibido na área **Pages** das configurações.

O site usa caminhos relativos para arquivos do projeto, então pode ser servido a partir de um repositório de projeto no GitHub Pages. Links externos e recursos do Google continuam dependendo dos serviços correspondentes.

## Estrutura

```text
.
├── assets/           # Imagens e símbolo usados pelo site
├── src/
│   ├── data/          # Conteúdo demonstrativo centralizado
│   └── js/            # Interações, localização e contato
├── styles/            # Estilos e componentes responsivos
└── index.html         # Página principal
```

## Homologação antes da publicação comercial

Confirmar com o proprietário: dados oficiais de contato/WhatsApp; unidades ativas, endereços e horários; coordenadas do mapa; modalidades e serviços; planos, preços, taxas e condições; avaliações e métricas; identidade visual e logotipo oficiais; atualidade e autorização de uso das fotografias; autorização para uso de imagens de alunos; e conteúdo dos cards associados ao Instagram. A localização usa a permissão do visitante e não armazena sua posição.

O número de WhatsApp está intencionalmente vazio na configuração atual. Até que o contato oficial seja confirmado, as chamadas abrem uma janela demonstrativa e não enviam mensagens. Informações ilustrativas não devem ser apresentadas como dados vigentes.

