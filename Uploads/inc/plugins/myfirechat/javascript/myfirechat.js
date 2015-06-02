/* jQuery Storage API Plugin 1.7.4 https://github.com/julien-maurel/jQuery-Storage-API */
!function(e){"function"==typeof define&&define.amd?define(["jquery"],e):e("object"==typeof exports?require("jquery"):jQuery)}(function(e){function t(t){var r,i,n,o=arguments.length,s=window[t],a=arguments,u=a[1];if(2>o)throw Error("Minimum 2 arguments must be given");if(e.isArray(u)){i={};for(var f in u){r=u[f];try{i[r]=JSON.parse(s.getItem(r))}catch(c){i[r]=s.getItem(r)}}return i}if(2!=o){try{i=JSON.parse(s.getItem(u))}catch(c){throw new ReferenceError(u+" is not defined in this storage")}for(var f=2;o-1>f;f++)if(i=i[a[f]],void 0===i)throw new ReferenceError([].slice.call(a,1,f+1).join(".")+" is not defined in this storage");if(e.isArray(a[f])){n=i,i={};for(var m in a[f])i[a[f][m]]=n[a[f][m]];return i}return i[a[f]]}try{return JSON.parse(s.getItem(u))}catch(c){return s.getItem(u)}}function r(t){var r,i,n=arguments.length,o=window[t],s=arguments,a=s[1],u=s[2],f={};if(2>n||!e.isPlainObject(a)&&3>n)throw Error("Minimum 3 arguments must be given or second parameter must be an object");if(e.isPlainObject(a)){for(var c in a)r=a[c],e.isPlainObject(r)?o.setItem(c,JSON.stringify(r)):o.setItem(c,r);return a}if(3==n)return"object"==typeof u?o.setItem(a,JSON.stringify(u)):o.setItem(a,u),u;try{i=o.getItem(a),null!=i&&(f=JSON.parse(i))}catch(m){}i=f;for(var c=2;n-2>c;c++)r=s[c],i[r]&&e.isPlainObject(i[r])||(i[r]={}),i=i[r];return i[s[c]]=s[c+1],o.setItem(a,JSON.stringify(f)),f}function i(t){var r,i,n=arguments.length,o=window[t],s=arguments,a=s[1];if(2>n)throw Error("Minimum 2 arguments must be given");if(e.isArray(a)){for(var u in a)o.removeItem(a[u]);return!0}if(2==n)return o.removeItem(a),!0;try{r=i=JSON.parse(o.getItem(a))}catch(f){throw new ReferenceError(a+" is not defined in this storage")}for(var u=2;n-1>u;u++)if(i=i[s[u]],void 0===i)throw new ReferenceError([].slice.call(s,1,u).join(".")+" is not defined in this storage");if(e.isArray(s[u]))for(var c in s[u])delete i[s[u][c]];else delete i[s[u]];return o.setItem(a,JSON.stringify(r)),!0}function n(t,r){var n=a(t);for(var o in n)i(t,n[o]);if(r)for(var o in e.namespaceStorages)u(o)}function o(r){var i=arguments.length,n=arguments,s=(window[r],n[1]);if(1==i)return 0==a(r).length;if(e.isArray(s)){for(var u=0;u<s.length;u++)if(!o(r,s[u]))return!1;return!0}try{var f=t.apply(this,arguments);e.isArray(n[i-1])||(f={totest:f});for(var u in f)if(!(e.isPlainObject(f[u])&&e.isEmptyObject(f[u])||e.isArray(f[u])&&!f[u].length)&&f[u])return!1;return!0}catch(c){return!0}}function s(r){var i=arguments.length,n=arguments,o=(window[r],n[1]);if(2>i)throw Error("Minimum 2 arguments must be given");if(e.isArray(o)){for(var a=0;a<o.length;a++)if(!s(r,o[a]))return!1;return!0}try{var u=t.apply(this,arguments);e.isArray(n[i-1])||(u={totest:u});for(var a in u)if(void 0===u[a]||null===u[a])return!1;return!0}catch(f){return!1}}function a(r){var i=arguments.length,n=window[r],o=arguments,s=(o[1],[]),a={};if(a=i>1?t.apply(this,o):n,a._cookie)for(var u in e.cookie())""!=u&&s.push(u.replace(a._prefix,""));else for(var f in a)s.push(f);return s}function u(t){if(!t||"string"!=typeof t)throw Error("First parameter must be a string");g?(window.localStorage.getItem(t)||window.localStorage.setItem(t,"{}"),window.sessionStorage.getItem(t)||window.sessionStorage.setItem(t,"{}")):(window.localCookieStorage.getItem(t)||window.localCookieStorage.setItem(t,"{}"),window.sessionCookieStorage.getItem(t)||window.sessionCookieStorage.setItem(t,"{}"));var r={localStorage:e.extend({},e.localStorage,{_ns:t}),sessionStorage:e.extend({},e.sessionStorage,{_ns:t})};return e.cookie&&(window.cookieStorage.getItem(t)||window.cookieStorage.setItem(t,"{}"),r.cookieStorage=e.extend({},e.cookieStorage,{_ns:t})),e.namespaceStorages[t]=r,r}function f(e){var t="jsapi";try{return window[e]?(window[e].setItem(t,t),window[e].removeItem(t),!0):!1}catch(r){return!1}}var c="ls_",m="ss_",g=f("localStorage"),l={_type:"",_ns:"",_callMethod:function(e,t){var r=[this._type],t=Array.prototype.slice.call(t),i=t[0];return this._ns&&r.push(this._ns),"string"==typeof i&&-1!==i.indexOf(".")&&(t.shift(),[].unshift.apply(t,i.split("."))),[].push.apply(r,t),e.apply(this,r)},get:function(){return this._callMethod(t,arguments)},set:function(){var t=arguments.length,i=arguments,n=i[0];if(1>t||!e.isPlainObject(n)&&2>t)throw Error("Minimum 2 arguments must be given or first parameter must be an object");if(e.isPlainObject(n)&&this._ns){for(var o in n)r(this._type,this._ns,o,n[o]);return n}var s=this._callMethod(r,i);return this._ns?s[n.split(".")[0]]:s},remove:function(){if(arguments.length<1)throw Error("Minimum 1 argument must be given");return this._callMethod(i,arguments)},removeAll:function(e){return this._ns?(r(this._type,this._ns,{}),!0):n(this._type,e)},isEmpty:function(){return this._callMethod(o,arguments)},isSet:function(){if(arguments.length<1)throw Error("Minimum 1 argument must be given");return this._callMethod(s,arguments)},keys:function(){return this._callMethod(a,arguments)}};if(e.cookie){window.name||(window.name=Math.floor(1e8*Math.random()));var h={_cookie:!0,_prefix:"",_expires:null,_path:null,_domain:null,setItem:function(t,r){e.cookie(this._prefix+t,r,{expires:this._expires,path:this._path,domain:this._domain})},getItem:function(t){return e.cookie(this._prefix+t)},removeItem:function(t){return e.removeCookie(this._prefix+t)},clear:function(){for(var t in e.cookie())""!=t&&(!this._prefix&&-1===t.indexOf(c)&&-1===t.indexOf(m)||this._prefix&&0===t.indexOf(this._prefix))&&e.removeCookie(t)},setExpires:function(e){return this._expires=e,this},setPath:function(e){return this._path=e,this},setDomain:function(e){return this._domain=e,this},setConf:function(e){return e.path&&(this._path=e.path),e.domain&&(this._domain=e.domain),e.expires&&(this._expires=e.expires),this},setDefaultConf:function(){this._path=this._domain=this._expires=null}};g||(window.localCookieStorage=e.extend({},h,{_prefix:c,_expires:3650}),window.sessionCookieStorage=e.extend({},h,{_prefix:m+window.name+"_"})),window.cookieStorage=e.extend({},h),e.cookieStorage=e.extend({},l,{_type:"cookieStorage",setExpires:function(e){return window.cookieStorage.setExpires(e),this},setPath:function(e){return window.cookieStorage.setPath(e),this},setDomain:function(e){return window.cookieStorage.setDomain(e),this},setConf:function(e){return window.cookieStorage.setConf(e),this},setDefaultConf:function(){return window.cookieStorage.setDefaultConf(),this}})}e.initNamespaceStorage=function(e){return u(e)},g?(e.localStorage=e.extend({},l,{_type:"localStorage"}),e.sessionStorage=e.extend({},l,{_type:"sessionStorage"})):(e.localStorage=e.extend({},l,{_type:"localCookieStorage"}),e.sessionStorage=e.extend({},l,{_type:"sessionCookieStorage"})),e.namespaceStorages={},e.removeAllStorages=function(t){e.localStorage.removeAll(t),e.sessionStorage.removeAll(t),e.cookieStorage&&e.cookieStorage.removeAll(t),t||(e.namespaceStorages={})}});



