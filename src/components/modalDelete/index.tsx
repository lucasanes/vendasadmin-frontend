import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/react";
import { useEffect } from "react";

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
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        confirm();
      }
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, [confirm]);

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
