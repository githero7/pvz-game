var $User = function() {
	var a = navigator.platform,
	e = navigator.userAgent,
	c = (a == "Win32" || a == "Windows"),
	d = (a == "Mac68K" || a == "MacPPC" || a == "Macintosh"),
	b = (a == "X11" && !c && !d),
	f = c || d || b;
	return {
		Browser: {
			IE: !!(window.attachEvent && !window.opera),
			IE6: !!(window.attachEvent && !window.opera) && !window.XMLHttpRequest,
			Opera: !!window.opera,
			WebKit: e.indexOf("AppleWebKit/") > -1,
			Gecko: e.indexOf("Gecko") > -1 && e.indexOf("KHTML") == -1
		},
		System: {
			Win: c,
			Mac: d,
			Unix: b
		},
		Client: {
			PC: f,
			Mobile: !f
		},
		HTTP: location.protocol.toLowerCase() == "http:" ? 1 : 0,
		AuthorWebsite: false
	}
} (),
oSym = {
	Init: function(b, a) {
		this.Now = 0;
		this.Timer = null;
		this.execTask = null;
		this.TQ = [{
			T: 0,
			f: b,
			ar: a || []
		}];
		this.TimeStep = 10;
		this.Start()
	},
	Clear: function() {
		this.TQ.length = 0
	},
	Start: function() { (function() {
			try {++oSym.Now
			} catch(a) {
				alert("超时退出游戏");
				location.reload()
			}
			oSym.Timer = setTimeout(arguments.callee, oSym.TimeStep)
		})(); (function() {
			var d = oSym,
			a = d.TQ,
			c = a.length,
			b, e;
			while (c--) {
				try {
					d.Now >= (b = a[c]).T && ((e = b.f).apply(e, b.ar), d.removeTask(c))
				} catch(ex) {
					document.body.innerHTML = "<pre style=color:red;background:white;font-size:18px;padding:20px>Task error:\n" + ex.message + "\n\nStack:\n" + ex.stack + "</pre>";
					throw ex;
				}
			}
			d.execTask = setTimeout(arguments.callee, oSym.TimeStep)
		})()
	},
	Stop: function() {
		clearTimeout(this.Timer);
		clearTimeout(this.execTask);
		this.Timer = null
	},
	addTask: function(b, c, a) {
		var d = this.TQ;
		d[d.length] = {
			T: this.Now + b,
			f: c,
			ar: a
		};
		return this
	},
	removeTask: function(a) {
		this.TQ.splice(a, 1);
		return this
	}
},
ShadowPNG = "assets/img/misc/plantshadow" + ($User.Browser.IE6 ? (document.execCommand("BackgroundImageCache", false, true), "8.gif") : "32.png"),
innerText = (function() {
	return $User.Browser.IE ? ($Random = "?",
	function(b, a) {
		b.innerText = a
	}) : ($Random = "#",
	function(b, a) {
		b.textContent = a
	})
})(),
// 音乐管理器（替代 Flash .swf）
AudioManager = {
	_audio: null,
	_pending: null,
	_tracks: {
		menu: "assets/audio/Faster.mp3",
		battle: "assets/audio/UraniwaNi.mp3",
		night: "assets/audio/Ultimate battle.mp3",
		Faster: "assets/audio/Faster.mp3",
		UraniwaNi: "assets/audio/UraniwaNi.mp3",
		"Look up at the": "assets/audio/Look up at the.mp3",
		"Ultimate battle": "assets/audio/Ultimate battle.mp3",
		"Watery Graves": "assets/audio/Watery Graves.mp3"
	},
	play: function(type) {
		this.stop();
		this._pending = type;
		var src = this._tracks[type] || this._tracks.battle;
		var a = this._audio = document.createElement("audio");
		a.src = src;
		a.loop = true;
		a.volume = 0.3;
		var self = this;
		a.play().then(function() {
			self._pending = null;
		}).catch(function() {
			// 浏览器阻止了自动播放，等用户交互后再试
			self._audio = null;
		});
	},
	_resume: function() {
		if (this._pending && !this._audio) {
			this.play(this._pending);
		}
	},
	stop: function() {
		if (this._audio) {
			this._audio.pause();
			this._audio.src = "";
			this._audio = null;
		}
	}
};

// 用户首次交互时恢复音乐播放
(function() {
	var events = ['click', 'touchstart', 'keydown'];
	function resume() {
		AudioManager._resume();
		events.forEach(function(e) {
			document.removeEventListener(e, resume);
		});
	}
	events.forEach(function(e) {
		document.addEventListener(e, resume);
	});
})();

