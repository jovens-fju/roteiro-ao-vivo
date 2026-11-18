// Configuração do Firebase do Roteiro ao Vivo.
// Estes valores vêm do Console do Firebase: Configurações do projeto > Seus apps > App da Web.
// Eles não são senhas: identificam o projeto. Quem protege o banco são as regras (database.rules.json).
window.FIREBASE_CONFIG = {
  // Chave pública que identifica o projeto nas chamadas do navegador.
  apiKey: "PREENCHER",
  // Domínio de autenticação do projeto (não usamos login, mas o SDK pede).
  authDomain: "PREENCHER.firebaseapp.com",
  // Endereço do Realtime Database. É o campo mais importante: sem ele o app fica em modo local.
  databaseURL: "",
  // Identificador do projeto no Firebase.
  projectId: "PREENCHER",
  // Bucket de arquivos do projeto (não usado pelo app, mas faz parte da configuração).
  storageBucket: "PREENCHER.firebasestorage.app",
  // Número do remetente de mensagens (não usado pelo app).
  messagingSenderId: "PREENCHER",
  // Identificador do app Web registrado no projeto.
  appId: "PREENCHER"
};
