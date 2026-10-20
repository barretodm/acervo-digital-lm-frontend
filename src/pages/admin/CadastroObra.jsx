import { useState } from 'react'
import AdminHeader from '../../components/layout/AdminHeader'
import AdminField from '../../components/common/AdminField'

const PASSOS = [1, 2, 3]
const TITULO_PASSO = {
  1: 'Fotos da obra',
  2: 'Informações principais',
  3: 'Detalhes e valor',
}

const adminInputCls =
  'w-full border border-lm-border bg-lm-ivory px-4 py-3.5 text-base font-sans text-lm-charcoal focus:outline-none focus:border-lm-charcoal transition-colors placeholder:text-lm-placeholder'

function CadastroObra() {
  const [passo] = useState(1)
  const [fotosPreview] = useState([
    'https://images.unsplash.com/photo-1518998053901-5348d3961a04?w=900&h=1100&fit=crop&auto=format',
  ])
  const [fotoCapaIdx, setFotoCapaIdx] = useState(0)
  const [form, setForm] = useState({
    artista: '',
    tipo: 'quadro',
    tecnica: '',
    ano: '',
    titulo: '',
    valor: '',
    descricao: '',
  })

  function set(campo) {
    return (e) => setForm((f) => ({ ...f, [campo]: e.target.value }))
  }

  function handleCancelar() {
    alert('cancelar (ainda nao implementado)')
  }

  function handleLogout() {
    alert('sair (ainda nao implementado)')
  }

  return (
    <div className="min-h-screen bg-lm-admin-bg flex flex-col">
      <AdminHeader title="Cadastrar Nova Obra" onBack={handleCancelar} onLogout={handleLogout} />

      <main className="max-w-2xl mx-auto w-full px-5 py-8 flex-1">
        <div className="flex items-center gap-2 mb-8">
          {PASSOS.map((s) => (
            <div key={s} className="flex items-center gap-2">
              <div
                className={`w-8 h-8 flex items-center justify-center text-sm font-sans font-semibold transition-colors ${
                  s === passo
                    ? 'bg-lm-charcoal text-white'
                    : s < passo
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white border border-lm-border text-lm-muted'
                }`}
              >
                {s < passo ? (
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  s
                )}
              </div>
              {s < 3 && <div className={`h-px w-8 ${s < passo ? 'bg-emerald-600' : 'bg-lm-border'}`} />}
            </div>
          ))}
          <span className="ml-2 text-sm text-lm-warm-gray font-sans">{TITULO_PASSO[passo]}</span>
        </div>

        <div className="bg-white border border-lm-border p-6 md:p-8">
          {passo === 1 && (
            <div>
              <h2 className="font-sans font-semibold text-xl text-lm-charcoal mb-1">Fotos da obra</h2>
              <p className="text-sm text-lm-warm-gray font-sans mb-6 leading-relaxed">
                Adicione as fotos da obra. Você pode escolher qual será a foto principal (capa).
              </p>

              <div className="border-2 border-dashed border-lm-border-dashed hover:border-lm-charcoal transition-colors p-8 text-center mb-6 cursor-pointer">
                <svg className="w-10 h-10 text-lm-muted mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5"
                  />
                </svg>
                <p className="font-sans font-medium text-lm-charcoal text-sm">Clique aqui para selecionar fotos</p>
                <p className="text-xs text-lm-muted font-sans mt-1">JPG, PNG ou WEBP · Até 20 MB por foto</p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                {fotosPreview.map((foto, i) => (
                  <div key={foto} className="relative group">
                    <img src={foto} alt={`Foto ${i + 1}`} className="w-full aspect-square object-cover bg-lm-image-bg" />
                    <button
                      onClick={() => setFotoCapaIdx(i)}
                      className={`absolute bottom-2 left-2 text-[10px] font-sans font-semibold px-2 py-0.5 transition-colors ${
                        i === fotoCapaIdx
                          ? 'bg-lm-charcoal text-white'
                          : 'bg-white/80 text-lm-charcoal hover:bg-white'
                      }`}
                    >
                      {i === fotoCapaIdx ? '★ Capa' : 'Tornar capa'}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {passo === 2 && (
            <div>
              <h2 className="font-sans font-semibold text-xl text-lm-charcoal mb-1">Informações da obra</h2>
              <p className="text-sm text-lm-warm-gray font-sans mb-7 leading-relaxed">
                Preencha os dados principais. Os campos com * são obrigatórios.
              </p>

              <div className="space-y-5">
                <AdminField label="Nome do artista *">
                  <input
                    type="text"
                    placeholder="Ex: Adriana Varejão"
                    value={form.artista}
                    onChange={set('artista')}
                    className={adminInputCls}
                  />
                </AdminField>

                <AdminField label="Tipo de obra *">
                  <div className="flex gap-3">
                    {[
                      ['quadro', 'Quadro'],
                      ['escultura', 'Escultura'],
                    ].map(([val, label]) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setForm((f) => ({ ...f, tipo: val }))}
                        className={`flex-1 py-3.5 text-base font-sans font-medium border-2 transition-colors ${
                          form.tipo === val
                            ? 'border-lm-charcoal bg-lm-charcoal text-white'
                            : 'border-lm-border text-lm-warm-gray hover:border-lm-charcoal'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </AdminField>

                <AdminField label="Técnica *">
                  <input
                    type="text"
                    placeholder="Ex: Óleo sobre tela"
                    value={form.tecnica}
                    onChange={set('tecnica')}
                    className={adminInputCls}
                  />
                </AdminField>

                <AdminField label="Ano *">
                  <input
                    type="number"
                    placeholder="Ex: 2022"
                    value={form.ano}
                    onChange={set('ano')}
                    className={adminInputCls}
                    min={1900}
                    max={2099}
                  />
                </AdminField>
              </div>
            </div>
          )}

          {passo === 3 && (
            <div>
              <h2 className="font-sans font-semibold text-xl text-lm-charcoal mb-1">Detalhes e valor</h2>
              <p className="text-sm text-lm-warm-gray font-sans mb-7 leading-relaxed">
                Estes campos são opcionais — exceto o valor.
              </p>

              <div className="space-y-5">
                <AdminField label="Título da obra (se houver)">
                  <input
                    type="text"
                    placeholder="Deixe em branco se a obra não tiver título"
                    value={form.titulo}
                    onChange={set('titulo')}
                    className={adminInputCls}
                  />
                </AdminField>

                <AdminField label="Valor *">
                  <input
                    type="text"
                    placeholder="Ex: R$ 20.000   ou   Sob consulta"
                    value={form.valor}
                    onChange={set('valor')}
                    className={adminInputCls}
                  />
                </AdminField>

                <AdminField label="Descrição (texto livre, opcional)">
                  <textarea
                    placeholder="Informações adicionais sobre a obra, contexto, série..."
                    value={form.descricao}
                    onChange={set('descricao')}
                    rows={4}
                    className={adminInputCls + ' resize-none'}
                  />
                </AdminField>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}

export default CadastroObra
