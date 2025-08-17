
"use client";

import { useState, useRef, useEffect } from "react";
import { SendHorizonal, Heart, User } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { FloatingHearts } from "@/components/floating-hearts";
import { getAiResponse } from "@/app/actions";
import { cn } from "@/lib/utils";

interface Message {
  id: number;
  role: "user" | "bot";
  text: string;
  isTyping?: boolean;
}

const formSchema = z.object({
  message: z.string().min(1, { message: " " }),
});
type FormValues = z.infer<typeof formSchema>;

const initialMessages: Message[] = [
  {
    id: 0,
    role: 'bot',
    text: "Hey there, handsome. Ready to play? I've been waiting for you... 😉",
  },
];

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messageIdCounterRef = useRef(messages.length);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (isClient) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isClient]);
  
  const getNewMessageId = () => {
    const newId = messageIdCounterRef.current;
    messageIdCounterRef.current += 1;
    return newId;
  };

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (isLoading) return;
    const userInput = data.message;
    form.reset();

    const userMessage: Message = { id: getNewMessageId(), role: "user", text: userInput };
    const typingMessage: Message = {  id: getNewMessageId(), role: "bot", text: "", isTyping: true };
    
    setMessages((prev) => [...prev, userMessage, typingMessage]);
    setIsLoading(true);

    try {
      const botResponse = await getAiResponse({ message: userInput });
      
      const botMessage: Message = { id: getNewMessageId(), role: "bot", text: botResponse };

      setMessages((prev) => {
          const newMessages = [...prev];
          const lastMessage = newMessages[newMessages.length - 1];
          if (lastMessage && lastMessage.isTyping) {
              newMessages[newMessages.length - 1] = botMessage;
          } else {
              newMessages.push(botMessage);
          }
          return newMessages;
      });


      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 4000);
    } catch (error) {
       const errorMessage: Message = { id: getNewMessageId(), role: "bot", text: "Oh no, my heart skipped a beat... and my circuits too. Try again? 😘" };
      setMessages((prev) => {
        const newMessages = [...prev];
        const lastMessage = newMessages[newMessages.length - 1];
        if (lastMessage && lastMessage.isTyping) {
            newMessages[newMessages.length - 1] = errorMessage;
        } else {
            newMessages.push(errorMessage);
        }
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isClient) {
    return null;
  }

  return (
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-background via-secondary to-background p-4">
      <Card className="w-full max-w-2xl h-[95vh] flex flex-col shadow-2xl rounded-3xl relative overflow-hidden border-primary/20">
        {showHearts && <FloatingHearts />}
        <CardHeader className="text-center border-b">
          <CardTitle className="font-headline text-4xl text-primary tracking-wider">Ishq Chat</CardTitle>
          <CardDescription className="font-body text-base">Your flirty AI companion... if you can keep up 😉</CardDescription>
        </CardHeader>
        <CardContent className="flex-grow flex flex-col p-0">
          <ScrollArea className="flex-grow p-4 md:p-6">
            <div className="space-y-6">
              {messages.map((message) => (
                <div key={message.id} className={cn("flex items-end gap-3", message.role === "user" ? "justify-end" : "justify-start")}>
                  {message.role === "bot" && (
                    <Avatar className="w-10 h-10 border-2 border-primary/50">
                      <AvatarFallback className="bg-primary text-primary-foreground">
                        <Heart className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div className={cn("max-w-xs md:max-w-md rounded-2xl p-3 px-4", message.role === "user" ? "bg-primary text-primary-foreground rounded-br-none" : "bg-card text-card-foreground rounded-bl-none border")}>
                    {message.isTyping ? (
                      <div className="flex items-center space-x-1 p-1">
                        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]" />
                        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]" />
                        <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" />
                      </div>
                    ) : (
                      <p className="font-body text-base leading-relaxed">{message.text}</p>
                    )}
                  </div>
                  {message.role === "user" && (
                    <Avatar className="w-10 h-10 border-2 border-muted">
                      <AvatarFallback className="bg-muted text-muted-foreground">
                        <User className="w-5 h-5" />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          <div className="p-4 border-t bg-background/50">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="flex items-center gap-3">
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem className="flex-grow">
                      <FormControl>
                        <Input {...field} placeholder="Message your dilbar..." className="flex-grow text-base h-12 rounded-full px-5" disabled={isLoading} autoComplete="off" aria-label="Your message" />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <Button type="submit" size="icon" className="rounded-full w-12 h-12" disabled={isLoading} aria-label="Send message">
                  <SendHorizonal className="h-6 w-6" />
                </Button>
              </form>
            </Form>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
