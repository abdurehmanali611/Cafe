
"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import CustomFormField, { formFieldTypes } from "@/components/customFormField";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FieldDescription,
  FieldGroup,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import api from "@/lib/axios";
import { adminPasswordUpdateForm } from "@/lib/validations";

type AdminProfile = {
  id: number;
  username: string;
};

const securityNotes = [
  "Use at least 8 characters and avoid reusing an old password.",
  "Keep your admin password different from your email or database credentials.",
  "After updating, use the new password the next time you log in.",
];

const AdminChangePassword = () => {
  const [profile, setProfile] = useState<AdminProfile | null>(null);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [saving, setSaving] = useState(false);

  const form = useForm<z.infer<typeof adminPasswordUpdateForm>>({
    resolver: zodResolver(adminPasswordUpdateForm),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await api.get("/admin");
        setProfile(response.data);
      } catch (error) {
        console.error("Failed to load admin profile", error);
        toast.error("Unable to load admin details");
      } finally {
        setLoadingProfile(false);
      }
    };

    void loadProfile();
  }, []);

  const onSubmit = form.handleSubmit(async (values) => {
    setSaving(true);

    try {
      const response = await api.put("/admin", values);
      toast.success(response.data.message ?? "Password updated successfully");
      form.reset();
    } catch (error: unknown) {
      const message =
        typeof error === "object" &&
        error !== null &&
        "response" in error &&
        typeof (error as { response?: { data?: { error?: string } } }).response?.data?.error === "string"
          ? (error as { response?: { data?: { error?: string } } }).response?.data?.error
          : "Failed to update password";

      toast.error(message);
    } finally {
      setSaving(false);
    }
  });

  return (
    <div className="grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
      <Card className="border-white/10 bg-[linear-gradient(145deg,rgba(15,23,42,0.92),rgba(30,41,59,0.9),rgba(15,23,42,0.94))] text-white shadow-[0_30px_80px_-40px_rgba(0,0,0,0.8)]">
        <CardHeader className="border-b border-white/10">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex w-fit items-center gap-2 rounded-full border border-amber-300/20 bg-amber-400/10 px-3 py-1 text-xs font-medium uppercase tracking-[0.24em] text-amber-200">
                <Icon icon="mdi:shield-lock-outline" className="text-sm" />
                Security
              </div>
              <CardTitle className="text-3xl text-white">
                Update admin password
              </CardTitle>
              <CardDescription className="max-w-2xl text-stone-300">
                Keep the dashboard secure by confirming your current password before setting a new one.
              </CardDescription>
            </div>
            <div className="rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-3 text-sm text-stone-300">
              <p className="text-[11px] uppercase tracking-[0.28em] text-amber-200/70">
                Signed in as
              </p>
              <p className="mt-1 font-medium text-white">
                {loadingProfile ? "Loading..." : profile?.username ?? "Unknown admin"}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="pt-6">
          <form onSubmit={onSubmit} className="space-y-6">
            <FieldSet className="rounded-[2rem] border border-white/10 bg-white/5 p-5">
              <FieldTitle className="text-base text-white">
                Password details
              </FieldTitle>
              <FieldDescription className="text-stone-400">
                Your current password is required before the new one can be saved.
              </FieldDescription>
              <FieldGroup className="gap-5 pt-2">
                <CustomFormField
                  control={form.control}
                  name="currentPassword"
                  fieldType={formFieldTypes.INPUT}
                  label="Current Password"
                  type="password"
                  placeholder="Enter current password"
                  className="w-full rounded-md"
                  disabled={saving}
                />
                <div className="grid gap-5 md:grid-cols-2">
                  <CustomFormField
                    control={form.control}
                    name="newPassword"
                    fieldType={formFieldTypes.INPUT}
                    label="New Password"
                    type="password"
                    placeholder="Enter new password"
                    className="w-full rounded-md"
                    disabled={saving}
                  />
                  <CustomFormField
                    control={form.control}
                    name="confirmPassword"
                    fieldType={formFieldTypes.INPUT}
                    label="Confirm New Password"
                    type="password"
                    placeholder="Repeat new password"
                    className="w-full rounded-md"
                    disabled={saving}
                  />
                </div>
              </FieldGroup>
            </FieldSet>

            <div className="flex flex-wrap items-center justify-between gap-3 rounded-[1.75rem] border border-white/10 bg-white/5 px-4 py-4">
              <div>
                <p className="text-sm font-medium text-white">Ready to apply the change?</p>
                <p className="text-sm text-stone-400">
                  This updates the admin password immediately for future logins.
                </p>
              </div>
              <Button
                type="submit"
                disabled={saving || loadingProfile}
                className="bg-amber-400 text-stone-950 hover:bg-amber-300"
              >
                {saving ? "Updating..." : "Update Password"}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <Card className="border-white/10 bg-slate-950/40 text-white shadow-[0_24px_60px_-38px_rgba(0,0,0,0.8)]">
        <CardHeader className="border-b border-white/10">
          <CardTitle className="text-xl text-white">Security checklist</CardTitle>
          <CardDescription className="text-stone-400">
            A few quick reminders before saving new credentials.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 pt-6">
          {securityNotes.map((note) => (
            <div
              key={note}
              className="flex items-start gap-3 rounded-[1.5rem] border border-white/10 bg-white/5 px-4 py-4"
            >
              <div className="mt-0.5 rounded-full bg-amber-400/15 p-2 text-amber-300">
                <Icon icon="mdi:check-decagram-outline" className="text-lg" />
              </div>
              <p className="text-sm leading-6 text-stone-300">{note}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminChangePassword;
