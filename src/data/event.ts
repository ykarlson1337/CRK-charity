// Single source for event facts, prices, packages, contacts and history.
// Prices appear on the home page, the sponsor page and in the booking form,
// so they must only be edited here.
//
// Copy in [square brackets] is a placeholder waiting for a decision from
// the club (see docs/README.md). Production builds fail while any remain.

export const flags = {
  /** Set to true when the title sponsorship is sold. Shows "Præsenteret af". */
  titelsponsorSolgt: false,
  /** Set to true when the 2027 beneficiary has been announced. */
  formaalAnnonceret: false,
};

export const event = {
  name: 'Charlottenlund Rotary Charity Golf',
  shortName: 'Charity Golf',
  club: 'Charlottenlund Rotary Klub',
  year: 2027,
  dateIso: '2027-06-25',
  dateLabel: 'Fredag 25. juni 2027',
  dateLabelLower: 'fredag 25. juni 2027',
  dateShort: '25. juni 2027',
  venue: 'Smørum Golfklub',
  dinnerVenue: 'Restaurant Kongemosen',
  deadlineLabel: '1. april 2027',
  titleSponsor: '[Firma]',
  beneficiary: '[modtager]',
  beneficiaryAnnounceDate: '[dato]',
  vatNote: 'Alle priser er [inkl./ekskl.] moms.',
  replyDays: '[antal]',
  clubAddress: '[Adresse]',
  clubCvr: '[CVR]',
  clubEmail: '[Fælles e-mail]',
  prospectUrl: '/charity-golf-2027-sponsorprospekt.pdf',
};

export function formatKr(amount: number): string {
  return `${amount.toLocaleString('da-DK')} kr.`;
}

export type Contact = { name: string; phone: string };

export const contacts: Contact[] = [
  { name: 'Mads Vibe-Hastrup', phone: '53 71 62 66' },
  { name: 'Nicolai Karhof', phone: '20 37 60 23' },
  { name: 'Keld Østergaard Christensen', phone: '50 70 80 74' },
  { name: 'Lasse Jensen', phone: '23 60 96 88' },
];

export function telHref(phone: string): string {
  return `tel:+45${phone.replace(/\s+/g, '')}`;
}

export type PackageTier = 'title' | 'partner' | 'hole' | 'team' | 'par3';

export type Package = {
  id: PackageTier;
  name: string;
  price: number;
  badge: string;
  featured?: boolean;
  /** Short bullet points used on the home page cards. */
  points: string[];
  /** Line under the price on the sponsor page. */
  tagline: string;
  /** Full list of what the package includes (sponsor page). */
  details: string[];
  /** One-line summary for the mobile overview on the sponsor page. */
  overview: string;
  /** Panel colour on the sponsor page (darker = more visibility). */
  panel: 'forest-950' | 'forest-900' | 'forest-800' | 'forest-700';
  cta: string;
};

