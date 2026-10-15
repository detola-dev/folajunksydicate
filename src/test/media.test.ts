import { describe, expect, it } from "vitest";
import { existsSync } from "node:fs";
import { mediaUrl } from "@/lib/media";
import { globSync } from "node:fs";
import { readFileSync } from "node:fs";

describe("Recovered original media", () => {
  it("maps every legacy pointer to an existing original file", () => {
    for (const path of globSync("src/assets/media/*.asset.json")) {
      const pointer = JSON.parse(readFileSync(path, "utf8"));
      expect(mediaUrl(pointer.url)).toBe(`/media/${pointer.original_filename}`);
      expect(existsSync(`public/media/${pointer.original_filename}`)).toBe(true);
    }
  });
  it("preserves uploads, local paths, and missing posters", () => {
    expect(mediaUrl("https://example.com/storage/upload.jpg?token=abc")).toBe("https://example.com/storage/upload.jpg?token=abc");
    expect(mediaUrl("/media/braces-1.jpg")).toBe("/media/braces-1.jpg");
    expect(mediaUrl(undefined)).toBeUndefined();
  });
});