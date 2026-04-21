// ============================================================
// PRODUCT DATA - Boys T-Shirts & Shirts
// Images from Unsplash (free, no API key needed for direct URLs)
// All prices in Indian Rupees (₹)
// ============================================================

const products = [
  // ==================== T-SHIRTS ====================
  {
    id: 1,
    name: "Classic Cotton Crew Tee",
    price: 499,
    category: "T-Shirt",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#FFFFFF", image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&h=700&fit=crop" },
      { name: "Black", hex: "#1a1a1a", image: "https://images.unsplash.com/photo-1503341504253-dff4f94032ef?w=600&h=700&fit=crop" },
      { name: "Navy Blue", hex: "#1e3a5f", image: "https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&h=700&fit=crop" },
      { name: "Red", hex: "#dc2626", image: "https://images.unsplash.com/photo-1529374255404-311a2a4f1fd9?w=600&h=700&fit=crop" },
      { name: "Grey", hex: "#6b7280", image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&h=700&fit=crop" }
    ]
  },
  {
    id: 2,
    name: "Sporty V-Neck Tee",
    price: 599,
    category: "T-Shirt",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Royal Blue", hex: "#2563eb", image: "https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&h=700&fit=crop" },
      { name: "Olive Green", hex: "#4d7c0f", image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&h=700&fit=crop" },
      { name: "Charcoal", hex: "#374151", image: "https://images.unsplash.com/photo-1571945153237-4929e783af4a?w=600&h=700&fit=crop" },
      { name: "Burgundy", hex: "#7f1d1d", image: "https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=600&h=700&fit=crop" },
      { name: "White", hex: "#FFFFFF", image: "https://images.unsplash.com/photo-1554568218-0f1715e72254?w=600&h=700&fit=crop" }
    ]
  },
  {
    id: 3,
    name: "Urban Graphic Print Tee",
    price: 699,
    category: "T-Shirt",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Black", hex: "#1a1a1a", image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=600&h=700&fit=crop" },
      { name: "White", hex: "#FFFFFF", image: "https://images.unsplash.com/photo-1622445275576-721325763afe?w=600&h=700&fit=crop" },
      { name: "Mustard", hex: "#ca8a04", image: "https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?w=600&h=700&fit=crop" },
      { name: "Teal", hex: "#0d9488", image: "https://images.unsplash.com/photo-1581655353564-df123a1eb820?w=600&h=700&fit=crop" },
      { name: "Pink", hex: "#ec4899", image: "https://images.unsplash.com/photo-1625910513413-5fc421e0fd6f?w=600&h=700&fit=crop" }
    ]
  },
  {
    id: 4,
    name: "Premium Polo T-Shirt",
    price: 899,
    category: "T-Shirt",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Navy", hex: "#1e3a5f", image: "https://images.unsplash.com/photo-1598033129183-c4f50c736c10?w=600&h=700&fit=crop" },
      { name: "White", hex: "#FFFFFF", image: "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=600&h=700&fit=crop" },
      { name: "Sky Blue", hex: "#38bdf8", image: "https://images.unsplash.com/photo-1564584217132-2271feaeb3c5?w=600&h=700&fit=crop" },
      { name: "Black", hex: "#1a1a1a", image: "https://images.unsplash.com/photo-1613852348851-df1739db8201?w=600&h=700&fit=crop" },
      { name: "Maroon", hex: "#7f1d1d", image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&h=700&fit=crop" }
    ]
  },
  {
    id: 5,
    name: "Relaxed Fit Oversized Tee",
    price: 749,
    category: "T-Shirt",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Lavender", hex: "#a78bfa", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=700&fit=crop" },
      { name: "Sage Green", hex: "#86efac", image: "https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=600&h=700&fit=crop" },
      { name: "Peach", hex: "#fdba74", image: "https://images.unsplash.com/photo-1627225924765-552d49cf2bb1?w=600&h=700&fit=crop" },
      { name: "Black", hex: "#1a1a1a", image: "https://images.unsplash.com/photo-1578768079470-4deaf7a23b08?w=600&h=700&fit=crop" },
      { name: "White", hex: "#FFFFFF", image: "https://images.unsplash.com/photo-1574180566232-aaad1b5b8450?w=600&h=700&fit=crop" }
    ]
  },

  // ==================== SHIRTS ====================
  {
    id: 6,
    name: "Oxford Button-Down Shirt",
    price: 1299,
    category: "Shirt",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Light Blue", hex: "#93c5fd", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=700&fit=crop&q=80" },
      { name: "White", hex: "#FFFFFF", image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&h=700&fit=crop" },
      { name: "Pink", hex: "#f9a8d4", image: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&h=700&fit=crop" },
      { name: "Striped Blue", hex: "#60a5fa", image: "https://images.unsplash.com/photo-1588359348347-9bc6cbbb689e?w=600&h=700&fit=crop&q=80" },
      { name: "Grey", hex: "#9ca3af", image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&h=700&fit=crop" }
    ]
  },
  {
    id: 7,
    name: "Casual Linen Shirt",
    price: 1499,
    category: "Shirt",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Beige", hex: "#d4a76a", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=700&fit=crop&q=90" },
      { name: "White", hex: "#FFFFFF", image: "https://images.unsplash.com/photo-1598961942613-ba897716405b?w=600&h=700&fit=crop" },
      { name: "Olive", hex: "#65a30d", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=700&fit=crop" },
      { name: "Sky Blue", hex: "#7dd3fc", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=700&fit=crop" },
      { name: "Charcoal", hex: "#374151", image: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=600&h=700&fit=crop" }
    ]
  },
  {
    id: 8,
    name: "Slim Fit Formal Shirt",
    price: 1199,
    category: "Shirt",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "White", hex: "#FFFFFF", image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&h=700&fit=crop" },
      { name: "Black", hex: "#1a1a1a", image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&h=700&fit=crop&q=80" },
      { name: "Navy", hex: "#1e40af", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=700&fit=crop&q=80" },
      { name: "Wine", hex: "#881337", image: "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&h=700&fit=crop&q=80" },
      { name: "Steel Blue", hex: "#475569", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=700&fit=crop&q=80" }
    ]
  },
  {
    id: 9,
    name: "Checkered Flannel Shirt",
    price: 999,
    category: "Shirt",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Red Check", hex: "#dc2626", image: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=600&h=700&fit=crop&q=80" },
      { name: "Blue Check", hex: "#2563eb", image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&h=700&fit=crop&q=70" },
      { name: "Green Check", hex: "#16a34a", image: "https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=600&h=700&fit=crop&q=70" },
      { name: "Grey Check", hex: "#6b7280", image: "https://images.unsplash.com/photo-1621072156002-e2fccdc0b176?w=600&h=700&fit=crop&q=80" },
      { name: "Brown Check", hex: "#92400e", image: "https://images.unsplash.com/photo-1598961942613-ba897716405b?w=600&h=700&fit=crop&q=80" }
    ]
  },
  {
    id: 10,
    name: "Denim Casual Shirt",
    price: 1399,
    category: "Shirt",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: [
      { name: "Light Wash", hex: "#93c5fd", image: "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=600&h=700&fit=crop&q=70" },
      { name: "Dark Wash", hex: "#1e3a5f", image: "https://images.unsplash.com/photo-1589310243389-96a5483213a8?w=600&h=700&fit=crop&q=70" },
      { name: "Medium Blue", hex: "#3b82f6", image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600&h=700&fit=crop&q=80" },
      { name: "Black Denim", hex: "#1a1a1a", image: "https://images.unsplash.com/photo-1620012253295-c15cc3e65df4?w=600&h=700&fit=crop&q=70" },
      { name: "Faded Blue", hex: "#60a5fa", image: "https://images.unsplash.com/photo-1598961942613-ba897716405b?w=600&h=700&fit=crop&q=70" }
    ]
  }
]

export default products
