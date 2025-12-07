import React, { useState, useRef, useEffect } from 'react';
import { Copy, RefreshCw, CheckCircle, Play, FileText, Edit3, Trash2, Key, Cpu, Zap, User, ChevronDown, ExternalLink, HelpCircle, Palette, Upload, Image as ImageIcon, Sparkles, Camera, Plus, X, Globe, Link as LinkIcon, AlertTriangle, Loader2, Moon, Sun, ScanEye, ArrowRight, Save, Layout, Info, ChevronRight, Youtube, MessageSquare, Quote, Layers, Code, Focus, Braces, Search, Filter, Shuffle, Send, Lock, Unlock, Facebook, Instagram, Twitter, MapPin, ShoppingBag, Phone, Monitor, CheckSquare, Square } from 'lucide-react';

// --- DATABASE "GUDANG OPSI" (MASSIVE EXPANSION) ---

const STYLES = [
  // 1. ANATOMY & CUTAWAY
  { 
    id: 'anatomy_cutaway', 
    name: 'ANATOMY / CUTAWAY (CROSS-SECTION)', 
    desc: 'Bedah lapisan dalam, detail teknis.', 
    subStyles: [
      'Technical Cutaway (Mesin/Kendaraan)', 'Biological Anatomy (Organ Tubuh)', 'Architectural Section (Potongan Rumah)', 
      'Geological Layers (Lapisan Tanah)', 'Product Exploded View (Komponen Terpisah)', 'X-Ray Vision (Tembus Pandang)', 
      'Sci-Fi Schematics (Iron Man HUD)', 'Phantom View (Transparan)', 'Wireframe Overlay', 'Lego Internal Structure',
      'Medical Illustration Style', 'Engine Blueprint Detail'
    ] 
  },
  // 2. DATA VIZ
  { 
    id: 'data_viz', 
    name: 'DATA VISUALIZATION / CHARTS', 
    desc: 'Fokus data, grafik, dan angka.', 
    subStyles: [
      'Modern Dashboard UI', 'Glassmorphism Charts', 'Neon Cyberpunk HUD Data', 'Financial Stock Market Graph', 
      'Infographic Timeline Flow', 'Comparison Table (Versus)', 'Pie Chart 3D', 'Isotype (Icon Array)', 
      'Sankey Diagram Flow', 'Heatmap Gradient', 'Network Topology Node', 'Mind Map Tree', 'Venn Diagram Aesthetic', 
      'Swiss Style Typography Data', 'Interactive Widget Style'
    ] 
  },
  // 3. REALISTIC
  { 
    id: 'realistic', 
    name: 'REALISTIC / PHOTOREALISTIC', 
    desc: 'Tampilan nyata, detail tinggi.', 
    subStyles: [
      'Cinematic 8K Resolution', 'Studio Lighting (Softbox)', 'Macro Photography (Close-up)', 'Documentary Style', 
      'National Geographic Style', 'Hyper-Realistic 3D Render', 'Product Photography (White BG)', 'Drone Aerial View', 
      '4K Texture Focus', 'Bokeh / Depth of Field', 'Golden Hour Sunlight', 'Moody Dark Tone', 'Cinematic Teal & Orange', 
      'Underwater Shot', 'High Dynamic Range (HDR)', 'Fish-Eye Lens', 'Wide Angle Shot', 'Telephoto Zoom', 
      'Portrait Photography', 'Street Photography Vibe', 'Wildlife Photography', 'Automotive Photography Style',
      'Food Styling Professional', 'Fashion Editorial Look', 'Interior Design Photography'
    ] 
  },
  // 4. 3D EDU
  { 
    id: '3d_edu', 
    name: '3D EDUCATIONAL (PIXAR/DISNEY)', 
    desc: 'Karakter 3D lucu, warna cerah.', 
    subStyles: [
      'Disney Pixar Vibe', 'Bright Classroom Setting', 'Soft Lighting 3D', 'Friendly Mascot Character', 
      'Gamified Learning UI', 'Claymation (Plasticine)', 'Toy Story Texture', 'Low Poly Cute', 'Animal Crossing Vibe', 
      'Fortnite Cartoon Style', 'Nintendo Art Style', 'Rounded Edges 3D', 'Play-Doh Texture', 'Lego Bricks Style', 
      'Balloon Art 3D', 'Plush Toy Texture', 'Ceramic/Glossy Finish', 'Voxel Art (Minecraft)', 'Bubble 3D Text', 
      'Pastel Color Palette', 'Scientific Model 3D', 'Funko Pop Style', '3D Emoji Style'
    ] 
  },
  // 5. ISOMETRIC
  { 
    id: 'isometric', 
    name: 'ISOMETRIC WORLD', 
    desc: 'Sudut pandang 3D miring.', 
    subStyles: [
      'Low Poly City Builder', 'High Fidelity Voxel', 'Industrial Isometric', 'SimCity Game Style', 'Lego Block World', 
      'Data Center Visualization', 'Micro World / Miniature', 'Monument Valley Style', 
      'Room Interior Isometric', 'Factory Production Line', 'Sci-Fi Isometric Base', 'Fantasy RPG Map', 'Paper Cutout Isometric', 
      'Neon Isometric', 'Glass & Water Isometric', 'Floating Islands', 'Mechanical Gear Isometric', 'Office Workspace 3D', 
      'Transport/Logistics Map', 'Smart City Grid', 'Farm/Agriculture Isometric'
    ] 
  },
  // 6. MODERN 3D
  { 
    id: 'modern_3d', 
    name: 'MODERN 3D ABSTRACT', 
    desc: 'Bentuk geometris 3D abstrak.', 
    subStyles: [
      'Abstract Geometric Shapes', 'Fluid 3D Liquid', 'Metallic Chrome Balls', 'Glass Spheres & Refraction', 
      'Floating Objects Gravity', 'Motion Graphics Style', 'Holographic Gradient 3D', 'Frosted Glass Elements', 
      'Soft Body Physics', 'Cloth/Fabric Simulation', 'Neon Tube 3D', 'Crystal/Gemstone Texture', 'Matte Plastic Finish', 
      'Surreal 3D Art', 'Memphis 3D Pattern', 'Inflated 3D Objects', 'Wireframe & Solid Mix', 'Architectural Abstract',
      'Organic 3D Flow', '3D Typography Art'
    ] 
  },
  // 7. BLUEPRINT
  { 
    id: 'blueprint', 
    name: 'TECHNICAL BLUEPRINT / SCHEMATIC', 
    desc: 'Garis Teknik, Grid, Detail Komponen.', 
    subStyles: [
      'Architectural Floor Plan (Denah)', 'Mechanical Engineering Draft (Mesin)', 'Patent Illustration (Vintage)', 
      'Circuit Board Trace (PCB)', 'Grid Paper Background (Matematika)', 'White Line on Blue (Classic Blueprint)', 
      'White Line on Black (CAD Style)', 'Lego Instruction Manual Style', 'Topographic Map Lines (Kontur)', 
      'Leonardo Da Vinci Sketch Style', 'Cyberpunk Tech Analysis', 'Medical Anatomy Schematic', 'Automotive Engine Diagram', 
      'Industrial Pipeline Plan', 'System Architecture Diagram', 'Network Topology Map'
    ] 
  },
  // 8. CORPORATE
  { 
    id: 'corporate', 
    name: 'PRO CORPORATE / BUSINESS', 
    desc: 'Biru Terpercaya, Desain Flat.', 
    subStyles: [
      'Tech Startup Blue Theme', 'Financial Report Style', 'Modern SaaS Dashboard', 'Pitch Deck Presentation', 
      'Vector Flat Illustration', 'Consulting Firm Aesthetic', 'Blue & Grey Professional', 'Data Visualization Focus', 
      'Isometric Business Vector', 'Gradient Mesh Background', 'Glassmorphism UI', 'Dark Mode Dashboard', 
      'Professional LinkedIn Style', 'Clean Infographic Icons', 'Vector Characters in Suits', 'Trustworthy Medical Style', 
      'Bank/Fintech Branding', 'Annual Report Layout', 'Marketing Funnel Diagram'
    ] 
  },
  // 9. VECTOR
  { 
    id: 'vector', 
    name: 'VECTOR FLAT ILLUSTRATION', 
    desc: 'Grafis digital tajam.', 
    subStyles: [
      'Corporate Memphis (Big Limbs)', 'Flat Design 2.0 (Shadows)', 'Outline Style (Stroke)', 'Filled Outline', 
      'Geometric Vector Art', 'Tech Circuit Illustration', 'Iconography Pattern', 'Sticker Art Style', 'Badge/Emblem Design', 
      'Line Art Illustration', 'Pop Vector', 'Retro Vector 50s', 'Duotone Vector', 'Gradient Vector', 'Paper Cutout Vector', 
      'Material Design (Google)', 'Semi-Flat Design', 'Infographic Elements', 'Ukiyo-e Vector Style', 'Ligne Claire'
    ] 
  },
  // 10. HAND DRAWN
  { 
    id: 'hand_drawn', 
    name: 'HAND DRAWN / SKETCH', 
    desc: 'Goresan tangan artistik.', 
    subStyles: [
      'Pencil Sketch (Graphite)', 'Marker Doodle', 'Blueprint Sketch', 'Notebook Scribbles', 'Charcoal Drawing', 
      'Technical Engineering Draft', 'Rough Concept Art', 'Storyboard Sketch', 'Ballpoint Pen Art', 'Colored Pencil Texture', 
      'Crayon / Children Drawing', 'Ink Doodle Style', 'Comic Book Inking', 'Architectural Sketch', 'Chalk on Blackboard', 
      'Rough Etching', 'Hand Lettering Focus', 'Dotted Stippling', 'Watercolor Sketch'
    ] 
  },
  // 11. WATERCOLOR
  { 
    id: 'watercolor', 
    name: 'WATERCOLOR / PAINTED', 
    desc: 'Cat air lembut & artistik.', 
    subStyles: [
      'Soft Pastel Watercolor', 'Ink Wash Painting (Sumi-e)', 'Wet on Wet Technique', 'Botanical Illustration', 
      'Storybook Illustration', 'Canvas Texture Visible', 'Artistic Splash & Drips', 'Oil Painting Texture', 
      'Acrylic Brush Strokes', 'Impressionist Style', 'Gouache Flat Style', 'Digital Painting Style', 'Mixed Media Paint', 
      'Paper Texture Background', 'Abstract Watercolor', 'Floral Watercolor Pattern', 'Portrait Painting Style'
    ] 
  },
  // 12. COLLAGE
  { 
    id: 'collage', 
    name: 'COLLAGE / MIXED MEDIA', 
    desc: 'Potongan gambar & tekstur.', 
    subStyles: [
      'Vintage Scrapbook', 'Zine Culture Style', 'Newspaper Cutout Text', 'Dadaism Art', 'Modern Digital Collage', 
      'Paper Cutout Art', 'Ransom Note Typography', 'Ripped Paper Edges', 'Surrealist Collage', 'Photo Montage', 
      'Tape & Sticker Texture', 'Grunge Texture Overlay', 'Polaroid Frame Collage', 'Mixed Media Texture', 
      'Urban Street Art Collage', 'Retro Magazine Cutouts', 'Halftone Collage', 'Cyberpunk Collage'
    ] 
  },
  // 13. PAPER CRAFT
  { 
    id: 'origami', 
    name: 'PAPER CRAFT / ORIGAMI', 
    desc: 'Seni lipat & potong kertas.', 
    subStyles: [
      'Layered Paper Art (Tunnel Effect)', 'Paper Cutout Lightbox', 'Cardboard Texture', 'Folded Paper Animals', 'Craft DIY Style', 
      'Low Poly Paper', 'Crumpled Paper Texture', 'Quilling Art (Gulungan)', 'Pop-up Book Style', 'Matte Paper Finish', 
      'Pastel Paper Layers', 'Recycled Paper Craft', 'Origami Geometric', 'Kirigami Style', 'Papier-mâché'
    ] 
  },
  // 14. RETRO & VINTAGE
  { 
    id: 'retro_vintage', 
    name: 'RETRO / VINTAGE / NOSTALGIA', 
    desc: 'Gaya masa lalu yang ikonik.', 
    subStyles: [
      '90s Memphis Pattern', '80s Synthwave / Retrowave', 'Pop Art Comic (Lichtenstein)', 'Halftone Dots', 
      'Vintage Advertisement 50s', 'MTV 90s Style', 'Vaporwave Aesthetic', 'Pixel Art 8-Bit', 'Glitch Art', 
      'VHS Tape Noise', 'Neon Noir 80s', 'Arcade Game Style', 'Groovy 70s Psychedelic', 'Grunge 90s Texture', 
      'Cassette Tape Aesthetic', 'Old Macintosh UI', 'Mid-Century Modern', 'Victorian Etching', 'Old Map Cartography', 
      'Sepia Photograph', 'Renaissance Art Style', 'Medieval Manuscript', 'Industrial Revolution Gear', 
      'Postage Stamp Style', 'Engraving Banknote Style', 'Classic Book Illustration', 'Wanted Poster Style', 
      'Silent Film Card', 'Antique Paper Texture', 'Art Deco Luxury', 'Great Gatsby Style', 'Roaring 20s'
    ] 
  },
  // 15. NEON / CYBER
  { 
    id: 'neon', 
    name: 'CYBERPUNK / NEON / FUTURISTIC', 
    desc: 'Gelap, lampu neon, masa depan.', 
    subStyles: [
      'Cyberpunk City Night', 'Gaming Room Setup (RGB)', 'Glowing Wireframe', 'Hacker Terminal Code', 'Matrix Digital Rain', 
      'Neon Signage Typography', 'Blade Runner Vibe', 'Tron Grid System', 'Laser Beam Effects', 'Bioluminescence Nature', 
      'Futuristic HUD Interface', 'Dark Web Aesthetic', 'Glitch Cyber', 'Synthwave Grid', 'Night City Rain',
      'Sci-Fi Laboratory (Clean White)', 'Holographic UI Projection', 'White & Chrome Metal', 'Space Station Interior', 
      'Quantum Computing Viz', 'AI Neural Network', 'Glass & Light beams', 'Minimalist Future', 'Star Trek LCARS'
    ] 
  },
  // 16. SPECIFIC THEMES
  { 
    id: 'themes', 
    name: 'THEMATIC / SPECIFIC NICHE', 
    desc: 'Tema spesifik (Sport, Food, Nature).', 
    subStyles: [
      'E-Sports Tournament Neon', 'High Contrast HDR Sport', 'Speed Lines & Motion Blur', 'Gym & Fitness Gritty', 
      'Stadium Atmosphere Lights', 'Nike Ad Campaign Style', 'Extreme Sports Action', 'Warm Cafe Lighting', 
      'Rustic Wooden Table Food', 'Bright Kitchen Studio', 'Food Vlogger Style', 'Menu Photography', 
      'Fresh Ingredients Flatlay', 'Dark Moody Food Photography', 'Organic Paper Texture (Eco)', 'Forest Tones (Nature)', 
      'Recycle Kraft Paper', 'Botanical Garden', 'National Park Poster', 'Eco-Friendly Branding', 'Leaf Texture',
      'Batik Pattern Texture', 'Wayang Kulit Shadow', 'Islamic Geometric Art', 'Japanese Ukiyo-e', 'Tribal Art Patterns',
      'Horror / Spooky Style', 'Halloween Theme', 'Christmas / Holiday Theme', 'Eid Mubarak Theme'
    ] 
  }
];

