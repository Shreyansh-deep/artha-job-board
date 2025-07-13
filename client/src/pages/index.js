import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "2rem" }}>
      <h1>Welcome</h1>
      <Link href="/import-logs">View Import Logs</Link>
    </div>
  );
}