oS = {
	W: 900,
	H: 600,
	C: 9,
	LawnMowerX: 70,
	Lvl: 0,
	GlobalVariables: {},
	LvlVariables: {},
	SelfVariables: [],
	LvlClearFunc: null,
	Init: function(e, g, b, d) {
		var c, a = window;
		if (b != d) {
			for (c in b) {
				a[c] != d ? (this.GlobalVariables[c] = a[c], a[c] = b[c]) : this.LvlVariables[c] = a[c] = b[c]
			}
		}
		ArCard = [];
		ArPCard = [];
		ArSun = [];
		$Pn = [];
		$Z = [];
		$P = [];
		EDAll = $("dAll");
		EDNewAll = EDAll.cloneNode(true);
		EDNewFlagMeter = $("dFlagMeter").cloneNode(true);
		ESSunNum = $("sSunNum");
		this.LoadAccess = null;
		this.InitLawnMower = null;
		this.StartGame = null;
		this.ChoseCard = this.MPID = "";
		this.PicNum = this.AccessNum = this.MCID = this.Chose = 0;
		this.Monitor = null;
		this.UserDefinedFlagFunc = null;
		for (c in e) {
			this.SelfVariables.push(c);
			this[c] = e[c]
		} ! this.PicArr && (this.PicArr = []); ! this.PName && (this.PName = []); ! this.ZName && (this.ZName = []); ! this.backgroundImage && (this.backgroundImage = "assets/img/ui/background1.jpg"); ! this.LF && (this.LF = [0, 1, 1, 1, 1, 1]); ! this.ZF && (this.ZF = this.LF); ! this.LargeWaveFlag && (this.LargeWaveFlag = {});
		this.SunNum == d && (this.SunNum = 50);
		this.CanSelectCard == d && (this.CanSelectCard = 1);
		this.DKind == d && (this.DKind = 1);
		this.StaticCard == d && (this.StaticCard = 1); ! this.StartGameMusic && (this.StartGameMusic = "battle"); (this.Coord ||
		function() {
			oS.R = 5;
			ChosePlantX = function(f) {
				return Compare(GetC(f), 1, oS.C, GetX)
			};
			ChosePlantY = function(f) {
				return $SSml(f, [86, 181, 281, 386, 476], [[75, 0], [175, 1], [270, 2], [380, 3], [470, 4], [575, 5]])
			};
			GetC = function(f) {
				return $SSml(f, [100, 140, 220, 295, 379, 460, 540, 625, 695, 775, 855, 935], [ - 1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11])
			};
			GetR = function(f) {
				return $SSml(f, [86, 181, 281, 386, 476], [0, 1, 2, 3, 4, 5])
			};
			GetX = function(f) {
				return $SEql(f, {
					"-1": 100,
					0 : 140,
					1 : 187,
					2 : 267,
					3 : 347,
					4 : 427,
					5 : 507,
					6 : 587,
					7 : 667,
					8 : 747,
					9 : 827,
					10 : 865,
					11 : 950
				})
			};
			GetY = function(f) {
				return $SEql(f, {
					0 : 75,
					1 : 175,
					2 : 270,
					3 : 380,
					4 : 470,
					5 : 575
				})
			};
			GetY1Y2 = function(f) {
				return $SEql(f, {
					0 : [0, 85],
					1 : [86, 180],
					2 : [181, 280],
					3 : [281, 385],
					4 : [386, 475],
					5 : [476, 600]
				})
			}; ! oS.InitLawnMower && (oS.InitLawnMower = function() {
				var f = 6,
				h = oGd.gridLM;
				while (--f) {
					h[f] = 1;
					NewImg("LawnMower" + f, "assets/img/misc/LawnMower.gif", "left:" + oS.LawnMowerX + "px;top:" + (GetY(f) - 60) + "px;z-index:" + (3 * f + 2), EDAll)
				}
			})
		})();
		g && oP.Init(g);
		oT.Init(this.R);
		oZ.Init(this.R);
		oGd.Init();
		this.LoadMusic();
		this.LoadProgress()
	},
	LoadProgress: function(r, l, a) {
		SetVisible($("dFlagMeter"));
		SetHidden($("imgGQJC"));
		var p = oS,
		j = [],
		i = typeof p.PicArr === "function" ? p.PicArr() : p.PicArr,
		k = p.PName,
		s = p.ZName,
		u = 0,
		d = document.createTextNode("正在准备载入游戏素材。。。"),
		t = GetX(11),
		g = oGd.gridLF,
		b = oGd.gridZF,
		c = oS.R + 1,
		e = p.LoadImage,
		h = p.CheckImg,
		f = p.InitPn,
		m,
		q;
		innerText($("sFlagMeterTitleF"), d.data);
		$("dFlagMeterTitleB").insertBefore(d, $("sFlagMeterTitleF"));
		u += (r = k.length);
		while (r--) {
			a = (l = k[r].prototype).PicArr.slice(0);
			j[j.length] = [l.EName, a[l.NormalGif], l.getShadow(l)];
			a.splice(l.NormalGif, 1);
			Array.prototype.push.apply(i, a)
		}
		for (r in oS.LargeWaveFlag) {
			s[s.length] = oFlagZombie;
			break
		}
		r = s.length;
		while (r--) {
			Array.prototype.push.apply(i, (l = (q = s[r]).prototype).PicArr.slice(0));
			l.Init.call(q, t, l, b, c)
		}
		p.PicNum = u += i.length;
		r = i.length;
		while (r--) {
			e(i[r], h)
		}
		r = j.length;
		while (r--) {
			e((m = j[r])[1], f, m)
		}
	},
	InitPn: function(a) {
		var b;
		$Pn[a[0]] = b = NewEle(0, "div", "position:absolute");
		NewImg(0, ShadowPNG, a[2], b);
		NewImg(0, a[1], "", b);
		oS.CheckImg()
	},
	LoadImage: $User.Browser.IE ?
	function(b, d, c) {
		var a = new Image();
		a.onreadystatechange = function() {
			a.readyState == "complete" && d(c)
		};
		a.onerror = function() {
			a.onreadystatechange = null;
			a.title = b;
			d(c)
		};
		a.src = b
	}: function(b, d, c) {
		var a = new Image();
		a.src = b;
		a.complete ? d(c) : (a.onload = function() {
			a.complete && d(c)
		},
		a.onerror = function() {
			a.title = b;
			d(c)
		})
	},
	CheckImg: function(b, a) {
		var c = oS;
		if (c.AccessNum > c.PicNum) {
			return
		}
		b = 139 - c.AccessNum++*140 / c.PicNum - 11;
		$("imgFlagHead").style.left = b + "px";
		a = "载入:(" + c.AccessNum + "/" + c.PicNum + ")";
		innerText($("sFlagMeterTitleF"), a);
		$("dFlagMeterTitleB").firstChild.data = a;
		$("imgFlagMeterFull").style.clip = "rect(0,auto,21px," + (b + 11) + "px)";
		if (c.AccessNum == c.PicNum) {
			SetHidden($("dFlagMeterContent"), $("dFlagMeter"));
			SetStyle($("dFlagMeter"), {
				left: "260px",
				top: "560px"
			});
			innerText($("sFlagMeterTitleF"), $("dFlagMeterTitleB").firstChild.data = c.LevelName);
			$("imgFlagHead").style.left = "139px";
			$("imgFlagMeterFull").style.clip = "rect(0,auto,auto,157px)"; (oS.AutoSun = $User.Client.PC && $User.HTTP ? Math.floor(getCookie("JSPVZAutoSun")) : 1) && ($("cAutoSun").checked = true);
			delete c.PicArr;
			delete c.Coord;
			delete c.LF;
			delete c.ZF; (c.LoadAccess ||
			function() {
				NewImg("imgGrowSoil", "assets/img/ui/GrowSoil.png", "display:none;z-index:50", EDAll);
				NewEle("dTitle", "div", 0, 0, EDAll);
				innerText(ESSunNum, c.SunNum);
				SetStyle($("tGround"), {
					background: "url(" + c.backgroundImage + ") no-repeat",
					display: "block"
				});
				InitPCard();
				oSym.addTask(100,
				function() {
					var d = EDAll.scrollLeft += 25;
					d < 500 ? oSym.addTask(2, arguments.callee, []) : (DisplayZombie(), SetBlock($("dMenu")), oS.CanSelectCard ? (SetBlock($("dTop"), $("dSelectCard")), SetVisible($("dCardList"))) : (AutoSelectCard(), oSym.addTask(200, LetsGO, [])))
				},
				[])
			})()
		}
	}
},
oP = {
	Init: function(b) {
		var a;
		this.NumZombies = 0;
		this.FlagZombies = 0;
		for (a in b) {
			this[a] = b[a]
		}
		this.LAr = this.ArZ.length;
		this.FlagHeadStep = Math.floor(140 / (b.FlagNum - 1))
	},
	SelectFlagZombie: function(d) {
		var h = oP,
		c = [],
		a = 0,
		g = h.ArZ,
		f = oS.LargeWaveFlag[h.FlagZombies],
		e = h.SumToZombie,
		b = !f ? 150 : (f.style.top = "5px", --d, c[a++] = oFlagZombie, 30);
		while (d > 0) {
			d -= (c[a++] = g[Math.floor(Math.random() * Math.min($SEql(d, e), g.length - 1))]).prototype.Lvl
		}
		h.NumZombies += a;
		h.SetTimeoutZombie(c, b)
	},
	SetTimeoutTomZombie: function(c) {
		var f = [],
		d = [],
		e = 0,
		a = c.length,
		h = oGd.gridTombstones,
		b,
		g;
		for (b in h) {
			g = b.split("_");
			d[e] = (f[e] = new c[Math.floor(Math.random() * a)]).CustomBirth(g[0], g[1], 100); ++e
		}
		oP.NumZombies += e;
		asyncInnerHTML(d.join(""),
		function(n, l) {
			EDAll.appendChild(n);
			var k = l.length,
			m, j;
			while (k--) {
				m = l[k];
				oSym.addTask(10,
				function(r, q, i, p) {
					q = Math.max(q - p, 0);
					SetStyle(r, {
						top: q + "px",
						clip: "rect(0,auto," + (i += p) + "px,0)"
					});
					q && oSym.addTask(10, arguments.callee, [r, q, i, p])
				},
				[$(m.id).childNodes[1], j = m.height, 0, j * 0.1]);
				m.Birth()
			}
		},
		f)
	},
	SetTimeoutZombie: function(b, d) {
		var f = [],
		c = [],
		e = delayT = 0,
		a = b.length;
		while (e < a) {
			c[e] = (f[e] = new b[e]).prepareBirth(delayT);
			delayT += d; ++e
		}
		asyncInnerHTML(c.join(""),
		function(j, h) {
			EDAll.appendChild(j);
			var g = h.length;
			while (g--) {
				h[g].Birth()
			}
		},
		f)
	},
	AddZombiesFlag: function(d) {
		var g = oP,
		c = oS.LargeWaveFlag,
		e, b = g.FlagHeadStep,
		a = g.FlagNum;
		SetVisible($("imgGQJC"), $("dFlagMeterContent"));
		for (e in c) {
			if (!c[e]) continue;
			Math.floor(e) < a ? SetStyle(c[e], {
				display: "block",
				left: (150 - (e - 1) * b) + "px"
			}) : SetBlock(c[e])
		}
		oGd.MoveBullet();
		g.ReadyFlag = 1;
		g.FlagPrgs(d)
	},
	FlagPrgs: function() {
		var f = oP,
		c = f.FlagZombies,
		e = f.FlagToSumNum,
		a = 139 - c * f.FlagHeadStep,
		d = $SSml(c, e.a1, e.a2),
		b;
		f.FlagNum > (c = ++f.FlagZombies) ? ($("imgFlagHead").style.left = a + "px", $("imgFlagMeterFull").style.clip = "rect(0,157px,21px," + (a + 11) + "px)", (b = $SEql(c, f.FlagToMonitor)) && oSym.addTask(1690,
		function(g) { ! g[1] && (g[0](), g[1] = 1)
		},
		[b]), oSym.addTask(2490,
		function(g) {
			var h = oP;
			h.ReadyFlag == g++&&(h.ReadyFlag = g, h.FlagPrgs())
		},
		[c])) : ($("imgFlagHead").style.left = "-1px", $("imgFlagMeterFull").style.clip = "rect(0,157px,21px,0)");
		f.SelectFlagZombie.call(f, d);
		f.UserDefinedFlagFunc && f.UserDefinedFlagFunc()
	},
	MonPrgs: function() {
		var c = oP,
		b, a = c.FlagZombies; ! --c.NumZombies && (a < c.FlagNum ? ((b = $SEql(a, c.FlagToMonitor)) && (b[0](), b[1] = 1), c.ReadyFlag = ++a, oSym.addTask(500, c.FlagPrgs, [])) : (c.FlagToEnd(), oSym.Stop()))
	},
	Monitor: function(a, b) {
		a && a.f.apply(a.f, a.ar);
		b && (oP.UserDefinedFlagFunc = b); (function() {
			oZ.traversalOf();
			oSym.addTask(10, arguments.callee, [])
		})()
	}
},
oGd = {
	Init: function() {
		this.$ = [];
		this.grid = this.$;
		this.gridCrater = [];
		this.gridTombstones = [];
		this.gridTorch = [];
		this.gridLF = oS.LF;
		this.gridZF = oS.ZF;
		this.gridLM = [];
		this.gridB = []
	},
	add: function(c, a, b, d) { (b = (d = this.$)[a]) && b.Die();
		d[a] = c
	},
	del: function(a) {
		delete this.$[a.R + "_" + a.C + "_" + a.PKind]
	},
	MoveBullet: function() {
		var d = oGd.gridB,
		a = d.length,
		c, b = oGd.gridTorch;
		while (a--) { (c = d[a]).F(c, a, d, b)
		}
		oSym.addTask(1, arguments.callee, [])
	},
	MB1: function(e, j, m, f) {
		var d = e.id,
		k = $(d),
		h = e.Attack,
		a = e.D,
		p,
		q = e.X,
		c = GetC(q),
		g = e.R,
		n = e.Kind,
		l = e.ChangeC,
		b = oZ.getZ(q, g, a);
		n < 1 && f[g + "_" + c] && l != c && ((e.Kind = ++n) && (h = e.Attack = 40), e.ChangeC = c, k.src = "assets/img/plants/PB" + n + a + ".gif");
		b && b.Altitude == 1 ? (b.getHurt( - 1, a, h, n, 0, 0, 0), m.splice(j, 1), (SetStyle(k, {
			left: e.pixelLeft + 28 + "px"
		})).src = "assets/img/plants/PeaBulletHit.gif", oSym.addTask(10, ClearChild, [k])) : (e.X += (p = !a ? 5 : -5)) < oS.W && e.X > 100 ? k.style.left = (e.pixelLeft += p) + "px": (m.splice(j, 1), ClearChild(k))
	},
	MB2: function(d, g, h) {
		var c = d.id,
		j = d.X,
		a = GetC(j),
		f = d.R,
		b = oZ.getZ(j, f, 0),
		e = $(c);
		b && b.Altitude == 1 ? (b.getHurt( - 1, 0, 20, 0, 0, 0, 0), h.splice(g, 1), (SetStyle(e, {
			left: d.pixelLeft + 38 + "px"
		})).src = "assets/img/plants/ShroomBulletHit.gif", oSym.addTask(10, ClearChild, [e])) : (d.X += 5) < oS.W ? e.style.left = (d.pixelLeft += 5) + "px": (h.splice(g, 1), ClearChild(e))
	},
	MB3: function(g, d, a) {
		var h = g.id,
		b = $(h),
		f = oZ.getZ(g.X, g.R, 0),
		e = g.D,
		c = g.pixelTop;
		if (f && f.Altitude == 1) {
			f.getHurt( - 1, 0, 20, 0, 0, 0, 0);
			a.splice(d, 1);
			ClearChild(b)
		} else {
			switch (g.D) {
			case 4:
				(g.X -= 5) < 100 ? (a.splice(d, 1), ClearChild(b)) : b.style.left = (g.pixelLeft -= 5) + "px";
				break;
			case 6:
				(c = g.pixelTop -= 5) < -15 ? (a.splice(d, 1), ClearChild(b)) : (b.style.top = c + "px", g.R = GetR(c + 15));
				break;
			case 2:
				(c = g.pixelTop += 5) > 600 ? (a.splice(d, 1), ClearChild(b)) : (b.style.top = c + "px", g.R = GetR(c + 15));
				break;
			case 7:
				(g.X += 4.3) > 900 || (c = g.pixelTop -= 5) < -15 ? (a.splice(d, 1), ClearChild(b)) : (g.R = GetR(c + 15), b.style.left = (g.pixelLeft += 9.6) + "px", b.style.top = c + "px");
				break;
			case 1:
				(g.X += 4.3) > 900 || (c = g.pixelTop += 5) > 600 ? (a.splice(d, 1), ClearChild(b)) : (g.R = GetR(c + 15), b.style.left = (g.pixelLeft += 9.6) + "px", b.style.top = c + "px")
			}
		}
	}
},
oZ = {
	Init: function(b) {
		this.$ = [];
		this.$R = [];
		var a;
		for (a = b; a; this.$[a] = [], this.$R[a--] = []) {}
	},
	add: function(b, a) { (a = this.$[b.R]).push(b);
		a.sort(function(d, c) {
			return d.AttackedLX - c.AttackedLX
		});
		a.RefreshTime = oSym.Now
	},
	getZ: function(k, b, g) {
		var e = 0,
		m = this.$[b],
		h = this.$R[b],
		j,
		c,
		l,
		f;
		if (!g) {
			f = (j = m).length;
			while (e < f && (c = j[e++]).AttackedLX <= k) {
				if (c.HP && c.AttackedRX >= k) {
					return c
				}
			}
		} else { (l = m.RefreshTime) == h.RefreshTime ? j = h: (j = (this.$R[b] = m.slice(0)).sort(function(i, d) {
				return d.AttackedRX - i.AttackedRX
			})).RefreshTime = l;
			f = j.length;
			while (e < f && (c = j[e++]).AttackedRX >= k) {
				if (c.HP && c.AttackedLX <= k) {
					return c
				}
			}
		}
		return
	},
	getArZ: function(e, d, b) {
		var g = 0,
		l = this.$[b],
		f = [],
		k = 0,
		c,
		h = l.length,
		j;
		while (g < h && (j = (c = l[g++]).AttackedLX) < d) {
			c.HP && (j > e || c.AttackedRX > e) && (f[k++] = c)
		}
		return f
	},
	moveTo: function(g, f, c) {
		var b = this.$[f],
		a = this.$[c],
		e = b.length,
		d;
		while (e--) { (o = b[e]).id == g && (b.splice(e, 1), o.R = c, a.push(o), (a.sort(function(i, h) {
				return i.AttackedLX - h.AttackedLX
			})).RefreshTime = b.RefreshTime = oSym.Now, e = 0)
		}
	},
	traversalOf: function() {
		var c, a, e = this.$,
		i, k = Refresh = 0,
		j = 1000,
		h, g, b = function(l) { (h = l.AttackedLX) > j && (k = Refresh = 1);
			j = h
		},
		d = function(l) {
			Refresh = 1;
			j = h
		},
		f = e.length; (function(n) {
			var m = (i = e[n]).length,
			l = arguments.callee;
			while (m--) {
				c = i[m];
				c.HP && c.ZX < 901 && oT.check(c); ! c.HP ? (i.splice(m, 1), d(c)) : !(c.FreeFreezeTime || c.FreeSetbodyTime) ? (c.beAttacked && !c.isAttacking && c.JudgeAttack(), g = c.id, !c.isAttacking ? (a = c.Speed, !c.WalkDirection ? (c.AttackedRX -= a) < 100 ? (GameOver(), oSym.Stop(), m = 0, n = 1) : (c.ZX = c.AttackedLX -= a) < 150 && oGd.gridLM[n] ? (i.splice(m, 1), c.Die(2), LawnMowerKill(n), d(c)) : ($(g).style.left = Math.floor(c.X -= a) + "px", b(c)) : (c.AttackedLX += a) > oS.W ? (i.splice(m, 1), c.Die(2), d(c)) : (c.ZX = c.AttackedRX += a, $(g).style.left = Math.ceil(c.X += a) + "px", b(c))) : b(c)) : b(c)
			}
			k ? (k = 0, i.sort(function(q, p) {
				return q.AttackedLX - p.AttackedLX
			}), i.RefreshTime = oSym.Now) : Refresh && (i.RefreshTime = oSym.Now); --n && oSym.addTask(0, l, [n])
		})(e.length - 1)
	}
},
oT = {
	Init: function(b) {
		this.$ = [];
		this.$L = [];
		for (var a = b; a;) {
			this.$[a] = [];
			this.$L[a--] = []
		}
	},
	add: function(f, c, g) {
		var e = this.$[f],
		d = c.length,
		b;
		while (d--) {
			b = c[d];
			e.push([b[0], b[1], b[2], g])
		}
		e.sort(function(i, h) {
			return h[1] - i[1]
		});
		e.RefreshTime = new Date
	},
	check: function(b, l, k, e, a, j, c) {
		var h = b.AttackedLX,
		f = b.AttackedRX,
		d = 0,
		g = this.$[c = b.R];
		if (!b.WalkDirection) {
			while (d < g.length && (e = g[d])[1] >= h) { (a = $P[e[3]]).canTrigger && e[0] <= h && a.TriggerCheck(b, e[2], d); ++d
			}
		} else { (k = g.RefreshTime) == (j = this.$L[c]).RefreshTime ? l = j: (l = (this.$L[c] = g.slice(0)).sort(function(m, i) {
				return m[0] - i[0]
			})).RefreshTime = k;
			while (d < l.length && (e = l[d])[0] <= f) { (a = $P[e[3]]).canTrigger && e[1] >= f && a.TriggerCheck(b, e[2], d); ++d
			}
		}
	},
	delP: function(e) {
		var b = e.oTrigger,
		f = e.id,
		d, a, c;
		for (d in b) {
			for (c = (a = this.$[d]).length; c--; a[c][3] == f && a.splice(c, 1)) {}
			a.RefreshTime = new Date
		}
	},
	indexOf: function(j, d) {
		var f = new RegExp(d + ",", "g"),
		h = (j.toString() + ",").replace(f, "┢,").replace(/[^,┢]/g, ""),
		i = 0,
		g = 0,
		b = [];
		for (; (g = h.indexOf("┢", g)) > 0; b.push((g++-i++-2) / 3)) {}
		return b
	}
},
asyncInnerHTML = function(d, c, a) {
	var b = $n("div"),
	e = document.createDocumentFragment();
	b.innerHTML = d; (function(g) {
		var f = arguments.callee;
		g--?(e.appendChild(b.firstChild), setTimeout(function() {
			f(g)
		},
		0)) : c(e, a)
	})(b.childNodes.length)
},
WhichMouseButton = function(a) {
	a = window.event || a;
	var b = $User.Browser;
	return ! b.Gecko ? $SEql(a.button, {
		1 : 1,
		0 : b.IE ? 2 : 1,
		2 : 2,
		"default": 1
	}) : $SEql(a.which, {
		1 : 1,
		3 : 2,
		"default": 1
	})
},
GroundOnmousedown = function(i) {
	i = window.event || i;
	var a = i.clientX,
	k = i.clientY + document.body.scrollTop,
	g = ChosePlantX(a),
	h = ChosePlantY(k),
	d = g[0],
	c = h[0],
	f = h[1],
	b = g[1],
	j = GetAP(a, k, f, b);
	switch (oS.Chose) {
	case 1:
		WhichMouseButton(i) < 2 ? GrowPlant(j[0], d, c, f, b) : CancelPlant();
		break;
	case - 1 : WhichMouseButton(i) < 2 ? ShovelPlant(j) : CancelShovel()
	}
},
GetAP = function(a, h, d, c) {
	var f, i = oGd.grid,
	e, g = [],
	b;
	for (f = 0; f < 4; g.push(e = i[d + "_" + c + "_" + f++]), e && !(a < e.pixelLeft || a > e.pixelRight || h < e.pixelTop || h > e.pixelBottom) && (b = e)) {}
	return [g, b]
},
GroundOnkeydown = function(b) {
	var a;
	if ((a = (b || event).keyCode) == 27) {
		switch (oS.Chose) {
		case 1:
			CancelPlant();
			break;
		case - 1 : CancelShovel()
		}
		return false
	} else { ! oS.Chose && KeyBoardGrowPlant(a)
	}
},
KeyBoardGrowPlant = function(b, a) {
	a = a || 0;
	if (b > 47 && b < 58) {
		switch (a) {
		case 0:
			ChosePlant({
				clientX:
				450,
				clientY: 300
			},
			String.fromCharCode(b))
		}
	}
},
GroundOnmousemove = function(k) {
	k = window.event || k;
	var d = k.clientX,
	b = k.clientY + document.body.scrollTop,
	m = oS.ChoseCard,
	h = ChosePlantX(d),
	i = ChosePlantY(b),
	f = h[0],
	c = i[0],
	g = i[1],
	a = h[1],
	p = GetAP(d, b, g, a);
	switch (oS.Chose) {
	case 1:
		var n = ArCard[m].PName.prototype;
		SetStyle($("MovePlant"), {
			left: d - n.width * 0.5 + "px",
			top: b + 20 - n.height + "px"
		});
		n.CanGrow(p[0], g, a) ? SetStyle($("MovePlantAlpha"), {
			display: "block",
			left: f + n.GetDX() + "px",
			top: c - n.height + n.GetDY(g, a, p[0]) + "px"
		}) : SetNone($("MovePlantAlpha"));
		break;
	case - 1 : var j = p[1],
		l = j ? j.id: "",
		q = oS.MPID;
		q != l && (q && SetAlpha($(q).childNodes[1], 100, 1), (oS.MPID = l) && SetAlpha($(l).childNodes[1], 60, 0.6));
		SetStyle($("tShovel"), {
			left: d - 15 + "px",
			top: b - 16 + "px"
		})
	}
},
ViewProducePlant = function(b) {
	var a = b.prototype;
	$("pHandBookPlant").src = a.PicArr[a.NormalGif];
	$("tdProducePlant").innerHTML = a.Produce;
	innerText($("tdHandBookPlantName"), a.CName);
	innerText($("spSunNum"), a.SunNum);
	innerText($("spCoolTime"), a.coolTime * 0.001 + "秒")
},
ViewProduceZombie = function(b) {
	var a = b.prototype;
	$("pHandBookZombie").src = a.PicArr[a.NormalGif];
	$("tdProduceZombie").innerHTML = a.Produce;
	innerText($("tdHandBookZombieName"), a.CName)
},
DisplayZombie = function() {
	var c = oP.ArZ.slice(0),
	b = l2 = c.length,
	f,
	g = $("dZombie"),
	e = [],
	d = [],
	a;
	while (b--) {
		e.push(Math.floor(150 + Math.random() * 444))
	}
	e.sort(function(i, h) {
		return i - h
	});
	while (l2) {
		f = c[a = Math.floor(Math.random() * l2)].prototype;
		c.splice(a, 1);
		d[l2--] = f.getHTML("", Math.floor(50 + Math.random() * 201) - f.width * 0.5, e[l2] - f.height, 1, "visibility", "auto", 0)
	}
	asyncInnerHTML(d.join(""),
	function(h) {
		g.appendChild(h)
	})
},
AutoSelectCard = function() {
	var c = oS.PName,
	b = -1,
	a = c.length;
	while (++b < a) {
		SelectCard(c[b].prototype.EName)
	}
},
InitPCard = function() {
	var d = "",
	f, e = oS.PName,
	a = e.length,
	b = 0,
	c;
	while (b < a) {
		f = e[b];
		c = f.prototype;
		ArPCard[EName = c.EName] = {
			Select: 0,
			PName: f
		};
		d += '<span class="span1" id="Card' + EName + '" onmouseout="SetNone($(\'dTitle\'))" onmousemove="ViewCardTitle(\'' + EName + "',event)\" onclick=\"SelectCard('" + EName + '\')"><img src="' + c.PicArr[c.CardGif] + '"><span class="span2">' + c.SunNum + "</span></span>";
		b++%6 == 5 && (d += "<br>")
	}
	$("dPCard").innerHTML = d
},
ViewCardTitle = function(b, c) {
	c = c || window.event;
	var f = $("dTitle"),
	a = ArPCard[b].PName.prototype;
	f.innerHTML = a.CName + "<br>冷却时间:" + (a.coolTime * 0.001).toFixed(1) + "秒<br>" + a.Tooltip;
	SetStyle(f, {
		left: c.clientX + EDAll.scrollLeft - 3 + "px",
		top: c.clientY + 18 + "px",
		display: "block"
	})
},
SelectCard = function(f) {
	var a = $("Card" + f).firstChild,
	i = ArPCard[f],
	c = i.PName.prototype,
	h,
	e,
	b,
	g = $("btnOK");
	if (!i.Select) {
		if (! (ArPCard.SelNum |= 0)) {
			g.disabled = "";
			g.style.color = "#FC6"
		} else {
			if (ArPCard.SelNum > 9) {
				return
			}
		}++ArPCard.SelNum;
		i.Select = 1;
		oS.StaticCard && (h = NewEle("dCard" + f, "div", 0, {
			onclick: function() {
				SelectCard(f)
			}
		},
		$("dCardList")), NewImg(0, a.src, 0, h), innerText(NewEle("sSunNum" + f, "span", 0, 0, h), c.SunNum), a.src = c.PicArr[c.CardGif + 1])
	} else {
		i.Select = 0; ! --ArPCard.SelNum && (g.disabled = "disabled", g.style.color = "#888"); (h = $("dCard" + f)).onclick = null;
		e = h.firstChild;
		b = h.lastChild;
		ClearChild(e, b, h);
		a.src = c.PicArr[c.CardGif]
	}
},
ResetSelectCard = function() {
	var a;
	for (a in ArPCard) {
		ArPCard[a].Select && SelectCard(a)
	}
	$("btnOK").disabled = "disalbed";
	$("btnOK").style.color = "#888"
},
LetsGO = function() {
	var b = $("dZombie"),
	f = $("dCardList"),
	h = 0,
	l = f.childNodes.length,
	g,
	j,
	m,
	e,
	k,
	a,
	c = $("dBody");
	while (b.hasChildNodes()) {
		b.removeChild(k = b.lastChild);
		k = null
	}
	SetNone(b, $("dSelectCard"));
	$("tGround").style.left = "-115px";
	EDAll.scrollLeft = 0;
	SetStyle($("dTop"), {
		left: "105px",
		top: 0
	});
	f.style.left = 0;
	while (h < l) { (function(d) {
			g = (k = f.childNodes[d]).id.substr(5);
			m = (j = ArPCard[g].PName).prototype;
			k.onclick = function(i) {
				ChosePlant(i, d)
			};
			k.onmouseover = function() {
				SetBlock($("dTitle"));
				ViewPlantTitle(oS.MCID = d)
			};
			k.onmouseout = function() {
				SetNone($("dTitle"))
			}; (a = k.lastChild).id = "sSunNum" + d;
			innerText(a, m.SunNum);
			k.firstChild.src = m.PicArr[m.CardGif + 1];
			ArCard.push({
				DID: k.id,
				CDReady: 0,
				SunReady: 0,
				PName: j
			})
		})(h++)
	}
	c.onkeydown = function(d) {
		GroundOnkeydown(d)
	};
	c.onmousedown = function(d) {
		GroundOnmousedown(d)
	};
	c.onmousemove = function(d) {
		GroundOnmousemove(d)
	};
	SetVisible(f); (oS.StartGame ||
	function() {
		AudioManager.play(oS.StartGameMusic);
		SetVisible($("tdShovel"), $("dFlagMeter"));
		SetBlock($("dTop"));
		oS.InitLawnMower();
		PrepareGrowPlants(function() {
			oP.Monitor(oS.Monitor, oS.UserDefinedFlagFunc);
			BeginCool();
			oS.DKind && AutoProduceSun(25);
			oSym.addTask(1500,
			function() {
				oP.AddZombiesFlag();
				SetVisible($("dFlagMeterContent"))
			},
			[])
		})
	})()
},
ViewPlantTitle = function(b) {
	var f = $("dTitle"),
	e = ArCard[b],
	c = e.PName.prototype,
	a = c.CName + "<br>冷却时间:" + (c.coolTime * 0.001).toFixed(1) + "秒<br>" + c.Tooltip; ! e.CDReady && (a += '<br><span style="color:#F00">正在重新装填中...</span>'); ! e.SunReady && (a += '<br><span style="color:#F00">阳光不足!</span>');
	f.innerHTML = a;
	SetStyle(f, {
		top: 60 * b + "px",
		left: "100px"
	})
},
BeginCool = function() {
	var b = ArCard.length,
	c, d, a, e;
	while (b--) {
		a = (c = (d = ArCard[b]).PName.prototype).coolTime;
		e = c.SunNum;
		// 冷却时间 <= 10秒的植物开局直接可用
		if (a <= 10000) {
			d.CDReady = 1;
			e <= oS.SunNum && (d.SunReady = 1, $(d.DID).firstChild.src = c.PicArr[c.CardGif]);
		} else {
			// 长冷却植物：初始冷却 = 自身冷却时间的一半（最少5秒）
			DoCoolTimer(b, Math.max(a * 0.5, 5000))
		}
	}
},
MonitorCard = function(c) {
	var a = ArCard.length,
	b;
	if (oS.Chose < 1) {
		while (a--) { (b = (c = ArCard[a]).PName.prototype).SunNum > oS.SunNum ? (c.SunReady && (c.SunReady = 0), $(c.DID).firstChild.src = b.PicArr[b.CardGif + 1]) : (!c.SunReady && (c.SunReady = 1), c.CDReady && ($(c.DID).firstChild.src = b.PicArr[b.CardGif]))
		}
	} else {
		while (a--) { (b = (c = ArCard[a]).PName.prototype).SunNum > oS.SunNum ? c.SunReady && (c.SunReady = 0) : !c.SunReady && (c.SunReady = 1)
		}
	}
	ViewPlantTitle(oS.MCID)
},
DoCoolTimer = function(c, b) {
	var a = $(ArCard[c].DID); (function(d, g, f, e) {
		d > 0 ? (innerText(f, d), innerText(e, d), oSym.addTask(50, arguments.callee, [(d - 0.5).toFixed(1), g, f, e])) : (ClearChild(f, e), ArCard[g].CDReady = 1, MonitorCard())
	})(b * 0.001, c, NewEle("dCD1" + c, "span", "position:absolute;left:22px;top:22px;font-size:18px;font-weight:500;font-family:Verdana;color:#000", "", a), NewEle("dCD2" + c, "span", "position:absolute;left:20px;top:20px;font-size:18px;font-weight:500;font-family:Verdana;color:#FF0", "", a))
},
ChosePlant = function(a, f) {
	var h = ArCard[oS.ChoseCard = f];
	if (! (h.CDReady && h.SunReady)) {
		return
	}
	var g = (a = a || event).clientX,
	e = a.clientY + document.body.scrollTop,
	d = h.PName.prototype,
	c = ArCard.length,
	b;
	oS.Chose = 1;
	EditImg((EditImg($Pn[d.EName].childNodes[1].cloneNode(false), "MovePlant", "", {
		left: g - d.width * 0.5 + "px",
		top: e + 20 - d.height + "px",
		zIndex: 254
	},
	EDAll)).cloneNode(false), "MovePlantAlpha", "", {
		display: "none",
		filter: "alpha(opacity=40)",
		opacity: 0.4,
		zIndex: 30
	},
	EDAll);
	while (c--) {
		$((b = ArCard[c]).DID).firstChild.src = (d = b.PName.prototype).PicArr[d.CardGif + 1]
	}
	SetNone($("dTitle"))
},
CancelPlant = function() {
	ClearChild($("MovePlant"), $("MovePlantAlpha"));
	oS.Chose = 0;
	MonitorCard()
},
ShovelPlant = function(a) {
	var b = a[0],
	c = a[1];
	c && (c.PKind || !(b[1] || b[2])) && (c.Die(), oS.MPID = "");
	CancelShovel()
},
CancelShovel = function(a) {
	var b = oS.MPID;
	ClearChild($("tShovel"));
	oS.Chose = 0;
	SetBlock($("imgShovel"));
	b && SetAlpha($(b).childNodes[1], 100, 1)
},
ChoseShovel = function(a) {
	WhichMouseButton(a) < 2 && (SetNone($("imgShovel")), NewImg("tShovel", "assets/img/ui/Shovel.png", "left:" + (a.clientX - 10) + "px;top:" + (a.clientY + document.body.scrollTop - 17) + "px;z-index:1", EDAll), oS.Chose = -1, StopBubble(a))
},
StopBubble = function(a) {
	window.event ? event.cancelBubble = true: a.stopPropagation()
},
GrowPlant = function(i, c, b, d, a) {
	var g = oS.ChoseCard,
	e = ArCard[g],
	f = e.PName,
	h = f.prototype;
	h.CanGrow(i, d, a) && ((new f).Birth(c, b, d, a, i), innerText(ESSunNum, oS.SunNum -= h.SunNum), $(e.DID).firstChild.src = h.PicArr[h.CardGif + 1], e.CDReady = 0, DoCoolTimer(g, h.coolTime), SetStyle($("imgGrowSoil"), {
		left: c - 30 + "px",
		top: b - 40 + "px",
		zIndex: 3 * d,
		display: "block"
	}), oSym.addTask(20, SetNone, [$("imgGrowSoil")]));
	CancelPlant()
},
AutoProduceSun = function(a) {
	AppearSun(GetX(Math.floor(1 + Math.random() * oS.C)), GetY(Math.floor(1 + Math.random() * oS.R)), a, 1);
	oSym.addTask(Math.floor(9 + Math.random() * 3) * 100, AutoProduceSun, [a])
},
AppearSun = function(h, f, e, a) {
	var b, d, g = "Sun" + Math.random(),
	c = "cursor:pointer;z-index:25;filter:alpha(opacity=80);opacity:0.8;left:" + h + "px;";
	switch (e) {
	case 25:
		c += "width:78px;height:78px";
		b = 39;
		break;
	case 15:
		c += "width:46px;height:46px";
		b = 23;
		break;
	default:
		c += "width:100px;height:100px";
		b = 55
	}
	a ? (d = 0, oSym.addTask(10, MoveDropSun, [g, f])) : (d = f - b - 20, c += ";top:" + d + "px", oSym.addTask(800, DisappearSun, [g]));
	ArSun[g] = {
		id: g,
		N: e,
		C: 1,
		left: h,
		top: d
	};
	NewImg(g, "assets/img/misc/Sun.gif", c, EDAll, {
		onclick: function() {
			ClickSun(this.id)
		}
	});
	oS.AutoSun && oSym.addTask(100, ClickSun, [g])
},
MoveDropSun = function(c, b) {
	var a = ArSun[c];
	a && a.C && (a.top < b - 53 ? ($(c).style.top = (a.top += 3) + "px", oSym.addTask(5, MoveDropSun, [c, b])) : oSym.addTask(800, DisappearSun, [c]))
},
DisappearSun = function(b) {
	var a = ArSun[b];
	a && a.C && (delete ArSun[b], ClearChild($(b)))
},
ClickSun = function(c) {
	var a = ArSun[c],
	b = oS.SunNum;
	a && a.C && (a.C = 0, innerText(ESSunNum, oS.SunNum = Math.min(b + a.N, 9990)), oSym.addTask(0, MoveClickSun, [c]).addTask(0, MonitorCard, []))
},
MoveClickSun = function(b) {
	var a = 15,
	c = ArSun[b],
	e = 85,
	i = -20,
	d = c.left,
	h = c.top,
	g = Math.round((d - e) / a),
	f = Math.round((h - i) / a); (function(k, l, n, s, m, r, j, q, p) { (m -= q) > n ? (SetStyle($(k), {
			left: m + "px",
			top: (r -= p) + "px"
		}), oSym.addTask(j, arguments.callee, [k, l, n, s, m, r, j += 0.3, q, p])) : (SetStyle($(k), {
			left: n + "px",
			top: s + "px"
		}), delete ArSun[k], oSym.addTask(20, ClearChild, [$(k)]))
	})(b, c, e, i, d, h, 1, g, f)
},
AutoClickSun = function() {
	var a, b;
	for (b in ArSun) {
		ArSun[b].C && ClickSun(b)
	}
},
ShowLargeWave = function(a) {
	NewImg("LargeWave", "assets/img/misc/LargeWave.gif", "left:71px;top:249px;width:858px;height:102px;z-index:50", EDAll);
	oSym.addTask(4,
	function(b, c, d) {
		SetStyle($("LargeWave"), {
			width: (b -= 57.2) + "px",
			height: (c -= 6.8) + "px",
			left: 500 - b * 0.5 + "px",
			top: 300 - c * 0.5 + "px"
		});
		b > 286 ? oSym.addTask(4, arguments.callee, [b, c, d]) : d()
	},
	[858, 102, a ||
	function() {
		oSym.addTask(460, ClearChild, [$("LargeWave")])
	}])
},
ShowFinalWave = function() {
	var a = function(b) {
		NewImg("FinalWave", "assets/img/misc/FinalWave.gif", "left:122px;top:194px;width:756px;height:213px;z-index:50", EDAll);
		oSym.addTask(4,
		function(c, e, d) {
			SetStyle($("FinalWave"), {
				width: (c -= 50.4) + "px",
				height: (e -= 14.2) + "px",
				left: 500 - c * 0.5 + "px",
				top: 300 - e * 0.5 + "px"
			});
			c > 252 ? oSym.addTask(4, arguments.callee, [c, e, d]) : oSym.addTask(d, ClearChild, [$("FinalWave")])
		},
		[756, 213, b])
	}; (oP.FlagNum in oS.LargeWaveFlag) ? ShowLargeWave(function() {
		oSym.addTask(460,
		function() {
			ClearChild($("LargeWave"));
			oSym.addTask(100, a, [150])
		},
		[])
	}) : a(500)
},
LawnMowerKill = function(b) {
	var e = "LawnMower" + b,
	c = $(e),
	d = oS.LawnMowerX,
	a = oS.W;
	oGd.gridLM[b] = 0; (function() {
		var g = oZ.getArZ(d, d + 50, b),
		f = g.length;
		while (f--) {
			g[f].Die(2)
		} (d += 10) > a ? ClearChild(c) : (c.style.left = d + "px", oSym.addTask(1, arguments.callee, []))
	})()
},
GameOver = function() {
	NewImg("iGameOver", "assets/img/misc/ZombiesWon.png", "width:900px;height:600px;z-index:255", EDAll, {
		onclick: function() {
			SelectModal(oS.Lvl)
		}
	})
},
PrepareGrowPlants = function(a) {
	NewImg("PrepareGrow", "assets/img/misc/PrepareGrowPlants.gif" + $Random + Math.random(), "z-index:50;left:" + (oS.W * 0.5 - 77) + "px;top:" + (oS.H * 0.5 - 54) + "px", EDAll);
	oSym.addTask(250,
	function(b) {
		ClearChild($("PrepareGrow"));
		b()
	},
	[a])
},
CustomPlants = function(b, a, c) { (new ArCard[b].PName).Birth(GetX(c), GetY(a), a, c, [])
};
CheckAutoSun = function(a) {
	var b = a.checked ? 1 : 0;
	b != oS.AutoSun && (addCookie("JSPVZAutoSun", oS.AutoSun = b), b && AutoClickSun())
},
GetNewCard = function(a, b, c) {
	oSym.Clear(); (SetStyle(a, {
		left: "350px",
		top: "131px",
		width: "200px",
		height: "120px",
		cursor: "default"
	})).onclick = null;
	NewEle("DivA", "div", "width:900px;height:600px;background:#FFF;z-index:255", 0, EDAll);
	oSym.Init(function(d, e) {++d < 100 ? (SetAlpha(e, d, d * 0.01), oSym.addTask(1, arguments.callee, [d, e])) : function() {
			SetHidden(EDAll, $("dTop"));
			var f = b.prototype;
			$("iNewPlantCard").src = f.PicArr[f.NormalGif];
			$("iNewPlantCard").style.marginTop = 180 - f.height + "px";
			innerText($("dNewPlantName"), f.CName);
			$("dNewPlantTooltip").innerHTML = f.Tooltip;
			$("btnNextLevel").onclick = function() {
				c == 20 && (c = 0);
				SelectModal(c)
			};
			SetStyle($("dNewPlant"), {
				display: "block",
				zIndex: 255
			});
			oSym.Stop()
		} ()
	},
	[0, $("DivA")])
},
getCookie = function(b) {
	var d = document.cookie,
	e = d.split(";"),
	c = e.length,
	a;
	while (c--) {
		if ((a = e[c].split("="))[0].replace(" ", "") == b) {
			return a[1]
		}
	}
	return 0
},
addCookie = function(a, c, d) {
	var b = a + "=" + escape(c);
	document.cookie = b
},
deleteCookie = function(a) {
	document.cookie = a + "=0;"
},
WordUTF8 = '<div id="dLogo" style="position:absolute;width:900px;height:600px;background:#000 url(assets/img/misc/Logo.jpg) no-repeat;z-index:1"><div id="LogoWord" style="position:absolute;color:#FF0;top:510px;width:100%;height:90px"><span style="position:absolute;font-size:15pt;width:321px;height:69px; font-family:黑体;line-height:69px; left:60px; top:10px;cursor:pointer;background:url(assets/img/ui/LogoLine.png) no-repeat center -5px;text-align:center" onclick="SetBlock($(\'dSurface\'),$(\'iSurfaceBackground\'),$(\'btnAdventure\'),$(\'btnSurvival\'))">点击开始</span></div></div>',
SelectModal = function(g) {
	var b = oS.GlobalVariables,
	c = oS.LvlVariables,
	a = window,
	d;
	for (d in b) {
		a[d] = b[d]
	}
	for (d in c) {
		a[d] = null
	}
	ClearGameState();
	HiddenOptions();
	HiddenLevel();
	HiddenMiniGame();
	SetHidden($("dCardList"));
	SetNone($("dSurface"), $("iSurfaceBackground"), $("btnAdventure"), $("btnSurvival"), $("tGround"), $("dSelectCard"), $("dTop"), $("dMenu"), $("dHandBook"), $("dNewPlant"), $("dProcess"));
	ClearChild($("dFlagMeterTitleB").firstChild);
	EDAll = $("dBody").replaceChild(EDNewAll, EDAll);
	$("dBody").replaceChild(EDNewFlagMeter, $("dFlagMeter"));
	ESSunNum = $("sSunNum");
	LoadLvl(g)
},


