import { CompletedChallegens } from "../components/CompletedChallegens";
import { Countdown } from "../components/Countdown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import styles from '../styles/pages/Home.module.css';

import Head from 'next/head';
import { ChallegenBox } from "../components/ChallengeBox";

export default function Home() {
  return (
    <div className={styles.container}>

      <Head>
        <title>Move.It</title>
      </Head>

      <ExperienceBar/>

      <section>
        <div>
            <Profile/>
            <CompletedChallegens/>
            <Countdown/>
        </div>
        <div>
            <ChallegenBox/>
        </div>
      </section>

    </div>
    )
}
