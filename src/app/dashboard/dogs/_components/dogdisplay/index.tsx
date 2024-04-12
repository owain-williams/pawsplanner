import Image from "next/image";

import { Button } from "@/components/ui/button";
import type { DogWithImageAndMetadata } from "@/lib/types";
import { Edit } from "lucide-react";
import Link from "next/link";

type DogDisplayProps = {
  dog: DogWithImageAndMetadata;
};

export default function DogDisplay({ dog }: DogWithImageAndMetadata) {
  return (
    <div className="flex items-center justify-between p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <div className="justify-between flex items-center gap-6">
        <Image
          alt="Dog"
          className="rounded-full object-cover w-24 h-24"
          height={100}
          src={`/api/image?url=${dog.image[0].url}`}
          style={{
            aspectRatio: "100/100",
            objectFit: "cover",
          }}
          width={100}
        />
        <div className="space-y-1">
          <h2 className="text-xl font-bold">{dog.name}</h2>
          <p className="text-gray-500 dark:text-gray-400">Breed: {dog.breed}</p>
          {/* <p className="text-gray-500 dark:text-gray-400">Age: 3 years</p>
          <p className="text-gray-500 dark:text-gray-400">Gender: Male</p> */}
        </div>
      </div>
      <Button variant={"outline"} size={"icon"} asChild>
        <Link href={`/dashboard/dogs/${dog.id}`}>
          <Edit className="h-4 w-4" />
        </Link>
      </Button>
    </div>
  );
}
