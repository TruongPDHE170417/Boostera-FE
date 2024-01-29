import { Button, Input, Textarea } from "@nextui-org/react"
import React from "react"

const CarrerForm = () => {
  const placement = "outside"
  const variant = "flat"

  class CarrerFormRequest {
    nickname: string
    discordUserName: string
    accountLink: string
    about: string
    country: string
    email: string

    constructor(
      nickname: string,
      discordUserName: string,
      accountLink: string,
      about: string,
      country: string,
      email: string
    ) {
      this.nickname = nickname
      this.discordUserName = discordUserName
      this.accountLink = accountLink
      this.about = about
      this.country = country
      this.email = email
    }
  }

  // Inline style for grey label color

  return (
    <div className="h-full p-9 text-white">
      <h3 className="text-2xl font-semibold">
        If you think you meet the requirements, please fill out the following form:
      </h3>
      <form className="">
        <div className="my-5">
          <Input
            label="Nickname on the service:"
            radius="lg"
            classNames={{
              label: "text-gray-500",
              input: ["bg-transparent", "text-black/90", "placeholder:text-default-700/50"],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/60",
                "group-data-[focused=true]:bg-default-200",
                "!cursor-text",
              ],
            }}
            placeholder="Max 14 characters"
          />
        </div>
        <div className="my-5">
          <Input
            label="We Will Contact You Back via Discord (!):"
            radius="lg"
            classNames={{
              label: "text-gray-500",
              input: ["bg-transparent", "text-black/90", "placeholder:text-default-700/50"],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/60",
                "group-data-[focused=true]:bg-default-200",
                "!cursor-text",
              ],
            }}
            placeholder="Example: UserName#7851"
          />
        </div>
        <div className="my-5">
          <Input
            label="Link to your account:"
            radius="lg"
            classNames={{
              label: "text-gray-500",
              input: ["bg-transparent", "text-black/90", "placeholder:text-default-700/50"],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/60",
                "group-data-[focused=true]:bg-default-200",
                "!cursor-text",
              ],
            }}
            placeholder=" "
          />
        </div>
        <div className="my-5">
          <Textarea
            label="About you:"
            radius="lg"
            classNames={{
              label: "text-gray-500",
              input: ["bg-transparent", "text-black/90", "placeholder:text-default-700/50"],
              innerWrapper: "bg-transparent",
              inputWrapper: [
                "shadow-xl",
                "bg-default-200/50",
                "backdrop-blur-xl",
                "backdrop-saturate-200",
                "hover:bg-default-200/60",
                "group-data-[focused=true]:bg-default-200",
                "!cursor-text",
              ],
            }}
            placeholder=" "
          />
        </div>
        <div className="my-5 flex gap-10">
          <div className="flex-1">
            <Input
              label="Country:"
              radius="lg"
              classNames={{
                label: "text-gray-500",
                input: ["bg-transparent", "text-black/90", "placeholder:text-default-700/50"],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "shadow-xl",
                  "bg-default-200/50",
                  "backdrop-blur-xl",
                  "backdrop-saturate-200",
                  "hover:bg-default-200/60",
                  "group-data-[focused=true]:bg-default-200",
                  "!cursor-text",
                ],
              }}
              placeholder=" "
            />
          </div>
          <div className="flex-1">
            <Input
              label="E-mail:"
              radius="lg"
              classNames={{
                label: "text-gray-500",
                input: ["bg-transparent", "text-black/90", "placeholder:text-default-700/50"],
                innerWrapper: "bg-transparent",
                inputWrapper: [
                  "shadow-xl",
                  "bg-default-200/50",
                  "backdrop-blur-xl",
                  "backdrop-saturate-200",
                  "hover:bg-default-200/60",
                  "group-data-[focused=true]:bg-default-200",
                  "!cursor-text",
                ],
              }}
              placeholder=" "
            />
          </div>
        </div>
        <Button type="submit" radius="md" size="lg" color="danger" variant="shadow">
          Submit
        </Button>
      </form>
    </div>
  )
}

export default CarrerForm
