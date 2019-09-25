package com.cc.core.interceptor;

import cn.hutool.core.util.StrUtil;
import com.cc.api.biz.ApiContextHolder;
import com.cc.core.exception.TokenException;
import com.cc.core.exception.TokenTimeoutException;
import com.cc.system.entity.SysToken;
import com.cc.system.service.ISysTokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * @ClassName AuthorizationInterceptor
 * @Author lz
 * @Description 权限(Token)验证
 * @Date 2018/10/18 10:17
 * @Version V1.0
 **/
@Component
public class AuthorizationInterceptor extends HandlerInterceptorAdapter {

    @Autowired
    private ISysTokenService sysTokenService;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) {
        if ("options".equalsIgnoreCase(request.getMethod())) {
            return true;
        }

        //从header中获取token
        String token = request.getHeader("token");
        //如果header中不存在token，则从参数中获取token
        if (token == null) {
            token = request.getParameter("token");
        }
        //token为空
        if (StrUtil.isBlank(token)) {
            throw new TokenException(token);
        }

        //查询token信息
        SysToken tokenEntity = sysTokenService.queryByToken(token);
        if (tokenEntity == null || (tokenEntity.getExpireTime() != null && tokenEntity.getExpireTime().getTime() < System.currentTimeMillis())) {
            throw new TokenTimeoutException(token);
        }

        ApiContextHolder.setAttributes(tokenEntity);
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) {
        ApiContextHolder.reset();
    }
}
