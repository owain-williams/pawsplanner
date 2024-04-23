"use client";

import { DogWithAllData } from "@/lib/types";
import { ColumnDef } from "@tanstack/react-table";

export type DogTable = {
  name: string;
  breed: string;
  canBook: boolean;
  canBookUntil: string;
};

export const columns: ColumnDef<DogTable>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "breed",
    header: "Breed",
  },
  {
    accessorKey: "canBook",
    header: "Can Book",
  },
  {
    accessorKey: "canBookUntil",
    header: "Vaccination expiry",
  },
];
