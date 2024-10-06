//'use client'
import Link from "next/link";
import {FaPlus} from "react-icons/fa";
//import {motion} from "framer-motion";
import * as motion from "framer-motion/client"

export default function Header() {

    const hoverPlus = {

        initial: {
            rotateX: 0,
        },
        hover: {
            rotate: 45,
            transition: {
                duration: 0.4,
            }
        }
    }

    return (<header className={"min-h-16 text-white bg-gray-800 w-full align-baseline p-4"}>
        <div className="mx-auto flex items-baseline md:w-800 gap-x-4">
            <span className={"text-4xl"}>SofaTime</span>
            <div className={"flex items-center justify-between w-full"}>
                <nav className="text-xl justify-between flex gap-x-4">
                    <Link href="/">Home</Link>
                    <Link href="/genres">Genres</Link>
                </nav>
                <nav>
                    <motion.span variants={hoverPlus} whileHover={"hover"} animate={"initial"}>
                        <motion.div variants={hoverPlus}>
                            <Link href={"/create"}><FaPlus variants={hoverPlus}/></Link>
                        </motion.div>
                    </motion.span>
                </nav>
            </div>


        </div>
    </header>)
}
