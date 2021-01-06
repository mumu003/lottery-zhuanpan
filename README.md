# lottery-zhuanpan
小程序版 抽奖转盘的实现

awards          奖品列表
awardsList      转盘样式配置
animationData   旋转动画
awardIndex      中奖奖品id(范例中为模拟中奖设置的随机奖品索引)
runNum          基础旋转圈数
duration        旋转时长
runDeg          旋转角度


一、画圆盘

布局设置分为大容器-> 线段容器-> 区块容器

逻辑：

文字旋转圈数   turn = 1 / awards.length

遍历奖品列表：每个奖品区块旋转的圈数为i * turn, 线段的旋转圈数为 i * turn + turn / 2, 同时将奖品的名称及图片依次赋值

二、开始抽奖

逻辑：

在奖品列表长度内生成随机索引 Math.floor(Math.random() * this.awardsConfig.awards.length)，

根据规律计算出该索引所在旋转角的最大最小值，

并在该范围内取到随机数作为停留时的随机角度，

计算出每次旋转的总度数 this.runDeg = this.runDeg + (360 - this.runDeg % 360) + runNum * 360 + radmon，

创建旋转动画，根据中奖索引渠道奖品信息
