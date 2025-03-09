import styles from "./Home.module.scss"

import Hero from "../components/Hero/Hero";

export default function Home() {
  return (
    <div>
      <main>
      <Hero title="BedConnect" description="Your temporary rent solution" image="https://sass-lang.com/assets/img/logos/logo.svg" />
        <div className={`w-std`}>
          
        </div>
      </main>
    </div>
  );
}
