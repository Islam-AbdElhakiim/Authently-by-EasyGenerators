import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import useFormValidation from '../../hooks/useFormValidation'
import { AuthService } from '../../services/auth.service'
import LoadingSpinner from '../../utils/components/LoadingSpinner'
import ButtonComponent from '../../components/form/ButtonCopmement'
import CheckBoxField from '../../components/form/CheckBoxField'
import FormField from '../../components/form/FormField'
import PasswordField from '../../components/form/PasswordField'
import { validationRules } from '../../utils/constants'
import ErrorMessage from '../../components/form/ErrorMessage'

export default function LoginPage() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { validateAllFields, focusFirstInvalidField } = useFormValidation()

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const email = (e.currentTarget.elements[0] as HTMLInputElement)
        const password = (e.currentTarget.elements[1] as HTMLInputElement)
        const rememberMe = (e.currentTarget.elements[2] as HTMLInputElement).checked

        // validate email and password before sending login request
        setError('')
        const validationResults = validateAllFields(validationRules)
        // if invalid, show error message and focus first invalid field
        if (validationResults.length > 0) {
            setError(validationResults.map(result => result.errorMessage).join(', '))

            focusFirstInvalidField(validationResults)
            return
        }

        setLoading(true)
        try {
            const response = await AuthService.getInstance().login(email.value.trim(), password.value, rememberMe)
            if (response.success)
                navigate('/', { replace: true })
            else
                setError(response.message);

        } catch (error: any) {
            setError(error.message || 'Invalid credentials. Please try again.')
        } finally {
            setLoading(false)
        }
    }

    const handleForgotPassword = () => {
        // TODO: Implement forgot password logic here
        alert('Forgot password functionality is not implemented yet.');
    }

    const handleGoogleLogin = () => {
        // TODO: Implement Google login logic here
        alert('OAuth2 login functionality is not implemented yet.');
    }

    return (
        <section className="min-h-screen flex items-start justify-center  relative" >
            {/* Left Banner */}
            <figure className="hidden lg:block w-2/3 h-screen rounded-lg shadow-xl py-3 ">
                <img src="/src/assets/easy2.webp" draggable="false" alt="side image" className="w-full h-full object-cover object-top rounded-lg shadow-[1px_5px_37px_-14px_rgba(59,_130,_246,_0.5)]" />
            </figure>
            {/* Login Form */}
            <div className="w-full h-screen overflow-y-auto p-6 space-y-10 shadow-[1px_5px_37px_-14px_rgba(59,_130,_246,_0.5)] lg:max-w-lg" >
                <h2 className="text-3xl font-bold my-5 py-5" > Nice to see you again </h2>

                {/* Error message */}
                <ErrorMessage error={error} />

                <form className="w-full bg-white rounded shadow-md flex flex-col space-y-5" onSubmit={handleLogin} >
                    {/* email field */}
                    <FormField name="email" placeholder="Email" required />

                    {/* password with show password icon */}
                    <PasswordField placeholder="Password" required />

                    {/* remember me and Forgot password */}
                    <div className="flex items-center justify-between" >
                        <CheckBoxField label="Remember me" />

                        <ButtonComponent type="button" className='text-blue-500 hover:underline text-sm' onClick={handleForgotPassword} > Forgot password ? </ButtonComponent>
                    </div>

                    {/* sign in button */}
                    <ButtonComponent type="submit"> Sign in </ButtonComponent>
                </form>

                {/* Loading indicator */}
                {loading && <LoadingSpinner />}

                {/* Sign in with Google */}
                <ButtonComponent className='w-full flex items-center gap-2 justify-center bg-gray-800 my-4 p-4 text-white hover:bg-gray-700' onClick={handleGoogleLogin}>
                    <img
                        src="/src/assets/Google__G__logo.svg.webp"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    <span className="ml-2" > Sign in with Google </span>
                </ButtonComponent>

                {/* Sign up navigation */}
                <p className='text-center my-10' > Don't have an account? <Link to="/register" className="text-blue-500 ps-3 hover:underline">Sign up</Link></p>

                {/* Vite Logo */}
                <figure className='flex items-center justify-center gap-2 mt-10 hover:cursor-pointer' onClick={() => window.open('https://www.easygenerator.com/en/', '_blank')}>
                    <img src="/vite.svg" alt="Vite Logo" />
                    <span>Authently by EasyGenerator </span>
                </figure>
            </div>
        </section>
    )
}
