import React, { useState } from 'react';

interface AlpinePhoto {
  title: string;
  caption: string;
  category: 'vallorcine' | 'tour' | 'miage' | 'other';
  url: string;
  commonsUrl: string;
}

const alpinePhotos: AlpinePhoto[] = [
  {
    title: "Vallorcine en été",
    caption: "Les alpages verdoyants de Vallorcine en été, dominés par les massifs frontaliers.",
    category: "vallorcine",
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Vallorcine-champs.JPG",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Vallorcine-champs.JPG"
  },
  {
    title: "Gare de Vallorcine",
    caption: "La gare de Vallorcine, point de passage du chemin de fer touristique Mont-Blanc Express.",
    category: "vallorcine",
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Gare_de_Vallorcine.jpg",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Gare_de_Vallorcine.jpg"
  },
  {
    title: "Refuge de la Pierre à Bérard",
    caption: "Le refuge (1 924 m) blotti au pied du bloc erratique géant de granit dans la réserve naturelle du vallon de Bérard.",
    category: "vallorcine",
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Refuge_de_la_Pierre_à_Bérard.jpg",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Refuge_de_la_Pierre_%C3%A0_B%C3%A9rard.jpg"
  },
  {
    title: "Panneau de la Pierre à Bérard",
    caption: "Panneau indicatif et entrée du Refuge de la Pierre à Bérard (1 924 m).",
    category: "vallorcine",
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Refuge_de_la_Pierre_à_Bérard_13.jpg",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Refuge_de_la_Pierre_%C3%A0_B%C3%A9rard_13.jpg"
  },
  {
    title: "Sommet du Mont Buet",
    caption: "Le sommet du Mont Buet (3 096 m) s'élevant face au massif du Mont-Blanc.",
    category: "vallorcine",
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Mont_Buet.jpg",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Mont_Buet.jpg"
  },
  {
    title: "Pentes enneigées du Buet",
    caption: "Les reliefs glaciaires et vallonnés du Mont Buet en période d'enneigement.",
    category: "vallorcine",
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Mont_Buet_winter.JPG",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Mont_Buet,_winter.JPG"
  },
  {
    title: "Aiguille du Tour",
    caption: "Le sommet rocheux double de l'Aiguille du Tour (3 542 m) bordant le plateau du Trient.",
    category: "tour",
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/AiguilleDuTour.JPG",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:AiguilleDuTour.JPG"
  },
  {
    title: "Refuge Albert 1er",
    caption: "Le refuge historique en pierre Albert 1er (2 702 m) surplombant le glacier du Tour.",
    category: "tour",
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Albert_1er_shelter.jpg",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Albert_1er_shelter.jpg"
  },
  {
    title: "Langue du Glacier du Trient",
    caption: "La majestueuse cascade de glace du glacier du Trient se jetant vers la vallée.",
    category: "tour",
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/TrientGlacier.jpg",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:TrientGlacier.jpg"
  },
  {
    title: "Glacier et Aiguille du Tour",
    caption: "L'Aiguille du Tour au-dessus du glacier du Trient, prise de vue alpine classique.",
    category: "tour",
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Glacier_de_Trient_et_Aiguille_du_Tour_-_img_00196.jpg",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Glacier_de_Trient_et_Aiguille_du_Tour_-_img_00196.jpg"
  },
  {
    title: "Cathédrale de Genève",
    caption: "La cathédrale Saint-Pierre de Genève, point d'arrêt spirituel du dimanche soir.",
    category: "other",
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Cathedrale_Saint_Pierre_Geneve.JPG",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Cathedrale_Saint_Pierre_Geneve.JPG"
  },
  {
    title: "Refuge des Conscrits",
    caption: "Le refuge moderne des Conscrits (2 602 m) surplombant le glacier de Tré-la-Tête, étape logistique clé.",
    category: "miage",
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/ConscritHelico.jpg",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:ConscritHelico.jpg"
  },
  {
    title: "Les Dômes de Miage",
    caption: "Les Dômes de Miage (3 673 m) vus depuis le vallon et les chalets de Miage.",
    category: "miage",
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Domes_de_Miage.jpg",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Domes_de_Miage.jpg"
  },
  {
    title: "Tracés sur la Face Sud-Est",
    caption: "La face Sud-Est des Dômes de Miage, montrant les itinéraires d'alpinisme d'altitude.",
    category: "miage",
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Dômes_de_Miage_-_South-East_side.jpg",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:D%C3%B4mes_de_Miage_-_South-East_side.jpg"
  },
  {
    title: "Aiguille de la Bérangère",
    caption: "L'Aiguille de la Bérangère (3 425 m), sommet mixte et rocheux relié aux Dômes de Miage.",
    category: "miage",
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Aiguille_de_la_Bérangère.jpg",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Aiguille_de_la_B%C3%A9rang%C3%A8re.jpg"
  },
  {
    title: "Arêtes depuis la Bérangère",
    caption: "Vue panoramique spectaculaire sur le fil de l'arête des Dômes de Miage depuis la Bérangère.",
    category: "miage",
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Aiguille_de_la_Bérangère_vue_sur_les_Dômes_de_Miage.jpg",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Aiguille_de_la_B%C3%A9rang%C3%A8re_vue_sur_les_D%C3%B4mes_de_Miage.jpg"
  },
  {
    title: "Mont Blanc depuis Les Arcs",
    caption: "Le mont Blanc majestueux s'élevant au-dessus du Beaufortain et de la Tarentaise.",
    category: "other",
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Mont_Blanc_from_Les_Arcs_1950.jpg",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Mont_Blanc_from_Les_Arcs_1950.jpg"
  },
  {
    title: "Col de la Forclaz",
    caption: "Le Col de la Forclaz (1 527 m), route historique franchissant la frontière franco-suisse.",
    category: "other",
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Col_de_la_Forclaz-2.jpg",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Col_de_la_Forclaz-2.jpg"
  },
  {
    title: "Vue aérienne du Massif",
    caption: "Survol glaciaire du massif du Mont-Blanc montrant le relief tourmenté des arêtes et crevasses.",
    category: "other",
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Aerial_view_of_Mont_Blanc_in_summer.jpg",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Aerial_view_of_Mont_Blanc_in_summer.jpg"
  },
  {
    title: "Le massif vu de Chamonix",
    caption: "Les aiguilles de Chamonix et le mont Blanc s'élevant verticalement au-dessus de la vallée.",
    category: "other",
    url: "https://commons.wikimedia.org/wiki/Special:FilePath/Mont_Blanc_vu_de_Chamonix.jpg",
    commonsUrl: "https://commons.wikimedia.org/wiki/File:Mont_Blanc_vu_de_Chamonix.jpg"
  }
];

