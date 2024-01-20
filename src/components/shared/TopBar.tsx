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
            <div className="flex-between py-4 px-5">
            <Link to="/" className='flex gap-3 items-center'>
                <img src="/assets/icons/favicon.ico" alt="logo" width={24} height={24} />
                <div className="text-xl">Tohagram</div>
            </Link>
                <div className="flex gap-4">
                    <Button 
                        onClick={() => signOut()}
                        variant="ghost" className='shad-button_ghost'
                    >
                        <img src="/assets/icons/logout.svg" alt="logout" />
                    </Button>
                    <Link to={`/profile/${user.id}`} className='flex-center gap-3'>
                        <img src={user.imageUrl || '/assets/images/profile-placeholder.svg'} alt="profile" className='h-8 w-8 rounded-full'/>
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default TopBar