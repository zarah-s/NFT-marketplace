import { Button, Dialog, Flex, Text, TextField } from "@radix-ui/themes";

const TransferModal = ({ onClick, inputRef }) => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button className="bg-blue-400">Transfer</Button>
      </Dialog.Trigger>

      <Dialog.Content style={{ maxWidth: 450 }}>
        <Dialog.Title>Transfer NFT</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Enter receiver's address
        </Dialog.Description>

        <Flex direction="column" gap="3">
          <label>
            <Text as="div" size="2" mb="1" weight="bold">
              Receiver's Address
            </Text>
            <TextField.Input ref={inputRef} placeholder="Receiver's address" />
          </label>
        </Flex>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button className="bg-blue-400" onClick={onClick}>
              Transfer
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default TransferModal;
