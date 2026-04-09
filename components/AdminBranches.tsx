"use client";

import AdminResourceManager from "./AdminResourceManager";
import { formFieldTypes } from "@/components/customFormField";
import {
  Branches,
  creatingBranch,
  deletingBranch,
  fetchingBranch,
  UpdatingBranch,
} from "@/lib/actions";

const AdminBranches = () => {
  return (
    <AdminResourceManager<Branches>
      title="Branches"
      description="Maintain branch info, map coordinates, and branch contact details."
      emptyMessage="No branches found."
      createLabel="Add Branch"
      fetchItems={fetchingBranch}
      createItem={(values) => creatingBranch(values as never)}
      updateItem={(values) => UpdatingBranch(values as never)}
      deleteItem={deletingBranch}
      deleteMessage={(item) => `This will permanently remove the ${item.name} branch.`}
      toFormValues={(item) => ({
        name: item?.name ?? "",
        image: item?.image ?? "",
        address: item?.address ?? "",
        phone: item?.phone ?? "",
        hours: item?.hours ?? "",
        latitude: item?.latitude ?? 0,
        longitude: item?.longitude ?? 0,
        description: item?.description ?? "",
      })}
      fields={[
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
      ]}
      columns={[
        { key: "name", label: "Name", render: (item) => item.name },
        { key: "address", label: "Address", render: (item) => item.address },
        { key: "phone", label: "Phone", render: (item) => item.phone },
        { key: "hours", label: "Hours", render: (item) => item.hours },
      ]}
    />
  );
};

export default AdminBranches;
