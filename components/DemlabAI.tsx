"use client";

import { FormEvent, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ExternalLink, MessageCircle, Send, Volume2, VolumeX, X } from "lucide-react";
import RakiBottleAI from "@/components/RakiBottleAI";
import { answerQuestion, type AssistantAnswer } from "@/lib/assistant";
import { companyInfo } from "@/data/company";

type ChatMessage = AssistantAnswer & {
  id: number;
  role: "assistant" | "user";
};

const greeting: ChatMessage = {
  id: 0,
  role: "assistant",
  text: "Merhaba, ben DEMLAB sesli asistanım. 9° ürünümüz, fiyat, teslimat, belge veya sipariş takibi hakkında bana soru sorabilirsiniz.",
};

const quickQuestions = ["Ürün kaç derece?", "Fiyatlar ne kadar?", "Siparişimi takip et"];

export default function DemlabAI() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([greeting]);
  const [input, setInput] = useState("");
  const [soundOn, setSoundOn] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const nextId = useRef(1);
  const scrollEnd = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollEnd.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  useEffect(() => () => window.speechSynthesis?.cancel(), []);

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) window.speechSynthesis.cancel();
    setIsSpeaking(false);
  };

  const speak = (text: string) => {
    if (!soundOn || !("speechSynthesis" in window) || !("SpeechSynthesisUtterance" in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "tr-TR";
    utterance.rate = 1.02;
    utterance.pitch = 0.96;
    const turkishVoice = window.speechSynthesis.getVoices().find((voice) => voice.lang.toLocaleLowerCase("tr-TR").startsWith("tr"));
    if (turkishVoice) utterance.voice = turkishVoice;
    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);
    window.speechSynthesis.speak(utterance);
  };

  const toggleOpen = () => {
    if (isOpen) {
      stopSpeaking();
      setIsOpen(false);
    } else {
      setIsOpen(true);
      speak(greeting.text);
    }
  };

  const sendQuestion = (question: string) => {
    const cleanQuestion = question.trim();
    if (!cleanQuestion) return;
    const answer = answerQuestion(cleanQuestion);
    const userMessage: ChatMessage = { id: nextId.current++, role: "user", text: cleanQuestion };
    const assistantMessage: ChatMessage = { id: nextId.current++, role: "assistant", ...answer };
    setMessages((current) => [...current, userMessage, assistantMessage]);
    setInput("");
    speak(answer.text);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    sendQuestion(input);
  };

  const toggleSound = () => {
    if (soundOn) {
      stopSpeaking();
      setSoundOn(false);
    } else {
      setSoundOn(true);
      if ("speechSynthesis" in window && "SpeechSynthesisUtterance" in window) {
        const utterance = new SpeechSynthesisUtterance("Sesli yanıtlar açık.");
        utterance.lang = "tr-TR";
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50 flex flex-col items-end">
      {isOpen && (
        <section aria-label="DEMLAB yapay zekâ sohbeti" className="mb-3 w-[calc(100vw-2rem)] sm:w-[390px] rounded-3xl bg-[#120b07]/95 border border-[#e59840]/45 shadow-2xl shadow-black/60 overflow-hidden backdrop-blur-xl animate-in fade-in slide-in-from-bottom-4 duration-200">
          <header className="bg-gradient-to-r from-[#2d180d] to-[#1a0e08] px-4 py-3 flex items-center gap-3 border-b border-[#e59840]/30">
            <div className="w-11 h-14 flex items-center justify-center"><RakiBottleAI className="h-14 w-9" speaking={isSpeaking} /></div>
            <div className="flex-1">
              <h2 className="text-sm font-black text-[#fff2db] font-serif">DEMLAB AI</h2>
              <p className="text-[10px] text-[#d8c2ad] flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400" />{isSpeaking ? "Şu anda konuşuyor..." : "Sesli akıllı asistan"}</p>
            </div>
            <button type="button" onClick={toggleSound} className="p-2 rounded-lg text-[#f3bd68] hover:bg-[#e59840]/10" aria-label={soundOn ? "Sesi kapat" : "Sesi aç"}>{soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}</button>
            <button type="button" onClick={toggleOpen} className="p-2 rounded-lg text-[#d8c2ad] hover:bg-[#e59840]/10" aria-label="Asistanı kapat"><X className="w-4 h-4" /></button>
          </header>

          <div className="h-[330px] max-h-[48vh] overflow-y-auto p-4 space-y-3" aria-live="polite">
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}>
                <div className={`max-w-[88%] rounded-2xl px-3.5 py-2.5 text-xs leading-relaxed ${message.role === "user" ? "bg-[#d8892f] text-white rounded-br-md" : "bg-[#21140d] text-[#f4e7d7] border border-[#3e2315] rounded-bl-md"}`}>
                  <p>{message.text}</p>
                  {message.href && <Link href={message.href} className="inline-flex items-center gap-1 mt-2 text-[#f3bd68] font-bold underline underline-offset-2">{message.linkLabel}<ExternalLink className="w-3 h-3" /></Link>}
                </div>
              </div>
            ))}
            <div ref={scrollEnd} />
          </div>

          {messages.length === 1 && (
            <div className="px-4 pb-3 flex flex-wrap gap-2">
              {quickQuestions.map((question) => <button key={question} type="button" onClick={() => sendQuestion(question)} className="text-[10px] font-semibold text-[#f3bd68] bg-[#2d180d] border border-[#e59840]/30 hover:border-[#e59840]/60 px-2.5 py-1.5 rounded-full">{question}</button>)}
            </div>
          )}

          <form onSubmit={handleSubmit} className="p-3 border-t border-[#3e2315] bg-[#0d0704] flex gap-2">
            <label htmlFor="demlab-ai-input" className="sr-only">DEMLAB asistana sorunuz</label>
            <input id="demlab-ai-input" value={input} onChange={(event) => setInput(event.target.value)} maxLength={500} placeholder="Örn: 10 litre fiyatı..." className="flex-1 min-w-0 text-xs rounded-xl border border-[#442616] px-3 py-2.5 bg-[#180d07] text-[#fff5ea] outline-none focus:border-[#e59840]" />
            <button type="submit" disabled={!input.trim()} className="btn-amber disabled:opacity-40 px-3.5 rounded-xl" aria-label="Soruyu gönder"><Send className="w-4 h-4" /></button>
          </form>
          <a href={`${companyInfo.whatsappUrl}?text=${encodeURIComponent("Merhaba, DEMLAB ekibinden destek almak istiyorum.")}`} target="_blank" rel="noopener noreferrer" className="py-2 px-4 bg-[#160c07] text-[10px] text-[#a98f7b] hover:text-[#f3bd68] flex items-center justify-center gap-1.5"><MessageCircle className="w-3 h-3" />İnsan desteği için WhatsApp&apos;a geç</a>
        </section>
      )}

      {!isOpen && (
        <button type="button" onClick={toggleOpen} className="group flex items-end gap-2" aria-label="DEMLAB sesli yapay zekâ asistanını aç">
          <span className="mb-2 rounded-full bg-[#21140d]/95 border border-[#e59840]/45 px-3 py-2 text-[10px] font-black tracking-wider text-[#f3bd68] shadow-xl"><span className="block text-[8px] text-[#c6ad97]">SESLİ</span>DEMLAB AI</span>
          <span className="relative transition-transform duration-300 group-hover:-translate-y-1 group-hover:rotate-2"><RakiBottleAI className="h-24 w-14 drop-shadow-[0_8px_18px_rgba(229,152,64,0.35)]" /><span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-emerald-400 border-2 border-[#120904]" /></span>
        </button>
      )}
    </div>
  );
}
