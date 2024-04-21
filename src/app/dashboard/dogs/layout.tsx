import { auth } from "@clerk/nextjs";

export type DogsLayoutProps = {
  admin: React.ReactNode;
  member: React.ReactNode;
};

export default function DogsLayout({ admin, member }: DogsLayoutProps) {
  const { orgRole } = auth();
  return <>{orgRole === "org:member" ? member : admin}</>;
}
