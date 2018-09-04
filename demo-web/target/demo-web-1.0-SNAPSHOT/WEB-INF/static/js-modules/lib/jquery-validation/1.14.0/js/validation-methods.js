
(function( factory ) {
	if ( typeof define === "function" && define.amd ) {
		define( ["jquery", "./jquery.validate.js"], factory );
	} else {
		factory( jQuery );
	}
}(function( $ ) {

/**
*	新增Method
*   @author hqc
*/
$.validator.addMethod("byteRangeLength", function(value, element, param) {
	//value = $.trim(value);
    var length = value.length;
    for(var i = 0; i < value.length; i++){
        if(value.charCodeAt(i) > 127){
            length++;
        }
    }
  return this.optional(element) || ( length >= param[0] && length <= param[1] );   
}, $.validator.format("请确保输入的值在{0}-{1}个字节之间(一个中文字算2个字节)"));

// 字符验证 
/*jQuery.validator.addMethod("stringCheck", function(value, element) { 
   return this.optional(element) || /^\w+$/.test(value); 
}, "只能包括英文字母、数字和下划线"); 
*/

jQuery.validator.addMethod("stringCheck", function(value, element) { 
	return this.optional(element) || /^[A-Za-z0-9-]+$/.test(value); 
}, "只能包括英文字母、数字和连字符");

//工号验证 
jQuery.validator.addMethod("isWorkNo", function(value, element) { 
  var tel = /^[A-Za-z0-9]+$/; 
  return this.optional(element) || (tel.test(value)); 
}, "请正确填写您的工号"); 

//电子邮箱验证 
jQuery.validator.addMethod("isEmail", function(value, element) { 
  var email = /^(\w)+(\.\w+)*@(\w)+((\.\w+)+)$/; 
  return this.optional(element) || (email.test(value)); 
}, "请正确填写您的电子邮箱"); 


//联系电话(手机/电话皆可)验证 
jQuery.validator.addMethod("isPhone", function(value,element) { 
 
  var mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/; 
  var tel = /^\d{3,4}-?\d{7,9}$/; 
  return this.optional(element) || (tel.test(value) || mobile.test(value)); 

}, "请正确填写您的联系电话"); 


//字符串验证  
jQuery.validator.addMethod("checkStr", function(value,element) { 
	  
	  var checkStr=/^[a-zA-Z\d]+$/; 
	  return this.optional(element) || (checkStr.test(value)); 

	}, "请填入字母或者数字!");

//只能输入大于0 的正整数
jQuery.validator.addMethod("isNumber", function(value,element) { 
	  var checkStr=/^\+?[1-9]\d*$/; 
	  return this.optional(element) || (checkStr.test(value)); 
	}, "请填入正整数!");

//字符串验证  
jQuery.validator.addMethod("isName", function(value,element) { 
		  
		  var isName=/^[a-zA-Z\u4e00-\u9fa5]+$/; 
		  return this.optional(element) || (isName.test(value)); 

		}, "请填入合理的名称!");


//禁止输入特殊字符处下划线外
jQuery.validator.addMethod("isNameOrUnderline", function(value, element) {

	var isName = /^[a-zA-Z_\d\u4e00-\u9fa5]+$/;
	return this.optional(element) || (isName.test(value));

}, "请填入合理的模块名称!");
//禁止输入特殊字符
jQuery.validator.addMethod("isSpeChar", function(value, element) {

	var isName = /^[a-zA-Z\d\u4e00-\u9fa5]+$/;
	return this.optional(element) || (isName.test(value));

}, "请填入合理的模块名称!");




//字符验证 
jQuery.validator.addMethod("codeCheck", function(value, element) { 
   return this.optional(element) || /^[A-Za-z0-9_-]+$/.test(value); 
}, "编码不能包含中文和特殊字符"); 

//空格
$.validator.addMethod("checkTrim", function(value, element) {
	value = $.trim(value);
    var length = value.length;
    for(var i = 0; i < value.length; i++){
        if(value.charCodeAt(i) > 127){
            length++;
        }
    }
  return this.optional(element) || ( length >= 1);   
}, $.validator.format("*值不能为空!"));

}));
$.validator.addMethod("strZHCheckOrUnderline", function(value, element) {
	return this.optional(element) || /^[\u0391-\uFFE5\w]+$/.test(value);
}, "只能包括中文字、英文字母、数字和下划线");

