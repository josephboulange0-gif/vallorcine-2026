import React, { useState, useEffect } from 'react';

interface ChecklistItem {
  id: string;
  label: string;
  desc?: string;
  checked: boolean;
}

interface ChecklistCategory {
  title: string;
  icon: string;
  items: ChecklistItem[];
}

const initialCategories: ChecklistCategory[] = [
  {
    title: 'Matériel Alpinisme',
    icon: '🧗',
    items: [
      { id: 'crampons', label: 'Crampons avec antibott', desc: 'Préalablement réglés sur vos chaussures', checked: false },
      { id: 'piolet', label: 'Piolet classique', desc: 'Taille adaptée à votre marche sur glacier', checked: false },
      { id: 'baudrier', label: 'Baudrier réglable', desc: 'Facile à enfiler par-dessus le pantalon chaud', checked: false },
      { id: 'casque', label: 'Casque de montagne', desc: 'Obligatoire contre les chutes de pierres et de glace', checked: false },
      { id: 'chaussures', label: 'Chaussures de montagne rigides', desc: 'Tige haute déperlante et cramponnable', checked: false },
      { id: 'mousquetons', label: 'Mousquetons de sécurité à vis (x2)', desc: 'Pour les manœuvres de corde et l\'encordement', checked: false },
      { id: 'assureur', label: 'Assureur / Descendeur (Reverso)', desc: 'Pour d\'éventuels rappels', checked: false },
      { id: 'sangle', label: 'Sangle de 120cm + mousqueton', desc: 'Pour se vacher ou poser un relais sur becquet', checked: false },
      { id: 'machard', label: 'Cordelette pour machard (auto-bloquant)', desc: 'Diamètre 7mm pour sécurité descente ou mouflage', checked: false }
    ]
  },
  {
    title: 'Habillement',
    icon: '🧥',
    items: [
      { id: 'goretex', label: 'Veste Gore-Tex imperméable', desc: 'Coupe-vent et étanche avec capuche adaptée au casque', checked: false },
      { id: 'doudoune', label: 'Doudoune ou micro-polaire', desc: 'Couche intermédiaire thermique chaude et légère', checked: false },
      { id: 'pantalon', label: 'Pantalon de montagne technique', desc: 'Déperlant, stretch et résistant à l\'abrasion', checked: false },
      { id: 'gants_chauds', label: 'Gants de haute montagne épais', desc: 'Imperméables et très chauds', checked: false },
      { id: 'gants_fins', label: 'Gants fins / sous-gants', desc: 'En laine ou polaire, utiles en cas de froid modéré', checked: false },
      { id: 'bonnet', label: 'Bonnet chaud ou bandeau', desc: 'Doit pouvoir se glisser sous le casque', checked: false },
      { id: 'casquette', label: 'Casquette / Chapeau', desc: 'Protection essentielle contre le rayonnement solaire intense', checked: false },
      { id: 'lunettes', label: 'Lunettes de glacier Catégorie 4', desc: 'Obligatoires pour éviter l\'ophtalmie des neiges', checked: false },
      { id: 'guetres', label: 'Guêtres (facultatif)', desc: 'Pour éviter que la neige n\'entre dans les chaussures', checked: false }
    ]
  },
  {
    title: 'Bouffe & Boisson',
    icon: '🥪',
    items: [
      { id: 'eau', label: 'Gourde / Poche à eau (2.5L minimum)', desc: 'L\'hydratation est cruciale à haute altitude (éviter les tuyaux de camelback qui gèlent)', checked: false },
      { id: 'pique_nique', label: 'Pique-nique de course solide', desc: 'Sandwichs riches en calories, fromage, viande séchée', checked: false },
      { id: 'barres', label: 'Barres énergétiques & Pâtes de fruits', desc: 'À grignoter pendant les courtes pauses (faciles d\'accès)', checked: false },
      { id: 'fruits_secs', label: 'Fruits secs & Noix', desc: 'Excellente source d\'énergie rapide et durable', checked: false },
      { id: 'thermos', label: 'Thermos de boisson chaude (facultatif)', desc: 'Thé sucré ou bouillon pour les départs froids', checked: false }
    ]
  },
  {
    title: 'Fond de Sac',
    icon: '🎒',
    items: [
      { id: 'frontale', label: 'Lampe frontale', desc: 'Avec piles neuves (départs minuit et 2h indispensables !)', checked: false },
      { id: 'survie', label: 'Couverture de survie', desc: 'Légère et obligatoire au fond de chaque sac', checked: false },
      { id: 'secours', label: 'Trousse de secours individuelle', desc: 'Pansements double-peau, compresses, élastoplaste, désinfectant, paracétamol', checked: false },
      { id: 'creme', label: 'Crème solaire Indice 50 & Stick lèvres', desc: 'Protection maximale contre la réverbération du glacier', checked: false },
      { id: 'sac_dos', label: 'Sac à dos d\'alpinisme (30-40L)', desc: 'Profil épuré avec porte-piolets et sangles latérales', checked: false },
      { id: 'sac_poubelle', label: 'Sac étanche ou sac poubelle', desc: 'Pour protéger vos vêtements de rechange en cas de pluie', checked: false },
      { id: 'couteau', label: 'Couteau de poche', desc: 'Type Opinel ou couteau multifonction', checked: false }
    ]
  }
];

