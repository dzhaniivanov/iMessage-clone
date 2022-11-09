import { gql } from "@apollo/client";

const ConversationFields = `
    id
    participants {
      user {
        id
       username
      }
      hasSeenLatestMessage
    }
    latestMessage{
      id
     sender{
        id
       username
      }
      body
      createdAt
    }
    updatedAt
`;

export default {
  Queries: {
    conversation: gql`
    query Conversation {
      conversations {
      ${ConversationFields}
      }
    }
    `,
  },
  Mutations: {
    createConversation: gql`
      mutation CreateConversation($participantIds: [String]!) {
        createConversation(participantIds: $participantIds) {
          conversationId
        }
      }
    `,
  },
  Subscriptions: {
    conversationCreted: gql`
    subscription ConversationCreated {
      conversationCreated {
        ${ConversationFields}
      }
    }
    `,
  },
};
