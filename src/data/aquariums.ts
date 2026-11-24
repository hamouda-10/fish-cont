export type AquariumCategory =
  | 'all'
  | 'home'
  | 'planted'
  | 'desktop'
  | 'marine';

export interface AquariumPackageOption {
  id: 'standard' | 'complete';
  label: string;
  description: string;
  extraPrice: number;
}

export interface AquariumProduct {
  id: string;
  name: string;
  category: Exclude<AquariumCategory, 'all'>;
  categoryLabel: string;
  priceEgp: number;
  dimensionsCm: string;
  volumeLiters: number;
  glassThicknessMm: number;
  glassType: string;
  warranty: string;
  availability: string;
  shortDesc: string;
  fullDesc: string;
  includedItems: string[];
  image?: string;
  isBespokeVisual?: boolean;
  featuredRank: number;
  packages: AquariumPackageOption[];
}

export interface EgyptianGovernorate {
  id: string;
  name: string;
  shippingFee: number;
  deliveryDays: string;
}

export interface ClientReview {
  id: string;
  name: string;
  roleAndCity: string;
  quote: string;
  aquariumBought: string;
}

export const CATEGORY_TABS: { id: AquariumCategory; label: string }[] = [
  { id: 'all', label: 'كل الأحواض' },
  { id: 'home', label: 'أحواض منزلية' },
  { id: 'planted', label: 'أحواض نباتية' },
  { id: 'desktop', label: 'أحواض مكتبية' },
  { id: 'marine', label: 'أحواض بحرية' },
];

export const FREE_SHIPPING_THRESHOLD = 10000;

export const EGYPT_GOVERNORATES: EgyptianGovernorate[] = [
  { id: 'cairo', name: 'القاهرة', shippingFee: 200, deliveryDays: 'خلال ٢٤ لـ ٤٨ ساعة' },
  { id: 'giza', name: 'الجيزة', shippingFee: 200, deliveryDays: 'خلال ٢٤ لـ ٤٨ ساعة' },
  { id: 'alexandria', name: 'الإسكندرية', shippingFee: 350, deliveryDays: 'خلال ٢ لـ ٣ أيام' },
  { id: 'qalyubia', name: 'القليوبية', shippingFee: 250, deliveryDays: 'خلال ٢٤ لـ ٤٨ ساعة' },
  { id: 'sharqia', name: 'الشرقية', shippingFee: 320, deliveryDays: 'خلال ٢ لـ ٣ أيام' },
  { id: 'dakahlia', name: 'الدقهلية (المنصورة)', shippingFee: 350, deliveryDays: 'خلال ٢ لـ ٣ أيام' },
  { id: 'gharbia', name: 'الغربية (طنطا)', shippingFee: 350, deliveryDays: 'خلال ٢ لـ ٣ أيام' },
  { id: 'ismailia', name: 'الإسماعيلية', shippingFee: 350, deliveryDays: 'خلال ٢ لـ ٣ أيام' },
  { id: 'portsaid', name: 'بورسعيد', shippingFee: 380, deliveryDays: 'خلال ٢ لـ ٤ أيام' },
  { id: 'redsea', name: 'البحر الأحمر (الغردقة)', shippingFee: 450, deliveryDays: 'خلال ٣ لـ ٥ أيام' },
  { id: 'assiut', name: 'أسيوط', shippingFee: 420, deliveryDays: 'خلال ٣ لـ ٤ أيام' },
  { id: 'luxor', name: 'الأقصر وأسوان', shippingFee: 480, deliveryDays: 'خلال ٣ لـ ٥ أيام' },
];

