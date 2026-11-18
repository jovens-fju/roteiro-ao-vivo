# Roteiro ao Vivo: Davi e Golias

App para o workshop de roteiro com os jovens. Cada grupo usa um celular para escrever, ao vivo, uma cena da história de Davi e Golias (1 Samuel 17). As cenas aparecem em formato de roteiro na tela grande e nos celulares.

Endereço: **https://jovens-fju.github.io/roteiro-ao-vivo/**

| Rota | Para quê |
|---|---|
| `#/` | Celular dos grupos |
| `#/telao` | Tela grande (projetor, TV ou notebook) |
| `#/painel` | Painel do apresentador (PIN **1717**) |
| `#/imprimir` | Versão para impressão e PDF |

O PIN fica na constante `PIN`, no topo do script em `roteiro-ao-vivo.html`.

## Arquivos

- `roteiro-ao-vivo.html`: o app inteiro (HTML, CSS e JS puro). É aqui que se edita.
- `site/firebase-config.js`: configuração do Firebase, com um comentário em cada campo.
- `build_site.sh`: gera `site/index.html` e copia para `index.html` na raiz.
- `index.html`: o arquivo que o GitHub Pages publica. Não edite à mão: ele é gerado.
- `database.rules.json`: regras do Realtime Database usadas no dia do workshop.

## (a) Projeto Firebase e onde fica a configuração

- Projeto: **roteiro-ao-vivo-jovens**, criado em https://console.firebase.google.com só para este app, sem Google Analytics.
- Banco: **Realtime Database**, criado em modo bloqueado e depois liberado só em `/sessao` pelas regras abaixo.
- App Web registrado no projeto. A configuração dele (apiKey, authDomain, databaseURL, projectId etc.) foi copiada para `site/firebase-config.js`.
- Para ver de novo: Console do Firebase > ícone de engrenagem > Configurações do projeto > Seus apps > App da Web > Configuração do SDK.
- Esses valores não são senhas. Quem protege os dados são as regras do banco.
- Sem `databaseURL` preenchido, o app roda em **modo local**: funciona, mas só sincroniza entre abas do mesmo navegador.

Estrutura no banco:

```
/sessao/config   travado, modoLeitura, indiceLeitura, destaque, mostrarQR
/sessao/grupos/{id}
    nome, momento, status (escolhendo | respondendo | escrevendo | enviado),
    perguntas { quem, oque, onde, quando, porque, como },
    cena { cabecalho { tipo, local, periodo }, blocos [ { tipo, texto, personagem, rubrica } ] },
    criadoEm, atualizadoEm, enviadoEm
```

## (b) Regras do banco e como fechar depois do workshop

As regras estão em `database.rules.json`. Resumo:

- Leitura e escrita abertas **só dentro de `/sessao`**. Tudo fora disso fica bloqueado.
- Cada campo tem tipo e tamanho máximo (nome até 30 letras, ação e fala até 400 letras cada, até 60 blocos por cena, só para evitar abuso). Campos desconhecidos são recusados.

Para publicar as regras: Console do Firebase > Realtime Database > aba **Regras** > colar o conteúdo de `database.rules.json` > **Publicar**.

**Para fechar o banco depois do workshop** (recomendado):

1. Se quiser guardar as cenas, abra `#/painel`, toque em **Gerar PDF** e salve. Ou, no Console, Realtime Database > Dados > menu de três pontos > **Exportar JSON**.
2. Na aba **Regras**, troque tudo por:
   ```json
   { "rules": { ".read": false, ".write": false } }
   ```
3. Toque em **Publicar**. O site continua no ar, mas ninguém consegue ler nem escrever.
4. Para o próximo workshop, cole de novo o `database.rules.json` e publique. No painel, use **Limpar tudo** para começar do zero.

## (c) Como gerar o site e publicar uma atualização

```bash
./build_site.sh      # gera site/index.html e copia para index.html
git add -A
git commit -m "Atualiza o app"
git push
```

O GitHub Pages publica a branch `main`, pasta raiz (Settings > Pages). A atualização aparece em 1 ou 2 minutos. Se o celular mostrar a versão antiga, recarregue a página.

Sem computador: dá para editar `roteiro-ao-vivo.html` pelo site do GitHub, mas aí o `index.html` não é regerado. Nesse caso, peça para o Claude rodar o build.

## (d) Como testar

**Com dois navegadores (ou duas abas):**

1. Abra `https://jovens-fju.github.io/roteiro-ao-vivo/#/telao` numa janela grande.
2. Abra `https://jovens-fju.github.io/roteiro-ao-vivo/` no celular (ou numa janela estreita).
3. No celular, digite um nome de grupo, escolha um momento, responda as 6 perguntas, escreva pelo menos 4 ações e 4 falas, marque o checklist e envie.
4. A tela grande mostra o status ("respondendo as perguntas...", "escrevendo...") e depois a cena chegando.
5. Abra `#/painel` (PIN 1717) e apague o grupo de teste.

**Com o Modo demonstração (sozinho em casa):**

1. Abra `#/telao` e `#/painel`.
2. No painel, toque em **Modo demonstração**: aparecem 5 grupos de exemplo, um por momento.
3. Teste Destacar, Modo Leitura (Anterior e Próxima), Travar envios e Gerar PDF.
4. No fim, toque em **Remover demonstração**. Os grupos de verdade não são apagados.

## (e) Roteiro rápido do dia

**Cenário 1: com tela grande**

1. Antes: no painel, **Limpar tudo**. Confira que os envios estão destravados.
2. No projetor, TV ou notebook, abra `https://jovens-fju.github.io/roteiro-ao-vivo/#/telao` em tela cheia (F11). Aparece a tela de espera com o QR code.
3. No seu celular, abra `#/painel` (PIN 1717).
4. Os grupos entram pelo QR code do slide ou da tela grande. Quando todos entrarem, toque em **Esconder** na tela de espera. A tela grande passa a mostrar os 5 momentos ao vivo.
5. Quem chegar atrasado: mostre o QR code do seu painel.
6. Quando acabar o tempo: **Travar envios**. Os celulares mostram "Envios encerrados. Hora da leitura!".
7. Leitura: **Ligar** o Modo Leitura e usar Anterior e Próxima. Tela grande e celulares mudam juntos. No notebook, as setas do teclado também funcionam.
8. Use **Destacar** para pôr uma cena na frente de todos.
9. No fim: **Gerar PDF** e "Salvar como PDF". Depois, feche o banco (item b).

**Cenário 2: só com os celulares**

1. No seu celular, abra `#/painel` (PIN 1717) e faça **Limpar tudo**.
2. Os grupos entram pelo QR code que aparece no seu painel (ou no slide).
3. Depois de enviar, cada grupo toca em **Ver o roteiro de todos** e acompanha as cenas chegando ao vivo.
4. **Travar envios** quando acabar o tempo.
5. **Ligar** o Modo Leitura: todos os celulares abertos no app passam para a mesma cena, em letra grande. Anterior e Próxima mudam todos juntos. Ao desligar, cada celular volta para onde estava.
6. No fim: **Gerar PDF** e feche o banco (item b).

## Se der problema

- "Sem internet, tentando reconectar...": o celular perdeu a conexão. O rascunho fica salvo no aparelho e é enviado quando a internet voltar.
- Recarregar a página não perde nada: o grupo e o rascunho ficam guardados no celular.
- Um grupo apagado no painel volta para a primeira etapa no celular.
