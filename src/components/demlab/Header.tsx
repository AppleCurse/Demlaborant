import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Menu, X, ShoppingBag, ArrowUpRight, Truck } from "lucide-react";
import { useCart } from "@/demlab/context/CartContext";

export function Brand() {
  return (
    <span className="premium-brand">
      <svg viewBox="0 0 40 56" fill="none" aria-hidden="true">
        <path
          d="M20 2C9 15 12 20 20 28C28 20 31 15 20 2ZM20 51C2 39 1 26 5 20C17 27 20 35 20 51ZM20 51C38 39 39 26 35 20C23 27 20 35 20 51Z"
          stroke="currentColor"
          strokeWidth="1.7"
        />
      </svg>
      <span>
        Demlab<small>SAFLIK · DENGE · DÖNÜŞÜM</small>
      </span>
    </span>
  );
}
const navigation = [
  { to: "/products", label: "Ürünler" },
  { to: "/about", label: "Demlab Hikâyesi" },
  { to: "/documents", label: "Kalite & Analiz" },
  { to: "/tracking", label: "Teslimat Takibi" },
] as const;
export default function Header() {
  const [open, setOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useCart();
  return (
    <>
      <div className="premium-topbar">
        <span>HASSAS ÇALIŞMALAR İÇİN, ÖZENLE.</span>
        <span>
          <Truck size={13} /> İstanbul içi motokurye teslimatı <span className="top-dot">·</span>{" "}
          Mühürlü ambalaj
        </span>
      </div>
      <header className="premium-header">
        <div className="premium-nav-wrap">
          <Link to="/" aria-label="Demlab ana sayfa">
            <Brand />
          </Link>
          <nav className="premium-desktop-nav" aria-label="Ana menü">
            {navigation.map((item) => (
              <Link key={item.to} to={item.to}>
                {item.label}
              </Link>
            ))}
          </nav>
          <div className="premium-nav-actions">
            <button
              className="premium-cart"
              onClick={() => setIsCartOpen(true)}
              aria-label={`Sepeti görüntüle, ${totalItems} ürün`}
            >
              <ShoppingBag size={19} />
              <span>Sepetim ({totalItems})</span>
            </button>
            <Link to="/contact" className="premium-nav-cta">
              İletişime Geç <ArrowUpRight size={15} />
            </Link>
            <button
              className="premium-menu-toggle"
              aria-label={open ? "Menüyü kapat" : "Menüyü aç"}
              aria-expanded={open}
              aria-controls="mobile-navigation"
              onClick={() => setOpen(!open)}
            >
              {open ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {open && (
          <nav className="premium-mobile-nav" id="mobile-navigation" aria-label="Mobil menü">
            {navigation.map((item) => (
              <Link key={item.to} to={item.to} onClick={() => setOpen(false)}>
                {item.label}
                <ArrowUpRight size={16} />
              </Link>
            ))}
            <Link to="/calculator" onClick={() => setOpen(false)}>
              Seyreltme Hesaplayıcı
            </Link>
            <Link to="/contact" onClick={() => setOpen(false)}>
              İletişim
            </Link>
          </nav>
        )}
      </header>
    </>
  );
}
