"use client"
import {FaDeleteLeft} from "react-icons/fa6";
import {useRouter} from "next/navigation";


export default function DeletePostButton({mediaID}) {
    const router = useRouter();

    async function deleteMedia() {
        const res = await fetch(`/api/media/${mediaID}`,
            {method: "DELETE"})
        console.log(res)
        const parsed = await res.json()
        if (parsed.success) {
            router.push("/")
        }

    }

    return (<span onClick={deleteMedia}><FaDeleteLeft/></span>)
}


