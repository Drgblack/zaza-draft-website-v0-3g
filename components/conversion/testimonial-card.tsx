import { Star, Quote } from "lucide-react";
import Image from "next/image";

interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  rating?: number;
  image?: string;
}

export function TestimonialCard({
  quote,
  author,
  role,
  rating = 5,
  image,
}: TestimonialCardProps) {
  return (
    <div className="bg-[#1E293B] border border-white/10 rounded-xl p-8 hover:border-[#8B5CF6]/50 transition-all">
      <div className="flex items-center gap-1 mb-4">
        {Array.from({ length: rating }).map((_, i) => (
          <Star key={i} className="w-5 h-5 text-yellow-400 fill-yellow-400" />
        ))}
      </div>
      <Quote className="w-8 h-8 text-[#8B5CF6]/30 mb-4" />
      <p className="text-gray-300 leading-relaxed mb-6 italic">{quote}</p>
      <div className="flex items-center gap-4">
        {image && image.startsWith("/images/") ? (
          <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-[#8B5CF6]/30">
            <Image
              src={image}
              alt={author}
              width={48}
              height={48}
              className="object-cover"
            />
          </div>
        ) : (
          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#8B5CF6] to-[#A78BFA] flex items-center justify-center text-white font-bold">
            {image ||
              author
                .split(" ")
                .map((n) => n[0])
                .join("")}
          </div>
        )}
        <div>
          <div className="font-semibold text-white">{author}</div>
          <div className="text-sm text-gray-400">{role}</div>
        </div>
      </div>
    </div>
  );
}
