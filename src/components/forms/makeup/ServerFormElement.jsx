export default function ServerFormElement({children, submitAction}) {

    return (<>
        <form action={submitAction} className={"pt-3 pb-3"}>
            {children}
        </form>
    </>)
}
