# 🚀 PitchCraft Landing Page Generator - Quick Start Guide

## 30-Second Overview

PitchCraft's Landing Page Generator creates **unique, production-ready landing pages** with different layouts, colors, and animations every time you generate—even for the same input.

---

## ✨ Getting Started (5 Steps)

### Step 1: Create Your Pitch
```
Navigate to: Create Pitch
Enter: Your startup idea
Select: Industry (Tech, Health, Education, etc.)
Choose: Tone (Formal or Fun)
Click: Generate Pitch
```

### Step 2: View Your Pitch
```
Automatic redirect to: Generated Pitch page
See: AI-generated name, tagline, elevator pitch
View: Custom logo, brand colors
```

### Step 3: Generate Landing Page
```
Click: "Generate Landing Page" button
Wait: ~800ms loading animation
Result: Unique landing page with live preview
```

### Step 4: Explore & Regenerate
```
Toggle: Desktop ↔ Mobile view
Examine: Live preview (left) + Code (right)
Not satisfied? Click: "Regenerate" for new design
Repeat: Until you find the perfect layout
```

### Step 5: Export & Use
```
Click: "Copy Code" → Paste into your project
Or: "Download Code" → Save as .tsx file
Or: "Export PDF" → Share with team
Or: "Share Link" → Send to stakeholders
```

**Total Time: 2-5 minutes from idea to code**

---

## 🎯 Quick Feature Reference

### Uniqueness Features
- ✅ **5 Hero Styles**: Centered, Split, Minimal, Bold, Gradient-bg
- ✅ **5 Section Orders**: Different content flow arrangements
- ✅ **18+ Color Palettes**: Industry-specific, 3+ per industry
- ✅ **6 Typography Pairs**: Professional font combinations
- ✅ **5 Animation Styles**: Fade, Slide, Zoom, Glow, Parallax
- ✅ **5 Feature Layouts**: Grid-3, Grid-4, Cards, Horizontal, Stacked
- ✅ **4 CTA Styles**: Box, Full-width, Split, Minimal

**Result**: 270,000+ possible unique combinations

---

## 🎨 Industry Color Themes

| Industry | Colors | Style |
|----------|--------|-------|
| **Tech/AI** | Blue, Purple, Cyan | Dark, Futuristic |
| **Health** | Teal, Green, Sky | Light, Clean |
| **Real Estate** | Stone, Purple, Gold | Dark, Luxury |
| **Education** | Purple, Pink, Orange | Light, Friendly |
| **Marketing** | Orange, Pink, Yellow | Dark, Bold |
| **FinTech** | Green, Blue, Gold | Dark, Professional |

---

## 🔧 Interface Guide

### Header Controls
```
┌─────────────────────────────────────────────────┐
│ AI Landing Page Generator                      │
│ YourStartup • (centered layout • Poppins font) │
├─────────────────────────────────────────────────┤
│ [Regenerate] [Back to Pitch]                   │
│ [Copy Code] [Download] [Export PDF] [Share]    │
└─────────────────────────────────────────────────┘
```

### Split-Screen Layout
```
┌──────────────────┬──────────────────┐
│  Live Preview    │   React Code     │
│                  │                  │
│  [Desktop] [📱]  │   123 lines      │
│                  │                  │
│  Your rendered   │  import { ... }  │
│  landing page    │  export default  │
│  appears here    │  function...     │
│                  │                  │
│  Scroll to see   │  Scroll to see   │
│  full design     │  full code       │
└──────────────────┴──────────────────┘
```

---

## 🎬 Usage Examples

### Example 1: Tech Startup
```
Input:
  Idea: "AI code review tool for developers"
  Industry: Technology
  Tone: Formal

Possible Output:
  Hero: Bold style
  Colors: Indigo (#4F46E5) + Violet (#7C3AED)
  Font: Space Grotesk + Inter
  Animation: Glow effects
  Layout: Hero → Features → Pricing → CTA

Click Regenerate:
  Hero: Split style
  Colors: Blue (#3B82F6) + Purple (#8B5CF6)
  Font: Poppins + Inter
  Animation: Slide transitions
  Layout: Hero → Problem → Solution → Features → CTA
```

