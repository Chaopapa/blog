package com.cc.api.biz;

import cn.hutool.core.lang.Validator;
import com.cc.component.sms.entity.enums.SmsType;
import com.cc.component.sms.service.IComSmslogService;
import com.cc.core.rest.R;
import com.cc.system.service.ISysTokenService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

/**
 * @Author 严秋旺
 * @Date 2018-11-07 11:40
 * @Version V1.0
 **/
@Slf4j
//@RestController
@RequestMapping("/api/biz")
public class LoginApi {

//    @Autowired
//    private IUserService userService;
    @Autowired
    private IComSmslogService comlogService;
    @Autowired
    private ISysTokenService sysTokenService;

    @GetMapping("sms")
    public R sendSMS(String mobile, SmsType type) {
        if (StringUtils.isEmpty(mobile)) {
            return R.error("手机号码不能为空");
        }
        if (!Validator.isMobile(mobile)) {
            return R.error("手机号码格式错误");
        }
        if (type == null) {
            return R.error("验证码类型错误");
        }
//        User user = userService.findByPhone(mobile);
//        if(SmsType.REGISTER.equals(type)){
//            if (user != null) {
//                return new R(RCode.hasRegister);
//            }
//        }else if(SmsType.LOGIN.equals(type) || SmsType.updatePassWord.equals(type)){
//            if (user == null) {
//                return new R(RCode.noRegister);
//            }
//        }
        comlogService.sendSms(type, mobile);

        return R.success();
    }

    /**
     * @param
     * @return com.cc.core.rest.R
     * @description 退出登录接口
     * @author lz
     * @date 2018/10/22 15:47
     * @version V1.0.0
     */
    @PostMapping("logout")
    public R logout() {
        Long userId = ApiContextHolder.getToken().getUserId();
        sysTokenService.expireToken(userId);
        return R.success();
    }
}
