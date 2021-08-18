package com.example.demo.controller;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;


@Mapper
public interface AreaCodeMapper {

    /**
     * 查询身份证区域码
     * @return
     */
    public List<AreaCode> getAreaCodeList();

    public List<Province> getProvinces();

    public List<City> getCities(@Param("provinceCode")String provinceCode);

    public List<AreaCode> getAreaCodes(@Param("cityCode") String cityCode);

}
