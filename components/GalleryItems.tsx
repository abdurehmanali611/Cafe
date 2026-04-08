"use client";

import { useEffect, useState } from "react";

import { gallery as fallbackGallery } from "@/constants";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { fetchingGallery, Gallery } from "@/lib/actions";

const GalleryItems = ({ preview = false }: { preview?: boolean }) => {
  const [items, setItems] = useState<Gallery[]>(fallbackGallery);

  useEffect(() => {
    const loadGallery = async () => {
      const response = await fetchingGallery();
      if (response?.length) {
        setItems(response);
      }
    };

    void loadGallery();
  }, []);

  const visibleItems = preview ? items.slice(0, 4) : items;

  return (
    <section className="cafe-shell">
      <div className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(145deg,rgba(26,18,14,0.96),rgba(48,32,24,0.92),rgba(20,14,12,0.96))] px-6 py-10 shadow-[0_28px_80px_-35px_rgba(0,0,0,0.85)] sm:px-8 lg:px-10">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.4em] text-amber-200/70">
              Gallery
            </p>
            <h2 className="section-title text-white">
              A closer look at the mood behind the menu.
            </h2>
            <p className="text-base leading-7 text-stone-300">
              Interior warmth, plated details, and the everyday moments that shape
              the Cafi experience.
            </p>
          </div>
          {preview ? (
            <Link
              href="/Gallery"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/8 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/14"
            >
              <span>Open Gallery</span>
              <Icon icon="mdi:arrow-right" className="text-lg" />
            </Link>
          ) : null}
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {visibleItems.map((item, index) => (
            <article
              key={item.id}
              className={`relative overflow-hidden rounded-[2rem] border border-white/10 ${
                !preview && index % 5 === 0 ? "xl:col-span-2" : ""
              }`}
            >
              <div className="relative h-72">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950/90 via-stone-950/20 to-transparent" />
                <div className="absolute inset-x-5 bottom-5">
                  <p className="text-xs font-medium uppercase tracking-[0.3em] text-amber-200/75">
                    Gallery highlight
                  </p>
                  <h3 className="mt-2 font-heading text-3xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="mt-2 max-w-md text-sm leading-6 text-stone-200">
                    {item.message}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GalleryItems;
