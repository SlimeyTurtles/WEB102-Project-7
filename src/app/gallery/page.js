'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';

export default function Gallery() {
  const [crewmates, setCrewmates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCrewmates();
  }, []);

  const fetchCrewmates = async () => {
    try {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching crewmates:', error);
      } else {
        setCrewmates(data || []);
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSpeedLabel = (speed) => {
    const speedMap = {
      1: 'Slow',
      2: 'Normal', 
      3: 'Fast',
      4: 'Lightning'
    };
    return speedMap[speed] || 'Unknown';
  };

  const getColorEmoji = (color) => {
    const colorEmojis = {
      'Red': '🔴',
      'Blue': '🔵',
      'Green': '🟢',
      'Pink': '🩷',
      'Orange': '🟠',
      'Yellow': '🟡',
      'Black': '⚫',
      'White': '⚪',
      'Purple': '🟣',
      'Brown': '🤎',
      'Cyan': '🩵',
      'Lime': '🟢'
    };
    return colorEmojis[color] || '🔘';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div 
          className="text-gray-600 text-xl font-light"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading crewmates...
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="mb-8 flex items-center justify-between"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link 
            href="/" 
            className="text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-2 font-medium"
          >
            ← Back to Home
          </Link>
          <Link href="/create">
            <motion.div
              className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Create New Crewmate
            </motion.div>
          </Link>
        </motion.div>

        <motion.h1 
          className="text-4xl font-light text-gray-900 mb-12 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          Crewmate Gallery
        </motion.h1>

        {crewmates.length === 0 ? (
          <motion.div 
            className="text-center py-16"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            <div className="text-6xl mb-4">○</div>
            <h2 className="text-2xl text-gray-900 mb-4 font-light">No crewmates yet</h2>
            <p className="text-gray-600 mb-8 font-light">Create your first crewmate to get started.</p>
            <Link href="/create">
              <motion.div
                className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Create Your First Crewmate
              </motion.div>
            </Link>
          </motion.div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            {crewmates.map((crewmate, index) => (
              <motion.div
                key={crewmate.id}
                className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -4, scale: 1.02 }}
              >
                <div className="text-center mb-4">
                  <div className="text-3xl mb-2">{getColorEmoji(crewmate.color)}</div>
                  <h3 className="text-xl font-medium text-gray-900 mb-2">{crewmate.name}</h3>
                </div>

                <div className="space-y-2 mb-6 text-sm">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Speed:</span>
                    <span className="text-gray-900 font-medium">{getSpeedLabel(crewmate.speed)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Color:</span>
                    <span className="text-gray-900 font-medium">{crewmate.color}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Ability:</span>
                    <span className="text-gray-900 font-medium">{crewmate.special_ability}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-500">Created:</span>
                    <span className="text-gray-900 font-medium">
                      {new Date(crewmate.created_at).toLocaleDateString()}
                    </span>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Link href={`/crewmate/${crewmate.id}`} className="flex-1">
                    <motion.div
                      className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-2 px-4 rounded-lg text-center transition-colors text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Details
                    </motion.div>
                  </Link>
                  <Link href={`/edit/${crewmate.id}`} className="flex-1">
                    <motion.div
                      className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-2 px-4 rounded-lg text-center transition-colors text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Edit
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}