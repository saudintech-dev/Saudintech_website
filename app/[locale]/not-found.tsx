import Link from "next/link";
import LogoMark from "@/components/LogoMark";
import { siteConfig } from "@/lib/site-config";

export default function NotFound() {
  return (
    <main id="main-content" className="notfound">
      <div className="notfound-inner">
        <span className="logo-mark notfound-logo">
          <LogoMark variant="dark" />
        </span>
        <div className="notfound-code">404</div>
        <h1 className="notfound-title">Page not found</h1>
        <p className="notfound-text">
          The page you&apos;re looking for doesn&apos;t exist or has moved.
        </p>
        <Link href="/" className="btn btn-primary btn-lg">
          Back to {siteConfig.name}
        </Link>
      </div>
    </main>
  );
}
