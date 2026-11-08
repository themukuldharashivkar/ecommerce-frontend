// Single source of truth for storefront categories.
// Only categories that actually have products are listed so every link lands on a populated page.
const IMG = (path) => `https://rukminim1.flixcart.com/image/612/612/${path}?q=70`;

export const categoryImages = {
  women_dress: IMG("xif0q/dress/a/x/z/l-na-awd-19-yellow-aarvia-original-imagzffm3bkyzup2.jpeg"),
  saree: IMG("xif0q/lehenga-choli/y/g/m/l-sleeveless-shset95222-shae-by-sassafras-original-imaggjzkwyyyezzg.jpeg"),
  gouns: IMG("kw5ag7k0/kurta/f/j/g/xxl-sg1011-sanganeri-feb-original-imag8w9xbbakjkju.jpeg"),
  kurtas: IMG("xif0q/ethnic-set/b/4/m/m-na-kurta-set-010-rama-woxen-original-imagzkgg8mnyxmcg.jpeg"),
  top: IMG("xif0q/top/8/t/m/xxl-amrcrochetlacetop-madstitches-apparels-private-limited-original-imagr39r3kfmb5vy.jpeg"),
  women_jeans: IMG("kggviq80-0/jean/d/j/v/30-xj-37-gry-30-zxn-clothing-original-imafwp9gnqtwwebg.jpeg"),
  mens_kurta: IMG("l5h2xe80/kurta/x/6/n/xl-kast-tile-green-majestic-man-original-imagg4z33hu4kzpv.jpeg"),
  shirt: IMG("k4d27ww0/shirt/q/w/t/l-el024-el-senor-original-imafnadnjp5pq6tg.jpeg"),
  men_jeans: IMG("xif0q/jean/h/y/g/34-jeans-bt008-laheja-original-imagqqbsfgmdhcvn.jpeg"),
  shoes: IMG("l08gsy80/shoe/n/a/n/9-assg1015-9-abros-l-grey-maroon-original-imagc2m9zbzmtybx.jpeg"),
};

export const navigation = {
  categories: [
    {
      id: "women",
      name: "Women",
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Dresses", id: "women_dress" },
            { name: "Tops", id: "top" },
            { name: "Jeans", id: "women_jeans" },
            { name: "Sarees & Lehengas", id: "saree" },
            { name: "Gowns", id: "gouns" },
            { name: "Kurtas & Sets", id: "kurtas" },
          ],
        },
      ],
      featured: [
        { name: "Dresses", path: "/women/clothing/women_dress", image: categoryImages.women_dress },
        { name: "Sarees & Lehengas", path: "/women/clothing/saree", image: categoryImages.saree },
      ],
    },
    {
      id: "men",
      name: "Men",
      sections: [
        {
          id: "clothing",
          name: "Clothing",
          items: [
            { name: "Kurtas", id: "mens_kurta" },
            { name: "Shirts", id: "shirt" },
            { name: "Jeans", id: "men_jeans" },
          ],
        },
        {
          id: "footwear",
          name: "Footwear",
          items: [{ name: "Shoes", id: "shoes" }],
        },
      ],
      featured: [
        { name: "Shirts", path: "/men/clothing/shirt", image: categoryImages.shirt },
        { name: "Shoes", path: "/men/footwear/shoes", image: categoryImages.shoes },
      ],
    },
  ],
  pages: [
    { name: "About", path: "/about" },
    { name: "Contact", path: "/contact" },
  ],
};

// Flat lookup used for titles / breadcrumbs: category id -> { label, gender, section }
export const categoryIndex = {};
navigation.categories.forEach((c) =>
  c.sections.forEach((s) =>
    s.items.forEach((i) => {
      categoryIndex[i.id] = { label: i.name, gender: c.name, genderId: c.id, section: s.name, sectionId: s.id };
    })
  )
);
