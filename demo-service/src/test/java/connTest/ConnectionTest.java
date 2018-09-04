package connTest;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.Reader;
import java.sql.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

/**
 * File：ConnectionTest <br>
 * Created on 2018/9/3.
 * Title:  <br>
 * Description: <br>
 * Company: wondersgroup.com <br>
 *
 * @author 潘国忠
 * @version 1.0
 */
public class ConnectionTest {
    public static Connection getConnection() {
        // 定义连接
        Connection connection = null;

        try {
            // 加载驱动
            Class.forName("com.mysql.jdbc.Driver");
            connection = DriverManager.getConnection("jdbc:mysql://localhost:3306/dubbo_demo", "root", "123456");
        } catch (Exception e) {
            e.printStackTrace();
        }
        return connection;
    }

    public static List<HashMap<String, Object>> getMysqlData() {
        Connection connection = null;
        // 预执行加载
        PreparedStatement preparedStatement = null;
        // 结果集
        ResultSet resultSet = null;

        connection = getConnection();

        String sqlString = "select * from user";

        List<HashMap<String, Object>> list = new ArrayList<HashMap<String,Object>>();

        try {
            preparedStatement = connection.prepareStatement(sqlString);
            resultSet = preparedStatement.executeQuery();
            HashMap<String, Object> map = null;
            while (resultSet.next()) {
                map = new HashMap<String, Object>();
                map.put("name", resultSet.getString("username"));
                list.add(map);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
            try {
                if (resultSet != null) {
                    resultSet.close();
                }
                if (preparedStatement != null) {
                    preparedStatement.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return list;
    }
    private static Reader reader;
    private static SqlSessionFactory sessionFactory;
    private static SqlSession session;
    public static void main(String[] args) throws IOException{
        Connection conn = getConnection();
        System.out.println("-============="+conn);
        try {
            Statement s = conn.createStatement();
            reader = Resources.getResourceAsReader("mybatis-config.xml");
            // reader= Resources.getResourceAsReader("META-INF/spring/mybatis.xml");
            //通过配置信息构建SqlSessionFactory
            sessionFactory=new SqlSessionFactoryBuilder().build(reader);
            //打开会话SqlSession
            session= sessionFactory.openSession(conn);
           // String sql = "com.alibaba.service.mapper.demo.selectDemoByPk";
           // User user = session.selectOne("select * from user",1);
            conn=session.getConnection();
            System.out.println(conn);
            System.out.println(sessionFactory.openSession().getConnection());
            session=sessionFactory.openSession();
            //System.out.println(session.flushStatements());
            Boolean ss= s.execute("select * from user");
            System.out.println(ss);
            session.close();
        } catch (SQLException e) {
            e.printStackTrace();
        }
        //SqlSession sqlSession=getSqlSession();

     /*   List<HashMap<String, Object>> mysqlData = getMysqlData();
        for(HashMap<String, Object> map : mysqlData) {
            System.out.println(map.get("name"));
        }*/
    }
}
