# acervo-digital-lm-frontend

Vitrine digital e painel administrativo do LM Escritório de Arte — camada de apresentação (SPA React/Vite) do projeto Acervo Digital LM. Consome a API REST do repositório [`acervo-digital-lm-backend`](../acervo-digital-lm-backend).

## Stack

- React 19 + Vite
- React Router
- Tailwind CSS v4

## Estrutura de pastas

```
src/
├── assets/         # imagens, ícones e outros arquivos estáticos
├── components/
│   ├── common/     # componentes compartilhados (ex.: StatusBadge)
│   ├── layout/      # cabeçalho/rodapé público e do painel admin
│   └── ui/          # elementos de interface reutilizáveis (botões, inputs...)
├── pages/
│   ├── public/      # Vitrine, Detalhe da obra, Interesse, Confirmação
│   └── admin/        # Login, Lista de obras, Cadastro, Histórico, Interesses
├── hooks/           # hooks customizados
├── services/        # chamadas à API do backend
├── context/         # contexto de autenticação do galerista
├── routes/          # definição das rotas da aplicação
├── utils/           # funções utilitárias
└── constants/        # constantes compartilhadas (ex.: labels de status)
```

## Como rodar

```bash
npm install
cp .env.example .env
npm run dev
```

A aplicação sobe em `http://localhost:5173`. Configure `VITE_API_URL` no `.env` apontando para a API do backend.
