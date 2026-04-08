"use client";

import AdminResourceManager from "./AdminResourceManager";
import { formFieldTypes } from "@/components/customFormField";
import {
  creatingEvent,
  deletingEvent,
  Events,
  fetchingEvent,
  UpdatingEvent,
} from "@/lib/actions";

const AdminEvents = () => {
  return (
    <AdminResourceManager<Events>
      title="Events"
      description="Manage published events and keep reservation details current."
      emptyMessage="No events found."
      createLabel="Add Event"
      fetchItems={fetchingEvent}
      createItem={(values) => creatingEvent(values as never)}
      updateItem={(values) => UpdatingEvent(values as never)}
      deleteItem={deletingEvent}
      deleteMessage={(item) => `This will permanently remove the event "${item.title}".`}
      toFormValues={(item) => ({
        title: item?.title ?? "",
        image: item?.image ?? "",
        description: item?.description ?? "",
        startDate: item?.startDate ?? "",
        endDate: item?.endDate ?? "",
        ticketPrice: item?.ticketPrice ?? 0,
        location: item?.location ?? "",
        featured: item?.featured ?? false,
        maxRegistrants: item?.maxRegistrants ?? 50,
      })}
      fields={[
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
      ]}
      columns={[
        { key: "title", label: "Title", render: (item) => item.title },
        { key: "location", label: "Location", render: (item) => item.location },
        {
          key: "ticketPrice",
          label: "Ticket",
          render: (item) => `${item.ticketPrice} ETB`,
        },
        {
          key: "featured",
          label: "Featured",
          render: (item) => (item.featured ? "Yes" : "No"),
        },
        {
          key: "capacity",
          label: "Seats",
          render: (item) => `${item._count?.registrants ?? 0}/${item.maxRegistrants}`,
        },
      ]}
    />
  );
};

export default AdminEvents;
