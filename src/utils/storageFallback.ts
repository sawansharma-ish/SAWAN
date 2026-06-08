export interface BackupInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  timestamp: string;
  type: "contact" | "lead";
  businessName?: string;
  service?: string;
  budget?: string;
}

export function saveLeadFallback(lead: Omit<BackupInquiry, "id" | "timestamp">) {
  try {
    const existing = localStorage.getItem("aura_fallback_leads");
    const list: BackupInquiry[] = existing ? JSON.parse(existing) : [];
    
    const newLead: BackupInquiry = {
      ...lead,
      id: "fallback-" + Math.random().toString(36).substring(2, 9),
      timestamp: new Date().toISOString()
    };
    
    list.push(newLead);
    localStorage.setItem("aura_fallback_leads", JSON.stringify(list));
    console.log("Saved lead as offline fallback backup:", newLead);
  } catch (err) {
    console.error("Failed to save fallback lead backup:", err);
  }
}

export function getFallbackLeads(): BackupInquiry[] {
  try {
    const existing = localStorage.getItem("aura_fallback_leads");
    return existing ? JSON.parse(existing) : [];
  } catch (err) {
    console.error("Failed to read fallback leads:", err);
    return [];
  }
}

export function clearFallbackLead(id: string) {
  try {
    const existing = localStorage.getItem("aura_fallback_leads");
    if (!existing) return;
    const list: BackupInquiry[] = JSON.parse(existing);
    const filtered = list.filter((l) => l.id !== id);
    localStorage.setItem("aura_fallback_leads", JSON.stringify(filtered));
  } catch (err) {
    console.error("Failed to clear fallback lead:", err);
  }
}
