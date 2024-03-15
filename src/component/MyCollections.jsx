import { Box, Flex, Text } from "@radix-ui/themes";
import TransferModal from "./TransferModal";

const MyCollections = ({ myTokensData, inputRef, controller }) => {
  return (
    <Flex align="center" gap="8" wrap={"wrap"}>
      {myTokensData.length === 0 ? (
        <Text>No NFT owned yet</Text>
      ) : (
        myTokensData.map((x) => (
          <Box key={x.dna} className="w-[20rem]">
            <img src={x.image} className="w-full object-contain" alt={x.name} />
            <Text className="block text-2xl">Name: {x.name}</Text>
            <Text className="block">Description: {x.description}</Text>
            <div className="mt-4 flex flex-col">
              <a
                target="_blank"
                className="text-sm text-blue-400 font-[600]"
                href={`${import.meta.env.VITE_OPENSEA_LINK}${x.id}`}
              >
                OPEN LINK
              </a>
              <TransferModal
                inputRef={inputRef}
                onClick={async () =>
                  await controller.handleTransfer(x.id, inputRef.current.value)
                }
              />
            </div>
          </Box>
        ))
      )}
    </Flex>
  );
};

export default MyCollections;
