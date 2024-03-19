import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React, { ChangeEvent, useState } from 'react'
import { API_ENDPOINT } from '@models/api'
import { NOTIFICATION_TYPE, notify } from '@utils/notify'
import { useBoundStore } from '@zustand/total'

type PaymentAccount = {
  account: string
  bank: string
}

const PaymentAccount = () => {
  const [paymentAccount, setPaymentAccount] = useState<PaymentAccount>({
    account: "",
    bank: "",
  })
  const [errorMessage, setErrorMessage] = useState<PaymentAccount>({
    account: "",
    bank: "",
  })

  const { accountInfo } = useBoundStore((store) => ({
    accountInfo: store.accountInfo,
  }))

  const handleCloseModal = () => {
    window.history.back()
  }

  const handleChangePaymentAccount = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name
    const value = e.target.value
    setPaymentAccount({
      ...paymentAccount,
      [name]: value,
    })

    if (!value) {
      setErrorMessage({
        ...errorMessage,
        [name]: `Field ${name} is require!`
      })
    } else {
      setErrorMessage({
        ...errorMessage,
        [name]: ""
      })
    }
  }

  const handleSavePaymentAccount = async () => {
    const newErrorMessage = {
      account: paymentAccount.account ? "" : "Field account is require!",
      bank: paymentAccount.bank ? "" : "Field bank is require!",
    }
    setErrorMessage(newErrorMessage)
    if (!newErrorMessage.account && !newErrorMessage.bank) {
      const response = await fetch(API_ENDPOINT + "/user/update-payment-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: accountInfo.userId,
          account: paymentAccount.account,
          bank: paymentAccount.bank
        }),
      })
      const data = await response.json() as { paymentAccount: { account: string, bank: string } }
      if (!!data.paymentAccount.account) {
        handleCloseModal()
        setTimeout(() => {
          notify(NOTIFICATION_TYPE.SUCCESS, "Update payment account successfully!")
        }, 50)
      } else {
        notify(NOTIFICATION_TYPE.ERROR, "Something error when update payment account, try again!")
      }
    }
  }



  return (
    <div className="bg-theme min-h-screen">
      <Modal
        backdrop="opaque"
        isOpen={true}
        classNames={{
          body: "py-6 text-white",
          backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
          base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
          header: "border-b-[1px] border-[#292f46]",
          footer: "border-t-[1px] border-[#292f46]",
          closeButton: "hover:bg-white/5 active:bg-white/10",
        }}
        placement='center'
      >
        <ModalContent>
          <ModalHeader className="flex flex-col gap-1">Payment Account Information</ModalHeader>
          <ModalBody>
            <Input
              isRequired
              type="text"
              label="Account"
              variant='underlined'
              name='account'
              value={paymentAccount.account}
              classNames={{
                input: "!text-white",
              }}
              onChange={handleChangePaymentAccount}
            />
            <p className="text-red-500 text-sm">{errorMessage.account}</p>
            <Input
              isRequired
              type="text"
              label="Bank"
              variant='underlined'
              name='bank'
              value={paymentAccount.bank}
              classNames={{
                input: "!text-white",
              }}
              onChange={handleChangePaymentAccount}
            />
            <p className="text-red-500 text-sm">{errorMessage.bank}</p>
          </ModalBody>
          <ModalFooter>
            <Button color="danger" variant="light" onPress={handleCloseModal}>
              Cancel
            </Button>
            <Button color="primary" onPress={handleSavePaymentAccount} isDisabled={!!errorMessage.account || !!errorMessage.bank}>
              Save
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  )
}

export default PaymentAccount