import { Prisma } from "@prisma/client";

export type OrgRole = 'org:admin' | 'org:member';

export type DogWithImageAndMetadata = Prisma.DogGetPayload<{
  include: {
    metadata: true;
    image: true;
  };
}>;

export type DogWithAllData = Prisma.DogGetPayload<{
  include: {
    owner: true;
    metadata: true;
    image: true;
  };
}>;

export type BasketWithItems = Prisma.BasketGetPayload<{
  include: {
    items: {
      include: {
        dog: {
          include: {
            image: true
          }
        },
        slot: true,
      },
    },
  }
}>

