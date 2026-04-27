import { supabase } from '@/lib/supabase'

export async function registarEmpresa(dados) {
  const {
    email, nome_empresa, nome_responsavel, telefone, pais, tamanho, tipos_automacao
  } = dados

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password: dados.password,
    options: { data: { tipo: 'empresa', nome: nome_responsavel } },
  })
  if (authError) throw authError

  const userId = authData.user.id

  const { error: profileError } = await supabase
    .from('profiles')
    .insert({ id: userId, tipo: 'empresa' })
  if (profileError) throw profileError

  const { error: empresaError } = await supabase
    .from('empresas')
    .insert({
      user_id: userId,
      nome: nome_empresa,
      nome_responsavel,
      email,
      telefone: telefone || null,
      pais: pais || 'Portugal',
      tamanho: tamanho || null,
      tipos_automacao: tipos_automacao || [],
    })
  if (empresaError) throw empresaError

  return authData
}

export async function registarEspecialista(dados) {
  const {
    email, nome, telefone, linkedin, portfolio, pais, anos_experiencia, skills
  } = dados

  const { data: authData, error: authError } = await supabase.auth.signUp({
    email,
    password: dados.password,
    options: { data: { tipo: 'especialista', nome } },
  })
  if (authError) throw authError

  const userId = authData.user.id

  const { error: profileError } = await supabase
    .from('profiles')
    .insert({ id: userId, tipo: 'especialista' })
  if (profileError) throw profileError

  const { error: espError } = await supabase
    .from('especialistas')
    .insert({
      user_id: userId,
      nome,
      email,
      telefone: telefone || null,
      linkedin: linkedin || null,
      portfolio: portfolio || null,
      pais: pais || 'Portugal',
      anos_experiencia: anos_experiencia || null,
      skills: skills || [],
    })
  if (espError) throw espError

  return authData
}

export async function login(email, password) {
  const { data, error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) throw error
  return data
}

export async function logout() {
  const { error } = await supabase.auth.signOut()
  if (error) throw error
}

export async function resetPassword(email) {
  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/nova-password`,
  })
  if (error) throw error
}
