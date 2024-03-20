import { Button, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React, { ChangeEvent } from 'react'

type Props = {
  boosterName?: string
  reportMessage?: string
  errorMessage?: string
  isOpenModal: boolean
  handleChangeOpenModal: () => void
  handleChangeMessage: (e: ChangeEvent<HTMLInputElement>) => void
  onClose: () => void
  onConfirm: () => void
}

const ReportModal = ({ boosterName, reportMessage, errorMessage, isOpenModal, handleChangeOpenModal, handleChangeMessage, onClose, onConfirm }: Props) => {
  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpenModal}
      onOpenChange={handleChangeOpenModal}
      onClose={onClose}
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
        <ModalHeader className="flex flex-col gap-1">Report Booster</ModalHeader>
        <ModalBody>
          <Input
            isRequired
            type="text"
            label="Booster"
            variant='underlined'
            name='booster'
            isDisabled
            value={boosterName}
            classNames={{
              input: "!text-white",
            }}
          />
          <Input
            isRequired
            type="text"
            label="Report Message"
            variant='underlined'
            name='message'
            classNames={{
              input: "!text-white",
            }}
            value={reportMessage}
            onChange={handleChangeMessage}
          />
          <p className="text-red-500 text-sm">{errorMessage}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={onConfirm} isDisabled={!!errorMessage}>
            Send Report
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ReportModal