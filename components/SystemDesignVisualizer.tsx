'use client'

import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import { 
  Server, 
  Database, 
  Globe, 
  Cloud, 
  Zap, 
  Shield, 
  Cpu, 
  HardDrive,
  Network,
  ArrowRight,
  ArrowLeft,
  ArrowUp,
  ArrowDown,
  ArrowUpRight,
  ArrowDownRight,
  Wifi,
  Activity,
  Layers,
  Users,
  Lock,
  Globe2,
  Monitor,
  Smartphone,
  MessageSquare,
  FileText,
  BarChart3,
  Eye,
  Download,
  Upload,
  CheckCircle,
  Clock,
  Star,
  TrendingUp,
  Settings,
  GitBranch,
  Maximize2,
  Minimize2,
  X
} from 'lucide-react'

interface Component {
  id: number
  name: string
  type: string
  position: { x: number; y: number }
  status?: string
  description?: string
  load?: number
  latency?: number
}

interface Connection {
  from: number
  to: number
  type: string
  label?: string
  bidirectional?: boolean
  strength?: number
  protocol?: string
  data?: string
}

interface Design {
  components: Component[]
  connections: Connection[]
}

interface SystemDesignVisualizerProps {
  design: Design
}

const getComponentIcon = (type: string) => {
  switch (type) {
    case 'database':
      return Database
    case 'server':
      return Server
    case 'gateway':
      return Shield
    case 'storage':
      return HardDrive
    case 'component':
      return Cpu
    case 'cache':
      return Zap
    case 'queue':
      return Activity
    case 'search':
      return Layers
    case 'user':
      return Users
    case 'security':
      return Lock
    case 'monitoring':
      return Monitor
    case 'mobile':
      return Smartphone
    case 'notification':
      return MessageSquare
    case 'analytics':
      return BarChart3
    case 'document':
      return FileText
    default:
      return Server
  }
}

const getComponentColor = (type: string) => {
  switch (type) {
    case 'database':
      return 'from-emerald-500 to-teal-600'
    case 'server':
      return 'from-blue-600 to-indigo-700'
    case 'gateway':
      return 'from-violet-500 to-purple-600'
    case 'storage':
      return 'from-orange-500 to-red-600'
    case 'component':
      return 'from-slate-500 to-gray-600'
    case 'cache':
      return 'from-amber-500 to-yellow-600'
    case 'queue':
      return 'from-pink-500 to-rose-600'
    case 'search':
      return 'from-cyan-500 to-blue-600'
    case 'user':
      return 'from-indigo-500 to-purple-600'
    case 'security':
      return 'from-red-500 to-pink-600'
    case 'monitoring':
      return 'from-blue-500 to-cyan-600'
    case 'mobile':
      return 'from-green-500 to-emerald-600'
    case 'notification':
      return 'from-orange-500 to-amber-600'
    case 'analytics':
      return 'from-purple-500 to-indigo-600'
    case 'document':
      return 'from-gray-500 to-blue-600'
    default:
      return 'from-blue-500 to-indigo-600'
  }
}

const getComponentBgColor = (type: string) => {
  switch (type) {
    case 'database':
      return 'bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 hover:border-emerald-300'
    case 'server':
      return 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-300'
    case 'gateway':
      return 'bg-gradient-to-br from-violet-50 to-purple-50 border-violet-200 hover:border-violet-300'
    case 'storage':
      return 'bg-gradient-to-br from-orange-50 to-red-50 border-orange-200 hover:border-orange-300'
    case 'component':
      return 'bg-gradient-to-br from-slate-50 to-gray-50 border-slate-200 hover:border-slate-300'
    case 'cache':
      return 'bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200 hover:border-amber-300'
    case 'queue':
      return 'bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200 hover:border-pink-300'
    case 'search':
      return 'bg-gradient-to-br from-cyan-50 to-blue-50 border-cyan-200 hover:border-cyan-300'
    case 'user':
      return 'bg-gradient-to-br from-indigo-50 to-purple-50 border-indigo-200 hover:border-indigo-300'
    case 'security':
      return 'bg-gradient-to-br from-red-50 to-pink-50 border-red-200 hover:border-red-300'
    case 'monitoring':
      return 'bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:border-blue-300'
    case 'mobile':
      return 'bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:border-green-300'
    case 'notification':
      return 'bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200 hover:border-orange-300'
    case 'analytics':
      return 'bg-gradient-to-br from-purple-50 to-indigo-50 border-purple-200 hover:border-purple-300'
    case 'document':
      return 'bg-gradient-to-br from-gray-50 to-blue-50 border-gray-200 hover:border-gray-300'
    default:
      return 'bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200 hover:border-blue-300'
  }
}

