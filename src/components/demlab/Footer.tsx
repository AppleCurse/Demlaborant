import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { Brand } from "./Header";
import { companyInfo } from "@/demlab/data/company";
export default function Footer() {
  return (
    <footer className="premium-footer">
      <div className="premium-container">
        <div className="footer-main">
          <div>
            <Link to="/" aria-label="Demlab ana sayfa">
              <Brand />
            </Link>
            <p>
              Bilimin hassasiyeti.
              <br />
              Zanaatın özeni.
            </p>
            <span className="eyebrow">İSTANBUL, TÜRKİYE</span>
          </div>
          <div>
            <h3>KEŞFEDİN</h3>
            <Link to="/products">Ürünler</Link>
            <Link to="/about">Demlab Hikâyesi</Link>
            <Link to="/documents">Kalite & Analiz</Link>
            <Link to="/calculator">Seyreltme Hesaplayıcı</Link>
          </div>
          <div>
            <h3>YARDIMCI OLALIM</h3>
            <Link to="/contact">
              İletişim & Teklif <ArrowUpRight size={13} />
            </Link>
            <Link to="/tracking">Sipariş Takibi</Link>
            <Link to="/terms">Teslimat & Güvenlik</Link>
            <Link to="/privacy">Gizlilik & KVKK</Link>
          </div>
          <div>
            <h3>BİZE ULAŞIN</h3>
            <a href={`mailto:${companyInfo.email}`}>
              {companyInfo.email} <ArrowUpRight size={13} />
            </a>
            <a href={`tel:${companyInfo.phone}`}>{companyInfo.phone}</a>
            <p>{companyInfo.address}</p>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Demlab. Tüm hakları saklıdır.</span>
          <span>SAFLIK · DENGE · DÖNÜŞÜM</span>
          <a href="#top">Başa dön ↑</a>
        </div>
      </div>
    </footer>
  );
}
