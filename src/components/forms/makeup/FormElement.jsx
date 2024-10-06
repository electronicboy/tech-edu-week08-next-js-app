'use client'
export default function FormElement({children, submitAction}) {
    function handleSubmit(e) {
        e.preventDefault();
        submitAction(e)
    }

    return (<>
            <form onSubmit={handleSubmit} className={"pt-3 pb-3"}>
                {children}
            </form>
        </>)
}
