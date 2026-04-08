"use client";

import { useEffect, useState } from "react";

import { Card, CardDescription, CardHeader, CardTitle } from "./ui/card";
import {
  fetchingBranch,
  fetchingContact,
  fetchingEvent,
  fetchingEventRegistrant,
  fetchingGallery,
  fetchingMenu,
} from "@/lib/actions";

const AdminDashboard = () => {
  const [counts, setCounts] = useState([
    { id: 1, name: "Events", length: 0 },
    { id: 2, name: "Branches", length: 0 },
    { id: 3, name: "Gallery", length: 0 },
    { id: 4, name: "Menu", length: 0 },
    { id: 5, name: "Contacts", length: 0 },
    { id: 6, name: "Registrants", length: 0 },
  ]);

  useEffect(() => {
    const loadCounts = async () => {
      const [events, branches, gallery, menu, contacts, registrants] = await Promise.all([
        fetchingEvent(),
        fetchingBranch(),
        fetchingGallery(),
        fetchingMenu(),
        fetchingContact(),
        fetchingEventRegistrant(),
      ]);

      setCounts([
        { id: 1, name: "Events", length: events?.length ?? 0 },
        { id: 2, name: "Branches", length: branches?.length ?? 0 },
        { id: 3, name: "Gallery", length: gallery?.length ?? 0 },
        { id: 4, name: "Menu", length: menu?.length ?? 0 },
        { id: 5, name: "Contacts", length: contacts?.length ?? 0 },
        { id: 6, name: "Registrants", length: registrants?.length ?? 0 },
      ]);
    };

    void loadCounts();
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
      {counts.map((item) => (
        <Card key={item.id} className="border-white/10 bg-slate-950/40 text-white">
          <CardHeader>
            <CardDescription>{item.name}</CardDescription>
            <CardTitle className="text-4xl">{item.length}</CardTitle>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default AdminDashboard;
