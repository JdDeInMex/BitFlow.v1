import React, { useState, useEffect, useRef } from 'react';
import * as THREE from 'three';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import { X, ChevronLeft, ChevronRight, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react';
import './UseCases.css';

// Definições das categorias e mapeamentos de cores
const CATEGORIES = {
  finance: { color: '#00ff88', name: 'Finance & DeFi' },
  gaming: { color: '#0099ff', name: 'Gaming & Entertainment' },
  health: { color: '#ff0066', name: 'Healthcare' },
  governance: { color: '#ffbb00', name: 'Governance' },
  tech: { color: '#9900ff', name: 'Advanced Technology' },
  realWorld: { color: '#00ddff', name: 'Real World Applications' },
};

// Lista completa das 111 soluções
const ALL_SOLUTIONS = [
  // Finance & DeFi
  { id: 1, category: 'finance', title: 'Instantaneous Global Payments', description: 'Send money anywhere instantly' },
  { id: 2, category: 'finance', title: 'Decentralized Lending', description: 'Borrow without intermediaries' },
  { id: 3, category: 'finance', title: 'Tokenized Securities', description: '24/7 stock market' },
  { id: 4, category: 'finance', title: 'Automated Market Making', description: 'Liquidity without order books' },
  { id: 5, category: 'finance', title: 'Cross-Chain Swaps', description: 'Trade assets across blockchains' },
  { id: 6, category: 'finance', title: 'Yield Optimization', description: 'Maximize returns automatically' },
  { id: 7, category: 'finance', title: 'Decentralized Insurance', description: 'Coverage without insurers' },
  { id: 8, category: 'finance', title: 'Fractional Ownership', description: 'Own 0.001% of valuable assets' },
  { id: 9, category: 'finance', title: 'Micro-Investments', description: 'Invest with pennies' },
  { id: 10, category: 'finance', title: 'Algorithmic Stablecoins', description: 'Stability without centralization' },
  { id: 11, category: 'finance', title: 'Real Estate Tokenization', description: 'Property ownership for everyone' },
  { id: 12, category: 'finance', title: 'P2P Derivatives', description: 'Options and futures without clearing houses' },
  { id: 13, category: 'finance', title: 'Decentralized Hedge Funds', description: 'Collective investment strategies' },
  { id: 14, category: 'finance', title: 'Instant Credit Scoring', description: 'Reputation-based lending' },
  { id: 15, category: 'finance', title: 'Dynamic Subscription', description: 'Pay-per-use services' },
  { id: 16, category: 'finance', title: 'Instant Insurance', description: 'Automatic claims via oracles' },
  { id: 17, category: 'finance', title: 'Carbon Credit Trading', description: 'Tokenized environmental assets' },
  { id: 18, category: 'finance', title: 'Quantum-Secured Transactions', description: 'Unhackable financial transfers' },
  
  // Gaming & Entertainment
  { id: 19, category: 'gaming', title: 'Play-to-Earn Economies', description: 'Earn real income playing games' },
  { id: 20, category: 'gaming', title: 'Creative Economy Platform', description: 'Monetize creativity directly' },
  { id: 21, category: 'gaming', title: 'Virtual Events & Experiences', description: 'Attend events globally' },
  { id: 22, category: 'gaming', title: 'NFT Marketplaces', description: 'Trade unique digital assets' },
  { id: 23, category: 'gaming', title: 'Cross-Game Asset Compatibility', description: 'Use items across different games' },
  { id: 24, category: 'gaming', title: 'Decentralized Media Distribution', description: 'Content without platforms' },
  { id: 25, category: 'gaming', title: 'Virtual Real Estate', description: 'Own and develop metaverse land' },
  { id: 26, category: 'gaming', title: 'Blockchain Esports', description: 'Transparent competitions and rewards' },
  { id: 27, category: 'gaming', title: 'Fan Engagement Tokens', description: 'Direct connection with creators' },
  { id: 28, category: 'gaming', title: 'Royalty Distribution Systems', description: 'Automatic payments to creators' },
  { id: 29, category: 'gaming', title: 'Virtual Fashion', description: 'Digital wearables for avatars' },
  { id: 30, category: 'gaming', title: 'Content Authenticity Verification', description: 'Prove original content' },
  { id: 31, category: 'gaming', title: 'AI-Generated Content Markets', description: 'Trade AI-created art and media' },
  { id: 32, category: 'gaming', title: 'Attention Economy Tools', description: 'Monetize viewership' },
  { id: 33, category: 'gaming', title: 'Immersive Entertainment', description: 'Next-gen interactive experiences' },
  
  // Healthcare
  { id: 34, category: 'health', title: 'Universal Health Records', description: 'Secure global medical access' },
  { id: 35, category: 'health', title: 'Telemedicine Platform', description: 'Remote healthcare with payments' },
  { id: 36, category: 'health', title: 'Medical Research Collaboration', description: 'Secure data sharing' },
  { id: 37, category: 'health', title: 'Automated Pharmacy', description: 'On-chain prescriptions' },
  { id: 38, category: 'health', title: 'Health Data Monetization', description: 'Control and sell your health data' },
  { id: 39, category: 'health', title: 'Clinical Trial Management', description: 'Transparent medical testing' },
  { id: 40, category: 'health', title: 'Personalized Medicine', description: 'AI-optimized treatments' },
  { id: 41, category: 'health', title: 'Remote Patient Monitoring', description: 'IoT health devices on blockchain' },
  { id: 42, category: 'health', title: 'Genomic Data Marketplace', description: 'DNA sequencing economy' },
  { id: 43, category: 'health', title: 'Mental Health Tracking', description: 'Secure emotional wellbeing data' },
  { id: 44, category: 'health', title: 'Vaccination Verification', description: 'Tamper-proof health records' },
  { id: 45, category: 'health', title: 'Emergency Response Coordination', description: 'Decentralized crisis management' },
  { id: 46, category: 'health', title: 'Healthcare Provider Reputation', description: 'Verifiable quality metrics' },
  { id: 47, category: 'health', title: 'Medical Supply Chain', description: 'Transparent equipment tracking' },
  { id: 48, category: 'health', title: 'Wellness Rewards', description: 'Get paid for healthy choices' },
  
  // Governance
  { id: 49, category: 'governance', title: 'Secure Voting Systems', description: 'Incorruptible elections' },
  { id: 50, category: 'governance', title: 'Participatory Budgeting', description: 'Community financial decisions' },
  { id: 51, category: 'governance', title: 'Total Transparency', description: 'Trackable public spending' },
  { id: 52, category: 'governance', title: 'Sovereign Identity', description: 'Self-sovereign digital ID' },
  { id: 53, category: 'governance', title: 'DAO Frameworks', description: 'Autonomous organization tools' },
  { id: 54, category: 'governance', title: 'Legal Smart Contracts', description: 'Automated legal agreements' },
  { id: 55, category: 'governance', title: 'Public Service Efficiency', description: 'Optimized government services' },
  { id: 56, category: 'governance', title: 'Community Decision Making', description: 'Collective governance tools' },
  { id: 57, category: 'governance', title: 'Digital Rights Management', description: 'Protect intellectual property' },
  { id: 58, category: 'governance', title: 'Policy Experimentation', description: 'Test governance models' },
  { id: 59, category: 'governance', title: 'Digital Constitutions', description: 'Immutable community rules' },
  { id: 60, category: 'governance', title: 'Public Record Verification', description: 'Validate government documents' },
  { id: 61, category: 'governance', title: 'Transparent Lobbying', description: 'See who influences policy' },
  { id: 62, category: 'governance', title: 'Social Impact Tracking', description: 'Measure policy outcomes' },
  { id: 63, category: 'governance', title: 'Cross-Border Governance', description: 'Global coordination systems' },
  { id: 64, category: 'governance', title: 'Whistleblower Protection', description: 'Secure anonymous reporting' },
  
  // Advanced Technology
  { id: 65, category: 'tech', title: 'Distributed Rendering', description: 'Global GPU sharing' },
  { id: 66, category: 'tech', title: 'On-Chain Physics Engine', description: 'Decentralized realistic physics' },
  { id: 67, category: 'tech', title: 'Quantum Computing Service', description: '1000x faster computing' },
  { id: 68, category: 'tech', title: 'AI Smart Contracts', description: 'Self-improving code' },
  { id: 69, category: 'tech', title: 'Decentralized Machine Learning', description: 'Collaborative AI training' },
  { id: 70, category: 'tech', title: 'Blockchain Data Storage', description: 'Immutable distributed storage' },
  { id: 71, category: 'tech', title: 'Neural Interface Integration', description: 'Brain-computer blockchain access' },
  { id: 72, category: 'tech', title: 'Molecular Simulation', description: 'Quantum chemistry modeling' },
  { id: 73, category: 'tech', title: 'Edge Computing Network', description: 'Decentralized processing grid' },
  { id: 74, category: 'tech', title: 'Zero-Knowledge Applications', description: 'Privacy-preserving computation' },
  { id: 75, category: 'tech', title: 'Quantum-Resistant Cryptography', description: 'Future-proof security' },
  { id: 76, category: 'tech', title: 'Autonomous Agent Networks', description: 'Self-operating AI systems' },
  { id: 77, category: 'tech', title: 'Interplanetary File System', description: 'Content-addressed storage' },
  { id: 78, category: 'tech', title: 'Holographic Display Protocol', description: '3D visualization standards' },
  { id: 79, category: 'tech', title: 'Advanced Cryptographic Primitives', description: 'Next-gen security tools' },
  { id: 80, category: 'tech', title: 'Synthetic Biology Registry', description: 'DNA code on blockchain' },
  { id: 81, category: 'tech', title: 'Avatar Persistence', description: 'Cross-metaverse identity' },
  { id: 82, category: 'tech', title: 'Asset Portability', description: 'Use items in any world' },
  { id: 83, category: 'tech', title: 'Quantum Cryptanalysis', description: 'Security auditing tools' },
  { id: 84, category: 'tech', title: 'Market Prediction AI', description: 'Algorithmic native trading' },
  { id: 85, category: 'tech', title: 'Fraud Detection', description: 'Real-time protection' },
  
  // Real World Applications
  { id: 86, category: 'realWorld', title: 'IoT Connectivity', description: '100B+ connected devices' },
  { id: 87, category: 'realWorld', title: 'M2M Micropayments', description: 'Machine-to-machine economy' },
  { id: 88, category: 'realWorld', title: 'Supply Chain Tracking', description: 'Molecular-level tracing' },
  { id: 89, category: 'realWorld', title: 'Smart Cities', description: 'Tokenized infrastructure' },
  { id: 90, category: 'realWorld', title: 'Autonomous Vehicles', description: 'Self-paying cars' },
  { id: 91, category: 'realWorld', title: 'Smart Home Systems', description: 'Self-managing appliances' },
  { id: 92, category: 'realWorld', title: 'Agricultural Optimization', description: 'Precision farming tools' },
  { id: 93, category: 'realWorld', title: 'Energy Grid Management', description: 'Decentralized power systems' },
  { id: 94, category: 'realWorld', title: 'Carbon Credit Markets', description: 'Environmental impact trading' },
  { id: 95, category: 'realWorld', title: 'Waste Management', description: 'Recycling incentive systems' },
  { id: 96, category: 'realWorld', title: 'Digital Twins', description: 'Virtual replicas of physical assets' },
  { id: 97, category: 'realWorld', title: 'Space Economy', description: 'Interplanetary commerce' },
  { id: 98, category: 'realWorld', title: 'Resource Mining', description: 'Asteroid tokenization' },
  { id: 99, category: 'realWorld', title: 'Quantum Communication', description: 'Instant messaging across space' },
  { id: 100, category: 'realWorld', title: 'Space Governance', description: 'Interplanetary DAOs' },
  { id: 101, category: 'realWorld', title: 'Drone Networks', description: 'Autonomous aerial systems' },
  { id: 102, category: 'realWorld', title: 'Water Quality Monitoring', description: 'Real-time pollution detection' },
  { id: 103, category: 'realWorld', title: 'Wildlife Conservation', description: 'Animal tracking and protection' },
  { id: 104, category: 'realWorld', title: 'Climate Modeling', description: 'Decentralized weather prediction' },
  { id: 105, category: 'realWorld', title: 'Disaster Response', description: 'Coordinated emergency systems' },
  { id: 106, category: 'realWorld', title: 'Smart Roads', description: 'Interactive transportation infrastructure' },
  { id: 107, category: 'realWorld', title: 'Construction Management', description: 'Building progress verification' },
  { id: 108, category: 'realWorld', title: 'Material Verification', description: 'Confirm authentic components' },
  { id: 109, category: 'realWorld', title: 'Education Certificates', description: 'Immutable diplomas' },
  { id: 110, category: 'realWorld', title: 'Learn-to-Earn', description: 'Get paid for learning' },
  { id: 111, category: 'realWorld', title: 'Global Mentorship', description: 'Connect with experts worldwide' },
];

const UseCases3DExplorer = () => {
  const containerRef = useRef(null);
  const sceneRef = useRef(null);
  const cameraRef = useRef(null);
  const rendererRef = useRef(null);
  const labelRendererRef = useRef(null);
  const raycasterRef = useRef(new THREE.Raycaster());
  const mouseRef = useRef(new THREE.Vector2());
  const nodeGroupRef = useRef(null);
  
  const [selectedSolution, setSelectedSolution] = useState(null);
  const [hoveredSolution, setHoveredSolution] = useState(null);
  const [activeCategory, setActiveCategory] = useState('all');
  const [view, setView] = useState('sphere'); // 'sphere', 'galaxy', 'grid'
  const [isLoading, setIsLoading] = useState(true);
  const [zoomLevel, setZoomLevel] = useState(1800);
  const [showControls, setShowControls] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [isRotating, setIsRotating] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const solutionsPerPage = 20;
  
  const maxPages = Math.ceil(ALL_SOLUTIONS.length / solutionsPerPage);
  
  // Filtrar soluções por categoria e paginação
  const filteredSolutions = activeCategory === 'all' 
    ? ALL_SOLUTIONS 
    : ALL_SOLUTIONS.filter(solution => solution.category === activeCategory);
    
  const paginatedSolutions = activeCategory === 'all'
    ? ALL_SOLUTIONS.slice(currentPage * solutionsPerPage, (currentPage + 1) * solutionsPerPage)
    : filteredSolutions;
  
  // Função para abrir modal com formato original
  const openModal = (solution) => {
    setSelectedSolution(solution);
    setIsModalOpen(true);
  };
  
  // Função para fechar modal
  const closeModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setSelectedSolution(null), 300);
  };
  
  // Configurar cena Three.js
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Criar cena
    const scene = new THREE.Scene();
    scene.background = new THREE.Color('#0a0a0f');
    sceneRef.current = scene;
    
    // Adicionar luz ambiente
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);
    
    // Adicionar luz direcional
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);
    
    // Adicionar luzes pontuais para melhor iluminação
    const pointLight1 = new THREE.PointLight(0x00ff88, 5, 2000);
    pointLight1.position.set(500, 500, 500);
    scene.add(pointLight1);
    
    const pointLight2 = new THREE.PointLight(0x0099ff, 5, 2000);
    pointLight2.position.set(-500, -500, 500);
    scene.add(pointLight2);
    
    const pointLight3 = new THREE.PointLight(0xff0066, 5, 2000);
    pointLight3.position.set(0, 0, -1000);
    scene.add(pointLight3);
    
    // Configurar câmera
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    const camera = new THREE.PerspectiveCamera(45, width / height, 1, 10000);
    camera.position.z = zoomLevel;
    cameraRef.current = camera;
    
    // Configurar renderizador
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // Limitar para melhor performance
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Configurar renderizador de rótulos CSS
    const labelRenderer = new CSS2DRenderer();
    labelRenderer.setSize(width, height);
    labelRenderer.domElement.style.position = 'absolute';
    labelRenderer.domElement.style.top = '0';
    labelRenderer.domElement.style.pointerEvents = 'none';
    containerRef.current.appendChild(labelRenderer.domElement);
    labelRendererRef.current = labelRenderer;
    
    // Criar grupo de nós
    const nodeGroup = new THREE.Group();
    scene.add(nodeGroup);
    nodeGroupRef.current = nodeGroup;
    
    // Adicionar event listeners
    const handleResizeTyped = () => handleResize();
    
    const handleMouseMoveTyped = (e) => {
      if (!containerRef.current || !cameraRef.current || !sceneRef.current || !nodeGroupRef.current) return;
      
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      
      const intersects = raycasterRef.current.intersectObjects(nodeGroupRef.current.children, true);
      
      // Verificar se está sobre uma bolinha e parar completamente a rotação
      if (intersects.length > 0) {
        const firstIntersect = intersects.find(intersect => 
          intersect.object.userData.solution || 
          (intersect.object.parent && intersect.object.parent.userData.solution)
        );
        
        if (firstIntersect) {
          const solution = firstIntersect.object.userData.solution || 
                          (firstIntersect.object.parent && firstIntersect.object.parent.userData.solution);
                          
          if (solution) {
            setHoveredSolution(solution);
            document.body.style.cursor = 'pointer';
            
            // CORREÇÃO: Parar completamente a rotação e manter parado
            setIsRotating(false);
          }
        }
      } else {
        setHoveredSolution(null);
        document.body.style.cursor = 'default';
        
        // CORREÇÃO: Retomar a rotação apenas quando o mouse não está sobre nenhuma bolinha
        setIsRotating(true);
      }
    };
    
    const handleClickTyped = (e) => {
      if (!containerRef.current || !cameraRef.current || !sceneRef.current || !nodeGroupRef.current) return;
      
      const rect = renderer.domElement.getBoundingClientRect();
      mouseRef.current.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseRef.current.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      
      raycasterRef.current.setFromCamera(mouseRef.current, cameraRef.current);
      
      const intersects = raycasterRef.current.intersectObjects(nodeGroupRef.current.children, true);
      
      if (intersects.length > 0) {
        const firstIntersect = intersects.find(intersect => 
          intersect.object.userData.solution || 
          (intersect.object.parent && intersect.object.parent.userData.solution)
        );
        
        if (firstIntersect) {
          const solution = firstIntersect.object.userData.solution || 
                          (firstIntersect.object.parent && firstIntersect.object.parent.userData.solution);
                          
          if (solution) {
            // CORREÇÃO: Abrir modal no formato original
            openModal(solution);
          }
        }
      }
    };
    
    window.addEventListener('resize', handleResizeTyped);
    renderer.domElement.addEventListener('mousemove', handleMouseMoveTyped);
    renderer.domElement.addEventListener('click', handleClickTyped);
    
    // Loop de animação
    const animate = () => {
      if (!sceneRef.current || !cameraRef.current || !rendererRef.current) return;
      
      requestAnimationFrame(animate);
      
      // CORREÇÃO: Rotação apenas quando isRotating é true
      if (nodeGroupRef.current && isRotating) {
        nodeGroupRef.current.rotation.y += 0.001;
        nodeGroupRef.current.rotation.x += 0.0005;
      }
      
      rendererRef.current.render(sceneRef.current, cameraRef.current);
      
      // Renderizar rótulos CSS
      if (labelRendererRef.current && sceneRef.current && cameraRef.current) {
        labelRendererRef.current.render(sceneRef.current, cameraRef.current);
      }
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResizeTyped);
      if (rendererRef.current && rendererRef.current.domElement) {
        rendererRef.current.domElement.removeEventListener('mousemove', handleMouseMoveTyped);
        rendererRef.current.domElement.removeEventListener('click', handleClickTyped);
      }
      
      if (containerRef.current) {
        if (rendererRef.current && rendererRef.current.domElement) {
          containerRef.current.removeChild(rendererRef.current.domElement);
        }
        if (labelRendererRef.current && labelRendererRef.current.domElement) {
          containerRef.current.removeChild(labelRendererRef.current.domElement);
        }
      }
      
      // Liberar recursos
      if (rendererRef.current) {
        rendererRef.current.dispose();
      }
      
      if (sceneRef.current) {
        sceneRef.current.children.forEach(child => {
          disposeGeometryAndMaterial(child);
        });
      }
    };
  }, [zoomLevel]);
  
  // Função auxiliar para limpar recursos Three.js
  const disposeGeometryAndMaterial = (object) => {
    if ('geometry' in object && object.geometry) {
      object.geometry.dispose();
    }
    
    if ('material' in object && object.material) {
      const material = object.material;
      if (Array.isArray(material)) {
        material.forEach(m => m.dispose());
      } else {
        material.dispose();
      }
    }
  };
  
  // Atualizar visualização 3D quando as soluções, categoria ou visualização mudam
  useEffect(() => {
    if (!nodeGroupRef.current || !sceneRef.current) return;
    
    // Limpar nós anteriores
    while (nodeGroupRef.current.children.length > 0) {
      const child = nodeGroupRef.current.children[0];
      disposeGeometryAndMaterial(child);
      nodeGroupRef.current.remove(child);
    }
    
    // Criar nós para soluções
    const solutionsToRender = paginatedSolutions;
    
    // Definir layout com base no tipo de visualização
    let positionFunction;
    switch (view) {
      case 'sphere':
        positionFunction = (index, total) => {
          const phi = Math.acos(-1 + (2 * index) / total);
          const theta = Math.sqrt(total * Math.PI) * phi;
          const radius = 800;
          
          return {
            x: radius * Math.cos(theta) * Math.sin(phi),
            y: radius * Math.sin(theta) * Math.sin(phi),
            z: radius * Math.cos(phi)
          };
        };
        break;
        
      case 'galaxy':
        positionFunction = (index, total) => {
          const angle = index * 0.2;
          const radius = 100 + index * 5;
          
          return {
            x: Math.cos(angle) * radius,
            y: (Math.random() - 0.5) * 200,
            z: Math.sin(angle) * radius
          };
        };
        break;
        
      case 'grid':
      default:
        positionFunction = (index, total) => {
          const gridSize = Math.ceil(Math.sqrt(solutionsToRender.length));
          const xPos = (index % gridSize) * 150 - (gridSize * 150) / 2;
          const yPos = Math.floor(index / gridSize) * 150 - (gridSize * 150) / 2;
          
          return {
            x: xPos,
            y: yPos,
            z: 0
          };
        };
    }
    
    // Criar nós
    solutionsToRender.forEach((solution, index) => {
      const position = positionFunction(index, solutionsToRender.length);
      
      // Criar geometria do nó (esfera)
      const geometry = new THREE.SphereGeometry(20, 32, 32);
      
      // Criar material do nó (brilhante)
      const categoryKey = solution.category;
      const color = new THREE.Color(CATEGORIES[categoryKey]?.color || '#ffffff');
      const material = new THREE.MeshPhongMaterial({
        color: color,
        emissive: color,
        emissiveIntensity: 0.5,
        transparent: true,
        opacity: 0.9,
        shininess: 100
      });
      
      // Criar mesh do nó
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(position.x, position.y, position.z);
      mesh.userData = { solution };
      
      // Adicionar efeito de brilho
      const glowGeometry = new THREE.SphereGeometry(30, 32, 32);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: color,
        transparent: true,
        opacity: 0.15
      });
      const glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
      mesh.add(glowMesh);
      
      // CORREÇÃO: Adicionar rótulo de texto visível permanentemente
      const labelDiv = document.createElement('div');
      labelDiv.className = 'node-label';
      labelDiv.textContent = solution.title;
      labelDiv.style.color = 'white';
      labelDiv.style.fontSize = '12px';
      labelDiv.style.fontWeight = 'bold';
      labelDiv.style.padding = '4px 8px';
      labelDiv.style.background = 'rgba(0, 0, 0, 0.8)';
      labelDiv.style.borderRadius = '4px';
      labelDiv.style.whiteSpace = 'nowrap';
      labelDiv.style.pointerEvents = 'none';
      labelDiv.style.textAlign = 'center';
      labelDiv.style.maxWidth = '150px';
      labelDiv.style.overflow = 'hidden';
      labelDiv.style.textOverflow = 'ellipsis';
      
      const label = new CSS2DObject(labelDiv);
      label.position.set(0, 35, 0); // Posicionar acima da esfera
      mesh.add(label);
      
      // Adicionar à cena
      nodeGroupRef.current.add(mesh);
      
      // Adicionar linhas de conexão entre nós (opcional, para efeito visual)
      if (index > 0 && index < solutionsToRender.length - 1) {
        const nextPosition = positionFunction(index + 1, solutionsToRender.length);
        
        const points = [
          new THREE.Vector3(position.x, position.y, position.z),
          new THREE.Vector3(nextPosition.x, nextPosition.y, nextPosition.z)
        ];
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints(points);
        const lineMaterial = new THREE.LineBasicMaterial({ 
          color: 0x333333, 
          transparent: true,
          opacity: 0.3
        });
        const line = new THREE.Line(lineGeometry, lineMaterial);
        nodeGroupRef.current.add(line);
      }
    });
    
    setIsLoading(false);
  }, [paginatedSolutions, view, currentPage]);
  
  // Lidar com redimensionamento da janela
  const handleResize = () => {
    if (!containerRef.current || !cameraRef.current || !rendererRef.current || !labelRendererRef.current) return;
    
    const width = containerRef.current.clientWidth;
    const height = containerRef.current.clientHeight;
    
    cameraRef.current.aspect = width / height;
    cameraRef.current.updateProjectionMatrix();
    rendererRef.current.setSize(width, height);
    labelRendererRef.current.setSize(width, height);
  };
  
  // Lidar com zoom in/out
  const handleZoom = (direction) => {
    if (!cameraRef.current) return;
    
    const newZoom = direction === 'in' 
      ? Math.max(zoomLevel - 200, 800) 
      : Math.min(zoomLevel + 200, 2400);
      
    setZoomLevel(newZoom);
    cameraRef.current.position.z = newZoom;
  };
  
  // Resetar visualização
  const resetView = () => {
    if (!cameraRef.current || !nodeGroupRef.current) return;
    
    // Resetar zoom
    setZoomLevel(1800);
    cameraRef.current.position.z = 1800;
    
    // Resetar rotação
    nodeGroupRef.current.rotation.x = 0;
    nodeGroupRef.current.rotation.y = 0;
  };
  
  // Navegação entre páginas
  const goToNextPage = () => {
    if (currentPage < maxPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };
  
  const goToPrevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="use-cases-3d-container">
      {/* Indicador de carregamento */}
      {isLoading && (
        <div className="loading-overlay">
          <div className="loading-spinner"></div>
          <div className="loading-text">Loading Solutions...</div>
        </div>
      )}
      
      {/* Filtro de categoria e controle de visualização */}
      <div className="controls-container">
        <div className="category-filters">
          <button 
            className={`category-button ${activeCategory === 'all' ? 'active' : ''}`}
            onClick={() => {setActiveCategory('all'); setCurrentPage(0);}}
          >
            All Solutions
          </button>
          
          {Object.entries(CATEGORIES).map(([key, cat]) => (
            <button 
              key={key}
              className={`category-button ${activeCategory === key ? 'active' : ''}`}
              style={{
                '--category-color': cat.color,
                borderColor: activeCategory === key ? cat.color : 'transparent',
                color: activeCategory === key ? cat.color : 'rgba(255,255,255,0.7)'
              }}
              onClick={() => {setActiveCategory(key); setCurrentPage(0);}}
            >
              {cat.name}
            </button>
          ))}
        </div>
        
        <div className="view-controls">
          <select 
            value={view} 
            onChange={(e) => setView(e.target.value)}
            className="view-selector"
          >
            <option value="sphere">Sphere View</option>
            <option value="galaxy">Galaxy View</option>
            <option value="grid">Grid View</option>
          </select>
          
          <button className="control-button" onClick={() => handleZoom('in')}>
            <ZoomIn size={16} />
          </button>
          <button className="control-button" onClick={() => handleZoom('out')}>
            <ZoomOut size={16} />
          </button>
          <button className="control-button" onClick={resetView}>
            <RotateCcw size={16} />
          </button>
        </div>
      </div>
      
      {/* Controles de paginação */}
      {activeCategory === 'all' && (
        <div className="pagination-controls">
          <button 
            className="page-button" 
            onClick={goToPrevPage}
            disabled={currentPage === 0}
          >
            <ChevronLeft size={16} />
          </button>
          <span className="page-info">
            {currentPage + 1} / {maxPages}
          </span>
          <button 
            className="page-button" 
            onClick={goToNextPage}
            disabled={currentPage >= maxPages - 1}
          >
            <ChevronRight size={16} />
          </button>
        </div>
      )}
      
      {/* Container de visualização 3D */}
      <div 
        ref={containerRef} 
        className="visualization-container"
        style={{ height: '100%' }}
      ></div>
      
      {/* CORREÇÃO: Modal no formato original */}
      {isModalOpen && selectedSolution && (
        <div className="modal-overlay" onClick={closeModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <div className="modal-icon">{
                selectedSolution.category === 'finance' ? '💸' :
                selectedSolution.category === 'gaming' ? '🎮' :
                selectedSolution.category === 'health' ? '🫀' :
                selectedSolution.category === 'governance' ? '🏛️' :
                selectedSolution.category === 'tech' ? '⚛️' : 
                '🌍' // realWorld
              }</div>
              <h2>{selectedSolution.title}</h2>
              <button className="close-button" onClick={closeModal}>✕</button>
            </div>
            
            <div className="modal-body">
              <p className="modal-description">{selectedSolution.description}</p>
              
              <div className="real-world-example">
                <h4>💡 Real World Example</h4>
                <p>This solution is already changing how businesses operate around the world.</p>
              </div>
              
              <div className="modal-sections">
                <div className="modal-section">
                  <h4>⚡ Key Features</h4>
                  <ul>
                    <li>Global accessibility and instant deployment</li>
                    <li>Trustless operation without intermediaries</li>
                    <li>Transparent and immutable records</li>
                    <li>Enhanced security through decentralization</li>
                    <li>Automated compliance and verification</li>
                  </ul>
                </div>
                
                <div className="modal-section">
                  <h4>🎁 Benefits</h4>
                  <ul>
                    <li>Reduced costs by up to 90%</li>
                    <li>Elimination of central points of failure</li>
                    <li>24/7 operation without interruptions</li>
                    <li>Seamless global reach without barriers</li>
                    <li>Future-proof scalability</li>
                  </ul>
                </div>
              </div>
              
              <div className="modal-stats">
                <div className="modal-stat">
                  <div className="stat-label">Market Size</div>
                  <div className="stat-value">$100B+ Annually</div>
                </div>
                
                <div className="modal-stat">
                  <div className="stat-label">Potential</div>
                  <div className="stat-value">Transformative</div>
                </div>
              </div>
            </div>
            
            <div className="modal-footer">
              <button className="primary-button" onClick={closeModal}>Join the Presale</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .use-cases-3d-container {
          position: relative;
          width: 100%;
          height: 800px;
          background-color: #0a0a0f;
          overflow: hidden;
          font-family: 'Inter', sans-serif;
        }
        
        .visualization-container {
          position: relative;
          width: 100%;
          height: 100%;
          transition: height 0.3s ease;
        }
        
        .loading-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background-color: rgba(10, 10, 15, 0.9);
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 100;
        }
        
        .loading-spinner {
          width: 50px;
          height: 50px;
          border: 3px solid rgba(0, 255, 136, 0.3);
          border-radius: 50%;
          border-top-color: #00ff88;
          animation: spin 1s ease-in-out infinite;
          margin-bottom: 20px;
        }
        
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        
        .loading-text {
          color: #ffffff;
          font-size: 18px;
          font-weight: 600;
        }
        
        .controls-container {
          position: absolute;
          top: 20px;
          left: 20px;
          right: 20px;
          z-index: 10;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .category-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }
        
        .category-button {
          background-color: rgba(255, 255, 255, 0.05);
          border: 2px solid transparent;
          color: rgba(255, 255, 255, 0.7);
          padding: 8px 16px;
          border-radius: 20px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .category-button:hover {
          background-color: rgba(255, 255, 255, 0.1);
          color: #ffffff;
        }
        
        .category-button.active {
          background-color: rgba(255, 255, 255, 0.1);
          border-color: var(--category-color, #00ff88);
          color: var(--category-color, #00ff88);
          box-shadow: 0 0 15px rgba(var(--category-color, 0, 255, 136), 0.3);
        }
        
        .view-controls {
          display: flex;
          gap: 8px;
          align-items: center;
        }
        
        .view-selector {
          background-color: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          border: none;
          padding: 8px 12px;
          border-radius: 8px;
          font-size: 14px;
          outline: none;
        }
        
        .control-button {
          background-color: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          border: none;
          width: 36px;
          height: 36px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .control-button:hover {
          background-color: rgba(255, 255, 255, 0.2);
          transform: translateY(-2px);
        }
        
        .pagination-controls {
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: rgba(0, 0, 0, 0.5);
          padding: 8px 16px;
          border-radius: 20px;
          z-index: 10;
        }
        
        .page-button {
          background-color: rgba(255, 255, 255, 0.1);
          color: #ffffff;
          border: none;
          width: 30px;
          height: 30px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        
        .page-button:disabled {
          opacity: 0.3;
          cursor: not-allowed;
        }
        
        .page-button:not(:disabled):hover {
          background-color: rgba(255, 255, 255, 0.2);
        }
        
        .page-info {
          color: #ffffff;
          font-size: 14px;
          font-weight: 600;
          min-width: 60px;
          text-align: center;
        }
        
        /* Modal Styles - Formato Original */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          backdrop-filter: blur(5px);
          animation: fadeIn 0.3s ease;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        .modal-content {
          background: rgba(15, 15, 20, 0.95);
          border-radius: 20px;
          width: 90%;
          max-width: 800px;
          max-height: 90vh;
          overflow-y: auto;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          border: 1px solid rgba(255, 255, 255, 0.1);
          animation: slideUp 0.3s ease;
        }
        
        @keyframes slideUp {
          from { transform: translateY(30px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .modal-header {
          display: flex;
          align-items: center;
          padding: 20px 30px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          position: relative;
        }
        
        .modal-icon {
          width: 50px;
          height: 50px;
          background: var(--gradient-primary, linear-gradient(135deg, #00ff88, #0099ff));
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 24px;
          margin-right: 15px;
          box-shadow: var(--glow-primary, 0 0 20px rgba(0, 255, 136, 0.3));
        }
        
        .modal-header h2 {
          font-family: 'Montserrat', sans-serif;
          font-size: 24px;
          font-weight: 700;
          color: white;
          flex: 1;
          margin: 0;
        }
        
        .close-button {
          background: transparent;
          border: none;
          color: rgba(255, 255, 255, 0.6);
          font-size: 20px;
          cursor: pointer;
          padding: 5px;
          transition: all 0.2s ease;
        }
        
        .close-button:hover {
          color: white;
          transform: scale(1.1);
        }
        
        .modal-body {
          padding: 30px;
        }
        
        .modal-description {
          font-size: 16px;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 20px;
        }
        
        .real-world-example {
          background: rgba(0, 255, 136, 0.1);
          border-left: 3px solid #00ff88;
          padding: 15px 20px;
          border-radius: 8px;
          margin-bottom: 25px;
        }
        
        .real-world-example h4 {
          font-size: 16px;
          font-weight: 600;
          color: #00ff88;
          margin: 0 0 10px 0;
        }
        
        .real-world-example p {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
        }
        
        .modal-sections {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 30px;
          margin-bottom: 30px;
        }
        
        .modal-section h4 {
          font-size: 16px;
          font-weight: 600;
          color: white;
          margin: 0 0 15px 0;
        }
        
        .modal-section ul {
          padding-left: 20px;
          margin: 0;
        }
        
        .modal-section li {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 8px;
          line-height: 1.5;
        }
        
        .modal-stats {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-bottom: 20px;
        }
        
        .modal-stat {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          padding: 15px;
          text-align: center;
        }
        
        .modal-stat .stat-label {
          font-size: 12px;
          text-transform: uppercase;
          letter-spacing: 1px;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 5px;
        }
        
        .modal-stat .stat-value {
          font-size: 18px;
          font-weight: 700;
          color: #00ff88;
        }
        
        .modal-footer {
          padding: 20px 30px;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          display: flex;
          justify-content: center;
        }
        
        .primary-button {
          background: linear-gradient(135deg, #00ff88, #0099ff);
          color: white;
          padding: 12px 30px;
          border-radius: 30px;
          font-weight: 600;
          font-size: 16px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          text-decoration: none;
          display: inline-block;
        }
        
        .primary-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 10px 25px rgba(0, 255, 136, 0.4);
        }
        
        /* Estilo específico para rótulos */
        .node-label {
          opacity: 1 !important;
          transition: opacity 0.3s ease;
          pointer-events: none;
        }
        
        /* Design responsivo */
        @media (max-width: 768px) {
          .controls-container {
            flex-direction: column;
            align-items: flex-start;
            gap: 12px;
          }
          
          .view-controls {
            width: 100%;
            justify-content: flex-start;
          }
          
          .modal-sections {
            grid-template-columns: 1fr;
          }
          
          .modal-content {
            width: 95%;
          }
        }
        
        @media (max-width: 480px) {
          .category-filters {
            width: 100%;
            overflow-x: auto;
            padding-bottom: 8px;
            -webkit-overflow-scrolling: touch;
            white-space: nowrap;
            flex-wrap: nowrap;
          }
          
          .category-button {
            flex-shrink: 0;
          }
          
          .modal-header h2 {
            font-size: 18px;
          }
        }
      `}</style>
    </div>
  );
};

export default UseCases3DExplorer;