import { motion } from 'framer-motion';
import { IconType } from 'react-icons';
import { FaChartLine, FaBuilding, FaStore, FaPlane } from 'react-icons/fa'

interface ServiceCardProps {
  title: string
  description: string
  icon: string
}

const icons: { [key: string]: IconType } = {
  chart: FaChartLine,
  building: FaBuilding,
  shop: FaStore,
  plane: FaPlane,
}

export default function ServiceCard({ title, description, icon }: ServiceCardProps) {
  const Icon = icons[icon]

  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-lg shadow-md"
    >
      <div className="text-primary text-3xl mb-4">
        <Icon />
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  )
}