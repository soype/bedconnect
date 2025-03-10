'use client'
import styles from './DashboardMenu.module.scss'
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

    const options = [
        {name: 'Dashboard', value: 'dashboard', svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20,8h0L14,2.74a3,3,0,0,0-4,0L4,8a3,3,0,0,0-1,2.26V19a3,3,0,0,0,3,3H18a3,3,0,0,0,3-3V10.25A3,3,0,0,0,20,8ZM14,20H10V15a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1Zm5-1a1,1,0,0,1-1,1H16V15a3,3,0,0,0-3-3H11a3,3,0,0,0-3,3v5H6a1,1,0,0,1-1-1V10.25a1,1,0,0,1,.34-.75l6-5.25a1,1,0,0,1,1.32,0l6,5.25a1,1,0,0,1,.34.75Z"></path></svg>},
        {name: 'Posts', value: 'posts', svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M15,14H9a1,1,0,0,0,0,2h6a1,1,0,0,0,0-2Zm0-4H11a1,1,0,0,0,0,2h4a1,1,0,0,0,0-2Zm2-6H15.82A3,3,0,0,0,13,2H11A3,3,0,0,0,8.18,4H7A3,3,0,0,0,4,7V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V7A3,3,0,0,0,17,4ZM10,5a1,1,0,0,1,1-1h2a1,1,0,0,1,1,1V6H10Zm8,14a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V7A1,1,0,0,1,7,6H8V7A1,1,0,0,0,9,8h6a1,1,0,0,0,1-1V6h1a1,1,0,0,1,1,1Z"></path></svg>},,
        {name: 'Calendar', value: 'calendar', svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M19,2H5A3,3,0,0,0,2,5V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V5A3,3,0,0,0,19,2ZM10,4h4V7.13l-1.45-1a1,1,0,0,0-1.1,0L10,7.13ZM20,19a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4H8V9a1,1,0,0,0,.53.88,1,1,0,0,0,1-.05L12,8.2l2.45,1.63A1,1,0,0,0,16,9V4h3a1,1,0,0,1,1,1Z"></path></svg>},
        {name: 'Analytics', value: 'analytics', svg: <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M12,6a1,1,0,0,0-1,1V17a1,1,0,0,0,2,0V7A1,1,0,0,0,12,6ZM7,12a1,1,0,0,0-1,1v4a1,1,0,0,0,2,0V13A1,1,0,0,0,7,12Zm10-2a1,1,0,0,0-1,1v6a1,1,0,0,0,2,0V11A1,1,0,0,0,17,10Zm2-8H5A3,3,0,0,0,2,5V19a3,3,0,0,0,3,3H19a3,3,0,0,0,3-3V5A3,3,0,0,0,19,2Zm1,17a1,1,0,0,1-1,1H5a1,1,0,0,1-1-1V5A1,1,0,0,1,5,4H19a1,1,0,0,1,1,1Z"></path></svg> },
    ]

    return(
        <div className={styles.menu}>
            <ul>
                {options.map((option, index) => {
                    return(
                        <li key={index} onClick = {() => updateTab(option.value)}>
                            {option.svg}
                            <span>{option.name}</span>
                        </li>
                    )
                })}
            </ul>
            <button onClick={logOutHandler}>Log out</button>
        </div>
    )   
}