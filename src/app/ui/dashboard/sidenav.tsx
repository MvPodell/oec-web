import styles from '@/app/dashboard/dashboard.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/app/ui/dashboard/OECtemplogo.png';
import { UserName } from '@/config/AuthContext';

export default function SideNav() {
    const links = [
        { name: 'Home', href: '/dashboard'},
        { name: 'Services', href: '/dashboard/services'},
        { name: 'Resources', href: '/dashboard/resources'},
        { name: 'Contact', href: '/dashboard/contact'},
        { name: 'About Us', href: '/dashboard/services'},
    ]
    return (
        <div className={styles.leftBar}>
            <div className={styles.leftLogo}>
                <Image 
                    alt="OEC logo"
                    src={Logo}
                    className={styles.logoImage} 
                    />
            </div>
            {links.map((link)=> {
                return(
                    <Link 
                        key={link.name}
                        href={link.href}
                        className={styles.leftNavLink}
                        >
                            <div className={styles.leftNavItem}>{link.name}</div>
                    </Link>
                );
            })}
            <div className={styles.leftNavItemFill}></div>
            <Link 
                key="login"
                href="/login"
                className={styles.leftNavLink}
            ><div className={styles.leftNavItem}><b>Login</b> <UserName /></div></Link>
            
            </div>
    );
}