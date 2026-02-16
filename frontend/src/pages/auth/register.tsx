import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { AuthService } from '../../services/auth.service'
import LoadingSpinner from '../../utils/components/LoadingSpinner'
import ButtonComponent from '../../components/form/ButtonCopmement'
import CheckBoxField from '../../components/form/CheckBoxField'
import FormField from '../../components/form/FormField'
import PasswordField from '../../components/form/PasswordField'
import useFormValidation from '../../hooks/useFormValidation'
import { validationRules } from '../../utils/constants'
import ErrorMessage from '../../components/form/ErrorMessage'

export default function RegisterPage() {
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const { validateAllFields, focusFirstInvalidField } = useFormValidation()

    const navigate = useNavigate()

    const handleGoogleRegister = () => alert('OAuth2 login functionality is not implemented yet.');

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        //extract form values
        const username = (e.currentTarget.elements[0] as HTMLInputElement)
        const email = (e.currentTarget.elements[1] as HTMLInputElement)
        const phone = (e.currentTarget.elements[2] as HTMLInputElement)
        const password = (e.currentTarget.elements[3] as HTMLInputElement)
        const agreeToTerms = (e.currentTarget.elements[4] as HTMLInputElement).checked
        if (!agreeToTerms) {
            alert('You must agree to the terms and conditions to register.');
            return;
        }

        // validate fields before sending register request
        setError('')
        const validationResults = validateAllFields(validationRules)
        // if invalid, show error message and focus first invalid field
        if (validationResults.length > 0) {
            setError(validationResults.map(result => result.errorMessage).join(', '))
            focusFirstInvalidField(validationResults)
            return
        }

        // call authService register method here and handle response
        try {
            setLoading(true)
            const response = await AuthService.getInstance().register(username.value, email.value, phone.value, password.value)
            if (response.success) {
                navigate('/', { replace: true })
            } else {
                setError(response.message);
            }
        } catch (error: any) {
            // console.error("Registration error:", error);
            setError(`${error.message || 'Registration failed. Please try again.'}`);
        } finally {
            setLoading(false);
        }
    }

    return (
        <section className="min-h-screen flex items-start justify-center" >
            {/* Left Banner */}
            <figure className="hidden lg:block w-2/3 h-screen rounded-lg shadow-xl py-3">
                <img src="/src/assets/easy3.webp" draggable="false" alt="side image" className="w-full h-full object-cover object-top rounded-lg shadow-[1px_5px_37px_-14px_rgba(59,_130,_246,_0.5)]" />
            </figure>
            {/* Registration Form */}
            <div className="w-full h-screen overflow-y-auto p-6 space-y-10 shadow-[1px_5px_37px_-14px_rgba(59,_130,_246,_0.5)] lg:max-w-lg" >
                <h2 className="text-3xl font-bold my-5 py-5" > Create your account </h2>

                {/* Error message */}
                <ErrorMessage error={error} />

                < form className="w-full bg-white rounded shadow-md flex flex-col space-y-5" onSubmit={handleRegister} >
                    {/* Username field */}
                    <FormField name="username" placeholder="Username" required />

                    {/* email field */}
                    <FormField name="email" placeholder="Email" required />

                    {/* phone number field */}
                    <FormField name="phone" placeholder="Phone number" required type='number' />

                    {/* password with show password icon */}
                    <PasswordField name="password" placeholder="Password" required />

                    {/* Agree to terms toggler */}
                    <CheckBoxField label="I agree to the terms and conditions" required />

                    {/* sign up button */}
                    <ButtonComponent type="submit"> Sign up </ButtonComponent>
                </form>

                {/* Loading indicator */}
                {loading && <LoadingSpinner />}

                {/* Sign up with Google */}
                <ButtonComponent className='w-full flex items-center gap-2 justify-center bg-black my-4 p-4 text-white hover:bg-gray-800' onClick={handleGoogleRegister}>
                    <img
                        src="/src/assets/Google__G__logo.svg.webp"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    <span className="ml-2" > Sign up with Google </span>
                </ButtonComponent>

                {/* Sign in */}
                <p className='text-center my-10' > Already have an account? <Link to="/login" className="text-blue-500 ps-3 hover:underline">Sign in</Link></p>

                {/* Vite Logo */}
                <figure className='flex items-center justify-center gap-2 mt-10 hover:cursor-pointer' onClick={() => window.open('https://www.easygenerator.com/en/', '_blank')}>
                    <img src="/vite.svg" alt="Vite Logo" />
                    <span>Authently by EasyGenerator </span>
                </figure>
            </div>
        </section>
    )
}
