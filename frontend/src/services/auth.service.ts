
interface User {
    id: string
    email: string
    username?: string
    phone?: string
}

interface ILoginResponseDto {
    success: boolean
    message: string
    code: number
    authentlyError?: boolean
    access_token?: string
    user?: User
}

export class AuthService {
    private static instance: AuthService
    private readonly USER_KEY = 'auth_user'
    private currentUser: User | null = null

    private constructor() {
        // load user from localStorage on init
        this.loadUser()
    }

    public async login(email: string, password: string, rememberMe: boolean): Promise<ILoginResponseDto> {
        try {
            const endpoint = `${import.meta.env.VITE_AUTH_API_URL}/login`
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({ email, password, rememberMe }),
            })

            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}))
                throw new Error(errorData.message || 'Login failed')
            }

            const res: ILoginResponseDto = await response.json()

            if (res.success && res.user) {
                // Store user data 
                this.setUser(res.user)
            }
            return res
        } catch (error) {
            // console.error('Error during login:', error)
            throw error
        }
    }

    public async logout(): Promise<void> {
        try {
            const endpoint = `${import.meta.env.VITE_AUTH_API_URL}/logout`
            await fetch(endpoint, {
                method: 'POST',
                credentials: 'include', // Include cookies
            })
        } catch (error) {
            // console.error('Error during logout:', error)
        } finally {
            // Always clean up local user data
            this.removeUser()
        }
    }

    public async register(username: string, email: string, phone: string, password: string): Promise<ILoginResponseDto> {
        try {
            const endpoint = `${import.meta.env.VITE_AUTH_API_URL}/register`
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, email, phone, password }),
            })
            const res: ILoginResponseDto = await response.json().catch(() => ({}))
            if (!response.ok)
                throw new Error(res.message || 'Registration failed')

            if (res.success && res.user) {
                // Store user data 
                this.setUser(res.user)
            }
            return res
        } catch (error) {
            // console.error('Error during registration:', error)
            throw error
        }
    }

    public static getInstance(): AuthService {
        if (!AuthService.instance) {
            AuthService.instance = new AuthService()
        }
        return AuthService.instance
    }

    private loadUser(): void {
        const userData = localStorage.getItem(this.USER_KEY)
        this.currentUser = userData && userData != "undefined" ? JSON.parse(userData) : null
    }

    private setUser(user: User): void {
        localStorage.setItem(this.USER_KEY, JSON.stringify(user))
        this.currentUser = user
    }

    public getUser = (): User | null => this.currentUser

    private removeUser(): void {
        localStorage.removeItem(this.USER_KEY)
        this.currentUser = null
    }

}