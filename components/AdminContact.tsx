"use client";

import AdminResourceManager from "./AdminResourceManager";
import { Contacts, deletingContact, fetchingContact } from "@/lib/actions";

const AdminContact = () => {
  return (
    <AdminResourceManager<Contacts>
      title="Contacts"
      description="Review incoming contact and reservation-related messages."
      emptyMessage="No contact messages found."
      fetchItems={fetchingContact}
      deleteItem={deletingContact}
      toFormValues={() => ({})}
      fields={[]}
      columns={[
        { key: "Full_Name", label: "Name", render: (item) => item.Full_Name },
        { key: "Phone", label: "Phone", render: (item) => item.Phone },
        { key: "title", label: "Type", render: (item) => item.title },
        { key: "message", label: "Message", render: (item) => item.message },
      ]}
      readOnly
    />
  );
};

export default AdminContact;
