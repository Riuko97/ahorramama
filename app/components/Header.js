"use client";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { useStore } from "./StoreProvider";
import { IconBell, IconScale, IconSearch } from "./Icons";

export default function Header() {
  const { query, setQuery, setCompareOpen } = useStore();
  const router = useRouter();
  const pathname = usePathname();
  return (
    <header className="header">
      <div className="wrap">
        <Link href="/" className="logo" aria-label="AhorraMamá"><img src="/assets/logo-horizontal.svg" alt="AhorraMamá" className="logo-img" /></Link>
        <form className="search" role="search" onSubmit={(e) => { e.preventDefault(); if (pathname !== "/") router.push("/#ofertas"); }}>
          <label className="sr-only" htmlFor="search">Buscar ofertas</label>
          <input
            id="search"
            type="search"
            placeholder="Busca un chollo. Ej: cochecito, pañales, trona..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button type="submit" aria-label="Buscar"><IconSearch size={18} /></button>
        </form>
        <div className="tools">
          <Link href="/blog/"><svg className="ic" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M12 6.5C10.4 5.3 8.4 4.7 6 4.7c-1 0-1.9.1-2.6.3v13c.7-.2 1.6-.3 2.6-.3 2.4 0 4.4.6 6 1.8 1.6-1.2 3.6-1.8 6-1.8 1 0 1.9.1 2.6.3v-13c-.7-.2-1.6-.3-2.6-.3-2.4 0-4.4.6-6 1.8Z"/><path d="M12 6.5v12.3"/></svg>Guías</Link>
          <Link href="/#news"><IconBell className="ic" />Avisos</Link>
          <button type="button" onClick={() => setCompareOpen(true)}><IconScale className="ic" />Comparar</button>
        </div>
      </div>
    </header>
  );
}
