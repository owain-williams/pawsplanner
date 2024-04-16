import { OrganizationSwitcher } from "@clerk/nextjs";

export default function NoOrgPage() {
  return (
    <>
      <p>
        If you don&apos;t see your dog walker&apos;s below, please be patient
        while they invite you
      </p>
      <OrganizationSwitcher />
    </>
  );
}
