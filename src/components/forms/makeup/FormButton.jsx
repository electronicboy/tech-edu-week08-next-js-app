export default function FormButton({text}) {
    return (
        <>
            <div className={"m-5 text-center text-white"}>
                <button className={"bg-green-700 font-bold rounded-xl px-3 py-1"}>{text}</button>
            </div>
        </>
    )
}
