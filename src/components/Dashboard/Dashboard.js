'use client'


import {useState} from 'react'
import styles from './Dashboard.module.scss'
import DashboardMenu from './DashboardMenu/DashboardMenu'
import DashboardPosts from './DashboardPosts/DashboardPosts'
import DashboardCalendar from './DashboardCalendar/DashboardCalendar'

export default function Dashboard(){

    const [activeTab, setActiveTab] = useState('posts')

    const renderActiveTab = () => {
        switch(activeTab) {
            case 'posts': 
                return <DashboardPosts></DashboardPosts>;
            case 'calendar': 
                return <DashboardCalendar></DashboardCalendar>;
            default:
                return <div></div>;
        }
    }

    return(
        <div className={`clear-nav ${styles.dashboard}`}>
            <div className={styles.dashboard__container}>
                <DashboardMenu updateTab={setActiveTab}></DashboardMenu>
                { renderActiveTab()}
            </div>
        </div>
    )
}