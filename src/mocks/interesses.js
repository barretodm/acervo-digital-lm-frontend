// Dados mockados no formato da tabela "interesses" do DER (AcervoDigitalLM.docx).
// obra_id referencia o id em mocks/obras.js.
// Regra de negocio (docx): so existe registro quando consentimento_lgpd = true.

export const interesses = [
  {
    id: '613bd0df-ec33-4d71-b688-52ffc90495d0',
    obra_id: 'c5494231-4efc-48b3-9466-bcb91ca5cbd9',
    nome: 'Marcelo Andrade',
    email: 'marcelo.andrade@email.com',
    telefone: '(11) 99876-5432',
    mensagem: 'Tenho interesse em saber mais sobre as dimensões e o estado de conservação.',
    consentimento_lgpd: true,
    criado_em: '2026-09-12T14:05:00.000Z',
  },
  {
    id: '0ededc61-1b89-4f0d-9f77-869e024984e5',
    obra_id: '085fc35b-4f78-47f3-9a51-c7ac72a520b3',
    nome: 'Fernanda Costa',
    email: 'fernanda@colecionadora.com.br',
    telefone: '(21) 98765-4321',
    mensagem: null,
    consentimento_lgpd: true,
    criado_em: '2026-09-14T09:30:00.000Z',
  },
  {
    id: '8bd88a16-11fe-479c-9870-a52c6b101558',
    obra_id: 'c5494231-4efc-48b3-9466-bcb91ca5cbd9',
    nome: 'Roberto Dias',
    email: 'roberto@email.com',
    telefone: '(11) 91234-5678',
    mensagem: 'Gostaria de agendar uma visita para ver a obra pessoalmente.',
    consentimento_lgpd: true,
    criado_em: '2026-09-15T18:20:00.000Z',
  },
]
