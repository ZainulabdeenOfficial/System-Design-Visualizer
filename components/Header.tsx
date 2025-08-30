'use client'

import { motion } from 'framer-motion'
import { Sparkles, Github, Twitter } from 'lucide-react'

export default function Header() {
  return (
    <motion.header 
      className="sticky top-0 z-50 glass-effect border-b border-white/20"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="flex items-center gap-3"
            whileHover={{ scale: 1.05 }}
          >
            <div className="w-10 h-10 bg-gradient-to-r from-primary-500 to-accent-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">System Design Visualizer</h1>
              <p className="text-xs text-gray-500">AI-Powered Architecture Diagrams</p>
            </div>
          </motion.div>
          
          <nav className="hidden md:flex items-center gap-6">
            <a href="#features" className="text-gray-600 hover:text-primary-600 transition-colors">
              Features
            </a>
            <a href="#about" className="text-gray-600 hover:text-primary-600 transition-colors">
              About
            </a>
            <div className="flex items-center gap-3">
              <a 
                href="https://github.com/ZainulabdeenOfficial/System-Design-Visualizer" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
              <a 
                href="https://twitter.com/zu44256" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 text-gray-600 hover:text-primary-600 transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </nav>
        </div>
      </div>
    </motion.header>
  )
}
