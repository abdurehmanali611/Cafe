"use client";

import { useEffect, useState } from "react";

import { events as fallbackEvents } from "@/constants";
import { Icon } from "@iconify/react";
import Image from "next/image";
import Link from "next/link";
import { Events, fetchingEvent } from "@/lib/actions";
import EventReservationDrawer from "./EventReservationDrawer";

const formatDate = (value: Date) =>
  value.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

const formatTime = (value: Date) =>
  value.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

const EventItems = ({ preview = false }: { preview?: boolean }) => {
  const [items, setItems] = useState<Events[]>(fallbackEvents);

  useEffect(() => {
    const loadEvents = async () => {
      const response = await fetchingEvent();
      if (response?.length) {
        setItems(response);
      }
    };

    void loadEvents();
  }, []);

  const visibleItems = preview ? items.slice(0, 3) : items;

  return (
    <section className="cafe-shell">
      <div className="rounded-[2.5rem] border border-white/10 bg-[linear-gradient(145deg,rgba(24,18,16,0.96),rgba(42,30,26,0.92),rgba(20,14,12,0.96))] px-6 py-10 shadow-[0_28px_80px_-35px_rgba(0,0,0,0.85)] sm:px-8 lg:px-10">
        <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-3">
            <p className="text-sm font-medium uppercase tracking-[0.4em] text-amber-200/70">
              Events
            </p>
            <h2 className="section-title text-white">
              Nights, workshops, and gatherings worth showing up for.
            </h2>
            <p className="text-base leading-7 text-stone-300">
              Join us for cozy music sessions, tastings, brunch socials, and special
              evenings built around food, coffee, and connection.
            </p>
          </div>
          {preview ? (
            <Link
              href="/Events"
              className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-300/20 bg-amber-400 px-5 py-3 text-sm font-semibold text-stone-950 transition hover:bg-amber-300"
            >
              <span>All Events</span>
              <Icon icon="mdi:arrow-right" className="text-lg" />
            </Link>
          ) : null}
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {visibleItems.map((item) => (
            <article
              key={item.id}
              className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/6 shadow-[0_20px_60px_-35px_rgba(0,0,0,0.8)]"
            >
              <div className="relative h-60">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
                <div className="absolute inset-0 bg-linear-to-t from-stone-950/85 via-stone-950/20 to-transparent" />
                {item.featured ? (
                  <div className="absolute left-4 top-4 rounded-full bg-amber-400 px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-stone-950">
                    Featured
                  </div>
                ) : null}
              </div>
              <div className="space-y-4 px-5 py-5">
                <div className="space-y-2">
                  <h3 className="font-heading text-3xl font-semibold text-white">
                    {item.title}
                  </h3>
                  <p className="text-sm leading-7 text-stone-300">{item.description}</p>
                </div>
                <div className="grid gap-3 text-sm text-stone-300">
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:calendar-blank-outline" className="text-amber-300" />
                    <span>{formatDate(item.startDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:clock-outline" className="text-amber-300" />
                    <span>
                      {formatTime(item.startDate)} - {formatTime(item.endDate)}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Icon icon="mdi:map-marker-outline" className="text-amber-300" />
                    <span>{item.location}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between rounded-[1.5rem] border border-white/10 bg-white/6 px-4 py-3">
                  <div>
                    <p className="text-[11px] uppercase tracking-[0.28em] text-amber-200/70">
                      Ticket
                    </p>
                    <p className="font-heading text-2xl text-white">
                      {item.ticketPrice} ETB
                    </p>
                    <p className="mt-1 text-xs text-stone-300">
                      {Math.max(item.maxRegistrants - (item._count?.registrants ?? 0), 0)} seats left
                    </p>
                  </div>
                  <EventReservationDrawer event={item} />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventItems;
