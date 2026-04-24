# 🗞️ Notícias App

Aplicação fullstack minimalista para gerenciamento de notícias, composta por uma API REST e um app mobile React Native.

---

## 🛠️ Stack

| Camada | Tecnologias |
|--------|-------------|
| API | Node.js · TypeScript · Express · Drizzle ORM · SQLite |
| App | React Native · TypeScript · Axios · React Navigation |

---

## 📁 Estrutura do Repositório

```
noticias/
├── api/                          ← Backend
│   ├── src/
│   │   ├── db/
│   │   │   ├── schema.ts         # Schema da tabela noticias
│   │   │   └── connection.ts     # Conexão com SQLite
│   │   ├── routes/
│   │   │   └── noticias.ts       # Rotas CRUD
│   │   └── index.ts              # Entry point da API
│   ├── package.json
│   └── tsconfig.json
│
└── app/                          ← Arquivos do React Native
    ├── src/
    │   ├── services/
    │   │   └── noticiasService.ts # Chamadas HTTP com Axios
    │   └── screens/
    │       ├── ListaScreen.tsx    # Lista de notícias
    │       ├── DetalheScreen.tsx  # Detalhe da notícia
    │       └── FormularioScreen.tsx # Criar / Editar
    └── App.tsx                    # Navegação
```

---

## ⚙️ Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- [Node.js](https://nodejs.org/) 18+
- [Git](https://git-scm.com/download/win)
- [Android Studio](https://developer.android.com/studio) com emulador configurado
- JDK 17+

---

## 🚀 Rodando a API

Abra um terminal na raiz do projeto:

```powershell
cd api
npm install
npm run dev
```

A API estará disponível em `http://localhost:3000`.

### Endpoints

| Método | Rota              | Descrição         |
|--------|-------------------|-------------------|
| GET    | `/noticias`       | Lista todas       |
| GET    | `/noticias/:id`   | Busca por ID      |
| POST   | `/noticias`       | Cria nova         |
| PUT    | `/noticias/:id`   | Atualiza          |
| DELETE | `/noticias/:id`   | Remove            |

**Exemplo de body (POST/PUT):**
```json
{
  "titulo": "Título da notícia",
  "conteudo": "Texto completo da notícia...",
  "autor": "Nome do autor"
}
```

---

## 📱 Rodando o App React Native

### 1. Criar o projeto base

> Faça isso fora da pasta do repositório, apenas na primeira vez.

```powershell
npx @react-native-community/cli@latest init NoticiasApp
cd NoticiasApp
npm install axios @react-navigation/native @react-navigation/native-stack react-native-safe-area-context react-native-screens
```

### 2. Copiar os arquivos

Copie da pasta `app/` do repositório para dentro de `NoticiasApp/`:

```
app/App.tsx                            → NoticiasApp/App.tsx
app/src/services/noticiasService.ts    → NoticiasApp/src/services/noticiasService.ts
app/src/screens/ListaScreen.tsx        → NoticiasApp/src/screens/ListaScreen.tsx
app/src/screens/DetalheScreen.tsx      → NoticiasApp/src/screens/DetalheScreen.tsx
app/src/screens/FormularioScreen.tsx   → NoticiasApp/src/screens/FormularioScreen.tsx
```

### 3. Configurar o Gradle

Em `NoticiasApp/android/gradle/wrapper/gradle-wrapper.properties`:

```properties
distributionUrl=https\://services.gradle.org/distributions/gradle-8.13-all.zip
```

Em `NoticiasApp/android/local.properties`:

```properties
sdk.dir=C:\\Users\\SEU_USUARIO\\AppData\\Local\\Android\\Sdk
```

> Substitua `SEU_USUARIO` pelo seu usuário do Windows.

### 4. Configurar o IP da API

Edite `NoticiasApp/src/services/noticiasService.ts`:

```ts
// Emulador Android ou cabo USB com adb reverse:
const BASE_URL = "http://localhost:3000";

// Dispositivo físico na mesma rede Wi-Fi:
const BASE_URL = "http://192.168.1.XXX:3000";
```

### 5. Rodar

Abra um **segundo terminal** com o emulador ligado ou celular conectado via USB:

```powershell
# Adicionar adb ao PATH
$env:PATH += ";$env:LOCALAPPDATA\Android\Sdk\platform-tools"

# Redirecionar porta (emulador ou cabo USB)
adb reverse tcp:3000 tcp:3000

# Rodar o app
cd NoticiasApp
npx react-native run-android
```

---
