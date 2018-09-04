package com.alibaba.service.api;

import com.alibaba.model.dto.User;

/**
 * File：LoginService <br>
 * Created on 2018/8/26.
 * Title:  <br>
 * Description: <br>
 * Company: wondersgroup.com <br>
 *
 * @author 潘国忠
 * @version 1.0
 */
public interface LoginService {
    User doLogin(User user);
}
