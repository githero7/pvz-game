var LevelData = {};

LevelData["0"] = function() {
oS.Init({
	PicArr: function() {
		var a = $User.Browser.IE6 ? 8 : 32;
		return [ShadowPNG, "assets/img/misc/Sun.gif", "assets/img/misc/OptionsMenuback" + a + ".png", "assets/img/misc/OptionsBackButton" + a + ".png", "assets/img/misc/Surface.png", "assets/img/misc/Help.png", "assets/img/misc/SelectorScreenStartAdventur.png", "assets/img/misc/SelectorScreenSurvival.png", "assets/img/misc/Logo.jpg", "assets/img/misc/LawnMower.gif", "assets/img/misc/ZombiesWon.png", "assets/img/misc/LargeWave.gif", "assets/img/misc/FinalWave.gif", "assets/img/misc/PrepareGrowPlants.gif", "assets/img/ui/PointerUP.gif", "assets/img/ui/PointerDown.gif", "assets/img/ui/Shovel.png", "assets/img/ui/SunBack.png", "assets/img/ui/ShovelBack.png", "assets/img/ui/GrowSoil.png", "assets/img/ui/SeedChooser_Background.png", "assets/img/ui/Button.png", "assets/img/ui/LogoLine.png", "assets/img/ui/dialog_topleft.png", "assets/img/ui/dialog_topmiddle.png", "assets/img/ui/dialog_topright.png", "assets/img/ui/dialog_centerleft.png", "assets/img/ui/dialog_centermiddle.png", "assets/img/ui/dialog_centerright.png", "assets/img/ui/SelectorScreen_Almanac.png", "assets/img/ui/SelectorScreen_AlmanacHighlight.png", "assets/img/ui/dialog_bottomleft.png", "assets/img/ui/dialog_bottommiddle.png", "assets/img/ui/dialog_bottomright.png", "assets/img/ui/Almanac_IndexBack.jpg", "assets/img/ui/Almanac_IndexButton.png", "assets/img/ui/Almanac_CloseButton.png", "assets/img/ui/Almanac_CloseButtonHighlight.png", "assets/img/ui/Almanac_IndexButtonHighlight.png", "assets/img/ui/Almanac_PlantBack.jpg", "assets/img/ui/Almanac_PlantCard.png", "assets/img/ui/Almanac_ZombieBack.jpg", "assets/img/ui/Almanac_ZombieCard.png", "assets/img/ui/AwardScreen_Back.jpg"]
	} (),
	LevelName: "JSPVZ",
	LoadMusic: function() {
		AudioManager.play("menu");
	},
	LoadAccess: function() {
		EDAll.scrollLeft = 0;
		EDAll.innerHTML += WordUTF8;
		LoadProProcess();
		oSym.Stop()
	}
});
};

LevelData["1"] = function() {
oS.Init({
	PName: [oPeashooter],
	ZName: [oZombie],
	PicArr: function() {
		var a = oSunFlower.prototype,
		b = a.PicArr;
		return ["assets/img/ui/SodRollCap.png", "assets/img/ui/SodRoll.png", "assets/img/ui/sod1row.png", "assets/img/ui/background1unsodded.jpg", b[a.CardGif], b[a.NormalGif]]
	} (),
	SunNum: 175,
	backgroundImage: "assets/img/ui/background1unsodded.jpg",
	LF: [0, 0, 0, 1, 0, 0],
	CanSelectCard: 0,
	LevelName: "关卡 1-1",
	LoadMusic: function() {
		AudioManager.play("menu");
	},
	InitLawnMower: function() {
		oGd.gridLM[3] = 1;
		NewImg("LawnMower3", "assets/img/misc/LawnMower.gif", "position:absolute;left:" + oS.LawnMowerX + "px;top:" + (GetY(3) - 60) + "px;z-index:11", EDAll)
	},
	StartGame: function() {
		NewImg("sod1row", "assets/img/ui/sod1row.png", "left:132px;top:280px;clip:rect(0,0,117px,0);z-index:1", EDAll);
		NewImg("SodRoll", "assets/img/ui/SodRoll.png", "left:112px;top:244px;z-index:1", EDAll);
		NewImg("SodRollCap", "assets/img/ui/SodRollCap.png", "left:17px;top:322px;z-index:1", EDAll); (function(e, g, a, d, c, f, b) {
			e += 15;
			g += 16;
			d += 16;
			$("sod1row").style.clip = "rect(0," + e + "px,117px,0)";
			SetStyle($("SodRoll"), {
				left: g + "px",
				width: --a + "px",
				height: "141px"
			});
			SetStyle($("SodRollCap"), {
				left: d + "px",
				width: --c + "px",
				height: --f + "px",
				top: ++b + "px"
			});
			e < 755 ? oSym.addTask(3, arguments.callee, [e, g, a, d, c, f, b]) : (ClearChild($("SodRoll"), $("SodRollCap")), (function() {
				SetBlock($("dTop"));
				NewEle("DivTeach", "div", 0, 0, EDAll);
				oS.InitLawnMower();
				oP.Monitor({
					ar: [0],
					f: function(k) {
						var l = oS.C + 1,
						i = oS.Chose;
						switch (k) {
						case 0:
							innerText($("DivTeach"), "点击卡片选择豌豆射手！");
							NewImg("PointerUD", "assets/img/ui/PointerUP.gif", "top:60px;left:50px", EDAll);
							oSym.addTask(10, arguments.callee, [++k]);
							break;
						case 1:
							i > 0 && (innerText($("DivTeach"), "点击草地种下豌豆射手，最好种在靠左边！"), EditImg($("PointerUD"), "", "assets/img/ui/PointerDown.gif", {
								left: "170px",
								top: "270px"
							}), ++k);
							oSym.addTask(10, arguments.callee, [k]);
							break;
						case 2:
							var h = oGd.$;
							while (--l) {
								if (h["3_" + l + "_1"]) {
									SetNone($("PointerUD"));
									innerText($("DivTeach"), "你拥有了第一个植物，点击收集掉落的阳光！");
									AutoProduceSun(25);
									oSym.addTask(10, arguments.callee, [++k]);
									return
								}
							} ! i && (ClearChild($("PointerUD")), k = 0);
							oSym.addTask(10, arguments.callee, [k]);
							break;
						case 3:
							oS.SunNum > 99 && (innerText($("DivTeach"), "你拥有了足够的阳光来种植另一个豌豆射手！"), EditImg($("PointerUD"), "", "assets/img/ui/PointerUP.gif", {
								left: "50px",
								top: "60px",
								display: "block"
							}), ++k);
							oSym.addTask(10, arguments.callee, [k]);
							break;
						default:
							var j = 0,
							h = oGd.$;
							while (--l) {
								h["3_" + l + "_1"] && (++j)
							}
							j > 0 ? (SetNone($("PointerUD")), innerText($("DivTeach"), "别让僵尸靠近你的房子！"), oP.AddZombiesFlag(), oSym.addTask(500, SetNone, [$("DivTeach")])) : oSym.addTask(10, arguments.callee, [4])
						}
					}
				});
				BeginCool();
				SetVisible($("dFlagMeter"))
			})())
		})(35, 122, 68, 117, 73, 71, 322)
	}
},
{
	ArZ: [oZombie, oZombie, oZombie, oZombie, oZombie],
	FlagNum: 4,
	SumToZombie: {
		1 : 5,
		"default": 5
	},
	FlagToSumNum: {
		a1: [3],
		a2: [1, 2]
	},
	FlagToMonitor: {
		3 : [ShowFinalWave, 0]
	},
	FlagToEnd: function() {
		NewImg("imgSF", "assets/img/cards/SunFlower.png", "left:667px;top:330px", EDAll, {
			onclick: function() {
				GetNewCard(this, oSunFlower, 2)
			}
		});
		EditImg($("PointerUD"), 0, "assets/img/ui/PointerDown.gif", {
			left: "676px",
			top: "295px",
			display: "block"
		})
	}
});
};