### Example 2: Health App
```
Input:
  Idea: "Meditation app for professionals"
  Industry: Healthcare
  Tone: Fun

Possible Output:
  Hero: Centered style
  Colors: Teal (#14B8A6) + Green (#10B981)
  Font: Outfit + Manrope
  Animation: Fade in
  Background: Light (#f8f9fa)

Click Regenerate:
  Hero: Minimal style
  Colors: Cyan (#06B6D4) + Teal (#14B8A6)
  Font: Plus Jakarta Sans + Inter
  Animation: Zoom
  Background: Clean white
```

---

## 📤 Export Options Explained

### Copy Code
- **What**: Copies React/TSX code to clipboard
- **Use When**: You want to paste directly into your project
- **Format**: Complete React component with imports

### Download Code
- **What**: Downloads as `.tsx` file
- **Use When**: You want to save for later or share with developers
- **Naming**: `startup-name-landing-{timestamp}.tsx`

### Export PDF
- **What**: Generates PDF with full code
- **Use When**: Sharing with non-technical team members
- **Contains**: Code + generation info + timestamp

### Share Link
- **What**: Copies shareable URL to clipboard
- **Use When**: Sharing pitch with investors or team
- **Format**: `yourdomain.com/#/pitch/{pitchId}`

---

## 💡 Pro Tips

### 🎯 Tip 1: Generate Multiple Times
**Don't settle for first result!**
- Generate 3-5 variations
- Compare layouts side-by-side
- Choose the one that fits your vision

### 🎨 Tip 2: Match Your Industry
**Colors matter:**
- Tech → Dark themes work best
- Health → Light, calming colors
- Marketing → Bold, vibrant palettes
- Finance → Professional, trustworthy tones

### 📱 Tip 3: Check Mobile View
**Always test responsive:**
- Click mobile icon (📱)
- Verify layout works on small screens
- Ensure text is readable
- Check button sizes

### 🔄 Tip 4: Customize After Export
**Generated code is a starting point:**
- Replace placeholder content
- Add real images
- Adjust colors to exact brand values
- Add more sections if needed

### ⚡ Tip 5: Use Loading Time Wisely
**800ms generation time:**
- Think about what you want to change
- Consider your target audience
- Plan your customization strategy

---

## 🐛 Troubleshooting

### "Pitch not found" Error
```
Problem: Invalid pitch ID
Solution: Go back to dashboard and select a pitch
```

### Preview Not Updating
```
Problem: Browser cache issue
Solution: Click "Regenerate" to force refresh
```

### Code Not Copying
```
Problem: Browser permissions
Solution: Manually select code and copy (Ctrl/Cmd + C)
```

### PDF Export Failing
```
Problem: Code too long for PDF
Solution: Use "Download Code" instead
```

---

## 🎓 Understanding the Generated Code

### Code Structure
```typescript
import { motion } from 'motion/react';
import { Check, ArrowRight, Star... } from 'lucide-react';

export default function YourStartupLanding() {
  return (
    <div style={{ fontFamily: '...' }}>
      {/* Navigation */}
      <nav>...</nav>
      
      {/* Hero Section */}
      <section>...</section>
      
      {/* Features */}
      <section>...</section>
      
      {/* Problem & Solution */}
      <section>...</section>
      
      {/* Pricing */}
      <section>...</section>
      
      {/* CTA */}
      <section>...</section>
      
      {/* Footer */}
      <footer>...</footer>
    </div>
  );
}
```

### What's Included
- ✅ Complete React component
- ✅ Framer Motion animations
- ✅ Inline Tailwind styles
- ✅ Lucide React icons
- ✅ Responsive design
- ✅ All sections (hero to footer)
- ✅ Production-ready code

### What You Need to Add
- 📸 Real images (replace placeholder divs)
- 📝 Actual content (expand on AI-generated text)
- 🔗 Working links (update href attributes)
- 🎨 Exact brand colors (if different from generated)
- ⚙️ Backend integration (if needed)

