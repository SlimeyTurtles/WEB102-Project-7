'use client';

import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <motion.div 
        className="max-w-4xl mx-auto text-center"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.h1 
          className="text-5xl font-light text-gray-900 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          Crewmate Creator
        </motion.h1>
        <motion.p 
          className="text-lg text-gray-600 mb-12 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          Build and manage your space crew
        </motion.p>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.8 }}
        >
          <Link href="/create">
            <motion.div
              className="bg-white border border-gray-200 hover:border-gray-300 text-gray-900 font-medium py-8 px-6 rounded-lg transition-all shadow-sm hover:shadow-md"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-2xl mb-2">+</div>
              <div>Create New Crewmate</div>
            </motion.div>
          </Link>
          
          <Link href="/gallery">
            <motion.div
              className="bg-white border border-gray-200 hover:border-gray-300 text-gray-900 font-medium py-8 px-6 rounded-lg transition-all shadow-sm hover:shadow-md"
              whileHover={{ y: -2, scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="text-2xl mb-2">⋮⋮⋮</div>
              <div>View Gallery</div>
            </motion.div>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
}
