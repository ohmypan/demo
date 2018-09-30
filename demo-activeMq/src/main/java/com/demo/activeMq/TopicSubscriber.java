package com.demo.activeMq;

import org.apache.activemq.ActiveMQConnection;
import org.apache.activemq.ActiveMQConnectionFactory;

import javax.jms.*;

/**
 * File：TopicSubscriber <br>
 * Created on 2018/9/28.
 * Title:  <br>
 * Description: <br>
 * Company: wondersgroup.com <br>
 *
 * @author 潘国忠
 * @version 1.0
 */
public class TopicSubscriber {
    private static String user = ActiveMQConnection.DEFAULT_USER;
    private static String password =ActiveMQConnection.DEFAULT_PASSWORD;
    private static String url = "tcp://localhost:61626";
    public static void main(String[] args) throws Exception{

         // ConnectionFactory ：连接工厂，JMS 用它创建连接
        ConnectionFactory connectionFactory = new ActiveMQConnectionFactory(user,password,url);
        // Connection ：JMS 客户端到JMS Provider 的连接
        Connection connection = connectionFactory.createConnection();
        connection.start();
        // Session： 一个发送或接收消息的线程
        final Session session = connection.createSession(Boolean.TRUE, Session.AUTO_ACKNOWLEDGE);
        // Destination ：消息的目的地;消息发送给谁.
        Topic destination=session.createTopic("example.A");
        // 消费者，消息接收者
        MessageConsumer consumer = session.createConsumer(destination);
        //有事务限制
        consumer.setMessageListener(new MessageListener(){
            @Override
            public void onMessage(Message message) {
                try {
                    TextMessage textMessage=(TextMessage)message;
                    System.out.println(textMessage.getText());
                } catch (JMSException e1) {
                    e1.printStackTrace();
                }
                try {
                    session.commit();
                } catch (JMSException e) {
                    e.printStackTrace();
                }
            }
        });
/* 另外一种接受方式
* while (true) {
//设置接收者接收消息的时间，为了便于测试，这里谁定为100s
TextMessage message = (TextMessage) consumer.receive(100000);
if (null != message) {
System.out.println("收到消息" + message.getText());
} else {
break;
}
}*/
    }
}
