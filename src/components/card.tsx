import Image from "next/image";
import Link from "next/link";

import {Skeleton} from "./ui/skeleton";

interface CardProps {
  id: string;
  title: string;
  publishing_year: number;
  cover: string;
}

export function Card({id, title, cover, publishing_year}: CardProps) {
  return (
    <Link
      className="flex h-[504px] w-[282px] flex-col items-start rounded-xl bg-card"
      href={`/${id}`}
    >
      <div className="mx-auto mt-2 h-[400px] w-[266px]">
        <Image
          alt={`cover of ${title}`}
          className="h-full rounded-xl object-cover object-center"
          height={400}
          src={cover}
          width={266}
        />
      </div>
      <div className="flex flex-col gap-y-2 p-4">
        <h3 className="text-xl font-medium leading-8">{title}</h3>
        <p className="text-sm font-normal leading-6">{publishing_year.toString()}</p>
      </div>
    </Link>
  );
}

export function CardSkeleton() {
  return <Skeleton className="h-[504px] w-[282px]" />;
}
