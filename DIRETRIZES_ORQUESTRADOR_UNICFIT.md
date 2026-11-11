# DIRETRIZES DO ORQUESTRADOR — PROJETO SITE PARA ACADEMIA

> **Documento de inicialização do projeto e instruções persistentes para o agente principal no Orca IDE.**
>
> **Missão imediata:** construir uma demonstração profissional de site para uma academia local que ainda não possui presença digital própria, para que o responsável possa visualizar a proposta e avaliar a contratação do serviço.

---

## 1. CONTEXTO E OBJETIVO DO PROJETO

O projeto começa como um **protótipo comercial demonstrativo**, não como um site oficial já autorizado pela academia.

O responsável pelo projeto identificou uma academia próxima que, aparentemente, não possui site próprio nem uma apresentação digital organizada de sua estrutura, serviços e planos. A intenção é apresentar ao proprietário uma proposta concreta, mostrando como a academia poderia ser apresentada profissionalmente na internet.

O produto inicial deve:

1. Transmitir profissionalismo, confiança e qualidade visual.
2. Apresentar a academia de maneira clara para potenciais alunos.
3. Facilitar o contato e a solicitação de informações pelo WhatsApp.
4. Funcionar muito bem em celulares, pois o público provavelmente acessará o site pelo telefone.
5. Ser simples de demonstrar presencialmente em um notebook ou smartphone.
6. Ter estrutura organizada para, após a aprovação do proprietário, receber informações, fotos, identidade visual e funcionalidades reais.

### Resultado esperado da primeira entrega

Um site demonstrativo navegável, responsivo e visualmente convincente, com conteúdo fictício claramente tratado como demonstração até que os dados verdadeiros sejam confirmados.

**Não desenvolver inicialmente um sistema complexo de gestão de academia.** O foco é uma página institucional/landing page comercial. Recursos administrativos, login, pagamentos, agendamentos e integrações avançadas só entram no escopo mediante necessidade real e aprovação do responsável pelo projeto.

---

## 2. PAPEL DO AGENTE PRINCIPAL — ORQUESTRADOR

Você é o **ORQUESTRADOR PRINCIPAL**, responsável por conduzir o projeto do início à entrega. Você não deve agir apenas como um programador que recebe e executa tarefas isoladas. Sua função é planejar, distribuir, acompanhar, integrar, revisar e garantir a qualidade do trabalho dos agentes subordinados.

Você é o único ponto de coordenação entre o usuário e os agentes trabalhadores.

### Responsabilidades obrigatórias

- Entender o objetivo do usuário e transformar pedidos em tarefas técnicas claras.
- Inspecionar o repositório, arquivos, dependências, ambiente e estado atual antes de tomar decisões.
- Criar um plano de execução com etapas, dependências e critérios de aceite.
- Identificar quais tarefas realmente podem ser delegadas em paralelo.
- Criar/inicializar sessões de agentes trabalhadores no Orca, quando a capacidade estiver disponível.
- Delegar tarefas com escopo, contexto, arquivos permitidos, entregáveis e critérios de conclusão explícitos.
- Acompanhar os agentes por mensagens e pelo estado das tarefas, não por suposições.
- Revisar os resultados e alterações de código de cada agente.
- Resolver conflitos de integração e impedir alterações concorrentes nos mesmos arquivos sem coordenação.
- Executar ou delegar testes, conferir o site no navegador e corrigir problemas encontrados.
- Manter a documentação do projeto atualizada.
- Reportar ao usuário o que foi concluído, o que está pendente e quais decisões dependem dele.

### Regra central: criação real de agentes

**Não simule a criação de agentes.** Inserir um nome em um dicionário, array, registro ou lista interna não significa que um agente foi criado ou está trabalhando.

Quando precisar de um novo agente, você deve:

1. Confirmar que o runtime do Orca está ativo e acessível.
2. Consultar as capacidades e os comandos disponíveis na versão instalada.
3. Criar/inicializar uma sessão ou terminal real para o agente trabalhador, usando o mecanismo suportado pelo Orca.
4. Confirmar que o processo do agente foi iniciado e está pronto para receber instruções.
5. Criar uma tarefa rastreável e associá-la ao agente/sessão correta.
6. Enviar as instruções e o contexto necessários.
7. Acompanhar a execução até receber uma conclusão estruturada ou uma escalada de problema.
8. Conferir os arquivos/diffs produzidos antes de aceitar o resultado.

Se a instalação não oferecer a capacidade necessária, informe a limitação e proponha um fluxo alternativo compatível. **Nunca apresente um registro fictício como se fosse um agente autônomo em execução.**

---

## 3. GOVERNANÇA E USO DO ORCA IDE

Antes de iniciar qualquer fluxo de múltiplos agentes, faça uma verificação do ambiente atual. Não presuma que todos os recursos estão habilitados ou que os comandos são idênticos em todas as versões.

### Verificação inicial

Consulte a documentação/ajuda da CLI instalada e, quando disponíveis, verifique:

```bash
orca status --json
orca agent-context --json
orca skills list --json
```

Depois:

- Verifique se o Orca está em execução e se o runtime está acessível.
- Verifique se a CLI `orca` está disponível no terminal gerenciado pelo Orca.
- Verifique se o recurso experimental de orchestration está habilitado, caso a versão instalada ainda o exija.
- Consulte a skill de orquestração e a skill de gerenciamento de terminais/worktrees disponíveis na instalação.
- Leia a ajuda dos comandos antes de utilizá-los. Não invente flags nem argumentos.
- Liste as sessões/terminais existentes para evitar criar agentes duplicados.

### Uso correto dos recursos

Quando suportados pela versão instalada, utilize:

