/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "sonner";
import api from "./axios";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

export interface Users {
  id: number;
  username: string;
  password: string;
}

export interface LoggingIn {
  username: string;
  password: string;
}

export interface Contacts {
  id: number;
  Full_Name: string;
  Phone: string;
  title: string;
  message: string;
  createdAt?: Date | string;
}

export interface CreateContact {
  Full_Name: string;
  Phone: string;
  title: string;
  message: string;
}

export interface Menu {
  id: number;
  name: string;
  image: string;
  description: string;
  ingredients: string[];
  price: number;
  popular: boolean;
  category: string;
  createdAt?: Date | string;
}

export interface CreateMenu {
  name: string;
  image: string;
  description: string;
  ingredients: string[];
  price: number;
  popular: boolean;
  category: string;
}

export interface UpdateMenu extends CreateMenu {
  id: number;
}

export interface Gallery {
  id: number;
  image: string;
  title: string;
  message: string;
  createdAt?: Date | string;
}

export interface CreateGallery {
  image: string;
  title: string;
  message: string;
}

export interface UpdateGallery extends CreateGallery {
  id: number;
}

export interface Events {
  id: number;
  title: string;
  description: string;
  image: string;
  startDate: Date;
  endDate: Date;
  ticketPrice: number;
  location: string;
  featured: boolean;
  maxRegistrants: number;
  createdAt?: Date | string;
  _count?: {
    registrants: number;
  };
}

export interface CreateEvent {
  title: string;
  description: string;
  image: string;
  startDate: Date;
  endDate: Date;
  ticketPrice: number;
  location: string;
  featured: boolean;
  maxRegistrants: number;
}

export interface UpdateEvent extends CreateEvent {
  id: number;
}

export interface EventRegistrant {
  id: number;
  name: string;
  email: string;
  phone: string;
  eventId: number;
  createdAt?: Date | string;
  event?: Events;
}

export interface CreateEventRegistrant {
  name: string;
  email: string;
  phone: string;
  eventId: number;
}

export interface UpdateEventRegistrant extends CreateEventRegistrant {
  id: number;
}

export interface Branches {
  id: number;
  name: string;
  image: string;
  address: string;
  phone: string;
  hours: string;
  latitude: number;
  longitude: number;
  description: string;
  createdAt?: Date | string;
}

export interface CreateBranch {
  name: string;
  image: string;
  address: string;
  phone: string;
  hours: string;
  latitude: number;
  longitude: number;
  description: string;
}

export interface UpdateBranch extends CreateBranch {
  id: number;
}

export async function creatingMenu(values: CreateMenu) {
  try {
    const response = await api.post("/menu", values);
    toast.success(`Successfully Created Menu`);
    return response.data;
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  }
}

export async function fetchingMenu() {
  try {
    const response = await api.get("/menu");
    return response.data;
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  }
}

export async function deletingMenu(id: number) {
  try {
    const response = await api.delete(`/menu/${id}`);
    toast.success(`Successfully Deleted Menu`);
    return response.data;
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  }
}

export async function UpdatingMenu(values: UpdateMenu) {
  try {
    const response = await api.put(`/menu/${values.id}`, values);
    toast.success(`Successfully Updated Menu`);
    return response.data;
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  }
}

export async function creatingGallery(values: CreateGallery) {
  try {
    const response = await api.post("/gallery", values);
    toast.success(`Successfully Created Gallery`);
    return response.data;
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  }
}

export async function fetchingGallery() {
  try {
    const response = await api.get("/gallery");
    return response.data;
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  }
}

export async function deletingGallery(id: number) {
  try {
    const response = await api.delete(`/gallery/${id}`);
    toast.success(`Successfully Deleted Gallery`);
    return response.data;
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  }
}

export async function UpdatingGallery(values: UpdateGallery) {
  try {
    const response = await api.put(`/gallery/${values.id}`, values);
    toast.success(`Successfully Updated Gallery`);
    return response.data;
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  }
}

export async function creatingEvent(values: CreateEvent) {
  try {
    const response = await api.post("/events", values);
    toast.success(`Successfully Created Event`);
    return response.data;
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  }
}

export async function fetchingEvent() {
  try {
    const response = await api.get("/events");
    return response.data;
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  }
}

export async function deletingEvent(id: number) {
  try {
    const response = await api.delete(`/events/${id}`);
    toast.success(`Successfully Deleted Event`);
    return response.data;
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  }
}

export async function UpdatingEvent(values: UpdateEvent) {
  try {
    const response = await api.put(`/events/${values.id}`, values);
    toast.success(`Successfully Updated Event`);
    return response.data;
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  }
}

export async function creatingEventRegistrant(values: CreateEventRegistrant) {
  try {
    const response = await api.post("/event-registrants", values);
    toast.success("Reservation submitted successfully");
    return response.data;
  } catch (error: any) {
    const errorMessage =
      error.response?.data?.error || error.message || "Failed to reserve event";
    toast.error(`Error: ${errorMessage}`);
  }
}

export async function fetchingEventRegistrant() {
  try {
    const response = await api.get("/event-registrants");
    return response.data;
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  }
}

export async function deletingEventRegistrant(id: number) {
  try {
    const response = await api.delete(`/event-registrants/${id}`);
    toast.success("Successfully Deleted Event Registrant");
    return response.data;
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  }
}

export async function UpdatingEventRegistrant(values: UpdateEventRegistrant) {
  try {
    const response = await api.put(`/event-registrants/${values.id}`, values);
    toast.success("Successfully Updated Event Registrant");
    return response.data;
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  }
}

export async function creatingBranch(values: CreateBranch) {
  try {
    const response = await api.post("/branches", values);
    toast.success(`Successfully Created Branch`);
    return response.data;
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  }
}

export async function fetchingBranch() {
  try {
    const response = await api.get("/branches");
    return response.data;
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  }
}

export async function deletingBranch(id: number) {
  try {
    const response = await api.delete(`/branches/${id}`);
    toast.success(`Successfully Deleted Branch`);
    return response.data;
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  }
}

export async function UpdatingBranch(values: UpdateBranch) {
  try {
    const response = await api.put(`/branches/${values.id}`, values);
    toast.success("Successfully Updated Branch");
    return response.data;
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  }
}

export async function creatingContact(values: CreateContact) {
  try {
    const response = await api.post("/contacts", values);
    toast.success(`Successfully Created Contact`);
    return response.data;
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  }
}

export async function fetchingContact() {
  try {
    const response = await api.get("/contacts");
    return response.data;
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  }
}

export async function deletingContact(id: number) {
  try {
    const response = await api.delete(`/contacts/${id}`);
    toast.success(`Successfully Deleted Contact`);
    return response.data;
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  }
}

export async function Login(values: LoggingIn, router: AppRouterInstance) {
  try {
    const response = await api.post("/admin/login", values);
    localStorage.setItem("token", response.data.token);
    toast.success(`Welcome ${values.username}`);
    router.push("/Dashboard");
    return response.data;
  } catch(error: any) {
    const errorMessage = error.response?.data?.error || error.message || "Login failed";
    toast.error(errorMessage);
    console.error("Login error details:", error.response?.data || error);
    return null;
  }
}    

export async function fetchingAdmin() {
  try {
    const response = await api.get("/admin");
    return response.data;
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  }
}

export async function updateCredential(values: Users) {
  try {
    const response = await api.put("/admin", values);
    toast.success(`Successfully Updated Credential`);
    return response.data;
  } catch (error: any) {
    toast.error(`Error: ${error.message}`);
  }
}
