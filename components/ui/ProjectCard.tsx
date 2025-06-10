import { motion } from 'framer-motion';
import Image from 'next/image';

interface ProjectCardProps {
  title: string
  category: string
  image: string
}

export default function ProjectCard({ title, category, image }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-lg shadow-md overflow-hidden"
    >
      <div className="relative h-48">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover"
        />
      </div>
      <div className="p-4">
        <span className="text-sm text-primary font-medium">{category}</span>
        <h3 className="text-xl font-semibold mt-1">{title}</h3>
      </div>
    </motion.div>
  )
}