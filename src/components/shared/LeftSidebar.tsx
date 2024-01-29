import { sidebarLinks } from '@/constants';
import { useUserContext } from '@/context/AuthContext';
import { useSignOutAccount } from '@/lib/react-query/querysAndMutations';
import { INavLink } from '@/types';
import { useEffect } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button';

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

    return (
        <nav className='leftsidebar'>
            <div className="flex flex-col gap-12">
                <Link to="/" className='flex gap-1 items-center bg-dark-4 py-3 px-5'>
                    <img src={"/assets/icons/toha-logo-white.svg"} alt="logo" width={40} height={40} />
                    <div className="text-xl font-semibold text-light-1">Tohachat<span className="font-normal text-sm">{" "}Beta</span></div>
                </Link>
                <div className="px-5 flex flex-col gap-11">
                    <ul className='flex flex-col gap-2'>
                        {sidebarLinks.map((link: INavLink) =>{
                            const isActive = pathname === link.route;
                            return (
                                <li key={link.label} className={`group leftsidebar-link dark:text-light-1 ${
                                    isActive && 'bg-primary-500'
                                }`}>
                                    <NavLink className={"flex gap-4 items-center p-4"} to={`${link.route}`}>
                                        <img height={24} width={24} className={`transition-all group-hover:invert-white ${
                                            isActive && "invert-white"
                                        }`} src={link.imgURL} alt={link.label} />
                                        {link.label}
                                    </NavLink>
                                </li>
                            )
                        })}
                        <li className={`group leftsidebar-link dark:text-light-1 ${
                                    pathname.startsWith('/profile/') && 'bg-primary-500'
                                }`}>
                            <Link to={`/profile/${user.id}`} className='flex gap-4 items-center p-4 dark:text-light-1 font-medium'>
                                <img 
                                    src={user.imageUrl || "/assets/icons/profile-placeholder.svg"} 
                                    alt="profile" 
                                    className='rounded-full scale-150'
                                    height={24}
                                    width={24}
                                />
                                Profile
                            </Link>
                        </li>
                    </ul>
                </div>   
            </div>
            <Button 
                onClick={() => signOut()}
                variant="ghost" className='shad-button_ghost px-9'
            >
                <img src="/assets/icons/logout.svg" alt="logout" />
                <p className='small-medium lg-base-medium dark:text-light-1'>Logout</p>
            </Button>
        </nav>
    )
}

export default LeftSidebar