export const packages: Record<PackageTier, Package> = {
  title: {
    id: 'title',
    name: 'Titelsponsor',
    price: 50000,
    badge: 'Kun én',
    featured: true,
    points: [
      'Jeres navn i titlen: [Firma] Charity Golf 2027',
      'Logo på hjemmeside, scorekort, borde og scene',
      'Flag, skilte og produkter på banen',
      '1 hold à 4 inkl. gallamiddag',
    ],
    tagline: 'Hele dagen bærer jeres navn. Der er kun én.',
    details: [
      'Firmanavnet som titel: [Firma] Charity Golf 2027',
      'Logo på hjemmesiden og på scorekortet',
      'Logo på bordene og scenen ved gallamiddagen',
      'Flag og skilte på banen samt fremvisning af produkter',
      '1 hold à 4 personer inkl. gallamiddag, værdi 11.000 kr.',
    ],
    overview: 'Navn i titlen. Logo på web, scorekort, borde og scene. Flag, skilte og produkter på banen. 1 hold à 4.',
    panel: 'forest-950',
    cta: 'Vælg titelsponsor',
  },
  partner: {
    id: 'partner',
    name: 'Partnersponsor',
    price: 25000,
    badge: 'Stærk synlighed',
    points: [
      'Logo på hjemmesiden og ved scenen',
      'Logo eller flag på 3 huller',
      '1 hold à 4 inkl. gallamiddag',
    ],
    tagline: 'Synlige på banen og ved middagen.',
    details: [
      'Logo på hjemmesiden',
      'Logo ved scenen under gallamiddagen',
      'Logo eller flag på 3 huller på banen',
      '1 hold à 4 personer inkl. gallamiddag, værdi 11.000 kr.',
    ],
    overview: 'Logo på web og ved scenen. Logo eller flag på 3 huller. 1 hold à 4.',
    panel: 'forest-900',
    cta: 'Vælg partnersponsor',
  },
  hole: {
    id: 'hole',
    name: 'Hulsponsor',
    price: 21000,
    badge: 'På banen',
    points: ['Flag eller logo på ét hul, som alle hold passerer', '1 hold à 4 inkl. gallamiddag'],
    tagline: 'Jeres logo der, hvor spillerne står.',
    details: [
      'Flag eller logo på ét hul på banen',
      'Synlig for alle hold, der passerer hullet',
      '1 hold à 4 personer inkl. gallamiddag, værdi 11.000 kr.',
    ],
    overview: 'Logo eller flag på 1 hul. 1 hold à 4.',
    panel: 'forest-800',
    cta: 'Vælg hulsponsor',
  },
  team: {
    id: 'team',
    name: 'Holdsponsor',
    price: 11000,
    badge: 'Golf og galla',
    points: ['1 hold à 4 på 18 huller', 'Morgenmad, frokost og præmier', 'Gallamiddag for 4'],
    tagline: 'Hele dagen for fire, fra første tee til gallamiddagen.',
    details: [
      '1 hold à 4 personer på 18-hullersbanen',
      'Morgenmad, frokost og forplejning på banen',
      'Præmier til de bedste hold',
      'Gallamiddag for 4 med velkomstdrink og tre retter',
    ],
    overview: '1 hold à 4 på 18 huller.',
    panel: 'forest-700',
    cta: 'Vælg holdsponsor',
  },
  par3: {
    id: 'par3',
    name: 'Par 3-pakke',
    price: 8000,
    badge: 'Nybegyndere',
    points: ['4 pladser i par 3-turneringen', 'Undervisning af professionelle trænere', 'Gallamiddag for 4'],
    tagline: 'For fire nybegyndere: golf om dagen, galla om aftenen.',
    details: [
      '4 pladser i par 3-turneringen',
      'Introundervisning med professionelle trænere',
      'Morgenmad kl. 08:00, start kl. 09:00',
      'Gallamiddag for 4 med velkomstdrink og tre retter',
    ],
    overview: '4 pladser på par 3 med undervisning.',
    panel: 'forest-700',
    cta: 'Vælg par 3-pakke',
  },
};

/** Home page rows. */
export const playPackages: Package[] = [packages.team, packages.par3];
export const visibilityPackages: Package[] = [packages.title, packages.partner, packages.hole];
/** Sponsor page order (most visibility first). */
export const allPackages: Package[] = [packages.title, packages.partner, packages.hole, packages.team, packages.par3];

export const singlePrices = [
  { label: 'Hold uden gallamiddag', price: 8000, unit: '' },
  { label: 'Par 3 pr. person', price: 1250, unit: '' },
  { label: 'Gallamiddag pr. person', price: 750, unit: 'ekskl. drikkevarer' },
];

/** Options for the booking form, in the order shown in the dropdown.
 *  `value` matches the data-package attribute on package buttons. */
export const bookingOptions: { value: string; label: string }[] = [
  ...allPackages.map((p) => ({ value: p.id, label: `${p.name} · ${formatKr(p.price)}` })),
  { value: 'team-no-dinner', label: `Hold uden gallamiddag · ${formatKr(8000)}` },
  { value: 'par3-seat', label: `Par 3-plads · ${formatKr(1250)}` },
  { value: 'dinner', label: `Gallamiddag · ${formatKr(750)}` },
  { value: 'auction', label: 'Auktionsdonation' },
  { value: 'other', label: 'Andet' },
];

