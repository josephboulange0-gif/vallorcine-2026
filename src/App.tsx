import { useState } from 'react';
import { WeatherWidget } from './components/WeatherWidget';
import { GearChecklist } from './components/GearChecklist';
import { MapRoute } from './components/MapRoute';
import { BeraWidget } from './components/BeraWidget';
import { AlpineGallery } from './components/AlpineGallery';

function App() {
  const [activeDayIndex, setActiveDayIndex] = useState(0);

  const days = [
    { id: 'ven', name: 'Ven. 26 juin', title: 'Arrivée à Vallorcine' },
    { id: 'sam', name: 'Sam. 27 juin', title: 'Mont Buet' },
    { id: 'dim', name: 'Dim. 28 juin', title: 'Aiguille du Tour' },
    { id: 'dim-soir', name: 'Dim. 28 juin (soir)', title: 'Messe à Genève' },
    { id: 'lun', name: 'Lun. 29 juin', title: 'Repos & Sacs' },
    { id: 'mar', name: 'Mar. 30 juin', title: 'Dômes de Miage' },
    { id: 'mer', name: 'Mer. 1er juillet', title: 'Clôture' }
  ];

  const handleNextDay = () => {
    if (activeDayIndex < days.length - 1) {
      setActiveDayIndex(activeDayIndex + 1);
      document.getElementById('itineraire-top')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePrevDay = () => {
    if (activeDayIndex > 0) {
      setActiveDayIndex(activeDayIndex - 1);
      document.getElementById('itineraire-top')?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {/* Immersive Hero Header */}
      <header className="hero-header">
        <div className="hero-overlay"></div>
        <div className="hero-content">
          <span className="hero-eyebrow">Massif du Mont-Blanc & Aiguilles Rouges</span>
          <h1>Vallorcine 2026</h1>
          <p className="hero-subtitle">Expédition d'Alpinisme & de Randonnée Alpine</p>
          <div className="hero-dates">26 juin — 1ᵉʳ juillet 2026</div>
          <div className="hero-nav">
            <button onClick={() => { setActiveDayIndex(0); document.getElementById('itineraire-top')?.scrollIntoView({ behavior: 'smooth' }); }} className="nav-btn">
              📅 Consulter l'Itinéraire
            </button>
            <a href="#checklist" className="nav-btn">
              🎒 Checklist Sac
            </a>
            <a href="#meteo" className="nav-btn">
              🌦️ Météo Live
            </a>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="main-content">
        <div className="content-grid">
          
          {/* Left Column: Itinerary Booklet (Page by Page) */}
          <section className="timeline-section" id="itineraire">
            <h2 className="section-main-title" id="itineraire-top">📅 Carnet de Route — Jour après Jour</h2>

            {/* Quick jump page selector (Tabs) */}
            <div className="day-selector-bar">
              {days.map((d, index) => (
                <button
                  key={d.id}
                  onClick={() => setActiveDayIndex(index)}
                  className={`day-selector-btn ${activeDayIndex === index ? 'active' : ''}`}
                >
                  <span className="day-lbl">{d.name}</span>
                  <span className="day-name-short">{d.title}</span>
                </button>
              ))}
            </div>

            {/* KML Info Banner */}
            <div className="kml-banner-card">
              <div className="kml-banner-title">
                <span className="icon">🗺️</span>
                <h4>Cartographie & Tracés KML 3D</h4>
              </div>
              <p className="kml-banner-text">
                Des fichiers GPS de précision ont été préparés pour votre orientation.
                Téléchargez-les ci-dessous pour les importer dans <strong>Google Earth</strong>, <strong>FATMAP</strong> ou <strong>Iphigénie</strong> afin d'analyser le relief en 3D.
              </p>
              <div className="kml-download-actions">
                <a href="/mont_blanc_route.kml" download className="btn-kml-download">
                  📥 KML Aiguille du Tour
                </a>
                <a href="/domes_de_miage_route.kml" download className="btn-kml-download">
                  📥 KML Dômes de Miage
                </a>
              </div>
            </div>

            {/* Render Day: VENDREDI */}
            {activeDayIndex === 0 && (
              <article className="day-card animated-page" id="ven">
                <div className="day-card-header">
                  <span className="day-card-date">Jour 1 · Vendredi 26 Juin</span>
                  <h3>Arrivée à Vallorcine</h3>
                </div>
                <div className="day-card-body">
                  <p className="day-description-lead">
                    Lancement officiel du séjour alpin. Rassemblement du groupe à Vallorcine et briefing d'ouverture.
                  </p>

                  <div className="address-banner-card" style={{ background: 'rgba(212, 98, 42, 0.05)', border: '1px solid var(--sand-line)', padding: '12px 16px', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <span style={{ fontSize: '1.5rem' }}>🏠</span>
                    <div>
                      <h4 style={{ margin: '0 0 4px 0', fontSize: '14px', color: 'var(--slate-rock)', fontWeight: 'bold' }}>Adresse du Chalet</h4>
                      <p style={{ margin: 0, fontSize: '13px', color: 'var(--slate-rock)', fontFamily: 'monospace' }}>156 route du Lay, 74660 Vallorcine</p>
                    </div>
                  </div>

                  <div className="timeline-trail">
                    <div className="trail-step">
                      <span className="trail-time">17h00 — 18h00</span>
                      <div className="trail-details">
                        <strong>Accueil au Chalet (1 260 m)</strong>
                        <p>Arrivée des participants au chalet de Vallorcine (156 route du Lay). Prise de contact, attribution des chambres, rangement de la nourriture et installation générale.</p>
                      </div>
                    </div>
                    <div className="trail-step">
                      <span className="trail-time">19h00</span>
                      <div className="trail-details">
                        <strong>Briefing de Sécurité & Apéritif</strong>
                        <p>Apéritif d'accueil. Réunion d'organisation : point météo précis pour le Buet et l'Aiguille du Tour, validation des sacs d'urgence et répartition des cordées de secours.</p>
                      </div>
                    </div>
                    <div className="trail-step">
                      <span className="trail-time">20h00</span>
                      <div className="trail-details">
                        <strong>Dîner des Glucides ("Pâtes Party")</strong>
                        <p>Dîner riche en hydrates de carbone préparé en commun. Hydratation maximale avant le réveil du lendemain. Coucher précoce.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Render Day: SAMEDI */}
            {activeDayIndex === 1 && (
              <article className="day-card animated-page" id="sam">
                <div className="day-card-header">
                  <span className="day-card-date">Jour 2 · Samedi 27 Juin</span>
                  <h3>Randonnée Alpine : Le Mont Buet (3 096 m)</h3>
                </div>
                <div className="day-card-body">
                  <p className="day-description-lead">
                    Ascension pédestre longue et soutenue menant à plus de 3 000 m. Parfaite pour tester la résistance cardiovasculaire et entamer le processus d'acclimatation à l'altitude.
                  </p>
                  
                  <div className="course-mini-specs">
                    <div className="mini-spec"><strong>3 096 m</strong>Sommet</div>
                    <div className="mini-spec"><strong>~1 830 m</strong>Dénivelé D+</div>
                    <div className="mini-spec"><strong>T3 / Rando Alpine</strong>Difficulté</div>
                    <div className="mini-spec"><strong>Chalet ↔ Sommet</strong>Tracé</div>
                  </div>

                  <div className="alpine-resources" style={{ padding: '16px', borderRadius: '8px', border: '1px solid var(--sand-line)', margin: '16px 0', background: 'var(--paper-cream)' }}>
                    <h5 className="resource-title" style={{ margin: '0 0 12px 0' }}>📖 Topographie Camptocamp</h5>
                    <div className="resource-links-grid">
                      <a href="https://www.camptocamp.org/routes/56579/fr/le-buet-par-le-vallon-de-berard-voie-normale-ete-" target="_blank" rel="noopener noreferrer" className="btn-resource-c2c full-width-btn">
                        🧗 Topo Voie Normale d'Été (par le Vallon de Bérard)
                      </a>
                    </div>
                  </div>

                  <div className="timeline-trail">
                    <div className="trail-step">
                      <span className="trail-time">08h30</span>
                      <div className="trail-details">
                        <strong>Départ à pied de Vallorcine (1 260 m)</strong>
                        <p>Départ du chalet. Remontée progressive du Vallon de Bérard, un vallon sauvage magnifique le long du torrent.</p>
                      </div>
                    </div>
                    
                    <div className="trail-step highlight-split">
                      <span className="trail-time">Vers 11h00</span>
                      <div className="trail-details">
                        <div className="tag-group-split a">Option A · Halte au Refuge</div>
                        <strong>Refuge de Pierre à Bérard (1 924 m)</strong>
                        <p>Arrivée au refuge blotti au pied du Buet. Point de repos pour ceux qui souhaitent s'acclimater en douceur sans forcer. Repos, pique-nique et redescente tranquille vers Vallorcine l'après-midi.</p>
                        
                        {/* Inline Image for Bérard */}
                        <div className="step-image-box" style={{ marginTop: '12px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--sand-line)' }}>
                          <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Refuge_de_la_Pierre_à_Bérard.jpg" alt="Refuge de Pierre à Bérard" style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }} />
                          <div className="step-image-caption" style={{ padding: '6px 12px', fontSize: '11px', background: 'var(--paper-cream)', color: 'var(--slate-rock)', fontStyle: 'italic' }}>
                            Le véritable Refuge de Pierre à Bérard (1 924 m), blotti contre son énorme bloc de granit dans le vallon de Bérard.
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="trail-step highlight-split">
                      <span className="trail-time">11h30</span>
                      <div className="trail-details">
                        <div className="tag-group-split b">Option B · Sommet</div>
                        <strong>Ascension par le Col de Salenton</strong>
                        <p>Poursuite de la montée. Le sentier grimpe durement dans les éboulis, passe par la crête et la Table au Chantre. Pentes finales rocheuses ou enneigées jusqu'à la plateforme sommitale à 3 096 m. Panorama grandiose à 360°.</p>
                      </div>
                    </div>

                    <div className="trail-step">
                      <span className="trail-time">16h30 — 17h30</span>
                      <div className="trail-details">
                        <strong>Retour au Chalet & Collation</strong>
                        <p>Retour de l'ensemble de l'équipe à Vallorcine. Douches et collation de récupération.</p>
                      </div>
                    </div>

                    <div className="trail-step focus-action">
                      <span className="trail-time">17h30</span>
                      <div className="trail-details">
                        <strong>Récupération du Matériel à Chamonix</strong>
                        <p>Descente en voiture à Chamonix pour récupérer le matériel technique (crampons, piolets, baudriers, casques) chez <em>Snell Sports</em> ou <em>Sanglard Sports</em>. <strong>Important :</strong> la location des chaussures de haute montagne rigides est également faite à ce moment, permettant l'ajustement immédiat des crampons par les techniciens.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Render Day: DIMANCHE */}
            {activeDayIndex === 2 && (
              <article className="day-card animated-page" id="dim">
                <div className="day-card-header highlight">
                  <span className="day-card-date">Jour 3 · Dimanche 28 Juin</span>
                  <h3>Course 1 : Aiguille du Tour (3 542 m)</h3>
                </div>
                <div className="day-card-body">
                  <p className="day-description-lead">
                    Notre première course de haute montagne. Un magnifique itinéraire varié alternant randonnée escarpée, remontée glaciaire sur le mythique Plateau du Trient et court final d'escalade rocheuse facile mais aérien.
                  </p>

                  <div className="alpine-course-card">
                    <div className="alpine-course-img-wrapper">
                      <img src="https://commons.wikimedia.org/wiki/Special:FilePath/AiguilleDuTour.JPG" alt="Aiguille du Tour" className="alpine-course-img" />
                      <div className="alpine-course-img-overlay">
                        <h4>Aiguille du Tour (Sommet Sud · 3 542 m)</h4>
                        <p>Montée par le glacier des Bérons (Suisse) — Descente par Albert 1er (France)</p>
                      </div>
                    </div>
                    
                    <div className="alpine-course-stats">
                      <div className="spec-item"><span className="lbl">Sommet</span><strong className="val">3 542 m</strong></div>
                      <div className="spec-item"><span className="lbl">Dénivelé D+</span><strong className="val">+2 215 m</strong></div>
                      <div className="spec-item"><span className="lbl">Difficulté</span><strong className="val">PD+ (Roc & Glace)</strong></div>
                      <div className="spec-item"><span className="lbl">Encordement</span><strong className="val">Glaciaire & Arête</strong></div>
                    </div>

                    <div className="app-map-section">
                      <MapRoute courseId="mont_blanc" accentColor="#d4622a" descentColor="#e74c3c" />
                      <div className="app-map-legend">
                        <div className="legend-item"><span className="line ascent"></span> Montée (Trient → Sommet)</div>
                        <div className="legend-item"><span className="line descent"></span> Descente (Sommet → Le Tour)</div>
                      </div>
                    </div>

                    <div className="alpine-resources">
                      <h5 className="resource-title">📖 Topographies Camptocamp</h5>
                      <div className="resource-links-grid">
                        <a href="https://www.camptocamp.org/routes/45184/fr/aiguille-du-tour-depuis-trient" target="_blank" rel="noopener noreferrer" className="btn-resource-c2c">
                          🧗 Topo Montée (Depuis Trient par Pissoir)
                        </a>
                        <a href="https://www.camptocamp.org/routes/53774/fr/aiguille-du-tour-sommet-s-par-le-col-superieur-du-tour-voie-normale-" target="_blank" rel="noopener noreferrer" className="btn-resource-c2c">
                          🧗 Topo Descente (Voie Normale - Albert 1ᵉʳ)
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="timeline-trail">
                    <div className="trail-step">
                      <span className="trail-time">02h00</span>
                      <div className="trail-details">
                        <strong>Départ de Trient (Le Peuty, 1 326 m)</strong>
                        <p>Départ à la frontale. Remontée du torrent du Trient par la piste forestière menant au Chalet du Glacier (1 583 m).</p>
                      </div>
                    </div>
                    <div className="trail-step">
                      <span className="trail-time">03h15</span>
                      <div className="trail-details">
                        <strong>Montée raide vers le Chalet des Grands (2 113 m)</strong>
                        <p>Montée sportive en lacets raides au-dessus de la moraine du glacier des Grands, dominant la vallée.</p>
                      </div>
                    </div>
                    <div className="trail-step alert-action">
                      <span className="trail-time">05h30</span>
                      <div className="trail-details">
                        <strong>Prise de pied sur le Glacier des Bérons (2 700 m)</strong>
                        <p>Arrivée au Col des Grands. **Cramponnage et encordement glaciaire obligatoire**. Progression en cordées de 3 personnes, espacées d'au moins 12 mètres pour parer à toute crevasse.</p>
                      </div>
                    </div>
                    <div className="trail-step">
                      <span className="trail-time">08h00</span>
                      <div className="trail-details">
                        <strong>Cabane & Plateau du Trient (3 170 m)</strong>
                        <p>Franchissement du Col du Pissoir pour prendre pied sur l'immense et plat **Plateau du Trient** en Suisse. Traversée de cette plaine blanche féerique en direction du pied rocheux du sommet.</p>
                        
                        {/* Inline Image for Trient Plateau */}
                        <div className="step-image-box" style={{ marginTop: '12px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--sand-line)' }}>
                          <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Glacier_de_Trient_et_Aiguille_du_Tour_-_img_00196.jpg" alt="Plateau du Trient" style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }} />
                          <div className="step-image-caption" style={{ padding: '6px 12px', fontSize: '11px', background: 'var(--paper-cream)', color: 'var(--slate-rock)', fontStyle: 'italic' }}>
                            Le vaste Plateau du Trient et l'Aiguille du Tour (3 542 m) dominant les crevasses.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="trail-step highlight-sommit">
                      <span className="trail-time">10h00</span>
                      <div className="trail-details">
                        <strong>Passage de la Rimaye et Escalade</strong>
                        <p>Ascension de la pente de neige d'attaque (35-40°) puis escalade ludique sur du granite sain (pas de II et III, assurage sur becquets rocheux) pour atteindre le sommet de l'Aiguille du Tour (3 542 m).</p>
                      </div>
                    </div>
                    <div className="trail-step warn">
                      <span className="trail-time">11h00</span>
                      <div className="trail-details">
                        <strong>Heure limite de demi-tour</strong>
                        <p>Pour des raisons de sécurité évidentes (ramollissement des ponts de neige de descente sous le soleil), le demi-tour doit être enclenché au plus tard à 11h00.</p>
                      </div>
                    </div>
                    <div className="trail-step">
                      <span className="trail-time">12h00</span>
                      <div className="trail-details">
                        <strong>Descente par le Glacier du Tour & Albert 1er</strong>
                        <p>Bascule sur le Glacier du Tour en France via le Col Supérieur du Tour. Descente glaciaire puis halte rafraîchissante au Refuge Albert 1er (2 702 m).</p>
                      </div>
                    </div>
                    <div className="trail-step">
                      <span className="trail-time">15h00</span>
                      <div className="trail-details">
                        <strong>Arrivée au Tour (1 453 m) & Retour</strong>
                        <p>Retour au Tour par le sentier en lacets raides. Covoiturage retour vers le chalet à Vallorcine.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Render Day: DIMANCHE SOIR */}
            {activeDayIndex === 3 && (
              <article className="day-card animated-page" id="dim-soir">
                <div className="day-card-header">
                  <span className="day-card-date">Jour 3 (soir) · Dimanche 28 Juin</span>
                  <h3>Messe Dominicale à Genève</h3>
                </div>
                <div className="day-card-body">
                  <p className="day-description-lead">
                    Logistique de transfert routier vers la Suisse pour la messe dominicale de fin de journée.
                  </p>
                  <div className="timeline-trail">
                    <div className="trail-step">
                      <span className="trail-time">17h00</span>
                      <div className="trail-details">
                        <strong>Départ du Chalet en voiture</strong>
                        <p>Organisation du transport. Compter 1h15 de route à destination de Genève par l'Arve et l'A40 (Voiture 1 et Voiture 2).</p>
                      </div>
                    </div>
                    <div className="trail-step">
                      <span className="trail-time">18h30</span>
                      <div className="trail-details">
                        <strong>Messe dominicale à Genève</strong>
                        <p>Messe en église centrale à Genève (Eglise Notre-Dame ou Saint-Germain, horaire d'été à finaliser).</p>
                      </div>
                    </div>
                    <div className="trail-step">
                      <span className="trail-time">20h00</span>
                      <div className="trail-details">
                        <strong>Dîner rapide et retour</strong>
                        <p>Restauration simple à Genève ou sur la route. Coucher à 22h00 maximum au chalet.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Render Day: LUNDI */}
            {activeDayIndex === 4 && (
              <article className="day-card rest-day-theme animated-page" id="lun">
                <div className="day-card-header">
                  <span className="day-card-date">Jour 4 · Lundi 29 Juin</span>
                  <h3>Journée de Repos & Préparation Active</h3>
                </div>
                <div className="day-card-body">
                  <p className="day-description-lead">
                    Coupure essentielle de repos complet. Cruciale pour recharger les réserves énergétiques et soigner les pieds avant l'effort massif du lendemain.
                  </p>
                  
                  <div className="rest-activities-grid">
                    <div className="activity-block">
                      <h5>🌅 Matinée : Récupération & Matos</h5>
                      <p>Grasse matinée collective. Grand petit-déjeuner tardif. Nettoyage, séchage et vérification méticuleuse de l'état des cordes et du matériel de sécurité glaciaire.</p>
                    </div>
                    <div className="activity-block">
                      <h5>🏙️ Après-midi : Détente Chamonix</h5>
                      <p>Balade calme dans Chamonix, achat des derniers vivres de course (barres d'effort, fruits secs, sachets salés). Hydratation préventive.</p>
                    </div>
                  </div>

                  <div className="rest-day-tags">
                    <span className="tag">☕ Café en Terrasse</span>
                    <span className="tag">🏔️ Chamonix Centre</span>
                    <span className="tag">⚙️ Check-list Équipements</span>
                  </div>

                  <div className="preparations-miage-box">
                    <h4>⚠️ Protocole Dômes de Miage (Départ Minuit !)</h4>
                    <p>La traversée s'effectuant à la journée depuis le fond de la vallée (plus de 2 550 m D+), l'organisation doit être irréprochable.</p>
                    <ul>
                      <li><strong>19h00 - Check des Sacs :</strong> Tout doit être prêt à 100% (min. 2.5L d'eau, pique-nique consistant, doudoune + Gore-Tex, lampes frontales vérifiées).</li>
                      <li><strong>18h30 - Dîner précoce :</strong> Repas riche en hydrates de carbone.</li>
                      <li><strong>20h30 - Extinction des feux :</strong> Coucher obligatoire pour dormir un minimum.</li>
                      <li><strong>23h30 - Réveil :</strong> Levée rapide, thé chaud et départ en voiture à minuit pile.</li>
                    </ul>
                    
                    {/* Inline Image for Conscrits (preparation visualization) */}
                    <div className="step-image-box" style={{ marginTop: '16px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--sand-line)' }}>
                      <img src="https://commons.wikimedia.org/wiki/Special:FilePath/ConscritHelico.jpg" alt="Refuge des Conscrits" style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }} />
                      <div className="step-image-caption" style={{ padding: '8px 12px', fontSize: '11.5px', background: 'var(--paper-cream)', color: 'var(--slate-rock)', fontStyle: 'italic' }}>
                        Le véritable Refuge des Conscrits (2 602 m), sentinelle moderne dominant le glacier de Tré-la-Tête.
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Render Day: MARDI */}
            {activeDayIndex === 5 && (
              <article className="day-card animated-page" id="mar">
                <div className="day-card-header highlight">
                  <span className="day-card-date">Jour 5 · Mardi 30 Juin</span>
                  <h3>Course 2 : Dômes de Miage (3 673 m)</h3>
                </div>
                <div className="day-card-body">
                  <p className="day-description-lead">
                    Une des plus belles traversées d'arêtes de neige des Alpes. Un itinéraire d'envergure, sauvage, long et aérien, réalisé à la journée depuis le fond de la vallée.
                  </p>

                  <div className="alpine-course-card">
                    <div className="alpine-course-img-wrapper">
                      <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Domes_de_Miage.jpg" alt="Dômes de Miage" className="alpine-course-img" />
                      <div className="alpine-course-img-overlay">
                        <h4>Dômes de Miage (Sommet W · 3 673 m)</h4>
                        <p>En aller-retour à la journée depuis Le Cugnon (Les Contamines-Montjoie)</p>
                      </div>
                    </div>
                    
                    <div className="alpine-course-stats">
                      <div className="spec-item"><span className="lbl">Sommet</span><strong className="val">3 673 m</strong></div>
                      <div className="spec-item"><span className="lbl">Dénivelé D+</span><strong className="val">~2 550 m</strong></div>
                      <div className="spec-item"><span className="lbl">Difficulté</span><strong className="val">PD (Arête de Neige)</strong></div>
                      <div className="spec-item"><span className="lbl">Type Course</span><strong className="val">Glacier & Arête</strong></div>
                    </div>

                    <div className="app-map-section">
                      <MapRoute courseId="miage" accentColor="#d4622a" descentColor="#3498db" />
                      <div className="app-map-legend">
                        <div className="legend-item"><span className="line ascent"></span> Montée (Cugnon → Sommet)</div>
                        <div className="legend-item"><span className="line descent-alt"></span> Descente via Aiguille de la Bérangère</div>
                      </div>
                    </div>

                    <div className="alpine-resources">
                      <h5 className="resource-title">📖 Topographies Camptocamp</h5>
                      <div className="resource-links-grid">
                        <a href="https://www.camptocamp.org/routes/53886/fr/domes-de-miage-traversee-classique" target="_blank" rel="noopener noreferrer" className="btn-resource-c2c">
                          🧗 Topo Traversée Classique
                        </a>
                        <a href="https://www.camptocamp.org/routes/46054/fr/domes-de-miage-par-le-glacier-de-tre-la-tete-et-le-col-des-domes-voie-normale-" target="_blank" rel="noopener noreferrer" className="btn-resource-c2c">
                          🧗 Topo Voie Normale
                        </a>
                        <a href="https://www.camptocamp.org/routes/47927/fr/domes-de-miage-traversee-des-domes-armancette" target="_blank" rel="noopener noreferrer" className="btn-resource-c2c">
                          🧗 Topo Traversée Armancette
                        </a>
                        <a href="https://www.camptocamp.org/routes/47985/fr/aiguille-de-la-berangere-aller-retour-des-conscrits" target="_blank" rel="noopener noreferrer" className="btn-resource-c2c">
                          🧗 Topo Aiguille de la Bérangère
                        </a>
                      </div>
                    </div>
                  </div>

                  <div className="timeline-trail">
                    <div className="trail-step">
                      <span className="trail-time">00h00</span>
                      <div className="trail-details">
                        <strong>Départ routier de Vallorcine</strong>
                        <p>Départ en voiture. Arrivée au parking du Cugnon (1 180 m) aux Contamines vers 00h45. Réglage rapide des sacs.</p>
                      </div>
                    </div>
                    <div className="trail-step">
                      <span className="trail-time">01h00</span>
                      <div className="trail-details">
                        <strong>Départ à pied (1 180 m)</strong>
                        <p>Montée rythmée à la frontale en forêt alpine jusqu'au refuge de Tré-la-Tête (1 970 m), rallié vers 03h00. Courte pause.</p>
                      </div>
                    </div>
                    <div className="trail-step alert-action">
                      <span className="trail-time">03h15</span>
                      <div className="trail-details">
                        <strong>Passage du "Mauvais Pas"</strong>
                        <p>Traversée du sentier exposé équipé de câbles sécurisés. Vigilance dans la nuit car les dalles rocheuses peuvent être glissantes.</p>
                      </div>
                    </div>
                    <div className="trail-step">
                      <span className="trail-time">04h00</span>
                      <div className="trail-details">
                        <strong>Remontée du Glacier de Tré-la-Tête</strong>
                        <p>Accès au glacier. **Cramponnage et encordement glaciaire**. Progression douce à la lueur des frontales, en évitant les premières crevasses du bas.</p>
                      </div>
                    </div>
                    <div className="trail-step">
                      <span className="trail-time">06h30</span>
                      <div className="trail-details">
                        <strong>Passage sous les Conscrits (2 602 m)</strong>
                        <p>Passage sous le refuge. Poursuite sur le plateau supérieur du glacier de Tré-la-Tête, la pente se redresse fermement.</p>
                      </div>
                    </div>
                    <div className="trail-step">
                      <span className="trail-time">09h30</span>
                      <div className="trail-details">
                        <strong>Col des Dômes (3 564 m)</strong>
                        <p>Remontée de la pente finale raide sous le col (attention aux séracs de la face nord). Sortie sur le col venté, réhydratation.</p>
                      </div>
                    </div>
                    <div className="trail-step highlight-sommit">
                      <span className="trail-time">10h30</span>
                      <div className="trail-details">
                        <strong>Arête Sommitale & Sommet W (3 673 m)</strong>
                        <p>Progression sur l'arête de neige sommitale particulièrement effilée. Concentration maximale : technique du pied-devant-pied, encordement court (3 m) pour pouvoir arrêter immédiatement une glissade latérale. Arrivée au point culminant.</p>
                      </div>
                    </div>
                    <div className="trail-step warn">
                      <span className="trail-time">11h00</span>
                      <div className="trail-details">
                        <strong>Heure limite de demi-tour</strong>
                        <p>Seuil horaire de sécurité absolue. Si l'arête ou le sommet ne sont pas franchis, la descente commence impérativement à 11h00.</p>
                      </div>
                    </div>
                    <div className="trail-step highlight-split">
                      <span className="trail-time">12h00</span>
                      <div className="trail-details">
                        <strong>Descente par l'Aiguille de la Bérangère (3 425 m)</strong>
                        <p>Descente de l'arête mixte, puis courte remontée rocheuse facile au sommet de la Bérangère. Descente soutenue dans les névés et éboulis face Sud-Ouest pour rejoindre les Conscrits.</p>
                        
                        {/* Inline Image for Berangere */}
                        <div className="step-image-box" style={{ marginTop: '12px', borderRadius: '6px', overflow: 'hidden', border: '1px solid var(--sand-line)' }}>
                          <img src="https://commons.wikimedia.org/wiki/Special:FilePath/Aiguille_de_la_Bérangère.jpg" alt="Aiguille de la Bérangère" style={{ width: '100%', height: '240px', objectFit: 'cover', display: 'block' }} />
                          <div className="step-image-caption" style={{ padding: '6px 12px', fontSize: '11px', background: 'var(--paper-cream)', color: 'var(--slate-rock)', fontStyle: 'italic' }}>
                            Le véritable sommet de l'Aiguille de la Bérangère (3 425 m), voie normale de descente mixte.
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="trail-step">
                      <span className="trail-time">14h30</span>
                      <div className="trail-details">
                        <strong>Déséquipement aux Conscrits & Retour</strong>
                        <p>Rangement du matériel au refuge des Conscrits. Descente finale par le sentier balcon équipé (passerelle suspendue) puis Tré-la-Tête.</p>
                      </div>
                    </div>
                    <div className="trail-step">
                      <span className="trail-time">~18h00</span>
                      <div className="trail-details">
                        <strong>Arrivée au Cugnon & Retour chalet</strong>
                        <p>Retour éprouvant aux voitures. Trajet retour vers le chalet de Vallorcine pour un dîner festif de fin de séjour.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Render Day: MERCREDI */}
            {activeDayIndex === 6 && (
              <article className="day-card animated-page" id="mer">
                <div className="day-card-header">
                  <span className="day-card-date">Jour 6 · Mercredi 1ᵉʳ Juillet</span>
                  <h3>Départ & Clôture du Séjour</h3>
                </div>
                <div className="day-card-body">
                  <p className="day-description-lead">
                    Nettoyage du chalet, transfert vers le Valais suisse et messe finale.
                  </p>
                  <div className="timeline-trail">
                    <div className="trail-step">
                      <span className="trail-time">07h00 — 08h00</span>
                      <div className="trail-details">
                        <strong>Rangement & Nettoyage du Chalet</strong>
                        <p>Ménage complet du chalet de Vallorcine par tout le groupe. Restitution des clés à l'hôte.</p>
                      </div>
                    </div>
                    <div className="trail-step">
                      <span className="trail-time">08h15</span>
                      <div className="trail-details">
                        <strong>Départ pour Écône (Suisse)</strong>
                        <p>Départ routier. Passage du Col de la Forclaz pour basculer vers Martigny et le séminaire d'Écône.</p>
                      </div>
                    </div>
                    <div className="trail-step highlight-mass">
                      <span className="trail-time">09h00</span>
                      <div className="trail-details">
                        <strong>Messe de Clôture</strong>
                        <p>Messe au séminaire d'Écône pour clore spirituellement ce beau séjour d'altitude.</p>
                      </div>
                    </div>
                    <div className="trail-step">
                      <span className="trail-time">10h30</span>
                      <div className="trail-details">
                        <strong>Dispersion du groupe</strong>
                        <p>Pique-nique final de clôture en Suisse, restitution finale du matériel restant, salutations et dispersion de l'équipe.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            )}

            {/* Booklet Pagination Controls */}
            <div className="booklet-pagination-controls">
              <button 
                onClick={handlePrevDay} 
                disabled={activeDayIndex === 0}
                className="btn-pagination prev"
              >
                ◀ {activeDayIndex > 0 ? days[activeDayIndex - 1].name : 'Début'}
              </button>
              <span className="pagination-indicator">
                Jour <strong>{activeDayIndex + 1}</strong> sur {days.length}
              </span>
              <button 
                onClick={handleNextDay} 
                disabled={activeDayIndex === days.length - 1}
                className="btn-pagination next"
              >
                {activeDayIndex < days.length - 1 ? days[activeDayIndex + 1].name : 'Fin'} ▶
              </button>
            </div>

            {/* Alpine Gallery */}
            <AlpineGallery />

          </section>

          {/* Right Column: Sticky Widgets */}
          <aside className="widgets-column">
            
            {/* Live Weather Widget */}
            <div className="sticky-widget-card" id="meteo">
              <WeatherWidget />
            </div>

            {/* BERA avalanche risk widget */}
            <div className="sticky-widget-card" id="bera">
              <BeraWidget />
            </div>

            {/* Gear Checklist Widget */}
            <div className="sticky-widget-card" id="checklist">
              <GearChecklist />
            </div>

          </aside>

        </div>
      </main>

      {/* Footer */}
      <footer className="app-footer">
        <p><strong>Vallorcine 2026</strong> — Programme Technique d'Alpinisme d'Altitude</p>
        <p>Les horaires, itinéraires et décisions de course restent entièrement tributaires des prévisions météo réelles, des conditions nivologiques et de la condition physique du groupe.</p>
        <p>© 2026 Expédition Alpinisme Vallorcine. Propulsé par React, Leaflet & Open-Meteo.</p>
      </footer>
    </div>
  );
}

export default App;
