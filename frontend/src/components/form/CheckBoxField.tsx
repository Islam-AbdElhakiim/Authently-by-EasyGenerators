
type CheckBoxFieldProps = {
    label: string;
    classes?: string;
    required?: boolean;
}

export default function CheckBoxField({ label, classes = '', required = false }: CheckBoxFieldProps) {
    return (
        <label className={`flex items-center space-x-2 ${classes}`} >
            <input type="checkbox" required={required} />
            <span className="text-sm" > {label} </span>
        </label>
    )
}
