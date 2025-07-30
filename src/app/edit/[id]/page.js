'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { supabase } from '../../../lib/supabase';

export default function EditCrewmate() {
  const params = useParams();
  const router = useRouter();
  const [name, setName] = useState('');
  const [speed, setSpeed] = useState('');
  const [color, setColor] = useState('');
  const [specialAbility, setSpecialAbility] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

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
        setName(data.name);
        setColor(data.color);
        setSpecialAbility(data.special_ability);
        
        const speedOption = speedOptions.find(s => s.numeric === data.speed);
        setSpeed(speedOption ? speedOption.value : 'normal');
      }
    } catch (error) {
      console.error('Error:', error);
      setNotFound(true);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e) => {
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
        .update({
          name: name.trim(),
          speed: speedValue,
          color: color,
          special_ability: specialAbility
        })
        .eq('id', params.id);

      if (error) {
        console.error('Error updating crewmate:', error);
        alert('Error updating crewmate. Please try again.');
      } else {
        alert('Crewmate updated successfully!');
        router.push(`/crewmate/${params.id}`);
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this crewmate? This action cannot be undone.');
    
    if (!confirmDelete) return;

    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('crewmates')
        .delete()
        .eq('id', params.id);

      if (error) {
        console.error('Error deleting crewmate:', error);
        alert('Error deleting crewmate. Please try again.');
      } else {
        alert('Crewmate deleted successfully!');
        router.push('/gallery');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <motion.div 
          className="text-gray-600 text-xl font-light"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Loading crewmate...
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
          <p className="text-gray-600 mb-8 font-light">The crewmate you're trying to edit doesn't exist.</p>
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
        className="max-w-2xl mx-auto"
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
            href={`/crewmate/${params.id}`} 
            className="text-gray-600 hover:text-gray-900 transition-colors inline-flex items-center gap-2 font-medium"
          >
            ← Back to Details
          </Link>
          <Link
            href="/gallery"
            className="text-gray-600 hover:text-gray-900 transition-colors font-medium"
          >
            View Gallery
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
            Edit Crewmate
          </motion.h1>

          <form onSubmit={handleUpdate} className="space-y-8">
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
              className="pt-6 space-y-4"
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
                {isSubmitting ? 'Updating...' : 'Update Crewmate'}
              </motion.button>
              
              <motion.button
                type="button"
                onClick={handleDelete}
                disabled={isSubmitting}
                className="w-full bg-red-600 hover:bg-red-700 disabled:bg-red-800 text-white font-medium py-3 px-8 rounded-lg transition-colors"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {isSubmitting ? 'Deleting...' : 'Delete Crewmate'}
              </motion.button>
            </motion.div>
          </form>
        </motion.div>
      </motion.div>
    </div>
  );
}