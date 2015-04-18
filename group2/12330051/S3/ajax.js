// Generated by CoffeeScript 1.9.1
(function() {
  var calculate, callback, disable, enable, flag, ini, robot, setLabel;

  flag = false;

  callback = function(data, textStatus) {
    var allspan, i, len, unread;
    allspan = $(".random");
    for (i = 0, len = allspan.length; i < len; i++) {
      unread = allspan[i];
      if (unread.innerHTML === "...") {
        unread.innerHTML = data;
      }
    }
    enable();
    if ($("li .random").length === 5) {
      calculate();
    }
    return 0;
  };

  enable = function() {
    var allli, li;
    allli = $("#control-ring li");
    $((function() {
      var i, len, results;
      results = [];
      for (i = 0, len = allli.length; i < len; i++) {
        li = allli[i];
        if (!$(li).find(".random").get(0)) {
          results.push(li);
        }
      }
      return results;
    })()).css("background-color", "rgba(61,40,166,1)");
    return 0;
  };

  disable = function() {
    var allli, li;
    allli = $("#control-ring li");
    $((function() {
      var i, len, results;
      results = [];
      for (i = 0, len = allli.length; i < len; i++) {
        li = allli[i];
        results.push(li);
      }
      return results;
    })()).css("background-color", "grey");
    $("#control-ring").unbind("click");
    return 0;
  };

  calculate = function() {
    var add, i, len, ref, span, sum;
    sum = 0;
    add = function(random) {
      return sum = sum + parseInt(random.innerHTML);
    };
    ref = $(".random");
    for (i = 0, len = ref.length; i < len; i++) {
      span = ref[i];
      add(span);
    }
    $("#info").get(0).innerHTML = sum;
    $("#info-bar").css("background-color", "grey");
    $("#info-bar").unbind("click");
    return flag = true;
  };

  setLabel = function(tar) {
    var unread;
    unread = $("<span class = 'random'>...</span>");
    $(tar).append(unread.get(0));
    return 0;
  };

  ini = function() {
    if (flag) {
      $(".random").remove();
      $("#info").get(0).innerHTML = "";
      enable();
      return flag = false;
    }
  };

  robot = function() {
    var i, len, li, list, results, start;
    start = function(li) {
      setLabel(li);
      $.post("/", callback);
      return disable();
    };
    list = $("#control-ring li");
    results = [];
    for (i = 0, len = list.length; i < len; i++) {
      li = list[i];
      results.push(start(li));
    }
    return results;
  };

  $(".icon").click(robot);

  $(".icon").mouseleave(ini);

}).call(this);