LevelData["10"] = function() {
oS.Init({
	PName: [oPeashooter, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater],
	ZName: [oZombie, oConeheadZombie, oPoleVaultingZombie, oBucketheadZombie],
	PicArr: ["assets/img/ui/background1.jpg", "assets/img/ui/trophy.png"],
	backgroundImage: "assets/img/ui/background1.jpg",
	CanSelectCard: 0,
	LevelName: "关卡 1-10",
	LargeWaveFlag: {
		10 : $("imgFlag3"),
		20 : $("imgFlag1")
	},
	StaticCard: 0,
	LoadMusic: function() {
		AudioManager.play("menu");
	},
	StartGame: function() {
		AudioManager.play("battle");
		SetVisible($("tdShovel"), $("dFlagMeter"));
		SetNone($("dSunNum"));
		SetBlock($("dTop"));
		oS.InitLawnMower();
		PrepareGrowPlants(function() {
			oP.Monitor({
				f: function() { (function() {
						var a = ArCard.length;
						if (a < 10) {
							var c = oS.PName,
							b = Math.floor(Math.random() * c.length),
							e = c[b],
							d = e.prototype,
							f = "dCard" + Math.random();
							ArCard[a] = {
								DID: f,
								PName: e,
								PixelTop: 600
							};
							NewImg(f, d.PicArr[d.CardGif], "top:600px;cursor:pointer", $("dCardList"), {
								onmouseover: function(g) {
									ViewPlantTitle(GetChoseCard(f), g)
								},
								onmouseout: function() {
									SetNone($("dTitle"))
								},
								onclick: function(g) {
									ChosePlant(g, oS.ChoseCard, f)
								}
							})
						}
						oSym.addTask(600, arguments.callee, [])
					})(); (function() {
						var b = ArCard.length,
						a, c;
						while (b--) { (c = (a = ArCard[b]).PixelTop) > 60 * b && ($(a.DID).style.top = (a.PixelTop = c - 1) + "px")
						}
						oSym.addTask(5, arguments.callee, [])
					})()
				},
				ar: []
			});
			oP.AddZombiesFlag();
			SetVisible($("dFlagMeterContent"))
		})
	}
},
{
	ArZ: [oZombie, oZombie, oZombie, oConeheadZombie, oConeheadZombie, oConeheadZombie, oConeheadZombie, oConeheadZombie, oPoleVaultingZombie, oPoleVaultingZombie, oBucketheadZombie, oBucketheadZombie, oBucketheadZombie, oBucketheadZombie, oBucketheadZombie],
	FlagNum: 20,
	SumToZombie: {
		1 : 3,
		2 : 10,
		3 : 15,
		"default": 15
	},
	FlagToSumNum: {
		a1: [3, 5, 9, 10, 13, 15, 19],
		a2: [3, 6, 12, 20, 24, 36, 48, 60]
	},
	FlagToMonitor: {
		9 : [ShowLargeWave, 0],
		19 : [ShowFinalWave, 0]
	},
	FlagToEnd: function() {
		NewImg("imgSF", "assets/img/ui/trophy.png", "left:260px;top:233px", EDAll, {
			onclick: function() {
				SelectModal(13)
			}
		});
		NewImg("PointerUD", "assets/img/ui/PointerDown.gif", "top:198px;left:269px", EDAll)
	}
},
{
	GetChoseCard: function(b) {
		var a = ArCard.length;
		while (a--) {
			ArCard[a].DID == b && (oS.ChoseCard = a, a = 0)
		}
		return oS.ChoseCard
	},
	ChosePlant: function(a, b) {
		var f = ArCard[oS.ChoseCard],
		e = (a = a || event).clientX,
		d = a.clientY + document.body.scrollTop,
		c = f.PName.prototype;
		oS.Chose = 1;
		EditImg((EditImg($Pn[c.EName].childNodes[1].cloneNode(false), "MovePlant", "", {
			left: e - c.width * 0.5 + "px",
			top: d + 20 - c.height + "px",
			zIndex: 254
		},
		EDAll)).cloneNode(false), "MovePlantAlpha", "", {
			display: "none",
			filter: "alpha(opacity=40)",
			opacity: 0.4,
			zIndex: 30
		},
		EDAll);
		SetAlpha($(f.DID), 50, 0.5);
		SetNone($("dTitle"))
	},
	CancelPlant: function() {
		ClearChild($("MovePlant"), $("MovePlantAlpha"));
		oS.Chose = 0;
		SetAlpha($(ArCard[oS.ChoseCard].DID), 100, 1);
		oS.ChoseCard = ""
	},
	GrowPlant: function(k, c, b, f, a) {
		var i = oS.ChoseCard,
		g = ArCard[i],
		h = g.PName,
		j = h.prototype,
		d = g.DID,
		e;
		j.CanGrow(k, f, a) ?
		function() { (new h).Birth(c, b, f, a, k);
			SetStyle($("imgGrowSoil"), {
				left: c - 30 + "px",
				top: b - 40 + "px",
				zIndex: 3 * f,
				display: "block"
			});
			oSym.addTask(20, SetNone, [$("imgGrowSoil")]);
			ClearChild($("MovePlant"), $("MovePlantAlpha"));
			$("dCardList").removeChild(e = $(d));
			e = null;
			ArCard.splice(i, 1);
			oS.ChoseCard = "";
			oS.Chose = 0
		} () : CancelPlant()
	},
	ViewPlantTitle: function(a) {
		var c = $("dTitle"),
		b = ArCard[a].PName.prototype;
		c.innerHTML = b.CName + "<br>" + b.Tooltip;
		SetStyle(c, {
			top: 60 * a + "px",
			left: "100px"
		})
	}
});
};

LevelData["11"] = function() {
//关卡页面10波强度最大为15
oS.Init({
	//场景对象数据
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oCoffeeBean],
	ZName: [oZombie, oNewspaperZombie],
	PicArr: function() {
		var Pro = oSunShroom.prototype,
		PicArr = Pro.PicArr;
		return ['assets/img/ui/background1.jpg', PicArr[Pro.CardGif], PicArr[Pro.NormalGif]]
	} (),
	backgroundImage: 'assets/img/ui/background1.jpg',
	CanSelectCard: 1,
	DKind: 1,
	SunNum: 125,
	LevelName: '关卡 1-11',
	LargeWaveFlag: {
		10 : $('imgFlag1')
	},
	
	//初始化时在7到9列随机生成4个墓碑
	LoadMusic: function() {},
	StartGameMusic: "night"
},
{
	//传递给流程控制对象数据
	ArZ: [oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oNewspaperZombie, oNewspaperZombie],
	FlagNum: 10,
	//僵尸波数
	SumToZombie: {
		1 : 7,
		2 : 9,
		'default': 9
	},
	//在oP流程控制对象里使用，a1表示僵尸强度，a2表示跟强度对应的ArZ的索引，a2应该比a1多一个元素，多出来的就是default
	FlagToSumNum: {
		a1: [3, 5, 9],
		a2: [1, 2, 3, 15]
	},
	//代表第1-3波强度是1，4-5是2，6-9是3，其余是10
	FlagToMonitor: {
		10 : [ShowFinalWave, 0]
	},
	FlagToEnd: function() {
		NewImg('imgSF', 'assets/img/cards/SunShroom.png', 'left:667px;top:220px', EDAll, {
			onclick: function() {
				GetNewCard(this, oSunShroom, 12)
			}
		});
		NewImg('PointerUD', 'assets/img/ui/PointerDown.gif', 'top:185px;left:676px', EDAll);
	}
});
};

LevelData["12"] = function() {
//关卡页面10波强度最大为15
oS.Init({
	//场景对象数据
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oCoffeeBean, oSunShroom],
	ZName: [oZombie, oConeheadZombie, oNewspaperZombie, oBucketheadZombie],
	PicArr: function() {
		var Pro = oFumeShroom.prototype,
		PicArr = Pro.PicArr;
		return ['assets/img/ui/background1.jpg', PicArr[Pro.CardGif], PicArr[Pro.NormalGif]]
	} (),
	backgroundImage: 'assets/img/ui/background1.jpg',
	CanSelectCard: 1,
	DKind: 1,
	SunNum: 125,
	LevelName: '关卡 1-12',
	LargeWaveFlag: {
		10 : $('imgFlag3'),
		20 : $('imgFlag1')
	},
	
	//初始化时在7到9列随机生成4个墓碑
	LoadMusic: function() {},
	StartGameMusic: "night"
},
{
	//传递给流程控制对象数据
	ArZ: [oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oConeheadZombie, oConeheadZombie, oNewspaperZombie, oBucketheadZombie],
	FlagNum: 20,
	//僵尸波数
	SumToZombie: {
		1 : 6,
		2 : 9,
		3 : 10,
		'default': 10
	},
	FlagToSumNum: {
		a1: [3, 5, 9, 10, 13, 15, 19],
		a2: [1, 2, 3, 10, 4, 5, 6, 20]
	},
	//代表第1-3波强度是1，4-5是2，6-9是3，其余是10
	FlagToMonitor: {
		9 : [ShowLargeWave, 0],
		19 : [ShowFinalWave, 0]
	},
	FlagToEnd: function() {
		NewImg('imgSF', 'assets/img/cards/ScaredyShroom.png', 'left:667px;top:220px', EDAll, {
			onclick: function() {
				GetNewCard(this, oScaredyShroom, 13)
			}
		});
		NewImg('PointerUD', 'assets/img/ui/PointerDown.gif', 'top:185px;left:676px', EDAll);
	}
});
};

LevelData["13"] = function() {
//关卡2-3 解锁杨桃——黑夜墓碑关
oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oCoffeeBean, oSunShroom, oScaredyShroom, oFumeShroom],
	ZName: [oZombie, oConeheadZombie, oNewspaperZombie, oBucketheadZombie],
	PicArr: function() {
		var Pro = oStarfruit.prototype;
		return ['assets/img/ui/background2.jpg', 'assets/img/ui/Tombstones.png', 'assets/img/ui/Tombstone_mounds.png', Pro.PicArr[Pro.CardGif], Pro.PicArr[Pro.NormalGif]];
	},
	backgroundImage: 'assets/img/ui/background2.jpg',
	CanSelectCard: 1, DKind: 0, SunNum: 50,
	LevelName: '关卡 2-1',
	LargeWaveFlag: {10: $('imgFlag1')},
	Monitor: {f: AppearTombstones, ar: [5, 9, 6]},
	UserDefinedFlagFunc: function() {
		oP.FlagNum == oP.FlagZombies && oP.SetTimeoutTomZombie([oZombie, oConeheadZombie])
	},
	LoadMusic: function() { AudioManager.play("menu"); },
	StartGameMusic: 'night'
},
{
	ArZ: [oZombie, oZombie, oZombie, oConeheadZombie, oConeheadZombie, oNewspaperZombie, oBucketheadZombie, oBucketheadZombie],
	FlagNum: 10,
	SumToZombie: {1: 6, 2: 9, 3: 11, 'default': 11},
	FlagToSumNum: {a1: [3, 5, 9], a2: [1, 2, 3, 20]},
	FlagToMonitor: {9: [ShowFinalWave, 0]},
	FlagToEnd: function() {
		NewImg('imgSF', 'assets/img/cards/Starfruit.png', 'left:587px;top:270px', EDAll, {
			onclick: function() { GetNewCard(this, oStarfruit, 14) }
		});
		NewImg('PointerUD', 'assets/img/ui/PointerDown.gif', 'top:235px;left:596px', EDAll);
	}
});

};

LevelData["14"] = function() {
//关卡2-4 解锁三线射手——白天
oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oCoffeeBean, oSunShroom, oScaredyShroom, oFumeShroom, oStarfruit],
	ZName: [oZombie, oConeheadZombie, oPoleVaultingZombie, oBucketheadZombie],
	PicArr: function() {
		var Pro = oThreepeater.prototype;
		return ['assets/img/ui/background1.jpg', Pro.PicArr[Pro.CardGif], Pro.PicArr[Pro.NormalGif]];
	},
	backgroundImage: 'assets/img/ui/background1.jpg',
	CanSelectCard: 1, DKind: 1, SunNum: 125,
	LevelName: '关卡 2-2',
	LargeWaveFlag: {10: $('imgFlag3'), 20: $('imgFlag1')},
	LoadMusic: function() { AudioManager.play("menu"); },
	StartGameMusic: 'battle'
},
{
	ArZ: [oZombie, oZombie, oConeheadZombie, oConeheadZombie, oConeheadZombie, oPoleVaultingZombie, oPoleVaultingZombie, oBucketheadZombie, oBucketheadZombie],
	FlagNum: 20,
	SumToZombie: {1: 6, 2: 10, 3: 13, 'default': 13},
	FlagToSumNum: {a1: [3, 5, 9, 10, 13, 15, 19], a2: [1, 2, 3, 15, 4, 5, 6, 30]},
	FlagToMonitor: {9: [ShowLargeWave, 0], 19: [ShowFinalWave, 0]},
	FlagToEnd: function() {
		NewImg('imgSF', 'assets/img/cards/Threepeater.png', 'left:667px;top:220px', EDAll, {
			onclick: function() { GetNewCard(this, oThreepeater, 15) }
		});
		NewImg('PointerUD', 'assets/img/ui/PointerDown.gif', 'top:185px;left:676px', EDAll);
	}
});

};

