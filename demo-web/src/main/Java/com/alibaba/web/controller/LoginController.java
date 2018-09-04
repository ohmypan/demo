package com.alibaba.web.controller;

import com.alibaba.dubbo.config.annotation.Reference;
import com.alibaba.model.dto.User;
import com.alibaba.service.api.LoginService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

/**
 * File：LoginController <br>
 * Created on 2018/8/26.
 * Title:  <br>
 * Description: <br>
 * Company: wondersgroup.com <br>
 *
 * @author 潘国忠
 * @version 1.0
 */
@Controller
@RequestMapping("/login")
public class LoginController {
    @Reference
    LoginService loginService;

    @RequestMapping("/welcome")
    public ModelAndView welcome() {
        return new ModelAndView("welcome");
    }

    @RequestMapping("/login")
    public ModelAndView logIn() {
        return new ModelAndView("login");
    }

    @RequestMapping(value = "/doLogin",method = RequestMethod.POST)
    @ResponseBody
    public String doLogin(User user) {
        System.out.println(user.toString());
        user=loginService.doLogin(user);
        System.out.println(user.toString());
        return user.toString();
    }

}