export const program = [
  { time: '08:00', title: 'Morgenmad', text: 'Velkomst og registrering på Smørum Golfklub' },
  { time: '09:00', title: 'Start', text: 'Holdturnering på 18 huller. Par 3 med introtræning.' },
  { time: '14:00', title: 'Frokost', text: 'Frokost og forplejning undervejs' },
  { time: '18:00', title: 'Gallamiddag', text: 'Velkomstdrink og tre retter på Restaurant Kongemosen' },
  { time: 'Aften', title: 'Auktion', text: 'Musik, underholdning og auktion til fordel for det gode formål' },
];

export type HistoryYear = {
  year: number;
  venue: string;
  teams: string;
  raised: string;
  beneficiary: string;
  photo?: boolean;
};

/** Newest first. */
export const history: HistoryYear[] = [
  {
    year: 2027,
    venue: 'Smørum Golfklub, fredag 25. juni',
    teams: '[antal] hold',
    raised: '',
    beneficiary: 'Modtager offentliggøres [dato]',
  },
  {
    year: 2026,
    venue: 'Hornbæk Golfklub, 18. maj',
    teams: '20 hold, udsolgt',
    raised: '[beløb]',
    beneficiary: '[modtager]',
  },
  {
    year: 2025,
    venue: 'Hornbæk Golfklub',
    teams: '22 hold, udsolgt',
    raised: formatKr(191311),
    beneficiary: 'Legeheltene/Børneulykkesfonden',
    photo: true,
  },
  {
    year: 2024,
    venue: 'Roskilde Golfklub',
    teams: '18 hold, udsolgt',
    raised: formatKr(25000),
    beneficiary: 'Røde Kors',
  },
];

export const totals = {
  /** 2024 + 2025. Add the 2026 amount when it is known. */
  donatedKr: 216311,
  players: 240,
  teams: 60,
};

export const handoverCaption =
  '13. maj 2026: 191.311 kr. overrakt til Legeheltene/Børneulykkesfonden. Fra venstre: Thomas Friisnæs, Nicolai Karhof, Henriette Madsen og Henrik Knakkergaard.';

export const faq = [
  {
    q: 'Skal man have et handicap for at spille med?',
    a: 'I holdturneringen skal alle have gyldigt DGU-kort, og der spilles med fuldt handicap. I par 3-turneringen kan alle være med, og I får undervisning før start. [Bekræft at par 3 ikke kræver DGU-kort.]',
  },
  {
    q: 'Hvordan spilles holdturneringen?',
    a: 'Hold på fire spiller bedst bold: de tre bedste stableford-scorer på hvert hul tæller. Alle hold starter samtidig kl. 09:00 fra hvert sit hul. [Bekræft format og starttid for 2027.]',
  },
  {
    q: 'Hvad er med i prisen?',
    a: 'Golfpladserne inkluderer morgenmad, frokost, forplejning på banen og præmier. Gallamiddagen inkluderer velkomstdrink og tre retter, men ikke drikkevarer.',
  },
  { q: 'Kan vi være med, hvis vi ikke er fire?', a: '[Afklares: kan enkeltspillere sættes sammen til hold?]' },
  { q: 'Kan man komme til gallamiddagen uden at spille golf?', a: '[Afklares.]' },
  { q: 'Hvordan betaler vi?', a: '[Afklares: faktura fra Charlottenlund Rotary Klub, betalingsfrist og moms.]' },
  { q: 'Hvad hvis vi må melde afbud?', a: '[Afklares.]' },
  { q: 'Er der dresscode til gallamiddagen?', a: '[Afklares.]' },
];

/** Main navigation. Hash links point at sections on the home page. */
export const nav = [
  { label: 'Program', href: '/#program' },
  { label: 'Priser', href: '/#priser' },
  { label: 'Sponsorer', href: '/sponsor' },
  { label: 'Formålet', href: '/#formaal' },
  { label: 'Praktisk', href: '/praktisk' },
  { label: 'Kontakt', href: '/#kontakt' },
];
