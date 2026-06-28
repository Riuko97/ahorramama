"use client";
import { createContext, useContext, useState, useCallback, useRef } from "react";

const noop = () => {};
const defaultStore = { query: "", setQuery: noop, category: "Todas", setCategory: noop, compareIds: [], toggleCompare: noop, compareOpen: false, setCompareOpen: noop, toastMsg: "" };
const StoreContext = createContext(defaultStore);
export const useStore = () => useContext(StoreContext);

export default function StoreProvider({ children }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [compareIds, setCompareIds] = useState([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const timer = useRef(null);

  const toast = useCallback((msg) => {
    setToastMsg(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToastMsg(""), 1800);
  }, []);

  const toggleCompare = useCallback((id) => {
    setCompareIds((prev) => {
      if (prev.includes(id)) return prev.filter((x) => x !== id);
      if (prev.length >= 4) { toast("Puedes comparar hasta 4 productos"); return prev; }
      toast("Añadido al comparador");
      return [...prev, id];
    });
  }, [toast]);

  const value = {
    query, setQuery, category, setCategory,
    compareIds, toggleCompare, compareOpen, setCompareOpen, toastMsg,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
      {toastMsg ? <div className="toast">{toastMsg}</div> : null}
    </StoreContext.Provider>
  );
}
