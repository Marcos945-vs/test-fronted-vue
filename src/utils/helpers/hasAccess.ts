import { useAuthStore } from '@/stores/auth';

export function hasAccess(ability: string): boolean {
    const auth = useAuthStore();
    const user = auth.user;
    if (!user) return false;
    const isAdmin = user.user?.roles?.[0]?.name === 'admin';
    const hasAbility = Array.isArray(user.abilities) && user.abilities.includes(ability);
    return isAdmin || hasAbility;
}