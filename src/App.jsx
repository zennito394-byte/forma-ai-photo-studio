import { useRef, useState } from "react";
import {
  Sparkles, Upload, ImagePlus, WandSparkles, Download, Clock3,
  ChevronDown, Check, X, ShieldCheck, Menu, SlidersHorizontal,
  Camera, BriefcaseBusiness, Shirt, Plane, Trophy, Palette, Heart,
  Clapperboard, Gamepad2, Stars
} from "lucide-react";

const categories = [
  { name: "Professional", icon: BriefcaseBusiness, description: "Polished portraits" },
  { name: "Fashion", icon: Shirt, description: "Editorial & streetwear" },
  { name: "Travel", icon: Plane, description: "Places around the world" },
  { name: "Sports", icon: Trophy, description: "Athletic moments" },
  { name: "Creative", icon: Palette, description: "Artistic concepts" },
  { name: "Cinematic", icon: Clapperboard, description: "Movie-like scenes" },
  { name: "Wedding", icon: Heart, description: "Formal celebrations" },
  { name: "Fantasy", icon: Stars, description: "Imaginary worlds" },
  { name: "Gaming", icon: Gamepad2, description: "Game-inspired looks" }
];

const examples = [
  { title: "Studio portrait", type: "Professional", prompt: "Create a polished studio headshot with soft directional lighting, a clean neutral background and natural skin texture." },
  { title: "Streetwear editorial", type: "Fashion", prompt: "Create a high-end streetwear editorial photograph in a modern city at golden hour. Keep the outfit stylish and realistic." },
  { title: "Mountain escape", type: "Travel", prompt: "Place me in a beautiful mountain landscape at sunrise, photographed like a premium travel magazine." },
  { title: "Stadium moment", type: "Sports", prompt: "Create a dynamic sports editorial portrait in a packed stadium, with dramatic stadium lighting." }
];