LevelData["15"] = function() {
//关卡2-5 解锁睡莲——黑夜
oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oCoffeeBean, oSunShroom, oScaredyShroom, oFumeShroom, oStarfruit, oThreepeater],
	ZName: [oZombie, oConeheadZombie, oNewspaperZombie, oBucketheadZombie],
	PicArr: function() {
		var Pro = oLilyPad.prototype;
		return ['assets/img/ui/background2.jpg', 'assets/img/ui/Tombstones.png', 'assets/img/ui/Tombstone_mounds.png', Pro.PicArr[Pro.CardGif], Pro.PicArr[Pro.NormalGif]];
	},
	backgroundImage: 'assets/img/ui/background2.jpg',
	CanSelectCard: 1, DKind: 0, SunNum: 50,
	LevelName: '关卡 2-3',
	LargeWaveFlag: {10: $('imgFlag3'), 20: $('imgFlag1')},
	Monitor: {f: AppearTombstones, ar: [4, 9, 8]},
	UserDefinedFlagFunc: function() {
		var a = oP.FlagZombies;
		a > 10 ? oP.SetTimeoutTomZombie([oConeheadZombie, oBucketheadZombie]) : a > 5 && oP.SetTimeoutTomZombie([oZombie])
	},
	LoadMusic: function() { AudioManager.play("menu"); },
	StartGameMusic: 'night'
},
{
	ArZ: [oZombie, oZombie, oZombie, oConeheadZombie, oConeheadZombie, oNewspaperZombie, oNewspaperZombie, oBucketheadZombie, oBucketheadZombie],
	FlagNum: 20,
	SumToZombie: {1: 6, 2: 10, 3: 13, 'default': 13},
	FlagToSumNum: {a1: [3, 5, 9, 10, 13, 15, 19], a2: [1, 2, 3, 15, 4, 5, 6, 30]},
	FlagToMonitor: {9: [ShowLargeWave, 0], 19: [ShowFinalWave, 0]},
	FlagToEnd: function() {
		NewImg('imgSF', 'assets/img/cards/LilyPad.png', 'left:667px;top:220px', EDAll, {
			onclick: function() { GetNewCard(this, oLilyPad, 16) }
		});
		NewImg('PointerUD', 'assets/img/ui/PointerDown.gif', 'top:185px;left:676px', EDAll);
	}
});

};

LevelData["16"] = function() {
//关卡2-6 解锁火炬树桩——白天，引入橄榄球僵尸
oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oCoffeeBean, oSunShroom, oScaredyShroom, oFumeShroom, oStarfruit, oThreepeater, oLilyPad],
	ZName: [oZombie, oConeheadZombie, oPoleVaultingZombie, oBucketheadZombie, oFootballZombie],
	PicArr: function() {
		var Pro = oTorchwood.prototype;
		return ['assets/img/ui/background1.jpg', Pro.PicArr[Pro.CardGif], Pro.PicArr[Pro.NormalGif]];
	},
	backgroundImage: 'assets/img/ui/background1.jpg',
	CanSelectCard: 1, DKind: 1, SunNum: 125,
	LevelName: '关卡 2-4',
	LargeWaveFlag: {10: $('imgFlag3'), 20: $('imgFlag2'), 30: $('imgFlag1')},
	LoadMusic: function() { AudioManager.play("menu"); },
	StartGameMusic: 'battle'
},
{
	ArZ: [oZombie, oZombie, oConeheadZombie, oConeheadZombie, oConeheadZombie, oPoleVaultingZombie, oBucketheadZombie, oBucketheadZombie, oFootballZombie, oFootballZombie],
	FlagNum: 30,
	SumToZombie: {1: 5, 2: 10, 3: 14, 'default': 14},
	FlagToSumNum: {a1: [3, 5, 9, 10, 13, 15, 19, 20, 23, 25, 29], a2: [1, 2, 3, 18, 4, 5, 6, 25, 7, 8, 9, 35]},
	FlagToMonitor: {9: [ShowLargeWave, 0], 19: [ShowLargeWave, 0], 29: [ShowFinalWave, 0]},
	FlagToEnd: function() {
		NewImg('imgSF', 'assets/img/cards/Torchwood.png', 'left:587px;top:270px', EDAll, {
			onclick: function() { GetNewCard(this, oTorchwood, 17) }
		});
		NewImg('PointerUD', 'assets/img/ui/PointerDown.gif', 'top:235px;left:596px', EDAll);
	}
});

};

LevelData["17"] = function() {
//关卡2-7 解锁花盆——黑夜
oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oCoffeeBean, oSunShroom, oScaredyShroom, oFumeShroom, oStarfruit, oThreepeater, oLilyPad, oTorchwood, oGloomShroom, oPumpkinHead, oGarlic, oPlantern],
	ZName: [oZombie, oConeheadZombie, oNewspaperZombie, oBucketheadZombie, oFootballZombie],
	PicArr: function() {
		var Pro = oFlowerPot.prototype;
		return ['assets/img/ui/background2.jpg', 'assets/img/ui/Tombstones.png', 'assets/img/ui/Tombstone_mounds.png', Pro.PicArr[Pro.CardGif], Pro.PicArr[Pro.NormalGif]];
	},
	backgroundImage: 'assets/img/ui/background2.jpg',
	CanSelectCard: 1, DKind: 0, SunNum: 50,
	LevelName: '关卡 2-5',
	LargeWaveFlag: {10: $('imgFlag3'), 20: $('imgFlag2'), 30: $('imgFlag1')},
	Monitor: {f: AppearTombstones, ar: [3, 9, 10]},
	UserDefinedFlagFunc: function() {
		var a = oP.FlagZombies;
		a > 20 ? oP.SetTimeoutTomZombie([oConeheadZombie, oBucketheadZombie, oFootballZombie]) :
		a > 10 ? oP.SetTimeoutTomZombie([oNewspaperZombie, oBucketheadZombie]) :
		a > 5 && oP.SetTimeoutTomZombie([oZombie, oConeheadZombie])
	},
	LoadMusic: function() { AudioManager.play("menu"); },
	StartGameMusic: 'night'
},
{
	ArZ: [oZombie, oZombie, oZombie, oConeheadZombie, oConeheadZombie, oNewspaperZombie, oNewspaperZombie, oBucketheadZombie, oBucketheadZombie, oFootballZombie],
	FlagNum: 30,
	SumToZombie: {1: 5, 2: 10, 3: 15, 'default': 15},
	FlagToSumNum: {a1: [3, 5, 9, 10, 13, 15, 19, 20, 23, 25, 29], a2: [1, 2, 3, 20, 4, 5, 6, 28, 7, 8, 9, 38]},
	FlagToMonitor: {9: [ShowLargeWave, 0], 19: [ShowLargeWave, 0], 29: [ShowFinalWave, 0]},
	FlagToEnd: function() {
		NewImg('imgSF', 'assets/img/cards/FlowerPot.png', 'left:667px;top:220px', EDAll, {
			onclick: function() { GetNewCard(this, oFlowerPot, 18) }
		});
		NewImg('PointerUD', 'assets/img/ui/PointerDown.gif', 'top:185px;left:676px', EDAll);
	}
});

};

LevelData["18"] = function() {
//关卡2-8 解锁双子向日葵——白天
oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oCoffeeBean, oSunShroom, oScaredyShroom, oFumeShroom, oStarfruit, oThreepeater, oLilyPad, oTorchwood, oGloomShroom, oPumpkinHead, oGarlic, oFlowerPot, oPlantern],
	ZName: [oZombie, oConeheadZombie, oPoleVaultingZombie, oBucketheadZombie, oFootballZombie],
	PicArr: function() {
		var Pro = oTwinSunflower.prototype;
		return ['assets/img/ui/background1.jpg', Pro.PicArr[Pro.CardGif], Pro.PicArr[Pro.NormalGif]];
	},
	backgroundImage: 'assets/img/ui/background1.jpg',
	CanSelectCard: 1, DKind: 1, SunNum: 125,
	LevelName: '关卡 2-6',
	LargeWaveFlag: {10: $('imgFlag3'), 20: $('imgFlag1')},
	LoadMusic: function() { AudioManager.play("menu"); },
	StartGameMusic: 'battle'
},
{
	ArZ: [oZombie, oZombie, oConeheadZombie, oConeheadZombie, oConeheadZombie, oPoleVaultingZombie, oBucketheadZombie, oBucketheadZombie, oFootballZombie, oFootballZombie],
	FlagNum: 20,
	SumToZombie: {1: 6, 2: 10, 3: 14, 'default': 14},
	FlagToSumNum: {a1: [3, 5, 9, 10, 13, 15, 19], a2: [1, 2, 3, 20, 4, 5, 6, 35]},
	FlagToMonitor: {9: [ShowLargeWave, 0], 19: [ShowFinalWave, 0]},
	FlagToEnd: function() {
		NewImg('imgSF', 'assets/img/cards/TwinSunflower.png', 'left:667px;top:220px', EDAll, {
			onclick: function() { GetNewCard(this, oTwinSunflower, 19) }
		});
		NewImg('PointerUD', 'assets/img/ui/PointerDown.gif', 'top:185px;left:676px', EDAll);
	}
});

};