const COLORS = [
  { id: 'garuda', name: 'Garuda (Merah Putih Emas)', colors: ['#d10000', '#ffffff', '#ffcc00', '#8b0000'] },
  { id: 'tech_cyan', name: 'Tech Cyan (Futuristic)', colors: ['#001f3f', '#0074d9', '#7fdbff', '#01ff70'] },
  { id: 'pop_vibrant', name: 'Pop Vibrant (CMYK)', colors: ['#FF8800', '#EFFE01', '#00ECFF', '#FF00C2'] }, 
  { id: 'ocean', name: 'Ocean Blue', colors: ['#0f172a', '#334155', '#3b82f6', '#60a5fa'] },
  { id: 'sunset', name: 'Sunset Warmth', colors: ['#7c2d12', '#c2410c', '#f97316', '#fdba74'] },
  { id: 'forest', name: 'Nature Green', colors: ['#14532d', '#166534', '#22c55e', '#86efac'] },
  { id: 'berry', name: 'Berry Sweet', colors: ['#4c0519', '#be123c', '#f43f5e', '#fda4af'] },
  { id: 'monochrome', name: 'Greyscale', colors: ['#000000', '#4b5563', '#9ca3af', '#ffffff'] },
  { id: 'cyber', name: 'Cyberpunk', colors: ['#09090b', '#db2777', '#8b5cf6', '#06b6d4'] },
  { id: 'pastel', name: 'Soft Pastel', colors: ['#fef3c7', '#dbeafe', '#fce7f3', '#dcfce7'] },
  { id: 'royal', name: 'Royal Gold', colors: ['#000000', '#1c1917', '#d97706', '#fcd34d'] },
  { id: 'earth', name: 'Earth Tone', colors: ['#451a03', '#78350f', '#d97706', '#fef3c7'] },
  { id: 'coffee', name: 'Coffee Shop', colors: ['#451a03', '#78350f', '#b45309', '#fff7ed'] },
  { id: 'vibrant', name: 'High Contrast', colors: ['#000000', '#ffff00', '#ff0000', '#0000ff'] },
  { id: 'luxury', name: 'Black & Gold', colors: ['#000000', '#1a1a1a', '#ffd700', '#bf9b30'] },
  { id: 'neon_purple', name: 'Neon Purple', colors: ['#2e0249', '#570a57', '#a91079', '#f806cc'] },
  { id: 'corporate', name: 'Corporate Blue', colors: ['#1e3a8a', '#3b82f6', '#93c5fd', '#ffffff'] },
  { id: 'retro', name: 'Retro 80s', colors: ['#5b21b6', '#c026d3', '#f472b6', '#fbbf24'] },
  { id: 'candy', name: 'Candy Shop', colors: ['#FF6F61', '#6B5B95', '#88B04B', '#F7CAC9'] },
  { id: 'military', name: 'Tactical Military', colors: ['#4b5320', '#3b3c36', '#8F9779', '#000000'] },
  { id: 'medical', name: 'Medical Clean', colors: ['#ffffff', '#e0f2fe', '#0ea5e9', '#ef4444'] },
  { id: 'dark_mode', name: 'Dark UI', colors: ['#121212', '#1e1e1e', '#bb86fc', '#03dac6'] },
];

const GOALS = [
    'Bedah Spesifikasi (Product)', 'Materi Edukasi / Pelajaran', 'Tutorial Langkah-demi-Langkah', 'Analisis Strategi Bisnis', 
    'Biografi Tokoh', 'Timeline Sejarah', 'Resep & Menu Masakan', 'Perbandingan (Versus)', 'Tips & Trik Lifehack', 
    'Promosi Produk / Iklan', 'Data Statistik & Grafik', 'Checklist Harian', 'Safety Guide / K3', 'Fakta Unik & Trivia', 
    'Infografis Berita / News', 'Quotations / Motivasi', 'Mind Map Concept', 'Roadmap Project', 'Anatomi / Bagian Tubuh',
    'Denah Lokasi / Peta', 'Jadwal Acara / Rundown', 'Struktur Organisasi', 'Siklus Hidup (Biologi)', 'Do\'s and Don\'ts'
];

const AUDIENCES = [
    'Siswa Sekolah (SD-SMA)', 'Guru / Pengajar', 'Pecinta Otomotif', 'Atlet / Penggemar Olahraga', 'Foodies / Kuliner', 
    'Sejarawan / Akademisi', 'Teknisi / Engineer', 'Masyarakat Umum', 'Mahasiswa', 'Pebisnis / Eksekutif', 
    'Anak-anak (Kids)', 'Investor / Saham', 'Gamers', 'Ibu Rumah Tangga', 'Developer / Programmer', 
    'Desainer Grafis', 'Medis / Dokter', 'Traveler / Backpacker', 'Petani / Pertanian', 'Pecinta Hewan',
    'Fashionista', 'Musisi / Seniman', 'Politisi', 'Ilmuwan'
];

const RATIOS = ['9:16 (TikTok/Reels)', '1:1 (Square)', '4:5 (IG Feed)', '16:9 (YouTube)', '3:4 (Portrait)', '2:3 (Pinterest)', '21:9 (Ultrawide)', 'A4 (Print Document)'];

const CHARACTERS = [
    'Tanpa Karakter', 'Profesional (Jas)', 'Presenter TV', 'Ahli Materi / Profesor', 'Maskot 3D Cute', 
    'Siswa Seragam', 'Robot AI Futuristik', 'Tokoh Sejarah', 'Casual (Kaos/Hoodie)', 'Superhero', 
    'Dokter / Perawat', 'Atlet Sporty', 'Chef / Koki', 'Guru Kacamata', 'Hewan Lucu (Kucing/Anjing)', 
    'Monster Ramah', 'Astronot', 'Detektif / Polisi', 'Petani Caping', 'Pilot', 'Tentara', 'Bajak Laut', 
    'Penyihir / Fantasy', 'Ninja', 'Zombie Kartun'
];

const TONES = [
    'Profesional & Formal', 'Fun & Ceria (Anak-anak)', 'Dramatis & Emosional', 'Santai & Gaul (Gen-Z)', 
    'Tegas & Instruksional', 'Ramah & Mengayomi', 'Puitis & Inspiratif', 'Sarkas & Satir', 'Akademis & Ilmiah', 
    'Motivasi & Semangat', 'Misterius & Horror', 'Mewah & Elegan', 'Minimalis & To-the-point', 
    'Jurnalistik & Objektif', 'Romantis', 'Nostalgia / Melankolis', 'Agamis / Religius', 'Teknis & Robotik'
];

const SOCIAL_TYPES = [
    { id: 'instagram', label: 'Instagram', icon: <Instagram size={14}/> },
    { id: 'facebook', label: 'Facebook', icon: <Facebook size={14}/> },
    { id: 'tiktok', label: 'TikTok/Shop', icon: <ShoppingBag size={14}/> },
    { id: 'twitter', label: 'X (Twitter)', icon: <Twitter size={14}/> },
    { id: 'whatsapp', label: 'WhatsApp', icon: <Phone size={14}/> },
    { id: 'website', label: 'Website', icon: <Globe size={14}/> },
    { id: 'location', label: 'Alamat/Lokasi', icon: <MapPin size={14}/> },
    { id: 'shopee', label: 'Shopee/Marketplace', icon: <ShoppingBag size={14}/> },
    { id: 'telegram', label: 'Telegram', icon: <Send size={14}/> },
    { id: 'generic', label: 'Lainnya', icon: <LinkIcon size={14}/> },
];

