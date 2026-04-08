"use client";

import { useEffect, useState } from "react";

import { menu as fallbackMenu } from "@/constants";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { fetchingMenu, Menu } from "@/lib/actions";

const MenuItems = ({ preview = false }: { preview?: boolean }) => {
  const [items, setItems] = useState<Menu[]>(fallbackMenu);

  useEffect(() => {
    const loadMenu = async () => {
      const response = await fetchingMenu();
      if (response?.length) {
        setItems(response);
      }
    };

    void loadMenu();
  }, []);

  const visibleItems = preview ? items.slice(0, 3) : items;

  return (
    <section className="cafe-shell">
      <div className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(145deg,rgba(22,16,13,0.96),rgba(38,27,20,0.94),rgba(18,12,10,0.98))] px-6 py-10 shadow-[0_28px_80px_-35px_rgba(0,0,0,0.85)] sm:px-8 lg:px-10">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.4em] text-amber-200/70">
              Menu
            </p>
            <h2 className="section-title text-white">
              Plates and pours made for everyday cravings.
            </h2>
            <p className="text-base leading-7 text-stone-300">
              From rich comfort dishes to lighter bites and desserts, our menu
              is built to satisfy both quick visits and long stays.
            </p>
          </div>
          {preview ? (
            <Link
              href="/Menu"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-300/20 bg-amber-400 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-300"
            >
              <span>See Full Menu</span>
              <Icon icon="mdi:arrow-right" className="text-lg" />
            </Link>
          ) : null}
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {visibleItems.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.8)]"
            >
              <div className="relative h-56">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950/80 via-stone-950/15 to-transparent" />
                <div className="absolute left-4 top-4 rounded-full bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-amber-100 backdrop-blur-md">
                  {item.category}
                </div>
                {item.popular ? (
                  <div className="absolute right-4 top-4 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-950">
                    Popular
                  </div>
                ) : null}
                <div className="absolute bottom-5 left-5 right-5 grid grid-cols-[minmax(0,1fr)_8.2rem] items-center gap-3 text-white">
                  <h2 className="pr-1 font-heading text-3xl leading-[0.92] font-semibold drop-shadow-[0_2px_8px_rgba(0,0,0,0.45)]">
                    {item.name}
                  </h2>
                  <div className="flex items-center justify-center gap-2 rounded-[2rem] bg-amber-400 px-1 py-1 text-stone-950 shadow-[0_18px_35px_-20px_rgba(245,158,11,0.9)]">
                    <span className="font-heading text-[2rem] leading-none font-semibold">
                      {item.price}
                    </span>
                    <span className="pt-2 text-[0.8rem] font-semibold uppercase tracking-[0.28em] text-stone-950/90">
                      ETB
                    </span>
                  </div>
                </div>
              </div>
              <div className="space-y-4 px-5 py-5">
                <p className="text-sm leading-7 text-stone-300">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {item.ingredients.slice(0, 4).map((ingredient) => (
                    <span
                      key={ingredient}
                      className="rounded-full border border-white/10 bg-white/6 px-3 py-1 text-xs text-stone-300"
                    >
                      {ingredient}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuItems;
