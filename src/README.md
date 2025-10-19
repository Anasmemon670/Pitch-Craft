# PitchCraft – Your AI Startup Pitch Partner

A modern, premium, fully responsive dark-themed AI web application that helps users turn their ideas into complete startup concepts — including AI-generated logos, landing pages, and shareable pitch assets.

![PitchCraft Banner](https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=400&fit=crop)

## 🎨 Design Language

### Visual Style
- **Theme**: Dark futuristic (Background: #000000 / #121212)
- **Accent Colors**: 
  - Neon Blue: #4F46E5
  - Neon Purple: #8B5CF6
  - Teal: #14B8A6
  - Neon Green: #22C55E
- **Typography**: Poppins / Montserrat (modern sans-serif)
- **Style**: Clean, high-tech, elegant, minimal spacing
- **Animations**: Smooth fade-ins, sliding transitions, glowing hover effects, AI text typing animation, animated logos, particle backgrounds

## ✨ Core Features

### 1. **AI Logo Generation**
- Generates unique SVG logos for every startup idea
- 5 different logo styles: Geometric, Lettermark, Abstract, Tech, Minimal
- Industry-specific logo designs
- Color palette integration
- Download logos as SVG files

### 2. **Unique Content Generation**
- Every idea produces completely different content
- AI-generated startup names based on idea and industry
- Custom taglines with tone variation (Formal/Fun)
- Unique elevator pitches
- Problem/solution statements
- Target audience personas
- Industry-specific color palettes

### 3. **Interactive Landing Page Generator**
- Split-screen layout with live preview
- React/JSX code viewer with syntax highlighting
- Copy code to clipboard
- Download code as PDF
- Responsive preview (desktop/mobile)

### 4. **Brand Kit**
- Complete brand asset package
- 5 logo variations
- Color palette with HEX/RGB values
- Typography recommendations
- Usage guidelines (Do's and Don'ts)
- Download individual logos or complete kit

### 5. **Export & Share**
- Download full pitch as PDF with professional formatting
- Export landing page code
- Generate shareable links
- Social media integration (Twitter, LinkedIn, Facebook, Email)
- Password-protected links
- Copy to clipboard functionality

### 6. **Dashboard**
- View all saved pitches
- Grid/card view with logos and taglines
- Delete pitches with confirmation
- Export directly from cards
- Real-time statistics
- Empty states with call-to-action

### 7. **Advanced Animations**
- Particle background on landing page
- Moving gradient animations
- Typing text effect for generated content
- Smooth page transitions
- Glow effects on hover
- Loading animations with AI styling
- Rotating example pitches

### 8. **Data Persistence**
- LocalStorage-based pitch management
- CRUD operations (Create, Read, Update, Delete)
- Inline editing for all pitch sections
- Auto-save functionality
- Toast notifications for all actions

## 🚀 User Flow

### 1. Landing Page
- Hero section with animated gradient background
- Particle animation system
- Rotating examples of generated startups
- "Start Creating" and "Login" buttons
- Feature showcase
- Pricing plans
- Testimonials

### 2. Authentication
- Clean, minimal login/register forms
- Email and password authentication
- "Continue with Google" option
- Glassmorphism background effects

### 3. Dashboard
- Welcome message
- Saved pitches grid with logos
- Statistics (Total pitches, this month, industries)
- "Create New Pitch" button
- Quick actions (Edit, Delete, Export)

### 4. Create Pitch
- Startup idea input (textarea)
- Industry dropdown (10 industries)
- Tone selector (Formal/Fun)
- "Generate Pitch" button
- AI loading animation with status messages
- Tips for great pitches

### 5. Generated Pitch Display
- AI-generated logo display
- Typing text animation
- Editable sections:
  - Startup Name
  - Tagline
  - Elevator Pitch
  - Problem Statement
  - Solution
  - Target Audience
- Color palette preview
- Quick actions:
  - Regenerate (new logo + content)
  - Save Pitch
  - Export as PDF
  - Share Link
  - Generate Landing Page
  - View Brand Kit

### 6. Landing Page Generator
- Split-screen layout
- Left: Live preview (responsive)
- Right: Code viewer with syntax highlighting
- Desktop/Mobile toggle
- Copy code button
- Download code as PDF
- Customizable based on pitch data

### 7. Brand Kit
- Logo variations showcase
- Color palette with copy functionality
- Typography guidelines
- Usage guidelines
- Download individual assets
- Export complete brand package

### 8. Export & Share
- Download options:
  - Full Pitch PDF
  - Landing Page Code
  - Brand Assets
  - Complete Package
- Shareable link generation
- Social media sharing
- Password protection option
- Sharing statistics
- "PitchCraft – Empowering Every Idea" thank you message

## 🛠️ Technical Stack

### Frontend Framework
- **React** with TypeScript
- **Tailwind CSS** for styling
- **shadcn/ui** component library

### Key Libraries
- **Motion/React** (Framer Motion) - Advanced animations
- **jsPDF** - PDF export functionality
- **Lucide React** - Icon library
- **Sonner** - Toast notifications

### Features Implementation
- **LocalStorage API** - Data persistence
- **Canvas API** - Particle background
- **Clipboard API** - Copy functionality
- **SVG Generation** - Dynamic logo creation
- **Base64 Encoding** - Shareable link generation

## 📁 Project Structure

```
/
├── App.tsx                          # Main application router
├── components/
│   ├── Navigation.tsx               # Navigation bar
│   ├── LandingPage.tsx              # Home page
│   ├── LoginPage.tsx                # Login form
│   ├── RegisterPage.tsx             # Registration form
│   ├── Dashboard.tsx                # Main dashboard
│   ├── CreatePitch.tsx              # Pitch creation form
│   ├── GeneratedPitch.tsx           # Pitch display & editing
│   ├── LandingPageGenerator.tsx     # Landing page builder
│   ├── ExportShare.tsx              # Export & sharing page
│   ├── BrandKit.tsx                 # Brand assets page
│   ├── ParticleBackground.tsx       # Animated background
│   ├── TypingText.tsx               # Typing animation
│   └── ui/                          # shadcn/ui components
├── utils/
│   ├── pitchGenerator.ts            # AI content generation
│   ├── logoGenerator.ts             # SVG logo creation
│   ├── storage.ts                   # LocalStorage utilities
│   └── pdfExport.ts                 # PDF generation
└── styles/
    └── globals.css                  # Global styles
```

## 🎯 Industry-Specific Features

### Supported Industries
1. **Technology** - Blue gradient, tech-style logos
2. **Healthcare** - Cyan colors, abstract designs
3. **Education** - Orange/amber, lettermark logos
4. **Finance** - Green colors, geometric patterns
5. **E-commerce** - Purple gradient, minimal style
6. **Food & Beverage** - Red colors, playful designs
7. **Sustainability** - Green earth tones, organic shapes
8. **Entertainment** - Pink/magenta, abstract art
9. **Travel** - Teal colors, adventure themes
10. **Real Estate** - Purple professional, structured layouts

Each industry gets:
- Unique color palette
- Custom logo style
- Tailored content tone
- Industry-specific suggestions

## 🎨 Logo Generation System

### Logo Styles
1. **Geometric**: Rectangle with diamond overlay
2. **Lettermark**: Circle with initials
3. **Abstract**: Flowing curves and shapes
4. **Tech**: Grid pattern with tech elements
5. **Minimal**: Simple outline with letter

### Logo Features
- SVG format for infinite scalability
- Gradient fills using brand colors
- Dynamic text rendering
- Industry-appropriate styling
- Download as individual files

## 📊 Content Generation Algorithm

### Naming Convention
- Extracts keywords from idea
- Combines with industry-specific prefixes/suffixes
- Tone-based variation (formal vs fun)
- Capitalization and formatting

### Tagline Creation
- Action verbs based on tone
- Industry-specific language
- Concise and memorable
- Reflects brand personality

### Pitch Structure
- Introduction based on tone
- Problem statement with consequences
- Solution with benefits
- Target audience profiling
- Measurable value proposition

## 🔧 Advanced Features

### Regenerate Functionality
- Keep same pitch ID
- Generate new logo and content
- Maintain user edits on non-regenerated fields
- Smooth transition animations

### Inline Editing
- Click to edit any section
- Save/Cancel buttons
- Real-time updates
- Toast notifications

### Responsive Design
- Mobile-first approach
- Tablet optimizations
- Desktop enhancements
- Touch-friendly interactions

### Performance Optimizations
- Lazy loading components
- Memoized calculations
- Efficient re-renders
- Optimized animations

## 🎭 Animation System

### Particle Background
- 80 animated particles
- Connected network lines
- Neon color palette
- Canvas-based rendering
- Performance optimized

### Text Animations
- Character-by-character typing
- Customizable speed
- Cursor blink effect
- Completion callbacks

### Transition Animations
- Fade-in/out effects
- Slide transitions
- Scale animations
- Stagger delays
- Smooth page changes

## 📱 Responsive Breakpoints

- **Mobile**: < 640px
- **Tablet**: 640px - 1024px
- **Desktop**: > 1024px

All components adapt seamlessly across devices.

## 🎉 Future Enhancements

- [ ] Supabase backend integration
- [ ] User authentication with OAuth
- [ ] Team collaboration features
- [ ] Version history for pitches
- [ ] AI model fine-tuning
- [ ] Custom branding options
- [ ] Analytics dashboard
- [ ] Export to PowerPoint
- [ ] Video pitch generator
- [ ] Investor matching

## 📄 License

This project is a demonstration application built for educational purposes.

## 🙏 Acknowledgments

- **shadcn/ui** for the component library
- **Tailwind CSS** for the styling system
- **Lucide** for the icon set
- **jsPDF** for PDF generation
- **Motion** (Framer Motion) for animations

---

<div align="center">

### ✨ PitchCraft – Empowering Every Idea ✨

Built with ❤️ using React, TypeScript, and Tailwind CSS

</div>