LevelData["19"] = function() {
//关卡2-9 解锁窝瓜——黑夜
oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oCoffeeBean, oSunShroom, oScaredyShroom, oFumeShroom, oStarfruit, oThreepeater, oLilyPad, oTorchwood, oGloomShroom, oPumpkinHead, oGarlic, oFlowerPot, oPlantern, oTwinSunflower, oSquash, oSpikeweed],
	ZName: [oZombie, oConeheadZombie, oNewspaperZombie, oBucketheadZombie, oFootballZombie],
	PicArr: function() {
		var Pro = oSquash.prototype;
		return ['assets/img/ui/background2.jpg', 'assets/img/ui/Tombstones.png', 'assets/img/ui/Tombstone_mounds.png', Pro.PicArr[Pro.CardGif], Pro.PicArr[Pro.NormalGif]];
	},
	backgroundImage: 'assets/img/ui/background2.jpg',
	CanSelectCard: 1, DKind: 0, SunNum: 50,
	LevelName: '关卡 2-7',
	LargeWaveFlag: {10: $('imgFlag3'), 20: $('imgFlag2'), 30: $('imgFlag1')},
	Monitor: {f: AppearTombstones, ar: [3, 9, 12]},
	UserDefinedFlagFunc: function() {
		var a = oP.FlagZombies;
		a > 20 ? oP.SetTimeoutTomZombie([oFootballZombie, oFootballZombie, oBucketheadZombie]) :
		a > 10 ? oP.SetTimeoutTomZombie([oConeheadZombie, oBucketheadZombie, oFootballZombie]) :
		a > 5 && oP.SetTimeoutTomZombie([oZombie, oNewspaperZombie])
	},
	LoadMusic: function() { AudioManager.play("menu"); },
	StartGameMusic: 'night'
},
{
	ArZ: [oZombie, oZombie, oConeheadZombie, oConeheadZombie, oNewspaperZombie, oNewspaperZombie, oBucketheadZombie, oBucketheadZombie, oFootballZombie, oFootballZombie],
	FlagNum: 30,
	SumToZombie: {1: 5, 2: 10, 3: 15, 'default': 15},
	FlagToSumNum: {a1: [3, 5, 9, 10, 13, 15, 19, 20, 23, 25, 29], a2: [1, 2, 3, 22, 4, 5, 6, 30, 7, 8, 9, 40]},
	FlagToMonitor: {9: [ShowLargeWave, 0], 19: [ShowLargeWave, 0], 29: [ShowFinalWave, 0]},
	FlagToEnd: function() {
		NewImg('imgSF', 'assets/img/cards/Squash.png', 'left:587px;top:270px', EDAll, {
			onclick: function() { GetNewCard(this, oSquash, 20) }
		});
		NewImg('PointerUD', 'assets/img/ui/PointerDown.gif', 'top:235px;left:596px', EDAll);
	}
});

};

LevelData["2"] = function() {
oS.Init({
	PName: [oPeashooter, oSunFlower],
	ZName: [oZombie],
	PicArr: function() {
		var a = oCherryBomb.prototype,
		b = a.PicArr;
		return ["assets/img/ui/SodRollCap.png", "assets/img/ui/SodRoll.png", "assets/img/ui/sod3row.png", "assets/img/ui/background1unsodded_1.jpg", b[a.CardGif], b[a.NormalGif]]
	} (),
	backgroundImage: "assets/img/ui/background1unsodded_1.jpg",
	LF: [0, 0, 1, 1, 1, 0],
	CanSelectCard: 0,
	LevelName: "关卡 1-2",
	LargeWaveFlag: {
		6 : $("imgFlag1")
	},
	LoadMusic: function() {
		AudioManager.play("menu");
	},
	InitLawnMower: function() {
		var a = 5,
		b = oGd.gridLM;
		while (--a > 1) {
			b[a] = 1;
			NewImg("LawnMower" + a, "assets/img/misc/LawnMower.gif", "left:" + oS.LawnMowerX + "px;top:" + (GetY(a) - 60) + "px;z-index:" + (3 * a + 2), EDAll)
		}
	},
	StartGame: function() {
		NewImg("sod3row", "assets/img/ui/sod3row.png", "left:119px;top:163px;clip:rect(0,46px,330px,0);z-index:1", EDAll);
		NewImg("SodRoll_1", "assets/img/ui/SodRoll.png", "left:132px;top:128px;z-index:1", EDAll);
		NewImg("SodRollCap_1", "assets/img/ui/SodRollCap.png", "left:127px;top:211px;z-index:1", EDAll);
		NewImg("SodRoll_2", "assets/img/ui/SodRoll.png", "left:132px;top:348px;z-index:1", EDAll);
		NewImg("SodRollCap_2", "assets/img/ui/SodRollCap.png", "left:127px;top:431px;z-index:1", EDAll); (function(e, h, b, d, c, g, a, f) {
			e += 15;
			h += 16;
			d += 16;
			$("sod3row").style.clip = "rect(0," + e + "px,330px,0)";
			SetStyle($("SodRoll_1"), {
				left: h + "px",
				width: --b + "px",
				height: "141px"
			});
			SetStyle($("SodRoll_2"), {
				left: h + "px",
				width: b + "px",
				height: "141px"
			});
			SetStyle($("SodRollCap_1"), {
				left: d + "px",
				width: --c + "px",
				height: --g + "px",
				top: ++a + "px"
			});
			SetStyle($("SodRollCap_2"), {
				left: d + "px",
				width: c + "px",
				height: g + "px",
				top: ++f + "px"
			});
			e < 766 ? oSym.addTask(3, arguments.callee, [e, h, b, d, c, g, a, f]) : (ClearChild($("SodRoll_1"), $("SodRoll_2"), $("SodRollCap_1"), $("SodRollCap_2")), (function() {
SetBlock($("dTop"));
				oS.InitLawnMower();
				SetVisible($("dFlagMeter"));
				PrepareGrowPlants(function() {
					NewEle("DivTeach", "div", 0, 0, EDAll);
					oP.Monitor({
						ar: [0],
						f: function(l) {
							var m = oS.C + 1;
							switch (l) {
							case 0:
								innerText($("DivTeach"), "向日葵是极其重要的植物，一般种在最左边");
								NewImg("PointerUD", "assets/img/ui/PointerUP.gif", "top:120px;left:50px", EDAll);
								oSym.addTask(10, arguments.callee, [++l]);
								break;
							case 1:
								var j = oGd.$,
								i;
								for (i in j) {
									if (j[i].EName == "oSunFlower") {
										innerText($("DivTeach"), "请至少种下三棵向日葵！");
										oSym.addTask(10, arguments.callee, [++l]).addTask(2500,
										function() {
											oP.AddZombiesFlag();
											SetVisible($("dFlagMeterContent"))
										},
										[]);
										return
									}
								}
								oSym.addTask(10, arguments.callee, [l]);
								break;
							case 2:
								var j = oGd.$,
								i, k = 0;
								for (i in j) {
									j[i].EName == "oSunFlower" && (++k)
								}
								k > 1 && (innerText($("DivTeach"), "向日葵越多，你获得阳光的速度就越快！"), ++l);
								oSym.addTask(10, arguments.callee, [l]);
								break;
							default:
								var j = oGd.$,
								i, k = 0;
								for (i in j) {
									j[i].EName == "oSunFlower" && (++k)
								}
								k > 2 ? (innerText($("DivTeach"), "现在用你获得的阳光种植其它的植物！"), SetStyle($("PointerUD"), {
									left: "50px",
									top: "60px"
								}), oSym.addTask(500, SetNone, [$("PointerUD"), $("DivTeach")])) : oSym.addTask(10, arguments.callee, [3])
							}
							return l
						}
					});
					BeginCool();
					AutoProduceSun(25)
				})
			})())
		})(65, 132, 68, 127, 73, 71, 211, 431)
	}
},
{
	ArZ: [oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie],
	FlagNum: 6,
	SumToZombie: {
		1 : 10,
		"default": 10
	},
	FlagToSumNum: {
		a1: [3, 5],
		a2: [1, 2, 4]
	},
	FlagToMonitor: {
		5 : [ShowFinalWave, 0]
	},
	FlagToEnd: function() {
		NewImg("imgSF", "assets/img/cards/CherryBomb.png", "left:827px;top:220px", EDAll, {
			onclick: function() {
				GetNewCard(this, oCherryBomb, 3)
			}
		});
		EditImg($("PointerUD"), 0, "assets/img/ui/PointerDown.gif", {
			left: "836px",
			top: "185px",
			display: "block"
		})
	}
});
};

LevelData["20"] = function() {
//关卡2-10 解锁分裂射手——白天
oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oCoffeeBean, oSunShroom, oScaredyShroom, oFumeShroom, oStarfruit, oThreepeater, oLilyPad, oTorchwood, oGloomShroom, oPumpkinHead, oGarlic, oFlowerPot, oPlantern, oTwinSunflower, oSquash, oSplitPea, oSpikeweed, oSeaShroom],
	ZName: [oZombie, oConeheadZombie, oPoleVaultingZombie, oBucketheadZombie, oFootballZombie],
	PicArr: function() {
		var Pro = oSplitPea.prototype;
		return ['assets/img/ui/background1.jpg', Pro.PicArr[Pro.CardGif], Pro.PicArr[Pro.NormalGif]];
	},
	backgroundImage: 'assets/img/ui/background1.jpg',
	CanSelectCard: 1, DKind: 1, SunNum: 150,
	LevelName: '关卡 2-8',
	LargeWaveFlag: {10: $('imgFlag3'), 20: $('imgFlag2'), 30: $('imgFlag1')},
	LoadMusic: function() { AudioManager.play("menu"); },
	StartGameMusic: 'battle'
},
{
	ArZ: [oZombie, oZombie, oConeheadZombie, oConeheadZombie, oConeheadZombie, oPoleVaultingZombie, oPoleVaultingZombie, oBucketheadZombie, oBucketheadZombie, oFootballZombie, oFootballZombie, oFootballZombie],
	FlagNum: 30,
	SumToZombie: {1: 5, 2: 11, 3: 15, 'default': 15},
	FlagToSumNum: {a1: [3, 5, 9, 10, 13, 15, 19, 20, 23, 25, 29], a2: [1, 2, 3, 25, 4, 5, 6, 32, 7, 8, 9, 45]},
	FlagToMonitor: {9: [ShowLargeWave, 0], 19: [ShowLargeWave, 0], 29: [ShowFinalWave, 0]},
	FlagToEnd: function() {
		NewImg('imgSF', 'assets/img/cards/SplitPea.png', 'left:667px;top:220px', EDAll, {
			onclick: function() { GetNewCard(this, oSplitPea, 21) }
		});
		NewImg('PointerUD', 'assets/img/ui/PointerDown.gif', 'top:185px;left:676px', EDAll);
	}
});

};

