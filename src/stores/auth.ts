import { defineStore } from 'pinia';
import { router } from '@/router';
/* import { fetchWrapper } from '@/utils/helpers/fetch-wrapper'; */
import axiosServices from '@/utils/axios';

const baseUrl = `${import.meta.env.VITE_API_URL}/users`;

export const useAuthStore = defineStore('auth', {
    state: () => ({
        // initialize state from local storage to enable user to stay logged in
        // @ts-ignore
        user: JSON.parse(localStorage.getItem('user')),
        returnUrl: null
    }),
    actions: {
        async login(email: string, password: string) {
            const user = await axiosServices
                .post('/login', { "email": email, "password": password })
                .then((res) => {
                    const user = res.data;
                    // update pinia state
                    this.user = user;
                    // store user details and jwt in local storage to keep user logged in between page refreshes
                    localStorage.setItem('user', JSON.stringify(user));
                    // redirect to previous url or default to home page
                    router.push(this.returnUrl || '/');
                })
                .catch((error) => {
                    console.error('Login error', error);
                });
        },
        logout() {
            this.user = null;
            localStorage.removeItem('user');
            router.push('/auth/login');
        }
    }
});
