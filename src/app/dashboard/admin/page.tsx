import listStripeAccounts from "@/actions/list-stripe-accounts";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CreateStripeAccountButton from "./_components/create-stripe-account-button";

export default async function AdminDashboardPage() {
  const stripeAccounts = await listStripeAccounts();

  return (
    <main className="gap-4 p-4">
      <h1 className="mt-10 scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0">
        Admin Dashboard
      </h1>
      <h2 className="mt-8 scroll-m-20 text-2xl font-semibold tracking-tight">
        Connected Stripe Accounts
      </h2>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Clerk ID</TableHead>
            <TableHead>Payouts Enabled</TableHead>
            <TableHead className="text-right">Details Submitted</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stripeAccounts.data.map((acc) => (
            <TableRow key={acc.id}>
              <TableCell className="font-medium">{acc.id}</TableCell>
              <TableCell>{acc.email}</TableCell>
              <TableCell>{acc.metadata?.clerkId}</TableCell>
              <TableCell>{acc.payouts_enabled}</TableCell>
              <TableCell className="text-right">
                {acc.details_submitted}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <CreateStripeAccountButton />
    </main>
  );
}
