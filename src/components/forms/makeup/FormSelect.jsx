export default function FormSelect({children, onChange, required, name, type, placeholder}) {
    return (
        <>
            <div className={"m-5"}>
                <div className={"text-2xl text-slate-200"}>
                    <label htmlFor={name}>{name}</label>
                </div>
                <div>
                    <select name={name} id={name} onChange={onChange || undefined} required={required} className={"text-xl text-black p-1 pl-3 pr-3 w-full"}>{children}</select>
                </div>
            </div>
        </>
    )
}
