package com.example.demo.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;


import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;

@Api("获取区域信息")
@RestController
@RequestMapping("/areacode")
public class AreaCodeController {
    
    @Autowired
    private AreaCodeService areaCodeService;
    
    @ApiOperation(value = "查询省份信息列表", notes = "查询省份信息列表")
    @GetMapping("/province")
    @ResponseBody
    public List<Province> getProvinces() {
        return areaCodeService.getProvinces();
    }
    
    @ApiOperation(value = "查询城市信息列表", notes = "查询城市信息列表")
    @GetMapping("/city")
    @ResponseBody
    public List<City> getCities(@RequestParam String provinceCode) {
        return areaCodeService.getCities(provinceCode);
    }
    
    @ApiOperation(value = "查询区域信息列表", notes = "查询区域信息列表")
    @GetMapping("/area")
    @ResponseBody
    public List<AreaCode> getAreaCodes(@RequestParam String cityCode) {
        return areaCodeService.getAreaCodes(cityCode);
    }
    
    @ApiOperation(value = "测试增量代码覆盖率", notes = "查询区域信息列表")
    @GetMapping("/cal")
    @ResponseBody
    public int getNumber(@RequestParam int a, @RequestParam int b) {
        return a+b;
    }

}
