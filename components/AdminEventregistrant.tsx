"use client";

import AdminResourceManager from "./AdminResourceManager";
import {
  EventRegistrant,
  deletingEventRegistrant,
  fetchingEventRegistrant,
} from "@/lib/actions";

const AdminEventregistrant = () => {
  return (
    <AdminResourceManager<EventRegistrant>
      title="Event Registrants"
      description="Track everyone who reserved a spot through the event reserve drawer."
      emptyMessage="No event reservations found."
      fetchItems={fetchingEventRegistrant}
      deleteItem={deletingEventRegistrant}
      toFormValues={() => ({})}
      fields={[]}
      columns={[
        { key: "name", label: "Name", render: (item) => item.name },
        { key: "email", label: "Email", render: (item) => item.email },
        { key: "phone", label: "Phone", render: (item) => item.phone },
        {
          key: "event",
          label: "Event",
          render: (item) => item.event?.title ?? `Event #${item.eventId}`,
        },
      ]}
      readOnly
    />
  );
};

export default AdminEventregistrant;