export const GearChecklist: React.FC = () => {
  const [categories, setCategories] = useState<ChecklistCategory[]>(initialCategories);
  const [activeTab, setActiveTab] = useState(0);

  // Load state from localStorage on init
  useEffect(() => {
    const saved = localStorage.getItem('vallorcine_gear_checklist');
    if (saved) {
      try {
        const savedStates = JSON.parse(saved);
        const mergedCategories = initialCategories.map(cat => {
          return {
            ...cat,
            items: cat.items.map(item => ({
              ...item,
              checked: !!savedStates[item.id]
            }))
          };
        });
        setCategories(mergedCategories);
      } catch (e) {
        console.error('Error loading checklist states', e);
      }
    }
  }, []);

  // Save changes to localStorage
  const saveState = (updatedCats: ChecklistCategory[]) => {
    const stateMap: Record<string, boolean> = {};
    updatedCats.forEach(cat => {
      cat.items.forEach(item => {
        if (item.checked) stateMap[item.id] = true;
      });
    });
    localStorage.setItem('vallorcine_gear_checklist', JSON.stringify(stateMap));
  };

  const handleToggle = (categoryId: number, itemId: string) => {
    const updated = [...categories];
    const cat = updated[categoryId];
    const item = cat.items.find(i => i.id === itemId);
    if (item) {
      item.checked = !item.checked;
      setCategories(updated);
      saveState(updated);
    }
  };

  const handleReset = () => {
    if (window.confirm('Voulez-vous réinitialiser toutes les listes de contrôle ?')) {
      const resetCats = categories.map(cat => ({
        ...cat,
        items: cat.items.map(item => ({ ...item, checked: false }))
      }));
      setCategories(resetCats);
      localStorage.removeItem('vallorcine_gear_checklist');
    }
  };

  // Stats
  const totalItems = categories.reduce((sum, cat) => sum + cat.items.length, 0);
  const checkedItems = categories.reduce(
    (sum, cat) => sum + cat.items.filter(i => i.checked).length,
    0
  );
  const progressPercent = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  return (
    <div className="gear-checklist-section">
      <div className="gear-header">
        <h4 className="section-title">
          <span className="icon">🎒</span> Checklist d'Équipement & Alimentation
        </h4>
        <button onClick={handleReset} className="btn-reset">
          Réinitialiser
        </button>
      </div>

      {/* Progress Bar */}
      <div className="checklist-progress-container">
        <div className="progress-text">
          Votre sac est prêt à <strong>{progressPercent}%</strong> ({checkedItems} sur {totalItems} éléments empaquetés)
        </div>
        <div className="progress-bar-outer">
          <div 
            className="progress-bar-inner" 
            style={{ width: `${progressPercent}%` }}
          ></div>
        </div>
      </div>

      {/* Categories Tabs */}
      <div className="checklist-tabs">
        {categories.map((cat, idx) => {
          const catChecked = cat.items.filter(i => i.checked).length;
          const catTotal = cat.items.length;
          
          return (
            <button
              key={idx}
              className={`tab-btn ${activeTab === idx ? 'active' : ''}`}
              onClick={() => setActiveTab(idx)}
            >
              <span className="tab-icon">{cat.icon}</span>
              <span className="tab-title-text">{cat.title}</span>
              <span className="tab-count">
                {catChecked}/{catTotal}
              </span>
            </button>
          );
        })}
      </div>

      {/* Category Checklist Items */}
      <div className="checklist-items-box">
        {categories[activeTab].items.map((item) => (
          <label 
            key={item.id} 
            className={`checklist-item ${item.checked ? 'checked' : ''}`}
          >
            <input
              type="checkbox"
              checked={item.checked}
              onChange={() => handleToggle(activeTab, item.id)}
              className="checkbox-input"
            />
            <div className="checklist-item-details">
              <span className="checklist-item-label">{item.label}</span>
              {item.desc && <span className="checklist-item-desc">{item.desc}</span>}
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
