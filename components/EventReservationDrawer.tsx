"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import CustomFormField, { formFieldTypes } from "@/components/customFormField";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  FieldDescription,
  FieldGroup,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { creatingEventRegistrant } from "@/lib/actions";
import { eventRegistrationForm } from "@/lib/validations";

type ReservationEvent = {
  id: number;
  title: string;
  location: string;
  startDate: Date | string;
  ticketPrice: number;
  maxRegistrants: number;
  _count?: {
    registrants: number;
  };
};

type EventReservationDrawerProps = {
  event: ReservationEvent;
};

const EventReservationDrawer = ({ event }: EventReservationDrawerProps) => {
  const [open, setOpen] = useState(false);
  const totalRegistrants = event._count?.registrants ?? 0;
  const remainingSeats = Math.max(event.maxRegistrants - totalRegistrants, 0);
  const isFull = remainingSeats <= 0;

  const form = useForm<z.infer<typeof eventRegistrationForm>>({
    resolver: zodResolver(eventRegistrationForm),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      eventId: event.id,
    },
  });

  const onSubmit = form.handleSubmit(async (values) => {
    const response = await creatingEventRegistrant(values);

    if (!response) {
      return;
    }

    form.reset({
      name: "",
      email: "",
      phone: "",
      eventId: event.id,
    });
    setOpen(false);
  });

  return (
    <Drawer open={open} onOpenChange={setOpen}>
      <DrawerTrigger asChild>
        <Button
          disabled={isFull}
          className="rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/15 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {isFull ? "Fully Booked" : "Reserve"}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-200 mx-50">
        <DrawerHeader>
          <DrawerTitle>Reserve Your Spot</DrawerTitle>
          <DrawerDescription>
            Save a seat for {event.title} at {event.location}.
          </DrawerDescription>
        </DrawerHeader>
        <form onSubmit={onSubmit} className="px-4 pb-4">
          <FieldSet className="rounded-[2rem] border border-white/10 bg-stone-950/20 p-5 items-center">
            <FieldTitle className="text-base font-medium text-stone-100">
              Reservation Details
            </FieldTitle>
            <FieldDescription className="text-stone-400">
              Ticket price: {event.ticketPrice} ETB
            </FieldDescription>
            <FieldDescription className="text-stone-400">
              {remainingSeats} of {event.maxRegistrants} seats remaining
            </FieldDescription>
            <FieldGroup className="gap-4 pt-4 items-center">
              <div className="flex items-center gap-6">
                <CustomFormField
                  control={form.control}
                  name="name"
                  fieldType={formFieldTypes.INPUT}
                  label="Full Name"
                  placeholder="Abdur Rahman"
                  className="w-64 rounded-md"
                />
                <CustomFormField
                  control={form.control}
                  name="email"
                  fieldType={formFieldTypes.INPUT}
                  type="email"
                  label="Email"
                  placeholder="you@example.com"
                  className="w-64 rounded-md"
                />
              </div>
              <CustomFormField
                control={form.control}
                name="phone"
                fieldType={formFieldTypes.PHONE_INPUT}
                label="Phone Number"
                placeholder="+251 91 234 5678"
                className="w-64 rounded-md"
              />
            </FieldGroup>
          </FieldSet>
          <DrawerFooter className="px-0">
            <Button
              type="submit"
              disabled={isFull}
              className="bg-amber-400 text-stone-950 hover:bg-amber-300"
            >
              Confirm Reservation
            </Button>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};

export default EventReservationDrawer;