export const AlpineGallery: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'vallorcine' | 'tour' | 'miage' | 'other'>('all');
  const [selectedPhoto, setSelectedPhoto] = useState<AlpinePhoto | null>(null);

  const filteredPhotos = activeFilter === 'all' 
    ? alpinePhotos 
    : alpinePhotos.filter(p => p.category === activeFilter);

  return (
    <section className="alpine-gallery-section" style={{ marginTop: '40px', paddingTop: '24px', borderTop: '2px solid var(--sand-line)' }}>
      <div className="gallery-header" style={{ marginBottom: '24px', textAlign: 'center' }}>
        <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--slate-rock)', fontSize: '1.8rem', marginBottom: '8px' }}>
          📷 Galerie Alpine Réelle du Séjour
        </h3>
        <p style={{ color: '#7f8c8d', fontSize: '14px', maxWidth: '600px', margin: '0 auto 20px auto' }}>
          Découvrez les véritables paysages de haute montagne, les refuges et les arêtes rocheuses que vous traverserez. Aucune image générée par intelligence artificielle.
        </p>

        {/* Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', flexWrap: 'wrap', marginBottom: '16px' }}>
          {(['all', 'vallorcine', 'tour', 'miage', 'other'] as const).map(f => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              style={{
                background: activeFilter === f ? 'var(--slate-rock)' : 'var(--paper-cream)',
                color: activeFilter === f ? 'var(--paper-cream)' : 'var(--slate-rock)',
                border: '1px solid var(--sand-line)',
                padding: '6px 16px',
                borderRadius: '20px',
                fontSize: '12px',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'all 0.2s',
                textTransform: 'uppercase'
              }}
            >
              {f === 'all' && 'Toutes les photos'}
              {f === 'vallorcine' && 'Vallorcine & Buet'}
              {f === 'tour' && 'Aiguille du Tour'}
              {f === 'miage' && 'Dômes de Miage'}
              {f === 'other' && 'Genève & Valais'}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="gallery-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
        {filteredPhotos.map((photo, index) => (
          <div 
            key={index} 
            className="gallery-card"
            onClick={() => setSelectedPhoto(photo)}
            style={{
              background: 'var(--paper-cream)',
              border: '1px solid var(--sand-line)',
              borderRadius: '8px',
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.2s, box-shadow 0.2s'
            }}
          >
            <div style={{ position: 'relative', height: '160px', overflow: 'hidden' }}>
              <img 
                src={photo.url} 
                alt={photo.title}
                loading="lazy"
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.3s' }} 
              />
              <div 
                style={{
                  position: 'absolute',
                  top: '8px',
                  right: '8px',
                  background: 'rgba(0,0,0,0.6)',
                  color: '#fff',
                  fontSize: '9px',
                  padding: '2px 6px',
                  borderRadius: '10px',
                  fontWeight: 'bold',
                  textTransform: 'uppercase'
                }}
              >
                {photo.category === 'other' ? 'Logistique' : photo.category}
              </div>
            </div>
            <div style={{ padding: '12px' }}>
              <h5 style={{ margin: '0 0 6px 0', fontSize: '14px', color: 'var(--slate-rock)', fontWeight: 'bold' }}>{photo.title}</h5>
              <p style={{ margin: 0, fontSize: '11px', color: '#7f8c8d', lineHeight: '1.4', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                {photo.caption}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox / Modal */}
      {selectedPhoto && (
        <div 
          onClick={() => setSelectedPhoto(null)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            background: 'rgba(26, 26, 26, 0.95)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
        >
          <div 
            onClick={e => e.stopPropagation()}
            style={{
              background: 'var(--paper-cream)',
              borderRadius: '12px',
              maxWidth: '800px',
              width: '100%',
              overflow: 'hidden',
              boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
            }}
          >
            <div style={{ position: 'relative', maxHeight: '500px', background: '#000', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <img 
                src={selectedPhoto.url} 
                alt={selectedPhoto.title} 
                style={{ maxWidth: '100%', maxHeight: '500px', objectFit: 'contain' }}
              />
              <button 
                onClick={() => setSelectedPhoto(null)}
                style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(0, 0, 0, 0.6)',
                  color: '#fff',
                  border: 'none',
                  fontSize: '18px',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                ✕
              </button>
            </div>
            <div style={{ padding: '20px' }}>
              <h4 style={{ margin: '0 0 8px 0', fontSize: '1.2rem', color: 'var(--slate-rock)', fontWeight: 'bold' }}>{selectedPhoto.title}</h4>
              <p style={{ margin: '0 0 16px 0', fontSize: '13px', color: 'var(--slate-rock)', lineHeight: '1.5' }}>{selectedPhoto.caption}</p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px', borderTop: '1px solid var(--sand-line)', paddingTop: '12px' }}>
                <span style={{ color: '#7f8c8d' }}>Crédit : Wikimedia Commons (Licence Libre)</span>
                <a 
                  href={selectedPhoto.commonsUrl} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  style={{ color: 'var(--accent-orange)', fontWeight: 'bold', textDecoration: 'none' }}
                >
                  Voir sur Wikimedia Commons ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