LoadLvl = function(b, a) { (b = b || 0) && oSym.Now == a && (b = 0);
	oSym.Timer && oSym.Stop();
	oSym.Init(function(d) {
		try {
			oS.Lvl = d;
			if (LevelData[d]) {
				LevelData[d]();
			}
		} catch(e) {
			var err = "LVL" + d + ": " + e.message;
			document.title = err;
			document.body.innerHTML = "<pre style=color:red;background:white;font-size:20px;padding:20px>" + err + "\n\n" + e.stack + "</pre>";
			throw e;
		}
	},
	[b])
},
AppearTombstones = function(j, d, h) {
	var l = oGd.gridTombstones,
	g = [],
	f = oS.R + 1,
	b,
	c = 0,
	k,
	a,
	e;
	while (--f) {
		e = d;
		while (e >= j) { ! l[f + "_" + e] && (g[c++] = [f, e--])
		}
	}
	while (h--) {
		k = g[e = Math.floor(Math.random() * g.length)];
		l[(f = k[0]) + "_" + (b = k[1])] = 1;
		g.splice(e, 1);
		a = NewEle("Tombstones_" + Math.random(), "div", "position:absolute;width:86px;height:91px;left:" + (GetX(b) - 43) + "px;top:" + (GetY(f) - 91) + "px", 0, EDAll);
		f = Math.floor(Math.random() * 4);
		b = Math.floor(Math.random() * 3);
		NewEle("", "div", "background-position:-" + 86 * b + "px -" + 91 * f + "px", {
			className: "Tom1"
		},
		a);
		NewEle("", "div", "background-position:-" + 86 * b + "px -" + 91 * f + "px", {
			className: "Tom2"
		},
		a)
	}
},
PauseGame = function(b) {
	var a = oSym;
	a.Timer ? (a.Stop(), innerText(b, "回到游戏"), $("dMenu1").onclick = null) : (a.Start(), innerText(b, "暂停游戏"), $("dMenu1").onclick = ClickMenu)
},
ClearGameState = function() {
	var e = oS.SelfVariables, d;
	if (e instanceof Array) {
		for (d = e.length; d--; delete oS[e[d]]) {}
		oS.SelfVariables.length = 0;
	}
	oS.LvlClearFunc && oS.LvlClearFunc();
	oS.GlobalVariables = {};
	oS.LvlVariables = {};
	oS.Lvl = 0;
	oSym.Stop();
},
ReturnToMenu = function() {
	ClearGameState();
	HiddenOptions();
	HiddenLevel();
	HiddenMiniGame();
	SetNone($("dOptionsMenuback"));
	SetBlock($("dSurface"),$("iSurfaceBackground"),$("btnAdventure"),$("btnSurvival"));
},
ClickMenu = function() {
	oSym.Timer && (oSym.Stop(), ShowOptions())
},
OptionsMenuDown = function(b, a) {
	b.className = "OptionsMenuButtonDown";
	a.style.lineHeight = "102px"
},
OptionsMenuUP = function(b, a) {
	b.className = "OptionsMenuButton";
	a.style.lineHeight = "100px"
},
ShowLevel = function() {
	SetNone($("btnAdventure"), $("btnSurvival"));
	SetBlock($("dSurfaceBack"), $("dOptionsMenuback"), $("dSelectLevel"), $("dTitleSmallContainer"))
},
HiddenLevel = function() {
	SetNone($("dSurfaceBack"), $("dOptionsMenuback"), $("dSelectLevel"), $("dTitleSmallContainer"))
},
ShowMiniGame = function() {
	SetNone($("btnAdventure"), $("btnSurvival"));
	SetBlock($("dSurfaceBack"), $("dOptionsMenuback"), $("dSelectLevel"), $("dMiniSmallContainer"))
},
HiddenMiniGame = function() {
	SetNone($("dSurfaceBack"), $("dOptionsMenuback"), $("dSelectLevel"), $("dMiniSmallContainer"))
},
ShowOptions = function() {
	SetNone($("btnAdventure"), $("btnSurvival"));
	SetBlock($("dSurfaceBack"), $("dOptionsMenuback"), $("dOptionsMenu"))
},
HiddenOptions = function() {
	SetNone($("dSurfaceBack"), $("dOptionsMenuback"), $("dOptionsMenu"));
	SetNone($("dSurface"));
	if (oS.Lvl) { oSym.Start(); innerText($("dMenu0"), "暂 停"); $("dMenu1").onclick = ClickMenu; }
	else { SetBlock($("dSurface"),$("iSurfaceBackground"),$("btnAdventure"),$("btnSurvival")); }
},
ShowHelp = function() {
	SetNone($("btnAdventure"), $("btnSurvival"));
	SetBlock($("dSurfaceBack"), $("dHelp"))
},
HiddenHelp = function() {
	SetNone($("dSurfaceBack"), $("dHelp"));
	SetBlock($("btnAdventure"),$("btnSurvival"));
},
LoadProProcess = function() {
	var a = $("JSProcess");
	if (!a) return;
	$User.Browser.IE ? a.onreadystatechange = function() {
		a.readyState == "loaded" && ClearChild(a)
	}: a.onload = function() {
		ClearChild(a)
	};
	a.onerror = function() {
		ClearChild(this)
	};
	a.src = "Process.js"
},
$ = function(a) {
	return document.getElementById(a)
},
$n = function(a) {
	return document.createElement(a)
},
ClearChild = function() {
	var a = arguments.length,
	c;
	while (a--) {
		try {
			c = arguments[a];
			c.parentNode.removeChild(c);
			c = null
		} catch(b) {}
	}
},
SetBlock = function() {
	var a = arguments.length;
	while (a--) {
		arguments[a].style.display = "block"
	}
},
SetNone = function() {
	var a = arguments.length;
	while (a--) {
		arguments[a].style.display = "none"
	}
},
SetHidden = function() {
	var a = arguments.length;
	while (a--) {
		arguments[a].style.visibility = "hidden"
	}
},
SetVisible = function() {
	var a = arguments.length;
	while (a--) {
		arguments[a].style.visibility = "visible"
	}
},
SetAlpha = function(c, b, a) {
	c.style.filter = "alpha(opacity=" + b + ")";
	c.style.opacity = a
},
SetStyle = function(d, b) {
	var c = d.style,
	a;
	for (a in b) {
		c[a] = b[a]
	}
	return d
},
NewImg = function(f, e, b, c, d) {
	var a = $n("img");
	a.src = e;
	b && (a.style.cssText = b);
	if (d) {
		for (v in d) {
			a[v] = d[v]
		}
	}
	f && (a.id = f);
	c && c.appendChild(a);
	return a
},
EditImg = function(e, f, c, b, a) {
	f && (e.id = f);
	c && (e.src = c);
	b && SetStyle(e, b);
	a && a.appendChild(e);
	return e
},
NewEle = function(h, b, d, a, e, f, g, c) {
	g = $n(b);
	h && (g.id = h);
	d && (g.style.cssText = d);
	if (a) {
		for (c in a) {
			g[c] = a[c]
		}
	}
	if (f) {
		for (c in f) {
			g.setAttribute(c, f[c])
		}
	}
	e && e.appendChild(g);
	return g
},
EditEle = function(g, f, a, e, b, c) {
	if (f) {
		for (c in f) {
			g.setAttribute(c, f[c])
		}
	}
	a && SetStyle(g, a);
	if (b) {
		for (c in b) {
			g[c] = b[c]
		}
	}
	e && e.appendChild(g);
	return g
},
NewO = function(b, a) {
	return (a = function() {}).prototype = b,
	a
},
SetPrototype = function(d, c, a) {
	a = d.prototype;
	for (var b in c) {
		a[b] = c[b]
	}
},
InheritO = function(d, i, c, g, b, h, f, e, a) {
	var g = function() {};
	g.prototype = new d;
	i && SetPrototype(g, i);
	if (c) {
		a = g.prototype;
		for (f in c) {
			b = a[f].slice(0);
			h = c[f];
			for (e in h) {
				b[e] = h[e]
			}
			g.prototype[f] = b
		}
	}
	return g
},
Compare = function(e, b, a, c, d) {
	return d = e < b ? b: e > a ? a: e,
	c ? [c(d), d] : [d]
},
$Switch = function(h, d, c, a, g, b, e) {
	b = 0;
	g = d.length;
	e = c;
	while (b < g) {
		if (e(h, d[b])) {
			break
		}++b
	}
	return a[b]
},
$SEql = function(d, c, a, b) {
	return (a = c[d]) != b ? a: c["default"]
};
$SSml = function(d, c, a) {
	var b = 0;
	LX = c.length;
	while (b < LX) {
		if (d < c[b]) {
			break
		}++b
	}
	return a[b]
},
$SGrt = function(d, c, a) {
	var b = 0;
	LX = c.length;
	while (b < LX) {
		if (d > c[b]) {
			break
		}++b
	}
	return a[b]
},
ImgSpriter = function(h, c, e, f, g) {
	var b = e[f],
	d = b[2],
	a = $(h);
	a && (a.style.backgroundPosition = b[0], oSym.addTask(b[1] * 0.1,
	function(j) {
		j > -1 ? ImgSpriter(h, c, e, j, g) : g(h, c)
	},
	[d]))
};
var CPlants = NewO({
	name: "Plants",
	HP: 300,
	PKind: 1,
	beAttackedPointL: 20,
	NormalGif: 2,
	CardGif: 0,
	canEat: 1,
	zIndex: 0,
	coolTime: 5000,
	canTrigger: 1,
	Stature: 0,
	Sleep: 0,
	CanGrow: function(c, b, d) {
		var a = b + "_" + d;
		return oGd.gridLF[b] == 1 ? !(d < 1 || d > 9 || oGd.gridCrater[a] || oGd.gridTombstones[a] || c[1]) : c[0] && !c[1]
	},
	getHurt: function(d, b, a) {
		var c = this; ! (b % 3) ? (c.HP -= a) < 1 && c.Die() : c.Die(1)
	},
	GetDY: function(b, c, a) {
		return a[0] ? -21 : -15
	},
	GetDX: function() {
		return - Math.floor(this.width * 0.5)
	},
	GetDBottom: function() {
		return this.height
	},
	Birth: function(d, c, h, a, l) {
		var e = this,
		k = d + e.GetDX(),
		i = c + e.GetDY(h, a, l),
		g = i - e.height,
		b = e.id = "P_" + Math.random(),
		j = e.zIndex += 3 * h,
		f = $Pn[e.EName].cloneNode(true);
		e.pixelLeft = k;
		e.pixelRight = k + e.width;
		e.pixelTop = g;
		e.pixelBottom = g + e.GetDBottom();
		e.opacity = 1;
		e.InitTrigger(e, b, e.R = h, e.C = a, e.AttackedLX = k + e.beAttackedPointL, e.AttackedRX = k + e.beAttackedPointR);
		$P[b] = e;
		e.BirthStyle(e, b, f, {
			left: k + "px",
			top: g + "px",
			zIndex: j
		});
		oGd.add(e, h + "_" + a + "_" + e.PKind);
		e.PrivateBirth(e)
	},
	getShadow: function(a) {
		return "left:" + (a.width * 0.5 - 48) + "px;top:" + (a.height - 22) + "px"
	},
	BirthStyle: function(c, d, b, a) {
		EditEle(b, {
			id: d
		},
		a, EDAll)
	},
	PrivateBirth: function(a) {},
	getTriggerRange: function(a, b, c) {
		return [[b, oS.W, 0]]
	},
	getTriggerR: function(a) {
		return [a, a]
	},
	InitTrigger: function(c, b, f, a, h, g) {
		var j = {},
		i = c.getTriggerR(f),
		e = i[0],
		d = i[1];
		do {
			oT.add(e, j[e] = c.getTriggerRange(e, h, g), b)
		} while ( e ++!= d );
		c.oTrigger = j
	},
	TriggerCheck: function(b, a) {
		this.AttackCheck2(b) && (this.canTrigger = 0, this.CheckLoop(b.id, a))
	},
	CheckLoop: function(b, c) {
		var a = this.id;
		this.NormalAttack(b);
		oSym.addTask(140,
		function(e, f, h) {
			var g; (g = $P[e]) && g.AttackCheck1(f, h)
		},
		[a, b, c])
	},
	AttackCheck1: function(g, f) {
		var b = this,
		c = b.oTrigger,
		a = $Z[g],
		h,
		e,
		k,
		j;
		if (a && (h = c[a.R])) {
			k = a.ZX;
			e = h.length;
			while (e--) {
				j = h[e];
				if (j[0] <= k && j[1] >= k && b.AttackCheck2(a)) {
					b.CheckLoop(g, j[2]);
					return
				}
			}
		}
		b.canTrigger = 1
	},
	AttackCheck2: function(a) {
		return a.Altitude > 0
	},
	PrivateDie: function(a) {},
	Die: function(a) {
		var b = this,
		c = b.id;
		b.oTrigger && oT.delP(b);
		b.HP = 0;
		delete $P[c];
		delete oGd.grid[b.R + "_" + b.C + "_" + b.PKind]; ! a && ClearChild($(c));
		b.PrivateDie(b)
	}
}),
oStarfruit = InheritO(CPlants, {
	EName: "oStarfruit",
	CName: "杨桃",
	width: 77,
	height: 70,
	beAttackedPointR: 57,
	SunNum: 25,
	PicArr: ["assets/img/cards/Starfruit.png", "assets/img/cards/StarfruitG.png", "assets/img/plants/Starfruit/Starfruit.gif", "assets/img/plants/Starfruit/Star.gif"],
	Tooltip: "向五个方向发射小杨桃",
	Produce: '杨桃可以向五个方向发射小杨桃。<p>伤害：<font color="#FF0000">中等</font><br>范围：<font color="#FF0000">五个方向</font></p>杨桃：“嘿，哥们，有一天我去看牙医，他说我有四个牙洞。我一数，我就只有一颗牙齿！一颗牙齿长了四个牙洞？怎么会这样啊？”',
	GetDY: function(b, c, a) {
		return a[0] ? -17 : -10
	},
	PrivateBirth: function(d) {
		var c = d.pixelLeft + 38,
		b = c - 15,
		a = d.pixelTop + 15;
		d.BulletClass = NewO({
			X: c,
			R: d.R,
			pixelLeft: b,
			pixelTop: a,
			F: oGd.MB3
		});
		d.BulletEle = NewImg(0, "assets/img/plants/Starfruit/Star.gif", "left:" + b + "px;top:" + a + "px;z-index:" + (d.zIndex + 2))
	},
	PrivateDie: function(a) {
		a.BulletEle = null
	},
	NormalAttack: function() {
		var g = this,
		d, b = oGd.gridB,
		e = 5,
		h, a = [1, 2, 4, 6, 7],
		f = g.BulletClass,
		c = g.BulletEle;
		while (e--) { (function(j) {
				h = (d = new f).id = "StarB" + Math.random();
				d.D = a[j];
				EditEle(c.cloneNode(false), {
					id: h
				},
				0, EDAll);
				b.push(d);
				oSym.addTask(15,
				function(k) {
					var i = $(k);
					i && SetBlock(i)
				},
				[h])
			})(e)
		}
	}
}),
oPeashooter = InheritO(CPlants, {
	EName: "oPeashooter",
	CName: "豌豆射手",
	width: 71,
	height: 71,
	beAttackedPointR: 57,
	SunNum: 100,
	BKind: 0,
	PicArr: ["assets/img/cards/Peashooter.png", "assets/img/cards/PeashooterG.png", "assets/img/plants/Peashooter/Peashooter.gif", "assets/img/plants/PB00.gif", "assets/img/plants/PeaBulletHit.gif"],
	Tooltip: "向敌人射出豌豆",
	Produce: '豌豆射手，你的第一道防线。它们通过发射豌豆来攻击僵尸。<p>伤害：<font color="#FF0000">中等</font></p>一棵植物，怎么能如此快地生长，并发射如此多的豌豆呢？豌豆射手：“努力工作，风险自己，再加上一份阳光，高纤维和氧化碳均衡搭配，这种健康早餐让一切成为可能。”',
	PrivateBirth: function(c) {
		var b = c.AttackedLX,
		a = b - 40;
		c.BulletClass = NewO({
			X: b,
			R: c.R,
			D: 0,
			Attack: 50,
			Kind: c.BKind,
			ChangeC: 0,
			pixelLeft: a,
			F: oGd.MB1
		});
		c.BulletEle = NewImg(0, c.PicArr[3], "left:" + a + "px;top:" + (c.pixelTop + 3) + "px;display:none;z-index:" + (c.zIndex + 2))
	},
	PrivateDie: function(a) {
		a.BulletEle = null
	},
	NormalAttack: function() {
		var b = this,
		a = new b.BulletClass,
		c = a.id = "PB" + Math.random();
		EditEle(b.BulletEle.cloneNode(false), {
			id: c
		},
		0, EDAll);
		oGd.gridB.push(a);
		oSym.addTask(15,
		function(e) {
			var d = $(e);
			d && SetBlock(d)
		},
		[c])
	}
}),
oSnowPea = InheritO(oPeashooter, {
	EName: "oSnowPea",
	CName: "寒冰射手",
	SunNum: 125,
	coolTime: 10000,
	BKind: -1,
	PicArr: ["assets/img/cards/SnowPea.png", "assets/img/cards/SnowPeaG.png", "assets/img/plants/SnowPea/SnowPea.gif", "assets/img/plants/PB-10.gif", "assets/img/plants/PeaBulletHit.gif"],
	Tooltip: "寒冰射手可造成伤害, 同时又有减速效果",
	Produce: '寒冰射手会发射寒冰豌豆来攻击敌人，并具有减速效果。<p>伤害：<font color="#FF0000">中等，带有减速效果</font></p>人们经常告诉寒冰射手他是多么“冷酷”，或者告诫他要“冷静”。他们叫他要“保持镇静”。寒冰射手只是转转他的眼睛。其实他都听见了。'
}),
oRepeater = InheritO(oPeashooter, {
	EName: "oRepeater",
	CName: "双发射手",
	width: 73,
	height: 71,
	beAttackedPointR: 53,
	SunNum: 125,
	PicArr: ["assets/img/cards/Repeater.png", "assets/img/cards/RepeaterG.png", "assets/img/plants/Repeater/Repeater.gif", "assets/img/plants/PB00.gif", "assets/img/plants/PeaBulletHit.gif"],
	Tooltip: "一次发射两颗豌豆",
	Produce: '双发射手可以一次发射两颗豌豆<p>伤害：<font color="#FF0000">中等(每颗)</font><br>发射速度：<font color="#FF0000">两倍</font></p>双发射手很凶悍，他是在街头混大的。他不在乎任何人的看法，无论是植物还是僵尸，他打出豌豆，是为了让别人离他远点。其实呢，双发射手一直暗暗地渴望着爱情。',
	NormalAttack: function(b, f) {
		var c = this,
		e = c.id,
		a = new c.BulletClass,
		d = a.id = "PB" + Math.random(),
		f;
		EditEle(c.BulletEle.cloneNode(false), {
			id: d
		},
		0, EDAll);
		oGd.gridB.push(a);
		oSym.addTask(15,
		function(h) {
			var g = $(h);
			g && SetBlock(g)
		},
		[d]);
		f ? ++f: f = 1;
		f < 2 && oSym.addTask(15,
		function(j, g, i) {
			var h; (h = $P[j]) && h.NormalAttack(g, i)
		},
		[e, b, f])
	}
}),
oThreepeater = InheritO(oPeashooter, {
	EName: "oThreepeater",
	CName: "三线射手",
	width: 73,
	height: 80,
	beAttackedPointR: 53,
	SunNum: 150,
	PicArr: ["assets/img/cards/Threepeater.png", "assets/img/cards/ThreepeaterG.png", "assets/img/plants/Threepeater/Threepeater.gif", "assets/img/plants/PB00.gif", "assets/img/plants/PeaBulletHit.gif"],
	Tooltip: "一次射出三行的豌豆",
	Produce: '三线射手可以在三条线上同时射出豌豆。<p>伤害：<font color="#FF0000">普通(每颗)</font><br>范围：<font color="#FF0000">三线</font></p>三线射手喜欢读书，下棋和在公园里呆坐。他也喜欢演出，特别是现代爵士乐。“我正在寻找我生命中的另一半，”他说。三线射手最爱的数字是5。',
	getTriggerR: function(a) {
		return [a > 2 ? a - 1 : 1, a < oS.R ? a + 1 : a]
	},
	PrivateBirth: function(f) {
		var e = f.AttackedLX,
		d = e - 40,
		a, c = f.oTrigger,
		b;
		f.BulletClass = [];
		f.BulletEle = [];
		for (b in c) {
			f.BulletClass.push(NewO({
				X: e,
				R: b,
				D: 0,
				Attack: 20,
				Kind: 0,
				ChangeC: 0,
				pixelLeft: d,
				F: oGd.MB1
			}));
			f.BulletEle.push(NewImg(0, "assets/img/plants/PB00.gif", "left:" + d + "px;top:" + (GetY(b) - 50) + "px;display:none;z-index:" + (3 * b + 2)))
		}
	},
	PrivateDie: function(a) {
		a.BulletEle.length = 0
	},
	NormalAttack: function() {
		var e = this,
		d = e.BulletClass,
		c = e.BulletEle,
		b, f, a = d.length;
		while (a--) {
			b = new d[a];
			oSym.addTask(15,
			function(h) {
				var g = $(h);
				g && SetBlock(g)
			},
			[f = b.id = "PB" + Math.random()]);
			EditEle(c[a].cloneNode(false), {
				id: f
			},
			0, EDAll);
			oGd.gridB.push(b)
		}
	}
}),
oGatlingPea = InheritO(oPeashooter, {
	EName: "oGatlingPea",
	CName: "加特林",
	width: 88,
	height: 84,
	beAttackedPointR: 68,
	SunNum: 200,
	coolTime: 7500,
	PicArr: ["assets/img/cards/GatlingPea.png", "assets/img/cards/GatlingPeaG.png", "assets/img/plants/GatlingPea/GatlingPea.gif", "assets/img/plants/PB00.gif", "assets/img/plants/PeaBulletHit.gif"],
	Tooltip: "一次发射四颗豌豆<br>(需要双发射手)",
	Produce: '加特林可以一次发射四颗豌豆<p>伤害：<font color="#FF0000">中等(每颗)</font><br>发射速度：<font color="#FF0000">四倍<br>只能种在双发射手上</font></p>当加特林宣布他要参军的时候，他的父母很为他担心，他们异口同声地对他说：“亲爱的，但这太危险了。”加特林拒绝让步，“生活本就危险，”他这样回答着，此时他的眼睛里，正闪烁着钢铁般的信念。',
	PrivateBirth: function(c) {
		var b = c.AttackedLX,
		a = b - 40;
		c.BulletClass = NewO({
			X: b,
			R: c.R,
			D: 0,
			Attack: 20,
			Kind: c.BKind,
			ChangeC: 0,
			pixelLeft: a,
			F: oGd.MB1
		});
		c.BulletEle = NewImg(0, c.PicArr[3], "left:" + a + "px;top:" + (c.pixelTop + 8) + "px;display:none;z-index:" + (c.zIndex + 2))
	},
	CanGrow: function(b, a, d) {
		var c = b[1];
		return c && c.EName == "oRepeater"
	},
	NormalAttack: function(b, f) {
		var c = this,
		e = c.id,
		a = new c.BulletClass,
		d = a.id = "PB" + Math.random(),
		f;
		EditEle(c.BulletEle.cloneNode(false), {
			id: d
		},
		0, EDAll);
		oGd.gridB.push(a);
		oSym.addTask(15,
		function(h) {
			var g = $(h);
			g && SetBlock(g)
		},
		[d]);
		f ? ++f: f = 1;
		f < 4 && oSym.addTask(15,
		function(j, g, i) {
			var h; (h = $P[j]) && h.NormalAttack(g, i)
		},
		[e, b, f])
	}
}),
oSplitPea = InheritO(oPeashooter, {
	EName: "oSplitPea",
	CName: "分裂射手",
	width: 92,
	height: 72,
	beAttackedPointR: 72,
	SunNum: 125,
	PicArr: ["assets/img/cards/SplitPea.png", "assets/img/cards/SplitPeaG.png", "assets/img/plants/SplitPea/SplitPea.gif", "assets/img/plants/PB00.gif", "assets/img/plants/PB01.gif", "assets/img/plants/PeaBulletHit.gif"],
	Tooltip: "前后双向发射豌豆",
	Produce: '分裂射手，可以向前后两个方向发射豌豆。<p>伤害：<font color="#FF0000">中等</font><br>范围：<font color="#FF0000">前面和后面</font><br>发射速度：<font color="#FF0000">前面为正常速度，后面为两倍速度</font></p>分裂射手：“没错，我就是双子座。我知道，这的确很令人惊奇。不过，有两个头，或者实际上，长着一个头和一个类似头的东西，在背上，对我这条线上的防守帮助很大。',
	GetDX: function() {
		return - 55
	},
	getTriggerRange: function(a, b, c) {
		return [[100, b + 25, 1], [b + 26, oS.W, 0]]
	},
	PrivateBirth: function(f) {
		var c = f.R,
		a = 0,
		g, d = [f.AttackedLX, f.AttackedRX],
		e = [d[0] - 40, d[1] - 16],
		b = "px;top:" + (f.pixelTop + 3) + "px;display:none;z-index:" + f.zIndex + 2;
		f.BulletClass = [];
		f.BulletEle = [];
		f.aTri = [0, 0];
		while (a < 2) {
			f.BulletClass[a] = NewO({
				X: d[a],
				pixelLeft: g = e[a],
				R: c,
				D: a,
				Attack: 20,
				Kind: 0,
				ChangeC: 0,
				F: oGd.MB1
			});
			f.BulletEle[a] = NewImg(0, f.PicArr[++a + 2], "left:" + g + b)
		}
	},
	PrivateDie: function(a) {
		a.BulletEle.length = 0
	},
	TriggerCheck: function(b, a) {
		if (this.aTri[a]) {
			return
		}
		if (this.AttackCheck2(b)) {++this.aTri[a];
			this.aTri[0] && this.aTri[1] && (this.canTrigger = 0);
			this.CheckLoop(b.id, a)
		}
	},
	AttackCheck1: function(b, f) {
		var e = this,
		c = $Z[b],
		a;
		if (c && (c.R == e.R)) {
			a = c.ZX > e.AttackedLX + 25 ? 0 : 1;
			f == a ? (e.AttackCheck2(c) ? e.CheckLoop(b, f) : --e.aTri[f]) : (++e.aTri[a], --e.aTri[f])
		} else {--e.aTri[f]
		}
		e.canTrigger = e.aTri[0] && e.aTri[1] ? 0 : 1
	},
	CheckLoop: function(a, b) {
		this.NormalAttack(b);
		oSym.addTask(140,
		function(c, e, g) {
			var f; (f = $P[c]) && f.AttackCheck1(e, g)
		},
		[this.id, a, b])
	},
	NormalAttack: function(d, f) {
		var c = this,
		a = c.id,
		b = new c.BulletClass[d],
		e = b.id = "PB" + Math.random();
		oGd.gridB.push(b);
		EditEle(c.BulletEle[d].cloneNode(false), {
			id: e
		},
		0, EDAll);
		oSym.addTask(15,
		function(h) {
			var g = $(h);
			g && SetBlock(g)
		},
		[e]);
		d && !f && oSym.addTask(15,
		function(g) {
			var h = $P[g];
			h && h.NormalAttack(1, 1)
		},
		[a])
	}
}),
oSunFlower = InheritO(CPlants, {
	EName: "oSunFlower",
	CName: "超级向日葵",
	width: 73,
	height: 74,
	beAttackedPointR: 53,
	SunNum: 50,
	PicArr: ["assets/img/cards/SunFlower.png", "assets/img/cards/SunFlowerG.png", "assets/img/plants/SunFlower/SunFlower.gif"],
	Tooltip: "提供你额外的阳光",
	Produce: '向日葵，为你生产额外阳光的经济作物。尝试尽可能多种植吧！<p>阳光产量：<font color="#FF0000">中等</font></p>向日葵情不自禁地和着节拍起舞。是什么节拍呢？嗨，是大地自己用来提神的爵士节拍，这种频率的节拍，只有向日葵才能听到。',
	PrivateBirth: function(a) {
		oSym.addTask(600,
		function(d, c, b) {
			$P[d] && (AppearSun(Math.floor(c + Math.random() * 41), b, 100, 0), oSym.addTask(2400, arguments.callee, [d, c, b]))
		},
		[a.id, GetX(a.C) - 40, GetY(a.R)])
	},
	InitTrigger: function() {}
}),
oTwinSunflower = InheritO(oSunFlower, {
	EName: "oTwinSunflower",
	CName: "双子向日葵",
	width: 83,
	height: 84,
	beAttackedPointR: 63,
	SunNum: 75,
	coolTime: 5000,
	PicArr: ["assets/img/cards/TwinSunflower.png", "assets/img/cards/TwinSunflowerG.png", "assets/img/plants/TwinSunflower/TwinSunflower.gif"],
	Tooltip: "一次提供两倍于向日葵的阳光量<br>(需要向日葵)",
	Produce: '双子向日葵的阳光产量是普通向日葵的两倍。<p>阳光产量：<font color="#FF0000">双倍<br>只能种在普通向日葵上</font></p>这是一个疯狂的夜晚，禁忌的科学技术，让双子向日葵来到了这个世界。电闪雷鸣，狂风怒吼，都在表示着这个世界对他的拒绝。但是一切都无济于事，双子向日葵他却仍然活着！',
	CanGrow: function(b, a, d) {
		var c = b[1];
		return c && c.EName == "oSunFlower"
	},
	PrivateBirth: function(a) {
		var b = GetX(a.C);
		oSym.addTask(600,
		function(f, d, c, e) {
			$P[f] && (AppearSun(d, e, 25, 0), AppearSun(c, e, 25, 0), oSym.addTask(2400, arguments.callee, [f, d, c, e]))
		},
		[a.id, b - 10, b + 10, GetY(a.R)])
	}
}),
oPumpkinHead = InheritO(CPlants, {
	EName: "oPumpkinHead",
	CName: "南瓜头",
	width: 97,
	height: 67,
	beAttackedPointL: 15,
	beAttackedPointR: 82,
	SunNum: 50,
	PKind: 2,
	HP: 4000,
	coolTime: 5000,
	zIndex: 1,
	PicArr: ["assets/img/cards/PumpkinHead.png", "assets/img/cards/PumpkinHeadG.png", "assets/img/plants/PumpkinHead/PumpkinHead.gif", "assets/img/plants/PumpkinHead/PumpkinHead1.gif", "assets/img/plants/PumpkinHead/PumpkinHead2.gif", "assets/img/plants/PumpkinHead/pumpkin_damage1.gif", "assets/img/plants/PumpkinHead/pumpkin_damage2.gif", "assets/img/plants/PumpkinHead/Pumpkin_back.gif"],
	Tooltip: "能保护种在里面的植物",
	Produce: '南瓜头，可以用他的外壳保护其他植物。<p>韧性：<font color="#FF0000">高</font><br>特点：<font color="#FF0000">可以种在其他植物上</font></p>南瓜头最近都没收到，关于他表哥刃菲尔德的消息。很明显，刃菲尔德是个大明星，是一种……叫什么运动来着……的体育明星？佩格跳跳球大师？南瓜头反正搞不懂是什么运动，他只想做好他自己的工作。',
	CanGrow: function(c, b, d) {
		var a = b + "_" + d;
		return c[2] ? 1 : oGd.gridLF[b] == 1 ? !(d < 1 || d > 9 || oGd.gridCrater[a] || oGd.gridTombstones[a]) : c[0]
	},
	GetDY: function(b, c, a) {
		return a[0] ? -12 : -5
	},
	HurtStatus: 0,
	getHurt: function(e, c, b) {
		var d = this,
		f = d.id,
		a = $(f);
		switch (true) {
		case c && c < 3 : d.Die(1);
			break;
		case (d.HP -= b) < 1 : d.Die();
			break;
		case d.HP < 1334 : d.HurtStatus < 2 && (d.HurtStatus = 2, a.childNodes[1].src = "assets/img/plants/PumpkinHead/pumpkin_damage2.gif");
			break;
		case d.HP < 2667 : d.HurtStatus < 1 && (d.HurtStatus = 1, a.childNodes[1].src = "assets/img/plants/PumpkinHead/pumpkin_damage1.gif", $(f + "_2").src = "assets/img/plants/PumpkinHead/Pumpkin_back.gif")
		}
	},
	InitTrigger: function() {},
	BirthStyle: function(c, d, b, a) {
		b.childNodes[1].src = "assets/img/plants/PumpkinHead/PumpkinHead1.gif";
		EditEle(b, {
			id: d
		},
		a, EDAll);
		NewImg(d + "_2", "assets/img/plants/PumpkinHead/PumpkinHead2.gif", "left:" + c.pixelLeft + "px;top:" + c.pixelTop + "px;z-index:" + (c.zIndex - 2), EDAll)
	},
	PrivateDie: function(a) {
		ClearChild($(a.id + "_2"))
	}
}),
oFlowerPot = InheritO(CPlants, {
	EName: "oFlowerPot",
	CName: "花盆",
	width: 72,
	height: 68,
	beAttackedPointR: 52,
	SunNum: 0,
	PicArr: ["assets/img/cards/FlowerPot.png", "assets/img/cards/FlowerPotG.png", "assets/img/plants/FlowerPot/FlowerPot.gif"],
	PKind: 0,
	Stature: -1,
	GetDY: function(b, c, a) {
		return 6
	},
	CanGrow: function(e, d, f) {
		var c = d + "_" + f,
		b = oGd.gridLF[d],
		a = f < 1 || f > 9;
		return b % 2 ? b < 3 ? !(a || e[1] || e[2] || e[0] || oGd.gridCrater[c] || oGd.gridTombstones[c]) : !(a || e[0] || oGd.gridCrater[c]) : 0
	},
	Tooltip: "可以让植物栽种在屋顶上",
	Produce: '花盆可以让你在屋顶上种植植物。<p>特点：<font color="#FF0000">允许你在屋顶上种植</font></p>“我是一个让植物栽种的花盆，但我也是一棵植物。是不是很意外？',
	InitTrigger: function() {}
}),
oLilyPad = InheritO(oFlowerPot, {
	EName: "oLilyPad",
	CName: "睡莲",
	width: 79,
	height: 58,
	beAttackedPointR: 59,
	PicArr: ["assets/img/cards/LilyPad.png", "assets/img/cards/LilyPadG.png", "assets/img/plants/LilyPad/LilyPad.gif"],
	CanGrow: function(c, b, d) {
		var a = b + "_" + d;
		return ! (d < 1 || d > 9 || oGd.gridLF[b] - 2 || c[0] || oGd.gridCrater[a])
	},
	Tooltip: "使你能够将非水生植物种在上面",
	Produce: '睡莲可以让你种植非水生植物在它上面。<p>特点：<font color="#FF0000">非水生植物可以种植在它上面<br>必须种植在水面</font></p>睡莲从不抱怨，它也从来不想知道发生了什么事。在它身上种植物，它也不会说什么。难道，它有什么惊奇想法或者可怕的秘密？没人知道。睡莲把这些都埋藏在心底。'
}),
oPotatoMine = InheritO(CPlants, {
	EName: "oPotatoMine",
	CName: "土豆雷",
	width: 75,
	height: 55,
	beAttackedPointR: 55,
	SunNum: 0,
	coolTime: 10000,
	Stature: -1,
	CanGrow: function(d, c, e) {
		var b = c + "_" + e,
		a = oGd.gridLF[c];
		return a % 2 ? a < 3 ? !(e < 1 || e > 9 || d[1] || oGd.gridCrater[b] || oGd.gridTombstones[b]) : d[0] && !d[1] : 0
	},
	PicArr: ["assets/img/cards/PotatoMine.png", "assets/img/cards/PotatoMineG.png", "assets/img/plants/PotatoMine/PotatoMine.gif", "assets/img/plants/PotatoMine/PotatoMineNotReady.gif", "assets/img/plants/PotatoMine/PotatoMine_mashed.gif", "assets/img/plants/PotatoMine/ExplosionSpudow.gif"],
	Tooltip: "敌人接触后爆炸<br>需要时间安放",
	Produce: '土豆雷具有强大的威力，但是他们需要点时间来武装自己。你应把他们种在僵尸前进的路上，当他们一被接触就会发生爆炸。<p>伤害：<font color="FF0000">巨大</font><br>范围：<font color="#FF0000">一个小区域内的所有僵尸</font><br>使用方法：<font color="#FF0000">单独使用，需要一定准备时间才能起作用。</font></p>一些人说土豆雷很懒，因为他总是把所有事情留到最后。土豆雷才没空理他们，他正忙着考虑他的投资战略呢。',
	Status: 0,
	canTrigger: 0,
	BirthStyle: function(c, d, b, a) {
		b.childNodes[1].src = "assets/img/plants/PotatoMine/PotatoMineNotReady.gif";
		EditEle(b, {
			id: d
		},
		a, EDAll)
	},
	PrivateBirth: function(a) {
		oSym.addTask(1500,
		function(c) {
			var b = $P[c];
			b && ($(c).childNodes[1].src = "assets/img/plants/PotatoMine/PotatoMine.gif", b.Status = 1, b.canTrigger = 1, b.getHurt = function(g, e, d) {
				var f = this;
				e > 2 ? (f.HP -= d) < 1 && f.Die() : f.NormalAttack(f.pixelLeft, f.pixelLeft + f.width, f.R)
			})
		},
		[a.id])
	},
	getTriggerRange: function(a, b, c) {
		return [[b, c, 0]]
	},
	TriggerCheck: function(e, c) {
		var a = this.R,
		b = this.C;
		e.beAttacked && e.Altitude < 2 && !oGd.grid[a + "_" + b + "_2"] && this.NormalAttack(this.pixelLeft, this.pixelLeft + this.width, this.R)
	},
	NormalAttack: function(k, j, f) {
		var h = this,
		b = h.id,
		d = $(b),
		c = oZ.getArZ(k, j, f),
		g = c.length,
		a,
		l = h.pixelLeft,
		e = h.pixelTop;
		while (g--) { (a = c[g]).Altitude < 2 && a.getHurt(0, 0, 1800, 0, 0, 0, 2)
		}
		h.Die(1);
		EditEle(d.childNodes[1], {
			src: "assets/img/plants/PotatoMine/PotatoMine_mashed.gif"
		},
		{
			width: "132px",
			height: "93px",
			left: "-40px",
			top: "-20px"
		});
		NewImg(0, "assets/img/plants/PotatoMine/ExplosionSpudow.gif", "left:-90px;top:-40px", d);
		oSym.addTask(200,
		function(i) {
			ClearChild(i.lastChild);
			oSym.addTask(100, ClearChild, [i])
		},
		[d])
	}
}),
oTorchwood = InheritO(CPlants, {
	EName: "oTorchwood",
	CName: "火炬树桩",
	width: 73,
	height: 83,
	beAttackedPointR: 53,
	SunNum: 125,
	PicArr: ["assets/img/cards/Torchwood.png", "assets/img/cards/TorchwoodG.png", "assets/img/plants/Torchwood/Torchwood.gif", "assets/img/plants/PB00.gif", "assets/img/plants/PB01.gif", "assets/img/plants/PB10.gif", "assets/img/plants/PB11.gif", "assets/img/plants/Torchwood/SputteringFire.gif"],
	Tooltip: "通过火炬树桩的豌豆将变为火球",
	Produce: '火炬树桩可以把穿过他的豌豆变成火球，可以造成两倍伤害。<p>特点：<font color="#FF0000">让穿过他的火球造成两倍伤害。火球也会对附近僵尸造成溅射伤害</font></p>每个人都喜欢并敬重火炬树桩。他们喜欢他的诚实和坚贞的友谊，以及增强豌豆伤害的能力。但他也有自己的秘密：他不识字！',
	PrivateBirth: function(a) {
		oGd.gridTorch[a.R + "_" + a.C] = 1
	},
	InitTrigger: function() {},
	PrivateDie: function(a) {
		delete oGd.gridTorch[a.R + "_" + a.C]
	}
}),
oWallNut = InheritO(CPlants, {
	EName: "oWallNut",
	CName: "坚果墙",
	width: 65,
	height: 73,
	beAttackedPointR: 45,
	SunNum: 50,
	HP: 3000,
    Attack: 20,
	coolTime: 10000,
	PicArr: ["assets/img/cards/WallNut.png", "assets/img/cards/WallNutG.png", "assets/img/plants/WallNut/WallNut.gif", "assets/img/plants/WallNut/Wallnut_cracked1.gif", "assets/img/plants/WallNut/Wallnut_cracked2.gif"],
	Tooltip: "阻碍僵尸前进, 并保护你其他的植物",
	Produce: '坚果墙拥有足以让你用来保护其它植物的坚硬外壳。<p>韧性：<font color="FF0000">高</font></p>坚果墙：“人们想知道，经常被僵尸啃的感觉怎样？他们不知道，我有限的感官，只能让我感到一种麻麻的感觉，像是，令人放松的背部按摩。”',
	CanGrow: function(c, b, e) {
		var a = b + "_" + e,
		d = c[1];
		return d && d.EName == "oWallNut" ? 1 : oGd.gridLF[b] == 1 ? !(e < 1 || e > 9 || oGd.gridCrater[a] || oGd.gridTombstones[a] || d) : c[0] && !d
	},
	InitTrigger: function() {},
	HurtStatus: 0,
	getHurt: function(e, b, a) {
		var c = this,
		d = $(c.id).childNodes[1]; ! (b % 3) ? (c.HP -= a) < 1 ? c.Die() : c.HP < 1334 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "assets/img/plants/WallNut/Wallnut_cracked2.gif") : c.HP < 2667 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "assets/img/plants/WallNut/Wallnut_cracked1.gif") : c.Die(1)
	}
}),
oTallNut = InheritO(oWallNut, {
	EName: "oTallNut",
	CName: "高坚果",
	width: 83,
	height: 119,
	beAttackedPointR: 63,
	SunNum: 125,
	HP: 10000,
    Attack: 40,
	PicArr: ["assets/img/cards/TallNut.png", "assets/img/cards/TallNutG.png", "assets/img/plants/TallNut/TallNut.gif", "assets/img/plants/TallNut/TallnutCracked1.gif", "assets/img/plants/TallNut/TallnutCracked2.gif"],
	Tooltip: "不会被跳过的坚实壁垒",
	Produce: '高坚果是重型壁垒植物，而且不会被跨过。<p>韧性：<font color="#FF0000">非常高</font><br>特殊：<font color="#FF0000">不会被跨过或越过</font></p>人们想知道，坚果墙和高坚果是否在竞争。高坚果以男中音的声调大声笑了。“我们之间怎么会存在竞争关系？我们是哥们儿。你知道坚果墙为我做了什么吗……”高坚果的声音越来越小，他狡黠地笑着。”',
	CanGrow: function(c, b, e) {
		var a = b + "_" + e,
		d = c[1];
		return d && d.EName == "oTallNut" ? 1 : oGd.gridLF[b] == 1 ? !(e < 1 || e > 9 || oGd.gridCrater[a] || oGd.gridTombstones[a] || d) : c[0] && !d
	},
	Stature: 1,
	getHurt: function(e, b, a) {
		var c = this,
		d = $(c.id).childNodes[1]; ! (b % 3) ? (c.HP -= a) < 1 ? c.Die() : c.HP < 2667 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "assets/img/plants/TallNut/TallnutCracked2.gif") : c.HP < 5333 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "assets/img/plants/TallNut/TallnutCracked1.gif") : c.Die(1)
	}
}),
oCherryBomb = InheritO(CPlants, {
	EName: "oCherryBomb",
	CName: "樱桃炸弹",
	width: 112,
	height: 81,
	beAttackedPointR: 92,
	SunNum: 150,
	coolTime: 20000,
	PicArr: ["assets/img/cards/CherryBomb.png", "assets/img/cards/CherryBombG.png", "assets/img/plants/CherryBomb/CherryBomb.gif", "assets/img/plants/CherryBomb/Boom.gif"],
	Tooltip: "炸掉一定区域内的所有僵尸",
	Produce: '樱桃炸弹，能炸掉一定区域内所有僵尸。他们一种下就会立刻引爆。所以请把他们种在僵尸们的身边。<p>伤害：<font color="#FF0000">巨大</font><br>范围：<font color="#FF0000">一个中等区域内的所有僵尸</font><br>使用方法：<font color="#FF0000">单独使用，立即爆炸</font></p>“我要‘爆’开了。”樱桃一号说。“不，我们是要‘炸’开了！”它哥哥樱桃二号说。经过激烈的商议之后，他们才统一“爆炸这个说法。”',
	InitTrigger: function() {},
	getHurt: function() {},
	PrivateBirth: function(a) {
		oSym.addTask(63,
		function(b) {
			var c = $P[b];
			if (c) {
				var f = $(b),
				j = c.R,
				g = j > 2 ? j - 1 : 1,
				e = j < oS.R ? j + 1 : oS.R,
				l = c.pixelLeft - 80,
				k = c.pixelLeft + 160,
				d,
				h;
				do {
					h = (d = oZ.getArZ(l, k, g)).length;
					while (h--) {
						d[h].getHurt(0, 0, 1800, 0, 0, 0, 1)
					}
				} while ( g ++< e );
				c.Die(1);
				EditEle(f.childNodes[1], {
					src: "assets/img/plants/CherryBomb/Boom.gif"
				},
				{
					width: "213px",
					height: "160px",
					left: "-50px",
					top: "-30px"
				});
				oSym.addTask(65, ClearChild, [f])
			}
		},
		[a.id])
	}
}),
oJalapeno = InheritO(oCherryBomb, {
	EName: "oJalapeno",
	CName: "火爆辣椒",
	width: 68,
	height: 89,
	beAttackedPointR: 48,
	PicArr: ["assets/img/cards/Jalapeno.png", "assets/img/cards/JalapenoG.png", "assets/img/plants/Jalapeno/Jalapeno.gif", "assets/img/plants/Jalapeno/JalapenoAttack.gif"],
	Tooltip: "消灭整行的敌人",
	Produce: '火爆辣椒可以摧毁一整条线上的敌人。<p>伤害：<font color="#FF0000">极高</font><br>范围：<font color="#FF0000">整条线上的僵尸</font><br>用法：<font color="#FF0000">单独使用，立即生效</font></p>“嘎嘎嘎嘎嘎嘎嘎！！！”火爆辣椒说。他现在不会爆炸，还不到时候，不过快了，喔~，快了快了，快来了。他知道，他感受到了，他一生都是在等待这个时刻！',
	PrivateBirth: function(a) {
		oSym.addTask(72,
		function(g) {
			var f = $P[g];
			if (f) {
				var b = $(g),
				e = f.R,
				c = oZ.getArZ(100, oS.W, e),
				d = c.length;
				while (d--) {
					c[d].getHurt(0, 0, 1800, 0, 0, 0, 1)
				}
				f.Die(1);
				EditEle(b.childNodes[1], {
					src: "assets/img/plants/Jalapeno/JalapenoAttack.gif"
				},
				{
					left: 120 - f.pixelLeft + "px",
					top: "-42px"
				});
				oSym.addTask(135, ClearChild, [b])
			}
		},
		[a.id])
	}
}),
oSpikeweed = InheritO(CPlants, {
	EName: "oSpikeweed",
	CName: "地刺",
	width: 85,
	height: 35,
	beAttackedPointL: 10,
	beAttackedPointR: 75,
	SunNum: 75,
	Stature: -1,
	canEat: 0,
	PicArr: ["assets/img/cards/Spikeweed.png", "assets/img/cards/SpikeweedG.png", "assets/img/plants/Spikeweed/Spikeweed.gif"],
	Attack: 20,
	ArZ: {},
	Tooltip: "扎破轮胎, 也能伤害走在上面的僵尸",
	Produce: '地刺可以扎破轮胎，并对踩到他的僵尸造成伤害<p>伤害：<font color="#FF0000">普通</font><br>范围：<font color="#FF0000">所有踩到他的僵尸</font><br>特点：<font color="#FF0000">不会被僵尸吃掉</font></p>地刺痴迷冰球，他买了包厢的季票。他一直关注着他喜欢的球员，他也始终如一的在赛后清理冰球场。但只有一个问题：他害怕冰球。',
	CanGrow: function(c, b, d) {
		var a = b + "_" + d;
		return ! (d < 1 || d > 9 || oGd.gridLF[b] - 1 || c[1] || c[0] || oGd.gridCrater[a] || oGd.gridTombstones[a])
	},
	getHurt: function(d, b, a) {
		var c = this; ! (b % 3) ? (c.HP -= a) < 1 && c.Die() : b < 2 ? (d.getHurt(1, 0, 20, 0, 0, 0, 0), c.Die(1)) : (d.HP = d.BreakPoint, d.GoingDie(), c.Die())
	},
	NormalAttack: function(b, a) {
		$Z[b].getHurt(1, 0, this.Attack, 0, 0, 0, 0)
	},
	GetDY: function(b, c, a) {
		return - 2
	},
	getTriggerRange: function(a, b, c) {
		return [[this.pixelLeft, this.pixelLeft + this.width, 0]]
	},
	TriggerCheck: function(i, h) {
		var c = i.id,
		g = this.ArZ,
		a, b, e, f; ! g[c] && (a = i.AttackedLX, b = i.AttackedRX, e = this.AttackedLX, f = this.AttackedRX, a <= f && a >= e || b <= f && b >= e || a <= e && b >= f) && this.AttackCheck2(i) && (g[c] = 1, this.NormalAttack(c), oSym.addTask(100,
		function(d, j) {
			var k = $P[d];
			k && delete k.ArZ[j]
		},
		[this.id, c]))
	},
	AttackCheck2: function(a) {
		return a.Altitude == 1 && a.beAttacked
	}
}),
oSpikerock = InheritO(oSpikeweed, {
	EName: "oSpikerock",
	CName: "地刺王",
	width: 84,
	height: 43,
	beAttackedPointL: 10,
	beAttackedPointR: 74,
	SunNum: 125,
	coolTime: 50000,
	PicArr: ["assets/img/cards/Spikerock.png", "assets/img/cards/SpikerockG.png", "assets/img/plants/Spikerock/Spikerock.gif"],
	Attack: 40,
	Tooltip: "能扎破多个轮胎, 并伤害经过上面的僵尸<br>(需要地刺)",
	Produce: '地刺王可以扎破多个轮胎，并对踩到他的僵尸造成伤害。<p><font color="#FF0000">必须种植在地刺上</font></p>地刺王刚刚从欧洲旅行回来。他玩的很高兴，也认识了很多有趣的人。这些都真的拓展了他的视野——他从来不知道，他们建造了这么大的博物馆，有这么多的画作。这对他来说太惊奇了。',
	CanGrow: function(b, a, d) {
		var c = b[1];
		return c && c.EName == "oSpikeweed"
	},
	GetDY: function(b, c, a) {
		return 0
	},
	getHurt: function(c, b, a) {
		switch (b) {
		case 2:
			c.HP = c.BreakPoint;
			c.GoingDie();
			break;
		case 1:
			c.getHurt(1, 0, 40, 0, 0, 0, 0)
		} (this.HP -= a) < 1 && this.Die()
	}
}),
oGarlic = InheritO(CPlants, {
	EName: "oGarlic",
	CName: "大蒜",
	width: 60,
	height: 59,
	beAttackedPointR: 40,
	SunNum: 0,
	HP: 5,
	PicArr: ["assets/img/cards/Garlic.png", "assets/img/cards/GarlicG.png", "assets/img/plants/Garlic/Garlic.gif", "assets/img/plants/Garlic/Garlic_body2.gif", "assets/img/plants/Garlic/Garlic_body3.gif"],
	Tooltip: "将僵尸赶到其它的横行",
	Produce: '大蒜可以让僵尸改变前进的路线。<p>范围：<font color="#FF0000">近距离接触</font><br>特点：<font color="#FF0000">改变僵尸的前进路线</font></p>路线转向，这不仅仅是大蒜的专业，更是他的热情所在。他在布鲁塞尔大学里，获得了转向学的博士学位。他能把路线向量和反击阵列，讲上一整天。他甚至会把家里的东西，推到街上去。不知道为啥，他老婆还可以忍受这些。',
	CanGrow: function(c, b, e) {
		var a = b + "_" + e,
		d = c[1];
		return d && d.EName == "oGarlic" ? 1 : oGd.gridLF[b] == 1 ? !(e < 1 || e > 9 || oGd.gridCrater[a] || oGd.gridTombstones[a] || d) : c[0] && !d
	},
	InitTrigger: function() {},
	HurtStatus: 0,
	getHurt: function(e, b, a) {
		var c = this,
		d = $(c.id).childNodes[1]; ! (b % 3) ? (c.HP -= 20) < 1 ? c.Die() : (c.ChangeR(c, e), c.HP < 134 ? c.HurtStatus < 2 && (c.HurtStatus = 2, d.src = "assets/img/plants/Garlic/Garlic_body3.gif") : c.HP < 267 && c.HurtStatus < 1 && (c.HurtStatus = 1, d.src = "assets/img/plants/Garlic/Garlic_body2.gif")) : c.Die(1)
	},
	ChangeR: function(f, a) {
		var d = f.R,
		c = [],
		k = d - 1,
		h,
		g = a.id,
		i = -1,
		b = $(g),
		j = b.childNodes[1],
		e = oGd.gridLF;
		a.CanPass(k, e[k]) && (c[++i] = k);
		a.CanPass(k += 2, e[k]) && (c[++i] = k);
		c.length ? (h = !a.WalkDirection ? -5 : 5, a.ZX += h, a.AttackedLX += h, a.AttackedRX += h, SetStyle(b, {
			left: (a.X += h) + "px",
			top: (a.pixelTop = GetY(k = c[Math.floor(Math.random() * c.length)]) - a.height) + "px",
			zIndex: a.zIndex = 3 * k + 1
		}), j.src = a.PicArr[a.NormalGif], oZ.moveTo(g, d, k)) : j.src = a.PicArr[a.NormalGif];
		a.isAttacking = 0
	}
}),
oSquash = InheritO(CPlants, {
	EName: "oSquash",
	CName: "窝瓜",
	width: 100,
	height: 226,
	beAttackedPointR: 67,
	SunNum: 50,
	coolTime: 30000,
	PicArr: ["assets/img/cards/Squash.png", "assets/img/cards/SquashG.png", "assets/img/plants/Squash/Squash.gif", "assets/img/plants/Squash/SquashAttack.gif"],
	Tooltip: "压扁接近的僵尸",
	Produce: '窝瓜会压扁第一个接近它的僵尸。<p>伤害：<font color="#FF0000">极高</font><br>范围：<font color="#FF0000">短，覆盖所有它压到的僵尸。</font><br>用法：<font color="#FF0000">单独使用</font></p>“我准备好了！”窝瓜大吼道，“干吧！！算我一份！没人比我厉害！我就是你要的人！来啊！等啥啊？要的就是这个！”',
	GetDY: function(b, c, a) {
		return a[0] ? -21 : -10
	},
	canTrigger: 0,
	PrivateBirth: function(a) {
		oSym.addTask(100,
		function(c) {
			var b = $P[c];
			b && (b.canTrigger = 1)
		},
		[a.id])
	},
	getHurt: function(d, b, a) {
		var c = this;
		b - 3 ? c.NormalAttack(d) : (c.HP -= a) < 1 && c.Die()
	},
	getTriggerRange: function(a, b, c) {
		return [[b - 50, c + 70, 0]]
	},
	TriggerCheck: function(c, b, a) {
		c.beAttacked && c.Altitude > -1 && c.Altitude < 2 && (oT.$[this.R].splice(a, 1), this.NormalAttack(c))
	},
	NormalAttack: function(d) {
		var c = this,
		a = $(c.id),
		b = d.ZX + d.Speed * 4 * (!d.WalkDirection ? -1 : 1) - 50;
		a.childNodes[1].src = "assets/img/plants/Squash/SquashAttack.gif";
		SetStyle(a, {
			left: b + "px"
		});
		c.Die(1);
		oSym.addTask(45,
		function(e, k, l, h) {
			var f = oZ.getArZ(k, l, h),
			g = f.length,
			j;
			while (g--) { (j = f[g]).Altitude > -1 && j.Altitude < 3 && j.getHurt(0, 0, 1800, 0, 0, 0, 2)
			}
			oSym.addTask(185, ClearChild, [e])
		},
		[a, b, b + 100, c.R])
	}
}),
oChomper = InheritO(CPlants, {
	EName: "oChomper",
	CName: "大嘴花",
	width: 130,
	height: 114,
	beAttackedPointR: 70,
	SunNum: 150,
	HP:2000,
	PicArr: ["assets/img/cards/Chomper.png", "assets/img/cards/ChomperG.png", "assets/img/plants/Chomper/Chomper.gif", "assets/img/plants/Chomper/ChomperAttack.gif", "assets/img/plants/Chomper/ChomperDigest.gif"],
	Tooltip: "能一口气吞下一只僵尸, 但处于咀嚼状态中十分脆弱",
	Produce: '大嘴花可以一口吞掉一整只僵尸，但是他们消化僵尸的时候很脆弱。<p>伤害：<font color="#FF0000">巨大</font><br>范围：<font color="#FF0000">非常近</font><br>特点：<font color="#FF0000">消化时间很长</font></p>大嘴花几乎可以去“恐怖小店”，来表演它的绝技了，不过他的经纪人压榨了他太多的钱，所以他没去成。尽管如此，大嘴花没有怨言，只说了句这只是交易的一部分。',
	GetDX: function() {
		return - 40
	},
	getShadow: function(a) {
		return "top:" + (a.height - 22) + "px"
	},
	getTriggerRange: function(a, b, c) {
		return [[this.pixelLeft, c + 80, 0]]
	},
	TriggerCheck: function(a) {
		this.AttackCheck2(a) && (this.canTrigger = 0, this.NormalAttack(this.id, a.id))
	},
	AttackCheck2: function(a) {
		return a.Altitude == 1 && a.beAttacked
	},
	NormalAttack: function(a, b) {
		$(a).childNodes[1].src = "assets/img/plants/Chomper/ChomperAttack.gif" + $Random + Math.random();
		oSym.addTask(70,
		function(c, d) {
			var e;
			$P[c] && ((e = $Z[d]) && e.beAttacked ? oSym.addTask(18,
			function(f) {
				var g = $P[f];
				g && ($(f).childNodes[1].src = e.getRaven(f) ? (oSym.addTask(4200,
				function(h) {
					var i = $P[h];
					i && (i.canTrigger = 1, $(h).childNodes[1].src = "assets/img/plants/Chomper/Chomper.gif")
				},
				[f]), "assets/img/plants/Chomper/ChomperDigest.gif") : (g.canTrigger = 1, "assets/img/plants/Chomper/Chomper.gif"))
			},
			[c]) : oSym.addTask(18,
			function(f) {
				var g = $P[f];
				g && (g.canTrigger = 1, $(f).childNodes[1].src = "assets/img/plants/Chomper/Chomper.gif")
			},
			[c]))
		},
		[a, b])
	}
}),
oFumeShroom = InheritO(CPlants, {
	EName: "oFumeShroom",
	CName: "大喷菇",
	width: 100,
	height: 88,
	beAttackedPointR: 80,
	SunNum: 75,
	SleepGif: 3,
	PicArr: ["assets/img/cards/FumeShroom.png", "assets/img/cards/FumeShroomG.png", "assets/img/plants/FumeShroom/FumeShroom.gif", "assets/img/plants/FumeShroom/FumeShroomSleep.gif", "assets/img/plants/FumeShroom/FumeShroomAttack.gif", "assets/img/plants/FumeShroom/FumeShroomBullet.gif"],
	Tooltip: "喷射可以穿过门板的气液",
	Produce: '大喷菇喷出的臭气可以穿透铁丝网门。<p>伤害：<font color="#FF0000">普通，可穿透铁丝网门</font><br>范围：<font color="#FF0000">臭气中的所有僵尸<br>白天睡觉</font></p>“我以前那份没前途的工作，是为一个面包房生产酵母孢，”大喷菇说。“然后小喷菇，上帝保佑它，告诉了我这个喷杀僵尸的机会。现在我真觉得自己完全不同了。”',
	GetDY: function(b, c, a) {
		return a[0] ? -18 : -10
	},
	GetDX: function() {
		return - 45
	},
	BirthStyle: function(c, d, b, a) {
		oS.DKind && (c.canTrigger = 0, c.Sleep = 1, b.childNodes[1].src = c.PicArr[c.SleepGif]);
		EditEle(b, {
			id: d
		},
		a, EDAll)
	},
	PrivateBirth: function(b) {
		var a = b.id;
		NewEle(a + "_Bullet", "div", "position:absolute;display:none;width:343px;height:62px;left:" + b.AttackedRX + "px;top:" + (b.pixelTop + 5) + "px;background:url(assets/img/plants/FumeShroom/FumeShroomBullet.gif);z-index:" + (b.zIndex + 1), 0, EDAll)
	},
	PrivateDie: function(a) {
		ClearChild($(a.id + "_Bullet"))
	},
	getTriggerRange: function(a, b, c) {
		return [[b, Math.min(c + 330, 900), 0]]
	},
	NormalAttack: function() {
		var f = this,
		d = oZ.getArZ(f.AttackedLX, Math.min(f.AttackedRX + 330, 900), f.R),
		e = d.length,
		g,
		c = f.id,
		b = $(c),
		a = c + "_Bullet";
		while (e--) { (g = d[e]).Altitude < 2 && g.getHurt(0, 0, 20, 0, 0, 0, 0)
		}
		b.childNodes[1].src = "assets/img/plants/FumeShroom/FumeShroomAttack.gif";
		SetBlock($(a));
		ImgSpriter(a, c, [["0 0", 90, 1], ["0 -62px", 90, 2], ["0 -124px", 90, 3], ["0 -186px", 90, 4], ["0 -248px", 90, 5], ["0 -310px", 90, 6], ["0 -372px", 90, 7], ["0 -434px", 90, -1]], 0,
		function(i, j) {
			var h = $(j);
			$P[j] && (h.childNodes[1].src = "assets/img/plants/FumeShroom/FumeShroom.gif");
			SetNone($(i))
		})
	}
}),
oCoffeeBean = InheritO(CPlants, {
	EName: "oCoffeeBean",
	CName: "咖啡豆",
	width: 39,
	height: 97,
	beAttackedPointL: 10,
	beAttackedPointR: 29,
	SunNum: 0,
	PKind: 3,
	canEat: 0,
	PicArr: ["assets/img/cards/CoffeeBean.png", "assets/img/cards/CoffeeBeanG.png", "assets/img/plants/CoffeeBean/CoffeeBean.gif", "assets/img/plants/CoffeeBean/CoffeeBeanEat.gif"],
	Tooltip: "唤醒在白天里睡觉的蘑菇类植物",
	Produce: '咖啡豆，可以唤醒睡眠中的蘑菇们。<p>使用方法：<font color="#FF0000">单独使用，立即生效</font><br>特点：<font color="#FF0000">可以种在其他植物上，用来唤醒蘑菇们</font></p>咖啡豆：“嘿，伙计们！嘿，怎么回事？是谁？嘿！你瞧见那个东西没？什么东西？哇！是狮子！”嗯，咖啡豆确定，这样可以让自己很兴奋。',
	InitTrigger: function() {},
	GetDBottom: function() {
		return 49
	},
	GetDY: function() {
		return - 30
	},
	CanGrow: function(a, b) {
		return (b = a[1]) && b.Sleep && !a[3]
	},
	BirthStyle: function(c, d, b, a) {
		b.childNodes[1].src = "assets/img/plants/CoffeeBean/CoffeeBeanEat.gif" + $Random + Math.random();
		EditEle(b, {
			id: d
		},
		a, EDAll)
	},
	PrivateBirth: function(a) {
		oSym.addTask(240,
		function(c) {
			var d = oGd.grid[c],
			b;
			d && (b = d.WakeUP, (!b ? ($(d.id).childNodes[1].src = d.PicArr[d.NormalGif], d.canTrigger = 1, d.Sleep = 0) : b(d)));
			a.Die()
		},
		[a.R + "_" + a.C + "_1"])
	}
}),
oGloomShroom = InheritO(oFumeShroom, {
	EName: "oGloomShroom",
	CName: "曾哥",
	width: 88,
	height: 83,
	beAttackedPointR: 68,
	SunNum: 125,
	coolTime: 5000,
	PicArr: ["assets/img/cards/GloomShroom.png", "assets/img/cards/GloomShroomG.png", "assets/img/plants/GloomShroom/GloomShroom.gif", "assets/img/plants/GloomShroom/GloomShroomSleep.gif", "assets/img/plants/GloomShroom/GloomShroomAttack.gif", "assets/img/plants/GloomShroom/GloomShroomBullet.gif"],
	Tooltip: "围绕自身释放大量绵羊音<br>(需要大喷菇)",
	Produce: '伪娘终结者，喜欢围绕自身释放大量绵羊音<p><font color="#FF0000">必须种植在大喷菇上</font></p>起初人们一直非议他，后来曾哥用自己独特的绵羊音横扫了宇宙拆迁办，全世界都拜倒在他的脚下。“听说有个节目叫‘快男’？”曾哥说，“没有我在他们真应该感到羞愧。”他于是决定明年去看看。',
	CanGrow: function(b, a, d) {
		var c = b[1];
		return c && c.EName == "oFumeShroom"
	},
	BirthStyle: function(c, d, b, a) {
		oGd.grid[c.R + "_" + c.C + "_1"].Sleep && (c.canTrigger = 0, c.Sleep = 1, b.childNodes[1].src = c.PicArr[3]);
		EditEle(b, {
			id: d
		},
		a, EDAll)
	},
	GetDX: CPlants.prototype.GetDX,
	PrivateBirth: function(b) {
		var a = b.id;
		NewEle(a + "_Bullet", "div", "position:absolute;display:none;width:210px;height:200px;left:" + (b.pixelLeft - 60) + "px;top:" + (b.pixelTop - 65) + "px;background:url(assets/img/plants/GloomShroom/GloomShroomBullet.gif);z-index:" + (b.zIndex + 1), 0, EDAll)
	},
	PrivateDie: function(a) {
		ClearChild($(a.id + "_Bullet"))
	},
	getTriggerRange: function(c, d, e) {
		var f = GetX(this.C),
		b = this.MinX = f - 120,
		a = this.MaxX = f + 120;
		return [[b, a, 0]]
	},
	getTriggerR: function(c) {
		var b = this.MinR = c > 2 ? c - 1 : 1,
		a = this.MaxR = c < oS.R ? c + 1 : c;
		return [b, a]
	},
	NormalAttack: function() {
		var k = this,
		g, f = k.MaxR,
		c = k.MinX,
		b = k.MaxX,
		e, h, a, j = k.id,
		d = $(j),
		l = j + "_Bullet";
		for (g = k.MinR; g <= f; g++) {
			e = oZ.getArZ(c, b, g);
			for (h = e.length; h--; (a = e[h]).Altitude < 2 && a.getHurt(0, 0, 80, 0, 0, 0, 0)) {}
		}
		d.childNodes[1].src = "assets/img/plants/GloomShroom/GloomShroomAttack.gif";
		SetBlock($(l));
		ImgSpriter(l, j, [["0 0", 90, 1], ["0 -200px", 90, 2], ["0 -400px", 90, 3], ["0 -600px", 90, 4], ["0 -800px", 90, 5], ["0 -1000px", 90, 6], ["0 -1200px", 90, 7], ["0 -1400px", 90, 8], ["0 -1600px", 90, 9], ["0 -1800px", 90, 10], ["0 -2000px", 90, 11], ["0 -2200px", 90, -1]], 0,
		function(m, n) {
			var i = $(n);
			$P[n] && (i.childNodes[1].src = "assets/img/plants/GloomShroom/GloomShroom.gif");
			SetNone($(m))
		})
	}
}),
oPuffShroom = InheritO(oFumeShroom, {
	EName: "oPuffShroom",
	CName: "小喷菇",
	width: 40,
	height: 66,
	beAttackedPointL: 15,
	beAttackedPointR: 25,
	SunNum: 25,
	coolTime:0,
	Stature: -1,
	PicArr: ["assets/img/cards/PuffShroom.png", "assets/img/cards/PuffShroomG.png", "assets/img/plants/PuffShroom/PuffShroom.gif", "assets/img/plants/PuffShroom/PuffShroomSleep.gif", "assets/img/plants/ShroomBullet.gif", "assets/img/plants/ShroomBulletHit.gif"],
	Tooltip: "向敌人发射短程孢子",
	Produce: '小喷菇是免费的，不过射程很近。<p>伤害：<font color="#FF0000">中等</font><br>范围：<font color="#FF0000">近<br>白天要睡觉</font></p>小喷菇：“我也是最近才知道僵尸的存在，和很多蘑菇一样，我只是把他们想象成童话和电影里的怪物。不过这次的经历已经让我大开眼界了。',
	GetDX: CPlants.prototype.GetDX,
	getTriggerRange: function(a, b, c) {
		return [[b, Math.min(c + 250, 900), 0]]
	},
	PrivateBirth: function(c) {
		var b = c.AttackedLX,
		a = b - 46;
		c.BulletClass = NewO({
			X: b,
			R: c.R,
			pixelLeft: a,
			F: oGd.MB2
		});
		c.BulletEle = NewImg(0, "assets/img/plants/ShroomBullet.gif", "left:" + a + "px;top:" + (c.pixelTop + 40) + "px;display:none;z-index:" + (c.zIndex + 2))
	},
	PrivateDie: function(a) {
		a.BulletEle = null
	},
	NormalAttack: function() {
		var b = this,
		a = new b.BulletClass,
		c = a.id = "PSB" + Math.random();
		EditEle(b.BulletEle.cloneNode(false), {
			id: c
		},
		0, EDAll);
		oGd.gridB.push(a);
		oSym.addTask(15,
		function(e) {
			var d = $(e);
			d && SetBlock(d)
		},
		[c])
	}
}),
oScaredyShroom = InheritO(oFumeShroom, {
	EName: "oScaredyShroom",
	CName: "胆小菇",
	width: 57,
	height: 81,
	beAttackedPointR: 37,
	SunNum: 25,
	Cry: 0,
	ArZ: [],
	Attacking: 0,
	PicArr: ["assets/img/cards/ScaredyShroom.png", "assets/img/cards/ScaredyShroomG.png", "assets/img/plants/ScaredyShroom/ScaredyShroom.gif", "assets/img/plants/ScaredyShroom/ScaredyShroomSleep.gif", "assets/img/plants/ScaredyShroom/ScaredyShroomCry.gif", "assets/img/plants/ShroomBullet.gif", "assets/img/plants/ShroomBulletHit.gif"],
	Tooltip: "远程射手, 但敌人靠近时会蜷缩不动",
	Produce: '胆小菇是一种远程射手，敌人接近后会躲起来。<p>伤害：<font color="#FF0000">普通</font><br>特点：<font color="#FF0000">敌人接近后就停止攻击<br>白天睡觉</font></p>“谁在那？”胆小菇低声说，声音细微难辨。“走开！我不想见任何人。除非……除非你是马戏团的人。”',
	GetDX: CPlants.prototype.GetDX,
	getTriggerRange: CPlants.prototype.getTriggerRange,
	getTriggerR: function(c) {
		var b = this.MinR = c > 2 ? c - 1 : 1,
		a = this.MaxR = c < oS.R ? c + 1 : c;
		return [b, a]
	},
	TriggerCheck: function(e, c) {
		var b = this,
		a = b.id;
		Math.abs(e.ZX - b.MX) < 121 && e.beAttacked ? (b.ArZ.push(e.id), !b.Cry && (b.Cry = 1, $(a).childNodes[1].src = "assets/img/plants/ScaredyShroom/ScaredyShroomCry.gif", b.CryCheck(a))) : (!b.Cry && !b.Attacking && e.Altitude > 0 && e.Altitude < 3 && b.NormalAttack())
	},
	PrivateBirth: function(c) {
		var b = c.AttackedLX,
		a = b - 46;
		c.BulletClass = NewO({
			X: b,
			R: c.R,
			pixelLeft: a,
			F: oGd.MB2
		});
		c.BulletEle = NewImg(0, "assets/img/plants/ShroomBullet.gif", "left:" + a + "px;top:" + (c.pixelTop + 35) + "px;display:none;z-index:" + (c.zIndex + 2));
		c.MX = b + 9
	},
	PrivateDie: function(a) {
		a.BulletEle = null
	},
	NormalAttack: function() {
		var c = this,
		a = c.id,
		b = new c.BulletClass,
		d = b.id = "SSB" + Math.random();
		EditEle(c.BulletEle.cloneNode(false), {
			id: d
		},
		0, EDAll);
		oGd.gridB.push(b);
		c.Attacking = 1;
		oSym.addTask(10,
		function(g, e) {
			var f = $(g);
			f && SetBlock(f);
			oSym.addTask(130,
			function(h) {
				var i = $P[h];
				i && (i.Attacking = 0)
			},
			[e])
		},
		[d, a])
	},
	CryCheck: function(a) {
		oSym.addTask(140,
		function(b) {
			var d = $P[b],
			c,
			f,
			e;
			if (d) {
				c = (f = d.ArZ).length;
				while (c--) { (!(e = $Z[f[c]]) || Math.abs(e.ZX - d.MX) > 120) && f.splice(c, 1)
				}
				f.length ? d.CryCheck(b) : (d.Cry = 0, $(b).childNodes[1].src = "assets/img/plants/ScaredyShroom/ScaredyShroom.gif")
			}
		},
		[a])
	}
}),
oSunShroom = InheritO(oFumeShroom, {
	EName: "oSunShroom",
	CName: "阳光菇",
	width: 59,
	height: 61,
	beAttackedPointL: 15,
	beAttackedPointR: 44,
	SunNum: 0,
	Stature: -1,
	Status: 0,
	PicArr: ["assets/img/cards/SunShroom.png", "assets/img/cards/SunShroomG.png", "assets/img/plants/SunShroom/SunShroom2.gif", "assets/img/plants/SunShroom/SunShroomSleep.gif", "assets/img/plants/SunShroom/SunShroom.gif"],
	Tooltip: "开始提供少量的阳光, 一段时间后提供正常量的阳光",
	Produce: '阳光菇开始提供少量阳光，稍后提供正常数量阳光。<p>生产阳光：<font color="#FF0000">开始低，之后正常<br>白天睡觉</font></p>阳光菇讨厌阳光。恨到当它内部产生点阳光时，就尽可能快的吐出来。它就是不能忍受这个。对它来说，阳光令人厌恶。',
	GetDX: CPlants.prototype.GetDX,
	GetDY: CPlants.prototype.GetDY,
	InitTrigger: function() {},
	PrivateDie: function(a) {},
	PrivateBirth: function() {},
	BirthStyle: function(c, d, b, a) {
		oS.DKind ? (c.canTrigger = 0, c.Sleep = 1, b.childNodes[1].src = "assets/img/plants/SunShroom/SunShroomSleep.gif") : (oSym.addTask(600,
		function(h, g, f) {
			var e = $P[h];
			e && e.ProduceSun(e, g, f)
		},
		[d, GetX(c.C) - 40, GetY(c.R)]), oSym.addTask(12000,
		function(f) {
			var e = $P[f];
			e && (e.Sleep = 0, $(f).childNodes[1].src = "assets/img/plants/SunShroom/SunShroom.gif", e.Status = 1)
		},
		[d]));
		EditEle(b, {
			id: d
		},
		a, EDAll)
	},
	ProduceSun: function(a, c, b) {
		AppearSun(Math.floor(c + Math.random() * 41), b, !a.Status ? 15 : 25, 0),
		oSym.addTask(2400,
		function(g, f, e) {
			var d = $P[g];
			d && d.ProduceSun(d, f, e)
		},
		[a.id, c, b])
	},
	WakeUP: function(a) {
		var b = a.id;
		a.ProduceSun(a, GetX(a.C) - 40, GetY(a.R));
		$(b).childNodes[1].src = "assets/img/plants/SunShroom/SunShroom2.gif";
		a.Sleep = 0;
		oSym.addTask(12000,
		function(d) {
			var c = $P[d];
			c && ($(d).childNodes[1].src = "assets/img/plants/SunShroom/SunShroom.gif", c.Status = 1)
		},
		[b])
	}
});
// === 8 种新增植物 ===

