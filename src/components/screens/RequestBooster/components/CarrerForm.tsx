import { Button, Input, Textarea } from "@nextui-org/react"
import React from "react"

const CarrerForm = () => {
  const placement = "outside"
  const variant = "bordered"
  return (
    <div>
      <h3>If you think you meet the requirements, please fill out the following form:</h3>
      <form>
        <div>
          <Input
            type="text"
            variant={variant}
            label="Nickname on the service"
            name="nickNameOnService"
            labelPlacement={placement}
            placeholder="Max 14 Characters"
            required
          />
        </div>
        <div>
          <Input
            type="text"
            variant={variant}
            label="We Will Contact You Back via Discord (!):"
            name="contactDiscord"
            labelPlacement={placement}
            placeholder="Example: UserName#7851"
            required
          />
        </div>
        <div>
          <Input
            type="text"
            variant={variant}
            label="Link to your account:"
            name="boosterAccount"
            labelPlacement={placement}
            required
          />
        </div>
        <div>
          <Textarea variant={variant} isRequired label="About you" labelPlacement="outside" />
        </div>
        <div>
          <div>
            <Input type="text" variant={variant} label="Country:" name="country" labelPlacement={placement} required />
          </div>
          <div>
            <Input type="text" variant={variant} label="E-mail:" name="email" labelPlacement={placement} required />
          </div>
        </div>
        <Button type="submit" color="danger" radius="md" size="md" variant="shadow">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default CarrerForm
