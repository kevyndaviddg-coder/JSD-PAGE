import { CinematicIntro } from "@/components/sections/CinematicIntro";
import { ServicesGrid } from "@/components/sections/ServicesGrid";
import { CapabilitiesCNC } from "@/components/sections/CapabilitiesCNC";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { ProjectsTeaser } from "@/components/sections/ProjectsTeaser";
import { BlogTeaser } from "@/components/sections/BlogTeaser";
import { ContactCTA } from "@/components/sections/ContactCTA";

/**
 * Home — primera experiencia continua + secciones normales.
 *
 * El CinematicIntro reemplaza Hero + StickyVideoBridge + AboutBrief +
 * AboutTimeline (los componentes individuales se mantienen en el repo
 * por si se reutilizan en otras páginas, pero no se importan aquí).
 *
 * Después del CinematicIntro continuamos con secciones normales sobre
 * fondo claro/bone.
 */
export default function HomePage() {
  return (
    <>
      <CinematicIntro />
      <ServicesGrid />
      <CapabilitiesCNC />
      <ProcessTimeline />
      <ProjectsTeaser />
      <BlogTeaser />
      <ContactCTA />
    </>
  );
}
