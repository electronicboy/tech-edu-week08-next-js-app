"use client"
import {motion} from "framer-motion";
import {useRouter} from "next/navigation"

export default function MovieCard({id, name, type, img}) {
    const router = useRouter()
    // https://stackoverflow.com/questions/57125263/animate-children-when-hover-at-parent-with-framer-motion
    const card = {
        normal: {
            opacity: 0,
            transition: {
                duration: 0.4,
                type: "tween",
                ease: "easeIn"
            }
        },
        hover: {
            opacity: 1,
            transition: {
                duration: 0.4,
                type: "tween",
                ease: "easeIn"
            }
        }
    }

    function doNavigate() {
        router.push("/media/" + id)
    }

    return (
        <motion.div onClick={doNavigate} whileHover={"hover"} animate={"normal"} className={"w-[200px] h-[300px] overflow-hidden relative rounded-2xl bg-contain shadow shadow-slate-800"} style={{backgroundImage: `url(${img})`}}>
            {/*<Image src={img} alt={name} width={200} height={600}/>*/}
            <motion.div variants={card} className={"absolute bottom-0 bg-slate-600 bg-opacity-60 w-full text-center backdrop-blur-sm"}>
                <span>{name}</span>
            </motion.div>
        </motion.div>
    )
}
