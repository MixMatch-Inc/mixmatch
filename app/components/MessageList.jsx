'use client';

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { fetchCurrentUser, fetchUserMessages } from '@/lib/data';

export function MessageList({ filter }) {
  const [conversations, setConversations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUserId, setSelectedUserId] = useState(null);

  useEffect(() => {
    const loadConversations = async () => {
      try {
        const currentUser = await fetchCurrentUser();

        if (!currentUser) {
          setLoading(false);
          return;
        }

        const messages = await fetchUserMessages(currentUser.id);

        const conversationMap = new Map();

        messages.forEach((message) => {
          const partnerId =
            message.senderId === currentUser.id
              ? message.receiverId
              : message.senderId;

          if (!conversationMap.has(partnerId)) {
            conversationMap.set(partnerId, []);
          }

          conversationMap.get(partnerId).push(message);
        });

        const conversationList = Array.from(conversationMap.entries()).map(
          ([userId, messages]) => {
            const sortedMessages = [...messages].sort(
              (a, b) =>
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            );

            const lastMessage = sortedMessages[0];
            const partner =
              lastMessage.senderId === currentUser.id
                ? lastMessage.receiver
                : lastMessage.sender;
            const unreadCount = sortedMessages.filter(
              (msg) => msg.receiverId === currentUser.id && !msg.read
            ).length;

            return {
              user: partner,
              lastMessage,
              unreadCount,
            };
          }
        );

        const filteredConversations =
          filter === 'unread'
            ? conversationList.filter((conv) => conv.unreadCount > 0)
            : conversationList;

        filteredConversations.sort(
          (a, b) =>
            new Date(b.lastMessage.createdAt).getTime() -
            new Date(a.lastMessage.createdAt).getTime()
        );

        setConversations(filteredConversations);

        if (filteredConversations.length > 0 && !selectedUserId) {
          setSelectedUserId(filteredConversations[0].user.id);
        }
      } catch (error) {
        console.error('Failed to load conversations:', error);
      } finally {
        setLoading(false);
      }
    };

    loadConversations();
  }, [filter, selectedUserId]);

  if (loading) {
    return <div className="p-4">Loading conversations...</div>;
  }

  if (conversations.length === 0) {
    return (
      <div className="p-4 text-center text-muted-foreground">
        {filter === 'all' ? 'No conversations found' : 'No unread messages'}
      </div>
    );
  }

  return (
    <ScrollArea className="h-full">
      <div className="divide-y">
        {conversations.map((conversation) => (
          <button
            key={conversation.user.id}
            className={`w-full text-left p-4 hover:bg-muted/50 transition-colors ${
              selectedUserId === conversation.user.id ? 'bg-muted' : ''
            }`}
            onClick={() => setSelectedUserId(conversation.user.id)}
          >
            <div className="flex items-start gap-3">
              <Avatar>
                <AvatarImage
                  src={conversation.user.image}
                  alt={conversation.user.name}
                />
                <AvatarFallback>
                  {conversation.user.name
                    .split(' ')
                    .map((n) => n[0])
                    .join('')
                    .toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div className="font-medium truncate">
                    {conversation.user.name}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {new Date(
                      conversation.lastMessage.createdAt
                    ).toLocaleDateString()}
                  </div>
                </div>

                <div className="text-sm truncate text-muted-foreground">
                  {conversation.lastMessage.senderId === conversation.user.id
                    ? ''
                    : 'You: '}
                  {conversation.lastMessage.content}
                </div>

                {conversation.unreadCount > 0 && (
                  <div className="mt-1">
                    <Badge variant="default" className="text-xs">
                      {conversation.unreadCount} new
                    </Badge>
                  </div>
                )}
              </div>
            </div>
          </button>
        ))}
      </div>
    </ScrollArea>
  );
}
