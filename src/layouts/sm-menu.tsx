import {Button} from "@/components/ui/button"
import {Sheet, SheetContent, SheetTrigger} from "@/components/ui/sheet"
import {cn, type MenuItem} from "@/lib/utils"
import {Menu, Package2} from "lucide-react"

export default ({menu}: {menu: MenuItem[]}) => (
  <Sheet>
    <SheetTrigger asChild>
      <Button variant="outline" size="icon" className="shrink-0 md:hidden">
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle navigation menu</span>
      </Button>
    </SheetTrigger>
    <SheetContent side="left">
      <nav className="grid gap-6 text-lg font-medium">
        <a href="/" className="flex items-center gap-2 text-lg font-semibold">
          <Package2 className="h-6 w-6" />
          <span className="sr-only">Acme Inc</span>
        </a>
        {menu.map(({href, id, isActive, text}) => (
          <a key={id} href={href} className={cn("transition-colors hover:text-foreground", !isActive && "text-muted-foreground")}>
            {text}
          </a>
        ))}
      </nav>
    </SheetContent>
  </Sheet>
)
