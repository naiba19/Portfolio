# 🚀 HOW TO USE YOUR PORTFOLIO WEBSITE

**Status**: ✅ Development server is running  
**Access**: http://localhost:4200  
**Dev Server Port**: 4200

---

## 🎯 QUICK START

### Access Your Portfolio Right Now
1. Open your web browser
2. Go to: **http://localhost:4200**
3. You should see your portfolio homepage

### Navigate the Website
- **Home/Hero** - Main landing page (click "NR" logo or "Home")
- **About** - About Me section
- **Skills** - Your technical skills
- **Portfolio** - Your projects (El Pollo Loco, Pokédex)
- **Contact** - Contact form
- **Privacy** - Privacy policy (footer link)

### Language Switching
Click the **"EN"** or **"DE"** button in the header to toggle between English and German

---

## 💻 DEVELOPMENT COMMANDS

### Start Development Server
```bash
cd C:\Users\naiba\Desktop\Portfolio\naiba-portfolio
npm start
```
Or:
```bash
ng serve
```

Access at: http://localhost:4200

### Stop Development Server
```
Press Ctrl+C in the terminal
```

### Build for Production
```bash
npm run build
```
Output: `dist/naiba-portfolio/` (ready to deploy)

### Run Tests
```bash
npm test
```

### Lint Code
```bash
npm run lint
```

---

## 📝 EDITING YOUR CONTENT

### To Change Your Biography
Edit the About component:
**File**: `src/app/components/about/about.component.ts`

Replace:
```html
<p class="placeholder">
  [Biography to be added]
</p>
```

With your actual biography text.

### To Add Your Projects
Edit the Portfolio component:
**File**: `src/app/components/projects/projects.component.ts`

Modify the `projects` array to add/edit projects. Example:
```typescript
projects: Project[] = [
  {
    id: 'project-id',
    name: 'Project Name',
    descriptionDe: 'German description',
    descriptionEn: 'English description',
    technologies: ['Tech1', 'Tech2'],
    github: 'https://github.com/your-repo',
    demo: 'https://demo-url.com'
  }
];
```

### To Add/Edit Skills
Edit the Skills component:
**File**: `src/app/components/skills/skills.component.ts`

Modify the `skillGroups` array:
```typescript
skillGroups: Skill[] = [
  {
    category: 'Frontend',
    skills: ['Angular', 'TypeScript', 'JavaScript', 'HTML5', 'CSS3', 'SCSS']
  },
  // Add more categories as needed
];
```

### To Add Contact Information
Edit the Contact component:
**File**: `src/app/components/contact/contact.component.ts`

Replace:
```html
<p class="info-placeholder">[Contact information to be added]</p>
```

With your actual contact information.

### To Add Privacy Policy
Edit the Privacy component:
**File**: `src/app/pages/privacy/privacy.component.ts`

Replace:
```html
<p class="placeholder">[Privacy Policy to be added]</p>
```

With your actual privacy policy text.

---

## 🎨 CUSTOMIZING COLORS & STYLING

### Change Colors
Edit the global styles:
**File**: `src/styles.scss`

Change CSS variables in the `:root` section:
```scss
:root {
  --color-primary: #1FC5B5;         /* Main teal color */
  --color-primary-dark: #1a9e91;    /* Darker teal */
  --color-background: #FFFAF6;      /* Cream background */
  --color-surface: #F5F0EB;         /* Light gray surface */
  --color-text: #1a1a1a;            /* Dark text */
  --color-text-light: #666666;      /* Light gray text */
  --color-border: #EEEBE5;          /* Border color */
}
```

### Change Typography
Modify font settings in `src/styles.scss`:
```scss
--font-family: 'Overpass', sans-serif;  /* Change font here */
--font-size-base: 16px;                  /* Change base size */
```

### Change Spacing
Modify the spacing grid (8px system):
```scss
--space-xs: 0.5rem;   /* 8px */
--space-sm: 1rem;     /* 16px */
--space-md: 1.5rem;   /* 24px */
--space-lg: 2rem;     /* 32px */
--space-xl: 3rem;     /* 48px */
--space-2xl: 4rem;    /* 64px */
```

---

## 📱 TESTING RESPONSIVE DESIGN

### In Browser DevTools
1. Open DevTools: **F12** or **Ctrl+Shift+I**
2. Toggle Device Toolbar: **Ctrl+Shift+M**
3. Test at different screen sizes:
   - **Mobile**: 320px, 375px, 425px
   - **Tablet**: 768px, 1024px
   - **Desktop**: 1280px+

### Test Devices
- iPhone (360px)
- iPad (768px)
- Desktop (1920px+)

---

## 🌍 DEPLOYMENT PREPARATION

### When Ready to Deploy:

1. **Build Production Version**
   ```bash
   npm run build
   ```

2. **Upload to Hosting**
   - Copy files from `dist/naiba-portfolio/` to your web server
   - Configure your domain (e.g., naiba-radshabov.de)
   - Set up HTTPS/SSL certificate

3. **Configure Backend** (for contact form)
   - Update the contact form to submit to your PHP backend
   - Configure CORS headers
   - Test form submission

4. **Test Live Site**
   - Verify all routes work
   - Test responsive design on real devices
   - Test contact form
   - Verify social media links

---

## 🔧 TROUBLESHOOTING

### Development Server Won't Start
```bash
# Clear node_modules and reinstall
rm -r node_modules
npm install
npm start
```

### Build Fails
```bash
# Clear Angular cache
ng cache clean
npm run build
```

### Styles Not Applying
- Hard refresh browser: **Ctrl+Shift+R**
- Check if SCSS is compiling in the build output
- Verify CSS variables are in `src/styles.scss`

### Language Toggle Not Working
- Check browser console for errors
- Verify `language.service.ts` is imported in components
- Clear localStorage: `localStorage.clear()` in console

---

## 📁 IMPORTANT FILES TO EDIT

| File | Purpose | Edit For |
|------|---------|----------|
| `src/app/components/about/about.component.ts` | About section | Biography |
| `src/app/components/projects/projects.component.ts` | Portfolio section | Projects, links |
| `src/app/components/skills/skills.component.ts` | Skills section | Skills list |
| `src/app/components/contact/contact.component.ts` | Contact section | Contact info |
| `src/pages/privacy/privacy.component.ts` | Privacy policy | Legal text |
| `src/styles.scss` | Global styles | Colors, fonts |
| `src/index.html` | HTML template | Meta tags, title |

---

## 🎯 DEVELOPMENT WORKFLOW

### Typical Development Session
1. Start dev server: `npm start`
2. Open browser: `http://localhost:4200`
3. Edit a component file
4. Browser automatically refreshes with changes
5. Check console for errors
6. Repeat steps 3-5

### Making Changes
- **Edit file** → Browser reloads automatically
- **Add new component** → Can be imported immediately
- **Change styles** → Reflects instantly
- **No rebuild needed** during development (only for production)

---

## 🚨 IMPORTANT REMINDERS

- ✅ Your audit documents are preserved in the parent folder
- ✅ Development server runs independently
- ✅ No need to initialize Git (skip that)
- ✅ No need to push to GitHub yet
- ✅ Add your own content before deploying
- ✅ Test everything before going live

---

## 📞 NEXT STEPS

1. **Access your site**: http://localhost:4200
2. **Personalize content** using guides above
3. **Test responsiveness** using DevTools
4. **Add your biography** and photos
5. **Configure contact form** backend
6. **Deploy to production** when ready

---

**Your portfolio is ready to customize and deploy!** 🎉

Start by opening http://localhost:4200 in your browser and exploring your new website.