// 三叶草：吹走所有空中僵尸
oBlover = InheritO(CPlants, {
	EName: "oBlover",
	CName: "三叶草",
	width: 71,
	height: 56,
	beAttackedPointR: 51,
	SunNum: 125,
	coolTime: 7500,
	PicArr: ["assets/img/cards/Blover.png", "assets/img/cards/BloverG.png", "assets/img/plants/Blover/Blover.gif"],
	Tooltip: "吹走所有空中僵尸",
	Produce: '三叶草能吹走场上所有的气球僵尸。<p>范围：<font color="#FF0000">全场</font><br>用法：<font color="#FF0000">一次性，立即生效</font></p>',
	PrivateBirth: function(b) {
		// 立即生效：清除所有空中僵尸（如果有的话）
		oSym.addTask(100, function() {
			var z = $Z, id;
			for (id in z) {
				if (z[id].Altitude > 0) {
					z[id].HP = 0;
				}
			}
		}, []);
		// 自身消失
		var a = this;
		oSym.addTask(500, function() { a.Die(); }, []);
	}
});

// 仙人掌：发射尖刺，可攻击气球僵尸
oCactus = InheritO(CPlants, {
	EName: "oCactus",
	CName: "仙人掌",
	width: 53,
	height: 71,
	beAttackedPointR: 33,
	SunNum: 125,
	BKind: 3,
	coolTime: 7500,
	PicArr: ["assets/img/cards/Cactus.png", "assets/img/cards/CactusG.png", "assets/img/plants/Cactus/Cactus.gif", "assets/img/plants/PB00.gif", "assets/img/plants/PeaBulletHit.gif"],
	Tooltip: "发射尖刺，能攻击空中和地面僵尸",
	Produce: '仙人掌发射尖刺攻击僵尸，可以击中气球僵尸。<p>伤害：<font color="#FF0000">普通</font><br>特点：<font color="#FF0000">对空对地</font></p>',
	PrivateBirth: function(c) {
		var b = c.AttackedLX,
		a = b - 38;
		c.BulletClass = NewO({
			X: b,
			Y: c.pixelTop + 35,
			R: c.R,
			pixelLeft: a,
			pixelTop: c.pixelTop + 25,
			F: oGd.MB1,
			Attack: 20
		});
		c.BulletEle = NewImg(0, "assets/img/plants/PB00.gif", "position:absolute;left:" + a + "px;top:" + (c.pixelTop + 25) + "px;display:none", EDAll);
		c.BulletEle.style.zIndex = c.zIndex + 2;
	},
	PrivateDie: function(a) {
		a.BulletEle = null;
	},
	NormalAttack: function() {
		var b = this,
		a = new b.BulletClass,
		c = a.id = "CTB" + Math.random();
		EditEle(b.BulletEle.cloneNode(false), {id: c}, 0, EDAll);
		oGd.gridB.push(a);
		oSym.addTask(15, function(e) { var d = $(e); d && SetBlock(d); }, [c]);
	}
});

