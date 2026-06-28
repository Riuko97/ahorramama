"use client";
import { useStore } from "./StoreProvider";
import { IconScale } from "./Icons";

export default function CompareButton({ id }) {
  const { compareIds, toggleCompare } = useStore();
  const on = compareIds.includes(id);
  return (
    <button
      type="button"
      className={"pd-compare" + (on ? " on" : "")}
      onClick={() => toggleCompare(id)}
      aria-pressed={on}
    >
      <IconScale size={18} /> {on ? "Quitar del comparador" : "Añadir al comparador"}
    </button>
  );
}
