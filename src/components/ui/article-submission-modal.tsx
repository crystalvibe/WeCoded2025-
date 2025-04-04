/**
 * Article Submission Modal Component
 * 
 * This component provides a modal interface for users to submit new articles.
 * It uses the theme's styling with improved contrast and visibility.
 */

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { publishArticle } from '@/lib/api';
import { useToast } from "@/hooks/use-toast";
import { Pen, Tag, FileText, Info } from "lucide-react";

/**
 * Props for the ArticleSubmissionModal component
 */
interface ArticleSubmissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ArticleSubmissionModal({ isOpen, onClose }: ArticleSubmissionModalProps) {
  // Track submission loading state
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Manage form data state
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    body_markdown: '',
    tags: '',
  });
  
  const { toast } = useToast();

  /**
   * Handles form submission
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await publishArticle({
        ...formData,
        published: true,
        tags: formData.tags.replace(/\s+/g, ',').trim(),
      });

      toast({
        title: "Success!",
        description: "Your article has been published successfully.",
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to publish article",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Handles form input changes
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-black border-2 border-[#4531EA] text-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold font-mono flex items-center gap-2">
            <Pen className="text-[#CCEA71]" />
            START YOUR STORY
          </DialogTitle>
          <DialogDescription className="text-gray-300">
            Share your knowledge with the community. Your story matters.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Title field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
              <Pen size={14} className="text-[#9D00E5]" /> Title
            </label>
            <Input
              name="title"
              placeholder="Enter a catchy title for your article"
              value={formData.title}
              onChange={handleChange}
              required
              className="bg-black/50 border-2 border-[#9D00E5] text-white placeholder:text-gray-400 focus-visible:ring-[#9D00E5]"
            />
          </div>

          {/* Description field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
              <Info size={14} className="text-[#CCEA71]" /> Brief Description
            </label>
            <Input
              name="description"
              placeholder="A short summary of what your article is about"
              value={formData.description}
              onChange={handleChange}
              required
              className="bg-black/50 border-2 border-[#CCEA71] text-white placeholder:text-gray-400 focus-visible:ring-[#CCEA71]"
            />
          </div>

          {/* Content field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
              <FileText size={14} className="text-[#4531EA]" /> Content (Markdown)
            </label>
            <Textarea
              name="body_markdown"
              placeholder="Write your story using Markdown formatting. You can use **bold**, *italic*, and other Markdown features."
              value={formData.body_markdown}
              onChange={handleChange}
              required
              className="min-h-[200px] bg-black/50 border-2 border-[#4531EA] text-white placeholder:text-gray-400 focus-visible:ring-[#4531EA]"
            />
          </div>

          {/* Tags field */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-200 flex items-center gap-2">
              <Tag size={14} className="text-[#9D00E5]" /> Tags
            </label>
            <Input
              name="tags"
              placeholder="Space separated: react javascript webdev"
              value={formData.tags}
              onChange={handleChange}
              required
              className="bg-black/50 border-2 border-[#9D00E5] text-white placeholder:text-gray-400 focus-visible:ring-[#9D00E5]"
            />
          </div>

          {/* Action buttons with improved visibility */}
          <div className="flex justify-end gap-4 pt-4">
            <Button
              type="button"
              onClick={onClose}
              variant="outline"
              className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-black"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-[#CCEA71] border-2 border-[#CCEA71] text-black font-bold hover:bg-[#CCEA71]/80"
            >
              {isSubmitting ? 'Publishing...' : 'Publish Story'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 