var top250 = {
  //封装一个函数，在里面调用其他函数
  init: function() {
    this.$element = $("#top250");
    this.isLoading = false;
    this.isFinish = false; //默认数据马没有完成
    this.index = 0;
    this.bind();
    this.start();
  },
  //绑定事件
  bind: function() {
    var _this = this; //解决this指向问题调用时写_this
    this.$element.scroll(function() {
      //检测当$element滚动式调用start
      _this.start();
    });
  },
  //获取数据
  start: function() {
    var _this = this;
    this.getData(function(data) {
      _this.render(data);
    });
  },
  getData: function(callback) {
    var _this = this;
    if (_this.isLoading) return; //isLoading为true发送请求，如果是false不再发送请求，retur掉
    _this.isLoading = true;
    _this.$element.find(".loading").show(); //数据正在加载显示icon-loading
    $.ajax({
      url: "http://api.douban.com/v2/movie/top250",
      type: "GET",
      data: {
        start: _this.index,
        count: 20
      },
      dataType: "jsonp"
    })
      .done(function(ret) {
        _this.index += 20;
        if (_this.index >= ret.total) {
          _this.isFinish = true;
        }
        callback && callback(ret);
      })
      .fail(function() {
        console.log("失败");
      })
      .always(function() {
        //无论请求成功或失败加载状态都完成
        _this.isLoading = false;
        //加载完成后隐藏icon-loading
        _this.$element.find(".loading").hide();
      });
  },
  //渲染
  render: function(data) {
    var _this = this;
    data.subjects.forEach(function(movie) {
      var template = `<div class="item">
      <a href="#">
          <div class="cover">
              <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
          </div>
          <div class="detail">
              <h2></h2>
              <div class="extra"><span class="score">9.3</span>分 /<span class="collect">1000</span> 收藏</div>
              <div class="extra"><span class="year">1994</span> / <span class="type">剧情、犯罪</span></div>
              <div class="extra">导演：<span class="director">张艺谋</span></div>
              <div class="extra">主演：<span class="actor">xxx</span></div>
          </div>
      </a>
   </div>`;
      //创建一个 dom 元素赋给 $node
      var $node = $(template);
      //.attr()给属性赋值
      $node.find("a").attr("href", movie.alt);
      $node.find(".cover img").attr("src", movie.images.medium);
      $node.find(".detail h2").text(movie.title);
      $node.find(".score").text(movie.rating.average);
      $node.find(".collect").text(movie.collect_count);
      $node.find(".year").text(movie.year);
      $node.find(".type").text(movie.genres.join(" / "));
      $node.find(".director").text(function() {
        var directorsArr = [];
        movie.directors.forEach(function(item) {
          directorsArr.push(item.name);
        });
        return directorsArr.join("、");
      });
      $node.find(".actor").text(function() {
        var actorArr = [];
        movie.casts.forEach(function(item) {
          actorArr.push(item.name);
        });
        return actorArr.join("、");
      });
      _this.$element.find(".container").append($node);
    });
  },
  //判断页面是否滚动到底部
  isToBottom: function() {
    //内容的高度<=$element.height的高度+this.$element.scrollTop的高度
    return (
      this.$element.find(".container") <=
      this.$element.height() + this.$element.scrollTop() + 10
    );
  }
};

