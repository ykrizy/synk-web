import { supabase } from '@/lib/supabase'

export async function obterEmpresa(userId) {
  const { data, error } = await supabase
    .from('empresas')
    .select('*')
    .eq('user_id', userId)
    .single()
  if (error) throw error
  return data
}

export async function criarProjeto(empresaId, projeto) {
  const { data, error } = await supabase
    .from('projetos')
    .insert({
      empresa_id: empresaId,
      ...projeto,
      estado: 'aberto',
    })
    .select()
    .single()
  if (error) throw error
  return data
}

export async function listarProjetosDaEmpresa(empresaId) {
  const { data, error } = await supabase
    .from('projetos')
    .select('*')
    .eq('empresa_id', empresaId)
    .order('created_at', { ascending: false })
  if (error) throw error
  return data
}