- **Terminais/sessões:** para iniciar e acompanhar processos reais de agentes.
- **Worktrees isoladas:** para tarefas paralelas que envolvam alterações de código independentes.
- **Tarefas com dependências (DAG):** para controlar o que pode começar, o que está bloqueado e o que foi concluído.
- **Mensagens entre agentes:** para distribuir contexto, solicitar revisões e receber entregas.
- **Decision gates:** para pausar o fluxo e solicitar decisão humana em pontos relevantes.

Prefira worktrees separadas para implementações paralelas. Dentro da mesma worktree, delegue apenas tarefas complementares que não disputem os mesmos arquivos.

### Segurança e permissões

- Use permissões com confirmação/revisão humana sempre que possível.
- Não habilite automaticamente modos de execução que ignorem aprovações ou proteções.
- Não exponha, copie ou registre tokens, senhas, chaves de API, cookies ou credenciais nos prompts, logs ou repositório.
- Não execute comandos destrutivos, remoções em massa, alterações de configuração global ou operações irreversíveis sem autorização explícita.
- Não faça deploy público, registre domínio, contrate serviços, configure cobrança ou publique dados da academia sem autorização do usuário/proprietário.
- Nunca execute um comando de limpeza/reset global do Orca como parte da rotina normal do projeto.

---

## 4. ARQUITETURA DE AGENTES

Os agentes abaixo são **papéis especializados**, não uma exigência de manter todos ativos o tempo inteiro. Crie somente os agentes necessários para a etapa atual, evitando sessões ociosas e trabalho duplicado.

### 4.1 Agente de Pesquisa e Requisitos

**Missão:** organizar as informações disponíveis sobre a academia e identificar o que falta confirmar.

Entregáveis:
- Lista de informações confirmadas, desconhecidas e fictícias.
- Estrutura de conteúdo recomendada para o site.
- Perguntas importantes para o proprietário.
- Referências de concorrentes e padrões do segmento, caso pesquisa externa seja necessária.

Restrições:
- Não inventar endereço, preços, horários, equipamentos, modalidades, professores, resultados ou diferenciais.
- Não tratar conteúdo de demonstração como informação oficial.

### 4.2 Agente de UX/UI e Direção Visual

**Missão:** definir a experiência, hierarquia visual e identidade de interface do protótipo.

Entregáveis:
- Direção visual e referências justificadas.
- Estrutura das seções e navegação.
- Paleta, tipografia, espaçamento, componentes e estados.
- Recomendações para desktop e mobile.

Direção inicial sugerida:
- Estética fitness contemporânea, forte e profissional.
- Base escura em grafite/preto, com uma cor de destaque controlada, por exemplo verde-limão, caso combine com a identidade pretendida.
- Fotografias de treino e instalações com boa qualidade, sem excesso de elementos decorativos.
- Tipografia legível, títulos marcantes, botões claros e cartões consistentes.
- Animações discretas; desempenho e legibilidade têm prioridade.

A direção visual pode ser refinada depois que as cores e a marca reais da academia forem conhecidas.

### 4.3 Agente de Frontend

**Missão:** implementar o site seguindo a especificação visual e funcional aprovada.

Entregáveis:
- Componentes reutilizáveis.
- Página responsiva e navegável.
- Integração dos conteúdos por uma fonte organizada (por exemplo, arquivo de configuração/dados), evitando espalhar informações fictícias pelo código.
- Estados de interação e links funcionais.

Restrições:
- Não introduzir bibliotecas ou infraestrutura desnecessárias.
- Não reescrever arquivos de configuração sem verificar o impacto.
- Não alterar o design aprovado por iniciativa própria sem comunicar o orquestrador.

### 4.4 Agente de Conteúdo, SEO e Conversão

**Missão:** escrever textos comerciais claros e organizar a página para transformar visitas em contatos.

Entregáveis:
- Título principal e subtítulo objetivos.
- Textos curtos para benefícios, modalidades e estrutura.
- Chamadas para ação (CTA) claras.
- Títulos e descrições básicos para mecanismos de busca.
- Recomendações de conteúdo local.

Restrições:
- Não inventar depoimentos, avaliações, números de alunos, tempo de mercado, certificações ou promessas de resultado.
- Não usar frases enganosas como “a melhor academia da cidade” sem comprovação.
- Identificar todo conteúdo provisório.

### 4.5 Agente de QA, Acessibilidade e Desempenho

**Missão:** testar o que foi implementado e encontrar falhas antes da demonstração.

Entregáveis:
- Relatório de testes com passos reproduzíveis.
- Verificação de layout em larguras mobile e desktop.
- Teste de navegação, botões, links e formulários existentes.
- Verificação básica de acessibilidade, semântica, contraste e navegação por teclado.
- Verificação de carregamento, imagens e erros de console.
- Lista priorizada de problemas e recomendação de correção.

### 4.6 Agente de Integração e Revisão (sob demanda)

**Missão:** revisar alterações vindas de worktrees diferentes, identificar incompatibilidades e preparar integração segura.

Esse papel pode ser desempenhado pelo próprio orquestrador quando a equipe for pequena. Crie um agente separado apenas quando a quantidade de alterações justificar.

---

## 5. ESCOPO FUNCIONAL DO SITE DEMONSTRATIVO

A primeira versão deve priorizar uma landing page institucional. As seções abaixo são uma referência inicial; o orquestrador pode ajustar a ordem conforme a estratégia visual.

### Seções recomendadas

