declare global {
  interface Window {
    dataLayer: any[];
    gtag: (...args: any[]) => void;
  }
}

export type EventName = 
  | 'lead_started' 
  | 'lead_completed' 
  | 'chat_started' 
  | 'human_escalation'
  | 'page_view'
  | 'assessment_start'
  | 'assessment_step'
  | 'assessment_submit'
  | 'form_start'
  | 'form_submit'
  | 'whatsapp_click'
  | 'phone_click'
  | 'email_click'
  | 'project_view'
  | 'case_study_view'
  | 'authority_view'
  | 'guide_view'
  | 'chat_open'
  | 'ai_lead'
  | string;

export function trackEvent(eventName: EventName, properties?: Record<string, any>) {
  if (typeof window === 'undefined' || !window.gtag) return;
  
  window.gtag('event', eventName, properties);
}
