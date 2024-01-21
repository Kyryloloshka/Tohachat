import { Navigate, Outlet } from "react-router-dom";

const AuthLayout = () => {
  const isAuthenticated = false;
  return (
    <>
      {isAuthenticated
        ? <Navigate to='/' />
        : <>
          <section className="flex flex-1 justify-center items-center flex-col p-10">
            <Outlet />
          </section>
          <img 
          src="https://images.unsplash.com/photo-1534142499731-a32a99935397?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8dmVydGljYWwlMjBsYW5kc2NhcGV8ZW58MHx8MHx8fDA%3D" 
          alt="logo" 
          className="hidden xl:block h-screen w-1/2 object-cover bg-no-repeat"
          />
        </>
      }
    </>
  )
}

export default AuthLayout