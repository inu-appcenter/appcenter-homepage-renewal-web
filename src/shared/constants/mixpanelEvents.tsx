export const MIXPANEL_EVENTS = {
  PAGE_VIEW: 'Page View',
  JOINUS_LANDING_CTA_CLICK: 'Joinus Landing CTA Click',
  RECRUITMENT_CARD_CLICK: 'Recruitment Card Click',
  RECRUITMENT_APPLY_CLICK: 'Recruitment Apply Click'
} as const;

export const RECRUITMENT_CARD_SOURCE = {
  CAROUSEL: 'carousel',
  LIST: 'list',
  OTHER_RECRUITMENTS: 'other_recruitments'
} as const;

export type RecruitmentCardSource = (typeof RECRUITMENT_CARD_SOURCE)[keyof typeof RECRUITMENT_CARD_SOURCE];
