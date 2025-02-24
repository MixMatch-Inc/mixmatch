"use client";

import React from 'react';
import { useState } from 'react';
import { motion } from 'framer-motion';

const JourneyTimeline = () => {
    const [editMode, setEditMode] = useState(false);
    const [entries, setEntries] = useState([
      { title: "First house parties", description: "Started DJing at small house parties during college, experimenting with music and building confidence in front of friends." },
      { title: "Local Club Gigs", description: "Moved on to performing at local clubs and lounges, gaining experience in reading crowds and curating vibes that kept people dancing." },
      { title: "Pushing Boundaries", description: "With a deepening passion for creating unforgettable dance floor moments, continually experimenting with new sounds and expanding reach in the DJ scene." }
    ]);
  
    const handleAddEntry = () => {
      setEntries([...entries, { title: "", description: "" }]);
    };
  
    return (
      <div className="w-full mx-auto p-6 bg-black text-white rounded-lg shadow-lg">
        <h2 className="text-xl font-bold text-blue-400">JOURNEY</h2>
  
        <div className="border border-blue-400 rounded-lg p-4 mt-4">
          <h3 className="text-lg font-semibold text-white">DJING JOURNEY (3-5 YEARS)</h3>
  
          <div className="mt-4 space-y-6">
            {entries.map((entry, index) => (
              <motion.div 
                key={index} 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="relative flex items-start space-x-4"
              >
                <div className="absolute left-[20px] top-[24px] bottom-0 w-[2px] bg-[#5BA4FC]/30" />
                <div className="w-3 h-3 bg-white rounded-full mt-2"></div>
                <div className="flex-1 bg-gray-900 p-4 rounded-lg shadow-md">
                  {editMode ? (
                    <input 
                      type="text"
                      value={entry.title}
                      onChange={(e) => {
                        const updatedEntries = [...entries];
                        updatedEntries[index].title = e.target.value;
                        setEntries(updatedEntries);
                      }}
                      className="w-full text-white font-semibold bg-transparent border-b border-gray-500 focus:outline-none"
                      placeholder="Title"
                    />
                  ) : (
                    <h4 className="text-white font-semibold">{entry.title}</h4>
                  )}
  
                  {editMode ? (
                    <textarea 
                      value={entry.description}
                      onChange={(e) => {
                        const updatedEntries = [...entries];
                        updatedEntries[index].description = e.target.value;
                        setEntries(updatedEntries);
                      }}
                      className="w-full text-white bg-transparent border-b border-gray-500 mt-2 focus:outline-none"
                      placeholder="Description"
                    />
                  ) : (
                    <p className="text-gray-300 mt-2">{entry.description}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
  
          {editMode && (
            <button 
              onClick={handleAddEntry} 
              className="mt-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg"
            >
              Add Entry
            </button>
          )}
  
          <button 
            onClick={() => setEditMode(!editMode)}
            className="mt-4 px-4 py-2 bg-gray-700 hover:bg-gray-800 text-white font-semibold rounded-lg"
          >
            {editMode ? "Save" : "Edit"}
          </button>
        </div>
      </div>
    );
};

export default JourneyTimeline;
