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
}

export function NewsListClient({ posts }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return posts;
    return posts.filter((p) => {
      const haystack = [p.title, p.summary, p.category ?? ""]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [posts, query]);

  return (
    <>
      <div className="mb-8 flex flex-col gap-2">
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="제목·내용·카테고리로 검색"
          className="w-full max-w-md rounded-full border border-[#E5E7EB] bg-white px-5 py-2.5 text-sm text-[#111111] placeholder:text-[#9CA3AF] focus:border-[#2F6FED] focus:outline-none"
        />
        {query && (
          <p className="text-xs text-[#6B7280]">
            검색 결과 {filtered.length}건 / 전체 {posts.length}건
          </p>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="rounded-2xl border border-[#E5E7EB] bg-[#F5F5F5] p-12 text-center text-[#4B5563]">
          검색 결과가 없습니다.
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
