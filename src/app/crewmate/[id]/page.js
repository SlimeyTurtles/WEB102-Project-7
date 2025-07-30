'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { supabase } from '../../../lib/supabase';

export default function CrewmateDetail() {
  const params = useParams();
  const [crewmate, setCrewmate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (params.id) {
      fetchCrewmate();
    }
  }, [params.id]);

  const fetchCrewmate = async () => {
    try {
      const { data, error } = await supabase
        .from('crewmates')
        .select('*')
        .eq('id', params.id)
        .single();

      if (error || !data) {
        console.error('Error fetching crewmate:', error);
        setNotFound(true);
      } else {
        setCrewmate(data);
      }
    } catch (error) {
      console.error('Error:', error);
      setNotFound(true);
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

  const getSpeedDescription = (speed) => {
    const descriptions = {
      1: 'Takes their time to think through every decision carefully.',
      2: 'Moves at a steady, reliable pace through tasks.',
      3: 'Quick on their feet and efficient in completing missions.',
      4: 'Blazingly fast - can complete tasks in record time!'
    };
    return descriptions[speed] || 'Speed capabilities unknown.';
  };

  const getAbilityDescription = (ability) => {
    const descriptions = {
      'Invisibility': 'Can become completely invisible to avoid detection.',
      'Super Speed': 'Moves faster than the eye can see.',
      'Teleportation': 'Can instantly transport to any location.',
      'Mind Reading': 'Can read the thoughts of other crewmates.',
      'Shapeshifting': 'Can change their appearance at will.',
      'Time Manipulation': 'Has control over the flow of time.',
      'Force Fields': 'Can create protective barriers around themselves.',
      'Healing': 'Can heal themselves and other crewmates.',
      'X-Ray Vision': 'Can see through walls and objects.',
      'Super Strength': 'Possesses incredible physical strength.'
    };
    return descriptions[ability] || 'A unique and mysterious ability.';
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div 
          className="text-gray-600 text-xl font-light"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading crewmate details...
        </motion.div>
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="text-6xl mb-4">○</div>
          <h1 className="text-3xl font-light text-gray-900 mb-4">Crewmate Not Found</h1>
          <p className="text-gray-600 mb-8 font-light">The crewmate you're looking for doesn't exist.</p>
          <Link href="/gallery">
            <motion.div
              className="inline-block bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              ← Back to Gallery
            </motion.div>
          </Link>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <motion.div 
        className="max-w-4xl mx-auto"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Link 
            href="/gallery" 
            className="text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-2 font-medium"
          >
            ← Back to Gallery
          </Link>
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg p-8 shadow-sm border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.div 
            className="text-center mb-8"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <div className="text-6xl mb-4">{getColorEmoji(crewmate.color)}</div>
            <h1 className="text-4xl font-light text-gray-900 mb-4">{crewmate.name}</h1>
            <p className="text-gray-600 font-light">
              Created on {new Date(crewmate.created_at).toLocaleDateString('en-US', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <motion.div 
              className="bg-gray-50 rounded-lg p-6 border border-gray-100"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <h3 className="text-xl font-medium text-gray-900 mb-4">
                Speed Profile
              </h3>
              <div className="mb-3">
                <span className="text-gray-500 text-sm">Level: </span>
                <span className="text-gray-900 font-medium text-lg">{getSpeedLabel(crewmate.speed)}</span>
              </div>
              <p className="text-gray-600 text-sm font-light">{getSpeedDescription(crewmate.speed)}</p>
            </motion.div>

            <motion.div 
              className="bg-gray-50 rounded-lg p-6 border border-gray-100"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
            >
              <h3 className="text-xl font-medium text-gray-900 mb-4">
                Appearance
              </h3>
              <div className="mb-3">
                <span className="text-gray-500 text-sm">Color: </span>
                <span className="text-gray-900 font-medium text-lg">{crewmate.color}</span>
              </div>
              <p className="text-gray-600 text-sm font-light">
                This crewmate stands out with their distinctive {crewmate.color.toLowerCase()} appearance, 
                making them easily recognizable among the crew.
              </p>
            </motion.div>

            <motion.div 
              className="bg-gray-50 rounded-lg p-6 border border-gray-100 md:col-span-2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 }}
            >
              <h3 className="text-xl font-medium text-gray-900 mb-4">
                Special Ability
              </h3>
              <div className="mb-3">
                <span className="text-gray-500 text-sm">Power: </span>
                <span className="text-gray-900 font-medium text-lg">{crewmate.special_ability}</span>
              </div>
              <p className="text-gray-600 text-sm font-light">{getAbilityDescription(crewmate.special_ability)}</p>
            </motion.div>
          </div>

          <motion.div 
            className="bg-gray-50 rounded-lg p-6 mb-8 border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.0 }}
          >
            <h3 className="text-xl font-medium text-gray-900 mb-6">
              Stats Summary
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-medium text-gray-900">{crewmate.speed}</div>
                <div className="text-gray-500 text-sm">Speed Rating</div>
              </div>
              <div>
                <div className="text-2xl font-medium text-gray-900">1</div>
                <div className="text-gray-500 text-sm">Special Abilities</div>
              </div>
              <div>
                <div className="text-2xl font-medium text-gray-900">
                  {Math.floor((Date.now() - new Date(crewmate.created_at).getTime()) / (1000 * 60 * 60 * 24))}
                </div>
                <div className="text-gray-500 text-sm">Days Active</div>
              </div>
              <div>
                <div className="text-2xl font-medium text-gray-900">★</div>
                <div className="text-gray-500 text-sm">Elite Status</div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="flex gap-4 justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <Link href={`/edit/${crewmate.id}`}>
              <motion.div
                className="bg-gray-900 hover:bg-gray-800 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                Edit Crewmate
              </motion.div>
            </Link>
            <Link href="/gallery">
              <motion.div
                className="bg-gray-100 hover:bg-gray-200 text-gray-900 font-medium py-3 px-6 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                View All Crewmates
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  );
}