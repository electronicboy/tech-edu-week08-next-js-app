'use client'
export default function ClientFormElement({children, submitAction}) {
    function handleSubmit(e) {
        console.log(e)
        e.preventDefault();
        try {
            submitAction(e)
        } catch (error) {
            console.error(error)
        }
    }

    return (<>
            <form onSubmit={handleSubmit} className={"pt-3 pb-3"}>
                {children}
            </form>
        </>)
}
