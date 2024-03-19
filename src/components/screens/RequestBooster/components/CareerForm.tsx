import { Button, Input, Spinner, Textarea } from "@nextui-org/react"
import { useMutation } from "@tanstack/react-query"
import React, { ChangeEvent, useState } from "react"
import postCareerRequest from "@api/postCareerRequest"
import { NOTIFICATION_TYPE, notify } from "@utils/notify"
import { Response } from "@models/api"
import { RiotAccount } from "@models/riot-account"

export type CareerRequest = {
  nickname: string
  discordUserName: string
  gameName: string
  tagLine: string
  about: string
  country: string
  email: string
}

const CareerForm = () => {
  const [careerReq, setCareerReq] = useState<CareerRequest>({
    nickname: "",
    discordUserName: "",
    gameName: "",
    tagLine: "",
    about: "",
    country: "",
    email: "",
  })
  const [errorMessage, setErrorMessage] = useState<CareerRequest>({
    nickname: "",
    discordUserName: "",
    gameName: "",
    tagLine: "",
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

    // Validate each field
    Object.entries(careerReq).forEach(([key, value]) => {
      if (!value) {
        isValid = false
      }
      setErrorMessage({ ...errorMessage, [key]: !value ? `${key} is require` : "" })
    })

    if (isValid) {
      isValid = validateEmail()
    }
    return isValid
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      mutation.mutate(careerReq)
    } else {
      //handle later
    }
  }
  const validateRiotAccount = async () => {
    try {
      const response = await fetch(`http://localhost:9999/riot-helper/?IGN=${careerReq.gameName}&tag=${careerReq.tagLine}`);
      if (!response.ok) {
        throw new Error('Failed to validate Riot account');
      }
      const data = await response.json() as Response<RiotAccount>;
      if (data.data?.validate) {
        return true;
      } else {
        setErrorMessage({
          ...errorMessage,
          gameName: "Invalid Riot account",
          tagLine: "Invalid Riot account",
        });
        return false;
      }
    } catch (error) {
      console.error("Error validating Riot account:", error);
      return false;
    }
  };
  
  const validateEmail = (): boolean => {
    const isValid = Boolean(
      String(careerReq.email)
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
    )
    setErrorMessage({ ...errorMessage, email: isValid ? "" : "Email is not in a valid format!" })
    return isValid
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
    <div className="h-full px-20 py-9 text-white">
      <h3 className="text-2xl font-semibold">
        If you think you meet the requirements, please fill out the following form:
      </h3>
      <form onSubmit={handleSubmit}>
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
          <div className="my-5 flex gap-10">
            <div className="flex-1">
              <Input
                label="gameName"
                radius="lg"
                name="gameName"
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
                placeholder="your gameName"
                isRequired
              />
            </div>
            <div className="flex-1">
              <Input
                label="tagLine"
                radius="lg"
                name="tagLine"
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
                placeholder="tagLine"
                isRequired
              />
            </div>
          </div>
          {errorMessage.gameName && errorMessage.tagLine && (
            <span className="text-red-600">{errorMessage.gameName}</span>
          )}
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
              onBlur={validateEmail}
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
            {errorMessage.email && <span className="text-red-600">{errorMessage.email}</span>}
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
