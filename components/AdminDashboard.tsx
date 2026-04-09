"use client";

import { type ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { Icon } from "@iconify/react";
import { useForm } from "react-hook-form";

import CustomFormField, { formFieldTypes } from "@/components/customFormField";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import type {
  Branches,
  Contacts,
  EventRegistrant,
  Events,
  Gallery,
  Menu,
} from "@/lib/actions";
import {
  creatingBranch,
  creatingEvent,
  creatingGallery,
  creatingMenu,
  deletingBranch,
  deletingContact,
  deletingEvent,
  deletingEventRegistrant,
  deletingGallery,
  deletingMenu,
  fetchingBranch,
  fetchingContact,
  fetchingEvent,
  fetchingEventRegistrant,
  fetchingGallery,
  fetchingMenu,
  UpdatingBranch,
  UpdatingEvent,
  UpdatingGallery,
  UpdatingMenu,
} from "@/lib/actions";

type ResourceOption = {
  label: string;
  value: string;
  description?: string;
};

type ResourceField = {
  key: string;
  label: string;
  fieldType?: formFieldTypes;
  type?: string;
  placeholder?: string;
  addPlaceholder?: string;
  description?: string;
  options?: ResourceOption[];
  className?: string;
  accept?: string;
  fullWidth?: boolean;
  disabled?: boolean;
};

type ActivityRecord = {
  id: number;
  name: string;
  length: number;
  weeklyCount: number;
};

type ResourceConfig<T extends { id: number; createdAt?: Date | string }> = {
  key: string;
  title: string;
  statName: string;
  icon: string;
  fetchItems: () => Promise<T[] | undefined>;
  updateItem?: (values: Record<string, unknown>) => Promise<unknown>;
  deleteItem: (id: number) => Promise<unknown>;
  fields?: ResourceField[];
  toFormValues?: (item: T) => Record<string, unknown>;
  deleteMessage?: (item: T) => string;
  renderTitle: (item: T) => string;
  renderMeta?: (item: T) => string;
  renderDescription?: (item: T) => string;
};

type DashboardResourceItem =
  | Events
  | Branches
  | Gallery
  | Menu
  | Contacts
  | EventRegistrant;

type DashboardResourceConfig = ResourceConfig<DashboardResourceItem>;

const resourceConfigs: DashboardResourceConfig[] = [
  {
    key: "events",
    title: "Recent Events",
    statName: "Events",
    icon: "material-icon-theme:folder-event-open",
    fetchItems: fetchingEvent as () => Promise<DashboardResourceItem[] | undefined>,
    updateItem: (values) => UpdatingEvent(values as never),
    deleteItem: deletingEvent,
    toFormValues: (item) => ({
      title: "title" in item ? item.title : "",
      image: "image" in item ? item.image : "",
      description: "description" in item ? item.description : "",
      startDate: "startDate" in item ? item.startDate : "",
      endDate: "endDate" in item ? item.endDate : "",
      ticketPrice: "ticketPrice" in item ? item.ticketPrice : 0,
      location: "location" in item ? item.location : "",
      featured: "featured" in item ? item.featured : false,
      maxRegistrants: "maxRegistrants" in item ? item.maxRegistrants : 50,
    }),
    fields: [
      { key: "title", label: "Title", placeholder: "Acoustic Night" },
      {
        key: "image",
        label: "Image",
        fieldType: formFieldTypes.IMAGE_UPLOADER,
        placeholder: "Upload event image",
        fullWidth: true,
      },
      { key: "location", label: "Location", placeholder: "Main Hall" },
      {
        key: "ticketPrice",
        label: "Ticket Price",
        type: "number",
        placeholder: "300",
      },
      {
        key: "maxRegistrants",
        label: "Reservation Limit",
        type: "number",
        placeholder: "50",
      },
      { key: "startDate", label: "Start Date", type: "datetime-local" },
      { key: "endDate", label: "End Date", type: "datetime-local" },
      {
        key: "description",
        label: "Description",
        fieldType: formFieldTypes.TEXTAREA,
        fullWidth: true,
      },
      {
        key: "featured",
        label: "Featured Event",
        fieldType: formFieldTypes.SWITCH,
        fullWidth: true,
      },
    ],
    deleteMessage: (item) => `This will permanently remove "${"title" in item ? item.title : "this event"}".`,
    renderTitle: (item) => ("title" in item ? item.title : "Untitled event"),
    renderMeta: (item) =>
      "location" in item && "ticketPrice" in item
        ? `${item.location} · ${item.ticketPrice} ETB`
        : "",
    renderDescription: (item) =>
      "description" in item ? item.description : "",
  },
  {
    key: "branches",
    title: "Recent Branches",
    statName: "Branches",
    icon: "glyphs-poly:building",
    fetchItems: fetchingBranch as () => Promise<DashboardResourceItem[] | undefined>,
    updateItem: (values) => UpdatingBranch(values as never),
    deleteItem: deletingBranch,
    toFormValues: (item) => ({
      name: "name" in item ? item.name : "",
      image: "image" in item ? item.image : "",
      address: "address" in item ? item.address : "",
      phone: "phone" in item ? item.phone : "",
      hours: "hours" in item ? item.hours : "",
      latitude: "latitude" in item ? item.latitude : 0,
      longitude: "longitude" in item ? item.longitude : 0,
      description: "description" in item ? item.description : "",
    }),
    fields: [
      { key: "name", label: "Name", placeholder: "Cafi Bole" },
      {
        key: "image",
        label: "Image",
        fieldType: formFieldTypes.IMAGE_UPLOADER,
        placeholder: "Upload branch image",
        fullWidth: true,
      },
      { key: "address", label: "Address", placeholder: "Addis Ababa" },
      {
        key: "phone",
        label: "Phone",
        fieldType: formFieldTypes.PHONE_INPUT,
        placeholder: "+251 91 234 5678",
        fullWidth: true,
      },
      { key: "hours", label: "Hours", placeholder: "Daily, 8 AM - 10 PM" },
      { key: "latitude", label: "Latitude", type: "number" },
      { key: "longitude", label: "Longitude", type: "number" },
      {
        key: "description",
        label: "Description",
        fieldType: formFieldTypes.TEXTAREA,
        fullWidth: true,
      },
    ],
    deleteMessage: (item) => `This will permanently remove "${"name" in item ? item.name : "this branch"}".`,
    renderTitle: (item) => ("name" in item ? item.name : "Untitled branch"),
    renderMeta: (item) =>
      "address" in item && "hours" in item ? `${item.address} · ${item.hours}` : "",
    renderDescription: (item) =>
      "description" in item ? item.description : "",
  },
  {
    key: "gallery",
    title: "Recent Gallery",
    statName: "Gallery",
    icon: "flat-color-icons:gallery",
    fetchItems: fetchingGallery as () => Promise<DashboardResourceItem[] | undefined>,
    updateItem: (values) => UpdatingGallery(values as never),
    deleteItem: deletingGallery,
    toFormValues: (item) => ({
      image: "image" in item ? item.image : "",
      title: "title" in item ? item.title : "",
      message: "message" in item ? item.message : "",
    }),
    fields: [
      { key: "title", label: "Title", placeholder: "Morning light" },
      {
        key: "image",
        label: "Image",
        fieldType: formFieldTypes.IMAGE_UPLOADER,
        placeholder: "Upload gallery image",
        fullWidth: true,
      },
      {
        key: "message",
        label: "Message",
        fieldType: formFieldTypes.TEXTAREA,
        fullWidth: true,
      },
    ],
    deleteMessage: (item) => `This will permanently remove "${"title" in item ? item.title : "this gallery item"}".`,
    renderTitle: (item) => ("title" in item ? item.title : "Untitled gallery item"),
    renderDescription: (item) => ("message" in item ? item.message : ""),
  },
  {
    key: "menu",
    title: "Recent Menu",
    statName: "Menu",
    icon: "streamline-color:task-list-flat",
    fetchItems: fetchingMenu as () => Promise<DashboardResourceItem[] | undefined>,
    updateItem: (values) =>
      UpdatingMenu({
        ...values,
        ingredients: Array.isArray(values.ingredients) ? values.ingredients : [],
      } as never),
    deleteItem: deletingMenu,
    toFormValues: (item) => ({
      name: "name" in item ? item.name : "",
      image: "image" in item ? item.image : "",
      description: "description" in item ? item.description : "",
      ingredients: "ingredients" in item ? item.ingredients : [],
      price: "price" in item ? item.price : 0,
      popular: "popular" in item ? item.popular : false,
      category: "category" in item ? item.category : "",
    }),
    fields: [
      { key: "name", label: "Name", placeholder: "Cappuccino", fullWidth: true },
      {
        key: "image",
        label: "Image",
        fieldType: formFieldTypes.IMAGE_UPLOADER,
        placeholder: "Upload menu image",
        fullWidth: true,
      },
      {
        key: "category",
        label: "Category",
        fieldType: formFieldTypes.SELECT,
        placeholder: "Choose a category",
        options: [
          { label: "Drink", value: "Drink" },
          { label: "Main", value: "Main" },
          { label: "Dessert", value: "Dessert" },
          { label: "Side", value: "Side" },
          { label: "Light", value: "Light" },
        ],
        fullWidth: true,
      },
      { key: "price", label: "Price", type: "number", placeholder: "250" },
      {
        key: "ingredients",
        label: "Ingredients",
        fieldType: formFieldTypes.TAG_INPUT,
        placeholder: "Type an ingredient and press Enter",
        addPlaceholder: "Press Enter to add another ingredient",
        fullWidth: true,
      },
      {
        key: "description",
        label: "Description",
        fieldType: formFieldTypes.TEXTAREA,
        fullWidth: true,
      },
      {
        key: "popular",
        label: "Popular Item",
        fieldType: formFieldTypes.SWITCH,
        fullWidth: true,
      },
    ],
    deleteMessage: (item) => `This will permanently remove "${"name" in item ? item.name : "this menu item"}".`,
    renderTitle: (item) => ("name" in item ? item.name : "Untitled menu item"),
    renderMeta: (item) =>
      "category" in item && "price" in item ? `${item.category} · ${item.price} ETB` : "",
    renderDescription: (item) =>
      "description" in item ? item.description : "",
  },
  {
    key: "contacts",
    title: "Recent Contacts",
    statName: "Contacts",
    icon: "fluent-color:contact-card-32",
    fetchItems: fetchingContact as () => Promise<DashboardResourceItem[] | undefined>,
    deleteItem: deletingContact,
    deleteMessage: (item) => `This will permanently remove the message from "${"Full_Name" in item ? item.Full_Name : "this contact"}".`,
    renderTitle: (item) => ("Full_Name" in item ? item.Full_Name : "Unknown contact"),
    renderMeta: (item) =>
      "title" in item && "Phone" in item ? `${item.title} · ${item.Phone}` : "",
    renderDescription: (item) => ("message" in item ? item.message : ""),
  },
  {
    key: "registrants",
    title: "Recent Registrants",
    statName: "Registrants",
    icon: "fluent-color:people-48",
    fetchItems: fetchingEventRegistrant as () => Promise<DashboardResourceItem[] | undefined>,
    deleteItem: deletingEventRegistrant,
    deleteMessage: (item) => `This will permanently remove "${"name" in item ? item.name : "this reservation"}".`,
    renderTitle: (item) => ("name" in item ? item.name : "Unknown registrant"),
    renderMeta: (item) =>
      "email" in item ? item.email : "",
    renderDescription: (item) =>
      "event" in item && item.event?.title
        ? `Reserved for ${item.event.title}`
        : "Recent event reservation",
  },
];

const getStartOfWeek = () => {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? -6 : 1 - day;
  const start = new Date(now);
  start.setDate(now.getDate() + diff);
  start.setHours(0, 0, 0, 0);
  return start;
};

const getCreatedAtDate = (value?: Date | string) => {
  if (!value) {
    return null;
  }

  const date = value instanceof Date ? value : new Date(value);
  return Number.isNaN(date.getTime()) ? null : date;
};

const formatCreatedAt = (value?: Date | string) => {
  const date = getCreatedAtDate(value);

  if (!date) {
    return "Unknown date";
  }

  return date.toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const serializeValues = (fields: ResourceField[], values: Record<string, unknown>) =>
  Object.fromEntries(
    fields.map((field) => {
      const rawValue = values[field.key];
      const effectiveFieldType = field.fieldType ?? formFieldTypes.INPUT;

      if (effectiveFieldType === formFieldTypes.SWITCH) {
        return [field.key, Boolean(rawValue)];
      }

      if (field.type === "number") {
        return [field.key, Number(rawValue)];
      }

      if (field.type === "datetime-local") {
        return [field.key, rawValue ? new Date(String(rawValue)).toISOString() : null];
      }

      if (effectiveFieldType === formFieldTypes.TAG_INPUT) {
        return [field.key, Array.isArray(rawValue) ? rawValue : []];
      }

      return [field.key, rawValue];
    }),
  );

const getFieldLayout = (fields: ResourceField[]) =>
  fields.map((field, index) => {
    const nextField = fields[index + 1];
    const shouldSpanFull =
      Boolean(field.fullWidth) || !nextField || Boolean(nextField.fullWidth);

    return {
      ...field,
      shouldSpanFull,
    };
  });

const AdminDashboard = () => {
  const [counts, setCounts] = useState<ActivityRecord[]>(
    resourceConfigs.map((config, index) => ({
      id: index + 1,
      name: config.statName,
      length: 0,
      weeklyCount: 0,
    })),
  );
  const [recentItems, setRecentItems] = useState<Record<string, DashboardResourceItem[]>>({});
  const [loading, setLoading] = useState(true);
  const [editingState, setEditingState] = useState<{
    config: DashboardResourceConfig;
    item: DashboardResourceItem;
  } | null>(null);
  const [deleteState, setDeleteState] = useState<{
    config: DashboardResourceConfig;
    item: DashboardResourceItem;
  } | null>(null);
  const [saving, setSaving] = useState(false);

  const form = useForm<Record<string, unknown>>({
    defaultValues: {},
  });

  const loadDashboardData = useCallback(async () => {
    setLoading(true);
    const startOfWeek = getStartOfWeek();

    const responses = await Promise.all(
      resourceConfigs.map(async (config) => ({
        config,
        items: (await config.fetchItems()) ?? [],
      })),
    );

    setCounts(
      responses.map(({ config, items }, index) => ({
        id: index + 1,
        name: config.statName,
        length: items.length,
        weeklyCount: items.filter((item) => {
          const createdAt = getCreatedAtDate(item.createdAt);
          return createdAt ? createdAt >= startOfWeek : false;
        }).length,
      })),
    );

    setRecentItems(
      Object.fromEntries(
        responses.map(({ config, items }) => [
          config.key,
          items
            .filter((item) => {
              const createdAt = getCreatedAtDate(item.createdAt);
              return createdAt ? createdAt >= startOfWeek : false;
            })
            .sort((a, b) => {
              const left = getCreatedAtDate(a.createdAt)?.getTime() ?? 0;
              const right = getCreatedAtDate(b.createdAt)?.getTime() ?? 0;
              return right - left;
            })
            .slice(0, 6),
        ]),
      ),
    );

    setLoading(false);
  }, []);

  useEffect(() => {
    void loadDashboardData();
  }, [loadDashboardData]);

  const openEditSheet = (config: DashboardResourceConfig, item: DashboardResourceItem) => {
    if (!config.fields?.length || !config.toFormValues || !config.updateItem) {
      return;
    }

    form.reset(config.toFormValues(item));
    setEditingState({ config, item });
  };

  const handleEditSubmit = form.handleSubmit(async (values) => {
    if (!editingState?.config.updateItem || !editingState.config.fields?.length) {
      return;
    }

    setSaving(true);

    try {
      const payload = serializeValues(editingState.config.fields, values);
      await editingState.config.updateItem({
        ...payload,
        id: editingState.item.id,
      });
      setEditingState(null);
      await loadDashboardData();
    } finally {
      setSaving(false);
    }
  });

  const handleDelete = async () => {
    if (!deleteState) {
      return;
    }

    await deleteState.config.deleteItem(deleteState.item.id);
    setDeleteState(null);
    await loadDashboardData();
  };

  return (
    <div className="space-y-6">
      <Card className="border-white/10 bg-[linear-gradient(145deg,rgba(15,23,42,0.96),rgba(30,41,59,0.92),rgba(15,23,42,0.94))] text-white shadow-[0_30px_80px_-42px_rgba(0,0,0,0.85)]">
        <CardHeader className="gap-3">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-300/20 bg-amber-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-amber-200">
            <Icon icon="streamline-sharp-color:dashboard-circle" className="text-sm" />
            Overview
          </div>
          <CardTitle className="text-3xl text-white">Cafe operations at a glance</CardTitle>
          <CardDescription className="max-w-2xl text-stone-300">
            Review the current activity across events, branches, gallery content, menu items, contacts, and reservations.
          </CardDescription>
        </CardHeader>
      </Card>

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {counts.map((item, index) => (
          <Card
            key={item.id}
            className="border-white/10 bg-slate-950/40 text-white shadow-[0_22px_55px_-35px_rgba(0,0,0,0.8)] transition-transform duration-300 hover:-translate-y-1"
          >
            <CardHeader className="gap-4">
              <div className="flex items-center justify-between">
                <div className="rounded-[1.25rem] border border-white/10 bg-white/6 p-3 text-2xl">
                  <Icon icon={resourceConfigs[index].icon} />
                </div>
                <div className="rounded-full border border-amber-300/15 bg-amber-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-amber-200">
                  Live
                </div>
              </div>
              <div className="space-y-2">
                <CardDescription className="text-stone-400">{item.name}</CardDescription>
                <CardTitle className="text-4xl text-white">{item.length}</CardTitle>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <div className="space-y-2">
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-300/15 bg-amber-400/10 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-amber-200">
            <Icon icon="mdi:calendar-clock-outline" className="text-sm" />
            Recent Activity
          </div>
          <h2 className="font-heading text-3xl text-white">Created this week</h2>
          <p className="max-w-2xl text-sm text-stone-400">
            Review the latest records directly from the dashboard and edit or remove them without leaving this overview.
          </p>
        </div>

        {resourceConfigs.map((config) => {
          const items = recentItems[config.key] ?? [];

          return (
            <Card
              key={config.key}
              className="border-white/10 bg-slate-950/40 text-white shadow-[0_22px_55px_-35px_rgba(0,0,0,0.8)]"
            >
              <CardHeader className="gap-3 border-b border-white/10">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/6 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-stone-300">
                      <Icon icon={config.icon} className="text-sm" />
                      {config.statName}
                    </div>
                    <CardTitle className="text-2xl text-white">{config.title}</CardTitle>
                    <CardDescription className="text-stone-400">
                      {loading
                        ? "Loading recent activity..."
                        : items.length
                          ? `${items.length} recent item${items.length === 1 ? "" : "s"} from this week`
                          : "No new items created this week."}
                    </CardDescription>
                  </div>
                  <div className="rounded-full border border-amber-300/15 bg-amber-400/10 px-4 py-2 text-sm text-amber-200">
                    {counts.find((item) => item.name === config.statName)?.weeklyCount ?? 0} this week
                  </div>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                {items.length ? (
                  <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {items.map((item) => (
                      <div
                        key={`${config.key}-${item.id}`}
                        className="rounded-[1.75rem] border border-white/10 bg-white/5 p-4"
                      >
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0">
                                <p className="truncate text-base font-medium text-white">
                                  {config.renderTitle(item)}
                                </p>
                                {config.renderMeta?.(item) ? (
                                  <p className="mt-1 text-sm text-amber-200/80">
                                    {config.renderMeta(item)}
                                  </p>
                                ) : null}
                              </div>
                              <div className="rounded-full border border-white/10 bg-white/6 px-2.5 py-1 text-[11px] uppercase tracking-[0.22em] text-stone-300">
                                {formatCreatedAt(item.createdAt)}
                              </div>
                            </div>
                            {config.renderDescription?.(item) ? (
                              <p className="line-clamp-3 text-sm leading-6 text-stone-400">
                                {config.renderDescription(item)}
                              </p>
                            ) : null}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {config.updateItem && config.fields?.length && config.toFormValues ? (
                              <Button
                                variant="outline"
                                className="border-white/10 bg-white/5 text-white hover:bg-white/10 hover:text-white"
                                onClick={() => openEditSheet(config, item)}
                              >
                                Edit
                              </Button>
                            ) : null}
                            <Button
                              variant="destructive"
                              onClick={() => setDeleteState({ config, item })}
                            >
                              Delete
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="rounded-[1.75rem] border border-dashed border-white/10 bg-white/4 px-5 py-8 text-center text-sm text-stone-400">
                    No recent records to manage here yet.
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Sheet
        open={Boolean(editingState)}
        onOpenChange={(open) => {
          if (!open) {
            setEditingState(null);
          }
        }}
      >
        <SheetContent side="right" className="w-full overflow-y-auto border-white/10 bg-slate-950 text-white sm:max-w-2xl">
          <SheetHeader>
            <SheetTitle className="text-white">
              {editingState ? `Edit ${editingState.config.statName}` : "Edit item"}
            </SheetTitle>
            <SheetDescription>
              Update the details below and save your changes.
            </SheetDescription>
          </SheetHeader>
          {editingState?.config.fields ? (
            <form onSubmit={handleEditSubmit} className="space-y-6 px-6 pb-6">
              <div className="grid gap-4 md:grid-cols-2">
                {getFieldLayout(editingState.config.fields).map((field) => (
                  <div
                    key={field.key}
                    className={field.shouldSpanFull ? "md:col-span-2" : undefined}
                  >
                    <CustomFormField
                      control={form.control}
                      name={field.key}
                      fieldType={field.fieldType ?? formFieldTypes.INPUT}
                      label={field.label}
                      placeholder={field.placeholder}
                      addPlaceholder={field.addPlaceholder}
                      description={field.description}
                      type={field.type}
                      options={field.options}
                      className={field.className ?? "w-full rounded-md"}
                      accept={field.accept}
                      disabled={field.disabled || saving}
                    />
                  </div>
                ))}
              </div>
              <SheetFooter className="px-0">
                <Button type="button" variant="outline" onClick={() => setEditingState(null)}>
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={saving}
                  className="bg-amber-400 text-stone-950 hover:bg-amber-300"
                >
                  {saving ? "Saving..." : "Save"}
                </Button>
              </SheetFooter>
            </form>
          ) : null}
        </SheetContent>
      </Sheet>

      <AlertDialog
        open={Boolean(deleteState)}
        onOpenChange={(open) => {
          if (!open) {
            setDeleteState(null);
          }
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {deleteState?.config.statName.slice(0, -1) ?? "item"}?
            </AlertDialogTitle>
            <AlertDialogDescription>
              {deleteState
                ? deleteState.config.deleteMessage?.(deleteState.item) ??
                  "This action will permanently remove the selected item."
                : "This action will permanently remove the selected item."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              className="bg-destructive hover:bg-destructive/90"
              onClick={() => void handleDelete()}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default AdminDashboard;
