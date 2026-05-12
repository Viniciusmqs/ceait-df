import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react'

export default function ContatoPage() {
  const [form, setForm] = useState({ nome: '', email: '', assunto: '', msg: '' })
  const [sent, setSent] = useState(false)

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <>
      {/* Hero */}
      <section className="relative bg-hero overflow-hidden py-20">
        <div className="absolute inset-0 dot-pattern opacity-[0.06]" />
        <div className="arc-decoration" style={{ width: 500, height: 500, top: '-150px', right: '-100px' }} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <span className="sec-label !text-white !bg-white/20 border border-white/30">Contato</span>
          <h1 className="font-cond font-black text-5xl sm:text-6xl text-white uppercase tracking-tight mt-2">
            Fale conosco
          </h1>
          <p className="text-white/70 text-xl mt-4 max-w-xl">
            Entre em contato para saber mais sobre nossos projetos, inscrições ou parcerias.
          </p>
        </div>
      </section>

      <section className="py-20 bg-[#F7F8FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Info */}
            <div>
              <span className="sec-label">Informações</span>
              <h2 className="sec-heading text-3xl sm:text-4xl mb-4">Como nos encontrar</h2>
              <div className="sec-line" />

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#0D2D6B] flex items-center justify-center shrink-0">
                    <MapPin size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-cond font-800 text-sm uppercase tracking-wide text-[#0D2D6B]">Endereço</p>
                    <p className="text-gray-600 text-sm mt-0.5">QNA 23, Área Especial A/B<br />Taguatinga Norte — DF, CEP 72.115-510</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#1A9B3C] flex items-center justify-center shrink-0">
                    <Phone size={20} className="text-white" />
                  </div>
                  <div>
                    <p className="font-cond font-800 text-sm uppercase tracking-wide text-[#0D2D6B]">Telefone</p>
                    <p className="text-gray-600 text-sm mt-0.5">(61) 3563-1400</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-[#F5C800] flex items-center justify-center shrink-0">
                    <Mail size={20} className="text-[#0D2D6B]" />
                  </div>
                  <div>
                    <p className="font-cond font-800 text-sm uppercase tracking-wide text-[#0D2D6B]">E-mail</p>
                    <p className="text-gray-600 text-sm mt-0.5">ceait.df@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 rounded-xl bg-gray-100 flex items-center justify-center shrink-0">
                    <Clock size={20} className="text-gray-500" />
                  </div>
                  <div>
                    <p className="font-cond font-800 text-sm uppercase tracking-wide text-[#0D2D6B]">Horário</p>
                    <p className="text-gray-600 text-sm mt-0.5">Segunda a Sexta: 8h – 18h<br />Sábado: 8h – 12h</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Form */}
            <div className="card p-8">
              {sent ? (
                <div className="text-center py-12">
                  <CheckCircle2 size={52} className="text-[#1A9B3C] mx-auto mb-4" />
                  <h3 className="font-cond font-black text-2xl uppercase text-[#0D2D6B] mb-2">Mensagem enviada!</h3>
                  <p className="text-gray-500 text-sm">Responderemos em até 2 dias úteis.</p>
                  <button onClick={() => setSent(false)} className="btn-navy mt-6">Enviar outra mensagem</button>
                </div>
              ) : (
                <form onSubmit={submit} className="space-y-5">
                  <div>
                    <label className="form-label">Nome completo</label>
                    <input
                      className="form-input"
                      required
                      value={form.nome}
                      onChange={e => setForm(f => ({ ...f, nome: e.target.value }))}
                      placeholder="Seu nome"
                    />
                  </div>
                  <div>
                    <label className="form-label">E-mail</label>
                    <input
                      type="email"
                      className="form-input"
                      required
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="seu@email.com"
                    />
                  </div>
                  <div>
                    <label className="form-label">Assunto</label>
                    <select
                      className="form-input"
                      value={form.assunto}
                      onChange={e => setForm(f => ({ ...f, assunto: e.target.value }))}
                      required
                    >
                      <option value="">Selecione...</option>
                      <option>Inscrição em projeto</option>
                      <option>Parceria institucional</option>
                      <option>Transparência / Prestação de contas</option>
                      <option>Imprensa</option>
                      <option>Outros</option>
                    </select>
                  </div>
                  <div>
                    <label className="form-label">Mensagem</label>
                    <textarea
                      className="form-input h-32 resize-none"
                      required
                      value={form.msg}
                      onChange={e => setForm(f => ({ ...f, msg: e.target.value }))}
                      placeholder="Escreva sua mensagem..."
                    />
                  </div>
                  <button type="submit" className="btn-primary w-full justify-center">
                    <Send size={16} /> Enviar mensagem
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
