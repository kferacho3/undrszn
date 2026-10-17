"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { primaryNav, site } from "@/data/site";
import { Icon } from "./Icon";
import { ThemeToggle } from "./ThemeToggle";
import { useUI } from "./providers/UIProvider";

export function Header() {
  const pathname = usePathname();
  const { count, openDialog, bagPulse } = useUI();
  const [bump, setBump] = useState(false);
  const isMembersPage = pathname === "/pages/members-only";

  useEffect(() => {
    if (!bagPulse) return;
    // eslint-disable-next-line react-hooks/set-state-in-effect -- short-lived feedback animation
    setBump(true);
    const t = setTimeout(() => setBump(false), 560);
    return () => clearTimeout(t);
  }, [bagPulse]);

  const isActive = (href: string) => pathname === href || (href === "/collections/all" && pathname.startsWith("/products/"));

  return (
    <>
      <div className={`announce${isMembersPage ? " announce--members" : ""}`}>
        {!isMembersPage && <span className="dot" aria-hidden="true" />}
        <span>
          {isMembersPage ? "Members Only — A private viewing" : `${site.name} — ${site.collection}`}
        </span>
        <span className="hide-sm" aria-hidden="true">
          ·
        </span>
        <Link className="hide-sm" href={isMembersPage ? "/collections/all" : "/pages/journey"}>
          {isMembersPage ? "Shop the current collection" : "The Journey — a film"}
        </Link>
      </div>
      <header className="site-header">
        <div className="container site-header__inner">
          <nav className="nav" aria-label="Main navigation">
            {primaryNav.map((item) => (
              <Link key={item.href} href={item.href} aria-current={isActive(item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            ))}
          </nav>
          <button className="icon-btn menu-toggle" onClick={() => openDialog({ kind: "menu" })} aria-label="Open menu">
            <Icon name="menu" />
          </button>
          <Link className="wordmark" href="/" aria-label={`${site.name} home`}>
            UNDR.
            <span className="wordmark__stack" aria-hidden="true">
              <span>RATED</span>
              <span>SZN</span>
            </span>
          </Link>
          <div className="header-actions">
            <Link className="mobile-shop" href="/collections/all">
              Shop
            </Link>
            <Link className="icon-btn hide-sm" href="/search" aria-label="Search the collection">
              <Icon name="search" />
            </Link>
            <Link className="icon-btn hide-sm" href="/account" aria-label="Your account">
              <Icon name="user" />
            </Link>
            <ThemeToggle className="hide-sm" />
            <button
              className={`bag-btn ${bump ? "bump" : ""}`}
              onClick={() => openDialog({ kind: "bag" })}
              aria-label={`Open bag, ${count} ${count === 1 ? "item" : "items"}`}
            >
              <Icon name="bag" />
              <span className="bag-btn__count" data-full={count > 0}>
                {count}
              </span>
            </button>
          </div>
        </div>
      </header>
    </>
  );
}