myfirechat_window_active = true;
myfirechat_original_title = document.title;

$(document).ready( function() {
  

  function clearTitle(){
    document.title = myfirechat_original_title;
  }

  $(window).on("blur focus", function(e) {
    var prevType = $(this).data("prevType");

    if (prevType != e.type) {   //  reduce double fire issues
        switch (e.type) {
            case "blur":
                myfirechat_window_active = false;
                break;
            case "focus":
                myfirechat_window_active = true;
                clearTitle();
                break;
        }
    }

    $(this).data("prevType", e.type);
  });



  if (!$ || (parseInt($().jquery.replace(/\./g, ""), 10) < 170)) {
      throw new Error("jQuery 1.7 or later required!");
    }

  var MyFireChat = {

    myFireChatRef: null,
    myFireChat: null,
    firebaseData: null,
    authData: null,
    storage: $.initNamespaceStorage('myFireChatStorage').localStorage,

    init: function() {
      this.myFireChat = this.getAuthorization();
    },

    getAuthorization: function() {
      var _this = this;

        $.get( rootpath+"/xmlhttp.php?action=myfirechat_auth", function( firebaseData ) {
            _this.firebaseData = firebaseData;
            _this.initFirebaseAuth();            
          })
          .fail(function() {
              alert( "Something went wrong, please try again later." );
        });

    },

    initFirebaseAuth: function(){
      var _this = this;

      this.myFireChatRef = new Firebase(_this.firebaseData.url);

      this.myFireChatRef.authWithCustomToken(_this.firebaseData['token'], function(error, authData) {
        if (error) {
          console.log("Login Failed: ", error);
        } else {
          _this.authData = authData;
          _this.initChat();
        }
      });

    },

    initChat: function() {
      var _this = this;

      var options = {numMaxMessages: parseInt(_this.firebaseData.numMaxMessages), maxLengthRoomName: parseInt(_this.firebaseData.maxLengthRoomName), maxLengthMessage: parseInt(_this.firebaseData.maxLengthMessage), limitWaitTime: parseInt(_this.firebaseData.limitWaitTime)};


      // Create UI Object
      myFireChat = new FirechatUI(_this.myFireChatRef, document.getElementById('myfirechat_wrapper'), options);

      function initializePlugins() {
          var deferreds = [];

          $.each(myFireChat.messageParsingPlugins, function(pluginName, plugin){
            deferreds.push(plugin.init());
        });

        $.each(myFireChat.commandParsingPlugins, function(pluginName, plugin){
            deferreds.push(plugin.init());
        });

          return deferreds;
      }

      // Load plugins, we may need to call the server during init so wait for all ajax to complete
      $.when.apply($, initializePlugins()).done(function() {

              //Default room to enter on Authorization
        if(_this.firebaseData.defaultroom){
          _this.myFireChatRef.onAuth(function(authData) {
              if (authData) {
                myFireChat.setUser(authData.uid, authData.auth.displayName, authData.auth.avatar);
                setTimeout(function() {
                  myFireChat._chat.enterRoom(_this.firebaseData.defaultroom)
                }, 500);
              } else {
                myFireChat._chat.enterRoom(_this.firebaseData.defaultroom)
              }
            });
        }

        return myFireChat;
          });

        }

  };


  MyFireChat.init();

});


