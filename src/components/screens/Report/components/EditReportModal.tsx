import { Button, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import React, { ChangeEvent } from 'react'
import { REPORT_STATUS } from '@models/report'

type Props = {
  status: REPORT_STATUS
  messageReject: string
  errorMessage: string
  isOpenModal: boolean
  handleChangeOpenModal: () => void
  handleChangeMessageReject: (e: ChangeEvent<HTMLInputElement>) => void
  handleChangeStatus: (status: REPORT_STATUS) => void
  onClose: () => void
  onConfirm: () => void
}

const EditReportModal = ({ status, messageReject, errorMessage, isOpenModal, handleChangeOpenModal, handleChangeMessageReject, handleChangeStatus, onClose, onConfirm }: Props) => {
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
          <div>
            <p className="text-default-400">Status</p>
            <div className="flex gap-2 my-2">
              <Button
                color={status === REPORT_STATUS.PENDING ? 'primary' : 'default'}
                onClick={() => handleChangeStatus(REPORT_STATUS.PENDING)}
              >
                Pending
              </Button>
              <Button
                color={status === REPORT_STATUS.RESOLVED ? 'success' : 'default'}
                onClick={() => handleChangeStatus(REPORT_STATUS.RESOLVED)}
              >
                Resolve
              </Button>
              <Button
                color={status === REPORT_STATUS.REJECTED ? 'danger' : 'default'}
                onClick={() => handleChangeStatus(REPORT_STATUS.REJECTED)}
              >
                Reject
              </Button>
            </div>
          </div>
          {status === REPORT_STATUS.REJECTED &&
            <>
              <Input
                isRequired
                type="text"
                label="Reject Message"
                variant='underlined'
                name='message'
                classNames={{
                  input: "!text-white",
                }}
                value={messageReject}
                onChange={handleChangeMessageReject}
              />
              <p className="text-red-500 text-sm">{errorMessage}</p>
            </>
          }
        </ModalBody>
        <ModalFooter>
          <Button color="danger" variant="light" onPress={onClose}>
            Cancel
          </Button>
          <Button color="primary" onPress={onConfirm} isDisabled={!!errorMessage}>
            Confirm
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default EditReportModal