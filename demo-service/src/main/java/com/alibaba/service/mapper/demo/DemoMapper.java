package com.alibaba.service.mapper.demo;

import com.alibaba.model.dto.User;

import java.util.List;

/**
 * File：DemoMapper <br>
 * Created on 2018/9/3.
 * Title:  <br>
 * Description: <br>
 * Company: wondersgroup.com <br>
 *
 * @author 潘国忠
 * @version 1.0
 */
public interface DemoMapper {
    List<User> selectDemoByPk();
}