(function($) {


  if (!$ || (parseInt($().jquery.replace(/\./g, ""), 10) < 170)) {
    throw new Error("jQuery 1.7 or later required!");
  }

  var root = this,
      previousFirechatUI = root.FirechatUI;

  root.FirechatUI = FirechatUI;

  if (!self.FirechatDefaultTemplates) {
    throw new Error("Unable to find chat templates!");
  }

  function FirechatUI(firebaseRef, el, options) {
    var self = this;

    this._storage = $.initNamespaceStorage('myFireChatUiStorage').localStorage;

    if (!firebaseRef) {
      throw new Error('FirechatUI: Missing required argument `firebaseRef`');
    }

    if (!el) {
      throw new Error('FirechatUI: Missing required argument `el`');
    }

    options = options || {};
    this._options = options;

    this._el = el;
    this._user = null;
    this._chat = new Firechat(firebaseRef, options);

    // Terrible hack for messages not to start registering as new for a few seconds
    this.bootstrapping = true;
    setTimeout(function () {
        self.bootstrapping = false;
    }, 3000);

    // A list of rooms to enter once we've made room for them (once we've hit the max room limit).
    this._roomQueue = [];

    // TODO: We should make these settable via admin panel

      // Define some constants regarding maximum lengths, client-enforced.
      this.maxLengthUsername = 20;
      this.maxLengthUsernameDisplay = 20;
      this.maxLengthRoomName = this._options.maxLengthRoomName;
      this.maxLengthMessage = this._options.maxLengthMessage;
      this.maxUserSearchResults = 100;

      // Rate limit messages from a given user with some defaults.
      this.$rateLimit = {
        limitCount: 10,         // max number of events
        limitInterval: 10000,   // max interval for above count in milliseconds
        limitWaitTime: this._options.limitWaitTime,   // wait time if a user hits the wait limit
        history: {}
      };


    // Define some useful regexes.
    this.urlPattern = /\b(?:https?|ftp):\/\/[a-z0-9-+&@#\/%?=~_|!:,.;]*[a-z0-9-+&@#\/%=~_|]/gim;
    this.pseudoUrlPattern = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

    this._renderLayout();

    this.commandParsingPlugins = {
      // Dice Roll Plugin
      "dice" : {

        init: function(){
          return;
        },

        process: function(message){
          var _this = this;
          var inputString = message;
          var findme = "/roll";
          var command = inputString.split(" ")[0];
          var sides = inputString.split(" ")[1];

          if (command == findme) {
           message = "/me "+this.rollDice(sides);
          }
          
          return message;
        },

        rollDice: function(numberOfSides) {
          
          if(typeof numberOfSides === 'undefined'){
            return " attempted to roll a dice with no sides! :dodgy:";
          }

        var total = Math.random()*numberOfSides + 1 | 0;
        return "rolls a d"+numberOfSides+" and gets "+ total;
        }

      },

      // Pre-Message Commands
      //
      // To add new commands, create a new object with the name of the command as it would be
      // typed in to the message bar. We pass in the full "message" object so you can do any manipulation needed
      "basic-commands" : {

        init: function(){
          return;
        },

        process: function(message) {
          var _this = this;

          // Dynmically can process any command at the beginning
          // simply based on matching 
          var command = message.split(" ")[0];
          if(typeof _this[command] === 'function')
          {
            // Remove command by default for convinience
            // If people really want it they can reappend it at the beginning
            message = message.slice(command.length);
            message = _this[command].apply(this, Array.prototype.slice.call(arguments, message));
          }

          return message;
        },

        "/help": function(message) {
          MyBB.popupWindow(rootpath+'/misc.php?action=chat_help', null, true); return false;
          return message;
        }

      }
    };

    // Define message parsing plugins
    this.messageParsingPlugins = {
      // Smilies Plugin
      "smilies" : {
        smilies: {},

        init: function(){
          var _this = this;

          // Grab cache if we have
          if(self._storage.isEmpty('smilies'))
          {
            $.ajax({
              url: rootpath+'/xmlhttp.php?action=myfirechat_smilies',
              success: function(data){
                _this.smilies = data;
                self._storage.set('smilies', _this.smilies);
              }
            });
          }
          else
          {
            _this.smilies = self._storage.get('smilies');
          }

        },

        process: function(message){
          var _this = this;

            $.each(_this.smilies, function(key, smily){
            message.message = message.message.replace(new RegExp(_this.escapeRegExp(smily.find), 'g'), "<img src='/"+smily.image+"' />");
          });

            return message;
        },

        escapeRegExp: function(string){
          return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
        }
      },

      // Wordfilter Plugin
      "wordfilter" : {
        wordlist: [],

        init: function(){
          var _this = this;

          // Grab wordfilter from MyBB
          // Grab cache if we have
          if(self._storage.isEmpty('wordlistData'))
          {
            $.ajax({
                url: rootpath+'/xmlhttp.php?action=myfirechat_wordfilter',
                success: function(data){
                    _this.dataToWordList(data);
                    self._storage.set('wordlistData', data);
                  }
              });
          }
          else
          {
            var data = self._storage.get('wordlistData');
            _this.dataToWordList(data);
          }

        },

        dataToWordList: function(data){
          _this = this;

          $.each(data, function(index, wordpair){
            _this.wordlist.push(
             {
                // Convert * to be usable as wildchar for javascript regex
                regex: new RegExp("\\b(?:"+wordpair.badword.replace(/\*/g,'.')+")\\b", 'gi'),
                replacement: wordpair.replacement.length > 0 ? wordpair.replacement : Array(wordpair.badword.length + 1).join("*")
              }
            )
          });
        },

        process: function(message){
          var _this = this;

            $.each(_this.wordlist, function(key, wordpair){
            message.message = message.message.replace(wordpair.regex, wordpair.replacement);
          });

            return message;
        }

     //   escapeRegExp: function(string){
      //     return string.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
      // }
      },

      // MyBB Codes Plugin
      "mybbcodes" : {

        mycodes: [],

        init: function(){
          _this = this;

          // If we don't already have mybbcodes, get them
          if(self._storage.isEmpty('mybbcodesData'))
          {
            $.ajax({
                url: rootpath+'/xmlhttp.php?action=myfirechat_mybbcodes',
                success: function(data){
                  _this.dataToMyCodes(data);
                  self._storage.set('mybbcodesData', data);
                }
              });
          }
          else
          {
            var data = self._storage.get('mybbcodesData');
            _this.dataToMyCodes(data);
          }
        },

        // Because of needing to create and parse regex objects, we just redo this on every page load
        dataToMyCodes: function(data){
           // Basic codes parsing
           $.each(data[0], function(index, mycode){
              var parsedRegex = new RegExp(mycode.regex.substr(1,mycode.regex.lastIndexOf('/') - 1), 'g'+mycode.regex.substr(mycode.regex.lastIndexOf('/') + 1).replace('s','m'));
              _this.mycodes.push({ 
              regex: parsedRegex, 
              replacement: mycode.replacement 
             });
           });

           // Custom codes parsing
           $.each(data[1], function(index, mycode){
              var parsedRegex = new RegExp(mycode.regex, 'g');
              _this.mycodes.push({ 
                regex: parsedRegex, 
                replacement: mycode.replacement 
              });
          });

        },

        process: function(message){
          var _this = this;

          // Basic MyCodes
            $.each(_this.mycodes, function(index, mycode){
            message.message = message.message.replace(mycode.regex, mycode.replacement);
          });

          // Custom MyCodes

            return message;
        },
      },

      // Message Display Commands
      //
      // To add new commands, create a new object with the name of the command as it would be
      // typed in to the message bar. We pass in the full "message" object so you can do any manipulation needed
      "commands" : {

        init: function(){
          return;
        },

        process: function(message) {
          var _this = this;

          // Dynmically can process any command at the beginning
          // simply based on matching 
          var command = message.message.split(" ")[0];
          if(typeof _this[command] === 'function')
          {
            // Remove command by default for convinience
            // If people really want it they can reappend it at the beginning
            message.message = message.message.slice(command.length);
            message = _this[command].apply(this, Array.prototype.slice.call(arguments, message));
          }

          return message;
        },

        "/me": function(message) {
          message.message = "<i>"+ message.name + " " + message.message +"</i>";
          return message;
        }

      }

    };


    // Grab shortcuts to commonly used jQuery elements.
    this.$wrapper = $('#firechat');
    this.$roomList = $('#firechat-room-list');
    this.$tabList = $('#firechat-tab-list');
    this.$tabContent = $('#firechat-tab-content');
    this.$messages = {};

    // Setup UI bindings for chat controls.
    this._bindUIEvents();

    // Setup bindings to internal methods
    this._bindDataEvents();
  }

  // Run FirechatUI in *noConflict* mode, returning the `FirechatUI` variable to
  // its previous owner, and returning a reference to the FirechatUI object.
  FirechatUI.noConflict = function noConflict() {
    root.FirechatUI = previousFirechatUI;
    return FirechatUI;
  };

  FirechatUI.prototype = {

    _bindUIEvents: function() {
      // Chat-specific custom interactions and functionality.
      this._bindForHeightChange();
      this._bindForTabControls();
      this._bindForRoomList();
      this._bindForUserRoomList();
      this._bindForUserSearch();
      this._bindForUserMuting();
      this._bindForChatInvites();
      this._bindForRoomListing();

      // Generic, non-chat-specific interactive elements.
      this._setupTabs();
      this._setupDropdowns();
      this._bindTextInputFieldLimits();
    },

    _bindDataEvents: function() {
      this._chat.on('user-update', this._onUpdateUser.bind(this));

      // Bind events for new messages, enter / leaving rooms, and user metadata.
      this._chat.on('room-enter', this._onEnterRoom.bind(this));
      this._chat.on('room-exit', this._onLeaveRoom.bind(this));
      this._chat.on('message-add', this._onNewMessage.bind(this));
      this._chat.on('message-remove', this._onRemoveMessage.bind(this));

      // Bind events related to chat invitations.
      this._chat.on('room-invite', this._onChatInvite.bind(this));
      this._chat.on('room-invite-response', this._onChatInviteResponse.bind(this));

      // Binds events related to admin or moderator notifications.
      this._chat.on('notification', this._onNotification.bind(this));
    },

    _renderLayout: function() {
      var template = FirechatDefaultTemplates["templates/layout-full.html"];
      $(this._el).html(template({
        maxLengthUsername: this.maxLengthUsername
      }));
    },

    _onUpdateUser: function(user) {
      // Update our current user state and render latest user name.
      this._user = user;

      // Update our interface to reflect which users are muted or not.
      var mutedUsers = this._user.muted || {};
      $('[data-event="firechat-user-mute-toggle"]').each(function(i, el) {
        var userId = $(this).closest('[data-user-id]').data('user-id');
        $(this).toggleClass('red', !!mutedUsers[userId]);
      });

      // Ensure that all messages from muted users are removed.
      for (var userId in mutedUsers) {
        $('.message[data-user-id="' + userId + '"]').fadeOut();
      }
    },

    _onEnterRoom: function(room) {
      this.attachTab(room.id, room.name);
    },
    _onLeaveRoom: function(roomId) {
      this.removeTab(roomId);

      // Auto-enter rooms in the queue
      if ((this._roomQueue.length > 0)) {
        this._chat.enterRoom(this._roomQueue.shift(roomId));
      }
    },
    _onNewMessage: function(roomId, message) {
      var userId = message.userId;
      if (!this._user || !this._user.muted || !this._user.muted[userId]) {
        
        // If we are not currently on this tab, then increse message count
        if(!$('#firechat-tab-list').children('[data-room-id=' + roomId + ']').hasClass('active') && !this.bootstrapping){
          var messageCount = $('#firechat-tab-list').children('[data-room-id=' + roomId + ']').find('.message-badge').first().text();

          if(messageCount == ""){
            messageCount = 1;
          }
          else{
            messageCount = parseInt(messageCount) + 1;  
          }

          $('#firechat-tab-list').children('[data-room-id=' + roomId + ']').find('.message-badge').first().text(messageCount);
          $('#firechat-tab-list').children('[data-room-id=' + roomId + ']').find('.message-badge').first().removeClass('hidden');
        }

        if(!myfirechat_window_active){
          matches = document.title.match(/\[(.*?)\]/);
          if(matches){
            count = parseInt(matches[1]) + 1;
            document.title = "["+ count +"] "+myfirechat_original_title;
          }
          else{
            document.title = "[1] "+document.title;
          }
        }
        
        this.showMessage(roomId, message);
      }
    },
    _onRemoveMessage: function(roomId, messageId) {
      this.removeMessage(roomId, messageId);
    },

    // Events related to chat invitations.
    _onChatInvite: function(invitation) {
      var self = this;
      var template = FirechatDefaultTemplates["templates/prompt-invitation.html"];
      var $prompt = this.prompt('Invite', template(invitation));
      $prompt.find('a.close').click(function() {
        $prompt.remove();
        self._chat.declineInvite(invitation.id);
        return false;
      });

      $prompt.find('[data-toggle=accept]').click(function() {
        $prompt.remove();
        self._chat.acceptInvite(invitation.id);
        return false;
      });

      $prompt.find('[data-toggle=decline]').click(function() {
        $prompt.remove();
        self._chat.declineInvite(invitation.id);
        return false;
      });
    },
    _onChatInviteResponse: function(invitation) {
      if (!invitation.status) return;

      var self = this,
          template = FirechatDefaultTemplates["templates/prompt-invite-reply.html"],
          $prompt;

      if (invitation.status && invitation.status === 'accepted') {
        $prompt = this.prompt('Accepted', template(invitation));
        this._chat.getRoom(invitation.roomId, function(room) {
          self.attachTab(invitation.roomId, room.name);
        });
      } else {
        $prompt = this.prompt('Declined', template(invitation));
      }

      $prompt.find('a.close').click(function() {
        $prompt.remove();
        return false;
      });
    },

    // Events related to admin or moderator notifications.
    _onNotification: function(notification) {
      if (notification.notificationType === 'warning') {
        this.renderAlertPrompt('Warning', 'You are being warned for inappropriate messaging. Further violation may result in temporary or permanent ban of service.');
      } else if (notification.notificationType === 'suspension') {
        var suspendedUntil = notification.data.suspendedUntil,
            secondsLeft = Math.round((suspendedUntil - new Date().getTime()) / 1000),
            timeLeft = '';

        if (secondsLeft > 0) {
          if (secondsLeft > 2*3600) {
            var hours = Math.floor(secondsLeft / 3600);
            timeLeft = hours + ' hours, ';
            secondsLeft -= 3600*hours;
          }
          timeLeft += Math.floor(secondsLeft / 60) + ' minutes';
          this.renderAlertPrompt('Suspended', 'A moderator has suspended you for violating site rules. You cannot send messages for another ' + timeLeft + '.');
        }
      }
    }
  };

  /**
   * Initialize an authenticated session with a user id and name.
   * This method assumes that the underlying Firebase reference has
   * already been authenticated.
   */
  FirechatUI.prototype.setUser = function(userId, userName, avatar) {
    var self = this;

    // Initialize data events
    self._chat.setUser(userId, userName, avatar, function(user) {
      self._user = user;

      if (self._chat.userIsModerator()) {
        self._bindSuperuserUIEvents();
      }

      self._chat.resumeSession();
    });
  };

  /**
   * Exposes internal chat bindings via this external interface.
   */
  FirechatUI.prototype.on = function(eventType, cb) {
    var self = this;

    this._chat.on(eventType, cb);
  };

  /**
   * Binds a custom context menu to messages for superusers to warn or ban
   * users for violating terms of service.
   */
  FirechatUI.prototype._bindSuperuserUIEvents = function() {
    var self = this,
        parseMessageVars = function(event) {
          var $this = $(this),
          messageId = $this.closest('[data-message-id]').data('message-id'),
          userId = $('[data-message-id="' + messageId + '"]').closest('[data-user-id]').data('user-id'),
          roomId = $('[data-message-id="' + messageId + '"]').closest('[data-room-id]').data('room-id');

          return { messageId: messageId, userId: userId, roomId: roomId };
        },
        clearMessageContextMenus = function() {
          // Remove any context menus currently showing.
          $('[data-toggle="firechat-contextmenu"]').each(function() {
            $(this).remove();
          });

          // Remove any messages currently highlighted.
          $('#firechat .message.highlighted').each(function() {
            $(this).removeClass('highlighted');
          });
        },
        showMessageContextMenu = function(event) {
          var $this = $(this),
              $message = $this.closest('[data-message-id]'),
              template = FirechatDefaultTemplates["templates/message-context-menu.html"],
              messageVars = parseMessageVars.call(this, event),
              $template;

          event.preventDefault();

          // Clear existing menus.
          clearMessageContextMenus();

          // Highlight the relevant message.
          $this.addClass('highlighted');

          self._chat.getRoom(messageVars.roomId, function(room) {
            // Show the context menu.
            $template = $(template({
              id: $message.data('message-id')
            }));
            $template.css({
              left: event.clientX,
              top: event.clientY
            }).appendTo(self.$wrapper);
          });
        };

    // Handle dismissal of message context menus (any non-right-click click event).
    $(document).bind('click', { self: this }, function(event) {
      if (!event.button || event.button != 2) {
        clearMessageContextMenus();
      }
    });

    // Handle display of message context menus (via right-click on a message).
    $(document).delegate('[data-class="firechat-message"]', 'contextmenu', showMessageContextMenu);

    // Handle click of the 'Warn User' contextmenu item.
    $(document).delegate('[data-event="firechat-user-warn"]', 'click', function(event) {
      var messageVars = parseMessageVars.call(this, event);
      self._chat.warnUser(messageVars.userId);
    });

    // Handle click of the 'Suspend User (1 Hour)' contextmenu item.
    $(document).delegate('[data-event="firechat-user-suspend-hour"]', 'click', function(event) {
      var messageVars = parseMessageVars.call(this, event);
      self._chat.suspendUser(messageVars.userId, /* 1 Hour = 3600s */ 60*60);
    });

    // Handle click of the 'Suspend User (1 Day)' contextmenu item.
    $(document).delegate('[data-event="firechat-user-suspend-day"]', 'click', function(event) {
      var messageVars = parseMessageVars.call(this, event);
      self._chat.suspendUser(messageVars.userId, /* 1 Day = 86400s */ 24*60*60);
    });

    // Handle click of the 'Delete Message' contextmenu item.
    $(document).delegate('[data-event="firechat-message-delete"]', 'click', function(event) {
      var messageVars = parseMessageVars.call(this, event);
      self._chat.deleteMessage(messageVars.roomId, messageVars.messageId);
    });
  };

  /**
   * Binds to height changes in the surrounding div.
   */
  FirechatUI.prototype._bindForHeightChange = function() {
    var self = this,
        $el = $(this._el),
        lastHeight = null;

    setInterval(function() {
      var height = $el.height();
      if (height != lastHeight) {
        lastHeight = height;
        $('.chat').each(function(i, el) {

        });
      }
    }, 500);
  };

  /**
   * Binds custom inner-tab events.
   */
  FirechatUI.prototype._bindForTabControls = function() {
    var self = this;

    // Handle click of tab close button.
    $(document).delegate('[data-event="firechat-close-tab"]', 'click', function(event) {
      var roomId = $(this).closest('[data-room-id]').data('room-id');
      self._chat.leaveRoom(roomId);
      return false;
    });

    var i = 0; // Record variable.
    // Handle click of tab close button.
    $(document).delegate('.load-more', 'click', function(event) {
      var roomId = $(this).closest('[data-room-id]').data('room-id');
      var closestMessage = self.$messages[roomId][0].children[1];
      

    // Pagination.
    var n = self._options.numMaxMessages;

      i += n; // Record pagination updates.
      var messagesRef = self._chat._messageRef.child(roomId); 
      moreMessagesQuery = messagesRef; // Firebase reference.
      moreMessagesQuery.on('value', function (snapshot) {
        var data = snapshot.exportVal(); // Fetch all data from Firebase as an Object.
        var keys = Object.keys(data).reverse(); // Due to the Keys are ordered from the oldest to the newest, it nessesary to change its sequence in order to display Firebase data snapshots properly.
        var total_keys = Object.keys(data).length;
        var k = keys[i]; // Key from where to start counting. Be careful what Key you pick.

        if (i < total_keys) { // Stop displaying messages when it reach the last one.
          var messages = [];
          lastMessagesQuery = messagesRef.orderByKey().endAt(k).limitToLast(n); // Messages from a Key to the oldest.

          lastMessagesQuery.on('child_added', function (snapshot) {
            var message = snapshot.val();
            messages.push(message);
          });

          messages.reverse();

          $.each(messages, function(key, message){
           self.showMessage(roomId, message, true);
          }); 

          
        }  
      });

      return false;
    });

  };


  /**
   * Binds room list dropdown to populate room list on-demand.
   */
  FirechatUI.prototype._bindForRoomList = function() {
    var self = this;

    $('#firechat-btn-rooms').bind('click', function() {
      if ($(this).parent().hasClass('open')) {
        return;
      }

      var $this = $(this),
          template = FirechatDefaultTemplates["templates/room-list-item.html"],
          selectRoomListItem = function() {
            var parent = $(this).parent(),
                roomId = parent.data('room-id'),
                roomName = parent.data('room-name');

            if (self.$messages[roomId]) {
              self.focusTab(roomId);
            } else {
              self._chat.enterRoom(roomId, roomName);
            }
            return false;
          };

      self._chat.getRoomList(function(rooms) {
        self.$roomList.empty();
        for (var roomId in rooms) {
          var room = rooms[roomId];
          if (room.type != "public") continue;
          room.isRoomOpen = !!self.$messages[room.id];
          var $roomItem = $(template(room));
          $roomItem.children('a').bind('click', selectRoomListItem);
          self.$roomList.append($roomItem.toggle(true));
        }
      });
    });
  };

  /**
   * Binds user list dropdown per room to populate user list on-demand.
   */
  FirechatUI.prototype._bindForUserRoomList = function() {
    var self = this;

    // Upon click of the dropdown, autofocus the input field and trigger list population.
    $(document).delegate('[data-event="firechat-user-room-list-btn"]', 'click', function(event) {
      event.stopPropagation();

      var $this = $(this),
          roomId = $this.closest('[data-room-id]').data('room-id'),
          template = FirechatDefaultTemplates["templates/room-user-list-item.html"],
          targetId = $this.data('target'),
          $target = $('#' + targetId);

      $target.empty();
      self._chat.getUsersByRoom(roomId, function(users) {
        for (var username in users) {
          user = users[username];
          user.disableActions = (!self._user || user.id === self._user.id);
          user.nameTrimmed = self.trimWithEllipsis(user.name, self.maxLengthUsernameDisplay);
          user.isMuted = (self._user && self._user.muted && self._user.muted[user.id]);
          $target.append($(template(user)));
        }
        self.sortListLexicographically('#' + targetId);
      });
    });
  };

  /**
   * Binds user search buttons, dropdowns, and input fields for searching all
   * active users currently in chat.
   */
  FirechatUI.prototype._bindForUserSearch = function() {
    var self = this,
        handleUserSearchSubmit = function(event) {
          var $this = $(this),
              targetId = $this.data('target'),
              controlsId = $this.data('controls'),
              templateId = $this.data('template'),
              prefix = $this.val() || $this.data('prefix') || '',
              startAt = $this.data('startAt') || null,
              endAt = $this.data('endAt') || null;

          event.preventDefault();

          userSearch(targetId, templateId, controlsId, prefix, startAt, endAt);
        },
        userSearch = function(targetId, templateId, controlsId, prefix, startAt, endAt) {
          var $target = $('#' + targetId),
              $controls = $('#' + controlsId),
              template = FirechatDefaultTemplates[templateId];

          // Query results, filtered by prefix, using the defined startAt and endAt markets.
          self._chat.getUsersByPrefix(prefix, startAt, endAt, self.maxUserSearchResults, function(users) {
            var numResults = 0,
                $prevBtn, $nextBtn, username, firstResult, lastResult;

            $target.empty();

            for (username in users) {
              var user = users[username];

              // Disable buttons for <me>.
              user.disableActions = (!self._user || user.id === self._user.id);

              numResults += 1;

              $target.append(template(user));

              // If we've hit our result limit, the additional value signifies we should paginate.
              if (numResults === 1) {
                firstResult = user.name.toLowerCase();
              } else if (numResults >= self.maxUserSearchResults) {
                lastResult = user.name.toLowerCase();
                break;
              }
            }

            if ($controls) {
              $prevBtn = $controls.find('[data-toggle="firechat-pagination-prev"]');
              $nextBtn = $controls.find('[data-toggle="firechat-pagination-next"]');

              // Sort out configuration for the 'next' button
              if (lastResult) {
                $nextBtn
                  .data('event', 'firechat-user-search')
                  .data('startAt', lastResult)
                  .data('prefix', prefix)
                  .removeClass('disabled').removeAttr('disabled');
              } else {
                $nextBtn
                  .data('event', null)
                  .data('startAt', null)
                  .data('prefix', null)
                  .addClass('disabled').attr('disabled', 'disabled');
              }
            }
          });
        };

    $(document).delegate('[data-event="firechat-user-search"]', 'keyup', handleUserSearchSubmit);
    $(document).delegate('[data-event="firechat-user-search"]', 'click', handleUserSearchSubmit);

    // Upon click of the dropdown, autofocus the input field and trigger list population.
    $(document).delegate('[data-event="firechat-user-search-btn"]', 'click', function(event) {
      event.stopPropagation();
      var $input = $(this).next('div.firechat-dropdown-menu').find('input');
      $input.focus();
      $input.trigger(jQuery.Event('keyup'));
    });

    // Ensure that the dropdown stays open despite clicking on the input element.
    $(document).delegate('[data-event="firechat-user-search"]', 'click', function(event) {
      event.stopPropagation();
    });
  };

  /**
   * Binds user mute toggles and removes all messages for a given user upon mute.
   */
  FirechatUI.prototype._bindForUserMuting = function() {
    var self = this;
    $(document).delegate('[data-event="firechat-user-mute-toggle"]', 'click', function(event) {
      var $this = $(this),
          userId = $this.closest('[data-user-id]').data('user-id'),
          userName = $this.closest('[data-user-name]').data('user-name'),
          isMuted = $this.hasClass('red'),
          template = FirechatDefaultTemplates["templates/prompt-user-mute.html"];

      event.preventDefault();

      // Require user confirmation for muting.
      if (!isMuted) {
        var $prompt = self.prompt('Mute User?', template({
          userName: userName
        }));

        $prompt.find('a.close').first().click(function() {
          $prompt.remove();
          return false;
        });

        $prompt.find('[data-toggle=decline]').first().click(function() {
          $prompt.remove();
          return false;
        });

        $prompt.find('[data-toggle=accept]').first().click(function() {
          self._chat.toggleUserMute(userId);
          $prompt.remove();
          return false;
        });
      } else {
        self._chat.toggleUserMute(userId);
      }
    });
  };

  /**
   * Binds to elements with the data-event='firechat-user-(private)-invite' and
   * handles invitations as well as room creation and entering.
   */
  FirechatUI.prototype._bindForChatInvites = function() {
    var self = this,
        renderInvitePrompt = function(event) {
          var $this = $(this),
              userId = $this.closest('[data-user-id]').data('user-id'),
              roomId = $this.closest('[data-room-id]').data('room-id'),
              userName = $this.closest('[data-user-name]').data('user-name'),
              template = FirechatDefaultTemplates["templates/prompt-invite-private.html"],
              $prompt;

          self._chat.getRoom(roomId, function(room) {
            $prompt = self.prompt('Invite', template({
              userName: userName,
              roomName: room.name
            }));

            $prompt.find('a.close').click(function() {
              $prompt.remove();
              return false;
            });

            $prompt.find('[data-toggle=decline]').click(function() {
              $prompt.remove();
              return false;
            });

            $prompt.find('[data-toggle=accept]').first().click(function() {
              $prompt.remove();
              self._chat.inviteUser(userId, roomId, room.name);
              return false;
            });
            return false;
          });
          return false;
        },
        renderPrivateInvitePrompt = function(event) {
          var $this = $(this),
              userId = $this.closest('[data-user-id]').data('user-id'),
              userName = $this.closest('[data-user-name]').data('user-name'),
              template = FirechatDefaultTemplates["templates/prompt-invite-private.html"],
              $prompt;

          if (userId && userName) {
            $prompt = self.prompt('Private Invite', template({
              userName: userName,
              roomName: 'Private Chat'
            }));

            $prompt.find('a.close').click(function() {
              $prompt.remove();
              return false;
            });

            $prompt.find('[data-toggle=decline]').click(function() {
              $prompt.remove();
              return false;
            });

            $prompt.find('[data-toggle=accept]').first().click(function() {
              $prompt.remove();
              var roomName = 'Private Chat';
              self._chat.createRoom(roomName, 'private', function(roomId) {
                self._chat.inviteUser(userId, roomId, roomName);
              });
              return false;
            });
          }
          return false;
        };

    $(document).delegate('[data-event="firechat-user-chat"]', 'click', renderPrivateInvitePrompt);
    $(document).delegate('[data-event="firechat-user-invite"]', 'click', renderInvitePrompt);
  };

  /**
   * Binds to room dropdown button, menu items, and create room button.
   */
  FirechatUI.prototype._bindForRoomListing = function() {
    var self = this,
        $createRoomPromptButton = $('#firechat-btn-create-room-prompt'),
        $createRoomButton = $('#firechat-btn-create-room'),
        renderRoomList = function(event) {
          var type = $(this).data('room-type');

          self.sortListLexicographically('#firechat-room-list');
        };

    // Handle click of the create new room prompt-button.
    $createRoomPromptButton.bind('click', function(event) {
      self.promptCreateRoom();
      return false;
    });

    // Handle click of the create new room button.
    $createRoomButton.bind('click', function(event) {
      var roomName = $('#firechat-input-room-name').val();
      $('#firechat-prompt-create-room').remove();
      self._chat.createRoom(roomName);
      return false;
    });
  };

  /**
   * A stripped-down version of bootstrap-tab.js.
   *
   * Original bootstrap-tab.js Copyright 2012 Twitter, Inc.,licensed under the Apache v2.0
   */
  FirechatUI.prototype._setupTabs = function() {
    var self = this,
        show = function($el) {
          var $this = $el,
              $ul = $this.closest('ul:not(.firechat-dropdown-menu)'),
              selector = $this.attr('data-target'),
              previous = $ul.find('.active:last a')[0],
              $target,
              e;

          if (!selector) {
            selector = $this.attr('href');
            selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '');
          }

          if ($this.parent('li').hasClass('active')) return;

          e = $.Event('show', { relatedTarget: previous });

          $this.trigger(e);

          if (e.isDefaultPrevented()) return;

          $target = $(selector);

          activate($this.parent('li'), $ul);
          activate($target, $target.parent(), function () {
            $this.trigger({
              type: 'shown',
              relatedTarget: previous
            });
          });
        },
        activate = function (element, container, callback) {
          var $active = container.find('> .active'),
              transition = callback && $.support.transition && $active.hasClass('fade');

          function next() {
            $active
              .removeClass('active')
              .find('> .firechat-dropdown-menu > .active')
              .removeClass('active');

            element.addClass('active');

            if (transition) {
              element.addClass('in');
            } else {
              element.removeClass('fade');
            }

            if (element.parent('.firechat-dropdown-menu')) {
              element.closest('li.firechat-dropdown').addClass('active');
            }

            if (callback) {
              callback();
            }
          }

          if (transition) {
            $active.one($.support.transition.end, next);
          } else {
            next();
          }

          $active.removeClass('in');
      };

    $(document).delegate('[data-toggle="firechat-tab"]', 'click', function(event) {
      event.preventDefault();
      show($(this));
    });
  };

  /**
   * A stripped-down version of bootstrap-dropdown.js.
   *
   * Original bootstrap-dropdown.js Copyright 2012 Twitter, Inc., licensed under the Apache v2.0
   */
  FirechatUI.prototype._setupDropdowns = function() {
    var self = this,
        toggle = '[data-toggle=firechat-dropdown]',
        toggleDropdown = function(event) {
          var $this = $(this),
              $parent = getParent($this),
              isActive = $parent.hasClass('open');

          if ($this.is('.disabled, :disabled')) return;

          clearMenus();

          if (!isActive) {
            $parent.toggleClass('open');
          }

          $this.focus();

          return false;
        },
        clearMenus = function() {
          $('[data-toggle=firechat-dropdown]').each(function() {
            getParent($(this)).removeClass('open');
          });
        },
        getParent = function($this) {
          var selector = $this.attr('data-target'),
              $parent;

          if (!selector) {
            selector = $this.attr('href');
            selector = selector && /#/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '');
          }

          $parent = selector && $(selector);

          if (!$parent || !$parent.length) $parent = $this.parent();

          return $parent;
        };

      $(document)
        .bind('click', clearMenus)
        .delegate('.firechat-dropdown-menu', 'click', function(event) { event.stopPropagation(); })
        .delegate('[data-toggle=firechat-dropdown]', 'click', toggleDropdown);
  };

  /**
   * Binds to any text input fields with data-provide='limit' and
   * data-counter='<selector>', and upon value change updates the selector
   * content to reflect the number of characters remaining, as the 'maxlength'
   * attribute less the current value length.
   */
  FirechatUI.prototype._bindTextInputFieldLimits = function() {
    $('body').delegate('input[data-provide="limit"], textarea[data-provide="limit"]', 'keyup', function(event) {
      var $this = $(this),
          $target = $($this.data('counter')),
          limit = $this.attr('maxlength'),
          count = $this.val().length;

      $target.html(Math.max(0, limit - count));
    });
  };

  /**
   * Given a title and message content, show an alert prompt to the user.
   *
   * @param    {string}    title
   * @param    {string}    message
   */
  FirechatUI.prototype.renderAlertPrompt = function(title, message) {
    var template = FirechatDefaultTemplates["templates/prompt-alert.html"],
        $prompt = this.prompt(title, template({ message: message }));

      $prompt.find('.close').click(function() {
        $prompt.remove();
        return false;
      });
      return;
  };

  /**
   * Toggle input field s if we want limit / unlimit input fields.
   */
  FirechatUI.prototype.toggleInputs = function(isEnabled) {
    $('#firechat-tab-content textarea').each(function() {
      var $this = $(this);
      if (isEnabled) {
        $(this).val('');
      } else {
        $(this).val('You have exceeded the message limit, please wait before sending.');
      }
      $this.prop('disabled', !isEnabled);
    });
    $('#firechat-input-name').prop('disabled', !isEnabled);
  };

  /**
   * Given a room id and name, attach the tab to the interface and setup events.
   *
   * @param    {string}    roomId
   * @param    {string}    roomName
   */
  FirechatUI.prototype.attachTab = function(roomId, roomName) {
    var self = this;

    // If this tab already exists, give it focus.
    if (this.$messages[roomId]) {
      this.focusTab(roomId);
      return;
    }

    var room = {
      id: roomId,
      name: roomName
    };

    // Populate and render the tab content template.
    var tabTemplate = FirechatDefaultTemplates["templates/tab-content.html"];
    var $tabContent = $(tabTemplate(room));
    this.$tabContent.prepend($tabContent);
    var $messages = $('#firechat-messages' + roomId);

    // Keep a reference to the message listing for later use.
    this.$messages[roomId] = $messages;

    // Attach on-enter event to textarea.
    var $textarea = $tabContent.find('textarea').first();
    $textarea.bind('keydown', function(e) {
      
      var message = self.trimWithEllipsis($textarea.val(), self.maxLengthMessage);
        
      if ((e.which === 13) && (message !== '')) {
        
        $.each(self.commandParsingPlugins, function(pluginName, plugin){
        message = plugin.process(message);
      });

        $textarea.val('');

        if(message.length > 0 )
        {
          self._chat.sendMessage(roomId, message);  
        }
      

        return false;
      }
    });

    // Populate and render the tab menu template.
    var tabListTemplate = FirechatDefaultTemplates["templates/tab-menu-item.html"];
    var $tab = $(tabListTemplate(room));
    this.$tabList.prepend($tab);

    // Attach on-shown event to move tab to front and scroll to bottom.
    $tab.bind('shown', function(event) {
      $messages.scrollTop($messages[0].scrollHeight);
      $tab.find('.message-badge').first().text("");
      $tab.find('.message-badge').first().addClass('hidden');

    });

    // Dynamically update the width of each tab based upon the number open.
    var tabs = this.$tabList.children('li');
    var tabWidth = Math.floor($('#firechat-tab-list').width() / tabs.length);
    this.$tabList.children('li').css('width', tabWidth);

    // Update the room listing to reflect that we're now in the room.
    this.$roomList.children('[data-room-id=' + roomId + ']').children('a').addClass('highlight');

    // Sort each item in the user list alphabetically on click of the dropdown.
    $('#firechat-btn-room-user-list-' + roomId).bind('click', function() {
      self.sortListLexicographically('#firechat-room-user-list-' + roomId);
      return false;
    });

    // Automatically select the new tab.
    this.focusTab(roomId);
  };

  /**
   * Given a room id, focus the given tab.
   *
   * @param    {string}    roomId
   */
  FirechatUI.prototype.focusTab = function(roomId) {
    if (this.$messages[roomId]) {
      var $tabLink = this.$tabList.find('[data-room-id=' + roomId + ']').find('a');
      if ($tabLink.length) {
        $tabLink.first().trigger('click');
      }
    }
  };

  /**
   * Given a room id, remove the tab and all child elements from the interface.
   *
   * @param    {string}    roomId
   */
  FirechatUI.prototype.removeTab = function(roomId) {
    delete this.$messages[roomId];

    // Remove the inner tab content.
    this.$tabContent.find('[data-room-id=' + roomId + ']').remove();

    // Remove the tab from the navigation menu.
    this.$tabList.find('[data-room-id=' + roomId + ']').remove();

    // Dynamically update the width of each tab based upon the number open.
    var tabs = this.$tabList.children('li');
    var tabWidth = Math.floor($('#firechat-tab-list').width() / tabs.length);
    this.$tabList.children('li').css('width', tabWidth);

    // Automatically select the next tab if there is one.
    this.$tabList.find('[data-toggle="firechat-tab"]').first().trigger('click');

    // Update the room listing to reflect that we're now in the room.
    this.$roomList.children('[data-room-id=' + roomId + ']').children('a').removeClass('highlight');
  };

  /**
   * Render a new message in the specified chat room.
   *
   * @param    {string}    roomId
   * @param    {string}    message
   */
  FirechatUI.prototype.showMessage = function(roomId, rawMessage, prepend) {
    var self = this;

    // Setup defaults
    var message = {
      id              : rawMessage.id,
      localtime       : self.formatTime(rawMessage.timestamp),
      message         : rawMessage.message || '',
      userId          : rawMessage.userId,
      name            : rawMessage.name,
      avatar          : rawMessage.avatar || '',
      type            : rawMessage.type || 'default',
      isSelfMessage   : (self._user && rawMessage.userId == self._user.id),
      disableActions  : (!self._user || rawMessage.userId == self._user.id),
      timestamp       : rawMessage.timestamp
    };

    // While other data is escaped in the Underscore.js templates, escape and
    // process the message content here to add additional functionality (add links).
    // Also trim the message length to some client-defined maximum.
    var messageConstructed = '';
    
    message.message = _.map(message.message.split(' '), function(token) {
      if (self.urlPattern.test(token) || self.pseudoUrlPattern.test(token)) {
        return self.linkify(encodeURI(token));
      } else {
        return _.escape(token);
      }
    }).join(' ');

    // Easily extendable message processing
    $.each(self.messageParsingPlugins, function(pluginName, plugin){
      message = plugin.process(message);
    });

    message.message = self.trimWithEllipsis(message.message, self.maxLengthMessage);

    // Populate and render the message template.
    var template = FirechatDefaultTemplates["templates/message.html"];
    var $message = $(template(message));
    var $messages = self.$messages[roomId];
    if ($messages) {

      var scrollToBottom = false;
      if ($messages.scrollTop() / ($messages[0].scrollHeight - $messages[0].offsetHeight) >= 0.95) {
        // Pinned to bottom
        scrollToBottom = true;
      } else if ($messages[0].scrollHeight <= $messages.height()) {
        // Haven't added the scrollbar yet
        scrollToBottom = true;
      }

      if(prepend)
        $messages.prepend($message);
      else
        $messages.append($message);

      if (scrollToBottom) {
        $messages.scrollTop($messages[0].scrollHeight);
      }
    }
  };

  /**
   * Remove a message by id.
   *
   * @param    {string}    roomId
   * @param    {string}    messageId
   */
  FirechatUI.prototype.removeMessage = function(roomId, messageId) {
    $('.message[data-message-id="' + messageId + '"]').remove();
  };

  /**
   * Given a selector for a list element, sort the items alphabetically.
   *
   * @param    {string}    selector
   */
  FirechatUI.prototype.sortListLexicographically = function(selector) {
    $(selector).children("li").sort(function(a, b) {
        var upA = $(a).text().toUpperCase();
        var upB = $(b).text().toUpperCase();
        return (upA < upB) ? -1 : (upA > upB) ? 1 : 0;
    }).appendTo(selector);
  };

  /**
   * Remove leading and trailing whitespace from a string and shrink it, with
   * added ellipsis, if it exceeds a specified length.
   *
   * @param    {string}    str
   * @param    {number}    length
   * @return   {string}
   */
  FirechatUI.prototype.trimWithEllipsis = function(str, length) {
    str = str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
    return (length && str.length <= length) ? str : str.substring(0, length) + '...';
  };

  /**
   * Given a timestamp, format it in the form hh:mm am/pm. Defaults to now
   * if the timestamp is undefined.
   *
   * @param    {Number}    timestamp
   * @param    {string}    date
   */
  FirechatUI.prototype.formatTime = function(timestamp) {
    var date = (timestamp) ? new Date(timestamp) : new Date(),
        hours = date.getHours() || 12,
        minutes = '' + date.getMinutes(),
        ampm = (date.getHours() >= 12) ? 'pm' : 'am';

        // Get the Date
        var months = new Array(12);
        months[0] = "January";
        months[1] = "February";
        months[2] = "March";
        months[3] = "April";
        months[4] = "May";
        months[5] = "June";
        months[6] = "July";
        months[7] = "August";
        months[8] = "September";
        months[9] = "October";
        months[10] = "November";
        months[11] = "December";
        day = date.getDate();
        month = months[date.getMonth()];
        year = date.getFullYear();

    hours = (hours > 12) ? hours - 12 : hours;
    minutes = (minutes.length < 2) ? '0' + minutes : minutes;
    return '' + day + ' ' + month + ' ' + year + ', ' + hours + ':' + minutes + ampm;
  };

  /**
   * Launch a prompt to allow the user to create a new room.
   */
  FirechatUI.prototype.promptCreateRoom = function() {
    var self = this;
    var template = FirechatDefaultTemplates["templates/prompt-create-room.html"];

    var $prompt = this.prompt('Create Public Room', template({
      maxLengthRoomName: this.maxLengthRoomName,
      isModerator: self._chat.userIsModerator()
    }));
    $prompt.find('a.close').first().click(function() {
      $prompt.remove();
      return false;
    });


    $prompt.find('[data-toggle=submit]').first().click(function() {
      var name = $prompt.find('[data-input=firechat-room-name]').first().val();
      if (name !== '') {
        self._chat.createRoom(name, 'public');
        $prompt.remove();
      }
      return false;
    });

    $prompt.find('[data-input=firechat-room-name]').first().focus();
    $prompt.find('[data-input=firechat-room-name]').first().bind('keydown', function(e) {
      if (e.which === 13) {
        var name = $prompt.find('[data-input=firechat-room-name]').first().val();
        if (name !== '') {
          self._chat.createRoom(name, 'public');
          $prompt.remove();
          return false;
        }
      }
    });
  };

  /**
   * Inner method to launch a prompt given a specific title and HTML content.
   * @param    {string}    title
   * @param    {string}    content
   */
  FirechatUI.prototype.prompt = function(title, content) {
    var template = FirechatDefaultTemplates["templates/prompt.html"],
        $prompt;

    $prompt = $(template({
      title: title,
      content: content
    })).css({
      top: this.$wrapper.position().top + (0.333 * this.$wrapper.height()),
      left: this.$wrapper.position().left + (0.125 * this.$wrapper.width()),
      width: 0.75 * this.$wrapper.width()
    });
    this.$wrapper.append($prompt.removeClass('hidden'));
    return $prompt;
  };

  // see http://stackoverflow.com/questions/37684/how-to-replace-plain-urls-with-links
  FirechatUI.prototype.linkify = function(str) {
    var self = this;
    return str
      .replace(self.urlPattern, '<a target="_blank" href="$&">$&</a>')
      .replace(self.pseudoUrlPattern, '$1<a target="_blank" href="http://$2">$2</a>');
  };

})(jQuery);