package com.alibaba.service.interceptor;

import com.alibaba.fastjson.JSON;
import org.apache.ibatis.cache.CacheKey;
import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.BoundSql;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.mapping.ParameterMapping;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;
import org.apache.log4j.LogManager;
import org.apache.log4j.Logger;

import java.lang.reflect.Method;
import java.util.Collection;
import java.util.List;
import java.util.Properties;

/**
 * File：SqlInterceptor <br>
 * Created on 2018/9/3.
 * Title:  <br>
 * Description: <br>
 * Company: wondersgroup.com <br>
 *
 * @author 潘国忠
 * @version 1.0
 */
@Intercepts({@Signature(
        type = Executor.class,
        method = "commit",
        args = {boolean.class}
), @Signature(
        type = Executor.class,
        method = "rollback",
        args = {boolean.class}
), @Signature(
        type = Executor.class,
        method = "update",
        args = {MappedStatement.class, Object.class}
), @Signature(
        type = Executor.class,
        method = "query",
        args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class}
), @Signature(
        type = Executor.class,
        method = "query",
        args = {MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class, CacheKey.class, BoundSql.class}
)})
public class SqlInterceptor implements Interceptor {

    private Logger logger = LogManager.getLogger(SqlInterceptor.class);

    public Object intercept(Invocation invocation) throws Throwable {
        Object target = invocation.getTarget();
        Object result = null;
        System.out.println("sql拦截===================");
        if (target instanceof Executor) {
            long start = System.currentTimeMillis();
            Method method = invocation.getMethod();
            /**执行方法*/
            result = invocation.proceed();
            long end = System.currentTimeMillis();
            final Object[] args = invocation.getArgs();

            //获取原始的ms
            MappedStatement ms = (MappedStatement) args[0];
            String commandName = ms.getSqlCommandType().name();
            String name = method.getName();
            if(commandName.startsWith("INSERT")){
                name+="=新增";
            }else if(commandName.startsWith("UPDATE")){
                name+="=修改";
            }else if(commandName.startsWith("DELETE")){
                name+="=删除";
            }else if(commandName.startsWith("SELECT")){
                name+="=查询";
            }
            String message = "[SqlInterceptor] execute [" + name + "] cost [" + (end - start) + "] ms";
            StringBuffer stringBuffer = new StringBuffer();
            stringBuffer.append(message);
            stringBuffer.append("\n");

            Object parameterObject = args[1];
            BoundSql boundSql = ms.getBoundSql(parameterObject);
            String sql = boundSql.getSql();
            List<ParameterMapping> parameterMappings = boundSql.getParameterMappings();
            String parameterObjects = JSON.toJSONString(boundSql.getParameterObject());



            String id = ms.getId();
            stringBuffer.append("id="+id);
            stringBuffer.append("\r\n");

            stringBuffer.append("sql="+sql);
            stringBuffer.append("\n");

            stringBuffer.append("parameterMappings="+parameterMappings);
            stringBuffer.append("\n");

            stringBuffer.append("parameterObjects="+parameterObjects);
            stringBuffer.append("\n");
            // stringBuffer.append("result="+result);
            if(result!=null) {
                if (result instanceof List) {
                    stringBuffer.append("result=" + ((List) result).size());
                } else if (result instanceof Collection) {
                    stringBuffer.append("result=" + ((Collection) result).size());
                } else {
                    stringBuffer.append("result=" + 1);
                }
            }else{
                stringBuffer.append("result=NULL");
            }
            stringBuffer.append("\n");
            logger.warn(stringBuffer.toString());
            //数组可能为空
            // ParameterMapping mapping = boundSql.getParameterMappings().get(0);
            // Configuration configuration = ms.getConfiguration();
            //  DynamicContext context = new DynamicContext(configuration, parameterObject);
            //   String originSql = context.getSql();
            //  System.out.println("@@@@originSql:"+originSql);
        }
        return result;
    }

    public Object plugin(Object o) {
        return null;
    }

    public void setProperties(Properties properties) {

    }
}
