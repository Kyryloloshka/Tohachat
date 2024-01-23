import { Link, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { useSignOutAccount } from '@/lib/react-query/querysAndMutations'
import { useEffect } from 'react'
import { useUserContext } from '@/context/AuthContext'

const TopBar = () => {
    const {mutate: signOut, isSuccess} = useSignOutAccount()
    const navigate = useNavigate();
    const {user} = useUserContext()
    
    useEffect(() => {
        if (isSuccess) {
            navigate(0);
        }
    }, [isSuccess])
    return (
        <section className='topbar'>
            <div className="flex-between py-2 px-5 relative overflow-hidden">
                <Link to="/" className='flex gap-1 items-center before:bg-dark-4 before:w-[180px] before:-z-10 before:rotate-45 before:h-[180px] before:absolute before:left-0'>
                    <img className='' src={"/assets/icons/toha-logo-white.svg"} alt="logo" width={40} height={40} />
                    <div className="text-xl font-semibold text-light-1">Tohachat<span className="font-normal text-sm">{" "}Beta</span></div>
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