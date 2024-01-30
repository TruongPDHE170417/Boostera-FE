import { Button, Input, Spinner, Textarea } from "@nextui-org/react"
import { useMutation } from "@tanstack/react-query"
import React, { ChangeEvent, useState } from "react"
import postCareerRequest from "@api/postCareerRequest"
import { NOTIFICATION_TYPE, notify } from "@utils/notify"

export type CareerRequest = {
  nickname: string
  discordUserName: string
  accountLink: string
  about: string
  country: string
  email: string
}

const CareerForm = () => {
  const [careerReq, setCareerReq] = useState<CareerRequest>({
    nickname: "",
    discordUserName: "",
    accountLink: "",
    about: "",
    country: "",
    email: "",
  })
  const [errorMessage, setErrorMessage] = useState<CareerRequest>({
    nickname: "",
    discordUserName: "",
    accountLink: "",
    about: "",
    country: "",
    email: "",
  })

  const mutation = useMutation({
    mutationFn: (careerReq: CareerRequest) => {
      return postCareerRequest(careerReq)
    },
    onError: () => {
      notify(NOTIFICATION_TYPE.ERROR, `Error while sending your request`)
    },
    onSuccess: () => {
      notify(NOTIFICATION_TYPE.SUCCESS, `Your request has been successfully send`)
    },
  })
  const validateForm = () => {
    let isValid = true
    const newErrorMessage: CareerRequest = {
      nickname: "",
      discordUserName: "",
      accountLink: "",
      about: "",
      country: "",
      email: "",
    }

    // Validate each field
    if (!careerReq.nickname) {
      newErrorMessage.nickname = "Nickname is required"
      isValid = false
    }

    if (!careerReq.discordUserName) {
      newErrorMessage.discordUserName = "Discord username is required"
      isValid = false
    }
    if (!careerReq.accountLink) {
      newErrorMessage.accountLink = "Account Link is required"
      isValid = false
    }
    if (!careerReq.about) {
      newErrorMessage.about = "About is required"
      isValid = false
    }
    if (!careerReq.country) {
      newErrorMessage.country = "Country is required"
      isValid = false
    }
    if (!careerReq.email) {
      newErrorMessage.email = "Email username is required"
      isValid = false
    }

    setErrorMessage(newErrorMessage)

    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      mutation.mutate(careerReq)
    } else {
      Object.values(errorMessage).forEach((e) => {
        notify(NOTIFICATION_TYPE.ERROR, `${e}`)
      })
    }
  }

  const handleChangeInput = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setCareerReq({
      ...careerReq,
      [name]: value,
    })
  }

  return (
    <div className="h-full p-9 text-white">
      <h3 className="text-2xl font-semibold">
        If you think you meet the requirements, please fill out the following form:
      </h3>
      <form method="POST" onSubmit={handleSubmit} className="">
        <div className="my-5">
          <Input
            label="Nickname on the service:"
            name="nickname"
            onChange={handleChangeInput}
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
            isRequired
          />
        </div>
        <div className="my-5">
          <Input
            label="We Will Contact You Back via Discord (!):"
            radius="lg"
            name="discordUserName"
            onChange={handleChangeInput}
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
            isRequired
          />
        </div>
        <div className="my-5">
          <Input
            label="Link to your account:"
            radius="lg"
            name="accountLink"
            onChange={handleChangeInput}
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
            isRequired
          />
        </div>
        <div className="my-5">
          <Textarea
            label="About you:"
            radius="lg"
            name="about"
            onChange={handleChangeInput}
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
            isRequired
          />
        </div>
        <div className="my-5 flex gap-10">
          <div className="flex-1">
            <Input
              label="Country:"
              radius="lg"
              name="country"
              onChange={handleChangeInput}
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
              isRequired
            />
          </div>
          <div className="flex-1">
            <Input
              label="E-mail:"
              radius="lg"
              name="email"
              onChange={handleChangeInput}
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
              isRequired
            />
          </div>
        </div>
        <Button
          type="submit"
          radius="md"
          size="lg"
          color="danger"
          variant="shadow"
          isLoading={mutation.isPending}
          isDisabled={mutation.isError}
          spinner={<Spinner />}
        >
          Submit
        </Button>
      </form>
    </div>
  )
}

export default CareerForm
