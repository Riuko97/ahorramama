const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcryptjs");

const prisma = new PrismaClient();

const PRODUCTS_SEED = [
  { id: 4, title: "Vigilabebés TakTark 720P · visión nocturna, temperatura y nanas", cat: "Vigilabebés", icon: "📹", color: "#e7f8f0", price: 35.99, was: 44.99, rating: 4.4, reviews: 138, brand: "TakTark", store: "Amazon", flash: true, img: "/products/vigilabebes-taktark.jpg", url: "https://amzn.to/4ePVLCL" },
  { id: 7, title: "HelloBaby monitor de bebé con cámara · pantalla 5'' y visión nocturna", cat: "Vigilabebés", icon: "📹", color: "#e7f8f0", price: 79.99, was: 89.99, rating: null, reviews: null, brand: "HelloBaby", store: "Amazon", flash: false, img: "/products/hellobaby-vigilabebes.jpg", description: "Monitor de bebé HelloBaby con cámara y pantalla de 5'' (sin WiFi). Visión nocturna, batería de hasta 30 horas, comunicación bidireccional, sensor de temperatura, 8 nanas y cámara con giro remoto de 355°.", url: "https://amzn.to/3SBewSP" },
  { id: 3, title: "Maxi-Cosi Zelia S Trio · cochecito 3 piezas + silla i-Size (0-4 años)", cat: "Cochecitos", icon: "🛒", color: "#eef1f5", price: 350.99, was: 359.99, rating: 4.4, reviews: 1834, brand: "Maxi-Cosi", store: "Amazon", flash: false, img: "/products/maxicosi-zelia-trio.jpg", description: "Cochecito 3 en 1 de Maxi-Cosi válido de 0 a 4 años (hasta 22 kg). Incluye capazo, silla de paseo reclinable y la silla de coche CabrioFix S i-Size, además de accesorios, bolso cambiador y burbuja de lluvia. Plegado compacto con una mano, ligero y manejable para el día a día.", opinions: [{ name: "Laura M.", rating: 5, date: "hace 2 semanas", text: "Muy completo y fácil de plegar. La silla de coche encaja perfecta, lo recomiendo." }, { name: "Sergio R.", rating: 4, date: "hace 1 mes", text: "Buena relación calidad-precio. La cesta es un poco justa, por lo demás genial." }], url: "https://amzn.to/4oSDr0h" },
  { id: 8, title: "Chicco Urbino silla de paseo · 0+ meses hasta 22 kg, ligera y compacta", cat: "Cochecitos", icon: "🛒", color: "#eef1f5", price: 120, was: 139, rating: null, reviews: null, brand: "Chicco", store: "Amazon", flash: false, img: "/products/chicco-urbino-1.jpg", images: ["/products/chicco-urbino-1.jpg", "/products/chicco-urbino-2.jpg"], description: "Silla de paseo Chicco Urbino, válida desde 0+ meses hasta 22 kg. Ligera y compacta, con cierre inteligente, capota extensible con protección UV50+, respaldo reclinable en 4 posiciones y reposapiernas ajustable. 93% de valoraciones positivas de más de 10.000 clientes.", url: "https://amzn.to/44zjGBo" },
  { id: 9, title: "Maxi-Cosi Soho cochecito · 0-4 años, ultracompacto y plegado con una mano", cat: "Cochecitos", icon: "🛒", color: "#eef1f5", price: 262.49, was: 349.99, rating: null, reviews: null, brand: "Maxi-Cosi", store: "Amazon", flash: false, img: "/products/maxicosi-soho.jpg", description: "Cochecito Maxi-Cosi Soho, válido de 0 a 4 años (0-22 kg). Ultracompacto, con plegado automático con una sola mano, asiento espacioso, 3 reclinaciones (hasta reclinación total) y funda extraíble. 93% de valoraciones positivas.", url: "https://amzn.to/4v6unX4" },
  { id: 10, title: "One Fire luz nocturna infantil · 10 colores, melatonina y temporizador", cat: "Dormir", icon: "💡", color: "#fff4e0", price: 17.97, was: null, rating: null, reviews: null, brand: "One Fire", store: "Amazon", flash: false, img: "/products/onefire-luz-1.jpg", images: ["/products/onefire-luz-1.jpg", "/products/onefire-luz-2.jpg", "/products/onefire-luz-3.jpg"], description: "Luz nocturna infantil One Fire con 10 colores y luz roja regulable (melatonina), mando a distancia, temporizador y control táctil. Portátil y recargable, ideal para la lactancia y el cambio de pañal. Sin BPA.", url: "https://amzn.to/4wfPPKe" },
  { id: 11, title: "Diboniur luz nocturna nube · 7 colores, táctil y recargable (quitamiedos)", cat: "Dormir", icon: "💡", color: "#fff4e0", price: 15.49, was: null, rating: 4.7, reviews: 649, brand: "Diboniur", store: "Amazon", flash: false, img: "/products/diboniur-luz-1.jpg", images: ["/products/diboniur-luz-1.jpg", "/products/diboniur-luz-2.jpg"], description: "Luz nocturna infantil Diboniur con forma de nube, control táctil, 7 colores y 3 niveles de brillo. Recargable y portátil, perfecta como luz quitamiedos y decoración para el dormitorio del bebé.", url: "https://amzn.to/4oXhmOb" },
  { id: 12, title: "Tommee Tippee biberón anticólicos 260 ml · pack de 2 (tetina flujo lento)", cat: "Lactancia", icon: "🍼", color: "#f0ecff", price: 13.29, was: 18.99, rating: null, reviews: null, brand: "Tommee Tippee", store: "Amazon", flash: false, img: "/products/biberon-tommee-tippee.jpg", description: "Pack de 2 biberones Tommee Tippee anticólicos de 260 ml, con tetina de flujo lento para un agarre natural y varilla de ventilación que reduce los cólicos. Ideales para la lactancia combinada.", url: "https://amzn.to/4xVVpDb" },
  { id: 13, title: "Magic ZC carrito 3 en 1 · asiento giratorio 360° y plegado con un clic", cat: "Cochecitos", icon: "🛒", color: "#eef1f5", price: 349.78, was: 409.10, rating: 4.3, reviews: 159, brand: "Magic ZC", store: "Amazon", flash: true, img: "/products/magic-zc-carrito.jpg", description: "Carrito de bebé Magic ZC 3 en 1 (3 piezas) con asiento convertible y giratorio 360°, capazo y silla de coche. Plegado con un solo clic y tapizado en cuero PU. Modelo 906 White.", url: "https://amzn.to/4oTIQE9" },
  { id: 14, title: "Magic ZC carrito 3 en 1 rosa · giratorio 360° y plegado con un clic", cat: "Cochecitos", icon: "🛒", color: "#ffe6f1", price: 349.78, was: 409.10, rating: null, reviews: null, brand: "Magic ZC", store: "Amazon", flash: false, img: "/products/magic-zc-pink-1.jpg", images: ["/products/magic-zc-pink-1.jpg", "/products/magic-zc-pink-2.jpg"], description: "Carrito de bebé Magic ZC 3 en 1 (3 piezas) en rosa, con asiento convertible y giratorio 360°, capazo y silla de coche. Plegado con un solo clic y tapizado en cuero PU. Modelo 906 Pink.", url: "https://amzn.to/4eOJH4z" },
  { id: 15, title: "Tommee Tippee Natural Start biberón anticólicos 260 ml · pack de 2", cat: "Lactancia", icon: "🍼", color: "#f0ecff", price: 12.59, was: 17.99, rating: null, reviews: null, brand: "Tommee Tippee", store: "Amazon", flash: false, img: "/products/biberon-tommee-natural.jpg", description: "Pack de 2 biberones Tommee Tippee Natural Start de 260 ml, anticólicos, con tetina anatómica de flujo lento para un agarre natural y válvula anticólicos. 93% de valoraciones positivas.", url: "https://amzn.to/4v0ILzY" },
  { id: 16, title: "Twistshake biberón anticólicos 260 ml · con depósito y mezclador (gris)", cat: "Lactancia", icon: "🍼", color: "#f0ecff", price: 6.40, was: 7.82, rating: null, reviews: null, brand: "Twistshake", store: "Amazon", flash: false, img: "/products/twistshake-biberon-1.jpg", images: ["/products/twistshake-biberon-1.jpg", "/products/twistshake-biberon-2.jpg"], description: "Biberón Twistshake anticólicos de 260 ml con depósito para leche en polvo y mezclador. Tetina de silicona de flujo medio estilo pecho, libre de BPA. Apto desde 2 meses. 94% de valoraciones positivas.", url: "https://amzn.to/4aWfLCk" },
  { id: 17, title: "PROENMU diario de embarazo · con lápiz metálico y caja regalo", cat: "Embarazo", icon: "📔", color: "#fff0f6", price: 13.67, was: 19.99, rating: null, reviews: null, brand: "PROENMU", store: "Amazon", flash: false, img: "/products/diario-embarazo-1.jpg", images: ["/products/diario-embarazo-1.jpg", "/products/diario-embarazo-2.jpg"], description: "Diario de embarazo PROENMU en español, con lápiz metálico y caja de regalo con cierre magnético. Álbum para registrar mes a mes el embarazo; un regalo original para embarazadas.", url: "https://amzn.to/4xUFsNA" },
  { id: 18, title: "Nestlé crema de arroz sin gluten · desde 6 meses, 450 g", cat: "Alimentación", icon: "🥣", color: "#fff4e0", price: 3.99, was: 5.45, rating: null, reviews: null, brand: "Nestlé", store: "Amazon", flash: false, img: "/products/nestle-crema-arroz.jpg", description: "Cereal Nestlé crema de arroz sin gluten, a partir de los 6 meses. Bote de 450 g, ideal para la primera papilla del bebé.", url: "https://amzn.to/4xQSR9m" },
  { id: 19, title: "Nestlé papilla 8 cereales con miel · 950 g", cat: "Alimentación", icon: "🥣", color: "#fff4e0", price: 6.66, was: 6.85, rating: null, reviews: null, brand: "Nestlé", store: "Amazon", flash: false, img: "/products/nestle-papilla-cereales.jpg", description: "Papilla Nestlé 8 cereales con miel, bote de 950 g. Para la etapa de introducción de cereales en la alimentación del bebé. 94% de valoraciones positivas.", url: "https://amzn.to/4aloG04" },
  { id: 20, title: "Smileat papilla ecológica 7 cereales · sin azúcar añadido", cat: "Alimentación", icon: "🥣", color: "#fff4e0", price: 3.28, was: 4.29, rating: null, reviews: null, brand: "Smileat", store: "Amazon", flash: false, img: "/products/smileat-papilla-cereales.jpg", description: "Papilla Smileat ecológica de 7 cereales para peques, sin azúcar añadido y con ingredientes vegetales. Fácil de diluir y preparar. 90% de valoraciones positivas.", url: "https://amzn.to/4eNs2ua" },
  { id: 21, title: "Hero Solo caja mixta de carne · pack 18 tarritos (235 g), desde 6 meses", cat: "Alimentación", icon: "🍲", color: "#fff4e0", price: 32.78, was: null, rating: null, reviews: null, brand: "Hero", store: "Amazon", flash: false, img: "/products/hero-solo-tarritos.jpg", description: "Caja mixta Hero Solo de tarritos: 6 de arroz con pollo, 6 de verdura con pollo y ternera y 6 de verduritas con pavo. Pack de 18 x 235 g, para bebés desde 6 meses. 94% de valoraciones positivas.", url: "https://amzn.to/4oUaAIP" },
  { id: 22, title: "Dodot Sensitive Talla 1 · 224 pañales + 40 toallitas (pack mensual)", cat: "Pañales", icon: "🧷", color: "#e9f1ff", price: 74.99, was: null, rating: null, reviews: null, brand: "Dodot", store: "Amazon", flash: false, img: "/products/dodot-sensitive-t1-1.jpg", images: ["/products/dodot-sensitive-t1-1.jpg", "/products/dodot-sensitive-t1-2.jpg"], description: "Pack mensual de pañales Dodot Sensitive talla 1 (2-5 kg): 224 pañales con barrera antifugas y hasta 12 horas de protección y cuidado de la piel. Incluye de regalo 40 toallitas Aqua Pure (99% agua).", url: "https://amzn.to/4xVoNt6" },
  { id: 23, title: "Dodot Bebé-Seco Talla 3 · 292 pañales + toallitas (pack mensual)", cat: "Pañales", icon: "🧷", color: "#e9f1ff", price: 79.99, was: null, rating: null, reviews: null, brand: "Dodot", store: "Amazon", flash: false, img: "/products/dodot-seco-t3.jpg", description: "Pack mensual de pañales Dodot Bebé-Seco talla 3 (6-10 kg): 292 pañales, una noche hasta un 100% libre de fugas. Incluye de regalo 1 pack de 10 toallitas Aqua Pure (99% agua). 97% de valoraciones positivas.", url: "https://amzn.to/4aTzDGg" },
  { id: 24, title: "Dodot Sensitive Talla 4 · 192 pañales + 4 Pants de regalo (pack mensual)", cat: "Pañales", icon: "🧷", color: "#e9f1ff", price: 91.99, was: null, rating: null, reviews: null, brand: "Dodot", store: "Amazon", flash: false, img: "/products/dodot-sensitive-t4.jpg", description: "Pack mensual de pañales Dodot Sensitive talla 4 (9-14 kg): 192 pañales con hasta 12 horas de protección antifugas y cuidado de la piel. Incluye 4 Pants de regalo.", url: "https://amzn.to/4eB9yOv" },
  { id: 25, title: "Nestlé NAN Optipro 2 mega pack · leche continuación 800 g + 1200 g", cat: "Alimentación", icon: "🍼", color: "#fff4e0", price: 43.84, was: 50.80, rating: null, reviews: null, brand: "Nestlé NAN", store: "Amazon", flash: false, img: "/products/nan-optipro-megapack.jpg", description: "Mega pack de leche de continuación en polvo Nestlé NAN Optipro 2: lata de 800 g + estuche de 1200 g, para bebés a partir de los 6 meses.", url: "https://amzn.to/4eNhuuZ" },
  { id: 1, title: "Dodot Sensitive Talla 2 · 240 pañales + 40 toallitas (pack mensual)", cat: "Pañales", icon: "🧷", color: "#e9f1ff", price: 80.99, was: null, rating: 4.7, reviews: 16575, brand: "Dodot", store: "Amazon", flash: false, img: "/products/dodot-sensitive-t2.jpg", description: "Pack mensual de pañales Dodot Sensitive talla 2 (4-8 kg): 240 pañales con barrera antifugas Stop Fugas y hasta 12 horas de protección y cuidado de la piel. Incluye de regalo 40 toallitas Aqua Pure (99% agua). El nº 1 más vendido en bebé.", opinions: [{ name: "Marta G.", rating: 5, date: "hace 3 días", text: "Los de siempre, no fallan. En pack mensual a este precio sale genial." }, { name: "Nuria P.", rating: 5, date: "hace 2 semanas", text: "Súper absorbentes y no le irritan la piel al peque." }], url: "https://amzn.to/4oTYmjp" },
  { id: 2, title: "Toallitas para bebé sin perfume · 1008 uds (18 packs)", cat: "Higiene", icon: "🧴", color: "#e7f8f0", price: 13.10, was: 14.31, rating: 4.3, reviews: 6030, brand: "by Amazon", store: "Amazon", flash: false, img: "/products/toallitas-by-amazon.jpg", description: "Multipack de 1008 toallitas para bebé sin perfume (18 paquetes de 56). Con base de agua, sin alérgenos e ideales para pieles sensibles. Suaves y resistentes para el cambio de pañal diario.", opinions: [{ name: "Iván L.", rating: 4, date: "hace 1 semana", text: "Cumplen perfectamente y el precio por unidad es imbatible." }, { name: "Cris D.", rating: 4, date: "hace 1 mes", text: "Grandes y húmedas. Repetiré sin duda." }], url: "https://amzn.to/4eOQXgK" },
  { id: 5, title: "Momcozy mochila portabebés ergonómica (3-24 meses)", cat: "Paseo", icon: "🎒", color: "#ffe6f1", price: 59.99, was: null, rating: null, reviews: null, brand: "Momcozy", store: "Amazon", flash: false, img: "/products/mochila-momcozy.jpg", description: "Mochila portabebés ergonómica Momcozy para bebés de 3 a 24 meses. Ligera y cómoda, con soporte lumbar mejorado, fácil de poner y uso manos libres. 90% de valoraciones positivas de más de 1.000 clientes.", url: "https://amzn.to/4aW2M3A" },
  { id: 6, title: "Momcozy saco para bebé 0-3 meses (pack de 2)", cat: "Dormir", icon: "💤", color: "#e9f1ff", price: 32.99, was: null, rating: null, reviews: null, brand: "Momcozy", store: "Amazon", flash: false, img: "/products/saco-momcozy-1.jpg", images: ["/products/saco-momcozy-1.jpg", "/products/saco-momcozy-2.jpg", "/products/saco-momcozy-3.jpg"], description: "Saco envoltura Momcozy para recién nacidos de 0 a 3 meses (pack de 2). Cierre silencioso y ajuste seguro que reduce el reflejo de sobresalto (Moro) para que el bebé duerma mejor. Fácil de poner en dos pasos. 90% de valoraciones positivas de más de 1.000 clientes.", url: "https://amzn.to/4v2iEJ8" },
];