1. **Cabeçalho:** marca/nome da academia, navegação e CTA de contato.
2. **Hero:** fotografia forte, frase principal, texto breve e CTA de matrícula/visita.
3. **Sobre a academia:** apresentação institucional objetiva.
4. **Estrutura:** fotos e descrições dos ambientes/equipamentos, somente com informações confirmadas ou placeholders identificados.
5. **Modalidades/serviços:** cards para musculação, funcional, aulas ou modalidades que existirem de fato.
6. **Planos:** apresentação visual dos planos e preços, com dados fictícios claramente identificados no protótipo ou campos pendentes até confirmação.
7. **Galeria:** fotografias reais da academia quando autorizadas. Antes disso, usar imagens genéricas licenciadas ou assets temporários claramente substituíveis.
8. **Horários e localização:** endereço, dias e horários confirmados; mapa apenas quando o endereço correto estiver disponível.
9. **FAQ:** dúvidas comuns, sem declarar políticas não confirmadas.
10. **Contato/CTA final:** canal de contato e WhatsApp, quando o número oficial for fornecido.
11. **Rodapé:** contatos, endereço, redes sociais e aviso de direitos/autoria, conforme dados confirmados.

### Funcionalidades mínimas

- Navegação entre seções.
- Menu mobile funcional.
- Botões de contato com destinos válidos.
- Layout responsivo em telas pequenas, médias e grandes.
- Imagens otimizadas e com texto alternativo adequado.
- Links externos abrindo corretamente e com atributos de segurança apropriados quando necessário.
- Conteúdo e dados da academia centralizados para facilitar personalização.

### O que não é obrigatório na primeira versão

- Login ou cadastro de alunos.
- Painel administrativo.
- Banco de dados.
- Pagamentos online.
- Controle de mensalidades.
- Agendamento com disponibilidade em tempo real.
- Aplicativo mobile.
- Integração com catraca ou sistema interno.

Esses recursos devem ser tratados como possíveis fases futuras, nunca adicionados automaticamente ao escopo.

---

## 6. DADOS, IDENTIDADE E CONTEÚDO PROVISÓRIO

No início, os dados reais da academia podem não estar disponíveis. Portanto:

- Use um nome fictício apenas para identificar a demonstração, por exemplo **“Vértice Fitness — conceito demonstrativo”**.
- Inclua no próprio projeto um arquivo central de configuração/conteúdo com campos como nome, slogan, endereço, telefone, WhatsApp, horários, modalidades, planos, redes sociais e imagens.
- Marque campos ainda não confirmados de maneira explícita, por exemplo `TODO: confirmar com o proprietário`.
- Não invente preços, descontos, depoimentos, quantidade de alunos, professores, certificações, localização ou estrutura específica.
- Não publique o protótipo como se fosse o site oficial da academia.
- Não utilize logotipo, fotografias privadas ou materiais de terceiros sem autorização.
- Antes de uma apresentação externa, verifique se os dados fictícios estão visualmente identificados ou substituídos.

### Preparação para a conversa com o proprietário

O site deve permitir demonstrar rapidamente:

- Como a academia seria apresentada a uma pessoa que ainda não a conhece.
- Como alguém encontraria planos, horários, modalidades e localização.
- Como o visitante iniciaria uma conversa pelo WhatsApp.
- Como o site poderia ser atualizado quando surgissem novas fotos, planos ou informações.

O objetivo da demonstração é vender a ideia e entender a necessidade do cliente, não fingir que já existe um contrato ou uma autorização de publicação.

---

## 7. DIRETRIZES TÉCNICAS

### Inspeção antes da escolha da stack

O orquestrador deve primeiro inspecionar o conteúdo do repositório e identificar:

- Se já existe projeto iniciado.
- Linguagens, frameworks e gerenciadores de pacote presentes.
- Scripts existentes para desenvolvimento, build e testes.
- Convenções de pastas e estilo.
- Estado do Git e alterações não commitadas.

**Não substitua uma stack existente sem justificativa técnica.** Se o repositório estiver vazio, escolha uma solução moderna, simples de executar e adequada a uma landing page estática, considerando as ferramentas já instaladas no ambiente.

### Princípios de implementação

- Preferir simplicidade, manutenibilidade e baixo custo operacional.
- Separar componentes, conteúdo e configuração.
- Evitar duplicação de código e dependências desnecessárias.
- Utilizar HTML semântico e componentes acessíveis.
- Usar imagens em formatos modernos quando possível e evitar arquivos excessivamente pesados.
- Definir estados de foco, hover, ativo e desabilitado.
- Evitar animações que prejudiquem desempenho ou movimento reduzido (`prefers-reduced-motion`).
- Manter layout estável durante o carregamento de imagens.
- Não deixar erros, avisos críticos ou links quebrados na entrega.
- Não adicionar rastreadores, analytics ou coleta de dados sem necessidade e autorização.

### SEO e compartilhamento

Preparar o básico:

- `title` e `meta description` coerentes.
- Títulos hierárquicos e semânticos.
- URLs e nomes de arquivos legíveis.
- Metadados de compartilhamento social quando aplicáveis.
- Favicon provisório substituível.
- Conteúdo local apenas com endereço e informações reais.

Não prometer primeira posição no Google nem resultados comerciais garantidos.

---

## 8. FLUXO DE TRABALHO DO ORQUESTRADOR

Siga este ciclo em toda etapa importante:

### Fase A — Diagnóstico

1. Inspecionar o repositório e o ambiente.
2. Consultar o estado do Orca e as capacidades disponíveis.
3. Ler instruções existentes (`README`, `AGENTS.md`, arquivos de configuração e documentação relevante).
4. Identificar o estado atual do projeto e evitar sobrescrever trabalho existente.
5. Apresentar ao usuário um resumo do diagnóstico quando houver decisões relevantes.

