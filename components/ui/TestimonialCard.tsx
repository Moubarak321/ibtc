import { motion } from 'framer-motion';
import Image from 'next/image';

interface TestimonialCardProps {
  name: string
  role: string
  content: string
  image: string
}

export default function TestimonialCard({
  name,
  role,
  content,
  image,
}: TestimonialCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <div className="flex items-center mb-4">
        <div className="relative w-12 h-12 rounded-full overflow-hidden">
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <div className="ml-4">
          <h4 className="font-semibold">{name}</h4>
          <p className="text-sm text-gray-600">{role}</p>
        </div>
      </div>
      <p className="text-gray-600 italic">{content}</p>
    </motion.div>
  )
}