// ─────────────────────────────────────────────
//  MAIN MENU ITEMS
// ─────────────────────────────────────────────
export const MAIN_MENU = [
  { id: 'tickets',   icon: '🎫', label: 'Tickets & Booking' },
  { id: 'refunds',   icon: '💰', label: 'Refunds & Cancellations' },
  { id: 'status',    icon: '🚆', label: 'Train Status & Delays' },
  { id: 'schedules', icon: '🗺️', label: 'Routes & Schedules' },
  { id: 'account',   icon: '👤', label: 'My Account' },
  { id: 'helpline',  icon: '📞', label: 'Contact & Helpline' },
];

// ─────────────────────────────────────────────
//  SUBMENUS  (null = handled directly, no submenu)
// ─────────────────────────────────────────────
export const SUBMENU = {
  tickets: [
    { id: 'book_online', label: 'How to book online?' },
    { id: 'half_fare',   label: 'Half fare eligibility' },
    { id: 'cnic_req',    label: 'CNIC requirement' },
    { id: 'economy_ac',  label: 'Economy vs AC seats' },
  ],
  refunds: [
    { id: 'eticket_refund',   label: 'E-Ticket refund policy' },
    { id: 'paper_refund',     label: 'Paper ticket refund' },
    { id: 'train_cancelled',  label: 'Train cancelled / 6hr delay' },
    { id: 'easypaisa_refund', label: 'Easypaisa / Rabta refund' },
    { id: 'guard_chart',      label: 'What is Guard Chart?' },
  ],
  status:    null,
  schedules: [
    { id: 'attock_safari', label: 'Attock Safari Train' },
    { id: 'shalimar',      label: 'Shalimar Express' },
    { id: 'green_line',    label: 'Green Line fare rules' },
  ],
  account: [
    { id: 'create_account', label: 'Create new account' },
    { id: 'verify_account', label: 'Verification issues' },
    { id: 'change_contact', label: 'Change mobile / email' },
  ],
  helpline: null,
};