// --- NEW COMPONENT: SEARCHABLE SELECT (POINT B) ---
const SearchableSelect = ({ label, icon, value, onChange, options, type, onTypeChange, customText, onCustomTextChange, colorClass, darkMode }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const containerRef = useRef(null);

    // Click outside to close
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (containerRef.current && !containerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const isSimpleArray = typeof options[0] === 'string';
    const currentMode = type === 'custom' ? 'custom' : (type === 'auto' ? 'auto' : 'preset');

    // Filter Logic
    const filteredOptions = isSimpleArray 
        ? options.filter(opt => opt.toLowerCase().includes(searchTerm.toLowerCase()))
        : options.filter(opt => opt.name.toLowerCase().includes(searchTerm.toLowerCase()) || opt.desc?.toLowerCase().includes(searchTerm.toLowerCase()));

    const handleSelect = (val) => {
        onChange(val);
        setIsOpen(false);
        setSearchTerm(''); // Reset search
        onTypeChange('preset');
    };

    const getDisplayValue = () => {
        if (type === 'auto') return "✨ AI AUTO (Rekomendasi)";
        if (type === 'custom') return "✍️ CUSTOM (Manual)";
        if (value) {
             if (isSimpleArray) return value;
             const found = options.find(o => o.id === value);
             return found ? found.name : "Pilih Opsi...";
        }
        return "Pilih Opsi...";
    };

    return (
        <div ref={containerRef} className={`relative p-3 rounded-xl border transition-all duration-300 ${darkMode ? 'bg-[#151d30] border-cyan-500/20 hover:border-lime-500/40' : 'bg-white border-slate-100 shadow-sm hover:border-slate-200'} ${colorClass}`}>
            <label className={`text-[10px] font-bold uppercase flex items-center gap-1.5 mb-2 opacity-90 tracking-wider ${darkMode ? 'text-lime-200/70' : 'text-slate-500'}`}>{icon} {label}</label>
            
            {/* Main Trigger Button */}
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`w-full flex justify-between items-center text-left rounded-lg px-3 py-2.5 text-xs font-bold outline-none border transition-all ${darkMode ? 'bg-[#0b1121] border-lime-500/30 text-lime-100' : 'bg-white border-slate-200 text-slate-800'}`}
            >
                <span className="truncate pr-2">{getDisplayValue()}</span>
                <ChevronDown size={14} className={`opacity-70 transition-transform ${isOpen ? 'rotate-180' : ''}`}/>
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div className={`absolute left-0 top-full mt-2 w-full z-50 rounded-xl border shadow-2xl overflow-hidden max-h-64 flex flex-col animate-in zoom-in-95 duration-200 ${darkMode ? 'bg-[#0b1121] border-lime-500/30 text-white' : 'bg-white border-slate-200 text-slate-800'}`}>
                    
                    {/* Fixed Options (Auto/Custom) */}
                    <div className={`p-2 border-b flex gap-2 ${darkMode ? 'border-white/10' : 'border-slate-100'}`}>
                        <button onClick={() => { onTypeChange('auto'); setIsOpen(false); }} className={`flex-1 py-2 text-[10px] font-bold rounded flex items-center justify-center gap-1 ${type === 'auto' ? (darkMode ? 'bg-lime-500 text-black' : 'bg-blue-600 text-white') : (darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200')}`}>
                            <Sparkles size={10}/> AI AUTO
                        </button>
                        <button onClick={() => { onTypeChange('custom'); setIsOpen(false); }} className={`flex-1 py-2 text-[10px] font-bold rounded flex items-center justify-center gap-1 ${type === 'custom' ? (darkMode ? 'bg-lime-500 text-black' : 'bg-blue-600 text-white') : (darkMode ? 'bg-white/5 hover:bg-white/10' : 'bg-slate-100 hover:bg-slate-200')}`}>
                            <Edit3 size={10}/> CUSTOM
                        </button>
                    </div>

                    {/* Search Input (Point B) */}
                    <div className={`px-3 py-2 border-b sticky top-0 ${darkMode ? 'border-white/10 bg-[#0b1121]' : 'border-slate-100 bg-white'}`}>
                        <div className="flex items-center gap-2">
                            <Search size={12} className="opacity-50"/>
                            <input 
                                autoFocus
                                type="text" 
                                placeholder="Cari opsi..." 
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full bg-transparent text-xs outline-none font-medium placeholder:opacity-50"
                            />
                        </div>
                    </div>

                    {/* List Items */}
                    <div className="overflow-y-auto flex-1 p-1 custom-scrollbar">
                        {filteredOptions.length === 0 ? (
                            <div className="p-3 text-center text-[10px] opacity-50">Tidak ditemukan</div>
                        ) : (
                            filteredOptions.map((opt, idx) => {
                                const val = isSimpleArray ? opt : opt.id;
                                const display = isSimpleArray ? opt : opt.name;
                                const desc = !isSimpleArray ? opt.desc : null;
                                const isSelected = value === val;

                                return (
                                    <button 
                                        key={idx} 
                                        onClick={() => handleSelect(val)}
                                        className={`w-full text-left px-3 py-2 rounded text-xs transition-colors mb-0.5 ${isSelected ? (darkMode ? 'bg-lime-500/20 text-lime-400' : 'bg-blue-50 text-blue-700') : (darkMode ? 'hover:bg-white/5' : 'hover:bg-slate-50')}`}
                                    >
                                        <div className="font-bold truncate">{display}</div>
                                        {desc && <div className="text-[9px] opacity-60 truncate">{desc}</div>}
                                    </button>
                                );
                            })
                        )}
                    </div>
                </div>
            )}

            {/* Custom Input Area */}
            {type === 'custom' && (
               <div className="mt-2 animate-in fade-in">
                  <div className="flex items-center gap-1 mb-1">
                     <Sparkles size={10} className="text-yellow-500" />
                     <span className="text-[9px] opacity-60 font-mono">AI SUGGESTION</span>
                  </div>
                  <textarea 
                    value={customText} 
                    onChange={(e) => onCustomTextChange(e.target.value)} 
                    className={`w-full rounded-lg px-3 py-2 text-xs outline-none min-h-[60px] ${darkMode ? 'bg-[#0b1121] border-2 border-lime-500/30 text-lime-100 focus:border-lime-400' : 'bg-white border-2 border-slate-200 text-slate-800 focus:border-blue-500'}`} 
                    placeholder="Deskripsi custom..."
                  />
               </div>
            )}
        </div>
    );
};