---

## 📊 Understanding Layout Variations

### Hero Styles Explained

**Centered** → Traditional center-aligned hero with large headline
- Best for: SaaS, tech products
- Visual: Symmetric, balanced

**Split** → Two-column layout with content + visual
- Best for: Apps, platforms
- Visual: Modern, engaging

**Minimal** → Clean, typography-focused design
- Best for: Premium products, agencies
- Visual: Elegant, spacious

**Bold** → Large, impactful headlines with color accents
- Best for: Disruptive startups, consumer apps
- Visual: Attention-grabbing, energetic

**Gradient-bg** → Full-width colored background hero
- Best for: Creative products, design tools
- Visual: Immersive, colorful

---

## ⚡ Keyboard Shortcuts

While viewing landing page:
- `Ctrl/Cmd + C` → Copy selected code
- `Ctrl/Cmd + D` → Toggle desktop/mobile (if implemented)
- `Ctrl/Cmd + R` → Regenerate (if implemented)

---

## 🔮 Next Steps After Export

### 1. Set Up Development Environment
```bash
npx create-react-app my-landing-page --template typescript
cd my-landing-page
npm install framer-motion lucide-react
```

### 2. Add Generated Component
```bash
# Copy downloaded .tsx file to src/components/
# Or paste copied code into new file
```

### 3. Import and Use
```typescript
import YourStartupLanding from './components/your-startup-landing';

function App() {
  return <YourStartupLanding />;
}
```

### 4. Customize
```typescript
// Replace colors
style={{ background: 'linear-gradient(...your colors...)' }}

// Add real images
<img src="/your-image.jpg" alt="..." />

// Update content
<h1>Your Actual Headline</h1>
```

### 5. Deploy
```bash
npm run build
# Deploy to Vercel, Netlify, etc.
```

---

## 📚 Learning Resources

### Understand the Technologies

**Framer Motion** (Animations)
- Docs: https://www.framer.com/motion/
- Learn: Animation variants, transitions, gestures

**Lucide React** (Icons)
- Docs: https://lucide.dev/
- Browse: 1000+ icons available

**Tailwind CSS** (Styling)
- Docs: https://tailwindcss.com/
- Learn: Utility-first CSS

**React** (Framework)
- Docs: https://react.dev/
- Learn: Components, hooks, props

---

## 🎯 Common Workflows

### Workflow 1: Quick Prototype
```
1. Create pitch (1 min)
2. Generate landing page (10 sec)
3. Export code (5 sec)
4. Show to team/client (instant)
```

### Workflow 2: Design Exploration
```
1. Create pitch (1 min)
2. Generate variation 1 (10 sec)
3. Regenerate 5 more times (50 sec)
4. Compare screenshots (2 min)
5. Pick favorite and export (10 sec)
```

### Workflow 3: Production Use
```
1. Create pitch (1 min)
2. Generate multiple variations (1 min)
3. Export favorite (10 sec)
4. Customize code (30-60 min)
5. Add real content (30-60 min)
6. Deploy (5 min)
```

---

## ✅ Checklist Before Exporting

- [ ] Generated at least 3 variations
- [ ] Checked desktop view
- [ ] Checked mobile view
- [ ] Read through the code
- [ ] Verified layout makes sense for your startup
- [ ] Colors match your industry
- [ ] Typography is appropriate
- [ ] Animations aren't too aggressive
- [ ] Ready to customize further

---

## 🎊 You're Ready!

You now know how to:
- ✅ Generate unique landing pages
- ✅ Understand what makes each design different
- ✅ Use the preview and code viewer
- ✅ Export in multiple formats
- ✅ Customize the generated code
- ✅ Deploy to production

**Start Creating!** 🚀

Every pitch you create gets a unique landing page. Every regeneration creates something completely new. The possibilities are endless!

---

**Questions?** Check the full documentation in `/LANDING_PAGE_GENERATOR.md`

**Need inspiration?** See examples in `/FEATURE_SHOWCASE.md`

**Happy Building!** ✨
