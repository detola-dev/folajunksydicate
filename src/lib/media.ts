// Only recovered originals are mapped; unknown and future upload URLs remain untouched.
const recoveredMedia: Record<string, string> = {
  "/__l5e/assets-v1/e9eb55eb-313e-443b-b200-188e2fda00ee/braces-1.jpg": "/media/braces-1.jpg",
  "/__l5e/assets-v1/f3b6201c-a39a-4a22-b014-380a18cf5d3c/braces-2.jpg": "/media/braces-2.jpg",
  "/__l5e/assets-v1/296c4ac0-e90c-453b-928e-6183621d2bba/braces-3.jpg": "/media/braces-3.jpg",
  "/__l5e/assets-v1/86ffa104-bbab-4feb-aab7-9798dda77217/case-1.jpg": "/media/case-1.jpg",
  "/__l5e/assets-v1/7f06074f-5100-4695-b228-b90a729bd7b0/case-v1-poster.jpg": "/media/case-v1-poster.jpg",
  "/__l5e/assets-v1/da178ac4-e4df-4d1c-99b4-7c70d8a387c3/case-v1.mp4": "/media/case-v1.mp4",
  "/__l5e/assets-v1/4d54f9be-418c-4f7c-b688-b069e9798ed4/case-v2-poster.jpg": "/media/case-v2-poster.jpg",
  "/__l5e/assets-v1/ac0051d7-e61e-41df-88d3-a404e0255aba/case-v2.mp4": "/media/case-v2.mp4",
  "/__l5e/assets-v1/9fab4f4f-d3c3-4a19-b5e1-f0d4223e08c9/lashes-1.jpg": "/media/lashes-1.jpg",
  "/__l5e/assets-v1/0108a6e3-b30b-400c-8d46-29ac44843057/lashes-2.jpg": "/media/lashes-2.jpg",
  "/__l5e/assets-v1/4d23ddcd-087c-48af-bd4d-e8bb9d427abc/patches-v1-poster.jpg": "/media/patches-v1-poster.jpg",
  "/__l5e/assets-v1/d1a0c4c6-938b-4d8e-a46e-04236ee37d34/patches-v1.mp4": "/media/patches-v1.mp4",
};

export function mediaUrl(url: string | undefined): string | undefined {
  if (!url) return url;
  const path = url.startsWith("https://") ? new URL(url).pathname : url;
  return recoveredMedia[path] ?? url;
}
