import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";

export function ModalDelete({
  isOpen,
  onOpenChange,
  cancel,
  confirm,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  cancel: () => void;
  confirm: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>Confirmar Operação</ModalHeader>
        <ModalBody>
          <span>Confirma a exclusão da empresa?</span>
        </ModalBody>
        <ModalFooter>
          <Button onPress={cancel} color="danger" variant="light">
            Cancelar
          </Button>
          <Button onPress={confirm} color="success" variant="flat">
            Confirmar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