// 毁灭菇：超大范围爆炸，留下弹坑
oDoomShroom = InheritO(CPlants, {
	EName: "oDoomShroom",
	CName: "毁灭菇",
	width: 87,
	height: 72,
	beAttackedPointR: 67,
	SunNum: 125,
	coolTime: 50000,
	PicArr: ["assets/img/cards/DoomShroom.png", "assets/img/cards/DoomShroomG.png", "assets/img/plants/DoomShroom/DoomShroom.gif"],
	Tooltip: "超大范围爆炸，留下弹坑",
	Produce: '毁灭菇引爆后摧毁大范围内所有僵尸，并留下一个无法种植的弹坑。<p>伤害：<font color="#FF0000">极高</font><br>范围：<font color="#FF0000">极大</font><br>白天睡觉</font></p>',
	Sleep: 0,
	PrivateBirth: function(d) {
		var c = this;
		oSym.addTask(1000, function() {
			var R = c.R, C = c.C, i, j;
			for (i = R - 3; i <= R + 3; i++) {
				for (j = C - 3; j <= C + 3; j++) {
					if (i > 0 && i < 6 && j > 0 && j < 10) {
						// 杀伤僵尸
						var zk = oGd.gridZombieInRow[i];
						if (zk) for (var k in zk) {
							var z = zk[k];
							if (Math.abs(z.C - C) <= 3) z.HP -= 1800;
						}
						// 留下弹坑
						oGd.gridCrater[i + "_" + j] = 2;
					}
				}
			}
			c.Die();
		}, []);
	},
	getTriggerRange: function() { return []; },
	InitTrigger: function() {},
	TriggerCheck: function() {},
	CanGrow: function() { return true; }
});

