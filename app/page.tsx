'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  Download, 
  Sparkles, 
  Code, 
  Database, 
  Server, 
  Globe, 
  Cloud, 
  Zap,
  ArrowRight,
  Copy,
  Check,
  Loader2
} from 'lucide-react'
import SystemDesignVisualizer from '@/components/SystemDesignVisualizer'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export default function Home() {
  const [inputText, setInputText] = useState('')
  const [isGenerating, setIsGenerating] = useState(false)
  const [isDownloading, setIsDownloading] = useState(false)
  const [generatedDesign, setGeneratedDesign] = useState<any>(null)
  const [copied, setCopied] = useState(false)
  const canvasRef = useRef<HTMLDivElement>(null)

  const exampleTexts = [
    "A microservices architecture with API Gateway, User Service, Product Service, Order Service, and Payment Service. Each service connects to its own database. Redis for caching, RabbitMQ for message queuing, and Elasticsearch for search functionality. CDN for content delivery and S3 for file storage. Monitoring with Prometheus and Grafana, Notification Service for alerts, Analytics Service for metrics, and Security Service for authentication.",
    "A social media platform with Load Balancer, Web Servers, Application Servers, Database (PostgreSQL), Cache (Redis), Message Queue (Kafka), CDN, and File Storage (S3). Payment Gateway for transactions and Search Engine for user discovery. Mobile App for iOS and Android, Web Client with React frontend, Document Service for file processing, and Analytics Service for user behavior tracking.",
    "An e-commerce system with Load Balancer, Web Servers, Application Servers, Database (MySQL), Cache (Redis), Search Engine (Elasticsearch), Payment Gateway, CDN, and File Storage. User Service and Product Service for business logic. Monitoring Service for system health, Notification Service for order updates, Security Service for user authentication, and Analytics Service for sales metrics."
  ]

  const handleGenerate = async () => {
    if (!inputText.trim()) return
    
    setIsGenerating(true)
    
    // Clear any existing design first
    setGeneratedDesign(null)
    
    // Wait a bit to ensure cleanup
    await new Promise(resolve => setTimeout(resolve, 100))
    
    // Simulate processing time
    setTimeout(() => {
      const design = parseSystemDesign(inputText)
      setGeneratedDesign(design)
      setIsGenerating(false)
    }, 2000)
  }

  const parseSystemDesign = (text: string) => {
    // Enhanced parsing logic with better component detection
    const componentPatterns = [
      { pattern: /\b(api gateway|gateway)\b/gi, type: 'gateway', name: 'API Gateway' },
      { pattern: /\b(load balancer|load balancer)\b/gi, type: 'gateway', name: 'Load Balancer' },
      { pattern: /\b(web server|web servers)\b/gi, type: 'server', name: 'Web Server' },
      { pattern: /\b(application server|app server)\b/gi, type: 'server', name: 'Application Server' },
      { pattern: /\b(database|postgresql|mysql|mongodb)\b/gi, type: 'database', name: 'Database' },
      { pattern: /\b(redis|cache)\b/gi, type: 'cache', name: 'Cache' },
      { pattern: /\b(elasticsearch|search)\b/gi, type: 'search', name: 'Search Engine' },
      { pattern: /\b(kafka|rabbitmq|message queue|queue)\b/gi, type: 'queue', name: 'Message Queue' },
      { pattern: /\b(cdn|content delivery network)\b/gi, type: 'storage', name: 'CDN' },
      { pattern: /\b(s3|file storage|storage)\b/gi, type: 'storage', name: 'File Storage' },
      { pattern: /\b(payment gateway|payment service)\b/gi, type: 'gateway', name: 'Payment Gateway' },
      { pattern: /\b(user service|user management)\b/gi, type: 'server', name: 'User Service' },
      { pattern: /\b(product service|product management)\b/gi, type: 'server', name: 'Product Service' },
      { pattern: /\b(order service|order management)\b/gi, type: 'server', name: 'Order Service' },
      { pattern: /\b(payment service|payment processing)\b/gi, type: 'server', name: 'Payment Service' },
      { pattern: /\b(microservice|service)\b/gi, type: 'server', name: 'Microservice' },
      { pattern: /\b(monitoring|monitor|prometheus|grafana)\b/gi, type: 'monitoring', name: 'Monitoring' },
      { pattern: /\b(notification|notifications|email service|sms)\b/gi, type: 'notification', name: 'Notification Service' },
      { pattern: /\b(analytics|analytics service|metrics)\b/gi, type: 'analytics', name: 'Analytics Service' },
      { pattern: /\b(security|auth|authentication|authorization)\b/gi, type: 'security', name: 'Security Service' },
      { pattern: /\b(mobile app|mobile|ios|android)\b/gi, type: 'mobile', name: 'Mobile App' },
      { pattern: /\b(web client|frontend|react|vue|angular)\b/gi, type: 'user', name: 'Web Client' },
      { pattern: /\b(document|document service|file service)\b/gi, type: 'document', name: 'Document Service' }
    ]
    
    const components: any[] = []
    const componentMap = new Map<string, number>()
    
    componentPatterns.forEach(({ pattern, type, name }) => {
      const matches = text.match(pattern)
      if (matches) {
        matches.forEach((match, index) => {
          const componentId = components.length
          const componentName = `${name}${index > 0 ? ` ${index + 1}` : ''}`
          
          if (!componentMap.has(componentName.toLowerCase())) {
            componentMap.set(componentName.toLowerCase(), componentId)
            components.push({
              id: componentId,
              name: componentName,
              type: type,
                             position: { x: 100 + (componentId % 3) * 500, y: 200 + Math.floor(componentId / 3) * 320 },
              status: 'Active',
              description: getComponentDescription(type, componentName),
              load: Math.floor(Math.random() * 80) + 20, // Random load between 20-100%
              latency: Math.floor(Math.random() * 100) + 10 // Random latency between 10-110ms
            })
          }
        })
      }
    })
    
    return {
      components,
      connections: generateSmartConnections(components, text)
    }
  }

  const getComponentDescription = (type: string, name: string) => {
    const descriptions: { [key: string]: string } = {
      gateway: 'Handles routing and authentication',
      server: 'Processes business logic and requests',
      database: 'Stores and manages data',
      cache: 'Provides fast data access',
      storage: 'Handles file and content storage',
      queue: 'Manages asynchronous communication',
      search: 'Provides search functionality',
      monitoring: 'Monitors system health and performance',
      notification: 'Handles user notifications and alerts',
      analytics: 'Processes and analyzes data metrics',
      security: 'Manages authentication and authorization',
      mobile: 'Mobile application interface',
      user: 'Web client interface',
      document: 'Handles document processing and storage'
    }
    return descriptions[type] || 'Component in the system architecture'
  }

  const generateSmartConnections = (components: any[], text: string) => {
    const connections: any[] = []
    
    // Create logical connections based on component relationships
    components.forEach((component) => {
      const componentType = component.type
      
      // Connect gateways to servers (left to right flow)
      if (componentType === 'gateway') {
        const servers = components.filter(c => c.type === 'server' && c.id !== component.id)
        servers.forEach((server, index) => {
          const protocols = ['http', 'https', 'grpc']
          const protocol = protocols[index % protocols.length]
          
          connections.push({
            from: component.id,
            to: server.id,
            type: protocol,
            label: protocol.toUpperCase(),
            bidirectional: false,
            strength: 1.5
          })
        })
      }
      
      // Connect servers to databases (server to database flow)
      if (componentType === 'server') {
        const databases = components.filter(c => c.type === 'database')
        databases.forEach((db, index) => {
          connections.push({
            from: component.id,
            to: db.id,
            type: 'database',
            label: 'DB',
            bidirectional: false,
            strength: 2.0
          })
        })
        
        // Connect servers to cache
        const caches = components.filter(c => c.type === 'cache')
        caches.forEach((cache) => {
          connections.push({
            from: component.id,
            to: cache.id,
            type: 'cache',
            label: 'Cache',
            bidirectional: true,
            strength: 1.2
          })
        })
        
        // Connect servers to message queues
        const queues = components.filter(c => c.type === 'queue')
        queues.forEach((queue) => {
          connections.push({
            from: component.id,
            to: queue.id,
            type: 'queue',
            label: 'Queue',
            bidirectional: false,
            strength: 1.8
          })
        })
        
        // Connect servers to search engines
        const searchEngines = components.filter(c => c.type === 'search')
        searchEngines.forEach((search) => {
          connections.push({
            from: component.id,
            to: search.id,
            type: 'api',
            label: 'Search',
            bidirectional: false,
            strength: 1.3
          })
        })
        
        // Connect servers to storage
        const storages = components.filter(c => c.type === 'storage')
        storages.forEach((storage) => {
          connections.push({
            from: component.id,
            to: storage.id,
            type: 'api',
            label: 'Storage',
            bidirectional: false,
            strength: 1.4
          })
        })
      }
      
      // Connect storage components to CDN
      if (componentType === 'storage' && !component.name.includes('CDN')) {
        const cdns = components.filter(c => c.type === 'storage' && c.name.includes('CDN'))
        cdns.forEach((cdn) => {
          connections.push({
            from: component.id,
            to: cdn.id,
            type: 'http',
            label: 'CDN',
            bidirectional: false,
            strength: 1.6
          })
        })
      }
      
      // Connect user services to notification services
      if (componentType === 'server' && component.name.toLowerCase().includes('user')) {
        const notifications = components.filter(c => c.type === 'notification')
        notifications.forEach((notification) => {
          connections.push({
            from: component.id,
            to: notification.id,
            type: 'websocket',
            label: 'WS',
            bidirectional: true,
            strength: 1.4
          })
        })
      }
      
      // Connect analytics services to databases
      if (componentType === 'analytics') {
        const databases = components.filter(c => c.type === 'database')
        databases.forEach((db) => {
          connections.push({
            from: component.id,
            to: db.id,
            type: 'database',
            label: 'Analytics',
            bidirectional: false,
            strength: 1.7
          })
        })
      }
      
      // Connect monitoring services to key components
      if (componentType === 'monitoring') {
        const keyComponents = components.filter(c => 
          c.type === 'server' || c.type === 'database' || c.type === 'gateway'
        )
        keyComponents.forEach((target) => {
          if (target.id !== component.id) {
            connections.push({
              from: component.id,
              to: target.id,
              type: 'tcp',
              label: 'Monitor',
              bidirectional: false,
              strength: 0.8
            })
          }
        })
      }
      
      // Connect mobile apps to gateways
      if (componentType === 'mobile') {
        const gateways = components.filter(c => c.type === 'gateway')
        gateways.forEach((gateway) => {
          connections.push({
            from: component.id,
            to: gateway.id,
            type: 'https',
            label: 'HTTPS',
            bidirectional: false,
            strength: 1.5
          })
        })
      }
      
      // Connect web clients to gateways
      if (componentType === 'user') {
        const gateways = components.filter(c => c.type === 'gateway')
        gateways.forEach((gateway) => {
          connections.push({
            from: component.id,
            to: gateway.id,
            type: 'http',
            label: 'HTTP',
            bidirectional: false,
            strength: 1.5
          })
        })
      }
      
      // Connect document services to storage
      if (componentType === 'document') {
        const storages = components.filter(c => c.type === 'storage')
        storages.forEach((storage) => {
          connections.push({
            from: component.id,
            to: storage.id,
            type: 'api',
            label: 'File',
            bidirectional: false,
            strength: 1.6
          })
        })
      }
    })
    
    // Remove duplicate connections
    const uniqueConnections = connections.filter((connection, index, self) => 
      index === self.findIndex(c => 
        (c.from === connection.from && c.to === connection.to) ||
        (c.from === connection.to && c.to === connection.from)
      )
    )
    
    // Ensure all components have at least one connection
    const connectedComponents = new Set()
    uniqueConnections.forEach(conn => {
      connectedComponents.add(conn.from)
      connectedComponents.add(conn.to)
    })
    
    // Add connections for isolated components
    const isolatedComponents = components.filter(comp => !connectedComponents.has(comp.id))
    isolatedComponents.forEach((comp, index) => {
      const targetComponent = components.find(c => c.id !== comp.id && c.type !== comp.type)
      if (targetComponent) {
        uniqueConnections.push({
          from: comp.id,
          to: targetComponent.id,
          type: 'api',
          label: 'API',
          bidirectional: false,
          strength: 1.0
        })
      }
    })
    
    return uniqueConnections.slice(0, 25) // Increased limit to show all connections
  }

  const handleDownload = async () => {
    if (!canvasRef.current) return
    
    setIsDownloading(true)
    
    try {
      const html2canvas = (await import('html2canvas')).default
      
      // Wait for animations to complete
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Get the visualizer element directly
      const visualizerElement = canvasRef.current.querySelector('[data-visualizer]')
      if (!visualizerElement) {
        console.error('Visualizer element not found')
        setIsDownloading(false)
        return
      }
      
      // Get the actual content dimensions
      const rect = visualizerElement.getBoundingClientRect()
      const scrollWidth = visualizerElement.scrollWidth
      const scrollHeight = visualizerElement.scrollHeight
      
      console.log('Visualizer dimensions:', { scrollWidth, scrollHeight, rect })
      
             // Use larger dimensions to ensure full capture
       const captureWidth = Math.max(scrollWidth, 2000)
       const captureHeight = Math.max(scrollHeight, 1600)
      
      // Create a temporary container for better capture
      const tempContainer = document.createElement('div')
      tempContainer.style.position = 'absolute'
      tempContainer.style.left = '-9999px'
      tempContainer.style.top = '-9999px'
      tempContainer.style.width = `${captureWidth}px`
      tempContainer.style.height = `${captureHeight}px`
      tempContainer.style.overflow = 'visible'
      tempContainer.style.backgroundColor = '#f8fafc'
      tempContainer.style.zIndex = '-1'
      
      // Clone the visualizer element
      const clonedElement = visualizerElement.cloneNode(true) as HTMLElement
      clonedElement.style.position = 'relative'
      clonedElement.style.width = `${captureWidth}px`
      clonedElement.style.height = `${captureHeight}px`
      clonedElement.style.overflow = 'visible'
      clonedElement.style.transform = 'none'
      clonedElement.style.backgroundColor = '#f8fafc'
      clonedElement.style.minWidth = `${captureWidth}px`
      clonedElement.style.minHeight = `${captureHeight}px`
      clonedElement.style.maxWidth = 'none'
      clonedElement.style.maxHeight = 'none'
      
      tempContainer.appendChild(clonedElement)
      document.body.appendChild(tempContainer)
      
             const canvas = await html2canvas(clonedElement, {
         backgroundColor: '#f8fafc',
         scale: 1,
         useCORS: true,
         allowTaint: true,
         foreignObjectRendering: true,
         logging: true,
         removeContainer: false,
         imageTimeout: 60000,
         width: captureWidth,
         height: captureHeight,
         scrollX: 0,
         scrollY: 0,
         windowWidth: captureWidth,
         windowHeight: captureHeight,
        onclone: (clonedDoc) => {
          const clonedVisualizer = clonedDoc.querySelector('[data-visualizer]') as HTMLElement
          if (clonedVisualizer) {
            clonedVisualizer.style.width = `${captureWidth}px`
            clonedVisualizer.style.height = `${captureHeight}px`
            clonedVisualizer.style.overflow = 'visible'
            clonedVisualizer.style.position = 'relative'
            clonedVisualizer.style.transform = 'none'
            clonedVisualizer.style.backgroundColor = '#f8fafc'
            clonedVisualizer.style.minWidth = `${captureWidth}px`
            clonedVisualizer.style.minHeight = `${captureHeight}px`
            clonedVisualizer.style.maxWidth = 'none'
            clonedVisualizer.style.maxHeight = 'none'
            
            // Ensure all child elements are visible
            const allElements = clonedVisualizer.querySelectorAll('*')
            allElements.forEach((el: any) => {
              if (el.style) {
                el.style.visibility = 'visible'
                el.style.opacity = '1'
              }
            })
          }
        }
      })
      
      // Clean up
      document.body.removeChild(tempContainer)
      
      // Create download link
      const link = document.createElement('a')
      link.download = `system-design-${Date.now()}.png`
      link.href = canvas.toDataURL('image/png', 1.0)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      
      console.log('PNG download completed successfully')
      alert('PNG download completed successfully!')
    } catch (error) {
      console.error('Error downloading PNG:', error)
      alert('Failed to download PNG. Please try again.')
    } finally {
      setIsDownloading(false)
    }
  }

  const handleGifDownload = async () => {
    if (!canvasRef.current) return
    
    setIsDownloading(true)
    
    try {
      // Wait for animations to complete
      await new Promise(resolve => setTimeout(resolve, 3000))
      
      // Get the visualizer element
      const visualizerElement = canvasRef.current.querySelector('[data-visualizer]')
      if (!visualizerElement) {
        console.error('Visualizer element not found')
        setIsDownloading(false)
        return
      }
      
      // Get the actual dimensions
      const scrollWidth = visualizerElement.scrollWidth
      const scrollHeight = visualizerElement.scrollHeight
      const captureWidth = Math.max(scrollWidth, 2000)
      const captureHeight = Math.max(scrollHeight, 1600)
      
      // Import gif.js
      const GIF = (await import('gif.js')).default
      
      // Create a new GIF instance with actual dimensions
      const gif = new GIF({
        workers: 1,
        quality: 15,
        width: captureWidth,
        height: captureHeight,
        dither: false,
        transparent: null
      })
      
      // Create multiple frames by capturing the element at different times
      const frameCount = 8
      const frameDelay = 500 // 500ms between frames
      
      for (let i = 0; i < frameCount; i++) {
        // Wait a bit between captures to show animations
        await new Promise(resolve => setTimeout(resolve, frameDelay))
        
        // Create temporary container for each frame
        const tempContainer = document.createElement('div')
        tempContainer.style.position = 'absolute'
        tempContainer.style.left = '-9999px'
        tempContainer.style.top = '-9999px'
        tempContainer.style.width = `${captureWidth}px`
        tempContainer.style.height = `${captureHeight}px`
        tempContainer.style.overflow = 'visible'
        tempContainer.style.backgroundColor = '#f8fafc'
        tempContainer.style.zIndex = '-1'
        
        // Clone the visualizer element for each frame
        const clonedElement = visualizerElement.cloneNode(true) as HTMLElement
        clonedElement.style.position = 'relative'
        clonedElement.style.width = `${captureWidth}px`
        clonedElement.style.height = `${captureHeight}px`
        clonedElement.style.overflow = 'visible'
        clonedElement.style.transform = 'none'
        clonedElement.style.backgroundColor = '#f8fafc'
        clonedElement.style.minWidth = `${captureWidth}px`
        clonedElement.style.minHeight = `${captureHeight}px`
        
        tempContainer.appendChild(clonedElement)
        document.body.appendChild(tempContainer)
        
        // Capture the current state with actual dimensions
        const html2canvas = (await import('html2canvas')).default
        const canvas = await html2canvas(clonedElement, {
          backgroundColor: '#f8fafc',
          scale: 1,
          useCORS: true,
          allowTaint: true,
          foreignObjectRendering: true,
          logging: true,
          removeContainer: false,
          width: captureWidth,
          height: captureHeight,
          scrollX: 0,
          scrollY: 0,
          windowWidth: captureWidth,
          windowHeight: captureHeight,
          onclone: (clonedDoc) => {
            const clonedVisualizer = clonedDoc.querySelector('[data-visualizer]') as HTMLElement
            if (clonedVisualizer) {
              clonedVisualizer.style.width = `${captureWidth}px`
              clonedVisualizer.style.height = `${captureHeight}px`
              clonedVisualizer.style.overflow = 'visible'
              clonedVisualizer.style.position = 'relative'
              clonedVisualizer.style.transform = 'none'
              clonedVisualizer.style.backgroundColor = '#f8fafc'
              clonedVisualizer.style.minWidth = `${captureWidth}px`
              clonedVisualizer.style.minHeight = `${captureHeight}px`
              clonedVisualizer.style.maxWidth = 'none'
              clonedVisualizer.style.maxHeight = 'none'
              
              // Ensure all child elements are visible
              const allElements = clonedVisualizer.querySelectorAll('*')
              allElements.forEach((el: any) => {
                if (el.style) {
                  el.style.visibility = 'visible'
                  el.style.opacity = '1'
                }
              })
            }
          }
        })
        
        // Clean up temporary container
        document.body.removeChild(tempContainer)
        
        // Add frame to GIF with longer delay for better animation
        gif.addFrame(canvas, { delay: 500 })
      }
      
      // Generate the GIF
      gif.on('finished', (blob: Blob) => {
        // Create download link
        const link = document.createElement('a')
        link.download = `system-design-${Date.now()}.gif`
        link.href = URL.createObjectURL(blob)
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(link.href)
        
                 console.log('GIF download completed successfully')
         alert('GIF download completed successfully!')
         setIsDownloading(false)
       })
      
      gif.render()
      
    } catch (error) {
      console.error('Error downloading GIF:', error)
      alert('Failed to download GIF. Please try PNG download instead.')
      setIsDownloading(false)
    }
  }

  const handleCopyExample = (example: string) => {
    setInputText(example)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <motion.h1 
            className="text-5xl md:text-7xl font-bold mb-6 gradient-text"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            System Design
            <span className="block text-4xl md:text-6xl">Visualizer</span>
          </motion.h1>
          
          <motion.p 
            className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            Transform your system design text into beautiful, professional diagrams. 
            Visualize complex architectures with our intelligent parsing and stunning UI.
          </motion.p>
          
          <motion.div 
            className="flex items-center justify-center gap-2 text-primary-600 mb-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Sparkles className="w-6 h-6" />
            <span className="text-lg font-semibold">Powered by AI</span>
          </motion.div>
        </motion.div>

        {/* Input Section */}
        <motion.div 
          className="max-w-4xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <div className="glass-effect rounded-2xl p-8 shadow-2xl">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Describe Your System</h2>
            
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Describe your system architecture here... For example: A microservices architecture with API Gateway, User Service, Product Service, Order Service, and Payment Service..."
              className="input-field h-32 resize-none mb-6"
            />
            
            <div className="flex flex-wrap gap-4 mb-6">
              {exampleTexts.map((example, index) => (
                <button
                  key={index}
                  onClick={() => handleCopyExample(example)}
                  className="button-secondary text-sm"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  Example {index + 1}
                </button>
              ))}
            </div>
            
            {copied && (
              <motion.div 
                className="flex items-center gap-2 text-green-600 mb-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Check className="w-5 h-5" />
                <span>Example copied to input!</span>
              </motion.div>
            )}
            
            <button
              onClick={handleGenerate}
              disabled={!inputText.trim() || isGenerating}
              className="button-primary w-full md:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating Design...
                </>
              ) : (
                <>
                  <Sparkles className="w-5 h-5 mr-2" />
                  Generate System Design
                  <ArrowRight className="w-5 h-5 ml-2" />
                </>
              )}
            </button>
          </div>
        </motion.div>

        {/* Generated Design Section */}
        <AnimatePresence>
          {generatedDesign && (
            <motion.div 
              className="max-w-6xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
            >
              <div className="glass-effect rounded-2xl p-8 shadow-2xl mb-8">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-gray-800">Generated System Design</h2>
                  <div className="flex gap-3">
                    <button
                      onClick={handleDownload}
                      disabled={isDownloading}
                      className="button-primary disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isDownloading ? (
                        <>
                          <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                          Creating PNG...
                        </>
                      ) : (
                        <>
                          <Download className="w-5 h-5 mr-2" />
                          Download PNG
                        </>
                      )}
                    </button>
                    
                                         <button
                       onClick={handleGifDownload}
                       disabled={isDownloading}
                       className="bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white px-6 py-3 rounded-lg font-semibold transition-colors duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                     >
                       {isDownloading ? (
                         <>
                           <Loader2 className="w-5 h-5 animate-spin" />
                           Creating GIF...
                         </>
                       ) : (
                         <>
                           <Download className="w-5 h-5" />
                           Download GIF
                         </>
                       )}
                     </button>
                  </div>
                </div>
                
                                                                                       <div 
                   ref={canvasRef}
                   className="bg-white rounded-xl p-6 min-h-[1600px] relative overflow-auto"
                   style={{ 
                     minWidth: '2000px',
                     width: '100%',
                     height: 'auto',
                     overflow: 'visible'
                   }}
                 >
                    <SystemDesignVisualizer 
                      key={`design-${generatedDesign?.components?.length || 0}-${Date.now()}`}
                      design={generatedDesign} 
                    />
                  </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Features Section */}
        <motion.div 
          className="max-w-6xl mx-auto mt-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.0 }}
        >
          <h2 className="text-3xl font-bold text-center mb-12 gradient-text">Why Choose Our Visualizer?</h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description: "Generate beautiful diagrams in seconds with our intelligent parsing system."
              },
              {
                icon: Sparkles,
                title: "AI-Powered",
                description: "Advanced natural language processing to understand complex system descriptions."
              },
              {
                icon: Download,
                title: "Easy Export",
                description: "Download high-quality PNG images for presentations and documentation."
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="glass-effect rounded-xl p-6 text-center card-hover"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 + index * 0.1 }}
              >
                <feature.icon className="w-12 h-12 mx-auto mb-4 text-primary-600" />
                <h3 className="text-xl font-bold mb-2 text-gray-800">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
      
      <Footer />
    </div>
  )
}
