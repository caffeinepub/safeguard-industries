const IMAGE_MAP: Record<string, string> = {
  "fr-clothing": "/assets/generated/product-fr-clothing.dim_600x600.jpg",
  "gas-detector": "/assets/generated/product-gas-detector.dim_600x600.jpg",
  "fire-safety": "/assets/generated/product-fire-safety.dim_600x600.jpg",
  "chem-suit": "/assets/generated/product-chem-suit.dim_600x600.jpg",
  "gloves-goggles": "/assets/generated/product-safety-glasses.dim_600x600.jpg",
  "chem-gloves": "/assets/generated/product-chem-gloves.dim_600x600.jpg",
  eyewash: "/assets/generated/product-safety-glasses.dim_600x600.jpg",
  "spill-kit": "/assets/generated/product-spill-kit.dim_600x600.jpg",
  "chemical-spill-kit":
    "/assets/generated/product-chemical-spill-kit.dim_600x600.jpg",
  "traffic-cones": "/assets/generated/product-traffic-cones.dim_600x600.jpg",
  "reflective-jacket":
    "/assets/generated/product-safety-jacket-orange.dim_600x600.jpg",
  barricades: "/assets/generated/product-barricades.dim_600x600.jpg",
  "fire-extinguisher":
    "/assets/generated/product-fire-extinguisher-red.dim_600x600.jpg",
  "safety-boots": "/assets/generated/product-safety-boots.dim_600x600.jpg",
  "hard-hat": "/assets/generated/product-helmet.dim_600x600.jpg",
  "work-gloves": "/assets/generated/product-gloves.dim_600x600.jpg",
  "radium-reflective": "/assets/generated/product-radium-road.dim_600x600.jpg",
  "road-safety-kit":
    "/assets/generated/product-road-safety-kit.dim_600x600.jpg",
  "safety-jacket-yellow":
    "/assets/generated/product-safety-jacket-yellow.dim_600x600.jpg",
  "safety-glasses": "/assets/generated/product-safety-glasses.dim_600x600.jpg",
  helmet: "/assets/generated/product-helmet.dim_600x600.jpg",
  gloves: "/assets/generated/product-gloves.dim_600x600.jpg",
  "radium-road": "/assets/generated/product-radium-road.dim_600x600.jpg",
};

export function getProductImage(imageUrl: string): string {
  return (
    IMAGE_MAP[imageUrl] ||
    "/assets/generated/product-fr-clothing.dim_600x600.jpg"
  );
}
