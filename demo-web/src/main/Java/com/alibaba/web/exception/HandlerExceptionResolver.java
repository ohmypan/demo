package com.alibaba.web.exception;

import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.AbstractHandlerExceptionResolver;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * File：HandlerExceptionResolver <br>
 * Created on 2018/8/27.
 * Title:  <br>
 * Description: <br>
 * Company: wondersgroup.com <br>
 *
 * @author 潘国忠
 * @version 1.0
 */
public class HandlerExceptionResolver extends AbstractHandlerExceptionResolver {
    private HttpMessageConverter<Object> jsonMessageConverter;

    public void setJsonMessageConverter(HttpMessageConverter<Object> jsonMessageConverter) {
        this.jsonMessageConverter = jsonMessageConverter;
    }

    public HttpMessageConverter<Object> getJsonMessageConverter() {
        return jsonMessageConverter;
    }
    @Override
    protected ModelAndView doResolveException(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        return null;
    }
}
