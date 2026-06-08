import React, { useState } from "react";
import { MessageSquare, Send, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function FloatingWhatsApp() {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState("");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    const formattedMessage = encodeURIComponent(
      message.trim() || "Hello AURA WEB! I'm interested in building a high-conversion website for my business."
    );
    window.open(`https://wa.me/918929757028?text=${formattedMessage}`, "_blank", "noopener,noreferrer");
    setIsOpen(false);
    setMessage("");
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
            className="mb-4 w-80 rounded-2xl bg-slate-900 border border-slate-800 text-white shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-violet-600 to-indigo-600 p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center font-display font-bold text-white shadow-inner">
                    A
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 border-slate-900 rounded-full"></span>
                </div>
                <div>
                  <h4 className="font-display font-semibold text-sm leading-tight text-white m-0">AURA WEB Support</h4>
                  <p className="text-xs text-indigo-100 opacity-90">Replies in under 5 minutes</p>
                </div>
              </div>
              <button
                id="close-wa-btn"
                onClick={() => setIsOpen(false)}
                className="text-white hover:text-red-300 transition-colors p-1 rounded-lg hover:bg-slate-800/40"
              >
                <X size={18} />
              </button>
            </div>

            {/* Message Area */}
            <div className="p-4 bg-slate-950/80 text-sm max-h-48 overflow-y-auto space-y-3">
              <div className="bg-slate-900 border border-slate-800 text-slate-200 p-3 rounded-2xl rounded-tl-none leading-relaxed">
                Hi there! 👋 I am Arjun, lead architect. Describe your business website ideas. We will generate a plan and budget estimation in real time!
              </div>
              <div className="bg-slate-900 border border-slate-800 text-slate-200 p-3 rounded-2xl rounded-tl-none leading-relaxed">
                What kind of project do you have in mind today?
              </div>
            </div>

            {/* Send Form */}
            <form onSubmit={handleSend} className="p-3 bg-slate-900 border-t border-slate-800 flex gap-2">
              <input
                id="wa-text-input"
                type="text"
                placeholder="Type your project plans..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs focus:ring-1 focus:ring-violet-500 focus:outline-none text-white placeholder-slate-500 transition-all"
              />
              <button
                id="wa-submit-btn"
                type="submit"
                className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl p-2.5 flex items-center justify-center transition-all hover:scale-105 active:scale-95 shadow-md"
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
        className="w-14 h-14 bg-emerald-500 hover:bg-emerald-400 text-white rounded-full flex items-center justify-center shadow-xl shadow-emerald-950/20 cursor-pointer relative transition-colors border border-emerald-400/20"
      >
        <span className="absolute inset-0 rounded-full bg-emerald-500/30 pulse-glow block -z-10"></span>
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
      </motion.button>
    </div>
  );
}
