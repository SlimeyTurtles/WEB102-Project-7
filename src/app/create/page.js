'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { supabase } from '../../lib/supabase';

export default function CreateCrewmate() {
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');
  const [color, setColor] = useState('');
  const [specialAbility, setSpecialAbility] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const speedOptions = [
    { value: 'slow', label: 'Slow', numeric: 1 },
    { value: 'normal', label: 'Normal', numeric: 2 },
    { value: 'fast', label: 'Fast', numeric: 3 },
    { value: 'lightning', label: 'Lightning', numeric: 4 }
  ];

  const colorOptions = [
    'Red', 'Blue', 'Green', 'Pink', 'Orange', 'Yellow', 'Black', 'White', 'Purple', 'Brown', 'Cyan', 'Lime'
  ];

  const abilityOptions = [
    'Invisibility', 'Super Speed', 'Teleportation', 'Mind Reading', 'Shapeshifting', 
    'Time Manipulation', 'Force Fields', 'Healing', 'X-Ray Vision', 'Super Strength'
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      alert('Please enter a name for your crewmate');
      return;
    }

    setIsSubmitting(true);

    try {
      const speedValue = speedOptions.find(s => s.value === speed)?.numeric || 1;
      
      const { data, error } = await supabase
        .from('crewmates')
        .insert([
          {
            name: name.trim(),
            speed: speedValue,
            color: color,
            special_ability: specialAbility
          }
        ]);

      if (error) {
        console.error('Error creating crewmate:', error);
        alert('Error creating crewmate. Please try again.');
      } else {
        alert('Crewmate created successfully!');
        router.push('/gallery');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <motion.div 
        className="max-w-2xl mx-auto"
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
            href="/" 
            className="text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-2 font-medium"
          >
            ← Back to Home
          </Link>
        </motion.div>

        <motion.div 
          className="bg-white rounded-lg p-8 shadow-sm border border-gray-200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        >
          <motion.h1 
            className="text-3xl font-light text-gray-900 mb-8 text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            Create New Crewmate
          </motion.h1>

          <form onSubmit={handleSubmit} className="space-y-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
            >
              <label className="block text-gray-700 text-sm font-medium mb-3">
                Name *
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-gray-500 focus:outline-none transition-colors"
                placeholder="Enter crewmate name..."
                required
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
            >
              <label className="block text-gray-700 text-sm font-medium mb-4">
                Speed Level
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {speedOptions.map((option, index) => (
                  <motion.button
                    key={option.value}
                    type="button"
                    onClick={() => setSpeed(option.value)}
                    className={`py-3 px-4 rounded-lg border transition-all font-medium ${
                      speed === option.value
                        ? 'bg-gray-900 border-gray-900 text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.8 + index * 0.1 }}
                  >
                    {option.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.9 }}
            >
              <label className="block text-gray-700 text-sm font-medium mb-4">
                Color
              </label>
              <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
                {colorOptions.map((colorOption, index) => (
                  <motion.button
                    key={colorOption}
                    type="button"
                    onClick={() => setColor(colorOption)}
                    className={`py-3 px-4 rounded-lg border transition-all font-medium text-sm ${
                      color === colorOption
                        ? 'bg-gray-900 border-gray-900 text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.0 + index * 0.05 }}
                  >
                    {colorOption}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.2 }}
            >
              <label className="block text-gray-700 text-sm font-medium mb-4">
                Special Ability
              </label>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {abilityOptions.map((ability, index) => (
                  <motion.button
                    key={ability}
                    type="button"
                    onClick={() => setSpecialAbility(ability)}
                    className={`py-3 px-4 rounded-lg border transition-all font-medium text-sm ${
                      specialAbility === ability
                        ? 'bg-gray-900 border-gray-900 text-white'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-gray-400'
                    }`}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.3 + index * 0.05 }}
                  >
                    {ability}
                  </motion.button>
                ))}
              </div>
            </motion.div>

            <motion.div 
              className="pt-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.5 }}
            >
              <motion.button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-600 text-white font-medium py-4 px-8 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Creating...' : 'Create Crewmate'}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}