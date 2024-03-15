import { Box, Button, Flex, Text } from "@radix-ui/themes";

const AllCollections = ({ tokensData, controller, ownedTokenIds }) => {
  return (
    <Flex align="center" gap="8" wrap={"wrap"}>
      {tokensData.length === 0 ? (
        <Text>Loading...</Text>
      ) : (
        tokensData.map((x, index) => {
          const owned = ownedTokenIds.find((fd) => fd.id === index);
          return (
            <Box key={x.dna} className="w-[20rem]">
              <img
                src={x.image}
                className="w-full object-contain"
                alt={x.name}
              />
              <Text className="block text-2xl">Name: {x.name}</Text>
              <Text className="block">Description: {x.description}</Text>
              {!!owned ? (
                <div className="mt-3 ">
                  <p className="text-[#666]">
                    Owned by: {owned[0].slice(0, 5)}...
                    {owned[0].slice(-5)}
                  </p>
                  <a
                    target="_blank"
                    className="text-sm text-blue-400 font-[600]"
                    href={`${import.meta.env.VITE_OPENSEA_LINK}${index}`}
                  >
                    OPEN LINK
                  </a>
                </div>
              ) : (
                <Button
                  onClick={async () => await controller.handleMint(index)}
                  className="w-full text-md mt-4"
                >
                  Mint
                </Button>
              )}
            </Box>
          );
        })
      )}
    </Flex>
  );
};

export default AllCollections;
