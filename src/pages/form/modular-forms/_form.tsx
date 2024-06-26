import {type ContactValues} from "@/actions/utils"
import {Card, CardDescription, CardHeader, CardTitle} from "@/components/ui/card"
import {useForm} from "@modular-forms/react"

export default () => {
  const [form] = useForm<ContactValues>({})

  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact</CardTitle>
        <CardDescription>N'hésitez pas à nous contacter si vous avez la moindre question</CardDescription>
      </CardHeader>
    </Card>
  )
}
