package demo;

import com.alibaba.model.dto.User;
import com.alibaba.service.mapper.demo.DemoMapper;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.io.IOException;

/**
 * File：Provider <br>
 * Created on 2018/8/20.
 * Title:  <br>
 * Description: <br>
 * Company: wondersgroup.com <br>
 *
 * @author 潘国忠
 * @version 1.0
 */
public class Provider {
    public static void main(String[] args) throws IOException {
        ClassPathXmlApplicationContext context = new ClassPathXmlApplicationContext
                ("META-INF/spring/mybatis.xml");

        DemoMapper demoMapper =(DemoMapper) context.getBean("demoMapper");
        User user = new User();
        user.setId(36);


        System.out.println(context.getEnvironment());
        System.out.println(context.getDisplayName() + ": here");
        context.start();
        System.out.println("服务已经启动...");
        System.in.read();
    }
}
