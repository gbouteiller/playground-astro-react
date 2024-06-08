import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle
} from "@/components/ui/navigation-menu"

// MAIN ************************************************************************************************************************************
export const Menu = () => (
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem>
      <NavigationMenuLink asChild>
          <a href="/" className={navigationMenuTriggerStyle()}>Accueil</a>
        </NavigationMenuLink>
        <NavigationMenuLink asChild>
          <a href="/a-propos" className={navigationMenuTriggerStyle()}>A propos</a>
        </NavigationMenuLink>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
)

