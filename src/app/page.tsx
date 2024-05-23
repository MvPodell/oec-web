import Link from "next/link";

export default function Home() {
  return (
    <>
      <div>Home page</div>
      <p>Todo to this page: </p>
      <ul>
        <li>Make styling match dashboard</li>
        <li>Intro blurb</li>
        <li>Announcement board</li>
        <li>Hours</li>
      </ul>

      <Link href="/dashboard">Go to dashboard</Link>
    </>
    
  );
}
