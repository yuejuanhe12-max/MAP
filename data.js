/** 北师香港浸会大学 · 校园服务数据（名称与手绘地图蓝色标注一致） */

const BNBU = {
  brandBlue: '#1a4b8c',
  brandYellow: '#f5c518',
  brandLightBlue: '#3d7ab8',
};

/**
 * 地图蓝色标注热区（posX/posY 为 campus-map.jpg 原图 5600×4000 上的百分比中心）
 * 坐标由蓝色标签检测 + 引线落点（建筑本体）校准，经 object-fit: contain 映射（见 map-coords.js）
 */
const CAMPUS_LOCATIONS = [
  // —— 主要地标 ——
  { id: 'sports_park', name: '体育公园', posX: 37.9, posY: 25.63, w: 10, h: 7, demoCount: 3 },
  { id: 'arts_hill', name: '艺峯', posX: 76.29, posY: 22.11, w: 6, h: 5, demoCount: 1 },
  { id: 'cultural', name: '文化创意群落', posX: 87.8, posY: 39, w: 9, h: 6, demoCount: 5 },
  { id: 'lrc', name: '学习资源中心', posX: 71.12, posY: 48.93, w: 9, h: 6, demoCount: 7 },
  { id: 'theatre', name: '演艺厅', posX: 85.38, posY: 51.38, w: 5, h: 4, demoCount: 4 },
  { id: 'huitong', name: '会同村', posX: 26.92, posY: 53.14, w: 10, h: 7, demoCount: 2 },
  { id: 'gym', name: '体育馆', posX: 71.4, posY: 66.75, w: 9, h: 6, demoCount: 6 },
  { id: 'university_hall', name: '大学会堂', posX: 82.52, posY: 62.05, w: 6, h: 5, demoCount: 3 },
  { id: 'admin', name: '行政楼', posX: 89.58, posY: 58.09, w: 6, h: 5, demoCount: 5 },
  // —— T 区教学楼 ——
  { id: 't29', name: 'T29', posX: 47.13, posY: 48.34, w: 4.2, h: 3.5, demoCount: 5 },
  { id: 't1', name: 'T1', posX: 71.54, posY: 57.25, w: 4.2, h: 3.5, demoCount: 3 },
  { id: 't2', name: 'T2', posX: 65.59, posY: 58.23, w: 4.2, h: 3.5, demoCount: 2 },
  { id: 't3', name: 'T3', posX: 59.58, posY: 55.79, w: 4.2, h: 3.5, demoCount: 5 },
  { id: 't4', name: 'T4', posX: 74.06, posY: 37.77, w: 4.2, h: 3.5, demoCount: 4 },
  { id: 't5', name: 'T5', posX: 69.58, posY: 39.24, w: 4.2, h: 3.5, demoCount: 6 },
  { id: 't6', name: 'T6', posX: 65.03, posY: 42.57, w: 4.2, h: 3.5, demoCount: 3 },
  { id: 't7', name: 'T7', posX: 59.65, posY: 43.55, w: 4.2, h: 3.5, demoCount: 2 },
  { id: 't8', name: 'T8', posX: 53.71, posY: 44.82, w: 4.2, h: 3.5, demoCount: 4 },
  // —— V 区博雅苑 · 大同村 ——
  { id: 'v15', name: 'V15', posX: 64.83, posY: 25.34, w: 4.2, h: 3.5, demoCount: 2 },
  { id: 'v16', name: 'V16', posX: 70.84, posY: 27.2, w: 4.2, h: 3.5, demoCount: 3 },
  { id: 'v17', name: 'V17', posX: 56.71, posY: 28.96, w: 4.2, h: 3.5, demoCount: 1 },
  { id: 'v18', name: 'V18', posX: 61.82, posY: 32.97, w: 4.2, h: 3.5, demoCount: 4 },
  { id: 'v19', name: 'V19', posX: 51.12, posY: 32.78, w: 4.2, h: 3.5, demoCount: 2 },
  { id: 'v20', name: 'V20', posX: 55.24, posY: 37.09, w: 4.2, h: 3.5, demoCount: 5 },
  { id: 'v21', name: 'V21', posX: 45.45, posY: 37.48, w: 4.2, h: 3.5, demoCount: 3 },
  { id: 'v22', name: 'V22', posX: 50.28, posY: 40.71, w: 4.2, h: 3.5, demoCount: 2 },
  // —— V 区 · 会贤邨（与用户截图中 V25/V26/V28/V29 相对位置一致）——
  { id: 'v23', name: 'V23', posX: 43.38, posY: 43.74, w: 4.2, h: 3.5, demoCount: 6 },
  { id: 'v24', name: 'V24', posX: 38.95, posY: 50.5, w: 4.2, h: 3.5, demoCount: 4 },
  { id: 'v25', name: 'V25', posX: 49.65, posY: 56.08, w: 4.2, h: 3.5, demoCount: 7 },
  { id: 'v26', name: 'V26', posX: 45.66, posY: 59.02, w: 4.5, h: 4, demoCount: 2 },
  { id: 'v27', name: 'V27', posX: 36.64, posY: 64.6, w: 4.2, h: 3.5, demoCount: 3 },
  { id: 'v28', name: 'V28', posX: 54.2, posY: 67.53, w: 5, h: 4, demoCount: 1 },
  { id: 'v29', name: 'V29', posX: 44.34, posY: 66.36, w: 4.2, h: 3.5, demoCount: 4 },
];

