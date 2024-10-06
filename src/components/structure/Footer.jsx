export default function Footer() {
    return (
        <footer className={"text-white mt-8 bg-gray-800 w-full align-baseline p-4 text-center"}>
            {/* Totally don't just need to add this to mitigate visual issues with content reaching the bottom of the dom*/}
            &copy; SofaTime {new Date().getFullYear()}
        </footer>
    )
}
