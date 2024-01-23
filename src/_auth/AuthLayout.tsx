import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated
        ? <Navigate to='/' />
        : <>
          <section className="flex flex-1 justify-center items-center flex-col p-10 before:w-full before:h-full before:bg-[#11111133] before:-z-10 before:absolute before:left-0 before:top-0">
            <video controls={false} disablePictureInPicture={true} disableRemotePlayback={true} autoPlay muted loop className="absolute h-full w-full object-cover -z-20">
              <source src="/assets/videos/bg-form.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
            <Outlet />
          </section>
        </>
      }
    </>
  )
}

export default AuthLayout