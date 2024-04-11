'use server'

import { z } from 'zod'
import { action } from '@/lib/safe-action';
import { db } from '@/lib/db';

const schema = z.object({
  name: z.string().min(2).max(50),
  breed: z.string().min(2).max(50),
  ownerId: z.string().min(2),
  image: z.optional(z.object({
    contentDisposition: z.optional(z.string().min(1)),
    contentType: z.optional(z.string().min(1)),
    downloadUrl: z.optional(z.string().url().min(1)),
    pathName: z.optional(z.string().min(1)),
    url: z.optional(z.string().url().min(1)),
  })),
});

export const createDog = action(schema, async ({ name, breed, image, ownerId }) => {
  try {
    const dog = await db.dog.create({
      data: {
        name: name,
        breed: breed,
        ownerId: ownerId,
      },
    });
    if (!!image?.url) {
      await db.image.create({
        data: {
          contentDisposition: image?.contentDisposition,
          contentType: image?.contentType,
          downloadUrl: image?.downloadUrl,
          pathname: image?.pathName,
          url: image?.url,
          dogId: dog.id
        }
      })

    }
  } catch (error) {
    console.log(error)
  }

});