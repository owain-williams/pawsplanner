import { auth } from "@clerk/nextjs";

export type BookingsLayoutProps = {
  admin: React.ReactNode;
  member: React.ReactNode;
};

export default function BookingsLayout({ admin, member }: BookingsLayoutProps) {
  const { orgRole } = auth();
  return <>{orgRole === "org:admin" ? admin : member}</>;
}
