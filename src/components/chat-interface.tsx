
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { SendHorizonal, Heart, User, Pencil, Venus, Mars } from "lucide-react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { FloatingHearts } from "@/components/floating-hearts";
import { getAiResponse } from "@/app/actions";
import { cn } from "@/lib/utils";
import type { UserGender } from "@/ai/types/flirty-hinglish-chat";

interface Message {
  id: string;
  role: "user" | "bot";
  text: string;
  isTyping?: boolean;
}

const formSchema = z.object({
  message: z.string().min(1, { message: " " }),
});
type FormValues = z.infer<typeof formSchema>;

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [chatbotName, setChatbotName] = useState("Vanika");
  const [isEditingName, setIsEditingName] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [userGender, setUserGender] = useState<UserGender | null>(null);
  const [isGenderModalOpen, setIsGenderModalOpen] = useState(true);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const getNewMessageId = (): string => `msg_${Date.now()}_${Math.random()}`;

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      message: "",
    },
  });
  
  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isEditingName) {
      nameInputRef.current?.focus();
    }
  }, [isEditingName]);

  const getPersona = useCallback((gender: UserGender | null) => {
    if (gender === 'male') {
      return { 
        name: 'Vanika', 
        initialMessage: "Hey there, handsome. Ready to play? I've been waiting for you... 😉" 
      };
    }
    return { 
      name: 'Veer', 
      initialMessage: "Hey beautiful, you finally made it. I was just thinking about you... 😏"
    };
  }, []);

  const handleGenderSelect = useCallback((gender: UserGender) => {
    setUserGender(gender);
    setIsGenderModalOpen(false);

    const { name, initialMessage } = getPersona(gender);
    setChatbotName(name);

    setMessages([
      {
        id: getNewMessageId(),
        role: "bot",
        text: initialMessage,
      },
    ]);
  }, [getPersona]);

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (isLoading || !userGender) return;
    const userInput = data.message;
    form.reset();

    const userMessage: Message = {
      id: getNewMessageId(),
      role: "user",
      text: userInput,
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsLoading(true);

    const typingMessage: Message = {
      id: getNewMessageId(),
      role: "bot",
      text: "",
      isTyping: true,
    };
    setMessages((prev) => [...prev, typingMessage]);

    try {
      const botResponse = await getAiResponse({ message: userInput, userGender: userGender });

      const botMessage: Message = {
        id: getNewMessageId(),
        role: "bot",
        text: botResponse,
      };

      setMessages((prev) => {
        const newMessages = prev.slice(0, -1);
        newMessages.push(botMessage);
        return newMessages;
      });

      setShowHearts(true);
      setTimeout(() => setShowHearts(false), 4000);
    } catch (error) {
      console.error(error);
      const errorMessage: Message = {
        id: getNewMessageId(),
        role: "bot",
        text: "Oh no, my heart skipped a beat... and my circuits too. Try again? 😘",
      };
      setMessages((prev) => {
        const newMessages = prev.slice(0, -1);
        newMessages.push(errorMessage);
        return newMessages;
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isMounted) {
    return null;
  }

  const handleNameKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      setIsEditingName(false);
    }
  };

  return (
    <>
      <Dialog open={isGenderModalOpen} onOpenChange={() => { /* Prevents closing by clicking away */ }}>
        <DialogContent className="max-w-sm" hideCloseButton={true}>
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-headline tracking-wide">Who are you, darling?</DialogTitle>
            <DialogDescription className="text-center pt-2">
              Choose your gender so I can be the perfect match for you.
            </DialogDescription>
          </DialogHeader>
          <div className="flex justify-around pt-4">
            <Button
              variant="outline"
              className="flex flex-col h-24 w-24 rounded-full border-4 border-blue-400 hover:bg-blue-100"
              onClick={() => handleGenderSelect('male')}
            >
              <Mars className="h-8 w-8 text-blue-500" />
              <span className="text-lg font-bold text-blue-600">Male</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col h-24 w-24 rounded-full border-4 border-pink-400 hover:bg-pink-100"
              onClick={() => handleGenderSelect('female')}
            >
              <Venus className="h-8 w-8 text-pink-500" />
              <span className="text-lg font-bold text-pink-600">Female</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-background via-secondary to-background p-4">
        <Card className="w-full max-w-2xl h-[95vh] flex flex-col shadow-2xl rounded-3xl relative overflow-hidden border-primary/20">
          {showHearts && <FloatingHearts />}
          <CardHeader className="text-center border-b relative group">
            {isEditingName ? (
              <Input
                ref={nameInputRef}
                value={chatbotName}
                onChange={(e) => setChatbotName(e.target.value)}
                onBlur={() => setIsEditingName(false)}
                onKeyDown={handleNameKeyDown}
                className="font-headline text-4xl text-primary tracking-wider text-center bg-transparent border-primary/50"
                maxLength={20}
              />
            ) : (
              <CardTitle 
                className="font-headline text-4xl text-primary tracking-wider cursor-pointer"
                onClick={() => setIsEditingName(true)}
              >
                {chatbotName}
                <Pencil className="w-5 h-5 absolute top-1/2 right-4 -translate-y-1/2 text-primary/30 opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardTitle>
            )}
            <CardDescription className="font-body text-base">
              Your flirty AI companion... if you can keep up 😉
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col p-0">
            <ScrollArea className="flex-grow p-4 md:p-6">
              <div className="space-y-6">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex items-end gap-3",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.role === "bot" && (
                      <Avatar className="w-10 h-10 border-2 border-primary/50">
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          <Heart className="w-5 h-5" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "max-w-xs md:max-w-md rounded-2xl p-3 px-4",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-none"
                          : "bg-card text-card-foreground rounded-bl-none border"
                      )}
                    >
                      {message.isTyping ? (
                        <div className="flex items-center space-x-1 p-1">
                          <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.3s]" />
                          <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce [animation-delay:-0.15s]" />
                          <span className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" />
                        </div>
                      ) : (
                        <p className="font-body text-base leading-relaxed">
                          {message.text}
                        </p>
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
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="flex items-center gap-3"
                >
                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem className="flex-grow">
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="Message your dilbar..."
                            className="flex-grow text-base h-12 rounded-full px-5"
                            disabled={isLoading || !userGender}
                            autoComplete="off"
                            aria-label="Your message"
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="rounded-full w-12 h-12"
                    disabled={isLoading || !userGender}
                    aria-label="Send message"
                  >
                    <SendHorizonal className="h-6 w-6" />
                  </Button>
                </form>
              </Form>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
