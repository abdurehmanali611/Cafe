"use client";

import { branches } from "@/constants";
import { Icon } from "@iconify/react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { Branches, fetchingBranch } from "@/lib/actions";

// const createMapEmbedUrl = (latitude: number, longitude: number) => {
//   const delta = 0.01;
//   const left = longitude - delta;
//   const right = longitude + delta;
//   const top = latitude + delta;
//   const bottom = latitude - delta;

//   return `https://www.openstreetmap.org/export/embed.html?bbox=${left}%2C${bottom}%2C${right}%2C${top}&layer=mapnik&marker=${latitude}%2C${longitude}`;
// };

const Map = dynamic(() => import("./Map"), {
  ssr: false,
});

const BranchLocator = () => {
  const [items, setItems] = useState<Branches[]>(branches);
  const [selectedBranchId, setSelectedBranchId] = useState(
    branches[0]?.id ?? 1,
  );

  useEffect(() => {
    const loadBranches = async () => {
      const response = await fetchingBranch();
      if (response?.length) {
        setItems(response);
        setSelectedBranchId(response[0].id);
      }
    };

    void loadBranches();
  }, []);

  const selectedBranch = useMemo(
    () => items.find((branch) => branch.id === selectedBranchId) ?? items[0],
    [items, selectedBranchId],
  );

  if (!selectedBranch) {
    return null;
  }

  return (
    <section className="mx-auto w-full max-w-5xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-[linear-gradient(145deg,rgba(20,14,12,0.98),rgba(36,24,18,0.94),rgba(18,12,10,0.98))] p-6 shadow-[0_28px_80px_-35px_rgba(0,0,0,0.85)] sm:p-8">
      <div className="absolute -right-12 top-10 h-36 w-36 rounded-full bg-amber-300/8 blur-3xl" />
      <div className="space-y-8">
        <div className="space-y-4">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-300/15 bg-white/6 px-4 py-2 text-sm text-amber-100/80">
            <span>Our locations</span>
          </div>
          <div className="space-y-2">
            <h2 className="font-heading text-4xl font-semibold text-white sm:text-5xl">
              Choose a location.
            </h2>
            <p className="max-w-xl text-base leading-7 text-stone-300">
              Each branch keeps the same Cafi warmth with its own unique rhythm,
              crowd, and atmosphere.
            </p>
          </div>
        </div>

        <div className="grid gap-3 xl:grid-cols-3">
          {items.map((branch) => (
            <button
              key={branch.id}
              type="button"
              onClick={() => setSelectedBranchId(branch.id)}
              className={`flex items-center justify-between rounded-[1.5rem] border px-4 py-4 text-left transition duration-300 ${
                selectedBranch.id === branch.id
                  ? "border-amber-300/25 bg-[linear-gradient(135deg,rgba(251,191,36,0.14),rgba(255,255,255,0.05))] text-white shadow-[0_18px_40px_-24px_rgba(251,191,36,0.45)]"
                  : "border-white/10 bg-white/6 text-stone-300 hover:bg-white/10"
              }`}
            >
              <div className="max-w-[80%]">
                <p className="font-medium leading-6">{branch.name}</p>
                <p className="mt-1 text-xs text-stone-400 line-clamp-1">
                  {branch.address}
                </p>
              </div>
              <Icon
                icon="mdi:arrow-top-right"
                className={`shrink-0 ${selectedBranch.id === branch.id ? "text-amber-300" : "text-stone-500"}`}
              />
            </button>
          ))}
        </div>

        <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
          <div className="relative h-64">
            <Image
              src={selectedBranch.image}
              alt={selectedBranch.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-linear-to-t from-stone-950/90 via-stone-950/20 to-transparent" />
            <div className="absolute inset-x-6 bottom-6 space-y-1">
              <p className="text-[10px] uppercase tracking-[0.32em] text-amber-200/70">
                Currently viewing
              </p>
              <h3 className="font-heading text-3xl font-semibold text-white">
                {selectedBranch.name}
              </h3>
            </div>
          </div>
        </div>

        <div className="grid gap-4 md:grid-cols-[0.9fr_1.1fr]">
          <div className="space-y-6 rounded-[2rem] border border-white/10 bg-white/5 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <p className="text-xs uppercase tracking-[0.28em] text-amber-200/65">
              Branch Details
            </p>
            <p className="text-sm leading-7 text-stone-300">
              {selectedBranch.description}
            </p>
            <div className="grid gap-3 text-sm text-stone-300">
              <div className="flex items-start gap-3 rounded-[1.25rem] border border-white/8 bg-stone-950/30 px-4 py-3">
                <Icon
                  icon="mdi:map-marker-outline"
                  className="mt-0.5 text-lg text-amber-300"
                />
                <span className="leading-relaxed">
                  {selectedBranch.address}
                </span>
              </div>
              <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/8 bg-stone-950/30 px-4 py-3">
                <Icon
                  icon="mdi:phone-outline"
                  className="text-lg text-amber-300"
                />
                <span>{selectedBranch.phone}</span>
              </div>
              <div className="flex items-center gap-3 rounded-[1.25rem] border border-white/8 bg-stone-950/30 px-4 py-3">
                <Icon
                  icon="mdi:clock-outline"
                  className="text-lg text-amber-300"
                />
                <span>{selectedBranch.hours}</span>
              </div>
            </div>
          </div>

          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
            <Map
              latitude={selectedBranch.latitude}
              longitude={selectedBranch.longitude}
              title={selectedBranch.name}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BranchLocator;
