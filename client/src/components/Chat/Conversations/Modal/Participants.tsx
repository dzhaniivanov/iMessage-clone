import { Flex, Stack, Text } from "@chakra-ui/react";
import React from "react";
import { SearchedUser } from "../../../../util/types";
import { IoIosCloseCircleOutline } from "react-icons/io";

interface ParticipantsProps {
  participants: Array<SearchedUser>;
  removeParticipant: (userId: string) => void;
}

const Participants: React.FC<ParticipantsProps> = ({
  participants,
  removeParticipant,
}) => {
  console.log("here participants", participants);
  return (
    <Flex mt={8} gap="10px" flexWrap="wrap">
      {participants.map((participant) => (
        <Stack
          direction="row"
          key={participant.id}
          align="center"
          bg="whiteAlpha.200"
          borderRadius={4}
          p={2}
        >
          <Text>{participant.username}</Text>
          <IoIosCloseCircleOutline
            size={20}
            cursor="pointer"
            onClick={() => removeParticipant(participant.id)}
          />
        </Stack>
      ))}
    </Flex>
  );
};

export default Participants;
