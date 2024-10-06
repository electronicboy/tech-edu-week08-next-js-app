export default function FormTextArea({onChange, value, required, name, type, placeholder}) {
    return (
        <>
            <div className={"m-5"}>
                <div className={"text-2xl text-slate-200"}>
                    <label htmlFor={name}>{name}</label>
                </div>
                <div>
                    <textarea name={name} id={name} placeholder={placeholder || name} type={type || "text"}  value={value} onChange={onChange || undefined} required={required} className={"text-xl text-black p-1 pl-3 pr-3 w-full"} />
                </div>
            </div>
        </>
    )
}
