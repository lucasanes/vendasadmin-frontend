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
  function handleKeyPress(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "Enter") {
      confirm();
    }
  }

  return (
    <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent onKeyDown={(e) => handleKeyPress(e)}>
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
