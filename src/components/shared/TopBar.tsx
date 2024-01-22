import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/querysAndMutations'
import { useEffect } from 'react'
import { useUserContext } from '@/context/AuthContext'
import { useLocalStorage } from 'usehooks-ts'

const TopBar = () => {
    const {mutate: signOut, isSuccess} = useSignOutAccount()
    const navigate = useNavigate();
    const {user} = useUserContext()
    const [theme] = useLocalStorage('theme', 'light')
    
    useEffect(() => {
        if (isSuccess) {
            navigate(0);
        }
    }, [isSuccess])
    const logoSrc = theme === 'dark' ? "/assets/icons/toha-logo-white.svg" : "/assets/icons/toha-logo-black.svg";
    return (
        <section className='topbar'>
            <div className="flex-between py-4 px-5">
                <Link to="/" className='flex gap-1 items-center'>
                    <img src={logoSrc} alt="logo" width={40} height={40} />
                    <div className="text-xl font-semibold dark:text-light-1">Tohachat</div>
                </Link>
                <div className="flex gap-4">
                    <Button 
                        onClick={() => signOut()}
                        variant="ghost" className='shad-button_ghost'
                    >
                        <img src="/assets/icons/logout.svg" alt="logout" />
                    </Button>
                    <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
                        <img src={user.imageUrl || '/assets/icons/profile-placeholder.svg'} alt="profile" className='h-8 w-8 rounded-full'/>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default TopBar