$.validator.addMethod("strZHCheck", function(value, element) {
	return this.optional(element) || /^[\u4E00-\u9FA5A-Za-z0-9]+$/.test(value);
}, "只能包括中文字、英文字母、数字");

//身份证号码验证
$.validator.addMethod("isIdCardNo", function(value, element) {
	return this.optional(element) || idCardNoUtil.checkIdCardNo(value);
}, "请正确输入您的身份证号码");

//手机号码验证
$.validator.addMethod("isMobile", function(value, element) {
	var length = value.length;
	var mobile = /^(((13[0-9]{1})|(15[0-9]{1}))+\d{8})$/;
	return this.optional(element) || (length == 11 && mobile.test(value));
}, "请正确填写您的手机号码");

// 电话号码验证
$.validator.addMethod("isTel", function(value, element) {
	var tel = /^\d{3,4}-?\d{7,9}$/; // 电话号码格式010-12345678
	return this.optional(element) || (tel.test(value));
}, "请正确填写您的电话号码");


//验证非负整数(包括0)
$.validator.addMethod("nonNegativeIntegers", function(value, element) {
	var reg=/^\d+$/;
	return this.optional(element) || (reg.test(value));
}, "请正确填写您的电话号码");



var idCardNoUtil = {
	provinceAndCitys : {
		11 : "北京",
		12 : "天津",
		13 : "河北",
		14 : "山西",
		15 : "内蒙古",
		21 : "辽宁",
		22 : "吉林",
		23 : "黑龙江",
		31 : "上海",
		32 : "江苏",
		33 : "浙江",
		34 : "安徽",
		35 : "福建",
		36 : "江西",
		37 : "山东",
		41 : "河南",
		42 : "湖北",
		43 : "湖南",
		44 : "广东",
		45 : "广西",
		46 : "海南",
		50 : "重庆",
		51 : "四川",
		52 : "贵州",
		53 : "云南",
		54 : "西藏",
		61 : "陕西",
		62 : "甘肃",
		63 : "青海",
		64 : "宁夏",
		65 : "新疆",
		71 : "台湾",
		81 : "香港",
		82 : "澳门",
		91 : "国外"
	},
	powers : [ "7", "9", "10", "5", "8", "4", "2", "1", "6", "3", "7", "9",
			"10", "5", "8", "4", "2" ],
	parityBit : [ "1", "0", "X", "9", "8", "7", "6", "5", "4", "3", "2" ],
	genders : {
		male : "男",
		female : "女"
	},
	checkAddressCode : function(addressCode) {
		var check = /^[1-9]\d{5}$/.test(addressCode);
		if (!check)
			return false;
		if (idCardNoUtil.provinceAndCitys[parseInt(addressCode.substring(0, 2))]) {
			return true;
		} else {
			return false;
		}
	},
	checkBirthDayCode : function(birDayCode) {
		var check = /^[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))$/
				.test(birDayCode);
		if (!check)
			return false;
		var yyyy = parseInt(birDayCode.substring(0, 4), 10);
		var mm = parseInt(birDayCode.substring(4, 6), 10);
		var dd = parseInt(birDayCode.substring(6), 10);
		var xdata = new Date(yyyy, mm - 1, dd);
		if (xdata > new Date()) {
			return false;// 生日不能大于当前日期
		} else if ((xdata.getFullYear() == yyyy)
				&& (xdata.getMonth() == mm - 1) && (xdata.getDate() == dd)) {
			return true;
		} else {
			return false;
		}
	},
	getParityBit : function(idCardNo) {
		var id17 = idCardNo.substring(0, 17);

		var power = 0;
		for (var i = 0; i < 17; i++) {
			power += parseInt(id17.charAt(i), 10)
					* parseInt(idCardNoUtil.powers[i]);
		}

		var mod = power % 11;
		return idCardNoUtil.parityBit[mod];
	},
	checkParityBit : function(idCardNo) {
		var parityBit = idCardNo.charAt(17).toUpperCase();
		if (idCardNoUtil.getParityBit(idCardNo) == parityBit) {
			return true;
		} else {
			return false;
		}
	},
	checkIdCardNo : function(idCardNo) {
		// 15位和18位身份证号码的基本校验
		var check = /^\d{15}|(\d{17}(\d|x|X))$/.test(idCardNo);
		if (!check)
			return false;
		// 判断长度为15位或18位
		if (idCardNo.length == 15) {
			return idCardNoUtil.check15IdCardNo(idCardNo);
		} else if (idCardNo.length == 18) {
			return idCardNoUtil.check18IdCardNo(idCardNo);
		} else {
			return false;
		}
	},

	// 校验15位的身份证号码
	check15IdCardNo : function(idCardNo) {
		// 15位身份证号码的基本校验
		var check = /^[1-9]\d{7}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}$/
				.test(idCardNo);
		if (!check)
			return false;
		// 校验地址码
		var addressCode = idCardNo.substring(0, 6);
		check = idCardNoUtil.checkAddressCode(addressCode);
		if (!check)
			return false;
		var birDayCode = '19' + idCardNo.substring(6, 12);
		// 校验日期码
		return idCardNoUtil.checkBirthDayCode(birDayCode);
	},

	// 校验18位的身份证号码
	check18IdCardNo : function(idCardNo) {
		// 18位身份证号码的基本格式校验
		var check = /^[1-9]\d{5}[1-9]\d{3}((0[1-9])|(1[0-2]))((0[1-9])|([1-2][0-9])|(3[0-1]))\d{3}(\d|x|X)$/
				.test(idCardNo);
		if (!check)
			return false;
		// 校验地址码
		var addressCode = idCardNo.substring(0, 6);
		check = idCardNoUtil.checkAddressCode(addressCode);
		if (!check)
			return false;
		// 校验日期码
		var birDayCode = idCardNo.substring(6, 14);
		check = idCardNoUtil.checkBirthDayCode(birDayCode);
		if (!check)
			return false;
		// 验证校检码
		return idCardNoUtil.checkParityBit(idCardNo);
	},

	formateDateCN : function(day) {
		var yyyy = day.substring(0, 4);
		var mm = day.substring(4, 6);
		var dd = day.substring(6);
		return yyyy + '-' + mm + '-' + dd;
	},

	// 获取信息
	getIdCardInfo : function(idCardNo) {
		var idCardInfo = {
			gender : "", // 性别
			birthday : "" // 出生日期(yyyy-mm-dd)
		};
		if (idCardNo.length == 15) {
			var aday = '19' + idCardNo.substring(6, 12);
			idCardInfo.birthday = idCardNoUtil.formateDateCN(aday);
			if (parseInt(idCardNo.charAt(14)) % 2 == 0) {
				idCardInfo.gender = idCardNoUtil.genders.female;
			} else {
				idCardInfo.gender = idCardNoUtil.genders.male;
			}
		} else if (idCardNo.length == 18) {
			var aday = idCardNo.substring(6, 14);
			idCardInfo.birthday = idCardNoUtil.formateDateCN(aday);
			if (parseInt(idCardNo.charAt(16)) % 2 == 0) {
				idCardInfo.gender = idCardNoUtil.genders.female;
			} else {
				idCardInfo.gender = idCardNoUtil.genders.male;
			}

		}
		return idCardInfo;
	},
	getId15 : function(idCardNo) {
		if (idCardNo.length == 15) {
			return idCardNo;
		} else if (idCardNo.length == 18) {
			return idCardNo.substring(0, 6) + idCardNo.substring(8, 17);
		} else {
			return null;
		}
	},
	getId18 : function(idCardNo) {
		if (idCardNo.length == 15) {
			var id17 = idCardNo.substring(0, 6) + '19' + idCardNo.substring(6);
			var parityBit = idCardNoUtil.getParityBit(id17);
			return id17 + parityBit;
		} else if (idCardNo.length == 18) {
			return idCardNo;
		} else {
			return null;
		}
	}
};
//验证护照是否正确
function checknumber(number) {
	var str = number;
	//在JavaScript中，正则表达式只能使用"/"开头和结束，不能使用双引号
	var Expression = /(P\d{7})|(G\d{8})/;
	var objExp = new RegExp(Expression);
	if (objExp.test(str) == true) {
		return true;
	} else {
		return false;
	}
};



//路径验证  数字 字母 /
jQuery.validator.addMethod("checkStrUrl", function(value,element) { 
	  
	  var checkStr=/^[A-Za-z0-9-\/]+$/; 
	  return this.optional(element) || (checkStr.test(value)); 

	}, "由英文字母、/、-、数字组成");





	
	