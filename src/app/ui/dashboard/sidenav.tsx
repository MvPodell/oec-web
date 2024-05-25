import styles from '@/app/app.module.scss';
import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/app/ui/dashboard/OECtemplogo.png';

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
            <div className={styles.leftNavItem}>Login </div>
            </div>
    );
}