/** 主界面红色入口标记（相对原图百分比） */
const HOME_MARKERS = [
  { id: 'v28-east-plaza', name: 'V28 东侧广场', posX: 58.32, posY: 70.13 },
  { id: 'hall-north-plaza', name: '大学会堂北侧广场', posX: 76.57, posY: 56.13 },
];

/** 失物招领初始数据 */
const LOST_ITEMS = [
  {
    id: 'lf-1',
    locationId: 'lrc',
    name: '黑色钱包',
    status: 'lost',
    lostTime: '2026-05-18 14:30',
    contact: 'student@bnbu.edu.hk',
    claimLocation: '学习资源中心',
  },
  {
    id: 'lf-2',
    locationId: 'lrc',
    name: '校园卡',
    status: 'lost',
    lostTime: '2026-05-19 09:15',
    contact: '138****5678',
    claimLocation: '学习资源中心',
  },
  {
    id: 'lf-3',
    locationId: 'gym',
    name: '蓝色雨伞',
    status: 'found',
    lostTime: '2026-05-10 16:00',
    foundTime: '2026-05-12 11:20',
    claimStatus: '已认领',
  },
  {
    id: 'lf-4',
    locationId: 'v25',
    name: '无线耳机',
    status: 'found',
    lostTime: '2026-05-08 12:00',
    foundTime: '2026-05-09 17:45',
    claimStatus: '待认领',
  },
  {
    id: 'lf-5',
    locationId: 'cultural',
    name: 'U盘',
    status: 'lost',
    lostTime: '2026-05-17 11:00',
    contact: 'cultural@bnbu.edu.hk',
    claimLocation: '文化创意群落',
  },
  {
    id: 'lf-6',
    locationId: 'admin',
    name: '身份证',
    status: 'lost',
    lostTime: '2026-05-20 08:30',
    contact: '139****1234',
    claimLocation: '行政楼',
  },
];

/** 学部卡片 */
const FACULTIES = [
  {
    id: 'scc',
    code: 'SCC',
    name: 'School of Culture and Creativity',
    nameEn: '文化与创意学部',
    desc: 'The School of Culture and Creativity aims to emphasize that culture, art, and creativity are integral components of liberal education, with the goal of nurturing intellectually and culturally enriched students. Through comprehensive, creative expression, and interdisciplinary educational approaches, the school enhances students disciplinary knowledge within culture, media, design, and creative industries from philosophical, psychological, cognitive, and creative perspectives, while fostering innovative artistic expressions and creative exploration.',
    clickable: true,
  },
  {
    id: 'fhss',
    code: 'FHSS',
    name: 'Faculty of Humanities and Social Sciences',
    nameEn: '人文与社会科学学部',
    desc: 'The humanities and social sciences research addresses linguistic and cultural issues pertinent to human life. Beyond cultivating professional skills, the college programs delve deeper into the humanistic spirit and societal dynamics, fostering individuals holistic development and enhancing the social quality of communities.',
    clickable: false,
  },
  {
    id: 'fbm',
    code: 'FBM',
    name: 'Faculty of Business and Management',
    nameEn: '工商管理学部',
    desc: 'The School of Business Administration offers comprehensive education in accounting, finance, economics, and management. Through its international curriculum and interactive teaching methods, it equips students with the ability to apply professional knowledge in real-world business settings while fostering bridges between Chinese and global business and management cultures.',
    clickable: false,
  },
  {
    id: 'fst',
    code: 'FST',
    name: 'Faculty of Science and Technology',
    nameEn: '理工科技学部',
    desc: 'The program aims to provide students with comprehensive and in-depth professional knowledge, while emphasizing the holistic development of their social awareness and personal cultivation. It cultivates applied, interdisciplinary professionals with strong management capabilities, enabling students to pursue career development in these fields.',
    clickable: false,
  },
];

/** SCC 师资 */
const SCC_FACULTY = [
  {
    id: 'park-gt',
    name: 'Geuntae PARK',
    title: 'Associate Professor',
    bio: [
      'Geuntae PARK Currently an Associate Professor in Cultural and CreativeManagement. Former architectural curator at the National Museum of Modern andContemporary Art of Korea.',
    ],
    research: ['museum planning and architecture, museummanagement,cultural resource planning and management,and public art/architecture.',],
    email: 'geuntae.park@bnbu.edu.hk',
    photo: 'assets/geuntae_park_photo.png',
    avatar: 'GP',
  },
  {
    id: 'chen-lm',
    name: '李明华',
    title: '教授',
    bio: ['李明华教授，文化与创意学部主任，博士生导师。'],
    research: ['视觉传达设计', '品牌传播策略', '设计教育学'],
    email: 'minghua.chen@bnbu.edu.hk',
    avatar: 'LM',
  },
  {
    id: 'wang-yx',
    name: '王雅欣',
    title: '助理教授',
    bio: ['王雅欣助理教授，专注于新媒体艺术与交互设计教学。'],
    research: ['新媒体艺术', '交互设计', '用户体验研究'],
    email: 'yaxin.wang@bnbu.edu.hk',
    avatar: 'WY',
  },
  {
    id: 'liu-zq',
    name: '刘志强',
    title: '讲师',
    bio: ['刘志强讲师，负责影视制作与纪录片创作课程。'],
    research: ['纪录片创作', '影视叙事', '数字影像技术'],
    email: 'zhiqiang.liu@bnbu.edu.hk',
    avatar: 'LZ',
  },
];

function getLocationById(id) {
  return CAMPUS_LOCATIONS.find((l) => l.id === id);
}
