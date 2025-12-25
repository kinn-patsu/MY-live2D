

/*! 
 * Live2D Widget 
 * https://github.com/stevenjoezhang/live2d-widget 
 */

// 👇【可改】CDN 路径 —— 但建议保持默认，除非你知道自己在做什么
// 当前使用的是 v1.0.0-rc.6，功能较老但稳定
const live2d_path = 'https://fastly.jsdelivr.net/npm/live2d-widgets@1.0.0-rc.6/dist/';

// 封装异步加载资源的方法（不用动）
function loadExternalResource(url, type) {
  return new Promise((resolve, reject) => {
    let tag;
    if (type === 'css') {
      tag = document.createElement('link');
      tag.rel = 'stylesheet';
      tag.href = url;
    } else if (type === 'js') {
      tag = document.createElement('script');
      tag.type = 'module'; // 注意：这是模块脚本
      tag.src = url;
    }
    if (tag) {
      tag.onload = () => resolve(url);
      tag.onerror = () => reject(url);
      document.head.appendChild(tag);
    }
  });
}

// 主执行函数（立即执行）
(async () => {
  // 解决图片跨域问题（不用动）
  const OriginalImage = window.Image;
  window.Image = function(...args) {
    const img = new OriginalImage(...args);
    img.crossOrigin = "anonymous";
    return img;
  };
  window.Image.prototype = OriginalImage.prototype;

  // 加载样式和核心脚本（不用动）
  await Promise.all([
    loadExternalResource(live2d_path + 'waifu.css', 'css'),
    loadExternalResource(live2d_path + 'waifu-tips.js', 'js')
  ]);

 
  // 重点：这里是你自定义的地方！  
  // 修改 initWidget({ ... }) 里的参数即可

  initWidget({
    // 角色配置文件路径（JSON）
    // 👉【可改】换角色：替换 waifu-tips.json 为其他配置
    waifuPath: 'https://fastly.jsdelivr.net/gh/kinn-patsu/My-live2D@main/my-models.json',

    // Live2D Cubism 2 引擎路径（一般不用改）
    cubism2Path: live2d_path + 'live2d.min.js',

    // Cubism 5 核心（用于新模型，一般不用改）
    cubism5Path: 'https://cubism.live2d.com/sdk-web/cubismcore/live2dcubismcore.min.js',

    // 工具栏按钮（可增删）
    // 可选值: 'hitokoto'(一言), 'asteroids'(打飞机), 'switch-model'(换模型),
    //         'switch-texture'(换衣服), 'photo'(拍照), 'info'(信息), 'quit'(关闭)
    // 👉【可改】例如只保留换模型和关闭：
    // tools: ['switch-model', 'quit'],
    tools: ['hitokoto', 'asteroids', 'switch-model', 'switch-texture', 'info', 'quit'],

    // 日志级别：'debug' | 'info' | 'warn' | 'error'
    // 👉【可改】设为 'error' 可减少控制台输出
    logLevel: 'warn',

    // 是否允许拖拽看板娘
    // 👉【可改】设为 true 可拖动
    drag: true,
  });
})();

// 打印欢迎日志（装饰用，可删）
console.log(`\n%cLive2D%cWidget%c\n`, 'padding: 8px; background: #cd3e45; font-weight: bold; font-size: large; color: white;', 'padding: 8px; background: #ff5450; font-size: large; color: #eee;', '');

/*
く__,.ヘヽ.        /  ,ー､ 〉
         ＼ ', !-─‐-i  /  /´
         ／｀ｰ'       L/／｀ヽ､
       /   ／,   /|   ,   ,       ',
     ｲ   / /-‐/  ｉ  L_ ﾊ ヽ!   i
      ﾚ ﾍ 7ｲ｀ﾄ   ﾚ'ｧ-ﾄ､!ハ|   |
        !,/7 '0'     ´0iソ|    |
        |.从"    _     ,,,, / |./    |
        ﾚ'| i＞.､,,__  _,.イ /   .i   |
          ﾚ'| | / k_７_/ﾚ'ヽ,  ﾊ.  |
            | |/i 〈|/   i  ,.ﾍ |  i  |
           .|/ /  ｉ：    ﾍ!    ＼  |
            kヽ>､ﾊ    _,.ﾍ､    /､!
            !'〈//｀Ｔ´', ＼ ｀'7'ｰr'
            ﾚ'ヽL__|___i,___,ンﾚ|ノ
                ﾄ-,/  |___./
                'ｰ'    !_,.:
*/

