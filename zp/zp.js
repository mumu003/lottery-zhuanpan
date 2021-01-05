
/**
 * 大转盘抽奖
 */

var app = getApp();

Page({

  //奖品配置
  awardsConfig: {
    chance: true,
    awards: [
      { 'index': 0, 'name': 'matepad', img: 'http://wgfw.cn/userImg/2021-12-22/1608607627240.png?x-oss-process=image/resize,l_440,m_lfit/quality,q_80' },
      { 'index': 1, 'name': '谢谢参与', img: 'https://admin.wgfw.cn/userImg/2021-12-23/1608706301680.png' },
      { 'index': 2, 'name': '明星画册台历', img: 'http://wgfw.cn/userImg/2021-12-22/1608607633591.png?x-oss-process=image/resize,l_440,m_lfit/quality,q_80' },
      { 'index': 3, 'name': '手表GT2', img: 'http://wgfw.cn/userImg/2021-12-22/1608607632471.png?x-oss-process=image/resize,l_440,m_lfit/quality,q_80' },
      { 'index': 4, 'name': '暴龙定妆镜', img: 'http://wgfw.cn/userImg/2021-12-22/1608607633628.png?x-oss-process=image/resize,l_440,m_lfit/quality,q_80' },
      { 'index': 5, 'name': '明星画册台历', img: 'http://wgfw.cn/userImg/2021-12-22/1608607625279.png?x-oss-process=image/resize,l_440,m_lfit/quality,q_80' }
    ]
  },

  data: {
    awardsList: {},
    animationData: {},
    btnDisabled: '',
  },

  onReady: function (e) {
    this.drawAwardRoundel();

    //分享
    wx.showShareMenu({
      withShareTicket: true
    });
  },

  //画抽奖圆盘
  drawAwardRoundel: function () {
    var awards = this.awardsConfig.awards;
    var awardsList = [];
    var turnNum = 1 / awards.length;  // 文字旋转 turn 值

    // 奖项列表
    for (var i = 0; i < awards.length; i++) {
      awardsList.push({ turn: i * turnNum + 'turn', lineTurn: i * turnNum + turnNum / 2 + 'turn', award: awards[i].name, src: awards[i].img });
    }
    console.log('输出看看awardsList:', awardsList)

    this.setData({
      btnDisabled: this.awardsConfig.chance ? '' : 'disabled',
      awardsList: awardsList
    });
  },

  //发起抽奖
  playReward: function () {
    //中奖index
    var awardIndex = Math.floor(Math.random() * this.awardsConfig.awards.length); // 模拟随机性
    console.log("模拟中奖的结果是:", Math.random() * this.awardsConfig.awards.length, this.awardsConfig.awards[awardIndex])
    var runNum = 5;// 默认旋转5周
    var duration = 8000;//时长

    // 旋转角度
    this.runDeg = this.runDeg || 0;
    // this.runDeg = this.runDeg + (360 - this.runDeg % 360) + (360 * runNum - awardIndex * (360 / this.awardsConfig.awards.length))

    const min = 360 - (360 / this.awardsConfig.awards.length) * awardIndex - (360 / this.awardsConfig.awards.length / 2)
    const max = (min + (360 / this.awardsConfig.awards.length)) > 360 ? (360 / this.awardsConfig.awards.length / 2) : (min +(360 / this.awardsConfig.awards.length))
    var radmon = Math.floor(Math.random() * (max - min + 1) + min) // 最终停留的角度
    if (awardIndex === 0) {
      const newMin = min - 360
      const newMax = max
      // console.log('new', newMin, newMax)
      radmon = Math.floor(Math.random() * (newMax - newMin + 1) + newMin)
    }
    this.runDeg = this.runDeg + (360 - this.runDeg % 360) + runNum * 360 + radmon // 总的旋转度数
    console.log('旋转角:',min, max, radmon, this.runDeg)
    
    //创建动画
    var animationRun = wx.createAnimation({
      duration: duration,
      timingFunction: 'ease'
    })
    animationRun.rotate(this.runDeg).step();
    this.setData({
      animationData: animationRun.export(),
      btnDisabled: 'disabled'
    });

    // 中奖提示
    var awardsConfig = this.awardsConfig;
    setTimeout(function () {
      wx.showModal({
        title: '恭喜',
        content: '获得' + (awardsConfig.awards[awardIndex].name),
        showCancel: false
      });
      this.setData({
        btnDisabled: ''
      });
    }.bind(this), duration);

  },

  onShareAppMessage: function () {
    // var that = this;
    // return util.doShare("大转盘抽奖", "pages/zp/zp",that);
  }

})
