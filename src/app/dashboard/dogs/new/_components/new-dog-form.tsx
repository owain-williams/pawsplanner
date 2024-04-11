"use client";

import { createDog } from "@/actions/create/dog";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useAuth } from "@clerk/nextjs";
import { zodResolver } from "@hookform/resolvers/zod";
import type { PutBlobResult } from "@vercel/blob";
import { upload } from "@vercel/blob/client";
import { useAction } from "next-safe-action/hooks";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  breed: z.string().min(2).max(50),
  imageFile: z.optional(
    z
      .instanceof(FileList)
      .refine((file) => file?.length === 1, "File is required")
  ),
});

export default function NewDogForm() {
  const router = useRouter();
  const { userId } = useAuth();
  const inputNameRef = useRef<HTMLInputElement>(null);
  const inputBreedRef = useRef<HTMLInputElement>(null);
  const inputFileRef = useRef<HTMLInputElement>(null);
  const [blob, setBlob] = useState<PutBlobResult | null>(null);
  const [submitStatus, setSubmitStatus] = useState<string>("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const name = inputNameRef.current!.value;
    const breed = inputBreedRef.current!.value;
    const file = inputFileRef.current!.files![0];

    toast.info("Uploading Image: Please don't navigate away");

    const response = await fetch(`/api/blob-upload?filename=${file.name}`, {
      method: "POST",
      body: file,
    });

    const newBlob = (await response.json()) as PutBlobResult;
    setBlob(newBlob);

    toast.info("Image Uploaded: Saving details");

    const addedDog = await fetch(`/api/dogs`, {
      method: "POST",
      body: JSON.stringify({
        name,
        breed,
        ownerId: userId!,
        contentDisposition: newBlob.contentDisposition,
        contentType: newBlob.contentType,
        downloadUrl: newBlob.downloadUrl,
        pathname: newBlob.pathname,
        url: newBlob.url,
      }),
    });

    toast.success(`${name} has been saved`);
    router.push("/dashboard/dogs");
    router.refresh();
  }

  return (
    <>
      <div className="p-8">
        <h2 className="scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
          Register Your Dog
        </h2>

        <form onSubmit={handleSubmit} className="pt-8">
          <div className="py-2">
            <label htmlFor="name">Dog&apos;s Name</label>
            <Input name="name" ref={inputNameRef} type="text" required />
          </div>
          <div className="py-2">
            <label htmlFor="breed">Dog&apos;s Breed</label>
            <Input name="breed" ref={inputBreedRef} type="text" required />
          </div>
          <div className="py-2">
            <label htmlFor="file">Dog&apos;s Avatar</label>
            <Input name="file" ref={inputFileRef} type="file" />
            <div className="py-2">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>

        {/* {blob && (
          <div>
            Blob url: <a href={blob.url}>{blob.url}</a>
          </div>
        )} */}
      </div>
    </>
  );
}
