import { useEffect, useRef } from "react";

interface AnalyticsTrackerProps {
  currentPage: string;
}

export default function AnalyticsTracker({ currentPage }: AnalyticsTrackerProps) {
  const isInitialMount = useRef(true);
  const visitedPages = useRef<string[]>([]);
  const trackerSessionId = useRef<string | null>(null);

  useEffect(() => {
    // Keep track of all pages viewed in this single session
    if (!visitedPages.current.includes(currentPage)) {
      visitedPages.current.push(currentPage);
    }

    const reportAnalytics = async () => {
      try {
        // Detect browser
        const ua = navigator.userAgent;
        let browserName = "Chrome";
        if (ua.includes("Firefox")) browserName = "Firefox";
        else if (ua.includes("Safari") && !ua.includes("Chrome")) browserName = "Safari";
        else if (ua.includes("Edge")) browserName = "Edge";

        // Detect device
        const deviceType = /Mobi|Android|iPhone|iPad/i.test(ua) ? "Mobile" : "Desktop";

        // Detect referral
        const referral = document.referrer ? new URL(document.referrer).hostname : "Direct Search";

        await fetch("/api/analytics/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            path: currentPage,
            referral,
            deviceType,
            browser: browserName,
            pagesVisited: visitedPages.current,
            sessionDuration: Math.floor(Math.random() * 60 + 10) // simulated seconds duration mapping
          })
        });
      } catch (err) {
        console.warn("Analytics ping telemetry skipped:", err);
      }
    };

    // Track on initial load or page switch
    if (isInitialMount.current) {
      isInitialMount.current = false;
      reportAnalytics();
    } else {
      // Debounce slightly to capture realistic page views
      const timer = setTimeout(() => {
        reportAnalytics();
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [currentPage]);

  return null;
}
