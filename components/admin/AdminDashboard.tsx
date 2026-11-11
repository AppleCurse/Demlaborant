"use client";

import { FormEvent, useCallback, useEffect, useState } from "react";
import { ClipboardList, FileText, LogOut, Package, RefreshCw } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import DocumentUpload from "@/components/admin/DocumentUpload";
import { useRouter } from "next/navigation";

type OrderItem = { id: number; productName: string; size: string; quantity: number; lineTotal: number };
type Order = {
  id: number; orderNo: string; fullName: string; email: string; phone: string; city: string;
  district: string; address: string; deliveryNotes: string | null; companyName: string | null;
  deliveryType: string; paymentType: string; grandTotal: number; status: string; createdAt: string;
  items: OrderItem[];
};
type Inquiry = {
  id: number; referenceNo: string; companyName: string; contactName: string; email: string;
  phone: string; city: string; productName: string; quantity: string; notes: string | null;
  status: string; createdAt: string;
};
type DocumentRow = { id: number; lotNo: string; documentType: string; fileName: string; publicUrl: string; createdAt: string };
type Tab = "orders" | "inquiries" | "documents";

const ORDER_STATUSES = ["ÖDEME BEKLİYOR", "SİPARİŞ ALINDI", "ONAYLANDI", "HAZIRLANIYOR", "KURYEDE", "KARGODA", "TESLİM EDİLDİ", "İPTAL"];
const INQUIRY_STATUSES = ["YENİ", "İNCELENİYOR", "TEKLİF GÖNDERİLDİ", "TAMAMLANDI", "İPTAL"];
const money = (value: number) => `${value.toLocaleString("tr-TR")} ₺`;
const date = (value: string) => new Date(value).toLocaleString("tr-TR", { dateStyle: "medium", timeStyle: "short" });