// 催眠菇：让僵尸变友军
oHypnoShroom = InheritO(CPlants, {
	EName: "oHypnoShroom",
	CName: "催眠菇",
	width: 55,
	height: 56,
	beAttackedPointR: 35,
	SunNum: 75,
	coolTime: 30000,
	PicArr: ["assets/img/cards/HypnoShroom.png", "assets/img/cards/HypnoShroomG.png", "assets/img/plants/HypnoShroom/HypnoShroom.gif"],
	Tooltip: "让吃掉它的僵尸变成友军",
	Produce: '当僵尸吃掉催眠菇后，会转身为你作战。<p>特点：<font color="#FF0000">被吃后生效<br>白天睡觉</font></p>',
	Sleep: 0,
	getHurt: function(b, d, a) {
		this.Die(1);
	},
	CanGrow: function() { return true; }
});

// 寒冰菇：冻结全屏僵尸
oIceShroom = InheritO(CPlants, {
	EName: "oIceShroom",
	CName: "寒冰菇",
	width: 66,
	height: 58,
	beAttackedPointR: 46,
	SunNum: 75,
	coolTime: 50000,
	PicArr: ["assets/img/cards/IceShroom.png", "assets/img/cards/IceShroomG.png", "assets/img/plants/IceShroom/IceShroom.gif"],
	Tooltip: "冻结场上所有僵尸",
	Produce: '寒冰菇释放冰系能量，短暂冻结场上所有僵尸。<p>范围：<font color="#FF0000">全场</font><br>特点：<font color="#FF0000">一次性<br>白天睡觉</font></p>',
	Sleep: 0,
	PrivateBirth: function(c) {
		var b = this;
		oSym.addTask(100, function() {
			var z = $Z, id;
			for (id in z) {
				var zm = z[id];
				zm.FreeFreezeTime = 300; // 冻结 300 帧
				zm.Speed *= 0.4;
			}
		}, []);
		oSym.addTask(500, function() { b.Die(); }, []);
	},
	getTriggerRange: function() { return []; },
	InitTrigger: function() {},
	TriggerCheck: function() {},
	CanGrow: function() { return true; }
});

