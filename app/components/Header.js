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
          <Link href="/#news"><IconBell className="ic" />Avisos</Link>
          <button type="button" onClick={() => setCompareOpen(true)}><IconScale className="ic" />Comparar</button>
        </div>
      </div>
    </header>
  );
}