LevelData["21"] = function() {
//关卡2-11 解锁高坚果——黑夜
oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oCoffeeBean, oSunShroom, oScaredyShroom, oFumeShroom, oStarfruit, oThreepeater, oLilyPad, oTorchwood, oGloomShroom, oPumpkinHead, oGarlic, oFlowerPot, oPlantern, oTwinSunflower, oSquash, oSplitPea, oSpikeweed, oSeaShroom, oTallNut, oIceShroom, oCactus],
	ZName: [oZombie, oConeheadZombie, oNewspaperZombie, oBucketheadZombie, oFootballZombie],
	PicArr: function() {
		var Pro = oTallNut.prototype;
		return ['assets/img/ui/background2.jpg', 'assets/img/ui/Tombstones.png', 'assets/img/ui/Tombstone_mounds.png', Pro.PicArr[Pro.CardGif], Pro.PicArr[Pro.NormalGif]];
	},
	backgroundImage: 'assets/img/ui/background2.jpg',
	CanSelectCard: 1, DKind: 0, SunNum: 50,
	LevelName: '关卡 2-9',
	LargeWaveFlag: {10: $('imgFlag3'), 20: $('imgFlag2'), 30: $('imgFlag1')},
	Monitor: {f: AppearTombstones, ar: [2, 9, 14]},
	UserDefinedFlagFunc: function() {
		var a = oP.FlagZombies;
		a > 20 ? oP.SetTimeoutTomZombie([oFootballZombie, oFootballZombie, oBucketheadZombie, oBucketheadZombie]) :
		a > 10 ? oP.SetTimeoutTomZombie([oConeheadZombie, oBucketheadZombie, oFootballZombie]) :
		a > 5 && oP.SetTimeoutTomZombie([oZombie, oZombie, oNewspaperZombie])
	},
	LoadMusic: function() { AudioManager.play("menu"); },
	StartGameMusic: 'night'
},
{
	ArZ: [oZombie, oZombie, oConeheadZombie, oConeheadZombie, oNewspaperZombie, oNewspaperZombie, oBucketheadZombie, oBucketheadZombie, oBucketheadZombie, oFootballZombie, oFootballZombie],
	FlagNum: 30,
	SumToZombie: {1: 4, 2: 10, 3: 15, 'default': 15},
	FlagToSumNum: {a1: [3, 5, 9, 10, 13, 15, 19, 20, 23, 25, 29], a2: [1, 2, 3, 25, 4, 5, 6, 35, 7, 8, 9, 48]},
	FlagToMonitor: {9: [ShowLargeWave, 0], 19: [ShowLargeWave, 0], 29: [ShowFinalWave, 0]},
	FlagToEnd: function() {
		NewImg('imgSF', 'assets/img/cards/TallNut.png', 'left:587px;top:270px', EDAll, {
			onclick: function() { GetNewCard(this, oTallNut, 22) }
		});
		NewImg('PointerUD', 'assets/img/ui/PointerDown.gif', 'top:235px;left:596px', EDAll);
	}
});

};

LevelData["22"] = function() {
//关卡2-12 解锁加特林——白天
oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oCoffeeBean, oSunShroom, oScaredyShroom, oFumeShroom, oStarfruit, oThreepeater, oLilyPad, oTorchwood, oGloomShroom, oPumpkinHead, oGarlic, oFlowerPot, oPlantern, oTwinSunflower, oSquash, oSplitPea, oSpikeweed, oSeaShroom, oTallNut, oIceShroom, oCactus, oGatlingPea, oBlover],
	ZName: [oZombie, oConeheadZombie, oPoleVaultingZombie, oBucketheadZombie, oFootballZombie],
	PicArr: function() {
		var Pro = oGatlingPea.prototype;
		return ['assets/img/ui/background1.jpg', Pro.PicArr[Pro.CardGif], Pro.PicArr[Pro.NormalGif]];
	},
	backgroundImage: 'assets/img/ui/background1.jpg',
	CanSelectCard: 1, DKind: 1, SunNum: 200,
	LevelName: '关卡 2-10',
	LargeWaveFlag: {10: $('imgFlag3'), 20: $('imgFlag2'), 30: $('imgFlag1')},
	LoadMusic: function() { AudioManager.play("menu"); },
	StartGameMusic: 'battle'
},
{
	ArZ: [oZombie, oZombie, oConeheadZombie, oConeheadZombie, oPoleVaultingZombie, oPoleVaultingZombie, oBucketheadZombie, oBucketheadZombie, oBucketheadZombie, oFootballZombie, oFootballZombie, oFootballZombie],
	FlagNum: 30,
	SumToZombie: {1: 4, 2: 11, 3: 15, 'default': 15},
	FlagToSumNum: {a1: [3, 5, 9, 10, 13, 15, 19, 20, 23, 25, 29], a2: [1, 2, 3, 28, 4, 5, 6, 38, 7, 8, 9, 50]},
	FlagToMonitor: {9: [ShowLargeWave, 0], 19: [ShowLargeWave, 0], 29: [ShowFinalWave, 0]},
	FlagToEnd: function() {
		NewImg('imgSF', 'assets/img/cards/GatlingPea.png', 'left:667px;top:220px', EDAll, {
			onclick: function() { GetNewCard(this, oGatlingPea, 23) }
		});
		NewImg('PointerUD', 'assets/img/ui/PointerDown.gif', 'top:185px;left:676px', EDAll);
	}
});

};

LevelData["23"] = function() {
//关卡2-13 解锁火爆辣椒——黑夜
oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oCoffeeBean, oSunShroom, oScaredyShroom, oFumeShroom, oStarfruit, oThreepeater, oLilyPad, oTorchwood, oGloomShroom, oPumpkinHead, oGarlic, oFlowerPot, oPlantern, oTwinSunflower, oSquash, oSplitPea, oSpikeweed, oSeaShroom, oTallNut, oIceShroom, oCactus, oGatlingPea, oBlover, oJalapeno, oDoomShroom, oHypnoShroom],
	ZName: [oZombie, oConeheadZombie, oNewspaperZombie, oBucketheadZombie, oFootballZombie],
	PicArr: function() {
		var Pro = oJalapeno.prototype;
		return ['assets/img/ui/background2.jpg', 'assets/img/ui/Tombstones.png', 'assets/img/ui/Tombstone_mounds.png', Pro.PicArr[Pro.CardGif], Pro.PicArr[Pro.NormalGif]];
	},
	backgroundImage: 'assets/img/ui/background2.jpg',
	CanSelectCard: 1, DKind: 0, SunNum: 75,
	LevelName: '关卡 2-11',
	LargeWaveFlag: {10: $('imgFlag3'), 20: $('imgFlag2'), 30: $('imgFlag1')},
	Monitor: {f: AppearTombstones, ar: [2, 9, 16]},
	UserDefinedFlagFunc: function() {
		var a = oP.FlagZombies;
		a > 20 ? oP.SetTimeoutTomZombie([oFootballZombie, oFootballZombie, oFootballZombie, oBucketheadZombie, oBucketheadZombie]) :
		a > 10 ? oP.SetTimeoutTomZombie([oConeheadZombie, oBucketheadZombie, oFootballZombie, oFootballZombie]) :
		a > 5 && oP.SetTimeoutTomZombie([oNewspaperZombie, oBucketheadZombie])
	},
	LoadMusic: function() { AudioManager.play("menu"); },
	StartGameMusic: 'night'
},
{
	ArZ: [oZombie, oConeheadZombie, oConeheadZombie, oNewspaperZombie, oNewspaperZombie, oBucketheadZombie, oBucketheadZombie, oBucketheadZombie, oFootballZombie, oFootballZombie, oFootballZombie],
	FlagNum: 30,
	SumToZombie: {1: 3, 2: 10, 3: 15, 'default': 15},
	FlagToSumNum: {a1: [3, 5, 9, 10, 13, 15, 19, 20, 23, 25, 29], a2: [1, 2, 3, 30, 4, 5, 6, 40, 7, 8, 9, 55]},
	FlagToMonitor: {9: [ShowLargeWave, 0], 19: [ShowLargeWave, 0], 29: [ShowFinalWave, 0]},
	FlagToEnd: function() {
		NewImg('imgSF', 'assets/img/cards/Jalapeno.png', 'left:587px;top:270px', EDAll, {
			onclick: function() { GetNewCard(this, oJalapeno, 24) }
		});
		NewImg('PointerUD', 'assets/img/ui/PointerDown.gif', 'top:235px;left:596px', EDAll);
	}
});

};

LevelData["24"] = function() {
//关卡2-14 BOSS关 解锁地刺王——白天终章
oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oCoffeeBean, oSunShroom, oScaredyShroom, oFumeShroom, oStarfruit, oThreepeater, oLilyPad, oTorchwood, oGloomShroom, oPumpkinHead, oGarlic, oFlowerPot, oPlantern, oTwinSunflower, oSquash, oSplitPea, oSpikeweed, oSeaShroom, oTallNut, oIceShroom, oCactus, oGatlingPea, oBlover, oJalapeno, oDoomShroom, oHypnoShroom, oSpikerock],
	ZName: [oZombie, oConeheadZombie, oPoleVaultingZombie, oNewspaperZombie, oBucketheadZombie, oFootballZombie],
	PicArr: ['assets/img/ui/background1.jpg', 'assets/img/ui/trophy.png'],
	backgroundImage: 'assets/img/ui/background1.jpg',
	CanSelectCard: 1, DKind: 1, SunNum: 50,
	LevelName: '关卡 2-12 最终关',
	LargeWaveFlag: {10: $('imgFlag3'), 20: $('imgFlag2'), 30: $('imgFlag1')},
	LoadMusic: function() { AudioManager.play("menu"); },
	StartGameMusic: 'night'
},
{
	ArZ: [oZombie, oZombie, oConeheadZombie, oConeheadZombie, oConeheadZombie, oPoleVaultingZombie, oPoleVaultingZombie, oNewspaperZombie, oBucketheadZombie, oBucketheadZombie, oBucketheadZombie, oFootballZombie, oFootballZombie, oFootballZombie, oFootballZombie],
	FlagNum: 30,
	SumToZombie: {1: 3, 2: 10, 3: 15, 'default': 15},
	FlagToSumNum: {a1: [3, 5, 9, 10, 13, 15, 19, 20, 23, 25, 29], a2: [2, 3, 5, 30, 6, 8, 12, 40, 15, 20, 25, 60]},
	FlagToMonitor: {9: [ShowLargeWave, 0], 19: [ShowLargeWave, 0], 29: [ShowFinalWave, 0]},
	FlagToEnd: function() {
		NewImg('imgSF', 'assets/img/ui/trophy.png', 'left:260px;top:233px', EDAll, {
			onclick: function() {
				alert('恭喜通关第二大关！所有植物已解锁！');
				SelectModal(0)
			}
		});
		NewImg('PointerUD', 'assets/img/ui/PointerDown.gif', 'top:198px;left:269px', EDAll);
	}
});

};