// 灯笼草：照亮周围迷雾
oPlantern = InheritO(CPlants, {
	EName: "oPlantern",
	CName: "灯笼草",
	width: 67,
	height: 80,
	beAttackedPointR: 47,
	SunNum: 25,
	coolTime: 7500,
	PicArr: ["assets/img/cards/Plantern.png", "assets/img/cards/PlanternG.png", "assets/img/plants/Plantern/Plantern.gif"],
	Tooltip: "照亮周围区域，驱散迷雾",
	Produce: '灯笼草能照亮周围3x3范围的迷雾区域。<p>范围：<font color="#FF0000">3x3</font></p>灯笼草："我看见了外星人！"...其实没有。',
	CanGrow: function() { return true; }
});

// 海蘑菇：水上远程射手
oSeaShroom = InheritO(CPlants, {
	EName: "oSeaShroom",
	CName: "海蘑菇",
	width: 55,
	height: 61,
	beAttackedPointR: 35,
	SunNum: 0,
	BKind: 2,
	coolTime: 7500,
	PicArr: ["assets/img/cards/SeaShroom.png", "assets/img/cards/SeaShroomG.png", "assets/img/plants/SeaShroom/SeaShroom.gif", "assets/img/plants/ShroomBullet.gif", "assets/img/plants/ShroomBulletHit.gif"],
	Tooltip: "水上的免费远程射手",
	Produce: '海蘑菇是水生植物，免费，发射孢子攻击僵尸。<p>伤害：<font color="#FF000000">普通</font><br>特点：<font color="#FF0000">只能种在水中<br>白天睡觉</font></p>',
	Sleep: 0,
	PrivateBirth: function(c) {
		var b = c.AttackedLX,
		a = b - 35;
		c.BulletClass = NewO({
			X: b,
			R: c.R,
			pixelLeft: a,
			F: oGd.MB2
		});
		c.BulletEle = NewImg(0, "assets/img/plants/ShroomBullet.gif", "left:" + a + "px;top:" + (c.pixelTop + 25) + "px;display:none;z-index:" + (c.zIndex + 2), EDAll);
	},
	PrivateDie: function(a) {
		a.BulletEle = null;
	},
	NormalAttack: function() {
		var b = this,
		a = new b.BulletClass,
		c = a.id = "SSB" + Math.random();
		EditEle(b.BulletEle.cloneNode(false), {id: c}, 0, EDAll);
		oGd.gridB.push(a);
		oSym.addTask(10, function(e) { var d = $(e); d && SetBlock(d); }, [c]);
	}
});

