import { auth } from "@clerk/nextjs";

export type CustomerDetailsLayoutProps = {
  admin: React.ReactNode;
  member: React.ReactNode;
};

export default function CustomerDetailsLayout({
  admin,
  member,
}: CustomerDetailsLayoutProps) {
  const { orgRole } = auth();
  return <>{orgRole === "org:admin" ? admin : member}</>;
}