export default function InfographicBuilder() {
  const [darkMode, setDarkMode] = useState(true); 
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [step, setStep] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [isCopied, setIsCopied] = useState(false);
  const [fallbackUsed, setFallbackUsed] = useState(false);
  const [inputType, setInputType] = useState('keyword'); 
  const [manualUrl, setManualUrl] = useState('');
  const [remixQuery, setRemixQuery] = useState(''); 
  const [urlStatus, setUrlStatus] = useState('idle');
  const [statusMessage, setStatusMessage] = useState('');
  const [keyword, setKeyword] = useState('');
  
  const [jiplakImage, setJiplakImage] = useState(null);
  const jiplakInputRef = useRef(null);
  const remixInputRef = useRef(null); 
  const logoInputRef = useRef(null); // NEW REF FOR LOGO

  // --- UPDATED STATE FOR BRANDING (WITH LOCK/UNLOCK FOR SECTIONS) ---
  const [branding, setBranding] = useState({
      footer: { text: 'Presented by Agni Silahudin', locked: true }, // Default Locked
      socials: { enabled: false, locked: false, items: [] }, // NEW: enabled/locked
      logo: { enabled: false, locked: false, data: null } // NEW: enabled/locked
  });

  const [researchData, setResearchData] = useState({
    title: '',
    sections: Array(5).fill().map((_, i) => ({ id: i + 1, title: '', content: '', citation: '' })),
    source: '',
  });
  
  const [config, setConfig] = useState({
    goal: { type: 'auto', value: '' },
    audience: { type: 'auto', value: '' },
    ratio: { type: 'auto', value: RATIOS[2] },
    characterVisual: { type: 'auto', value: '' },
    languageTone: { type: 'auto', value: '' }, 
    visualStyle: { type: 'auto', value: 'minimal', customText: '' },
    subStyle: { type: 'auto', value: '' }, 
    colorPalette: { type: 'auto', value: null, customText: '' }
  });
  
  const [referenceImages, setReferenceImages] = useState([]); 
  const [imageAnalysis, setImageAnalysis] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef(null);
  
  const [finalPrompt, setFinalPrompt] = useState('');
  const [jsonPrompt, setJsonPrompt] = useState(''); 
  const [outputTab, setOutputTab] = useState('standard'); 

  // --- THEME SYSTEM ---
  const theme = {
      bg: darkMode 
        ? 'bg-[#0b1121] text-white selection:bg-lime-500 selection:text-black' 
        : 'bg-sky-50 text-slate-900 selection:bg-blue-200 selection:text-blue-900',
      card: darkMode 
        ? 'bg-[#151d30] border-2 border-cyan-500/20 shadow-[0_0_25px_rgba(6,182,212,0.15)] hover:border-lime-500/40 transition-all duration-300' 
        : 'bg-white border-2 border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:border-slate-200',
      header: darkMode 
        ? 'bg-black/90 backdrop-blur-md border-b border-lime-500/30 shadow-[0_4px_20px_rgba(132,204,22,0.1)]' 
        : 'bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm',
      input: darkMode 
        ? 'bg-[#0b1121] border-2 border-lime-500/30 text-lime-100 focus:border-lime-400 focus:shadow-[0_0_15px_rgba(132,204,22,0.4)] placeholder:text-lime-500/30' 
        : 'bg-white border-2 border-slate-200 text-slate-800 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 placeholder:text-slate-400',
      buttonPrimary: darkMode 
        ? 'bg-lime-600 hover:bg-lime-500 text-white border border-lime-400 shadow-[0_0_15px_rgba(132,204,22,0.4)]' 
        : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white shadow-lg shadow-blue-500/30',
      buttonSecondary: darkMode 
        ? 'bg-[#1e293b] hover:bg-[#334155] text-lime-200 border border-lime-500/30' 
        : 'bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm',
      accentText: darkMode ? 'text-lime-400' : 'text-blue-600',
      label: darkMode ? 'text-lime-200/70' : 'text-slate-500 font-semibold',
      numberBadge: darkMode
        ? 'bg-lime-500 text-black shadow-[0_0_10px_rgba(132,204,22,0.6)]'
        : 'bg-gradient-to-br from-blue-500 to-cyan-500 text-white shadow-md',
      sectionHeader: darkMode ? 'border-b border-lime-500/20 bg-lime-950/10' : 'border-b border-slate-100 bg-slate-50/50',
  };
  
  const sectionColors = {
      input: darkMode ? 'border-emerald-500/50 bg-emerald-950/20' : 'border-emerald-200 bg-emerald-50',
      goal: darkMode ? 'border-amber-500/50 bg-amber-950/20 text-amber-400' : 'border-amber-200 bg-amber-50 text-amber-700',
      audience: darkMode ? 'border-pink-500/50 bg-pink-950/20 text-pink-400' : 'border-pink-200 bg-pink-50 text-pink-700',
      ratio: darkMode ? 'border-violet-500/50 bg-violet-950/20 text-violet-400' : 'border-violet-200 bg-violet-50 text-violet-700',
      char: darkMode ? 'border-lime-500/50 bg-lime-950/20 text-lime-400' : 'border-lime-200 bg-lime-50 text-lime-700',
      tone: darkMode ? 'border-teal-500/50 bg-teal-950/20 text-teal-400' : 'border-teal-200 bg-teal-50 text-teal-700',
      style: darkMode ? 'border-cyan-500/50 bg-cyan-950/20 text-cyan-400' : 'border-cyan-200 bg-cyan-50 text-cyan-700',
      color: darkMode ? 'border-rose-500/50 bg-rose-950/20 text-rose-400' : 'border-rose-200 bg-rose-50 text-rose-700',
      image: darkMode ? 'border-sky-500/50 bg-sky-950/20 text-sky-400' : 'border-sky-200 bg-sky-50 text-sky-700',
      brand: darkMode ? 'border-yellow-500/50 bg-yellow-950/20 text-yellow-400' : 'border-yellow-200 bg-yellow-50 text-yellow-700', // NEW COLOR
  };

  const handleReset = () => {
    setStep(1); setKeyword(''); setManualUrl(''); setUrlStatus('idle'); setStatusMessage(''); setFallbackUsed(false); setJiplakImage(null); setRemixQuery('');
    setResearchData({ title: '', sections: Array(5).fill().map((_, i) => ({ id: i + 1, title: '', content: '', citation: '' })), source: '' });
    setFinalPrompt(''); setJsonPrompt(''); setReferenceImages([]); setImageAnalysis('');
    // Note: Branding reset is optional, usually users want to keep it.
  };

  // ... (cleanAndParseJSON, fetchVideoMetadata, callGemini same as before) ...
  const cleanAndParseJSON = (text) => {
      try {
          const startIndex = text.indexOf('{'); const endIndex = text.lastIndexOf('}');
          if (startIndex === -1 || endIndex === -1) throw new Error("No JSON brackets found");
          let jsonString = text.substring(startIndex, endIndex + 1).replace(/\*\*/g, '').replace(/\*/g, ''); 
          return JSON.parse(jsonString);
      } catch (e) { console.warn("JSON Parsing Warning:", e); return null; }
  };

  const fetchVideoMetadata = async (url) => {
      const oembedUrl = `https://noembed.com/embed?url=${encodeURIComponent(url)}`;
      try { const res = await fetch(oembedUrl); const data = await res.json(); return data.title ? { title: data.title, author: data.author_name, provider: data.provider_name } : null; } 
      catch (e) { console.warn("OEmbed fetch failed", e); return null; }
  };

  const callGemini = async (promptText, images = [], useSearch = false) => {
    if (!apiKey) return null;
    try {
      const parts = [{ text: promptText }];
      images.forEach(img => parts.push({ inlineData: { mimeType: img.mimeType || "image/jpeg", data: img.base64 } }));
      const payload = { contents: [{ parts: parts }] };
      if (useSearch) payload.tools = [{ google_search: {} }];
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const data = await response.json();
      if (data.error) throw new Error(data.error.message);
      return data.candidates[0].content.parts[0].text;
    } catch (error) { console.error("API Error:", error); throw error; }
  };

  const extractBracketGuide = (text) => {
      if (!text) return { cleanText: '', guide: '' };
      const match = text.match(/\[(.*?)\]/);
      if (match) {
          return {
              cleanText: text.replace(/\[.*?\]/g, '').trim(),
              guide: match[1].trim() 
          };
      }
      return { cleanText: text.trim(), guide: '' };
  };

  const parseIntelligentCount = (text) => {
      const lower = text.toLowerCase();
      const wordMap = { 'satu': 1, 'dua': 2, 'tiga': 3, 'empat': 4, 'lima': 5, 'enam': 6, 'tujuh': 7, 'delapan': 8, 'sembilan': 9, 'sepuluh': 10, 'panca': 5, 'sapta': 7, 'dasa': 10, 'songo': 9, 'nawa': 9 };
      const explicitMatch = lower.match(/\b(\d+|satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan|sepuluh)\s+(tips|cara|langkah|fakta|hal|alasan|poin|kunci|manfaat|jenis|prestasi|sejarah|keagungan|prinsip|aturan|hukum)/i);
      const topMatch = lower.match(/top\s+(\d+|satu|dua|tiga|empat|lima|enam|tujuh|delapan|sembilan|sepuluh)/i);
      const startMatch = lower.match(/^(\d+)\s+/); 
      if (explicitMatch) { const val = explicitMatch[1]; return isNaN(val) ? wordMap[val] : parseInt(val); }
      if (topMatch) { const val = topMatch[1]; return isNaN(val) ? wordMap[val] : parseInt(val); }
      if (startMatch) return parseInt(startMatch[1]);
      const romanMatch = lower.match(/\b(ii|iii|iv|v|vi|vii|viii|ix|x)\b\s+(fakta|poin|hal|keagungan|prinsip)/i);
      const romanMap = {'ii':2, 'iii':3, 'iv':4, 'v':5, 'vi':6, 'vii':7, 'viii':8, 'ix':9, 'x':10};
      if (romanMatch) return romanMap[romanMatch[1]];
      if (lower.includes('walisongo')) return 9; if (lower.includes('pancasila')) return 5; if (lower.includes('dasa darma')) return 10; if (lower.includes('sapta marga')) return 7; if (lower.includes('rukun islam')) return 5; if (lower.includes('rukun iman')) return 6;
      return null;
  };

  const applySmartConfig = (recommendations) => {
      if (!recommendations) return;
      const setCustom = (value) => ({ type: 'custom', value: value });
      const setCustomStyle = (val) => ({ type: 'custom', value: 'custom_trigger', customText: val });
      const setCustomColor = (val) => ({ type: 'custom', value: null, customText: val });
      setConfig(prev => ({
          ...prev,
          goal: setCustom(recommendations.goal_description || recommendations.goal),
          audience: setCustom(recommendations.audience_description || recommendations.audience),
          characterVisual: setCustom(recommendations.character_description || recommendations.character),
          languageTone: setCustom(recommendations.tone_description || recommendations.tone), 
          visualStyle: setCustomStyle(recommendations.style_description || recommendations.style),
          colorPalette: setCustomColor(recommendations.color_description || recommendations.color),
          ratio: { type: 'preset', value: recommendations.ratio || RATIOS[0] } 
      }));
  };

  const performResearch = async (queryType, queryValue, remixImageBase64 = null) => {
      if (!queryValue) return;
      setUrlStatus('loading'); setIsLoading(true); setStatusMessage('Analisis Topik, Gaya & Tone (NANO BANANA PRO)...'); setFallbackUsed(false);
      let searchContext = ""; let manualSource = "";
      const { cleanText, guide } = extractBracketGuide(queryValue); 
      const detectedCount = parseIntelligentCount(cleanText); 
      let countInstruction = detectedCount ? `**ATURAN WAJIB (STRICT COUNT):** Input pengguna menyiratkan jumlah "${detectedCount}". Kamu HARUS membuat TEPAT ${detectedCount} sections/poin. DILARANG KURANG ATAU LEBIH.` : "Ekstrak inti materi menjadi 3-7 poin padat. (Kecuali jika topik menyiratkan jumlah spesifik seperti 'Rukun Islam' = 5).";

      if (queryType === 'remix') {
          searchContext = `**TUGAS REMIX:** 1. **ANALISIS GAMBAR:** Ambil Gaya Visual, Layout, dan Tone dari gambar yang diupload. 2. **RISET TOPIK BARU:** Topik barunya adalah: "${cleanText}". 3. **ADAPTASI:** Terapkan gaya gambar lama ke topik baru ini.`;
      } else if (queryType === 'url') {
          const metaData = await fetchVideoMetadata(cleanText);
          const title = metaData ? metaData.title : "Konten URL";
          if (metaData && metaData.provider === "YouTube") { manualSource = `▶️ YouTube: ${metaData.author} - "${metaData.title}"`; searchContext = `Analisis Video YouTube: "${title}" oleh channel "${metaData.author}".`; } 
          else { searchContext = `Analisis URL: "${cleanText}" (Judul: ${title}).`; }
      } else { searchContext = `Analisis Topik: "${cleanText}".`; }

      const prompt = `Target Model: GEMINI NANO BANANA PRO (Vision Expert). Role: Creative Director & Data Scientist. Tugas: ${searchContext} 
      INSTRUKSI PENTING TENTANG INPUT BRACKET [ ]: Input Asli: "${queryValue}"
      ${guide ? `**USER GUIDE (VISUAL BIBLE DARI BRACKET):** "${guide}" -> Gunakan instruksi dalam tanda kutip ini sebagai **KITAB SUCI VISUAL**. Detail ini mendikte pencahayaan, tekstur, komposisi, dan suasana. JANGAN abaikan.` : ''}
      INSTRUKSI UTAMA LAINNYA: 1. ${countInstruction} 2. **SUMBER (SMART CITATION):** Isi field "citation" per poin. Jika tidak ada sumber jelas, **WAJIB IMPROVISASI (HALLUCINATION)** nama sumber pendek yang PROFESIONAL. 3. **STYLE BLENDING:** Gunakan kecerdasanmu untuk **MENCAMPUR (BLEND) 2-3 GAYA** yang cocok jika perlu. 4. **DISAMBIGUASI KONTEKS (CRITICAL):** Cek makna ganda. Jika ya, **WAJIB** tegaskan konteks visual yang benar secara eksplisit.
      OUTPUT FORMAT (JSON): { "title": "Judul Headline Menarik (Tanpa text bracket)", "source": "${manualSource || "Nama Sumber Kredibel"}", "sections": [{"title": "Sub-poin", "content": "Ringkasan padat", "citation": "Sumber Pro"}], "recommendations": { "ratio": "4:5 (IG Feed)", "goal_description": "Tujuan spesifik", "audience_description": "Target audiens spesifik", "tone_description": "Tone bahasa spesifik", "style_description": "Deskripsi visual detail (Boleh Blending 2-3 gaya)", "character_description": "Deskripsi karakter", "color_description": "Palet warna harmonis" } }`;

      if (!apiKey) { setTimeout(() => { runFallbackSimulation(cleanText, "Simulasi Offline", detectedCount); }, 1500); return; }

      try {
          const parts = [{ text: prompt }];
          if (queryType === 'remix' && remixImageBase64) parts.push({ inlineData: { mimeType: "image/jpeg", data: remixImageBase64 } });
          const payload = { contents: [{ parts: parts }], tools: [{ google_search: {} }] };
          const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-preview-09-2025:generateContent?key=${apiKey}`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
          const data = await response.json();
          if (data.error) throw new Error(data.error.message);
          const resultText = data.candidates[0].content.parts[0].text;
          const parsed = cleanAndParseJSON(resultText);
          if (parsed) {
              setResearchData({ title: parsed.title, source: parsed.source || manualSource || "Analisis AI", sections: parsed.sections.map((s, i) => ({ id: i + 1, title: s.title, content: s.content, citation: s.citation || '' }))});
              if (parsed.recommendations) applySmartConfig(parsed.recommendations);
              setUrlStatus('success'); setStep(2);
          } else throw new Error("Gagal memproses respons AI");
      } catch (e) { console.error(e); runFallbackSimulation(cleanText, "Mode Manual", detectedCount); } finally { setIsLoading(false); setStatusMessage(''); }
  };

  const runFallbackSimulation = (topic, source, count) => {
      const targetCount = count || 5;
      const mockSections = Array.from({ length: targetCount }, (_, i) => ({ id: i+1, title: `Poin Penting ${i+1}`, content: `Konten simulasi untuk ${topic}.`, citation: '' }));
      setResearchData({ title: topic || "Judul Infografis", source: source, sections: mockSections });
      setFallbackUsed(true); setStep(2); setIsLoading(false);
  };

  // --- BRANDING HANDLERS ---
  const handleLogoUpload = (e) => { const file = e.target.files[0]; if(file) { const reader = new FileReader(); reader.onloadend = () => { setBranding(prev => ({ ...prev, logo: { ...prev.logo, data: reader.result } })); }; reader.readAsDataURL(file); } };
  const toggleFooterLock = () => setBranding(prev => ({ ...prev, footer: { ...prev.footer, locked: !prev.footer.locked } }));
  const updateFooterText = (text) => setBranding(prev => ({ ...prev, footer: { ...prev.footer, text } }));
  
  const addSocial = (typeId) => {
      if (branding.socials.locked) return;
      const type = SOCIAL_TYPES.find(t => t.id === typeId);
      setBranding(prev => ({ ...prev, socials: { ...prev.socials, items: [...prev.socials.items, { id: Date.now(), type, value: '', mode: 'icon' }] } }));
  };
  const removeSocial = (id) => {
      if (branding.socials.locked) return;
      setBranding(prev => ({ ...prev, socials: { ...prev.socials, items: prev.socials.items.filter(s => s.id !== id) } }));
  };
  const updateSocial = (id, key, val) => {
      if (branding.socials.locked) return;
      setBranding(prev => ({ ...prev, socials: { ...prev.socials, items: prev.socials.items.map(s => s.id === id ? { ...s, [key]: val } : s) } }));
  };

  // Toggles for new features
  const toggleSocialEnable = () => setBranding(prev => ({ ...prev, socials: { ...prev.socials, enabled: !prev.socials.enabled } }));
  const toggleSocialLock = () => setBranding(prev => ({ ...prev, socials: { ...prev.socials, locked: !prev.socials.locked } }));
  
  const toggleLogoEnable = () => setBranding(prev => ({ ...prev, logo: { ...prev.logo, enabled: !prev.logo.enabled } }));
  const toggleLogoLock = () => setBranding(prev => ({ ...prev, logo: { ...prev.logo, locked: !prev.logo.locked } }));


  // ... (Handlers for Jiplak, Remix, Image Upload same as before) ...
  const handleJiplakUpload = (e) => { const file = e.target.files[0]; if(file) { const reader = new FileReader(); reader.onloadend = () => { handleJiplakAnalysis(reader.result.split(',')[1], null); }; reader.readAsDataURL(file); } };
  const handleJiplakDrop = (e) => { e.preventDefault(); setIsDragging(false); const file = e.dataTransfer.files[0]; if(file) { const reader = new FileReader(); reader.onloadend = () => { const img = new Image(); img.onload = () => { const r = detectAspectRatio(img.width, img.height); handleJiplakAnalysis(reader.result.split(',')[1], r); }; img.src = reader.result; }; reader.readAsDataURL(file); } };
  const handleRemixUpload = (e) => { const file = e.target.files[0]; if(file) { const reader = new FileReader(); reader.onloadend = () => { setJiplakImage(reader.result); }; reader.readAsDataURL(file); } };
  const handleRemixDrop = (e) => { e.preventDefault(); setIsDragging(false); const file = e.dataTransfer.files[0]; if(file) { const reader = new FileReader(); reader.onloadend = () => { setJiplakImage(reader.result); }; reader.readAsDataURL(file); } };
  const executeRemix = () => { if (!jiplakImage || !remixQuery) return; const base64 = jiplakImage.split(',')[1]; performResearch('remix', remixQuery, base64); };
  const handleJiplakAnalysis = async (base64Image, detectedRatio) => { if (!apiKey) { alert("Masukkan API Key."); return; } setIsLoading(true); setStatusMessage("Menganalisis Struktur & Gaya Visual (Nano Banana)..."); setStep(1); const prompt = `Target Model: GEMINI NANO BANANA PRO. Role: Expert Design Reverse Engineer. Tugas: Dekonstruksi gambar ini...`; try { const result = await callGemini(prompt, [{ mimeType: "image/jpeg", base64: base64Image }], false); const parsed = cleanAndParseJSON(result); if (parsed) { setResearchData({ title: parsed.title, source: parsed.source, sections: parsed.sections.map((s, i) => ({ id: i+1, title: s.title, content: s.content, citation: s.citation || '' })) }); if (parsed.recommendations) applySmartConfig(parsed.recommendations); setStep(2); setStatusMessage("Selesai! Gaya visual berhasil disalin."); } } catch(e) { console.error(e); setStatusMessage("Gagal menganalisis gambar."); } finally { setIsLoading(false); } };
  const detectAspectRatio = (width, height) => { const ratio = width / height; const ratioMap = [ { val: 9/16, label: RATIOS[0] }, { val: 1, label: RATIOS[1] }, { val: 4/5, label: RATIOS[2] }, { val: 16/9, label: RATIOS[3] }, { val: 3/4, label: RATIOS[4] }, { val: 2/3, label: RATIOS[5] }, { val: 21/9, label: RATIOS[6] } ]; return ratioMap.reduce((prev, curr) => (Math.abs(curr.val - ratio) < Math.abs(prev.val - ratio) ? curr : prev)).label; };
  const handleImageUpload = (e) => { if(e.target.files) processFiles(e.target.files); };
  const processFiles = (files) => { const readers = []; Array.from(files).forEach(file => { if (file.type.startsWith('image/')) { const r = new FileReader(); r.onloadend = () => resolve({ id: crypto.randomUUID(), url: r.result, base64: r.result.split(',')[1], mimeType: file.type, focus: '' }); readers.push(new Promise(resolve => { r.readAsDataURL(file); r.onloadend=()=>resolve({id:crypto.randomUUID(),url:r.result,base64:r.result.split(',')[1],mimeType:file.type, focus:''})})); }}); if (readers.length) Promise.all(readers).then(res => { setReferenceImages(prev => { const up = [...prev, ...res]; return up; }); }); };
  const removeImage = (id) => setReferenceImages(prev => prev.filter(i => i.id !== id));
  const handleImageFocusChange = (id, val) => { setReferenceImages(prev => prev.map(img => img.id === id ? { ...img, focus: val } : img)); };
  const addSection = () => setResearchData(prev => ({ ...prev, sections: [...prev.sections, { id: Date.now(), title: '', content: '', citation: '' }] }));
  const removeSection = (idx) => setResearchData(prev => ({ ...prev, sections: prev.sections.filter((_, i) => i !== idx) }));
  const handleSectionChange = (id, field, val) => { setResearchData(prev => ({ ...prev, sections: prev.sections.map(s => s.id === id ? { ...s, [field]: val } : s) })); };
  const handleConfigChange = (key, val) => { let m='preset', v=val; if(val==='auto'){m='auto'; v='';} else if(val==='custom'){m='custom';v='';} setConfig(prev => ({...prev, [key]: {type:m, value:v}})); };
  const handleCustomInputChange = (key, val) => setConfig(prev => ({...prev, [key]: {...prev[key], value:val}}));
  const handleStyleSelectChange = (val) => { let m = 'preset'; if(val==='auto') m='auto'; if(val==='custom_trigger') m='custom'; setConfig(prev => ({...prev, visualStyle: {type:m, value:val==='auto'?'minimal':(val==='custom_trigger'?'':val), customText:''}, subStyle: { type: 'auto', value: '' } })); };
  const handleSubStyleSelectChange = (val) => { setConfig(prev => ({ ...prev, subStyle: { type: 'preset', value: val } })); };
  const handleColorSelect = (p) => setConfig(prev => ({...prev, colorPalette: {type:'preset', value:p, customText:''}}));
  const handleColorAuto = () => setConfig(prev => ({...prev, colorPalette: {type:'auto', value:null, customText:''}}));
  const handleColorCustomTrigger = () => setConfig(prev => ({...prev, colorPalette: {type:'custom', value:null, customText:''}}));

  const generatePrompt = () => {
    setIsLoading(true);
    setTimeout(() => {
      const getInstr = (lbl, item) => `* **${lbl}:** ${item.type === 'auto' ? 'AUTO-OPTIMIZE' : (item.value || '(Custom)')}`;
      const sectionsText = researchData.sections.filter(s => s.title.trim()).map((s, i) => `Section ${i+1}: **${s.title}**\nContent: "${s.content}"${s.citation ? `\n(Citation: "${s.citation}")` : ''}`).join('\n\n');
      
      let styleInstr = "";
      if (config.visualStyle.type === 'auto') styleInstr = `* **Design Style:** AUTO-SELECT or BLEND styles.`;
      else if (config.visualStyle.type === 'custom') styleInstr = `* **Design Style:** ${config.visualStyle.customText}`;
      else { const s = STYLES.find(x => x.id === config.visualStyle.value); const sub = config.subStyle.value ? `(${config.subStyle.value})` : ""; styleInstr = `* **Design Style:** ${s?.name} ${sub} - ${s?.desc}`; }

      let colorInstr = "";
      if (config.colorPalette.type === 'auto') colorInstr = `* **Color Palette:** AUTO-GENERATE unique palette.`;
      else if (config.colorPalette.type === 'custom') colorInstr = `* **Color Palette:** ${config.colorPalette.customText}`;
      else colorInstr = `* **Color Palette:** ${config.colorPalette.value.name} (${config.colorPalette.value.colors.join(', ')}).`;

      // --- BRANDING LOGIC ---
      const socialsText = branding.socials.enabled ? branding.socials.items.map(s => `${s.type.label}: ${s.value} (${s.mode === 'icon' ? 'Icon Only' : 'Text & Icon'})`).join(', ') : '';
      const brandingInstr = `\n**BRANDING & ASSETS**\n- Footer Credit: "${branding.footer.text}" (Locked/Mandatory)\n- Socials/Links: ${socialsText || "None"}\n- Logo: ${(branding.logo.enabled && branding.logo.data) ? "CUSTOM LOGO PROVIDED (See image)" : "Create a suitable logo if needed"}`;

      let refImgInstr = "";
      if (referenceImages.length > 0) { refImgInstr = "\n**REFERENCE IMAGE INSTRUCTIONS:**\n"; referenceImages.forEach((img, idx) => { if (img.focus) refImgInstr += `- Image ${idx+1} Focus: ${img.focus}\n`; }); }
      
      const standardPrompt = `Create a High-Quality Infographic for GEMINI NANO BANANA PRO.\n\n**1. CONTEXT**\n* **Topic:** ${researchData.title}\n* **Source:** ${researchData.source}\n${getInstr('Goal', config.goal)}\n${getInstr('Audience', config.audience)}\n${getInstr('Tone', config.languageTone)}\n\n**2. VISUALS**\n${styleInstr}\n${colorInstr}\n${getInstr('Character', config.characterVisual)}\n${getInstr('Ratio', config.ratio)}\n${refImgInstr}${brandingInstr}\n**3. CONTENT**\n${sectionsText}\n\n**4. LAYOUT STRUCTURE**\n- **Header:** Big Title Only.\n- **Body:** Points with content.\n- **Footer:** Credit "${branding.footer.text}" + Socials (Bottom Left/Center). **KEEP BOTTOM-RIGHT EMPTY for Watermark.**`;
      
      const jsonObj = {
          "TASK_DIRECTIVE": "GENERATE INFOGRAPHIC IMAGE. IGNORE TEXT ANALYSIS.",
          "VISUAL_RULES": {
             "ASPECT_RATIO": config.ratio.value || "4:5 (Vertical IG Feed)",
             "STYLE_MOOD": config.visualStyle.type === 'custom' ? config.visualStyle.customText : `${config.visualStyle.value} ${config.subStyle.value || ''}`,
             "COLOR_PALETTE": config.colorPalette.type === 'custom' ? config.colorPalette.customText : (config.colorPalette.value?.name || "Auto"),
             "CHARACTER_PRESENCE": config.characterVisual.value || "None"
          },
          "STRICT_LAYOUT_MANDATE": {
              "HEADER_TOP": `MUST contain Title: '${researchData.title}'`,
              "BODY_CENTER": "Visual Data Points",
              "FOOTER_AREA": `MUST contain Text: 'Sumber: ${researchData.source}' AND Credit: '${branding.footer.text}'`,
              "SOCIAL_PROOF_PLACEMENT": branding.socials.enabled && branding.socials.items.length > 0 ? `Display icons for [${branding.socials.items.map(s => s.type.label).join(', ')}] at Bottom Left or Center.` : "None",
              "WATERMARK_SAFETY": "LEAVE BOTTOM-RIGHT CORNER EMPTY (Reserved for AI Watermark).",
              "BRAND_LOGO": (branding.logo.enabled && branding.logo.data) ? "Use provided logo image at Top-Left" : "Auto-generate logo if appropriate"
          },
          "CONTENT_DATA_POINTS": researchData.sections.map(s => ({ "HEADLINE": s.title, "SUMMARY": s.content, "CITATION_NOTE": s.citation }))
      };
      
      setFinalPrompt(standardPrompt);
      setJsonPrompt(`**SYSTEM COMMAND: RENDER_IMAGE_FROM_JSON**\n\nGenerate a high-fidelity image adhering STRICTLY to the 'VISUAL_RULES' and 'STRICT_LAYOUT_MANDATE' in the JSON below. \n\n${JSON.stringify(jsonObj, null, 2)}`);
      setStep(2); setIsLoading(false);
    }, 1000);
  };

  const copyToClipboard = (text) => { const t = document.createElement("textarea"); t.value = text; document.body.appendChild(t); t.select(); document.execCommand('copy'); document.body.removeChild(t); setIsCopied(true); setTimeout(() => setIsCopied(false), 2000); };

  return (
    <div className={`min-h-screen font-sans pb-12 transition-all duration-500 ${theme.bg}`}>
      {/* Header */}
      <div className={`${theme.header} sticky top-0 z-50 backdrop-blur-md`}>
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-4 md:py-4 flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="relative group cursor-default text-center md:text-left">
                <h1 className={`relative text-2xl md:text-3xl font-black italic tracking-tighter transform -skew-x-6 ${darkMode ? 'text-lime-400' : 'text-blue-700'}`}>
                    14 ALL INFOGRAPHIC PRO
                    <span className={`ml-2 text-xs not-italic px-2 py-0.5 rounded font-bold tracking-widest align-middle transform skew-x-6 inline-block ${darkMode ? 'bg-lime-400 text-black' : 'bg-blue-600 text-white'}`}>v5.13</span>
                </h1>
                <p className={`text-[8px] md:text-[9px] font-bold tracking-widest mt-1 uppercase ml-1 opacity-70 ${darkMode ? 'text-lime-400' : 'text-slate-500'}`}>POWERED BY NANO BANANA PRO</p>
                <p className={`text-[9px] md:text-[10px] font-bold tracking-[0.4em] mt-0.5 uppercase ml-1 opacity-80 ${darkMode ? 'text-lime-400' : 'text-slate-500'}`}>PRESENTED BY AGNI SILAHUDIN</p>
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-3">
                <a href="https://t.me/agnisilahudin" target="_blank" rel="noreferrer" className={`p-2 rounded-full transition-all ${theme.buttonSecondary} hover:text-blue-500`} title="Hubungi Developer via Telegram">
                    <Send size={18}/>
                </a>
                <button onClick={() => setDarkMode(!darkMode)} className={`p-2 rounded-full transition-all ${theme.buttonSecondary}`}>{darkMode ? <Sun size={18}/> : <Moon size={18}/>}</button>
                <button onClick={() => setShowApiKeyInput(!showApiKeyInput)} className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs transition-all ${apiKey ? (darkMode ? 'bg-emerald-500/20 text-emerald-500 border-emerald-500/50' : 'bg-blue-100 text-blue-700') : theme.buttonSecondary}`}><Key size={14}/> {apiKey ? 'API Ready' : 'Set API Key'}</button>
                <button onClick={handleReset} className={`px-4 py-2 rounded-full backdrop-blur-sm transition-all ${theme.buttonSecondary}`}><RefreshCw size={16}/></button>
            </div>

            {showApiKeyInput && (
                <div className={`absolute top-20 right-4 md:right-10 w-[90vw] md:w-96 p-5 rounded-2xl shadow-2xl z-[60] border-2 animate-in zoom-in-95 ${darkMode ? 'bg-[#0f172a] border-lime-500 shadow-lime-900/50' : 'bg-white border-blue-400 shadow-blue-200'}`}>
                    <div className="flex justify-between items-center mb-4">
                       <h3 className={`font-bold text-sm flex items-center gap-2 ${darkMode ? 'text-lime-400' : 'text-blue-700'}`}><Key size={16}/> KONFIGURASI API</h3>
                       <button onClick={() => setShowApiKeyInput(false)} className="opacity-50 hover:opacity-100"><X size={16}/></button>
                    </div>
                    {!apiKey && (
                       <div className={`mb-4 rounded-lg p-3 text-xs space-y-2 ${darkMode ? 'bg-slate-800 text-slate-300' : 'bg-blue-50 text-slate-600'}`}>
                          <p className="font-bold flex items-center gap-1"><Info size={12}/> Cara Mendapatkan Key (Gratis):</p>
                          <ol className="list-decimal ml-4 space-y-1 opacity-90">
                             <li>Buka <a href="https://aistudio.google.com/app/apikey" target="_blank" className="underline font-bold hover:text-blue-500">Google AI Studio</a></li>
                             <li>Login & Klik <b>"Create API Key"</b></li>
                             <li>Salin kode & tempel di bawah ini</li>
                          </ol>
                       </div>
                    )}
                    <input type="password" value={apiKey} onChange={(e) => setApiKey(e.target.value)} placeholder="Tempel AIzaSy..." className={`w-full rounded-xl px-4 py-3 text-sm outline-none mb-3 font-mono ${theme.input}`}/>
                    <button onClick={() => setShowApiKeyInput(false)} className={`w-full py-3 rounded-xl font-bold text-xs shadow-lg transition-transform active:scale-95 ${darkMode ? 'bg-lime-500 text-black hover:bg-lime-400' : 'bg-blue-600 text-white hover:bg-blue-500'}`}>SIMPAN & AKTIFKAN</button>
                </div>
            )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-12 gap-8 pt-6">
        
        {/* KOLOM KIRI (INPUT & EDITOR) */}
        <div className="lg:col-span-7 space-y-8">
          <section className={`rounded-3xl overflow-hidden relative border ${theme.card} ${sectionColors.input}`}>
            <div className={`px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-3 ${theme.sectionHeader}`}>
                <h2 className={`text-lg font-black flex items-center gap-3 ${theme.accentText}`}><span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg ${theme.numberBadge}`}>1</span> Input & Riset</h2>
                <div className={`grid grid-cols-4 md:flex rounded-lg p-1 border w-full md:w-auto gap-0 md:gap-0 justify-center ${darkMode ? 'bg-black/40 border-white/10' : 'bg-slate-100 border-slate-200'}`}>
                     <button onClick={() => setInputType('keyword')} className={`flex-1 md:flex-none px-2 md:px-3 py-1.5 text-[10px] md:text-xs font-bold rounded-md flex justify-center gap-1 md:gap-2 items-center transition-all ${inputType === 'keyword' ? theme.buttonPrimary : theme.label}`}><Zap size={12}/> Keyword</button>
                     <button onClick={() => setInputType('url')} className={`flex-1 md:flex-none px-2 md:px-3 py-1.5 text-[10px] md:text-xs font-bold rounded-md flex justify-center gap-1 md:gap-2 items-center transition-all ${inputType === 'url' ? theme.buttonPrimary : theme.label}`}><LinkIcon size={12}/> Link</button>
                     <button onClick={() => setInputType('jiplak')} className={`flex-1 md:flex-none px-2 md:px-3 py-1.5 text-[10px] md:text-xs font-bold rounded-md flex justify-center gap-1 md:gap-2 items-center transition-all ${inputType === 'jiplak' ? theme.buttonPrimary : theme.label}`}><ScanEye size={12}/> Jiplak</button>
                     <button onClick={() => setInputType('remix')} className={`flex-1 md:flex-none px-2 md:px-3 py-1.5 text-[10px] md:text-xs font-bold rounded-md flex justify-center gap-1 md:gap-2 items-center transition-all ${inputType === 'remix' ? theme.buttonPrimary : theme.label}`}><Shuffle size={12}/> Remix</button>
                </div>
            </div>
            
            <div className="p-4 md:p-6 relative z-10 flex flex-col items-center">
                <div className={`mb-4 text-[10px] md:text-xs flex items-start gap-2 opacity-80 w-full ${darkMode ? 'text-lime-200' : 'text-slate-600'}`}>
                   <Info size={14} className="shrink-0 mt-0.5"/>
                   <p><b>Tips Pro:</b> Gunakan tanda kurung siku <b>[ ... ]</b> sebagai <b>"KITAB SUCI VISUAL"</b>. Isi dengan deskripsi detail seperti <i>"pencahayaan neon, tekstur kayu basah, cangkir putih beruap"</i> agar AI menggambar persis imajinasi Anda.</p>
                </div>

                {fallbackUsed && <div className={`mb-4 border rounded-lg p-3 flex gap-3 items-center w-full ${darkMode ? 'bg-red-900/20 border-red-500/50 text-red-400' : 'bg-orange-50 border-orange-200 text-orange-600'}`}><AlertTriangle className="shrink-0" size={16} /><p className="text-xs">Mode Manual (Offline/Fallback)</p></div>}
                
                <div className="w-full mx-auto max-w-xl">
                {inputType === 'remix' ? (
                   <div className="space-y-4 animate-in fade-in slide-in-from-bottom-4 w-full">
                       <div 
                          onDragOver={(e)=>{e.preventDefault();setIsDragging(true)}} 
                          onDragLeave={(e)=>{e.preventDefault();setIsDragging(false)}} 
                          onDrop={handleRemixDrop}
                          onClick={() => remixInputRef.current?.click()} 
                          className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all group w-full ${isDragging ? 'border-purple-500 bg-purple-500/20' : (darkMode ? 'border-purple-500/30 hover:border-purple-400 bg-purple-900/10' : 'border-purple-300 hover:border-purple-500 bg-purple-50')}`}
                       >
                          {jiplakImage ? (
                              <div className="relative h-32 w-full">
                                  <img src={jiplakImage} alt="Remix Source" className="h-full w-full object-contain rounded-lg"/>
                                  <button onClick={(e) => { e.stopPropagation(); setJiplakImage(null); }} className="absolute top-0 right-0 bg-red-500 text-white p-1 rounded-bl-lg hover:scale-110 transition-transform"><X size={14}/></button>
                              </div>
                          ) : (
                              <>
                                  <Shuffle className="mx-auto mb-3 opacity-80 group-hover:scale-110 transition-transform text-purple-500" size={32}/>
                                  <p className={`font-bold text-xs md:text-sm ${theme.accentText}`}>1. UPLOAD GAMBAR REFERENSI</p>
                                  <p className="text-[10px] opacity-60">Gaya & Layout gambar ini akan ditiru</p>
                              </>
                          )}
                          <input type="file" ref={remixInputRef} onChange={handleRemixUpload} accept="image/*" className="hidden" />
                       </div>

                       <div className="flex flex-col md:flex-row gap-3 w-full">
                           <input 
                              type="text" 
                              value={remixQuery} 
                              onChange={(e) => setRemixQuery(e.target.value)} 
                              placeholder="2. Mau diubah jadi apa? (Misal: Stegosaurus [chibi])..." 
                              className={`flex-1 border-2 rounded-xl px-4 py-3 outline-none font-medium transition-all w-full ${theme.input}`}
                           />
                           <button 
                              onClick={executeRemix} 
                              disabled={isLoading || !jiplakImage || !remixQuery} 
                              className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 w-full md:w-auto ${theme.buttonPrimary}`}
                           >
                              {isLoading ? <Loader2 className="animate-spin"/> : <Sparkles size={16}/>} Riset & Remix
                           </button>
                       </div>
                   </div>
                ) : inputType === 'jiplak' ? (
                   <div 
                      onDragOver={(e)=>{e.preventDefault();setIsDragging(true)}} 
                      onDragLeave={(e)=>{e.preventDefault();setIsDragging(false)}} 
                      onDrop={handleJiplakDrop}
                      onClick={() => jiplakInputRef.current?.click()} 
                      className={`border-2 border-dashed rounded-2xl p-8 md:p-12 text-center cursor-pointer transition-all group w-full ${isDragging ? 'border-cyan-500 bg-cyan-500/20' : (darkMode ? 'border-cyan-500/30 hover:border-cyan-400 bg-cyan-900/10' : 'border-blue-300 hover:border-blue-500 bg-blue-50')}`}
                   >
                      {isLoading ? <Loader2 className="mx-auto animate-spin mb-4 text-cyan-500" size={40}/> : <ScanEye className="mx-auto mb-4 opacity-80 group-hover:scale-110 transition-transform text-cyan-500" size={40}/>}
                      <p className={`font-bold text-sm md:text-base ${theme.accentText}`}>{isLoading ? "AI Sedang Menganalisis Gambar..." : "UPLOAD / DRAG FOTO INFOGRAFIS"}</p>
                      <p className={`text-xs mt-2 opacity-60`}>AI akan meniru Struktur Data & Gaya Visualnya</p>
                      <input type="file" ref={jiplakInputRef} onChange={handleJiplakUpload} accept="image/*" className="hidden" />
                   </div>
                ) : (
                   <div className="flex flex-col md:flex-row gap-3 w-full">
                       <input type="text" value={inputType === 'keyword' ? keyword : manualUrl} onChange={(e) => inputType === 'keyword' ? setKeyword(e.target.value) : setManualUrl(e.target.value)} placeholder={inputType === 'keyword' ? "Topik (Misal: 7 Manfaat Kopi)..." : "Link YouTube/Artikel..."} className={`flex-1 border-2 rounded-xl px-4 py-3 outline-none font-medium transition-all w-full ${theme.input}`}/>
                       <button onClick={() => performResearch(inputType, inputType === 'keyword' ? keyword : manualUrl)} disabled={isLoading || (inputType==='keyword'?!keyword:!manualUrl)} className={`px-6 py-3 rounded-xl font-bold transition-all flex items-center justify-center gap-2 hover:scale-105 active:scale-95 w-full md:w-auto ${theme.buttonPrimary}`}>{isLoading ? <Loader2 className="animate-spin"/> : <Globe size={16}/>} Riset</button>
                   </div>
                )}
                </div>
                {statusMessage && <p className={`text-xs mt-3 text-center animate-pulse font-mono ${theme.accentText}`}>_ {statusMessage}</p>}
            </div>
          </section>

          {(researchData.title || step >= 2) && (
              <section className={`rounded-3xl overflow-hidden animate-in slide-in-from-bottom-10 fade-in border ${theme.card}`}>
                <div className={`px-6 py-4 flex justify-between items-center ${theme.sectionHeader}`}>
                    <h3 className={`font-bold flex items-center gap-2 ${theme.accentText}`}><FileText size={18}/> Editor Konten</h3>
                </div>
                <div className="p-6 space-y-5">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        <div><label className={`text-xs font-bold uppercase mb-1.5 block ${theme.label}`}>Judul Utama</label><input value={researchData.title} onChange={(e) => setResearchData({...researchData, title: e.target.value})} className={`w-full border-2 rounded-xl px-3 py-2.5 font-bold outline-none ${theme.input}`}/></div>
                        <div><label className={`text-xs font-bold uppercase mb-1.5 block ${theme.label}`}>Sumber Data</label><input value={researchData.source} onChange={(e) => setResearchData({...researchData, source: e.target.value})} className={`w-full border-2 rounded-xl px-3 py-2.5 text-sm outline-none ${theme.input}`}/></div>
                    </div>
                    <div className={`rounded-2xl p-5 border space-y-4 ${darkMode ? 'bg-white/5 border-white/10' : 'bg-slate-50 border-slate-200'}`}>
                        <div className="flex justify-between items-center mb-1"><p className={`text-[10px] font-black uppercase tracking-widest ${theme.label}`}>Poin Materi</p><button onClick={addSection} className={`text-[10px] flex items-center gap-1 font-bold px-3 py-1.5 rounded-lg hover:opacity-80 transition-opacity ${theme.buttonSecondary}`}><Plus size={10}/> TAMBAH</button></div>
                        {researchData.sections.map((s, i) => (
                            <div key={s.id} className="flex gap-3 items-start relative group">
                                <span className={`flex-shrink-0 w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center mt-1.5 ${darkMode ? 'bg-white/10 text-white' : 'bg-slate-200 text-slate-700'}`}>{i+1}</span>
                                <div className="flex-1 space-y-2">
                                    <input value={s.title} onChange={(e) => handleSectionChange(s.id, 'title', e.target.value)} className={`w-full bg-transparent border-b border-dashed font-bold text-sm outline-none py-1 ${darkMode ? 'border-white/20 text-white' : 'border-slate-300 text-slate-900'}`} placeholder="Judul Poin"/>
                                    <textarea value={s.content} onChange={(e) => handleSectionChange(s.id, 'content', e.target.value)} rows={2} className={`w-full bg-transparent resize-none text-xs outline-none ${theme.label}`} placeholder="Isi penjelasan..."/>
                                    <div className="flex items-center gap-2 opacity-70">
                                        <Quote size={10} className={darkMode ? 'text-lime-400' : 'text-blue-500'} />
                                        <input value={s.citation || ''} readOnly className={`w-full bg-transparent text-[10px] italic outline-none border-none p-0 bg-transparent opacity-60 cursor-default ${darkMode ? 'text-white' : 'text-slate-900'}`} placeholder="[Auto-Citation by AI]"/>
                                    </div>
                                </div>
                                {researchData.sections.length > 1 && <button onClick={() => removeSection(i)} className={`absolute -right-2 top-0 opacity-0 group-hover:opacity-100 transition-all hover:scale-110 p-1 ${theme.error}`}><X size={14}/></button>}
                            </div>
                        ))}
                    </div>
                </div>
              </section>
          )}
        </div>

        {/* KOLOM KANAN (KONFIGURASI) */}
        <div className="lg:col-span-5 space-y-8">
            <section className={`rounded-3xl overflow-hidden sticky top-24 border ${theme.card}`}>
                <div className={`px-6 py-4 ${theme.sectionHeader}`}><h2 className={`text-lg font-black flex items-center gap-3 ${theme.accentText}`}><span className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold shadow-lg ${theme.numberBadge}`}>2</span> Konfigurasi</h2></div>
                <div className="p-6 space-y-4">
                    {/* IMPLEMENTASI SEARCHABLE SELECT (POINT B) */}
                    <SearchableSelect label="Tujuan" icon={<Zap size={14}/>} value={config.goal.value} onChange={(v) => handleConfigChange('goal', v)} options={GOALS} type={config.goal.type} onTypeChange={(t) => handleConfigChange('goal', t==='auto'?'auto':(t==='custom'?'custom_trigger':''))} customText={config.goal.value} onCustomTextChange={(v) => handleCustomInputChange('goal', v)} colorClass={sectionColors.goal} darkMode={darkMode} />
                    <SearchableSelect label="Audiens" icon={<User size={14}/>} value={config.audience.value} onChange={(v) => handleConfigChange('audience', v)} options={AUDIENCES} type={config.audience.type} onTypeChange={(t) => handleConfigChange('audience', t==='auto'?'auto':(t==='custom'?'custom_trigger':''))} customText={config.audience.value} onCustomTextChange={(v) => handleCustomInputChange('audience', v)} colorClass={sectionColors.audience} darkMode={darkMode} />
                    <SearchableSelect label="Gaya Bahasa" icon={<MessageSquare size={14}/>} value={config.languageTone.value} onChange={(v) => handleConfigChange('languageTone', v)} options={TONES} type={config.languageTone.type} onTypeChange={(t) => handleConfigChange('languageTone', t==='auto'?'auto':(t==='custom'?'custom_trigger':''))} customText={config.languageTone.value} onCustomTextChange={(v) => handleCustomInputChange('languageTone', v)} colorClass={sectionColors.tone} darkMode={darkMode} />
                    <SearchableSelect label="Rasio" icon={<Edit3 size={14}/>} value={config.ratio.value} onChange={(v) => handleConfigChange('ratio', v)} options={RATIOS} type={config.ratio.type} onTypeChange={(t) => handleConfigChange('ratio', t==='auto'?'auto':(t==='custom'?'custom_trigger':''))} customText={config.ratio.value} onCustomTextChange={(v) => handleCustomInputChange('ratio', v)} colorClass={sectionColors.ratio} darkMode={darkMode} />
                    <SearchableSelect label="Karakter" icon={<User size={14}/>} value={config.characterVisual.value} onChange={(v) => handleConfigChange('characterVisual', v)} options={CHARACTERS} type={config.characterVisual.type} onTypeChange={(t) => handleConfigChange('characterVisual', t==='auto'?'auto':(t==='custom'?'custom_trigger':''))} customText={config.characterVisual.value} onCustomTextChange={(v) => handleCustomInputChange('characterVisual', v)} colorClass={sectionColors.char} darkMode={darkMode} />

                    <div className={`w-full h-px my-4 ${darkMode ? 'bg-white/10' : 'bg-slate-200'}`}></div>
                    
                    {/* Style Config with Searchable Select */}
                    <SearchableSelect label="Gaya Desain (Gudang Opsi)" icon={<Cpu size={14}/>} value={config.visualStyle.value} onChange={handleStyleSelectChange} options={STYLES} type={config.visualStyle.type} onTypeChange={(t) => handleStyleSelectChange(t==='auto'?'auto':(t==='custom'?'custom_trigger':''))} customText={config.visualStyle.customText} onCustomTextChange={(v) => setConfig(prev => ({...prev, visualStyle: {...prev.visualStyle, customText: v}}))} colorClass={darkMode ? 'border-cyan-500/30 bg-cyan-950/20' : 'border-cyan-300 bg-white shadow-sm'} darkMode={darkMode} />
                    {config.visualStyle.type !== 'custom' && config.visualStyle.value !== 'auto' && (
                       <div className="mt-3 animate-in fade-in slide-in-from-top-2">
                           <SearchableSelect label="Sub-Gaya (Detail)" icon={<Layers size={14}/>} value={config.subStyle.value} onChange={handleSubStyleSelectChange} options={STYLES.find(s => s.id === config.visualStyle.value)?.subStyles || []} type="preset" onTypeChange={()=>{}} customText="" onCustomTextChange={()=>{}} colorClass={darkMode ? 'border-cyan-500/30 bg-cyan-950/20' : 'border-cyan-300 bg-white shadow-sm'} darkMode={darkMode} />
                       </div>
                    )}
                    
                    {/* NEW SECTION: BRANDING & ASSETS (POINT A, B, C, D) */}
                    <div className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.01] ${sectionColors.brand}`}>
                        <label className={`text-[10px] font-bold uppercase flex items-center gap-1.5 mb-2 opacity-80 tracking-wider text-yellow-500`}><Monitor size={14}/> BRANDING & ASSETS (PRO)</label>
                        
                        {/* 1. FOOTER CREDIT (POINT A) */}
                        <div className={`p-3 rounded-lg border mb-3 ${darkMode ? 'bg-black/20 border-white/10' : 'bg-white border-slate-200'}`}>
                             <label className="text-[9px] font-bold opacity-60 mb-1 block">FOOTER CREDIT</label>
                             <div className="flex gap-2">
                                <input 
                                    value={branding.footer.text} 
                                    onChange={(e) => updateFooterText(e.target.value)}
                                    disabled={branding.footer.locked}
                                    className={`flex-1 bg-transparent text-xs font-bold outline-none ${branding.footer.locked ? 'opacity-50 cursor-not-allowed' : ''}`}
                                />
                                <button onClick={toggleFooterLock} className={`text-yellow-500 hover:text-yellow-400`}>
                                    {branding.footer.locked ? <Lock size={14}/> : <Unlock size={14}/>}
                                </button>
                             </div>
                        </div>

                        {/* 2. SOCIAL MEDIA & LINKS (POINT B & C) - WITH CHECKBOX & LOCK */}
                        <div className={`p-3 rounded-lg border mb-3 transition-all ${branding.socials.enabled ? (darkMode ? 'bg-black/20 border-white/10' : 'bg-white border-slate-200') : 'opacity-60 border-dashed border-white/10'}`}>
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <button onClick={toggleSocialEnable} className={`transition-colors ${branding.socials.enabled ? 'text-green-400' : 'text-slate-500'}`}>
                                        {branding.socials.enabled ? <CheckSquare size={14}/> : <Square size={14}/>}
                                    </button>
                                    <label className="text-[9px] font-bold opacity-80 cursor-pointer" onClick={toggleSocialEnable}>TAUTAN & IDENTITAS (+)</label>
                                </div>
                                {branding.socials.enabled && (
                                    <button onClick={toggleSocialLock} className={`text-yellow-500 hover:text-yellow-400`}>
                                        {branding.socials.locked ? <Lock size={14}/> : <Unlock size={14}/>}
                                    </button>
                                )}
                            </div>
                            
                            {branding.socials.enabled && (
                                <div className={`space-y-2 animate-in fade-in slide-in-from-top-1 ${branding.socials.locked ? 'opacity-70 pointer-events-none' : ''}`}>
                                    <div className="flex gap-1 mb-2">
                                        <select 
                                            onChange={(e) => { if(e.target.value) addSocial(e.target.value); e.target.value=''; }} 
                                            disabled={branding.socials.locked}
                                            className={`text-[10px] border rounded px-1 outline-none w-full py-1 ${darkMode ? 'bg-[#0b1121] border-white/20 text-white' : 'bg-white border-slate-300 text-slate-800'}`}
                                        >
                                            <option value="" className={darkMode ? 'bg-[#0b1121]' : ''}>+ Tambah Tautan...</option>
                                            {SOCIAL_TYPES.map(t => <option key={t.id} value={t.id} className={darkMode ? 'bg-[#0b1121]' : ''}>{t.label}</option>)}
                                        </select>
                                    </div>

                                    {branding.socials.items.map((social) => (
                                        <div key={social.id} className="flex gap-2 items-center animate-in slide-in-from-left-2">
                                            <div className="p-1.5 rounded bg-white/10">{social.type.icon}</div>
                                            <input 
                                                placeholder={`Isi ${social.type.label}...`}
                                                value={social.value}
                                                onChange={(e) => updateSocial(social.id, 'value', e.target.value)}
                                                className="flex-1 bg-transparent border-b border-dashed border-white/20 text-[10px] outline-none py-1"
                                            />
                                            <button onClick={() => updateSocial(social.id, 'mode', social.mode === 'icon' ? 'text' : 'icon')} className={`text-[9px] px-1.5 py-0.5 rounded border ${social.mode === 'text' ? 'bg-yellow-500/20 border-yellow-500 text-yellow-500' : 'opacity-50 border-white/20'}`}>
                                                {social.mode === 'icon' ? 'ICON' : 'TEXT'}
                                            </button>
                                            <button onClick={() => removeSocial(social.id)} className="text-red-400 hover:text-red-300"><X size={12}/></button>
                                        </div>
                                    ))}
                                    {branding.socials.items.length === 0 && <p className="text-[9px] opacity-40 italic text-center py-1">Belum ada tautan ditambahkan.</p>}
                                    
                                    {/* Tips Pro for Socials */}
                                    <div className={`mt-2 text-[9px] opacity-70 border-t border-dashed border-white/10 pt-2`}>
                                        <Info size={10} className="inline mr-1"/>
                                        <span><b>Tips Pro:</b> Pilih mode <b>ICON</b> untuk tampilan minimalis, atau <b>TEXT</b> untuk info lengkap (misal: Alamat). Posisi otomatis diatur AI agar tidak menabrak watermark.</span>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* 3. LOGO INTEGRATION (POINT D) - WITH CHECKBOX & LOCK */}
                        <div className={`p-3 rounded-lg border transition-all ${branding.logo.enabled ? (darkMode ? 'bg-black/20 border-white/10' : 'bg-white border-slate-200') : 'opacity-60 border-dashed border-white/10'}`}>
                            <div className="flex justify-between items-center mb-2">
                                <div className="flex items-center gap-2">
                                    <button onClick={toggleLogoEnable} className={`transition-colors ${branding.logo.enabled ? 'text-green-400' : 'text-slate-500'}`}>
                                        {branding.logo.enabled ? <CheckSquare size={14}/> : <Square size={14}/>}
                                    </button>
                                    <label className="text-[9px] font-bold opacity-80 cursor-pointer" onClick={toggleLogoEnable}>LOGO / IDENTITAS (OPSIONAL)</label>
                                </div>
                                {branding.logo.enabled && (
                                    <button onClick={toggleLogoLock} className={`text-yellow-500 hover:text-yellow-400`}>
                                        {branding.logo.locked ? <Lock size={14}/> : <Unlock size={14}/>}
                                    </button>
                                )}
                            </div>

                            {branding.logo.enabled && (
                                <div className={`animate-in fade-in slide-in-from-top-1 ${branding.logo.locked ? 'opacity-70 pointer-events-none' : ''}`}>
                                    <div onClick={() => logoInputRef.current?.click()} className={`border border-dashed rounded-lg p-3 text-center cursor-pointer transition-all hover:bg-white/5 ${branding.logo.data ? 'border-yellow-500' : 'border-white/20'}`}>
                                        {branding.logo.data ? (
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <img src={branding.logo.data} className="h-8 w-8 object-contain rounded bg-white/10" />
                                                    <span className="text-[10px] font-bold text-yellow-500">Logo Uploaded</span>
                                                </div>
                                                <button onClick={(e) => { e.stopPropagation(); setBranding(prev => ({ ...prev, logo: { ...prev.logo, data: null } })); }} className="text-red-400"><Trash2 size={12}/></button>
                                            </div>
                                        ) : (
                                            <div className="flex flex-col items-center gap-1 opacity-60">
                                                <Upload size={14}/>
                                                <span className="text-[9px]">Upload Logo (PNG/JPG)</span>
                                            </div>
                                        )}
                                        <input type="file" ref={logoInputRef} onChange={handleLogoUpload} accept="image/*" className="hidden" />
                                    </div>
                                    <p className="text-[9px] mt-2 opacity-50 italic">Jika kosong, AI akan membuatkan logo ilustrasi yang cocok.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Color Config */}
                    <div className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.01] ${darkMode ? 'border-rose-500/30 bg-rose-950/20' : 'border-rose-300 bg-white shadow-sm'}`}>
                        <label className={`text-[10px] font-bold uppercase flex items-center gap-1.5 mb-2 opacity-80 tracking-wider ${darkMode ? 'text-rose-400' : 'text-rose-600'}`}><Palette size={14}/> Warna</label>
                        <div className="grid grid-cols-2 gap-2 mb-2">
                            <button onClick={handleColorAuto} className={`p-2 rounded-lg border text-[10px] font-bold flex items-center justify-center gap-1 transition-all ${config.colorPalette.type === 'auto' ? theme.buttonPrimary : theme.buttonSecondary}`}><Sparkles size={10}/> AI Auto</button>
                            <button onClick={handleColorCustomTrigger} className={`p-2 rounded-lg border text-[10px] font-bold flex items-center justify-center gap-1 transition-all ${config.colorPalette.type === 'custom' ? theme.buttonPrimary : theme.buttonSecondary}`}><Edit3 size={10}/> Custom</button>
                        </div>
                        {config.colorPalette.type === 'custom' ? (
                           <div className="animate-in fade-in mt-2">
                              <input type="text" placeholder="Contoh: Merah, Hitam, dan Emas..." value={config.colorPalette.customText} onChange={(e) => setConfig(prev => ({ ...prev, colorPalette: { ...prev.colorPalette, customText: e.target.value } }))} className={`w-full border rounded-lg px-3 py-2 text-xs outline-none ${theme.input}`} />
                           </div>
                        ) : (
                           <div className="grid grid-cols-4 gap-2 mt-2 max-h-36 overflow-y-auto pr-1 custom-scrollbar">
                              {COLORS.map(p => (
                                  <button key={p.id} onClick={() => handleColorSelect(p)} className={`flex flex-col items-center gap-1 p-1.5 rounded-lg border transition-all group ${config.colorPalette.type === 'preset' && config.colorPalette.value?.id === p.id ? (darkMode ? 'border-cyan-400 bg-slate-800' : 'border-fuchsia-500 bg-slate-50') : 'border-transparent hover:bg-white/5'}`}>
                                      <div className="flex h-4 w-full rounded overflow-hidden border border-black/10 shadow-sm">{p.colors.map(c => <div key={c} style={{ backgroundColor: c }} className="flex-1 h-full"/>)}</div>
                                      <span className={`text-[8px] font-medium truncate w-full text-center ${theme.label}`}>{p.name}</span>
                                  </button>
                              ))}
                           </div>
                        )}
                    </div>

                    <div className={`w-full h-px my-2 ${darkMode ? 'bg-white/10' : 'bg-slate-200'}`}></div>

                    {/* Reference Images with Focus Input */}
                    <div className={`p-4 rounded-xl border transition-all duration-300 hover:scale-[1.01] ${darkMode ? 'border-red-500/30 bg-red-950/20' : 'border-sky-300 bg-white shadow-sm'}`}>
                        <label className={`text-[10px] font-bold uppercase flex items-center gap-1 justify-between ${darkMode ? 'text-red-400' : 'text-sky-600'}`}><span className="flex items-center gap-1"><ImageIcon size={14}/> Referensi (Optional)</span></label>
                        <div onDragOver={(e)=>{e.preventDefault();setIsDragging(true)}} onDragLeave={(e)=>{e.preventDefault();setIsDragging(false)}} onDrop={(e)=>{e.preventDefault();setIsDragging(false);if(e.dataTransfer.files)processFiles(e.dataTransfer.files)}} onClick={()=>fileInputRef.current?.click()} className={`mt-2 border-2 border-dashed rounded-lg p-4 text-center cursor-pointer transition-colors ${isDragging ? 'border-emerald-500 bg-emerald-500/10' : (darkMode ? 'border-white/20 hover:bg-white/5' : 'border-slate-300 hover:bg-slate-100')}`}>
                            <Upload size={18} className={`mx-auto mb-1 ${theme.label}`}/><p className={`text-[10px] font-medium ${theme.label}`}>{isDragging ? 'Lepaskan' : 'Klik / Drag & Drop'}</p>
                            <input type="file" ref={fileInputRef} onChange={handleImageUpload} accept="image/*" multiple className="hidden" />
                        </div>
                        {referenceImages.length > 0 && (
                          <div className="space-y-2 mt-3">
                             {referenceImages.map((img, idx) => (
                               <div key={img.id} className={`flex gap-3 items-center p-2 rounded-lg border ${darkMode ? 'bg-black/30 border-white/10' : 'bg-white border-slate-200'}`}>
                                  <div className="relative w-12 h-12 shrink-0">
                                     <img src={img.url} className="w-full h-full object-cover rounded-md" />
                                     <button onClick={() => removeImage(img.id)} className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-0.5"><X size={10}/></button>
                                  </div>
                                  <div className="flex-1">
                                     <label className="text-[9px] font-bold opacity-70 flex items-center gap-1"><Focus size={10}/> Fokus ke bagian mana?</label>
                                     <input 
                                        type="text" 
                                        value={img.focus} 
                                        onChange={(e) => handleImageFocusChange(img.id, e.target.value)}
                                        placeholder="Contoh: Wajah, Style, Warna..."
                                        className={`w-full mt-1 bg-transparent border-b text-xs outline-none py-0.5 ${darkMode ? 'border-white/20 text-white placeholder:text-white/20' : 'border-slate-300 text-slate-800 placeholder:text-slate-400'}`}
                                     />
                                  </div>
                               </div>
                             ))}
                          </div>
                        )}
                    </div>

                    <button onClick={generatePrompt} disabled={isLoading || !researchData.title} className={`w-full py-4 rounded-xl font-black text-sm shadow-lg hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-2 ${!researchData.title ? 'bg-slate-500 cursor-not-allowed opacity-50' : theme.buttonPrimary}`}>
                        {isLoading ? <Loader2 className="animate-spin"/> : <Play fill="currentColor"/>} GENERATE PROMPT
                    </button>
                    
                    {finalPrompt && (
                        <div className={`mt-6 rounded-2xl p-1 shadow-2xl animate-in zoom-in-95 duration-300 border ${darkMode ? 'bg-black/40 border-emerald-500/30' : 'bg-white border-blue-200'}`}>
                            <div className="flex justify-between items-center px-4 py-2 border-b border-dashed border-white/10">
                               <div className="flex gap-2">
                                  <button onClick={() => setOutputTab('standard')} className={`text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all ${outputTab === 'standard' ? (darkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-100 text-blue-700') : 'opacity-50 hover:opacity-100'}`}>STANDARD</button>
                                  <button onClick={() => setOutputTab('json')} className={`text-[10px] font-bold px-3 py-1.5 rounded-lg transition-all flex items-center gap-1 ${outputTab === 'json' ? (darkMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-100 text-blue-700') : 'opacity-50 hover:opacity-100'}`}><Braces size={10}/> JSON</button>
                               </div>
                               {isCopied && <span className={`text-[10px] font-bold flex items-center gap-1 ${theme.success}`}><CheckCircle size={10}/> COPIED</span>}
                            </div>
                            
                            <textarea 
                              readOnly 
                              value={outputTab === 'standard' ? finalPrompt : jsonPrompt} 
                              className={`w-full h-48 text-xs font-mono p-3 rounded-xl resize-none focus:outline-none border-0 bg-transparent ${darkMode ? 'text-emerald-100' : 'text-indigo-900'}`}
                            />
                            
                            <div className="flex gap-2 p-2">
                               <button onClick={() => copyToClipboard(outputTab === 'standard' ? finalPrompt : jsonPrompt)} className={`flex-1 py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-2 ${theme.buttonPrimary}`}><Copy size={14}/> Salin {outputTab === 'standard' ? 'Standard' : 'JSON'}</button>
                               <button onClick={() => window.open("https://gemini.google.com/app", "_blank")} className={`flex-1 py-2 rounded-lg font-bold text-xs flex items-center justify-center gap-2 ${theme.buttonSecondary}`}>Buka Gemini <ExternalLink size={14}/></button>
                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
        
        {/* Footer Contact & Copyright Info (POINT F) */}
        <div className={`max-w-7xl mx-auto px-6 py-8 text-center text-[10px] opacity-70 ${darkMode ? 'text-slate-500' : 'text-slate-400'}`}>
            <div className="flex flex-col items-center gap-2 mb-4">
               <p className="font-bold tracking-widest uppercase mb-1">Butuh Bantuan, Kritik & Saran?</p>
               <a href="https://t.me/agnisilahudin" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-dashed transition-all hover:bg-blue-500/10 hover:border-blue-500 hover:text-blue-500 border-current">
                  <Send size={12}/> Hubungi Agni Silahudin (0812-8111-1908)
               </a>
            </div>
            
            <div className="border-t border-dashed border-white/10 pt-4 mt-2 text-[9px] leading-relaxed max-w-2xl mx-auto">
               <p className="font-bold text-red-400 mb-1">⚠️ PERINGATAN HAK CIPTA & LISENSI PENGGUNAAN ⚠️</p>
               <p>
                  Tools <b>"14 ALL INFOGRAPHIC PRO v5.13"</b> ini adalah karya intelektual yang dilindungi. 
                  <b> DILARANG KERAS</b> memperjualbelikan akses, menyebarkan source code, atau mengklaim kepemilikan tanpa izin resmi dari Developer. 
                  Hargai karya anak bangsa agar kami dapat terus berkarya dan memberikan update fitur gratis untuk Anda.
                  Terima kasih telah menggunakan tools ini dengan bijak dan beretika.
               </p>
               <p className="mt-2 opacity-50">© 2025 Nano Banana Pro. All Rights Reserved.</p>
            </div>
        </div>
      </div>
      <style>{` .custom-scrollbar::-webkit-scrollbar { width: 4px; } .custom-scrollbar::-webkit-scrollbar-track { background: transparent; } .custom-scrollbar::-webkit-scrollbar-thumb { background: #475569; border-radius: 10px; } `}</style>
    </div>
  );
}