import { useAuthApi } from './useAuthApi'

export const useAuth = () => {
  const token = useState<string | null>('auth_token', () => null)
  const user = useState<any | null>('auth_user', () => null)
  const loading = useState<boolean>('auth_loading', () => false)

  const { login: apiLogin, register: apiRegister, getProfile } = useAuthApi()

  const login = async (payload: { email: string; password: string }) => {
    loading.value = true
    try {
      const response = await apiLogin(payload)
      token.value = response.token
      user.value = response.user
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const register = async (payload: { fullName: string; email: string; password: string }) => {
    loading.value = true
    try {
      const response = await apiRegister(payload)
      token.value = response.token
      user.value = response.user
    } catch (error) {
      throw error
    } finally {
      loading.value = false
    }
  }

  const fetchUser = async () => {
    if (!token.value) return
    try {
      const response = await getProfile(token.value)
      user.value = response
    } catch (error) {
      logout()
    }
  }

  const logout = () => {
    token.value = null
    user.value = null
  }

  return {
    token,
    user,
    loading,
    login,
    register,
    fetchUser,
    logout,
    isLoggedIn: computed(() => !!token.value),
  }
}

