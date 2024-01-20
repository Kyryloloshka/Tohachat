import { Routes, Route } from 'react-router-dom';
import './globals.css'
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { Home } from './_root/pages';
import SignInForm from './_auth/forms/SignInForm';
import SignUpForm from './_auth/forms/SignUpForm';

export default function App() {
  return (
    <>
      <main className='flex h-screen'>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path={"/sign-in"} element={<SignInForm/>} />
            <Route path={"/sign-up"} element={<SignUpForm/>} />
          </Route>

          <Route element={<RootLayout/>}>
            <Route index element={<Home/>}/>
          </Route>
        </Routes>
      </main>
    </>
  );
}