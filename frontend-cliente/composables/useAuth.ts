import { useAuthApi } from './useAuthApi'
import { useRouter } from 'vue-router'
import { nextTick } from 'vue'; // Importar nextTick

export const useAuth = () => {
  // Helper functions for localStorage
  const getLocal = <T = any>(key: string, defaultValue: T): T => {
    if (process.client) {
      const value = localStorage.getItem(key)
      try {
        return value !== null ? JSON.parse(value) : defaultValue
      } catch {
        return defaultValue
      }
    }
    return defaultValue
  }

  const setLocal = (key: string, value: any) => {
    if (process.client) {
      localStorage.setItem(key, JSON.stringify(value))
    }
  }

  const removeLocal = (key: string) => {
    if (process.client) {
      localStorage.removeItem(key)
    }
  }

  // State initialization with localStorage fallback
  const token = useState<string | null>('auth_token', () => getLocal('auth_token', null))
  const user = useState<any | null>('auth_user', () => getLocal('auth_user', null))
  const loading = useState<boolean>('auth_loading', () => false)

  // Sync state changes to localStorage
  watch(token, (newVal) => {
    if (newVal) setLocal('auth_token', newVal)
    else removeLocal('auth_token')
  })
  watch(user, (newVal) => {
    if (newVal) setLocal('auth_user', newVal)
    else removeLocal('auth_user')
  })

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

  const router = useRouter();

  const logout = () => {
    token.value = null;
    user.value = null;
    removeLocal('auth_token');
    removeLocal('auth_user');

    // ENVOLVER EN nextTick
    nextTick(() => {
      router.push('/');
    });
  };

  // On client-side hydration, sync state from localStorage if not set
  if (process.client) {
    if (!token.value) token.value = getLocal('auth_token', null)
    if (!user.value) user.value = getLocal('auth_user', null)
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
