'use client'

import type { RoleDto } from '@org/types'
import { useCallback } from 'react'
import { useAppStore } from '@/stores/app-store'
import { apiClient } from '@/lib/api-client'
import { rolesEndpoints } from '@/config/api/endpoints'

interface PaginatedRolesResponse {
  data: RoleDto[]
  total: number
  page: number
  limit: number
  totalPages: number
}

export function useRoles() {
  const roles = useAppStore((s) => s.roles)
  const rolesLoading = useAppStore((s) => s.rolesLoading)
  const setRoles = useAppStore((s) => s.setRoles)
  const setRolesLoading = useAppStore((s) => s.setRolesLoading)

  const loadRoles = useCallback(async () => {
    setRolesLoading(true)
    try {
      const { data } = await apiClient.get<PaginatedRolesResponse>(rolesEndpoints.list, {
        params: { page: 1, limit: 50 },
      })
      const list = Array.isArray(data) ? data : (data?.data ?? [])
      setRoles(list)
    } catch (err) {
      console.error('Failed to load roles:', err)
      setRoles([])
    } finally {
      setRolesLoading(false)
    }
  }, [setRoles, setRolesLoading])

  return {
    roles,
    loadRoles,
    isLoading: rolesLoading,
  }
}
