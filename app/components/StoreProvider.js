"use client";
import { createContext, useContext, useState, useCallback, useRef } from "react";

const noop = () => {};
const defaultStore = { query: "", setQuery: noop, category: "Todas", setCategory: noop, categories: ["Todas"], compareItems: [], compareIds: [], toggleCompare: noop, compareOpen: false, setCompareOpen: noop, toastMsg: "" };
const StoreContext = createContext(defaultStore);
export const useStore = () => useContext(StoreContext);

export default function StoreProvider({ children, categories = ["Todas"] }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("Todas");
  const [compareItems, setCompareItems] = useState([]);
  const [compareOpen, setCompareOpen] = useState(false);
  const [toastMsg, setToastMsg] = useState("");
  const timer = useRef(null);

  const toast = useCallback((msg) => {
    setToastMsg(msg);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setToastMsg(""), 1800);
  }, []);

  // Recibe el producto completo para que el comparador no dependa de un listado global.
  const toggleCompare = useCallback((product) => {
    setCompareItems((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev.filter((p) => p.id !== product.id);
      if (prev.length >= 4) { toast("Puedes comparar hasta 4 productos"); return prev; }
      toast("Añadido al comparador");
      return [...prev, product];
    });
  }, [toast]);

  const compareIds = compareItems.map((p) => p.id);

  const value = {
    query, setQuery, category, setCategory, categories,
    compareItems, compareIds, toggleCompare, compareOpen, setCompareOpen, toastMsg,
  };

  return (
    <StoreContext.Provider value={value}>
      {children}
      {toastMsg ? <div className="toast">{toastMsg}</div> : null}
    </StoreContext.Provider>
  );
}
