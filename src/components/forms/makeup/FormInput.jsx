export default function FormInput({onChange, required, name, value, type, placeholder}) {
    return (
        <>
            <div className={"m-5"}>
                <div className={"text-2xl text-slate-200"}>
                    <label htmlFor={name}>{name}</label>
                </div>
                <div>
                    <input name={name} id={name} value={value || ""} placeholder={placeholder || name} type={type || "text"}  onChange={onChange || undefined} required={required} className={"text-xl text-black p-1 pl-3 pr-3 w-full"} />
                </div>
            </div>
        </>
    )
}
