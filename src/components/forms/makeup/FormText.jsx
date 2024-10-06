export default function FormText({text, error}) {
    return (<>
        <div className={"md-5 " + (error ? "bg-red-400" : "")}>
            {error && <span>{error}</span> || <span>{text}</span>}
        </div>
        </>)
}
