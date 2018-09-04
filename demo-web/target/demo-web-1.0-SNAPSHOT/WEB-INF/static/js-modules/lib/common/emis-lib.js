define(['moment'], function (moment) {
    var DESCRIBABLE_ENUM = {
        SUCCESS: 0,//成功
        FAIL: 999999,//失败

        OUT_INVOICE_REG_NEXT_INVOICE_DISABLE: 31653, //下一个发票号不可用
        OUT_INVOICE_REG_NEW_RANGE: 31654,//门诊挂号发票切换成新的号码段
        IN_INVOICE_PREPAY_NEXT_INVOICE_DISABLE: 31713,//下一个预交款发票号不可用,
        OUT_INVOICE_CHARGE_NEW_RANGE: 31674,//门诊收费发票换成新的号码段
        IN_INVOICE_PREPAY_NEW_RANGE: 31714,//住院预交款发票切换成新的号码段
        REG_NEED_EMPTY: 33128,//档案必填信息为空

        //医保错误
        MED_INS_CALL_ERROR_33: 'MED_INS_CALL_ERROR_33',
    };
    var TIP_MSG = {//用于存放表格提示语
        SAVE_NO_CHANGE: '没有数据变更',//表格没有数据变更的时候的提示语
        SAVE_SUCCESS: '保存成功',//保存成功提示语
        SAVE_FAILD: '更新失败，请联系管理员',//保存或删除失败提示语
        VALID_FAILD: '验证未通过',//验证未通过提示语
        NO_TO_DELETE: '请先选中一条记录',//需要选中的提示语
        BEFORE_RELOAD: '存在变更，是否确认取消',//存在变更，点击取消弹出确认提示语
        DEL_CONFIRM: '是否确认删除？',//删除前确认提示语
        DEL_SUCCESS: '删除成功',//删除前确认提示语
        LOADING: '操作中，请稍后......',//加载提示语
        ISEDIT: '编辑状态不可切换页面',//切换页面提示
        NOT_GET_DATA: '请传入数据再进行检索',//表格没有数据变更的时候的提示语
        ALREADY_DEL: '这是条已作废数据',//表格没有数据变更的时候的提示语
        ALREADY_SETTLE: '这是条已结算数据',//表格没有数据变更的时候的提示语
        INVOICE_TRUE: '票据检测正常',//停用数据，颜色置灰
        INVOICE_FALID: '票据检测异常，没有这张票据',//停用数据，颜色置灰
        STATE_COLOR: 'color:gray',//停用数据，颜色置灰
        SETTLE_COLOR: 'color:blue',//结算数据，颜色置蓝
        IS_PRINT_SUCCESS: '是否打印成功',//确认是否重打的提示语
        JUNK_DATA: 'color:red',//脏数据，颜色置红
        NOT_TODAY: '非当天数据',//非当天号子不可退
        NOT_TWELVE_HOUR: '非12小时内数据',//非12小时内号子不可退
        NOT_TWENTY_FOUR_HOUR: '非24小时内数据',//非24小时内号子不可退
        NOT_TO_BE_PATIENT: '非待诊数据',//非待诊数据不可退
        NOT_CHARGE_INVOICE: '没有收费票据不可结算',//没有收费票据不可结算
    };
    var PUB_DICTIONARY_TYPE = {//公用字典类型参数

        //公共-PUB级别
        SEX: "SEX", //性别
        ID_TYPE: "WD.P00.00.002", //证件类型
        EDUCATION: "EDUCATION", //文化程度
        MARRIED: "MARRIED", //婚姻状况
        NATION: "NATION", //民族
        MEDICAL_PAYMENT: "MEDICAL_PAYMENT", //保险类别
        NATIONALITY: "NATIONALITY", //国籍
        BLOOD_ABO: "BLOOD_ABO", //血型
        BLOOD_RH: "BLOOD_RH", //血型-RH
        CONTACT: "CONTACT", //与户主关系
        DATA_SOURCE: "WD.P00.00.012", //数据来源
        ADDR_TYPE: "ADDR_TYPE", //地址类型
        CONCAT_TYPE: "WD.P00.00.014", //联系类型
        CONCAT_PERSON_TYPE: "CV0400.01", //联系类型（国标、不用）
        BUSINESS_SOURCE: "WD.P00.00.015", //业务来源
        MAX_HOSPITAL_LEVEL: "WD.P00.00.016", //最高诊断单位
        PROFESSION: "PROFESSION", //职业
        TRADE: "WD.P00.00.018", //行业
        TYPE_OF_WORK: "WD.P00.00.019", //工种
        HEALTH: "HEALTH", //健康情况
        DEPT_LEVEL: "WD.P00.00.021", //机构级别
        E_CODE_TYPE: "WD.P00.00.020", //电子码类型
        LENGTH_OF_SERVIC: "LENGTH_OF_SERVIC", //工龄
        RELIGION: "RELIGION", //信仰类型
        DWXZ: "DWXZ", //单位性质
        STANDARD_CODE: "STANDARD_CODE", //标准代码
        NORM_DEPT: "NORM_DEPT", //标准科室
        UNIT: "UNIT", //计量单位
        //------------------------------------------------
        //经济-PUB级别
        FEE_ITEM_TYPE: "WD.H00.00.001",//费用项目类型
        SOURCE_TYPE: "SOURCE_TYPE",//病人来源 //WD.H01.00.001
        DISTRICT: "WD.H01.00.002",//区域
        AGE_TYPE: "WD.H01.00.003",//年龄分类
        CHARGE_SOURCE_LIST: "WD.H01.00.004",//收费来源
        HEALTH_INSURANCE_TYPE: "WD.H01.00.005",//医保分类
        PAY_SOURCE: "WD.H01.00.006",//结算支付来源
        PAY_TERMINAL_TYPE: "WD.H01.00.007",//支付终端类型
        //经济-机构级别
        //收费相关
        CANCEL_REASON: "WD.H01.01.001",//收费--特批作废申请理由
        CANCEL_REENTRY_REASON: "WD.H01.01.002", //收费--作废重收申请理由
        INVOICE_ENTITY_TYPE: "WD.H01.01.004",//票据分类：纸质票据、电子样式票据
        PAY_TYPE: "WD.H01.01.007",//资金支付方式
        INVOICE_USE_TYPE: "WD.H01.01.008",//票据种类：收费票据、住院票据
        INVOICE_NATURE_TYPE: "WD.H01.01.009",//票据类型:单联、双联
        FEE_TYPE: "WD.H01.01.010",//费用类型
        PRICE_LEVEL: "WD.H01.01.011",//价格级别
        FUND_RECOGNITION_TYPE: "WD.H01.01.012",//结算资金识别标识
        PUBLISH_CARD_WAY: "WD.H01.01.013",//发卡途径
        //住院资源
        BED_LEVEL: "BED_LEVEL",//床位等级
        IN_REASON: "IN_REASON",//住院原因 WD.H01.03.002
        IN_WAY: "IN_WAY",//住院途径 //WD.H01.03.003
        RESV_NOTICE_RESULT: "WD.H01.03.004",//预约结果通知
        RESV_PRIORITY_LEVEL: "RESV_PRIORITY_LEVEL",//住院预约优先级 WD.H01.03.005
        OIS_IN_WAY: "WD.H01.03.006",//入院方式
        RESV_TYPE: "WD.H01.03.007",//预约类型:本院预约、双向转诊、分级诊疗
        RESV_SOURCE: "WD.H01.03.008",//预约来源
        // 非经济项目
        OUT_WAY: "OUT_WAY"//离院方式
    };

    /**
     * 常量
     */
    var CONST = {

        //结算类型的classname
        CLASSNAME_YIWU: 'yiwu',
        CLASSNAME_SIMPLE: 'simple',
        CLASSNAME_OTHER: 'other',

        READ_CLASS_SIMPLE_YIWU: 'simple.yiwu',//义乌自费卡
        READ_CLASS_ICCARD_YIWU: 'iccard.yiwu',//义乌一卡通（健康卡）
        READ_CLASS_MEDINS_YIWU: 'medins.yiwu',//义乌医保卡

        LOCAL_CLASSNAME_SIMPLE_MAP: {'yiwu': 'simple'},
        LOCAL_READ_CLASS_SIMPLE_MAP: {'medins.yiwu': 'simple.yiwu'},

        //卡的类别:1 正式卡，2 临时卡，3 电子健康卡
        YKT_KLX: {
            YKT: "1",//1 正式卡
            YKT_TMP: "2",//2 临时卡
            JKK: "3"//3 电子健康卡
        },

        ONLY_CASH: "ONLY_CASH",

        //体检挂号指定的卡类型
        CARD_TYPE_PE: -1,

        //挂号来源（与后台对应）
        REG_SOURCE: {
            WINDOW: 'WINDOW',//窗口
            DOC: 'DOC',//医生诊间
            PHYSICAL_EXAMINATION: 'PHYSICAL_EXAMINATION',//体检
            PUBLIC_HEALTH: 'PUBLIC_HEALTH',//公卫
        },

        USED_TYPE: {
            IN_USED: 'IN_USED',//住院使用
            OUT_USED: 'OUT_USED',//门诊使用
            OTHER_USED: 'OTHER_USED',//其它使用
        },

        /**
         * 数据常量
         */
        ID_TYPE_NAME_ID_CARD: '身份证',

        //12小时毫秒数
        TWELVE_HOUR: 43200000,
        TWENTY_FOUR_HOUR: 86400000,
        //基础维护相关
        CAN_CHANGE: 0,//tab页可以进行切换
        NOT_CHANGE: 1,//tab页不允许进行切换
        /**
         * 挂号费用系统参数的名称
         */
        OUT_REG_FEE_ID: {key: 'OUT_REG_FEE_ID', displayName: '挂号费'},
        OUT_DIAGNOSIS_FEE_ID: {key: 'OUT_DIAGNOSIS_FEE_ID', displayName: '诊疗费'},
        OUT_MEDICAL_RECORD_FEE_ID: {key: 'OUT_MEDICAL_RECORD_FEE_ID', displayName: '病历本费'},
        OUT_CARD_FEE_ID: {key: 'OUT_CARD_FEE_ID', displayName: '磁卡费'},
        /**
         * 支付费用获取
         */
        OUT_BASE_ID_CASH: 1,

        OUT_PAY_SOURCE_REG_CODE: 101,
        OUT_PAY_SOURCE_CHARGE_CODE: 111,

        OUT_PAY_FLAG_DIS: 402,

        /**
         * 获取机构集合的传入参数，是否使用时获取，1=使用时获取机构数据，0=维护时获取机构数据
         */
        TABLE_IS_USE_GET: 1,
        TABLE_IS_USE_UPDATE: 0,
        TABLE_IS_USE_GET_AND_UPDATE: 2, //可维护，也可使用


        /**
         * 门诊挂号
         */
        CHARGE_SOURCE_REG: 1,
        /**
         * 门诊收费
         */
        CHARGE_SOURCE_CHARGE: 2,
        /**
         * 收费代开
         */
        CHARGE_SOURCE_CHARGE_AGENT: 3,
        /**
         * 体检收费
         */
        CHARGE_SOURCE_PIS: 4,
        /**
         * 诊间挂号
         */
        CHARGE_SOURCE_DOC_REG: 5,
        /**
         * 公卫收费
         */
        CHARGE_SOURCE_PUB_HEALTH: 6,
        /**
         * 诊间结算
         */
        CHARGE_SOURCE_CHARGE_INTER: 7,
        //上面加一个，下面个也要加
        /**
         * 收费来源（=1门诊挂号 =2医生诊间 =3收费代开 =4体检收费 =5诊间挂号 =6公卫 =7诊间结算）
         */
        CHARGE_SOURCE_LIST: [{value: 1, text: '门诊挂号'},
            {value: 2, text: '医生诊间'},
            {value: 3, text: '收费代开'},
            {value: 4, text: '体检收费'},
            {value: 5, text: '诊间挂号'},
            {value: 6, text: '公卫收费'},
            {value: 7, text: '诊间结算'}],
        PAYWAY_THIRD: "USE_PAYCODE",
        //是否验证收费票据的参数
        USE_CHARGE_INVOICE: "USE_CHARGE_INVOICE",
        /**
         * 打印的url
         */
        PRINT_CHARGE: 'printCharge',//门诊收费票据打印
        PRINT_CHARGE_FOR_SHOW: 'printChargeForShow',//门诊收费票据打印
        PRINT_CHARGE_INTER: 'printChargeInter',
        PRINT_REG: 'printReg',//门诊挂号发票打印
        PRINT_REG_FOR_SHOW: 'printRegForShow',//门诊挂号发票凭证打印
        PRINT_WIRST_STRAP: 'printWristStrap',//腕带打印
        PRINT_DEDSIDE_CARD: 'printBedsideCard',//床头卡打印
        PRINT_CHARGE_PIS: 'printRegPis',//体检发票打印
        PRINT_CHARGE_IN: 'doPrint',//住院发票打印
        /**
         * 打印的code
         */
        EMIS_MED_RECORD: "EMIS_MED_RECORD",
        CHARGE_INVOICE_CODE: "EMIS_CHARGE_INVOICE",
        CHARGE_INVOICE_SHOW_CODE: "EMIS_CHARGE_INVOICE_SHOW",
        REG_INVOICE_CODE: "EMIS_REG_INVOICE",
        EMIS_CHARGE_INVOICE_INTER: "EMIS_CHARGE_INVOICE_INTER",
        PRE_INVOICE_CODE: "EMIS_PRE_INVOICE",
        REG_INVOICE_SHOW_CODE: "EMIS_REG_INVOICE_SHOW",
        OUT_PERSONAL_INCOME_CODE: "EMIS_OUT_PERSONAL_INCOME",
        IN_PERSONAL_INCOME_CODE: "EMIS_IN_PERSONAL_INCOME",
        OUT_STATEMENT_ACCESSORY_CODE: "EMIS_OUT_STATEMENT_ACCESSORY",
        IN_STATEMENT_ACCESSORY_CODE: "EMIS_IN_STATEMENT_ACCESSORY",
        PAT_FEE_DETAIL_CODE: "EMIS_PAT_FEE_DETAIL",
        EMIS_ACCIN_DAILYLIST: "EMIS_ACCIN_DAILYLIST",
        EMIS_ACCIN_CHARGE: "EMIS_ACCIN_CHARGE",
        EMIS_MEDICARE_TRANSFER_CODE: "EMIS_MEDICARE_TRANSFER_CODE",
        EMIS_OUT_PERSONAL_DAILY_CODE: "EMIS_OUT_PERSONAL_DAILY",
        EMIS_IN_PERSONAL_DAILY_CODE: "EMIS_IN_PERSONAL_DAILY",
        /**
         * 系统参数名
         */
        NO_FEE_USE_INVOICE: "NO_FEE_USE_INVOICE",
        IS_PRINT_TWO_PRE: "IS_PRINT_TWO_PRE",
        /**
         * 操作类型
         */
        OPER_TYPE_IN_CHARGE: 1,
        OPER_TYPE_OUT_CHARGE: 2,
        /**
         * 支付来源
         */
        BACK_REGISTER: 102,//门诊退号
        PAY_REGISTER: 101,//门诊挂号
        /**
         * 打印状态
         */
        NERVER_PRINT: 0,//未打印
        IS_PRINT: 1,//正常打印
        AGAIN_PRINT: 2,//票据重打
        LATE_PRINT: 3,//补打
        LATE_SHOW_PRINT: 5,//补开
        INVOICE_PRB_DATA: [{value: 0, text: '未打印'},
            {value: 1, text: '打印'},
            {value: 2, text: '重打'},
            {value: 3, text: '补打'}],
        INVOICE_TYPE_DATA: [{value: 1, text: '纸质票据'},
            {value: 2, text: '电子样式票据'},
            {value: 3, text: '电子签名票据'},
            {value: 4, text: '流水凭证'}],
        /**
         * 发票状态
         */
        INVOICE_STATE_DATA: [{value: 1, text: '未用'},
            {value: 2, text: '已用'},
            {value: 3, text: '作废'},
            {value: 4, text: '报损'}],
        /**
         * 收费项目名称
         */
        OUT_CHARGE: '门诊收费',
        OUT_REG: '门诊挂号',
        /**
         * 发票类别
         */
        PIPE_INVOICE: '04',
        /**
         * 病人来源
         */
        DIC_SOURCE_TYPE_OUT_SERVICE: 1,//门诊
        DIC_SOURCE_TYPE_IN_HOSPITAL: 2,//住院
        DIC_SOURCE_TYPE_HEALTH_EXAMINATION: 3,//体检
        DIC_SOURCE_TYPE_HEALTH_INFO: 4,//健康档案
        DIC_SOURCE_TYPE_PACS: 5,//PACS
        DIC_SOURCE_TYPE_LIS: 6,//LIS
        DIC_SOURCE_TYPE_7: 7,//急诊
        DIC_SOURCE_TYPE_8: 8,//门诊留观
        DIC_SOURCE_TYPE_9: 9,//预检分诊
        DIC_SOURCE_TYPE_10: 10,//入院申请
        DIC_SOURCE_TYPE_OTHER: 99,//其它

        /**
         * 医保字典不同目录
         */
        YWYB_SIMPLE: 'SIMPLE',
        YWYB_KSML: 'KSML',
        YWYB_YPZLML: 'YPZLML',
        YWYB_JBML: 'JBML',
        YWYB_SFLB: 'SFLB',
        YWYB_XZLML: 'XZLML',
        YWYB_YBDDYY: 'YBDDYY',

        // 地址code
        ADDR_TYPE_CENSUS: '01',//户籍住址
        ADDR_TYPE_ORIGIN: '10',//籍贯地址
        /**
         * 门诊资源
         */
        RESV_WINDOW: 'O1'//现场预约途径代码
    };
    var DIC_DATA_CONST = {// 格式：'NAME'：'CODE'
        SEX: {
            MALE: '1',//男
            FEMALE: '2',//女
            OTHER: '9',//其它
            UNKNOWN: '0'//不详
        },
        INVOICECODE: {
            REG_INVOICE: '01',//挂号票据
            CHARGE_INVOICE: '02',//收费票据
            HOS_INVOICE: '03',//住院票据
            PRE_INVOICE: '04'//预缴款票据
        },
        //证件类型
        ID_TYPE: {
            ID: '1', //"身份证"
            REGISTERED: '2', //"户口簿"
            PASSPORT: '3', //"护照"
            OFFICER: '4', //"军官证"
            DRIVING_LICENCE: '5', //"驾驶证"
            HK_MACAO: '6', //"港澳通行证"
            TAIWAN: '7', //"台湾通行证"
            OTHER: '99' //"其他法定有效证件"
        },
        //国籍
        NATIONALITY: {
            CHINA: '156'
        }
    };

    /**
     * 快捷键对应
     */
    var SPECIAL_KEYS = {
        8: "backspace", 9: "tab", 10: "return", 13: "return", 16: "shift", 17: "ctrl", 18: "alt", 19: "pause",
        20: "capslock", 27: "esc", 32: "space", 33: "pageup", 34: "pagedown", 35: "end", 36: "home", 37: "left",
        38: "up", 39: "right", 40: "down", 45: "insert", 46: "del", 59: ";", 61: "=", 96: "0", 97: "1", 98: "2",
        99: "3", 100: "4", 101: "5", 102: "6", 103: "7", 104: "8", 105: "9", 106: "*", 107: "+", 109: "-", 110: ".",
        111: "/", 112: "f1", 113: "f2", 114: "f3", 115: "f4", 116: "f5", 117: "f6", 118: "f7", 119: "f8", 120: "f9",
        121: "f10", 122: "f11", 123: "f12", 144: "numlock", 145: "scroll", 173: "-", 186: ";", 187: "=", 188: ",",
        189: "-", 190: ".", 191: "/", 192: "`", 219: "[", 220: "\\", 221: "]", 222: "'"
    };

    var Validator = {
        /**
         * 计算字节长度（汉字算2个字节，英文数字等算1个字节）
         * @param str
         * @returns {number}
         */
        byteLen: function (str) {
            var len = 0;
            for (var i = 0; i < str.length; i++) {
                if (str.charCodeAt(i) > 127 && str.charCodeAt(i) < 0) {
                    len += 2;
                } else {
                    len++;
                }
            }
            return len;
        },

        onNameValidation: function (e) {
            if (e.value != null && e.value != '') {
                var s = "[`~!@#$^&*()=|{}':;',\[\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？.]";//验证规则
                for (var i = 0; i < e.value.length; i++) {
                    if (s.indexOf(e.value.substr(i, 1)) != -1) {
                        mini.showTips({
                            content: '请输入正确的姓名',
                            state: 'danger',      //default|success|info|warning|danger
                            x: 'right',          //left|center|right
                            y: 'top'          //top|center|bottom
                        });
                        e.isValid = false;
                        break;
                    }
                }
            }
        },
        onPhoneValidation: function (e) {
            if (e.value != null && e.value != '') {
                var reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/; //验证规则
                if (reg.test(e.value)) {
                    e.isValid = true;
                } else {
                    mini.showTips({
                        content: '请输入正确的手机号码',
                        state: 'danger',      //default|success|info|warning|danger
                        x: 'right',          //left|center|right
                        y: 'top'          //top|center|bottom
                    });
                    e.isValid = false;
                }
            }
        },
        onTelPhoneValidation: function (e) {
            if (e.value != null && e.value != '') {
                var reg = /^1[3|4|5|6|7|8|9][0-9]{9}$/; //手机验证规则
                var reg2 = /^0\d{2,3}-?\d{7,8}$/;//固话验证规则
                var reg3 = /^\d{8}$/;//小灵通验证规则
                if (reg.test(e.value) || reg2.test(e.value) || reg3.test(e.value)) {
                    e.isValid = true;
                } else {
                    mini.showTips({
                        content: '请输入正确的号码',
                        state: 'danger',      //default|success|info|warning|danger
                        x: 'right',          //left|center|right
                        y: 'top'          //top|center|bottom
                    });
                    e.isValid = false;
                }
            }
        },
        onPostValidation: function (e) {
            if (e.value != null && e.value != '') {
                var reg = /^[1-9]\d{5}$/; //验证规则
                if (reg.test(e.value)) {
                    e.isValid = true;
                } else {
                    mini.showTips({
                        content: '请输入正确的邮编',
                        state: 'danger',      //default|success|info|warning|danger
                        x: 'right',          //left|center|right
                        y: 'top'          //top|center|bottom
                    });
                    e.isValid = false;
                }
            }
        },
        isLimit: function (e, num) {//该方法可用于各种字节数验证，传入指定e以及限制字节数num
            var val = e.value;
            if (val != null && val != '' && val != undefined) {
                //验证最大长度num位
                var len = 0;
                for (var i = 0; i < val.length; i++) {
                    var a = val.charAt(i);
                    if (a.match(/[^\x00-\xff]/ig) !== null) {
                        len += 2;
                    }
                    else {
                        len += 1;
                    }
                }
                if (len > num) {
                    e.isValid = false;
                    e.errorText = '字符个数不得超过' + num;
                }
                else {
                    e.isValid = true;
                }
            }
        },
        addrIsLimit: function (dataArr) {
            var validation = {};
            for (var j = 0; j < dataArr.length; j++) {
                if (dataArr[j].value) {
                    var val = dataArr[j].value;
                    var num = dataArr[j].num;
                    var name = dataArr[j].name;
                    //验证最大长度num位
                    var len = 0;
                    for (var j = 0; j < val.length; j++) {
                        var a = val.charAt(j);
                        if (a.match(/[^\x00-\xff]/ig) !== null) {
                            len += 2;
                        }
                        else {
                            len += 1;
                        }
                    }
                    if (len > num) {
                        validation = {isValid: false, name: name, num: num};
                        return validation;
                    }
                    else {
                        validation = {isValid: true};
                        return validation;
                    }
                }
                else {
                    validation = {isValid: true};
                    return validation;
                }
            }
        },
        onlyNum: function (e, num) {
            var re = new RegExp('^\\d{1,' + num + '}(\\.\\d{1,2})?$');
            var val = e.value;
            if (val != null && val != '' && val != undefined) {
                if (re.test(val)) {
                    e.isValid = true;

                } else {
                    e.isValid = false;
                    e.errorText = '只允许输入' + (num - 2) + '位数字,且小数最多两位';
                }
            }
        },
        notNull: function (e) {//不可为空
            var val = e.value;
            if (val != undefined) {
                val = val.replace(/(^\s*)|(\s*$)/g, "");
            }
            if (val == '' || val == undefined) {
                e.isValid = false;
                e.errorText = '不能为空';
            } else {
                e.isValid = true;
            }
        },
        onEnglishAndNumberValidation: function (e) {
            var val = e.value;
            if (e.isValid) {
                if (val == '' || val == undefined) {
                    return false;
                }
                if (isEnglishAndNumber(val) == false) {
                    e.errorText = "必须输入英文或数字";
                    e.isValid = false;
                }
            }
        },
        onZhOrNumOrLettValidation: function (obj) {    //判断是否是汉字、字母、数字组成
            var regu = new RegExp("^[0-9a-zA-Z\u4E00-\u9FFF]+$");
            /* var re = new RegExp(regu);*/
            if (regu.test(obj.value)) {
                obj.isValid = true;
            } else {
                view.showErrorTip("只能输入汉字、字母或数字,不能有特殊字符");
                obj.isValid = false;
            }
        },
        onIDCardsValidation: function (obj) {
            //  var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
            //15位和18位身份证号码的正则表达式
            var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
            //如果通过该验证，说明身份证格式正确，但准确性还需计算
            if (regIdCard.test(obj.value)) {
                if (obj.value.length == 18) {
                    var idCardWi = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2); //将前17位加权因子保存在数组里
                    var idCardY = new Array(1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2); //这是除以11后，可能产生的11位余数、验证码，也保存成数组
                    var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
                    for (var i = 0; i < 17; i++) {
                        idCardWiSum += obj.value.substring(i, i + 1) * idCardWi[i];
                    }
                    var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
                    var idCardLast = obj.value.substring(17);//得到最后一位身份证号码
                    //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
                    if (idCardMod == 2) {
                        if (idCardLast == "X" || idCardLast == "x") {
                            obj.isValid = true;
                        } else {
                            obj.isValid = false;
                            //alert("身份证号码错误！");
                        }
                    } else {
                        //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                        if (idCardLast == idCardY[idCardMod]) {
                            obj.isValid = true;
                        } else {
                            // view.showErrorTip("身份证数据不对，请重新数据");
                            obj.errorText = "身份证数据不对，请重新数据";
                            obj.isValid = false;
                        }
                    }
                }
            } else {
                // view.showErrorTip("身份证位数不对，请重新数据");
                obj.errorText = "身份证位数不对，请重新数据";
                obj.isValid = false;
            }
        },
        onGetBirthByIdCardValidation: function (birth, flag) {
            if (!flag) {
                birth = 1;
            }
            var msg = {};
            switch (birth) {
                case 0:
                    msg = {type: false, value: '出生日期获取失败，请重新输入证件号码'};
                    msg = '出生日期获取失败，请重新输入证件号码';
                    break;
                case 1:
                    msg = {type: false, value: '该证件号码不符合身份证计算出生日期的计算规则'};
                    break;
                default:
                    msg = {type: true, value: birth};
                    break;
            }
            return msg;
        }
    };

    var KeyBind = {
        /**
         * 是否绑定了快捷键
         * @param e 事件
         * @param key 快捷键名称
         * @returns {boolean}
         */
        isBindKey: function (e, key) {
            if (SPECIAL_KEYS[e.which] == key) {
                return true;
            }
        }
    };
    var util = {
        /**
         * 热键常量
         */
        hotkeys: (function () {
            var hotkeys = {
                ADD: 'Alt+N',
                EDIT: 'Alt+E',
                SAVE: 'Alt+W',
                CANCEL: 'Alt+C',
                REMOVE: 'Alt+D',
                REFRESH: 'Alt+R',
                PRINT: 'Alt+P',
                OK: 'Alt+Q',
                SEARCH: 'F5',
                REQUEST: 'F2',
                PAY: 'F6',
                SUBMIT: 'F2',
                CHECK: 'F6',
                EXECUTE: 'F8',
                RETURN: 'ESC'
            };

            for (var k in hotkeys) {
                var key = hotkeys[k];

                if (key.length == 5 && key.indexOf('Alt+') == 0) {
                    hotkeys[k + '_TIP'] = key[4];
                } else {
                    hotkeys[k + '_TIP'] = key;
                }
            }

            return hotkeys;
        })(),
        /**
         * 获取URL中的参数
         * @param paramName 参数名称，可以为空
         * @returns Object 当paramName为空的时候返回的是所有参数组成的对象，
         *          如果paramName不为空，返回的是paramName对应的值
         */
        getUrlParams: function (paramName) {
            var paramObj = {};
            var name, value;
            var url = location.href; //取得整个地址栏
            var questionMarkIndex = url.indexOf("?");
            if (questionMarkIndex >= 0) {
                var paramsStr = url.substr(questionMarkIndex + 1); //取得所有参数  substr(start [, length ]
                if (paramsStr) {
                    var paramArr = paramsStr.split("&"); //各个参数放到数组里
                    for (var i = 0; i < paramArr.length; i++) {
                        var equalIndex = paramArr[i].indexOf("=");
                        if (equalIndex > 0) {
                            name = paramArr[i].substring(0, equalIndex);
                            value = paramArr[i].substr(equalIndex + 1);
                            if (value) {
                                value = decodeURIComponent(value);
                            }
                            paramObj[name] = value;
                        }
                    }
                    if (paramName) {
                        return paramObj[paramName];
                    }
                }
            }
            return paramObj;
        },
        /**
         * 获取第三方调用经济页面的参数
         * @returns {*|Object}
         */
        getPageCallUrlParams: function () {
            return util.getUrlParams('urlParams');
        },
        /**
         * 是否是身份证号
         * @param value
         * //TODO 完善
         */
        isIDCard: function (value) {
            var result = false;
            //15位和18位身份证号码的正则表达式
            var idCardRegExp = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;
            //如果通过该验证，说明身份证格式正确，但准确性还需计算
            if (idCardRegExp.test(value)) {
                if (value.length === 18) {
                    var idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //将前17位加权因子保存在数组里
                    var idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; //这是除以11后，可能产生的11位余数、验证码，也保存成数组
                    var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
                    for (var i = 0; i < 17; i++) {
                        idCardWiSum += value.substring(i, i + 1) * idCardWi[i];
                    }
                    var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
                    var idCardLast = value.substring(17);//得到最后一位身份证号码
                    //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
                    if (idCardMod === 2) {
                        if (idCardLast === "X" || idCardLast === "x") {
                            result = true;
                        }
                    } else {
                        //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                        if (idCardLast == idCardY[idCardMod]) {
                            result = true;
                        }
                    }
                }
            }
            return result;
        }
    };

    //公共方法
    var COMMON = {
        //是否是自费
        isSimple: function (readclass) {
            //simple开头的都是自费卡
            return readclass.indexOf('simple') === 0;
        },
        //是否是医保
        isMedIns: function (readclass) {
            //medins开头的都是自费卡
            return readclass.indexOf('medins') === 0;
        },
        //是否是异地医保
        isOtherMedIns: function (readclass) {
            return readclass.indexOf('other') === 0;
        },

        //封装非正规的异常对象
        getError: function (e) {
            if (e && typeof e === 'string') {
                e = new Error(e);
            }
            return e;
        },
        /**
         * 是否是医保提示异常($$开始，$$结束)
         * @param e
         */
        isMedInsErrorMessage: function (message) {
            return message && (/\$\$[\s\S]*\$\$/.test(message));
        },
        /**
         * 获取结算窗口的属性
         * @param targetWindow
         */
        getTrialOpt: function (targetWindow) {
            if (!targetWindow) {
                //默认取父窗口
                targetWindow = window.parent;
            }
            var wWidth = targetWindow.document.body.clientWidth;
            wWidth = (wWidth < 800) ? wWidth : 800;
            var wHeight = targetWindow.document.body.clientHeight;
            wHeight = (wHeight < 600) ? wHeight : 600;
            return {
                title: '账单结算',
                url: ctx + '/pay/goTrial',
                showModal: true,
                allowResize: true,//允许尺寸调节
                showCloseButton: false,
                allowDrag: false,
                targetWindow: targetWindow,
                width: wWidth,
                height: wHeight
            }
        },
        /**
         * 获取Classname
         * @param classname
         */
        getClassname: function (commonService, classname) {
            var paramValue = commonService.getParameterSync({
                'branchCode': 'PUB',
                'paramName': 'MED_INS_STOP_STATUS'
            });
            if (paramValue) {
                var paramArr = paramValue.split(",");
                var paramArrLength = paramArr.length;
                if (paramArrLength > 0) {
                    var value = paramArr[0];
                    var startDateTime;//毫秒
                    var endDateTime;//毫秒
                    try {
                        if (paramArrLength > 1 && paramArr[1]) {
                            startDateTime = Number(paramArr[1]);
                        }
                        if (paramArrLength > 2 && paramArr[2]) {
                            endDateTime = Number(paramArr[2]);
                        }
                    } catch (e) {
                    }
                    var nowDateTime = new Date().getTime();
                    var MED_INS_STOP_STATUS_STOP = "1";//停用
                    if ((!startDateTime || nowDateTime > startDateTime) && (!endDateTime || nowDateTime < endDateTime)
                        && MED_INS_STOP_STATUS_STOP === value) {
                        //如果是停用状态，并且在停用时间区间内，病人性质改成自费
                        classname = CONST.CLASSNAME_SIMPLE;
                    }
                }
            }
            return classname;
        },
        /**
         * 通过身份证获取出生日期、性别
         * @param birth
         * @param sex
         */
        getBirthAndSexByIdCard: function (idCard) {
            // birthFlag 提供给onGetBirthByIdCardValidation作为标志
            var valueData = {birth: '', sex: '', birthFlag: false};
            if (idCard) {
                // 假设身份证是15位，转换成18位
                if (idCard.length == 15) {
                    //取得前面17位号码
                    var zone = idCard.substring(0, 6);
                    var year = "19" + idCard.substring(6, 8);
                    var mdo = idCard.substring(8, 15);
                    idCard = zone + year + mdo;
                    //取得最后的检验码
                    var getNum = eval(idCard.charAt(0) * 7 + idCard.charAt(1) * 9 + idCard.charAt(2) * 10
                        + idCard.charAt(3) * 5 + idCard.charAt(4) * 8 + idCard.charAt(5) * 4 + idCard.charAt(6) * 2
                        + idCard.charAt(7) * 1 + idCard.charAt(8) * 6 + idCard.charAt(9) * 3 + idCard.charAt(10) * 7
                        + idCard.charAt(11) * 9 + idCard.charAt(12) * 10 + idCard.charAt(13) * 5 + idCard.charAt(14) * 8
                        + idCard.charAt(15) * 4 + idCard.charAt(16) * 2);
                    getNum = getNum % 11;
                    var lastNumber;
                    switch (getNum) {
                        case 0 :
                            lastNumber = "1";
                            break;
                        case 1 :
                            lastNumber = "0";
                            break;
                        case 2 :
                            lastNumber = "X";
                            break;
                        case 3 :
                            lastNumber = "9";
                            break;
                        case 4 :
                            lastNumber = "8";
                            break;
                        case 5 :
                            lastNumber = "7";
                            break;
                        case 6 :
                            lastNumber = "6";
                            break;
                        case 7 :
                            lastNumber = "5";
                            break;
                        case 8 :
                            lastNumber = "4";
                            break;
                        case 9 :
                            lastNumber = "3";
                            break;
                        case 10 :
                            lastNumber = "2";
                            break;
                    }
                    idCard = idCard + lastNumber;
                }
                // 通过18位身份证获取出生日期
                if (idCard.length == 18) {
                    var left = idCard.length - 12;
                    var right = idCard.length - 4;
                    var i = idCard.slice(left, right);
                    if (8 == i.length) {
                        var y = i.slice(0, 4);
                        var m = i.slice(4, 6);
                        var d = i.slice(6, 8);
                        i = y + '-' + m + '-' + d;
                        valueData.birth = i;
                        valueData.birthFlag = true;
                    }
                    else {
                        valueData.birth = 0;
                        valueData.birthFlag = false;
                    }
                    // 通过18位身份证获取性别
                    if (parseInt(idCard.charAt(16) / 2) * 2 != idCard.charAt(16)) {
                        valueData.sex = 1;
                    }
                    else {
                        valueData.sex = 2;
                    }
                }
            }
            return valueData;
        },
        /**
         * 通过出生日期获取年龄
         * @param age
         */
        getAgeByBirth: function (bDate) {
            var age = {
                YYYY: '',
                MM: '',
                DD: '',
            };
            if (bDate) {
                var strB = []; //定义一数组
                strB = bDate.split("-"); //字符分割
                var bY = parseInt(strB[0]);
                var bM = parseInt(strB[1]);
                var bD = parseInt(strB[2]);
                var y = parseInt(new moment(new Date()).format("YYYY"));
                var m = parseInt(new moment(new Date()).format("MM"));
                var d = parseInt(new moment(new Date()).format("DD"));
                var valueD = 31;
                debugger
                if (bM == 2 || bM == 4 || bM == 6 || bM == 9 || bM == 11) {
                    valueD = 30;
                }
                var ageY = y - bY;
                var ageM;
                if (bM <= m) {
                    ageM = m - bM;
                }
                else {
                    ageY = ageY - 1;
                    ageM = 12 - (bM - m);
                }
                var ageD;
                if (bD <= d) {
                    ageD = d - bD;
                }
                else {
                    ageM = ageM - 1;
                    ageD = valueD - (bD - d);
                }
                if (ageM < 0) {
                    ageY = ageY - 1;
                    ageM = 12 + ageM;
                }
                age = {
                    YYYY: ageY,
                    MM: ageM,
                    DD: ageD,
                }
            }
            return age;
        },
        /**
         * 通过年龄获取出生日期
         * @param age
         */
        getBirthByAge: function (age, month, day) {
            debugger
            var birth = '';
            var beforeToday = new Date();// 获取当前时间
            if (age && age != 0) {
                beforeToday = new moment().subtract(age, 'year').calendar();// 获取前几年的今天
            }
            var y = parseInt(new moment(beforeToday).format('YYYY'));
            var m = parseInt(new moment(beforeToday).format('MM'));
            var d = parseInt(new moment(beforeToday).format('DD'));
            if (month) {
                if (m < month) {
                    y = y - 1;
                    m = 12 - (month - m);
                }
                else {
                    m = m - month
                }
            }
            if (day) {
                if (d <= day) {
                    m = m - 1;
                    var valueD = 31;
                    if (m == 2 || m == 4 || m == 6 || m == 9 || m == 11) {
                        valueD = 30;
                    }
                    d = valueD - (day - d);
                }
                else {
                    d = d - day;
                }
            }
            if (m.toString().length == 1) {
                m = '0' + m;
            }
            if (d.toString().length == 1) {
                d = '0' + d;
            }
            birth = y + '-' + m + '-' + d;
            return birth;
        },
        /**
         * 日期控件禁选
         * before 禁选某一日期后的日期
         * center 禁选某一日期后日期和某一日期前的日期
         * after 禁选当天之前的日期
         * @param time
         */
        timeDrawDate: function (value, e, d, c) {
            var date = e.date;
            if (value === 'before') {
                if (date.getTime() > d) {
                    e.allowSelect = false;
                }
            }
            else if (value === 'center') {
                if (!c) {
                    c = new Date();
                }
                if (date.getTime() > c) {
                    e.allowSelect = false;
                }
                if (date.getTime() < d) {
                    e.allowSelect = false;
                }
            }
            else if (value === 'after') {
                if (date.getTime() < d) {
                    e.allowSelect = false;
                }
            }
        },
    };

    var getChineseRmb = {
        /**
         * 该方法用于转换人民币的大小写
         * @param money
         * @returns {string}
         */
        convertCurrency: function (money) {
            //汉字的数字
            var cnNums = new Array('零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖');
            //基本单位
            var cnIntRadice = new Array('', '拾', '佰', '仟');
            //对应整数部分扩展单位
            var cnIntUnits = new Array('', '万', '亿', '兆');
            //对应小数部分单位
            var cnDecUnits = new Array('角', '分', '毫', '厘');
            //整数金额时后面跟的字符
            var cnInteger = '整';
            //整型完以后的单位
            var cnIntLast = '元';
            //最大处理的数字
            var maxNum = 999999999999999.9999;
            //金额整数部分
            var integerNum;
            //金额小数部分
            var decimalNum;
            //输出的中文金额字符串
            var chineseStr = '';
            //分离金额后用的数组，预定义
            var parts;
            if (money == '') {
                return '';
            }
            money = parseFloat(money);
            if (money >= maxNum) {
                //超出最大处理数字
                return '';
            }
            if (money == 0) {
                chineseStr = cnNums[0] + cnIntLast + cnInteger;
                return chineseStr;
            }
            //转换为字符串
            money = money.toString();
            if (money.indexOf('.') == -1) {
                integerNum = money;
                decimalNum = '';
            } else {
                parts = money.split('.');
                integerNum = parts[0];
                decimalNum = parts[1].substr(0, 4);
            }
            //获取整型部分转换
            if (parseInt(integerNum, 10) > 0) {
                var zeroCount = 0;
                var IntLen = integerNum.length;
                for (var i = 0; i < IntLen; i++) {
                    var n = integerNum.substr(i, 1);
                    var p = IntLen - i - 1;
                    var q = p / 4;
                    var m = p % 4;
                    if (n == '0') {
                        zeroCount++;
                    } else {
                        if (zeroCount > 0) {
                            chineseStr += cnNums[0];
                        }
                        //归零
                        zeroCount = 0;
                        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m];
                    }
                    if (m == 0 && zeroCount < 4) {
                        chineseStr += cnIntUnits[q];
                    }
                }
                chineseStr += cnIntLast;
            }
            //小数部分
            if (decimalNum != '') {
                var decLen = decimalNum.length;
                for (var i = 0; i < decLen; i++) {
                    var n = decimalNum.substr(i, 1);
                    if (n != '0') {
                        chineseStr += cnNums[Number(n)] + cnDecUnits[i];
                    }
                }
            }
            if (chineseStr == '') {
                chineseStr += cnNums[0] + cnIntLast + cnInteger;
            } else if (decimalNum == '') {
                chineseStr += cnInteger;
            }
            return chineseStr;
        }
    };

    /* 是否英文+数字 */
    function isEnglishAndNumber(v) {
        var re = new RegExp("^[0-9a-zA-Z\_]+$");
        if (re.test(v)) return true;
        return false;
    };

    var CORE = {
        getReadCardOpt: function (targetWindow, CORE_HOST) {
            return {
                targetWindow: targetWindow,
                title: '读卡',
                url: CORE_HOST + 'component/readcard/show',
                showModal: true,
                allowResize: false,
                showCloseButton: false,
                width: 640,
                height: 330
            }
        }
    };

    return {

        DESCRIBABLE_ENUM: DESCRIBABLE_ENUM,
        TIP_MSG: TIP_MSG,
        PUB_DICTIONARY_TYPE: PUB_DICTIONARY_TYPE,
        CONST: CONST,
        DIC_DATA_CONST: DIC_DATA_CONST,
        Validator: Validator,
        KeyBind: KeyBind,
        util: util,
        CORE: CORE,
        getChineseRmb: getChineseRmb,
        COMMON: COMMON
    };
});
