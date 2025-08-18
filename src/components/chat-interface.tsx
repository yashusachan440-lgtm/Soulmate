
"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { SendHorizonal, User, Pencil, Venus, Mars, Heart } from "lucide-react";
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
  CardFooter,
} from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
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

interface Persona {
  name: string;
  initialMessage: string;
  avatarUrl: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showHearts, setShowHearts] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [chatbotPersona, setChatbotPersona] = useState<Persona | null>(null);
  const [isEditingName, setIsEditingName] = useState(false);
  const nameInputRef = useRef<HTMLInputElement>(null);
  const [userGender, setUserGender] = useState<UserGender | null>(null);
  const [isGenderModalOpen, setIsGenderModalOpen] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);

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

  const getPersona = useCallback((gender: UserGender | null): Persona => {
    if (gender === 'male') {
      return { 
        name: 'Vanika', 
        initialMessage: "Hey there, handsome. Ready to play? I've been waiting for you... 😉",
        avatarUrl: "https://placehold.co/128x128.png",
      };
    }
    return { 
      name: 'Veer', 
      initialMessage: "Hey beautiful, you finally made it. I was just thinking about you... 😏",
      avatarUrl: "https://placehold.co/128x128.png",
    };
  }, []);

  const handleGenderSelect = useCallback((gender: UserGender) => {
    setUserGender(gender);
    setIsGenderModalOpen(false);

    const persona = getPersona(gender);
    setChatbotPersona(persona);

    setMessages([
      {
        id: getNewMessageId(),
        role: "bot",
        text: persona.initialMessage,
      },
    ]);
  }, [getPersona]);

  const handleAvatarUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && chatbotPersona) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newAvatarUrl = e.target?.result as string;
        setChatbotPersona({ ...chatbotPersona, avatarUrl: newAvatarUrl });
      };
      reader.readAsDataURL(file);
    }
  };


  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    if (isLoading || !userGender || !chatbotPersona) return;
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
      const botResponse = await getAiResponse({ 
        message: userInput, 
        userGender,
        chatbotName: chatbotPersona.name,
      });

      const botMessage: Message = {
        id: getNewMessageId(),
        role: "bot",
        text: botResponse,
      };

      setMessages((prev) => {
        const newMessages = prev.filter(m => !m.isTyping);
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
        text: "Oops! Thoda sa technical glitch ho gaya, my love. Try again? 😘",
      };
      setMessages((prev) => {
        const newMessages = prev.filter(m => !m.isTyping);
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
  
  const handleNameChange = (newName: string) => {
    if (chatbotPersona) {
      setChatbotPersona({...chatbotPersona, name: newName});
    }
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
              className="flex flex-col h-24 w-24 rounded-full border-4 border-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900/50"
              onClick={() => handleGenderSelect('male')}
            >
              <Mars className="h-8 w-8 text-blue-500" />
              <span className="text-lg font-bold text-blue-600 dark:text-blue-400">Male</span>
            </Button>
            <Button
              variant="outline"
              className="flex flex-col h-24 w-24 rounded-full border-4 border-pink-400 hover:bg-pink-100 dark:hover:bg-pink-900/50"
              onClick={() => handleGenderSelect('female')}
            >
              <Venus className="h-8 w-8 text-pink-500" />
              <span className="text-lg font-bold text-pink-600 dark:text-pink-400">Female</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
      
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleAvatarChange}
        className="hidden"
        accept="image/*"
      />

      <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-pink-100 via-rose-100 to-violet-200 dark:from-gray-900 dark:via-purple-900/30 dark:to-gray-900 p-4">
        <Card className="w-full max-w-2xl h-[95vh] flex flex-col shadow-2xl rounded-3xl relative overflow-hidden border-primary/20 bg-card/80 dark:bg-card/60 backdrop-blur-xl">
          {showHearts && <FloatingHearts />}
          <CardHeader className="text-center border-b relative group flex-shrink-0 bg-card/50 backdrop-blur-sm">
            <div className="flex items-center justify-center gap-3">
              {chatbotPersona?.avatarUrl && (
                <Avatar 
                  className="w-10 h-10 border-2 border-primary/50 cursor-pointer"
                  onClick={handleAvatarUploadClick}
                  title="Click to change avatar"
                >
                  <AvatarImage 
                    src={chatbotPersona.avatarUrl} 
                    alt={chatbotPersona.name}
                    data-ai-hint={userGender === 'male' ? "indian girl" : "indian man"}
                  />
                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {chatbotPersona?.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              )}
              {isEditingName ? (
                <Input
                  ref={nameInputRef}
                  value={chatbotPersona?.name || ''}
                  onChange={(e) => handleNameChange(e.target.value)}
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
                  {chatbotPersona?.name}
                  <Pencil className="w-5 h-5 absolute top-1/2 right-4 -translate-y-1/2 text-primary/30 opacity-0 group-hover:opacity-100 transition-opacity" />
                </CardTitle>
              )}
            </div>
            <CardDescription className="font-body text-base">
              Your flirty AI companion... if you can keep up 😉
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow flex flex-col p-0 overflow-hidden">
            <ScrollArea className="flex-grow p-4 md:p-6">
              <div className="space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={cn(
                      "flex items-end gap-2.5",
                      message.role === "user" ? "justify-end" : "justify-start"
                    )}
                  >
                    {message.role === "bot" && (
                       <Avatar className="w-9 h-9 border-2 border-primary/50">
                        {chatbotPersona?.avatarUrl && (
                          <AvatarImage 
                            src={chatbotPersona.avatarUrl} 
                            alt={chatbotPersona.name} 
                            data-ai-hint={userGender === 'male' ? "indian girl" : "indian man"}
                          />
                        )}
                        <AvatarFallback className="bg-primary text-primary-foreground">
                          {chatbotPersona?.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div
                      className={cn(
                        "max-w-xs md:max-w-md rounded-2xl p-3 px-4 shadow-md",
                        message.role === "user"
                          ? "bg-primary text-primary-foreground rounded-br-lg"
                          : "bg-card text-card-foreground rounded-bl-lg border"
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
                      <Avatar className="w-9 h-9 border-2 border-muted">
                        <AvatarFallback className="bg-muted text-muted-foreground">
                          <User className="w-4 h-4" />
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>
            </ScrollArea>
            <div className="p-4 border-t bg-card/50 backdrop-blur-sm flex-shrink-0">
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
                            placeholder="Message your companion..."
                            className="flex-grow text-base h-12 rounded-full px-5 bg-background/70 focus:bg-background"
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
                    className="rounded-full w-12 h-12 flex-shrink-0"
                    disabled={isLoading || !userGender}
                    aria-label="Send message"
                  >
                    <SendHorizonal className="h-6 w-6" />
                  </Button>
                </form>
              </Form>
            </div>
          </CardContent>
          <CardFooter className="justify-center items-center p-2 border-t bg-card/50 backdrop-blur-sm">
             <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                Made with <Heart className="w-3 h-3 text-red-500" /> by
                <a
                  href="https://www.linkedin.com/in/myselfdivyanshsingh?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Divyansh
                </a>
                &
                <a
                  href="https://www.linkedin.com/in/myselfswastikmishra?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Swastik
                </a>
                .
              </p>
          </CardFooter>
        </Card>
      </div>
    </>
  );
}
