import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"

const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="w-full h-full relative">
            <img className="absolute h-full w-full object-cover" src="/assets/images/not-found-bg.jpg" alt="bg" />
            <div className="relative bg-[#000000aa] h-full w-full z-1 flex flex-col items-center justify-center gap-6 ">
                <h4 className="text-3xl font-semibold text-[#ffffffcc] pb-9">Oops...</h4>
                <h2 className="text-9xl font-bold text-[#ffffff66] tracking-wider">404</h2>
                <h2 className="text-5xl">Page not found</h2>
                <Button onClick={() => navigate("/")} className="">Back to Home</Button>
            </div>
        </div>
    )
}

export default NotFound