LevelData["3"] = function() {
oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb],
	ZName: [oZombie, oConeheadZombie],
	PicArr: function() {
		var a = oWallNut.prototype,
		b = a.PicArr;
		return ["assets/img/ui/background1unsodded2.jpg", b[a.CardGif], b[a.NormalGif]]
	} (),
	backgroundImage: "assets/img/ui/background1unsodded2.jpg",
	LF: [0, 0, 1, 1, 1, 0],
	CanSelectCard: 0,
	LevelName: "关卡 1-3",
	LargeWaveFlag: {
		8 : $("imgFlag1")
	},
	LoadMusic: function() {
		AudioManager.play("menu");
	},
	InitLawnMower: function() {
		var a = 5,
		b = oGd.gridLM;
		while (--a > 1) {
			b[a] = 1;
			NewImg("LawnMower" + a, "assets/img/misc/LawnMower.gif", "position:absolute;left:" + oS.LawnMowerX + "px;top:" + (GetY(a) - 60) + "px;z-index:" + (3 * a + 2), EDAll)
		}
	},
	StartGame: function() {
		AudioManager.play("battle");
		SetBlock($("dTop"));
		SetVisible($("dFlagMeter"));
		oS.InitLawnMower();
		PrepareGrowPlants(function() {
			oP.Monitor();
			BeginCool();
			AutoProduceSun(25);
			oSym.addTask(1500,
			function() {
				oP.AddZombiesFlag();
				SetVisible($("dFlagMeterContent"))
			},
			[])
		})
	}
},
{
	ArZ: [oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oConeheadZombie, oConeheadZombie],
	FlagNum: 8,
	SumToZombie: {
		1 : 8,
		"default": 10
	},
	FlagToSumNum: {
		a1: [3, 5, 7],
		a2: [1, 2, 3, 6]
	},
	FlagToMonitor: {
		7 : [ShowFinalWave, 0]
	},
	FlagToEnd: function() {
		NewImg("imgSF", "assets/img/cards/WallNut.png", "left:827px;top:330px", EDAll, {
			onclick: function() {
				GetNewCard(this, oWallNut, 4)
			}
		});
		NewImg("PointerUD", "assets/img/ui/PointerDown.gif", "top:295px;left:836px", EDAll)
	}
});
};

LevelData["4"] = function() {
oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut],
	ZName: [oZombie, oConeheadZombie],
	PicArr: ["assets/img/ui/background1unsodded2.jpg", "assets/img/ui/background1.jpg"],
	backgroundImage: "assets/img/ui/background1unsodded2.jpg",
	CanSelectCard: 0,
	LevelName: "关卡 1-4",
	LargeWaveFlag: {
		9 : $("imgFlag1")
	},
	LoadMusic: function() {
		AudioManager.play("menu");
	},
	StartGame: function() {
		NewImg("sod3row", "assets/img/ui/background1.jpg", "left:-118px;clip:rect(0,264px,600px,0);z-index:0", EDAll);
		NewImg("SodRoll_1", "assets/img/ui/SodRoll.png", "left:122px;top:48px;z-index:1", EDAll);
		NewImg("SodRollCap_1", "assets/img/ui/SodRollCap.png", "left:117px;top:131px;z-index:1", EDAll);
		NewImg("SodRoll_2", "assets/img/ui/SodRoll.png", "left:122px;top:428px;z-index:1", EDAll);
		NewImg("SodRollCap_2", "assets/img/ui/SodRollCap.png", "left:117px;top:511px;z-index:1", EDAll); (function(e, h, b, d, c, g, a, f) {
			e += 15;
			h += 16;
			d += 16;
			$("sod3row").style.clip = "rect(0," + e + "px,600px,0)";
			SetStyle($("SodRoll_1"), {
				left: h + "px",
				width: --b + "px",
				height: "141px"
			});
			SetStyle($("SodRoll_2"), {
				left: h + "px",
				width: b + "px",
				height: "141px"
			});
			SetStyle($("SodRollCap_1"), {
				left: d + "px",
				width: --c + "px",
				height: --g + "px",
				top: ++a + "px"
			});
			SetStyle($("SodRollCap_2"), {
				left: d + "px",
				width: c + "px",
				height: g + "px",
				top: ++f + "px"
			});
			e < 990 ? oSym.addTask(3, arguments.callee, [e, h, b, d, c, g, a, f]) : (ClearChild($("SodRoll_1"), $("SodRoll_2"), $("SodRollCap_1"), $("SodRollCap_2")), (function() {
SetBlock($("dTop"));
				oS.InitLawnMower();
				SetVisible($("dFlagMeter"));
				PrepareGrowPlants(function() {
					oP.Monitor();
					BeginCool();
					AutoProduceSun(25);
					oSym.addTask(1500,
					function() {
						oP.AddZombiesFlag();
						SetVisible($("dFlagMeterContent"))
					},
					[])
				})
			})())
		})(283, 122, 68, 117, 73, 71, 131, 511)
	}
},
{
	ArZ: [oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oConeheadZombie, oConeheadZombie],
	FlagNum: 9,
	SumToZombie: {
		1 : 7,
		2 : 9,
		"default": 9
	},
	FlagToSumNum: {
		a1: [3, 5, 8],
		a2: [1, 2, 3, 10]
	},
	FlagToMonitor: {
		8 : [ShowFinalWave, 0]
	},
	FlagToEnd: function() { (NewImg("imgSF", "assets/img/ui/Shovel.png", "left:667px;top:330px;cursor:pointer", EDAll)).onclick = function() {
			SetHidden(EDAll, $("dFlagMeter")); (SetStyle($("imgSF"), {
				left: "351px",
				top: "131px",
				width: "152px",
				height: "68px",
				cursor: "default"
			})).onclick = null;
			$("iNewPlantCard").src = "assets/img/ui/Shovel.png";
			innerText($("new-plant-title"), "你获得了铲子！");
			innerText($("dNewPlantName"), "铲子");
			innerText($("dNewPlantTooltip"), "你可以使用铲子铲除掉草坪上的植物");
			$("btnNextLevel").onclick = function() {
				SelectModal(5)
			};
			SetBlock($("dNewPlant"))
		};
		NewImg("PointerUD", "assets/img/ui/PointerDown.gif", "top:295px;left:676px", EDAll)
	}
});
};

LevelData["5"] = function() {
oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut],
	ZName: [oZombie, oConeheadZombie],
	PicArr: function() {
		var a = oPotatoMine.prototype,
		b = a.PicArr;
		return ["assets/img/ui/background1.jpg", "assets/img/ui/crater1.png", b[a.CardGif], b[a.NormalGif]]
	} (),
	backgroundImage: "assets/img/ui/background1.jpg",
	CanSelectCard: 0,
	LevelName: "1-5 特别关：陨石坑",
	LargeWaveFlag: {
		10 : $("imgFlag1")
	},
	LoadMusic: function() {
		AudioManager.play("menu");
	},
	StartGame: function() {
		SetHidden($("dSunNum"));
		SetVisible($("tdShovel"));
		SetBlock($("dTop"));
		NewEle("DivTeach", "div", 0, 0, EDAll);
		oP.Monitor({
			ar: [0],
			f: function(c) {
				var d, a = oGd.$,
				b = oS.Chose;
				switch (c) {
				case 0:
					innerText($("DivTeach"), "你必须清理一下你的草坪，用铲子挖出那些植物！");
					NewImg("PointerUD", "assets/img/ui/PointerUP.gif", "top:36px;left:250px", EDAll);
					oSym.addTask(10, arguments.callee, [++c]);
					break;
				case 1:
					b < 0 && (innerText($("DivTeach"), "点击移除一棵植物！"), ++c);
					oSym.addTask(10, arguments.callee, [c]);
					break;
				case 2:
					!(a["2_6_1"] && a["3_8_1"] && a["4_7_1"]) ? (innerText($("DivTeach"), "一直挖吧，挖到你的草坪上没有植物！"), ++c) : b > -1 && (innerText($("DivTeach"), "点击铲子挖出那些植物！"), c = 1);
					oSym.addTask(10, arguments.callee, [c]);
					break;
				default:
					! (a["2_6_1"] || a["3_8_1"] || a["4_7_1"]) ? (function() {
						SetNone($("DivTeach"), $("PointerUD"));
						SetVisible($("dSunNum"), $("dFlagMeter"));
oS.InitLawnMower();
						SetBlock($("dTop"));
						PrepareGrowPlants(function() {
							BeginCool();
							AutoProduceSun(25);
							oSym.addTask(2000,
							function() {
								oP.AddZombiesFlag();
								SetVisible($("dFlagMeterContent"))
							},
							[])
						})
					})() : oSym.addTask(10, arguments.callee, [3])
				}
			}
		},
		function() {
			var c = Math.floor(1 + Math.random() * 5),
			f = Math.floor(1 + Math.random() * 9),
			g = GetX(f) - 55,
			e = GetY(c) - 60,
			b = c + "_" + f,
			a = oP.FlagZombies,
			d;
			switch (true) {
			case a > 3 : SetStyle(d = $("imgCrater"), {
					left: g + "px",
					top: e + "px",
					zIndex: 3 * c
				});
				delete oGd.gridCrater[d.getAttribute("S")];
				oGd.gridCrater[b] = 2;
				d.setAttribute("S", b); (d = oGd.$[b + "_1"]) && d.Die();
				break;
			case a > 2 : (NewImg("imgCrater", "assets/img/ui/crater1.png", "left:" + g + "px;top:" + e + "px;z-index:" + 3 * c, EDAll)).setAttribute("S", b); (d = oGd.$[b + "_1"]) && d.Die();
				oGd.gridCrater[b] = 2
			}
		});
		SetVisible($("dFlagMeter"));
		CustomPlants(0, 2, 6);
		CustomPlants(0, 3, 8);
		CustomPlants(0, 4, 7)
	}
},
{
	ArZ: [oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oConeheadZombie, oConeheadZombie, oConeheadZombie],
	FlagNum: 10,
	SumToZombie: {
		1 : 7,
		2 : 10,
		"default": 10
	},
	FlagToSumNum: {
		a1: [3, 5, 9],
		a2: [1, 2, 3, 10]
	},
	FlagToMonitor: {
		9 : [ShowFinalWave, 0]
	},
	FlagToEnd: function() {
		NewImg("imgSF", "assets/img/cards/PotatoMine.png", "left:587px;top:270px", EDAll, {
			onclick: function() {
				GetNewCard(this, oPotatoMine, 6)
			}
		});
		NewImg("PointerUD", "assets/img/ui/PointerDown.gif", "top:235px;left:596px", EDAll)
	}
});
};