export const AQUARIUM_PRODUCTS: AquariumProduct[] = [
  {
    id: 'nile-planted-120',
    name: 'حوض النيل النباتي الفاخر',
    category: 'planted',
    categoryLabel: 'أحواض نباتية',
    priceEgp: 14500,
    dimensionsCm: '١٢٠ × ٤٥ × ٥٠ سم',
    volumeLiters: 270,
    glassThicknessMm: 10,
    glassType: 'زجاج ألترا كلير نقي بدون إطار',
    warranty: 'ضمان سنتين على السيليكون الألماني',
    availability: 'متاح للتسليم الفوري',
    shortDesc: 'حوض مزروع متكامل بإضاءة ليد احترافية وكابينة سوداء مطفي لصالونك أو ريسبشن بيتك.',
    fullDesc:
      'تحفة طبيعية حية بتجمع بين نقاء الزجاج الألماني وتصميم الأحواض النباتية الهادية. الحوض بيجي جاهز بكابينة خشب كونتر مقاوم للرطوبة بلون أسود مطفي، مع إضاءة ليد مخصصة لنمو النباتات الطبيعية وفلتر خارجي صامت تماماً.',
    includedItems: [
      'حوض زجاج ألترا كلير ١٠ مم بزاوية قص ليزر',
      'كابينة خشب مقاوم للرطوبة بلون أسود مطفي',
      'إضاءة ليد معلقة ألومنيوم بطيف كامل للنباتات',
      'فلتر خارجي صامت بقدرة ١٢٠٠ لتر/ساعة وسخان ديجيتال',
    ],
    image: '/src/assets/images/aquarium_planted_nile_1795491162884.jpg',
    featuredRank: 1,
    packages: [
      {
        id: 'standard',
        label: 'الباقة الأساسية',
        description: 'الحوض + الكابينة + الإضاءة + الفلتر الخارجي والسخان',
        extraPrice: 0,
      },
      {
        id: 'complete',
        label: 'باقة التجهيز والزراعة الكاملة',
        description: 'شاملة تربة زراعية وأخشاب طبيعية ونباتات حية وتركيب بالبيت',
        extraPrice: 3800,
      },
    ],
  },
  {
    id: 'zamalek-panoramic-90',
    name: 'حوض الزمالك البانورامي الكامل',
    category: 'home',
    categoryLabel: 'أحواض منزلية',
    priceEgp: 8750,
    dimensionsCm: '٩٠ × ٤٠ × ٤٥ سم',
    volumeLiters: 160,
    glassThicknessMm: 8,
    glassType: 'زجاج كلير شفاف بحواف مشطوفة',
    warranty: 'ضمان سنتين ضد التسريب',
    availability: 'متاح للتسليم الفوري',
    shortDesc: 'مقاس مثالي للشقق العصرية، مثالي لأسماك الديسكس والأنچل مع ستارة هواء هادية.',
    fullDesc:
      'أكتر مقاس مطلوب للبيوت المصرية، بيجمع بين الفخامة والسهولة في الصيانة الأسبوعية. متصمم عشان يديك رؤية بانورامية صافية من غير أي فواصل مزعجة، مع كابينة تخزين سفلية بتخفي كل الأسلاك والفلتر.',
    includedItems: [
      'حوض زجاج كلير ٨ مم بلصق سيليكون شفاف',
      'كابينة رمادي فحمي بمساحة تخزين واسعة',
      'وحدة إضاءة ليد ضد الماء بدرجة لون طبيعية',
      'فلتر بيولوجي + مضخة هواء هادية + سخان أوتوماتيك',
    ],
    image: '/src/assets/images/aquarium_panoramic_living_1795491254626.jpg',
    featuredRank: 2,
    packages: [
      {
        id: 'standard',
        label: 'الباقة الأساسية',
        description: 'الحوض + الكابينة + الإضاءة + الفلتر والسخان',
        extraPrice: 0,
      },
      {
        id: 'complete',
        label: 'باقة الديكور الكامل والتركيب',
        description: 'شاملة صخور سريو طبيعية، جرش أسود ناعم، ونباتات أنوبياس',
        extraPrice: 2400,
      },
    ],
  },
  {
    id: 'crystal-nano-35',
    name: 'حوض الكريستال المكتبي المضيء',
    category: 'desktop',
    categoryLabel: 'أحواض مكتبية',
    priceEgp: 2850,
    dimensionsCm: '٣٥ × ٣٠ × ٣٥ سم',
    volumeLiters: 36,
    glassThicknessMm: 6,
    glassType: 'زجاج ألترا كلير مكعب',
    warranty: 'ضمان سنة شاملة',
    availability: 'متاح للتسليم الفوري',
    shortDesc: 'حوض مكتبي راقي لمكتبك أو غرفة المعيشة بذراع إضاءة أسود أنيق، مثالي لسمكة الفايتر.',
    fullDesc:
      'لو عايز لمسة هدوء وجمال على مكتبك أو في غرفة المذاكرة من غير ما ياخد مساحة، حوض الكريستال المكعب هو الاختيار الأذكى. بيشتغل بصوت هادي جداً ومناسب لأسماك الفايتر والجمبري الملون والنباتات البسيطة.',
    includedItems: [
      'حوض مكعب زجاج ألترا كلير ٦ مم',
      'ذراع إضاءة ليد أسود مطفي بتحكم باللمس',
      'فلتر شلال خلفي هادي وموفر للكهرباء',
      'فرشة فوم عازلة أسفل الحوض',
    ],
    image: '/src/assets/images/aquarium_nano_desk_1795491166459.jpg',
    featuredRank: 3,
    packages: [
      {
        id: 'standard',
        label: 'الباقة الأساسية',
        description: 'الحوض + ذراع الإضاءة + فلتر الشلال',
        extraPrice: 0,
      },
      {
        id: 'complete',
        label: 'باقة الديكور الصخري الكامل',
        description: 'شاملة صخور دراجون ستون وموس أخضر وتربة نباتية',
        extraPrice: 950,
      },
    ],
  },
  {
    id: 'palace-oak-150',
    name: 'حوض القصر بقاعدة خشب زان',
    category: 'home',
    categoryLabel: 'أحواض منزلية',
    priceEgp: 29500,
    dimensionsCm: '١٥٠ × ٥٠ × ٦٠ سم',
    volumeLiters: 450,
    glassThicknessMm: 12,
    glassType: 'زجاج ألترا كلير ١٢ مم مقوّى',
    warranty: 'ضمان ٣ سنين شامل التركيب',
    availability: 'تجهيز خلال ٤ أيام عمل',
    shortDesc: 'حوض عرض ملكي للڤيلات والريسبشن الواسع بقاعدة خشب زان وجوز محفور يدوياً.',
    fullDesc:
      'قطعة أثاث فنية مش مجرد حوض سمك. القاعدة معمولة من خشب زان طبيعي بقشرة جوز مدخن وأبواب مضلّعة فاخرة، شايلة حوض ضخم سعة ٤٥٠ لتر بزجاج ١٢ مم يتحمل أعلى ضغط مياه مع وحدة إضاءة ثنائية وفلترة مزدوجة.',
    includedItems: [
      'حوض زجاج ألترا كلير ١٢ مم بتقفيل يدوي دقيق',
      'كابينة خشب زان طبيعي مضلّع ضد الرطوبة والمياه',
      'وحدتي إضاءة ليد معلقة بطاقة عالية وتحكم تايمر',
      'نظام فلترة خارجي مزدوج + سخانين ديجيتال + شحن وتركيب مجاني',
    ],
    image: '/src/assets/images/aquarium_palace_oak_1795491167781.jpg',
    featuredRank: 4,
    packages: [
      {
        id: 'standard',
        label: 'الباقة الملكية الأساسية',
        description: 'الحوض + كابينة الزان + الإضاءة الثنائية + الفلترة المزدوجة',
        extraPrice: 0,
      },
      {
        id: 'complete',
        label: 'باقة التصميم الطبيعي الكامل',
        description: 'تصميم وتنفيذ ديكور صخري ورملي ونباتات كاملة داخل بيتك',
        extraPrice: 6500,
      },
    ],
  },
  {
    id: 'oasis-compact-60',
    name: 'حوض الواحة الأخضر السريع',
    category: 'planted',
    categoryLabel: 'أحواض نباتية',
    priceEgp: 5400,
    dimensionsCm: '٦٠ × ٣٥ × ٤٠ سم',
    volumeLiters: 84,
    glassThicknessMm: 8,
    glassType: 'زجاج نقي منخفض الحديد',
    warranty: 'ضمان سنتين',
    availability: 'متاح للتسليم الفوري',
    shortDesc: 'بداية مثالية لعالم الأحواض النباتية بمقاس عملي وألوان إضاءة بتبرز جمال السمك والنبات.',
    fullDesc:
      'مقاس ٦٠ سم العالمي المشهور في عالم الأكواسكيب، بيديك مساحة كافية لتنسيق نباتات حمراء وخضراء مع سرب من أسماك التيترا الذهبية، وسعره مناسب جداً سواء كنت مبتدئ أو هاوي محترف.',
    includedItems: [
      'حوض زجاج ٨ مم نقي بدون شرائح علوية',
      'كشاف ليد RGB احترافي بأرجل معدنية متينة',
      'فلتر خارجي ميني صامت بميديا بيولوجية كاملة',
      'سخان زجاجي محمي ١٠٠ وات وميزان حرارة زجاجي',
    ],
    image: '/src/assets/images/aquarium_oasis_compact_1795491255471.jpg',
    featuredRank: 5,
    packages: [
      {
        id: 'standard',
        label: 'الباقة الأساسية',
        description: 'الحوض + كشاف RGB + الفلتر الميني + السخان',
        extraPrice: 0,
      },
      {
        id: 'complete',
        label: 'باقة الزراعة المتكاملة',
        description: 'شاملة تربة أكوا سويل + نباتات خضراء وحمراء + أخشاب طبيعية',
        extraPrice: 1850,
      },
    ],
  },
  {
    id: 'redsea-reef-100',
    name: 'حوض البحر الأحمر للشعاب المرجانية',
    category: 'marine',
    categoryLabel: 'أحواض بحرية',
    priceEgp: 22900,
    dimensionsCm: '١٠٠ × ٥٠ × ٥٥ سم',
    volumeLiters: 275,
    glassThicknessMm: 10,
    glassType: 'زجاج ألترا كلير + صمب سفلي زجاجي',
    warranty: 'ضمان سنتين ومتابعة دورية',
    availability: 'تجهيز خاص خلال ٥ أيام',
    shortDesc: 'منظومة مياه مالحة متكاملة بصمب سفلي وبروتين سكيمر وإضاءة مرجان للشعاب والأسماك البحرية.',
    fullDesc:
      'مخصص لعشاق البحر الأحمر والشعاب المرجانية الحية وأسماك النيمو والتانج. الحوض متجهز بفتحة أوفر فلو صامتة وصمب فلترة سفلي كامل داخل الكابينة مع بروتين سكيمر ومضخة أمواج وإضاءة بحرية مخصصة لنمو المرجان.',
    includedItems: [
      'حوض زجاج ١٠ مم مع نظام أوفر فلو صامت ومواسير PVC',
      'صمب فلترة سفلي ٤ غرف + بروتين سكيمر احترافي',
      'مضخة رفع مياه + مضخة حركة أمواج (Wave Maker)',
      'إضاءة بحرية ذكية بطيف أزرق وأبيض لنمو الشعاب المرجانية',
    ],
    image: '/src/assets/images/aquarium_marine_reef_studio_1795491769313.jpg',
    featuredRank: 6,
    packages: [
      {
        id: 'standard',
        label: 'منظومة المالح الكاملة',
        description: 'الحوض + الكابينة + الصمب + السكيمر + الإضاءة البحرية',
        extraPrice: 0,
      },
      {
        id: 'complete',
        label: 'تجهيز الصخور الحية والملح البحري',
        description: 'شاملة ٢٠ كجم صخر بحري + رمل أراجونيت + ملح بحري وتركيب كامل',
        extraPrice: 5400,
      },
    ],
  },
];