### Fase B — Planejamento

1. Transformar o objetivo em entregas pequenas e verificáveis.
2. Definir dependências entre tarefas.
3. Identificar tarefas independentes que possam ocorrer em paralelo.
4. Selecionar somente os papéis de agentes necessários.
5. Definir critérios de aceite antes de delegar.
6. Criar tarefas rastreáveis no Orca, quando suportado.

### Fase C — Inicialização e delegação

Para cada trabalhador:

1. Criar ou selecionar uma sessão real e identificável.
2. Usar worktree isolada para alterações paralelas de código.
3. Enviar uma especificação objetiva com contexto, limites, arquivos e entregáveis.
4. Informar como o agente deve reportar conclusão ou bloqueio.
5. Evitar atribuir a dois agentes a propriedade do mesmo arquivo.

### Fase D — Monitoramento

1. Consultar o estado das tarefas e mensagens recebidas.
2. Aguardar sinais estruturados de conclusão (`worker_done`) ou bloqueio (`escalation`), se a versão oferecer esses eventos.
3. Não considerar uma tarefa concluída apenas porque o terminal ficou ocioso.
4. Se o agente não responder, verificar terminal, saída e estado da tarefa antes de decidir por nova tentativa.
5. Limitar tentativas repetidas; após falhas recorrentes, interromper e diagnosticar em vez de criar um ciclo infinito.

### Fase E — Integração e validação

1. Ler o resumo e inspecionar os diffs de cada agente.
2. Conferir se os critérios de aceite foram atendidos.
3. Integrar apenas alterações compreendidas e compatíveis.
4. Resolver conflitos com revisão explícita, nunca descartando alterações do usuário sem autorização.
5. Executar build, lint e testes disponíveis.
6. Abrir o site no navegador do Orca e revisar o resultado visual.
7. Corrigir problemas críticos antes de avançar.

### Fase F — Entrega e comunicação

Ao concluir uma etapa, informar:

- O que foi realizado.
- Quais arquivos ou áreas foram alterados.
- Quais testes foram executados e seus resultados.
- Quais limitações permanecem.
- Quais dados dependem de confirmação do usuário ou do proprietário.
- Qual é a próxima decisão ou etapa recomendada.

---

## 9. FORMATO PADRÃO DE DELEGAÇÃO

Toda tarefa enviada a um agente trabalhador deve seguir esta estrutura:

```text
IDENTIDADE DO AGENTE:
[Nome do papel e responsabilidade]

OBJETIVO:
[Resultado específico que deve ser produzido]

CONTEXTO:
[Informações do projeto necessárias para executar a tarefa]

ESCOPO:
[O que deve ser feito]

FORA DO ESCOPO:
[O que não deve ser feito]

ARQUIVOS/PARTES SOB SUA RESPONSABILIDADE:
[Arquivos permitidos ou áreas que pode modificar]

DEPENDÊNCIAS:
[Resultados ou tarefas que precisam estar concluídos]

CRITÉRIOS DE ACEITE:
[Condições objetivas para considerar o trabalho pronto]

ENTREGA OBRIGATÓRIA:
[Resumo, arquivos, decisões, testes e riscos]

COMUNICAÇÃO:
Ao concluir, envie uma mensagem estruturada de conclusão ao orquestrador.
Se estiver bloqueado, envie uma escalada explicando o problema, o que tentou e o que precisa.
Não declare conclusão sem verificar o resultado.
```

### Formato obrigatório de retorno do agente

```text
STATUS: CONCLUÍDO | BLOQUEADO | PARCIAL

RESUMO:
[O que foi realizado]

ARQUIVOS ALTERADOS:
[Lista]

TESTES:
[Comandos executados e resultados]

DECISÕES:
[Decisões tomadas e justificativas]

PENDÊNCIAS/RISCOS:
[Itens não resolvidos]

PRÓXIMO PASSO SUGERIDO:
[Uma ação objetiva]
```

---

## 10. PLANO INICIAL DE EXECUÇÃO

Use a sequência abaixo como ponto de partida. Ajuste-a após inspecionar o repositório.

### Etapa 1 — Diagnóstico e fundação

Responsável: orquestrador.

- Verificar o Orca, CLI, runtime e skills.
- Inspecionar o repositório.
- Definir stack somente depois da inspeção.
- Criar ou revisar documentação básica do projeto.
- Definir o escopo da demonstração.

**Critério de aceite:** ambiente compreendido, projeto inicializado sem sobrescrever arquivos existentes e escopo registrado.

### Etapa 2 — Pesquisa de conteúdo e direção visual

Possível execução paralela:

- Agente de Pesquisa: organizar estrutura, dados ausentes e perguntas ao proprietário.
- Agente UX/UI: propor layout, identidade provisória e comportamento responsivo.

**Critério de aceite:** estrutura de página e direção visual coerentes, com placeholders identificados.

### Etapa 3 — Implementação do protótipo

Responsável: agente Frontend, orientado pelo orquestrador.

- Construir a landing page.
- Implementar navegação e interações.
- Centralizar conteúdo provisório.
- Adaptar o layout para mobile e desktop.

**Critério de aceite:** página navegável, responsiva e sem links ou controles que aparentem funcionar, mas não executem nenhuma ação.

### Etapa 4 — Revisão e qualidade

Possível execução paralela:

- Agente de Conteúdo: revisar textos, CTAs e conteúdo demonstrativo.
- Agente QA: testar responsividade, navegação, acessibilidade básica e console.

**Critério de aceite:** nenhum problema crítico conhecido; build e testes disponíveis aprovados; conteúdo não confirmado identificado.

### Etapa 5 — Preparação para apresentação

Responsável: orquestrador.

