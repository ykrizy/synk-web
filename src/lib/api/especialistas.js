import { supabase } from '@/lib/supabase'

export async function listarEspecialistas({ skill, disponivel, ordenar = 'rating' } = {}) {
  let query = supabase
    .from('especialistas')
    .select('*')
    .eq('verificado', true)

  if (skill) {
    query = query.contains('skills', [skill])
  }
  if (disponivel) {
    query = query.eq('disponivel_agora', true)
  }

  if (ordenar === 'rating') query = query.order('rating', { ascending: false })
  else if (ordenar === 'preco_asc') query = query.order('preco_hora', { ascending: true })
  else if (ordenar === 'preco_desc') query = query.order('preco_hora', { ascending: false })

  const { data, error } = await query
  if (error) throw error
  return data
}

export async function obterEspecialista(id) {
  const { data, error } = await supabase
    .from('especialistas')
    .select('*')
    .eq('id', id)
    .single()
  if (error) throw error
  return data
}

export async function atualizarEspecialista(id, campos) {
  const { data, error } = await supabase
    .from('especialistas')
    .update(campos)
    .eq('id', id)
    .select()
    .single()
  if (error) throw error
  return data
}

export async function matchingEspecialistas({ tool, budget, deadline, sector }) {
  const { data, error } = await supabase
    .from('especialistas')
    .select('*')
    .eq('verificado', true)
  if (error) throw error
  return data
}
