'use client'

import type {
  AuthProfileResponseDto,
  AuthTokensResponseDto,
  AuthRefreshResponseDto,
  LoginDto,
  RegisterDto,
} from '@org/types'
import axios from 'axios'
import { useCallback, useEffect } from 'react'
import { useAuthStore } from '@/stores/auth-store'
import { AUTH_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/config/api'
import { endpoints } from '@/config/api/endpoints'
import { apiClient } from '@/lib/api-client'

function getStoredToken(): string | null {
  if (typeof sessionStorage === 'undefined') return null
  return sessionStorage.getItem(AUTH_TOKEN_KEY)
}

function getStoredRefreshToken(): string | null {
  if (typeof sessionStorage === 'undefined') return null
  return sessionStorage.getItem(REFRESH_TOKEN_KEY)
}

function setStoredTokens(accessToken: string, refreshToken?: string): void {
  sessionStorage.setItem(AUTH_TOKEN_KEY, accessToken)
  if (refreshToken) sessionStorage.setItem(REFRESH_TOKEN_KEY, refreshToken)
}

function clearStoredToken(): void {
  sessionStorage.removeItem(AUTH_TOKEN_KEY)
  sessionStorage.removeItem(REFRESH_TOKEN_KEY)
}

/** Slug do role de dono de estabelecimento; quem tem esse role é redirecionado para /freelancers */
const OWNER_ROLE = 'owner'

/** Credenciais de login; use LoginDto de @org/types para requisição à API */
export type LoginCredentials = LoginDto

/** Dados de registro; use RegisterDto de @org/types para requisição à API */
export type RegisterCredentials = RegisterDto

export interface AuthError {
  message: string
  status?: number
}

/**
 * Hook de autenticação: login, register, logout, token em sessionStorage,
 * estado authenticated e redirecionamento por tipo (owner -> /freelancers, demais -> /jobs).
 */
export function useAuth() {
  const { user, isAuthenticated, isLoading, setUser, setLoading, logout: storeLogout } = useAuthStore()

  const isOwner = Boolean(user?.roles?.includes(OWNER_ROLE))

  /** Caminho para onde redirecionar após login: owner -> /freelancers, caso contrário -> /jobs */
  const getRedirectPath = useCallback((): string => {
    if (!user) return '/login'
    return user.roles?.includes(OWNER_ROLE) ? '/freelancers' : '/jobs'
  }, [user])

  /** Carrega o perfil a partir do token salvo (hidratação ao montar o app) */
  const hydrateFromToken = useCallback(async () => {
    const token = getStoredToken()
    if (!token) {
      setLoading(false)
      return
    }
    setLoading(true)
    try {
      const { data } = await apiClient.get<AuthProfileResponseDto>(endpoints.auth.profile, {
        headers: { Authorization: `Bearer ${token}` },
      })
      setUser(data)
    } catch {
      clearStoredToken()
      storeLogout()
    } finally {
      setLoading(false)
    }
  }, [setUser, setLoading, storeLogout])

  useEffect(() => {
    hydrateFromToken()
  }, [hydrateFromToken])

  const login = useCallback(
    async (credentials: LoginCredentials): Promise<string> => {
      setLoading(true)
      try {
        const { data } = await apiClient.post<AuthTokensResponseDto>(endpoints.auth.login, credentials)
        const { access_token, refresh_token, user } = data
        setStoredTokens(access_token, refresh_token)
        setUser(user)
        return user.roles?.includes(OWNER_ROLE) ? '/freelancers' : '/jobs'
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const message =
            err.response?.data?.message ?? (err.response?.status === 401 ? 'E-mail ou senha inválidos.' : 'Erro ao fazer login.')
          throw { message, status: err.response?.status } as AuthError
        }
        throw err
      } finally {
        setLoading(false)
      }
    },
    [setUser, setLoading]
  )

  const register = useCallback(
    async (credentials: RegisterCredentials): Promise<string> => {
      setLoading(true)
      try {
        const { data } = await apiClient.post<AuthTokensResponseDto>(endpoints.auth.register, credentials)
        const { access_token, refresh_token, user } = data ?? {}
        if (access_token) setStoredTokens(access_token, refresh_token)
        if (!user) throw { message: 'Resposta inválida do servidor.' } as AuthError
        setUser(user)
        return user.roles?.includes(OWNER_ROLE) ? '/freelancers' : '/jobs'
      } catch (err: unknown) {
        if (axios.isAxiosError(err)) {
          const message =
            err.response?.data?.message ??
            (err.response?.status === 409 ? 'Este e-mail já está em uso.' : 'Erro ao criar conta.')
          throw { message, status: err.response?.status } as AuthError
        }
        throw err
      } finally {
        setLoading(false)
      }
    },
    [setUser, setLoading]
  )

  const logout = useCallback(() => {
    clearStoredToken()
    storeLogout()
  }, [storeLogout])

  /** Atualiza o access token usando o refresh token (OpenAPI: POST /auth/refresh). */
  const refresh = useCallback(async (): Promise<boolean> => {
    const refreshToken = getStoredRefreshToken()
    if (!refreshToken) return false
    try {
      const { data } = await apiClient.post<AuthRefreshResponseDto>(endpoints.auth.refresh, {
        refreshToken,
      })
      if (data?.access_token) {
        sessionStorage.setItem(AUTH_TOKEN_KEY, data.access_token)
        return true
      }
      return false
    } catch {
      return false
    }
  }, [])

  /** Token atual (para usar em chamadas à API). */
  const token = typeof sessionStorage !== 'undefined' ? getStoredToken() : null

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    isOwner,
    getRedirectPath,
    login,
    register,
    logout,
    refresh,
    hydrateFromToken,
  }
}
