import React, { useState, useEffect, useRef } from 'react';
import './Solutions.css';
import { solutionsData } from './solutionsData';
import * as d3 from 'd3';

// Interfaces
interface Solution {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  icon: string;
  category: string;
  subcategory: string;
  status: 'developing' | 'completed' | 'planned';
  features: string[];
  benefits: string[];
  useCase?: string;
  marketSize?: string;
  potential?: string;
  timeframe?: string;
  relatedSolutions: Array<{
    id: string;
    name: string;
    icon: string;
  }>;
  layer?: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories?: Array<{
    id: string;
    name: string;
  }>;
}

const Solutions: React.FC = () => {
  // Estados
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [activeSubcategory, setActiveSubcategory] = useState<string>('all');
  const [activeView, setActiveView] = useState<'grid' | 'mindmap' | 'layers'>('grid');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [selectedSolution, setSelectedSolution] = useState<Solution | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [filteredSolutions, setFilteredSolutions] = useState<Solution[]>(solutionsData);
  const [visibleSolutions, setVisibleSolutions] = useState<Solution[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('title');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');
  
  const mindmapRef = useRef<SVGSVGElement>(null);
  const solutionsPerPage = 12;

  // Categorias
  const categories: Category[] = [
    { id: 'all', name: 'Todas as Soluções', icon: '🔍' },
    { id: 'architecture', name: 'Arquitetura Técnica', icon: '⚡' },
    { id: 'features', name: 'Recursos Core', icon: '💎' },
    { id: 'smart-contracts', name: 'Smart Contracts', icon: '📜' },
    { id: 'tokenization', name: 'Tokenização', icon: '🏠' },
    { id: 'metaverse', name: 'Metaverso & Gaming', icon: '🥽' },
    { id: 'emerging', name: 'Tecnologias Emergentes', icon: '⚛️' },
    { id: 'financial', name: 'Infraestrutura Financeira', icon: '🏦' },
    { id: 'sustainability', name: 'Sustentabilidade & Analytics', icon: '🌱' },
    { id: 'interoperability', name: 'Comunicação e Interoperabilidade', icon: '🌉' }
  ];

  // Camadas da arquitetura
  const architectureLayers = [
    { id: 'dapps', name: 'Aplicações dApps', badge: 'User Interface Layer' },
    { id: 'smart-contracts', name: 'Smart Contracts 3.0', badge: 'Intelligence Layer' },
    { id: 'protocol', name: 'HyperLayer0 Protocol', badge: 'Core Infrastructure' },
    { id: 'quantum', name: 'Quantum Mesh Network', badge: 'Synchronization Layer' },
    { id: 'bridge', name: 'Universal Bridge Protocol', badge: 'Interoperability Layer' },
    { id: 'blockchains', name: 'Connected Blockchains', badge: 'Foundation Layer' }
  ];

  // Filtrar soluções
  useEffect(() => {
    let results = [...solutionsData];

    // Filtro por categoria
    if (activeCategory !== 'all') {
      results = results.filter(solution => solution.category === activeCategory);
    }

    // Filtro por subcategoria
    if (activeSubcategory !== 'all') {
      results = results.filter(solution => solution.subcategory === activeSubcategory);
    }

    // Filtro por status
    if (statusFilter !== 'all') {
      results = results.filter(solution => solution.status === statusFilter);
    }

    // Filtro por termo de busca
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      results = results.filter(
        solution =>
          solution.title.toLowerCase().includes(term) ||
          solution.shortDescription.toLowerCase().includes(term) ||
          solution.description.toLowerCase().includes(term)
      );
    }

    // Ordenação
    results.sort((a, b) => {
      let valueA = a[sortBy as keyof Solution];
      let valueB = b[sortBy as keyof Solution];
      
      // Garantir que estamos trabalhando com strings para comparação
      valueA = typeof valueA === 'string' ? valueA : String(valueA);
      valueB = typeof valueB === 'string' ? valueB : String(valueB);
      
      const comparison = valueA.localeCompare(valueB);
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    setFilteredSolutions(results);
    setCurrentPage(1);
  }, [activeCategory, activeSubcategory, searchTerm, statusFilter, sortBy, sortDirection]);

  // Paginação
  useEffect(() => {
    const startIndex = (currentPage - 1) * solutionsPerPage;
    setVisibleSolutions(filteredSolutions.slice(startIndex, startIndex + solutionsPerPage));
  }, [filteredSolutions, currentPage]);

  // Implementação do mapa mental
  useEffect(() => {
    if (activeView === 'mindmap' && mindmapRef.current) {
      createMindMap();
    }
  }, [activeView, filteredSolutions]);

  // Função para criar o mapa mental
  const createMindMap = () => {
    if (!mindmapRef.current) return;

    // Limpar SVG
    d3.select(mindmapRef.current).selectAll("*").remove();

    const width = 1000;
    const height = 800;
    const svg = d3.select(mindmapRef.current)
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", `0 0 ${width} ${height}`);

    // Criar dados hierárquicos
    const hierarchyData = {
      name: "HyperLayer0",
      children: categories
        .filter(category => category.id !== 'all')
        .map(category => {
          return {
            name: category.name,
            icon: category.icon,
            children: filteredSolutions
              .filter(solution => solution.category === category.id)
              .map(solution => ({
                name: solution.title,
                icon: solution.icon,
                solution: solution
              }))
          };
        })
    };

    // Criar layout
    const root = d3.hierarchy(hierarchyData);
    const treeLayout = d3.tree().size([height - 100, width - 200]);
    const treeData = treeLayout(root);

    // Grupo principal
    const g = svg.append("g")
      .attr("transform", `translate(100, 50)`);

    // Adicionar links
    g.selectAll(".link")
      .data(treeData.links())
      .join("path")
      .attr("class", "mindmap-link")
      .attr("d", d3.linkHorizontal()
        .x(d => d.y)
        .y(d => d.x));

    // Adicionar nós
    const node = g.selectAll(".node")
      .data(treeData.descendants())
      .join("g")
      .attr("class", d => `mindmap-node ${d.data.solution ? 'solution-node' : d.depth === 0 ? 'root-node' : 'category-node'}`)
      .attr("transform", d => `translate(${d.y}, ${d.x})`)
      .on("click", (event, d) => {
        if (d.data.solution) {
          handleSolutionSelect(d.data.solution);
        }
      });

    // Adicionar círculos
    node.append("circle")
      .attr("r", d => d.depth === 0 ? 40 : d.depth === 1 ? 30 : 20)
      .attr("class", d => d.depth === 0 ? 'root-circle' : d.depth === 1 ? 'category-circle' : 'solution-circle');

    // Adicionar ícones
    node.append("text")
      .attr("class", "node-icon")
      .attr("dy", "0.3em")
      .attr("text-anchor", "middle")
      .text(d => d.data.icon || '');

    // Adicionar texto
    node.append("text")
      .attr("class", "node-label")
      .attr("dy", d => d.depth === 0 ? 60 : d.depth === 1 ? 50 : 35)
      .attr("text-anchor", "middle")
      .text(d => d.data.name);

    // Adicionar zoom
    const zoom = d3.zoom()
      .scaleExtent([0.1, 3])
      .on("zoom", (event) => {
        g.attr("transform", event.transform);
      });

    svg.call(zoom);
  };

  // Manipuladores de eventos
  const handleCategoryChange = (categoryId: string) => {
    setActiveCategory(categoryId);
    setActiveSubcategory('all');
  };

  const handleSolutionSelect = (solution: Solution) => {
    setSelectedSolution(solution);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleViewChange = (view: 'grid' | 'mindmap' | 'layers') => {
    setActiveView(view);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSort = (field: string) => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  // Calcular total de páginas
  const totalPages = Math.ceil(filteredSolutions.length / solutionsPerPage);

  return (
    <div className="solutions-page">
      {/* Hero Section */}
      <section className="solutions-hero">
        <div className="hero-container">
          <h1 className="hero-title">
            <span className="gradient-text">111 Soluções</span> Revolucionárias
          </h1>
          <p className="hero-subtitle">
            A infraestrutura definitiva da Web3 construída sobre inovações tecnológicas que transformam completamente o universo blockchain.
          </p>
          
          <div className="hero-stats">
            <div className="stat-item">
              <div className="stat-number">111</div>
              <div className="stat-label">Soluções</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">9</div>
              <div className="stat-label">Categorias</div>
            </div>
            <div className="stat-item">
              <div className="stat-number">∞</div>
              <div className="stat-label">Possibilidades</div>
            </div>
          </div>
        </div>
      </section>

      {/* Navegação e Filtros */}
      <section className="solutions-navigation">
        <div className="navigation-container">
          <h2>Explore Nossas Inovações</h2>
          
          <div className="view-controls">
            <button 
              className={`view-button ${activeView === 'grid' ? 'active' : ''}`}
              onClick={() => handleViewChange('grid')}
            >
              <span className="view-icon">📱</span>
              <span className="view-label">Grid</span>
            </button>
            <button 
              className={`view-button ${activeView === 'mindmap' ? 'active' : ''}`}
              onClick={() => handleViewChange('mindmap')}
            >
              <span className="view-icon">🔄</span>
              <span className="view-label">Mapa Mental</span>
            </button>
            <button 
              className={`view-button ${activeView === 'layers' ? 'active' : ''}`}
              onClick={() => handleViewChange('layers')}
            >
              <span className="view-icon">📊</span>
              <span className="view-label">Camadas</span>
            </button>
          </div>
          
          <div className="search-filters">
            <div className="search-box">
              <input 
                type="text" 
                placeholder="Buscar soluções..." 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
              <button className="search-button">🔍</button>
            </div>
            
            <div className="filters">
              <div className="filter-group">
                <label>Status:</label>
                <select 
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">Todos</option>
                  <option value="developing">Em Desenvolvimento</option>
                  <option value="completed">Concluído</option>
                  <option value="planned">Planejado</option>
                </select>
              </div>
              
              <div className="filter-group">
                <label>Ordenar por:</label>
                <select 
                  value={sortBy}
                  onChange={(e) => handleSort(e.target.value)}
                  className="filter-select"
                >
                  <option value="title">Nome</option>
                  <option value="category">Categoria</option>
                  <option value="status">Status</option>
                </select>
                <button 
                  className="sort-direction"
                  onClick={() => setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')}
                >
                  {sortDirection === 'asc' ? '↑' : '↓'}
                </button>
              </div>
            </div>
          </div>
          
          <div className="categories-tabs">
            {categories.map((category) => (
              <button
                key={category.id}
                className={`category-tab ${activeCategory === category.id ? 'active' : ''}`}
                onClick={() => handleCategoryChange(category.id)}
              >
                <span className="category-icon">{category.icon}</span>
                <span className="category-label">{category.name}</span>
              </button>
            ))}
          </div>
          
          <div className="results-count">
            Mostrando {filteredSolutions.length} soluções
          </div>
        </div>
      </section>

      {/* Visualização em Grid */}
      {activeView === 'grid' && (
        <section className="solutions-grid-view">
          <div className="grid-container">
            <div className="solutions-grid">
              {visibleSolutions.map((solution) => (
                <div 
                  key={solution.id} 
                  className="solution-card"
                  onClick={() => handleSolutionSelect(solution)}
                >
                  <div className="card-header">
                    <div className="solution-icon">{solution.icon}</div>
                    <div className="solution-category">{solution.subcategory}</div>
                  </div>
                  <h3 className="solution-title">{solution.title}</h3>
                  <p className="solution-description">{solution.shortDescription}</p>
                  <div className="solution-footer">
                    <span className={`status-badge ${solution.status}`}>
                      {solution.status === 'developing' ? 'Em Desenvolvimento' : 
                       solution.status === 'completed' ? 'Concluído' : 'Planejado'}
                    </span>
                    <button className="details-button">Ver Detalhes</button>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Paginação */}
            {totalPages > 1 && (
              <div className="pagination">
                <button 
                  className="pagination-button"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                >
                  &lt;
                </button>
                
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    className={`pagination-button ${currentPage === page ? 'active' : ''}`}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </button>
                ))}
                
                <button 
                  className="pagination-button"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  &gt;
                </button>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Visualização em Mapa Mental */}
      {activeView === 'mindmap' && (
        <section className="solutions-mindmap-view">
          <div className="mindmap-container">
            <div className="view-instructions">
              <p>Visualize as conexões entre todas as soluções HyperLayer0. Use o zoom para navegar e clique em uma solução para ver detalhes.</p>
            </div>
            <svg ref={mindmapRef} className="mindmap-svg"></svg>
          </div>
        </section>
      )}

      {/* Visualização por Camadas */}
      {activeView === 'layers' && (
        <section className="solutions-layers-view">
          <div className="layers-container">
            <div className="architecture-stack">
              {architectureLayers.map((layer) => {
                const layerSolutions = filteredSolutions.filter(sol => sol.layer === layer.id);
                return (
                  <div key={layer.id} className={`arch-layer layer-${layer.id}`}>
                    <div className="layer-header">
                      <h3>{layer.name}</h3>
                      <span className="layer-badge">{layer.badge}</span>
                    </div>
                    <div className="layer-solutions">
                      {layerSolutions.length > 0 ? (
                        layerSolutions.map((solution) => (
                          <div 
                            key={solution.id} 
                            className="layer-solution-item"
                            onClick={() => handleSolutionSelect(solution)}
                          >
                            <div className="solution-icon">{solution.icon}</div>
                            <div className="solution-info">
                              <h4>{solution.title}</h4>
                              <p>{solution.shortDescription}</p>
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="no-solutions-message">
                          Nenhuma solução encontrada nesta camada com os filtros atuais.
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Modal de Detalhes */}
      {isModalOpen && selectedSolution && (
        <div className="solution-modal">
          <div className="modal-overlay" onClick={handleCloseModal}></div>
          <div className="modal-content">
            <button className="close-button" onClick={handleCloseModal}>×</button>
            
            <div className="modal-header">
              <div className="solution-icon large">{selectedSolution.icon}</div>
              <div className="header-content">
                <h2 className="solution-title">{selectedSolution.title}</h2>
                <span className={`status-badge ${selectedSolution.status}`}>
                  {selectedSolution.status === 'developing' ? 'Em Desenvolvimento' : 
                   selectedSolution.status === 'completed' ? 'Concluído' : 'Planejado'}
                </span>
              </div>
            </div>
            
            <div className="modal-body">
              <div className="modal-sections">
                <div className="modal-section">
                  <h3>Descrição</h3>
                  <p>{selectedSolution.description}</p>
                </div>
                
                <div className="modal-section">
                  <h3>Características Principais</h3>
                  <ul className="features-list">
                    {selectedSolution.features.map((feature, index) => (
                      <li key={index}>{feature}</li>
                    ))}
                  </ul>
                </div>
                
                <div className="modal-section">
                  <h3>Benefícios</h3>
                  <ul className="benefits-list">
                    {selectedSolution.benefits.map((benefit, index) => (
                      <li key={index}>{benefit}</li>
                    ))}
                  </ul>
                </div>
                
                {selectedSolution.useCase && (
                  <div className="modal-section">
                    <h3>Caso de Uso</h3>
                    <div className="use-case-example">
                      <p>{selectedSolution.useCase}</p>
                    </div>
                  </div>
                )}
                
                {(selectedSolution.marketSize || selectedSolution.potential || selectedSolution.timeframe) && (
                  <div className="modal-section">
                    <h3>Impacto de Mercado</h3>
                    <div className="market-stats">
                      {selectedSolution.marketSize && (
                        <div className="stat-item">
                          <span className="stat-label">Tamanho do Mercado</span>
                          <span className="stat-value">{selectedSolution.marketSize}</span>
                        </div>
                      )}
                      {selectedSolution.potential && (
                        <div className="stat-item">
                          <span className="stat-label">Potencial</span>
                          <span className="stat-value">{selectedSolution.potential}</span>
                        </div>
                      )}
                      {selectedSolution.timeframe && (
                        <div className="stat-item">
                          <span className="stat-label">Cronograma</span>
                          <span className="stat-value">{selectedSolution.timeframe}</span>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="modal-sidebar">
                <div className="related-solutions">
                  <h3>Soluções Relacionadas</h3>
                  <ul className="related-list">
                    {selectedSolution.relatedSolutions.map((related, index) => (
                      <li 
                        key={index} 
                        className="related-item"
                        onClick={() => {
                          const solution = solutionsData.find(s => s.id === related.id);
                          if (solution) {
                            setSelectedSolution(solution);
                          }
                        }}
                      >
                        <span className="related-icon">{related.icon}</span>
                        <span className="related-name">{related.name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="technical-docs">
                  <h3>Documentação Técnica</h3>
                  <button className="docs-button">Ver Whitepaper</button>
                  <button className="docs-button">Especificação Técnica</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* CTA Section */}
      <section className="solutions-cta">
        <div className="cta-container">
          <h2>Pronto para Revolucionar o Futuro?</h2>
          <p>Junte-se ao HyperLayer0 e seja parte da próxima geração da infraestrutura blockchain.</p>
          <div className="cta-buttons">
            <button 
              className="primary-button large"
              onClick={() => {
                // Trigger navigation event to home page for presale
                const event = new CustomEvent('navigate', { detail: 'home' });
                window.dispatchEvent(event);
              }}
            >
              Participar da Presale
            </button>
            <button 
              className="secondary-button large"
              onClick={() => {
                // Trigger navigation event to contact/about page
                const event = new CustomEvent('navigate', { detail: 'about' });
                window.dispatchEvent(event);
              }}
            >
              Entre em Contato
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Solutions;