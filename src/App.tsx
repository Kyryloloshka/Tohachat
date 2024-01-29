import { Routes, Route } from 'react-router-dom';
import './globals.css'
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';
import { AllUsers, CreatePost, EditPost, Explore, Home, PostDetails, Profile, Saved, UpdateProfile } from './_root/pages';
import SignInForm from './_auth/forms/SignInForm';
import SignUpForm from './_auth/forms/SignUpForm';
import { Toaster } from './components/ui/toaster';
import NotFound from './_root/pages/NotFound';
import Settings from './_root/pages/Settings';

export default function App() {
  const element = document.documentElement;
  const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

  function onWindowMatch() {
      if (localStorage.theme === 'dark' || (!("theme" in localStorage) && darkQuery.matches)) {
          element.classList.add("dark");
      } else {
          element.classList.remove("dark")
      }
  }
  onWindowMatch()

  return (
    <>
      <main className='flex h-[100vh] h-[100dvh]'>
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path={"/sign-in"} element={<SignInForm/>} />
            <Route path={"/sign-up"} element={<SignUpForm/>} />
          </Route>

          <Route element={<RootLayout/>}>
            <Route index element={<Home/>}/>
            <Route path="/explore" element={<Explore/>}/>
            <Route path="/saved" element={<Saved/>}/>
            <Route path="/all-users" element={<AllUsers/>}/>
            <Route path="/create-post" element={<CreatePost/>}/>
            <Route path="/update-post/:id" element={<EditPost/>}/>
            <Route path="/posts/:id" element={<PostDetails/>}/>
            <Route path="/profile/:id/*" element={<Profile/>}/>
            <Route path="/update-profile/:id" element={<UpdateProfile/>}/>
            <Route path="/settings" element={<Settings/>}/>
          </Route>
          <Route path="/*" element={<NotFound/>}/>
        </Routes>
        <Toaster />

      </main>
    </>
  );
}