// ─────────────────────────────────────────────
//  BOT RESPONSES  (keyed by submenu item id)
//  Each entry: { text: string, helpline?: bool }
// ─────────────────────────────────────────────
export const RESPONSES = {
  eticket_refund: {
    text: `Here's the e-ticket refund policy:\n\n• Before 48 hrs of departure → 10% deducted\n• 24–48 hrs before → 20% deducted\n• Within 24 hrs → 30% deducted\n• Less than 2 hrs or after guard chart → No cancellation possible\n\nRefund goes back via the same payment method used (e.g. Easypaisa → Easypaisa).`,
  },
  paper_refund: {
    text: `Paper ticket refund rules:\n\n• Before 48 hrs → 10% deducted\n• 24–48 hrs before → 20% deducted\n• Within 24 hrs → 30% deducted\n• After guard chart production → 30% refund given\n• Within 3 hrs after departure → 50% refund\n• Train cancelled → Full refund\n\nVisit any nearest reservation center with your CNIC photocopy.`,
  },
  train_cancelled: {
    text: `If your train is cancelled or delayed by more than 6 hours:\n\n✅ No deductions apply\n\nYou need to:\n1. Get the Station Master's signature on a written application\n2. Send it to the CCM Office for approval\n3. Refund will be processed via original payment method\n\nFor coach damage/unavailability, get a certificate from Station Master and send a written request to CCM Office Lahore.`,
  },
  easypaisa_refund: {
    text: `For Easypaisa / Rabta refund issues:\n\n• Refunds are processed via the same payment method used at booking\n• If paid via Easypaisa → refund goes back to your Easypaisa account\n• For pending refunds, contact: info@pakrail.gov.pk\n\nIf no response within 48 hrs, please call our helpline for escalation.`,
    helpline: true,
  },
  guard_chart: {
    text: `A Guard Chart is a printed list of all reserved passengers, produced before train departure.\n\n• Usually produced 2 hours before departure\n• At remote stations, it may be produced the previous night\n\nExample: Shalimar Express departs at 6:00 AM → Guard chart produced at 8:00 PM the night before. After this time, online cancellation is not possible.`,
  },
  half_fare: {
    text: `Half fare applies to:\n\n👶 Children aged 3 to 10 years\n👴 Senior citizens aged 65 and above (in selected trains only)\n\nNote: Economy class does NOT have a senior citizen concession on all trains. Always verify at booking.`,
  },
  create_account: {
    text: `To create a Pakistan Railways account:\n\n1. Provide your real CNIC number\n2. Enter your mobile number and email\n3. Verify via SMS and email link (both required)\n4. Verification link/SMS can be resent up to 3 times\n\n⚠️ After 3 failed attempts, your phone and email are permanently blocked for registration.`,
  },
  verify_account: {
    text: `If you did not receive the verification SMS or email:\n\n• You can request resend up to 3 times\n• Check your spam/junk folder for the email\n• Make sure your mobile number is active\n\n⚠️ After 3 failed attempts, the phone number and email are permanently blocked. Contact helpline for unblocking.`,
    helpline: true,
  },
  change_contact: {
    text: `You can change your mobile number or email only BEFORE verification is complete.\n\nOnce both email and mobile are verified, you cannot change them.\n\nIf you need help, contact our support helpline.`,
    helpline: true,
  },
  economy_ac: {
    text: `Seat reservation rules:\n\n🪑 Economy class: Seats reserved from originating quota station to passenger's ending station\n\n❄️ AC class (except Green Line): Reserved from passenger's boarding station to destination\n\n🟢 Green Line: Quota-based fare — see "Green Line fare rules" for details.`,
  },
  green_line: {
    text: `Green Line uses a quota-based fare system:\n\n• Fare is charged from the seat's quota origin, not your boarding station\n• Example: If a Rawalpindi–Karachi seat is assigned and you board at Rohri, you are charged Rawalpindi–Karachi fare\n\n⏰ This rule is automatically nullified after 24 hours, and fare applies as per normal AC rules.`,
  },
  attock_safari: {
    text: `Attock Safari Train details are not available in our current knowledge base.\n\nFor the latest schedule, route, and facilities of Attock Safari Train, please contact our helpline or visit the official Pakistan Railways website.`,
    helpline: true,
  },
  shalimar: {
    text: `For current Shalimar Express timings, delays, or schedule changes, please contact the relevant station directly or call our helpline.\n\nNote: Real-time train status is not available through this chatbot at the moment.`,
    helpline: true,
  },
  cnic_req: {
    text: `CNIC is required at multiple points:\n\n• During registration: provide your real CNIC number\n• During refund: show original CNIC (e-ticket) or photocopy (paper ticket)\n• The ticket is personal and non-transferable — only the person named on the ticket may travel.`,
  },
  book_online: {
    text: `You can book tickets online via:\n\n• Pakistan Railways official website\n• Rabta app\n• Easypaisa (for payment)\n\nCreate a personal account first. Commercial use of personal accounts is strictly prohibited and will result in permanent blocking.`,
  },
};

// ─────────────────────────────────────────────
//  SPECIAL MESSAGES  (not in submenu flow)
// ─────────────────────────────────────────────
export const REAL_TIME_MSG = {
  text: `This query requires real-time data (live train location, delays, or cancellations).\n\nOur chatbot cannot provide live updates at this time. Please contact our helpline for the latest information.`,
  helpline: true,
};

export const HELPLINE_FULL = {
  text: `Pakistan Railways Helpline:\n📞 117 (UAN)\n📧 info@pakrail.gov.pk\n🌐 www.pakrail.gov.pk\n\nFor complaints about staff or reservation offices, please visit your nearest Divisional Commercial Manager office.`,
};

export const FALLBACK_MSG = {
  text: `I'm not sure about that. Please use the menu below or contact our helpline for assistance.`,
  helpline: true,
};

// ─────────────────────────────────────────────
//  KEYWORD → RESPONSE MAP  (for free-text input)
// ─────────────────────────────────────────────
export const KEYWORD_RULES = [
  { keywords: ['easypaisa', 'rabta'],                        responseId: 'easypaisa_refund' },
  { keywords: ['guard chart', 'guard'],                      responseId: 'guard_chart' },
  { keywords: ['delay', 'late', 'location', 'live'],         special: 'realtime' },
  { keywords: ['refund', 'cancel'],                          responseId: 'eticket_refund' },
  { keywords: ['half fare', 'senior', 'kid', 'child'],       responseId: 'half_fare' },
  { keywords: ['account', 'register'],                       responseId: 'create_account' },
  { keywords: ['cnic'],                                      responseId: 'cnic_req' },
  { keywords: ['green line'],                                responseId: 'green_line' },
  { keywords: ['paper ticket'],                              responseId: 'paper_refund' },
  { keywords: ['shalimar'],                                  responseId: 'shalimar' },
  { keywords: ['attock', 'safari'],                          responseId: 'attock_safari' },
];
