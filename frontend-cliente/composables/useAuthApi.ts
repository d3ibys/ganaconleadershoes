export const useAuthApi = () => {
  const baseURL = 'http://191.101.80.132:4000/api' //useRuntimeConfig().public.NUXT_PUBLIC_BASE_API

  const register = async (payload: { fullName: string; email: string; password: string }) => {
    return await $fetch(`${baseURL}/auth/register`, {
      method: 'POST',
      body: payload,
    })
  }

  const login = async (payload: { email: string; password: string }) => {
    return await $fetch(`${baseURL}/auth/login`, {
      method: 'POST',
      body: payload,
    })
  }

  const getProfile = async (token: string) => {
    return await $fetch(`${baseURL}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  return { register, login, getProfile }
}

