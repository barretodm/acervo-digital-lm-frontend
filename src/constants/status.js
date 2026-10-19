export const STATUS = [
  { chave: 'aberto', label: 'Disponível' },
  { chave: 'em_conversa', label: 'Em conversa' },
  { chave: 'reservado', label: 'Reservado' },
  { chave: 'vendido', label: 'Vendido' },
]

// "Vendido" sai do acervo ativo automaticamente (RF11/RF13), entao nunca
// aparece em obrasAtivas -- nao faz sentido no resumo da lista ativa.
export const STATUS_RESUMO = STATUS.filter((status) => status.chave !== 'vendido')
