import React, { useState, useEffect } from "react";
import { Search, Grid, Clock, ChevronLeft, ArrowRight, BookOpen, RefreshCw, User } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

export default function Blog() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [readingBlog, setReadingBlog] = useState<any | null>(null);

  const categories = ["All", "Lead Generation", "Local SEO", "Business Automation"];

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      if (data.blogs) {
        setBlogs(data.blogs);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredBlogs = blogs.filter((b) => {
    const matchesSearch = b.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          b.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          b.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = selectedCategory === "All" || b.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="bg-slate-50 font-sans min-h-screen py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <AnimatePresence mode="wait">
          {!readingBlog ? (
            <motion.div
              key="list"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="space-y-12"
            >
              {/* Header */}
              <div className="text-center max-w-3xl mx-auto space-y-4">
                <span className="text-xs font-mono font-bold text-violet-600 bg-violet-50 border border-violet-100 px-3 py-1.5 rounded-full uppercase tracking-wider">
                  Growth Insights & Strategic Manuals
                </span>
                <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-slate-900 tracking-tight leading-none animate-fade-in">
                  Optimize Your Local Business Scale
                </h1>
                <p className="text-slate-500 text-sm leading-relaxed">
                  Competitors buy obsolete ads. We write structural manuals explaining how clinics, salons, gyms, and local networks capture customers on autopilot.
                </p>
              </div>

              {/* Filters & Search Controllers */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-white border border-slate-100 p-4 rounded-2xl shadow-sm">
                
                {/* Selected categories */}
                <div className="flex flex-wrap gap-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      id={`blog-tab-${cat.replace(/\s+/g, "-")}`}
                      onClick={() => setSelectedCategory(cat)}
                      className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold tracking-wide uppercase transition-all cursor-pointer ${
                        selectedCategory === cat
                          ? "bg-slate-900 text-white"
                          : "bg-slate-50 text-slate-500 hover:text-slate-900 border border-slate-100"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Text query input field */}
                <div className="relative w-full md:w-80">
                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    id="blog-search-input"
                    type="text"
                    placeholder="Search growth topics or guides..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:ring-1 focus:ring-violet-500 focus:outline-none text-slate-900 placeholder-slate-400"
                  />
                </div>

              </div>

              {/* Blogs Listing Frame */}
              {loading ? (
                <div className="flex justify-center items-center py-20">
                  <RefreshCw className="animate-spin text-violet-600" size={32} />
                </div>
              ) : filteredBlogs.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {filteredBlogs.map((b) => (
                    <div
                      key={b.id}
                      className="bg-white border border-slate-100 rounded-3xl overflow-hidden shadow-sm hover:shadow-md hover:border-slate-200 transition-all group flex flex-col justify-between"
                    >
                      <div className="relative h-48 overflow-hidden bg-slate-950">
                        <img
                          src={b.image}
                          alt={b.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        />
                        <span className="absolute top-4 left-4 bg-slate-900/90 text-white font-mono text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider">
                          {b.category}
                        </span>
                      </div>

                      <div className="p-6 space-y-4">
                        <div className="flex items-center gap-3 text-[10px] text-slate-400 font-mono">
                          <span className="flex items-center gap-1"><Clock size={10} /> {b.readTime}</span>
                          <span className="flex items-center gap-1"><User size={10} /> {b.author.split(",")[0]}</span>
                          <span>• {b.publishedDate}</span>
                        </div>

                        <h3 className="font-display font-bold text-base text-slate-900 leading-snug group-hover:text-violet-600 transition-colors">
                          {b.title}
                        </h3>

                        <p className="text-xs text-slate-500 leading-relaxed text-justify line-clamp-3">
                          {b.excerpt}
                        </p>
                      </div>

                      <div className="p-6 pt-0">
                        <button
                          id={`read-article-${b.id}`}
                          onClick={() => setReadingBlog(b)}
                          className="text-xs font-bold text-violet-600 hover:text-violet-700 flex items-center gap-1 group-hover:gap-1.5 transition-all"
                        >
                          Read Guided Manual <ArrowRight size={14} />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="py-20 text-center space-y-2">
                  <BookOpen className="text-slate-300 mx-auto" size={48} />
                  <h4 className="font-display font-bold text-lg text-slate-800">No Growth Manuals Match Search Query</h4>
                  <p className="text-xs text-slate-400">Please reset keywords parameters or filters settings.</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 15 }}
              className="max-w-3xl mx-auto space-y-8 bg-white border border-slate-100 p-6 sm:p-10 rounded-3xl shadow-sm"
            >
              {/* Back to summaries list button */}
              <button
                id="blog-back-btn"
                onClick={() => setReadingBlog(null)}
                className="flex items-center gap-1.5 text-xs font-bold text-slate-500 hover:text-slate-900 group transition-colors"
              >
                <ChevronLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                Back to All Insights
              </button>

              {/* Hero Image */}
              <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden shadow">
                <img
                  src={readingBlog.image}
                  alt={readingBlog.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Meta details */}
              <div className="space-y-4">
                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-500 font-mono">
                  <span className="bg-violet-50 text-violet-700 font-bold px-2 py-0.5 rounded uppercase">
                    {readingBlog.category}
                  </span>
                  <span>Published: {readingBlog.publishedDate}</span>
                  <span>Duration: {readingBlog.readTime}</span>
                </div>

                <h1 className="font-display font-black text-2xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
                  {readingBlog.title}
                </h1>

                {/* Author card block */}
                <div className="flex items-center gap-3 bg-slate-50/80 border border-slate-100 p-3.5 rounded-2xl w-max">
                  <div className="w-9 h-9 rounded-full bg-violet-600/10 text-violet-700 font-display font-bold flex items-center justify-center text-sm">
                    {readingBlog.author.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h5 className="text-xs font-bold text-slate-900">{readingBlog.author}</h5>
                    <p className="text-[10px] text-slate-400">Aura Conversion Department</p>
                  </div>
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Structured Body Articles */}
              <div className="font-sans text-sm text-slate-700 leading-relaxed space-y-6 text-justify">
                {/* Parse simple mock markdown headers safely */}
                {readingBlog.content.split("\n\n").map((para: string, idx: number) => {
                  if (para.startsWith("## ")) {
                    return <h3 key={idx} className="font-display font-extrabold text-xl sm:text-2xl text-slate-950 pt-2">{para.replace("## ", "")}</h3>;
                  }
                  if (para.startsWith("### ")) {
                    return <h4 key={idx} className="font-display font-bold text-base text-slate-900 pt-1">{para.replace("### ", "")}</h4>;
                  }
                  if (para.startsWith("* ")) {
                    return (
                      <ul key={idx} className="list-disc pl-5 space-y-1 text-xs">
                        {para.split("\n").map((li, lIdx) => (
                          <li key={lIdx}>{li.replace("* ", "")}</li>
                        ))}
                      </ul>
                    );
                  }
                  if (para.startsWith("1. ") || para.startsWith("2. ") || para.startsWith("3. ")) {
                    return (
                      <ol key={idx} className="list-decimal pl-5 space-y-1 text-xs">
                        {para.split("\n").map((li, lIdx) => (
                          <li key={lIdx}>{li.replace(/^\d+\.\s+/, "")}</li>
                        ))}
                      </ol>
                    );
                  }
                  return <p key={idx}>{para}</p>;
                })}
              </div>

            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
}
