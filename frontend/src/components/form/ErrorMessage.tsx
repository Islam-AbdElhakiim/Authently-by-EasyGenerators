
export default function ErrorMessage({ error }: { error: string }) {
    return (
        error && error.split(',').map((err, index) =>
            <p key={index} className="text-red-500 leading-1 " > {err.trim()} </p>

        )
    )
}
