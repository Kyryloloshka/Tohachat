import { Link } from "react-router-dom"

const NotFound = () => {
    return (
        <div className="w-full h-full relative">
            <img className="absolute h-full w-full object-cover" src="/assets/images/not-found-bg.jpg" alt="bg" />
            <div className="relative bg-[#0e0e25aa] h-full w-full z-1 flex flex-col  justify-center">
                <div className="flex flex-auto flex-col items-center justify-center gap-6 max-h-[400px]">
                    <h4 className="text-3xl font-semibold text-[#ffffffcc] pb-9">Oops...</h4>
                    <h2 className="text-9xl font-bold text-[#ffffff66] tracking-wider">404</h2>
                    <h2 className="text-5xl text-light-1">Page not found</h2>
                    <div className="flex-auto">
                        <Link to="/" className="bg-[#5D5FEF55] transition-all hover:bg-primary-500 text-light-1 py-3 px-5 rounded-lg font-medium">Back to Home</Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default NotFound