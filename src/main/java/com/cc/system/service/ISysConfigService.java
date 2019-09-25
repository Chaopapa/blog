package com.cc.system.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cc.core.rest.R;
import com.cc.system.entity.SysConfig;
import com.cc.system.entity.config.BaseConfig;

/**
 * @ClassName ISysConfigService
 * @Author lz
 * @Description 系统配置接口层
 * @Date 2018/10/9 11:32
 * @Version V1.0
 **/
public interface ISysConfigService extends IService<SysConfig> {

    /**
     * 获取配置
     *
     * @param clazz
     * @param <T>
     * @return
     */
    <T extends BaseConfig> T findConfig(Class<T> clazz);

    /**
     * 保存配置
     *
     * @param object
     * @return
     */
    R saveConfig(BaseConfig object);
}
