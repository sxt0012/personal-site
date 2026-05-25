/**
 * 个人资料数据中心
 *
 * ⭐ 这是你以后最常改的文件之一 —— 直接在这里编辑文字，全站自动更新。
 *    改完保存，浏览器会自动热更新，不用重启 dev server。
 */
export const profile = {
  /** 显示在 Hero 大标题位置 */
  name: "宋雪彤",

  /** 显示在大标题下方的身份定位（一行）*/
  title: "AI Trainer · Prompt Engineer",

  /**
   * 打字机循环标语（中英文均可，建议每句 ≤ 32 字）
   * 数组里的字符串会依次：打字 → 停 2 秒 → 删除 → 切换下一句 → 循环
   *
   * 灵感参考（删掉换成你自己的）：
   *   "Training AI to be helpful, harmless, and honest"
   *   "让 AI 既有用，又靠谱"
   *   "Where great prompts meet great products"
   *   "Quality data in, quality models out"
   */
  taglines: [
    "让 AI 既有用，又靠谱",
    "持续稳定的使用AI",
    "AI打破了太多限制，利用AI学习更能把握未来",
    "成为一个比别人更会用AI的人",
  ],

  /**
   * 在职状态，显示在 Hero 底部状态指示行
   * 可选值（自定义也行）：
   *   "available_for_hire"  ← 正在求职
   *   "open_to_offers"      ← 开放机会
   *   "in_role"             ← 已就职
   *   "exploring"           ← 探索中
   */
  status: "available_for_hire",

  /**
   * 头像图片路径（放在 public/ 下，引用时省略 public/）
   * 例如：把照片命名为 avatar.jpg 放进 public/，下面写 "/avatar.jpg"
   * 暂未提供时，Hero 会显示一个占位图标
   */
  avatar: "/aaas.jpg" as string, // 例如 "/avatar.jpg"
};
