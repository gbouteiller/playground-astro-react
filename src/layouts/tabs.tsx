import {Tabs, TabsList, TabsTrigger} from "@/components/ui/tabs"
import type {Nav} from "@/lib/utils"

export default ({active, navs}: {active: string; navs: Nav[]}) => (
  <Tabs defaultValue={active}>
    <div className="flex items-center">
      <TabsList>
        {navs.map(({id, href, text}) => (
          <TabsTrigger key={id} value={id}>
            <a href={href}>{text}</a>
          </TabsTrigger>
        ))}
      </TabsList>
    </div>
  </Tabs>
)
