import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload, X, Image as ImageIcon, ArrowLeft } from "lucide-react";

function UploadPage() {
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const thumbnailRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [videoFile, setVideoFile] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [visibility, setVisibility] = useState("public");
  const [tags, setTags] = useState([]);
  const [tagInput, setTagInput] = useState("");
  const [ageRestricted, setAgeRestricted] = useState(false);
  const [thumbnails, setThumbnails] = useState([]);
  const [selectedThumbnail, setSelectedThumbnail] = useState(null);
  const [customThumbnail, setCustomThumbnail] = useState(null);
  const [errors, setErrors] = useState({});
  const [isPreview, setIsPreview] = useState(false);

  // Handle drag and drop
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  // Handle video file selection
  const handleVideo = async (file) => {
    if (file && file.type.startsWith("video/")) {
      setVideoFile(file);
      generateThumbnails(file);
    } else {
      setErrors((prev) => ({
        ...prev,
        video: "Please upload a valid video file",
      }));
    }
  };

  // Handle custom thumbnail upload
  const handleCustomThumbnail = (file) => {
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCustomThumbnail(e.target.result);
        setSelectedThumbnail(e.target.result);
      };
      reader.readAsDataURL(file);
    } else {
      setErrors((prev) => ({
        ...prev,
        thumbnail: "Please upload a valid image file",
      }));
    }
  };

  // Generate video thumbnails
  const generateThumbnails = (file) => {
    const video = document.createElement("video");
    video.src = URL.createObjectURL(file);
    video.addEventListener("loadeddata", () => {
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;

      // Generate thumbnails at different timestamps
      const timestamps = [0, 0.25, 0.5, 0.75].map((t) => t * video.duration);
      const newThumbnails = timestamps.map((time) => {
        video.currentTime = time;
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        return canvas.toDataURL("image/jpeg");
      });

      setThumbnails(newThumbnails);
      setSelectedThumbnail(newThumbnails[0]);
    });
  };

  // Handle tag input
  const handleTagInput = (e) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      const newTag = tagInput.trim();
      if (newTag && tags.length < 8 && !tags.includes(newTag)) {
        setTags([...tags, newTag]);
        setTagInput("");
      }
    }
  };

  // Remove tag
  const removeTag = (tagToRemove) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};

    if (!videoFile) {
      newErrors.video = "Please upload a video";
    }

    if (!title.trim()) {
      newErrors.title = "Title is required";
    } else if (title.length > 70) {
      newErrors.title = "Title must be 70 characters or less";
    }

    if (!description.trim()) {
      newErrors.description = "Description is required";
    }

    if (!selectedThumbnail) {
      newErrors.thumbnail = "Please select a thumbnail";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      if (!isPreview) {
        setIsPreview(true);
      } else {
        // Handle final upload logic here
        console.log({
          videoFile,
          title,
          description,
          visibility,
          tags,
          ageRestricted,
          thumbnail: selectedThumbnail,
        });
      }
    }
  };

  if (isPreview) {
    return (
      <div className="container max-w-3xl py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => setIsPreview(false)}
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h1 className="text-3xl font-bold">Preview Upload</h1>
        </div>

        <div className="space-y-6">
          {/* Video Preview */}
          <div className="aspect-video rounded-lg overflow-hidden bg-black">
            <video
              src={URL.createObjectURL(videoFile)}
              controls
              className="w-full h-full"
            />
          </div>

          {/* Thumbnail Preview */}
          <div>
            <h2 className="font-semibold mb-2">Thumbnail</h2>
            <div className="aspect-video w-48 rounded-lg overflow-hidden">
              <img
                src={selectedThumbnail}
                alt="Selected thumbnail"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Details Preview */}
          <div className="space-y-4">
            <div>
              <h2 className="font-semibold">Title</h2>
              <p>{title}</p>
            </div>

            <div>
              <h2 className="font-semibold">Description</h2>
              <p className="whitespace-pre-wrap">{description}</p>
            </div>

            <div>
              <h2 className="font-semibold">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-primary/10 text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-semibold">Visibility</h2>
              <p className="capitalize">{visibility}</p>
            </div>

            {ageRestricted && (
              <div>
                <h2 className="font-semibold">Age Restriction</h2>
                <p>This video is age-restricted (18+)</p>
              </div>
            )}
          </div>

          <Button type="button" className="w-full" onClick={handleSubmit}>
            Confirm Upload
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container max-w-3xl py-8">
      <h1 className="text-3xl font-bold mb-8">Upload Video</h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Video Upload */}
        {!videoFile ? (
          <div
            className={`border-2 border-dashed rounded-lg p-12 text-center ${
              dragActive ? "border-primary" : "border-border"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={(e) => {
              e.preventDefault();
              e.stopPropagation();
              setDragActive(false);
              const file = e.dataTransfer.files[0];
              handleVideo(file);
            }}
          >
            <input
              ref={videoRef}
              type="file"
              accept="video/*"
              className="hidden"
              onChange={(e) => handleVideo(e.target.files[0])}
            />
            <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
            <p className="text-lg mb-2">Drag and drop your video here or</p>
            <Button type="button" onClick={() => videoRef.current?.click()}>
              Select File
            </Button>
            {errors.video && (
              <p className="text-red-500 mt-2">{errors.video}</p>
            )}
          </div>
        ) : (
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">{videoFile.name}</span>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={() => setVideoFile(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>
        )}

        {/* Title */}
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            maxLength={70}
          />
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{title.length}/70</span>
            {errors.title && (
              <span className="text-red-500">{errors.title}</span>
            )}
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={4}
          />
          {errors.description && (
            <p className="text-red-500">{errors.description}</p>
          )}
        </div>

        {/* Thumbnails */}
        {thumbnails.length > 0 && (
          <div className="space-y-4">
            <div>
              <Label>Video Thumbnails</Label>
              <div className="grid grid-cols-4 gap-4 mt-2">
                {thumbnails.map((thumbnail, index) => (
                  <button
                    key={index}
                    type="button"
                    className={`relative aspect-video rounded-lg overflow-hidden border-2 ${
                      selectedThumbnail === thumbnail
                        ? "border-primary"
                        : "border-border"
                    }`}
                    onClick={() => setSelectedThumbnail(thumbnail)}
                  >
                    <img
                      src={thumbnail}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            <div>
              <Label>Custom Thumbnail</Label>
              <div className="mt-2">
                <input
                  ref={thumbnailRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => handleCustomThumbnail(e.target.files[0])}
                />
                {customThumbnail ? (
                  <div className="relative aspect-video w-48 rounded-lg overflow-hidden border-2 border-border">
                    <img
                      src={customThumbnail}
                      alt="Custom thumbnail"
                      className="w-full h-full object-cover"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="icon"
                      className="absolute top-2 right-2"
                      onClick={() => {
                        setCustomThumbnail(null);
                        setSelectedThumbnail(thumbnails[0]);
                      }}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </div>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => thumbnailRef.current?.click()}
                  >
                    <ImageIcon className="w-4 h-4 mr-2" />
                    Upload Thumbnail
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Tags */}
        <div className="space-y-2">
          <Label htmlFor="tags">Tags (max 8)</Label>
          <div className="flex flex-wrap gap-2 mb-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-sm"
              >
                {tag}
                <button
                  type="button"
                  className="ml-2"
                  onClick={() => removeTag(tag)}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <Input
            id="tags"
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={handleTagInput}
            placeholder="Add tags (press Enter or comma to add)"
            disabled={tags.length >= 8}
          />
        </div>

        {/* Visibility */}
        <div className="space-y-2">
          <Label>Visibility</Label>
          <Select value={visibility} onValueChange={setVisibility}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="public">Public</SelectItem>
              <SelectItem value="unlisted">Unlisted</SelectItem>
              <SelectItem value="private">Private</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Age Restriction */}
        <div className="flex items-center space-x-2">
          <Checkbox
            id="ageRestriction"
            checked={ageRestricted}
            onCheckedChange={setAgeRestricted}
          />
          <Label htmlFor="ageRestriction">
            Age-restrict this video (18+ content)
          </Label>
        </div>

        {/* Submit Button */}
        <Button type="submit" className="w-full">
          Continue
        </Button>
      </form>
    </div>
  );
}

export default UploadPage;
