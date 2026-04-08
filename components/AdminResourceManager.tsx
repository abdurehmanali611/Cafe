"use client";

import { type ReactNode, useCallback, useEffect, useMemo, useState } from "react";
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
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  description?: string;
  options?: ResourceOption[];
  className?: string;
  accept?: string;
  fullWidth?: boolean;
  disabled?: boolean;
};

type ResourceColumn<T> = {
  key: string;
  label: string;
  className?: string;
  render: (item: T) => string | number | boolean | null | ReactNode;
};

type AdminResourceManagerProps<T extends { id: number }> = {
  title: string;
  description: string;
  emptyMessage: string;
  createLabel?: string;
  fields: ResourceField[];
  columns: ResourceColumn<T>[];
  fetchItems: () => Promise<T[] | undefined>;
  createItem?: (values: Record<string, unknown>) => Promise<unknown>;
  updateItem?: (values: Record<string, unknown>) => Promise<unknown>;
  deleteItem: (id: number) => Promise<unknown>;
  toFormValues: (item?: T | null) => Record<string, unknown>;
  readOnly?: boolean;
  deleteMessage?: (item: T) => string;
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

      return [field.key, rawValue];
    }),
  );

const AdminResourceManager = <T extends { id: number }>({
  title,
  description,
  emptyMessage,
  createLabel = "Add Item",
  fields,
  columns,
  fetchItems,
  createItem,
  updateItem,
  deleteItem,
  toFormValues,
  readOnly = false,
  deleteMessage,
}: AdminResourceManagerProps<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingItem, setEditingItem] = useState<T | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<T | null>(null);

  const form = useForm<Record<string, unknown>>({
    defaultValues: toFormValues(null),
  });

  const isEditing = useMemo(() => Boolean(editingItem), [editingItem]);

  const loadItems = useCallback(async (showLoading = true) => {
    if (showLoading) {
      setLoading(true);
    }

    const response = await fetchItems();
    setItems(response ?? []);
    setLoading(false);
  }, [fetchItems]);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void loadItems(false);
    }, 0);

    return () => window.clearTimeout(timer);
  }, [loadItems]);

  const openCreateSheet = () => {
    setEditingItem(null);
    form.reset(toFormValues(null));
    setSheetOpen(true);
  };

  const openEditSheet = (item: T) => {
    setEditingItem(item);
    form.reset(toFormValues(item));
    setSheetOpen(true);
  };

  const handleSubmit = form.handleSubmit(async (values) => {
    const payload = serializeValues(fields, values);
    setSaving(true);

    try {
      if (isEditing && editingItem && updateItem) {
        await updateItem({ ...payload, id: editingItem.id });
      } else if (!isEditing && createItem) {
        await createItem(payload);
      }

      setSheetOpen(false);
      await loadItems();
    } finally {
      setSaving(false);
    }
  });

  const handleDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    await deleteItem(deleteTarget.id);
    setDeleteTarget(null);
    await loadItems();
  };

  return (
    <Card className="border-white/10 bg-slate-950/40">
      <CardHeader className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1">
          <CardTitle className="text-white">{title}</CardTitle>
          <CardDescription>{description}</CardDescription>
        </div>
        {!readOnly && createItem ? (
          <Button
            onClick={openCreateSheet}
            className="bg-amber-400 text-stone-950 hover:bg-amber-300"
          >
            {createLabel}
          </Button>
        ) : null}
      </CardHeader>

      <CardContent>
        <div className="overflow-hidden rounded-3xl border border-white/10">
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-white/10 hover:bg-white/5">
                {columns.map((column) => (
                  <TableHead key={column.key} className={column.className}>
                    {column.label}
                  </TableHead>
                ))}
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableCell colSpan={columns.length + 1} className="py-8 text-center text-stone-400">
                    Loading...
                  </TableCell>
                </TableRow>
              ) : items.length === 0 ? (
                <TableRow className="border-white/10 hover:bg-transparent">
                  <TableCell colSpan={columns.length + 1} className="py-8 text-center text-stone-400">
                    {emptyMessage}
                  </TableCell>
                </TableRow>
              ) : (
                items.map((item) => (
                  <TableRow key={item.id} className="border-white/10 hover:bg-white/5">
                    {columns.map((column) => (
                      <TableCell key={column.key} className={column.className}>
                        {column.render(item)}
                      </TableCell>
                    ))}
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        {!readOnly && updateItem ? (
                          <Button variant="outline" onClick={() => openEditSheet(item)}>
                            Edit
                          </Button>
                        ) : null}
                        <Button
                          variant="destructive"
                          onClick={() => setDeleteTarget(item)}
                        >
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto border-white/10 bg-slate-950 text-white sm:max-w-2xl">
          <SheetHeader>
            <SheetTitle>{isEditing ? `Edit ${title}` : createLabel}</SheetTitle>
            <SheetDescription>
              Update the details below and save your changes.
            </SheetDescription>
          </SheetHeader>
          <form onSubmit={handleSubmit} className="space-y-6 px-6 pb-6">
            <div className="grid gap-4 md:grid-cols-2">
              {fields.map((field) => (
                <div
                  key={field.key}
                  className={field.fullWidth ? "md:col-span-2" : undefined}
                >
                  <CustomFormField
                    control={form.control}
                    name={field.key}
                    fieldType={field.fieldType ?? formFieldTypes.INPUT}
                    label={field.label}
                    placeholder={field.placeholder}
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
              <Button type="button" variant="outline" onClick={() => setSheetOpen(false)}>
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
        </SheetContent>
      </Sheet>

      <AlertDialog open={Boolean(deleteTarget)} onOpenChange={(open) => !open && setDeleteTarget(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete {title.slice(0, -1) || title}?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteTarget
                ? deleteMessage?.(deleteTarget) ??
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
    </Card>
  );
};

export default AdminResourceManager;
