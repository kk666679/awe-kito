import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Send, Paperclip } from "lucide-react"

export function ClientChat() {
  const conversations = [
    {
      id: 1,
      client: "TechCorp Inc.",
      avatar: "TC",
      lastMessage: "The animation looks great! Can we adjust the timing?",
      time: "2m ago",
      unread: 2,
      online: true,
    },
    {
      id: 2,
      client: "StartupXYZ",
      avatar: "SX",
      lastMessage: "Ready for final review",
      time: "1h ago",
      unread: 0,
      online: false,
    },
    {
      id: 3,
      client: "BigCorp Ltd.",
      avatar: "BC",
      lastMessage: "When can we schedule the kickoff call?",
      time: "3h ago",
      unread: 1,
      online: true,
    },
  ]

  const messages = [
    {
      id: 1,
      sender: "TechCorp Inc.",
      message: "Hi! I've reviewed the latest version of the animation.",
      time: "10:30 AM",
      isClient: true,
    },
    {
      id: 2,
      sender: "You",
      message: "Great! What are your thoughts?",
      time: "10:32 AM",
      isClient: false,
    },
    {
      id: 3,
      sender: "TechCorp Inc.",
      message: "The animation looks fantastic! Can we adjust the timing on the product reveal to be slightly slower?",
      time: "10:35 AM",
      isClient: true,
    },
  ]

  return (
    <Card className="glass-border h-[600px] flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-base text-foreground">Client Communication</CardTitle>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col space-y-4">
        {/* Conversation List */}
        <div className="space-y-2">
          {conversations.map((conv) => (
            <div
              key={conv.id}
              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-muted/50 cursor-pointer transition-colors"
            >
              <div className="relative">
                <Avatar className="h-8 w-8">
                  <AvatarFallback>{conv.avatar}</AvatarFallback>
                </Avatar>
                {conv.online && (
                  <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-chart-3 rounded-full border-2 border-background"></div>
                )}
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-foreground truncate">{conv.client}</p>
                  <span className="text-xs text-muted-foreground">{conv.time}</span>
                </div>
                <p className="text-xs text-muted-foreground truncate">{conv.lastMessage}</p>
              </div>

              {conv.unread > 0 && <Badge className="bg-accent text-accent-foreground">{conv.unread}</Badge>}
            </div>
          ))}
        </div>

        {/* Active Chat */}
        <div className="flex-1 flex flex-col border-t border-border pt-4">
          <div className="flex-1 space-y-3 overflow-y-auto">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.isClient ? "justify-start" : "justify-end"}`}>
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    msg.isClient ? "bg-muted text-foreground" : "bg-accent text-accent-foreground"
                  }`}
                >
                  <p>{msg.message}</p>
                  <span className="text-xs opacity-70 mt-1 block">{msg.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <div className="flex items-center space-x-2 mt-4">
            <Button variant="ghost" size="sm">
              <Paperclip className="h-4 w-4" />
            </Button>
            <Input placeholder="Type a message..." className="flex-1" />
            <Button size="sm" className="bg-accent text-accent-foreground hover:bg-accent/90">
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
