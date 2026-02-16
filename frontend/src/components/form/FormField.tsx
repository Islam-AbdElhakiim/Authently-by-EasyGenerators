type FormFieldProps = {
  name: string;
  type?: string;
  placeholder?: string;
  classes?: string;
  required?: boolean;
}

export default function FormField({ name = '', type = 'text', placeholder = '', classes = '', required = false }: FormFieldProps) {
  return (
    <input
      name={name}
      type={type}
      placeholder={placeholder}
      className={`p-3 rounded bg-gray-100 placeholder-gray-500 ${classes}`}
      required={required}
    />
  )
}