async function main() {
  console.log("Seeding database...");

  // Upsert products preserving original IDs
  for (const p of PRODUCTS_SEED) {
    await prisma.product.upsert({
      where: { id: p.id },
      update: {},
      create: {
        id: p.id,
        title: p.title,
        cat: p.cat,
        icon: p.icon ?? null,
        color: p.color ?? null,
        price: p.price ?? null,
        was: p.was ?? null,
        rating: p.rating ?? null,
        reviews: p.reviews ?? null,
        brand: p.brand ?? null,
        store: p.store ?? "Amazon",
        flash: p.flash ?? false,
        img: p.img ?? null,
        images: p.images ? JSON.stringify(p.images) : null,
        description: p.description ?? null,
        opinions: p.opinions ? JSON.stringify(p.opinions) : null,
        url: p.url,
        active: true,
      },
    });
  }
  console.log(`Seeded ${PRODUCTS_SEED.length} products.`);

  // Admin user
  const adminEmail = process.env.ADMIN_EMAIL || "admin@ahorramama.com";
  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) throw new Error("Falta ADMIN_PASSWORD en .env — no se crea admin con contraseña por defecto");
  const hash = await bcrypt.hash(adminPassword, 12);
  await prisma.adminUser.upsert({
    where: { email: adminEmail },
    update: { password: hash },
    create: { email: adminEmail, password: hash },
  });
  console.log(`Admin user: ${adminEmail}`);
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(() => prisma.$disconnect());
