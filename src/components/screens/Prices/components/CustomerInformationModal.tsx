import React from 'react'
import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'

type Props = {
  isOpenModal: boolean
  handleChangeOpenModal: () => void
}

const CustomerInformationModal = ({ isOpenModal, handleChangeOpenModal }: Props) => {
  return (
    <Modal
      backdrop="opaque"
      isOpen={isOpenModal}
      onOpenChange={handleChangeOpenModal}
      classNames={{
        body: "py-6",
        backdrop: "bg-[#292f46]/50 backdrop-opacity-40",
        base: "border-[#292f46] bg-[#19172c] dark:bg-[#19172c] text-[#a8b0d3]",
        header: "border-b-[1px] border-[#292f46]",
        footer: "border-t-[1px] border-[#292f46]",
        closeButton: "hover:bg-white/5 active:bg-white/10",
      }}
      placement='center'
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Customer Information</ModalHeader>
            <ModalBody>
              <Input
                isRequired
                type="email"
                label="Email"
                variant='underlined'
              />
              <Input
                isRequired
                type="text"
                label="Game Account"
                variant='underlined'
              />
              <Input
                isRequired
                type="text"
                label="tagId"
                variant='underlined'
              />
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Cancel
              </Button>
              <Button color="primary" onPress={onClose}>
                Confirm
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  )
}

export default CustomerInformationModal