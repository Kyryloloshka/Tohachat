import { sidebarLinks } from '@/constants';
import { useUserContext } from '@/context/AuthContext';
import { useSignOutAccount } from '@/lib/react-query/querysAndMutations';
import { INavLink } from '@/types';
import { useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button';
import ThemeSwitch from './ThemeSwitch';

const LeftSidebar = () => {
    const {mutate: signOut, isSuccess} = useSignOutAccount()
    const navigate = useNavigate();
    const {pathname} = useLocation()
    const {user} = useUserContext()

    useEffect(() => {
        if (isSuccess) {
            navigate(0);
        }
    }, [isSuccess])
    const logoSrc = localStorage.getItem("theme") === 'dark' ? "/assets/icons/toha-logo-white.svg" : "/assets/icons/toha-logo-black.svg";
    return (
        <nav className='leftsidebar'>
            <div className="flex flex-col gap-11">
                <ThemeSwitch/>
                <Link to="/" className='flex gap-1 items-center'>
                    <img src={logoSrc} alt="logo" width={40} height={40} />
                    <div className="text-xl font-semibold dark:text-light-1">Tohachat</div>
                </Link>
                <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
                    <img 
                        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"} 
                        alt="profile" 
                        className='h-14 w-14 rounded-full'
                    />
                    <div className="flex flex-col ">
                        <p className='body-bold dark:text-light-2'>
                            {user.name}
                        </p>
                        <p className='small-regular text-dark-3 dark:text-light-2'>
                            @{user.username}
                        </p>
                    </div>
                </Link>
                <ul className='flex flex-col gap-2'>
                    {sidebarLinks.map((link: INavLink) =>{
                        const isActive = pathname === link.route;
                        return (
                            <li key={link.label} className={`group leftsidebar-link dark:text-light-1 ${
                                isActive && 'bg-primary-500'
                            }`}>
                                <NavLink className={"flex gap-4 items-center p-4"} to={`${link.route}`}>
                                    <img className={`transition-all group-hover:invert-white ${
                                        isActive && "invert-white"
                                    }`} src={link.imgURL} alt={link.label} />
                                    {link.label}
                                </NavLink>
                            </li>
                        )
                    })}
                </ul>
            </div>
            <Button 
                onClick={() => signOut()}
                variant="ghost" className='shad-button_ghost'
            >
                <img src="/assets/icons/logout.svg" alt="logout" />
                <p className='small-medium lg-base-medium dark:text-light-1'>Logout</p>
            </Button>
        </nav>
    )
}

export default LeftSidebar