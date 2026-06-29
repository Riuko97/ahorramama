"use client";
import { useStore } from "./StoreProvider";
import { IconScale } from "./Icons";

export default function CompareButton({ product }) {
  const { compareIds, toggleCompare } = useStore();
  const on = compareIds.includes(product.id);
  return (
    <button
      type="button"
      className={"pd-compare" + (on ? " on" : "")}
      onClick={() => toggleCompare(product)}
      aria-pressed={on}
    >
      <IconScale size={18} /> {on ? "Quitar del comparador" : "Añadir al comparador"}
    </button>
  );
}
