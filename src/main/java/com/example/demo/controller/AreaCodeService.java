package com.example.demo.controller;

import java.util.List;


public interface AreaCodeService {

    List<AreaCode> getAreaCodeList();

    List<Province> getProvinces();

    List<City> getCities(String provinceCode);

    List<AreaCode> getAreaCodes(String cityCode);

}