var CZombies = function(b, a) {
	return (a = function() {}).prototype = {
		name: "Zombies",
		HP: 270,
		Lvl: 1,
		NormalGif: 0,
		AttackGif: 1,
		LostHeadGif: 2,
		LostHeadAttackGif: 3,
		HeadGif: 4,
		DieGif: 5,
		BoomDieGif: 6,
		width: 166,
		height: 144,
		beAttackedPointL: 82,
		beAttackedPointR: 156,
		BreakPoint: 90,
		Ornaments: 0,
		OrnHP: 0,
		OSpeed: 1.6,
		Speed: 1.6,
		AKind: 0,
		beAttacked: 1,
		isAttacking: 0,
		Attack: 100,
		WalkDirection: 0,
		Altitude: 1,
		canSlow: 1,
		canFreeze: 1,
		canSputtering: 1,
		canRaven: 1,
		canSetbody: 1,
		FreeSetbodyTime: "",
		FreeFreezeTime: "",
		FreeSlowTime: "",
		CanPass: function(d, c) {
			return c && c != 2
		},
		GetDY: -10,
		getRaven: function(c) {
			return this.Die(2),
			1
		},
		getShadow: function(c) {
			return "left:" + (c.beAttackedPointL - 10) + "px;top:" + (c.height - 22) + "px"
		},
		Init: function(g, j, e, d) {
			var c = 0,
			h = this,
			f = [];
			j.AttackedRX = (j.X = (j.ZX = j.AttackedLX = g) - j.beAttackedPointL) + j.beAttackedPointR;
			while (--d) {
				j.CanPass(d, e[d]) && (f[c++] = d)
			}
			j.ArR = f;
			j.ArHTML = ['<div id="', '" style="position:absolute;visibility:', ";left:", "px;top:", "px;z-index:", '"><img src="' + ShadowPNG + '" style="' + j.getShadow(j) + '"><img style="position:absolute;clip:rect(0,auto,', ",0);top:", 'px" src="' + (j.PicArr||[])[j.NormalGif||0] + '"></div>']
		},
		getHTML: function(k, f, e, j, h, c, d) {
			var g = this.ArHTML;
			return g[0] + k + g[1] + h + g[2] + f + g[3] + e + g[4] + j + g[5] + c + g[6] + d + g[7]
		},
		getVisible: "visible",
		prepareBirth: function(f) {
			var h = this,
			e = h.ArR,
			d = e[Math.floor(Math.random() * e.length)],
			g = GetY(d) + h.GetDY,
			c = g - h.height,
			k = 3 * d + 1,
			j = h.id = "Z_" + Math.random();
			h.R = d;
			h.pixelTop = c;
			h.zIndex = k; (h.delayT = f) && (h.FreeSetbodyTime = oSym.Now);
			return h.getHTML(j, h.X, c, k, h.getVisible, "auto", 0)
		},
		CustomBirth: function(j, c, d) {
			var g = this,
			f = GetY(j) + g.GetDY,
			h = f - g.height,
			l = 3 * j + 1,
			e = g.id = "Z_" + Math.random(),
			m = g.beAttackedPointL,
			k = g.beAttackedPointR;
			g.AttackedRX = (g.X = (g.ZX = g.AttackedLX = GetX(c) - (k - m) * 0.5) - m) + k;
			g.R = j;
			g.pixelTop = h;
			g.zIndex = l; (g.delayT = d) && (g.FreeSetbodyTime = oSym.Now);
			return g.getHTML(e, g.X, h, l, g.getVisible, 0, g.height + "px")
		},
		BirthCallBack: function(d) {
			var c = d.delayT;
			c && oSym.addTask(c,
			function(e) {
				e.FreeSetbodyTime = ""
			},
			[d])
		},
		Birth: function() {
			var c = this;
			oZ.add($Z[c.id] = c);
			c.BirthCallBack(c)
		},
		Die: function(d) {
			var e = this,
			f = e.id,
			c = $(f); ! d ? (c.childNodes[1].src = e.PicArr[e.DieGif] + Math.random(), oSym.addTask(250, ClearChild, [c])) : d < 2 ? (c.childNodes[1].src = e.PicArr[e.BoomDieGif] + Math.random(), oSym.addTask(300, ClearChild, [c])) : ClearChild(c);
			e.HP = 0;
			delete $Z[f];
			oP.MonPrgs()
		},
		GoingDieHead: function(e, c, d) {
			oSym.addTask(200, ClearChild, [NewImg(0, c[d.HeadGif] + Math.random(), "left:" + d.AttackedLX + "px;top:" + (d.pixelTop - 20) + "px;z-index:" + d.zIndex, EDAll)])
		},
		GoingDie: function(d) {
			var c = this,
			e = c.id;
			$(e).childNodes[1].src = d;
			c.GoingDieHead(e, c.PicArr, c);
			c.beAttacked = 0;
			c.FreeFreezeTime = c.FreeSetbodyTime = c.FreeSlowTime = "";
			c.AutoReduceHP(e)
		},
		AutoReduceHP: function(c) {
			oSym.addTask(100,
			function(e) {
				var d = $Z[e];
				d && ((d.HP -= 60) < 1 ? d.Die() : d.AutoReduceHP(e))
			},
			[c])
		},
		JudgeAttack: function() {
			var g = this,
			d = g.ZX,
			e = g.R + "_",
			f = GetC(d),
			h = oGd.grid,
			c; (c = g.JudgeLR(g, e, f, d, h) || g.JudgeSR(g, e, f, d, h)) ? c[0](c[1], c[2]) : g.isAttacking && (g.isAttacking = 0, $(g.id).childNodes[1].src = g.PicArr[g.NormalGif])
		},
		JudgeLR: function(f, d, e, c, g) {
			return e > 10 || e < 1 ? false: function() {
				d += --e + "_";
				var h = 3,
				k;
				while (h--) {
					if ((k = g[d + h]) && k.canEat && k.AttackedRX >= c && k.AttackedLX <= c) {
						return [f.NormalAttack, f.id, k.id]
					}
				}
			} ()
		},
		JudgeSR: function(f, d, e, c, g) {
			return e > 9 || e < 1 ? false: function() {
				d += e + "_";
				var h = 3,
				k;
				while (h--) {
					if ((k = g[d + h]) && k.canEat && k.AttackedRX >= c && k.AttackedLX <= c) {
						return [f.NormalAttack, f.id, k.id]
					}
				}
			} ()
		},
		NormalAttack: function(d, c) {
			var e = $Z[d];
			e && !e.isAttacking && (e.isAttacking = 1, $(d).childNodes[1].src = e.PicArr[e.AttackGif]);
			oSym.addTask(100,
			function(g, f) {
				var j = $Z[g],
				h;
				j && j.beAttacked && !j.FreeFreezeTime && !j.FreeSetbodyTime && ((h = $P[f]) && h.getHurt(j, j.AKind, !j.FreeSlowTime ? j.Attack: Math.round(j.Attack * 0.5)), j.JudgeAttack())
			},
			[d, c])
		}
	},
	a
} (),
OrnNoneZombies = InheritO(CZombies, {
	getHurt: function(l, a, j, q, c, n, m) {
		var e = this;
		if (!e.beAttacked) {
			m && e.Die(2);
			return
		}
		var f, h, b = e.id,
		k = e.HP,
		d = e.PicArr,
		g = e.isAttacking;
		switch (true) {
		case(k -= j) < 1 : e.HP = 0;
			e.Die(m);
			return;
		case k < 91 : e.HP = k;
			e.GoingDie(d[[e.LostHeadGif, e.LostHeadAttackGif][g]]);
			return;
		default:
			e.HP = k;
			switch (q) {
			case 0:
				break;
			case - 1 : e.canSlow && (!e.FreeSlowTime && (e.Speed *= 0.5), oSym.addTask(1000,
				function(o, s, r) { (r = $Z[o]) && s == r.FreeSlowTime && (r.FreeSlowTime = "", r.Speed = r.OSpeed)
				},
				[b, e.FreeSlowTime = oSym.Now]));
				break;
			default:
				e.FreeSlowTime && (e.FreeSlowTime = "", e.Speed = e.OSpeed);
				if (e.canSputtering) {
					f = !a ? oZ.getArZ(e.AttackedLX, e.AttackedLX + 40, e.R) : oZ.getArZ(e.AttackedRX - 40, e.AttackedRX, e.R);
					for (h = f.length; h--; f[h].canSputtering && f[h].getHurt(1, 0, 13, 0, 0, 0, 0)) {}
				}
			}
			SetAlpha($(b).childNodes[1], 50, 0.5);
			oSym.addTask(10,
			function(o) {
				$Z[o] && SetAlpha($(o).childNodes[1], 100, 1)
			},
			[b])
		}
	}
}),
oZombie = InheritO(OrnNoneZombies, {
	EName: "oZombie",
	CName: "领带僵尸",
	PicArr: (function() {
		var a = "assets/img/zombies/Zombie/";
		return [a + "Zombie.gif", a + "ZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random]
	})(),
	Produce: '普通僵尸<p>韧性：<font color="#FF0000">低</font></p>这种僵尸喜爱脑髓，贪婪而不知足。脑髓，脑髓，脑髓，夜以继日地追求着。老而臭的脑髓？腐烂的脑髓？都没关系。僵尸需要它们。'
}),
oFlagZombie = InheritO(oZombie, {
	EName: "oFlagZombie",
	CName: "旗帜僵尸",
	OSpeed: 2.2,
	Speed: 2.2,
	beAttackedPointR: 101,
	Produce: '旗帜僵尸标志着即将来袭的一大堆僵尸"流"。<p>韧性：<font color="#FF0000">低</font></p>毫无疑问，摇旗僵尸喜爱脑髓。但在私下里他也迷恋旗帜。也许是因为旗帜上也画有脑子吧，这很难说。'
},
{
	PicArr: {
		0 : "assets/img/zombies/FlagZombie/FlagZombie.gif",
		1 : "assets/img/zombies/FlagZombie/FlagZombieAttack.gif",
		2 : "assets/img/zombies/FlagZombie/FlagZombieLostHead.gif",
		3 : "assets/img/zombies/FlagZombie/FlagZombieLostHeadAttack.gif"
	}
}),
OrnIZombies = InheritO(CZombies, {
	Ornaments: 1,
	OrnLostNormalGif: 7,
	OrnLostAttackGif: 8,
	getHurt: function(j, a, g, n, c, l, k) {
		var e = this;
		if (!e.beAttacked) {
			k && e.Die(2);
			return
		}
		var b = e.id,
		m = e.OrnHP,
		h = e.HP,
		f = e.isAttacking,
		d = e.PicArr;
		switch (true) {
		case ! m: switch (true) {
			case(h -= g) < 1 : e.HP = 0;
				e.Die(k);
				return;
			case h < 91 : e.HP = h;
				e.GoingDie(d[[e.LostHeadGif, e.LostHeadAttackGif][f]]);
				return
			}
			e.HP = h;
			break;
		case (m -= g) > 0 : e.OrnHP = m;
			break;
		case m < 0 : switch (true) {
			case(h += m) < 1 : e.HP = 0;
				e.Die(k);
				return;
			case h < 91 : e.HP = h;
				e.GoingDie(d[[e.LostHeadGif, e.LostHeadAttackGif][f]]);
				return
			}
			e.HP = h;
		default:
			e.OrnHP = 0;
			$(b).childNodes[1].src = e.PicArr[[e.NormalGif = e.OrnLostNormalGif, e.AttackGif = e.OrnLostAttackGif][f]]
		}
		switch (n) {
		case 0:
			break;
		case - 1 : e.canSlow && (!e.FreeSlowTime && (e.Speed = e.OSpeed * 0.5), oSym.addTask(1000,
			function(o, r, q) { (q = $Z[o]) && r == q.FreeSlowTime && (q.FreeSlowTime = "", q.Speed = q.OSpeed)
			},
			[b, e.FreeSlowTime = oSym.Now]));
			break;
		default:
			e.FreeSlowTime && (e.FreeSlowTime = "", e.Speed = e.OSpeed);
			if (e.canSputtering) {
				ar = !a ? oZ.getArZ(e.AttackedLX, e.AttackedLX + 40, e.R) : oZ.getArZ(e.AttackedRX - 40, e.AttackedRX, e.R);
				for (i = ar.length; i--; ar[i].canSputtering && ar[i].getHurt(1, 0, 13, 0, 0, 0, 0)) {}
			}
		}
		SetAlpha($(b).childNodes[1], 50, 0.5);
		oSym.addTask(10,
		function(o) {
			$Z[o] && SetAlpha($(o).childNodes[1], 100, 1)
		},
		[b])
	}
}),
oConeheadZombie = InheritO(OrnIZombies, {
	EName: "oConeheadZombie",
	CName: "路障僵尸",
	OrnHP: 370,
	Lvl: 2,
	PicArr: (function() {
		var b = "assets/img/zombies/ConeheadZombie/",
		a = "assets/img/zombies/Zombie/";
		return [b + "ConeheadZombie.gif", b + "ConeheadZombieAttack.gif", a + "ZombieLostHead.gif", a + "ZombieLostHeadAttack.gif", a + "ZombieHead.gif" + $Random, a + "ZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "Zombie.gif", a + "ZombieAttack.gif"]
	})(),
	Produce: '他的路障头盔，使他两倍坚韧于普通僵尸。<p>韧性：<font color="#FF0000">中</font></p>和其他僵尸一样，路障头僵尸盲目地向前。但某些事物却使他停下脚步，捡起一个交通路障，并固实在自己的脑袋上。是的，他很喜欢参加聚会。'
}),
oBucketheadZombie = InheritO(oConeheadZombie, {
	EName: "oBucketheadZombie",
	CName: "铁桶僵尸",
	OrnHP: 1100,
	Lvl: 3,
	Produce: '他的铁桶头盔，能极大程度的承受伤害。<p>韧性：<font color="#FF0000">高</font><br>弱点：<font color="#FF0000">磁力菇</font></p>铁桶头僵尸经常戴着水桶，在冷漠的世界里显得独一无二。但事实上，他只是忘记了，那铁桶还在他头上而已。'
},
{
	PicArr: {
		0 : "assets/img/zombies/BucketheadZombie/BucketheadZombie.gif",
		1 : "assets/img/zombies/BucketheadZombie/BucketheadZombieAttack.gif",
		7 : "assets/img/zombies/Zombie/Zombie2.gif"
	}
}),
oFootballZombie = InheritO(oConeheadZombie, {
	EName: "oFootballZombie",
	CName: "橄榄球僵尸",
	OrnHP: 1400,
	Lvl: 3,
	width: 154,
	height: 160,
	OSpeed: 3.2,
	Speed: 3.2,
	beAttackedPointL: 20,
	beAttackedPointR: 134,
	Produce: '橄榄球僵尸的表演秀。<p>韧性：<font color="#FF0000">极高</font><br>速度：<font color="#FF0000">快</font><br>弱点：<font color="#FF0000">磁力菇</font></p>在球场上，橄榄球僵尸表现出110%的激情，他进攻防守样样在行。虽然他完全不知道橄榄球是什么。'
},
{
	PicArr: {
		0 : "assets/img/zombies/FootballZombie/FootballZombie.gif",
		1 : "assets/img/zombies/FootballZombie/FootballZombieAttack.gif",
		7 : "assets/img/zombies/FootballZombie/FootballZombieOrnLost.gif",
		8 : "assets/img/zombies/FootballZombie/FootballZombieOrnLostAttack.gif"
	}
}),
oPoleVaultingZombie = InheritO(OrnNoneZombies, {
	EName: "oPoleVaultingZombie",
	CName: "撑杆僵尸",
	HP: 500,
	width: 348,
	height: 218,
	OSpeed: 3.2,
	Speed: 3.2,
	beAttackedPointL: 215,
	beAttackedPointR: 260,
	GetDY: 2,
	Lvl: 2,
	PicArr: (function() {
		var a = "assets/img/zombies/PoleVaultingZombie/";
		return [a + "PoleVaultingZombie.gif", a + "PoleVaultingZombieAttack.gif", a + "PoleVaultingZombieLostHead.gif", a + "PoleVaultingZombieLostHeadAttack.gif", a + "PoleVaultingZombieHead.gif" + $Random, a + "PoleVaultingZombieDie.gif" + $Random, a + "BoomDie.gif" + $Random, a + "PoleVaultingZombieWalk.gif", a + "PoleVaultingZombieLostHeadWalk.gif", a + "PoleVaultingZombieJump.gif", a + "PoleVaultingZombieJump2.gif"]
	})(),
	Produce: '撑杆僵尸运用标杆高高地跃过障碍物。<p>韧性：<font color="#FF0000">中</font><Br>速度：<font color="#FF0000">快,而后慢(跳跃后)</font><BR>特点：<font color="#FF0000">跃过他所碰到的第一筑植物</font></p>一些僵尸渴望走得更远、得到更多，这也促使他们由普通成为非凡。那就是撑杆僵尸。',
	getShadow: function(a) {
		return "left:" + (a.beAttackedPointL - 20) + "px;top:" + (a.height - 35) + "px"
	},
	getVisible: "hidden",
	GoingDieHead: function(c, a, b) {
		oSym.addTask(200, ClearChild, [NewImg(0, a[b.HeadGif] + Math.random(), "left:" + b.X + "px;top:" + (b.pixelTop - 20) + "px;z-index:" + b.zIndex, EDAll)])
	},
	BirthCallBack: function(b) {
		var a = b.delayT;
		a ? oSym.addTask(a,
		function(c) {
			c.FreeSetbodyTime = "";
			SetVisible($(c.id))
		},
		[b]) : SetVisible($(b.id))
	},
	JudgeAttack: function() {
		var g = this,
		b = g.ZX,
		d = g.R + "_",
		c = GetC(b),
		h = oGd.grid,
		f,
		a,
		e = b - 74;
		for (f = c - 2; f <= c; f++) {
			if (f > 9 || f < 1) {
				continue
			}
			for (a = 2; a > -1; (p = h[d + f + "_" + a--]) && p.canEat && p.AttackedRX >= e && p.AttackedLX < b && (a = -1, g.JudgeAttack = CZombies.prototype.JudgeAttack, g.NormalAttack(g.id, p.id))) {}
		}
	},
	getRaven: function(a) {
		return ! this.isAttacking && this.NormalAttack(this.id, a),
		0
	},
	NormalAttack: function(d, b) {
		var g = $Z[d],
		f = $P[b].AttackedLX,
		a = $(d),
		c = a.firstChild,
		e = a.childNodes[1];
		e.src = "assets/img/zombies/PoleVaultingZombie/PoleVaultingZombieJump.gif" + $Random + Math.random();
		SetNone(c);
		g.isAttacking = 1;
		g.Altitude = 2;
		oSym.addTask(100,
		function(l, j, h, k, r) {
			var q = $Z[l],
			m,
			n;
			q && ((m = $P[j]) && m.Stature > 0 ? (q.AttackedRX = (q.X = (q.AttackedLX = q.ZX = n = m.AttackedRX) - q.beAttackedPointL) + q.beAttackedPointR, SetStyle(h, {
				left: q.X + "px"
			}), r.src = "assets/img/zombies/PoleVaultingZombie/PoleVaultingZombieWalk.gif", SetBlock(k), q.isAttacking = 0, q.Altitude = 1, q.OSpeed = q.Speed = 1.6, q.NormalGif = 7, q.LostHeadGif = 8, q.NormalAttack = CZombies.prototype.NormalAttack, q.getRaven = CZombies.prototype.getRaven) : (q.ZX = q.AttackedLX = (q.X = (q.AttackedRX = f) - q.beAttackedPointR) + q.beAttackedPointL, SetStyle(h, {
				left: q.X + "px"
			}), r.src = "assets/img/zombies/PoleVaultingZombie/PoleVaultingZombieJump2.gif" + $Random + Math.random(), SetBlock(k), oSym.addTask(80,
			function(s, u) {
				var t = $Z[s];
				t && (u.src = "assets/img/zombies/PoleVaultingZombie/PoleVaultingZombieWalk.gif", t.isAttacking = 0, t.Altitude = 1, t.OSpeed = t.Speed = 1.6, t.NormalGif = 7, t.LostHeadGif = 8, t.NormalAttack = CZombies.prototype.NormalAttack, t.getRaven = CZombies.prototype.getRaven)
			},
			[l, r])))
		},
		[d, b, a, c, e])
	}
}),
OrnIIZombies = InheritO(CZombies, {
	Ornaments: 2,
	BreakPoint: 91,
	NormalGif: 0,
	AttackGif: 1,
	LostHeadGif: 2,
	LostHeadAttackGif: 3,
	OrnLostNormalGif: 4,
	OrnLostAttackGif: 5,
	OrnLostHeadNormalGif: 6,
	OrnLostHeadAttackGif: 7,
	HeadGif: 8,
	DieGif: 9,
	BoomDieGif: 10,
	getHurt: function(h, a, e, l, c, k, j) {
		var d = this,
		b = d.id;
		if (!d.beAttacked) {
			j && d.Die(2);
			return
		}
		d.OrnHP ? !h ? (d.OrnHP = Math.max(d.OrnHP - e, 0), d.HP -= e) : h == -1 && !a ? d.OrnHP = Math.max(d.OrnHP - e, 0) : d.HP -= e: d.HP -= e;
		switch (true) {
		case ! d.OrnHP: d.HP -= e;
			break;
		case (d.OrnHP -= e) > 0 : break;
		case d.OrnHP < 0 : d.HP += d.OrnHP;
			d.OrnHP = 0;
		default:
			var g = d.NormalGif = d.OrnLostNormalGif,
			f = d.AttackGif = d.OrnLostAttackGif;
			$(b).childNodes[1].src = (!d.isAttacking ? d.PicArr[g] : d.PicArr[f])
		}
		switch (true) {
		case d.HP > d.BreakPoint: switch (l) {
			case 0:
				break;
			case - 1 : d.canSlow && (!d.FreeSlowTime && (d.Speed *= 0.5), oSym.addTask(1000,
				function(m, o, n) { (n = $Z[m]) && o == n.FreeSlowTime && (n.FreeSlowTime = "", n.Speed = n.OSpeed)
				},
				[b, d.FreeSlowTime = oSym.Now]));
				break;
			default:
				d.FreeSlowTime && (d.FreeSlowTime = "", d.Speed = d.OSpeed);
				if (d.canSputtering) {
					ar = !a ? oZ.getArZ(d.AttackedLX, d.AttackedLX + 40, d.R) : oZ.getArZ(d.AttackedRX - 40, d.AttackedRX, d.R);
					for (i = ar.length; i--; ar[i].canSputtering && ar[i].getHurt(1, 0, 13, 0, 0, 0, 0)) {}
				}
			}
			SetAlpha($(b).childNodes[1], 50, 0.5);
			oSym.addTask(10,
			function(m) {
				$Z[m] && SetAlpha($(m).childNodes[1], 100, 1)
			},
			[b]);
			break;
		case d.HP > 0 : d.GoingDie();
			break;
		default:
			d.Die(j)
		}
	}
}),
oNewspaperZombie = InheritO(OrnIIZombies, {
	EName: "oNewspaperZombie",
	CName: "读报僵尸",
	OrnHP: 150,
	Lvl: 2,
	LostPaperGif: 11,
	width: 216,
	height: 164,
	beAttackedPointL: 60,
	beAttackedPointR: 130,
	LostPaperSpeed: 4.8,
	PicArr: (function() {
		var a = "assets/img/zombies/NewspaperZombie/";
		return [a + "HeadWalk1.gif", a + "HeadAttack1.gif", a + "LostHeadWalk1.gif", a + "LostHeadAttack1.gif", a + "HeadWalk0.gif", a + "HeadAttack0.gif", a + "LostHeadWalk0.gif", a + "LostHeadAttack0.gif", a + "Head.gif" + $Random, a + "Die.gif" + $Random, a + "BoomDie.gif" + $Random, a + "LostNewspaper.gif"]
	})(),
	Produce: '他的报纸只能提供有限的防御。<p>韧性：<font color="#FF0000">低</font><p>报纸韧性：<font color="#FF0000">低</font></p><p>速度：正常，而后快(失去报纸后)</p>读报僵尸，他正痴迷于完成他的数独难题。难怪他这么反常。',
	getShadow: function(a) {
		return "left:75px;top:" + (a.height - 25) + "px"
	},
	GoingDie: function(b) {
		var a = this,
		c = a.id;
		$(c).childNodes[1].src = b;
		oSym.addTask(200, ClearChild, [NewImg(0, a.PicArr[a.HeadGif] + Math.random(), "left:" + a.AttackedLX + "px;top:" + (a.pixelTop - 20) + "px;z-index:" + a.zIndex, EDAll)]);
		a.beAttacked = 0;
		a.FreeFreezeTime = a.FreeSetbodyTime = a.FreeSlowTime = "";
		a.AutoReduceHP(c)
	},
	getHurt: function(j, a, g, n, c, l, k) {
		var e = this;
		if (!e.beAttacked) {
			k && e.Die(2);
			return
		}
		var b = e.id,
		m = e.OrnHP,
		h = e.HP,
		f = e.isAttacking,
		d = e.PicArr;
		if (m) {
			if (!j || n == 1) {
				switch (true) {
				case(h = e.HP -= g) < 1 : e.Die(k);
					return;
				case h < 91 : e.GoingDie(d[[e.LostHeadGif, e.LostHeadAttackGif][f]]);
					return;
				default:
					! (e.OrnHP = Math.max(m - g, 0)) && (e.isAttacking = 1, e.FreeSlowTime = "", $(b).childNodes[1].src = d[e.LostPaperGif], oSym.addTask(150,
					function(s, t, r, q) {
						s.isAttacking = q,
						s.Speed = s.OSpeed = s.LostPaperSpeed;
						$(t).childNodes[1].src = r
					},
					[e, b, d[[e.NormalGif = e.OrnLostNormalGif, e.AttackGif = e.OrnLostAttackGif][f]], f]))
				}
			} else {
				if (j == -1 && !a) { ! (e.OrnHP = Math.max(m - g, 0)) && (e.isAttacking = 1, $(b).childNodes[1].src = d[e.LostPaperGif], oSym.addTask(150,
					function(s, t, r, q) {
						s.isAttacking = q,
						s.FreeSlowTime = "",
						s.Speed = s.OSpeed = s.LostPaperSpeed;
						$(t).childNodes[1].src = r
					},
					[e, b, d[[e.NormalGif = e.OrnLostNormalGif, e.AttackGif = e.OrnLostAttackGif][f]], f]))
				} else {
					switch (true) {
					case(h = e.HP -= g) < 1 : e.Die(k);
						return;
					case h < 91 : e.GoingDie(d[[e.LostHeadGif, e.LostHeadAttackGif][f]]);
						return
					}
				}
			}
		} else {
			switch (true) {
			case(h = e.HP -= g) < 1 : e.Die(k);
				return;
			case h < 91 : e.GoingDie(d[[e.OrnLostHeadNormalGif, e.OrnLostHeadAttackGif][f]]);
				return
			}
		}
		switch (n) {
		case 0:
			break;
		case - 1 : e.canSlow && (!e.FreeSlowTime && (e.Speed = e.OSpeed * 0.5), oSym.addTask(1000,
			function(o, r, q) { (q = $Z[o]) && r == q.FreeSlowTime && (q.FreeSlowTime = "", q.Speed = q.OSpeed)
			},
			[b, e.FreeSlowTime = oSym.Now]));
			break;
		default:
			e.FreeSlowTime && (e.FreeSlowTime = "", e.Speed = e.OSpeed);
			if (e.canSputtering) {
				ar = !a ? oZ.getArZ(e.AttackedLX, e.AttackedLX + 40, e.R) : oZ.getArZ(e.AttackedRX - 40, e.AttackedRX, e.R);
				for (i = ar.length; i--; ar[i].canSputtering && ar[i].getHurt(1, 0, 13, 0, 0, 0, 0)) {}
			}
		}
		SetAlpha($(b).childNodes[1], 50, 0.5);
		oSym.addTask(10,
		function(o) {
			$Z[o] && SetAlpha($(o).childNodes[1], 100, 1)
		},
		[b])
	}
});

