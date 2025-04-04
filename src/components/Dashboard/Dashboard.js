"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";
import styles from "./Dashboard.module.scss";
import DashboardMenu from "./DashboardMenu/DashboardMenu";
import DashboardMain from "./DashboardMain/DashboardMain";
import DashboardPosts from "./DashboardPosts/DashboardPosts";
import DashboardCalendar from "./DashboardCalendar/DashboardCalendar";

export default function Dashboard() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState("dashboard");

  useEffect(() => {
    const session = document.cookie
      .split(";")
      .map((cookie) => cookie.trim())
      .find((cookie) => cookie.startsWith("sessionToken="));
    if(!session){
      router.push("/signin");
    }
  });

  const renderActiveTab = () => {
    switch (activeTab) {
      case "dashboard":
        return <DashboardMain></DashboardMain>;
      case "posts":
        return <DashboardPosts></DashboardPosts>;
      case "calendar":
        return <DashboardCalendar></DashboardCalendar>;
      default:
        return <div></div>;
    }
  };

  return (
    <div className={`clear-nav ${styles.dashboard}`}>
      <div className={styles.dashboard__container}>
        <DashboardMenu updateTab={setActiveTab}></DashboardMenu>
        {renderActiveTab()}
      </div>
    </div>
  );
}