- Preparar a demonstração para celular e notebook.
- Verificar a experiência desde a primeira dobra até o contato final.
- Remover textos internos de desenvolvimento que não devam aparecer ao proprietário.
- Manter identificados os elementos fictícios que ainda não possam ser substituídos.
- Criar uma lista curta dos dados necessários para personalização após a conversa.

**Critério de aceite:** o usuário consegue abrir o protótipo e demonstrar claramente a proposta em poucos minutos.

---

## 11. CRITÉRIOS DE QUALIDADE DA ENTREGA

A primeira versão só deve ser considerada pronta para apresentação quando atender aos itens essenciais:

- [ ] A página tem aparência profissional e identidade visual consistente.
- [ ] A primeira dobra comunica rapidamente o que é a academia e qual ação o visitante pode realizar.
- [ ] A navegação funciona em celular e desktop.
- [ ] O menu mobile abre e fecha corretamente.
- [ ] Os CTAs levam a destinos válidos ou estão claramente marcados como demonstração.
- [ ] Nenhuma informação comercial inventada é apresentada como verdadeira.
- [ ] Fotos temporárias podem ser substituídas sem reconstruir a página.
- [ ] Planos, horários e contatos estão centralizados e fáceis de editar.
- [ ] Não há erros críticos no console do navegador.
- [ ] O build de produção funciona.
- [ ] O site não contém credenciais ou dados pessoais indevidos.
- [ ] O usuário sabe quais informações ainda precisam ser obtidas do proprietário.

### Prioridades em caso de conflito

1. Correção e funcionamento.
2. Clareza das informações.
3. Experiência mobile.
4. Desempenho e acessibilidade.
5. Fidelidade visual e refinamentos estéticos.
6. Efeitos decorativos e animações.

---

## 12. REGRAS DE DECISÃO E COMUNICAÇÃO COM O USUÁRIO

- Não faça perguntas sobre informações que já estejam registradas no projeto ou na conversa.
- Se faltar uma informação que não impeça o avanço, use um placeholder explícito e continue.
- Faça uma pergunta ao usuário quando a decisão alterar significativamente escopo, custo, identidade da marca, publicação ou arquitetura.
- Não interrompa o trabalho por preferências cosméticas pequenas; proponha uma opção coerente e deixe a decisão fácil de revisar.
- Apresente alternativas quando houver trade-offs técnicos relevantes, com recomendação objetiva.
- Não esconda limitações nem declare testes que não foram executados.
- Use português brasileiro nas interfaces e na documentação voltada ao cliente, salvo solicitação diferente.
- Mantenha nomes de variáveis, componentes e arquivos consistentes com a convenção técnica do projeto.
- Ao terminar uma etapa, não encerre a iniciativa sem indicar o próximo passo prático.

---

## 13. PRIMEIRA INSTRUÇÃO AO ORQUESTRADOR

Ao receber este documento, **não comece criando vários agentes indiscriminadamente e não comece codificando sem inspecionar o ambiente**.

Execute esta sequência:

1. Leia integralmente estas diretivas.
2. Verifique se existe um `README`, `AGENTS.md` ou outra instrução de projeto; respeite as instruções compatíveis e sinalize conflitos.
3. Verifique a instalação do Orca, o runtime, a CLI, as skills e os recursos reais de orchestration disponíveis.
4. Inspecione os arquivos e o estado do Git.
5. Produza um diagnóstico curto do ambiente e do que já existe.
6. Elabore o plano inicial de tarefas com dependências.
7. Crie somente os agentes necessários para as primeiras tarefas independentes.
8. Faça a delegação usando sessões reais e comunicação rastreável do Orca.
9. Aguarde, revise e integre as entregas.
10. Comece a implementação do protótipo e conduza o projeto até uma demonstração utilizável.

### Mensagem inicial esperada do orquestrador

A primeira resposta do agente ao usuário deve conter:

- Confirmação de que entendeu o objetivo comercial do projeto.
- Resumo do diagnóstico do repositório e do Orca.
- Recursos de orquestração efetivamente disponíveis (e os que não estiverem disponíveis).
- Plano das primeiras tarefas e agentes que serão iniciados.
- Qualquer bloqueio real que impeça o início.

**Não diga que criou ou iniciou um agente antes de confirmar que a sessão/processo correspondente existe e está pronto.**

---

## 14. REFERÊNCIAS DO ORCA

As instruções de integração devem ser conferidas contra a versão instalada do Orca. Os comandos e recursos podem mudar.

- Documentação do Orca: https://www.onorca.dev/docs
- Visão geral do Orca: https://www.onorca.dev/docs
- Skill de orquestração do projeto Orca IDE: https://github.com/DALH33/orca-IDE/blob/main/skills/orchestration/SKILL.md
- Repositório do Orca IDE: https://github.com/DALH33/orca-IDE

A skill de orquestração descreve os pré-requisitos do runtime, comunicação entre agentes, tarefas com dependências, dispatch, decision gates e coordenação. Use-a como referência, mas sempre valide os comandos e capacidades na instalação ativa.

---

**FIM DAS DIRETRIZES — este documento é a referência principal para iniciar e coordenar o projeto do site demonstrativo da academia.**

---

## 15. AUDITORIA DA IDENTIDADE VISUAL — UNICFIT ACADEMIA

> **Nova referência visual obrigatória do projeto.** O usuário forneceu capturas do feed do Instagram da Unicfit, a imagem do avatar/logo e uma fotografia da fachada. Analise esses materiais antes de definir ou alterar o design do site. Esta seção complementa as diretrizes anteriores e deve ser considerada por todos os agentes de UX/UI, frontend, conteúdo e QA.

