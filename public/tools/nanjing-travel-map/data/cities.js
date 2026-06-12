/* ============================================================
   南京出发旅游目的地数据：演示版，非实时
   口径：从南京市区出发，含到站/机场、候车候机、落地接驳。
   ============================================================ */

const CITY_DATA = (() => {
  const NJ = {
    toRail: 35,
    railBuf: 25,
    toAir: 55,
    airBuf: 90,
  };

  const railD2D = (veh, arr, dep = NJ.toRail) => dep + NJ.railBuf + veh + arr;
  const flyD2D = (veh, arr, dep = NJ.toAir + NJ.airBuf) => dep + veh + arr;
  const driveD2D = v => v + (v > 240 ? Math.floor(v / 120) * 15 : 0);

  const home = { name: "南京", coord: [118.7969, 32.0603] };

  const cities = [
    {
      id: "niushoushan", minK: 1.5, name: "牛首山", emoji: "🛕", sub: "佛顶宫与金陵南郊", coord: [118.72, 31.91], label: { dx: -12, dy: 18, anchor: "end" },
      hook: "南京市内半日游天花板",
      tagline: "不用出南京，就能看到金色穹顶、地下宫殿和一整套仪式感拉满的佛顶宫。",
      transport: {
        rail: null,
        fly: null,
        drive: { title: "南京市区→牛首山", breakdown: "市区出发，打车或自驾约40分钟；公共交通约1小时以上", veh: 40 },
      },
      recommend: { mode: "drive", reason: "牛首山在南京南郊，直接打车/自驾最省心；如果只做半日游，不需要折腾高铁和飞机。" },
      spots: [
        { emoji: "🏛", name: "佛顶宫" }, { emoji: "🛕", name: "佛顶塔" },
        { emoji: "🌲", name: "牛首山文化旅游区" }, { emoji: "📷", name: "地下宫殿穹顶" },
      ],
      itinerary: [
        { day: "DAY 1", route: ["南京市区", "牛首山西门", "佛顶宫", "佛顶塔", "返程"], note: "下午光线更柔，佛顶宫内部很适合拍对称构图。" },
      ],
      tips: "景区比较大，穿舒服鞋；节假日建议上午早点进。",
    },
    {
      id: "yangzhou", minK: 1.4, name: "扬州瘦西湖", emoji: "🌿", sub: "烟花三月下扬州", coord: [119.43, 32.40], label: { dx: 14, dy: -8, anchor: "start" },
      hook: "从南京出发最舒服的周末水城",
      tagline: "早上从南京出发，中午吃早茶，下午在瘦西湖二十四桥边慢慢走。",
      transport: {
        rail: { title: "南京→扬州东/扬州站", breakdown: "市区→南京站/南京南约35分 + 候车25分 + 城际约50分 + 到瘦西湖约25分", price: "二等座约¥35-55", veh: 50, arr: 25 },
        fly: null,
        drive: { title: "沪陕高速/宁扬快速", breakdown: "约105km，自驾约1小时30分，适合带家人慢游", veh: 90 },
      },
      recommend: { mode: "rail", reason: "南京到扬州城际密度高，到站后打车去瘦西湖很顺；周末不想找停车位就坐火车。" },
      spots: [
        { emoji: "🌉", name: "瘦西湖·二十四桥" }, { emoji: "🏯", name: "大明寺" },
        { emoji: "🍵", name: "趣园早茶" }, { emoji: "🏮", name: "东关街" },
      ],
      itinerary: [
        { day: "DAY 1", route: ["趣园早茶", "瘦西湖", "大明寺", "东关街", "返南京"], note: "早茶尽量提前排队，瘦西湖春天最美。" },
      ],
      tips: "烟花三月人多，错峰去体验会好很多。",
    },
    {
      id: "suzhou_gardens", name: "苏州园林", emoji: "🪷", sub: "园林、评弹与平江路", coord: [120.62, 31.30], label: { dx: 16, dy: 0, anchor: "start" },
      hook: "一日看园林，两日听评弹",
      tagline: "南京出发去苏州，不是去一个城市，是去一组园林、巷子和水边茶馆。",
      transport: {
        rail: { title: "南京南→苏州", breakdown: "市区→南京南35分 + 候车25分 + 高铁约1小时20分 + 苏州站→拙政园约20分", price: "二等座约¥100-140", veh: 80, arr: 20 },
        fly: null,
        drive: { title: "沪蓉/京沪高速", breakdown: "约220km，自驾约2小时50分，古城区停车不轻松", veh: 170 },
      },
      recommend: { mode: "rail", reason: "高铁到苏州站后离古城很近，园林、平江路、苏博都能地铁/步行串起来。" },
      spots: [
        { emoji: "🏞", name: "拙政园" }, { emoji: "🏛", name: "苏州博物馆" },
        { emoji: "🏮", name: "平江路" }, { emoji: "🌉", name: "山塘街" },
      ],
      itinerary: [
        { day: "DAY 1", route: ["苏州博物馆", "拙政园", "平江路", "评弹茶馆"], note: "苏博和拙政园建议提前预约。" },
        { day: "DAY 2", route: ["虎丘", "山塘街", "金鸡湖", "返程"], note: "周末两天刚好，不建议自驾进古城。" },
      ],
      tips: "园林旺季人多，早上第一批入园体验最好。",
    },
    {
      id: "huangshan", name: "黄山", emoji: "🏔", sub: "云海日出与徽州古村", coord: [118.17, 30.13], label: { dx: -12, dy: 18, anchor: "end" },
      hook: "南京出发的小长假王牌",
      tagline: "高铁南下到黄山北，再换车进汤口，第二天清晨就能在山顶等云海。",
      transport: {
        rail: { title: "南京南→黄山北", breakdown: "市区→南京南35分 + 候车25分 + 高铁约2小时40分 + 黄山北→汤口约60分", price: "二等座约¥180-230", veh: 160, arr: 60 },
        fly: null,
        drive: { title: "宁宣杭/京台高速", breakdown: "到汤口约330km，自驾约4小时20分", veh: 260 },
      },
      recommend: { mode: "rail", reason: "爬山前后体力消耗大，高铁比自驾更稳；黄山北到景区接驳成熟。" },
      spots: [
        { emoji: "⛰", name: "黄山风景区" }, { emoji: "🌅", name: "光明顶日出" },
        { emoji: "🏘", name: "宏村" }, { emoji: "🏮", name: "屯溪老街" },
      ],
      itinerary: [
        { day: "DAY 1", route: ["南京南", "黄山北", "汤口", "云谷索道上山", "宿山顶"], note: "山顶住宿要提前订。" },
        { day: "DAY 2", route: ["日出", "迎客松", "下山", "宏村"], note: "体力够再加西递或屯溪老街。" },
      ],
      tips: "雨后初晴最容易出云海；山上温差大。",
    },
    {
      id: "jingdezhen", name: "景德镇", emoji: "🏺", sub: "陶溪川与瓷器宇宙", coord: [117.18, 29.27],
      hook: "把周末过成一只杯子",
      tagline: "逛窑厂、做陶艺、淘瓷器，南京出发的小众文艺周末很适合它。",
      transport: {
        rail: { title: "南京南→景德镇北", breakdown: "市区→南京南35分 + 候车25分 + 高铁约3小时20分 + 到陶溪川约20分", price: "二等座约¥230-300", veh: 200, arr: 20 },
        fly: null,
        drive: { title: "约430km", breakdown: "自驾约5小时20分，适合顺路婺源/三清山", veh: 320 },
      },
      recommend: { mode: "rail", reason: "景德镇北站到市区近，高铁落地直接去陶溪川；买瓷器太多再考虑自驾。" },
      spots: [
        { emoji: "🏺", name: "陶溪川" }, { emoji: "🔥", name: "御窑博物馆" },
        { emoji: "🧱", name: "丙丁柴窑" }, { emoji: "🛍", name: "乐天市集" },
      ],
      itinerary: [
        { day: "DAY 1", route: ["陶溪川", "御窑博物馆", "夜市淘瓷"], note: "御窑博物馆傍晚光线最好。" },
        { day: "DAY 2", route: ["三宝村", "丙丁柴窑", "陶艺体验", "返程"], note: "手作体验最好提前约。" },
      ],
      tips: "周末市集很热闹，易碎品别冲动买太多。",
    },
    {
      id: "putuoshan", name: "普陀山", emoji: "🌊", sub: "海天佛国", coord: [122.39, 29.98],
      hook: "从南京去海边拜一座山",
      tagline: "高铁到宁波/舟山方向再转船，海风、寺庙和岛上的慢时间都在路尽头。",
      transport: {
        rail: { title: "南京南→宁波+大巴/船", breakdown: "南京南→宁波约2小时20分 + 宁波→朱家尖码头约2小时 + 船约15分", price: "高铁约¥170-230", veh: 140, arr: 150 },
        fly: { title: "飞舟山普陀山机场", breakdown: "南京市区→机场55分 + 值机90分 + 飞行约1小时10分 + 机场→码头约15分 + 船约15分", price: "机票浮动", veh: 70, arr: 35 },
        drive: { title: "自驾到朱家尖码头", breakdown: "约520km，自驾约6小时；上岛仍需坐船", veh: 360 },
      },
      recommend: { mode: "fly", reason: "如果航班时间合适，飞舟山最省时间；高铁转车更稳但更折腾。" },
      spots: [
        { emoji: "🛕", name: "普济寺" }, { emoji: "🌊", name: "南海观音" },
        { emoji: "⛰", name: "佛顶山" }, { emoji: "🏖", name: "百步沙" },
      ],
      itinerary: [
        { day: "DAY 1", route: ["朱家尖码头", "普济寺", "南海观音", "百步沙"], note: "岛上交通靠步行和景交。" },
        { day: "DAY 2", route: ["佛顶山", "法雨寺", "返程"], note: "清晨的寺庙最安静。" },
      ],
      tips: "节假日船票和住宿都要提前订。",
    },
    {
      id: "taishan", name: "泰山", emoji: "🌄", sub: "五岳独尊", coord: [117.10, 36.25],
      hook: "夜爬看日出",
      tagline: "从南京北上，晚上爬十八盘，清晨在玉皇顶等第一缕光。",
      transport: {
        rail: { title: "南京南→泰安", breakdown: "市区→南京南35分 + 候车25分 + 高铁约2小时10分 + 泰安站→红门约35分", price: "二等座约¥210", veh: 130, arr: 35 },
        fly: null,
        drive: { title: "约540km", breakdown: "自驾约6小时30分", veh: 390 },
      },
      recommend: { mode: "rail", reason: "高铁到泰安很直接，爬完山腿软，坐高铁回南京比开车安全。" },
      spots: [
        { emoji: "⛰", name: "红门登山线" }, { emoji: "🌄", name: "玉皇顶日出" },
        { emoji: "🪨", name: "十八盘" }, { emoji: "🛕", name: "岱庙" },
      ],
      itinerary: [
        { day: "DAY 1", route: ["南京南", "泰安", "岱庙", "夜爬泰山"], note: "夜爬带头灯和外套。" },
        { day: "DAY 2", route: ["玉皇顶日出", "南天门", "下山", "返程"], note: "天气决定体验，出发前看云量。" },
      ],
      tips: "山顶风大，租军大衣是仪式感也是刚需。",
    },
    {
      id: "zhangjiajie", name: "张家界", emoji: "🪨", sub: "峰林、天门山与玻璃栈道", coord: [110.48, 29.12],
      hook: "阿凡达同款峰林",
      tagline: "南京出发更适合飞机，落地后把天门山和武陵源拆成两天玩。",
      transport: {
        rail: { title: "高铁/动车多次换乘", breakdown: "需经长沙等地换乘，总耗时通常8小时以上", price: "浮动", veh: 480, arr: 40 },
        fly: { title: "南京→张家界荷花机场", breakdown: "市区→禄口机场55分 + 值机90分 + 飞行约1小时50分 + 机场→市区约20分", price: "机票浮动", veh: 110, arr: 20 },
        drive: { title: "约1000km", breakdown: "自驾约12小时，适合长线湘西环线", veh: 720 },
      },
      recommend: { mode: "fly", reason: "距离已经进入飞机优势区，飞过去当天还能看一场《魅力湘西》。" },
      spots: [
        { emoji: "⛰", name: "天门山" }, { emoji: "🌲", name: "张家界国家森林公园" },
        { emoji: "🌉", name: "玻璃栈道" }, { emoji: "🛗", name: "百龙天梯" },
      ],
      itinerary: [
        { day: "DAY 1", route: ["抵达张家界", "天门山", "玻璃栈道", "市区夜宵"], note: "天门山索道票提前订。" },
        { day: "DAY 2", route: ["武陵源", "袁家界", "百龙天梯", "金鞭溪"], note: "景区很大，别贪多。" },
      ],
      tips: "雨后峰林有雾气，反而更像电影场景。",
    },
    {
      id: "zhenjiang", minK: 1.3, name: "镇江金山", emoji: "🏯", sub: "金山寺、焦山与锅盖面", coord: [119.45, 32.20], label: { dx: 14, dy: 4, anchor: "start" },
      hook: "从南京半小时到江边古寺",
      tagline: "一碗锅盖面，一座金山寺，再沿着长江边慢慢走，半天也能像出了一趟远门。",
      transport: {
        rail: { title: "南京→镇江", breakdown: "市区→南京站约30分 + 候车25分 + 城际约25分 + 镇江站→金山约15分", price: "二等座约¥25-40", veh: 25, arr: 15 },
        fly: null,
        drive: { title: "沪蓉高速/312国道", breakdown: "约80km，自驾约1小时10分", veh: 70 },
      },
      recommend: { mode: "rail", reason: "城际班次密，镇江站离景点近；不想开车也能轻松一日往返。" },
      spots: [
        { emoji: "🏯", name: "金山寺" }, { emoji: "🌊", name: "焦山" },
        { emoji: "⛰", name: "北固山" }, { emoji: "🍜", name: "锅盖面" },
      ],
      itinerary: [
        { day: "DAY 1", route: ["南京站", "镇江站", "金山寺", "锅盖面午餐", "焦山", "西津渡"], note: "西津渡傍晚灯亮后更有味道。" },
      ],
      tips: "镇江醋可以买小瓶装，别背太重。",
    },
    {
      id: "wuxi", minK: 1.4, name: "无锡鼋头渚", emoji: "🌸", sub: "太湖樱花与灵山大佛", coord: [120.22, 31.49], label: { dx: 16, dy: -12, anchor: "start" },
      hook: "春天看樱花，平时看太湖",
      tagline: "南京到无锡很顺，适合把太湖、鼋头渚和一碗小笼一起塞进周末。",
      transport: {
        rail: { title: "南京南→无锡", breakdown: "市区→南京南35分 + 候车25分 + 高铁约55分 + 无锡站→鼋头渚约35分", price: "二等座约¥70-100", veh: 55, arr: 35 },
        fly: null,
        drive: { title: "沪蓉高速", breakdown: "约180km，自驾约2小时20分", veh: 140 },
      },
      recommend: { mode: "rail", reason: "高铁快且稳定；鼋头渚旺季停车压力大，落地打车更省心。" },
      spots: [
        { emoji: "🌸", name: "鼋头渚" }, { emoji: "🌊", name: "太湖" },
        { emoji: "🛕", name: "灵山大佛" }, { emoji: "🥟", name: "无锡小笼" },
      ],
      itinerary: [
        { day: "DAY 1", route: ["无锡站", "鼋头渚", "太湖游船", "南长街夜景"], note: "樱花季一定提前预约入园。" },
        { day: "DAY 2", route: ["灵山大佛", "拈花湾", "返南京"], note: "拈花湾夜景适合住一晚。" },
      ],
      tips: "无锡口味偏甜，小笼和酱排骨是本地特色。",
    },
    {
      id: "changzhou", minK: 1.5, name: "常州天目湖", emoji: "🎢", sub: "恐龙园与山水温泉", coord: [119.97, 31.78], label: { dx: 14, dy: 14, anchor: "start" },
      hook: "亲子和温泉都能打",
      tagline: "想热闹就去恐龙园，想放空就去溧阳天目湖，常州很适合轻松周末。",
      transport: {
        rail: { title: "南京南→常州/溧阳", breakdown: "市区→南京南35分 + 候车25分 + 高铁约45-60分 + 到景区约25-40分", price: "二等座约¥55-90", veh: 55, arr: 35 },
        fly: null,
        drive: { title: "沪蓉高速/长深高速", breakdown: "到常州市区约1小时50分，到天目湖约2小时", veh: 120 },
      },
      recommend: { mode: "drive", reason: "如果去天目湖和南山竹海，自驾串点更自由；只去恐龙园坐高铁也很方便。" },
      spots: [
        { emoji: "🦖", name: "中华恐龙园" }, { emoji: "🌊", name: "天目湖" },
        { emoji: "🎋", name: "南山竹海" }, { emoji: "♨️", name: "御水温泉" },
      ],
      itinerary: [
        { day: "DAY 1", route: ["南京", "天目湖", "鱼头汤", "御水温泉"], note: "天目湖砂锅鱼头适合多人分食。" },
        { day: "DAY 2", route: ["南山竹海", "返南京"], note: "亲子玩法可替换成恐龙园一整天。" },
      ],
      tips: "温泉酒店周末价格波动大，提前订更划算。",
    },
    {
      id: "shanghai", name: "上海外滩", emoji: "🌃", sub: "外滩、武康路与迪士尼", coord: [121.47, 31.23], label: { dx: 16, dy: 0, anchor: "start" },
      hook: "看展、演出、迪士尼一把抓",
      tagline: "从南京坐高铁去上海，是最像打开任意门的周末选择。",
      transport: {
        rail: { title: "南京南→上海虹桥", breakdown: "市区→南京南35分 + 候车25分 + 高铁约1小时10分 + 虹桥→市中心约35分", price: "二等座约¥130-170", veh: 70, arr: 35 },
        fly: null,
        drive: { title: "沪蓉/京沪高速", breakdown: "约300km，自驾约4小时，市区停车贵", veh: 240 },
      },
      recommend: { mode: "rail", reason: "高铁班次密，虹桥进城方便；上海市区限行和停车都不适合周末放松。" },
      spots: [
        { emoji: "🌃", name: "外滩" }, { emoji: "🌳", name: "武康路" },
        { emoji: "🏰", name: "迪士尼" }, { emoji: "🖼", name: "西岸美术馆群" },
      ],
      itinerary: [
        { day: "DAY 1", route: ["虹桥", "武康路", "安福路", "外滩夜景"], note: "傍晚到外滩能看日落和亮灯。" },
        { day: "DAY 2", route: ["迪士尼或美术馆", "返南京"], note: "看展版和乐园版不要塞在同一天。" },
      ],
      tips: "住静安寺/徐家汇，地铁换乘最舒服。",
    },
    {
      id: "hangzhou", name: "杭州西湖", emoji: "🪷", sub: "西湖、灵隐与龙井", coord: [120.16, 30.25], label: { dx: 14, dy: 12, anchor: "start" },
      hook: "湖山一日，茶田半日",
      tagline: "南京到杭州不算远，西湖、灵隐、龙井村刚好拼成一个经典周末。",
      transport: {
        rail: { title: "南京南→杭州东", breakdown: "市区→南京南35分 + 候车25分 + 高铁约1小时35分 + 杭州东→西湖约35分", price: "二等座约¥120-180", veh: 95, arr: 35 },
        fly: null,
        drive: { title: "长深高速", breakdown: "约280km，自驾约3小时40分", veh: 220 },
      },
      recommend: { mode: "rail", reason: "杭州景区停车难，高铁落地转地铁/打车更轻松。" },
      spots: [
        { emoji: "🪷", name: "西湖" }, { emoji: "🛕", name: "灵隐寺" },
        { emoji: "🍵", name: "龙井村" }, { emoji: "🌉", name: "断桥" },
      ],
      itinerary: [
        { day: "DAY 1", route: ["杭州东", "西湖环线", "湖滨夜景"], note: "西湖不建议赶景点，慢慢走更好。" },
        { day: "DAY 2", route: ["灵隐寺", "龙井村喝茶", "返南京"], note: "灵隐早上去人少。" },
      ],
      tips: "春秋两季最舒服，节假日西湖人流很大。",
    },
    {
      id: "wuzhen", name: "乌镇西栅", emoji: "🚣", sub: "夜游水乡", coord: [120.49, 30.74], label: { dx: 14, dy: -8, anchor: "start" },
      hook: "住进西栅，等游客散场",
      tagline: "乌镇的精华在夜里，亮灯后的水巷比白天更像一场梦。",
      transport: {
        rail: { title: "南京南→桐乡/嘉兴+接驳", breakdown: "高铁约2小时 + 站点到乌镇约40分；加上市内与候车约3小时40分", price: "二等座约¥150-220", veh: 120, arr: 40 },
        fly: null,
        drive: { title: "宁杭/申嘉湖高速", breakdown: "约300km，自驾约3小时50分", veh: 230 },
      },
      recommend: { mode: "drive", reason: "乌镇到高铁站还有接驳，自驾门到门更稳；住西栅带行李也方便。" },
      spots: [
        { emoji: "🌉", name: "西栅" }, { emoji: "🏘", name: "东栅" },
        { emoji: "🎨", name: "木心美术馆" }, { emoji: "🏮", name: "水上集市" },
      ],
      itinerary: [
        { day: "DAY 1", route: ["南京", "乌镇", "木心美术馆", "西栅夜游"], note: "建议住进西栅景区内。" },
        { day: "DAY 2", route: ["清晨水巷", "东栅", "返南京"], note: "早上游客少，拍照最好。" },
      ],
      tips: "互联网大会期间住宿贵，尽量避开。",
    },
    {
      id: "nanxun", name: "南浔古镇", emoji: "🏮", sub: "江南富商宅院", coord: [120.42, 30.87], label: { dx: -14, dy: 14, anchor: "end" },
      hook: "比乌镇安静一点的水乡",
      tagline: "小莲庄、百间楼和张石铭旧宅，南浔更像一本慢慢翻的旧相册。",
      transport: {
        rail: { title: "南京南→湖州+接驳", breakdown: "高铁约1小时25分 + 湖州站→南浔约50分；合计约3小时15分", price: "二等座约¥110-160", veh: 85, arr: 50 },
        fly: null,
        drive: { title: "长深高速", breakdown: "约260km，自驾约3小时20分", veh: 200 },
      },
      recommend: { mode: "drive", reason: "南浔接驳比苏杭麻烦，自驾门到门更顺；还能和湖州太湖串起来。" },
      spots: [
        { emoji: "🏮", name: "百间楼" }, { emoji: "🌿", name: "小莲庄" },
        { emoji: "🏘", name: "张石铭旧宅" }, { emoji: "🍜", name: "双浇面" },
      ],
      itinerary: [
        { day: "DAY 1", route: ["南京", "南浔古镇", "小莲庄", "百间楼夜景"], note: "南浔适合慢慢走，不用排太满。" },
      ],
      tips: "想避开热门水乡人潮，南浔是更舒服的选择。",
    },
    {
      id: "shaoxing", name: "绍兴鲁迅故里", emoji: "🍶", sub: "黄酒、乌篷船与书屋", coord: [120.58, 30.00], label: { dx: 14, dy: 18, anchor: "start" },
      hook: "黄酒和乌篷船的周末",
      tagline: "从南京到绍兴，去三味书屋看课本里的江南，再喝一杯温黄酒。",
      transport: {
        rail: { title: "南京南→绍兴北", breakdown: "市区→南京南35分 + 候车25分 + 高铁约2小时15分 + 绍兴北→鲁迅故里约30分", price: "二等座约¥170-230", veh: 135, arr: 30 },
        fly: null,
        drive: { title: "长深/杭州湾方向", breakdown: "约360km，自驾约4小时30分", veh: 270 },
      },
      recommend: { mode: "rail", reason: "绍兴北接驳进城方便，喝黄酒也不适合开车。" },
      spots: [
        { emoji: "📖", name: "鲁迅故里" }, { emoji: "🌸", name: "沈园" },
        { emoji: "🛶", name: "东湖乌篷船" }, { emoji: "🏮", name: "仓桥直街" },
      ],
      itinerary: [
        { day: "DAY 1", route: ["绍兴北", "鲁迅故里", "沈园", "仓桥直街"], note: "咸亨酒店和黄酒奶茶都可以试试。" },
        { day: "DAY 2", route: ["东湖乌篷船", "兰亭", "返南京"], note: "兰亭适合喜欢书法的人。" },
      ],
      tips: "绍兴一日游也能成立，两日更松弛。",
    },
    {
      id: "qiandaohu", name: "千岛湖", emoji: "🐟", sub: "环湖公路与鱼头汤", coord: [119.04, 29.61], label: { dx: -14, dy: 8, anchor: "end" },
      hook: "把车开进湖光山色里",
      tagline: "千岛湖的重点不是一个景点，而是环湖路上的每一次停车。",
      transport: {
        rail: { title: "南京南→千岛湖", breakdown: "高铁约2小时40分 + 千岛湖站→湖区约30分；合计约4小时10分", price: "二等座约¥210-280", veh: 160, arr: 30 },
        fly: null,
        drive: { title: "长深高速", breakdown: "约360km，自驾约4小时40分，环湖更自由", veh: 280 },
      },
      recommend: { mode: "drive", reason: "千岛湖玩的是环湖路线，自驾可以串起观景台、村落和湖边餐馆。" },
      spots: [
        { emoji: "⛴", name: "中心湖区游船" }, { emoji: "🌄", name: "梅峰岛" },
        { emoji: "🚴", name: "环湖绿道" }, { emoji: "🍲", name: "鱼头汤" },
      ],
      itinerary: [
        { day: "DAY 1", route: ["南京", "千岛湖", "湖区游船", "鱼头汤"], note: "梅峰岛看岛屿层次最经典。" },
        { day: "DAY 2", route: ["环湖自驾", "文渊狮城", "返南京"], note: "环湖路本身就是景点。" },
      ],
      tips: "夏天适合玩水，秋天适合骑行。",
    },
    {
      id: "moganshan", name: "莫干山", emoji: "🎋", sub: "竹林、民宿与避暑", coord: [119.88, 30.61], label: { dx: -12, dy: -10, anchor: "end" },
      hook: "江浙沪民宿宇宙中心",
      tagline: "竹林、山路、咖啡馆和民宿泳池，莫干山是最标准的放空周末。",
      transport: {
        rail: { title: "南京南→德清", breakdown: "高铁约1小时45分 + 德清站→莫干山约35分；合计约3小时20分", price: "二等座约¥140-200", veh: 105, arr: 35 },
        fly: null,
        drive: { title: "长深高速", breakdown: "约250km，自驾约3小时10分，山里移动更方便", veh: 190 },
      },
      recommend: { mode: "drive", reason: "莫干山景点和民宿分散，自驾比落地打车自由很多。" },
      spots: [
        { emoji: "🎋", name: "莫干山风景区" }, { emoji: "🏡", name: "庾村" },
        { emoji: "☕", name: "山中咖啡馆" }, { emoji: "🌲", name: "竹林步道" },
      ],
      itinerary: [
        { day: "DAY 1", route: ["南京", "庾村", "民宿入住", "山路散步"], note: "第一天别赶景点，住得舒服更重要。" },
        { day: "DAY 2", route: ["莫干山景区", "竹林步道", "返南京"], note: "夏天避暑体验最好。" },
      ],
      tips: "周末民宿价格差异大，先定住宿再排行程。",
    },
    {
      id: "lianyungang", name: "连云港花果山", emoji: "🐒", sub: "山海港城", coord: [119.22, 34.60], label: { dx: 14, dy: -8, anchor: "start" },
      hook: "江苏也有山海线",
      tagline: "花果山、连岛和海鲜市场，连云港适合想看海又不想飞太远的周末。",
      transport: {
        rail: { title: "南京南/南京→连云港", breakdown: "市区→车站约35分 + 候车25分 + 动车约2小时30分 + 到花果山约35分", price: "二等座约¥150-210", veh: 150, arr: 35 },
        fly: null,
        drive: { title: "长深高速", breakdown: "约330km，自驾约4小时", veh: 240 },
      },
      recommend: { mode: "rail", reason: "动车时间可控，到站后打车去花果山或连岛都方便。" },
      spots: [
        { emoji: "🐒", name: "花果山" }, { emoji: "🏖", name: "连岛" },
        { emoji: "🌊", name: "海上云台山" }, { emoji: "🦞", name: "海鲜市场" },
      ],
      itinerary: [
        { day: "DAY 1", route: ["南京", "连云港", "花果山", "海鲜晚餐"], note: "花果山游览需要留半天。" },
        { day: "DAY 2", route: ["连岛", "海上云台山", "返南京"], note: "天气好时海边体验加分很多。" },
      ],
      tips: "海边风大，春秋带外套。",
    },
    {
      id: "yancheng", name: "盐城湿地", emoji: "🦌", sub: "麋鹿、丹顶鹤与黄海滩涂", coord: [120.16, 33.35], label: { dx: 14, dy: 12, anchor: "start" },
      hook: "江苏的自然荒野感",
      tagline: "不是所有周末都要古镇和商圈，盐城适合去看湿地、候鸟和麋鹿。",
      transport: {
        rail: { title: "南京→盐城", breakdown: "市区→南京站约30分 + 候车25分 + 动车约2小时10分 + 到湿地景区约50分", price: "二等座约¥120-170", veh: 130, arr: 50 },
        fly: null,
        drive: { title: "沪陕/盐靖高速", breakdown: "约260km，自驾约3小时20分", veh: 200 },
      },
      recommend: { mode: "drive", reason: "盐城湿地景区分散，自驾更适合串麋鹿保护区、丹顶鹤湿地和海边滩涂。" },
      spots: [
        { emoji: "🦌", name: "中华麋鹿园" }, { emoji: "🕊", name: "丹顶鹤湿地" },
        { emoji: "🌾", name: "黄海森林公园" }, { emoji: "🌊", name: "条子泥湿地" },
      ],
      itinerary: [
        { day: "DAY 1", route: ["南京", "中华麋鹿园", "黄海森林公园"], note: "自然类景区更适合慢节奏。" },
        { day: "DAY 2", route: ["丹顶鹤湿地", "条子泥", "返南京"], note: "观鸟季体验最好，带长焦更快乐。" },
      ],
      tips: "湿地风大且日晒强，防风防晒都要准备。",
    },
  ];

  const anchors = [];

  cities.forEach(c => {
    const t = c.transport;
    c.doorToDoor = {
      rail: t.rail ? railD2D(t.rail.veh, t.rail.arr, t.rail.dep) : null,
      fly: t.fly ? flyD2D(t.fly.veh, t.fly.arr, t.fly.dep) : null,
      drive: t.drive ? driveD2D(t.drive.veh) : null,
    };
  });

  return { home, cities, anchors };
})();