export default function App() {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const [category, setCategory] = useState("Professional");
  const [prompt, setPrompt] = useState("");
  const [ratio, setRatio] = useState("3:4");
  const [variations, setVariations] = useState("1");
  const [notice, setNotice] = useState("");
  const inputRef = useRef(null);

  function selectFile(nextFile) {
    if (!nextFile) return;
    if (!nextFile.type.startsWith("image/")) {
      setNotice("Please choose an image file, such as JPG, PNG or WEBP.");
      return;
    }
    if (nextFile.size > 10 * 1024 * 1024) {
      setNotice("That image is larger than 10 MB. Please choose a smaller image.");
      return;
    }
    if (preview) URL.revokeObjectURL(preview);
    setFile(nextFile);
    setPreview(URL.createObjectURL(nextFile));
    setNotice("");
  }

  function removeFile() {
    if (preview) URL.revokeObjectURL(preview);
    setFile(null);
    setPreview("");
    if (inputRef.current) inputRef.current.value = "";
  }

  function useExample(example) {
    setCategory(example.type);
    setPrompt(example.prompt);
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function requestGeneration() {
    setNotice("The studio interface is ready. The AI generation service is not connected yet, so no image has been generated or charged. We'll connect the real image API in the next stage.");
  }

  return (
    <div className="app-shell">
      <header className="topbar">
        <a className="brand" href="#" aria-label="Forma home">
          <span className="brand-mark"><Sparkles size={18} /></span>
          <span>forma<span className="brand-dot">.</span></span>
        </a>
        <nav className="nav-links">
          <a className="active" href="#studio">Create</a>
          <a href="#styles">Explore styles</a>
          <a href="#how-it-works">How it works</a>
        </nav>
        <div className="top-actions">
          <span className="credits"><Sparkles size={14} /> Preview mode</span>
          <button className="avatar" aria-label="Account menu">G</button>
          <button className="mobile-menu" aria-label="Open menu"><Menu size={20} /></button>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="eyebrow"><span className="eyebrow-dot" /> YOUR PERSONAL AI PHOTO STUDIO</div>
          <h1>Your imagination.<br /><span>Your photos, reimagined.</span></h1>
          <p className="hero-copy">Bring any idea to life. Create professional portraits, cinematic scenes, travel memories and much more — with you in the picture.</p>
          <div className="hero-tags">
            <span><ShieldCheck size={14} /> Your photos, your choice</span>
            <span><Sparkles size={14} /> Made for creativity</span>
          </div>
        </section>

        <section className="studio-layout" id="studio">
          <div className="editor-panel">
            <div className="section-heading">
              <div><span className="step-label">STEP 01</span><h2>Add your photo</h2></div>
              <span className="optional">Required</span>
            </div>

            {!preview ? (
              <button className="upload-zone" onClick={() => inputRef.current?.click()} onDragOver={e => e.preventDefault()} onDrop={e => { e.preventDefault(); selectFile(e.dataTransfer.files?.[0]); }}>
                <span className="upload-icon"><ImagePlus size={25} /></span>
                <strong>Drop your photo here</strong>
                <span className="upload-sub">or <u>browse files</u> on your device</span>
                <span className="file-rules">JPG, PNG or WEBP · Up to 10 MB</span>
              </button>
            ) : (
              <div className="preview-wrap">
                <img src={preview} alt="Your uploaded photo preview" className="photo-preview" />
                <button className="remove-photo" onClick={removeFile} aria-label="Remove photo"><X size={16} /></button>
                <div className="photo-ready"><Check size={14} /> Photo added</div>
              </div>
            )}
            <input ref={inputRef} type="file" accept="image/png,image/jpeg,image/webp" hidden onChange={e => selectFile(e.target.files?.[0])} />
            <p className="privacy-note"><ShieldCheck size={14} /> Your photo stays in this browser preview for now. Secure cloud upload will be added later.</p>

            <div className="divider" />
            <div className="section-heading">
              <div><span className="step-label">STEP 02</span><h2>Choose a style</h2></div>
            </div>
            <div className="category-grid">
              {categories.map(({ name, icon: Icon, description }) => (
                <button key={name} className={`category-card ${category === name ? "selected" : ""}`} onClick={() => setCategory(name)}>
                  <span className="category-icon"><Icon size={18} /></span>
                  <span className="category-name">{name}</span>
                  <span className="category-description">{description}</span>
                  {category === name && <span className="selected-check"><Check size={12} /></span>}
                </button>
              ))}
            </div>

            <div className="divider" />
            <div className="section-heading">
              <div><span className="step-label">STEP 03</span><h2>Describe your idea</h2></div>
              <span className="optional">Optional</span>
            </div>
            <label className="field-label" htmlFor="prompt">What should your photo look like?</label>
            <textarea id="prompt" value={prompt} onChange={e => setPrompt(e.target.value)} maxLength={1200} placeholder="Example: A cinematic portrait of me walking through Tokyo at night, neon lights reflecting on the street, wearing a stylish black jacket..." />
            <div className="textarea-footer"><span>Be as descriptive as you like.</span><span>{prompt.length}/1200</span></div>

            <div className="divider" />
            <div className="section-heading">
              <div><span className="step-label">STEP 04</span><h2>Fine-tune</h2></div>
              <SlidersHorizontal size={17} className="muted-icon" />
            </div>
            <div className="settings-row">
              <div className="setting">
                <label className="field-label" htmlFor="ratio">Image shape</label>
                <div className="select-wrap"><select id="ratio" value={ratio} onChange={e => setRatio(e.target.value)}><option value="3:4">Portrait · 3:4</option><option value="1:1">Square · 1:1</option><option value="4:3">Landscape · 4:3</option><option value="9:16">Story · 9:16</option><option value="16:9">Wide · 16:9</option></select><ChevronDown size={15} /></div>
              </div>
              <div className="setting">
                <label className="field-label" htmlFor="variations">Variations</label>
                <div className="select-wrap"><select id="variations" value={variations} onChange={e => setVariations(e.target.value)}><option value="1">1 image</option><option value="2">2 images</option><option value="3">3 images</option><option value="4">4 images</option></select><ChevronDown size={15} /></div>
              </div>
            </div>

            <button className="generate-button" onClick={requestGeneration}><WandSparkles size={18} /> Generate my photos <span className="button-arrow">→</span></button>
            {notice && <div className="notice" role="status">{notice}</div>}
            <p className="generation-footnote"><ShieldCheck size={13} /> No charge or generation happens in this preview.</p>
          </div>

          <aside className="side-panel">
            <div className="side-card inspiration-card">
              <div className="side-card-heading"><div><span className="step-label">GET INSPIRED</span><h3>Try a starting point</h3></div><Sparkles size={17} /></div>
              <p className="side-copy">Choose an idea to fill in the style and description.</p>
              <div className="example-list">
                {examples.map((example, i) => (
                  <button className="example-item" key={example.title} onClick={() => useExample(example)}>
                    <span className={`example-number n${i + 1}`}>0{i + 1}</span>
                    <span className="example-text"><strong>{example.title}</strong><small>{example.type}</small></span>
                    <span className="example-arrow">↗</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="side-card how-card" id="how-it-works">
              <span className="step-label">SIMPLE AS THAT</span>
              <h3>How it works</h3>
              <div className="how-step"><span>1</span><div><strong>Upload a photo</strong><small>Choose a clear photo of yourself.</small></div></div>
              <div className="how-step"><span>2</span><div><strong>Choose your vision</strong><small>Pick a style and describe the scene.</small></div></div>
              <div className="how-step"><span>3</span><div><strong>Generate and save</strong><small>AI creates new images for you.</small></div></div>
            </div>
            <div className="tip-card"><Camera size={18} /><div><strong>For the best results</strong><p>Use a clear, well-lit photo where your face is visible. Avoid heavy filters and blurry images.</p></div></div>
          </aside>
        </section>

        <section className="bottom-banner" id="styles">
          <div><span className="step-label">YOUR IDEAS, YOUR STYLE</span><h2>One photo. Endless possibilities.</h2><p>From everyday portraits to imaginative worlds, your creativity sets the direction.</p></div>
          <div className="banner-orb"><Sparkles size={30} /></div>
        </section>
      </main>
      <footer><a className="brand footer-brand" href="#"><span className="brand-mark"><Sparkles size={15} /></span><span>forma<span className="brand-dot">.</span></span></a><span>Creative possibilities start here.</span><span>Preview build · AI connection coming next</span></footer>
    </div>
  );
}