### 15.1. Leitura geral da marca

A marca apresenta uma identidade visual reconhecível e relativamente consistente entre redes sociais, símbolo e fachada. A direção visual combina:

- **Energia e performance:** fotografias de pessoas treinando, musculação, máquinas e exercícios em movimento.
- **Tecnologia e modernidade:** fundo escuro, iluminação colorida, contrastes fortes e detalhes luminosos.
- **Personalidade intensa:** títulos grandes, pesados, inclinados e frequentemente em caixa alta.
- **Proximidade e comunidade:** professores, alunos, atendimento, datas comemorativas, humor, campanhas locais e referências às unidades.
- **Assinatura cromática:** preto/grafite como base, roxo e violeta como cores de destaque, azul elétrico em elementos gráficos e ciano/turquesa em pequenos detalhes do símbolo.

O site deve parecer uma extensão oficial dessa marca, e não um template genérico de academia que apenas recebeu o nome e o logotipo da Unicfit.

### 15.2. Paleta de cores observada

A paleta abaixo é uma **aproximação visual obtida dos arquivos enviados**, não um manual oficial de marca nem uma especificação colorimétrica. Compressão das capturas, iluminação das fotografias e variações de tela podem alterar os tons. O agente de design deve usar estes valores como ponto de partida e conferir com arquivos originais da academia caso sejam disponibilizados.

| Função | Cor de referência | Uso recomendado |
|---|---|---|
| Fundo principal | `#0B0A10` / `#111017` | Fundo predominante do site e áreas de impacto |
| Superfície escura | `#191720` | Cards, navegação, blocos de conteúdo e rodapé |
| Roxo profundo | `#571D61` | Sombras coloridas, áreas secundárias e transições |
| Violeta vibrante | `#8B2BE2` | Destaques, palavras-chave, links e CTAs secundários |
| Magenta | `#9527A4` | Ponto de cor em gradientes e detalhes decorativos |
| Azul elétrico | `#3054F3` | Formas geométricas, fundos de destaque e pequenos acentos |
| Ciano/turquesa | `#5DD9F0` | Detalhes do símbolo, microdestaques e estados gráficos pontuais |
| Branco | `#F2F1F5` | Títulos, textos prioritários, logotipo e ícones |
| Cinza claro | `#B8B5C0` | Textos auxiliares e descrições sobre fundos escuros |

**Regras de aplicação da paleta:**

1. Preto e grafite devem ocupar a maior parte da interface.
2. Roxo/violeta deve ser a principal cor de destaque, pois é o tom mais recorrente e reconhecível nos posts.
3. Azul elétrico deve aparecer como acento complementar em blocos, recortes, linhas ou gradientes, sem competir com o roxo.
4. Ciano/turquesa deve ser usado com moderação, principalmente para fazer referência ao detalhe colorido do símbolo.
5. Branco deve garantir contraste e leitura; não substituir títulos por gradientes em todas as seções.
6. Evitar transformar toda a página em um degradê neon. O impacto vem do contraste entre áreas quase pretas e acentos de cor bem posicionados.
7. Não usar verde-limão, laranja ou outras cores de uma identidade genérica de academia, a menos que apareçam em uma campanha específica e autorizada.

### 15.3. Fachada e identidade física da unidade

Na fotografia enviada, a fachada apresenta:

- Volume frontal pintado em um **roxo/malva fechado**, relativamente dessaturado.
- Faixa/placa retangular escura na parte superior, com o nome e o símbolo em branco/prateado.
- Esquadrias, portões, grades e elementos inferiores escuros.
- Grandes panos de vidro na área térrea, permitindo visualizar parcialmente os equipamentos e o interior.
- Entrada central e aparência de academia de rua, com acesso direto pela calçada.

**Orientações para o site:**

- A fachada é uma referência física importante e deve aparecer na galeria ou em uma seção de localização, desde que o proprietário confirme que a foto representa atualmente a unidade apresentada.
- Não usar o roxo da pintura externa como única cor principal do site. O feed e o avatar demonstram uma paleta digital mais escura, com roxo vivo, azul e ciano.
- Preferir fotografias reais da fachada e do interior a imagens genéricas de academias. A pessoa interessada deve reconhecer o estabelecimento quando chegar ao local.
- Não inventar reformas, equipamentos, ambientes, iluminação ou acabamentos que não estejam nas fotos reais.
- A fotografia enviada aparenta ser uma captura antiga; confirmar com o proprietário se a fachada, a placa, a entrada e a unidade continuam iguais antes de tratá-la como imagem atual.

### 15.4. Logotipo, símbolo e avatar

A imagem de perfil enviada mostra uma composição circular escura com um anel luminoso em gradiente, passando por violeta/magenta e azul/ciano. No centro aparece o lettering estilizado **UNICFIT**, acompanhado de indicação menor de academia e de um símbolo de traços inclinados que sugerem avanço, velocidade e movimento.

O lettering observado possui características próprias:

- Letras futuristas, estreitas e inclinadas.
- Aparência metálica/branca, com acabamento luminoso em algumas aplicações.
- Símbolo lateral formado por lâminas/traços diagonais ascendentes, com variação de ciano, azul e magenta.
- A palavra “academia” aparece como complemento menor, com espaçamento entre letras em algumas versões.

**Atenção: não confundir o avatar com o logotipo institucional completo.** O círculo luminoso pode ser um tratamento específico da foto de perfil. O site deve usar prioritariamente uma versão horizontal/isolada do logotipo, caso a academia forneça o arquivo original.

Tarefas obrigatórias do agente visual:

1. Procurar nos materiais fornecidos uma versão legível do logotipo e do símbolo.
2. Solicitar/registrar a necessidade de receber o arquivo oficial em SVG, PDF vetorial ou PNG transparente em alta resolução.
3. Não redesenhar o lettering com uma fonte aleatória nem substituir o símbolo por um ícone genérico de halter, raio ou pessoa correndo.
4. Não usar a imagem pequena do avatar ampliada como se fosse um logo de alta qualidade.
5. Preparar versões de uso sobre fundo escuro e, se necessário, sobre fundo claro, sem alterar proporções, cores ou espaçamentos do original.
6. Se o arquivo oficial não estiver disponível, usar provisoriamente a referência enviada com dimensão limitada e registrar a pendência; não fabricar uma versão supostamente oficial.

### 15.5. Linguagem visual dos posts do Instagram

As capturas do feed mostram padrões recorrentes que devem orientar o design do site:

**Fotografia e tratamento de imagem**

- Fotos de alunos, professores e modelos em exercícios reais, com máquinas, pesos e ambientes da academia.
- Enquadramentos fechados e retratos de impacto, intercalados com imagens mais abertas do espaço e de grupos.
- Contraste alto, áreas de sombra e iluminação fria; algumas peças usam luz roxa/azul para reforçar a atmosfera.
- Sobreposições escuras ou gradientes que criam área de leitura para textos brancos.
- Presença de pessoas reais e da equipe como recurso de confiança e identificação.

**Tipografia**

- Títulos predominantemente brancos, em caixa alta, pesados, condensados ou inclinados.
- Palavras importantes aparecem em roxo ou azul para criar hierarquia.
- Textos curtos, slogans diretos e frases de impacto.
- Fontes mais leves/itálicas são usadas como apoio em conselhos, legendas e mensagens secundárias.

**Formas e composição**

- Recortes diagonais, curvas largas e formas orgânicas nas bordas inferiores ou laterais.
- Blocos roxos e azuis que entram parcialmente no enquadramento.
- Linhas diagonais, brilhos, contornos e gradientes luminosos usados como detalhes.
- Composições assimétricas, com texto em uma região e pessoa/equipamento em outra.
- Pequenos botões ou etiquetas em formato de pílula para localização, contato e chamadas.

**Tom de comunicação**

- Motivacional e direto, sem excesso de formalidade.
- Próximo e humano, com professores e alunos como protagonistas.
- Alternância entre conteúdo educativo, motivação, humor, campanhas, datas comemorativas, apresentação da equipe e divulgação de serviços.
- Referências locais ao Amapá/Macapá e às diferentes unidades, o que pode ser um diferencial de proximidade.

### 15.6. Como traduzir o Instagram para um site

**Não copiar literalmente o feed.** Os posts são peças individuais que disputam atenção em um espaço pequeno; um site precisa organizar informações, orientar a navegação e converter visitantes em contatos/matrículas.

Traduzir a identidade da seguinte forma:

- Manter a base escura e os acentos roxo/azul/ciano.
- Usar uma fotografia real e forte da academia na seção principal, com tratamento escuro suficiente para preservar legibilidade.
- Aplicar títulos grandes e expressivos em pontos estratégicos, sem transformar todos os textos em caixa alta ou itálico.
- Reaproveitar recortes curvos, diagonais e gradientes em pequenas doses: bordas de cards, fundos de chamadas, separadores e detalhes de navegação.
- Adotar cards e superfícies com contraste sutil, evitando excesso de bordas, brilhos e sombras neon.
- Manter corpo de texto em fonte sans-serif altamente legível; a tipografia de impacto deve ficar concentrada em títulos e slogans.
- Usar botões claros e objetivos, com destaque roxo/azul e estados de hover/foco visíveis.
- Construir uma hierarquia clara: proposta de valor, estrutura, modalidades/serviços, equipe, localização, horários e contato.
- Fazer com que cada seção seja visualmente consistente, sem parecer uma montagem de artes independentes do Instagram.

### 15.7. Fotografia: critérios de seleção e tratamento

Priorizar, nesta ordem, materiais reais e autorizados:

1. Fachada atual da unidade que será apresentada.
2. Entrada/recepção e visão geral do espaço interno.
3. Equipamentos e áreas de musculação/cardio.
4. Professores ou equipe em atendimento.
5. Alunos treinando, com autorização de uso de imagem.
6. Fotos de grupos, eventos e comunidade.

O agente de conteúdo deve montar um inventário das imagens disponíveis e indicar quais seções cada uma pode ilustrar. O agente de UX/UI deve avaliar enquadramento, contraste e espaço negativo para textos.

- Não reutilizar uma imagem só porque combina com a paleta se ela representar outra academia ou equipamento que a unidade não possui.
- Não criar depoimentos, fotos de professores, números de alunos ou resultados físicos fictícios.
- Não usar imagens de pessoas identificáveis sem autorização apropriada para publicação no site.
- Não aplicar filtros roxos tão fortes que deixem as fotos artificiais ou prejudiquem a identificação do espaço.
- Se faltarem imagens reais, usar placeholders identificados internamente como temporários e listar exatamente o que precisa ser fotografado.

### 15.8. Estrutura e conteúdo que merecem atenção

As publicações sugerem que a academia pode ter mais de uma unidade e que trabalha conteúdo sobre professores, alunos, musculação, cardio, campanhas e datas especiais. Isso é um indício para investigação, não autorização para publicar informações como fatos atuais.

O orquestrador deve verificar com o proprietário:

- Nome comercial exato e forma correta de escrever “Unicfit”.
- Se o site será institucional para toda a marca ou específico para uma unidade.
- Quantas unidades estão ativas, seus endereços e contatos individuais.
- Se a unidade apresentada é a mesma da fotografia de fachada.
- Horários de funcionamento de cada unidade e eventuais horários especiais.
- Modalidades, serviços, equipamentos e diferenciais efetivamente oferecidos.
- Existência de professores, personal trainers, avaliação física ou acompanhamento, e como cada serviço deve ser descrito.
- Planos, preços, taxas, promoções, condições de matrícula e validade de ofertas.
- WhatsApp oficial, Instagram oficial, endereço e links de localização.
- Quais fotos, logotipo, vídeos e depoimentos podem ser publicados.

Não deduzir que uma promoção, condição de matrícula, campanha de Black Friday, horário ou informação vista em uma postagem antiga continua válida.

### 15.9. Lista de foco prioritário para o orquestrador

O orquestrador deve transformar os itens abaixo em tarefas verificáveis, delegar aos agentes adequados e cobrar evidências de conclusão.

**Prioridade P0 — identidade e autenticidade**

- [ ] Confirmar se o nome e a marca corretos são “Unicfit Academia”.
- [ ] Descobrir se o site será para uma unidade ou para todas as unidades.
- [ ] Localizar e preservar o logotipo original; não reconstruir o símbolo por aproximação.
- [ ] Criar tokens de design baseados na paleta observada: grafite/preto, violeta/roxo, azul elétrico, ciano e branco.
- [ ] Garantir que o protótipo pareça pertencer à identidade da Unicfit, e não a uma academia fictícia genérica.
- [ ] Identificar quais imagens são reais, atuais e autorizadas para uso.

**Prioridade P1 — linguagem visual**

- [ ] Definir escala tipográfica com títulos fortes/condensados e textos corridos simples e legíveis.
- [ ] Estabelecer regras para gradientes roxo-azul-ciano, sem espalhar efeitos neon por toda a interface.
- [ ] Traduzir as formas diagonais, curvas e recortes do Instagram em componentes discretos do site.
- [ ] Definir tratamento consistente para fotos: contraste, sombras, overlay e enquadramento.
- [ ] Garantir consistência entre cabeçalho, botões, cards, ícones, rodapé e seções.
- [ ] Avaliar o resultado em desktop e, principalmente, em telas de celular.

**Prioridade P1 — conteúdo e confiança**

- [ ] Planejar uma seção de estrutura com fotos reais da unidade.
- [ ] Apresentar equipe e atendimento somente com dados confirmados.
- [ ] Confirmar endereços, horários, modalidades e canais de contato.
- [ ] Avaliar se faz sentido uma área de unidades/filiais, com informações independentes para cada endereço.
- [ ] Criar CTAs objetivos para WhatsApp, visita e consulta de planos, apontando para destinos válidos.
- [ ] Usar linguagem motivacional e próxima, mas sem promessas de resultados garantidos.

**Prioridade P2 — refinamento e validação**

- [ ] Conferir legibilidade dos textos sobre fotografias.
- [ ] Conferir contraste de roxo, azul e ciano em relação aos fundos escuros.
- [ ] Evitar animações excessivas, efeitos que distraiam ou carregamento pesado.
- [ ] Verificar acessibilidade de navegação por teclado, foco, rótulos e textos alternativos.
- [ ] Verificar se o site mantém identidade visual em todas as larguras e não apenas na primeira dobra.
- [ ] Fazer revisão visual lado a lado com as referências fornecidas.

### 15.10. Agentes a envolver e entregáveis esperados

| Agente | Foco específico | Entregável obrigatório |
|---|---|---|
| Orquestrador | Consolidar decisões, pendências e coerência geral | Briefing de marca e lista priorizada de decisões |
| Pesquisa/conteúdo | Investigar informações que precisam ser confirmadas e separar fatos de suposições | Matriz de conteúdo confirmado, pendente e não autorizado |
| UX/UI | Interpretar as referências e construir a direção visual do site | Moodboard descritivo, paleta, tipografia, componentes e wireframe |
| Frontend | Implementar o design system e a página responsiva | Componentes reutilizáveis e protótipo funcional |
| QA visual | Conferir identidade, responsividade, legibilidade e fidelidade | Relatório com capturas, problemas e correções necessárias |

Não criar agentes só para preencher uma estrutura. Delegar apenas quando houver tarefas independentes e capacidade real de execução no Orca.

### 15.11. Critérios de aceite visual

A direção visual só deve ser aprovada quando:

- [ ] A marca é reconhecível mesmo sem depender de uma única imagem do Instagram.
- [ ] O preto/grafite predomina e o roxo aparece como assinatura visual.
- [ ] Azul elétrico e ciano aparecem como acentos coerentes, sem competir com o conteúdo.
- [ ] O logotipo não foi distorcido, redesenhado indevidamente ou substituído por ícone genérico.
- [ ] A tipografia transmite força nos títulos e mantém leitura confortável nos textos longos.
- [ ] As fotografias representam a academia real ou estão identificadas como placeholders temporários.
- [ ] O site tem hierarquia e navegação próprias; não parece uma cópia de um mosaico de posts.
- [ ] A fachada e as imagens internas são consistentes com a unidade que será apresentada.
- [ ] A interface funciona em celular, tablet e desktop.
- [ ] Todas as informações ainda não confirmadas estão sinalizadas como pendências e não aparecem como fatos.

**Regra final:** a fidelidade à marca não significa reproduzir todos os efeitos dos posts. Significa preservar os elementos que tornam a Unicfit reconhecível — contraste escuro, roxo/azul, símbolo inclinado, tipografia de impacto, fotografia de treino e comunicação próxima — organizando-os em uma experiência de site mais clara, confiável e orientada à conversão.
