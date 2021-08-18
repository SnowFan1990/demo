package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class AreaCodeServiceImpl implements AreaCodeService{
    @Autowired
    private AreaCodeMapper areaCodeMapper;

    public List<AreaCode> getAreaCodeList() {
        return areaCodeMapper.getAreaCodeList();
    }

    public List<Province> getProvinces() {
        return areaCodeMapper.getProvinces();
    }

    public List<City> getCities(String provinceCode) {
        return areaCodeMapper.getCities(provinceCode);
    }

    public List<AreaCode> getAreaCodes(String cityCode) {
        return areaCodeMapper.getAreaCodes(cityCode);
    }

}
