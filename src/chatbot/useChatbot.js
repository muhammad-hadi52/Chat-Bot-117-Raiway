import { useState, useRef, useEffect } from "react";
import {
  MAIN_MENU,
  SUBMENU,
  RESPONSES,
  REAL_TIME_MSG,
  HELPLINE_FULL,
  FALLBACK_MSG,
  KEYWORD_RULES,
} from "./chatbotData";

// ─────────────────────────────────────────────
//  HELPER: resolve a free-text message to a response
// ─────────────────────────────────────────────
// function resolveKeyword(text) {
//   const lower = text.toLowerCase();
//   for (const rule of KEYWORD_RULES) {
//     if (rule.keywords.some((kw) => lower.includes(kw))) {
//       if (rule.special === 'realtime') return REAL_TIME_MSG;
//       return RESPONSES[rule.responseId] || FALLBACK_MSG;
//     }
//   }
//   return FALLBACK_MSG;
// }
function resolveKeyword(text) {
  const lower = text.toLowerCase();
  const highMatches = [];
  let lowMatch = null;

  for (const rule of KEYWORD_RULES) {
    const hit = rule.keywords.some((kw) => lower.includes(kw));
    if (!hit) continue;

    if (rule.priority === "high") {
      if (rule.special === "realtime") return REAL_TIME_MSG;
      highMatches.push(RESPONSES[rule.responseId]);
    } else if (rule.priority === "low" && !lowMatch) {
      lowMatch = rule.responseId;
    }
  }

  // High-priority hits found
  if (highMatches.length === 1) return highMatches[0];

  // Multiple specific responses (e.g. user typed "eticket and paper refund")
  if (highMatches.length > 1) {
    return {
      text: highMatches.map((r) => r.text).join("\n\n─────────────\n\n"),
      helpline: highMatches.some((r) => r.helpline),
    };
  }

  // Only a generic/low-priority match
  if (lowMatch) return RESPONSES[lowMatch];

  return FALLBACK_MSG;
}

// ─────────────────────────────────────────────
//  CUSTOM HOOK
// ─────────────────────────────────────────────
export function useChatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const bodyRef = useRef(null);

  // Auto-scroll to bottom whenever messages change
  useEffect(() => {
    if (bodyRef.current) {
      bodyRef.current.scrollTop = bodyRef.current.scrollHeight;
    }
  }, [messages]);

  // ── Low-level helpers ──────────────────────
  const addMsg = (msg) => setMessages((prev) => [...prev, msg]);
  const removeTyping = (list) => list.filter((m) => m.type !== "typing");

  // ── Show main menu ─────────────────────────
  const showMainMenu = () => {
    addMsg({
      type: "bot",
      text: "What can I help you with today? Please choose a category:",
      menu: true,
    });
  };

  // ── Open chat (first time greet) ───────────
  const openChat = () => {
    setOpen(true);
    if (!started) {
      setStarted(true);
      setTimeout(() => {
        addMsg({
          type: "bot",
          text: "🚆 Welcome to Pakistan Railways!\n\nI'm your virtual assistant. I can help you with tickets, refunds, policies, and more.",
        });
        setTimeout(showMainMenu, 600);
      }, 400);
    }
  };

  const toggleOpen = () => (open ? setOpen(false) : openChat());

  // ── Disable menu/submenu on a message ─────
  const disableMenu = (list) =>
    list.map((m) => (m.menu ? { ...m, menu: false } : m));
  const disableSubmenu = (list) =>
    list.map((m) => (m.submenu ? { ...m, submenu: null } : m));

  // ── Handle main menu card click ────────────
  const handleMenuClick = (id) => {
    setMessages((prev) => disableMenu(prev));

    if (id === "status") {
      addMsg({ type: "user", text: "🚆 Train Status & Delays" });
      setTimeout(() => addMsg({ type: "bot", ...REAL_TIME_MSG }), 600);
      setTimeout(showMainMenu, 1400);
      return;
    }

    if (id === "helpline") {
      addMsg({ type: "user", text: "📞 Contact & Helpline" });
      setTimeout(() => addMsg({ type: "bot", ...HELPLINE_FULL }), 600);
      setTimeout(showMainMenu, 1400);
      return;
    }

    const sub = SUBMENU[id];
    const item = MAIN_MENU.find((m) => m.id === id);
    if (!sub || !item) return;

    addMsg({ type: "user", text: `${item.icon} ${item.label}` });
    setTimeout(() => {
      addMsg({
        type: "bot",
        text: `Here are topics under "${item.label}". Pick one:`,
        submenu: sub,
      });
    }, 500);
  };

  // ── Handle submenu quick-reply click ───────
  const handleSubClick = (id, label) => {
    setMessages((prev) => disableSubmenu(prev));
    addMsg({ type: "user", text: label });
    addMsg({ type: "typing" });

    setTimeout(() => {
      const resp = RESPONSES[id] || {
        text: "I don't have specific info on that yet. Please contact our helpline.",
        helpline: true,
      };
      setMessages((prev) => [...removeTyping(prev), { type: "bot", ...resp }]);
      setTimeout(showMainMenu, 600);
    }, 900);
  };

  // ── Handle "← Back" from submenu ──────────
  const handleBack = () => {
    setMessages((prev) => disableSubmenu(prev));
    showMainMenu();
  };

  // ── Handle free-text send ──────────────────
  const handleSend = () => {
    const text = input.trim();
    if (!text) return;
    setInput("");
    addMsg({ type: "user", text });
    addMsg({ type: "typing" });

    setTimeout(() => {
      const resp = resolveKeyword(text);
      setMessages((prev) => [...removeTyping(prev), { type: "bot", ...resp }]);
      setTimeout(showMainMenu, 700);
    }, 900);
  };

  const handleInputKey = (e) => {
    if (e.key === "Enter") handleSend();
  };

  return {
    open,
    messages,
    input,
    bodyRef,
    setInput,
    toggleOpen,
    handleMenuClick,
    handleSubClick,
    handleBack,
    handleSend,
    handleInputKey,
  };
}
