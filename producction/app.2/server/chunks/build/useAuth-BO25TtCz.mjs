import { useRouter } from 'vue-router';
import { watch, computed, toRef, isRef, nextTick } from 'vue';
import { a as useNuxtApp } from './server.mjs';

const useStateKeyPrefix = "$s";
function useState(...args) {
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  const [_key, init] = args;
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useState] key must be a string: " + _key);
  }
  if (init !== void 0 && typeof init !== "function") {
    throw new Error("[nuxt] [useState] init must be a function: " + init);
  }
  const key = useStateKeyPrefix + _key;
  const nuxtApp = useNuxtApp();
  const state = toRef(nuxtApp.payload.state, key);
  if (state.value === void 0 && init) {
    const initialValue = init();
    if (isRef(initialValue)) {
      nuxtApp.payload.state[key] = initialValue;
      return initialValue;
    }
    state.value = initialValue;
  }
  return state;
}
const useAuthApi = () => {
  const baseURL = "https://api.ganaconleadershoes.com/api";
  const register = async (payload) => {
    return await $fetch(`${baseURL}/auth/register`, {
      method: "POST",
      body: payload
    });
  };
  const login = async (payload) => {
    return await $fetch(`${baseURL}/auth/login`, {
      method: "POST",
      body: payload
    });
  };
  const getProfile = async (token) => {
    return await $fetch(`${baseURL}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`
      }
    });
  };
  return { register, login, getProfile };
};
const useAuth = () => {
  const getLocal = (key, defaultValue) => {
    return defaultValue;
  };
  const token = useState("auth_token", () => getLocal("auth_token", null));
  const user = useState("auth_user", () => getLocal("auth_user", null));
  const loading = useState("auth_loading", () => false);
  watch(token, (newVal) => {
  });
  watch(user, (newVal) => {
  });
  const { login: apiLogin, register: apiRegister, getProfile } = useAuthApi();
  const login = async (payload) => {
    loading.value = true;
    try {
      const response = await apiLogin(payload);
      token.value = response.token;
      user.value = response.user;
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  };
  const register = async (payload) => {
    loading.value = true;
    try {
      const response = await apiRegister(payload);
      token.value = response.token;
      user.value = response.user;
    } catch (error) {
      throw error;
    } finally {
      loading.value = false;
    }
  };
  const fetchUser = async () => {
    if (!token.value) return;
    try {
      const response = await getProfile(token.value);
      user.value = response;
    } catch (error) {
      logout();
    }
  };
  const router = useRouter();
  const logout = () => {
    token.value = null;
    user.value = null;
    nextTick(() => {
      router.push("/");
    });
  };
  return {
    token,
    user,
    loading,
    login,
    register,
    fetchUser,
    logout,
    isLoggedIn: computed(() => !!token.value)
  };
};

export { useAuth as u };
//# sourceMappingURL=useAuth-BO25TtCz.mjs.map
