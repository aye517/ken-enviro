/**
 * /public/documents/ 폴더에 들어있는 공식 자료 파일들을 스캔해 목록으로 반환한다.
 *
 * - 파일을 추가하려면 `public/documents/` 에 파일을 올리면 끝 (재배포 1회).
 * - 향후 관리자 자가 운영이 필요해지면 Vercel Blob 으로 전환할 예정 (이 파일만 교체하면 됨).
 * - 파일명에서 확장자만 떼서 카드 제목으로 사용한다.
 *   예) "사업자등록증.png" → "사업자등록증"
 *   ※ 깔끔한 제목이 되려면 관리자가 파일명을 정돈해서 올려야 함.
 */

import { readdir } from "fs/promises";
import path from "path";

export interface DocumentFile {
  /** 사이트에서 접근할 URL (예: "/documents/사업자등록증.png") */
  url: string;
  /** 카드 제목 — 확장자 제외한 파일명 */
  title: string;
  /** 원본 파일명 (확장자 포함, key 용도) */
  filename: string;
  /** "pdf" | "image" — 카드 표시 방식 결정 */
  kind: "pdf" | "image";
}

const ALLOWED_EXT = /\.(pdf|jpe?g|png|webp)$/i;

export async function listDocuments(): Promise<DocumentFile[]> {
  const dir = path.join(process.cwd(), "public", "documents");
  let entries: string[];
  try {
    entries = await readdir(dir);
  } catch {
    // 폴더가 아직 없거나 비어 있는 경우
    return [];
  }

  return entries
    .filter((name) => ALLOWED_EXT.test(name))
    .map((filename) => ({
      filename,
      url: `/documents/${encodeURIComponent(filename)}`,
      title: filename.replace(/\.[^.]+$/, ""),
      kind: (/\.pdf$/i.test(filename) ? "pdf" : "image") as DocumentFile["kind"],
    }))
    .sort((a, b) => a.title.localeCompare(b.title, "ko"));
}
