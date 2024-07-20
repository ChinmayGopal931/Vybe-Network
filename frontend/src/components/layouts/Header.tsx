import { useState } from "react";
import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTrigger } from "@/components/shadcn/sheet";
import { mainMenu } from "@/config/menu";
import { Logo } from "../logo";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-8 flex h-[80px] justify-between">
      <div className="flex items-center mb-5">
        <Sheet open={open} onOpenChange={setOpen}>
          <div className="block xs:hidden sm:block md:hidden lg:hidden xl:hidden 2xl:hidden">
            <SheetTrigger asChild>
              <button className="mr-6">
                <img src="/assets/Vybe.png" className="w-[7rem]" alt="Vybe" />
              </button>
            </SheetTrigger>
          </div>
          <div>
            <NavLink to="/" className="mr-6 flex items-center space-x-2 py-10">
              <Logo />
            </NavLink>
          </div>
          <nav className="hidden xs:block sm:hidden md:block lg:block xl:block 2xl:block flex items-center space-x-8 text-xl">
            {mainMenu.map((menu, index) => (
              <NavLink
                key={index}
                to={menu.to ?? ""}
                className={({ isActive }) =>
                  cn(
                    "text-xl font-medium transition-colors hover:text-primary",
                    isActive ? "text-foreground" : "text-foreground/60"
                  )
                }
              >
                {menu.title}
              </NavLink>
            ))}
          </nav>
        </Sheet>
      </div>
    </div>
  );
}
