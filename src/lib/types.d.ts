export type OrgRole = 'org:admin' | 'org:member';

export type DogWithImageAndMetadata = Prisma.DogGetPayload<{
  include: {
    metadata: true;
    image: true;
  };
}>;