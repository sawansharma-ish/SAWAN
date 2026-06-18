import React, { useState, useEffect, useRef } from "react";
import { MessageSquare, Send, X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ChatMessage {
  sender: "aura" | "user";
  text: string;
  link?: string;
  timestamp: string;
}

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: "aura",
      text: "Hi there! 👋 I am Arjun, lead architect. Describe your business website ideas. We will generate a plan and budget estimation in real time!",
      timestamp: new Date().toISOString()
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll messages area
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  // Handle subtle welcome typing effect the first time chat is opened
  useEffect(() => {
    if (isOpen && messages.length === 1) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            sender: "aura",
            text: "What kind of project do you have in mind today?",
            timestamp: new Date().toISOString()
          }
        ]);
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const userMsg = message.trim();
    if (!userMsg) return;

    // Append User's chat message
    const formattedUserMsg: ChatMessage = {
      sender: "user",
      text: userMsg,
      timestamp: new Date().toISOString()
    };

    setMessages((prev) => [...prev, formattedUserMsg]);
    setMessage("");

    // Simulate Aura Web support representative typing dynamically
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);

      // Strategic response generation based on what user entered
      let replyText = "Fabulous plan! That sounds like an incredible project. We specialize in exactly this kind of high-impact visual design and search optimization.";
      const lower = userMsg.toLowerCase();

      if (lower.includes("medical") || lower.includes("doctor") || lower.includes("clinic") || lower.includes("dentist") || lower.includes("hospital")) {
        replyText = "Superb! Medical and healthcare portals require clean scheduling flows, patient intake forms, and high-trust layouts. We have ready-made secure components for this!";
      } else if (lower.includes("ecommerce") || lower.includes("shop") || lower.includes("store") || lower.includes("sell") || lower.includes("product")) {
        replyText = "Excellent choice! For e-commerce systems, we integrate fast checkout pages, WhatsApp cart messages, and persistent payment gateways to maximize conversions from day one!";
      } else if (lower.includes("gym") || lower.includes("fitness") || lower.includes("salon") || lower.includes("spa") || lower.includes("studio")) {
        replyText = "That's fantastic! Local service hubs and studios thrive on visual booking calendars, user punch-cards, and high-converting maps integration. We have premium pre-designed templates.";
      } else if (lower.includes("price") || lower.includes("cost") || lower.includes("cheap") || lower.includes("budget") || lower.includes("rate")) {
        replyText = "Great query! We offer starter projects from ₹4,999 up to full-scale custom systems. Our pricing structure is fully transparent, with zero hidden fees. We can design a perfect plan for your budget.";
      } else if (lower.includes("portfolio") || lower.includes("show") || lower.includes("work") || lower.includes("example") || lower.includes("previous")) {
        replyText = "Absolutely! We have delivered beautiful portals for Clinics, Spas, Cafes, and Real Estate agencies. Let's discuss what layout styles fit your brand aesthetic.";
      }

      const waLink = `https://wa.me/918929757028?text=${encodeURIComponent(
        `Hi Aura Web Team, I'm interested in discussing my project: "${userMsg}"`
      )}`;

      setMessages((prev) => [
        ...prev,
        {
          sender: "aura",
          text: `${replyText} Let's hop onto WhatsApp to review real-time design variations and secure a direct, free consultation.`,
          link: waLink,
          timestamp: new Date().toISOString()
        }
      ]);
    }, 2000);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="mb-4 w-85 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-slate-950 flex items-center justify-center font-display font-bold text-violet-400 border border-violet-500/30">
                    A
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-slate-900 rounded-full animate-pulse"></span>
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm leading-tight text-white m-0">Aura Assistant</h4>
                  <p className="text-[10px] text-indigo-200 opacity-90 font-mono tracking-wider">AURA CYBER-INTELLIGENCE PANEL</p>
                </div>
              </div>
              <button
                id="close-wa-btn"
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-red-350 transition-colors p-1 rounded-lg hover:bg-slate-800/40 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Message Area */}
            <div className="p-4 bg-slate-950/80 text-sm h-64 overflow-y-auto space-y-3.5 custom-scrollbar flex flex-col">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-2xl leading-relaxed max-w-[85%] text-xs ${
                    msg.sender === "user"
                      ? "bg-violet-600 text-white rounded-tr-none self-end ml-auto"
                      : "bg-slate-900 border border-slate-800 text-slate-100 rounded-tl-none self-start mr-auto"
                  }`}
                >
                  <p>{msg.text}</p>
                  
                  {msg.link && (
                    <a
                      href={msg.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-2.5 flex items-center gap-1.5 justify-center w-full px-3 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg text-center transition-colors text-[10px] tracking-wider uppercase font-mono shadow-md"
                    >
                      <span>Connect via WhatsApp</span>
                      <ExternalLink size={10} />
                    </a>
                  )}

                  <span className="text-[8px] opacity-40 font-mono block mt-1 text-right">
                    {new Date(msg.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}

              {/* Dynamic typing indicator matching natural conversation flow */}
              {isTyping && (
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 text-slate-400 px-3 py-2.5 rounded-2xl rounded-tl-none w-max max-w-[80%] self-start animate-fade-in shadow-sm">
                  <div className="flex items-center gap-1 py-1">
                    <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                    <span className="w-1.5 h-1.5 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-450 uppercase tracking-wider font-semibold">Aura is typing...</span>
                </div>
              )}

              <div ref={chatEndRef} />
            </div>

            {/* Send Form */}
            <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
              <input
                id="wa-text-input"
                type="text"
                placeholder={isTyping ? "Aura is assembling ideas..." : "Type your project plans..."}
                disabled={isTyping}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-violet-500 focus:outline-none text-white placeholder-slate-500 transition-all disabled:opacity-50"
              />
              <button
                id="wa-submit-btn"
                type="submit"
                disabled={isTyping || !message.trim()}
                className="bg-violet-600 hover:bg-violet-500 disabled:bg-slate-800 disabled:cursor-not-allowed text-white rounded-xl p-2.5 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md cursor-pointer"
              >
                <Send size={14} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Trigger Floating Pin */}
      <motion.button
        id="wa-trigger-btn"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-gradient-to-tr from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white rounded-full flex items-center justify-center shadow-xl shadow-slate-950/40 cursor-pointer relative transition-colors border border-violet-400/20"
      >
        <span className="absolute inset-0 rounded-full bg-violet-500/30 pulse-glow block -z-10"></span>
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
}