export const CLIENT_REVIEWS: ClientReview[] = [
  {
    id: 'rev-1',
    name: 'م. كريم المنصوري',
    roleAndCity: 'مهندس معماري · التجمع الخامس، القاهرة',
    quote:
      'استلمت حوض النيل ١٢٠ سم بالتركيب في أقل من ٤٨ ساعة. تقفيل السيليكون والزجاج أنضف من المستورد، وصوت الفلتر حرفياً مش مسموع في الريسبشن.',
    aquariumBought: 'حوض النيل النباتي الفاخر',
  },
  {
    id: 'rev-2',
    name: 'د. سارة عبد الرحمن',
    roleAndCity: 'طبيبة أسنان · سموحة، الإسكندرية',
    quote:
      'طلبت حوض الزمالك للعيادة وكنت خايفة من الشحن لإسكندرية، وصل متغلف بشكل احترافي جداً من غير ولا خدش وركّبوه وشغّلوه قدامي.',
    aquariumBought: 'حوض الزمالك البانورامي الكامل',
  },
  {
    id: 'rev-3',
    name: 'أ. محمود الشاذلي',
    roleAndCity: 'صاحب شركة ديكور · الشيخ زايد، الجيزة',
    quote:
      'عملولي حوض تفصيل مقاس مترين للڤيلا بخشب زان مطابق للأثاث. التزام بالمواعيد وأسعار واضحة بالجنيه من غير أي مفاجآت.',
    aquariumBought: 'تجهيز حوض بمقاس خاص',
  },
];

export function formatEgp(amount: number): string {
  return `${amount.toLocaleString('en-US')} ج.م`;
}