const getConnectionColor = (type: string) => {
  switch (type) {
    case 'http':
      return '#3B82F6'
    case 'database':
      return '#10B981'
    case 'queue':
      return '#8B5CF6'
    case 'cache':
      return '#F59E0B'
    case 'websocket':
      return '#F97316'
    case 'grpc':
      return '#06B6D4'
    case 'tcp':
      return '#EF4444'
    case 'udp':
      return '#EC4899'
    case 'ssl':
      return '#14B8A6'
    case 'api':
      return '#6366F1'
    default:
      return '#6B7280'
  }
}

const getConnectionLabel = (type: string, protocol?: string) => {
  const labels: { [key: string]: string } = {
    http: protocol === 'https' ? 'HTTPS' : 'HTTP',
    database: 'DB',
    queue: 'Queue',
    cache: 'Cache',
    websocket: 'WS',
    grpc: 'gRPC',
    tcp: 'TCP',
    udp: 'UDP',
    ssl: 'SSL',
    api: 'API'
  }
  return labels[type] || type.toUpperCase()
}

export default function SystemDesignVisualizer({ design }: SystemDesignVisualizerProps) {
  const [isFullScreen, setIsFullScreen] = useState(false)
  const [showConnections, setShowConnections] = useState(false)

  // Prevent multiple renders
  if (!design || !design.components || design.components.length === 0) {
    return null
  }

  const toggleFullScreen = () => {
    try {
      if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen().then(() => {
          setIsFullScreen(true)
        }).catch(err => {
          console.log('Error attempting to enable fullscreen:', err)
          // Fallback: just set the state
          setIsFullScreen(true)
        })
      } else {
        document.exitFullscreen().then(() => {
          setIsFullScreen(false)
        }).catch(err => {
          console.log('Error attempting to exit fullscreen:', err)
          // Fallback: just set the state
          setIsFullScreen(false)
        })
      }
    } catch (error) {
      console.log('Fullscreen API not supported, using fallback')
      setIsFullScreen(!isFullScreen)
    }
  }

  useEffect(() => {
    const handleFullScreenChange = () => {
      setIsFullScreen(!!document.fullscreenElement)
    }

    document.addEventListener('fullscreenchange', handleFullScreenChange)
    return () => document.removeEventListener('fullscreenchange', handleFullScreenChange)
  }, [])

  // Cleanup effect to prevent memory leaks
  useEffect(() => {
    return () => {
      // Cleanup any fullscreen state when component unmounts
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {})
      }
    }
  }, [])

  const renderConnection = (connection: Connection) => {
    const fromComponent = design.components.find(c => c.id === connection.from)
    const toComponent = design.components.find(c => c.id === connection.to)
    
    if (!fromComponent || !toComponent) return null
    
         // Calculate connection points from component edges
     const fromX = fromComponent.position.x + 320 // Component width (320px)
     const fromY = fromComponent.position.y + 104 // Component height center (208/2)
     const toX = toComponent.position.x // Start of target component
     const toY = toComponent.position.y + 104 // Component height center (208/2)
    
    // Calculate midpoint for visual indicators
    const midX = (fromX + toX) / 2
    const midY = (fromY + toY) / 2
    
    const connectionColor = getConnectionColor(connection.type)
    const strength = connection.strength || 1
    
    // Calculate direction for arrow positioning
    const angle = Math.atan2(toY - fromY, toX - fromX) * 180 / Math.PI
    
    return (
      <motion.div
        key={`${connection.from}-${connection.to}`}
        className="absolute"
        style={{
          left: 0,
          top: 0,
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      >
        {/* Floating Connection Card */}
        <motion.div
          className="absolute flex items-center justify-center"
          style={{
            left: midX - 80,
            top: midY - 25,
          }}
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6 }}
          whileHover={{ scale: 1.05, y: -5 }}
        >
          <div className="bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-2xl border-2 border-gray-200/50 flex items-center gap-3 relative">
            {/* Connection Type Icon */}
            <div 
              className="w-8 h-8 rounded-xl flex items-center justify-center shadow-lg"
              style={{ backgroundColor: connectionColor }}
            >
              {connection.type === 'http' && <ArrowRight className="w-4 h-4 text-white" />}
              {connection.type === 'database' && <Database className="w-4 h-4 text-white" />}
              {connection.type === 'queue' && <Activity className="w-4 h-4 text-white" />}
              {connection.type === 'cache' && <Zap className="w-4 h-4 text-white" />}
              {connection.type === 'api' && <Server className="w-4 h-4 text-white" />}
              {connection.type === 'tcp' && <Network className="w-4 h-4 text-white" />}
              {connection.type === 'websocket' && <Wifi className="w-4 h-4 text-white" />}
              {connection.type === 'grpc' && <Cpu className="w-4 h-4 text-white" />}
              {connection.type === 'ssl' && <Lock className="w-4 h-4 text-white" />}
              {connection.type === 'udp' && <Globe className="w-4 h-4 text-white" />}
            </div>
            
            {/* Connection Info */}
            <div className="flex flex-col">
              <span className="text-sm font-bold" style={{ color: connectionColor }}>
                {connection.label || getConnectionLabel(connection.type, connection.protocol)}
              </span>
              <span className="text-xs text-gray-500">
                {fromComponent.name} → {toComponent.name}
              </span>
            </div>
            
            {/* Strength Indicator */}
            <div className="flex gap-1 ml-2">
              {[...Array(Math.floor(strength))].map((_, i) => (
                <div
                  key={i}
                  className="w-2 h-2 rounded-full"
                  style={{ backgroundColor: connectionColor }}
                />
              ))}
            </div>
            
            {/* Bidirectional Indicator */}
            {connection.bidirectional && (
              <div className="absolute -top-2 -right-2 w-6 h-6 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                <span className="text-white text-xs font-bold">↔</span>
              </div>
            )}
            
            {/* Floating Animation */}
            <motion.div
              className="absolute inset-0 rounded-2xl"
              style={{ backgroundColor: connectionColor }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.1 }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "reverse" }}
            />
          </div>
        </motion.div>
        
        {/* Directional Arrow from Source */}
        <motion.div
          className="absolute"
          style={{
            left: fromX + 20,
            top: fromY - 15,
            transform: `rotate(${angle}deg)`,
            transformOrigin: '0 0'
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.0, duration: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: connectionColor }}
            />
            <ArrowRight 
              className="w-5 h-5" 
              style={{ color: connectionColor }}
            />
          </div>
        </motion.div>
        
        {/* Directional Arrow to Target */}
        <motion.div
          className="absolute"
          style={{
            left: toX - 25,
            top: toY - 15,
            transform: `rotate(${angle}deg)`,
            transformOrigin: '0 0'
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.4, duration: 0.4 }}
        >
          <div className="flex items-center gap-2">
            <ArrowRight 
              className="w-5 h-5" 
              style={{ color: connectionColor }}
            />
            <div 
              className="w-3 h-3 rounded-full animate-pulse"
              style={{ backgroundColor: connectionColor }}
            />
          </div>
        </motion.div>
        
        {/* Connection Path Dots */}
        <motion.div
          className="absolute"
          style={{
            left: midX - 2,
            top: midY - 2,
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1.6, duration: 0.4 }}
        >
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: connectionColor }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.8 + i * 0.1, duration: 0.3 }}
              />
            ))}
          </div>
        </motion.div>
        
        {/* Data Flow Particles */}
        <motion.div
          className="absolute"
          style={{
            left: fromX + 40,
            top: fromY - 5,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.0, duration: 0.5 }}
        >
          {[...Array(5)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full"
              style={{ backgroundColor: connectionColor }}
              initial={{ 
                x: 0, 
                y: 0, 
                opacity: 0.8,
                scale: 0.5
              }}
              animate={{ 
                x: toX - fromX - 80, 
                y: toY - fromY, 
                opacity: 0,
                scale: 1
              }}
              transition={{ 
                delay: 2.2 + i * 0.2, 
                duration: 2,
                repeat: Infinity,
                repeatDelay: 3
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    )
  }

  return (
                 <div 
        data-visualizer="true"
        className={`relative ${isFullScreen ? 'fixed inset-0 z-50 bg-white w-screen h-screen' : 'w-full h-full min-h-[900px]'} bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/50 rounded-2xl overflow-auto border border-white/20`}
        style={{ 
          minWidth: '2000px', 
          minHeight: '1600px',
          width: '100%',
          height: '100%',
          backgroundColor: '#f8fafc',
          backgroundImage: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
          position: 'relative',
          overflow: 'visible'
        }}
      >
      {/* Full Screen Controls */}
      {isFullScreen && (
        <div className="absolute top-4 right-4 z-50 flex gap-2">
          <button
            onClick={toggleFullScreen}
            className="bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/30 hover:bg-white transition-all duration-200 group"
          >
            <Minimize2 className="w-5 h-5 text-gray-700 group-hover:text-gray-900" />
          </button>
          <button
            onClick={() => window.close()}
            className="bg-red-500/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-red-300/30 hover:bg-red-500 transition-all duration-200 group"
          >
            <X className="w-5 h-5 text-white" />
          </button>
        </div>
      )}

             {/* Main Container */}
       <div className={`relative w-full h-full p-6 ${isFullScreen ? 'pt-16' : ''}`} style={{ minWidth: '1400px', minHeight: isFullScreen ? '100vh' : '900px' }}>
        {/* Clean Background */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 opacity-10">
            <div className="w-full h-full" style={{
              backgroundImage: `
                linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)
              `,
              backgroundSize: '40px 40px'
            }} />
          </div>
        </div>
        
        {/* Title Section */}
        <motion.div 
          className="absolute top-8 left-8 z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h3 className="text-2xl font-bold text-gray-800 mb-4">
            System Architecture
          </h3>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-white/20">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="font-medium text-gray-700">Services</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-white/20">
              <div className="w-3 h-3 bg-emerald-500 rounded-full"></div>
              <span className="font-medium text-gray-700">Databases</span>
            </div>
            <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm px-3 py-1.5 rounded-lg shadow-sm border border-white/20">
              <div className="w-3 h-3 bg-violet-500 rounded-full"></div>
              <span className="font-medium text-gray-700">Gateways</span>
            </div>
          </div>
        </motion.div>
        
        {/* Components with Better Layout */}
        {design.components.map((component, index) => {
          const Icon = getComponentIcon(component.type)
          const colorClass = getComponentColor(component.type)
          const bgClass = getComponentBgColor(component.type)
          
          // Improved grid layout
          const totalComponents = design.components.length
          const maxCols = Math.min(3, Math.ceil(Math.sqrt(totalComponents)))
          const row = Math.floor(index / maxCols)
          const col = index % maxCols
          
                     // Better spacing
           const baseX = 100
           const baseY = 200
           const colSpacing = 500
           const rowSpacing = 320
          
          const x = baseX + col * colSpacing
          const y = baseY + row * rowSpacing
          
          return (
            <motion.div
              key={component.id}
              className={`absolute ${bgClass} rounded-xl shadow-lg border-2 p-6 w-80 cursor-pointer transition-all duration-300 group`}
              style={{
                left: x,
                top: y,
              }}
              initial={{ opacity: 0, scale: 0.8, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ 
                delay: 0.3 + index * 0.1,
                duration: 0.6,
                type: "spring",
                stiffness: 100,
                damping: 20
              }}
              whileHover={{ 
                scale: 1.05,
                y: -5,
                boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)"
              }}
            >
              {/* Professional Header */}
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 bg-gradient-to-r ${colorClass} rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg border-2 border-white/20`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-800 capitalize text-lg mb-1">
                    {component.name.replace(/([A-Z])/g, ' $1').trim()}
                  </h4>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${colorClass}`}></div>
                    <p className="text-sm text-gray-600 capitalize font-medium">{component.type}</p>
                  </div>
                </div>
              </div>
              
              {/* Status Indicators */}
              <div className="space-y-3 mb-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600 font-medium">Status</span>
                  <span className="text-emerald-600 font-semibold flex items-center gap-2">
                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                    Active
                  </span>
                </div>
                {component.load && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-medium">Load</span>
                    <div className="flex items-center gap-2">
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-blue-500 to-blue-600 rounded-full transition-all duration-300"
                          style={{ width: `${component.load}%` }}
                        ></div>
                      </div>
                      <span className="text-blue-600 font-semibold text-xs">{component.load}%</span>
                    </div>
                  </div>
                )}
                {component.latency && (
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 font-medium">Latency</span>
                    <span className="text-orange-600 font-semibold">{component.latency}ms</span>
                  </div>
                )}
              </div>
              
              {/* Professional Connection Points */}
              <div className="absolute -right-3 top-1/2 transform -translate-y-1/2">
                <div className="w-6 h-6 bg-gradient-to-r from-blue-500 to-blue-600 border-2 border-white rounded-full shadow-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-blue-400 border border-white rounded-full animate-pulse"></div>
              </div>
              
              <div className="absolute -left-3 top-1/2 transform -translate-y-1/2">
                <div className="w-6 h-6 bg-gradient-to-r from-green-500 to-green-600 border-2 border-white rounded-full shadow-lg flex items-center justify-center">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
                <div className="absolute -top-1 -left-1 w-3 h-3 bg-green-400 border border-white rounded-full animate-pulse"></div>
              </div>
              
              {/* Connection Type Indicator */}
              <div className="absolute top-2 right-2">
                <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-lg shadow-sm border border-gray-200/50">
                  <span className="text-xs font-bold text-gray-700">ID: {component.id}</span>
                </div>
              </div>
              
              {/* Hover Effect Border */}
              <div className="absolute inset-0 rounded-xl border-2 border-transparent group-hover:border-blue-300/50 transition-all duration-300 pointer-events-none"></div>
            </motion.div>
          )
        })}
        
                 {/* Connections */}
         {showConnections && design.connections.map((connection, index) => (
           <div key={`connection-${connection.from}-${connection.to}-${index}`}>
             {renderConnection(connection)}
           </div>
         ))}
        
                 {/* Stats Panel */}
         <motion.div
           className="absolute top-8 right-8 bg-white/90 backdrop-blur-md rounded-xl p-6 shadow-lg border border-white/30"
           initial={{ opacity: 0, x: 20 }}
           animate={{ opacity: 1, x: 0 }}
           transition={{ delay: 1.0 }}
         >
           <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
             <TrendingUp className="w-5 h-5 text-blue-600" />
             System Stats
           </h4>
           <div className="space-y-3">
             <div className="flex items-center gap-3 text-sm">
               <Network className="w-5 h-5 text-blue-600" />
               <span className="font-semibold text-gray-700">{design.connections.length} Connections</span>
             </div>
             <div className="flex items-center gap-3 text-sm">
               <Cpu className="w-5 h-5 text-indigo-600" />
               <span className="font-semibold text-gray-700">{design.components.length} Components</span>
             </div>
             <div className="flex items-center gap-3 text-sm">
               <Activity className="w-5 h-5 text-emerald-600" />
               <span className="font-semibold text-gray-700">{design.components.filter(c => c.type === 'server').length} Services</span>
             </div>
           </div>
         </motion.div>

                                                                                                                                                                             {/* Connection Status Guide */}
              <motion.div
                className="absolute bottom-8 right-8 bg-white/95 backdrop-blur-md rounded-2xl p-6 shadow-xl border-2 border-gray-200/50"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                {!showConnections ? (
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gray-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <GitBranch className="w-6 h-6 text-gray-500" />
                    </div>
                    <h4 className="text-lg font-bold text-gray-800 mb-2">Connections Hidden</h4>
                    <p className="text-sm text-gray-600 mb-4">Click the connection button to show relationships</p>
                    <button
                      onClick={() => setShowConnections(true)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
                    >
                      Show Connections
                    </button>
                  </div>
                ) : (
                  <>
                    <h4 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                      <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg flex items-center justify-center">
                        <GitBranch className="w-5 h-5 text-white" />
                      </div>
                      Visual Connections
                    </h4>
               <div className="space-y-4 text-sm">
                 <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                   <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                     <ArrowRight className="w-5 h-5 text-white" />
                   </div>
                   <div>
                     <span className="font-bold text-gray-800">HTTP/API</span>
                     <p className="text-xs text-gray-600">RESTful communication</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                   <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-green-600 rounded-xl flex items-center justify-center shadow-lg">
                     <Database className="w-5 h-5 text-white" />
                   </div>
                   <div>
                     <span className="font-bold text-gray-800">Database</span>
                     <p className="text-xs text-gray-600">Data persistence</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                   <div className="w-10 h-10 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl flex items-center justify-center shadow-lg">
                     <Zap className="w-5 h-5 text-white" />
                   </div>
                   <div>
                     <span className="font-bold text-gray-800">Cache</span>
                     <p className="text-xs text-gray-600">Fast data access</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                   <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                     <Activity className="w-5 h-5 text-white" />
                   </div>
                   <div>
                     <span className="font-bold text-gray-800">Queue</span>
                     <p className="text-xs text-gray-600">Message processing</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors border border-gray-100">
                   <div className="w-10 h-10 bg-gradient-to-r from-red-500 to-red-600 rounded-xl flex items-center justify-center shadow-lg">
                     <Network className="w-5 h-5 text-white" />
                   </div>
                   <div>
                     <span className="font-bold text-gray-800">TCP/Monitor</span>
                     <p className="text-xs text-gray-600">System monitoring</p>
                   </div>
                 </div>
                 <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200/50">
                   <div className="flex items-center gap-2 mb-2">
                     <div className="w-4 h-4 bg-blue-500 rounded-full animate-pulse"></div>
                     <span className="text-sm font-bold text-blue-700">Visual Connection System</span>
                   </div>
                   <div className="space-y-1 text-xs text-blue-600">
                     <p>💡 <strong>Floating Cards:</strong> Show connection details</p>
                     <p>💡 <strong>Directional Arrows:</strong> Indicate data flow</p>
                     <p>💡 <strong>Animated Particles:</strong> Show active data transfer</p>
                     <p>💡 <strong>Strength Dots:</strong> Connection quality indicator</p>
                   </div>
                 </div>
               </div>
                 </>
               )}
             </motion.div>

                 {/* Control Buttons */}
         {!isFullScreen && (
           <div className="absolute top-8 right-8 flex gap-3 z-20">
             <motion.button
               onClick={() => setShowConnections(!showConnections)}
               className={`backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/30 hover:bg-white transition-all duration-200 group ${
                 showConnections ? 'bg-blue-500/90 text-white' : 'bg-white/90 text-gray-700'
               }`}
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 1.4 }}
               whileHover={{ scale: 1.05 }}
             >
               <GitBranch className="w-5 h-5 group-hover:text-gray-900" />
             </motion.button>
             <motion.button
               onClick={toggleFullScreen}
               className="bg-white/90 backdrop-blur-sm p-3 rounded-xl shadow-lg border border-white/30 hover:bg-white transition-all duration-200 group"
               initial={{ opacity: 0, scale: 0.8 }}
               animate={{ opacity: 1, scale: 1 }}
               transition={{ delay: 1.6 }}
               whileHover={{ scale: 1.05 }}
             >
               <Maximize2 className="w-5 h-5 text-gray-700 group-hover:text-gray-900" />
             </motion.button>
           </div>
         )}
      </div>
    </div>
  )
}
