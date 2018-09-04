package com.alibaba.service.impl;

import com.alibaba.dubbo.config.annotation.Service;
import com.alibaba.model.dto.User;
import com.alibaba.service.api.LoginService;
import com.alibaba.service.mapper.demo.DemoMapper;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

/**
 * File：LoginServiceImpl <br>
 * Created on 2018/8/26.
 * Title:  <br>
 * Description: <br>
 * Company: wondersgroup.com <br>
 *
 * @author 潘国忠
 * @version 1.0
 */
@Service
public class LoginServiceImpl implements LoginService {
    @Autowired
    private DemoMapper demoMapper;

    public User doLogin(User user) {
        user = new User();
        user.setUserName("ceshi");
        user.setPassword("pw");
        user.setId(36);
        System.out.println(demoMapper.getClass());
        List<User>  users = demoMapper.selectDemoByPk();
        if(users.size()>0)
        user = users.get(0);
        return user;
    }

}
