import { useState } from 'react'

type PasswordFieldProps = {
    name?: string;
    placeholder?: string;
    classes?: string;
    required?: boolean;
}

export default function PasswordField({ name = 'password', placeholder = 'Password', classes = '', required = false }: PasswordFieldProps) {
    const [showPassword, setShowPassword] = useState(false)

    const handleMouseDownPassword = () => {
        setShowPassword(true)
    }

    const handleMouseUpPassword = () => {
        setShowPassword(false)
    }
    return (
        < div className="relative" >
            <input
                name={name}
                placeholder={placeholder}
                className={`w-full p-3 rounded bg-gray-100 placeholder-gray-500 ${classes}`}
                required={required}
                type={showPassword ? 'text' : 'password'}
            />
            <span
                onMouseDown={handleMouseDownPassword}
                onTouchStart={handleMouseDownPassword}
                onMouseUp={handleMouseUpPassword}
                onTouchEnd={handleMouseUpPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 cursor-pointer" >
                {/* eye icon */}
                < svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="gray" >
                    <path d="M10 3C5.454 3 1.73 6.11.25 10c1.48 3.89 5.204 7 9.75 7s8.27-3.11 9.75-7c-1.48-3.89-5.204-7-9.75-7zm0 12a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z" />
                </svg>
            </span>
        </div>
    )
}
