import { useState, useRef, useEffect } from "react";
import { Smile, Send, User } from "lucide-react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import useCommentsStore from "@/store/useCommentsStore";
import { useAuth } from "@/contexts/AuthContext";

export default function CommentForm({ videoId, parentId, onCancel }) {
  const [content, setContent] = useState("");
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [showMentions, setShowMentions] = useState(false);
  const [cursorPosition, setCursorPosition] = useState(0);
  const textareaRef = useRef(null);
  const { addComment } = useCommentsStore();
  const { user } = useAuth();

  // Dummy users for mentions (replace with actual users data)
  const users = [
    { id: "1", username: "john_doe", name: "John Doe" },
    { id: "2", username: "jane_smith", name: "Jane Smith" },
  ];

  const handleEmojiSelect = (emoji) => {
    const start = content.slice(0, cursorPosition);
    const end = content.slice(cursorPosition);
    const newContent = start + emoji.native + end;
    setContent(newContent);
    setShowEmojiPicker(false);
  };

  const handleMentionSelect = (user) => {
    const start = content.slice(0, cursorPosition);
    const end = content.slice(cursorPosition);
    const mention = `@${user.username} `;
    const newContent = start + mention + end;
    setContent(newContent);
    setShowMentions(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "@") {
      setShowMentions(true);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    addComment(videoId, content, parentId);
    setContent("");
    onCancel?.();
  };

  useEffect(() => {
    if (textareaRef.current) {
      setCursorPosition(textareaRef.current.selectionStart);
    }
  }, [content]);

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-4">
        <Avatar>
          <User className="h-5 w-5" />
        </Avatar>
        <div className="flex-1">
          <Textarea
            ref={textareaRef}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Add a comment..."
            className="min-h-[100px]"
          />
          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-2">
              <Popover open={showEmojiPicker} onOpenChange={setShowEmojiPicker}>
                <PopoverTrigger asChild>
                  <Button
                    type="button"
                    size="sm"
                    variant="ghost"
                    className="h-8 w-8 p-0"
                  >
                    <Smile className="h-4 w-4" />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Picker
                    data={data}
                    onEmojiSelect={handleEmojiSelect}
                    theme="light"
                  />
                </PopoverContent>
              </Popover>

              <Popover open={showMentions} onOpenChange={setShowMentions}>
                <PopoverContent className="w-64" align="start">
                  <div className="space-y-1">
                    {users.map((user) => (
                      <Button
                        key={user.id}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => handleMentionSelect(user)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        {user.name}
                        <span className="text-muted-foreground ml-2">
                          @{user.username}
                        </span>
                      </Button>
                    ))}
                  </div>
                </PopoverContent>
              </Popover>
            </div>

            <div className="flex gap-2">
              {onCancel && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={onCancel}
                >
                  Cancel
                </Button>
              )}
              <Button type="submit" size="sm">
                <Send className="h-4 w-4 mr-2" />
                Comment
              </Button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
