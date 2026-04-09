"use client";

import AdminResourceManager from "./AdminResourceManager";
import { formFieldTypes } from "@/components/customFormField";
import {
  creatingMenu,
  deletingMenu,
  fetchingMenu,
  Menu,
  UpdatingMenu,
} from "@/lib/actions";

const AdminMenu = () => {
  return (
    <AdminResourceManager<Menu>
      title="Menu"
      description="Create, update, and delete menu items from the dashboard."
      emptyMessage="No menu items found."
      createLabel="Add Menu Item"
      fetchItems={fetchingMenu}
      createItem={(values) =>
        creatingMenu({
          ...values,
          ingredients: Array.isArray(values.ingredients) ? values.ingredients : [],
        } as never)
      }
      updateItem={(values) =>
        UpdatingMenu({
          ...values,
          ingredients: Array.isArray(values.ingredients) ? values.ingredients : [],
        } as never)
      }
      deleteItem={deletingMenu}
      deleteMessage={(item) => `This will permanently remove ${item.name} from the menu.`}
      toFormValues={(item) => ({
        name: item?.name ?? "",
        image: item?.image ?? "",
        description: item?.description ?? "",
        ingredients: item?.ingredients ?? [],
        price: item?.price ?? 0,
        popular: item?.popular ?? false,
        category: item?.category ?? "",
      })}
      fields={[
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
      ]}
      columns={[
        { key: "name", label: "Name", render: (item) => item.name },
        { key: "category", label: "Category", render: (item) => item.category },
        { key: "price", label: "Price", render: (item) => `${item.price} ETB` },
        {
          key: "popular",
          label: "Popular",
          render: (item) => (item.popular ? "Yes" : "No"),
        },
      ]}
    />
  );
};

export default AdminMenu;
