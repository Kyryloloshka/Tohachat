import Bottombar from '@/components/shared/Bottombar'
import LeftSidebar from '@/components/shared/LeftSidebar'
import TopBar from '@/components/shared/TopBar'
import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
  useEffect(() => {
    localStorage.theme = 'dark'
  },[])
  return (
    <div className='w-full md:flex dark:bg-dark-1'>
      <TopBar/>
      <LeftSidebar/>
      <section className='flex flex-1 h-full'>
        <Outlet/>
      </section>
      <Bottombar/>
    </div>
  )
}

export default RootLayout