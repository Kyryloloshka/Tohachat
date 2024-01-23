import { bottombarLinks } from '@/constants';
import { Link, useLocation } from 'react-router-dom';

const Bottombar = () => {

  const {pathname} = useLocation();

  return (
    <section className='bottom-bar'>
      {bottombarLinks.map((link) =>{
        const isActive = pathname === link.route;
        return (
          <Link 
            key={link.label} 
            className={`flex-center flex-col gap-1 pt-2 pb-3 px-4 transition-all rounded-t-[15px] ${
              isActive && 'bg-primary-500 '
            }`} 
            to={`${link.route}`}
          >
            <img 
              className={`transition-all group-hover:invert-white ${
                isActive && "invert-white"
              }`}
              width={16}
              height={16}
              src={link.imgURL}
              alt={link.label}
            />
            <p className='tiny-medium text-dark-2 dark:text-light-2'>{link.label}</p>
          </Link>
        )
      })}
    </section>
  )
}

export default Bottombar