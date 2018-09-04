package com.alibaba.service.utils;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.Reader;

/**
 * File：MyBatisUtil <br>
 * Created on 2018/9/4.
 * Title:  <br>
 * Description: <br>
 * Company: wondersgroup.com <br>
 *
 * @author 潘国忠
 * @version 1.0
 */
public class MyBatisUtil {
    private static ThreadLocal<SqlSession> threadLocal = new ThreadLocal<SqlSession>();
    private static SqlSessionFactory sqlSessionFactory;

    //加载Configuration.xml配置文件
    static{
        try {

            Reader reader = Resources.getResourceAsReader("META-INF/spring/mybatis.xml");

            sqlSessionFactory = new SqlSessionFactoryBuilder().build(reader);


        } catch (IOException e) {

            e.printStackTrace();
        }
    }

    /*
     * 禁止外部new来调用
     */
    private MyBatisUtil(){

    }

    /*
     * 获取SqlSession
     */
    public static SqlSession getSqlSession(){

        //从当前线程中获取SqlSession对象
        SqlSession sqlSession = threadLocal.get();

        //如果SqlSession为空
        if (sqlSession == null) {

            //在SqlSessionFactory非空的情况下，获取SqlSession对象
            sqlSession = sqlSessionFactory.openSession();
            //将SqlSession对象与当前线程绑定在一起
            threadLocal.set(sqlSession);
        }

        //返回SqlSession对象
        return sqlSession;
    }

    /*
     * 关闭SqlSession与当前线程分开
     */
    public static void closeSqlSession(){

        //从当前线程中获取SqlSession对象
        SqlSession sqlSession = threadLocal.get();

        //如果SqlSession对象非空
        if (sqlSession != null) {
            //关闭
            sqlSession.close();
            //放开当前线程与SqlSession对象的关系，让GC尽快回收
            threadLocal.remove();

        }

    }
    public static void main(String[] args) {

        MyBatisUtil.getSqlSession().getConnection();

        System.out.println("获取连接成功");
    }

}
