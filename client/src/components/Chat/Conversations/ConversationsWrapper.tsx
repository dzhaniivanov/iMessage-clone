import { useQuery } from "@apollo/client";
import { Box } from "@chakra-ui/react";
import { Session } from "next-auth";
import ConversationList from "./ConversationList";
import ConversationOperatons from "../../../graphql/operations/conversation";
import { ConversationsData } from "../../../util/types";
import conversation from "../../../graphql/operations/conversation";
import { ConversationPopulated } from "../../../../../api/src/util/types";
import { useEffect } from "react";
import { useRouter } from "next/router";

interface ConversationWrapperProps {
  session: Session;
}

const ConversationsWrapper: React.FC<ConversationWrapperProps> = ({
  session,
}) => {
  const {
    data: conversationsData,
    error: conversationsError,
    loading: conversationsLoading,
    subscribeToMore,
  } = useQuery<ConversationsData, null>(
    ConversationOperatons.Queries.conversation
  );

  const router = useRouter();
  const {
    query: { conversationId },
  } = router;

  const onViewConversation = async (conversationId: string) => {
    //push the conversation to the router query params
    router.push({ query: { conversationId } });
    //mark the conversation as read
  };

  const subscribeToNewConversation = () => {
    subscribeToMore({
      document: ConversationOperatons.Subscriptions.conversationCreted,
      updateQuery: (
        prev,
        {
          subscriptionData,
        }: {
          subscriptionData: {
            data: { conversationCreated: ConversationPopulated };
          };
        }
      ) => {
        if (!subscriptionData.data) return prev;

        const newConversation = subscriptionData.data.conversationCreated;

        return Object.assign({}, prev, {
          conversations: [
            subscriptionData.data.conversationCreated,
            ...prev.conversations,
          ],
        });
      },
    });
  };

  useEffect(() => {
    subscribeToNewConversation();
  }, []);

  return (
    <Box
      display={{ base: conversationId ? "none" : "flex", md: "flex" }}
      width={{ base: "100%", md: "400px" }}
      bg="whiteAlpha.50"
      py={6}
      px={3}
    >
      {/* Skeleton */}
      <ConversationList
        session={session}
        conversations={conversationsData?.conversations || []}
        onViewConversation={onViewConversation}
      />
    </Box>
  );
};

export default ConversationsWrapper;
