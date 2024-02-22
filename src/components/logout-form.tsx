import {LogOutIcon} from "lucide-react";

import {logout} from "@/utils/actions/auth";

import {Button} from "./ui/button";

export function LogoutForm() {
  return (
    <form action={logout}>
      <Button className="flex items-center gap-x-2" type="submit" variant="ghost">
        <span>Logout</span>
        <LogOutIcon className="h-4 w-4 " />
      </Button>
    </form>
  );
}
