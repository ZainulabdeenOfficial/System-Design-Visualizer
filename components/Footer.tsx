'use client'

import { motion } from 'framer-motion'
import { Sparkles, Heart } from 'lucide-react'

export default function Footer() {
  return (
    <motion.footer 
      className="glass-effect border-t border-white/20 mt-20"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.5 }}
    >
      <div className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-accent-500 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <h3 className="text-lg font-bold gradient-text">System Design Visualizer</h3>
            </div>
            <p className="text-gray-600 mb-4 max-w-md">
              Transform your system design text into beautiful, professional diagrams. 
              Powered by AI to understand complex architectures and create stunning visualizations.
            </p>
            <div className="flex items-center gap-2 text-sm text-gray-500">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-red-500" />
              <span>for developers</span>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Product</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-primary-600 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Examples</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">API</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold text-gray-800 mb-4">Support</h4>
            <ul className="space-y-2 text-gray-600">
              <li><a href="#" className="hover:text-primary-600 transition-colors">Documentation</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-primary-600 transition-colors">Status</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-8 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © 2024 System Design Visualizer. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors text-sm">Privacy</a>
            <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors text-sm">Terms</a>
            <a href="#" className="text-gray-500 hover:text-primary-600 transition-colors text-sm">Cookies</a>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
