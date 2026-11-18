// Configuração do Firebase do Roteiro ao Vivo.
// Estes valores vêm do Console do Firebase: Configurações do projeto > Seus apps > App da Web.
// Eles não são senhas: identificam o projeto. Quem protege o banco são as regras (database.rules.json).
window.FIREBASE_CONFIG = {
  // Chave pública que identifica o projeto nas chamadas do navegador.
  apiKey: "AIzaSyC1QOrUQzOm2lv7YJlR0lpfx1lTq5harRM",
  // Domínio de autenticação do projeto (não usamos login, mas o SDK pede).
  authDomain: "roteiro-ao-vivo-jovens.firebaseapp.com",
  // Endereço do Realtime Database. É o campo mais importante: sem ele o app fica em modo local.
  databaseURL: "https://roteiro-ao-vivo-jovens-default-rtdb.firebaseio.com",
  // Identificador do projeto no Firebase.
  projectId: "roteiro-ao-vivo-jovens",
  // Bucket de arquivos do projeto (não usado pelo app, mas faz parte da configuração).
  storageBucket: "roteiro-ao-vivo-jovens.firebasestorage.app",
  // Número do remetente de mensagens (não usado pelo app).
  messagingSenderId: "995377444540",
  // Identificador do app Web registrado no projeto.
  appId: "1:995377444540:web:b702629ebd1e5904de82b9"
};
