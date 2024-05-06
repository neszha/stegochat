import { type NavigationGuardNext, type RouteLocationNormalized } from 'vue-router'

export const STORAGE_SC_SESSION_KEY = 'sc_session'

export const onlyGuestSession = (_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext): void => {
    const jsonData = localStorage.getItem(STORAGE_SC_SESSION_KEY)
    if (jsonData === null) next()
    else {
        next({ name: 'chat' })
    }
}

export const haveGuestSession = (_to: RouteLocationNormalized, _from: RouteLocationNormalized, next: NavigationGuardNext): void => {
    const jsonData = localStorage.getItem(STORAGE_SC_SESSION_KEY)
    if (jsonData !== null) next()
    else {
        localStorage.removeItem(STORAGE_SC_SESSION_KEY)
        next({ name: 'home' })
    }
}