LevelData["6"] = function() {
oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine],
	ZName: [oZombie, oConeheadZombie, oPoleVaultingZombie],
	PicArr: function() {
		var a = oSnowPea.prototype,
		b = a.PicArr;
		return ["assets/img/ui/background1.jpg", "assets/img/ui/crater1.png", b[a.CardGif], b[a.NormalGif]]
	} (),
	backgroundImage: "assets/img/ui/background1.jpg",
	CanSelectCard: 0,
	LevelName: "关卡 1-6",
	LargeWaveFlag: {
		9 : $("imgFlag1")
	},
	LoadMusic: function() {
		AudioManager.play("menu");
	},
},
{
	ArZ: [oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oConeheadZombie, oConeheadZombie, oPoleVaultingZombie],
	FlagNum: 9,
	SumToZombie: {
		1 : 7,
		2 : 10,
		"default": 10
	},
	FlagToSumNum: {
		a1: [3, 5, 8],
		a2: [1, 2, 3, 9]
	},
	FlagToMonitor: {
		8 : [ShowFinalWave, 0]
	},
	FlagToEnd: function() {
		NewImg("imgSF", "assets/img/cards/SnowPea.png", "left:827px;top:525px", EDAll, {
			onclick: function() {
				GetNewCard(this, oSnowPea, 7)
			}
		});
		NewImg("PointerUD", "assets/img/ui/PointerDown.gif", "top:490px;left:836px", EDAll)
	}
});
};

LevelData["7"] = function() {
oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea],
	ZName: [oZombie, oConeheadZombie, oPoleVaultingZombie],
	PicArr: function() {
		var a = oChomper.prototype,
		b = a.PicArr;
		return ["assets/img/ui/background1.jpg", b[a.CardGif], b[a.NormalGif]]
	} (),
	backgroundImage: "assets/img/ui/background1.jpg",
	CanSelectCard: 0,
	LevelName: "关卡 1-7",
	LargeWaveFlag: {
		10 : $("imgFlag3"),
		20 : $("imgFlag1")
	},
	LoadMusic: function() {
		AudioManager.play("menu");
	},
},
{
	ArZ: [oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oConeheadZombie, oConeheadZombie, oPoleVaultingZombie],
	FlagNum: 20,
	SumToZombie: {
		1 : 7,
		2 : 10,
		"default": 10
	},
	FlagToSumNum: {
		a1: [3, 5, 9, 10, 13, 15, 19],
		a2: [1, 2, 3, 10, 4, 5, 6, 15]
	},
	FlagToMonitor: {
		9 : [ShowLargeWave, 0],
		19 : [ShowFinalWave, 0]
	},
	FlagToEnd: function() {
		NewImg("imgSF", "assets/img/cards/Chomper.png", "left:667px;top:220px", EDAll, {
			onclick: function() {
				GetNewCard(this, oChomper, 8)
			}
		});
		NewImg("PointerUD", "assets/img/ui/PointerDown.gif", "top:185px;left:676px", EDAll)
	}
});
};

LevelData["8"] = function() {
oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper],
	ZName: [oZombie, oConeheadZombie, oBucketheadZombie],
	PicArr: function() {
		var a = oRepeater.prototype,
		b = a.PicArr;
		return ["assets/img/ui/background1.jpg", b[a.CardGif], b[a.NormalGif]]
	} (),
	backgroundImage: "assets/img/ui/background1.jpg",
	CanSelectCard: 1,
	LevelName: "关卡 1-8",
	LargeWaveFlag: {
		10 : $("imgFlag1")
	},
	LoadMusic: function() {
		AudioManager.play("menu");
	},
},
{
	ArZ: [oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oConeheadZombie, oConeheadZombie, oBucketheadZombie],
	FlagNum: 10,
	SumToZombie: {
		1 : 7,
		2 : 9,
		3 : 10,
		"default": 10
	},
	FlagToSumNum: {
		a1: [3, 5, 9],
		a2: [1, 2, 3, 10]
	},
	FlagToMonitor: {
		9 : [ShowFinalWave, 0]
	},
	FlagToEnd: function() {
		NewImg("imgSF", "assets/img/cards/Repeater.png", "left:827px;top:525px", EDAll, {
			onclick: function() {
				GetNewCard(this, oRepeater, 9)
			}
		});
		NewImg("PointerUD", "assets/img/ui/PointerDown.gif", "top:490px;left:836px", EDAll)
	}
});
};

LevelData["9"] = function() {
oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater],
	ZName: [oZombie, oConeheadZombie, oPoleVaultingZombie, oBucketheadZombie],
	PicArr: ["assets/img/ui/background1.jpg", "assets/img/ui/ZombieNoteSmall.png"],
	backgroundImage: "assets/img/ui/background1.jpg",
	CanSelectCard: 1,
	LevelName: "关卡 1-9",
	LargeWaveFlag: {
		10 : $("imgFlag3"),
		20 : $("imgFlag2"),
		30 : $("imgFlag1")
	},
	LoadMusic: function() {
		AudioManager.play("menu");
	},
},
{
	ArZ: [oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oConeheadZombie, oConeheadZombie, oPoleVaultingZombie, oBucketheadZombie],
	FlagNum: 30,
	SumToZombie: {
		1 : 6,
		2 : 9,
		3 : 10,
		"default": 10
	},
	FlagToSumNum: {
		a1: [3, 5, 9, 10, 13, 15, 19, 20, 23, 25, 29],
		a2: [1, 2, 3, 10, 4, 5, 6, 15, 7, 8, 9, 25]
	},
	FlagToMonitor: {
		9 : [ShowLargeWave, 0],
		19 : [ShowLargeWave, 0],
		29 : [ShowFinalWave, 0]
	},
	FlagToEnd: function() {
		NewImg("imgSF", "assets/img/ui/ZombieNoteSmall.png", "left:667px;top:220px", EDAll, {
			onclick: function() {
				SelectModal(10)
			}
		});
		NewImg("PointerUD", "assets/img/ui/PointerDown.gif", "top:185px;left:676px", EDAll)
	}
});
};

LevelData["MassGrave"] = function() {
oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oRepeater, oPuffShroom, oSunShroom, oPumpkinHead, oSquash, oFumeShroom, oGloomShroom, oGarlic],
	ZName: [oZombie, oConeheadZombie, oNewspaperZombie, oBucketheadZombie],
	PicArr: function() {
		var a = oFumeShroom.prototype,
		b = a.PicArr;
		return ["assets/img/ui/background2.jpg", "assets/img/ui/Tombstones.png", "assets/img/ui/Tombstone_mounds.png", b[a.CardGif], b[a.NormalGif]]
	} (),
	backgroundImage: "assets/img/ui/background2.jpg",
	CanSelectCard: 1,
	DKind: 0,
	SunNum: 125,
	LevelName: "小游戏：乱葬岗",
	LargeWaveFlag: {
		10 : $("imgFlag3"),
		20 : $("imgFlag2"),
		30 : $("imgFlag1")
	},
	Monitor: {
		f: AppearTombstones,
		ar: [5, 9, 12]
	},
	UserDefinedFlagFunc: function(b) {
		var a = oP.FlagZombies;
		switch (true) {
		case a > 20 : oP.SetTimeoutTomZombie([oConeheadZombie, oConeheadZombie, oBucketheadZombie]);
			break;
		case a > 15 : oP.SetTimeoutTomZombie([oZombie, oConeheadZombie, oBucketheadZombie]);
			break;
		case a > 10 : oP.SetTimeoutTomZombie([oZombie, oConeheadZombie]);
			break;
		case a > 5 : oP.SetTimeoutTomZombie([oZombie])
		}
	},
	LoadMusic: function() {
		AudioManager.play("menu");
	},
	StartGameMusic: "night"
},
{
	ArZ: [oZombie, oZombie, oZombie, oConeheadZombie, oConeheadZombie, oNewspaperZombie, oNewspaperZombie, oNewspaperZombie, oBucketheadZombie, oBucketheadZombie],
	FlagNum: 30,
	SumToZombie: {
		1 : 3,
		2 : 8,
		3 : 10,
		"default": 10
	},
	FlagToSumNum: {
		a1: [3, 5, 9, 10, 13, 15, 19, 20, 23, 25, 29],
		a2: [1, 2, 3, 10, 4, 5, 6, 15, 7, 8, 9, 25]
	},
	FlagToMonitor: {
		9 : [ShowLargeWave, 0],
		19 : [ShowLargeWave, 0],
		29 : [ShowFinalWave, 0]
	},
	FlagToEnd: function() {
		NewImg("imgSF", "assets/img/ui/trophy.png", "left:667px;top:220px", EDAll, {
			onclick: function() {
				SelectModal(0)
			}
		});
		NewImg("PointerUD", "assets/img/ui/PointerDown.gif", "top:185px;left:676px", EDAll)
	}
});
};

