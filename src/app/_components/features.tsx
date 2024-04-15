import { Calendar, CreditCard, UserCheck } from "lucide-react";

export default function Features() {
  return (
    <section className="w-full bg-gray-100 py-12 dark:bg-gray-800 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="flex flex-col items-center text-center">
            <Calendar className="mb-4 h-12 w-12" />
            <h3 className="text-xl font-bold">Easy Scheduling</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Schedule appointments with ease and never double-book again.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <CreditCard className="mb-4 h-12 w-12" />
            <h3 className="text-xl font-bold">Secure Payments</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Accept payments securely, send invoices, and manage your finances
              in one place.
            </p>
          </div>
          <div className="flex flex-col items-center text-center">
            <UserCheck className="mb-4 h-12 w-12" />
            <h3 className="text-xl font-bold">Client Management</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Keep track of your clients and their pets with our easy-to-use
              client management system.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