var usBox = {
  init: function() {
    this.$element = $("#beimei");
    this.start();
  },
  start: function() {
    var _this = this;
    this.getData(function(data) {
      _this.render(data);
    });
  },
  getData: function(callback) {
    var _this = this;
    if (_this.isLoading) return;
    _this.isLoading = true;
    _this.$element.find(".loading").show();
    $.ajax({
      url: "http://api.douban.com/v2/movie/us_box",
      dataType: "jsonp"
    })
      .done(function(ret) {
        callback && callback(ret);
      })
      .fail(function() {
        console.log("失败");
      })
      .always(function() {
        _this.$element.find(".loading").hide();
      });
  },
  render: function(data) {
    var _this = this;
    console.log(data);
    data.subjects.forEach(function(movie) {
      movie = movie.subject;
      var template = `<div class="item">
      <a href="#">
          <div class="cover">
              <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
          </div>
          <div class="detail">
              <h2></h2>
              <div class="extra"><span class="score">9.3</span>分 /<span class="collect">1000</span> 收藏</div>
              <div class="extra"><span class="year">1994</span> / <span class="type">剧情、犯罪</span></div>
              <div class="extra">导演：<span class="director">张艺谋</span></div>
              <div class="extra">主演：<span class="actor">xxx</span></div>
          </div>
      </a>
   </div>`;
      var $node = $(template);
      $node.find("a").attr("href", movie.alt);
      $node.find(".cover img").attr("src", movie.images.medium);
      $node.find(".detail h2").text(movie.title);
      $node.find(".score").text(movie.rating.average);
      $node.find(".collect").text(movie.collect_count);
      $node.find(".year").text(movie.year);
      $node.find(".type").text(movie.genres.join(" / "));
      $node.find(".director").text(function() {
        var directorsArr = [];
        movie.directors.forEach(function(item) {
          directorsArr.push(item.name);
        });
        return directorsArr.join("、");
      });
      $node.find(".actor").text(function() {
        var actorArr = [];
        movie.casts.forEach(function(item) {
          actorArr.push(item.name);
        });
        return actorArr.join("、");
      });
      _this.$element.find(".container").append($node);
    });
  }
};

var search = {
  init: function() {
    this.$element = $("#search");
    this.keyword = "";
    this.bind();
    this.start();
  },

  bind: function() {
    var _this = this;
    this.$element.find(".button").click(function() {
      _this.keyword = _this.$element.find("input").val();
      _this.start();
    });
  },
  start: function() {
    var _this = this;
    this.getData(function(data) {
      _this.render(data);
    });
  },
  getData: function(callback) {
    var _this = this;
    _this.$element.find(".loading").show();
    $.ajax({
      url: "http://api.douban.com/v2/movie/search",
      data: {
        q: _this.keyword
      },
      dataType: "jsonp"
    })
      .done(function(ret) {
        callback && callback(ret);
      })
      .fail(function() {
        console.log("数据异常");
      })
      .always(function() {
        _this.$element.find(".loading").hide();
      });
  },
  render: function(data) {
    var _this = this;
    console.log(data);
    data.subjects.forEach(function(movie) {
      var template = `<div class="item">
      <a href="#">
          <div class="cover">
              <img src="https://img3.doubanio.com/view/photo/s_ratio_poster/public/p480747492.jpg" alt="">
          </div>
          <div class="detail">
              <h2></h2>
              <div class="extra"><span class="score">9.3</span>分 /<span class="collect">1000</span> 收藏</div>
              <div class="extra"><span class="year">1994</span> / <span class="type">剧情、犯罪</span></div>
              <div class="extra">导演：<span class="director">张艺谋</span></div>
              <div class="extra">主演：<span class="actor">xxx</span></div>
          </div>
      </a>
   </div>`;
      var $node = $(template);
      $node.find("a").attr("href", movie.alt);
      $node.find(".cover img").attr("src", movie.images.medium);
      $node.find(".detail h2").text(movie.title);
      $node.find(".score").text(movie.rating.average);
      $node.find(".collect").text(movie.collect_count);
      $node.find(".year").text(movie.year);
      $node.find(".type").text(movie.genres.join(" / "));
      $node.find(".director").text(function() {
        var directorsArr = [];
        movie.directors.forEach(function(item) {
          directorsArr.push(item.name);
        });
        return directorsArr.join("、");
      });
      $node.find(".actor").text(function() {
        var actorArr = [];
        movie.casts.forEach(function(item) {
          actorArr.push(item.name);
        });
        return actorArr.join("、");
      });
      _this.$element.find(".search-result").append($node);
    });
  }
};



app.init();
