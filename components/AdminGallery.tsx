"use client";

import AdminResourceManager from "./AdminResourceManager";
import { formFieldTypes } from "@/components/customFormField";
import {
  creatingGallery,
  deletingGallery,
  fetchingGallery,
  Gallery,
  UpdatingGallery,
} from "@/lib/actions";

const AdminGallery = () => {
  return (
    <AdminResourceManager<Gallery>
      title="Gallery"
      description="Keep gallery highlights and messages fresh for the public site."
      emptyMessage="No gallery items found."
      createLabel="Add Gallery Item"
      fetchItems={fetchingGallery}
      createItem={(values) => creatingGallery(values as never)}
      updateItem={(values) => UpdatingGallery(values as never)}
      deleteItem={deletingGallery}
      deleteMessage={(item) => `This will permanently remove the gallery item "${item.title}".`}
      toFormValues={(item) => ({
        image: item?.image ?? "",
        title: item?.title ?? "",
        message: item?.message ?? "",
      })}
      fields={[
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
      ]}
      columns={[
        { key: "title", label: "Title", render: (item) => item.title },
        { key: "image", label: "Image URL", render: (item) => item.image },
        { key: "message", label: "Message", render: (item) => item.message },
      ]}
    />
  );
};

export default AdminGallery;