export default function AdminDashboard({ email }: { email: string }) {
  const router = useRouter();
  const [tab, setTab] = useState<Tab>("orders");
  const [orders, setOrders] = useState<Order[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [documents, setDocuments] = useState<DocumentRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [password, setPassword] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const [orderResponse, inquiryResponse, documentResponse] = await Promise.all([
      fetch("/api/admin/orders"), fetch("/api/admin/inquiries"), fetch("/api/admin/documents"),
    ]);
    if (orderResponse.status === 401) { router.replace("/admin/login"); return; }
    const orderData = await orderResponse.json() as { orders?: Order[]; error?: string };
    const inquiryData = await inquiryResponse.json() as { inquiries?: Inquiry[]; error?: string };
    const documentData = await documentResponse.json() as { documents?: DocumentRow[]; error?: string };
    setOrders(orderData.orders ?? []);
    setInquiries(inquiryData.inquiries ?? []);
    setDocuments(documentData.documents ?? []);
    setMessage(orderData.error || inquiryData.error || documentData.error || "");
    setLoading(false);
  }, [router]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => void load());
    return () => cancelAnimationFrame(frame);
  }, [load]);

  async function updateStatus(kind: "orders" | "inquiries", id: number, status: string) {
    const response = await fetch(`/api/admin/${kind}`, {
      method: "PATCH", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ id, status }),
    });
    const result = await response.json() as { error?: string };
    if (!response.ok) { setMessage(result.error ?? "Durum güncellenemedi."); return; }
    if (kind === "orders") setOrders((rows) => rows.map((row) => row.id === id ? { ...row, status } : row));
    else setInquiries((rows) => rows.map((row) => row.id === id ? { ...row, status } : row));
    setMessage("Durum güncellendi; müşteri takip ekranına yansıdı.");
  }

  async function changePassword(event: FormEvent) {
    event.preventDefault();
    const { error } = await createClient().auth.updateUser({ password });
    setMessage(error ? "Şifre değiştirilemedi. En az 8 karakter kullanın." : "Şifreniz değiştirildi.");
    if (!error) setPassword("");
  }

  const revenue = orders.filter((order) => order.status !== "İPTAL").reduce((sum, order) => sum + order.grandTotal, 0);

  return (
    <main className="mx-auto max-w-7xl px-4 py-8 sm:px-8">
      <header className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div><span className="text-xs font-bold uppercase tracking-widest text-[#e59840]">DEMLAB Operasyon</span><h1 className="mt-1 font-serif text-3xl font-black">Yönetim Paneli</h1><p className="mt-1 text-xs text-[#a98f7b]">{email}</p></div>
        <div className="flex gap-2"><button onClick={() => void load()} className="rounded-xl border border-[#442616] p-3 text-[#f3bd68]" aria-label="Yenile"><RefreshCw className="h-4 w-4" /></button><button onClick={() => void createClient().auth.signOut().then(() => { router.replace("/admin/login"); router.refresh(); })} className="inline-flex items-center gap-2 rounded-xl border border-[#442616] px-4 py-3 text-xs font-bold"><LogOut className="h-4 w-4" /> Çıkış</button></div>
      </header>

      <section className="mt-7 grid grid-cols-2 gap-3 lg:grid-cols-4">
        <div className="oak-card rounded-2xl p-4"><span className="text-xs text-[#a98f7b]">Sipariş</span><strong className="mt-1 block text-2xl">{orders.length}</strong></div>
        <div className="oak-card rounded-2xl p-4"><span className="text-xs text-[#a98f7b]">Açık operasyon</span><strong className="mt-1 block text-2xl">{orders.filter((order) => !["TESLİM EDİLDİ", "İPTAL"].includes(order.status)).length}</strong></div>
        <div className="oak-card rounded-2xl p-4"><span className="text-xs text-[#a98f7b]">Yeni teklif</span><strong className="mt-1 block text-2xl">{inquiries.filter((inquiry) => inquiry.status === "YENİ").length}</strong></div>
        <div className="oak-card rounded-2xl p-4"><span className="text-xs text-[#a98f7b]">Kayıtlı ciro</span><strong className="mt-1 block text-xl text-[#f3bd68]">{money(revenue)}</strong></div>
      </section>

      <nav className="mt-7 flex gap-2 overflow-x-auto border-b border-[#3e2315] pb-3">
        <button onClick={() => setTab("orders")} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold ${tab === "orders" ? "btn-amber" : "border border-[#442616]"}`}><Package className="h-4 w-4" /> Siparişler</button>
        <button onClick={() => setTab("inquiries")} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold ${tab === "inquiries" ? "btn-amber" : "border border-[#442616]"}`}><ClipboardList className="h-4 w-4" /> Teklifler</button>
        <button onClick={() => setTab("documents")} className={`inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold ${tab === "documents" ? "btn-amber" : "border border-[#442616]"}`}><FileText className="h-4 w-4" /> Belgeler</button>
      </nav>
      {message && <p className="mt-4 rounded-xl border border-[#e59840]/30 bg-[#2d180d] p-3 text-xs text-[#f3bd68]">{message}</p>}
      {loading ? <p className="py-16 text-center text-sm text-[#c6ad97]">Veriler yükleniyor...</p> : (
        <section className="mt-5 space-y-3">
          {tab === "orders" && (orders.length ? orders.map((order) => (
            <details key={order.id} className="rounded-2xl border border-[#3e2315] bg-[#180d07] p-4 open:border-[#e59840]/40">
              <summary className="grid cursor-pointer list-none gap-3 sm:grid-cols-[1fr_1fr_auto_auto] sm:items-center">
                <div><strong className="font-mono text-[#f3bd68]">{order.orderNo}</strong><span className="block text-[11px] text-[#a98f7b]">{date(order.createdAt)}</span></div>
                <div><strong className="text-sm">{order.fullName}</strong><span className="block text-xs text-[#a98f7b]">{order.city} / {order.district}</span></div>
                <strong>{money(order.grandTotal)}</strong>
                <select value={order.status} onClick={(event) => event.stopPropagation()} onChange={(event) => void updateStatus("orders", order.id, event.target.value)} className="rounded-lg border border-[#442616] bg-[#0d0704] p-2 text-xs">{ORDER_STATUSES.map((status) => <option key={status}>{status}</option>)}</select>
              </summary>
              <div className="mt-4 grid gap-4 border-t border-[#3e2315] pt-4 text-xs leading-relaxed md:grid-cols-3">
                <div><h3 className="mb-2 font-bold text-[#f3bd68]">İletişim & teslimat</h3><p>{order.phone}<br />{order.email}<br />{order.address}, {order.district}/{order.city}</p>{order.deliveryNotes && <p className="mt-2">Not: {order.deliveryNotes}</p>}</div>
                <div><h3 className="mb-2 font-bold text-[#f3bd68]">Ürünler</h3>{order.items.map((item) => <p key={item.id}>{item.quantity} × {item.size}<br /><span className="text-[#a98f7b]">{item.productName}</span></p>)}</div>
                <div><h3 className="mb-2 font-bold text-[#f3bd68]">Operasyon</h3><p>Teslimat: {order.deliveryType}<br />Ödeme: {order.paymentType}</p>{order.companyName && <p className="mt-2">Fatura: {order.companyName}</p>}</div>
              </div>
            </details>
          )) : <Empty text="Henüz sipariş yok." />)}

          {tab === "inquiries" && (inquiries.length ? inquiries.map((inquiry) => (
            <article key={inquiry.id} className="grid gap-4 rounded-2xl border border-[#3e2315] bg-[#180d07] p-4 md:grid-cols-[1fr_1.5fr_auto]">
              <div><strong className="font-mono text-[#f3bd68]">{inquiry.referenceNo}</strong><h2 className="mt-1 font-bold">{inquiry.companyName}</h2><p className="text-xs text-[#a98f7b]">{inquiry.contactName} • {inquiry.phone}<br />{inquiry.email} • {inquiry.city}</p></div>
              <div className="text-xs"><p>{inquiry.productName} / {inquiry.quantity}</p>{inquiry.notes && <p className="mt-2 text-[#c6ad97]">{inquiry.notes}</p>}<span className="mt-2 block text-[#a98f7b]">{date(inquiry.createdAt)}</span></div>
              <select value={inquiry.status} onChange={(event) => void updateStatus("inquiries", inquiry.id, event.target.value)} className="h-fit rounded-lg border border-[#442616] bg-[#0d0704] p-2 text-xs">{INQUIRY_STATUSES.map((status) => <option key={status}>{status}</option>)}</select>
            </article>
          )) : <Empty text="Henüz teklif talebi yok." />)}

          {tab === "documents" && <div className="space-y-5"><DocumentUpload onUploaded={() => void load()} /><p className="text-xs text-[#a98f7b]">Yalnızca gerçek CoA, SDS veya TDS PDF’lerini yükleyin. Yükleme sonrası belge lot numarasıyla herkese açık indirilmeye sunulur.</p>{documents.map((document) => <div key={document.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-[#3e2315] p-4 text-xs"><div><strong className="text-[#f3bd68]">{document.lotNo} • {document.documentType}</strong><span className="block text-[#a98f7b]">{document.fileName}</span></div><a href={document.publicUrl} target="_blank" rel="noopener noreferrer" className="font-bold text-[#f3bd68]">PDF’yi aç</a></div>)}</div>}
        </section>
      )}

      <form onSubmit={changePassword} className="mt-10 flex max-w-lg flex-col gap-2 border-t border-[#3e2315] pt-6 sm:flex-row"><input type="password" minLength={8} required autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} placeholder="Yeni yönetim şifresi" className="flex-1 rounded-xl border border-[#442616] bg-[#180d07] p-3 text-xs" /><button className="rounded-xl border border-[#e59840]/40 px-4 py-3 text-xs font-bold text-[#f3bd68]">Şifreyi Değiştir</button></form>
    </main>
  );
}

function Empty({ text }: { text: string }) { return <p className="rounded-2xl border border-dashed border-[#442616] py-12 text-center text-sm text-[#a98f7b]">{text}</p>; }
