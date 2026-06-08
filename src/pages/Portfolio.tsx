import React, { useState, useEffect } from "react";
import { Sparkles, ArrowRight, Eye, Phone, MapPin, Grid, Layers, ExternalLink, RefreshCw } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Portfolio() {
  const [portfolio, setPortfolio] = useState<any[]>([]);
  const [category, setCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  // Before & After Slider position state
  const [sliderPos, setSliderPos] = useState(50);
  const [isSliding, setIsSliding] = useState(false);

  const categories = ["All", "Clinics", "Gyms", "Restaurants", "Local Businesses"];

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const fetchPortfolio = async () => {
    try {
      const res = await fetch("/api/portfolio");
      const data = await res.json();
      if (data.portfolio) {
        setPortfolio(data.portfolio);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredItems = portfolio.filter((item) => {
    if (category === "All") return true;
    return item.category.toLowerCase().includes(category.toLowerCase().split(" ")[0]);
  });

  // Slider Mouse Handling for Premium Before / After Showcase
  const handleSliderMove = (e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const container = e.currentTarget.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const offset = ((clientX - container.left) / container.width) * 100;
    setSliderPos(Math.max(0, Math.min(100, offset)));
  };

  return (
    <div className="bg-slate-50 font-sans min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Page Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-xs font-mono font-bold text-violet-600 bg-violet-50 border border-violet-100 px-3 py-1.5 rounded-full uppercase tracking-wider">
            System Showcases
          </span>
          <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 tracking-tight leading-none">
            Our Simulated Case Blueprints
          </h1>
          <p className="text-slate-500 text-sm leading-relaxed">
            Analyze the detailed challenges, solution strategies, and target conversions. Every item represents a simulated local business ecosystem designed to show what is possible.
          </p>
        </div>

        {/* Filter categories tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              id={`portfolio-tab-${cat.replace(/\s+/g, "-")}`}
              onClick={() => setCategory(cat)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wide transition-all uppercase cursor-pointer ${
                category === cat
                  ? "bg-slate-900 text-white shadow-sm"
                  : "bg-white text-slate-500 hover:text-slate-900 border border-slate-200"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Portfolio Showcase Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <RefreshCw className="animate-spin text-violet-600" size={32} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-slate-200 transition-all group flex flex-col justify-between"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-4 left-4 bg-slate-900/90 text-white font-mono text-[9px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                <div className="p-6 space-y-4">
                  <div className="flex justify-between items-center text-xs text-slate-400 font-mono">
                    <span>Client: {item.client}</span>
                    <span>{item.duration}</span>
                  </div>

                  <h3 className="font-display font-bold text-lg text-slate-900 leading-snug group-hover:text-violet-600 transition-colors">
                    {item.title}
                  </h3>

                  <div className="space-y-1.5 pt-2">
                    <span className="text-[10px] text-emerald-600 font-bold font-mono tracking-wider block">KEY CONVERSION RESULTS:</span>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {item.results.slice(0, 2).map((res: string, idx: number) => (
                        <li key={idx} className="flex items-center gap-1.5 line-clamp-1">
                          <span className="h-1 w-1 bg-green-500 rounded-full block"></span>
                          {res}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <button
                    id={`view-details-${item.id}`}
                    onClick={() => setSelectedItem(item)}
                    className="w-full py-3 bg-slate-50 hover:bg-slate-900 text-slate-800 hover:text-white rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                  >
                    Analyze Case Architecture <ArrowRight size={14} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Detailed Case Study Popup Modal WITH Before/After Interactive Slider */}
        <AnimatePresence>
          {selectedItem && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setSelectedItem(null)}
                className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
              />

              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative w-full max-w-4xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-100 z-10 grid grid-cols-1 lg:grid-cols-12 max-h-[90vh]"
              >
                {/* Left Column interactive Slider Showcase */}
                <div className="lg:col-span-5 bg-slate-900 flex flex-col justify-between p-6 relative select-none">
                  <div className="relative w-full aspect-video lg:aspect-square bg-slate-950 rounded-2xl overflow-hidden shadow-inner border border-slate-800">
                    
                    {/* Check if before/after images exist */}
                    {selectedItem.beforeImage && selectedItem.afterImage ? (
                      <div
                        className="relative w-full h-full cursor-ew-resize"
                        onMouseMove={handleSliderMove}
                        onTouchMove={handleSliderMove}
                      >
                        {/* Before image under (Left element overlay size sliderPos) */}
                        <img
                          src={selectedItem.beforeImage}
                          alt="Before Design Upgrade"
                          className="absolute inset-0 w-full h-full object-cover pointer-events-none"
                        />
                        <div className="absolute top-2 left-2 bg-red-500/90 text-white px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold z-10 shadow">
                          Obsolete UI
                        </div>

                        {/* After image over on top (clipped dynamically) */}
                        <div
                          className="absolute inset-0 overflow-hidden pointer-events-none"
                          style={{ width: `${sliderPos}%` }}
                        >
                          <img
                            src={selectedItem.afterImage}
                            alt="Premium Design Deliverable"
                            className="absolute top-0 left-0 w-full h-full object-cover max-w-none"
                            style={{ width: "100%", height: "100%" }}
                          />
                          <div className="absolute top-2 left-2 bg-emerald-500/95 text-white px-2 py-0.5 rounded text-[9px] font-mono uppercase font-bold z-10 shadow">
                            AURA WEB Upgrade
                          </div>
                        </div>

                        {/* Drag Pin Handle */}
                        <div
                          className="absolute top-0 bottom-0 w-1 bg-white cursor-ew-resize pointer-events-none"
                          style={{ left: `${sliderPos}%` }}
                        >
                          <div className="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-white text-slate-900 border-2 border-slate-900 shadow-md flex items-center justify-center font-bold text-xs">
                            ↔
                          </div>
                        </div>
                      </div>
                    ) : (
                      <img
                        src={selectedItem.image}
                        alt="Project showcase"
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>

                  <div className="mt-4 text-center">
                    <p className="text-[10px] font-mono text-slate-400">
                      {selectedItem.beforeImage && selectedItem.afterImage
                        ? "← DRAG THE IMAGE SLIDER TO COMPARE DESIGN ARCHITECTURES →"
                        : "SECURED LOCAL STANDARD DEPLOYMENT"}
                    </p>
                  </div>
                </div>

                {/* Right Column Metrics Overview and Deliverables Details */}
                <div className="lg:col-span-7 p-6 sm:p-8 overflow-y-auto max-h-[85vh] lg:max-h-[90vh] space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <span className="text-[9px] font-mono font-bold text-violet-600 bg-violet-50 border border-violet-100 px-2 py-1 rounded-md uppercase tracking-wider">
                        {selectedItem.category} Case Index
                      </span>
                      <h2 className="font-display font-extrabold text-2xl text-slate-900 mt-2 leading-tight">
                        {selectedItem.title}
                      </h2>
                    </div>
                    <button
                      id="close-details-modal"
                      onClick={() => setSelectedItem(null)}
                      className="text-slate-400 hover:text-slate-900 transition-colors p-1"
                    >
                      ✕
                    </button>
                  </div>

                  {/* Operational parameters briefs */}
                  <div className="grid grid-cols-2 gap-4 border-y border-slate-100 py-3.5 text-xs text-slate-500">
                    <div>
                      <span className="font-medium text-slate-400 block font-mono">CLIENT ENTITY:</span>
                      <span className="font-bold text-slate-950">{selectedItem.client}</span>
                    </div>
                    <div>
                      <span className="font-medium text-slate-400 block font-mono">DELIVERY SPEED:</span>
                      <span className="font-bold text-slate-950">{selectedItem.duration}</span>
                    </div>
                  </div>

                  {/* Core Challenges & Solutions */}
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-display font-bold text-sm text-slate-900 flex items-center gap-1.5">
                        <span className="w-1.5 h-3 bg-red-400 block"></span> The Commercial Obstacle
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1.5 text-justify">
                        {selectedItem.challenge}
                      </p>
                    </div>

                    <div>
                      <h4 className="font-display font-bold text-sm text-slate-900 flex items-center gap-1.5">
                        <span className="w-1.5 h-3 bg-emerald-400 block"></span> The Engineered Solution
                      </h4>
                      <p className="text-xs text-slate-600 leading-relaxed mt-1.5 text-justify">
                        {selectedItem.solution}
                      </p>
                    </div>
                  </div>

                  {/* Results listing */}
                  <div className="space-y-3 bg-slate-50 p-4 rounded-2xl border border-slate-100">
                    <span className="text-[10px] font-mono font-bold text-slate-400 block uppercase">CONVERSION METRICS DEMONSTRATED:</span>
                    <div className="grid grid-cols-1 gap-2">
                      {selectedItem.results.map((res: string, idx: number) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-slate-800 font-semibold">
                          <span className="text-emerald-500 font-bold font-mono">✓</span>
                          <p>{res}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Direct link external */}
                  {selectedItem.websiteUrl && (
                    <div className="flex items-center justify-between pt-2">
                      <a
                        href={selectedItem.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-bold text-violet-600 hover:text-violet-700 flex items-center gap-1.5"
                      >
                        Launch Live Sandbox Web App <ExternalLink size={12} />
                      </a>
                    </div>
                  )}

                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
