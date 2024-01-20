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
            <div className="flex flex-col gap-11">
                <Link to="/" className='flex gap-3 items-center'>
                    <img src="/assets/icons/favicon.ico" alt="logo" width={24} height={24} />
                    <div className="text-xl">Tohagram</div>
                </Link>
                <Link to={`/profile/${user.id}`} className='flex gap-3 items-center'>
                    <img 
                        src={user.imageUrl || "/assets/icons/profile-placeholder.svg"} 
                        alt="profile" 
                        className='h-14 w-14 rounded-full'
                    />
                    <div className="flex flex-col">
                        <p className='body-bold'>
                            {user.name}
                        </p>
                        <p className='small-regular text-light-3'>
                            @{user.username}
                        </p>
                    </div>
                </Link>
                <ul className='flex flex-col gap-6'>
                    {sidebarLinks.map((link: INavLink) =>{
                        const isActive = pathname === link.route;
                        return (
                            <li key={link.label} className={`group leftsidebar-link ${
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
                <p className='small-medium lg-base-medium'>Logout</p>
            </Button>
        </nav>
    )
}

export default LeftSidebar