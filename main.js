const timeElement = document.getElementById('time'); //document.getElementByIdで要素を取得
    const start = document.getElementById('start');
    const stop = document.getElementById('stop');
    const reset = document.getElementById('reset');

    
    let elapsed = 0; // 経過時間のミリ秒

    let intervalId = null;

    function updateTime() { //elapsedを表示
      const ms = elapsed % 1000; //下三桁ミリ秒の表示、1000で割ったときのあまり、1000ミリ秒＝1秒
      const s = Math.floor(elapsed / 1000) % 60; //秒の表示、端数が出るためMath.floorで切り捨てる
      const m = Math.floor(elapsed / (1000*60)) % 60; //60で割ったときの余りを表示させる
      const h = Math.floor(elapsed / (1000*60*60));

      const msStr = ms.toString().padStart(3, '0');
      const sStr = s.toString().padStart(2, '0');
      const mStr = m.toString().padStart(2, '0');
      const hStr = h.toString().padStart(2, '0');

      timeElement.innerHTML = `${hStr}:${mStr}:${sStr}.${msStr}`;
    }

    start.addEventListener('click', function(e) {
      if (intervalId !== null) { return; } //何度も連打しても停止させる
      let pre = new Date();
      intervalId = setInterval(function() {
        const now = new Date();
        elapsed += now - pre; //現在の時刻からひとつ前の時刻を引くことで何秒経過したかわかる
        pre = now;
        updateTime();
        //console.log(elapsed);
      }, 10); //一秒毎にfunctionが実行される、１０ミリ秒
    });

    stop.addEventListener('click', function(e) {
      clearInterval(intervalId); //setIntervalを止める
      intervalId = null;
    });

    reset.addEventListener('click', function(e) {
      elapsed = 0;
      updateTime();
    });