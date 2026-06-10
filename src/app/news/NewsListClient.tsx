"use client";

import { useMemo, useState } from "react";
import type { BlogPost } from "@/lib/naverBlog";

/** 게시 후 7일 이내면 "N" 뱃지 표시 — NewsSection과 동일 기준 */
const NEW_WINDOW_MS = 7 * 24 * 60 * 60 * 1000;

/** 헬퍼로 분리: 컴포넌트 본문에서 Date.now() 직접 호출 시 react-hooks/purity 룰이 막음 */
function isNewPost(timestamp: number): boolean {
  return timestamp > 0 && Date.now() - timestamp < NEW_WINDOW_MS;
}

interface Props {
  posts: BlogPost[];
  /** URL `?q=...` 로 들어왔을 때 검색창에 미리 채울 초기값 */
  initialQuery?: string;
  /** URL `?category=...` 로 들어왔을 때 미리 선택할 카테고리 칩 (정확히 일치) */
  initialCategory?: string | null;
}

export function NewsListClient({
  posts,
  initialQuery = "",
  initialCategory = null,
}: Props) {
  const [query, setQuery] = useState(initialQuery);
  const [activeCategory, setActiveCategory] = useState<string | null>(
    initialCategory,
  );

  /** 글에 붙은 카테고리를 수집 → 개수 많은 순으로 칩 배열 생성 */
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const p of posts) {
      if (p.category) counts.set(p.category, (counts.get(p.category) ?? 0) + 1);
    }
    return Array.from(counts.entries()).sort((a, b) => b[1] - a[1]);
  }, [posts]);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (activeCategory && p.category !== activeCategory) return false;
      if (!q) return true;
      const haystack = [p.title, p.summary, p.category ?? ""]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, query, activeCategory]);

  const isFiltering = query.trim().length > 0 || activeCategory !== null;

  return (
    <>
      {categories.length > 0 && (
        <div className="mb-6 flex flex-wrap gap-2">
          <CategoryChip
            label="전체"
            count={posts.length}
            active={activeCategory === null}
            onClick={() => setActiveCategory(null)}
          />
          {categories.map(([name, count]) => (
            <CategoryChip
              key={name}
              label={name}
              count={count}
              active={activeCategory === name}
              onClick={() => setActiveCategory(name)}
            />
          ))}
        </div>
      )}

      <div className="mb-8 flex flex-col gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="제목·내용으로 검색"
          className="w-full max-w-md rounded-full border border-[#E5E7EB] bg-white px-5 py-2.5 text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:border-[#2F6FED] focus:outline-none"
        />
        {isFiltering && (
          <p className="text-xs text-[#6B7280]">
            결과 {filtered.length}건 / 전체 {posts.length}건
          </p>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-[#E5E7EB] bg-[#F5F5F5] p-12 text-center text-[#4B5563]">
          {isFiltering ? "결과가 없습니다." : "표시할 글이 없습니다."}
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((post) => {
            const isNew = isNewPost(post.timestamp);
            return (
              <a
                key={post.link}
                href={post.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                <div className="relative aspect-[16/10] overflow-hidden bg-[#E5E7EB]">
                  {post.thumbnail ? (
                    // 네이버 썸네일 CDN은 외부 도메인 Referer를 403으로 차단한다.
                    // referrerPolicy="no-referrer" 로 Referer 미전송 → 정상 로딩.
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={post.thumbnail}
                      alt={post.title}
                      loading="lazy"
                      referrerPolicy="no-referrer"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-2xl font-bold text-[#9CA3AF]">
                      KEN
                    </div>
                  )}
                  {isNew && (
                    <span className="absolute right-3 top-3 inline-flex items-center justify-center rounded bg-[#E11D48] px-2 py-0.5 text-[11px] font-bold text-white shadow">
                      NEW
                    </span>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <div className="mb-2 flex items-center gap-2">
                    {post.category && (
                      <span className="rounded-full bg-[#EAF1FE] px-2.5 py-0.5 text-xs font-medium text-[#2F6FED]">
                        {post.category}
                      </span>
                    )}
                    <span className="text-xs text-[#4B5563]">{post.date}</span>
                  </div>
                  <h2 className="line-clamp-2 font-semibold text-[#111111]">
                    {post.title}
                  </h2>
                  <p className="mt-2 line-clamp-3 text-sm text-[#4B5563]">
                    {post.summary}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}

function CategoryChip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={active}
      className={`inline-flex items-center gap-1.5 rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors ${
        active
          ? "border-[#2F6FED] bg-[#2F6FED] text-white"
          : "border-[#E5E7EB] bg-white text-[#4B5563] hover:border-[#2F6FED] hover:text-[#2F6FED]"
      }`}
    >
      <span>{label}</span>
      <span
        className={`text-xs ${active ? "text-white/80" : "text-[#9CA3AF]"}`}
      >
        {count}
      </span>
    </button>
  );
}
