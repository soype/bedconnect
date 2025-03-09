'use client'
import styles from './DashboardMenu.module.scss'
import Image from 'next/image'
import calendarSVG from '@/assets/calendar.svg'
import fileSVG from '@/assets/file.svg'
import { useRouter } from "next/navigation";
import { useAuth } from '@/context/AuthContext';

export default function DashboardMenu({updateTab}){

    const router = useRouter();
    const auth = useAuth();

    const logOutHandler = () => {
        document.cookie = 'sessionToken=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        auth.setIsLogged(false);        
        router.push("/");
    }

    return(
        <div className={styles.menu}>
            <ul>
                <li onClick = {() => updateTab('posts')}><Image src={fileSVG} alt='Posts' height={15} width={15}></Image>Posts</li>
                <li onClick = {() => updateTab('calendar')}><Image src={calendarSVG} alt='Calendar' height={15} width={15}></Image>Calendar</li>
            </ul>
            <button onClick={logOutHandler}>Log out</button>
        </div>
    )   
}