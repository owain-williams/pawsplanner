"use client";

import createInviteRecord from "@/actions/create-invite-record";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useOrganization } from "@clerk/nextjs";
import { useState } from "react";

export default function InviteForm() {
  const { invitations, isLoaded, organization } = useOrganization({
    invitations: {},
  });
  const orgId = organization?.id;
  if (!orgId) return;

  if (!invitations || !isLoaded) {
    return <>Loading</>;
  }

  return (
    <div className="pt-4 gap-4">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Invite Customer
      </h2>
      <InviteMember />

      <h2 className="scroll-m-20 text-2xl mt-8 font-semibold tracking-tight">
        Pending invitations
      </h2>

      <ul>
        {invitations.data && invitations.data.length ? (
          invitations.data?.map((i) => (
            <li key={i.id}>
              {i.emailAddress}{" "}
              <Button onClick={() => i.revoke()}>Revoke</Button>
            </li>
          ))
        ) : (
          <p>No pending invitations</p>
        )}
      </ul>
    </div>
  );
}

function InviteMember() {
  const { organization, isLoaded } = useOrganization();
  const [emailAddress, setEmailAddress] = useState("");
  const [role, setRole] = useState<"org:member" | "admin">("org:member");
  const [disabled, setDisabled] = useState<boolean>(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    if (!organization || !isLoaded) {
      return <>Loading</>;
    }

    e.preventDefault();
    setDisabled(true);
    try {
      await organization.inviteMember({ emailAddress, role });
      setEmailAddress("");
      setRole("org:member");
      setDisabled(false);
    } catch (error) {
      console.log(`Error: ${error}`);
    }
    createInviteRecord(emailAddress, organization.id);
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        className="mt-2"
        type="text"
        placeholder="Email address"
        value={emailAddress}
        onChange={(e) => setEmailAddress(e.target.value)}
      />
      <RadioGroup className="mt-4" defaultValue="org:member">
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="org:member" id="org:member" />
          <Label htmlFor="org:member">Member</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="admin" id="admin" />
          <Label htmlFor="admin">Admin</Label>
        </div>
      </RadioGroup>
      {/* <label>
        <Input
          type="radio"
          checked={role === "admin"}
          onChange={() => {
            setRole("admin");
          }}
        />{" "}
        Admin
      </label>
      <label>
        <Input
          type="radio"
          checked={role === "org:member"}
          onChange={() => {
            setRole("org:member");
          }}
        />{" "}
        Member
      </label>{" "} */}
      <Button type="submit" className="mt-4" disabled={disabled}>
        Invite
      </Button>
    </form>
  );
}
