# EstudaFácil

Aplicativo mobile feito com React Native (Expo) para revisão de matérias e quizzes rápidos. Este repositório contém a UI, navegação e lógica básica para criar, jogar e avaliar quizzes por matéria.

**Principais funcionalidades**
- Visualização de matérias e cards informativos
- Jogar quizzes com opções e ver resultado final
- Perfil do usuário com estatísticas
- Layout responsivo para dispositivos móveis via Expo

**Tecnologias**
- React Native
- Expo
- JavaScript

**Estrutura do projeto (trechos relevantes)**
- [App.js](App.js) — entrada da aplicação
- [src/navigation/AppNavigator.js](src/navigation/AppNavigator.js) — roteamento e navegação
- [src/screens/HomeScreen.js](src/screens/HomeScreen.js) — tela inicial
- [src/screens/QuizPlayScreen.js](src/screens/QuizPlayScreen.js) — execução do quiz
- [src/services/api.js](src/services/api.js) — chamadas à API (se aplicável)
- [src/components](src/components) — componentes reutilizáveis (BannerImage, MateriaCard, QuizOption, etc.)

**Instalação**
1. Clone o repositório

```bash
git clone <repo-url>
cd estudafacil
```

2. Instale dependências

```bash
npm install
# ou
yarn install
```

3. Inicie o projeto (Expo)

```bash
npx expo start
# ou
npm start
```

Abra no emulador Android/iOS ou use o aplicativo Expo Go no dispositivo físico.

**Scripts úteis (comuns)**
- `npm start` — inicia o Metro/Expo
- `npm run android` — inicia no emulador Android (se configurado)
- `npm run ios` — inicia no emulador iOS (macOS)

**Como contribuir**
- Abra uma issue para relatar bugs ou pedir features
- Envie PRs com descrições claras e commits pequenos

**Licença**
Projeto licenciado conforme o arquivo [LICENSE](LICENSE).

**Contato**
Se quiser discutir melhorias ou reportar problemas, abra uma issue ou crie um pull request.


