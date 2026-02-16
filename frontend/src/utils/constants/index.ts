export const validationRules = [
    {
        fieldName: 'username',
        pattern: /^.{3,}$/,
        errorMessage: 'Username must be at least 3 characters long'
    },
    {
        fieldName: 'email',
        pattern: /^[a-zA-Z0-9]([a-zA-Z0-9._-]*[a-zA-Z0-9])?@[a-zA-Z0-9]([a-zA-Z0-9.-]*[a-zA-Z0-9])?\.[a-zA-Z]{2,}$/,
        errorMessage: 'Please enter a valid email address'
    },
    {
        fieldName: 'phone',
        pattern: /^.{10,}$/,
        errorMessage: 'Phone number must be at least 10 characters long'
    },
    {
        fieldName: 'password',
        pattern: /^.{6,}$/,
        errorMessage: 'Password must be at least 6 characters long'
    }
]