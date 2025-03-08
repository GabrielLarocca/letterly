# Letterly - Plataforma de Cartas Digitais
Uma plataforma web para criar e compartilhar cartas digitais personalizadas com elementos multimídia, como fotos e música.

## 🌟 Sobre
Letterly é uma plataforma moderna que permite criar e compartilhar cartas digitais personalizadas com elementos multimídia. Desenvolvida com TypeScript, React e Node.js, oferece uma experiência única para expressar sentimentos através de cartas digitais interativas.

## Índice
- [Visão Geral](#visão-geral)
- [Funcionalidades](#funcionalidades)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Configuração e Instalação](#configuração-e-instalação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Uso](#uso)

## Visão Geral
Letterly é uma aplicação web que permite aos usuários criar cartas digitais personalizadas. Os usuários podem adicionar fotos, música de fundo, emojis e escolher diferentes estilos de design para criar mensagens únicas e memoráveis para ocasiões especiais.

## 🚀 Funcionalidades Principais

### Frontend (React + TypeScript)
- 📝 Editor de cartas intuitivo
- 🖼️ Suporte para múltiplas fotos com carrossel
- 🎵 Integração com música de fundo (YouTube)
- 🎨 Temas personalizáveis
- ✨ Efeitos especiais (chuva de emojis)
- 📱 Design responsivo
- 💳 Integração com Stripe para pagamentos

### Backend (Node.js + TypeScript)
- 🔐 Sistema de autenticação
- 💾 Persistência com PostgreSQL
- 📊 Gerenciamento de planos e assinaturas
- 🔄 API RESTful
- 📦 Upload de arquivos com AWS S3
- 📝 Logs estruturados com Winston
- 🚦 Rate limiting
- 📚 Documentação Swagger

## 🛠️ Tecnologias Utilizadas

### Frontend
- React
- TypeScript
- Vite
- TailwindCSS
- Shadcn/ui
- React Query
- React Router
- Zod

### Backend
- Node.js
- TypeScript
- Express
- Sequelize
- PostgreSQL
- Stripe
- AWS SDK
- Winston
- Jest

## 🚀 Configuração e Instalação

### Pré-requisitos
- Node.js (v18 ou superior)
- PostgreSQL
- npm ou yarn

### Instalação

1. Instale as dependências:

    ```bash
    # Para backend
    cd backend
    npm install

    # Para frontend
    cd frontend
    npm install
    ```

2. Inicie o servidor Backend:

    ```bash
    cd backend
    npm run dev
    ```

3. Inicie o servidor Frontend:

    ```bash
    cd frontend
    npm start
    ```