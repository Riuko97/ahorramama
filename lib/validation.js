// ============================================================
// Validación y saneamiento de datos de entrada del panel admin
// ============================================================

export function normalizeEmail(value) {
  return String(value || "").trim().toLowerCase();
}

export function isValidEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

// Convierte a número o null; rechaza valores no numéricos válidos
function toNumberOrNull(value) {
  if (value === "" || value === null || value === undefined) return null;
  const n = Number(value);
  return Number.isFinite(n) ? n : NaN; // NaN señala error de validación
}

function toIntOrNull(value) {
  const n = toNumberOrNull(value);
  if (n === null) return null;
  if (Number.isNaN(n)) return NaN;
  return Math.trunc(n);
}

/**
 * Valida y normaliza el payload de un producto.
 * @returns {{ data?: object, errors?: string[] }}
 */
export function validateProduct(input, { partial = false } = {}) {
  const errors = [];
  const data = {};

  const has = (k) => Object.prototype.hasOwnProperty.call(input, k);

  // Campos de texto obligatorios
  const requiredStrings = ["title", "cat", "url"];
  for (const key of requiredStrings) {
    if (!partial || has(key)) {
      const v = typeof input[key] === "string" ? input[key].trim() : "";
      if (!v) errors.push(`El campo "${key}" es obligatorio.`);
      else data[key] = v;
    }
  }

  if (has("url") && data.url && !/^https?:\/\//i.test(data.url)) {
    errors.push("La URL debe empezar por http:// o https://");
  }

  // Campos de texto opcionales
  const optionalStrings = ["icon", "color", "brand", "store", "img", "description"];
  for (const key of optionalStrings) {
    if (has(key)) {
      const v = input[key];
      data[key] = v === null || v === "" ? null : String(v).trim();
    }
  }

  // Numéricos float
  for (const key of ["price", "was", "rating"]) {
    if (has(key)) {
      const n = toNumberOrNull(input[key]);
      if (Number.isNaN(n)) errors.push(`El campo "${key}" debe ser un número.`);
      else if (n !== null && n < 0) errors.push(`El campo "${key}" no puede ser negativo.`);
      else data[key] = n;
    }
  }
  if (data.rating != null && (data.rating < 0 || data.rating > 5)) {
    errors.push("La valoración debe estar entre 0 y 5.");
  }

  // Numérico entero
  if (has("reviews")) {
    const n = toIntOrNull(input.reviews);
    if (Number.isNaN(n)) errors.push('El campo "reviews" debe ser un número entero.');
    else if (n !== null && n < 0) errors.push('El campo "reviews" no puede ser negativo.');
    else data.reviews = n;
  }

  // Booleanos
  for (const key of ["flash", "active"]) {
    if (has(key)) data[key] = Boolean(input[key]);
  }

  // Arrays JSON (images, opinions) — el llamante los serializa después
  if (has("images")) {
    const imgs = input.images;
    if (imgs === null || imgs === "") data.images = null;
    else if (Array.isArray(imgs)) data.images = imgs.map((s) => String(s).trim()).filter(Boolean);
    else errors.push('El campo "images" debe ser una lista.');
  }
  if (has("opinions")) {
    const ops = input.opinions;
    if (ops === null || ops === "") data.opinions = null;
    else if (Array.isArray(ops)) data.opinions = ops;
    else errors.push('El campo "opinions" debe ser una lista.');
  }

  if (errors.length) return { errors };
  return { data };
}