LevelData["PovertyOfTheSoil"] = function() {
oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oSplitPea, oJalapeno, oSpikeweed, oRepeater, oTallNut, oPumpkinHead, oSquash, oFlowerPot, oTorchwood, oThreepeater, oGatlingPea, oTwinSunflower, oSpikerock, oFumeShroom, oCoffeeBean, oGloomShroom, oSunShroom, oPuffShroom, oScaredyShroom, oGarlic],
	ZName: [oZombie, oConeheadZombie, oPoleVaultingZombie, oBucketheadZombie],
	PicArr: ["assets/img/ui/background1unsodded2.jpg", "assets/img/ui/ZombieNoteSmall.png"],
	backgroundImage: "assets/img/ui/background1unsodded2.jpg",
	CanSelectCard: 1,
	SunNum: 150,
	LF: [0, 0, 1, 1, 1, 0],
	ZF: [0, 1, 1, 1, 1, 1],
	LevelName: "小游戏：贫瘠之地",
	LargeWaveFlag: {
		10 : $("imgFlag3"),
		20 : $("imgFlag2"),
		30 : $("imgFlag1")
	},
	LoadMusic: function() {
		AudioManager.play("menu");
	},
},
{
	ArZ: [oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oConeheadZombie, oConeheadZombie, oPoleVaultingZombie, oBucketheadZombie],
	FlagNum: 30,
	SumToZombie: {
		1 : 6,
		2 : 9,
		3 : 10,
		"default": 10
	},
	FlagToSumNum: {
		a1: [3, 5, 9, 10, 13, 15, 19, 20, 23, 25, 29],
		a2: [1, 2, 3, 10, 4, 5, 6, 15, 7, 8, 9, 25]
	},
	FlagToMonitor: {
		9 : [ShowLargeWave, 0],
		19 : [ShowLargeWave, 0],
		29 : [ShowFinalWave, 0]
	},
	FlagToEnd: function() {
		NewImg("imgSF", "assets/img/ui/trophy.png", "left:667px;top:220px", EDAll, {
			onclick: function() {
				SelectModal(0)
			}
		});
		NewImg("PointerUD", "assets/img/ui/PointerDown.gif", "top:185px;left:676px", EDAll)
	}
});
};

LevelData["StrongLevel"] = function() {
oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oSplitPea, oJalapeno, oSpikeweed, oRepeater, oTallNut, oPumpkinHead, oSquash, oFlowerPot, oTorchwood, oThreepeater, oGatlingPea, oTwinSunflower, oSpikerock, oFumeShroom, oCoffeeBean, oGloomShroom, oSunShroom, oPuffShroom, oScaredyShroom, oGarlic],
	ZName: [oZombie, oConeheadZombie, oPoleVaultingZombie, oBucketheadZombie],
	PicArr: ["assets/img/ui/background1.jpg", "assets/img/ui/trophy.png"],
	backgroundImage: "assets/img/ui/background1.jpg",
	CanSelectCard: 1,
	LevelName: "小游戏：超乎寻常的压力!",
	LargeWaveFlag: {
		10 : $("imgFlag1")
	},
	LoadMusic: function() {
		AudioManager.play("menu");
	},
	StartGame: function() {
		AudioManager.play("night");
		SetVisible($("tdShovel"), $("dFlagMeter"));
		SetBlock($("dTop"));
		oS.InitLawnMower();
		PrepareGrowPlants(function() {
			oP.Monitor();
			BeginCool();
			AutoProduceSun(25);
			oSym.addTask(2000,
			function() {
				oP.AddZombiesFlag();
				SetVisible($("dFlagMeterContent"))
			},
			[])
		})
	}
},
{
	ArZ: [oZombie, oZombie, oConeheadZombie, oConeheadZombie, oConeheadZombie, oConeheadZombie, oConeheadZombie, oPoleVaultingZombie, oPoleVaultingZombie, oPoleVaultingZombie, oPoleVaultingZombie, oBucketheadZombie, oBucketheadZombie, oBucketheadZombie, oBucketheadZombie],
	FlagNum: 10,
	SumToZombie: {
		1 : 2,
		2 : 11,
		3 : 15,
		"default": 15
	},
	FlagToSumNum: {
		a1: [3, 4, 5, 9],
		a2: [1, 5, 8, 12, 40]
	},
	FlagToMonitor: {
		9 : [ShowFinalWave, 0]
	},
	FlagToEnd: function() {
		NewImg("imgSF", "assets/img/ui/trophy.png", "left:367px;top:233px", EDAll, {
			onclick: function() {
				SelectModal(10)
			}
		})
	}
});
};

LevelData["TestUHeart"] = function() {
oS.Init({
	PName: [oPeashooter, oPotatoMine, oSquash, oCherryBomb, oJalapeno],
	ZName: [oZombie],
	PicArr: ["assets/img/ui/background1.jpg"],
	backgroundImage: "assets/img/ui/background1.jpg",
	CanSelectCard: 0,
	SunNum: 125,
	LevelName: "小游戏：你的心脏够强劲吗？",
	LargeWaveFlag: {
		1 : $("imgFlag1")
	},
	LoadMusic: function() {
		AudioManager.play("menu");
	},
	StartGame: function() {
		SetVisible($("tdShovel"), $("dFlagMeter"));
		SetBlock($("dTop"));
		var a = NewEle("DivTeach", "div", "line-height:40px;font-size: 14px", 0, EDAll);
		NewEle("spanT", "span", "position:absolute;left:0;width:500px;text-align: center; font-family: 幼圆; font-size: 14px;line-height:50px", 0, a);
		NewEle("btnClick1", "span", "cursor:pointer;position:absolute;left:510px;height:40px;width:50px;text-align:center;line-height:40px;font-family: 幼圆; font-size: 14px;color:#FFF;border:1px solid #888;background:#000", 0, a);
		NewEle("btnClick2", "span", "cursor:pointer;position:absolute;left:580px;height:40px;width:100px;text-align:center;line-height:40px;font-family: 幼圆; font-size: 14px;color:#FFF;border:1px solid #888;background:#000", 0, a);
		NewEle("btnClick3", "span", "cursor:pointer;position:absolute;left:700px;height:40px;width:200px;text-align:center;line-height:40px;font-family: 幼圆; font-size: 14px;color:#FFF;border:1px solid #888;background:#000", 0, a);
		innerText($("spanT"), "想测试一下你的CPU和浏览器足够强劲吗？打开任务管理器，点击开始吧！");
		innerText($("btnClick1"), "100个");
		innerText($("btnClick2"), "1000个僵尸！");
		innerText($("btnClick3"), "给我来5000个僵尸吧！！");
		oP.Monitor({
			ar: [0],
			f: function() {
				var b = function() {
oS.InitLawnMower();
					PrepareGrowPlants(function() {
						BeginCool();
						AutoProduceSun(25);
						oP.AddZombiesFlag();
						SetVisible($("dFlagMeterContent"))
					})
				};
				$("btnClick1").onclick = function() {
					oP.FlagToSumNum.a2 = [100];
					innerText($("DivTeach"), "下面有请我们的100个僵尸客串演员出场！");
					b()
				};
				$("btnClick2").onclick = function() {
					oP.FlagToSumNum.a2 = [1000];
					innerText($("DivTeach"), "下面有请我们的1000个僵尸客串演员出场！");
					b()
				};
				$("btnClick3").onclick = function() {
					oP.FlagToSumNum.a2 = [5000];
					innerText($("DivTeach"), "有请5000个客串演员出场！！或许他们化妆需要一点时间，请耐心等待。。。");
					b()
				}
			}
		});
		SetBlock($("dFlagMeter"));
		CustomPlants(0, 2, 5);
		CustomPlants(0, 3, 9);
		CustomPlants(0, 4, 1)
	}
},
{
	ArZ: [oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie, oZombie],
	FlagNum: 1,
	SumToZombie: {
		1 : 30,
		"default": 30
	},
	FlagToSumNum: {
		a1: [],
		a2: [1000]
	},
	FlagToMonitor: {
		1 : [ShowFinalWave, 0]
	},
	FlagToEnd: function() {
		NewImg("imgSF", "assets/img/ui/trophy.png", "left:260px;top:233px", EDAll, {
			onclick: function() {
				SelectModal(0)
			}
		});
		NewImg("PointerUD", "assets/img/ui/PointerDown.gif", "top:198px;left:269px", EDAll)
	}
});
};

LevelData["ZombieRun"] = function() {
oS.Init({
	PName: [oPeashooter, oSunFlower, oCherryBomb, oWallNut, oPotatoMine, oSnowPea, oChomper, oSplitPea, oJalapeno, oSpikeweed, oRepeater, oTallNut, oPumpkinHead, oSquash, oFlowerPot, oTorchwood, oThreepeater, oGatlingPea, oTwinSunflower, oSpikerock, oFumeShroom, oCoffeeBean, oGloomShroom, oSunShroom, oPuffShroom, oScaredyShroom, oGarlic],
	ZName: [oZombie, oConeheadZombie, oPoleVaultingZombie, oBucketheadZombie],
	PicArr: ["assets/img/ui/background1.jpg", "assets/img/ui/trophy.png"],
	backgroundImage: "assets/img/ui/background1.jpg",
	CanSelectCard: 1,
	LevelName: "小游戏：僵尸快跑!",
	LvlClearFunc: function() {
		oSym.TimeStep = 10
	},
	LargeWaveFlag: {
		10 : $("imgFlag3"),
		20 : $("imgFlag1")
	},
	LoadMusic: function() {
		AudioManager.play("menu");
	},
	StartGame: function() {
		AudioManager.play("night");
		SetVisible($("tdShovel"), $("dFlagMeter"));
		SetBlock($("dTop"));
		oS.InitLawnMower();
		PrepareGrowPlants(function() {
			oP.Monitor({
				ar: [],
				f: function() {
					oSym.TimeStep = 2
				}
			});
			BeginCool();
			AutoProduceSun(25);
			oSym.addTask(1500,
			function() {
				oP.AddZombiesFlag();
				SetVisible($("dFlagMeterContent"))
			},
			[])
		})
	}
},
{
	ArZ: [oZombie, oZombie, oConeheadZombie, oConeheadZombie, oConeheadZombie, oConeheadZombie, oConeheadZombie, oPoleVaultingZombie, oPoleVaultingZombie, oPoleVaultingZombie, oPoleVaultingZombie, oBucketheadZombie, oBucketheadZombie, oBucketheadZombie, oBucketheadZombie],
	FlagNum: 20,
	SumToZombie: {
		1 : 2,
		2 : 11,
		3 : 15,
		"default": 15
	},
	FlagToSumNum: {
		a1: [3, 5, 9, 10, 13, 15, 19],
		a2: [1, 3, 5, 20, 10, 15, 20, 30]
	},
	FlagToMonitor: {
		9 : [ShowLargeWave, 0],
		19 : [ShowFinalWave, 0]
	},
	FlagToEnd: function() {
		NewImg("imgSF", "assets/img/ui/trophy.png", "left:367px;top:233px", EDAll, {
			onclick: function() {
				SelectModal(0)
			}
		})
	}
});
};


